'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web Development", "Mobile Apps", "Branding", "UI/UX Design", "Enterprise"];

const projects = [
  {
    id: 1,
    title: "Ethio Telecom Digital Platform",
    category: "Enterprise",
    description: "A comprehensive digital transformation platform for Ethiopia's largest telecom provider.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Node.js", "PostgreSQL"],
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "Bank of Ethiopia Mobile App",
    category: "Mobile Apps",
    description: "A secure, user-friendly mobile banking application serving millions of customers.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
    tags: ["React Native", "TypeScript"],
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    title: "Hilton Addis Brand Refresh",
    category: "Branding",
    description: "Complete brand identity redesign for Hilton Addis Ababa.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    tags: ["Brand Strategy", "Visual Identity"],
    year: "2023",
    featured: false,
  },
  {
    id: 4,
    title: "Ethiopian Airlines Booking System",
    category: "Web Development",
    description: "A modern, high-performance flight booking system with real-time availability.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "GraphQL", "Stripe"],
    year: "2024",
    featured: true,
  },
  {
    id: 5,
    title: "UNICEF Ethiopia Dashboard",
    category: "UI/UX Design",
    description: "An interactive data visualization dashboard tracking humanitarian projects.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Figma", "D3.js"],
    year: "2023",
    featured: false,
  },
  {
    id: 6,
    title: "Ride Ethiopia Platform",
    category: "Mobile Apps",
    description: "A ride-hailing platform connecting passengers with drivers across Ethiopia.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
    tags: ["Flutter", "Firebase"],
    year: "2023",
    featured: false,
  },
  {
    id: 7,
    title: "Ministry of Health Portal",
    category: "Enterprise",
    description: "A centralized health information system for the Ethiopian Ministry of Health.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2024",
    featured: false,
  },
  {
    id: 8,
    title: "Kifiya Financial Services",
    category: "Web Development",
    description: "A fintech platform enabling digital payments for underserved communities.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "Prisma"],
    year: "2023",
    featured: false,
  },
];

const stats = [
  { number: "120+", label: "Projects" },
  { number: "100+", label: "Clients" },
  { number: "15+", label: "Industries" },
  { number: "98%", label: "Satisfaction" },
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
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[75vh] md:min-h-[80vh] bg-background text-foreground flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-lime/10 rounded-full blur-[120px] md:blur-[180px]" />
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-lime/5 rounded-full blur-[100px] md:blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-24 md:py-32 pt-32 md:pt-40">
          <div className="max-w-4xl">
            <div className="projects-hero-reveal inline-flex items-center p-1 px-3 md:px-4 mb-6 md:mb-8 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10">
              <span className="w-2 h-2 bg-lime rounded-full mr-2 md:mr-3 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60 dark:text-white/60">Our Portfolio</span>
            </div>
            
            <h1 className="projects-hero-reveal text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[5rem] xl:text-[6rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6 md:mb-8 text-foreground dark:text-white">
              Showcasing
              <br />
              <span className="text-lime italic">Digital Excellence</span>
            </h1>
            
            <p className="projects-hero-reveal text-foreground/50 dark:text-white/50 text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl">
              Explore our portfolio of successful projects spanning web development, mobile apps, and enterprise solutions.
            </p>

            {/* Stats Row */}
            <div className="projects-hero-reveal grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-8 md:pt-10 border-t border-black/10 dark:border-white/10">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-black text-lime">{stat.number}</div>
                  <div className="text-[10px] md:text-xs lg:text-sm text-foreground/40 dark:text-white/40 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10 md:mb-16">
            <div className="inline-flex items-center p-1 px-3 md:px-4 mb-4 md:mb-6 bg-white/5 rounded-full border border-white/10">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/60">Featured Work</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase text-white">
              Highlighted <span className="text-lime italic">Projects</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.15}>
                <div className="group relative bg-black rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden h-[350px] md:h-[500px] lg:h-[550px]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 p-5 md:p-8 lg:p-10 flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 md:px-3 py-1 bg-white/10 rounded-full text-[10px] md:text-xs font-bold text-white/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-lime transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 max-w-md line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lime text-xs md:text-sm font-bold">{project.category}</span>
                      <Link 
                        href={`/projects/${project.id}`}
                        className="w-10 md:w-12 h-10 md:h-12 bg-lime rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                      >
                        <ArrowUpRight className="w-4 md:w-5 h-4 md:h-5 text-black" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Third Featured - Full Width */}
          <ScrollReveal delay={0.3} className="mt-4 md:mt-6">
            <div className="group relative bg-lime rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {featuredProjects[2]?.tags.map((tag, i) => (
                      <span key={i} className="px-2 md:px-3 py-1 bg-black/10 rounded-full text-[10px] md:text-xs font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-3 md:mb-4">
                    {featuredProjects[2]?.title}
                  </h3>
                  <p className="text-black/60 leading-relaxed text-sm md:text-base mb-4 md:mb-6">
                    {featuredProjects[2]?.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-wider group/btn">
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="relative h-[200px] md:h-[300px] lg:h-auto">
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
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-black/[0.03] dark:bg-white/[0.03] border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
              <div>
                <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-2 md:mb-4 text-foreground dark:text-white">
                  All <span className="text-lime italic">Projects</span>
                </h2>
                <p className="text-foreground/40 dark:text-white/40 text-sm md:text-base">Browse our complete portfolio</p>
              </div>
              
              {/* Category Filter - Horizontal scroll on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                      activeCategory === category
                        ? 'bg-lime text-black'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.05}>
                <Link href={`/projects/${project.id}`} className="group block bg-black/5 dark:bg-white/5 rounded-xl md:rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-lime/50 transition-all duration-300">
                  <div className="relative h-40 md:h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 md:top-4 right-3 md:right-4">
                      <span className="px-2 md:px-3 py-1 bg-[#e6e6e6]/90 text-black backdrop-blur-sm rounded-full text-[10px] md:text-xs font-bold">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-lime text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 md:mb-2">{project.category}</p>
                    <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 group-hover:text-lime transition-colors text-foreground dark:text-white">{project.title}</h3>
                    <p className="text-foreground/50 dark:text-white/40 text-xs md:text-sm line-clamp-2 mb-3 md:mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 md:py-1 bg-black/5 rounded text-[10px] md:text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-background border-t border-black/5 dark:border-white/5 text-foreground">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6 text-foreground">
              Have a Project
              <br />
              <span className="text-lime italic">In Mind?</span>
            </h2>
            <p className="text-foreground/50 dark:text-white/50 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
              Let's collaborate and bring your vision to life. Our team is ready to help you create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link 
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 bg-lime text-black px-8 md:px-10 py-4 md:py-5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 group"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 border border-black/20 dark:border-white/20 text-foreground dark:text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-500"
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
