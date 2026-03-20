'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const PRIORITY_FRAMES = 10;
const BATCH_SIZE = 20;

function getFramePath(index: number): string {
  const num = String(index).padStart(3, "0");
  // Matching user's file format: frame_000_delay-0.041s_compressed.webp
  // Since delays vary slightly in filenames, we'll need to handle the specific pattern
  // However, usually it's easier if we have a consistent pattern. 
  // Let's use a mapping or a specific pattern if possible.
  // Given the list_dir output: frame_000_delay-0.041s_compressed.webp, frame_001_delay-0.042s_compressed.webp
  // This is tricky. I'll use a helper to match the pattern or assume a specific one.
  return num; 
}

// Full list of filenames for precision
const frameNames = Array.from({ length: 192 }, (_, i) => {
  const num = String(i).padStart(3, "0");
  const delay = (i % 3 === 0 || i === 0) ? "0.041s" : "0.042s"; // Pattern observed in list_dir
  return `/images/compressed-files (2)/frame_${num}_delay-${delay}_compressed.webp`;
});

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>(new Array(FRAME_COUNT).fill(null));
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Canvas drawing logic
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const img = imagesRef.current[index];
    if (!ctx || !img || !img.complete) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Preload Logic
  useEffect(() => {
    let loadedCount = 0;
    let isMounted = true;

    const loadImages = async () => {
      // Prioritize first few frames
      for (let i = 0; i < PRIORITY_FRAMES; i++) {
        if (!isMounted) return;
        const img = new Image();
        img.src = frameNames[i];
        await new Promise((resolve) => {
          img.onload = () => {
            imagesRef.current[i] = img;
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            if (i === 0) drawFrame(0);
            resolve(null);
          };
          img.onerror = resolve;
        });
      }

      setIsLoaded(true); // Show content once initial frames are ready

      // Load rest in batches
      for (let i = PRIORITY_FRAMES; i < FRAME_COUNT; i++) {
        if (!isMounted) return;
        const img = new Image();
        img.src = frameNames[i];
        img.onload = () => {
          imagesRef.current[i] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        };
      }
    };

    loadImages();
    return () => { isMounted = false; };
  }, [drawFrame]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Scroll Animations
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance
      gsap.from(".hero-line", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.5
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: ".hero-sequence-pinned",
        }
      });

      // Frame scrub
      const frameObj = { frame: 0 };
      scrollTl.to(frameObj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        duration: 1,
        onUpdate: () => drawFrame(Math.round(frameObj.frame))
      }, 0);

      // Progress bar
      scrollTl.to(progressFillRef.current, { scaleY: 1, ease: "none" }, 0);

      // Content Transitions
      scrollTl.to(heroContentRef.current, { opacity: 0, y: -100, duration: 0.2 }, 0.2);
      scrollTl.fromTo(aboutContentRef.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.3 }, 
        0.4
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="hero-sequence-container" style={{ height: "500vh" }}>
      <div className="hero-sequence-pinned h-screen w-full sticky top-0 overflow-hidden bg-black">
        
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

        <div className="hero-sequence-overlay absolute inset-0 z-[1] bg-black/50 pointer-events-none" />
        <div className="hero-sequence-vignette absolute inset-0 z-[3] shadow-[inset_0_0_150px_60px_rgba(0,0,0,0.8)] pointer-events-none" />
        <div className="hero-sequence-grain absolute inset-0 z-[4] opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Progress bar */}
        <div className="hero-progress-track absolute right-8 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-white/5 z-50">
          <div ref={progressFillRef} className="hero-progress-fill w-full h-full bg-lime origin-top scale-y-0 shadow-[0_0_15px_rgba(204,255,0,0.4)]" />
        </div>

        {/* Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[100] bg-black flex items-center justify-center">
            <p className="text-lime font-mono text-[9px] tracking-[0.4em]">{loadProgress}% CACHING ASSETS</p>
          </div>
        )}

        {/* Hero Copy - Centered and scaled for better proportions */}
        <div ref={heroContentRef} className="absolute inset-x-0 top-[20%] md:top-[18%] z-20 flex flex-col items-center justify-center px-6 md:px-20 text-center mx-auto max-w-7xl">
          <div className="flex gap-4 mb-10 overflow-hidden">
            <div className="hero-badge border border-white/10 bg-black/40 backdrop-blur-xl px-6 py-2 rounded-full text-[10px] tracking-[0.4em] text-white/70 uppercase">
              Est. 2018
            </div>
            <div className="hero-badge border border-lime/30 bg-lime/10 backdrop-blur-xl px-6 py-2 rounded-full text-[10px] tracking-[0.4em] text-lime uppercase font-black">
              Innovation First
            </div>
          </div>

          <h1 className="hero-title select-none w-full" style={{ perspective: "1500px" }}>
            <span className="hero-line block text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase">ARCHITECTING</span>
            <span className="hero-line block text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black text-lime leading-[0.8] tracking-tighter uppercase">THE DIGITAL</span>
            <span className="hero-line block text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black text-white leading-[0.8] italic tracking-tighter uppercase">FUTURE.</span>
          </h1>

          <div className="hero-subtitle-wrap mt-10 md:mt-12 max-w-2xl mx-auto">
             <p className="hero-subtitle text-white/50 text-base md:text-xl leading-relaxed tracking-tight underline-offset-4 decoration-lime/30">
               We specialize in crafting bespoke digital experiences where advanced strategy meets human-centric design. Elevating bold brands into the new era of interaction.
             </p>
          </div>

          <div className="hero-cta mt-12 md:mt-14 flex flex-wrap justify-center gap-6">
            <Button className="bg-lime text-black hover:bg-white rounded-full px-12 py-8 text-xs font-black uppercase tracking-[0.25em] transition-all duration-700 shadow-2xl shadow-lime/20 hover:-translate-y-1">
              Explore Work <ArrowRight className="ml-3 w-5 h-4" />
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:border-white/60 rounded-full px-12 py-8 text-xs font-black uppercase tracking-[0.25em] hover:bg-white/5 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1">
              Start Project
            </Button>
          </div>
        </div>

        {/* Global About Section */}
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
