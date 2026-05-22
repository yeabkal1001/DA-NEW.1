'use client';

import { useEffect, useRef, DependencyList } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scopes a GSAP animation to a ref, automatically cleaning up context on unmount or dependency change.
 */
export function useScrollAnimation<T extends HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = []
) {
  const elementRef = useRef<T | null>(null);
  const callbackRef = useRef(callback);

  // Keep callbackRef up to date with the latest callback
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context((c) => {
      callbackRef.current(c);
    }, elementRef.current || undefined);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return elementRef;
}
