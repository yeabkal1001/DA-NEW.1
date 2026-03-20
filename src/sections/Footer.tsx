import { Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Custom Software", href: "/services" },
  { label: "Cybersecurity", href: "/services" },
  { label: "Cloud Services", href: "/services" },
  { label: "Digital Consulting", href: "/services" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white py-10 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-16">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <img
                src="/dalogo.webp"
                alt="Digital Addis Logo"
                className="h-10 md:h-14 w-auto mb-4 md:mb-6 object-contain"
              />
            </Link>
            <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 max-w-[280px]">
              Creating the digital benchmarks for tomorrow's industry leaders.
            </p>
            <div className="flex gap-3 md:gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-lime hover:text-lime transition-colors"
                >
                  <social.icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-lime transition-colors text-xs md:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">
              Services
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {services.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-lime transition-colors text-xs md:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location column */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 md:mb-4">
              Location
            </h4>
            <address className="not-italic text-gray-400 space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <p>Addis Ababa, Ethiopia</p>
              <p>Bole, Behind Friendship Mall</p>
              <p className="pt-1 md:pt-2">
                <a
                  href="mailto:support@digital-addis.com"
                  className="text-lime hover:underline break-all"
                >
                  support@digital-addis.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-[10px] md:text-sm mb-6 md:mb-8">
          © 2026 DIGITAL ADDIS. ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* Large watermark text */}
      <div className="absolute bottom-0 left-0 right-0 text-center pointer-events-none overflow-hidden">
        <span className="text-[12vw] md:text-[15vw] font-bold text-gray-800/30 leading-none whitespace-nowrap">
          Digital Addis
        </span>
      </div>
    </footer>
  );
}
