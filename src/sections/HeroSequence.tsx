'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Update this path to your uploaded video in public/
const VIDEO_SRC = "/Woman_orbiting_in_202603191649.mp4";

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Essential for mobile and desktop precision
    video.load();
    video.muted = true;
    video.playsInline = true;
    
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    return () => video.removeEventListener('canplaythrough', handleCanPlayThrough);
  }, []);

  useEffect(() => {
    if (!isLoaded || !videoRef.current || !containerRef.current) return;

    const video = videoRef.current;
    const container = containerRef.current;
    
    video.pause();
    video.currentTime = 0;

    const ctx = gsap.context(() => {
      // ─── Entrance animation ───
      const entranceTl = gsap.timeline({ delay: 0.5 });
      entranceTl.from(".hero-line", {
        opacity: 0,
        y: 60,
        rotateX: -15,
        duration: 1,
        stagger: 0.1,
        sm: 0,
        ease: "power4.out"
      })
      .from(".hero-badge", { opacity: 0, scale: 0.9, stagger: 0.1 }, "-=0.7")
      .from(".hero-subtitle", { opacity: 0, y: 20 }, "-=0.5")
      .from(".hero-cta", { opacity: 0, y: 20 }, "-=0.4")
      .from(scrollIndicatorRef.current, { opacity: 0 }, "-=0.3");

      // ─── High-Precision Scrubbing Logic ───
      // We use a proxy object to handle sub-frame calculations for buttery smoothness
      const scrollValue = { time: 0 };
      
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Increased smoothing value to "weight" the scroll
          pin: ".hero-sequence-pinned",
          pinSpacing: true,
          onUpdate: (self) => {
             // Sub-millisecond precision scrubbing
             const targetTime = self.progress * (video.duration || 0);
             gsap.to(scrollValue, {
               time: targetTime,
               duration: 0.1,
               overwrite: true,
               onUpdate: () => {
                 if (video) video.currentTime = scrollValue.time;
               }
             });
          }
        }
      });

      // Progress bar (mirrors the scroll progress)
      scrollTl.to(progressFillRef.current, {
        scaleY: 1,
        ease: "none"
      }, 0);

      // Fade out hero content
      scrollTl.to(heroContentRef.current, {
        opacity: 0,
        y: -100,
        pointerEvents: "none",
        duration: 0.2
      }, 0.1);

      // Reveal about content
      scrollTl.fromTo(aboutContentRef.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.3 },
        0.4
      );

      // About section items
      scrollTl.from(".about-title-line", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.2
      }, 0.5);

    }, container);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="hero-sequence-container" style={{ height: "500vh" }}>
      <div className="hero-sequence-pinned h-screen w-full sticky top-0 overflow-hidden bg-black">
        
        {/* Video layer */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ willChange: "transform, opacity" }}
        />

        {/* Overlays for premium cinematic depth */}
        <div className="hero-sequence-overlay absolute inset-0 z-[1] bg-black/50 pointer-events-none" />
        <div className="hero-sequence-vignette absolute inset-0 z-[3] shadow-[inset_0_0_150px_60px_rgba(0,0,0,0.8)] pointer-events-none" />
        <div className="hero-sequence-grain absolute inset-0 z-[4] opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Dynamic Progress indicator */}
        <div className="hero-progress-track absolute right-8 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-white/5 z-50">
          <div ref={progressFillRef} className="hero-progress-fill w-full h-full bg-lime origin-top scale-y-0 shadow-[0_0_15px_rgba(204,255,0,0.4)]" />
        </div>

        {/* High-end Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-[2px] bg-white/10 overflow-hidden relative">
                 <div className="absolute inset-0 bg-lime animate-line-loader" />
              </div>
              <p className="text-lime font-mono text-[9px] tracking-[0.4em] uppercase opacity-60">SYNCHRONIZING REPOSITORY</p>
            </div>
          </div>
        )}

        {/* Hero Copy */}
        <div ref={heroContentRef} className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-20 max-w-5xl">
          <div className="flex gap-4 mb-10 overflow-hidden">
            <div className="hero-badge border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-2 rounded-full text-[9px] tracking-[0.3em] text-white/60 uppercase">
              Est. 2018
            </div>
            <div className="hero-badge border border-lime/20 bg-lime/10 backdrop-blur-xl px-5 py-2 rounded-full text-[9px] tracking-[0.3em] text-lime uppercase font-bold">
              Innovation First
            </div>
          </div>

          <h1 className="hero-title select-none" style={{ perspective: "1000px" }}>
            <span className="hero-line block text-5xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter">ARCHITECTING</span>
            <span className="hero-line block text-5xl md:text-[9rem] font-black text-lime leading-[0.85] tracking-tighter">THE DIGITAL</span>
            <span className="hero-line block text-5xl md:text-[9rem] font-black text-white leading-[0.85] italic tracking-tighter">FUTURE.</span>
          </h1>

          <div className="hero-subtitle-wrap mt-12 max-w-lg overflow-hidden">
             <p className="hero-subtitle text-white/40 text-sm md:text-lg leading-relaxed lowercase tracking-tight">
               We specialize in crafting bespoke digital experiences where advanced strategy meets human-centric design. Elevating bold brands into the new era of interaction.
             </p>
          </div>

          <div className="hero-cta mt-12 flex flex-wrap gap-5">
            <Button className="bg-lime text-black hover:bg-white rounded-full px-10 py-7 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-xl shadow-lime/5">
              Explore Work <ArrowRight className="ml-3 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-white/10 text-white hover:border-white/40 rounded-full px-10 py-7 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-500">
              Start Project
            </Button>
          </div>
        </div>

        {/* Scroll Call-to-action */}
        <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 group cursor-pointer opacity-0">
          <span className="text-[9px] text-white/20 uppercase tracking-[0.6em] group-hover:text-white/60 transition-colors">Scroll</span>
          <div className="w-[1px] h-12 bg-lime/10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-lime animate-scroll-dash" />
          </div>
        </div>

        {/* Global Cinematic About Section */}
        <div ref={aboutContentRef} className="absolute inset-0 z-10 opacity-0 pointer-events-none flex flex-col justify-center px-6 md:px-20 items-center text-center">
          <div className="w-24 h-[1px] bg-lime/40 mb-12" />
          <h2 className="text-5xl md:text-[7rem] font-black text-white max-w-7xl leading-[0.9] tracking-tighter uppercase select-none">
            <span className="about-title-line block">BEYOND PIXELS.</span>
            <span className="about-title-line block text-white/20 italic">WE BUILD SYSTEMS.</span>
          </h2>
          <p className="mt-10 text-white/40 max-w-3xl text-xl leading-relaxed font-light lowercase">
            Multidisciplinary thinking meets cutting-edge engineering. We don't just design websites; we architect digital ecosystems that drive growth and inspire interaction.
          </p>
          <div className="mt-16 flex gap-12 md:gap-24">
            <div className="text-center group">
              <p className="text-5xl md:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">120+</p>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] mt-4 font-bold">Solutions Delivered</p>
            </div>
            <div className="text-center group">
              <p className="text-5xl md:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">15+</p>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] mt-4 font-bold">Core Technologists</p>
            </div>
            <div className="text-center group">
              <p className="text-5xl md:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">5yr</p>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] mt-4 font-bold">Innovation Legacy</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
