'use client';

import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, Twitter, Dribbble, ChevronDown } from "lucide-react";
import Image from "next/image";

// Register GSAP plugin once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Skills for the marquee - matching reference
const skills = [
  "Animation-Specialist",
  "Frontend Architect", 
  "Next.js Expert",
  "UI/UX Designer",
  "React Developer",
  "Motion Design",
  "Design Systems",
  "Performance Expert"
];

// Social links
const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Dribbble, href: "#", label: "Dribbble" },
];

// Skill Marquee Component
const SkillMarquee = memo(function SkillMarquee() {
  return (
    <div className="relative overflow-hidden py-4 md:py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex items-center mx-3 md:mx-5">
            <span className="text-lg md:text-2xl lg:text-3xl font-light text-white/30 tracking-tight">
              {skill}
            </span>
            <span className="ml-3 md:ml-5 text-lime text-base md:text-lg">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Availability badge
      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.1
      });

      // Name letters animation
      tl.from(".hero-letter", {
        opacity: 0,
        y: 120,
        rotateX: -90,
        stagger: 0.04,
        duration: 1,
        ease: "power4.out"
      }, "-=0.5");

      // Marquee
      tl.from(".hero-marquee", {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, "-=0.6");

      // Description
      tl.from(".hero-desc", {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, "-=0.5");

      // CTAs
      tl.from(".hero-cta", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6
      }, "-=0.4");

      // Social links
      tl.from(".hero-social", {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5
      }, "-=0.3");

      // Image
      tl.from(".hero-image", {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1.2");

      // Scroll indicator
      tl.from(".scroll-hint", {
        opacity: 0,
        y: -20,
        duration: 0.6
      }, "-=0.3");

      // Scroll-triggered transitions
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: ".hero-pinned",
        }
      });

      scrollTl.to(progressFillRef.current, { scaleY: 1, ease: "none" }, 0);
      
      scrollTl.to(heroContentRef.current, { 
        opacity: 0, 
        y: -100, 
        duration: 0.3 
      }, 0.1);

      scrollTl.to(".hero-image", {
        y: -80,
        scale: 0.9,
        opacity: 0,
        duration: 0.3
      }, 0.1);

      scrollTl.fromTo(aboutContentRef.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.3 }, 
        0.4
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Split name into individual letters for animation
  const renderName = () => {
    const name = "YEABSIRA";
    return name.split("").map((letter, i) => (
      <span 
        key={i} 
        className="hero-letter inline-block hover:text-lime transition-colors duration-300 cursor-default"
        style={{ transformStyle: "preserve-3d" }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="hero-container" style={{ height: "400vh" }}>
      <div className="hero-pinned h-screen w-full sticky top-0 overflow-hidden bg-[#0a0a0a]">
        
        {/* Background effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lime/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-lime/3 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Grain texture */}
        <div className="absolute inset-0 z-[1] opacity-[0.015] pointer-events-none" 
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"1\"/%3E%3C/svg%3E')" }} 
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-lime via-lime/50 to-transparent z-40" />

        {/* Progress indicator */}
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-[2px] h-20 bg-white/10 z-40 rounded-full overflow-hidden">
          <div ref={progressFillRef} className="w-full h-full bg-lime origin-top scale-y-0 rounded-full" />
        </div>

        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-2 border-lime/20 border-t-lime rounded-full animate-spin" />
            <p className="text-lime/50 font-mono text-[10px] tracking-[0.3em] uppercase">Loading</p>
          </div>
        )}

        {/* Main Hero Content */}
        <div ref={heroContentRef} className="relative z-20 h-full flex flex-col">
          <div className="flex-1 flex flex-col lg:flex-row">
            
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0">
              
              {/* Availability Badge */}
              <div className="hero-badge mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
                  </span>
                  <span className="text-white/60 text-xs md:text-sm tracking-wide font-light">
                    Available for Remote / Freelance / Full-time
                  </span>
                </div>
              </div>

              {/* Main Name */}
              <h1 className="mb-2 overflow-hidden" style={{ perspective: "1000px" }}>
                <span className="block text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] xl:text-[9rem] font-black text-white leading-[0.85] tracking-[-0.04em] uppercase">
                  {renderName()}
                </span>
              </h1>

              {/* Skills Marquee */}
              <div className="hero-marquee border-y border-white/5 -mx-6 md:-mx-12 lg:-mx-16 xl:-mx-20 my-4 md:my-5 overflow-hidden"
                style={{ 
                  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
                }}
              >
                <SkillMarquee />
              </div>

              {/* Description */}
              <div className="hero-desc max-w-xl mt-3 md:mt-5">
                <p className="text-white/40 text-sm md:text-base lg:text-lg leading-relaxed font-light">
                  Animation-specialist <span className="text-lime font-medium">Frontend Developer</span> with 3+ years experience building production Next.js frontends and design systems. I bridge the gap between{" "}
                  <span className="text-white/70">high-performance logic</span> and{" "}
                  <span className="text-white/70">emotional design</span>.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
                <Button 
                  className="hero-cta bg-lime text-black hover:bg-white rounded-full px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(204,255,0,0.25)]"
                >
                  <span>View My Work</span>
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="hero-cta border-white/15 bg-white/[0.02] text-white hover:bg-white/5 hover:border-white/30 rounded-full px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm font-medium tracking-wide transition-all duration-300"
                >
                  <span>{"Let's Talk"}</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="hero-cta border-white/10 bg-transparent text-white/50 hover:text-white hover:bg-white/5 hover:border-white/15 rounded-full px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm font-medium tracking-wide transition-all duration-300"
                >
                  <span className="uppercase text-[10px] md:text-xs tracking-widest">Download Resume</span>
                  <Download className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2.5 mt-10 md:mt-12">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="hero-social w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-lime hover:border-lime/40 hover:bg-lime/5 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Image Section */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative pr-8 xl:pr-16">
              <div className="hero-image relative w-full max-w-[550px] aspect-[3/4]">
                {/* Decorative circle */}
                <div className="absolute -top-6 -right-6 w-28 h-28 border border-lime/20 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-lime/10 rounded-full blur-xl" />
                
                {/* Main image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
                    alt="Yeabsira - Frontend Developer"
                    fill
                    sizes="(max-width: 1024px) 0vw, 50vw"
                    className="object-cover object-top"
                    priority
                  />
                  {/* Image caption */}
                  <div className="absolute bottom-5 left-5 right-5 z-20">
                    <div className="flex items-center gap-2 text-lime text-[10px] font-mono tracking-[0.2em]">
                      <span className="w-6 h-[1px] bg-lime" />
                      <span>SINCE 2021</span>
                    </div>
                  </div>
                </div>

                {/* Floating stats */}
                <div className="absolute -left-8 xl:-left-14 bottom-1/4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 z-30 shadow-2xl">
                  <div className="text-2xl xl:text-3xl font-black text-lime mb-0.5">50+</div>
                  <div className="text-[9px] xl:text-[10px] text-white/40 uppercase tracking-wider font-medium">Projects Done</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-hint absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span className="text-[9px] text-white/25 uppercase tracking-[0.2em] font-light">Scroll to Explore</span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-lime/50 to-transparent relative">
              <ChevronDown className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 text-lime/60 animate-bounce" />
            </div>
          </div>
        </div>

        {/* About Section (Revealed on Scroll) */}
        <div ref={aboutContentRef} className="absolute inset-0 z-10 opacity-0 pointer-events-none flex flex-col justify-center px-6 md:px-12 lg:px-20 items-center text-center">
          <div className="w-14 md:w-20 h-[1px] bg-lime/30 mb-8 md:mb-10" />
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[5.5rem] font-black text-white max-w-5xl leading-[0.9] tracking-tighter uppercase select-none">
            <span className="block">Crafting Experiences.</span>
            <span className="block text-white/15 italic mt-1 md:mt-2">Pixel by Pixel.</span>
          </h2>
          <p className="mt-6 md:mt-8 text-white/35 max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed font-light px-4">
            I believe great interfaces should feel invisible yet memorable. As a frontend specialist, I focus on creating seamless user experiences through clean code, thoughtful animations, and pixel-perfect design.
          </p>
          <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-10 sm:gap-14 md:gap-20">
            <div className="text-center group">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-lime leading-none group-hover:scale-105 transition-transform duration-500">50+</p>
              <p className="text-[8px] md:text-[9px] text-white/25 uppercase tracking-[0.25em] mt-2.5 font-medium">Projects Done</p>
            </div>
            <div className="text-center group">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-lime leading-none group-hover:scale-105 transition-transform duration-500">20+</p>
              <p className="text-[8px] md:text-[9px] text-white/25 uppercase tracking-[0.25em] mt-2.5 font-medium">Happy Clients</p>
            </div>
            <div className="text-center group">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-lime leading-none group-hover:scale-105 transition-transform duration-500">3yr</p>
              <p className="text-[8px] md:text-[9px] text-white/25 uppercase tracking-[0.25em] mt-2.5 font-medium">Experience</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
