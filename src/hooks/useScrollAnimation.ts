import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  onComplete?: () => void;
}

export function useScrollAnimation(
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      callback(ctx);
    }, ref.current);

    return () => {
      ctx.revert();
    };
  }, deps);

  return ref;
}

export function useScrollTrigger(
  element: HTMLElement | null,
  animation: (trigger: ScrollTrigger) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      onEnter: () => animation(trigger),
    });

    return () => {
      trigger.kill();
    };
  }, [element, ...deps]);
}
