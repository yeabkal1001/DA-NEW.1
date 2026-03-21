'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { 
  ArrowRight, 
  Code2, 
  Palette, 
  Shield, 
  Cloud, 
  Cpu, 
  GraduationCap,
  Globe,
  Layers,
  Lock,
  Server,
  Smartphone,
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const mainServices = [
  {
    icon: Code2,
    title: "Custom Software Development",
    tagline: "Tailored Solutions for Your Unique Needs",
    description: "We build scalable, secure, and high-performance software solutions tailored to your specific business requirements.",
    features: ["Web Applications", "Mobile Apps", "API Development", "System Integration", "Legacy Modernization"],
    color: "bg-lime",
    textColor: "text-black",
  },
  {
    icon: Shield,
    title: "Cybersecurity Services",
    tagline: "Protecting Your Digital Assets",
    description: "Comprehensive security solutions to protect your organization from evolving cyber threats.",
    features: ["Security Audits", "Penetration Testing", "Compliance Management", "Incident Response", "Security Training"],
    color: "bg-black",
    textColor: "text-white",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    tagline: "Scalable Infrastructure for Growth",
    description: "Transform your infrastructure with our cloud solutions for maximum efficiency and cost-effectiveness.",
    features: ["Cloud Migration", "Infrastructure Management", "DevOps Services", "Cost Optimization", "Multi-cloud Strategy"],
    color: "bg-black/5 dark:bg-white/5",
    textColor: "text-foreground dark:text-white",
  },
  {
    icon: Cpu,
    title: "Smart Devices & Infrastructure",
    tagline: "IoT Solutions for the Modern Enterprise",
    description: "Implement intelligent solutions with our IoT and smart infrastructure services.",
    features: ["IoT Implementation", "Smart Building Solutions", "Industrial Automation", "Asset Tracking", "Remote Monitoring"],
    color: "bg-lime",
    textColor: "text-black",
  },
  {
    icon: Palette,
    title: "Digital Consulting",
    tagline: "Strategic Guidance for Digital Success",
    description: "Navigate the digital landscape with confidence through our consulting services.",
    features: ["Digital Strategy", "Process Optimization", "Technology Assessment", "Roadmap Development", "Change Management"],
    color: "bg-black",
    textColor: "text-white",
  },
  {
    icon: GraduationCap,
    title: "Skills Training",
    tagline: "Empowering Your Team",
    description: "Equip your team with the skills they need to succeed in the digital age.",
    features: ["Technical Training", "Certification Programs", "Workshops", "On-site Training", "E-learning Solutions"],
    color: "bg-black/5 dark:bg-white/5",
    textColor: "text-foreground dark:text-white",
  },
];

const additionalServices = [
  { icon: Globe, title: "Web Development", description: "Modern, responsive websites" },
  { icon: Smartphone, title: "Mobile Development", description: "Native and cross-platform apps" },
  { icon: Layers, title: "UI/UX Design", description: "User-centered design" },
  { icon: Server, title: "Database Solutions", description: "Optimized data management" },
  { icon: Lock, title: "Identity Management", description: "Secure access control" },
  { icon: Zap, title: "Performance Optimization", description: "Speed improvements" },
];

const industries = [
  "Banking & Finance",
  "Government",
  "Healthcare",
  "Telecommunications",
  "Manufacturing",
  "Real Estate",
  "Hospitality",
  "Logistics",
  "NGOs",
  "International Organizations",
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-hero-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] md:min-h-[85vh] bg-background text-foreground flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lime/10 rounded-full blur-[100px] md:blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-lime/5 rounded-full blur-[80px] md:blur-[120px]" />
        </div>

        {/* Grid Pattern - Theme Aware */}
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.03] hidden md:block" style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-24 md:py-32 pt-32 md:pt-40">
          <div className="max-w-4xl">
            <div className="services-hero-reveal inline-flex items-center p-1 px-3 md:px-4 mb-6 md:mb-8 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10">
              <span className="w-2 h-2 bg-lime rounded-full mr-2 md:mr-3 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60 dark:text-white/60">Our Services</span>
            </div>
            
            <h1 className="services-hero-reveal text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[5rem] xl:text-[6rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6 md:mb-8 text-foreground dark:text-white">
              Full-Service
              <br />
              <span className="text-lime italic">Digital Solutions</span>
              <br />
              <span className="text-foreground/40 dark:text-white/40">Built for Impact</span>
            </h1>
            
            <p className="services-hero-reveal text-foreground/50 dark:text-white/50 text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl">
              From custom software and cybersecurity to cloud services and digital consulting, we deliver end-to-end solutions that drive real transformation.
            </p>
            
            <div className="services-hero-reveal flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 md:gap-3 bg-lime text-black px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 group"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/projects"
                className="inline-flex items-center justify-center gap-2 md:gap-3 border border-black/20 dark:border-white/20 text-[#212121] dark:text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-500"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Service Icons - Hidden on mobile */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          {[Code2, Shield, Cloud, Cpu].map((Icon, i) => (
            <div key={i} className="services-hero-reveal w-14 h-14 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl flex items-center justify-center hover:bg-lime hover:border-lime transition-all group">
              <Icon className="w-6 h-6 text-[#212121]/40 dark:text-white/40 group-hover:text-black transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center p-1 px-3 md:px-4 mb-4 md:mb-6 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-muted-foreground">What We Offer</span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6 text-foreground">
              Core <span className="text-lime italic">Services</span>
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto px-4">
              Comprehensive digital solutions designed to help your organization grow and thrive.
            </p>
          </ScrollReveal>

          <div className="space-y-4 md:space-y-6">
            {mainServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className={`${service.color} rounded-[1.5rem] md:rounded-[2.5rem] lg:rounded-[3rem] p-6 md:p-12 lg:p-16 xl:p-20 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500`}>
                  <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-center">
                    <div>
                      <div className={`w-12 md:w-16 h-12 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 ${service.color === 'bg-lime' ? 'bg-black' : service.color === 'bg-black' ? 'bg-lime' : 'bg-black'}`}>
                        <service.icon className={`w-6 md:w-8 h-6 md:h-8 ${service.color === 'bg-lime' ? 'text-lime' : service.color === 'bg-black' ? 'text-black' : 'text-white'}`} />
                      </div>
                      <p className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2 ${service.textColor === 'text-white' ? 'text-white/40' : 'text-black/40'}`}>
                        {service.tagline}
                      </p>
                      <h3 className={`text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight mb-3 md:mb-4 ${service.textColor}`}>
                        {service.title}
                      </h3>
                      <p className={`text-base md:text-lg leading-relaxed ${service.textColor === 'text-white' ? 'text-white/60' : 'text-black/60'}`}>
                        {service.description}
                      </p>
                    </div>
                    <div>
                      <div className={`rounded-xl md:rounded-2xl p-4 md:p-6 ${service.color === 'bg-lime' ? 'bg-black/5' : service.color === 'bg-black' ? 'bg-white/5' : 'bg-black/5'}`}>
                        <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 md:mb-4 ${service.textColor === 'text-white' ? 'text-white/40' : 'text-black/40'}`}>
                          Key Capabilities
                        </p>
                        <ul className="space-y-2 md:space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className={`flex items-center gap-2 md:gap-3 ${service.textColor}`}>
                              <CheckCircle2 className={`w-4 md:w-5 h-4 md:h-5 flex-shrink-0 ${service.color === 'bg-black' ? 'text-lime' : 'text-black'}`} />
                              <span className="font-medium text-sm md:text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-black/[0.03] dark:bg-white/[0.03] border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10 md:mb-16">
            <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6 text-foreground">
              Additional <span className="text-lime italic">Capabilities</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {additionalServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="bg-secondary/50 dark:bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-8 h-full border border-black/5 dark:border-white/10 hover:border-lime/50 transition-all duration-300 group">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-lime/10 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-5 group-hover:bg-lime transition-colors">
                    <service.icon className="w-5 md:w-6 h-5 md:h-6 text-black" />
                  </div>
                  <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-base">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-background text-foreground border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center p-1 px-3 md:px-4 mb-4 md:mb-6 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60 dark:text-white/60">Industries We Serve</span>
              </div>
              <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6 text-foreground dark:text-white">
                Expertise Across
                <br />
                <span className="text-lime italic">Multiple Sectors</span>
              </h2>
              <p className="text-foreground/50 dark:text-white/50 text-base md:text-lg leading-relaxed">
                Our experience spans diverse industries, giving us unique insights into the challenges and opportunities each sector faces.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {industries.map((industry, index) => (
                  <span 
                    key={index}
                    className="px-3 md:px-5 py-2 md:py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-xs md:text-sm font-bold hover:bg-lime hover:text-black hover:border-lime transition-all cursor-default text-foreground dark:text-white"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10 md:mb-16">
            <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6 text-foreground">
              Our <span className="text-lime italic">Approach</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { step: "01", title: "Discover", description: "We listen and understand your challenges." },
              { step: "02", title: "Plan", description: "We develop a clear strategy and roadmap." },
              { step: "03", title: "Build", description: "We design and develop with precision." },
              { step: "04", title: "Support", description: "We provide ongoing support for success." },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative">
                  <span className="text-[3rem] md:text-[6rem] font-black text-black/5 dark:text-white/5 leading-none">{item.step}</span>
                  <div className="-mt-6 md:-mt-10 relative z-10">
                    <h3 className="text-lg md:text-2xl font-black uppercase mb-2 md:mb-3 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-xs md:text-base">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-lime dark:bg-black/40 border-t border-black/5 dark:border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6 text-black dark:text-white">
              Ready to Transform
              <br />
              Your <span className="italic">Digital Presence?</span>
            </h2>
            <p className="text-black/60 dark:text-white/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
              Let's discuss how our services can help your organization achieve its goals.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 md:gap-3 bg-black text-white dark:bg-white dark:text-black px-8 md:px-10 py-4 md:py-5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-lime hover:text-black transition-all duration-500 group"
            >
              Get Started Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
