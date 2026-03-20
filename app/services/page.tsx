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

gsap.registerPlugin(ScrollTrigger);

const mainServices = [
  {
    icon: Code2,
    title: "Custom Software Development",
    tagline: "Tailored Solutions for Your Unique Needs",
    description: "We build scalable, secure, and high-performance software solutions tailored to your specific business requirements. From enterprise applications to mobile apps, our development team delivers excellence.",
    features: ["Web Applications", "Mobile Apps", "API Development", "System Integration", "Legacy Modernization"],
    color: "bg-lime",
    textColor: "text-black",
  },
  {
    icon: Shield,
    title: "Cybersecurity Services",
    tagline: "Protecting Your Digital Assets",
    description: "Comprehensive security solutions to protect your organization from evolving cyber threats. We provide end-to-end security assessments, implementation, and ongoing monitoring.",
    features: ["Security Audits", "Penetration Testing", "Compliance Management", "Incident Response", "Security Training"],
    color: "bg-black",
    textColor: "text-white",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    tagline: "Scalable Infrastructure for Growth",
    description: "Transform your infrastructure with our cloud solutions. We help you migrate, optimize, and manage cloud environments for maximum efficiency and cost-effectiveness.",
    features: ["Cloud Migration", "Infrastructure Management", "DevOps Services", "Cost Optimization", "Multi-cloud Strategy"],
    color: "bg-gray-100",
    textColor: "text-black",
  },
  {
    icon: Cpu,
    title: "Smart Devices & Infrastructure",
    tagline: "IoT Solutions for the Modern Enterprise",
    description: "Implement intelligent solutions with our IoT and smart infrastructure services. From sensor networks to automated systems, we bring innovation to your operations.",
    features: ["IoT Implementation", "Smart Building Solutions", "Industrial Automation", "Asset Tracking", "Remote Monitoring"],
    color: "bg-lime",
    textColor: "text-black",
  },
  {
    icon: Palette,
    title: "Digital Consulting",
    tagline: "Strategic Guidance for Digital Success",
    description: "Navigate the digital landscape with confidence. Our consultants help you develop strategies, optimize processes, and make informed technology decisions.",
    features: ["Digital Strategy", "Process Optimization", "Technology Assessment", "Roadmap Development", "Change Management"],
    color: "bg-black",
    textColor: "text-white",
  },
  {
    icon: GraduationCap,
    title: "Skills Training",
    tagline: "Empowering Your Team",
    description: "Equip your team with the skills they need to succeed. We offer comprehensive training programs covering the latest technologies and best practices.",
    features: ["Technical Training", "Certification Programs", "Workshops", "On-site Training", "E-learning Solutions"],
    color: "bg-gray-100",
    textColor: "text-black",
  },
];

const additionalServices = [
  { icon: Globe, title: "Web Development", description: "Modern, responsive websites and web applications" },
  { icon: Smartphone, title: "Mobile Development", description: "Native and cross-platform mobile solutions" },
  { icon: Layers, title: "UI/UX Design", description: "User-centered design that drives engagement" },
  { icon: Server, title: "Database Solutions", description: "Optimized data management and analytics" },
  { icon: Lock, title: "Identity Management", description: "Secure authentication and access control" },
  { icon: Zap, title: "Performance Optimization", description: "Speed and efficiency improvements" },
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
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] bg-black text-white flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-lime/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lime/5 rounded-full blur-[120px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 pt-40">
          <div className="max-w-4xl">
            <div className="services-hero-reveal inline-flex items-center p-1 px-4 mb-8 bg-white/5 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-lime rounded-full mr-3 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Our Services</span>
            </div>
            
            <h1 className="services-hero-reveal text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-8">
              Full-Service
              <br />
              <span className="text-lime italic">Digital Solutions</span>
              <br />
              <span className="text-white/40">Built for Impact</span>
            </h1>
            
            <p className="services-hero-reveal text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              From custom software and cybersecurity to cloud services and digital consulting, we deliver end-to-end solutions that drive real transformation for organizations of all sizes.
            </p>
            
            <div className="services-hero-reveal flex flex-wrap gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 bg-lime text-black px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 group"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/projects"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-500"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Service Icons */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          {[Code2, Shield, Cloud, Cpu].map((Icon, i) => (
            <div key={i} className="services-hero-reveal w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-lime hover:border-lime transition-all group">
              <Icon className="w-6 h-6 text-white/40 group-hover:text-black transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-20">
            <div className="inline-flex items-center p-1 px-4 mb-6 bg-black/5 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">What We Offer</span>
            </div>
            <h2 className="text-[2.5rem] md:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
              Core <span className="text-lime italic">Services</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Comprehensive digital solutions designed to help your organization grow, adapt, and thrive in the digital age.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {mainServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className={`${service.color} rounded-[2.5rem] p-8 md:p-12 lg:p-16 group hover:shadow-2xl transition-all duration-500`}>
                  <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${service.color === 'bg-lime' ? 'bg-black' : service.color === 'bg-black' ? 'bg-lime' : 'bg-black'}`}>
                        <service.icon className={`w-8 h-8 ${service.color === 'bg-lime' ? 'text-lime' : service.color === 'bg-black' ? 'text-black' : 'text-white'}`} />
                      </div>
                      <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${service.textColor === 'text-white' ? 'text-white/40' : 'text-black/40'}`}>
                        {service.tagline}
                      </p>
                      <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 ${service.textColor}`}>
                        {service.title}
                      </h3>
                      <p className={`text-lg leading-relaxed ${service.textColor === 'text-white' ? 'text-white/60' : 'text-black/60'}`}>
                        {service.description}
                      </p>
                    </div>
                    <div>
                      <div className={`rounded-2xl p-6 ${service.color === 'bg-lime' ? 'bg-black/5' : service.color === 'bg-black' ? 'bg-white/5' : 'bg-black/5'}`}>
                        <p className={`text-xs font-black uppercase tracking-widest mb-4 ${service.textColor === 'text-white' ? 'text-white/40' : 'text-black/40'}`}>
                          Key Capabilities
                        </p>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className={`flex items-center gap-3 ${service.textColor}`}>
                              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${service.color === 'bg-black' ? 'text-lime' : 'text-black'}`} />
                              <span className="font-medium">{feature}</span>
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
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
              Additional <span className="text-lime italic">Capabilities</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="bg-white rounded-2xl p-8 h-full border border-black/5 hover:border-lime/50 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-lime/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-lime transition-colors">
                    <service.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-500">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center p-1 px-4 mb-6 bg-white/5 rounded-full border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Industries We Serve</span>
              </div>
              <h2 className="text-[2.5rem] md:text-[3.5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
                Expertise Across
                <br />
                <span className="text-lime italic">Multiple Sectors</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Our experience spans diverse industries, giving us unique insights into the challenges and opportunities each sector faces in the digital landscape.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                {industries.map((industry, index) => (
                  <span 
                    key={index}
                    className="px-5 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold hover:bg-lime hover:text-black hover:border-lime transition-all cursor-default"
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
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
              Our <span className="text-lime italic">Approach</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discover", description: "We listen, research, and understand your unique challenges and goals." },
              { step: "02", title: "Plan", description: "We develop a clear strategy and roadmap tailored to your needs." },
              { step: "03", title: "Build", description: "Our team designs and develops solutions with precision and care." },
              { step: "04", title: "Support", description: "We provide ongoing support to ensure long-term success." },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative">
                  <span className="text-[6rem] font-black text-black/5 leading-none">{item.step}</span>
                  <div className="-mt-10 relative z-10">
                    <h3 className="text-2xl font-black uppercase mb-3">{item.title}</h3>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-lime">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[2.5rem] md:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
              Ready to Transform
              <br />
              Your <span className="italic">Digital Presence?</span>
            </h2>
            <p className="text-black/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Let's discuss how our services can help your organization achieve its goals and stay ahead in the digital age.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-500 group"
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
