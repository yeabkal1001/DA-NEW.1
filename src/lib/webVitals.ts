import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

export interface WebVitalsMetrics {
  cls?: number;
  fcp?: number;
  inp?: number; // INP replaced FID in web-vitals v4+
  lcp?: number;
  ttfb?: number;
  timestamp: number;
}

class WebVitalsTracker {
  private metrics: WebVitalsMetrics = {
    timestamp: Date.now(),
  };
  private callbacks: ((metrics: WebVitalsMetrics) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeTracking();
    }
  }

  private initializeTracking(): void {
    // Track CLS (Cumulative Layout Shift)
    onCLS((metric: Metric) => {
      this.metrics.cls = metric.value;
      this.notifyCallbacks();
    });

    // Track FCP (First Contentful Paint)
    onFCP((metric: Metric) => {
      this.metrics.fcp = metric.value;
      this.notifyCallbacks();
    });

    // Track INP (Interaction to Next Paint - replaced FID)
    onINP((metric: Metric) => {
      this.metrics.inp = metric.value;
      this.notifyCallbacks();
    });

    // Track LCP (Largest Contentful Paint)
    onLCP((metric: Metric) => {
      this.metrics.lcp = metric.value;
      this.notifyCallbacks();
    });

    // Track TTFB (Time to First Byte)
    onTTFB((metric: Metric) => {
      this.metrics.ttfb = metric.value;
      this.notifyCallbacks();
    });
  }

  private notifyCallbacks(): void {
    this.callbacks.forEach((callback) => callback(this.metrics));
  }

  /**
   * Subscribe to metrics updates
   */
  subscribe(callback: (metrics: WebVitalsMetrics) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  /**
   * Get current metrics
   */
  getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  /**
   * Check if metrics meet good thresholds (Core Web Vitals)
   */
  isHealthy(): boolean {
    return (
      (this.metrics.cls === undefined || this.metrics.cls < 0.1) &&
      (this.metrics.fcp === undefined || this.metrics.fcp < 1800) &&
      (this.metrics.inp === undefined || this.metrics.inp < 200) &&
      (this.metrics.lcp === undefined || this.metrics.lcp < 2500) &&
      (this.metrics.ttfb === undefined || this.metrics.ttfb < 800)
    );
  }

  /**
   * Log metrics to console (development only)
   */
  logMetrics(): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', {
        CLS: this.metrics.cls?.toFixed(3),
        FCP: this.metrics.fcp?.toFixed(0) + 'ms',
        INP: this.metrics.inp?.toFixed(0) + 'ms',
        LCP: this.metrics.lcp?.toFixed(0) + 'ms',
        TTFB: this.metrics.ttfb?.toFixed(0) + 'ms',
        isHealthy: this.isHealthy(),
      });
    }
  }

  /**
   * Send metrics to analytics service
   */
  async sendMetrics(endpoint: string): Promise<void> {
    try {
      // Wait for metrics to be collected
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.getMetrics()),
        keepalive: true,
      });

      if (!response.ok && process.env.NODE_ENV === 'development') {
        console.warn('[Web Vitals] Failed to send metrics');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Web Vitals] Error sending metrics:', error);
      }
    }
  }
}

// Export singleton
export const vitalsTracker = typeof window !== 'undefined' ? new WebVitalsTracker() : null;

export default vitalsTracker;
