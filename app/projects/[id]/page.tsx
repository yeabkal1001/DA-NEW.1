'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Globe, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// Project data - in real app this would come from a database
const projectsData: Record<string, {
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  tags: string[];
  year: string;
  client: string;
  duration: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
  nextProject?: { id: number; title: string };
  prevProject?: { id: number; title: string };
}> = {
  "1": {
    title: "Ethio Telecom Digital Platform",
    category: "Enterprise",
    description: "A comprehensive digital transformation platform for Ethiopia's largest telecom provider.",
    fullDescription: "We partnered with Ethio Telecom to revolutionize their digital infrastructure, creating a unified platform that serves millions of customers across Ethiopia. The project involved modernizing legacy systems, implementing cloud-native architecture, and building a seamless customer experience across all touchpoints.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "AWS", "Microservices"],
    year: "2024",
    client: "Ethio Telecom",
    duration: "18 months",
    services: ["Custom Software Development", "Cloud Services", "Digital Consulting"],
    challenge: "Ethio Telecom needed to modernize their aging infrastructure while maintaining service continuity for over 60 million subscribers. The challenge was to create a scalable, secure platform that could handle peak loads and integrate with existing systems.",
    solution: "We designed and implemented a microservices-based architecture on AWS, with a React frontend for the customer portal. The solution included real-time analytics, automated scaling, and robust security measures including multi-factor authentication and encryption at rest.",
    results: [
      { metric: "Performance Improvement", value: "300%" },
      { metric: "Customer Satisfaction", value: "95%" },
      { metric: "Downtime Reduction", value: "99.9%" },
      { metric: "Cost Savings", value: "40%" },
    ],
    testimonial: {
      quote: "Digital Addis transformed our digital capabilities. Their team's expertise and dedication delivered results beyond our expectations.",
      author: "Abebe Bekele",
      role: "CTO, Ethio Telecom",
    },
    nextProject: { id: 2, title: "Bank of Ethiopia Mobile App" },
    prevProject: { id: 8, title: "Kifiya Financial Services" },
  },
  "2": {
    title: "Bank of Ethiopia Mobile App",
    category: "Mobile Apps",
    description: "A secure, user-friendly mobile banking application serving millions of customers.",
    fullDescription: "We developed a cutting-edge mobile banking application for Bank of Ethiopia, enabling customers to manage their finances securely from anywhere. The app features biometric authentication, real-time transactions, and an intuitive interface designed for users of all technical backgrounds.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800",
    ],
    tags: ["React Native", "TypeScript", "Firebase", "Biometrics"],
    year: "2024",
    client: "Bank of Ethiopia",
    duration: "12 months",
    services: ["Mobile Development", "UI/UX Design", "Cybersecurity"],
    challenge: "Creating a secure banking app that could serve diverse user demographics while meeting strict financial regulations and ensuring accessibility across various device types and network conditions.",
    solution: "We built a React Native application with offline-first capabilities, biometric security, and progressive disclosure of features. The app automatically adapts to network conditions and includes accessibility features for visually impaired users.",
    results: [
      { metric: "Downloads", value: "2M+" },
      { metric: "Daily Active Users", value: "500K" },
      { metric: "Transaction Success Rate", value: "99.8%" },
      { metric: "App Store Rating", value: "4.8" },
    ],
    nextProject: { id: 3, title: "Hilton Addis Brand Refresh" },
    prevProject: { id: 1, title: "Ethio Telecom Digital Platform" },
  },
  "3": {
    title: "Hilton Addis Brand Refresh",
    category: "Branding",
    description: "Complete brand identity redesign for Hilton Addis Ababa.",
    fullDescription: "A comprehensive brand refresh that reimagined Hilton Addis Ababa's visual identity while honoring its heritage. The project encompassed everything from logo refinement to digital presence, creating a cohesive brand experience across all touchpoints.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
    ],
    tags: ["Brand Strategy", "Visual Identity", "Digital Design"],
    year: "2023",
    client: "Hilton Hotels",
    duration: "6 months",
    services: ["Branding", "UI/UX Design", "Digital Consulting"],
    challenge: "Refreshing a well-established brand identity while maintaining recognition and emotional connection with existing customers, and aligning with Hilton's global standards.",
    solution: "We conducted extensive brand research and developed a visual system that blends Ethiopian cultural elements with Hilton's international elegance. The new identity was rolled out across digital and physical touchpoints.",
    results: [
      { metric: "Brand Recognition", value: "+45%" },
      { metric: "Website Traffic", value: "+120%" },
      { metric: "Social Engagement", value: "+200%" },
      { metric: "Booking Increase", value: "+35%" },
    ],
    nextProject: { id: 4, title: "Ethiopian Airlines Booking System" },
    prevProject: { id: 2, title: "Bank of Ethiopia Mobile App" },
  },
  "4": {
    title: "Ethiopian Airlines Booking System",
    category: "Web Development",
    description: "A modern, high-performance flight booking system with real-time availability.",
    fullDescription: "We built a next-generation flight booking platform for Ethiopian Airlines, featuring real-time seat selection, dynamic pricing, and seamless payment integration. The system handles millions of bookings annually with exceptional reliability.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&q=80&w=800",
    ],
    tags: ["Next.js", "GraphQL", "Stripe", "Redis", "Kubernetes"],
    year: "2024",
    client: "Ethiopian Airlines",
    duration: "14 months",
    services: ["Web Development", "Cloud Services", "Performance Optimization"],
    challenge: "Building a booking system that could handle massive traffic spikes during promotions while providing real-time inventory accuracy and supporting multiple payment methods across different regions.",
    solution: "We implemented a distributed system with edge caching, real-time inventory sync, and a GraphQL API for flexible data fetching. The frontend was built with Next.js for optimal performance and SEO.",
    results: [
      { metric: "Page Load Time", value: "1.2s" },
      { metric: "Conversion Rate", value: "+65%" },
      { metric: "System Uptime", value: "99.99%" },
      { metric: "Bookings/Day", value: "50K+" },
    ],
    nextProject: { id: 5, title: "UNICEF Ethiopia Dashboard" },
    prevProject: { id: 3, title: "Hilton Addis Brand Refresh" },
  },
  "5": {
    title: "UNICEF Ethiopia Dashboard",
    category: "UI/UX Design",
    description: "An interactive data visualization dashboard tracking humanitarian projects.",
    fullDescription: "We designed and developed an interactive dashboard for UNICEF Ethiopia to track and visualize humanitarian project progress across the country. The platform enables stakeholders to monitor key metrics, identify trends, and make data-driven decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800",
    ],
    tags: ["Figma", "D3.js", "React", "Data Visualization"],
    year: "2023",
    client: "UNICEF Ethiopia",
    duration: "8 months",
    services: ["UI/UX Design", "Web Development", "Data Analytics"],
    challenge: "Creating a complex data visualization system that remains intuitive and accessible to users with varying technical expertise, while handling large datasets from multiple sources.",
    solution: "We designed a modular dashboard with progressive complexity, allowing users to start with high-level overviews and drill down into detailed analytics. The system includes automated data pipelines and real-time updates.",
    results: [
      { metric: "User Adoption", value: "98%" },
      { metric: "Report Generation Time", value: "-80%" },
      { metric: "Data Accuracy", value: "99.5%" },
      { metric: "Decision Speed", value: "+150%" },
    ],
    nextProject: { id: 6, title: "Ride Ethiopia Platform" },
    prevProject: { id: 4, title: "Ethiopian Airlines Booking System" },
  },
};

export default function ProjectDetailPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const projectId = params.id as string;
  const project = projectsData[projectId];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-detail-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, [projectId]);

  if (!project) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
            <Link href="/projects" className="text-lime hover:underline">
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] lg:min-h-[85vh] bg-black text-white flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 w-full">
          {/* Back Button */}
          <Link
            href="/projects"
            prefetch={true}
            className="project-detail-reveal inline-flex items-center gap-2 text-white/60 hover:text-lime text-sm font-bold uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-detail-reveal px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold text-white/80">
                {tag}
              </span>
            ))}
          </div>

          <p className="project-detail-reveal text-lime text-sm font-black uppercase tracking-widest mb-4">
            {project.category}
          </p>

          <h1 className="project-detail-reveal text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6 max-w-4xl">
            {project.title}
          </h1>

          <p className="project-detail-reveal text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Project Info Bar */}
      <section className="bg-lime py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <p className="text-black/40 text-xs font-bold uppercase tracking-wider mb-1">Client</p>
              <p className="text-black text-lg md:text-xl font-bold">{project.client}</p>
            </div>
            <div>
              <p className="text-black/40 text-xs font-bold uppercase tracking-wider mb-1">Year</p>
              <p className="text-black text-lg md:text-xl font-bold">{project.year}</p>
            </div>
            <div>
              <p className="text-black/40 text-xs font-bold uppercase tracking-wider mb-1">Duration</p>
              <p className="text-black text-lg md:text-xl font-bold">{project.duration}</p>
            </div>
            <div>
              <p className="text-black/40 text-xs font-bold uppercase tracking-wider mb-1">Services</p>
              <p className="text-black text-lg md:text-xl font-bold">{project.services[0]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-32">
                <div className="inline-flex items-center p-1 px-4 mb-6 bg-black/5 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Overview</span>
                </div>
                <h2 className="text-[2.5rem] md:text-[3.5rem] font-[900] leading-[0.95] tracking-tighter uppercase">
                  About The
                  <br />
                  <span className="text-lime italic">Project</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12">
                {project.fullDescription}
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-lime" />
                    </span>
                    The Challenge
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-11">
                    {project.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-black" />
                    </span>
                    Our Solution
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-11">
                    {project.solution}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase text-center">
              Project <span className="text-lime italic">Gallery</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {project.gallery.map((img, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <img
                    src={img}
                    alt={`${project.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="inline-flex items-center p-1 px-4 mb-6 bg-white/5 rounded-full border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Results</span>
            </div>
            <h2 className="text-[2.5rem] md:text-[4rem] font-[900] leading-[0.95] tracking-tighter uppercase">
              Impact <span className="text-lime italic">& Outcomes</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {project.results.map((result, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-lime mb-2">
                    {result.value}
                  </div>
                  <p className="text-white/50 text-sm font-bold uppercase tracking-wider">
                    {result.metric}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-lime">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-8">
                "{project.testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-bold text-lg">{project.testimonial.author}</p>
                <p className="text-black/60">{project.testimonial.role}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            {project.prevProject && (
              <Link
                href={`/projects/${project.prevProject.id}`}
                className="group flex items-center gap-4 hover:text-lime transition-colors"
              >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Previous Project</p>
                  <p className="font-bold">{project.prevProject.title}</p>
                </div>
              </Link>
            )}

            {project.nextProject && (
              <Link
                href={`/projects/${project.nextProject.id}`}
                prefetch={true}
                className="group flex items-center gap-4 text-right sm:ml-auto hover:text-lime transition-colors"
              >
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Next Project</p>
                  <p className="font-bold">{project.nextProject.title}</p>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[2rem] md:text-[3.5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
              Ready to Start
              <br />
              <span className="text-lime italic">Your Project?</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
              Let's discuss how we can help bring your vision to life with the same dedication and expertise.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-lime hover:text-black transition-all duration-500 group"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
