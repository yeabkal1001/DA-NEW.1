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
    <section className="py-16 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section header */}
        <ScrollReveal className="mb-12 md:mb-24 text-center relative">
          <div className="inline-flex items-center justify-center p-1 px-3 md:px-4 mb-6 md:mb-8 bg-black/5 rounded-full border border-black/5">
             <span className="w-2 h-2 bg-lime rounded-full mr-2 md:mr-3 animate-pulse" />
             <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Let's Build Together</span>
          </div>
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[6rem] font-[1000] leading-[0.9] text-foreground dark:text-white uppercase tracking-tighter mb-4 md:mb-8 max-w-5xl mx-auto px-2">
            Ready to Bring Your
            <br />
            <span className="text-lime italic">Idea to Life?</span>
          </h2>
          <p className="text-muted-foreground dark:text-gray-400 text-sm md:text-lg lg:text-xl font-bold max-w-xl mx-auto leading-relaxed uppercase tracking-tight opacity-80 px-4">
            Partner with Digital Addis and let our team guide you through the digital journey.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-stretch">
          
          {/* Left side - CTA Card */}
          <div className="lg:col-span-5 h-full">
            <ScrollReveal className="h-full">
              <div className="bg-lime rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 h-full flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-lime/20 min-h-[280px] md:min-h-0">
                <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center mb-6 md:mb-10 group-hover:rotate-45 transition-transform duration-500">
                     <ArrowUpRight className="text-lime w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.2rem] font-[1001] text-black uppercase leading-[1] mb-6 md:mb-8 tracking-tighter">
                    Partner with Digital Addis and turn your vision into a successful digital solution.
                  </h3>
                </div>

                <div className="relative z-10 mt-8 md:mt-12 pt-6 md:pt-12 border-t border-black/10">
                  <div className="flex items-center gap-3 md:gap-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-black/5 rounded-full flex items-center justify-center font-black text-sm md:text-base">@</div>
                     <p className="text-black font-black uppercase tracking-wider md:tracking-widest text-xs md:text-sm">support@digital-addis.com</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2} className="h-full">
              <form onSubmit={handleSubmit} className="bg-black/5 dark:bg-white/5 p-6 md:p-8 lg:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-black/5 dark:border-white/5 h-full flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div className="relative group">
                    <User className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Input
                      placeholder="FULL NAME"
                      className="pl-12 md:pl-16 py-6 md:py-8 rounded-[1.25rem] md:rounded-[1.5rem] bg-background border-black/10 dark:border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-[10px] md:text-xs tracking-wider md:tracking-widest uppercase text-foreground dark:text-white"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Input
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      className="pl-12 md:pl-16 py-6 md:py-8 rounded-[1.25rem] md:rounded-[1.5rem] bg-background border-black/10 dark:border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-[10px] md:text-xs tracking-wider md:tracking-widest uppercase text-foreground dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div className="relative group">
                    <Phone className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Input
                      placeholder="PHONE NUMBER"
                      className="pl-12 md:pl-16 py-6 md:py-8 rounded-[1.25rem] md:rounded-[1.5rem] bg-background border-black/10 dark:border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-[10px] md:text-xs tracking-wider md:tracking-widest uppercase text-foreground dark:text-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <Building className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                    <Input
                      placeholder="COMPANY NAME"
                      className="pl-12 md:pl-16 py-6 md:py-8 rounded-[1.25rem] md:rounded-[1.5rem] bg-background border-black/10 dark:border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-[10px] md:text-xs tracking-wider md:tracking-widest uppercase text-foreground dark:text-white"
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
                    <SelectTrigger className="py-6 md:py-8 px-4 md:px-6 rounded-[1.25rem] md:rounded-[1.5rem] bg-background border-black/10 dark:border-white/10 shadow-sm font-bold text-[10px] md:text-xs tracking-wider md:tracking-widest uppercase text-foreground dark:text-white">
                      <SelectValue placeholder="SERVICE INTERESTED IN" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl md:rounded-2xl border-none shadow-2xl p-2 bg-popover text-popover-foreground">
                      <SelectItem value="uiux" className="rounded-lg md:rounded-xl py-2.5 md:py-3 font-bold text-[10px] md:text-xs tracking-wider uppercase">UI/UX Design</SelectItem>
                      <SelectItem value="web" className="rounded-lg md:rounded-xl py-2.5 md:py-3 font-bold text-[10px] md:text-xs tracking-wider uppercase">Web Development</SelectItem>
                      <SelectItem value="branding" className="rounded-lg md:rounded-xl py-2.5 md:py-3 font-bold text-[10px] md:text-xs tracking-wider uppercase">Branding</SelectItem>
                      <SelectItem value="strategy" className="rounded-lg md:rounded-xl py-2.5 md:py-3 font-bold text-[10px] md:text-xs tracking-wider uppercase">Digital Strategy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative group mb-6 md:mb-8">
                  <FileText className="absolute left-4 md:left-6 top-6 md:top-8 h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-lime transition-colors" />
                  <Textarea
                    placeholder="TELL US ABOUT YOUR PROJECT..."
                    className="pl-12 md:pl-16 pt-6 md:pt-8 min-h-[140px] md:min-h-[180px] rounded-[1.5rem] md:rounded-[2rem] bg-background text-foreground dark:text-white border border-black/10 dark:border-white/10 shadow-sm focus:ring-2 focus:ring-lime/20 focus:border-lime transition-all font-bold text-[10px] md:text-xs tracking-wider uppercase leading-loose"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-lime text-black hover:bg-black hover:text-white rounded-full py-7 md:py-10 text-[10px] md:text-[12px] font-[1000] uppercase tracking-[0.4em] md:tracking-[0.5em] transition-all duration-500 shadow-xl shadow-lime/20 border-none"
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
