'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/src/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export function Team() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".bento-item");
    if (!items) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left side - Title and description */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                The Minds Behind the <span className="text-lime">Innovation</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Our team is a diverse group of visionary designers, innovative
                developers, and strategic thinkers, united by a shared passion for
                creating bold digital experiences. Every member brings unique
                expertise and perspective, combining creativity.
              </p>
            </ScrollReveal>
          </div>

          {/* Right side - Bento grid */}
          <div ref={gridRef} className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Team member 1 - Large card */}
              <div className="bento-item col-span-2 md:col-span-1 md:row-span-2 opacity-0">
                <div className="bg-gray-300 rounded-3xl overflow-hidden h-full">
                  <img
                    src="/images/team-1.jpg"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Our Process card */}
              <div className="bento-item bg-lime rounded-3xl p-6 opacity-0">
                <h3 className="text-xl font-bold mb-2">Our Process</h3>
                <p className="text-sm text-black/70">
                  From concept to execution, our process blends strategic design,
                  cutting-edge technology, and creative thinking.
                </p>
              </div>

              {/* Team member 2 */}
              <div className="bento-item opacity-0">
                <div className="bg-gray-200 rounded-3xl overflow-hidden h-40">
                  <img
                    src="/images/team-2.jpg"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Team member 3 */}
              <div className="bento-item opacity-0">
                <div className="bg-gray-200 rounded-3xl overflow-hidden h-40">
                  <img
                    src="/images/team-3.jpg"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Our Vision card */}
              <div className="bento-item bg-lime rounded-3xl p-6 opacity-0">
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-sm text-black/70">
                  We aim to craft digital experiences that inspire, innovate, and
                  push the boundaries of creativity.
                </p>
              </div>

              {/* Our Mission card */}
              <div className="bento-item bg-black text-white rounded-3xl p-6 opacity-0">
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-sm text-white/70">
                  To transform bold ideas into digital products that empower
                  brands, engage users, and shape the future of online
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
