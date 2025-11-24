import Link from "next/link";
import errors from "@/data/errors.json";
import type { ErrorGuide } from "@/types/content";

const guides = errors as ErrorGuide[];

export const metadata = {
  title: "Error Library",
  description: "Troubleshoot common HTTP and platform error codes directly from your browser.",
};

export default function ErrorsPage() {
  return (
    <main className="bg-zinc-950 py-24 text-white">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold">Error Guides</h1>
        <p className="mt-2 text-zinc-400">Each guide links to the HUD with a pre-baked SQL template.</p>
        <div className="mt-10 space-y-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/error/${guide.code}`}
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-900/40 px-6 py-4 hover:border-blue-500/40"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">{guide.platform}</p>
                <p className="text-xl font-semibold text-white">{guide.title}</p>
              </div>
              <span className="text-sm text-blue-400">View guide &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
