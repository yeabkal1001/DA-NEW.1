'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { ArrowRight, ArrowUpRight, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web Development", "Mobile Apps", "Branding", "UI/UX Design", "Enterprise Solutions"];

const projects = [
  {
    id: 1,
    title: "Ethio Telecom Digital Platform",
    category: "Enterprise Solutions",
    description: "A comprehensive digital transformation platform for Ethiopia's largest telecom provider, featuring customer portals, service management, and analytics dashboards.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "Bank of Ethiopia Mobile App",
    category: "Mobile Apps",
    description: "A secure, user-friendly mobile banking application serving millions of customers with features like fund transfers, bill payments, and account management.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
    tags: ["React Native", "TypeScript", "Firebase"],
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    title: "Hilton Addis Brand Refresh",
    category: "Branding",
    description: "Complete brand identity redesign for Hilton Addis Ababa, including logo design, brand guidelines, and marketing collateral.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    tags: ["Brand Strategy", "Visual Identity", "Print Design"],
    year: "2023",
    featured: false,
  },
  {
    id: 4,
    title: "Ethiopian Airlines Booking System",
    category: "Web Development",
    description: "A modern, high-performance flight booking system with real-time availability, dynamic pricing, and seamless payment integration.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "GraphQL", "Stripe", "Redis"],
    year: "2024",
    featured: true,
  },
  {
    id: 5,
    title: "UNICEF Ethiopia Dashboard",
    category: "UI/UX Design",
    description: "An interactive data visualization dashboard for UNICEF Ethiopia, tracking humanitarian projects and impact metrics across the country.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Figma", "D3.js", "User Research"],
    year: "2023",
    featured: false,
  },
  {
    id: 6,
    title: "Ride Ethiopia Platform",
    category: "Mobile Apps",
    description: "A ride-hailing platform connecting passengers with drivers across major Ethiopian cities, featuring real-time tracking and cashless payments.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
    tags: ["Flutter", "Firebase", "Google Maps", "Stripe"],
    year: "2023",
    featured: false,
  },
  {
    id: 7,
    title: "Ministry of Health Portal",
    category: "Enterprise Solutions",
    description: "A centralized health information system for the Ethiopian Ministry of Health, managing patient records, facility data, and health metrics.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Node.js", "MongoDB", "Docker"],
    year: "2024",
    featured: false,
  },
  {
    id: 8,
    title: "Kifiya Financial Services",
    category: "Web Development",
    description: "A fintech platform enabling digital payments and financial services for underserved communities in Ethiopia.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    year: "2023",
    featured: false,
  },
  {
    id: 9,
    title: "Addis Mercato E-Commerce",
    category: "Web Development",
    description: "A comprehensive e-commerce platform bringing the famous Addis Mercato market online, connecting local vendors with customers nationwide.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    tags: ["Shopify", "Next.js", "Stripe", "Algolia"],
    year: "2023",
    featured: false,
  },
];

const stats = [
  { number: "120+", label: "Projects Delivered" },
  { number: "100+", label: "Happy Clients" },
  { number: "15+", label: "Industries Served" },
  { number: "98%", label: "Client Satisfaction" },
];

export default function ProjectsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const featuredProjects = projects.filter(p => p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-hero-reveal", {
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
      <section ref={heroRef} className="relative min-h-[80vh] bg-black text-white flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 pt-40">
          <div className="max-w-4xl">
            <div className="projects-hero-reveal inline-flex items-center p-1 px-4 mb-8 bg-white/5 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-lime rounded-full mr-3 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Our Portfolio</span>
            </div>
            
            <h1 className="projects-hero-reveal text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-8">
              Showcasing
              <br />
              <span className="text-lime italic">Digital Excellence</span>
            </h1>
            
            <p className="projects-hero-reveal text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Explore our portfolio of successful projects spanning web development, mobile applications, enterprise solutions, and digital branding for clients across diverse industries.
            </p>

            {/* Stats Row */}
            <div className="projects-hero-reveal grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-black text-lime">{stat.number}</div>
                  <div className="text-sm text-white/40 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16">
            <div className="inline-flex items-center p-1 px-4 mb-6 bg-black/5 rounded-full">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Featured Work</span>
            </div>
            <h2 className="text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase">
              Highlighted <span className="text-lime italic">Projects</span>
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.15}>
                <div className="group relative bg-black rounded-[2rem] overflow-hidden h-[500px]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lime text-sm font-bold">{project.category}</span>
                      <button className="w-12 h-12 bg-lime rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-5 h-5 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Third Featured - Full Width */}
          <ScrollReveal delay={0.3} className="mt-6">
            <div className="group relative bg-lime rounded-[2rem] overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProjects[2]?.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-black/10 rounded-full text-xs font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                    {featuredProjects[2]?.title}
                  </h3>
                  <p className="text-black/60 leading-relaxed mb-6">
                    {featuredProjects[2]?.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider group/btn">
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="relative h-[300px] lg:h-auto">
                  <img 
                    src={featuredProjects[2]?.image} 
                    alt={featuredProjects[2]?.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* All Projects with Filter */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4">
                  All <span className="text-lime italic">Projects</span>
                </h2>
                <p className="text-gray-500">Browse our complete portfolio of work</p>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      activeCategory === category
                        ? 'bg-black text-white'
                        : 'bg-white text-black/60 hover:bg-black/5'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.05}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-lime/50 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-lime text-xs font-bold uppercase tracking-wider mb-2">{project.category}</p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-lime transition-colors">{project.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-black/5 rounded text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[2.5rem] md:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
              Have a Project
              <br />
              <span className="text-lime italic">In Mind?</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Let's collaborate and bring your vision to life. Our team is ready to help you create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 bg-lime text-black px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 group"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-500"
              >
                View Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
