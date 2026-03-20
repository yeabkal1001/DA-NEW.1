"use client";

import { useEffect, memo, useCallback } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HeroSequence } from "@/src/sections/HeroSequence";
import { Navbar } from "@/src/components/Navbar";

// Skeleton component for loading states - improves CLS
const SectionSkeleton = memo(function SectionSkeleton({ height = "h-96", bg = "bg-white" }: { height?: string; bg?: string }) {
  return <div className={`${height} ${bg} animate-pulse`} aria-hidden="true" />;
});

// Lazy load below-fold sections with optimized loading states
// Using ssr: false for heavy animation components to improve TTFB
const LogoMarquee = dynamic(
  () => import("@/src/sections/LogoMarquee").then(m => ({ default: m.LogoMarquee })),
  { loading: () => <SectionSkeleton height="h-24" />, ssr: true }
);

const Services = dynamic(
  () => import("@/src/sections/Services").then(m => ({ default: m.Services })),
  { loading: () => <SectionSkeleton height="h-96" />, ssr: true }
);

const TextMarquee = dynamic(
  () => import("@/src/sections/TextMarquee").then(m => ({ default: m.TextMarquee })),
  { loading: () => <SectionSkeleton height="h-24" />, ssr: true }
);

const Team = dynamic(
  () => import("@/src/sections/Team").then(m => ({ default: m.Team })),
  { loading: () => <SectionSkeleton height="h-screen" />, ssr: true }
);

const Tools = dynamic(
  () => import("@/src/sections/Tools").then(m => ({ default: m.Tools })),
  { loading: () => <SectionSkeleton height="h-96" />, ssr: true }
);

const Process = dynamic(
  () => import("@/src/sections/Process").then(m => ({ default: m.Process })),
  { loading: () => <SectionSkeleton height="h-96" />, ssr: true }
);

const Testimonials = dynamic(
  () => import("@/src/sections/Testimonials").then(m => ({ default: m.Testimonials })),
  { loading: () => <SectionSkeleton height="h-96" />, ssr: true }
);

const Stats = dynamic(
  () => import("@/src/sections/Stats").then(m => ({ default: m.Stats })),
  { loading: () => <SectionSkeleton height="h-64" />, ssr: true }
);

const TrustedBrands = dynamic(
  () => import("@/src/sections/TrustedBrands").then(m => ({ default: m.TrustedBrands })),
  { loading: () => <SectionSkeleton height="h-48" />, ssr: true }
);

const Contact = dynamic(
  () => import("@/src/sections/Contact").then(m => ({ default: m.Contact })),
  { loading: () => <SectionSkeleton height="h-96" />, ssr: true }
);

const Footer = dynamic(
  () => import("@/src/sections/Footer").then(m => ({ default: m.Footer })),
  { loading: () => <SectionSkeleton height="h-24" bg="bg-black" />, ssr: true }
);

// Register GSAP plugins once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  // Memoized resize handler to prevent recreation on every render
  const handleResize = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    // Configure ScrollTrigger defaults for performance
    ScrollTrigger.defaults({
      toggleActions: "play none none none",
      fastScrollEnd: true, // Better performance on fast scrolls
    });

    // Use requestIdleCallback for non-critical refresh
    const refreshScrollTrigger = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => ScrollTrigger.refresh(), { timeout: 200 });
      } else {
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    };

    refreshScrollTrigger();

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };
    
    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
      
      // Cleanup all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
      ScrollTrigger.clearMatchMedia();
    };
  }, [handleResize]);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-white">
        <HeroSequence />
        <LogoMarquee />
        <Services />
        <TextMarquee />
        <Team />
        <Tools />
        <Process />
        <Testimonials />
        <Stats />
        <TrustedBrands />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
