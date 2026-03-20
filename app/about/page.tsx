'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { Lightbulb, Award, Shield, Users, Target, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We push boundaries to deliver modern, future-focused solutions.",
    color: "bg-lime",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We commit to quality, reliability and high-impact results.",
    color: "bg-black",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with transparency, trust and responsibility in everything we do.",
    color: "bg-lime",
  },
];

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "100+", label: "Clients Served" },
  { number: "120+", label: "Projects Delivered" },
  { number: "15+", label: "Team Members" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-hero-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] md:min-h-[90vh] bg-black text-white flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 md:left-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lime blur-[100px] md:blur-[120px]" />
          <div className="absolute bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-white blur-[100px] md:blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-24 md:py-32 pt-32 md:pt-40">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="about-hero-reveal inline-flex items-center p-1 px-3 md:px-4 mb-6 md:mb-8 bg-white/5 rounded-full border border-white/10">
                <span className="w-2 h-2 bg-lime rounded-full mr-2 md:mr-3 animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/60">About Us</span>
              </div>
              
              <h1 className="about-hero-reveal text-[2.5rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6 md:mb-8">
                About
                <br />
                <span className="text-lime italic">DigitalAddis</span>
              </h1>
              
              <p className="about-hero-reveal text-white/50 text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 max-w-xl">
                A full-service digital agency delivering innovative solutions that drive real transformation.
              </p>
              
              <Link 
                href="/services"
                className="about-hero-reveal inline-flex items-center gap-2 md:gap-3 bg-lime text-black px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-white transition-all duration-500 group"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Stats Grid */}
            <div className="about-hero-reveal grid grid-cols-2 gap-3 md:gap-5 lg:gap-6 mt-8 lg:mt-0">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl hover:scale-[1.02] transition-transform duration-300 ${index === 0 ? 'bg-lime text-black' : 'bg-white/5 border border-white/10'}`}
                >
                  <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-1 md:mb-2 ${index === 0 ? 'text-black' : 'text-lime'}`}>
                    {stat.number}
                  </div>
                  <div className={`text-xs md:text-sm font-bold uppercase tracking-wider ${index === 0 ? 'text-black/60' : 'text-white/40'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-32">
                <div className="inline-flex items-center p-1 px-3 md:px-4 mb-4 md:mb-6 bg-black/5 rounded-full">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Our Story</span>
                </div>
                <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6">
                  Technology That
                  <br />
                  <span className="text-lime">Makes Work</span>
                  <br />
                  Meaningful
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="space-y-4 md:space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
                <p>
                  Digital Addis (DA) was built with a simple idea in mind: technology should make people's work easier, safer and more meaningful. For over a decade, we have been working closely with banks, government institutions, international organizations, NGOs, healthcare providers, telecom operators, manufacturers, real estate developers, hotels and logistics companies to help them solve real, everyday challenges using technology.
                </p>
                <p>
                  Our experience across many industries has shown us that successful digital solutions are not just about advanced systems - they are about understanding people, processes and local realities. As a registered Limited Liability Company in both Ethiopia and the United States, and an officially listed Dun & Bradstreet partner, we operate with trust, transparency and a long-term commitment to every organization we serve.
                </p>
                <p className="hidden md:block">
                  At DA, we believe the best solutions come from strong relationships and open conversations. We take the time to listen, ask the right questions, and truly understand our clients' goals before we start building. Our work ranges from custom software development and cybersecurity to cloud services, smart devices and infrastructure, digital consulting and skills training - but at the core of everything we do is people.
                </p>
                <p className="hidden md:block">
                  We design systems that are secure, scalable and easy to use - and we make sure the teams behind them feel confident and supported long after deployment. Guided by innovation, excellence, and integrity, we focus on long-term partnerships rather than one-time projects.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission */}
            <ScrollReveal>
              <div className="bg-black rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-14 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-lime/10 rounded-full blur-[60px] md:blur-[80px] group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-lime rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                    <Target className="w-6 md:w-8 h-6 md:h-8 text-black" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-4 md:mb-6">
                    Our Mission
                  </h3>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed">
                    At Digital Addis, our mission is to deliver secure, innovative, and future-ready digital solutions that drive real transformation. We combine global standards with local expertise to empower organizations of all sizes.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal delay={0.2}>
              <div className="bg-lime rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-14 h-full relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-black/5 rounded-full blur-[60px] md:blur-[80px] group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-black rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                    <Eye className="w-6 md:w-8 h-6 md:h-8 text-lime" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-black uppercase tracking-tight mb-4 md:mb-6">
                    Our Vision
                  </h3>
                  <p className="text-black/60 text-base md:text-lg leading-relaxed">
                    We envision becoming Ethiopia's leading IT company and one of Africa's most trusted providers of cybersecurity, smart infrastructure and digital innovation.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center p-1 px-3 md:px-4 mb-4 md:mb-6 bg-black/5 rounded-full">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Our Values</span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase">
              What <span className="text-lime">Drives</span> Us
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className={`${value.color} rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 lg:p-10 h-full group hover:-translate-y-2 transition-all duration-500`}>
                  <div className={`w-12 md:w-14 h-12 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 ${value.color === 'bg-lime' ? 'bg-black' : 'bg-lime'}`}>
                    <value.icon className={`w-5 md:w-6 h-5 md:h-6 ${value.color === 'bg-lime' ? 'text-lime' : 'text-black'}`} />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight mb-3 md:mb-4 ${value.color === 'bg-lime' ? 'text-black' : 'text-white'}`}>
                    {value.title}
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed ${value.color === 'bg-lime' ? 'text-black/60' : 'text-white/50'}`}>
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-16 md:w-20 h-16 md:h-20 bg-lime rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
              <Users className="w-8 md:w-10 h-8 md:h-10 text-black" />
            </div>
            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6">
              Ready to <span className="text-lime italic">Work Together?</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
              Our purpose is to help organizations grow, adapt and move forward with confidence, while contributing to a stronger, more inclusive and sustainable digital future.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 md:gap-3 bg-lime text-black px-8 md:px-10 py-4 md:py-5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-white transition-all duration-500 group"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
