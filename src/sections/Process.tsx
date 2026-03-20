'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const processSteps = [
  {
    id: "01",
    title: "Discover &\nUnderstand",
    description: "We begin by learning about your business, goals, and audience. Through discussion and research, we gather the insights needed to create solutions that truly align with your vision.",
    rotation: -12,
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
    rotation: -15,
  },
  {
    id: "04",
    title: "Build &\nLaunch",
    description: "We develop the final product with precision and care. Once everything is tested and refined, we launch the project and ensure it performs smoothly for your users.",
    rotation: 28,
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the dashed path drawing
      if (pathRef.current && arrowRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: `12 12`, strokeDashoffset: 0 });
        
        // Arrow follows the path on scroll
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".process-grid-container",
            start: "top 30%",
            end: "bottom 80%",
            scrub: 1,
          }
        });

        mainTl.to(arrowRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          duration: 1
        }, 0);
      }

      // Card reveal animations
      gsap.utils.toArray<HTMLElement>(".process-card").forEach((card) => {
        gsap.fromTo(card, 
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            }
          }
        );
      });

      // Parallax for diagonal bands
      gsap.to(".diagonal-band-1", { x: -100, scrollTrigger: { trigger: containerRef.current, scrub: 2 } });
      gsap.to(".diagonal-band-2", { x: 100, scrollTrigger: { trigger: containerRef.current, scrub: 2 } });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-white relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header - Matching Figma */}
        <div className="mb-16 text-center px-4">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-black tracking-tight">
            How <span className="text-[#CCFF00] italic">We Bring Ideas</span>
            <br />
            to Life Turning Vision
          </h2>
          <div className="mt-4 inline-block">
            <span className="relative inline-block">
              <span className="text-5xl md:text-7xl lg:text-8xl font-black italic text-black">Into</span>
              <span className="ml-2 inline-block bg-[#CCFF00] rounded-full px-8 py-2 text-5xl md:text-7xl lg:text-8xl font-black italic text-black -rotate-2">
                Digital Reality
              </span>
            </span>
          </div>
          
          <p className="mt-12 text-black/60 text-base md:text-lg max-w-xl mx-auto">
            At Digital Addis, every project begins with understanding your vision
          </p>
        </div>

        {/* Process Grid - Desktop */}
        <div className="process-grid-container relative min-h-[2400px] w-full hidden md:block">
          
          {/* Diagonal Lime Bands */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="diagonal-band-1 absolute top-[15%] left-[-20%] w-[140%] h-20 bg-[#CCFF00] -rotate-[8deg]" />
            <div className="diagonal-band-2 absolute top-[75%] left-[-20%] w-[140%] h-20 bg-[#CCFF00] rotate-[8deg]" />
          </div>

          {/* SVG Path and Arrow */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]" viewBox="0 0 1400 2400" preserveAspectRatio="xMidYMid meet">
            {/* Dashed connecting path */}
            <path 
              ref={pathRef}
              d="M 700 280 
                 C 700 350, 350 400, 350 520
                 C 350 640, 350 700, 350 780
                 C 350 900, 700 950, 900 1100
                 C 1050 1200, 1050 1300, 1050 1400
                 C 1050 1550, 700 1600, 500 1750
                 C 350 1850, 350 1950, 400 2100" 
              fill="none" 
              stroke="black" 
              strokeWidth="2" 
              strokeDasharray="12 12"
              opacity="0.4"
            />
            
            {/* Animated Arrow */}
            <g ref={arrowRef}>
              <polygon 
                points="0,-12 10,0 0,12 4,0" 
                fill="black"
              />
            </g>
          </svg>

          {/* Card 1 - Discover & Understand (Top Right) */}
          <div 
            className="process-card absolute z-10 w-[380px]"
            style={{ top: "180px", right: "15%", transform: `rotate(${processSteps[0].rotation}deg)` }}
          >
            <ProcessCard step={processSteps[0]} />
            {/* Side text */}
            <div className="absolute -right-[280px] top-1/2 -translate-y-1/2 w-60 text-left">
              <p className="text-xs text-black/40 leading-relaxed">
                From the first conversation to the final launch, we carefully design, develop, and refine every detail to ensure the result is not only visually engaging but also effective and impactful for your audience.
              </p>
            </div>
          </div>

          {/* Card 2 - Plan & Strategize (Left) */}
          <div 
            className="process-card absolute z-10 w-[380px]"
            style={{ top: "680px", left: "8%", transform: `rotate(${processSteps[1].rotation}deg)` }}
          >
            <ProcessCard step={processSteps[1]} />
            {/* Side text */}
            <div className="absolute -left-[20px] -bottom-[140px] w-72 text-left">
              <p className="text-xs text-black/40 leading-relaxed">
                From the first conversation to the final launch, we carefully design, develop, and refine every detail to ensure the result is not only visually engaging but also effective and impactful for your audience.
              </p>
            </div>
          </div>

          {/* Card 3 - Design & Create (Right) */}
          <div 
            className="process-card absolute z-10 w-[380px]"
            style={{ top: "1280px", right: "10%", transform: `rotate(${processSteps[2].rotation}deg)` }}
          >
            <ProcessCard step={processSteps[2]} />
            {/* Side text */}
            <div className="absolute -left-[280px] top-1/2 -translate-y-1/2 w-60 text-right">
              <p className="text-xs text-black/40 leading-relaxed">
                From the first conversation to the final launch, we carefully design, develop, and refine every detail to ensure the result is not only visually engaging but also effective and impactful for your audience.
              </p>
            </div>
          </div>

          {/* Card 4 - Build & Launch (Bottom Left) */}
          <div 
            className="process-card absolute z-10 w-[380px]"
            style={{ top: "1880px", left: "12%", transform: `rotate(${processSteps[3].rotation}deg)` }}
          >
            <ProcessCard step={processSteps[3]} />
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-12 pt-8 px-4">
          {processSteps.map((step, i) => (
            <div key={i} className="process-card">
              <ProcessCard step={step} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Process Card Component - Matching Figma Design
function ProcessCard({ step }: { step: typeof processSteps[0] }) {
  return (
    <div className="bg-black rounded-[2rem] p-2 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group">
      {/* Black header with dots */}
      <div className="bg-black rounded-t-[1.5rem] px-6 py-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <div className="w-3 h-3 rounded-full bg-white/30" />
      </div>
      
      {/* White content area */}
      <div className="bg-white rounded-b-[1.5rem] rounded-t-[0.5rem] p-8 pt-6 min-h-[320px] flex flex-col">
        {/* Title with lime color */}
        <h3 className="text-4xl lg:text-5xl font-black text-[#CCFF00] leading-[0.95] tracking-tight whitespace-pre-line italic mb-6">
          {step.title}
        </h3>
        
        {/* Description */}
        <p className="text-black/50 text-sm leading-relaxed flex-grow">
          {step.description}
        </p>
      </div>
    </div>
  );
}
