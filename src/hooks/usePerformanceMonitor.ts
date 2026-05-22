'use client';

import { useEffect, useRef } from 'react';

export function usePerformanceMonitor(componentName: string) {
  const renderCountRef = useRef(0);
  const mountTimeRef = useRef<number | null>(null);

  // Increment render count on every commit safely inside an effect
  useEffect(() => {
    renderCountRef.current += 1;
  });

  useEffect(() => {
    mountTimeRef.current = performance.now();
    const start = mountTimeRef.current;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Perf] Component <${componentName}> Mounted at ${start.toFixed(2)}ms`);
    }

    return () => {
      const end = performance.now();
      const lifetime = end - start;
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[Perf] Component <${componentName}> Unmounted. Lifetime: ${lifetime.toFixed(2)}ms. Renders: ${renderCountRef.current}`
        );
      }
    };
  }, [componentName]);

  const startAction = (actionName: string) => {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Perf] <${componentName}> Action [${actionName}] took ${duration.toFixed(2)}ms`);
      }
    };
  };

  return { startAction };
}
