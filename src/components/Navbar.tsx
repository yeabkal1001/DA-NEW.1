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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? "py-3.5 bg-black/70 backdrop-blur-xl border-b border-white/15 shadow-lg" 
          : "py-6 bg-black/40 backdrop-blur-sm border-b border-white/8"
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
        <div className="flex items-center justify-between">
          
          {/* Logo - Premium Styling */}
          <a href="#" className="group cursor-pointer relative z-[110] flex items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/dalogo.webp" 
                alt="Digital Addis" 
                className={`w-auto object-contain transition-all duration-500 origin-left ${
                  isScrolled ? "h-10" : "h-12"
                }`}
              />
              <div className={`hidden sm:flex flex-col transition-all duration-500 ${isScrolled ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-[0.18em] leading-none">
                  Digital
                </span>
                <span className="text-[10px] font-medium text-lime uppercase tracking-[0.18em] leading-none">
                  Addis
                </span>
              </div>
            </div>
            {/* Subtle bottom line on logo */}
            <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-lime to-transparent group-hover:w-8 transition-all duration-500"></div>
          </a>

          {/* Navigation & Menu Button */}
          <div className="flex items-center gap-8 md:gap-12">
            
            {/* Desktop Navigation Links - Premium Style */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative group text-white/70 text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-lime"
                >
                  {link.name}
                  {/* Premium underline effect */}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-lime via-lime to-transparent group-hover:w-full transition-all duration-500"></span>
                </a>
              ))}
            </nav>

            {/* Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-3 group relative z-[110] outline-none">
                  <span className="text-white/70 text-[10px] font-medium uppercase tracking-[0.15em] transition-colors group-hover:text-lime hidden sm:block">
                    Menu
                  </span>
                  {/* Premium Hamburger Icon */}
                  <div className="w-10 h-10 rounded-sm border border-white/25 flex flex-col items-center justify-center gap-1.5 transition-all duration-500 hover:border-lime hover:bg-white/5">
                    <div className="w-4 h-px bg-white/80 transition-all duration-300 group-hover:bg-lime group-hover:w-5" />
                    <div className="w-4 h-px bg-white/80 transition-all duration-300 group-hover:bg-lime" />
                    <div className="w-4 h-px bg-white/80 transition-all duration-300 group-hover:bg-lime group-hover:w-5" />
                  </div>
                </button>
              </SheetTrigger>

              {/* Premium Menu Panel */}
              <SheetContent 
                side="right" 
                className="w-full sm:max-w-2xl bg-black/98 backdrop-blur-2xl border-l border-white/10 p-0 flex flex-col z-[200]"
              >
                <div className="flex-1 overflow-auto py-32 px-8 sm:px-16 lg:px-24 flex flex-col justify-center">
                  
                  {/* Premium Header */}
                  <div className="mb-16 pb-12 border-b border-white/10">
                    <p className="text-white/50 text-xs font-medium uppercase tracking-[0.2em] mb-2">
                      Navigation Menu
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                      Explore Our Work
                    </h2>
                  </div>

                  {/* Premium Navigation Links */}
                  <nav className="flex flex-col gap-8 sm:gap-10">
                    {navLinks.map((link, i) => (
                      <SheetClose asChild key={link.name}>
                        <a
                          href={link.href}
                          className="group flex items-start gap-6 text-white/80 hover:text-lime transition-colors duration-300"
                        >
                          {/* Premium Index Number */}
                          <span className="text-xs font-medium text-white/40 group-hover:text-lime uppercase tracking-[0.2em] mt-1 transition-colors duration-300">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          
                          {/* Link Text with underline effect */}
                          <div className="flex-1 relative">
                            <span className="text-2xl sm:text-3xl font-light tracking-wide group-hover:translate-x-2 transition-transform duration-300 block">
                              {link.name}
                            </span>
                            <span className="block h-px w-0 bg-gradient-to-r from-lime to-transparent mt-3 group-hover:w-full transition-all duration-500"></span>
                          </div>
                        </a>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Premium Divider */}
                  <div className="my-16 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>

                  {/* Footer Section */}
                  <div className="space-y-10">
                    {/* Contact Info */}
                    <div>
                      <p className="text-white/50 text-xs font-medium uppercase tracking-[0.2em] mb-4">
                        Start Your Project
                      </p>
                      <a 
                        href="mailto:hello@digitaladdis.com" 
                        className="text-lg sm:text-xl text-white font-light hover:text-lime transition-colors duration-300"
                      >
                        hello@digitaladdis.com
                      </a>
                      <p className="text-white/40 text-xs mt-2 font-light">
                        Let's bring your vision to life
                      </p>
                    </div>

                    {/* Social Links - Premium Style */}
                    <div>
                      <p className="text-white/50 text-xs font-medium uppercase tracking-[0.2em] mb-4">
                        Connect With Us
                      </p>
                      <div className="flex gap-4">
                        <a 
                          href="#" 
                          className="w-11 h-11 rounded-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:border-lime hover:bg-lime transition-all duration-300 group"
                        >
                          <Instagram size={16} className="group-hover:scale-110 transition-transform duration-300" />
                        </a>
                        <a 
                          href="#" 
                          className="w-11 h-11 rounded-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:border-lime hover:bg-lime transition-all duration-300 group"
                        >
                          <Twitter size={16} className="group-hover:scale-110 transition-transform duration-300" />
                        </a>
                      </div>
                    </div>

                    {/* Premium Footer Text */}
                    <div className="pt-8 border-t border-white/10">
                      <p className="text-white/30 text-xs font-light leading-relaxed">
                        © 2024 Digital Addis. A creative studio crafting digital excellence with precision and purpose.
                      </p>
                    </div>
                  </div>

                </div>
              </SheetContent>
            </Sheet>
          </div>

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

/* Optional: Add optional CSS animation for extra polish */
const navbarStyles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .navbar-slide {
    animation: slideDown 0.5s ease-out;
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = navbarStyles;
  document.head.appendChild(style);
}
