import { initDuckDB } from "./duckdb";

export interface ProbeResult {
  success: boolean;
  validRows: number;
  rejectRows: number;
  details: Record<string, unknown>[];
  error?: string;
}

const PROBE_TABLE = "probe_raw";
const PROBE_REJECTS_TABLE = "probe_rejects";

export async function probeRejectsCapability(): Promise<ProbeResult> {
  if (typeof window === "undefined") {
    return {
      success: false,
      validRows: 0,
      rejectRows: 0,
      details: [],
      error: "Probe can only run in the browser",
    };
  }

  console.group("\ud83d\udd0d DuckDB Rejects Table Probe");

  const db = await initDuckDB();
  const conn = await db.connect();

  try {
    const badCsvContent = "id,name\n1,alice\n\"bob\",bob\n3,charlie";

    console.log("1. Registering bad CSV file...");
    await db.registerFileText("bad_sample.csv", badCsvContent);

    console.log("2. Running read_csv_auto with rejects_table...");
    await conn.query(`
      CREATE TABLE ${PROBE_TABLE} AS 
      SELECT * FROM read_csv(
        'bad_sample.csv',
        columns={'id': 'INTEGER', 'name': 'VARCHAR'},
        ignore_errors=true,
        rejects_table='${PROBE_REJECTS_TABLE}'
      )
    `);

    const validRows = await conn.query(`SELECT count(*) AS c FROM ${PROBE_TABLE}`);
    const rejectRows = await conn.query(`SELECT count(*) AS c FROM ${PROBE_REJECTS_TABLE}`);

    const validCount = Number(validRows.toArray()[0].c);
    const rejectCount = Number(rejectRows.toArray()[0].c);

    console.log("\u2705 Ingestion Complete.");
    console.log(`   - Valid Rows (Should be 2): ${validCount}`);
    console.log(`   - Reject Rows (Should be 1): ${rejectCount}`);

    if (rejectCount === 1 && validCount === 2) {
      console.log("\ud83c\udf89 SUCCESS: rejects_table is fully supported!");
      const details = await conn.query(`SELECT * FROM ${PROBE_REJECTS_TABLE}`);
      const detailRows = details
        .toArray()
        .map((row) => row.toJSON() as Record<string, unknown>);
      console.table(detailRows);
      return { success: true, validRows: validCount, rejectRows: rejectCount, details: detailRows };
    }

    console.warn("\u26a0\ufe0f WARNING: Counts do not match expectations.");
    const details = await conn.query(`SELECT * FROM ${PROBE_REJECTS_TABLE}`);
    const detailRows = details
      .toArray()
      .map((row) => row.toJSON() as Record<string, unknown>);
    return {
      success: false,
      validRows: validCount,
      rejectRows: rejectCount,
      details: detailRows,
      error: "Counts do not match expectations",
    };
  } catch (error) {
    console.error("\u274c PROBE FAILED:", error);
    return {
      success: false,
      validRows: 0,
      rejectRows: 0,
      details: [],
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await conn.query(`DROP TABLE IF EXISTS ${PROBE_TABLE}`);
    await conn.query(`DROP TABLE IF EXISTS ${PROBE_REJECTS_TABLE}`);
    await conn.close();
    console.groupEnd();
  }
}
