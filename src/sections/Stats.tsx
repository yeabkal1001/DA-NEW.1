import { ScrollReveal } from "@/src/components/ScrollReveal";
import { CountUp } from "@/src/components/CountUp";

const stats = [
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 120, suffix: "+", label: "completed projects" },
  { value: 5, suffix: "+", label: "years experience" },
  { value: 10, suffix: "+", label: "members" },
];

export function Stats() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Our
            <br />
            Impact in <span className="text-lime">Numbers.</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            A snapshot of the milestones, projects, and partnerships that define
            our journey and commitment to digital excellence.
          </p>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              className="bg-lime rounded-3xl p-6 sm:p-8"
            >
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <span className="bg-white px-4 py-1.5 rounded-full text-sm font-medium">
                {stat.label}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
