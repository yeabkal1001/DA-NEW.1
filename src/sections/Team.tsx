'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-white overflow-hidden min-h-screen flex items-center">
      <div className="max-w-[1300px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
          
          {/* Left Content - Scaled down */}
          <div className="lg:w-[32%] flex flex-col pt-0">
            <h2 className="team-reveal text-[3rem] md:text-[4.2rem] font-[900] leading-[0.85] tracking-tighter text-black uppercase mb-6">
              The <br />
              Minds <br />
              Behind <br />
              The <br />
              <span className="text-lime italic">Innovation</span>
            </h2>
            <p className="team-reveal text-gray-400 text-sm md:text-base leading-relaxed max-w-sm font-medium">
              Our team is a diverse group of visionary designers, innovative developers, and strategic thinkers, united by a shared passion for creating bold digital experiences. Every member brings unique expertise and perspective, combining creativity,
            </p>
          </div>

          {/* Right Bento Grid - Compact & Perfectly Framed */}
          <div className="lg:w-[68%] grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[650px]">
            
            {/* Column 1: Large Vertical Team Member + Green Vision */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="team-reveal flex-1 bg-gray-100 rounded-[2rem] overflow-hidden relative group min-h-[300px]">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" alt="Team" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-6 left-0 w-3/4 h-8 bg-lime rounded-r-full shadow-lg shadow-lime/20" />
              </div>
              
              <div className="team-reveal h-[220px] bg-lime rounded-[2rem] p-6 flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute top-[-15px] right-[-15px] w-24 h-24 bg-black/5 rounded-full scale-150 group-hover:scale-125 transition-transform duration-700" />
                <h3 className="text-3xl font-black text-black uppercase leading-[0.9] mb-3">Our <br />Vision</h3>
                <p className="text-black/60 text-xs font-bold max-w-xs leading-[1.1]">
                  We aim to craft digital experiences that inspire, innovate, and push the boundaries of creativity.
                </p>
              </div>
            </div>

            {/* Column 2: Green Process + Secondary Team Member */}
            <div className="md:col-span-4 flex flex-col gap-4 md:-translate-y-4">
              <div className="team-reveal h-[280px] bg-lime rounded-[2rem] p-8 flex flex-col relative overflow-hidden group">
                <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-black/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-3xl font-black text-black uppercase leading-[0.9] mb-4">Our <br />Process</h3>
                <p className="text-black/60 text-xs font-bold leading-[1.1]">
                  From concept to execution, our process blends strategic design, cutting-edge technology, and creative thinking.
                </p>
              </div>
              
              <div className="team-reveal flex-1 bg-gray-100 rounded-[2rem] overflow-hidden relative group min-h-[250px]">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" alt="Team" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-6 left-0 w-3/4 h-8 bg-lime rounded-r-full shadow-lg shadow-lime/20" />
              </div>
            </div>

            {/* Column 3: Third Team Member + Black Mission */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="team-reveal flex-1 bg-gray-100 rounded-[2rem] overflow-hidden relative group min-h-[250px]">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80" alt="Team" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-6 left-0 w-3/4 h-8 bg-lime rounded-r-full shadow-lg shadow-lime/20" />
              </div>

              <div className="team-reveal h-[320px] bg-black rounded-[2rem] p-8 flex flex-col justify-start relative overflow-hidden group">
                <div className="absolute top-6 right-[-10px] w-20 h-20 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700" />
                <h3 className="text-3xl font-black text-white uppercase leading-[0.9] mb-5">Our <br />Mission</h3>
                <p className="text-white/40 text-xs font-bold leading-[1.1]">
                  To transform bold ideas into digital products that empower brands, engage users, and shape the future of online experiences. Innovation drives everything we do.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
