'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { gsapManager } from "@/src/lib/gsapManager";

// Register GSAP plugin once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ORIGINAL_FRAME_COUNT = 120;
const SKIP_STEP = 2; // Sample to 60 frames for performance
const FRAME_COUNT = Math.ceil(ORIGINAL_FRAME_COUNT / SKIP_STEP);

const DIVE_ORIGINAL_FRAME_COUNT = 247;
const DIVE_SKIP_STEP = 2; // Sample to ~124 frames
const DIVE_FRAME_COUNT = Math.ceil(DIVE_ORIGINAL_FRAME_COUNT / DIVE_SKIP_STEP);

const TOTAL_FRAMES = FRAME_COUNT + DIVE_FRAME_COUNT;
const PRIORITY_FRAMES = 5;

// Pre-compute frame names at module level for performance
const frameNamesTurn = Array.from({ length: FRAME_COUNT }, (_, i) => {
  // Reverse the sequence so we start from the side profile and end at the front view
  const reversedI = FRAME_COUNT - 1 - i;
  const originalIndex = reversedI * SKIP_STEP;
  const num = String(originalIndex).padStart(3, "0");
  return `/images/background-remover/frame_${num}_delay-0.041s.png`;
});

const frameNamesDive = Array.from({ length: DIVE_FRAME_COUNT }, (_, i) => {
  const originalIndex = i * DIVE_SKIP_STEP;
  const num = String(originalIndex).padStart(3, "0");
  return `/images/image sequence 2 processed/frame_${num}_delay-0.041s.webp`;
});

const allFrameNames = [...frameNamesTurn, ...frameNamesDive];

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const diveTextRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>(new Array(TOTAL_FRAMES).fill(null));
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];
    if (!ctx || !img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-mode with slight over-zoom to crop out watermarks at the edges
    const scale = Math.max(cw / iw, ch / ih) * 1.2; 
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    let sy = (ch - sh) / 2;

    // Second batch (dive) adjustment: move image higher if it feels too low compared to turn sequence
    if (index >= FRAME_COUNT) {
      sy -= (ch * 0.15); // Precise shift up by 15% of viewport height
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, [imagesRef]);

  useEffect(() => {
    let loadedCount = 0;
    let isMounted = true;

    const loadImages = async () => {
      // Priority 1: First frame immediately
      const firstImg = new Image();
      firstImg.src = allFrameNames[0];
      firstImg.onload = () => {
        if (!isMounted) return;
        imagesRef.current[0] = firstImg;
        // Lock internal canvas resolution to the image's native resolution exactly once
        if (canvasRef.current) {
          // Set canvas to screen size so cover-mode draw works correctly
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
        drawFrame(0);
      };

      // Priority 2: Priority block (10-15 frames) for initial scroll experience
      for (let i = 0; i < PRIORITY_FRAMES; i++) {
        if (!isMounted) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.decoding = "async";
        img.src = allFrameNames[i];
        await new Promise((resolve) => {
          img.onload = () => {
            imagesRef.current[i] = img;
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve(null);
          };
          img.onerror = resolve;
        });
      }

      setIsLoaded(true);

      // Priority 3: Remaining frames using requestIdleCallback to stay off the main thread
      const loadRemaining = (startIndex: number) => {
        if (!isMounted || startIndex >= TOTAL_FRAMES) return;

        const task = () => {
          const batchSize = 3;
          const end = Math.min(startIndex + batchSize, TOTAL_FRAMES);
          
          for (let i = startIndex; i < end; i++) {
            const img = new Image();
            img.src = allFrameNames[i];
            img.onload = () => {
              imagesRef.current[i] = img;
              loadedCount++;
              setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            };
          }
          
          if (end < TOTAL_FRAMES) {
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
    };
  }, [drawFrame]);

  // Match canvas pixel dimensions to the window — redraw current frame on resize
  useEffect(() => {
    const syncCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-draw current frame at new size
      drawFrame(0);
    };

    syncCanvasSize();
    window.addEventListener('resize', syncCanvasSize, { passive: true });
    return () => window.removeEventListener('resize', syncCanvasSize);
  }, [drawFrame]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    gsapManager.createContext("hero-sequence", () => {
      gsap.from(".hero-line", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 2.5
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
      
      // --- PART 1: The Turn Begins (0 -> 1.0) ---
      // 40 frames / 1.0 duration
      scrollTl.to(frameObj, {
        frame: 40,
        ease: "none",
        duration: 1.0,
        onUpdate: () => drawFrame(Math.round(frameObj.frame))
      }, 0);
      
      scrollTl.to(progressFillRef.current, { scaleY: 0.33, ease: "none", duration: 1.0 }, 0);
      scrollTl.to(heroContentRef.current, { opacity: 0, y: -100, duration: 0.3 }, 0.7); 
      
      const isMobile = window.innerWidth < 768;

      // Start model on the right (or center on mobile)
      gsap.set(canvasRef.current, { x: isMobile ? "0vw" : "20vw" });

      // --- PART 2: Elevating Brands (1.0 -> 1.5) ---
      // 20 frames / 0.5 duration (Matches speed of Part 1)
      scrollTl.to(frameObj, {
        frame: FRAME_COUNT - 1, // 59
        ease: "none",
        duration: 0.5,
        onUpdate: () => drawFrame(Math.round(frameObj.frame))
      }, 1.0);
      
      scrollTl.to(progressFillRef.current, { scaleY: 0.66, ease: "none", duration: 0.5 }, 1.0);
      scrollTl.fromTo(aboutContentRef.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.2 }, 1.05
      );
      scrollTl.to(aboutContentRef.current, { opacity: 0, y: -100, duration: 0.2 }, 1.4);
      
      // Move model to the left while scrolling to match text on the right
      if (!isMobile) {
        scrollTl.to(canvasRef.current, {
          x: "-20vw",
          duration: 1.5, // Spans Part 1 and 2
          ease: "none"
        }, 0);
      }

      // --- PART 3: The Dive & HUD (1.5 -> 3.0) ---
      // 60 frames / 1.5 duration (Matches speed of Part 1 & 2)
      scrollTl.to(frameObj, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        duration: 1.5,
        onUpdate: () => drawFrame(Math.round(frameObj.frame))
      }, 1.5);
      
      scrollTl.to(progressFillRef.current, { scaleY: 1, ease: "none", duration: 1.5 }, 1.5);
      
      // Move model back to center before the zoom gets too deep
      if (!isMobile) {
        scrollTl.to(canvasRef.current, {
          x: "0vw",
          duration: 0.6,
          ease: "power2.out"
        }, 1.5);
      }

      // Reveal a single, ultra-minimal section label at the start of the dive  
      scrollTl.fromTo(diveTextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" },
        1.7
      );
      scrollTl.to(diveTextRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" }, 2.3);

    }, containerRef.current || undefined);

    return () => {
      gsapManager.killContext("hero-sequence");
    };
  }, [isLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="hero-sequence-container" style={{ height: "1200vh" }}>
      <div className="hero-sequence-pinned h-screen w-full sticky top-0 overflow-hidden bg-background perspective-[1000px]">
        
        {/* Canvas covers 100% of screen via JS cover-mode draw */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none" 
        />


        <div className="hero-sequence-grain absolute inset-0 z-[4] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Progress bar - hidden on mobile */}
        <div className="hero-progress-track hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-white/5 z-50">
          <div ref={progressFillRef} className="hero-progress-fill w-full h-full bg-lime scale-y-0 shadow-[0_0_15px_rgba(204,255,0,0.4)]" />
        </div>

        {/* Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[100] bg-background flex items-center justify-center">
            <p className="text-lime font-mono text-[9px] tracking-[0.4em]">{loadProgress}% CACHING ASSETS</p>
          </div>
        )}

        {/* Hero Copy (Overlay Layout) */}
        <div ref={heroContentRef} className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 text-left items-start pb-20 md:pb-0 pointer-events-none">
          <div className="max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl pointer-events-auto">
            <h1 className="hero-title select-none w-full" style={{ perspective: "1500px" }}>
              <span className="block text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem] text-foreground leading-[0.85] tracking-[0.05em] drop-shadow-2xl hero-line">
                Digital<br/>Addis
              </span>
            </h1>

            <div className="hero-subtitle-wrap mt-6 md:mt-8 pl-4 md:pl-8 text-foreground/70">
               <p className="hero-subtitle text-sm lg:text-base leading-relaxed tracking-wide font-medium md:font-light">
                 We Innovate. We Secure. We Transform. Step into the future with our cutting-edge digital solutions and creative branding.
               </p>
            </div>
          </div>

          <div className="hero-cta mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-start gap-4 pointer-events-auto">
            <Button className="bg-transparent border border-foreground/20 text-foreground hover:bg-foreground hover:text-background rounded-full px-8 py-6 text-[10px] md:text-xs tracking-[0.2em] transition-all duration-500 w-full sm:w-auto">
              Discover <span className="ml-3 font-serif">→</span>
            </Button>
            <Button variant="ghost" className="bg-foreground/5 border border-foreground/5 hover:bg-foreground/10 text-foreground rounded-full px-6 py-6 text-[10px] md:text-xs tracking-[0.1em] transition-all duration-500 w-full sm:w-auto group">
              <span className="bg-foreground text-background rounded-full w-6 h-6 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              </span>
              Connect With Us
            </Button>
          </div>
        </div>



        {/* Part 3: Single ultra-minimal section label — the dive breathes on its own */}
        <div ref={diveTextRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center gap-3 pointer-events-none opacity-0">
          <div className="h-[1px] w-12 bg-white/40" />
          <p className="text-white/60 font-mono text-[9px] tracking-[0.5em] uppercase">03 — Enter the World</p>
        </div>

        {/* Part 2: About Section (Right Alignment with Image on Left) */}
        <div ref={aboutContentRef} className="absolute inset-0 z-10 opacity-0 pointer-events-none flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 text-right items-end">
          <div className="w-16 md:w-24 h-[1px] bg-lime/40 mb-8 md:mb-12" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-light text-foreground max-w-5xl leading-[1.1] tracking-tight select-none mb-4 md:mb-6">
            <span className="about-title-line block">Elevating Brands.</span>
            <span className="about-title-line block text-foreground/40">Solving Challenges.</span>
          </h2>
          <p className="mt-6 md:mt-10 text-foreground/60 max-w-xl md:max-w-3xl text-sm md:text-lg lg:text-xl leading-relaxed font-light lowercase pr-4 about-description">
            Technology should make people’s work easier, safer and more meaningful. We are a multidisciplinary team focused on solving real-world challenges through long-term partnerships and people-centric design.
          </p>
          <div className="mt-10 md:mt-14 lg:mt-16 flex flex-wrap justify-end gap-10 sm:gap-12 md:gap-16 lg:gap-24">
            <div className="text-right group">
              <p className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">120+</p>
              <p className="text-[8px] md:text-[9px] text-foreground/50 uppercase tracking-[0.3em] md:tracking-[0.4em] mt-2 md:mt-3 lg:mt-4 font-bold">Solutions Delivered</p>
            </div>
            
            <div className="text-right group">
              <p className="text-4xl md:text-5xl lg:text-7xl text-foreground">30<span className="text-lime text-2xl md:text-3xl lg:text-5xl align-top">+</span></p>
              <p className="text-[8px] md:text-[9px] text-foreground/50 uppercase tracking-[0.3em] md:tracking-[0.4em] mt-2 md:mt-3 lg:mt-4 font-bold">Core Technologists</p>
            </div>

            <div className="text-right group">
              <p className="text-4xl md:text-5xl lg:text-7xl text-foreground">05<span className="text-lime text-2xl md:text-3xl lg:text-5xl align-top">+</span></p>
              <p className="text-[8px] md:text-[9px] text-foreground/50 uppercase tracking-[0.3em] md:tracking-[0.4em] mt-2 md:mt-3 lg:mt-4 font-bold">Innovation Legacy</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
