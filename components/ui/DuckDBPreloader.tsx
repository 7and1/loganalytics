'use client';

import { useEffect, useState } from 'react';
import { initDuckDB } from '@/lib/duckdb';

export function DuckDBPreloader() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;

    const preloadDuckDB = async () => {
      if (!mounted) return;

      setStatus('loading');

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 300);

      try {
        await initDuckDB();
        if (mounted) {
          setProgress(100);
          setStatus('ready');
          clearInterval(progressInterval);

          // Auto-hide after success
          setTimeout(() => {
            if (mounted) setStatus('idle');
          }, 2000);
        }
      } catch (error) {
        console.error('DuckDB preload failed:', error);
        if (mounted) {
          setStatus('error');
          clearInterval(progressInterval);
        }
      }
    };

    preloadDuckDB();

    return () => {
      mounted = false;
    };
  }, []);

  // Don't show anything if idle (already hidden or not started)
  if (status === 'idle') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-5">
      <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-xl">
        {status === 'loading' && (
          <>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
                <p className="text-sm font-semibold text-slate-900">Initializing DuckDB</p>
              </div>
              <span className="text-xs text-slate-500">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-blue-50">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Loading local SQL engine... (~7MB)
            </p>
          </>
        )}

        {status === 'ready' && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Ready!</p>
              <p className="text-xs text-slate-500">DuckDB initialized</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Initialization failed</p>
              <p className="text-xs text-slate-500">Please refresh the page</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
