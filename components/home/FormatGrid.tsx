import Link from "next/link";
import formatsData from "@/data/formats";
import type { LogFormat } from "@/types/content";

const formats = formatsData as LogFormat[];

export function FormatGrid() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Catalog</p>
          <h2 className="text-2xl font-bold text-slate-900">Popular Formats</h2>
        </div>
        <Link href="/formats" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
          View all formats &rarr;
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {formats.slice(0, 8).map((format) => (
          <Link
            key={format.slug}
            href={`/format/${format.slug}`}
            className="rounded-2xl border border-blue-50 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <div className="text-sm font-semibold text-slate-900">{format.name}</div>
            <p className="mt-2 line-clamp-2 text-xs text-slate-600">{format.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
