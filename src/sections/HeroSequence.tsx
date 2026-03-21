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
  const idx = i * SKIP_STEP;
  const num = String(idx).padStart(3, "0");
  const delay = (idx % 3 === 0 || idx === 0) ? "0.041s" : "0.042s";
  return `/images/image sequence/frame_${num}_delay-${delay}_compressed.webp`;
});

// Services ticker items
const TICKER = ["Brand Identity", "Web Development", "Mobile Apps", "Cloud Solutions", "UI/UX Design", "Digital Strategy", "Brand Identity", "Web Development", "Mobile Apps", "Cloud Solutions", "UI/UX Design", "Digital Strategy"];

export function HeroSequence() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const heroLeftRef     = useRef<HTMLDivElement>(null);
  const aboutLeftRef    = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const imagesRef       = useRef<HTMLImageElement[]>(new Array(FRAME_COUNT).fill(null));

  const [isLoaded,     setIsLoaded]     = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  /* ── draw ── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const img = imagesRef.current[index];
    if (!ctx || !img?.complete) return;
    const cr = canvas.width / canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    let dw: number, dh: number, dx: number, dy: number;
    if (ir > cr) { dh = canvas.height; dw = dh * ir; dx = (canvas.width - dw) / 2; dy = 0; }
    else { dw = canvas.width; dh = dw / ir; dx = 0; dy = (canvas.height - dh) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ── load ── */
  useEffect(() => {
    let loaded = 0, mounted = true;
    const run = async () => {
      const f0 = new Image();
      f0.src = frameNames[0];
      f0.onload = () => { if (!mounted) return; imagesRef.current[0] = f0; drawFrame(0); };
      for (let i = 0; i < PRIORITY_FRAMES; i++) {
        if (!mounted) return;
        const img = new Image();
        img.crossOrigin = "anonymous"; img.decoding = "async"; img.src = frameNames[i];
        await new Promise(r => {
          img.onload = () => { imagesRef.current[i] = img; loaded++; setLoadProgress(Math.round(loaded / FRAME_COUNT * 100)); r(null); };
          img.onerror = r;
        });
      }
      setIsLoaded(true);
      const batch = (s: number) => {
        if (!mounted || s >= FRAME_COUNT) return;
        const e = Math.min(s + 3, FRAME_COUNT);
        for (let i = s; i < e; i++) {
          const img = new Image(); img.src = frameNames[i];
          img.onload = () => { imagesRef.current[i] = img; loaded++; setLoadProgress(Math.round(loaded / FRAME_COUNT * 100)); };
        }
        if (e < FRAME_COUNT) { 'requestIdleCallback' in window ? window.requestIdleCallback(() => batch(e)) : setTimeout(() => batch(e), 100); }
      };
      batch(PRIORITY_FRAMES);
    };
    run();
    return () => { mounted = false; };
  }, [drawFrame]);

  /* ── canvas resize ── */
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width  = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
      drawFrame(0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  /* ── GSAP ── */
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {

      /* ENTRANCE */
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Seq number flickers in
      tl.fromTo(".sp-seq",
        { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });

      // 2. Top rule draws right
      tl.fromTo(".sp-rule-top",
        { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "expo.out", transformOrigin: "left" },
        "-=0.2");

      // 3. Brand word 1 clips up
      tl.fromTo(".sp-w1 .sp-inner",
        { y: "110%", skewY: 2.5 },
        { y: "0%",   skewY: 0, duration: 1.1, ease: "expo.out" },
        "-=0.65");

      // 4. Brand word 2 clips up — slightly staggered
      tl.fromTo(".sp-w2 .sp-inner",
        { y: "110%", skewY: 2.5 },
        { y: "0%",   skewY: 0, duration: 1.1, ease: "expo.out" },
        "-=0.9");

      // 5. Bottom rule draws right
      tl.fromTo(".sp-rule-bottom",
        { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "expo.out", transformOrigin: "left" },
        "-=0.65");

      // 6. Sub text + CTA
      tl.fromTo([".sp-tagline", ".sp-meta"],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
        "-=0.55");

      // 7. CTA link
      tl.fromTo(".sp-cta",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5");

      // 8. Ticker reveal
      tl.fromTo(".sp-ticker-wrap",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.4");

      // Scroll dot pulse
      gsap.to(".sp-scroll-dot", { y: 7, duration: 1.1, ease: "power1.inOut", repeat: -1, yoyo: true, delay: 2 });

      /* SCROLL SEQUENCE */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end:   "bottom bottom",
          scrub: 0.5,
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

      // Hero left panel — dissolves out
      scrollTl.to(heroLeftRef.current, {
        opacity: 0,
        y: -40,
        filter: "blur(6px)",
        duration: 0.25,
        ease: "power2.in"
      }, 0.06);

      // About panel — wipes in
      scrollTl.fromTo(aboutLeftRef.current,
        { opacity: 0, y: 70, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.out" },
        0.38);

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="hero-sequence-container" style={{ height: "500vh" }}>
      <div className="hero-sequence-pinned h-screen w-full sticky top-0 overflow-hidden bg-black flex">

        {/* ══ LEFT PANEL — pure black, text ══════════════════════════════════ */}
        <div className="relative z-20 flex flex-col w-full lg:w-[46%] flex-shrink-0 bg-black border-r border-white/[0.06]">

          {/* Loader inside left panel */}
          {!isLoaded && (
            <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6">
              <div className="flex items-baseline gap-2">
                <span className="text-white font-black text-xl tracking-tighter">DIGITAL</span>
                <span className="font-black italic text-xl tracking-tighter" style={{ color: "#CCFF00" }}>ADDIS</span>
              </div>
              <div className="w-32 h-px bg-white/8 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 transition-all duration-200" style={{ width: `${loadProgress}%`, backgroundColor: "#CCFF00", boxShadow: "0 0 8px rgba(204,255,0,0.6)" }} />
              </div>
              <span className="text-white/20 font-mono text-[8px] tracking-[0.7em]">{loadProgress}%</span>
            </div>
          )}

          {/* ── HERO content ─────────────────────────────── */}
          <div ref={heroLeftRef} className="absolute inset-0 flex flex-col px-8 md:px-12 lg:px-14 pt-[5.5rem] md:pt-[6rem] pb-10 md:pb-12 pointer-events-none">

            {/* Sequence number */}
            <div className="sp-seq flex items-center gap-3 mb-auto">
              <span className="text-[8px] text-white/20 font-black tracking-[0.7em] tabular-nums">001</span>
              <span className="w-4 h-px bg-white/10 block" />
              <span className="text-[8px] text-white/15 font-black uppercase tracking-[0.5em]">Hero</span>
            </div>

            {/* Headline block */}
            <div className="mb-6 md:mb-8">
              {/* Rule top */}
              <div className="sp-rule-top w-full h-px mb-5 md:mb-7" style={{ backgroundColor: "rgba(255,255,255,0.1)", transformOrigin: "left" }} />

              {/* DIGITAL */}
              <div className="sp-w1 overflow-hidden">
                <div className="sp-inner">
                  <span className="block font-black text-white whitespace-nowrap leading-[0.87] tracking-[-0.05em]"
                    style={{ fontSize: "clamp(3.5rem, 7.5vw, 8rem)" }}>
                    DIGITAL
                  </span>
                </div>
              </div>

              {/* ADDIS — indented, lime, italic */}
              <div className="sp-w2 overflow-hidden">
                <div className="sp-inner flex items-end gap-2.5 pl-[3px]">
                  <span className="block font-black italic whitespace-nowrap leading-[0.87] tracking-[-0.05em]"
                    style={{ fontSize: "clamp(3.5rem, 7.5vw, 8rem)", color: "#CCFF00" }}>
                    ADDIS
                  </span>
                  {/* Period accent in lime */}
                  <span className="block font-black text-white/15 leading-none pb-1 md:pb-2 text-3xl md:text-5xl">.</span>
                </div>
              </div>

              {/* Rule bottom */}
              <div className="sp-rule-bottom w-full h-px mt-5 md:mt-7" style={{ backgroundColor: "rgba(255,255,255,0.1)", transformOrigin: "left" }} />
            </div>

            {/* Tagline */}
            <p className="sp-tagline text-white/35 leading-relaxed font-medium mb-8 md:mb-10 max-w-xs"
              style={{ fontSize: "clamp(0.78rem, 1vw, 0.9rem)" }}>
              Ethiopia's premier digital agency — elite software, brand identities and cloud infrastructure.
            </p>

            {/* Meta row */}
            <div className="sp-meta flex items-center gap-4 mb-10 md:mb-14">
              <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.5em]">Est. 2018</span>
              <span className="w-1 h-1 rounded-full bg-white/15 block" />
              <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.5em]">Addis Ababa, ET</span>
            </div>

            {/* CTA */}
            <div className="sp-cta pointer-events-auto mb-auto flex items-center justify-between pr-2">
              <Link href="/contact" className="group flex items-center gap-4">
                <div className="w-11 h-11 rounded-full border border-white/12 flex items-center justify-center
                  group-hover:bg-[#CCFF00] group-hover:border-[#CCFF00] group-hover:scale-105
                  transition-all duration-500">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    className="text-white group-hover:text-black transition-colors duration-300">
                    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5"
                      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] text-white/30 font-black uppercase tracking-[0.5em] leading-tight">Start a</span>
                  <span className="text-[8px] text-white font-black uppercase tracking-[0.5em] leading-tight group-hover:text-[#CCFF00] transition-colors duration-400">Project</span>
                </div>
              </Link>

              {/* Scroll indicator */}
              <div className="flex flex-col items-center gap-2">
                <div className="sp-scroll-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(204,255,0,0.5)" }} />
                <div className="w-px h-10 bg-white/10" />
              </div>
            </div>
          </div>

          {/* ── ABOUT content (scroll-revealed) ──────────── */}
          <div ref={aboutLeftRef} className="absolute inset-0 flex flex-col px-8 md:px-12 lg:px-14 pt-[5.5rem] md:pt-[6rem] pb-10 md:pb-12 opacity-0 pointer-events-none">

            <div className="flex items-center gap-3 mb-auto">
              <span className="text-[8px] text-[#CCFF00] font-black tracking-[0.7em] tabular-nums">002</span>
              <span className="w-4 h-px block" style={{ backgroundColor: "rgba(204,255,0,0.3)" }} />
              <span className="text-[8px] font-black uppercase tracking-[0.5em]" style={{ color: "rgba(204,255,0,0.5)" }}>About</span>
            </div>

            {/* Manifesto */}
            <div className="mb-8 md:mb-10">
              <h2 className="font-black text-white leading-[0.86] tracking-[-0.04em] mb-6"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 6rem)" }}>
                We don't<br />
                <span style={{ color: "rgba(255,255,255,0.2)" }} className="italic">just build.</span><br />
                <span style={{ color: "#CCFF00" }}>We architect</span><br />
                <span style={{ color: "rgba(255,255,255,0.2)" }}>futures.</span>
              </h2>
              <p className="text-white/35 text-sm md:text-base leading-relaxed font-medium max-w-xs">
                A multidisciplinary collective — engineers, designers and strategists obsessed with launching digital products that last.
              </p>
            </div>

            {/* Stats */}
            <div className="border-t pt-8 grid grid-cols-2 gap-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {[
                { n: "120+", l: "Projects" },
                { n: "15+",  l: "Experts"  },
                { n: "6yr",  l: "Legacy"   },
                { n: "3×",   l: "Awards"   },
              ].map(({ n, l }) => (
                <div key={l} className="flex flex-col gap-1.5">
                  <span className="font-black text-white tracking-tighter leading-none"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}>{n}</span>
                  <span className="text-[8px] text-white/25 uppercase tracking-[0.45em] font-black">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom ticker — spans full left panel width */}
          <div className="sp-ticker-wrap absolute bottom-0 left-0 right-0 h-10 border-t overflow-hidden flex items-center z-50"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-0 animate-[ticker_25s_linear_infinite] whitespace-nowrap will-change-transform">
              {TICKER.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-5 px-5">
                  <span className="text-[8px] text-white/25 font-black uppercase tracking-[0.45em]">{item}</span>
                  <span className="w-1 h-1 rounded-full bg-white/15 block flex-shrink-0" />
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ══ RIGHT PANEL — image sequence ═══════════════════════════════════ */}
        <div className="relative flex-1 overflow-hidden hidden lg:block">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

          {/* Subtle inner shadow on left edge to blend panels */}
          <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)" }} />

          {/* Subtle vignette */}
          <div className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 30%), linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 20%)" }} />

          {/* Film grain */}
          <div className="absolute inset-0 z-[2] opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

          {/* Scroll progress bar */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-px h-16 z-20 overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <div ref={progressFillRef} className="w-full h-full origin-top scale-y-0"
              style={{ backgroundColor: "#CCFF00" }} />
          </div>

          {/* "Creative Studio" label — bottom right of image panel */}
          <div className="absolute bottom-10 right-8 z-20 flex flex-col items-end gap-2">
            <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.5em]">Creative Studio</span>
            <span className="text-[8px] text-white/12 font-black uppercase tracking-[0.5em]">Since 2018</span>
          </div>
        </div>

      </div>
    </div>
  );
}
