'use client';

import { ScrollReveal } from "@/src/components/ScrollReveal";
import FallingText from "@/components/ui/falling-text";
import { Lightbulb, Target, Rocket, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Turning Ideas Into Reality",
    description: "Inspire people that you make things happen.",
    icon: Lightbulb,
    bgColor: "bg-white dark:bg-black text-black dark:text-white",
    descColor: "text-black/70 dark:text-white/70",
  },
  {
    title: "Creating Impact That Lasts",
    description: "Shows your work has meaning.",
    icon: Target,
    bgColor: "bg-black dark:bg-white text-white dark:text-black",
    descColor: "text-white/70 dark:text-black/70",
  },
  {
    title: "Innovation Without Limits",
    description: "Shows your work has meaning.",
    icon: Rocket,
    bgColor: "bg-lime text-black",
    descColor: "text-black/80",
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
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-8 md:mb-16">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 text-foreground dark:text-white leading-[0.9] uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-moonwalk)' }}
          >
            The Tools Powering Our<br />
            <span className="text-lime">Digital</span>{" "}
            <span className="bg-lime px-4 py-1 md:py-2 rounded-full inline-block text-black mt-2">
              Innovation
            </span>
          </h2>
        </ScrollReveal>

        {/* Feature cards - equal height row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6 items-stretch">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              className={`${feature.bgColor} rounded-2xl md:rounded-3xl p-5 md:p-6 border border-black/5 dark:border-white/5 shadow-sm flex flex-col`}
            >
              <feature.icon className="h-5 w-5 md:h-6 md:w-6 mb-3 md:mb-4 opacity-70 flex-shrink-0" />
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{feature.title}</h3>
              <p className={`text-xs md:text-sm font-medium ${feature.descColor} mt-auto`}>
                {feature.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* CTA Card */}
          <ScrollReveal className="bg-black dark:bg-white text-white dark:text-black rounded-2xl md:rounded-3xl p-8 md:p-12 flex flex-col justify-between">
            <h3 
               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 md:mb-12 leading-[0.9] uppercase tracking-widest"
               style={{ fontFamily: 'var(--font-moonwalk)' }}
            >
              Together,<br />
              We Achieve<br />
              More
            </h3>
            <button className="bg-lime text-black px-8 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center justify-center gap-3 group hover:bg-white dark:hover:bg-black dark:hover:text-white transition-colors w-full sm:w-max mt-auto">
              Let's create together
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>

          {/* Tech Stack Card */}
          <div className="bg-lime rounded-2xl md:rounded-3xl p-6 md:p-8">
            <p 
               className="text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 text-black uppercase tracking-widest leading-none"
               style={{ fontFamily: 'var(--font-moonwalk)' }}
            >
              #tools we use
            </p>
            {/* Desktop: FallingText with physics - wrapped to prevent scroll capture */}
            <div
              className="hidden md:block w-full h-full min-h-[300px] mt-2 relative"
              style={{ touchAction: 'none' }}
              onWheel={(e) => { e.stopPropagation(); window.scrollBy(0, e.deltaY); }}
            >
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
