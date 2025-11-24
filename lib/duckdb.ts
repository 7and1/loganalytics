import * as duckdb from "@duckdb/duckdb-wasm";
let db: duckdb.AsyncDuckDB | null = null;

export async function initDuckDB() {
  if (typeof window === "undefined") {
    throw new Error("DuckDB-Wasm must run in the browser context");
  }

  if (db) {
    return db;
  }

  const bundle = await duckdb.selectBundle(duckdb.getJsDelivrBundles());
  const worker = bundle.mainWorker as unknown as Worker;
  const logger = new duckdb.ConsoleLogger();
  db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  return db;
}

export const DuckDBDataProtocol = duckdb.DuckDBDataProtocol;
export type DuckDBConnection = duckdb.AsyncDuckDBConnection;
