'use client';

import { useState, useEffect, useCallback, memo } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

// Memoize navigation links at module level
const navLinks = [
  { name: "Home", link: "/", ariaLabel: "Go to homepage" },
  { name: "About", link: "/about", ariaLabel: "Learn about Digital Addis" },
  { name: "Services", link: "/services", ariaLabel: "View our services" },
  { name: "Projects", link: "/projects", ariaLabel: "Browse our projects" },
  { name: "Blog", link: "/blog", ariaLabel: "Read our blog" },
] as const;

export const Navbar = memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
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
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoized toggle handler
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-4 md:top-6 left-0 right-0 z-[100] transition-all duration-700 pointer-events-none",
          isScrolled ? "py-1 opacity-95 scale-[0.98] md:scale-95" : "opacity-100 translate-y-0"
        )}
        suppressHydrationWarning={true}
      >
        <div className="w-full px-4 md:px-8 flex justify-center pointer-events-auto">
          <div className="flex items-center justify-between gap-4 w-full max-w-7xl border border-foreground/10 rounded-full bg-background/70 backdrop-blur-xl px-2 py-2 shadow-2xl transition-colors duration-500">
            
            {/* Desktop Branding (Left) */}
            <Link href="/" className="hidden lg:flex items-center gap-4 shrink-0 px-4 py-2" aria-label="Digital Addis - Home">
              <div className="relative h-10 w-10">
                <Image src="/dalogo.webp" alt="Digital Addis Logo" fill sizes="40px" className="object-contain brightness-0 dark:invert" priority/>
              </div>
              <span className="text-xs font-bold text-foreground uppercase tracking-widest shrink-0">Digital Addis</span>
            </Link>

            {/* Desktop Navigation Group (Center) */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.link;
                return (
                  <Link
                    key={link.name}
                    href={link.link}
                    prefetch={true}
                    aria-label={link.ariaLabel}
                    className={cn(
                      "relative text-[10px] md:text-xs font-semibold tracking-widest uppercase transition-all duration-500 px-6 py-3 rounded-full flex items-center gap-3",
                      isActive 
                        ? "bg-foreground text-background shadow-lg" 
                        : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Branding (only visible on small screens) */}
            <Link href="/" className="lg:hidden flex items-center gap-3 shrink-0 pl-4 py-2" aria-label="Digital Addis - Home">
              <div className="relative h-10 w-10">
                <Image src="/dalogo.webp" alt="Digital Addis Logo" fill sizes="40px" className="object-contain brightness-0 dark:invert" priority/>
              </div>
              <span className="text-[11px] font-bold text-foreground uppercase tracking-widest shrink-0">Digital Addis</span>
            </Link>

            {/* Right Side Tools */}
            <div className="hidden md:flex items-center gap-2 pr-1">
              <div className="bg-foreground/5 border border-foreground/5 rounded-full px-1 py-1 mr-2">
                 <ThemeToggle />
              </div>
              <Link
                href="/contact"
                prefetch={true}
                className="group flex items-center gap-3 bg-foreground/5 border border-foreground/10 text-foreground/90 px-6 py-3 rounded-full text-[10px] md:text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-500 shadow-lg"
              >
                Let's Talk
                <span className="flex gap-[3px] ml-1">
                  <span className="w-1 h-1 rounded-full bg-current opacity-70 group-hover:opacity-100 transition-opacity"></span>
                  <span className="w-1 h-1 rounded-full bg-current opacity-70 group-hover:opacity-100 transition-opacity"></span>
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 text-foreground"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl transition-all duration-500 lg:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.link}
              onClick={closeMobileMenu}
              aria-label={link.ariaLabel}
              className={cn(
                "text-foreground text-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-lime focus-visible:text-lime",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMobileMenu}
            aria-label="Contact us - Let's talk about your project"
            className={cn(
              "mt-6 bg-lime text-black px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white dark:hover:bg-white focus-visible:bg-white",
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: `${navLinks.length * 75}ms` }}
          >
            Let's Talk
          </Link>
        </div>
      </nav>
    </>
  );
});
