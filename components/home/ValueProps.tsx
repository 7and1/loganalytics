import { Database, ShieldCheck, Zap } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "Query-ready in seconds",
    body: "DuckDB parses multi-gigabyte CSVs/JSONs entirely in-memory. Preview 200 rows before you finish a sip of coffee.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy baked in",
    body: "Offline Shield blocks outbound fetches. Your production logs never leave the browser session.",
  },
  {
    icon: Database,
    title: "SQL + Auto-Charts",
    body: "Kick off aggregations, watch status donuts and latency timelines render automatically via Recharts.",
  },
];

export function ValueProps() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/5 bg-zinc-900/60 p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
              <item.icon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
