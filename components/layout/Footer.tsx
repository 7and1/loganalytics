import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white/90 py-12 text-sm text-slate-500">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-slate-900">LogAnalytics</p>
          <p className="mt-2 text-slate-500">DuckDB-Wasm powered, 100% local-first.</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Product</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/formats" className="transition hover:text-blue-600">
                Supported Formats
              </Link>
            </li>
            <li>
              <Link href="/samples" className="transition hover:text-blue-600">
                Sample Logs
              </Link>
            </li>
            <li>
              <Link href="/docs" className="transition hover:text-blue-600">
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Company</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/privacy" className="transition hover:text-blue-600">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-blue-600">
                Terms
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Community</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href="https://github.com/7and1/loganalytics"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-blue-600"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:hi@loganalytics.org" className="transition hover:text-blue-600">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-slate-400">
        © {new Date().getFullYear()} LogAnalytics.org. Local compute, zero data retention.
      </p>
    </footer>
  );
}
