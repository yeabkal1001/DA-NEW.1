'use client';

import { useState } from "react";
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
import { User, Mail, Phone, Building, FileText, ArrowUpRight } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="py-32 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section header - Aesthetic Refinement */}
        <ScrollReveal className="mb-24 text-center relative">
          <div className="inline-flex items-center justify-center p-1 px-4 mb-8 bg-black/5 rounded-full border border-black/5">
             <span className="w-2 h-2 bg-lime rounded-full mr-3 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Let's Build Together</span>
          </div>
          <h2 className="text-[3.5rem] md:text-[6rem] font-[1000] leading-[0.9] text-black uppercase tracking-tighter mb-8 max-w-5xl mx-auto">
            Ready to Bring Your
            <br />
            <span className="text-lime italic">Idea to Life?</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-bold max-w-xl mx-auto leading-relaxed uppercase tracking-tight opacity-80">
            Partner with Digital Addis and let our team of experts guide you through every step of the digital journey.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left side - CTA Card - Premium Gradient & Layout */}
          <div className="lg:col-span-5 h-full">
            <ScrollReveal className="h-full">
              <div className="bg-lime rounded-[3rem] p-12 lg:p-16 h-full flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-lime/20">
                {/* Abstract Glass Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-10 group-hover:rotate-45 transition-transform duration-500">
                     <ArrowUpRight className="text-lime w-8 h-8" />
                  </div>
                  <h3 className="text-4xl md:text-[3.2rem] font-[1001] text-black uppercase leading-[1] mb-8 tracking-tighter">
                    Partner with Digital Addis and turn your vision into a successful digital solution.
                  </h3>
                </div>

                <div className="relative z-10 mt-12 pt-12 border-t border-black/10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center font-black">@</div>
                     <p className="text-black font-black uppercase tracking-widest text-sm">hello@digitaladdis.com</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right side - Form - Clean & High Contrast */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2} className="h-full">
              <form onSubmit={handleSubmit} className="bg-gray-50/50 p-8 md:p-12 rounded-[3.5rem] border border-black/5 h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Input
                      placeholder="FULL NAME"
                      className="pl-16 py-8 rounded-[1.5rem] bg-white border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-xs tracking-widest uppercase"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Input
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      className="pl-16 py-8 rounded-[1.5rem] bg-white border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-xs tracking-widest uppercase"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="relative group">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Input
                      placeholder="PHONE NUMBER"
                      className="pl-16 py-8 rounded-[1.5rem] bg-white border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-xs tracking-widest uppercase"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <Building className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Input
                      placeholder="COMPANY NAME"
                      className="pl-16 py-8 rounded-[1.5rem] bg-white border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-xs tracking-widest uppercase"
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
                    <SelectTrigger className="py-8 px-6 rounded-[1.5rem] bg-white border-white/10 shadow-sm font-bold text-xs tracking-widest uppercase">
                      <SelectValue placeholder="SERVICE INTERESTED IN" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white">
                      <SelectItem value="uiux" className="rounded-xl py-3 font-bold text-xs tracking-widest uppercase">UI/UX Design</SelectItem>
                      <SelectItem value="web" className="rounded-xl py-3 font-bold text-xs tracking-widest uppercase">Web Development</SelectItem>
                      <SelectItem value="branding" className="rounded-xl py-3 font-bold text-xs tracking-widest uppercase">Branding</SelectItem>
                      <SelectItem value="strategy" className="rounded-xl py-3 font-bold text-xs tracking-widest uppercase">Digital Strategy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative group mb-8">
                  <FileText className="absolute left-6 top-8 h-5 w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                  <Textarea
                    placeholder="TELL US ABOUT YOUR PROJECT GOALS AND REQUIREMENTS..."
                    className="pl-16 pt-8 min-h-[180px] rounded-[2rem] bg-black text-white border-0 shadow-2xl focus:ring-4 focus:ring-lime/10 transition-all font-bold text-xs tracking-widest uppercase leading-loose"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-lime text-black hover:bg-black hover:text-white rounded-full py-10 text-[12px] font-[1000] uppercase tracking-[0.5em] transition-all duration-500 shadow-xl shadow-lime/20 border-none"
                >
                  Get Started Now
                </Button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
