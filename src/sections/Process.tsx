'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/src/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    title: "Discover & Understand",
    description:
      "We begin by learning about your business, goals, and audience. Through discussion and research, we gather the insights needed to create solutions that truly align with your vision.",
  },
  {
    title: "Plan & Strategize",
    description:
      "After understanding your needs, we build a clear strategy and roadmap. This step defines the structure, features, and direction of the project to ensure everything is focused and efficient.",
  },
  {
    title: "Design & Create",
    description:
      "Our team transforms ideas into visually engaging and user-friendly designs. We focus on creativity, usability, and modern aesthetics to craft experiences that connect with your audience.",
  },
  {
    title: "Build & Launch",
    description:
      "We develop the final product with precision and care. Once everything is tested and refined, we launch the project and ensure it performs smoothly for your users.",
  },
];

function PhoneMockup({
  step,
  index,
}: {
  step: (typeof processSteps)[0];
  index: number;
}) {
  return (
    <div
      className="phone-mockup relative w-64 sm:w-72 md:w-80"
      style={{ transform: `rotate(${-15 + index * 8}deg)` }}
    >
      {/* Phone frame */}
      <div className="bg-black rounded-[2.5rem] p-3 shadow-2xl">
        {/* Screen */}
        <div className="bg-white rounded-[2rem] p-6 min-h-[360px] flex flex-col">
          {/* Notch */}
          <div className="w-20 h-6 bg-black rounded-full mx-auto mb-6" />
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-lime mb-4">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phones = phonesRef.current?.querySelectorAll(".phone-mockup");
    if (!phones) return;

    const ctx = gsap.context(() => {
      // Parallax effect for phones
      phones.forEach((phone, index) => {
        gsap.fromTo(
          phone,
          {
            y: 100 + index * 50,
            opacity: 0,
            rotation: -30 + index * 5,
          },
          {
            y: 0,
            opacity: 1,
            rotation: -15 + index * 8,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
            delay: index * 0.15,
          }
        );
      });

      // Parallax scroll effect
      phones.forEach((phone, index) => {
        gsap.to(phone, {
          y: (index % 2 === 0 ? -1 : 1) * 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            How We Bring Ideas
            <br />
            to Life Turning Vision
            <br />
            Into <span className="text-lime">Digital Reality</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-xl">
            At Digital Addis, every project begins with understanding your vision
          </p>
        </ScrollReveal>

        {/* Phone mockups */}
        <div ref={phonesRef} className="relative">
          {/* Diagonal text bands */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-0 w-[200%] bg-lime py-2 -rotate-12 -translate-x-1/4">
              <span className="text-black font-medium whitespace-nowrap">
                From the first conversation to the final launch From the first
                conversation to the final launch{" "}
              </span>
            </div>
            <div className="absolute top-1/2 left-0 w-[200%] bg-black py-2 -rotate-6 -translate-x-1/4">
              <span className="text-white font-medium whitespace-nowrap">
                we carefully design, develop, and refine every detail we carefully
                design, develop, and refine every detail{" "}
              </span>
            </div>
            <div className="absolute top-3/4 left-0 w-[200%] bg-lime py-2 -rotate-12 -translate-x-1/4">
              <span className="text-black font-medium whitespace-nowrap">
                to ensure the result is not only visually engaging to ensure the
                result is not only visually engaging{" "}
              </span>
            </div>
          </div>

          {/* Phones grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center relative z-10 py-20">
            {processSteps.map((step, index) => (
              <PhoneMockup key={index} step={step} index={index} />
            ))}
          </div>

          {/* Connecting arrows */}
          <svg
            className="absolute top-1/2 left-0 w-full h-full pointer-events-none hidden lg:block"
            style={{ transform: "translateY(-50%)" }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#CCFF00" />
              </marker>
            </defs>
            <path
              d="M200 100 Q 300 50, 400 150"
              fill="none"
              stroke="#CCFF00"
              strokeWidth="2"
              strokeDasharray="8 4"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M500 200 Q 600 150, 700 250"
              fill="none"
              stroke="#CCFF00"
              strokeWidth="2"
              strokeDasharray="8 4"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M800 300 Q 900 250, 1000 350"
              fill="none"
              stroke="#CCFF00"
              strokeWidth="2"
              strokeDasharray="8 4"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </div>

        {/* Bottom description */}
        <ScrollReveal className="mt-16 max-w-2xl">
          <p className="text-gray-600 leading-relaxed">
            From the first conversation to the final launch, we carefully design,
            develop, and refine every detail to ensure the result is not only
            visually engaging but also effective and impactful for your audience.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
