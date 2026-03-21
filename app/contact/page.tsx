'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, Building, FileText, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Innovation Drive", "Addis Ababa, Bole"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@digitaladdis.com"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+251 911 123 456"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon-Fri: 9AM - 6PM"],
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-hero-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      description: "",
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[55vh] md:min-h-[60vh] bg-background text-foreground flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-lime/10 rounded-full blur-[120px] md:blur-[180px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.03] hidden md:block" style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-24 md:py-32 pt-32 md:pt-40 text-center">
          <div className="contact-hero-reveal inline-flex items-center p-1 px-3 md:px-4 mb-6 md:mb-8 bg-foreground/5 rounded-full border border-foreground/10">
            <span className="w-2 h-2 bg-lime rounded-full mr-2 md:mr-3 animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60">Contact Us</span>
          </div>
          
          <h1 className="contact-hero-reveal text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[5rem] xl:text-[6rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6 md:mb-8 text-foreground">
            Let's Build
            <br />
            <span className="text-lime italic">Something Great</span>
          </h1>
          
          <p className="contact-hero-reveal text-foreground/50 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-4">
            Ready to transform your digital presence? Get in touch and let's bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-background -mt-12 md:-mt-20 relative z-10 transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {contactInfo.map((info, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-foreground/[0.03] rounded-xl md:rounded-2xl p-4 md:p-6 border border-foreground/5 hover:border-lime/50 transition-all duration-300 h-full">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-lime/10 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4">
                    <info.icon className="w-5 md:w-6 h-5 md:h-6 text-lime" />
                  </div>
                  <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-foreground uppercase tracking-tight">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-xs md:text-sm font-medium">{detail}</p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-background border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
            {/* Left Side - Info */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="lg:sticky lg:top-32">
                  <div className="inline-flex items-center p-1 px-3 md:px-4 mb-4 md:mb-6 bg-foreground/5 rounded-full border border-foreground/10">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-muted-foreground">Get In Touch</span>
                  </div>
                  <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6 text-foreground">
                    Send Us A
                    <br />
                    <span className="text-lime italic">Message</span>
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-medium">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                  
                  <div className="bg-lime rounded-xl md:rounded-2xl p-5 md:p-8 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <p className="font-black text-sm md:text-base mb-2 md:mb-3 uppercase tracking-tight">Prefer a quick chat?</p>
                    <p className="text-black/70 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                      Schedule a free 30-minute consultation call with our team.
                    </p>
                    <button className="w-full bg-black text-white py-3 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-black/80 transition-all">
                      Book a Call
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.2}>
                <form onSubmit={handleSubmit} className="bg-foreground/5 p-5 md:p-8 lg:p-12 xl:p-16 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] border border-foreground/10">
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="relative group">
                      <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-foreground/40 group-focus-within:text-lime transition-colors" />
                      <Input
                        placeholder="Full Name"
                        required
                        className="pl-10 md:pl-12 py-5 md:py-6 text-sm md:text-base rounded-lg md:rounded-xl bg-background border border-foreground/10 text-foreground focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-foreground/40 group-focus-within:text-lime transition-colors" />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="pl-10 md:pl-12 py-5 md:py-6 text-sm md:text-base rounded-lg md:rounded-xl bg-background border border-foreground/10 text-foreground focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    <div className="relative group">
                      <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-foreground/40 group-focus-within:text-lime transition-colors" />
                      <Input
                        placeholder="Phone Number"
                        className="pl-10 md:pl-12 py-5 md:py-6 text-sm md:text-base rounded-lg md:rounded-xl bg-background border border-foreground/10 text-foreground focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="relative group">
                      <Building className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-foreground/40 group-focus-within:text-lime transition-colors" />
                      <Input
                        placeholder="Company Name"
                        className="pl-10 md:pl-12 py-5 md:py-6 text-sm md:text-base rounded-lg md:rounded-xl bg-background border border-foreground/10 text-foreground focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="py-5 md:py-6 px-3 md:px-4 text-sm md:text-base rounded-lg md:rounded-xl bg-background border border-foreground/10 text-foreground">
                        <SelectValue placeholder="Select a Service" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border bg-popover text-popover-foreground shadow-2xl">
                        <SelectItem value="software">Custom Software Development</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity Services</SelectItem>
                        <SelectItem value="cloud">Cloud Services</SelectItem>
                        <SelectItem value="smart">Smart Devices & Infrastructure</SelectItem>
                        <SelectItem value="consulting">Digital Consulting</SelectItem>
                        <SelectItem value="training">Skills Training</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative group mb-6 md:mb-8">
                    <FileText className="absolute left-3 md:left-4 top-5 md:top-6 h-4 md:h-5 w-4 md:w-5 text-foreground/40 group-focus-within:text-lime transition-colors" />
                    <Textarea
                      placeholder="Tell us about your project..."
                      required
                      className="pl-10 md:pl-12 pt-5 md:pt-6 text-sm md:text-base min-h-[140px] md:min-h-[180px] rounded-lg md:rounded-xl bg-background border border-foreground/10 text-foreground focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-lime text-black hover:bg-foreground hover:text-background rounded-full py-6 md:py-7 text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-500 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">●</span>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="h-[250px] md:h-[400px] lg:h-[500px] bg-foreground relative overflow-hidden group">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lime rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-lime rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 md:w-10 h-8 md:h-10 text-black" />
            </div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-background mb-2 md:mb-3 uppercase tracking-tight">Visit Our Office</h3>
            <p className="text-background/70 font-medium text-sm md:text-base mb-1">Addis Ababa, Ethiopia</p>
            <p className="text-background/50 text-xs md:text-sm">Bole Japan, 123 Innovation Drive</p>
            <button className="mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-lime text-black rounded-full font-bold text-xs md:text-sm uppercase tracking-wider hover:scale-105 transition-transform">
              Get Directions
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
