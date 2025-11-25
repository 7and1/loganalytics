const items = [
  {
    q: "Do my logs leave the browser?",
    a: "Never. Files are streamed into DuckDB-Wasm via the FileReader protocol; Offline Shield blocks third-party fetches when enabled.",
  },
  {
    q: "Which formats auto-detect?",
    a: "We ship sniffers for CSV, JSON, AWS S3 Access, CloudFront, Docker JSON, Kubernetes ingress logs, and more via formats.json.",
  },
  {
    q: "Can I save queries?",
    a: "Yes. Use the URL template (?logType=nginx-access-log&query=...) or copy the SQL from the Developer HUD log pane for instant replays.",
  },
];

export function Faq() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div key={item.q} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-500">{item.q}</p>
            <p className="mt-2 text-sm text-slate-600">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
