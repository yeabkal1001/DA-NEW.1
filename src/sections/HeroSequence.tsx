'use client';

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, Twitter, Dribbble, ChevronDown } from "lucide-react";
import Image from "next/image";

// Register GSAP plugin once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Skills for the marquee
const skills = [
  "Cloud Solutions",
  "Frontend Architecture", 
  "Next.js Expert",
  "UI/UX Design",
  "DevOps",
  "Digital Innovation",
  "Cybersecurity",
  "Mobile Development"
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
    <div className="relative overflow-hidden py-6 md:py-8">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex items-center mx-4 md:mx-6">
            <span className="text-xl md:text-3xl lg:text-4xl font-light text-white/40 tracking-tight">
              {skill}
            </span>
            <span className="ml-4 md:ml-6 text-lime text-lg md:text-xl">✦</span>
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
  const imageRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial hero animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Stagger in badge
      tl.from(".hero-badge-anim", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2
      });

      // Name animation with split letters effect
      tl.from(".hero-name-letter", {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out"
      }, "-=0.4");

      // Marquee fade in
      tl.from(".hero-marquee-wrap", {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, "-=0.6");

      // Description
      tl.from(".hero-description", {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, "-=0.5");

      // CTAs
      tl.from(".hero-cta-btn", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6
      }, "-=0.4");

      // Social links
      tl.from(".hero-social-link", {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5
      }, "-=0.3");

      // Image reveal
      tl.from(".hero-image-container", {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1");

      // Scroll indicator
      tl.from(".scroll-indicator", {
        opacity: 0,
        y: -20,
        duration: 0.6
      }, "-=0.3");

      // Scroll-triggered animations
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin: ".hero-sequence-pinned",
        }
      });

      // Progress bar
      scrollTl.to(progressFillRef.current, { scaleY: 1, ease: "none" }, 0);
      
      // Hero content fade out
      scrollTl.to(heroContentRef.current, { 
        opacity: 0, 
        y: -100, 
        duration: 0.3 
      }, 0.1);

      // Image parallax
      scrollTl.to(".hero-image-container", {
        y: -100,
        scale: 0.9,
        opacity: 0,
        duration: 0.3
      }, 0.1);

      // About section fade in
      scrollTl.fromTo(aboutContentRef.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.3 }, 
        0.4
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Split name into letters for animation
  const nameLetters = "DIGITAL ADDIS".split("").map((letter, i) => (
    <span 
      key={i} 
      className="hero-name-letter inline-block"
      style={{ display: letter === " " ? "inline" : "inline-block" }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));

  return (
    <div ref={containerRef} className="hero-sequence-container" style={{ height: "400vh" }}>
      <div className="hero-sequence-pinned h-screen w-full sticky top-0 overflow-hidden bg-black">
        
        {/* Background gradient effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-lime/3 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-lime via-lime/50 to-transparent z-50" />

        {/* Progress bar */}
        <div className="hero-progress-track hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-[2px] h-24 bg-white/10 z-50 rounded-full overflow-hidden">
          <div ref={progressFillRef} className="hero-progress-fill w-full h-full bg-lime origin-top scale-y-0 rounded-full" />
        </div>

        {/* Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-2 border-lime/20 border-t-lime rounded-full animate-spin" />
            <p className="text-lime/60 font-mono text-xs tracking-[0.3em] uppercase">Loading</p>
          </div>
        )}

        {/* Main Hero Content */}
        <div ref={heroContentRef} className="relative z-20 h-full flex flex-col">
          
          {/* Hero Main Section */}
          <div className="flex-1 flex flex-col lg:flex-row">
            
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 lg:pt-0">
              
              {/* Availability Badge */}
              <div className="hero-badge-anim mb-6 md:mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime"></span>
                  </span>
                  <span className="text-white/70 text-xs md:text-sm tracking-wide">
                    Available for Projects / Partnerships
                  </span>
                </div>
              </div>

              {/* Main Name/Brand */}
              <h1 className="mb-4 md:mb-6 overflow-hidden" style={{ perspective: "1000px" }}>
                <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase">
                  {nameLetters}
                </span>
              </h1>

              {/* Skills Marquee */}
              <div className="hero-marquee-wrap border-y border-white/5 -mx-6 md:-mx-12 lg:-mx-20 px-0 my-4 md:my-6 overflow-hidden">
                <SkillMarquee />
              </div>

              {/* Description */}
              <div className="hero-description max-w-xl mt-4 md:mt-6">
                <p className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed">
                  <span className="text-lime font-semibold">Innovation-driven</span> digital agency with 5+ years experience building production-ready solutions. We bridge the gap between{" "}
                  <span className="text-white/80">high-performance technology</span> and{" "}
                  <span className="text-white/80">impactful design</span>.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 md:gap-4 mt-8 md:mt-10">
                <Button 
                  className="hero-cta-btn bg-lime text-black hover:bg-white rounded-full px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]"
                >
                  <span>View Our Work</span>
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="hero-cta-btn border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-full px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-sm"
                >
                  <span>{"Let's Talk"}</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="hero-cta-btn border-white/10 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20 rounded-full px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm font-medium tracking-wide transition-all duration-300"
                >
                  <span>Download Portfolio</span>
                  <Download className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-10 md:mt-14">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="hero-social-link w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-lime hover:border-lime/50 hover:bg-lime/5 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Image Section */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative">
              <div className="hero-image-container relative w-[90%] max-w-[600px] aspect-[4/5]">
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 border border-lime/20 rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-lime/10 rounded-full blur-xl" />
                
                {/* Main image frame */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                  <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
                    alt="Digital Addis - Innovation in Technology"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay text on image */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="flex items-center gap-2 text-lime text-xs font-mono tracking-wider">
                      <span className="w-8 h-[1px] bg-lime" />
                      <span>EST. 2018</span>
                    </div>
                  </div>
                </div>

                {/* Floating stats card */}
                <div className="absolute -left-12 bottom-1/4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 z-30">
                  <div className="text-3xl font-black text-lime mb-1">120+</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.25em]">Scroll to Explore</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-lime/60 to-transparent relative">
              <ChevronDown className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 text-lime animate-bounce" />
            </div>
          </div>
        </div>

        {/* About Section (Revealed on Scroll) */}
        <div ref={aboutContentRef} className="absolute inset-0 z-10 opacity-0 pointer-events-none flex flex-col justify-center px-6 md:px-12 lg:px-20 items-center text-center">
          <div className="w-16 md:w-24 h-[1px] bg-lime/40 mb-8 md:mb-12" />
          <h2 className="text-3xl sm:text-4xl md:text-[3.5rem] lg:text-[6rem] font-black text-white max-w-6xl leading-[0.95] tracking-tighter uppercase select-none">
            <span className="block">Elevating Brands.</span>
            <span className="block text-white/20 italic">Solving Challenges.</span>
          </h2>
          <p className="mt-6 md:mt-10 text-white/40 max-w-3xl text-sm md:text-lg lg:text-xl leading-relaxed font-light px-4">
            Technology should make people&apos;s work easier, safer and more meaningful. We are a multidisciplinary team focused on solving real-world challenges through long-term partnerships and people-centric design.
          </p>
          <div className="mt-10 md:mt-14 lg:mt-16 flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
            <div className="text-center group">
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">120+</p>
              <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.3em] mt-3 md:mt-4 font-medium">Solutions Delivered</p>
            </div>
            <div className="text-center group">
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">15+</p>
              <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.3em] mt-3 md:mt-4 font-medium">Core Technologists</p>
            </div>
            <div className="text-center group">
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-lime leading-none group-hover:scale-110 transition-transform duration-500">5yr</p>
              <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.3em] mt-3 md:mt-4 font-medium">Innovation Legacy</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
