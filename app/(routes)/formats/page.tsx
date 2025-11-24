import Link from "next/link";
import formatsData from "@/data/formats";
import type { LogFormat } from "@/types/content";

const formats = formatsData as LogFormat[];

export const metadata = {
  title: "Supported Log Formats",
  description: "Regex patterns, schemas, and SQL presets for every parser shipped in LogAnalytics.",
};

export default function FormatsPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h1 className="text-4xl font-bold">Formats Catalog</h1>
        <p className="mt-2 text-zinc-400">Auto-detect signatures, DuckDB schemas, and recommended queries.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {formats.map((format) => (
            <Link
              key={format.slug}
              href={`/format/${format.slug}`}
              className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6 transition hover:border-blue-400/40"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-blue-400">{format.category}</p>
              <h2 className="mt-2 text-2xl font-semibold">{format.name}</h2>
              <p className="mt-2 text-sm text-zinc-400">{format.description}</p>
              <p className="mt-4 text-xs text-zinc-500">Regex length: {format.regex.length} chars</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
