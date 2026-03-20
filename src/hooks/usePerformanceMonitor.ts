import { useEffect, useRef } from 'react';
import { vitalsTracker } from '@/src/lib/webVitals';

/**
 * Hook to monitor and track performance metrics
 */
export function usePerformanceMonitor(componentName?: string) {
  const componentRef = useRef(componentName || 'unknown');

  useEffect(() => {
    const startTime = performance.now();

    // Log component mount time
    const markName = `${componentRef.current}-mount`;
    performance.mark(markName);

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Log component unmount time
      const endMarkName = `${componentRef.current}-unmount`;
      performance.mark(endMarkName);
      performance.measure(
        `${componentRef.current}-lifetime`,
        markName,
        endMarkName
      );

      if (duration > 1000) {
        console.warn(
          `[Performance] ${componentRef.current} took ${duration.toFixed(0)}ms to render`
        );
      }
    };
  }, []);

  return {
    getMetrics: () => vitalsTracker?.getMetrics() ?? { timestamp: Date.now() },
    isHealthy: () => vitalsTracker?.isHealthy() ?? true,
    logMetrics: () => vitalsTracker?.logMetrics(),
  };
}

/**
 * Hook to measure render time between dependency changes
 */
export function useMeasureRender(
  componentName?: string,
  deps?: React.DependencyList
) {
  const renderRef = useRef(0);

  useEffect(() => {
    const startTime = performance.now();
    renderRef.current = startTime;

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (renderTime > 50) {
        console.warn(
          `[Render Performance] ${componentName || 'Component'} render took ${renderTime.toFixed(2)}ms`
        );
      }
    };
  }, deps);
}

/**
 * Hook to detect slow operations
 */
export function useSlowOperation(
  operation: () => void,
  operationName: string = 'operation',
  threshold: number = 16 // ~60fps frame budget
) {
  return () => {
    const startTime = performance.now();
    try {
      operation();
    } finally {
      const endTime = performance.now();
      const duration = endTime - startTime;

      if (duration > threshold) {
        console.warn(
          `[Slow Operation] ${operationName} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`
        );
      }
    }
  };
}
