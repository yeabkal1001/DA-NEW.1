'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { Play } from "lucide-react";
import { gsapManager } from "@/src/lib/gsapManager";
import { OptimizedImage } from "@/components/OptimizedImage";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director, BrightWave Agency",
    content:
      "Working with this team was an incredible experience from start to finish. Their creativity, attention to detail, and deep technical expertise truly set them apart. They transformed our ideas into a powerful platform that exceeded every expectation.",
    image: "/images/testimonial-1.jpg",
    bgColor: "bg-lime text-black",
    nameColor: "text-black",
    roleColor: "text-black/60",
    contentColor: "text-black/80",
    playBtnColor: "bg-black",
    playIconColor: "text-lime",
  },
  {
    name: "David Chen",
    role: "Founder, ApexTech Solutions",
    content:
      "They didn't just build our app—they refined our entire digital strategy. Their collaborative approach and focus on clean UX helped us achieve a massive jump in user retention. I highly recommend them to anyone seeking cutting-edge results.",
    image: "/images/testimonial-2.jpg",
    bgColor: "bg-foreground text-background",
    nameColor: "text-background",
    roleColor: "text-background/60",
    contentColor: "text-background/80",
    playBtnColor: "bg-lime",
    playIconColor: "text-black",
  },
  {
    name: "Elena Rostova",
    role: "Creative Director, Velo Brands",
    content:
      "The visual design and animations they created are stunning. Our customers consistently praise the fluidity and aesthetics of our new website. It was a true partnership that significantly elevated our digital brand presence.",
    image: "/images/testimonial-3.jpg",
    bgColor: "bg-foreground/5 text-foreground border border-foreground/10",
    nameColor: "text-foreground",
    roleColor: "text-foreground/50",
    contentColor: "text-foreground/70",
    playBtnColor: "bg-lime",
    playIconColor: "text-black",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsapManager.createContext("testimonials-section", () => {
      // Background animation
      gsap.from(".testimonials-bg", {
        scale: 0.9,
        opacity: 0.3,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Cards stagger reveal
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, containerRef.current || undefined);

    return () => gsapManager.killContext("testimonials-section");
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="testimonials-bg absolute top-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-lime/5 rounded-full blur-[100px] md:blur-[180px] pointer-events-none" />
      <div className="testimonials-bg absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lime/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center p-1 px-3 md:px-4 mb-4 md:mb-6 bg-foreground/5 rounded-full border border-foreground/10">
                <span className="w-1.5 h-1.5 bg-lime rounded-full mr-2 md:mr-3 animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60">
                  Client Stories
                </span>
              </div>
              <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-[900] leading-[0.9] tracking-tighter text-foreground uppercase mb-4 md:mb-6">
                What They <br />
                Say About Us
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Our clients are at the center of everything we do. Their
                experiences reflect our commitment to creativity, innovation, and
                delivering high-quality digital solutions.
              </p>
            </div>
            {/* Client avatars */}
            <div className="flex -space-x-3">
              {testimonials.map((t, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-background overflow-hidden relative">
                  <OptimizedImage
                    src={t.image}
                    alt={t.name}
                    fill
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonial cards - uniform layout */}
        <div
          ref={cardsRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${testimonial.bgColor} rounded-2xl md:rounded-3xl p-5 md:p-6 min-w-[300px] sm:min-w-[340px] md:min-w-[370px] max-w-[420px] flex-shrink-0 snap-start opacity-0 shadow-sm flex flex-col gap-4`}
            >
              {/* Video thumbnail */}
              <div className="relative rounded-xl overflow-hidden flex-shrink-0 h-44 w-full">
                <OptimizedImage
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    className={`w-12 h-12 ${testimonial.playBtnColor} rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}
                    aria-label="Play video testimonial"
                  >
                    <Play className={`h-5 w-5 ${testimonial.playIconColor} ml-0.5`} fill="currentColor" />
                  </button>
                </div>
              </div>
              {/* Text content */}
              <div>
                <p className={`text-sm leading-relaxed mb-4 ${testimonial.contentColor}`}>
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden relative flex-shrink-0">
                    <OptimizedImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                    />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${testimonial.nameColor}`}>{testimonial.name}</h4>
                    <p className={`text-xs ${testimonial.roleColor}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
