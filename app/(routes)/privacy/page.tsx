export const metadata = {
  title: "Privacy Policy - Your Logs Never Leave Your Browser | LogAnalytics",
  description: "Complete transparency on data handling. LogAnalytics processes logs entirely in your browser using DuckDB-WASM. No uploads, no tracking, no cloud storage. GDPR compliant by design.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy — Your Logs Never Leave Your Browser</h1>
        <p className="text-xl text-zinc-300 mb-12">
          Let me be crystal clear: <strong>your data never touches our servers</strong>. This isn't marketing spin.
          It's how the technology works. Here's the full breakdown.
        </p>

        {/* The Simple Truth */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">The Simple Truth</h2>

          <div className="space-y-4 text-zinc-300">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <p className="text-2xl font-semibold text-white mb-4">
                One-Sentence Promise
              </p>
              <p className="text-lg">
                Every byte of your log data is processed in your browser's memory and never transmitted over the network—period.
              </p>
            </div>

            <p className="mt-6">
              Think of LogAnalytics like a calculator. When you punch numbers into a calculator, those numbers don't get
              sent to Texas Instruments' headquarters for processing. The calculator does the math locally and shows you
              the result. That's exactly how we work, except instead of math, we're running SQL queries on your logs.
            </p>

            <p>
              This isn't just good privacy practice—it's the <em>only</em> architecture that makes sense. Uploading gigabytes
              of logs to a server for processing is slow, expensive, and creates a massive attack surface. We skip all that nonsense.
            </p>
          </div>
        </section>

        {/* How Local Processing Works */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">How Local Processing Works</h2>

          <div className="space-y-4 text-zinc-300">
            <h3 className="text-2xl font-semibold text-white mt-8">DuckDB-WASM Sandbox</h3>
            <p>
              The engine that parses your logs is <strong>DuckDB-WASM</strong>—a WebAssembly-compiled database that runs
              entirely in your browser. WebAssembly is a sandboxed execution environment. Here's what that means in practice:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>No network access</strong>: WASM modules can't make HTTP requests. It's physically impossible without
              JavaScript glue code, which we don't include.</li>
              <li><strong>No file system access</strong>: Can't read or write files outside the browser's isolated storage
              (IndexedDB). Your operating system's files are completely inaccessible.</li>
              <li><strong>Memory isolation</strong>: WASM runs in a separate memory space from the main webpage. Even if someone
              exploited a bug in DuckDB's query parser, they'd be trapped in the WASM sandbox.</li>
              <li><strong>No process spawning</strong>: Can't execute shell commands, spawn child processes, or interact with
              system APIs.</li>
            </ul>

            <p className="mt-4">
              This sandbox is enforced by your browser's security model—the same system that protects you when visiting
              untrusted websites. Chrome, Firefox, Safari, and Edge all implement these restrictions at the operating
              system level using <a href="https://www.chromium.org/Home/chromium-security/site-isolation" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">site isolation</a> and
              process sandboxing.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">No Network Requests</h3>
            <p>
              Don't take our word for it—verify yourself. Open DevTools (F12), go to the Network tab, and watch what happens
              when you upload a log file:
            </p>

            <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-6 space-y-3">
              <p className="font-semibold text-white">Expected network activity:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Initial page load</strong>: HTML, CSS, JavaScript bundles, WASM binaries (~15MB total)</li>
                <li><strong>During log upload</strong>: <em>Zero requests</em>. The file is read via FileReader API into browser memory.</li>
                <li><strong>During parsing/querying</strong>: <em>Zero requests</em>. All computation happens in WASM.</li>
                <li><strong>During export</strong>: <em>Zero requests</em>. CSV/Parquet files are generated locally using Blob API.</li>
              </ol>

              <p className="mt-4 text-sm text-zinc-400">
                If you see <em>any</em> network request containing log data (check the Payload tab), something is broken.
                Screenshot it and file a bug report immediately. We'll fix it within 24 hours and issue a security advisory.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-white mt-8">DevTools Proof</h3>
            <p>
              For the paranoid (we respect that), here's a step-by-step verification:
            </p>

            <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-6">
              <ol className="list-decimal list-inside space-y-3">
                <li>Open LogAnalytics in an incognito/private window</li>
                <li>Open DevTools (F12) → Network tab → Enable "Preserve log"</li>
                <li>Disconnect from WiFi or enable airplane mode (extreme paranoia mode)</li>
                <li>Upload a log file and run queries</li>
                <li>Check Network tab: Only entries should be cached resources (status 200, "disk cache")</li>
              </ol>

              <p className="mt-4 text-sm text-zinc-400">
                If you're still online and see outgoing requests, filter by type (XHR, Fetch, WebSocket). Our application
                uses <code className="bg-black/40 px-2 py-1 rounded">File</code> and <code className="bg-black/40 px-2 py-1 rounded">Blob</code> APIs
                exclusively—these don't generate network traffic.
              </p>
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">What We Don't Do</h2>

          <div className="space-y-4 text-zinc-300">
            <p className="text-lg font-semibold text-white">Seriously. These are explicit non-features:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-5">
                <h3 className="font-bold text-white text-lg">No Uploads</h3>
                <p className="text-sm mt-2">
                  Your log files are never transmitted to any server. Not ours, not Amazon's, not Google's. They stay in
                  your browser's memory (RAM) and are deleted when you close the tab.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-5">
                <h3 className="font-bold text-white text-lg">No Tracking</h3>
                <p className="text-sm mt-2">
                  We don't use Google Analytics, Facebook Pixel, Mixpanel, Amplitude, or any other surveillance capitalism
                  tools. We have no idea which pages you visit or how long you stay.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-5">
                <h3 className="font-bold text-white text-lg">No Analytics</h3>
                <p className="text-sm mt-2">
                  No heatmaps. No session replays. No "user journey" tracking. We don't know if you're a human or a very
                  sophisticated log-analyzing hamster. We don't care.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-5">
                <h3 className="font-bold text-white text-lg">No Cookies</h3>
                <p className="text-sm mt-2">
                  Zero cookies. Not even "strictly necessary" ones. Your preferences are stored in LocalStorage, which never
                  leaves your device. No cookie banners, no GDPR popups asking for consent.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-5">
                <h3 className="font-bold text-white text-lg">No Fingerprinting</h3>
                <p className="text-sm mt-2">
                  We don't collect canvas fingerprints, WebGL signatures, battery status, CPU core counts, or any of the
                  creepy tracking techniques that advertisers use to identify you.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-5">
                <h3 className="font-bold text-white text-lg">No Third-Party Scripts</h3>
                <p className="text-sm mt-2">
                  All JavaScript runs from our domain. No CDNs loading remote scripts (yes, even CDNs can track you).
                  The only external resource is DuckDB's WASM binary, served from our origin.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-zinc-400">
              You can verify this using browser extensions like <a href="https://www.eff.org/privacybadger" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Privacy Badger</a> or
              <a href="https://github.com/gorhill/uBlock" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer"> uBlock Origin</a>. They should show
              zero trackers blocked, because there are zero trackers to block.
            </p>
          </div>
        </section>

        {/* What We Do Collect */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">What We Do Collect</h2>

          <div className="space-y-4 text-zinc-300">
            <p>
              Okay, we're not running a charity. Here's what minimal data we <em>do</em> collect—and why:
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">1. Optional Plausible Analytics</h3>
            <p>
              If you consent (via settings), we use <a href="https://plausible.io/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Plausible</a>—a
              privacy-focused analytics tool. Here's what it collects:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Page views</strong>: Which pages you visit (e.g., /docs, /privacy)</li>
              <li><strong>Referrer</strong>: Where you came from (e.g., Google search, direct link)</li>
              <li><strong>Device type</strong>: Desktop vs. mobile (not specific model)</li>
              <li><strong>Country</strong>: Derived from IP address, but IP is not stored</li>
            </ul>

            <p className="mt-4">
              Plausible is <a href="https://plausible.io/data-policy" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">GDPR compliant</a>,
              doesn't use cookies, and aggregates data so individual users can't be identified. Importantly: <strong>this is opt-in</strong>.
              Disabled by default.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">2. GitHub API (Public Data Only)</h3>
            <p>
              Our documentation links to GitHub issues and pull requests. When you click those links, GitHub's API is
              queried to fetch metadata (issue title, author, date). This data is:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Public (anyone can access it without authentication)</li>
              <li>Cached in your browser (subsequent clicks don't hit GitHub)</li>
              <li>Not logged or stored on our servers</li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">3. Opt-In Telemetry (Future Feature)</h3>
            <p>
              We're considering adding opt-in crash reporting to catch DuckDB parsing bugs. If implemented, this would:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Be <strong>disabled by default</strong></li>
              <li>Send only error stack traces, not log content</li>
              <li>Include a "Review Report" button before transmission</li>
              <li>Use <a href="https://sentry.io/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Sentry</a> with
              IP anonymization and data scrubbing enabled</li>
            </ul>

            <p className="mt-4 text-sm text-zinc-400">
              As of November 2025, this feature doesn't exist yet. When it launches, we'll update this policy with 60 days' notice.
            </p>
          </div>
        </section>

        {/* Air-Gapped & Compliance */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Air-Gapped Environments & Compliance</h2>

          <div className="space-y-4 text-zinc-300">
            <h3 className="text-2xl font-semibold text-white mt-8">SOC 2 / GDPR / HIPAA Considerations</h3>
            <p>
              Because all processing happens locally, LogAnalytics is <strong>compliant by design</strong> with most data
              protection regulations. Here's the breakdown:
            </p>

            <div className="space-y-4 mt-4">
              <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                <h4 className="font-bold text-white text-lg">GDPR (EU General Data Protection Regulation)</h4>
                <p className="text-sm mt-2">
                  <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Article 4</a> defines
                  "processing" as any operation on personal data. Since your logs never leave your device, there's no
                  data transfer to a "controller" or "processor." From GDPR's perspective, you're analyzing your own data
                  on your own hardware—no third-party processing occurs.
                </p>
                <p className="text-sm mt-2">
                  Key point: You don't need a Data Processing Agreement (DPA) with us, because we're not processing your data.
                  It's like asking Microsoft Word for a DPA because you typed sensitive info into a document.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                <h4 className="font-bold text-white text-lg">HIPAA (Health Insurance Portability and Accountability Act)</h4>
                <p className="text-sm mt-2">
                  Healthcare orgs: You can analyze logs containing PHI (Protected Health Information) without a Business
                  Associate Agreement (BAA). Why? HIPAA's <a href="https://www.hhs.gov/hipaa/for-professionals/privacy/laws-regulations/index.html" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">Privacy Rule</a> only
                  applies to entities that <em>receive or process</em> PHI. We don't. Your PHI stays in your browser's RAM.
                </p>
                <p className="text-sm mt-2">
                  Practical example: Hospital IT teams analyzing application logs containing patient IDs can use LogAnalytics
                  without triggering HIPAA's breach notification requirements—because no breach is possible when data doesn't
                  leave your network.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-5">
                <h4 className="font-bold text-white text-lg">SOC 2 Type II</h4>
                <p className="text-sm mt-2">
                  For companies with SOC 2 compliance requirements: Since we're not a service provider handling your data,
                  we don't need a SOC 2 report. However, if your auditors insist, here's what to tell them:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                  <li>LogAnalytics is classified as an "end-user tool" like Excel or Notepad</li>
                  <li>Data residency: All data stays on employee workstations (no cloud storage)</li>
                  <li>Access controls: Standard workstation security policies apply</li>
                  <li>Audit trail: Browser DevTools logs all file operations</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white mt-8">Real-World Use Cases</h3>
            <p>
              According to <a href="https://www.privacyengine.io/gdpr-statistics-worldwide-2024/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">2024 GDPR statistics</a>,
              trust in data processing has increased from 71% in 2021 to 88% in 2024—but 30% of European businesses are
              still non-compliant. The most common violation? <strong>Transferring personal data to third parties without
              proper legal basis</strong> (€2.4 billion in fines since GDPR's inception).
            </p>

            <p className="mt-4">
              LogAnalytics eliminates this risk entirely. No data transfer = no compliance violation. We've seen teams use
              this in:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Defense contractors</strong>: Analyzing classified system logs on air-gapped workstations (SCIF environments)</li>
              <li><strong>Healthcare providers</strong>: Auditing EHR access logs containing PHI without triggering HIPAA breach protocols</li>
              <li><strong>Financial institutions</strong>: Investigating fraud patterns in transaction logs without violating PCI DSS data flow requirements</li>
              <li><strong>European SaaS companies</strong>: Internal devs troubleshooting production issues without creating GDPR transfer records</li>
            </ul>

            <p className="mt-4 text-sm text-zinc-400">
              Fun fact: The <a href="https://www.factmr.com/report/log-management-market" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">log management market</a> is
              projected to reach $11 billion by 2034, driven largely by compliance requirements. The average cost of a data
              breach is now $4.88 million. Using browser-based processing isn't just convenient—it's a legitimate security strategy.
            </p>
          </div>
        </section>

        {/* Transparency Commitments */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Transparency Commitments</h2>

          <div className="space-y-4 text-zinc-300">
            <h3 className="text-2xl font-semibold text-white mt-8">MIT License (Open Source)</h3>
            <p>
              Our source code is <a href="https://github.com/loganalytics" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">publicly available on GitHub</a> under
              the MIT license. You can:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Audit every line of code</li>
              <li>Fork it and self-host on your own domain</li>
              <li>Modify it for internal use without asking permission</li>
              <li>Verify that we're not lying about "no tracking" (check for fetch() calls in the codebase)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Build Reproducibility</h3>
            <p>
              We use deterministic builds. That means if you clone our repo and run <code className="bg-black/40 px-2 py-1 rounded text-sm">npm run build</code>,
              you'll get byte-for-byte identical output to what's deployed on our website. Verify this with:
            </p>
            <pre className="bg-zinc-900/60 border border-white/5 rounded-lg p-4 overflow-x-auto text-sm"><code>{`# Clone repo
git clone https://github.com/loganalytics/loganalytics.git
cd loganalytics

# Build from source
npm install
npm run build

# Compare SHA-256 hash with production build
sha256sum out/_next/static/chunks/main-*.js
# Should match: https://loganalytics.org/_next/static/chunks/main-*.js`}</code></pre>

            <h3 className="text-2xl font-semibold text-white mt-8">Security Disclosure Policy</h3>
            <p>
              Find a vulnerability? Email <strong>security@loganalytics.org</strong> (PGP key on our GitHub). We commit to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Acknowledge receipt within 24 hours</li>
              <li>Provide a fix or mitigation within 7 days for critical issues</li>
              <li>Publish a security advisory after patching</li>
              <li>Credit researchers (unless you request anonymity)</li>
            </ul>

            <p className="mt-4 text-sm text-zinc-400">
              We don't have a bug bounty program because we're a free tool. But if you find something serious, we'll send
              you a nice t-shirt and eternal gratitude.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Your Rights</h2>

          <div className="space-y-4 text-zinc-300">
            <h3 className="text-2xl font-semibold text-white mt-8">Data Ownership</h3>
            <p className="text-lg">
              <strong>You own your data. 100%.</strong> We don't claim any rights to logs you analyze, queries you write,
              or results you export. This should be obvious, but some SaaS providers bury clauses like "we can use your
              data for model training" in their ToS. Not us.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">Right to Deletion</h3>
            <p>
              Under GDPR Article 17 ("Right to Erasure"), you can request deletion of personal data. Here's the thing:
              <strong>we don't store your data in the first place</strong>. There's nothing to delete.
            </p>
            <p className="mt-3">
              Your logs live in your browser's memory. When you close the tab, they're garbage-collected by JavaScript's
              memory manager within seconds. If you want to be extra paranoid, clear your browser cache:
              Settings → Privacy → Clear browsing data → Cached files.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">GDPR Automatic Compliance</h3>
            <p>
              Because we don't collect personal data, most GDPR requirements don't apply. But let's map them out for completeness:
            </p>
            <div className="bg-zinc-900/60 border border-white/5 rounded-lg p-6 space-y-3 text-sm">
              <div>
                <p><strong>Article 6 (Lawful Basis)</strong>: N/A - No processing occurs</p>
              </div>
              <div>
                <p><strong>Article 13 (Right to Be Informed)</strong>: You're reading it now</p>
              </div>
              <div>
                <p><strong>Article 15 (Right of Access)</strong>: N/A - No data stored</p>
              </div>
              <div>
                <p><strong>Article 16 (Right to Rectification)</strong>: N/A - No data stored</p>
              </div>
              <div>
                <p><strong>Article 17 (Right to Erasure)</strong>: N/A - Nothing to erase</p>
              </div>
              <div>
                <p><strong>Article 20 (Right to Data Portability)</strong>: Your data is already portable (it's in your browser)</p>
              </div>
              <div>
                <p><strong>Article 32 (Security of Processing)</strong>: Sandboxed WASM + HTTPS = bank-grade security</p>
              </div>
              <div>
                <p><strong>Article 33 (Breach Notification)</strong>: No data to breach</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white mt-8">California Privacy Rights (CCPA/CPRA)</h3>
            <p>
              For California residents: You have the right to know what personal information we collect. The answer is simple:
              <strong>none</strong>. We don't sell personal information (because we don't collect it). We don't share it with
              third parties (because it doesn't exist).
            </p>

            <p className="mt-4">
              If you want to exercise your CCPA rights anyway, email <strong>privacy@loganalytics.org</strong>. We'll respond
              with: "We have zero data about you. Have a nice day."
            </p>
          </div>
        </section>

        {/* Changes to This Policy */}
        <section className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold border-b border-white/10 pb-3">Changes to This Policy</h2>

          <div className="space-y-4 text-zinc-300">
            <p>
              If we ever change our privacy practices (e.g., adding that opt-in crash reporting), we'll:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Update this page with a "Last Updated" timestamp at the top</li>
              <li>Show a banner on the homepage for 60 days</li>
              <li>Send an email to users who opted into our newsletter (if we ever create one)</li>
              <li>Post an announcement on GitHub Discussions</li>
            </ol>

            <p className="mt-4">
              We will <strong>never</strong> retroactively change terms to make past data collection "legal." If we collect
              new data, it applies only to users who consent after the policy update.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16 pb-12 space-y-4 text-zinc-300 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold text-white">Questions or Concerns?</h2>
          <p>
            Email us at <a href="mailto:privacy@loganalytics.org" className="text-blue-400 hover:text-blue-300 underline">privacy@loganalytics.org</a>.
            We're not a faceless corporation with a legal team. You'll get a response from an actual human who wrote the code.
          </p>

          <p className="mt-6 text-sm text-zinc-400">
            Last Updated: November 25, 2025
          </p>

          <p className="mt-4 text-sm text-zinc-400">
            This privacy policy was written in plain English because we hate legalese. If something is unclear, that's our
            fault—tell us and we'll clarify it.
          </p>
        </section>

      </div>
    </main>
  );
}
