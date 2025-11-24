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
        暂无数据，请先上传日志或运行查询。
      </div>
    );
  }

  return (
    <div className="max-h-[420px] overflow-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-zinc-50/70 dark:bg-zinc-900/50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-2 text-left font-semibold uppercase tracking-wide text-xs text-zinc-500 dark:text-zinc-400"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white/80 dark:bg-zinc-900/40">
              {columns.map((column) => (
                <td key={`${column}-${rowIndex}`} className="px-4 py-2 text-xs text-zinc-800 dark:text-zinc-100">
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
    <div className="rounded-2xl border border-zinc-200 bg-white/60 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-3">
            {Array.from({ length: columns }).map((__, colIndex) => (
              <span
                key={`${rowIndex}-${colIndex}`}
                className="h-6 flex-1 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-800"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
