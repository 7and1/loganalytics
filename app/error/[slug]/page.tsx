import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import errorsData from "@/data/errors.json";
import type { ErrorGuide } from "@/types/content";

const guides = errorsData as ErrorGuide[];

type ErrorParams = {
  slug: string;
};

type ErrorPageProps = {
  params: Promise<ErrorParams>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.code }));
}

export async function generateMetadata({ params }: ErrorPageProps): Promise<Metadata> {
  const resolved = await params;
  const guide = guides.find((entry) => entry.code.toLowerCase() === resolved.slug.toLowerCase());
  if (!guide) {
    return {
      title: "Log Error",
    };
  }
  return {
    title: `${guide.code} – ${guide.title}`,
    description: guide.symptom,
  };
}

export default async function ErrorPage({ params }: ErrorPageProps) {
  const resolved = await params;
  const guide = guides.find((entry) => entry.code.toLowerCase() === resolved.slug.toLowerCase());
  if (!guide) {
    notFound();
  }

  const searchParams = guide.sql_query
    ? new URLSearchParams({ query: guide.sql_query })
    : new URLSearchParams();

  const analyzeHref = `/?${searchParams.toString()}`;

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <Link href="/" className="text-sm text-emerald-500 hover:text-emerald-400">
        ← Back to analyzer
      </Link>
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-emerald-500">Troubleshooting</p>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{guide.title}</h1>
        <p className="text-zinc-600 dark:text-zinc-300">{guide.symptom}</p>
      </header>
      <section className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">SQL Lens</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Run this query locally to surface offenders.</p>
        <pre className="mt-4 overflow-auto rounded-2xl bg-zinc-950/80 p-4 text-xs text-emerald-200">
          <code>{guide.sql_query}</code>
        </pre>
        <Link
          href={analyzeHref}
          className="mt-4 inline-flex items-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 hover:bg-emerald-500"
        >
          Investigate in HUD
        </Link>
      </section>
      <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Playbook</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-zinc-700 dark:text-zinc-200">
          {guide.solution_steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
