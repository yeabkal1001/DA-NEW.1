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
import { User, Mail, Phone, Building, FileText } from "lucide-react";

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
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Ready to Bring Your
            <br />
            <span className="text-lime">Idea to Life?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Partner with Digital Addis and let our team of experts guide you
            through every step of the digital journey.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - CTA Card */}
          <ScrollReveal>
            <div className="bg-lime rounded-3xl p-8 sm:p-12 h-full flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Partner with Digital Addis and turn your vision into a successful
                digital solution.
              </h3>
              <p className="text-black/70 text-lg">project description</p>
            </div>
          </ScrollReveal>

          {/* Right side - Form */}
          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Full name"
                    className="pl-12 py-6 rounded-xl bg-gray-100 border-0"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="pl-12 py-6 rounded-xl bg-gray-100 border-0"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Phone number"
                    className="pl-12 py-6 rounded-xl bg-gray-100 border-0"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Company / Business Name"
                    className="pl-12 py-6 rounded-xl bg-gray-100 border-0"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
              </div>

              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
              >
                <SelectTrigger className="py-6 rounded-xl bg-gray-100 border-0">
                  <SelectValue placeholder="Service interested in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uiux">UI/UX Design</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="branding">Branding</SelectItem>
                  <SelectItem value="strategy">Digital Strategy</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Textarea
                  placeholder="Tell us about your project goals and requirements..."
                  className="pl-12 pt-3 min-h-[120px] rounded-xl bg-black text-white border-0 resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-lime text-black hover:bg-lime/90 rounded-full py-6 text-lg font-semibold transition-transform hover:scale-[1.02]"
              >
                Get Started
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
