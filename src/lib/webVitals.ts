// Web Vitals measurement module
// Can be integrated with next/app or custom analytics

export interface Metric {
  name: 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  id: string;
  entries: PerformanceEntry[];
}

export function reportWebVitals(metric: Metric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}ms (ID: ${metric.id})`);
  }
}
