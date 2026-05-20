'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsapManager } from "@/src/lib/gsapManager";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    id: "01",
    title: "Discover &\nUnderstand",
    description: "We begin by learning about your business, goals, and audience. Through discussion and research, we gather the insights needed to create solutions that truly align with your vision.",
    rotation: -8,
  },
  {
    id: "02",
    title: "Plan &\nStrategize",
    description: "After understanding your needs, we build a clear strategy and roadmap. This step defines the structure, features, and direction of the project to ensure everything is focused and efficient.",
    rotation: 25,
  },
  {
    id: "03",
    title: "Design &\nCreate",
    description: "Our team transforms ideas into visually engaging and user-friendly designs. We focus on creativity, usability, and modern aesthetics to craft experiences that connect with your audience.",
    rotation: -20,
  },
  {
    id: "04",
    title: "Build &\nLaunch",
    description: "We develop the final product with precision and care. Once everything is tested and refined, we launch the project and ensure it performs smoothly for your users.",
    rotation: 32,
  },
];

const BETWEEN_TEXT = "From the first conversation to the final launch, we carefully design, develop, and refine every detail to ensure the result is not only visually engaging but also effective and impactful for your audience.";

// Canvas Sequence Setup
const ORIGINAL_FRAME_COUNT = 192;
const SKIP_STEP = 1; // Use all frames for maximum smoothness
const FRAME_COUNT = Math.ceil(ORIGINAL_FRAME_COUNT / SKIP_STEP);
const PRIORITY_FRAMES = 5;

const frameNames = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const originalIndex = i * SKIP_STEP;
  const num = String(originalIndex).padStart(3, "0");
  return `/images/Assembly/frame_${num}_delay-0.041s.webp`;
});

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>(new Array(FRAME_COUNT).fill(null));
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const img = imagesRef.current[index];
    if (!ctx || !img || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    let isMounted = true;

    const loadImages = async () => {
      // First frame immediately
      const firstImg = new Image();
      firstImg.src = frameNames[0];
      firstImg.onload = () => {
        if (!isMounted) return;
        imagesRef.current[0] = firstImg;
        if (canvasRef.current) {
          canvasRef.current.width = firstImg.naturalWidth;
          canvasRef.current.height = firstImg.naturalHeight;
        }
        drawFrame(0);
      };

      // Priority block
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

      // Remaining frames
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
    return () => { isMounted = false; };
  }, [drawFrame]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsapManager.createContext("process-section", () => {
      // Canvas Sequence ScrollTrigger
      if (isLoaded && canvasRef.current) {
        const frameObj = { frame: 0 };
        gsap.to(frameObj, {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: ".process-grid-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            pin: ".canvas-wrapper",
          },
          onUpdate: () => drawFrame(Math.round(frameObj.frame))
        });
      }

      // Card reveal animations
      gsap.utils.toArray<HTMLElement>(".process-card").forEach((card) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.92 },
          {
            y: 0, opacity: 1, scale: 1,
            ease: "power3.out", duration: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 55%",
              scrub: 1,
            }
          }
        );
      });

      // Parallax for diagonal bands - desktop only
      if (window.innerWidth >= 768) {
        gsap.to(".diagonal-band-1", {
          x: -120,
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 }
        });
        gsap.to(".diagonal-band-2", {
          x: 80,
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 }
        });
        gsap.to(".diagonal-band-3", {
          x: -100,
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 }
        });
      }

      // Header text animation
      gsap.fromTo(".process-header-text",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".process-header", start: "top 85%" }
        }
      );

    }, containerRef.current || undefined);

    return () => {
      gsapManager.killContext("process-section");
    };
  }, [isLoaded, drawFrame]);

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header */}
        <div className="process-header mb-10 md:mb-16 text-center px-4">
          <h2 className="process-header-text text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-foreground tracking-tight">
            How <span className="text-foreground dark:text-lime italic">We Bring Ideas</span>
            <br />
            to Life, Turning Vision
          </h2>
          <div className="process-header-text mt-3 md:mt-4 inline-block">
            <span className="relative inline-block">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black italic text-foreground">Into</span>
              <span className="ml-1 md:ml-2 inline-block bg-lime rounded-full px-4 md:px-6 lg:px-8 py-1 md:py-2 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black italic text-primary-foreground -rotate-2">
                Reality
              </span>
            </span>
          </div>
          <p className="process-header-text mt-6 md:mt-12 text-muted-foreground text-sm md:text-base lg:text-lg max-w-xl mx-auto px-4">
            At Digital Addis, every project begins with understanding your vision
          </p>
        </div>

        {/* ── Desktop Layout ── */}
        <div className="process-grid-container relative min-h-[1900px] w-full hidden md:block">

          {/* Diagonal Bands */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="diagonal-band-1 absolute top-[3%] left-[-20%] w-[160%] h-[70px] bg-lime -rotate-[21deg] opacity-90" />
            <div className="diagonal-band-2 absolute top-[45%] left-[-15%] w-[160%] h-[70px] bg-foreground rotate-[24deg] opacity-90" />
            <div className="diagonal-band-3 absolute top-[85%] left-[-20%] w-[160%] h-[70px] bg-lime -rotate-[8deg] opacity-90" />
          </div>

          {/* GSAP Pinned Canvas Sequence */}
          <div className="canvas-wrapper absolute top-0 left-0 h-screen w-full pointer-events-none z-[5] flex items-center justify-center"
               style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)" }}>
            {/* Loader shown if images are not ready */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lime font-mono text-[9px] tracking-[0.4em]">{loadProgress}% CACHING ASSETS</p>
              </div>
            )}
            <canvas 
              ref={canvasRef} 
              className={`max-w-none w-auto h-[120%] lg:h-[150%] object-contain drop-shadow-2xl transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>

          {/* ─── Card 1 — Discover & Understand (top-right) ─── */}
          <div
            className="process-card absolute z-10 w-[420px]"
            style={{ top: "40px", right: "10%", transform: `rotate(${processSteps[0].rotation}deg)` }}
          >
            <NotebookCard step={processSteps[0]} />
          </div>

          {/* Between-text 1 — right side, below card 1 */}
          <p className="absolute z-[20] right-[8%] top-[560px] w-[380px] text-sm text-muted-foreground font-medium leading-[1.5]">
            {BETWEEN_TEXT}
          </p>

          {/* ─── Card 2 — Plan & Strategize (mid-left) ─── */}
          <div
            className="process-card absolute z-10 w-[420px]"
            style={{ top: "440px", left: "3%", transform: `rotate(${processSteps[1].rotation}deg)` }}
          >
            <NotebookCard step={processSteps[1]} />
          </div>

          {/* Between-text 2 — left side, below card 2 */}
          <p className="absolute z-[20] left-[5%] top-[920px] w-[380px] text-sm text-muted-foreground font-medium leading-[1.5]">
            {BETWEEN_TEXT}
          </p>

          {/* ─── Card 3 — Design & Create (mid-right) ─── */}
          <div
            className="process-card absolute z-10 w-[420px]"
            style={{ top: "880px", right: "8%", transform: `rotate(${processSteps[2].rotation}deg)` }}
          >
            <NotebookCard step={processSteps[2]} />
          </div>


          {/* ─── Card 4 — Build & Launch (bottom-left) ─── */}
          <div
            className="process-card absolute z-10 w-[420px]"
            style={{ top: "1350px", left: "8%", transform: `rotate(${processSteps[3].rotation}deg)` }}
          >
            <NotebookCard step={processSteps[3]} />
          </div>
        </div>

        {/* ── Mobile Layout ── */}
        <div className="md:hidden flex flex-col gap-6 pt-4 px-4">
          {processSteps.map((step, i) => (
            <div key={i} className="process-card">
              <NotebookCardMobile step={step} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   NOTEBOOK CARD — Desktop
   Matches Figma: black outer shell (412×448),
   white inner (390×316), centered binding dot
   at black/white boundary, 2 small corner dots.
   Text is fully contained with overflow-hidden.
   ───────────────────────────────────────────────── */
function NotebookCard({ step }: { step: typeof processSteps[0] }) {
  return (
    <div className="relative group cursor-pointer select-none">
      {/* Dark outer shell — always dark, slightly lighter in dark mode */}
      <div className="bg-zinc-950 dark:bg-zinc-900 rounded-[23px] shadow-[0px_3px_6px_5px_rgba(0,0,0,0.15)] relative overflow-hidden"
        style={{ padding: "0" }}
      >
        {/* Black header area */}
        <div className="relative h-[110px]">
          {/* Small dot — top-right */}
          <div className="absolute top-5 right-7 w-[10px] h-[10px] rounded-full bg-lime shadow-inner" />
          {/* Small dot — top-left */}
          <div className="absolute top-8 left-7 w-[10px] h-[10px] rounded-full bg-lime shadow-inner" />
        </div>

        {/* Large binding dot — solid circle */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[50px] z-20 w-[42px] h-[42px] rounded-full bg-background shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />

        {/* White inner content area */}
        <div className="bg-background rounded-[20px] mx-3 mb-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-7 pt-8 pb-8 min-h-[280px] flex flex-col">
            <h3 className="text-[48px] lg:text-[58px] font-extrabold text-foreground dark:text-lime leading-[0.88] tracking-tight whitespace-pre-line mb-5 group-hover:scale-[1.02] transition-transform duration-300 origin-left">
              {step.title}
            </h3>

            <p className="text-foreground text-[15px] leading-[1.6] font-normal mt-auto">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NOTEBOOK CARD — Mobile
   ───────────────────────────────────────────── */
function NotebookCardMobile({ step }: { step: typeof processSteps[0] }) {
  return (
    <div className="relative select-none">
      <div className="bg-zinc-950 dark:bg-zinc-900 rounded-[18px] shadow-lg relative overflow-hidden">
        {/* Black header */}
        <div className="relative h-[70px]">
          <div className="absolute top-4 right-5 w-2 h-2 rounded-full bg-lime shadow-inner" />
          <div className="absolute top-6 left-5 w-2 h-2 rounded-full bg-lime shadow-inner" />
        </div>

        {/* Center dot — solid circle */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[30px] z-20 w-7 h-7 rounded-full bg-background shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />

        {/* White inner */}
        <div className="bg-background rounded-[14px] mx-2.5 mb-2.5 shadow overflow-hidden">
          <div className="p-5 pt-5 pb-6 min-h-[180px] flex flex-col">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground dark:text-lime leading-[0.88] tracking-tight whitespace-pre-line mb-4">
              {step.title}
            </h3>
            <p className="text-foreground text-sm leading-relaxed font-normal mt-auto">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
