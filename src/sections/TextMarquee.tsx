import { Marquee } from "@/src/components/Marquee";

export function TextMarquee() {
  const text = "Transform your ideas into digital experiences";

  return (
    <section className="bg-black py-6 overflow-hidden -rotate-1 scale-105">
      <Marquee reverse className="py-2">
        {[...Array(6)].map((_, index) => (
          <span
            key={index}
            className="text-white text-xl sm:text-2xl md:text-3xl font-medium whitespace-nowrap px-8"
          >
            {text}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
