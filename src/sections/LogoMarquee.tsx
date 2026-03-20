import { Marquee } from "@/src/components/Marquee";
import { Apple, Mail, Send, MessageCircle } from "lucide-react";

// Custom Nike-like icon
function NikeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 35"
      fill="currentColor"
      className={className}
    >
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

export function LogoMarquee() {
  return (
    <section className="bg-lime py-6 overflow-hidden">
      <Marquee className="py-2" pauseOnHover>
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center gap-16 px-8">
            {logos.map((logo, index) => {
              const IconComponent = logo.icon;
              return (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex items-center gap-2 text-black"
                >
                  {logo.isCustom ? (
                    <NikeIcon className="h-8 w-20" />
                  ) : (
                    <IconComponent className="h-10 w-10" strokeWidth={1.5} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
