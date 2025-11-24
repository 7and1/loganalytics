import type { Table } from "apache-arrow";
import type { LogFormat } from "@/types/content";
import { DuckDBDataProtocol, initDuckDB } from "./duckdb";
import type { DuckDBConnection } from "./duckdb";
import { sniffCsvHeader } from "./csv-sniffer";
import type { HeaderDetectionResult } from "./csv-sniffer";

export interface IngestOptions {
  tableName?: string;
  previewRows?: number;
  debug?: boolean;
}

export interface IngestSummary {
  connection: DuckDBConnection;
  tableName: string;
  columns: string[];
  rows: Record<string, unknown>[];
  totalRows: number;
  errorRows: number;
  virtualPath: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
}

const DEFAULT_TABLE = "log_table";
const DEFAULT_PREVIEW = 100;

export async function ingestLogFile(
  file: File,
  format: LogFormat,
  options: IngestOptions = {}
): Promise<IngestSummary> {
  const db = await initDuckDB();
  const connection = await db.connect();
  const tableName = sanitizeIdentifier(options.tableName ?? DEFAULT_TABLE);
  const previewRows = options.previewRows ?? DEFAULT_PREVIEW;
  const errorsTable = `${tableName}_errors`;
  const rawTable = `${tableName}_raw`;
  const virtualPath = `${Date.now()}-${file.name}`;
  const headerInfo = await sniffCsvHeader(file);

  await connection.query(`DROP TABLE IF EXISTS ${tableName}`);
  await connection.query(`DROP TABLE IF EXISTS ${errorsTable}`);
  await connection.query(`DROP TABLE IF EXISTS ${rawTable}`);

  await db.registerFileHandle(virtualPath, file, DuckDBDataProtocol.BROWSER_FILEREADER, true);

  if (format.fileExtension.toLowerCase() === ".csv" || file.name.toLowerCase().endsWith(".csv")) {
    await loadCsv(connection, virtualPath, tableName, rawTable, errorsTable, headerInfo);
  } else {
    await loadRegex(connection, virtualPath, tableName, rawTable, errorsTable, format);
  }

  const preview = await connection.query(`SELECT * FROM ${tableName} LIMIT ${previewRows}`);
  const { columns, rows } = tableToRows(preview);

  const totalResult = await connection.query(`SELECT COUNT(*) AS total_rows FROM ${tableName}`);
  const { rows: totalRowsData } = tableToRows(totalResult);
  const totalRows = Number(totalRowsData[0]?.total_rows ?? 0);

  const errorResult = await connection.query(`SELECT COUNT(*) AS error_rows FROM ${errorsTable}`);
  const { rows: errorRowsData } = tableToRows(errorResult);
  const errorRows = Number(errorRowsData[0]?.error_rows ?? 0);

  return {
    connection,
    tableName,
    columns,
    rows,
    totalRows,
    errorRows,
    virtualPath,
  };
}

export async function runQuery(connection: DuckDBConnection, sql: string): Promise<QueryResult> {
  const table = await connection.query(sql);
  return tableToRows(table);
}

function sanitizeIdentifier(value: string): string {
  return value.replace(/[^a-zA-Z0-9_]/g, "_");
}

async function loadCsv(
  connection: DuckDBConnection,
  virtualPath: string,
  tableName: string,
  rawTable: string,
  errorsTable: string,
  headerInfo: HeaderDetectionResult
) {
  const usedRejectsTable = await tryLoadCsvWithRejects(
    connection,
    virtualPath,
    tableName,
    errorsTable,
    headerInfo
  );
  if (usedRejectsTable) {
    return;
  }

  await loadCsvWithDiffFallback(connection, virtualPath, tableName, rawTable, errorsTable, headerInfo);
}

async function tryLoadCsvWithRejects(
  connection: DuckDBConnection,
  virtualPath: string,
  tableName: string,
  errorsTable: string,
  headerInfo: HeaderDetectionResult
): Promise<boolean> {
  try {
    await connection.query(`
      CREATE TABLE ${tableName} AS
      SELECT *
      FROM read_csv_auto(
        '${virtualPath}',
        ignore_errors=true,
        rejects_table='${errorsTable}',
        skip=${headerInfo.headerOffset},
        header=${headerInfo.hasHeader ? "true" : "false"}
      )
    `);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.toLowerCase().includes("rejects_table")) {
      await connection.query(`DROP TABLE IF EXISTS ${tableName}`);
      await connection.query(`DROP TABLE IF EXISTS ${errorsTable}`);
      return false;
    }
    throw error;
  }
}

async function loadCsvWithDiffFallback(
  connection: DuckDBConnection,
  virtualPath: string,
  tableName: string,
  rawTable: string,
  errorsTable: string,
  headerInfo: HeaderDetectionResult
) {
  await connection.query(`
    CREATE TABLE ${tableName} AS
    SELECT *
    FROM read_csv_auto(
      '${virtualPath}',
      ignore_errors=true,
      skip=${headerInfo.headerOffset},
      header=${headerInfo.hasHeader ? "true" : "false"}
    )
  `);

  await connection.query(`
    CREATE TABLE ${rawTable} AS
    SELECT row_number() OVER () AS line_no, line AS csv_line
    FROM read_text('${virtualPath}')
  `);

  await connection.query(`
    CREATE TABLE ${errorsTable} AS
    WITH parsed_line_map AS (
      SELECT ${headerInfo.headerOffset + (headerInfo.hasHeader ? 2 : 1)} - 1 + row_number() OVER () AS line_no
      FROM ${tableName}
    )
    SELECT
      raw.line_no AS line,
      NULL::VARCHAR AS column,
      'Line skipped during CSV ingestion' AS error,
      raw.csv_line
    FROM ${rawTable} raw
    LEFT JOIN parsed_line_map mapped ON mapped.line_no = raw.line_no
    WHERE raw.line_no > ${headerInfo.headerOffset + (headerInfo.hasHeader ? 1 : 0)} AND mapped.line_no IS NULL
  `);

  await connection.query(`DROP TABLE IF EXISTS ${rawTable}`);
}

async function loadRegex(
  connection: DuckDBConnection,
  virtualPath: string,
  tableName: string,
  rawTable: string,
  errorsTable: string,
  format: LogFormat
) {
  await connection.query(`
    CREATE TABLE ${rawTable} AS
    SELECT row_number() OVER () AS line_no, text AS line
    FROM read_text('${virtualPath}')
  `);

  const schema = parseSchema(format.duckdb_schema);
  const regex = escapeSqlString(format.regex ?? "");

  const selectExpressions = schema
    .map((column, index) => {
      const ordinal = index + 1;
      const cast = column.type ? `TRY_CAST(regexp_extract(line, '${regex}', ${ordinal}) AS ${column.type})` : `regexp_extract(line, '${regex}', ${ordinal})`;
      return `${cast} AS ${column.name}`;
    })
    .join(",\n      ");

  await connection.query(`
    CREATE TABLE ${tableName} AS
    SELECT
      ${selectExpressions}
    FROM ${rawTable}
    WHERE regexp_matches(line, '${regex}')
  `);

  await connection.query(`
    CREATE TABLE ${errorsTable} AS
    SELECT line_no, line
    FROM ${rawTable}
    WHERE NOT regexp_matches(line, '${regex}')
  `);
}

function parseSchema(schema: string): { name: string; type: string }[] {
  return schema
    .split(",")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const [name, ...typeParts] = segment.split(/\s+/);
      return {
        name,
        type: typeParts.join(" ") || "VARCHAR",
      };
    });
}

function escapeSqlString(value: string): string {
  return value.replace(/'/g, "''");
}

function tableToRows(table: Table): { columns: string[]; rows: Record<string, unknown>[] } {
  const columns = table.schema.fields.map((field) => field.name as string);
  const rows: Record<string, unknown>[] = [];

  for (let rowIndex = 0; rowIndex < table.numRows; rowIndex += 1) {
    const row: Record<string, unknown> = {};
    columns.forEach((column, columnIndex) => {
      const columnVector = table.getChildAt(columnIndex);
      row[column] = columnVector?.get(rowIndex) ?? null;
    });
    rows.push(row);
  }

  return { columns, rows };
}
