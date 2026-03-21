'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { Play } from "lucide-react";

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
    name: "Daniel Carter",
    role: "CEO, Nexa Digital Solutions",
    content:
      "They demonstrated professionalism, clear communication, and a deep understanding of our vision and goals. The final result was not only visually impressive but also highly functional and user-friendly.",
    image: "/images/testimonial-2.jpg",
    bgColor: "bg-foreground text-background",
    nameColor: "text-background",
    roleColor: "text-background/60",
    contentColor: "text-background/80",
    playBtnColor: "bg-lime",
    playIconColor: "text-black",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, TechStart Inc.",
    content:
      "The team at Digital Addis delivered beyond our expectations. Their innovative approach and dedication to quality made all the difference in our project success.",
    image: "/images/testimonial-3.jpg",
    bgColor: "bg-background border border-foreground/10 text-foreground",
    nameColor: "text-foreground",
    roleColor: "text-foreground/60",
    contentColor: "text-foreground/80",
    playBtnColor: "bg-lime",
    playIconColor: "text-black",
  },
];

export function Testimonials() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-12">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                What Our <span className="text-lime">Clients</span>
                <br />
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
                <img
                  key={i}
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border-2 border-background object-cover"
                />
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
              <div className="relative rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-44 object-cover"
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
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
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
