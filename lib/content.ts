import type { LogFormat } from "@/types/content";

const FALLBACK_SQL = "SELECT * FROM log_table LIMIT 200;";

export function getFormatDefaultQuery(format?: LogFormat | null): string {
  if (!format) {
    return FALLBACK_SQL;
  }

  if (format.defaultSqlQuery && format.defaultSqlQuery.trim().length > 0) {
    return format.defaultSqlQuery;
  }

  const hasStatusColumn = /\bstatus\b/i.test(format.duckdb_schema);
  if (hasStatusColumn && format.common_errors?.length) {
    const sanitizedCodes: string[] = [];
    for (const rawCode of format.common_errors.filter(Boolean).slice(0, 3)) {
      const escaped = String(rawCode ?? "").replace(/'/g, "''");
      sanitizedCodes.push("'" + escaped + "'");
    }
    const codes = sanitizedCodes.join(", ");
    return `SELECT * FROM log_table WHERE status IN (${codes}) LIMIT 200;`;
  }

  return FALLBACK_SQL;
}

export { FALLBACK_SQL as DEFAULT_LOG_SQL };
