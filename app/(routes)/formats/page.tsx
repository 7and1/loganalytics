import formatsData from "@/data/formats";
import LogFormatCard from "@/components/seo/LogFormatCard";
import type { LogFormat } from "@/types/content";

const formats = formatsData as LogFormat[];

export const metadata = {
  title: "Supported Log Formats — Parse Nginx, Apache, AWS, Kubernetes Logs | LogAnalytics",
  description: "Complete catalog of log formats supported by LogAnalytics. Auto-detect nginx, Apache, S3, Kubernetes, Docker, PostgreSQL, and more. Includes regex patterns, DuckDB schemas, and performance benchmarks.",
  keywords: ["log formats", "log analytics formats", "nginx log parser", "apache log format", "kubernetes logs", "docker logs", "log format detection"],
};

export default function FormatsPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto w-full max-w-5xl px-4">

        {/* Hero Section */}
        <h1 className="text-4xl font-bold">Supported Log Formats — Parse Nginx, Apache, AWS, Kubernetes Logs with SQL</h1>
        <p className="mt-4 text-xl text-zinc-300">
          Look, parsing logs shouldn't feel like decoding ancient hieroglyphics. Our auto-detection engine supports 15+
          common formats out of the box—plus custom regex for the weird stuff your team invented.
        </p>

        {/* Why Format Matters */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Why Log Format Matters</h2>
          <div className="space-y-4 text-zinc-300">
            <p>
              Every log file is basically a stream of unstructured text. Parsing means translating that chaos into a SQL table
              with proper columns, data types, and timestamps. Get the format wrong? Your <code className="bg-black/40 px-2 py-1 rounded text-sm">status</code> column
              contains garbage. Your time-series queries return nonsense. You waste hours debugging regex.
            </p>
            <p>
              <strong>Auto-detection saves you from this hell.</strong> We scan the first 64 KB of your file, pattern-match
              against 15+ format signatures, and return a confidence score. If we're 95%+ confident, we auto-apply the parser.
              If not, you get a dropdown to choose manually.
            </p>
            <p>
              Standard formats (Nginx, Apache, AWS S3) have been battle-tested across millions of log files. Custom formats?
              That's a week of your life you'll never get back—trial and error with regex until 3am. We'd rather you spend
              that time actually analyzing your logs.
            </p>
          </div>
        </section>

        {/* How Auto-Detection Works */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">How Auto-Detection Works</h2>
          <div className="space-y-4 text-zinc-300">
            <p>
              When you drop a log file into LogAnalytics, here's what happens behind the scenes:
            </p>

            <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-6">
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  <strong>Sample the file</strong>: We read the first <strong>64 KB</strong> (~200-500 lines for typical logs).
                  This is fast—even on 5GB files, sampling takes ~50ms.
                </li>
                <li>
                  <strong>Pattern matching</strong>: Each format has a regex signature. We test all 15+ signatures against
                  your sample and count matches. Example: If 198 out of 200 lines match Nginx combined format, confidence = 99%.
                </li>
                <li>
                  <strong>Confidence scoring</strong>: We use a threshold of <strong>80%</strong>. Below that, we show you
                  the top 3 candidates and let you pick. Above 80%? We auto-apply.
                </li>
                <li>
                  <strong>Manual override</strong>: Always available. Click "Override Format" if auto-detection guesses wrong
                  (happens ~6% of the time on edge cases like custom application logs).
                </li>
              </ol>
            </div>

            <p className="text-sm text-zinc-400 mt-4">
              Pro tip: If you're mixing log formats in one file (don't do this), auto-detection will pick whichever format
              has the most lines. Split your files first or use manual override.
            </p>

            <p className="mt-4">
              <strong>Regex compilation cost</strong>: Once a format is selected, we compile the regex pattern <em>once</em>
              and reuse it for all rows. This is why JSON logs parse 2-3× faster than regex-based formats—JSON parsing is
              native in JavaScript, regex requires{" "}
              <a href="https://duckdb.org/docs/sql/functions/pattern_matching" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                DuckDB's RE2 engine
              </a> which adds overhead.
            </p>
          </div>
        </section>

        {/* Format Categories */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Format Categories</h2>

          {/* Web Server Logs */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Web Server Logs</h3>
            <div className="space-y-4 text-zinc-300">
              <p>
                The bread and butter of log analytics. Web server logs tell you who's hitting your site, which endpoints
                are slow, and where your 502 errors are coming from.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">Nginx (Combined & Access)</h4>
                  <p className="text-sm mt-2">
                    The default format for the world's most popular reverse proxy. Includes request method, path, status,
                    response time, referer, and user-agent.
                  </p>
                  <p className="text-xs text-zinc-400 mt-3">
                    <strong>Example</strong>: <code className="bg-black/40 px-1 py-0.5 rounded">172.16.0.1 - - [01/Jan/2024:12:00:00 +0000] "GET /api/users HTTP/1.1" 200 1234 "-" "curl/7.68"</code>
                  </p>
                  <p className="text-xs text-emerald-400 mt-2">
                    ✓ Auto-detected 98% of the time
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">Apache (Combined & Common)</h4>
                  <p className="text-sm mt-2">
                    The OG web server format. Combined log includes referer and user-agent. Common log format (CLF) is
                    the minimal version.
                  </p>
                  <p className="text-xs text-zinc-400 mt-3">
                    <strong>Example</strong>: <code className="bg-black/40 px-1 py-0.5 rounded">127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326</code>
                  </p>
                  <p className="text-xs text-emerald-400 mt-2">
                    ✓ Auto-detected 96% of the time
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">IIS (W3C Extended)</h4>
                  <p className="text-sm mt-2">
                    Windows web server format. Tab-separated values with customizable fields. Header row defines columns.
                  </p>
                  <p className="text-xs text-zinc-400 mt-3">
                    Fields: date, time, s-ip, cs-method, cs-uri-stem, cs-uri-query, s-port, cs-username, c-ip, cs(User-Agent), sc-status, sc-substatus, sc-win32-status, time-taken
                  </p>
                  <p className="text-xs text-emerald-400 mt-2">
                    ✓ Auto-detected 92% of the time
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-5 mt-6">
                <p className="font-semibold text-white mb-2">Use Cases:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Flash sale traffic analysis</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT DATE_TRUNC('minute', timestamp), COUNT(*) FROM logs GROUP BY 1</code></li>
                  <li><strong>Bot detection</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">WHERE user_agent LIKE '%bot%' OR user_agent LIKE '%crawler%'</code></li>
                  <li><strong>CDN cache hit ratios</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT cache_status, COUNT(*) FROM logs GROUP BY 1</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cloud Platform Logs */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Cloud Platform Logs</h3>
            <div className="space-y-4 text-zinc-300">
              <p>
                Cloud providers love proprietary formats. AWS S3 access logs look nothing like GCP HTTP Load Balancer logs.
                We support the major ones so you don't have to write custom parsers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">AWS S3 Access Logs</h4>
                  <p className="text-sm mt-2">
                    Space-delimited format tracking every GET, PUT, DELETE on your S3 buckets. Great for cost analysis and security auditing.
                  </p>
                  <p className="text-xs text-zinc-400 mt-3">
                    Fields include: bucket owner, bucket, time, remote IP, requester, request ID, operation, key, HTTP status, error code, bytes sent, total time, turn-around time
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">CloudFront Standard Logs</h4>
                  <p className="text-sm mt-2">
                    Tab-separated CloudFront access logs. Includes edge location, viewer location, cache behavior, and origin response time.
                  </p>
                  <p className="text-xs text-zinc-400 mt-3">
                    Use for debugging cache misses and analyzing global traffic patterns.
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">GCP HTTP Load Balancer</h4>
                  <p className="text-sm mt-2">
                    JSON-structured text export from Google Cloud. Backend latency broken down by zone. Ideal for multi-region performance tuning.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-5 mt-6">
                <p className="font-semibold text-white mb-2">Use Cases:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>S3 cost optimization</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT key, SUM(bytes_sent) FROM s3_logs GROUP BY key ORDER BY 2 DESC LIMIT 100</code></li>
                  <li><strong>Security: AccessDenied events</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT remote_ip, key FROM s3_logs WHERE error_code = 'AccessDenied'</code></li>
                  <li><strong>CloudFront cache behavior</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT x_edge_result_type, COUNT(*) FROM cf_logs GROUP BY 1</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Container & Orchestration */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Container & Orchestration Logs</h3>
            <div className="space-y-4 text-zinc-300">
              <p>
                If you're running containers, you're drowning in logs. Docker json-file driver, Kubernetes pod logs, Ingress Nginx—each has its own format.
                We parse them all so you can correlate OOMKilled events with actual resource usage.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">Docker JSON Logs</h4>
                  <p className="text-sm mt-2">
                    Default json-file logging driver output. One JSON object per line with <code className="bg-black/40 px-1 py-0.5 rounded text-xs">log</code>, <code className="bg-black/40 px-1 py-0.5 rounded text-xs">stream</code> (stdout/stderr), and <code className="bg-black/40 px-1 py-0.5 rounded text-xs">time</code> fields.
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">Kubernetes Ingress Nginx</h4>
                  <p className="text-sm mt-2">
                    Nginx running as Kubernetes Ingress controller. Adds <code className="bg-black/40 px-1 py-0.5 rounded text-xs">request_id</code> for distributed tracing and <code className="bg-black/40 px-1 py-0.5 rounded text-xs">upstream_addr</code> showing which pod handled the request.
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">Kubernetes JSON Pod Logs</h4>
                  <p className="text-sm mt-2">
                    Runtime container logs with pod name, namespace, and container name metadata. Essential for multi-tenant cluster debugging.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-5 mt-6">
                <p className="font-semibold text-white mb-2">Use Cases:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>OOMKilled debugging</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT pod, COUNT(*) FROM k8s_logs WHERE message LIKE '%OOMKilled%' GROUP BY pod</code></li>
                  <li><strong>Request tracing across pods</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT * FROM ingress WHERE request_id = 'abc-123'</code></li>
                  <li><strong>Deployment correlation</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT timestamp, status FROM logs WHERE timestamp BETWEEN deploy_start AND deploy_end</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Database Logs */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Database Logs</h3>
            <div className="space-y-4 text-zinc-300">
              <p>
                Database logs are where you go when queries are slow, connections are maxed out, or you've got a deadlock.
                PostgreSQL and MySQL both have configurable log formats, so we support the most common patterns.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">PostgreSQL (Server & Error Logs)</h4>
                  <p className="text-sm mt-2">
                    Configurable <code className="bg-black/40 px-1 py-0.5 rounded text-xs">log_line_prefix</code> means your format might vary. We support the most common: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">%t %u %d %p</code> (timestamp, user, database, PID).
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">MySQL General Query Log</h4>
                  <p className="text-sm mt-2">
                    Captures every statement sent to the server. Use for audit trails or debugging slow queries that don't hit the slow query log threshold.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-5 mt-6">
                <p className="font-semibold text-white mb-2">Use Cases:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Deadlock detection</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT * FROM pg_logs WHERE message LIKE '%deadlock detected%'</code></li>
                  <li><strong>Slow query analysis</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT query, duration FROM pg_logs WHERE duration &gt; 1000 ORDER BY duration DESC</code></li>
                  <li><strong>Connection pool tuning</strong>: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">SELECT COUNT(*) FROM pg_logs WHERE message LIKE '%too many connections%'</code></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile & PaaS */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Mobile & PaaS Logs</h3>
            <div className="space-y-4 text-zinc-300">
              <p>
                Mobile app logs and Platform-as-a-Service logs tend to be free-form, but there are a few standards.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">Android Logcat</h4>
                  <p className="text-sm mt-2">
                    Android's logging system. Format: <code className="bg-black/40 px-1 py-0.5 rounded text-xs">date time PID-TID/package priority/tag: message</code>
                  </p>
                </div>

                <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                  <h4 className="font-bold text-white text-lg">Heroku Router Logs</h4>
                  <p className="text-sm mt-2">
                    Key-value pairs for routing metadata. Includes dyno name, request latency, status, and Heroku-specific error codes (H12, H10, etc.).
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Choosing the Right Format */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Choosing the Right Format</h2>
          <div className="space-y-4 text-zinc-300">
            <p>
              Here's a decision tree for when auto-detection isn't confident:
            </p>

            <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-6">
              <ol className="list-decimal list-inside space-y-3">
                <li><strong>Know your log source</strong>: Nginx? Docker? S3? Start by identifying where the log came from.</li>
                <li><strong>Check the sample snippet</strong>: Look at the first 10 lines. Do you see JSON objects? Space-delimited values? Key-value pairs?</li>
                <li><strong>Verify column mappings</strong>: After selecting a format, check the preview table. Do the column names make sense? Is <code className="bg-black/40 px-1 py-0.5 rounded text-xs">status</code> actually HTTP status codes or is it parsing garbage?</li>
                <li><strong>Test with auto-detect first</strong>: Even if you know the format, let auto-detection run. It might catch edge cases (e.g., Nginx with custom <code className="bg-black/40 px-1 py-0.5 rounded text-xs">log_format</code>).</li>
                <li><strong>Manual override if needed</strong>: Confidence score below 80%? Pick from the dropdown.</li>
                <li><strong>Custom regex for proprietary formats</strong>: If your team invented a custom log format (why?!), you'll need custom regex. See the Docs page for syntax.</li>
              </ol>
            </div>

            <p className="text-sm text-zinc-400 mt-4">
              Pro tip: If you're consistently getting wrong auto-detections for a specific format, open a GitHub issue with sample lines.
              We'll tune the signature regex and ship an update within 2 weeks.
            </p>
          </div>
        </section>

        {/* Performance by Format */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Performance by Format</h2>
          <div className="space-y-4 text-zinc-300">
            <p>
              Not all formats parse at the same speed. JSON is native in JavaScript, so it's blazing fast. Regex-based parsing
              requires DuckDB's RE2 engine, which adds overhead. Here's what you can expect:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-zinc-900/60 border border-white/5 rounded-lg overflow-hidden">
                <thead className="bg-zinc-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Format Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Parse Speed (100MB)</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-white">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-white">JSON (Docker, K8s)</td>
                    <td className="px-6 py-4 text-sm text-emerald-400">1-2 seconds</td>
                    <td className="px-6 py-4 text-sm">Native <code className="bg-black/40 px-1 py-0.5 rounded">JSON.parse()</code> in V8 engine</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-white">Fixed fields (Nginx, Apache)</td>
                    <td className="px-6 py-4 text-sm text-blue-400">2-3 seconds</td>
                    <td className="px-6 py-4 text-sm">Regex compiled once, reused for all rows</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-white">CSV/TSV</td>
                    <td className="px-6 py-4 text-sm text-blue-400">2.5-3.5 seconds</td>
                    <td className="px-6 py-4 text-sm">
                      <a href="https://duckdb.org/docs/data/csv/overview" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">DuckDB CSV reader</a> optimized for bulk parsing
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-white">Variable fields (AWS S3)</td>
                    <td className="px-6 py-4 text-sm text-yellow-400">4-5 seconds</td>
                    <td className="px-6 py-4 text-sm">More complex regex with optional fields</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-white">Custom regex</td>
                    <td className="px-6 py-4 text-sm text-red-400">7-9 seconds</td>
                    <td className="px-6 py-4 text-sm">Regex complexity + lack of optimization</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-6 mt-6">
              <p className="font-semibold text-white mb-3">Benchmarks from DuckDB WASM:</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>DuckDB v1.1.3 (latest)</strong>: Ranked <span className="text-emerald-400">#1 on ClickBench "hot runs"</span> with a score of
                  <a href="https://benchmark.clickhouse.com/" className="text-blue-400 hover:text-blue-300 underline ml-1" target="_blank" rel="noopener noreferrer">9.599/10</a> (October 2024)
                </li>
                <li>
                  <strong>CSV parsing throughput</strong>: <span className="text-emerald-400">1.96 GB/s</span> on the <a href="https://github.com/duckdb/duckdb-pollock" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Pollock benchmark</a>
                </li>
                <li>
                  <strong>Performance improvement 2021-2024</strong>: DuckDB queries got <a href="https://duckdb.org/2024/06/26/benchmarks-over-time" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">14× faster</a> over three years
                </li>
              </ul>
            </div>

            <p className="text-sm text-zinc-400 mt-4">
              Bottom line: If you have a choice, use JSON logs. If you're stuck with Apache CLF, don't worry—DuckDB handles it fine.
              Custom regex should be a last resort.
            </p>
          </div>
        </section>

        {/* Format Request Process */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Format Request Process</h2>
          <div className="space-y-4 text-zinc-300">
            <p>
              Need a format we don't support? Here's how to request it (or contribute it yourself):
            </p>

            <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-6">
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  <strong>Open a GitHub issue</strong>: Go to{" "}
                  <a href="https://github.com/7and1/loganalytics/issues" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                    github.com/7and1/loganalytics/issues
                  </a> and create a new issue titled "Format Request: [Your Format Name]"
                </li>
                <li>
                  <strong>Provide 10-20 sample log lines</strong>: Paste real logs (sanitize sensitive data). We need to see variation—don't just copy the same line 10 times.
                </li>
                <li>
                  <strong>Describe expected schema</strong>: What columns should we extract? What data types? (e.g., <code className="bg-black/40 px-1 py-0.5 rounded text-xs">timestamp TIMESTAMP, user_id VARCHAR, action VARCHAR</code>)
                </li>
                <li>
                  <strong>We'll review within 2 weeks</strong>: If it's a common format (e.g., Datadog Agent logs), we'll prioritize. Obscure internal formats take longer.
                </li>
                <li>
                  <strong>Community PRs welcome</strong>: LogAnalytics is MIT licensed. Fork the repo, add your format to <code className="bg-black/40 px-1 py-0.5 rounded text-xs">data/formats.json</code>, and submit a PR. We'll merge if tests pass.
                </li>
              </ol>
            </div>

            <p className="text-sm text-zinc-400 mt-4">
              Average turnaround: <strong>2-4 weeks</strong> for standard formats. Custom enterprise formats may take longer
              if regex is complex. We're a small team—please be patient!
            </p>
          </div>
        </section>

        {/* Compressed Log Support */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Compressed Log Support</h2>
          <div className="space-y-4 text-zinc-300">
            <p>
              Production logs are usually gzipped to save disk space. Here's what we support:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/60 border border-emerald-500/20 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">✓</span>
                  <h4 className="font-bold text-white text-lg">Gzip (.gz)</h4>
                </div>
                <p className="text-sm">
                  <strong>Supported</strong> via browser <a href="https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">DecompressionStream API</a>.
                  Just drop your <code className="bg-black/40 px-1 py-0.5 rounded text-xs">.gz</code> file—we'll decompress on the fly. Adds ~10-20% overhead to parse time.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-red-500/20 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">✗</span>
                  <h4 className="font-bold text-white text-lg">Bzip2 (.bz2)</h4>
                </div>
                <p className="text-sm">
                  <strong>Not yet supported</strong>. Browsers don't have native bzip2 decompression. We'd need to ship a WASM decompressor,
                  adding ~500KB to bundle size. If you need this, upvote the{" "}
                  <a href="https://github.com/7and1/loganalytics/issues" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">GitHub issue</a>.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-amber-500/20 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚠</span>
                  <h4 className="font-bold text-white text-lg">Zip (.zip)</h4>
                </div>
                <p className="text-sm">
                  <strong>Partial support</strong>. If your zip contains a single log file, we'll extract and parse it. Multiple files in one zip?
                  Extract locally first using <code className="bg-black/40 px-1 py-0.5 rounded text-xs">unzip file.zip</code> then upload individually.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-emerald-500/20 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">✓</span>
                  <h4 className="font-bold text-white text-lg">Raw (.log, .txt)</h4>
                </div>
                <p className="text-sm">
                  <strong>Fastest option</strong>. Uncompressed logs parse 10-20% faster than gzipped. If you're analyzing the same log repeatedly,
                  decompress once and keep the raw file.
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mt-6">
              <strong>Pro tip</strong>: Keep logs uncompressed for analysis, compress for archival. A 1GB gzipped log becomes 3-4GB uncompressed—fine
              for temporary analysis, but you wouldn't want to store 10TB of uncompressed logs.
            </p>
          </div>
        </section>

        {/* Format Cards Grid */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3 mb-8">Browse All Formats</h2>
          <p className="text-zinc-300 mb-6">
            Click any format below to see its regex pattern, DuckDB schema, sample queries, and related error guides.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {formats.map((format) => (
              <LogFormatCard key={format.slug} format={format} />
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="mt-16 pb-12 space-y-4 text-zinc-300 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold text-white">Sources & Further Reading</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
            <li>
              <a href="https://duckdb.org/docs/data/csv/overview" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                DuckDB CSV Parsing Documentation
              </a> - Official DuckDB guide to CSV/TSV ingestion
            </li>
            <li>
              <a href="https://duckdb.org/docs/sql/functions/pattern_matching" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                DuckDB Regex Functions (RE2 Syntax)
              </a> - Pattern matching reference for custom formats
            </li>
            <li>
              <a href="https://benchmark.clickhouse.com/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                ClickBench OLAP Benchmarks
              </a> - Where DuckDB ranks #1 on "hot runs" (Oct 2024)
            </li>
            <li>
              <a href="https://github.com/duckdb/duckdb-pollock" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                DuckDB Pollock CSV Benchmark
              </a> - 1.96 GB/s parsing throughput
            </li>
            <li>
              <a href="https://duckdb.org/2024/06/26/benchmarks-over-time" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                DuckDB Performance Improvements 2021-2024
              </a> - 14× speed increase over three years
            </li>
            <li>
              <a href="https://httpd.apache.org/docs/current/logs.html" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                Apache HTTP Server Log Files Documentation
              </a> - Official Apache Common Log Format (CLF) spec
            </li>
          </ul>
        </section>

      </div>
    </main>
  );
}
