export const metadata = {
  title: "Documentation",
  description: "SQL reference, ingestion tips, and troubleshooting for LogAnalytics.",
};

const sections = [
  {
    title: "SQL Reference",
    body: "LogAnalytics ships with vanilla DuckDB. COUNT, WINDOW, REGEXP functions, and JSON_EXTRACT are all available without restrictions.",
  },
  {
    title: "File Size Guidance",
    body: "We recommend < 1GB per ingest to keep memory pressure low. Files are streamed via FileReader, so the browser cap is your RAM.",
  },
  {
    title: "Rejects HUD",
    body: "The Developer HUD surfaces rejects_table rows (line, column, error). Enable Offline Shield if you want to block any accidental network I/O.",
  },
];

export default function DocsPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold">Documentation</h1>
        <p className="mt-2 text-zinc-400">Best practices for running LogAnalytics in secure environments.</p>
        <div className="mt-12 space-y-8">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-sm text-zinc-400">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
