'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Threads from "@/components/ui/threads";
import { ArrowRight, ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;

function getFramePath(index: number): string {
  const num = String(index).padStart(3, "0");
  return `https://vgdhkdqepaxaupyqhqun.supabase.co/storage/v1/object/public/seq/ezgif-frame-${num}_compressed_compressed.webp`;
}

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const threadsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all images with progress
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = getFramePath(i);
      const onDone = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          // Small delay so user sees 100% before transition
          setTimeout(() => setIsLoaded(true), 400);
        }
      };
      img.onload = onDone;
      img.onerror = onDone;
      images.push(img);
    }
  }, []);

  // Draw frame on canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    const img = imagesRef.current[index];
    if (!ctx || !img || !img.complete) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;
    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (isLoaded) {
        drawFrame(Math.round(frameIndexRef.current.value));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded]);

  // Setup GSAP animations
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const heroContent = heroContentRef.current;
    const aboutContent = aboutContentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const progressBar = progressRef.current;
    const progressFill = progressFillRef.current;
    if (!canvas || !container || !heroContent || !aboutContent) return;

    drawFrame(0);

    const ctx = gsap.context(() => {
      // ─── Entrance animation ───
      const heroTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      // Reveal title lines one by one
      heroTl
        .fromTo(
          heroContent.querySelectorAll(".hero-line"),
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          }
        )
        .fromTo(
          heroContent.querySelectorAll(".hero-badge"),
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08 },
          "-=0.5"
        )
        .fromTo(
          heroContent.querySelector(".hero-subtitle"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          heroContent.querySelector(".hero-divider"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          "-=0.4"
        )
        .fromTo(
          heroContent.querySelector(".hero-cta"),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          scrollIndicator,
          { opacity: 0 },
          { opacity: 0.7, duration: 0.6 },
          "-=0.2"
        )
        .fromTo(
          heroContent.querySelector(".hero-side-label"),
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          progressBar,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.3"
        );

      // ─── Scroll-driven timeline ───
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: ".hero-sequence-pinned",
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Frame scrub
      scrollTl.to(
        frameIndexRef.current,
        {
          value: FRAME_COUNT - 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            drawFrame(Math.round(frameIndexRef.current.value));
          },
        },
        0
      );

      // Progress bar fill
      if (progressFill) {
        scrollTl.fromTo(
          progressFill,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", duration: 1 },
          0
        );
      }

      // Hero content fade out and visibility toggle
      scrollTl.fromTo(
        heroContent,
        { opacity: 1 },
        { opacity: 0, ease: "power2.inOut", duration: 0.15 },
        0.28
      );
      scrollTl.set(heroContent, { pointerEvents: "none" }, 0.28);

      // Hero Threads Background Fade Out
      if (threadsRef.current) {
        scrollTl.fromTo(
          threadsRef.current,
          { opacity: 1 },
          { opacity: 0, ease: "power2.inOut", duration: 0.15 },
          0.28
        );
        scrollTl.set(threadsRef.current, { pointerEvents: "none" }, 0.28);
      }
      scrollTl.fromTo(
        heroContent.querySelectorAll(".hero-line"),
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          stagger: 0.02,
          ease: "power2.in",
          duration: 0.1,
        },
        0.25
      );

      scrollTl.fromTo(
        heroContent.querySelector(".hero-subtitle"),
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, ease: "power2.in", duration: 0.1 },
        0.26
      );

      scrollTl.fromTo(
        heroContent.querySelector(".hero-divider"),
        { scaleX: 1 },
        { scaleX: 0, ease: "power2.in", duration: 0.1 },
        0.26
      );

      scrollTl.fromTo(
        heroContent.querySelector(".hero-cta"),
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, ease: "power2.in", duration: 0.1 },
        0.27
      );

      scrollTl.fromTo(
        heroContent.querySelectorAll(".hero-badge"),
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -15, scale: 0.95, stagger: 0.01, ease: "power2.in", duration: 0.1 },
        0.25
      );

      scrollTl.fromTo(
        heroContent.querySelector(".hero-side-label"),
        { opacity: 1 },
        { opacity: 0, ease: "power2.in", duration: 0.1 },
        0.26
      );

      // Scroll indicator fade out
      scrollTl.to(
        scrollIndicator,
        { opacity: 0, duration: 0.08, ease: "power2.in" },
        0.03
      );

      // About content reveal
      scrollTl.set(aboutContent, { pointerEvents: "auto" }, 0.38);
      scrollTl.fromTo(
        aboutContent,
        { opacity: 0 },
        { opacity: 1, duration: 0.05 },
        0.38
      );

      scrollTl.fromTo(
        aboutContent.querySelector(".about-accent-line"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.15, ease: "power2.out" },
        0.4
      );

      scrollTl.fromTo(
        aboutContent.querySelector(".about-label"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.1, ease: "power3.out" },
        0.42
      );

      scrollTl.fromTo(
        aboutContent.querySelectorAll(".about-title-line"),
        { opacity: 0, y: 50, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.04,
          duration: 0.12,
          ease: "power3.out",
        },
        0.44
      );

      scrollTl.fromTo(
        aboutContent.querySelector(".about-description"),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" },
        0.5
      );

      scrollTl.fromTo(
        aboutContent.querySelectorAll(".about-stat"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.1, ease: "power3.out" },
        0.55
      );

      scrollTl.fromTo(
        aboutContent.querySelector(".about-cta"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" },
        0.62
      );

      scrollTl.fromTo(
        aboutContent.querySelector(".about-side-label"),
        { opacity: 0 },
        { opacity: 1, duration: 0.1, ease: "power3.out" },
        0.46
      );
    }, container);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="hero-sequence-container"
      style={{ height: "500vh" }}
    >
      <div className="hero-sequence-pinned">
        {/* Canvas */}
        <canvas ref={canvasRef} className="hero-sequence-canvas" />

        {/* ── Threads fullscreen background effect ── */}
        <div ref={threadsRef} className="absolute inset-0 z-[2] w-full h-full pointer-events-auto opacity-70 overflow-hidden" style={{ willChange: "opacity" }}>
          <Threads
            color={[0.8, 1, 0]} /* Exact normalized RGB for #CCFF00 (Lime) */
            amplitude={3}
            distance={0.4}
            enableMouseInteraction
          />
        </div>

        {/* Overlays */}
        <div className="hero-sequence-overlay" />
        <div className="hero-sequence-vignette" />
        <div className="hero-sequence-grain" />

        {/* Top border accent */}
        <div className="hero-top-accent" />

        {/* Progress bar (right edge) */}
        <div ref={progressRef} className="hero-progress-track" style={{ opacity: 0 }}>
          <div ref={progressFillRef} className="hero-progress-fill" />
        </div>

        {/* Loading state */}
        {!isLoaded && (
          <div className="hero-sequence-loader">
            <div className="hero-loader-content">
              <div className="hero-loader-brand">Digital Addis</div>
              <div className="hero-loader-bar-track">
                <div
                  className="hero-loader-bar-fill"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="hero-loader-text">{loadProgress}%</span>
            </div>
          </div>
        )}

        {/* ═══════ Hero Content ═══════ */}
        <div ref={heroContentRef} className="hero-sequence-content hero-content-left">
          {/* Side vertical label */}
          <div className="hero-side-label">
            <span>Digital Addis — Creative Studio</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              EST. 2018
            </div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Innovation First
            </div>
          </div>

          <h1 className="hero-title" style={{ perspective: "800px" }}>
            <span className="hero-line">Architecting the</span>
            <span className="hero-line">
              <span className="hero-title-accent">Digital</span> Future
            </span>
            <span className="hero-line hero-title-thin">with Precision.</span>
          </h1>

          <div className="hero-divider" />

          <p className="hero-subtitle">
            We specialize in crafting bespoke digital experiences where 
            advanced strategy meets human-centric design. Elevating bold 
            brands into the new era of interaction.
          </p>

          <div className="hero-cta">
            <Button
              size="lg"
              className="hero-btn-primary"
            >
              View Portfolio
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hero-btn-outline"
            >
              Let's Talk
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollIndicatorRef} className="hero-scroll-indicator">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll</span>
          <ArrowDown className="hero-scroll-arrow" />
        </div>

        {/* ═══════ About Content ═══════ */}
        <div ref={aboutContentRef} className="hero-sequence-content about-content-left" style={{ opacity: 0, pointerEvents: "none" }}>
          {/* Side vertical label */}
          <div className="about-side-label" style={{ opacity: 0 }}>
            <span>Who We Are — About</span>
          </div>

          {/* Accent line */}
          <div className="about-accent-line" />

          <div className="about-label-wrap">
            <span className="about-label">OUR PHILOSOPHY</span>
          </div>

          <h2 className="about-title" style={{ perspective: "800px" }}>
            <span className="about-title-line">The Core of Modern</span>
            <span className="about-title-line">
              Digital <span className="hero-title-accent">Excellence</span>
            </span>
          </h2>

          <p className="about-description">
            At Digital Addis, we believe that every pixel tells a story. 
            Our multidisciplinary team combines architectural thinking with 
            cutting-edge technology to build ecosystems that inspire, engage, and endure.
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">120<span className="about-stat-plus">+</span></span>
              <span className="about-stat-label">Global Deliveries</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <span className="about-stat-number">15<span className="about-stat-plus">+</span></span>
              <span className="about-stat-label">Lead Technologists</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <span className="about-stat-number">5<span className="about-stat-plus">+</span></span>
              <span className="about-stat-label">Years of Vision</span>
            </div>
          </div>

          <div className="about-cta" style={{ opacity: 0 }}>
            <Button
              size="lg"
              className="hero-btn-primary"
            >
              Get to Know Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
