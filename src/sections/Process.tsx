'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const processSteps = [
  {
    id: "01",
    title: "Discover & Understand",
    description: "We begin by learning about your business, goals, and audience. Through discussion and research, we gather the insights needed to create solutions that truly align with your vision.",
    rotation: -8.22,
    top: "350px",
    left: "58%",
    sideNote: "From the first conversation to the final launch, we carefully design, develop, and refine every detail to ensure the result is not only visually engaging but also effective and impactful for your audience.",
    sideNotePos: "right"
  },
  {
    id: "02",
    title: "Plan & Strategize",
    description: "After understanding your needs, we build a clear strategy and roadmap. This step defines the structure, features, and direction of the project to ensure everything is focused and efficient.",
    rotation: 24.7,
    top: "850px",
    left: "12%",
    sideNote: "From the first conversation to the final launch, we carefully design, develop, and refine every detail to ensure the result is not only visually engaging but also effective and impactful for your audience.",
    sideNotePos: "right"
  },
  {
    id: "03",
    title: "Design & Create",
    description: "Our team transforms ideas into visually engaging and user-friendly designs. We focus on creativity, usability, and modern aesthetics to craft experiences that connect with your audience.",
    rotation: -19.67,
    top: "1350px",
    left: "64%",
    sideNote: "From the first conversation to the final launch, we carefully design, develop, and refine every detail to ensure the result is not only visually engaging but also effective and impactful for your audience.",
    sideNotePos: "left"
  },
  {
    id: "04",
    title: "Build & Launch",
    description: "We develop the final product with precision and care. Once everything is tested and refined, we launch the project and ensure it performs smoothly for your users.",
    rotation: 32.61,
    top: "1850px",
    left: "18%",
    sideNote: "From the first conversation to the final launch, we carefully design, develop, and refine every detail to ensure the result is not only visually engaging but also effective and impactful for your audience.",
    sideNotePos: "right"
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);
  const kineticText1 = useRef<HTMLDivElement>(null);
  const kineticText2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Background Text Atmosphere
      gsap.to(".bg-kinetic-text-1", {
        xPercent: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom top"
        }
      });
      gsap.to(".bg-kinetic-text-2", {
        xPercent: 20,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom top"
        }
      });

      // 2. Exact Path & Premium Arrow Sequence
      if (pathRef.current && arrowRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".process-grid-container",
            start: "top 25%",
            end: "bottom 95%",
            scrub: 1.2,
          }
        });

        mainTl.to(pathRef.current, { strokeDashoffset: 0, ease: "none" }, 0)
              .to(arrowRef.current, {
                motionPath: {
                  path: pathRef.current,
                  align: pathRef.current,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: true,
                },
                opacity: 1,
                ease: "none"
              }, 0);
      }

      // 3. Immersive Card Reveals
      gsap.utils.toArray<HTMLElement>(".process-card").forEach((card) => {
        gsap.fromTo(card, 
          { y: 150, opacity: 0, scale: 0.85, rotateX: 20 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 65%",
              scrub: 1.5,
            }
          }
        );
      });

      // 4. Parallax Background Bands
      gsap.to(".diagonal-band-1", { x: -150, scrollTrigger: { trigger: containerRef.current, scrub: 2 } });
      gsap.to(".diagonal-band-2", { x: 150, scrollTrigger: { trigger: containerRef.current, scrub: 2 } });
      gsap.to(".diagonal-band-3", { x: -180, scrollTrigger: { trigger: containerRef.current, scrub: 2 } });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-40 pb-40 bg-white relative overflow-hidden selection:bg-lime selection:text-black">
      
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none z-0">
         <div className="bg-kinetic-text-1 text-[30rem] font-black uppercase whitespace-nowrap leading-none flex gap-[10rem] mb-20">
            <span>Digital Addis Evolution</span>
            <span>Digital Addis Evolution</span>
         </div>
         <div className="bg-kinetic-text-2 text-[30rem] font-black uppercase whitespace-nowrap leading-none flex gap-[10rem] italic border-t border-black/5 pt-20">
            <span>Engineering Visual Reality</span>
            <span>Engineering Visual Reality</span>
         </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 text-center">
        
        {/* Figma Precise Header - SCALED DOWN */}
        <div className="mb-48 flex flex-col items-center">
          <h2 className="text-[3.5rem] md:text-[5.5rem] font-[1000] leading-[0.85] text-black uppercase tracking-tighter max-w-5xl inline-block relative px-4 text-center">
            How <span className="text-lime italic">We Bring Ideas</span> 
            <br />
            to Life Turning Vision
            <br />
            <span className="relative inline-block mt-6 bg-black rounded-full px-10 py-5 overflow-hidden">
               <span className="absolute inset-0 bg-lime -rotate-2 scale-110" />
               <span className="relative z-10 text-white italic">Into Digital Reality</span>
            </span>
          </h2>
          <div className="mt-16 relative">
             <p className="text-black/30 text-lg md:text-xl font-black max-w-lg mx-auto leading-tight uppercase tracking-[0.3em] flex items-center justify-center gap-6">
               <span className="w-8 h-[1px] bg-black/10" />
               At Digital Addis, every project begins with understanding your vision
               <span className="w-8 h-[1px] bg-black/10" />
             </p>
          </div>
        </div>

        {/* The Immersive Process Grid - SCALED AND COMPACTED */}
        <div className="process-grid-container relative min-h-[2200px] w-full hidden md:block">
          
          {/* Aesthetic Background Bands */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="diagonal-band-1 absolute top-[20%] left-[-10%] w-[120%] h-24 bg-lime/95 -rotate-[6deg] shadow-2xl flex items-center px-40 overflow-hidden">
               <span className="text-[12px] font-[1000] uppercase tracking-[1.5em] text-black/15 whitespace-nowrap italic">STRATEGY + DISCOVERY + RESEARCH + STRATEGY</span>
            </div>
            <div className="diagonal-band-2 absolute top-[50%] left-[-10%] w-[120%] h-32 bg-black rotate-[4deg] shadow-inner flex items-center px-40 overflow-hidden">
               <span className="text-[12px] font-[1000] uppercase tracking-[1.5em] text-white/10 whitespace-nowrap">DESIGN + CREATIVE + DEVELOPMENT + DESIGN</span>
            </div>
            <div className="diagonal-band-3 absolute top-[80%] left-[-10%] w-[120%] h-24 bg-lime/95 -rotate-[6deg] shadow-2xl flex items-center px-40 overflow-hidden">
               <span className="text-[12px] font-[1000] uppercase tracking-[1.5em] text-black/15 whitespace-nowrap italic">LAUNCH + DEPLOY + OPTIMIZE + LAUNCH</span>
            </div>
          </div>

          {/* Master Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
             <path 
               ref={pathRef}
               d="M840 350 
                  L 840 450 
                  Q 500 650, 240 754 
                  L 240 900 
                  Q 700 1100, 930 1414 
                  L 930 1550 
                  Q 500 1900, 260 2150" 
               fill="none" 
               stroke="black" 
               strokeWidth="3" 
               strokeDasharray="25 20" 
               strokeLinecap="round"
               opacity="0.08" 
             />
             
             {/* Premium Pointer Sequence */}
             <g ref={arrowRef} opacity="0" className="will-change-transform">
                <circle className="animate-ping" r="60" fill="rgba(204,255,0,0.1)" />
                <circle r="25" fill="black" />
                <circle r="12" fill="#CCFF00" className="animate-pulse" />
                <path d="M-4 -4 L4 0 L-4 4" fill="none" stroke="black" strokeWidth="2.5" />
             </g>
          </svg>

          {/* Precision Figma Cards - TIGHTER SIZE */}
          {processSteps.map((step, i) => (
            <div 
              key={i}
              className="process-card absolute z-10 w-[460px] group"
              style={{ 
                top: i === 0 ? "250px" : i === 1 ? "750px" : i === 2 ? "1250px" : "1750px", 
                left: step.left, 
                perspective: "1500px" 
              }}
            >
              <div className="absolute -top-12 -left-12 text-[120px] font-[1001] text-black/5 select-none transition-all duration-700 group-hover:text-lime/10 tracking-widest">
                 {step.id}
              </div>

              <div 
                className="relative bg-black rounded-[3rem] p-3 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] transition-all duration-700 group-hover:shadow-lime/30 group-hover:scale-[1.03]"
                style={{ transform: `rotate(${step.rotation}deg)` }}
              >
                <div className="bg-white rounded-[2.5rem] p-12 px-16 flex flex-col items-center min-h-[520px] justify-center text-center overflow-hidden">
                  
                  <div className="w-28 h-8 bg-gray-50 border border-gray-100 rounded-full mb-10 flex items-center justify-center shadow-inner">
                     <div className="w-10 h-2 bg-gray-200 rounded-full" />
                  </div>

                  <h3 className="text-4xl lg:text-[3.5rem] font-[1001] text-black uppercase leading-[0.8] mb-10 tracking-tighter mix-blend-darken">
                    {step.title.split(' & ').map((word, idx) => (
                      <span key={idx} className={`${idx === 0 ? 'text-lime italic block mb-2' : 'block'}`}>{word} {idx === 0 ? '&' : ''}</span>
                    ))}
                  </h3>
                  
                  <p className="text-gray-400 text-base font-[900] leading-snug tracking-tight uppercase max-w-xs">
                    {step.description}
                  </p>

                  <div className="mt-12 w-10 h-10 bg-black/5 rounded-full flex items-center justify-center group-hover:bg-lime transition-colors duration-500">
                     <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
                </div>
              </div>

              {/* Side Narratives - Adjusted for Tighter Fit */}
              <div className={`absolute ${step.sideNotePos === 'right' ? '-right-[18rem]' : '-left-[18rem]'} top-1/2 -translate-y-1/2 w-64 text-center`}>
                 <p className="text-[10px] font-[1000] text-black/15 uppercase tracking-[0.4em] leading-relaxed italic group-hover:text-black/40 transition-colors duration-700">
                    {step.sideNote}
                 </p>
                 <div className="mt-6 flex justify-center gap-2">
                    <div className="w-1 h-1 bg-black/10 rounded-full" />
                    <div className="w-8 h-[1px] bg-black/10 self-center" />
                    <div className="w-1 h-1 bg-black/10 rounded-full" />
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View - Premium Aesthetic */}
        <div className="md:hidden flex flex-col gap-20 pt-20 px-4 pb-48">
           {processSteps.map((step, i) => (
             <div key={i} className="bg-black rounded-[3rem] p-2 hover:shadow-lime/20 transition-all">
                <div className="bg-white rounded-[2.5rem] p-12 text-center relative overflow-hidden">
                   <div className="absolute top-[-30px] left-[-30px] text-[100px] font-black text-black/5 italic opacity-50">{step.id}</div>
                   <h3 className="text-5xl font-[1001] text-lime uppercase mb-8 leading-[0.9] italic">{step.title}</h3>
                   <p className="text-gray-400 text-lg font-black leading-relaxed">{step.description}</p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
