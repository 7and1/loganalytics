"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

interface StatusDatum {
  status: string;
  count: number;
  [key: string]: string | number;
}

interface TimelineDatum {
  bucket: string;
  count: number;
  [key: string]: string | number;
}

interface AutoChartsProps {
  statusData: StatusDatum[];
  timelineData: TimelineDatum[];
  isLoading?: boolean;
  error?: string | null;
}

const STATUS_COLORS = ["#22d3ee", "#0ea5e9", "#3b82f6", "#818cf8", "#a855f7", "#f472b6", "#fb7185", "#fbbf24", "#34d399", "#38bdf8"];

export function AutoCharts({ statusData, timelineData, isLoading, error }: AutoChartsProps) {
  const hasCharts = statusData.length > 0 || timelineData.length > 0;
  const showSkeleton = isLoading && !hasCharts;

  if (!hasCharts && !isLoading && !error) {
    return null;
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-300">Charts unavailable: {error}</p>}
      {isLoading && <p className="text-sm text-zinc-400">Generating instant charts...</p>}
      {showSkeleton ? (
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {statusData.length > 0 && (
            <div className="rounded-3xl border border-zinc-200/40 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-gradient-to-br dark:from-[#0b1120]/90 dark:via-[#111827]/90 dark:to-[#0f172a]/90">
            <div className="mb-3 text-sm font-medium uppercase tracking-wide text-emerald-200">
              Status Breakdown
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    stroke="var(--chart-stroke, #020617)"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={entry.status} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.9)",
                      borderRadius: 8,
                      border: "none",
                      color: "#f8fafc",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              {statusData.map((entry, index) => (
                <div key={entry.status} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[index % STATUS_COLORS.length] }}
                  />
                  <span className="truncate">{entry.status || "(blank)"}</span>
                  <span className="ml-auto font-mono">{entry.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
            </div>
          )}
          {timelineData.length > 0 && (
            <div className="rounded-3xl border border-zinc-200/40 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-gradient-to-br dark:from-[#0b1120]/90 dark:via-[#0f1627]/90 dark:to-[#0a1120]/90">
            <div className="mb-3 text-sm font-medium uppercase tracking-wide text-sky-200">
              Request Timeline (minute)
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timelineData} margin={{ left: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                  <XAxis dataKey="bucket" tick={{ fontSize: 10, fill: "#cbd5f5" }} hide={timelineData.length > 15} />
                  <YAxis tick={{ fontSize: 10, fill: "#cbd5f5" }} width={40} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.9)",
                      borderRadius: 8,
                      border: "none",
                      color: "#f8fafc",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 2, 2]} fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-zinc-200/50 bg-white/70 p-4 shadow-sm dark:border-zinc-900 dark:bg-zinc-900/60">
      <div className="mb-3 h-4 w-32 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-800" />
      <div className="h-48 w-full animate-pulse rounded-2xl bg-zinc-200/70 dark:bg-zinc-800" />
    </div>
  );
}
