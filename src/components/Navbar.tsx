'use client';

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          "fixed top-4 md:top-8 left-0 right-0 z-[100] transition-all duration-700",
          isScrolled ? "opacity-0 -translate-y-20 pointer-events-none" : "opacity-100 translate-y-0"
        )}
      >
        <div className="w-full px-4 md:px-6 flex justify-center">
          <div className="flex items-center justify-between gap-4 md:gap-12 border border-white/10 rounded-full bg-black/40 backdrop-blur-xl px-4 md:px-4 py-2 md:py-3 md:pl-8 shadow-2xl max-w-7xl w-full">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center gap-2 md:gap-4 shrink-0">
              <div className="relative">
                <img 
                  src="/dalogo.webp" 
                  alt="Digital Addis" 
                  className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:flex flex-col border-l border-white/10 pl-3 md:pl-4 py-0.5">
                <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.3em] leading-tight">
                  Digital
                </span>
                <span className="text-[8px] md:text-[10px] font-black text-lime uppercase tracking-[0.3em] leading-tight">
                  Addis
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
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

            {/* Desktop Contact Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="bg-lime text-black px-6 lg:px-8 py-2.5 lg:py-3 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-xl shadow-lime/10"
              >
                Let's Talk
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[99] bg-black/95 backdrop-blur-xl transition-all duration-500 lg:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-white text-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-lime",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "mt-6 bg-lime text-black px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em] transition-all duration-300",
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: `${navLinks.length * 75}ms` }}
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </>
  );
}
