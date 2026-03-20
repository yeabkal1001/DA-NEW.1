'use client';

import { useState, useEffect, useCallback, memo } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Instagram, Twitter } from "lucide-react";

const NavbarContent = memo(function NavbarContent({ isScrolled }: { isScrolled: boolean }) {

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
  ];

  return (
    <NavbarInner isScrolled={isScrolled} navLinks={navLinks} />
  );
});

function NavbarInner({ isScrolled, navLinks }: { isScrolled: boolean; navLinks: Array<{ name: string; href: string }> }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-&lsqb;cubic-bezier(0.16,1,0.3,1)&rsqb; ${
        isScrolled 
          ? "py-4 bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl" 
          : "py-8 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center group cursor-pointer relative z-[110]">
            <img 
              src="/dalogo.webp" 
              alt="Digital Addis" 
              className={`w-auto object-contain transition-all duration-700 ease-out group-hover:scale-105 origin-left ${
                isScrolled ? "h-12" : "h-16"
              }`}
            />
          </a>

          {/* Hamburger Menu & Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-4 group relative z-[110] outline-none">
                <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em] hidden sm:block transition-colors group-hover:text-lime">
                  Menu
                </span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex flex-col items-center justify-center gap-1.5 transition-all duration-500 hover:bg-white/10 hover:border-lime backdrop-blur-md">
                  <div className="w-5 h-[2px] bg-white transition-all duration-300 group-hover:bg-lime group-hover:w-6 group-hover:-translate-y-0.5" />
                  <div className="w-5 h-[2px] bg-white transition-all duration-300 group-hover:bg-lime group-hover:w-4 group-hover:translate-y-0.5" />
                </div>
              </button>
            </SheetTrigger>

            <SheetContent 
              side="right" 
              className="w-full sm:max-w-xl bg-black/95 backdrop-blur-3xl border-l border-white/10 p-0 flex flex-col z-[200]"
            >
              <div className="flex-1 overflow-auto py-32 px-12 md:px-20 flex flex-col justify-center">
                
                {/* Massive Typography Nav Links */}
                <nav className="flex flex-col gap-6 md:gap-8">
                  {navLinks.map((link, i) => (
                    <SheetClose asChild key={link.name}>
                      <a
                        href={link.href}
                        className="group flex items-center text-6xl md:text-7xl font-bold text-white/40 hover:text-white transition-all duration-500 tracking-tighter"
                      >
                        <span className="text-sm font-medium text-lime mr-8 mb-6 md:mb-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                          0{i + 1}
                        </span>
                        <span className="group-hover:translate-x-4 transition-transform duration-500">
                          {link.name}
                        </span>
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                {/* Footer of the Menu */}
                <div className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-12 sm:items-center justify-between">
                  <div>
                    <h4 className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                      Start a Project
                    </h4>
                    <a href="mailto:hello@digitaladdis.com" className="text-xl font-medium text-white hover:text-lime transition-colors">
                      hello@digitaladdis.com
                    </a>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:border-lime hover:bg-lime transition-all">
                      <Instagram size={18} />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-black hover:border-lime hover:bg-lime transition-all">
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>

              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      setIsScrolled(window.scrollY > 50);
      scrollTimeout = setTimeout(() => {}, 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return <NavbarContent isScrolled={isScrolled} />;
}
