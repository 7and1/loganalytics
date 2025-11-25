export const metadata = {
  title: "Terms of Service — Straight Talk About Using LogAnalytics",
  description: "No legalese. Just clear rules for using LogAnalytics, a free client-side log analysis tool. What we do, what we don't, and why these terms matter for your data security.",
};

export default function TermsPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto max-w-4xl px-4 space-y-8">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Legal Stuff</p>
          <h1 className="text-5xl font-bold leading-tight">Terms of Service — The Rules Are Simple</h1>
          <p className="text-lg text-zinc-300">
            Here's the deal: We built a free log analysis tool that runs in your browser. No servers, no data collection, no BS.
            These terms protect both of us. Read them like you'd read a README — they're important.
          </p>
        </header>

        <section className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-6">
          <h2 className="text-2xl font-bold text-blue-300">TL;DR (The 3-Bullet Version)</h2>
          <ul className="mt-4 space-y-3 text-zinc-300">
            <li className="flex gap-3">
              <span className="text-blue-400">→</span>
              <span><strong>Your data stays yours.</strong> Everything runs locally in your browser. We never see, store, or transmit your logs.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400">→</span>
              <span><strong>It's free and open source.</strong> MIT licensed. Fork it, modify it, use it commercially. Just give credit.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400">→</span>
              <span><strong>Use responsibly.</strong> Don't hack us, don't abuse the service, don't analyze illegal content. Common sense stuff.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Why We Even Need Terms</h2>
          <p className="text-zinc-300 leading-relaxed">
            Look, nobody enjoys reading legal documents. But here's why this matters: We're giving you a powerful tool that can process gigabytes of sensitive data.
            You need to know exactly what we do (and don't do) with that data. We need protection from liability if someone uses this tool to analyze stolen logs
            or violate privacy laws. It's a mutual understanding.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Think of these terms like the safety instructions on a chainsaw. The tool is powerful. Use it right, and you'll build something great.
            Use it wrong, and you might hurt yourself (or others). We're spelling out the rules so everyone knows what's expected.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Acceptance of Terms</h2>
          <p className="text-zinc-300 leading-relaxed">
            By using LogAnalytics.org — whether you're just browsing the homepage or uploading a 5GB Nginx log — you're agreeing to these terms.
            It's like clicking "I agree" on a software license, except we're being upfront about it.
          </p>
          <div className="space-y-3 text-zinc-300">
            <p><strong>If you're under 18:</strong> Ask a parent or guardian to review these terms with you. We're not collecting personal data,
            but it's good practice to have adult supervision when using technical tools.</p>
            <p><strong>Changes to terms:</strong> We track all changes via Git commits on our public repository. Major changes (like adding
            paid features or changing data handling) will be announced via email to anyone who's opted into our mailing list. Minor clarifications
            won't trigger notifications — continued use means you accept the latest version.</p>
            <p><strong>GitHub as source of truth:</strong> If there's ever a dispute about what the terms said on a specific date, we'll reference
            the Git history. Transparency matters.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">What LogAnalytics Is (and Isn't)</h2>
          <p className="text-zinc-300 leading-relaxed">
            Let's be crystal clear about what you're getting:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-green-500/30 bg-green-950/20 p-5">
              <h3 className="text-xl font-bold text-green-300 mb-3">What We ARE</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>✓ A free, open-source browser tool</li>
                <li>✓ Powered by DuckDB-Wasm (runs locally)</li>
                <li>✓ Zero-knowledge architecture (we see nothing)</li>
                <li>✓ MIT licensed (fork away!)</li>
                <li>✓ Best-effort support via GitHub issues</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-5">
              <h3 className="text-xl font-bold text-red-300 mb-3">What We ARE NOT</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>✗ A SaaS platform with guaranteed uptime</li>
                <li>✗ A log storage or monitoring service</li>
                <li>✗ A replacement for Datadog/Splunk/ELK</li>
                <li>✗ Liable for incorrect analysis results</li>
                <li>✗ Offering enterprise support contracts</li>
              </ul>
            </div>
          </div>
          <p className="text-zinc-300 leading-relaxed mt-4">
            We built this because we were tired of uploading sensitive logs to third-party services just to run a quick SQL query.
            It's a tool for engineers who value privacy and speed. That's it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Your Responsibilities</h2>
          <p className="text-zinc-300 leading-relaxed">
            Freedom comes with responsibility. Here's what we expect from you:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">1. Don't Analyze Illegal Content</h3>
              <p className="text-zinc-300">
                If you obtained logs through hacking, theft, or unauthorized access — don't use our tool. We can't see what you're analyzing
                (remember, client-side only), but that doesn't make it okay. Play by the rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">2. No Hacking or Abuse</h3>
              <p className="text-zinc-300">
                Don't try to break our site, inject malicious code, or overload our servers. We're a small open-source project.
                If you find a security vulnerability, report it responsibly via <a href="mailto:hi@loganalytics.org" className="text-blue-400 hover:underline">hi@loganalytics.org</a>.
                We'll credit you in our changelog.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">3. Give Credit Where Due</h3>
              <p className="text-zinc-300">
                If you fork our code or build something on top of LogAnalytics, mention us. It's part of the MIT license (see Intellectual Property section below).
                A simple "Powered by LogAnalytics" or a link in your README is all we ask.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">4. Reasonable Use</h3>
              <p className="text-zinc-300">
                We don't set hard limits on file sizes or queries, but be reasonable. If you're processing 100GB logs every hour, maybe consider
                downloading our source code and running it on your own infrastructure. The tool is open source for a reason.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">5. Compliance Is Your Job</h3>
              <p className="text-zinc-300">
                If you work at a company with data governance policies (GDPR, HIPAA, SOC 2, etc.), it's your responsibility to ensure using
                LogAnalytics complies with those rules. Since all processing happens locally, you're probably fine — but check with your compliance team first.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Our Guarantees and Limitations</h2>
          <p className="text-zinc-300 leading-relaxed">
            Here's the part where we have to sound like lawyers for a minute:
          </p>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-950/20 p-6">
            <p className="text-zinc-300 leading-relaxed mb-4">
              <strong className="text-yellow-300">LogAnalytics is provided "AS IS" without warranty of any kind.</strong> That means:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li>→ We don't guarantee 100% uptime. If AWS goes down, we go down.</li>
              <li>→ We're not liable if a bug in DuckDB-Wasm causes incorrect query results.</li>
              <li>→ We're not responsible for browser compatibility issues (though we test on Chrome, Firefox, and Safari).</li>
              <li>→ There's no SLA. We fix bugs when we can, but we're not on-call 24/7.</li>
            </ul>
          </div>
          <p className="text-zinc-300 leading-relaxed mt-4">
            That said, we care deeply about security. If you report a vulnerability, we'll prioritize it. We want this tool to be reliable —
            we use it ourselves daily. But legally speaking, you're using it at your own risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Intellectual Property</h2>
          <p className="text-zinc-300 leading-relaxed">
            LogAnalytics is released under the <strong>MIT License</strong>, one of the most permissive open-source licenses out there.
            Here's what that means in plain English (as <a href="https://opensource.org/license/mit" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">defined by the Open Source Initiative</a>):
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">What You Can Do</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>✓ <strong>Use it commercially.</strong> Build a paid product on top of LogAnalytics if you want.</li>
                <li>✓ <strong>Modify the code.</strong> Change anything. Add features. Optimize performance.</li>
                <li>✓ <strong>Distribute copies.</strong> Host it internally, bundle it with other tools, whatever.</li>
                <li>✓ <strong>Sublicense it.</strong> Use a different license for your derivative work (though we'd prefer you stay open source).</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">What You Must Do</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>→ <strong>Include the MIT License text.</strong> Just copy-paste it into your project. That's it.</li>
                <li>→ <strong>Preserve copyright notices.</strong> Don't remove our name from the code headers.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">Your Data Is Yours</h3>
              <p className="text-zinc-300">
                Any logs you upload or analyze remain your property. We have zero claim to your data because, again, we never see it.
                Client-side processing means your data never touches our servers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">We Encourage Forking</h3>
              <p className="text-zinc-300">
                Found a bug? Add a feature. Want to add support for a new log format? Submit a pull request. Want to build a competing product?
                Go for it — just follow the MIT License terms. Competition makes everyone better.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Liability Limits</h2>
          <p className="text-zinc-300 leading-relaxed">
            Here's the reality: LogAnalytics is a free tool built by engineers who believe in open source. We're not a billion-dollar corporation
            with a legal war chest. So we need to set clear liability boundaries:
          </p>
          <div className="space-y-3 text-zinc-300">
            <p><strong>Maximum liability: $0.</strong> If something goes wrong — incorrect analysis, data loss, security breach — our financial
            liability is capped at zero dollars. Harsh? Maybe. But it's the only way we can offer this tool for free.</p>
            <p><strong>Not liable for downstream consequences.</strong> If you make a business decision based on our analysis and it turns out wrong,
            that's on you. Always validate critical findings with multiple tools.</p>
            <p><strong>Jurisdiction:</strong> These terms are governed by the laws of the United States. Any disputes will be resolved in accordance
            with U.S. law. If you're outside the U.S., you're agreeing to this jurisdiction by using the service.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Dispute Resolution</h2>
          <p className="text-zinc-300 leading-relaxed">
            Let's be adults about this. If you have a problem with the service or these terms:
          </p>
          <ol className="space-y-3 text-zinc-300 list-decimal list-inside">
            <li><strong>Email us first:</strong> <a href="mailto:hi@loganalytics.org" className="text-blue-400 hover:underline">hi@loganalytics.org</a>.
            Seriously, just send an email. We're reasonable people.</li>
            <li><strong>Informal resolution:</strong> We'll work with you to find a fair solution. Most disputes can be resolved with a conversation.</li>
            <li><strong>Arbitration:</strong> If we can't resolve it informally, we'll use binding arbitration instead of going to court.
            It's faster and cheaper for everyone.</li>
          </ol>
          <p className="text-zinc-300 leading-relaxed">
            We're not here to fight with users. We built this tool to help people. If something's broken or unfair, we want to fix it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Changes to These Terms</h2>
          <p className="text-zinc-300 leading-relaxed">
            We might update these terms occasionally. Here's how we'll handle changes:
          </p>
          <ul className="space-y-3 text-zinc-300">
            <li className="flex gap-3">
              <span className="text-blue-400">→</span>
              <span><strong>All changes are public.</strong> Every edit is tracked in our GitHub repository's commit history.
              You can see exactly what changed and when.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400">→</span>
              <span><strong>Major changes get notifications.</strong> If we add paid features, change data handling, or make significant
              policy shifts, we'll email everyone who's opted into updates.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400">→</span>
              <span><strong>Continued use means acceptance.</strong> If you keep using LogAnalytics after terms change, you're agreeing
              to the new version. Don't like the changes? Stop using the service or fork the code.</span>
            </li>
          </ul>
          <p className="text-zinc-300 leading-relaxed">
            We're not going to pull a bait-and-switch. If we ever make controversial changes, the open-source community will hold us accountable.
            That's the beauty of transparency.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-6">
          <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Questions about these terms? Found a legal issue? Just want to chat about log analysis?
          </p>
          <p className="text-zinc-300">
            <strong>Email:</strong> <a href="mailto:hi@loganalytics.org" className="text-blue-400 hover:underline">hi@loganalytics.org</a>
            <br />
            <strong>GitHub:</strong> <a href="https://github.com/7and1/loganalytics" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/7and1/loganalytics</a>
          </p>
          <p className="text-sm text-zinc-500 mt-4">
            Last updated: November 2024 • <a href="https://github.com/7and1/loganalytics/commits/main/app/(routes)/terms/page.tsx" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">View change history</a>
          </p>
        </section>

        <footer className="pt-8 border-t border-zinc-800 text-sm text-zinc-500">
          <p>
            <strong>Sources and Further Reading:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>• <a href="https://opensource.org/license/mit" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">MIT License – Open Source Initiative</a></li>
            <li>• <a href="https://www.tldrlegal.com/license/mit-license" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">MIT License Explained in Plain English – TLDRLegal</a></li>
            <li>• <a href="https://tlo.mit.edu/understand-ip/exploring-mit-open-source-license-comprehensive-guide" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:underline">Exploring the MIT Open Source License – MIT Technology Licensing Office</a></li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
