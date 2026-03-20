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
      "Working with this team was an incredible experience from start to finish. Their creativity, attention to detail, and deep technical expertise truly set them apart. They took the time to understand our vision, goals, and challenges, and transformed our ideas into a powerful digital platform that not only met our expectations but exceeded them in every way.",
    image: "/images/testimonial-1.jpg",
    type: "text",
    bgColor: "bg-lime",
  },
  {
    name: "Daniel Carter",
    role: "CEO, Nexa Digital Solutions",
    content:
      "They demonstrated professionalism, clear communication, and a deep understanding of our vision and goals. The final result was not only visually impressive but also highly functional and user-friendly. Their ability to combine...",
    image: "/images/testimonial-2.jpg",
    type: "video",
    bgColor: "bg-black text-white",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, TechStart Inc.",
    content:
      "The team at Digital Addis delivered beyond our expectations. Their innovative approach and dedication to quality made all the difference in our project success.",
    image: "/images/testimonial-3.jpg",
    type: "video",
    bgColor: "bg-gray-200",
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-12">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                What Our <span className="text-lime">Clients</span>
                <br />
                Say About Us
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
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
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${testimonial.bgColor} rounded-3xl p-6 min-w-[300px] sm:min-w-[350px] max-w-[400px] flex-shrink-0 snap-start opacity-0`}
            >
              {testimonial.type === "text" ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p
                        className={`text-sm ${
                          testimonial.bgColor.includes("black")
                            ? "text-white/70"
                            : "text-black/60"
                        }`}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      testimonial.bgColor.includes("black")
                        ? "text-white/80"
                        : "text-black/70"
                    }`}
                  >
                    {testimonial.content}
                  </p>
                </>
              ) : (
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button className="w-14 h-14 bg-lime rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-black ml-1" fill="black" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4
                        className={`font-bold ${
                          testimonial.bgColor.includes("black")
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        className={`text-xs ${
                          testimonial.bgColor.includes("black")
                            ? "text-white/70"
                            : "text-black/60"
                        }`}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm mt-3 leading-relaxed ${
                      testimonial.bgColor.includes("black")
                        ? "text-white/80"
                        : "text-black/70"
                    }`}
                  >
                    {testimonial.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
