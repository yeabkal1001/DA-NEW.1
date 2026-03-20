import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

export interface WebVitalsMetrics {
  cls?: number;
  fcp?: number;
  fid?: number;
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
    // Track CLS
    getCLS((metric) => {
      this.metrics.cls = metric.value;
      this.notifyCallbacks();
    });

    // Track FCP
    getFCP((metric) => {
      this.metrics.fcp = metric.value;
      this.notifyCallbacks();
    });

    // Track FID (Interaction to Next Paint in some browsers)
    getFID((metric) => {
      this.metrics.fid = metric.value;
      this.notifyCallbacks();
    });

    // Track LCP
    getLCP((metric) => {
      this.metrics.lcp = metric.value;
      this.notifyCallbacks();
    });

    // Track TTFB
    getTTFB((metric) => {
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
   * Check if metrics meet good thresholds
   */
  isHealthy(): boolean {
    return (
      (this.metrics.cls === undefined || this.metrics.cls < 0.1) &&
      (this.metrics.fcp === undefined || this.metrics.fcp < 1800) &&
      (this.metrics.fid === undefined || this.metrics.fid < 100) &&
      (this.metrics.lcp === undefined || this.metrics.lcp < 2500) &&
      (this.metrics.ttfb === undefined || this.metrics.ttfb < 600)
    );
  }

  /**
   * Log metrics to console
   */
  logMetrics(): void {
    console.log('[Web Vitals]', {
      CLS: this.metrics.cls?.toFixed(3),
      FCP: this.metrics.fcp?.toFixed(0) + 'ms',
      FID: this.metrics.fid?.toFixed(0) + 'ms',
      LCP: this.metrics.lcp?.toFixed(0) + 'ms',
      TTFB: this.metrics.ttfb?.toFixed(0) + 'ms',
      isHealthy: this.isHealthy(),
    });
  }

  /**
   * Send metrics to analytics service
   */
  async sendMetrics(endpoint: string): Promise<void> {
    try {
      // Wait a bit for all metrics to be collected
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.getMetrics()),
        keepalive: true,
      });

      if (!response.ok) {
        console.warn('[Web Vitals] Failed to send metrics');
      }
    } catch (error) {
      console.warn('[Web Vitals] Error sending metrics:', error);
    }
  }
}

// Export singleton
export const vitalsTracker = new WebVitalsTracker();

export default vitalsTracker;
