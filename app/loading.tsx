export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

        {/* Loading Text */}
        <p className="text-sm font-medium text-slate-600">Loading LogAnalytics...</p>
      </div>
    </div>
  );
}
