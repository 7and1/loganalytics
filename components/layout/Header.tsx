import Link from "next/link";
import { Github } from "lucide-react";
import { TrustBadge } from "@/components/layout/TrustBadge";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-100/70 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <Logo className="h-10 w-10 drop-shadow-lg" />
          <span>LogAnalytics</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/formats" className="transition hover:text-blue-600">
            Formats
          </Link>
          <Link href="/samples" className="transition hover:text-blue-600">
            Samples
          </Link>
          <Link href="/errors" className="transition hover:text-blue-600">
            Errors
          </Link>
          <Link href="/docs" className="transition hover:text-blue-600">
            Docs
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/7and1/loganalytics"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 transition hover:text-blue-600"
          >
            <Github className="h-5 w-5" />
          </a>
          <TrustBadge />
          <Link
            href="/#tool"
            className="hidden rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500 md:inline-flex"
          >
            Launch Tool
          </Link>
        </div>
      </div>
    </header>
  );
}
