import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
        </div>

        {/* Message */}
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Page Not Found</h2>
        <p className="mb-8 text-slate-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Quick Links */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
          >
            Go Home
          </Link>
          <Link
            href="/formats"
            className="inline-flex items-center justify-center rounded-full border-2 border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-400 hover:bg-blue-50"
          >
            Browse Formats
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="text-sm text-slate-500">
          <p className="mb-2">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/samples" className="text-blue-600 hover:underline">
              Sample Logs
            </Link>
            <Link href="/docs" className="text-blue-600 hover:underline">
              Documentation
            </Link>
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
