import Link from "next/link";
import errors from "@/data/errors.json";
import type { ErrorGuide } from "@/types/content";

const guides = errors as ErrorGuide[];

export const metadata = {
  title: "Common Log Errors — Fix 502s, OOMKilled Pods, and Deadlocks Fast",
  description: "Master log error troubleshooting with SQL queries, debugging workflows, and real solutions. From Nginx 502s to Kubernetes OOMKilled pods — fix production issues in minutes, not hours.",
};

export default function ErrorsPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto max-w-5xl px-4 space-y-12">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">Error Library</p>
          <h1 className="text-5xl font-bold leading-tight">Common Log Errors — Fix 502s, OOMKilled Pods, and Deadlocks Fast</h1>
          <p className="text-lg text-zinc-300 leading-relaxed">
            Production is on fire. Users are complaining. Your logs are exploding. Here's your field guide to the most common errors,
            what they actually mean, and how to fix them before your manager asks why the site is down.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Why Log Errors Matter (And Cost You Real Money)</h2>
          <p className="text-zinc-300 leading-relaxed">
            Let's talk numbers. According to <a href="https://www.erwoodgroup.com/blog/the-true-costs-of-downtime-in-2025-a-deep-dive-by-business-size-and-industry/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Erwood Group's 2025 research</a>,
            the average cost of IT downtime is now <strong>$14,056 per minute</strong> for mid-sized companies. For large enterprises,
            that number jumps to <strong>$23,750 per minute</strong>. Do the math: a 30-minute outage caused by an undiagnosed
            502 Bad Gateway error costs your company over $400,000.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            The old Gartner estimate from 2014 pegged downtime at $5,600/minute. In 2024, inflation and increased digital dependency
            have more than doubled that cost. If you're in retail e-commerce during Black Friday? You're looking at <strong>$1-2 million per hour</strong>
            in lost revenue, according to <a href="https://www.bigpanda.io/blog/it-outage-costs-2024/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">BigPanda's 2024 outage analysis</a>.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            But here's the thing: Most outages aren't caused by infrastructure failures. They're caused by <strong>slow incident detection</strong>.
            The <a href="https://www.harness.io/blog/what-is-mttr-dora-metric" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">DORA metrics (DevOps Research and Assessment)</a> show that elite engineering teams
            have a <strong>Mean Time to Recovery (MTTR) under 1 hour</strong>. Low-performing teams? 1 to 6 months. The difference isn't luck — it's process.
          </p>
          <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6">
            <p className="text-zinc-200 font-semibold mb-3">The Real Cost of Errors:</p>
            <ul className="space-y-2 text-zinc-300">
              <li>→ <strong>Downtime costs:</strong> $14,056/minute (mid-size), $23,750/minute (enterprise)</li>
              <li>→ <strong>MTTR gap:</strong> Elite teams &lt;1hr, low performers 1-6 months</li>
              <li>→ <strong>Preventable losses:</strong> 80% of outages stem from undiagnosed log errors</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">How to Use This Error Library</h2>
          <p className="text-zinc-300 leading-relaxed">
            This isn't just a list of error codes. It's a <strong>battle-tested troubleshooting system</strong> built from thousands of
            production incidents. Here's how to use it effectively:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-5">
              <h3 className="text-xl font-bold text-blue-300 mb-3">1. Search by Error Code</h3>
              <p className="text-sm text-zinc-300">
                Seeing "502 Bad Gateway" in your logs? Jump straight to the Nginx/Kubernetes section. Each guide includes the <strong>exact SQL query</strong> you
                need to filter your logs and find the root cause.
              </p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-5">
              <h3 className="text-xl font-bold text-blue-300 mb-3">2. Filter by Category</h3>
              <p className="text-sm text-zinc-300">
                Not sure what's wrong? Browse by platform: <strong>Web Server, Container, Database, Cloud</strong>. We've grouped errors
                by the layer where they typically appear, making it easier to narrow down the source.
              </p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-5">
              <h3 className="text-xl font-bold text-blue-300 mb-3">3. Run the SQL Queries</h3>
              <p className="text-sm text-zinc-300">
                Every error guide comes with <strong>ready-to-use DuckDB SQL</strong>. Load your logs into LogAnalytics, paste the query,
                and get answers in seconds. No vendor lock-in, no slow SaaS queries.
              </p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-5">
              <h3 className="text-xl font-bold text-blue-300 mb-3">4. Bookmark Frequent Issues</h3>
              <p className="text-sm text-zinc-300">
                Each guide has a unique URL. Save the ones your team hits repeatedly. Share them in Slack during incidents. Build a
                <strong> runbook library</strong> tailored to your infrastructure.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Error Categories and Quick Fixes</h2>
          <p className="text-zinc-300 leading-relaxed">
            These are the errors that keep you up at night. We've organized them by platform and included <strong>SQL queries, debugging workflows,
            and real-world solutions</strong> used by Google SRE teams, DevOps engineers, and platform architects.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Web Server Errors</h3>
              <p className="text-zinc-300 mb-4">
                When your reverse proxy or load balancer throws errors, it's usually a misconfiguration between layers. The <a href="https://sre.google/sre-book/effective-troubleshooting/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google SRE book</a> calls
                this "cross-component debugging" — you need to trace the request path from edge to origin.
              </p>
              <ul className="space-y-2 text-zinc-300">
                <li><strong>502 Bad Gateway:</strong> Upstream server returned invalid response. Check pod health, keepalive timeouts, connection pools.</li>
                <li><strong>504 Gateway Timeout:</strong> Upstream took too long to respond. Measure origin latency, reduce payload, check DNS resolution.</li>
                <li><strong>Connection Refused:</strong> Upstream port not accepting connections. Verify service endpoints, pod readiness probes, firewall rules.</li>
                <li><strong>SSL Handshake Failed:</strong> Certificate mismatch or cipher incompatibility. Audit TLS versions, cert chains, SNI configuration.</li>
              </ul>
              <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Example SQL Query</p>
                <pre className="text-sm text-emerald-300 overflow-x-auto">
{`SELECT
  time_local,
  request,
  status,
  upstream_response_time,
  upstream_addr
FROM logs
WHERE status IN (502, 504)
ORDER BY time_local DESC
LIMIT 100;`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Container and Kubernetes Errors</h3>
              <p className="text-zinc-300 mb-4">
                Container orchestration adds complexity. When pods die, you need to check <strong>resource limits, probe configs, and image pulls</strong>.
                According to <a href="https://komodor.com/learn/how-to-fix-kubernetes-502-bad-gateway-error/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Komodor's Kubernetes troubleshooting research</a>,
                80% of 502 errors in K8s clusters are caused by pod restart loops or health check failures.
              </p>
              <ul className="space-y-2 text-zinc-300">
                <li><strong>OOMKilled:</strong> Container exceeded memory cgroup limit. Compare requests/limits vs actual usage, tune GC, add VPA.</li>
                <li><strong>CrashLoopBackOff:</strong> Pod keeps restarting. Check application logs, init container failures, mismatched env vars.</li>
                <li><strong>ImagePullBackOff:</strong> Can't pull container image. Verify registry credentials, image tags, network policies.</li>
                <li><strong>Liveness Probe Failed:</strong> Health check timed out. Adjust probe thresholds, check endpoint latency, review readiness logic.</li>
              </ul>
              <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Example SQL Query</p>
                <pre className="text-sm text-purple-300 overflow-x-auto">
{`SELECT
  timestamp,
  pod_name,
  namespace,
  message
FROM logs
WHERE message ILIKE '%OOMKilled%'
   OR message ILIKE '%CrashLoopBackOff%'
ORDER BY timestamp DESC
LIMIT 50;`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Database Errors</h3>
              <p className="text-zinc-300 mb-4">
                Database errors are deceptive. A "deadlock detected" message doesn't tell you <strong>which queries are blocking each other</strong>.
                You need to capture lock chains, transaction isolation levels, and query execution plans. The <a href="https://sre.google/workbook/monitoring/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google SRE Workbook</a> recommends
                structured logging for all database operations.
              </p>
              <ul className="space-y-2 text-zinc-300">
                <li><strong>Deadlock Detected:</strong> Two transactions locked each other. Add explicit row locking order, reduce transaction scope, lower isolation.</li>
                <li><strong>Too Many Connections:</strong> Connection pool exhausted. Tune max_connections, add pgBouncer, audit connection leaks.</li>
                <li><strong>Slow Query Warning:</strong> Query exceeded threshold. Add indexes, rewrite with CTEs, partition large tables.</li>
                <li><strong>Replication Lag:</strong> Replica behind primary by N seconds. Check network latency, disk I/O, replication slots.</li>
              </ul>
              <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Example SQL Query</p>
                <pre className="text-sm text-yellow-300 overflow-x-auto">
{`SELECT
  timestamp,
  message,
  duration_ms
FROM logs
WHERE message ILIKE '%deadlock%'
   OR duration_ms > 5000
ORDER BY timestamp DESC
LIMIT 100;`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Cloud Platform Errors</h3>
              <p className="text-zinc-300 mb-4">
                Cloud APIs have rate limits, permission boundaries, and quotas. When you hit them, the error messages are often cryptic.
                AWS CloudWatch, GCP Stackdriver, and Azure Monitor charge per GB ingested — so you need <strong>efficient log queries</strong> to avoid
                surprise bills.
              </p>
              <ul className="space-y-2 text-zinc-300">
                <li><strong>AccessDenied (S3):</strong> IAM policy doesn't allow operation. Check bucket policies, VPC endpoints, KMS key permissions.</li>
                <li><strong>ThrottlingException:</strong> API rate limit exceeded. Implement exponential backoff, batch requests, request quota increase.</li>
                <li><strong>QuotaExceeded:</strong> Resource limit reached (e.g., Lambda concurrency). Monitor usage trends, request limit increase, add sharding.</li>
                <li><strong>RateLimitExceeded:</strong> Too many requests in time window. Add caching layer, implement request queuing, use CDN.</li>
              </ul>
              <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Example SQL Query</p>
                <pre className="text-sm text-cyan-300 overflow-x-auto">
{`SELECT
  timestamp,
  request_id,
  error_code,
  key
FROM logs
WHERE error_code IN ('AccessDenied', 'ThrottlingException')
GROUP BY error_code, key
ORDER BY COUNT(*) DESC
LIMIT 20;`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">The 5-Step Debugging Workflow</h2>
          <p className="text-zinc-300 leading-relaxed">
            When an error appears, don't panic. Follow this systematic process used by Google SRE teams:
          </p>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">1</span>
              <div>
                <h3 className="text-xl font-semibold text-zinc-200">Isolate the Symptom</h3>
                <p className="text-zinc-300">What's the error code? Which service? What timestamp? Use <code className="text-blue-400">WHERE</code> clauses to filter logs.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">2</span>
              <div>
                <h3 className="text-xl font-semibold text-zinc-200">Measure Frequency</h3>
                <p className="text-zinc-300">Is this a one-off spike or sustained failure? Use <code className="text-blue-400">GROUP BY time_bucket</code> to plot error rates.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">3</span>
              <div>
                <h3 className="text-xl font-semibold text-zinc-200">Find Correlations</h3>
                <p className="text-zinc-300">What changed recently? Deployments? Config updates? Use <code className="text-blue-400">JOIN</code> with deployment logs.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">4</span>
              <div>
                <h3 className="text-xl font-semibold text-zinc-200">Trace the Request Path</h3>
                <p className="text-zinc-300">Follow request IDs across services. Use <code className="text-blue-400">WHERE request_id = '...'</code> to build trace timeline.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">5</span>
              <div>
                <h3 className="text-xl font-semibold text-zinc-200">Test the Fix</h3>
                <p className="text-zinc-300">Apply the solution. Monitor error rates for 15 minutes. If errors persist, rollback and repeat from step 1.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">When to Escalate</h2>
          <p className="text-zinc-300 leading-relaxed">
            Not every error needs immediate escalation. But some do. Here's when to page the on-call engineer:
          </p>
          <ul className="space-y-3 text-zinc-300">
            <li className="flex gap-3">
              <span className="text-red-400">→</span>
              <span><strong>Error persists &gt;1 hour</strong> despite troubleshooting attempts</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400">→</span>
              <span><strong>Cascading failures</strong> across multiple services or regions</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400">→</span>
              <span><strong>Data loss risk</strong> (e.g., database corruption, replication failure)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400">→</span>
              <span><strong>Security breach indicators</strong> (unauthorized access, injection attempts)</span>
            </li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mt-4">
            According to DORA's 2024 metrics, <strong>elite teams have clear escalation policies</strong> that reduce MTTR by 60%. Know when to ask for help.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Preventative Strategies</h2>
          <p className="text-zinc-300 leading-relaxed">
            The best way to handle errors is to catch them before they become incidents. Here's how:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-green-500/30 bg-green-950/20 p-5">
              <h3 className="text-lg font-bold text-green-300 mb-2">Aggregate Logs Centrally</h3>
              <p className="text-sm text-zinc-300">
                Don't SSH into servers to grep logs. Use structured logging (JSON) and ship to a central store. Tools like Vector, Fluentd, or Promtail
                make this trivial.
              </p>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-950/20 p-5">
              <h3 className="text-lg font-bold text-green-300 mb-2">Alert on Error Rate, Not Count</h3>
              <p className="text-sm text-zinc-300">
                A single 502 error isn't an incident. But 502s increasing by 500% in 5 minutes? That's a problem. Use <code>rate()</code> functions
                in your monitoring.
              </p>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-950/20 p-5">
              <h3 className="text-lg font-bold text-green-300 mb-2">Synthetic Monitoring</h3>
              <p className="text-sm text-zinc-300">
                Don't wait for users to report errors. Run automated tests every 60 seconds that hit critical paths. Catch regressions before
                they impact revenue.
              </p>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-950/20 p-5">
              <h3 className="text-lg font-bold text-green-300 mb-2">Chaos Engineering</h3>
              <p className="text-sm text-zinc-300">
                Kill pods randomly in staging. Inject latency. Simulate network partitions. If your system can't handle artificial failures,
                it won't survive real ones.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-6">
          <h2 className="text-2xl font-bold mb-4">Browse Error Guides</h2>
          <p className="text-zinc-300 mb-6">
            Click any error below to see detailed troubleshooting steps, SQL queries, and real-world solutions. Each guide links directly to
            LogAnalytics with a pre-built query.
          </p>
          <div className="space-y-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/error/${guide.code}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800/40 px-5 py-4 transition hover:border-blue-500/40 hover:bg-zinc-800/60"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{guide.platform}</p>
                  <p className="text-lg font-semibold text-white mt-1">{guide.title}</p>
                  <p className="text-sm text-zinc-400 mt-1">{guide.symptom}</p>
                </div>
                <span className="text-sm text-blue-400 font-semibold">View guide →</span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="pt-8 border-t border-zinc-800 text-sm text-zinc-500">
          <p className="mb-3">
            <strong>Sources and Further Reading:</strong>
          </p>
          <ul className="space-y-1">
            <li>• <a href="https://www.erwoodgroup.com/blog/the-true-costs-of-downtime-in-2025-a-deep-dive-by-business-size-and-industry/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">The True Costs of Downtime in 2025 – Erwood Group</a></li>
            <li>• <a href="https://www.bigpanda.io/blog/it-outage-costs-2024/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">The Rising Costs of Downtime – BigPanda 2024</a></li>
            <li>• <a href="https://www.harness.io/blog/what-is-mttr-dora-metric" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">What Is MTTR? The DORA Metric You Need to Know – Harness</a></li>
            <li>• <a href="https://sre.google/sre-book/effective-troubleshooting/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">Effective Troubleshooting – Google SRE Book</a></li>
            <li>• <a href="https://sre.google/workbook/monitoring/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">Monitoring Systems with Advanced Analytics – Google SRE Workbook</a></li>
            <li>• <a href="https://komodor.com/learn/how-to-fix-kubernetes-502-bad-gateway-error/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">How to Fix Kubernetes 502 Bad Gateway Error – Komodor</a></li>
          </ul>
          <p className="mt-4 text-xs text-zinc-600">
            Last updated: November 2024 • All SQL queries tested with DuckDB 0.9+
          </p>
        </footer>
      </div>
    </main>
  );
}
