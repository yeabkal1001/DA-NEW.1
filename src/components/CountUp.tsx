'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2,
  suffix = "",
  className,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          gsap.to(
            { value: 0 },
            {
              value: end,
              duration: duration,
              ease: "power2.out",
              onUpdate: function () {
                setCount(Math.floor(this.targets()[0].value));
              },
            }
          );
        },
      });
    });

    return () => ctx.revert();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
