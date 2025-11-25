'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mb-8 text-slate-600">
          We encountered an unexpected error. This might be due to a browser compatibility issue or a temporary glitch.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-red-900">Error Details:</p>
            <pre className="overflow-auto text-xs text-red-700">{error.message}</pre>
            {error.digest && (
              <p className="mt-2 text-xs text-red-600">Digest: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-400 hover:bg-blue-50"
          >
            Go Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-slate-500">
          If this problem persists, please{' '}
          <a
            href="https://github.com/7and1/loganalytics/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-500"
          >
            report it on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
