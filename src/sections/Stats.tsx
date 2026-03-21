import { ScrollReveal } from "@/src/components/ScrollReveal";
import { CountUp } from "@/src/components/CountUp";

const stats = [
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 120, suffix: "+", label: "Completed Projects" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Team Members" },
];

export function Stats() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 text-foreground dark:text-white">
            Our
            <br />
            Impact in <span className="text-lime">Numbers.</span>
          </h2>
          <p className="text-muted-foreground dark:text-white/50 text-sm md:text-base lg:text-lg max-w-2xl">
            A snapshot of the milestones, projects, and partnerships that define
            our journey and commitment to digital excellence.
          </p>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              className="bg-lime rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 md:mb-4">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <span className="bg-background text-foreground px-2.5 sm:px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-medium inline-block shadow-sm">
                {stat.label}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
