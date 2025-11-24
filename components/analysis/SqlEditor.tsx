"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface SqlEditorProps {
  onRun: (sql: string) => Promise<void> | void;
  defaultSql?: string;
  isRunning?: boolean;
}

export default function SqlEditor({ onRun, defaultSql = "SELECT * FROM log_table LIMIT 50", isRunning = false }: SqlEditorProps) {
  const [sql, setSql] = useState(defaultSql);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          DuckDB SQL
        </p>
        <Button type="button" onClick={() => onRun(sql)} disabled={isRunning}>
          {isRunning ? "查询中..." : "运行"}
        </Button>
      </div>
      <textarea
        className="h-32 w-full rounded-xl border border-zinc-200 bg-black/[0.02] p-3 font-mono text-sm text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-zinc-800 dark:bg-white/5 dark:text-zinc-50"
        value={sql}
        onChange={(event) => setSql(event.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
