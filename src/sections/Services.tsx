'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/src/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "UI/UX Design",
    description: "Crafting intuitive and immersive interfaces.",
    image: "/images/service-1.jpg",
    bgColor: "bg-lime",
  },
  {
    title: "Branding",
    description: "Defining unique visual identities that resonate.",
    image: "/images/service-2.jpg",
    bgColor: "bg-gray-200",
  },
  {
    title: "Web Development",
    description: "Building high-performance, scalable web applications.",
    image: "/images/service-3.jpg",
    bgColor: "bg-gray-200",
  },
];

export function Services() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Mastering the <span className="text-lime">digital</span>
            <br />
            landscape with <span className="text-lime">precision.</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl">
            Comprehensive services designed to scale your business and dominate
            your niche.
          </p>
        </ScrollReveal>

        {/* Service cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bgColor} rounded-3xl p-6 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p
                  className={`text-sm ${
                    service.bgColor === "bg-lime"
                      ? "text-black/70"
                      : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
