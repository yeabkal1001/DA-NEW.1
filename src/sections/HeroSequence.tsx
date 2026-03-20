'use client';

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Register GSAP plugin once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 192;
const PRIORITY_FRAMES = 10;

// Pre-compute frame names at module level for performance
const frameNames = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const num = String(i).padStart(3, "0");
  const delay = (i % 3 === 0 || i === 0) ? "0.041s" : "0.042s";
  return `/images/compressed-files (2)/frame_${num}_delay-${delay}_compressed.webp`;
});

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>(new Array(FRAME_COUNT).fill(null));
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

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

  useEffect(() => {
    let loadedCount = 0;
    let isMounted = true;
    let rafId: number = 0;

    const loadImages = async () => {
      // Priority 1: First frame immediately
      const firstImg = new Image();
      firstImg.src = frameNames[0];
      firstImg.onload = () => {
        if (!isMounted) return;
        imagesRef.current[0] = firstImg;
        drawFrame(0);
      };

      // Priority 2: Priority block (10-15 frames) for initial scroll experience
      for (let i = 0; i < PRIORITY_FRAMES; i++) {
        if (!isMounted) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.decoding = "async";
        img.src = frameNames[i];
        await new Promise((resolve) => {
          img.onload = () => {
            imagesRef.current[i] = img;
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            resolve(null);
          };
          img.onerror = resolve;
        });
      }

      setIsLoaded(true);

      // Priority 3: Remaining frames using requestIdleCallback to stay off the main thread
      const loadRemaining = (startIndex: number) => {
        if (!isMounted || startIndex >= FRAME_COUNT) return;

        const task = () => {
          const batchSize = 3;
          const end = Math.min(startIndex + batchSize, FRAME_COUNT);
          
          for (let i = startIndex; i < end; i++) {
            const img = new Image();
            img.src = frameNames[i];
            img.onload = () => {
              imagesRef.current[i] = img;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            };
          }
          
          if (end < FRAME_COUNT) {
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(() => loadRemaining(end));
            } else {
              setTimeout(() => loadRemaining(end), 100);
            }
          }
        };

        task();
      };

      loadRemaining(PRIORITY_FRAMES);
    };

    loadImages();
    return () => { 
      isMounted = false; 
      cancelAnimationFrame(rafId);
    };
  }, [drawFrame]);

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

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
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

      const frameObj = { frame: 0 };
      scrollTl.to(frameObj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        duration: 1,
        onUpdate: () => drawFrame(Math.round(frameObj.frame))
      }, 0);

      scrollTl.to(progressFillRef.current, { scaleY: 1, ease: "none" }, 0);
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

        {/* Progress bar - hidden on mobile */}
        <div className="hero-progress-track hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-white/5 z-50">
          <div ref={progressFillRef} className="hero-progress-fill w-full h-full bg-lime origin-top scale-y-0 shadow-[0_0_15px_rgba(204,255,0,0.4)]" />
        </div>

        {/* Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[100] bg-black flex items-center justify-center">
            <p className="text-lime font-mono text-[9px] tracking-[0.4em]">{loadProgress}% CACHING ASSETS</p>
          </div>
        )}

        {/* Hero Copy */}
        <div ref={heroContentRef} className="absolute inset-x-0 top-[25%] sm:top-[22%] md:top-[18%] z-20 flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 text-center mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden">
            <div className="hero-badge border border-white/10 bg-black/40 backdrop-blur-xl px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-white/70 uppercase">
              Est. 2018
            </div>
            <div className="hero-badge border border-lime/30 bg-lime/10 backdrop-blur-xl px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-lime uppercase font-black">
              Innovation First
            </div>
          </div>

          <h1 className="hero-title select-none w-full" style={{ perspective: "1500px" }}>
            <span className="hero-line block text-3xl sm:text-4xl md:text-5xl lg:text-[8rem] xl:text-[10rem] font-black text-white leading-[0.85] tracking-tighter uppercase">ARCHITECTING</span>
            <span className="hero-line block text-3xl sm:text-4xl md:text-5xl lg:text-[8rem] xl:text-[10rem] font-black text-lime leading-[0.85] tracking-tighter uppercase">THE DIGITAL</span>
            <span className="hero-line block text-3xl sm:text-4xl md:text-5xl lg:text-[8rem] xl:text-[10rem] font-black text-white leading-[0.85] italic tracking-tighter uppercase">FUTURE.</span>
          </h1>

          <div className="hero-subtitle-wrap mt-6 md:mt-10 lg:mt-12 max-w-xl md:max-w-2xl mx-auto px-2">
             <p className="hero-subtitle text-white/50 text-sm md:text-base lg:text-xl leading-relaxed tracking-tight">
               We specialize in crafting bespoke digital experiences where advanced strategy meets human-centric design.
             </p>
          </div>

          <div className="hero-cta mt-8 md:mt-12 lg:mt-14 flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6 w-full sm:w-auto px-4">
            <Button className="bg-lime text-black hover:bg-white rounded-full px-8 md:px-12 py-6 md:py-8 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.25em] transition-all duration-700 shadow-2xl shadow-lime/20 hover:-translate-y-1 w-full sm:w-auto">
              Explore Work <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5" />
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:border-white/60 rounded-full px-8 md:px-12 py-6 md:py-8 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.25em] hover:bg-white/5 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 w-full sm:w-auto">
              Start Project
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div ref={aboutContentRef} className="absolute inset-0 z-10 opacity-0 pointer-events-none flex flex-col justify-center px-4 sm:px-6 md:px-20 items-center text-center">
          <div className="w-16 md:w-24 h-[1px] bg-lime/40 mb-8 md:mb-12" />
          <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] lg:text-[7rem] font-black text-white max-w-7xl leading-[0.9] tracking-tighter uppercase select-none">
            <span className="about-title-line block">BEYOND PIXELS.</span>
            <span className="about-title-line block text-white/20 italic">WE BUILD SYSTEMS.</span>
          </h2>
          <p className="mt-6 md:mt-10 text-white/40 max-w-xl md:max-w-3xl text-sm md:text-lg lg:text-xl leading-relaxed font-light lowercase px-4">
            Multidisciplinary thinking meets cutting-edge engineering. We architect digital ecosystems that drive growth and inspire interaction.
          </p>
          <div className="mt-10 md:mt-14 lg:mt-16 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-24">
            <div className="text-center group">
              <p className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">120+</p>
              <p className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] mt-2 md:mt-3 lg:mt-4 font-bold">Solutions Delivered</p>
            </div>
            <div className="text-center group">
              <p className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">15+</p>
              <p className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] mt-2 md:mt-3 lg:mt-4 font-bold">Core Technologists</p>
            </div>
            <div className="text-center group">
              <p className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">5yr</p>
              <p className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] mt-2 md:mt-3 lg:mt-4 font-bold">Innovation Legacy</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
