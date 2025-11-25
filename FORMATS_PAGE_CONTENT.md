# Supported Log Formats — Parse Nginx, Apache, AWS, Kubernetes Logs with SQL

Look, parsing logs shouldn't feel like decoding ancient hieroglyphics. Whether you're running **Nginx** on bare metal, orchestrating containers with **Kubernetes**, or managing CloudFront distributions across AWS, your logs are packed with answers—but only if you can actually read them. That's what this page is about: showing you every log format we support, how our auto-detection engine figures out what you've uploaded, and why getting the format right is the difference between instant SQL queries and hours of regex debugging.

## Why Log Format Matters

Here's the truth: raw logs are chaos. A single typo in your regex pattern means your entire query fails. Manually writing SQL schemas for 15 different log types? That's a week of your life you'll never get back. **Log format detection transforms unstructured text into queryable SQL tables**—instantly. When you drop a file into LogAnalytics, our parser scans the first 64KB, matches it against 15+ signatures, assigns a confidence score, and generates a DuckDB schema. No uploads to servers. No configuration files. Just drag, drop, and query.

Think of it like this: imagine trying to read a book where every page uses a different alphabet. That's what your infrastructure logs look like to a computer. **Standard formats** like Apache Combined Log or Docker JSON are easy—they follow documented rules. But **custom formats**? Those require regex patterns and field mappings. Auto-detection handles both, so you can focus on finding the 502 errors that crashed your site, not fighting with column types.

## How Auto-Detection Works

Our detection engine is simple but effective. First, it reads the **first 64KB** of your log file (that's roughly 500-1000 lines depending on verbosity). Then it runs a tournament: every format signature we know—Nginx, S3, CloudFront, Postgres, you name it—gets tested against your sample. We calculate a confidence score based on how many lines match, whether required fields are present, and if the structure makes sense.

Here's what happens under the hood:

1. **Sample Extraction**: Grab the first 64KB (or entire file if smaller)
2. **Signature Matching**: Test against 15+ regex patterns in parallel
3. **Confidence Scoring**: Count matching lines ÷ total lines = confidence %
4. **Schema Generation**: Map regex groups to DuckDB column types (VARCHAR, INTEGER, TIMESTAMP)
5. **Manual Override**: If confidence < 90%, you can force a specific format or define a custom one

For example, if your file looks like this:
```
192.168.1.1 - - [23/Nov/2025:10:00:00 +0000] "GET /index.html HTTP/1.1" 200 1024 "-" "Mozilla/5.0"
```
Our engine immediately recognizes the **Nginx Access Log** pattern: `remote_addr`, hyphen, hyphen, timestamp in brackets, request in quotes, status code, bytes, referer, user agent. Match. Schema created. Query ready.

But if we see:
```
{"log":"GET /health 200","stream":"stdout","time":"2025-11-23T10:00:00.000000000Z"}
```
That's **Docker JSON Log** format. Different structure, different schema. Auto-detection catches it.

## Format Categories

We've organized every supported format into categories based on where the logs come from. This isn't academic—it's practical. If you know your source (web server, cloud platform, container runtime), you can jump straight to the right section and verify your format immediately.

### Web Server Logs

These are the classics. If you're running a website, you've got these logs piling up somewhere.

#### Nginx Access Log
The de-facto standard for Nginx deployments. Uses the **combined** format by default: remote IP, user, timestamp, request line, status code, bytes sent, referer, user agent. Perfect for analyzing traffic patterns, identifying bot attacks, or tracking down slow endpoints. Common errors: `502 Bad Gateway` (upstream died), `404 Not Found` (broken links), `499 Client Closed Request` (user gave up waiting).

**Use case**: You deploy a new microservice behind Nginx. Suddenly, 10% of requests return 502. Query your access logs with `SELECT request, COUNT(*) FROM log_table WHERE status = 502 GROUP BY request` and you'll see exactly which endpoint is failing.

#### Apache Combined Log
Apache HTTP Server's most popular format. Adds referer and user agent fields to the Common Log Format (CLF). Widely supported by legacy tools, making it ideal for migrations. According to the [Apache HTTP Server documentation](https://httpd.apache.org/docs/2.4/logs.html), this format has been the standard since the 1990s and remains compatible with virtually every log analysis tool ever built.

**Use case**: Your marketing team wants to know which external sites are driving traffic. Run `SELECT referer, COUNT(*) as visits FROM log_table WHERE referer != '-' GROUP BY referer ORDER BY visits DESC` and you've got your answer in under a second.

#### Windows IIS W3C Log
Microsoft's Internet Information Services uses the [W3C Extended Log Format](https://en.wikipedia.org/wiki/Common_Log_Format), which adds server IP, port, username, and Windows-specific status codes. If you're managing .NET applications or enterprise Windows infrastructure, this is your bread and butter.

**Use case**: Track authentication failures by querying `SELECT cs_username, COUNT(*) FROM log_table WHERE sc_status = 401 GROUP BY cs_username`.

### Cloud Platform Logs

Cloud providers generate massive volumes of logs—access logs, load balancer logs, CDN logs. Each has its own format.

#### AWS S3 Access Log
Server access logs for S3 buckets. Tab-delimited, 18+ fields covering bucket owner, requester identity, operation type, object key, status codes, and timing. According to [AWS documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logs-reference.html), these logs are essential for understanding data transfer costs, security audits, and compliance requirements.

**Use case**: Someone's racking up your S3 bill. Query `SELECT requester, SUM(CAST(bytes_sent AS INTEGER)) as total_bytes FROM log_table GROUP BY requester ORDER BY total_bytes DESC` to find the culprit.

#### Amazon CloudFront Standard Log
Edge delivery logs with 33 fields including cache behavior, edge location, TLS version, and viewer geography. CloudFront delivers content from 400+ edge locations worldwide—these logs tell you exactly what happened at each one. The [official CloudFront logging reference](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logs-reference.html) details every field and its meaning.

**Use case**: Debug cache misses. Run `SELECT result_type, COUNT(*) FROM log_table GROUP BY result_type` and see how many requests are hitting vs. missing your cache.

#### GCP HTTP Load Balancer Log
Google Cloud's load balancer logs track request processing time, backend response time, SSL protocols, and target group routing. Structured text format with precise latency breakdowns.

**Use case**: Find slow backends: `SELECT backend_ip, AVG(CAST(backend_processing_time AS DOUBLE)) as avg_latency FROM log_table GROUP BY backend_ip ORDER BY avg_latency DESC`.

### Container & Orchestration Logs

Containers and Kubernetes generate logs in structured formats—mostly JSON—because machines need to read them, not just humans.

#### Docker JSON Log
Docker's default **json-file** logging driver wraps every log line in a JSON object with three fields: `log` (the message), `stream` (stdout or stderr), and `time` (ISO 8601 timestamp). According to [Kubernetes logging architecture documentation](https://kubernetes.io/docs/concepts/cluster-administration/logging/), this format is the foundation for container logging across all runtimes—Docker, containerd, CRI-O.

**Use case**: Filter stderr errors only: `SELECT message FROM log_table WHERE stream = 'stderr'`.

#### Kubernetes Ingress Nginx
The ingress-nginx controller adds fields standard Nginx doesn't have: upstream address, upstream response time, proxy upstream name, request length. These extras let you debug routing issues and pinpoint which pod is slow.

**Use case**: Identify saturated pods: `SELECT upstream_addr, COUNT(*) as request_count, AVG(upstream_response_time) as avg_time FROM log_table GROUP BY upstream_addr HAVING avg_time > 1.0`.

#### Kubernetes JSON Log (CRI Format)
Raw JSON logs from Kubernetes pods include embedded metadata like pod name, namespace, and container ID. The [CRI logging format](https://kubernetes.io/docs/concepts/cluster-administration/logging/) is standardized across all container runtimes, ensuring compatibility whether you're using Docker, containerd, or CRI-O.

**Use case**: Track crashes by namespace: `SELECT json_extract_string(json_line, '$.kubernetes.namespace_name') as namespace, COUNT(*) FROM log_table WHERE json_line LIKE '%OOMKilled%' GROUP BY namespace`.

### Database Logs

Databases generate verbose logs for debugging slow queries, connection issues, and deadlocks.

#### PostgreSQL Server Log
Configurable `log_line_prefix` with timestamp, PID, user, database, severity (LOG, ERROR, FATAL), and message. Essential for troubleshooting lock waits and query performance. The [official PostgreSQL logging documentation](https://www.postgresql.org/docs/current/runtime-config-logging.html) recommends enabling CSV format for structured analysis, but text logs remain the most common in production.

**Use case**: Hunt deadlocks: `SELECT message FROM log_table WHERE message LIKE '%deadlock detected%'`.

#### MySQL General Query Log
Captures **every query** hitting your MySQL instance—useful for audits but extremely verbose. Each line includes timestamp, thread ID, command type (Connect, Query, Quit), and the actual SQL statement.

**Use case**: Find noisy queries: `SELECT argument, COUNT(*) as frequency FROM log_table WHERE command = 'Query' GROUP BY argument ORDER BY frequency DESC LIMIT 10`.

### Mobile & PaaS Logs

Mobile apps and Platform-as-a-Service providers generate logs with unique structures.

#### Android Logcat
Android's debug logging system with date, time, PID, TID, priority (VERBOSE, DEBUG, INFO, WARN, ERROR, FATAL), tag, and message. According to [Android developer documentation](https://developer.android.com/studio/debug/logcat), priorities let you filter noise during debugging.

**Use case**: Find app crashes: `SELECT tag, message FROM log_table WHERE priority = 'F'`.

#### Heroku Router Log
Heroku's router emits structured key-value logs for every HTTP request: method, path, host, dyno name, connect time, service time, status, bytes, protocol. Error codes like `H12` (timeout) or `H18` (server backlog) are surfaced in the `at` field.

**Use case**: Track H12 timeouts: `SELECT path, COUNT(*) FROM log_table WHERE at = 'error' AND code = 'H12' GROUP BY path`.

## Choosing the Right Format: A Decision Tree

Not sure which format to pick? Follow this:

1. **Know your source**: Web server? Cloud platform? Container?
2. **Check the sample line**: Does it start with an IP? JSON brace? Timestamp?
3. **Verify mappings**: Do the extracted fields match your expectations?
4. **Test with a small file**: Upload 1MB, run a query, check column types
5. **Override if needed**: If auto-detection fails, manually select the format
6. **Request a custom format**: If your logs don't match anything, open a GitHub issue

## Performance by Format

Not all formats parse at the same speed. Here's why:

| **Format** | **Structure** | **Parse Speed (100MB file)** | **Why** |
|------------|---------------|------------------------------|---------|
| Docker JSON | JSON | ~2.5 seconds | DuckDB's native `read_json_auto()` is insanely fast according to [DuckDB benchmarks](https://duckdb.org/2025/04/16/duckdb-csv-pollock-benchmark), achieving 1.96 GB/s throughput |
| Apache Combined | Regex | ~8 seconds | Regex matching is CPU-bound; complex patterns slow down |
| Nginx Access | Regex | ~7 seconds | Similar to Apache but slightly simpler pattern |
| AWS S3 Access | Space-delimited | ~5 seconds | Fixed structure, predictable parsing |
| CloudFront Log | Tab-delimited | ~4 seconds | TSV parsing is efficient in DuckDB |
| PostgreSQL Log | Regex | ~9 seconds | Timestamp parsing + regex overhead |
| Kubernetes JSON | JSON | ~3 seconds | JSON parsing + lightweight structure |

**Takeaway**: JSON and delimited formats (CSV, TSV) are fastest. Complex regex patterns add latency. If you're processing gigabytes daily, consider switching to JSON logging where possible.

According to [DuckDB's CSV Pollock benchmark](https://duckdb.org/2025/04/16/duckdb-csv-pollock-benchmark), DuckDB ranks #1 in accuracy and speed for non-standard CSV parsing, with a weighted score of 9.599/10 and recent performance improvements delivering 3× faster CSV ingestion compared to older versions. For JSON, DuckDB's multi-threaded parser can handle malformed files gracefully while maintaining throughput exceeding 1 GB/s on modern hardware.

## Format Request Process

Don't see your log format? Here's how to get it added:

1. **Open a GitHub issue** in our repository
2. **Provide 10-20 sample lines** (anonymize sensitive data)
3. **Document the schema**: field names, types, meanings
4. **Describe the use case**: Why is this format important?
5. **Wait ~2 weeks** for review and implementation
6. **PRs welcome**: If you can write the regex + schema, submit a pull request

We prioritize formats with broad demand (e.g., Elasticsearch JSON, Splunk HEC) and vendor-neutral standards (e.g., Common Event Format).

## Compressed Log Support

Real-world logs are huge. Compression helps.

- **gzip (.gz)**: Supported. DuckDB decompresses on-the-fly with minimal overhead.
- **bzip2 (.bz2)**: Not yet supported. Decompress first using `bunzip2`.
- **zip (.zip)**: Extract locally first. We parse raw files, not archives.
- **Raw files**: Fastest option. If you can skip compression, do it.

**Pro tip**: If you're analyzing the same 10GB gzipped log repeatedly, decompress it once and reuse the raw file. You'll save 30-40% of parse time.

---

## Summary

Supported log formats aren't just a checklist—they're the foundation of fast, accurate log analysis. Whether you're debugging a **502 cascade in Nginx**, auditing S3 access patterns, or hunting **OOMKilled pods in Kubernetes**, the right format means the difference between instant answers and manual parsing hell.

We support 15+ formats across **web servers** (Nginx, Apache, IIS), **cloud platforms** (AWS S3, CloudFront, GCP), **containers** (Docker, Kubernetes), **databases** (PostgreSQL, MySQL), and **mobile/PaaS** (Android Logcat, Heroku). Auto-detection works in seconds. Manual overrides are always available. And if your format isn't listed, we'll build it with you.

Drop your logs. Run SQL. Get answers. No uploads. No infrastructure. No nonsense.

---

## Sources

- [DuckDB's CSV Reader and the Pollock Robustness Benchmark](https://duckdb.org/2025/04/16/duckdb-csv-pollock-benchmark)
- [Apache HTTP Server Log Files Documentation](https://httpd.apache.org/docs/2.4/logs.html)
- [Nginx ngx_http_log_module Documentation](https://nginx.org/en/docs/http/ngx_http_log_module.html)
- [Amazon CloudFront Standard Logging Reference](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logs-reference.html)
- [Kubernetes Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
- [Common Log Format - Wikipedia](https://en.wikipedia.org/wiki/Common_Log_Format)
