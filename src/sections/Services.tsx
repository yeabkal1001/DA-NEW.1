'use client';

import { useEffect, useRef, memo, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/src/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Mobile App Development",
    description: "Building high-performance iOS and Android applications for the modern user.",
    image: "/images/service-1.jpg",
    bgColor: "bg-lime",
  },
  {
    title: "UI/UX & Web Design",
    description: "Creating visually stunning and highly functional digital experiences.",
    image: "/images/service-2.jpg",
    bgColor: "bg-secondary/30 dark:bg-gray-800",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven strategies to amplify your brand's reach and impact.",
    image: "/images/service-3.jpg",
    bgColor: "bg-secondary/30 dark:bg-gray-800",
  },
];

const ServiceCard = memo(function ServiceCard({
  service,
}: {
  service: typeof services[0];
}) {
  return (
    <div
      className={`${service.bgColor} rounded-3xl p-6 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover border border-black/5 dark:border-white/5 shadow-sm`}
    >
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2 text-foreground dark:text-white">{service.title}</h3>
        <p
          className={`text-sm ${
            service.bgColor.includes("bg-lime") ? "text-black/70" : "text-muted-foreground dark:text-white/60"
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
          loading="lazy"
        />
      </div>
    </div>
  );
});

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
            once: true,
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
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground dark:text-white">
            Mastering the <span className="text-lime">digital</span>
            <br />
            landscape with <span className="text-lime">precision.</span>
          </h2>
          <p className="text-muted-foreground dark:text-white/50 text-lg max-w-xl">
            Comprehensive services designed to scale your business and dominate
            your niche.
          </p>
        </ScrollReveal>

        {/* Service cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
