'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// The exact path data used by both the visible dashed trail and the arrow
const MOTION_PATH = "M 1050 250 C 900 350, 500 450, 310 620 C 200 720, 250 780, 400 830 C 600 900, 900 950, 1050 1050 C 900 1150, 500 1250, 350 1450";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
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

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Arrow follows the dotted path on scroll — desktop only
      if (pathRef.current && arrowRef.current && window.innerWidth >= 768) {
        gsap.set(arrowRef.current, {
          opacity: 1,
          scale: 1,
        });

        gsap.to(arrowRef.current, {
          motionPath: {
            path: "#process-motion-path",
            align: "#process-motion-path",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
            end: 1,
          },
          ease: "none",
          scrollTrigger: {
            trigger: ".process-grid-container",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.5,
          },
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

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header */}
        <div className="process-header mb-10 md:mb-16 text-center px-4">
          <h2 className="process-header-text text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-foreground tracking-tight">
            How <span className="text-lime italic">We Bring Ideas</span>
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

          {/* SVG — Dotted Path + Arrow (both inside same SVG so coordinates match exactly) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]" viewBox="0 0 1400 1900" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="arrow-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* The visible dashed trail */}
            <path
              ref={pathRef}
              id="process-motion-path"
              d={MOTION_PATH}
              fill="none"
              stroke="currentColor"
              className="text-foreground/15"
              strokeWidth="2"
              strokeDasharray="10 14"
              strokeLinecap="round"
            />

            {/* Arrow that travels along the path */}
            <g ref={arrowRef} className="opacity-0">
              <polygon points="-12,-8 12,0 -12,8 -6,0" fill="currentColor" className="text-foreground" filter="url(#arrow-glow)" />
              <polygon points="-10,-6 10,0 -10,6 -5,0" fill="currentColor" className="text-background" />
            </g>
          </svg>

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
      <div className="bg-foreground rounded-[23px] shadow-[0px_3px_6px_5px_rgba(0,0,0,0.15)] relative overflow-hidden"
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
            <h3 className="text-[48px] lg:text-[58px] font-extrabold text-lime leading-[0.88] tracking-tight whitespace-pre-line mb-5 group-hover:scale-[1.02] transition-transform duration-300 origin-left">
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
      <div className="bg-foreground rounded-[18px] shadow-lg relative overflow-hidden">
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
            <h3 className="text-3xl sm:text-4xl font-extrabold text-lime leading-[0.88] tracking-tight whitespace-pre-line mb-4">
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
