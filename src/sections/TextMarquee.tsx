import { Marquee } from "@/src/components/Marquee";

export function TextMarquee() {
  const text = "Transform your ideas into digital experiences";

  return (
    <section className="bg-lime text-black py-4 md:py-8 overflow-hidden -rotate-2 scale-105 shadow-2xl z-20 relative">
      <Marquee reverse className="py-2">
        {[...Array(6)].map((_, index) => (
          <span
            key={index}
            className="text-5xl sm:text-6xl md:text-[5rem] lg:text-[6rem] uppercase whitespace-nowrap px-12 leading-none"
            style={{ fontFamily: 'var(--font-moonwalk)', letterSpacing: '0.05em' }}
          >
            {text}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
