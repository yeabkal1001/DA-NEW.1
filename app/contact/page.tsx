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
    details: ["123 Innovation Drive", "Addis Ababa, Bole Japan", "Ethiopia"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@digitaladdis.com", "support@digitaladdis.com"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+251 911 123 456", "+251 911 789 012"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Friday", "9:00 AM - 6:00 PM EAT"],
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
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    // Reset form
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
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] bg-black text-white flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime/10 rounded-full blur-[180px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 pt-40 text-center">
          <div className="contact-hero-reveal inline-flex items-center p-1 px-4 mb-8 bg-white/5 rounded-full border border-white/10">
            <span className="w-2 h-2 bg-lime rounded-full mr-3 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Contact Us</span>
          </div>
          
          <h1 className="contact-hero-reveal text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-8">
            Let's Build
            <br />
            <span className="text-lime italic">Something Great</span>
          </h1>
          
          <p className="contact-hero-reveal text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Ready to transform your digital presence? Get in touch with our team and let's discuss how we can help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-black/5 hover:border-lime/50 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-lime/10 rounded-xl flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-500 text-sm">{detail}</p>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Side - Info */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="sticky top-32">
                  <div className="inline-flex items-center p-1 px-4 mb-6 bg-black/5 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Get In Touch</span>
                  </div>
                  <h2 className="text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
                    Send Us A
                    <br />
                    <span className="text-lime italic">Message</span>
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed mb-8">
                    Fill out the form and our team will get back to you within 24 hours. We're excited to learn about your project and explore how we can help.
                  </p>
                  
                  <div className="bg-lime rounded-2xl p-6 mt-8">
                    <p className="font-bold mb-2">Prefer a quick chat?</p>
                    <p className="text-black/60 text-sm mb-4">
                      Schedule a free 30-minute consultation call with our team.
                    </p>
                    <button className="w-full bg-black text-white py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-gray-900 transition-colors">
                      Book a Call
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.2}>
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2rem] border border-black/5 shadow-sm">
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                      <Input
                        placeholder="Full Name"
                        required
                        className="pl-12 py-6 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-lime/20 transition-all"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="pl-12 py-6 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-lime/20 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                      <Input
                        placeholder="Phone Number"
                        className="pl-12 py-6 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-lime/20 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="relative group">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                      <Input
                        placeholder="Company Name"
                        className="pl-12 py-6 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-lime/20 transition-all"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger className="py-6 px-4 rounded-xl bg-gray-50 border-0">
                        <SelectValue placeholder="Select a Service" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-0 shadow-xl">
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

                  <div className="relative group mb-8">
                    <FileText className="absolute left-4 top-6 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Textarea
                      placeholder="Tell us about your project..."
                      required
                      className="pl-12 pt-6 min-h-[180px] rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-lime/20 transition-all resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-lime hover:text-black rounded-full py-7 text-sm font-black uppercase tracking-wider transition-all duration-500 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Sending..."
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
      <section className="h-[400px] bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-lime mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Addis Ababa, Ethiopia</p>
            <p className="text-gray-400 text-sm">Bole Japan, 123 Innovation Drive</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
