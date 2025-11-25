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
          <div key={item.title} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
