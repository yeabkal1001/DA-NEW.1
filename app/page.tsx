"use client";

import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HeroSequence } from "@/src/sections/HeroSequence";
import { Navbar } from "@/src/components/Navbar";

// Critical path - load synchronously
// const LogoMarquee = dynamic(() => import("@/src/sections/LogoMarquee").then(m => ({ default: m.LogoMarquee })));

// Lazy load below-fold sections with Suspense boundaries
const LogoMarquee = dynamic(
  () => import("@/src/sections/LogoMarquee").then(m => ({ default: m.LogoMarquee })),
  { loading: () => <div className="h-24 bg-white" /> }
);

const Services = dynamic(
  () => import("@/src/sections/Services").then(m => ({ default: m.Services })),
  { loading: () => <div className="h-96 bg-white" /> }
);

const TextMarquee = dynamic(
  () => import("@/src/sections/TextMarquee").then(m => ({ default: m.TextMarquee })),
  { loading: () => <div className="h-24 bg-white" /> }
);

const Team = dynamic(
  () => import("@/src/sections/Team").then(m => ({ default: m.Team })),
  { loading: () => <div className="h-screen bg-white" /> }
);

const Tools = dynamic(
  () => import("@/src/sections/Tools").then(m => ({ default: m.Tools })),
  { loading: () => <div className="h-96 bg-white" /> }
);

const Process = dynamic(
  () => import("@/src/sections/Process").then(m => ({ default: m.Process })),
  { loading: () => <div className="h-96 bg-white" /> }
);

const Testimonials = dynamic(
  () => import("@/src/sections/Testimonials").then(m => ({ default: m.Testimonials })),
  { loading: () => <div className="h-96 bg-white" /> }
);

const Stats = dynamic(
  () => import("@/src/sections/Stats").then(m => ({ default: m.Stats })),
  { loading: () => <div className="h-64 bg-white" /> }
);

const TrustedBrands = dynamic(
  () => import("@/src/sections/TrustedBrands").then(m => ({ default: m.TrustedBrands })),
  { loading: () => <div className="h-48 bg-white" /> }
);

const Contact = dynamic(
  () => import("@/src/sections/Contact").then(m => ({ default: m.Contact })),
  { loading: () => <div className="h-96 bg-white" /> }
);

const Footer = dynamic(
  () => import("@/src/sections/Footer").then(m => ({ default: m.Footer })),
  { loading: () => <div className="h-24 bg-black" /> }
);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: "play none none none",
    });

    // Refresh ScrollTrigger on load with a delay to ensure layout is ready
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Handle resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(refreshTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      
      // Properly clean up all ScrollTriggers
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => trigger.kill(true));
      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
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
      <Footer />
    </main>
  );
}
