'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsapManager } from "@/src/lib/gsapManager";
import { OptimizedImage } from "@/components/OptimizedImage";

gsap.registerPlugin(ScrollTrigger);

export function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsapManager.createContext("team-section", () => {
      gsap.from(".team-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    }, containerRef.current || undefined);

    return () => {
      gsapManager.killContext("team-section");
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-lime/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Text Content */}
          <div className="lg:w-[32%] lg:sticky lg:top-32">
            <div className="team-reveal inline-flex items-center p-1 px-3 md:px-4 mb-4 md:mb-6 bg-foreground/5 rounded-full border border-foreground/10">
              <span className="w-1.5 h-1.5 bg-lime rounded-full mr-2 md:mr-3 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60">Our Collective</span>
            </div>
            
            <h2 className="team-reveal text-[2.5rem] sm:text-[3rem] md:text-[3.2rem] lg:text-[4.2rem] font-[900] leading-[0.85] tracking-tighter text-foreground uppercase mb-4 md:mb-6">
              The <br className="hidden sm:block" />
              Minds <br className="hidden sm:block" />
              Behind <br className="hidden sm:block" />
              The <br className="hidden sm:block" />
              <span className="text-foreground dark:text-lime italic">Innovation</span>
            </h2>
            <p className="team-reveal text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm font-medium">
              Our team is a diverse group of visionary designers, innovative developers, and strategic thinkers, united by a shared passion for creating bold digital experiences.
            </p>
          </div>

          {/* Right Bento Grid */}
          <div className="lg:w-[68%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 h-auto md:h-[650px]">
            
            {/* Column 1: Large Vertical Team Member + Green Vision */}
            <div className="sm:col-span-1 md:col-span-4 flex flex-col gap-3 md:gap-4">
              <div className="team-reveal flex-1 bg-foreground/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative group min-h-[200px] md:min-h-[300px]">
                <OptimizedImage 
                  src="/images/IMG_2674.PNG" 
                  alt="Team Member" 
                  className="transition-transform duration-700 group-hover:scale-110" 
                  fill
                />
                <div className="absolute bottom-4 md:bottom-6 left-0 w-3/4 h-6 md:h-8 bg-lime rounded-r-full shadow-lg shadow-lime/20" />
              </div>
              
              <div className="team-reveal h-[180px] md:h-[220px] bg-lime rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute top-[-15px] right-[-15px] w-20 md:w-24 h-20 md:h-24 bg-black/10 rounded-full scale-150 group-hover:scale-125 transition-transform duration-700" />
                <h3 className="text-2xl md:text-3xl font-black text-black uppercase leading-[0.9] mb-2 md:mb-3">Our <br />Vision</h3>
                <p className="text-black/80 text-xs font-bold max-w-xs leading-[1.1]">
                  We aim to craft digital experiences that inspire, innovate, and push the boundaries of creativity.
                </p>
              </div>
            </div>

            {/* Column 2: Green Process + Secondary Team Member */}
            <div className="sm:col-span-1 md:col-span-4 flex flex-col gap-3 md:gap-4 md:-translate-y-4">
              <div className="team-reveal h-[200px] md:h-[280px] bg-lime rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col relative overflow-hidden group">
                <div className="absolute top-[-20px] right-[-20px] w-20 md:w-24 h-20 md:h-24 bg-black/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-2xl md:text-3xl font-black text-black uppercase leading-[0.9] mb-3 md:mb-4">Our <br />Process</h3>
                <p className="text-black/80 text-xs font-bold leading-[1.1]">
                  From concept to execution, our process blends strategic design, cutting-edge technology, and creative thinking.
                </p>
              </div>
              
              <div className="team-reveal flex-1 bg-foreground/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative group min-h-[180px] md:min-h-[250px]">
                <OptimizedImage 
                  src="/images/aman.webp" 
                  alt="Team Member" 
                  className="transition-transform duration-700 group-hover:scale-110" 
                  fill
                />
                <div className="absolute bottom-4 md:bottom-6 left-0 w-3/4 h-6 md:h-8 bg-lime rounded-r-full shadow-lg shadow-lime/20" />
              </div>
            </div>

            {/* Column 3: Third Team Member + Black Mission */}
            <div className="sm:col-span-2 md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:gap-4">
              <div className="team-reveal flex-1 bg-foreground/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative group min-h-[180px] md:min-h-[250px]">
                <OptimizedImage 
                  src="/images/5875244326257281697_121.jpg" 
                  alt="Team Member" 
                  className="transition-transform duration-700 group-hover:scale-110" 
                  fill
                />
                <div className="absolute bottom-4 md:bottom-6 left-0 w-3/4 h-6 md:h-8 bg-lime rounded-r-full shadow-lg shadow-lime/20" />
              </div>

              <div className="team-reveal h-[240px] sm:h-auto md:h-[320px] bg-foreground rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-start relative overflow-hidden group shadow-xl">
                <div className="absolute top-6 right-[-10px] w-16 md:w-20 h-16 md:h-20 bg-background/5 rounded-full group-hover:scale-125 transition-transform duration-700" />
                <h3 className="text-2xl md:text-3xl font-black text-background uppercase leading-[0.9] mb-4 md:mb-5">Our <br />Mission</h3>
                <p className="text-background/60 text-xs font-bold leading-[1.1]">
                  To transform bold ideas into digital products that empower brands, engage users, and shape the future of online experiences.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
