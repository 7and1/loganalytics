import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 py-12 text-sm text-zinc-500">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-white">LogAnalytics</p>
          <p className="mt-2 text-zinc-400">DuckDB-Wasm powered, 100% local-first.</p>
        </div>
        <div>
          <p className="font-semibold text-white">Product</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/formats" className="hover:text-white">
                Supported Formats
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:text-white">
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white">Contact</p>
          <p className="mt-3 text-zinc-400">hi@loganalytics.org</p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-zinc-500">
        © {new Date().getFullYear()} LogAnalytics.org. Local compute, zero data retention.
      </p>
    </footer>
  );
}
