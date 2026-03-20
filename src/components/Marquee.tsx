import { cn } from "@/src/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "flex overflow-hidden",
        pauseOnHover && "marquee-container",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-8",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
