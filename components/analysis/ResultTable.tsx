import type { ReactNode } from "react";

export interface ResultTableProps {
  columns: string[];
  rows: Record<string, ReactNode>[];
  caption?: string;
}

export default function ResultTable({ columns, rows, caption }: ResultTableProps) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        No data yet. Upload a log or run a query first.
      </div>
    );
  }

  return (
    <div className="max-h-[520px] overflow-auto rounded-2xl border border-blue-100 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-blue-100 text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-10">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-xs text-blue-700 whitespace-nowrap"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-blue-50/50 transition-colors duration-150"
            >
              {columns.map((column) => (
                <td
                  key={`${column}-${rowIndex}`}
                  className="px-4 py-3 text-xs text-slate-700 font-mono whitespace-nowrap"
                >
                  {row[column] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ResultTableSkeleton({ columns = 6, rows = 5 }: { columns?: number; rows?: number }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-white p-6 shadow-sm">
      {/* Header skeleton */}
      <div className="mb-4 flex gap-3">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div
            key={`header-${colIndex}`}
            className="h-5 flex-1 animate-pulse rounded-md bg-blue-200/40"
          />
        ))}
      </div>

      {/* Rows skeleton */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-3">
            {Array.from({ length: columns }).map((__, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="h-8 flex-1 animate-pulse rounded-lg bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 bg-[length:200%_100%] animate-shimmer"
                style={{
                  animationDelay: `${(rowIndex * 0.05 + colIndex * 0.02)}s`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
