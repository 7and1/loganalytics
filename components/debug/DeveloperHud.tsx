"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebugStore } from "@/lib/store/debug";
import { cn } from "@/lib/utils";

type Tab = "sql" | "health" | "perf";

export function DeveloperHud() {
  const { logs, stats, isHudOpen, toggleHud } = useDebugStore();
  const [activeTab, setActiveTab] = useState<Tab>("sql");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "sql" && isHudOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, activeTab, isHudOpen]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "`") {
        event.preventDefault();
        toggleHud();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggleHud]);

  const rejectPercent = useMemo(() => {
    if (!stats.totalRows || stats.totalRows === 0) {
      return 0;
    }
    return Number(((stats.rejectRows / stats.totalRows) * 100).toFixed(2));
  }, [stats.rejectRows, stats.totalRows]);

  const handleCopy = useCallback(async (logId: string, query: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(query);
      setCopiedId(logId);
      setTimeout(() => setCopiedId((current) => (current === logId ? null : current)), 1500);
    } catch (error) {
      console.warn("Failed to copy query", error);
    }
  }, []);

  if (!isHudOpen) {
    return (
      <button
        type="button"
        onClick={toggleHud}
        className="fixed bottom-4 right-4 z-[9999] rounded-full border border-zinc-700 bg-zinc-900/90 p-2 text-xl text-green-400 shadow-xl transition hover:scale-110"
        title="Toggle Developer HUD (Ctrl + `)"
      >
        🐞
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex h-80 flex-col border-t border-zinc-800 bg-zinc-950/95 font-mono text-xs text-zinc-300 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2">
        <div className="flex items-center gap-4">
          <span className="font-bold text-green-400">DEV HUD</span>
          <div className="flex gap-1 rounded bg-zinc-800 p-0.5">
            <TabBtn id="sql" label="SQL Log" active={activeTab} set={setActiveTab} />
            <TabBtn id="health" label="Data Health" active={activeTab} set={setActiveTab} />
            <TabBtn id="perf" label="Performance" active={activeTab} set={setActiveTab} />
          </div>
        </div>
        <div className="flex items-center gap-4 text-zinc-500">
          <span>
            Rows: <span className="text-zinc-200">{stats.totalRows.toLocaleString()}</span>
          </span>
          <span>
            Rejects:
            <span
              className={cn(
                "ml-1 font-bold",
                stats.rejectRows > 0 ? "text-red-400" : "text-zinc-200"
              )}
            >
              {stats.rejectRows.toLocaleString()}
            </span>
          </span>
          <button type="button" onClick={toggleHud} className="ml-2 text-lg hover:text-white">
            ✕
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {activeTab === "sql" && (
          <div ref={scrollRef} className="h-full overflow-auto px-4 py-3">
            {logs.length === 0 && <div className="text-zinc-600 italic">No queries executed yet.</div>}
            {logs.map((log) => (
              <button
                key={log.id}
                type="button"
                onClick={() => handleCopy(log.id, log.query)}
                className="group flex w-full items-start gap-3 rounded border border-transparent px-2 py-1 text-left transition hover:border-zinc-700 hover:bg-zinc-900/60"
              >
                <span className="select-none text-zinc-600">[{log.timestamp}]</span>
                <span
                  className={cn(
                    "w-16 shrink-0 text-right",
                    log.error ? "text-red-400" : "text-green-500"
                  )}
                >
                  {log.durationMs}ms
                </span>
                <span className={cn("flex-1 break-all", log.error ? "text-red-300" : "text-blue-300")}>{log.query}</span>
                {log.error && <span className="text-red-400">Error: {log.error}</span>}
                {copiedId === log.id && (
                  <span className="text-[10px] uppercase tracking-wide text-emerald-400">Copied</span>
                )}
              </button>
            ))}
          </div>
        )}

        {activeTab === "health" && (
          <div className="grid h-full grid-cols-2 gap-8 overflow-auto px-6 py-6">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                Current Ingestion Status
              </h3>
              <div className="space-y-4">
                <StatRow label="Filename" value={stats.filename ?? "No file loaded"} />
                <StatRow label="Total Rows Parsed" value={stats.totalRows.toLocaleString()} />
                <StatRow label="Valid Rows" value={stats.validRows.toLocaleString()} color="text-green-400" />
                <StatRow
                  label="Rejected Rows"
                  value={stats.rejectRows.toLocaleString()}
                  color={stats.rejectRows > 0 ? "text-red-400" : "text-zinc-400"}
                />
              </div>
              {stats.rejectRows > 0 && (
                <div className="mt-6 rounded border border-red-900/50 bg-red-900/20 p-3 text-red-300">
                  ⚠️ <strong>Data Quality Alert:</strong> {rejectPercent}% of rows were dropped.
                  <p className="mt-2 text-xs opacity-70">
                    Inspect the rejects table or the raw text staging table to debug.
                  </p>
                </div>
              )}
            </div>
            <div className="rounded border border-zinc-800 bg-zinc-900/60 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Quality Snapshot
              </h3>
              <div className="mt-4 space-y-4 text-[11px]">
                <div>
                  <p className="text-zinc-500">Reject Rate</p>
                  <div className="mt-2 h-2 w-full rounded-full bg-zinc-800">
                    <div
                      className={cn(
                        "h-2 rounded-full",
                        rejectPercent > 5 ? "bg-red-500" : "bg-emerald-500"
                      )}
                      style={{ width: `${Math.min(rejectPercent, 100)}%` }}
                    />
                  </div>
                  <p className="mt-1 font-mono text-sm text-zinc-200">{rejectPercent}%</p>
                </div>
                <div>
                  <p className="text-zinc-500">Header Strategy</p>
                  <p className="font-mono text-sm text-zinc-200">
                    {stats.validRows === 0 && stats.totalRows === 0
                      ? "Awaiting sample"
                      : stats.rejectRows > 0
                        ? "Diff fallback engaged"
                        : "Native rejects_table"}
                  </p>
                  <p className="mt-1 text-zinc-500">
                    Tune `inferHeaderOffset` when reject rate spikes on headerless feeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "perf" && (
          <div className="flex h-full items-center justify-center px-6 py-6 text-center">
            <div>
              <div className="mb-2 text-4xl font-bold text-zinc-100">{stats.parseTimeMs}ms</div>
              <div className="text-xs uppercase tracking-wide text-zinc-500">Total Parse Time</div>
              <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                <div className="rounded border border-zinc-800 bg-zinc-900 p-4">
                  <div className="text-[10px] uppercase tracking-wide text-zinc-500">Speed</div>
                  <div className="text-xl text-blue-400">
                    {stats.parseTimeMs > 0
                      ? Math.round((stats.totalRows / stats.parseTimeMs) * 1000).toLocaleString()
                      : 0} rows/sec
                  </div>
                </div>
                <div className="rounded border border-zinc-800 bg-zinc-900 p-4">
                  <div className="text-[10px] uppercase tracking-wide text-zinc-500">Avg Row Time</div>
                  <div className="text-xl text-blue-400">
                    {stats.totalRows > 0 ? (stats.parseTimeMs / stats.totalRows).toFixed(4) : 0} ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabBtn({
  id,
  label,
  active,
  set,
}: {
  id: Tab;
  label: string;
  active: Tab;
  set: (tab: Tab) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => set(id)}
      className={cn(
        "rounded px-3 py-1 text-xs transition",
        active === id ? "bg-zinc-700 text-white shadow" : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
      )}
    >
      {label}
    </button>
  );
}

function StatRow({
  label,
  value,
  color = "text-zinc-200",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px]">
      <span className="text-zinc-500">{label}</span>
      <span className={cn("font-mono font-medium", color)}>{value}</span>
    </div>
  );
}
