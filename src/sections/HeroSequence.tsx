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

const ORIGINAL_FRAME_COUNT = 192;
const SKIP_STEP = 4;
const FRAME_COUNT = Math.ceil(ORIGINAL_FRAME_COUNT / SKIP_STEP);
const PRIORITY_FRAMES = 5;

// Pre-compute frame names at module level for performance
const frameNames = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const originalIndex = i * SKIP_STEP;
  const num = String(originalIndex).padStart(3, "0");
  const delay = (originalIndex % 3 === 0 || originalIndex === 0) ? "0.041s" : "0.042s";
  return `/images/image sequence/frame_${num}_delay-${delay}_compressed.webp`;
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
        
        {/* Right Side Video (Split Layout) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[55%] h-full z-0 overflow-hidden md:rounded-l-[3rem] shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05]" />
          <div className="hero-sequence-overlay absolute inset-0 z-[1] bg-black/20 pointer-events-none" />
        </div>

        <div className="hero-sequence-vignette absolute inset-0 z-[3] shadow-[inset_0_0_150px_60px_rgba(0,0,0,0.8)] pointer-events-none hidden md:block" />
        <div className="hero-sequence-grain absolute inset-0 z-[4] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Progress bar - hidden on mobile */}
        <div className="hero-progress-track hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-white/5 z-50">
          <div ref={progressFillRef} className="hero-progress-fill w-full h-full bg-lime scale-y-0 shadow-[0_0_15px_rgba(204,255,0,0.4)]" />
        </div>

        {/* Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[100] bg-black flex items-center justify-center">
            <p className="text-lime font-mono text-[9px] tracking-[0.4em]">{loadProgress}% CACHING ASSETS</p>
          </div>
        )}

        {/* Hero Copy (Split Layout) */}
        <div ref={heroContentRef} className="absolute inset-y-0 left-0 w-full md:w-[45%] z-20 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 text-left pb-20 md:pb-0">
          <h1 className="hero-title select-none w-full" style={{ perspective: "1500px" }}>
            <span className="font-moonwalk block text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem] text-white leading-[0.85] tracking-[0.05em] drop-shadow-2xl hero-line">
              Digital<br/>Addis
            </span>
          </h1>

          <div className="hero-subtitle-wrap mt-6 md:mt-8 max-w-sm lg:max-w-md pr-4">
             <p className="hero-subtitle text-white/70 text-sm lg:text-base leading-relaxed tracking-wide font-light">
               We Innovate. We Secure. We Transform. Step into the future with our cutting-edge digital solutions and creative branding.
             </p>
          </div>

          <div className="hero-cta mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-start gap-4">
            <Button className="bg-transparent border border-white/20 text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-[10px] md:text-xs tracking-[0.2em] transition-all duration-500 w-full sm:w-auto">
              Discover <span className="ml-3 font-serif">→</span>
            </Button>
            <Button variant="ghost" className="bg-white/5 border border-white/5 hover:bg-white/10 text-white rounded-full px-6 py-6 text-[10px] md:text-xs tracking-[0.1em] transition-all duration-500 w-full sm:w-auto group">
              <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              </span>
              Connect With Us
            </Button>
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="absolute bottom-0 left-0 w-full z-30 flex gap-6 px-6 sm:px-12 md:px-16 lg:px-24 py-6 md:py-8 items-center bg-gradient-to-t from-black/80 to-transparent border-t border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-4 cursor-pointer group shrink-0">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white transition-colors">
                <svg className="w-4 h-4 text-white group-hover:text-black translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
             </div>
             <span className="text-[10px] font-bold tracking-widest text-white uppercase hidden sm:block">Play Trailer</span>
          </div>

          <div className="flex-1 hidden lg:flex items-center gap-8 xl:gap-12 ml-6 xl:ml-16">
            <div className="flex items-center gap-3 max-w-[220px]">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                 <span className="text-[10px] text-white">1</span>
              </div>
              <p className="text-[9px] text-white/50 leading-relaxed">To deliver innovative digital solutions, empowering businesses to excel and adapt.</p>
            </div>
            <div className="flex items-center gap-3 max-w-[220px]">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                 <span className="text-[10px] text-white">2</span>
              </div>
              <p className="text-[9px] text-white/50 leading-relaxed">To be a global leader in digital innovation, transforming technology into seamless experiences.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto shrink-0 relative z-50">
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white"><span className="text-[10px] font-bold uppercase tracking-widest">in</span></a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white"><span className="text-[10px] font-bold uppercase tracking-widest">ig</span></a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white"><span className="text-[10px] font-bold uppercase tracking-widest">x</span></a>
          </div>
        </div>

        {/* About Section */}
        <div ref={aboutContentRef} className="absolute inset-0 z-10 opacity-0 pointer-events-none flex flex-col justify-center px-4 sm:px-6 md:px-20 items-center text-center">
          <div className="w-16 md:w-24 h-[1px] bg-lime/40 mb-8 md:mb-12" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-light text-white max-w-5xl mx-auto leading-[1.1] tracking-tight select-none mb-4 md:mb-6">
            <span className="about-title-line block">Elevating Brands.</span>
            <span className="about-title-line block text-white/40">Solving Challenges.</span>
          </h2>
          <p className="mt-6 md:mt-10 text-white/40 max-w-xl md:max-w-3xl text-sm md:text-lg lg:text-xl leading-relaxed font-light lowercase px-4">
            Technology should make people’s work easier, safer and more meaningful. We are a multidisciplinary team focused on solving real-world challenges through long-term partnerships and people-centric design.
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
              <p className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">10+yr</p>
              <p className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] mt-2 md:mt-3 lg:mt-4 font-bold">Innovation Legacy</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
