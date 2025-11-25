import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import formatsData from "@/data/formats";
import samplesData from "@/data/samples.json";
import { getFormatDefaultQuery } from "@/lib/content";
import type { LogFormat, SampleAsset } from "@/types/content";

const formats = formatsData as LogFormat[];
const samples = samplesData as SampleAsset[];

type FormatParams = {
  slug: string;
};

type FormatPageProps = {
  params: Promise<FormatParams>;
};

export function generateStaticParams() {
  return formats.map((format) => ({ slug: format.slug }));
}

export async function generateMetadata({ params }: FormatPageProps): Promise<Metadata> {
  const resolved = await params;
  const format = formats.find((entry) => entry.slug === resolved.slug);
  if (!format) {
    return {
      title: "Log Format",
    };
  }
  return {
    title: format.meta_title,
    description: format.meta_desc,
  };
}

export default async function FormatPage({ params }: FormatPageProps) {
  const resolved = await params;
  const format = formats.find((entry) => entry.slug === resolved.slug);
  if (!format) {
    notFound();
  }
  const resolvedFormat = format;

  const defaultQuery = getFormatDefaultQuery(resolvedFormat);
  const baseParams = new URLSearchParams({
    logType: resolvedFormat.slug,
    query: defaultQuery,
  });

  const analyzeHref = `/?${baseParams.toString()}`;
  const sampleAsset = samples.find((sample) => sample.format === resolvedFormat.slug);
  let sampleHref: string | null = null;
  if (sampleAsset) {
    const sampleParams = new URLSearchParams(baseParams.toString());
    sampleParams.set("sample", sampleAsset.file);
    sampleHref = `/?${sampleParams.toString()}`;
  }

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-emerald-600">Log Encyclopedia</p>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{resolvedFormat.name}</h1>
        <p className="max-w-3xl text-lg text-zinc-600 dark:text-zinc-300">{resolvedFormat.description}</p>
        <p className="text-sm text-zinc-500">Category: {resolvedFormat.category}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Regex Pattern</h2>
          <pre className="mt-3 overflow-auto rounded-xl bg-zinc-950/90 p-4 text-xs text-emerald-200">
            <code>{resolvedFormat.regex}</code>
          </pre>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">DuckDB Schema</h2>
          <pre className="mt-3 overflow-auto rounded-xl bg-zinc-950/90 p-4 text-xs text-amber-100">
            <code>{resolvedFormat.duckdb_schema}</code>
          </pre>
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6">
        <h2 className="text-xl font-semibold text-emerald-900">Ready to analyze?</h2>
        <p className="mt-1 text-sm text-emerald-900/80">
          Click below to open the local DuckDB tool preloaded for {resolvedFormat.name}.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={analyzeHref}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500"
          >
            Analyze Now (Local & Private)
          </Link>
          <code className="rounded-full bg-black/70 px-4 py-2 text-xs text-emerald-100">
            Prefilled SQL: {defaultQuery}
          </code>
        </div>
      </section>
      {sampleAsset && sampleHref && (
        <section className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 text-sm text-blue-50">
          <h3 className="text-base font-semibold text-blue-200">Need demo data?</h3>
          <p className="mt-1 text-blue-100/80">
            Load our curated sample ({sampleAsset.size_kb} KB) to see Auto-Charts, rejects, and HUD insights instantly.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={sampleAsset.file}
              download
              className="rounded-full border border-blue-200/40 px-4 py-2 text-xs font-semibold text-blue-100 transition hover:border-blue-100"
            >
              Download sample file
            </a>
            <Link
              href={sampleHref}
              className="rounded-full border border-blue-200/40 px-4 py-2 text-xs font-semibold text-blue-50 transition hover:border-blue-100"
            >
              Load sample in HUD
            </Link>
          </div>
        </section>
      )}
      {resolvedFormat.relatedErrors?.length ? (
        <section className="rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Common {resolvedFormat.name} Errors
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Investigate frequent error signatures without leaving the browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {resolvedFormat.relatedErrors.map((code) => (
              <Link
                key={code}
                href={`/error/${code}`}
                className="rounded-full border border-zinc-300/70 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-500 dark:border-zinc-700 dark:text-zinc-200"
              >
                Error {code}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
