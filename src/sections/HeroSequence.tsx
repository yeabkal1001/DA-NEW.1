'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ORIGINAL_FRAME_COUNT = 192;
const SKIP_STEP = 4;
const FRAME_COUNT = Math.ceil(ORIGINAL_FRAME_COUNT / SKIP_STEP);
const PRIORITY_FRAMES = 5;

const frameNames = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const originalIndex = i * SKIP_STEP;
  const num = String(originalIndex).padStart(3, "0");
  const delay = (originalIndex % 3 === 0 || originalIndex === 0) ? "0.041s" : "0.042s";
  return `/images/image sequence/frame_${num}_delay-${delay}_compressed.webp`;
});

export function HeroSequence() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const heroContentRef  = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const imagesRef       = useRef<HTMLImageElement[]>(new Array(FRAME_COUNT).fill(null));

  const [isLoaded,     setIsLoaded]     = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  /* ─────────────────────── drawFrame ─────────────────────── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const img = imagesRef.current[index];
    if (!ctx || !img?.complete) return;

    const cr = canvas.width / canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    let dw: number, dh: number, dx: number, dy: number;

    if (ir > cr) {
      dh = canvas.height; dw = dh * ir;
      dx = (canvas.width - dw) / 2; dy = 0;
    } else {
      dw = canvas.width; dh = dw / ir;
      dx = 0; dy = (canvas.height - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ─────────────────────── image loading ─────────────────── */
  useEffect(() => {
    let loaded = 0, mounted = true;

    const run = async () => {
      // Immediate first frame
      const f0 = new Image();
      f0.src = frameNames[0];
      f0.onload = () => { if (!mounted) return; imagesRef.current[0] = f0; drawFrame(0); };

      // Priority batch
      for (let i = 0; i < PRIORITY_FRAMES; i++) {
        if (!mounted) return;
        const img = new Image();
        img.crossOrigin = "anonymous"; img.decoding = "async"; img.src = frameNames[i];
        await new Promise(res => {
          img.onload = () => { imagesRef.current[i] = img; loaded++; setLoadProgress(Math.round(loaded / FRAME_COUNT * 100)); res(null); };
          img.onerror = res;
        });
      }
      setIsLoaded(true);

      // Idle-batch remainder
      const batch = (start: number) => {
        if (!mounted || start >= FRAME_COUNT) return;
        const end = Math.min(start + 3, FRAME_COUNT);
        for (let i = start; i < end; i++) {
          const img = new Image(); img.src = frameNames[i];
          img.onload = () => { imagesRef.current[i] = img; loaded++; setLoadProgress(Math.round(loaded / FRAME_COUNT * 100)); };
        }
        if (end < FRAME_COUNT) {
          'requestIdleCallback' in window
            ? window.requestIdleCallback(() => batch(end))
            : setTimeout(() => batch(end), 100);
        }
      };
      batch(PRIORITY_FRAMES);
    };

    run();
    return () => { mounted = false; };
  }, [drawFrame]);

  /* ─────────────────────── resize ────────────────────────── */
  useEffect(() => {
    const onResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width  = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(0);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  /* ─────────────────────── GSAP ───────────────────────────── */
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {

      /* ENTRANCE TIMELINE */
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. Top meta bar sweeps in
      tl.fromTo(".hs-meta",
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: "power2.out" });

      // 2. Full-width rule draws left → right
      tl.fromTo(".hs-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "expo.out", transformOrigin: "left center" },
        "-=0.4");

      // 3. "DIGITAL" clips up (overflow:hidden parent holds the clip)
      tl.fromTo(".hs-d .hs-text",
        { y: "108%", skewY: 3 },
        { y: "0%",   skewY: 0, duration: 1.1, ease: "expo.out" },
        "-=0.7");

      // 4. "ADDIS" clips up 70ms after
      tl.fromTo(".hs-a .hs-text",
        { y: "108%", skewY: 3 },
        { y: "0%",   skewY: 0, duration: 1.1, ease: "expo.out" },
        "-=0.85");

      // 5. Bottom rule
      tl.fromTo(".hs-rule-bottom",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "expo.out", transformOrigin: "left center" },
        "-=0.6");

      // 6. Descriptor + CTA
      tl.fromTo([".hs-desc", ".hs-cta"],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" },
        "-=0.55");

      // 7. Side decorations
      tl.fromTo([".hs-scroll-indicator", ".hs-side-count"],
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.5");

      // Scroll-down breathing pulse on indicator
      gsap.to(".hs-scroll-dot", {
        y: 8,
        duration: 1.2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2
      });

      /* SCROLL SEQUENCE */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end:   "bottom bottom",
          scrub: 0.55,
          pin:   ".hero-sequence-pinned",
        }
      });

      const obj = { frame: 0 };
      scrollTl.to(obj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        duration: 1,
        onUpdate: () => drawFrame(Math.round(obj.frame))
      }, 0);

      scrollTl.to(progressFillRef.current, { scaleY: 1, ease: "none" }, 0);

      // Hero dissolve out
      scrollTl.to(heroContentRef.current, {
        opacity: 0,
        y: -50,
        filter: "blur(8px)",
        duration: 0.25,
        ease: "power2.in"
      }, 0.06);

      // About curtain up
      scrollTl.fromTo(aboutContentRef.current,
        { opacity: 0, y: 90, filter: "blur(14px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.out" },
        0.38);

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, drawFrame]);

  /* ─────────────────────── render ─────────────────────────── */
  return (
    <div ref={containerRef} className="hero-sequence-container" style={{ height: "500vh" }}>
      <div className="hero-sequence-pinned h-screen w-full sticky top-0 overflow-hidden bg-black">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Layered overlays */}
        {/* Left-heavy gradient so text on left stays legible, image on right stays vivid */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{
          background: [
            "linear-gradient(95deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.40) 35%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.0) 100%)",
            "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 25%, rgba(0,0,0,0.0) 50%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.0) 30%)",
          ].join(", ")
        }} />

        {/* Film grain */}
        <div className="absolute inset-0 z-[2] opacity-[0.028] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} />

        {/* Lime top accent hairline */}
        <div className="absolute top-0 left-0 right-0 h-px z-[6]" style={{
          background: "linear-gradient(90deg, #CCFF00 0%, rgba(204,255,0,0.3) 40%, transparent 100%)"
        }} />

        {/* Scroll progress bar (right edge) */}
        <div className="hidden lg:block absolute right-5 top-1/2 -translate-y-1/2 w-px h-16 bg-white/8 z-50 overflow-hidden">
          <div ref={progressFillRef} className="w-full h-full bg-lime origin-top scale-y-0" />
        </div>

        {/* ── LOADER ──────────────────────────────────────────── */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6">
            <div className="flex items-end gap-2">
              <span className="text-white font-black tracking-[-0.04em] text-lg">DIGITAL</span>
              <span className="text-lime font-black italic tracking-[-0.04em] text-lg">ADDIS</span>
            </div>
            <div className="w-36 h-px bg-white/8 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-lime transition-all duration-200"
                style={{ width: `${loadProgress}%`, boxShadow: "0 0 8px rgba(204,255,0,0.7)" }} />
            </div>
            <span className="text-[8px] text-white/20 font-mono tracking-[0.7em] uppercase">{loadProgress}%</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            HERO CONTENT
        ══════════════════════════════════════════════════════ */}
        <div
          ref={heroContentRef}
          className="absolute inset-0 z-20 flex flex-col pointer-events-none"
        >
          {/* ── Top meta strip ─────────────────────────────────── */}
          <div className="hs-meta flex items-center justify-between px-8 md:px-14 pt-[5.5rem] md:pt-[6.5rem]">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-lime/40 block" />
              <span className="text-[9px] text-white/30 font-black uppercase tracking-[0.55em]">Creative Studio</span>
            </div>
            <span className="text-[9px] text-white/20 font-black uppercase tracking-[0.45em] hidden md:block">
              Est. 2018 · Addis Ababa, ET
            </span>
          </div>

          {/* ── Spacer ─────────────────────────────────────────── */}
          <div className="flex-1" />

          {/* ── Main content block — bottom of screen ──────────── */}
          <div className="px-8 md:px-14 pb-10 md:pb-14">

            <div className="hs-rule w-full h-px bg-white/[0.14] mb-6 md:mb-8 origin-left" />

            {/* HEADLINE: two clip-containers stacked */}
            <div className="mb-6 md:mb-8 overflow-visible">

              {/* DIGITAL */}
              <div className="hs-d overflow-hidden leading-none">
                <div className="hs-text">
                  <span
                    className="font-black text-white whitespace-nowrap block"
                    style={{
                      fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)",
                      letterSpacing: "-0.045em",
                      lineHeight: 0.88,
                    }}
                  >
                    DIGITAL
                  </span>
                </div>
              </div>

              {/* ADDIS — slightly indented for typographic tension */}
              <div className="hs-a overflow-hidden leading-none pl-[0.08em]">
                <div className="hs-text flex items-end gap-3">
                  <span
                    className="font-black italic whitespace-nowrap block"
                    style={{
                      fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)",
                      letterSpacing: "-0.045em",
                      lineHeight: 0.88,
                      color: "rgba(204, 255, 0, 0.88)",
                    }}
                  >
                    ADDIS
                  </span>
                  {/* lime dot accent */}
                  <span className="mb-1.5 md:mb-3 block w-2 h-2 md:w-3.5 md:h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(204,255,0,0.7)" }} />
                </div>
              </div>
            </div>

            <div className="hs-rule-bottom w-full h-px bg-white/[0.14] mb-6 md:mb-8 origin-left" />

            {/* Footer strip: desc | scroll indicator | CTA */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">

              {/* Left descriptor */}
              <p
                className="hs-desc text-white/40 font-medium leading-relaxed max-w-sm"
                style={{ fontSize: "clamp(0.78rem, 1vw, 0.95rem)" }}
              >
                Ethiopia's premier digital agency — building elite software, identities, and cloud infrastructure.
              </p>

              {/* Center: scroll indicator */}
              <div className="hs-scroll-indicator hidden lg:flex flex-col items-center gap-1.5 pointer-events-none">
                <div className="hs-scroll-dot w-1 h-1 rounded-full bg-lime/60" />
                <div className="w-px h-8 bg-white/12" />
                <span className="text-[7px] text-white/20 uppercase tracking-[0.5em] font-black">Scroll</span>
              </div>

              {/* Right CTA */}
              <div className="hs-cta pointer-events-auto">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4"
                >
                  <div className="relative overflow-hidden">
                    <span className="block text-[9px] font-black uppercase tracking-[0.5em] text-white/50 group-hover:text-white transition-colors duration-400 leading-none mb-0.5">
                      Start a
                    </span>
                    <span className="block text-[9px] font-black uppercase tracking-[0.5em] text-white group-hover:text-lime transition-colors duration-400 leading-none">
                      Project →
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center
                    group-hover:bg-lime group-hover:border-lime group-hover:scale-110
                    transition-all duration-450 ease-out">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                      className="text-white group-hover:text-black transition-colors duration-300">
                      <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5"
                        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>



        {/* ══════════════════════════════════════════════════════
            ABOUT CONTENT (scroll reveal — "The Curtain")
        ══════════════════════════════════════════════════════ */}
        <div
          ref={aboutContentRef}
          className="absolute inset-0 z-10 opacity-0 pointer-events-none"
          style={{
            background: [
              "linear-gradient(135deg, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.30) 100%)",
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)"
            ].join(", ")
          }}
        >
          <div className="flex flex-col h-full px-8 md:px-14 pt-32 pb-12 md:pb-16">

            {/* Label */}
            <div className="flex items-center gap-3 mb-auto">
              <div className="w-5 h-px bg-lime" />
              <span className="text-[8px] text-lime font-black uppercase tracking-[0.7em]">002 — Who We Are</span>
            </div>

            {/* Manifesto */}
            <div className="max-w-4xl mb-10 md:mb-14">
              <h2
                className="font-black text-white leading-[0.84] mb-6 md:mb-10"
                style={{
                  fontSize: "clamp(2.6rem, 8vw, 9rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                <span className="block">We don't</span>
                <span className="block text-white/25 italic">just build.</span>
                <span className="block text-lime">We architect</span>
                <span className="block text-white/25">futures.</span>
              </h2>
              <p className="text-white/35 max-w-md text-sm md:text-base leading-relaxed font-medium">
                A multidisciplinary collective of engineers, designers and strategists — obsessed with digital products that last and experiences that inspire.
              </p>
            </div>

            {/* Stats grid */}
            <div className="border-t border-white/8 pt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
                {[
                  { n: "120+", label: "Projects Delivered" },
                  { n: "15+",  label: "Expert Minds"       },
                  { n: "6yr",  label: "In the Field"       },
                  { n: "3×",   label: "Award-Winning"      },
                ].map(({ n, label }, i) => (
                  <div
                    key={label}
                    className={`flex flex-col gap-2 ${i > 0 ? "md:border-l md:border-white/5 md:pl-8" : ""}`}
                  >
                    <span
                      className="font-black text-white tracking-tighter leading-none"
                      style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)" }}
                    >
                      {n}
                    </span>
                    <span className="text-[8px] text-white/25 uppercase tracking-[0.45em] font-black">{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
