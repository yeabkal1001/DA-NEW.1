"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HeroSequence } from "@/src/sections/HeroSequence";
import { Navbar } from "@/src/components/Navbar";
import { LogoMarquee } from "@/src/sections/LogoMarquee";
import { Services } from "@/src/sections/Services";
import { TextMarquee } from "@/src/sections/TextMarquee";
import { Team } from "@/src/sections/Team";
import { Tools } from "@/src/sections/Tools";
import { Process } from "@/src/sections/Process";
import { Testimonials } from "@/src/sections/Testimonials";
import { Stats } from "@/src/sections/Stats";
import { TrustedBrands } from "@/src/sections/TrustedBrands";
import { Contact } from "@/src/sections/Contact";
import { Footer } from "@/src/sections/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: "play none none none",
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
