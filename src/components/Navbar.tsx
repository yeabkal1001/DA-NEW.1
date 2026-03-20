'use client';

import { useState, useEffect } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Projects", link: "#work" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6",
          isScrolled ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"
        )}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
          <div className="flex items-center justify-between">
            {/* Large Logo */}
            <Link href="/" className="group cursor-pointer relative z-[110] flex items-center gap-3">
              <img 
                src="/dalogo.webp" 
                alt="Digital Addis" 
                className="h-12 w-auto object-contain transition-transform duration-500"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-[0.18em] leading-none">
                  Digital
                </span>
                <span className="text-[10px] font-medium text-lime uppercase tracking-[0.18em] leading-none">
                  Addis
                </span>
              </div>
            </Link>

            {/* Empty center for space (floating nav will appear on scroll) */}
            <div className="hidden lg:flex flex-1 justify-center">
              <nav className="flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.link}
                    className="relative group text-white/70 text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-lime"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="bg-lime text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-lime/90 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:scale-105 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Navbar that appears on scroll */}
      <FloatingNav navItems={navLinks} className={cn(
        "transition-opacity duration-300",
        !isScrolled && "opacity-0 pointer-events-none"
      )} />
    </>
  );
}

