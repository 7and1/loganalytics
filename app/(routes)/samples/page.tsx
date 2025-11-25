import Link from "next/link";
import formatsData from "@/data/formats";
import samplesData from "@/data/samples.json";
import { getFormatDefaultQuery } from "@/lib/content";
import type { LogFormat, SampleAsset } from "@/types/content";

const samples = samplesData as SampleAsset[];
const formats = formatsData as LogFormat[];
const formatLookup = new Map(formats.map((format) => [format.slug, format]));

export const metadata = {
  title: "Sample Logs",
  description: "Download curated sample logs or load them directly into the in-browser DuckDB HUD.",
};

export default function SamplesPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto w-full max-w-5xl space-y-12 px-4">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Sample Library</p>
          <h1 className="text-4xl font-bold">Downloadable Log Fixtures</h1>
          <p className="text-zinc-400">
            Every sample is safe to share publicly and pre-tagged with URL parameters so you can inspect charts and rejects in one click.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {samples.map((sample) => {
            const format = formatLookup.get(sample.format);
            const analyzeHref = buildAnalyzeHref(sample, format);
            return (
              <article
                key={sample.slug}
                className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-6"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{format?.category ?? "Sample"}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{sample.name}</h2>
                  <p className="mt-2 text-sm text-zinc-400">{sample.description}</p>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-xs text-zinc-400">
                  <div>
                    <dt className="font-semibold text-zinc-500">Format</dt>
                    <dd className="text-zinc-100">{format?.name ?? sample.format}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-zinc-500">Size</dt>
                    <dd className="text-zinc-100">{sample.size_kb} KB</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href={sample.file}
                    download
                    className="rounded-full border border-white/10 px-4 py-2 font-semibold text-white transition hover:border-white/40"
                  >
                    ⬇️ Download file
                  </a>
                  <Link
                    href={analyzeHref}
                    className="rounded-full border border-emerald-400/40 px-4 py-2 font-semibold text-emerald-200 transition hover:border-emerald-300"
                  >
                    🚀 Load in HUD
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function buildAnalyzeHref(sample: SampleAsset, format?: LogFormat) {
  const params = new URLSearchParams({ sample: sample.file });
  if (format) {
    params.set("logType", format.slug);
    params.set("query", getFormatDefaultQuery(format));
  }
  return `/?${params.toString()}`;
}
