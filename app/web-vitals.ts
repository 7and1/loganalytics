/**
 * Web Vitals reporting
 * Uncomment and implement when analytics is added
 */

export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: 'web-vital' | 'custom';
}) {
  // TODO: Send to analytics service when implemented
  // For now, log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }

  // Example: Send to Plausible, Umami, or your analytics
  /*
  if (window.plausible) {
    window.plausible('Web Vitals', {
      props: {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_id: metric.id,
      },
    });
  }
  */
}
