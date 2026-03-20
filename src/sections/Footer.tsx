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
    <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand column */}
          <div>
            <Link href="/">
              <img 
                src="/dalogo.webp" 
                alt="Digital Addis Logo" 
                className="h-14 w-auto mb-6 object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Creating the digital benchmarks for tomorrow's industry leaders.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-lime hover:text-lime transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-lime transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-lime transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Location
            </h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Innovation Drive</p>
              <p>Addis Ababa, Bole Japan</p>
              <p className="pt-2">
                <a
                  href="mailto:hello@digitaladdis.com"
                  className="text-lime hover:underline"
                >
                  hello@digitaladdis.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mb-8">
          © 2026 DIGITAL ADDIS. ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* Large watermark text */}
      <div className="absolute bottom-0 left-0 right-0 text-center pointer-events-none">
        <span className="text-[15vw] font-bold text-gray-800/30 leading-none">
          Digital Addis
        </span>
      </div>
    </footer>
  );
}
