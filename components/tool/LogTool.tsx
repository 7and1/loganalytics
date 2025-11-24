"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, Suspense } from "react";
import Dropzone from "@/components/analysis/Dropzone";
import SqlEditor from "@/components/analysis/SqlEditor";
import ResultTable, { ResultTableSkeleton } from "@/components/analysis/ResultTable";
import { AutoCharts } from "@/components/analysis/AutoCharts";
import formatsData from "@/data/formats";
import type { LogFormat } from "@/types/content";
import { sniffLogFormat } from "@/lib/log-sniffer";
import { ingestLogFile, runQuery } from "@/lib/log-parser";
import type { IngestSummary } from "@/lib/log-parser";
import { useUrlState } from "@/hooks/useUrlState";
import { probeRejectsCapability } from "@/lib/ingestion-probe";
import { useDebugStore } from "@/lib/store/debug";

const formats = formatsData as LogFormat[];

type Status = "idle" | "sniffing" | "ingesting" | "ready" | "error";

export default function LogTool() {
  return (
    <Suspense fallback={<ResultTableSkeleton />}>
      <LogToolInner />
    </Suspense>
  );
}

function LogToolInner() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("拖入日志文件即可开始");
  const [activeFormat, setActiveFormat] = useState<LogFormat | null>(null);
  const [sniffConfidence, setSniffConfidence] = useState(0);
  const [ingestSummary, setIngestSummary] = useState<IngestSummary | null>(null);
  const [isRunningQuery, setIsRunningQuery] = useState(false);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [statusChartData, setStatusChartData] = useState<{ status: string; count: number; [key: string]: string | number }[]>([]);
  const [timelineChartData, setTimelineChartData] = useState<{ bucket: string; count: number; [key: string]: string | number }[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);
  const { logType: templateLogType, query: templateQuery, sampleUrl, isTemplateActive, consumeTemplate } =
    useUrlState();
  const addLog = useDebugStore((state) => state.addLog);
  const updateStats = useDebugStore((state) => state.updateStats);
  const [probeStatus, setProbeStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [probeMessage, setProbeMessage] = useState("尚未运行测试");
  const [isSampleLoading, setIsSampleLoading] = useState(false);
  const lastLoadedSampleRef = useRef<string | null>(null);

  const templateFormat = useMemo(() => {
    if (!templateLogType) return null;
    return formats.find((format) => format.slug === templateLogType) ?? null;
  }, [templateLogType]);

  const tableData = useMemo(() => {
    if (!ingestSummary) {
      return { columns: [], rows: [] as Record<string, unknown>[] };
    }
    return { columns: ingestSummary.columns, rows: ingestSummary.rows };
  }, [ingestSummary]);

  const formattedRows = useMemo(() => {
    return tableData.rows.map((row) => {
      const mapped: Record<string, ReactNode> = {};
      tableData.columns.forEach((column) => {
        const value = row[column];
        mapped[column] = value === null || value === undefined ? "" : String(value);
      });
      return mapped;
    });
  }, [tableData]);

  const loadAutoCharts = useCallback(
    async (summary: IngestSummary) => {
      setIsChartLoading(true);
      setChartError(null);
      const columns = summary.columns.map((column) => column.toLowerCase());
      const hasStatus = columns.includes("status");
      const hasTimeLocal = columns.includes("time_local");
      const nextStatusData: { status: string; count: number; [key: string]: string | number }[] = [];
      const nextTimelineData: { bucket: string; count: number; [key: string]: string | number }[] = [];

      const toNumber = (value: unknown) => {
        if (typeof value === "number") return value;
        const parsed = Number(value ?? 0);
        return Number.isFinite(parsed) ? parsed : 0;
      };

      try {
        if (hasStatus) {
          const statusResult = await runQuery(
            summary.connection,
            `SELECT status AS status, COUNT(*) AS count FROM ${summary.tableName} WHERE status IS NOT NULL GROUP BY 1 ORDER BY 2 DESC LIMIT 10`
          );
          nextStatusData.push(
            ...statusResult.rows.map((row) => ({
              status: String(row.status ?? "unknown"),
              count: toNumber(row.count),
            }))
          );
        }

        if (hasTimeLocal) {
          const timelineResult = await runQuery(
            summary.connection,
            `WITH parsed AS (
              SELECT DATE_TRUNC('minute', TRY_STRPTIME(time_local, '%d/%b/%Y:%H:%M:%S %z')) AS bucket
              FROM ${summary.tableName}
            )
            SELECT strftime(bucket, '%Y-%m-%d %H:%M') AS bucket, COUNT(*) AS count
            FROM parsed
            WHERE bucket IS NOT NULL
            GROUP BY 1
            ORDER BY bucket
            LIMIT 50`
          );
          nextTimelineData.push(
            ...timelineResult.rows.map((row) => ({
              bucket: String(row.bucket ?? ""),
              count: toNumber(row.count),
            }))
          );
        }

        setStatusChartData(nextStatusData);
        setTimelineChartData(nextTimelineData);
      } catch (error) {
        setChartError(error instanceof Error ? error.message : "无法生成图表");
      } finally {
        setIsChartLoading(false);
      }
    },
    []
  );

  const handleFileAccepted = useCallback(
    async (file: File) => {
      setStatus("sniffing");
      setQueryError(null);
      setMessage("🔍 正在嗅探日志格式...");
      setStatusChartData([]);
      setTimelineChartData([]);
      setChartError(null);

      try {
        if (ingestSummary?.connection) {
          await ingestSummary.connection.close();
        }
        const sniff = templateFormat
          ? { format: templateFormat, confidence: 1 }
          : await sniffLogFormat(file, formats);
        if (!sniff.format) {
          setStatus("error");
          setMessage("error" in sniff && sniff.error ? sniff.error : "未能识别日志格式");
          return;
        }

        setActiveFormat(sniff.format);
        setSniffConfidence(sniff.confidence);
        setStatus("ingesting");
        setMessage(`🧠 已识别 ${sniff.format.name}，DuckDB 正在载入...`);

        const ingestStart = performance.now();
        const summary = await ingestLogFile(file, sniff.format, { previewRows: 200 });
        const ingestDuration = Math.round(performance.now() - ingestStart);
        setIngestSummary(summary);
        setStatus("ready");
        setMessage(
          `✅ 已载入 ${summary.totalRows.toLocaleString()} 行，异常 ${summary.errorRows.toLocaleString()} 行`
        );
        updateStats({
          filename: file.name,
          totalRows: summary.totalRows,
          validRows: summary.totalRows - summary.errorRows,
          rejectRows: summary.errorRows,
          parseTimeMs: ingestDuration,
        });
        await loadAutoCharts(summary);
        if (isTemplateActive) {
          consumeTemplate();
        }
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "解析失败");
      }
    },
    [
      ingestSummary,
      templateFormat,
      isTemplateActive,
      consumeTemplate,
      updateStats,
      loadAutoCharts,
    ]
  );

  const handleRunQuery = useCallback(
    async (sql: string) => {
      if (!ingestSummary?.connection) return;
      setIsRunningQuery(true);
      setQueryError(null);
      const start = performance.now();
      try {
        const result = await runQuery(ingestSummary.connection, sql);
        const duration = Math.round(performance.now() - start);
        addLog({ query: sql, durationMs: duration });
        setIngestSummary((current) =>
          current
            ? {
                ...current,
                columns: result.columns,
                rows: result.rows,
              }
            : current
        );
      } catch (error) {
        const duration = Math.round(performance.now() - start);
        const errorMessage = error instanceof Error ? error.message : "查询失败";
        addLog({ query: sql, durationMs: duration, error: errorMessage });
        setQueryError(errorMessage);
      } finally {
        setIsRunningQuery(false);
      }
    },
    [ingestSummary, addLog]
  );

  const handleRunProbe = useCallback(async () => {
    setProbeStatus("running");
    setProbeMessage("正在运行 DuckDB rejects_table 测试...");
    try {
      const result = await probeRejectsCapability();
      if (result.success) {
        setProbeStatus("success");
        setProbeMessage(`验证成功：有效 ${result.validRows} 行，拒绝 ${result.rejectRows} 行`);
      } else {
        setProbeStatus("error");
        setProbeMessage(result.error ?? "Probe 结果异常");
      }
    } catch (error) {
      setProbeStatus("error");
      setProbeMessage(error instanceof Error ? error.message : "Probe 执行失败");
    }
  }, []);

  const loadSampleFromPath = useCallback(
    async (samplePath: string) => {
      try {
        setIsSampleLoading(true);
        setMessage("📦 正在载入示例日志...");
        const response = await fetch(samplePath);
        if (!response.ok) {
          throw new Error("示例日志加载失败");
        }
        const text = await response.text();
        const filename = samplePath.split("/").pop() || "sample.log";
        const mimeType = filename.endsWith(".json") ? "application/json" : "text/plain";
        const sampleFile = new File([text], filename, { type: mimeType });
        await handleFileAccepted(sampleFile);
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "示例加载失败");
      } finally {
        setIsSampleLoading(false);
      }
    },
    [handleFileAccepted, setMessage, setStatus, setIsSampleLoading]
  );

  const handleLoadSample = useCallback(() => {
    void loadSampleFromPath("/samples/s3-access.log");
  }, [loadSampleFromPath]);

  useEffect(() => {
    const connection = ingestSummary?.connection;
    return () => {
      connection?.close();
    };
  }, [ingestSummary?.connection]);

  useEffect(() => {
    if (!sampleUrl) {
      lastLoadedSampleRef.current = null;
      return;
    }
    if (lastLoadedSampleRef.current === sampleUrl) {
      return;
    }
    lastLoadedSampleRef.current = sampleUrl;
    void loadSampleFromPath(sampleUrl);
  }, [sampleUrl, loadSampleFromPath]);

  const displayFormat = activeFormat ?? templateFormat;
  const displayConfidence = activeFormat ? sniffConfidence : templateFormat ? 1 : 0;
  const fallbackSql = displayFormat
    ? displayFormat.defaultSqlQuery ?? `SELECT * FROM log_table LIMIT 200 -- ${displayFormat.slug}`
    : "SELECT * FROM log_table LIMIT 200";
  const editorDefaultSql = templateQuery ?? fallbackSql;
  const editorKey = `${displayFormat?.slug ?? "default"}-${templateQuery ?? "default"}`;

  useEffect(() => {
    if (templateFormat && status === "idle") {
      setMessage(`🎯 已载入 ${templateFormat.name} 模板，拖入对应日志即可开始`);
    }
  }, [templateFormat, status]);

  const handleClearTemplate = useCallback(() => {
    consumeTemplate();
    setMessage("拖入日志文件即可开始");
  }, [consumeTemplate]);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 lg:flex-row">
      <div className="w-full space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:w-1/3">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-emerald-300">步骤 1</p>
          <h1 className="text-2xl font-semibold">拖拽日志，自动识别</h1>
          <p className="text-sm text-white/70">Sniffer 仅读取文件前 64KB，就能匹配 formats.json。</p>
        </div>
        {isTemplateActive && templateFormat && (
          <div className="flex items-start justify-between gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <div>
              <p>
                🚀 模板已激活：<span className="font-semibold">{templateFormat.name}</span>
              </p>
              {templateQuery && <p className="mt-1 text-xs">SQL 预设：{templateQuery}</p>}
            </div>
            <button
              type="button"
              onClick={handleClearTemplate}
              className="text-xs font-semibold text-emerald-200 hover:text-emerald-100"
            >
              清除
            </button>
          </div>
        )}
        <Dropzone
          onFileAccepted={handleFileAccepted}
          isLoading={status === "sniffing" || status === "ingesting"}
          helperText={message}
          ctaLabel="拖拽或选择日志文件"
        />
        <button
          type="button"
          onClick={handleLoadSample}
          disabled={isSampleLoading || status === "ingesting"}
          className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSampleLoading ? "正在载入 S3 示例..." : "📁 没有日志？载入示例 S3 Log"}
        </button>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-amber-200">DuckDB Rejects Probe</p>
              <p className="mt-1 text-xs text-amber-100/70">{probeMessage}</p>
            </div>
            <button
              type="button"
              onClick={handleRunProbe}
              disabled={probeStatus === "running"}
              className="rounded-full border border-amber-400/40 px-4 py-1 text-xs font-semibold text-amber-100 transition hover:border-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {probeStatus === "running" ? "测试中..." : "运行 Probe"}
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-relaxed">
          <p>
            {displayFormat ? (
              <>
                已识别：<span className="font-semibold">{displayFormat.name}</span>
                <br />置信度：{(displayConfidence * 100).toFixed(0)}%
              </>
            ) : (
              "尚未识别格式"
            )}
          </p>
          <p className="mt-2 text-xs text-white/70">
            {ingestSummary
              ? `预览 ${ingestSummary.columns.length} 列 / ${ingestSummary.totalRows.toLocaleString()} 行`
              : "支持 Nginx, Apache, S3, Docker 等常见格式"}
          </p>
        </div>
      </div>

      <div className="w-full flex-1 space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-300">步骤 2</p>
            <h2 className="text-xl font-semibold">运行 SQL / 查看预览</h2>
            <p className="text-sm text-white/70">DuckDB 在浏览器内执行，数据全程本地。</p>
          </div>
          <div className={`text-sm ${status === "error" ? "text-red-200" : "text-white/70"}`}>
            {message}
          </div>
        </div>

        <AutoCharts
          statusData={statusChartData}
          timelineData={timelineChartData}
          isLoading={isChartLoading || status === "ingesting"}
          error={chartError}
        />

        <SqlEditor
          key={editorKey}
          onRun={handleRunQuery}
          isRunning={isRunningQuery}
          defaultSql={editorDefaultSql}
        />
        {queryError && <p className="text-sm text-red-300">{queryError}</p>}
        {status !== "ready" && !formattedRows.length ? (
          <ResultTableSkeleton />
        ) : (
          <ResultTable columns={tableData.columns} rows={formattedRows} caption="查询结果" />
        )}
      </div>
    </section>
  );
}
