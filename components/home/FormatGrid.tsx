import Link from "next/link";
import formatsData from "@/data/formats";
import type { LogFormat } from "@/types/content";

const formats = formatsData as LogFormat[];

export function FormatGrid() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Catalog</p>
          <h2 className="text-2xl font-bold text-white">Popular Formats</h2>
        </div>
        <Link href="/formats" className="text-sm text-blue-400 hover:text-blue-300">
          View all formats &rarr;
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {formats.slice(0, 8).map((format) => (
          <Link
            key={format.slug}
            href={`/format/${format.slug}`}
            className="rounded-2xl border border-white/5 bg-zinc-900/60 p-4 transition hover:border-blue-500/40"
          >
            <div className="text-sm font-semibold text-white">{format.name}</div>
            <p className="mt-2 line-clamp-2 text-xs text-zinc-400">{format.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
