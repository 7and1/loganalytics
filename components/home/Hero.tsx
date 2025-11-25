import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 text-center">
      {/* Badge - 加大 */}
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700 ring-1 ring-blue-200/50">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold">Local-First Log Intelligence</span>
      </div>

      <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
        LogAnalytics helps you parse brutal log storms without leaving your browser
      </h1>
      <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
        Drop raw files, auto-detect formats, and fire DuckDB SQL with the same calm control room vibe SpaceX flight controllers enjoy.
        It feels futuristic, but it is all happening on your laptop.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="#tool"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/40"
        >
          Try It Now — Free
        </a>
        <Link
          href="/samples"
          className="inline-flex items-center justify-center rounded-full border-2 border-blue-200 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:border-blue-400 hover:bg-blue-50"
        >
          View Sample Logs
        </Link>
      </div>

      {/* Trust Indicators - 重新设计 */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <div className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 px-4 py-2.5 ring-1 ring-emerald-200/50 transition hover:ring-emerald-300">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-emerald-900">100% Local</span>
        </div>

        <div className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2.5 ring-1 ring-blue-200/50 transition hover:ring-blue-300">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-blue-900">No Sign-up</span>
        </div>

        <div className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 px-4 py-2.5 ring-1 ring-violet-200/50 transition hover:ring-violet-300">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-violet-900">Open Source</span>
        </div>
      </div>
    </section>
  );
}
