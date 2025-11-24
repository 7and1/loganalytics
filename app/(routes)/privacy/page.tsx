export const metadata = {
  title: "Privacy Policy",
  description: "LogAnalytics operates entirely client-side. This document explains what we do (and don't) collect.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto max-w-3xl px-4 space-y-10">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <section>
          <h2 className="text-2xl font-semibold">Local Processing</h2>
          <p className="mt-2 text-sm text-zinc-400">
            All parsing, SQL execution, and visualization runs inside your browser. We never proxy or upload log files to our servers.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Offline Shield</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Enable the kill switch to block third-party fetches. Only same-origin assets (Next.js chunks) are allowed while shielded.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Telemetry</h2>
          <p className="mt-2 text-sm text-zinc-400">
            We do not ship tracking pixels or analytics scripts. If you opt into feedback, emails are stored in a separate CRM and never linked to log content.
          </p>
        </section>
      </div>
    </main>
  );
}
