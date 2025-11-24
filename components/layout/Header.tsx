import Link from "next/link";
import { Github } from "lucide-react";
import { TrustBadge } from "@/components/layout/TrustBadge";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-b from-blue-500 to-indigo-600" />
          LogAnalytics
        </Link>
        <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
          <Link href="/formats" className="hover:text-white">
            Formats
          </Link>
          <Link href="/errors" className="hover:text-white">
            Errors
          </Link>
          <Link href="/docs" className="hover:text-white">
            Docs
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/7and1/loganalytics"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 transition hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
          <TrustBadge />
        </div>
      </div>
    </header>
  );
}
