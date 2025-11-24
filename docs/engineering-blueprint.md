# LogAnalytics.org Engineering Blueprint

## 1. Mission & Guardrails
- Deliver a "zero backend" log analytics encyclopedia and in-browser workbench that can self-sustain traffic for 10+ years.
- Keep operating costs at zero: static deploy to Cloudflare Pages, all compute in-browser via DuckDB-Wasm + Web Workers.
- Ship privacy-first defaults: no log data leaves the user's machine; only metadata (format definitions, docs) is stored in the repo.
- Optimize for SEO-driven user acquisition: every log format + error code becomes a statically generated landing page with unique metadata and internal links.

## 2. Architecture Overview
| Layer | Decision |
| --- | --- |
| Runtime | Next.js 15 App Router, React Server Components for static shells + Client Components for DuckDB UI.
| Data Flow | Local files dragged into browser → DuckDB OPFS virtual FS → SQL queries → Tremor visualizations + tables.
| Compute Engine | `@duckdb/duckdb-wasm` manual bundles, single AsyncDuckDB instance per tab, worker-backed.
| UI Stack | Tailwind CSS + Shadcn/ui primitives + Tremor (charts) + Monaco for SQL editing.
| Persistence | IndexedDB (via `idb-keyval`) caches user SQL history & favorite regex presets; log content never stored.
| Deployment | `next build` + `npx @cloudflare/next-on-pages` for SSG/ISR bundle pushed to Cloudflare Pages; GitHub actions gate.
| Telemetry | Optional privacy-safe client metrics with localStorage opt-in (no network default).

## 3. Code Structure (Current & Target)
```
app/
  page.tsx                # Core tool (drag-drop + editor + preview)
  samples/page.tsx        # Download hub for curated sample logs
  format/[slug]/page.tsx  # SSG landing per log format (SEO)
  error/[slug]/page.tsx   # SSG landing per error code (SEO)
components/
  analysis/               # Dropzone, SqlEditor, ResultTable, Chart panels
  seo/                    # LogFormatCard, Breadcrumbs, FAQ toggle
  ui/                     # Button, Card, Sheet etc. (Shadcn wrappers)
lib/
  duckdb.ts               # Async DuckDB singleton + helpers
  log-parser.ts           # Regex-powered transformer → arrow table builder
  constants.ts            # Shared enums (categories, nav, OpenGraph defaults)
data/
  formats.json            # Primary SEO asset (log format catalog)
  errors.json             # Error encyclopedia (code, platform, fix steps)
  samples.json            # Metadata for downloadable sample files
public/samples/           # Binary/text fixtures served verbatim
next.config.ts            # `next-on-pages` + wasm loader config
```
Key rule: SSG-friendly routes must not import browser-only APIs at the module root. Use `"use client"` only where DuckDB or drag/drop logic lives.

## 4. Data Assets & Schemas
- `formats.json`
  - Minimum keys: `slug`, `name`, `description`, `category`, `fileExtension`, `regex`, `duckdb_schema`, `sample_line`, `common_errors[]`, `meta_title`, `meta_desc`.
  - Validation: write a Zod schema + unit test to ensure every entry has a valid slug and regex that compiles.
  - Generation: plan `scripts/generate-formats.ts` to auto-extend catalog via AI assist, but keep manual review before merge.
- `errors.json`
  - Keys: `code`, `platform`, `slug`, `title`, `symptom`, `sql_query`, `solution_steps[]`, optional `links`.
  - Usage: powers `/error/[slug]` SSG with structured troubleshooting flows + CTA to open tool pre-filtered.
- `samples.json`
  - Keys: `slug`, `format_slug`, `file`, `size`, `rows`, `description`, `use_cases[]`.
  - Paired binary/text artifacts live under `public/samples/` and are linked from samples page + format detail pages.
- All JSON lives in Git; treat as canonical knowledge base and expose via static imports (Next tree-shaking friendly).

## 5. Core Logic (Engine)
1. **DuckDB Initialization (`lib/duckdb.ts`):**
   - Manual bundle selection for MVP/EH builds, Web Worker instantiation, AsyncDuckDB singleton exported with helper to get shared connections.
   - Provide `withConnection<T>(callback)` util to guard lifecycle + cleanup.
2. **File Intake Pipeline:**
   - `Dropzone` accepts drag/drop or file picker; `FileReader` streams file headers for preview.
   - Register file with DuckDB using `registerFileHandle` (Browser Filereader protocol) for CSV/TSV/JSON.
   - Non-delimited logs: push rows into DuckDB via `read_text` + generated `regexp_extract` SELECT or pre-parse with JS and `insertJSON`.
3. **Format-aware Bootstrapping:**
   - Format landing pages deep-link to `/` with query params (`?format=nginx-access-log`), auto-loading the regex + schema into the tool.
   - Provide local IndexedDB map of user custom regex definitions with version stamping.
4. **Querying + Visualization:**
   - Default query: `SELECT * FROM log_table LIMIT 200`.
   - Result sets flow to `ResultTable` (virtualized) + Tremor charts for latencies, status counts, etc.
   - SQL Editor uses Monaco + snippets (common queries per format) stored in `/data/snippets.json` (future).
5. **Persistence & Sharing:**
   - Serialize session state (selected format, SQL text, chart config) to URL hash for shareable playbooks without storing data server-side.

## 6. SEO Matrix & Content Ops
- **Format Pages (`/format/[slug]`):**
  - `generateStaticParams` from `formats.json`; includes hero copy, regex snippet, DuckDB schema table, FAQ accordion, CTA button linking to tool with preset.
  - Metadata: unique `<title>`, `<meta description>`, OpenGraph image, JSON-LD (`Product` + `FAQPage`).
- **Error Pages (`/error/[slug]`):**
  - Provide synopsis (symptom, probable root causes), ready-to-run SQL filter, remediation steps, internal links back to parent format/platform.
  - Add HowTo JSON-LD to capture featured snippets.
- **Samples Page (`/samples`):**
  - Grid/list of downloadable fixtures with size, row count, associated format, SHA256 for trust.
- **Interlinking Strategy:**
  - Format pages list `common_errors` linking into error pages.
  - Error pages link back to recommended formats + direct CTA to run the SQL filter on the homepage tool.
  - Breadcrumb component + sitemap generated via `next-sitemap` (added once pages exist).
- **Content Velocity:**
  - Weekly addition of 3 new formats + 5 errors until hitting >100 entries; keep PR template enforcing metadata completeness.

## 7. Execution Roadmap (Optimized)
1. **Sprint 0 – Foundation (Week 1):** finalize repo layout, populate initial JSON (done), stub pages, write tests for data schemas, configure Tailwind + Shadcn baseline components.
2. **Sprint 1 – MVP Tooling (Week 2):** implement DuckDB init + CSV ingestion, Dropzone → ResultTable flow, preselect format via URL params, basic SEO pages rendering static data.
3. **Sprint 2 – Content & Deploy (Week 3):** expand catalogs to 20 formats / 30 errors, author docs, add JSON-LD + breadcrumbs, integrate `next-on-pages` + Cloudflare deploy pipeline + `next-sitemap` + GSC submission.
4. **Sprint 3 – Experience Polish (Weeks 4-5):** Monaco editor, Tremor dashboards, regex debugger panel, IndexedDB persistence, shareable links.
5. **Ongoing:** automation scripts for catalog updates, scheduled Lighthouse audits, rotate sample data quarterly.

For every sprint, define Definition of Done that includes `npm run lint`, `npm run test` (once added), `next build`, and docs update.

## 8. Operational Playbook
- **Local Dev:** `npm run dev` (Next), `npm run lint`, `npm run check-types`. Use `DUCKDB_BUNDLE` env toggles if testing alternative wasm bundles.
- **Testing:**
  - Unit tests for parsers and data validation via Vitest/Jest.
  - Playwright smoke for drag/drop + query flow (mock file via `File` API).
- **Release:** GitHub Action pipeline: install deps → lint → type-check → `next build` → upload to Cloudflare using API token.
- **Monitoring:** Cloudflare Pages analytics + periodic DuckDB wasm size check (<8 MB) to maintain LCP.

## 9. Backlog & Nice-to-haves
- AI-assisted regex helper (client-side) for new log formats, executed fully locally with WebAssembly models.
- Offline-ready PWA mode so incident response engineers can use the tool on airplane Wi-Fi.
- Community contribution model: add GitHub issue templates for new format/error submissions.
- Multi-language metadata once EN catalog stabilizes; gate behind feature flag to keep SEO consistent.

This document should be updated sprint-to-sprint as the catalog and engine evolve. Treat `/docs` as the single source of truth for architecture, data contracts, and growth tactics.
