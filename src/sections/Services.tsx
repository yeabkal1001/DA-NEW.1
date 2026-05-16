'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SPLIT_CSS = `
  .sc-split-line { overflow: hidden; display: block; }
  .sc-split-line-inner { display: block; will-change: transform; }
`;

const serviceData = [
  {
    id: "01",
    label: "Mobile App Development",
    tagline: "Built for\nthe modern world",
    description:
      "High-performance iOS and Android applications engineered with precision — from pixel-perfect UI to seamless backend integration.",
    image: "/images/service-1.jpg",
  },
  {
    id: "02",
    label: "UI/UX & Web Design",
    tagline: "Design that\ncommunicates",
    description:
      "We craft visually stunning and highly functional digital experiences that convert visitors into loyal customers.",
    image: "/images/service-2.jpg",
  },
  {
    id: "03",
    label: "Digital Marketing",
    tagline: "Amplify your\nbrand's reach",
    description:
      "Data-driven strategies that place your brand in front of the right audience at exactly the right moment.",
    image: "/images/service-3.jpg",
  },
];

function splitTextToLines(container: HTMLElement) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const G = gsap as any;
  if (G.SplitText) {
    const split = new G.SplitText(container.querySelectorAll('h2, p'), {
      type: "lines",
      linesClass: "sc-split-line",
    });
    split.lines.forEach((line: HTMLElement) => {
      const inner = document.createElement("span");
      inner.className = "sc-split-line-inner";
      inner.innerHTML = line.innerHTML;
      line.innerHTML = "";
      line.appendChild(inner);
    });
    return split;
  }
  const targets = container.querySelectorAll<HTMLElement>('h2, p');
  targets.forEach((el) => {
    const chunks = el.innerHTML.split(/<br\s*\/?>/gi);
    el.innerHTML = chunks
      .map((c) => `<span class="sc-split-line"><span class="sc-split-line-inner">${c}</span></span>`)
      .join("");
  });
  return null;
}

export function Services() {
  const sectionRef  = useRef<HTMLElement>(null);
  const colImgRef   = useRef<HTMLDivElement>(null);
  const colTxtRef   = useRef<HTMLDivElement>(null);
  const imgOverlay  = useRef<HTMLDivElement>(null);
  const imgFinal    = useRef<HTMLDivElement>(null);
  const textS1Ref   = useRef<HTMLDivElement>(null);
  const textS2Ref   = useRef<HTMLDivElement>(null);
  const textS3Ref   = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // CSS for split lines
    if (!document.getElementById("sc-split-css")) {
      const s = document.createElement("style");
      s.id = "sc-split-css";
      s.textContent = SPLIT_CSS;
      document.head.appendChild(s);
    }

    // Split text blocks
    const blocks = [textS1Ref.current, textS2Ref.current, textS3Ref.current].filter(Boolean) as HTMLElement[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = blocks.map(splitTextToLines);

    const img   = colImgRef.current!;
    const txt   = colTxtRef.current!;
    const imgO  = imgOverlay.current!;
    const imgF  = imgFinal.current!;
    const s1    = textS1Ref.current!;
    const s2    = textS2Ref.current!;
    const s3    = textS3Ref.current!;

    // ── Set initial hidden states ─────────────────────────
    gsap.set(img, { opacity: 0, x: "-80px" });
    gsap.set(txt, { opacity: 0, x: "80px" });
    gsap.set(imgO, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });
    gsap.set(imgF, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });
    gsap.set(s2.querySelectorAll<HTMLElement>(".sc-split-line-inner"), { yPercent: 110 });
    gsap.set(s3.querySelectorAll<HTMLElement>(".sc-split-line-inner"), { yPercent: 110 });

    // ── Entrance ──────────────────────────────────────────
    const ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      })
        .to(img, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })
        .to(txt, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "<")
        .to(s1.querySelectorAll<HTMLElement>(".sc-split-line-inner"), {
          yPercent: 0, stagger: 0.08, duration: 0.9, ease: "power4.out",
        }, "-=0.5");

      // ── Pinned scroll timeline ─────────────────────────────
      // The section pins for 200% of scroll.
      // At 0%   → phase 0: image LEFT, text RIGHT
      // At ~45% → phase 1: image RIGHT, text LEFT (swapped)
      // At ~80% → phase 2: image LEFT,  text RIGHT (restored)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.4)       setPhase(0);
            else if (p < 0.72) setPhase(1);
            else               setPhase(2);
          },
        },
      });

      // Duration units are arbitrary — scrub maps them to scroll distance.
      // Total timeline = 4 units.

      // ── PHASE 1 → 2 (t=0 to t=2) ──────────────────────────
      // Columns swap: image travels RIGHT, text travels LEFT
      tl.to(img, { x: "45vw",  duration: 2, ease: "power2.inOut" }, 0)
        .to(txt, { x: "-55vw", duration: 2, ease: "power2.inOut" }, 0)
        // New image wipes in left-to-right
        .to(imgO, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.8, ease: "power2.inOut",
        }, 0.1)
        // Text: S1 out (up), S2 in (from bottom)
        .to(s1.querySelectorAll<HTMLElement>(".sc-split-line-inner"), {
          yPercent: -110, stagger: 0.04, duration: 0.7, ease: "power3.in",
        }, 0.2)
        .to(s2.querySelectorAll<HTMLElement>(".sc-split-line-inner"), {
          yPercent: 0, stagger: 0.05, duration: 0.9, ease: "power3.out",
        }, 0.8);

      // ── PHASE 2 → 3 (t=2 to t=4) ──────────────────────────
      // Columns swap back: image travels LEFT, text travels RIGHT
      tl.to(img, { x: "0vw", duration: 2, ease: "power2.inOut" }, 2)
        .to(txt, { x: "0vw", duration: 2, ease: "power2.inOut" }, 2)
        // New image wipes in
        .to(imgF, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.8, ease: "power2.inOut",
        }, 2.1)
        // Text: S2 out (up), S3 in (from bottom)
        .to(s2.querySelectorAll<HTMLElement>(".sc-split-line-inner"), {
          yPercent: -110, stagger: 0.04, duration: 0.7, ease: "power3.in",
        }, 2.2)
        .to(s3.querySelectorAll<HTMLElement>(".sc-split-line-inner"), {
          yPercent: 0, stagger: 0.05, duration: 0.9, ease: "power3.out",
        }, 2.8);

    }, sectionRef);

    return () => {
      ctx.revert();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      splits.forEach((s: any) => s?.revert?.());
    };
  }, []);

  const active = serviceData[phase];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-zinc-950 relative"
      style={{ height: "100vh", willChange: "transform" }}
    >
      {/* No overflow:hidden on section — columns need room to cross */}
      <div className="relative w-full h-full" style={{ overflow: "hidden" }}>

        {/* ── IMAGE COLUMN (55% wide, starts LEFT) ─────────── */}
        <div
          ref={colImgRef}
          className="absolute top-0 left-0 h-full"
          style={{ width: "55%", zIndex: 1 }}
        >
          {/* Service 1 — base */}
          <div className="absolute inset-0">
            <Image src={serviceData[0].image} alt={serviceData[0].label}
              fill className="object-cover" sizes="55vw" priority />
          </div>

          {/* Service 2 — wipes in */}
          <div ref={imgOverlay} className="absolute inset-0"
            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}>
            <Image src={serviceData[1].image} alt={serviceData[1].label}
              fill className="object-cover" sizes="55vw" />
          </div>

          {/* Service 3 — wipes in */}
          <div ref={imgFinal} className="absolute inset-0"
            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}>
            <Image src={serviceData[2].image} alt={serviceData[2].label}
              fill className="object-cover" sizes="55vw" />
          </div>

          {/* Gradient bleed to right for seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-950/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />

          {/* Dot progress indicators */}
          <div className="absolute bottom-8 left-8 flex items-center gap-3 z-10">
            {serviceData.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-700"
                style={{
                  width:  phase === i ? "36px" : "6px",
                  height: "2px",
                  backgroundColor: phase === i ? "#CCFF00" : "rgba(255,255,255,0.25)",
                }} />
            ))}
          </div>
        </div>

        {/* ── TEXT COLUMN (45% wide, starts RIGHT) ─────────── */}
        <div
          ref={colTxtRef}
          className="absolute top-0 right-0 h-full flex flex-col justify-center overflow-hidden"
          style={{ width: "45%", zIndex: 2, padding: "0 clamp(2rem, 5vw, 5rem)" }}
        >
          {/* Eyebrow */}
          <div className="mb-6 flex-shrink-0">
            <p className="text-lime font-mono text-[10px] tracking-[0.4em] uppercase mb-3">
              Our Services
            </p>
            <div className="h-[1px] w-16 bg-lime/40" />
          </div>

          {/* Counter */}
          <div className="flex items-end gap-3 mb-8 flex-shrink-0">
            <span className="text-lime font-black leading-none tabular-nums transition-all duration-500"
              style={{ fontSize: "clamp(3rem,6vw,5rem)" }}>
              {active.id}
            </span>
            <span className="text-white/20 font-light text-sm mb-2">/ 03</span>
          </div>

          {/* Text blocks stacked absolutely */}
          <div className="relative flex-shrink-0" style={{ height: "260px", overflow: "hidden" }}>

            <div ref={textS1Ref}
              className="sc-text-block absolute inset-0"
              style={{ pointerEvents: phase === 0 ? "auto" : "none" }}>
              <h2 className="font-black text-white tracking-tight whitespace-pre-line mb-5"
                style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)", lineHeight: "0.93" }}>
                {serviceData[0].tagline}
              </h2>
              <p className="text-white/50 text-sm md:text-base leading-relaxed font-light max-w-sm">
                {serviceData[0].description}
              </p>
            </div>

            <div ref={textS2Ref}
              className="sc-text-block absolute inset-0"
              style={{ pointerEvents: phase === 1 ? "auto" : "none" }}>
              <h2 className="font-black text-white tracking-tight whitespace-pre-line mb-5"
                style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)", lineHeight: "0.93" }}>
                {serviceData[1].tagline}
              </h2>
              <p className="text-white/50 text-sm md:text-base leading-relaxed font-light max-w-sm">
                {serviceData[1].description}
              </p>
            </div>

            <div ref={textS3Ref}
              className="sc-text-block absolute inset-0"
              style={{ pointerEvents: phase === 2 ? "auto" : "none" }}>
              <h2 className="font-black text-white tracking-tight whitespace-pre-line mb-5"
                style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)", lineHeight: "0.93" }}>
                {serviceData[2].tagline}
              </h2>
              <p className="text-white/50 text-sm md:text-base leading-relaxed font-light max-w-sm">
                {serviceData[2].description}
              </p>
            </div>

          </div>

          {/* Service name pill */}
          <div className="mt-8 flex-shrink-0">
            <span className="border border-white/10 rounded-full px-4 py-2 text-[10px] text-white/40 font-mono tracking-[0.2em] uppercase transition-all duration-500">
              {active.label}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
