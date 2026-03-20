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
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Arrow follows the path on scroll
      if (pathRef.current && arrowRef.current) {
        // Set initial position at start of path
        gsap.set(arrowRef.current, { 
          xPercent: -50, 
          yPercent: -50,
          opacity: 1,
          scale: 1
        });

        // Animate arrow along path with scroll
        gsap.to(arrowRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: 0,
            end: 1,
          },
          ease: "none",
          scrollTrigger: {
            trigger: ".process-grid-container",
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
          }
        });

        // Animate path drawing (dash offset)
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { 
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength 
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-grid-container",
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
          }
        });
      }

      // Card reveal animations with stagger effect
      gsap.utils.toArray<HTMLElement>(".process-card").forEach((card, i) => {
        gsap.fromTo(card, 
          { 
            y: 120, 
            opacity: 0, 
            scale: 0.85,
            rotateX: 15
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            ease: "power3.out",
            duration: 1.2,
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 50%",
              scrub: 1,
            }
          }
        );

        // Hover float animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -10, scale: 1.02, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        });
      });

      // Parallax for diagonal bands
      gsap.to(".diagonal-band-1", { 
        x: -150, 
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5 
        } 
      });
      gsap.to(".diagonal-band-2", { 
        x: 150, 
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5 
        } 
      });

      // Header text animation
      gsap.fromTo(".process-header-text", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-header",
            start: "top 80%",
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-white relative overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header - Matching Figma */}
        <div className="process-header mb-16 text-center px-4">
          <h2 className="process-header-text text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-black tracking-tight">
            How <span className="text-[#CCFF00] italic">We Bring Ideas</span>
            <br />
            to Life Turning Vision
          </h2>
          <div className="process-header-text mt-4 inline-block">
            <span className="relative inline-block">
              <span className="text-5xl md:text-7xl lg:text-8xl font-black italic text-black">Into</span>
              <span className="ml-2 inline-block bg-[#CCFF00] rounded-full px-8 py-2 text-5xl md:text-7xl lg:text-8xl font-black italic text-black -rotate-2">
                Digital Reality
              </span>
            </span>
          </div>
          
          <p className="process-header-text mt-12 text-black/60 text-base md:text-lg max-w-xl mx-auto">
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

          {/* SVG Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]" viewBox="0 0 1400 2400" preserveAspectRatio="xMidYMid meet">
            {/* Dashed connecting path */}
            <path 
              ref={pathRef}
              id="motion-path"
              d="M 750 280 
                 C 600 350, 400 420, 380 550
                 C 360 680, 400 750, 420 850
                 C 480 1000, 750 1050, 950 1180
                 C 1100 1280, 1080 1380, 1050 1480
                 C 1000 1620, 700 1700, 500 1820
                 C 350 1920, 380 2020, 420 2150" 
              fill="none" 
              stroke="black" 
              strokeWidth="2.5" 
              strokeDasharray="14 14"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>

          {/* Animated Arrow Element - HTML/CSS for better visibility */}
          <div 
            ref={arrowRef}
            className="absolute z-[15] pointer-events-none"
            style={{ top: 0, left: 0 }}
          >
            <div className="relative">
              {/* Arrow body */}
              <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
                <defs>
                  <filter id="arrow-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <polygon 
                  points="5,8 35,20 5,32 12,20" 
                  fill="black"
                  filter="url(#arrow-shadow)"
                />
                <polygon 
                  points="7,10 32,20 7,30 13,20" 
                  fill="#1a1a1a"
                />
              </svg>
              {/* Trailing effect */}
              <div className="absolute top-1/2 right-full -translate-y-1/2 w-8 h-1 bg-gradient-to-l from-black/40 to-transparent rounded-full" />
            </div>
          </div>

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
    <div className="bg-black rounded-[2rem] p-2 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group cursor-pointer">
      {/* Black header with dots */}
      <div className="bg-black rounded-t-[1.5rem] px-6 py-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-white/30 group-hover:bg-[#CCFF00] transition-colors duration-300" />
        <div className="w-3 h-3 rounded-full bg-white/30 group-hover:bg-[#CCFF00] transition-colors duration-300 delay-75" />
      </div>
      
      {/* White content area */}
      <div className="bg-white rounded-b-[1.5rem] rounded-t-[0.5rem] p-8 pt-6 min-h-[320px] flex flex-col">
        {/* Title with lime color */}
        <h3 className="text-4xl lg:text-5xl font-black text-[#CCFF00] leading-[0.95] tracking-tight whitespace-pre-line italic mb-6 group-hover:scale-105 transition-transform duration-300 origin-left">
          {step.title}
        </h3>
        
        {/* Description */}
        <p className="text-black/50 text-sm leading-relaxed flex-grow group-hover:text-black/70 transition-colors duration-300">
          {step.description}
        </p>
      </div>
    </div>
  );
}
