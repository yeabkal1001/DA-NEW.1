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
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Projects", link: "/projects" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-8 left-0 right-0 z-[100] transition-all duration-700",
          isScrolled ? "opacity-0 -translate-y-20 pointer-events-none" : "opacity-100 translate-y-0"
        )}
      >
        <div className="w-full px-6 flex justify-center">
          <div className="flex items-center justify-between gap-12 border border-white/10 rounded-full bg-black/40 backdrop-blur-xl px-4 py-3 pl-8 shadow-2xl max-w-7xl w-full">
            {/* Proportional Brand Logo */}
            <Link href="/" className="group flex items-center gap-4 shrink-0">
              <div className="relative">
                <img 
                  src="/dalogo.webp" 
                  alt="Digital Addis" 
                  className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col border-l border-white/10 pl-4 py-0.5">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] leading-tight">
                  Digital
                </span>
                <span className="text-[10px] font-black text-lime uppercase tracking-[0.3em] leading-tight">
                  Addis
                </span>
              </div>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.link}
                  className="relative text-white/40 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Standardized Contact Button */}
            <div className="flex items-center">
              <Link
                href="/contact"
                className="bg-lime text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-xl shadow-lime/10"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

