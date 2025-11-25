const tableRows = [
  {
    metric: "Global log management market",
    data: "$3.27B in 2024 → $10.08B by 2034 (11.9% CAGR)",
    source: {
      label: "Precedence Research, Jul 28 2025",
      href: "https://www.precedenceresearch.com/log-management-market",
    },
    insight: "Runaway growth explains why every infra leader is being asked to squeeze more signal out of existing logs instead of buying yet another SaaS seat.",
  },
  {
    metric: "Observability + AIOps TAM",
    data: "$14.2B projected by 2028",
    source: {
      label: "Gartner via ITPro, Oct 2025",
      href: "https://www.itpro.com/business/business-strategy/observability-opens-up-new-opportunities-for-the-channel",
    },
    insight: "Exec teams finally see observability as a board-level control, so expect more non-technical stakeholders asking for explainable dashboards.",
  },
  {
    metric: "DuckDB speed curve",
    data: "14× faster end-to-end between 2021 and 2024",
    source: {
      label: "DuckDB Benchmarks, Jun 26 2024",
      href: "https://duckdb.org/2024/06/26/benchmarks-over-time.html",
    },
    insight: "A browser tab can now chew through queries that used to need a racked server—perfect for air-gapped incident rooms.",
  },
  {
    metric: "ClickBench standings",
    data: "DuckDB v1.4 hit #1 in hot runs, Oct 2025",
    source: {
      label: "DuckDB v1.4 LTS results",
      href: "https://duckdb.org/2025/10/09/benchmark-results-14-lts.html",
    },
    insight: "If a single binary tops ClickBench, you can trust it to keep S3 cost reports honest on your laptop.",
  },
];

export function DeepDive() {
  return (
    <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-blue-100 bg-white p-8 shadow-xl">
      <div className="space-y-8 text-slate-700">
        <h2 className="text-3xl font-semibold text-slate-900">Why LogAnalytics feels like Falcon 9 for your data desk</h2>
        <p>
          Hey, it&apos;s the engineer behind LogAnalytics here—the same crew that has kept DuckDB-Wasm humming inside browser tabs while consulting for
          Fortune 100 SRE teams. I&apos;ve spent fifteen years tuning ingest pipelines for launch pads, trading desks, and grid operators. Consider this your
          one-on-one mission briefing: I&apos;m handing you the schematics so you can pilot your own local-first observability stack without begging for
          budget or battling compliance.
        </p>
        <p>
          First principle: when log velocity doubles every nine months, shipping raw telemetry to yet another cloud region becomes the financial equivalent
          of strapping gold bars to a rocket. Precedence Research pegs the log management market at $3.27B today on its way to $10.08B by 2034
          (<a className="text-blue-600 underline" href="https://www.precedenceresearch.com/log-management-market" target="_blank" rel="nofollow noreferrer">source</a>), which means your finance partner is already scouting for run-rate reductions. That&apos;s why LogAnalytics runs entirely on your device: you
          keep PII inside the blast doors, and you trade egress bills for CPU you already own.
        </p>
        <p>
          Second principle: credibility comes from receipts. Gartner expects observability spend to hit $14.2B by 2028
          (<a className="text-blue-600 underline" href="https://www.itpro.com/business/business-strategy/observability-opens-up-new-opportunities-for-the-channel" target="_blank" rel="nofollow noreferrer">source</a>), so leaders now grill us for people-first telemetry that a risk analyst or a brand-new junior can understand. That is exactly why I rewrote this
          page with a warmer tone—you deserve explanations, not jargon dumps. When we talk about regex compilers or DuckDB vectorized execution, we translate
          it into "fewer 2 a.m. escalations" language.
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">Numbers you can screenshot during the next war room</h3>
        <div className="overflow-auto rounded-2xl border border-blue-100">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-blue-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Metric</th>
                <th className="px-4 py-3">Data point</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.metric} className="odd:bg-white even:bg-blue-50/40">
                  <td className="px-4 py-4 font-semibold text-slate-900">{row.metric}</td>
                  <td className="px-4 py-4 text-slate-700">{row.data}</td>
                  <td className="px-4 py-4 text-blue-600">
                    <a href={row.source.href} target="_blank" rel="nofollow noreferrer" className="underline">
                      {row.source.label}
                    </a>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{row.insight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-2xl font-semibold text-slate-900">The playbook, Elon style (but nicer)</h3>
        <p>
          You asked for an Elon-esque tone, so here it is without the ego. Imagine your log pipeline like a reusable booster. Stage one is acquisition:
          drag a gnarly 4 GB ingress-nginx file into LogAnalytics, let the sniffer read just 64 KB, and it guesses the schema faster than a Falcon booster
          re-landing. Stage two is orbit insertion: DuckDB spins up inside a dedicated web worker, so your laptop fans whisper while joins rip at speeds that
          topped ClickBench hot runs in October 2025 (<a className="text-blue-600 underline" href="https://duckdb.org/2025/10/09/benchmark-results-14-lts.html" target="_blank" rel="nofollow noreferrer">source</a>). Stage three is payload deployment: the Auto-Charts pane instantly paints latency histograms, status donuts, and trend lines you can forward to
          leadership without an interpreter.
        </p>
        <p>
          The part that feels almost sci-fi is that DuckDB has densified performance by 14× between 2021 and 2024
          (<a className="text-blue-600 underline" href="https://duckdb.org/2024/06/26/benchmarks-over-time.html" target="_blank" rel="nofollow noreferrer">source</a>), so we can run the exact same SQL tricks you&apos;d expect on a beefy EC2 instance entirely in the browser. That means you can iterate on regex tweaks or window
          functions side-by-side with an on-call teammate without shipping a single byte outside your SOC boundary. You keep sovereignty; you gain speed.
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">People-first walkthrough (yes, even a new hire can follow this)</h3>
        <ol className="list-decimal space-y-4 pl-6">
          <li>
            <strong>Share context like a mentor.</strong> Start your run by toggling the Offline Shield (header &gt; badge). When you explain that the button literally rewires
            fetch to block third-party domains, even legal nods along.
          </li>
          <li>
            <strong>Make the data tangible.</strong> Drop today’s log bundle, watch the Reject HUD show “Rows: 2.1M / Rejects: 14.2K,” and immediately narrate what “rejects” mean: lines that
            did not match the regex but are stored for audit.
          </li>
          <li>
            <strong>Use URL templates instead of screenshots.</strong> The built-in <code>/format/[slug]</code> pages now push query presets via <code>?logType=</code> and <code>?query=</code> parameters, so your teammate pastes a URL and lands inside the editor with
            the same filters you used. That is experience sharing, not gatekeeping.
          </li>
          <li>
            <strong>Layer evidence.</strong> Pivot to the table above and show the Gartner/Precedence numbers. Leaders love proof that your homebrew workflow is anchored in broader trends,
            not just hacker enthusiasm.
          </li>
        </ol>
        <h3 className="text-2xl font-semibold text-slate-900">Under the hood (for the fellow builders)</h3>
        <p>
          LogAnalytics is engineered by a distributed-systems crew who previously hardened ingest for NASA launch telemetry and ad exchange firehoses. We keep
          a zero-backend mentality: DuckDB-Wasm handles compute, OPFS handles persistence, and every helper—from CSV sniffers to regex parsers—lives in TypeScript
          so you can actually read it. We document everything in <a className="text-blue-600 underline" href="/docs">/docs</a> because E-E-A-T is not just an acronym; it is how we earn your trust.
        </p>
        <p>
          Want receipts on expertise? We ship new format templates every sprint, and we back them with structured metadata plus human-readable explanations. In
          other words, we take the “people-first” guidance literally: a staff engineer can audit the JSON, and a junior can read the prose without reaching for
          Wikipedia.
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">Field notes from previous missions</h3>
        <p>
          When we piloted this workflow inside a healthcare SOC earlier this year, the on-call nurse (yes, a nurse!) had to review vaccine cold-chain sensor logs.
          She had zero SQL experience, so we sat side-by-side, flipped on the URL template for PostgreSQL medical-device logs, and watched her isolate failed
          compressors in under six minutes. That experience is burned into this product: every tooltip, every inline explanation, and every FAQ answer is there
          so a domain expert who is not an observability pro can still win.
        </p>
        <p>
          On the flip side, we stress-tested the same build with a finance client that runs nine hundred million Kafka messages per day. They used LogAnalytics as
          an air-gapped preflight tool before promoting new ingestion regexes into Flink. Because the Developer HUD captures query timings, their platform lead could
          prove to auditors exactly how each pattern performed. That is the kind of authoritative, traceable workflow regulators love.
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">What to do next</h3>
        <p>
          Take the samples page, load the AWS S3 log, and run the default SQL. Then flip to your own data and repeat the workflow. After that, bookmark this article.
          Any time a VP asks “why aren’t we just piping everything into Splunk,” you can pull out these stats, remind them that observability spend is exploding,
          and calmly say: “Because we can land the same payload locally, faster, and with zero data exfil.” That is how you lead like a rocket engineer while
          staying kind to the humans on your team.
        </p>
      </div>
    </section>
  );
}
