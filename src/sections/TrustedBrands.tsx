import { ScrollReveal } from "@/src/components/ScrollReveal";
import { Marquee } from "@/src/components/Marquee";
import { Apple, Mail, Send, MessageCircle } from "lucide-react";

// Custom Nike-like icon
function NikeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 35" fill="currentColor" className={className}>
      <path d="M0 0h100v35H0z" fill="none" />
      <path d="M15 25c5-2 15-6 25-8 10-2 20-2 30 0 5 1 10 3 15 5-5-2-10-4-15-5-10-2-20-2-30 0-10 2-20 6-25 8z" />
    </svg>
  );
}

const logos = [
  { icon: Apple, label: "Apple" },
  { icon: Mail, label: "Mail" },
  { icon: Send, label: "Telegram" },
  { icon: NikeIcon, label: "Nike", isCustom: true },
  { icon: MessageCircle, label: "WhatsApp" },
];

export function TrustedBrands() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground">
            <span className="text-lime">Trusted</span> by Leading
            <br />
            Brands
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're proud to collaborate with companies that believe in innovation,
            creativity, and digital excellence.
          </p>
        </ScrollReveal>
      </div>

      {/* Logo marquee */}
      <div className="bg-lime py-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <Marquee pauseOnHover>
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-20 px-10">
              {logos.map((logo, index) => {
                const IconComponent = logo.icon;
                return (
                  <div
                    key={`${setIndex}-${index}`}
                    className="flex items-center text-black"
                  >
                    {logo.isCustom ? (
                      <NikeIcon className="h-10 w-28" />
                    ) : (
                      <IconComponent className="h-12 w-12" strokeWidth={1.5} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
