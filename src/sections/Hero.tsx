import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          badge1Ref.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          badge2Ref.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4 sm:px-6 lg:px-8"
    >
      {/* Decorative curved line */}
      <svg
        className="absolute top-20 right-0 w-96 h-96 opacity-20 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M400 0C400 110.457 356.228 216.448 278.284 294.392C200.34 372.336 94.3487 416.108 -16.1084 416.108"
          stroke="#CCFF00"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
      </svg>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Stats badges */}
        <div className="flex justify-center gap-4 mb-8">
          <div
            ref={badge1Ref}
            className="bg-lime text-black px-4 py-2 rounded-full text-sm font-semibold opacity-0"
          >
            5+ <span className="font-normal">YEARS EXPERIENCE</span>
          </div>
          <div
            ref={badge2Ref}
            className="bg-lime text-black px-4 py-2 rounded-full text-sm font-semibold opacity-0"
          >
            120+ <span className="font-normal">Projects Completed</span>
          </div>
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 opacity-0"
        >
          We create <span className="text-lime">digital</span>
          <br />
          experiences that matter
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 opacity-0"
        >
          We blend strategic design, advanced technology, and creative thinking to
          deliver exceptional results for your business.
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
        >
          <Button
            size="lg"
            className="bg-lime text-black hover:bg-lime/90 rounded-full px-8 py-6 text-base font-semibold group transition-transform hover:scale-105"
          >
            Explore
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-8 py-6 text-base font-semibold transition-all"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
