/**
 * Centralized logging utility
 * Prevents console.log from leaking to production
 */

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * Debug logs (only in development)
   */
  log: (...args: any[]) => {
    if (isDev) {
      console.log('[LogAnalytics]', ...args);
    }
  },

  /**
   * Info logs (only in development)
   */
  info: (...args: any[]) => {
    if (isDev) {
      console.info('[Info]', ...args);
    }
  },

  /**
   * Warning logs (always shown)
   */
  warn: (...args: any[]) => {
    console.warn('[Warning]', ...args);
  },

  /**
   * Error logs (always shown + could send to error tracking)
   */
  error: (...args: any[]) => {
    console.error('[Error]', ...args);

    // TODO: Send to error tracking service when implemented
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(args[0]);
    // }
  },

  /**
   * Performance timing
   */
  time: (label: string) => {
    if (isDev) {
      console.time(label);
    }
  },

  timeEnd: (label: string) => {
    if (isDev) {
      console.timeEnd(label);
    }
  },

  /**
   * Group logs
   */
  group: (label: string) => {
    if (isDev) {
      console.group(label);
    }
  },

  groupEnd: () => {
    if (isDev) {
      console.groupEnd();
    }
  },
};

// Export as default for convenience
export default logger;
