'use client';

import { ScrollReveal } from "@/src/components/ScrollReveal";
import FallingText from "@/components/ui/falling-text";
import { Lightbulb, Target, Rocket, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Turning Ideas Into Reality",
    description: "Inspire people that you make things happen.",
    icon: Lightbulb,
    bgColor: "bg-gray-200",
  },
  {
    title: "Creating Impact That Lasts",
    description: "Shows your work has meaning.",
    icon: Target,
    bgColor: "bg-black text-white",
  },
  {
    title: "Innovation Without Limits",
    description: "Shows your work has meaning.",
    icon: Rocket,
    bgColor: "bg-lime",
  },
];

const techStack = [
  "Docker",
  "Python",
  "HTML5",
  "PostgreSQL",
  "Tailwind CSS",
  "Bootstrap",
  "Expo",
  "React Native",
  "TypeScript",
  "JavaScript",
  "Figma",
  "React",
  "Node.js",
  "Next.js",
  "NestJS",
  "CSS3",
  "Prisma",
  "GraphQL",
];

export function Tools() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            The Tools Powering Our
            <br />
            <span className="text-lime">Digital</span>{" "}
            <span className="bg-lime px-3 md:px-4 py-0.5 md:py-1 rounded-full inline-block text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
              Innovation
            </span>
          </h2>
        </ScrollReveal>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              className={`${feature.bgColor} rounded-2xl md:rounded-3xl p-5 md:p-6`}
            >
              <feature.icon className="h-5 w-5 md:h-6 md:w-6 mb-3 md:mb-4 opacity-70" />
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{feature.title}</h3>
              <p
                className={`text-xs md:text-sm ${
                  feature.bgColor.includes("black")
                    ? "text-white/70"
                    : "text-black/70"
                }`}
              >
                {feature.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* CTA Card */}
          <ScrollReveal className="bg-black text-white rounded-2xl md:rounded-3xl p-6 md:p-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Together,
              <br />
              We Achieve
              <br />
              More
            </h3>
            <button className="bg-lime text-black px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold flex items-center gap-2 group hover:scale-105 transition-transform text-sm md:text-base">
              Let's create together
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>

          {/* Tech Stack Card */}
          <div className="bg-lime rounded-2xl md:rounded-3xl p-5 md:p-6">
            <p className="text-xs md:text-sm font-medium mb-3 md:mb-4 text-black/70">
              #tools we use
            </p>
            {/* Desktop: FallingText with physics */}
            <div className="hidden md:block w-full h-full min-h-[300px] mt-2 relative">
              <FallingText 
                text={techStack} 
                highlightWords={["Next.js", "React", "Tailwind CSS", "TypeScript"]} 
                trigger="hover" 
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.8}
                mouseConstraintStiffness={0.2}
              />
            </div>
            {/* Mobile: Simple tag grid */}
            <div className="md:hidden flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <span 
                  key={i} 
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    ["Next.js", "React", "Tailwind CSS", "TypeScript"].includes(tech)
                      ? "bg-black text-lime"
                      : "bg-black/10 text-black"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
