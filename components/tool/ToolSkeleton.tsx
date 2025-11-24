export function ToolSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 lg:grid-cols-3">
      <div className="h-96 animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900/60" />
      <div className="lg:col-span-2">
        <div className="h-96 animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900/60" />
      </div>
    </div>
  );
}
