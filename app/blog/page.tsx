'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { ArrowRight, Calendar, Clock, Search, TrendingUp } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Technology", "Design", "Development", "Business", "Insights"];

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Ethiopian Business",
    excerpt: "Exploring how artificial intelligence is reshaping the business landscape in Ethiopia.",
    category: "Technology",
    author: "Yeabkal Demeke",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    date: "March 15, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: 2,
    title: "Building Secure Digital Infrastructure",
    excerpt: "Cybersecurity best practices for protecting your organization's digital assets.",
    category: "Technology",
    author: "Daniel Abebe",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    date: "March 10, 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: 3,
    title: "Design Thinking: Transforming UX in East Africa",
    excerpt: "How design thinking principles create intuitive digital products.",
    category: "Design",
    author: "Sara Tesfaye",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    date: "March 5, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 4,
    title: "Cloud Migration Strategies for Growing Businesses",
    excerpt: "A guide to planning and executing a successful cloud migration.",
    category: "Development",
    author: "Hanna Bekele",
    authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100",
    date: "February 28, 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 5,
    title: "The Rise of Fintech in Ethiopia",
    excerpt: "How financial technology is transforming banking and payments.",
    category: "Business",
    author: "Yeabkal Demeke",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    date: "February 20, 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 6,
    title: "Creating Accessible Digital Products",
    excerpt: "Best practices for building products accessible to all users.",
    category: "Design",
    author: "Sara Tesfaye",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    date: "February 15, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 7,
    title: "Digital Transformation Lessons from Government Projects",
    excerpt: "Key insights from major digital transformation initiatives.",
    category: "Insights",
    author: "Daniel Abebe",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    date: "February 10, 2024",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
];

const trendingTopics = [
  "AI", "Cloud", "Cybersecurity", "Digital Transformation", "Fintech", "UX Design",
];

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(p => p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-hero-reveal", {
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
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[65vh] md:min-h-[70vh] bg-background text-foreground flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-lime/10 rounded-full blur-[120px] md:blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-24 md:py-32 pt-32 md:pt-40">
          <div className="max-w-3xl">
            <div className="blog-hero-reveal inline-flex items-center p-1 px-3 md:px-4 mb-6 md:mb-8 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10">
              <span className="w-2 h-2 bg-lime rounded-full mr-2 md:mr-3 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60 dark:text-white/60">Blog & Insights</span>
            </div>
            
            <h1 className="blog-hero-reveal text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[5rem] xl:text-[6rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6 md:mb-8 text-foreground dark:text-white">
              Ideas, Insights
              <br />
              <span className="text-lime italic">& Innovation</span>
            </h1>
            
            <p className="blog-hero-reveal text-foreground/50 dark:text-white/50 text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl">
              Explore our latest thoughts on technology, design, and digital transformation.
            </p>

            {/* Search Bar */}
            <div className="blog-hero-reveal relative max-w-xl">
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-foreground/40 dark:text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full py-3 md:py-4 pl-11 md:pl-14 pr-4 md:pr-6 text-sm md:text-base text-foreground dark:text-white placeholder:text-foreground/40 dark:placeholder:text-white/30 focus:outline-none focus:border-lime/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-8 md:mb-12">
            <div className="inline-flex items-center p-1 px-3 md:px-4 mb-3 md:mb-4 bg-black/5 dark:bg-white/5 rounded-full">
              <TrendingUp className="w-3 h-3 mr-2" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-foreground/60 dark:text-white/60">Featured Articles</span>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {featuredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.15}>
                <Link href={`/blog/${post.id}`} className="group block relative bg-black rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden h-[320px] md:h-[380px] lg:h-[500px]">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 p-5 md:p-8 lg:p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
                      <span className="px-2 md:px-3 py-1 bg-lime text-black rounded-full text-[10px] md:text-xs font-bold">
                        {post.category}
                      </span>
                      <span className="text-white/40 text-[10px] md:text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mb-2 md:mb-3 group-hover:text-lime transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <img 
                          src={post.authorImage} 
                          alt={post.author}
                          className="w-8 md:w-10 h-8 md:h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white text-xs md:text-sm font-bold">{post.author}</p>
                          <p className="text-white/40 text-[10px] md:text-xs">{post.date}</p>
                        </div>
                      </div>
                      <span className="w-10 md:w-12 h-10 md:h-12 bg-lime rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 md:w-5 h-4 md:h-5 text-black" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts with Sidebar */}
      <section className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-black/[0.03] dark:bg-white/[0.03] border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScrollReveal className="mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                    Latest <span className="text-lime">Articles</span>
                  </h2>
                  {/* Category Filter - Horizontal scroll on mobile */}
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                    {categories.slice(0, 4).map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
                          activeCategory === category
                            ? 'bg-lime text-black'
                            : 'bg-black/5 dark:bg-white/5 text-foreground/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 hover:text-foreground dark:hover:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <div className="space-y-4 md:space-y-6">
                {filteredPosts.filter(p => !p.featured).map((post, index) => (
                  <ScrollReveal key={post.id} delay={index * 0.05}>
                    <Link href={`/blog/${post.id}`} className="group block bg-black/5 dark:bg-white/5 rounded-xl md:rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-lime/50 transition-all duration-300 h-full">
                      <div className="grid sm:grid-cols-3 gap-0">
                        <div className="relative h-40 sm:h-auto overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="sm:col-span-2 p-4 md:p-6">
                          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                            <span className="px-2 py-0.5 md:py-1 bg-lime/10 dark:bg-lime/20 text-lime rounded text-[10px] md:text-xs font-bold">
                              {post.category}
                            </span>
                            <span className="text-foreground/40 dark:text-white/40 text-[10px] md:text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </span>
                          </div>
                          <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 group-hover:text-lime transition-colors text-foreground dark:text-white leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-foreground/40 dark:text-white/40 text-xs md:text-sm line-clamp-2 mb-3 md:mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img 
                                src={post.authorImage} 
                                alt={post.author}
                                className="w-6 md:w-8 h-6 md:h-8 rounded-full object-cover"
                              />
                              <span className="text-xs md:text-sm font-medium text-foreground dark:text-white">{post.author}</span>
                            </div>
                            <span className="text-foreground/30 dark:text-white/30 text-[10px] md:text-xs">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              {filteredPosts.filter(p => !p.featured).length === 0 && (
                <div className="text-center py-12 md:py-20">
                  <p className="text-foreground/40 dark:text-white/40">No articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar - Hidden on mobile, shown as horizontal scroll or simplified */}
            <div className="lg:col-span-1 space-y-6 md:space-y-8">
              {/* Categories */}
              <ScrollReveal>
                <div className="bg-black/5 dark:bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/10 dark:border-white/10">
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-3 md:mb-4 text-foreground dark:text-white">Categories</h3>
                  <ul className="space-y-1 md:space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setActiveCategory(category)}
                          className={`w-full text-left px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                            activeCategory === category
                              ? 'bg-lime text-black'
                              : 'text-foreground/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground dark:hover:text-white'
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Trending Topics */}
              <ScrollReveal delay={0.1}>
                <div className="bg-black/5 dark:bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/10 dark:border-white/10">
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-3 md:mb-4 text-foreground dark:text-white">Trending Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2 md:px-3 py-1.5 md:py-2 bg-black/5 dark:bg-white/10 rounded-full text-[10px] md:text-xs font-bold text-foreground/60 dark:text-white/60 hover:bg-lime hover:text-black transition-colors cursor-pointer"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Newsletter */}
              <ScrollReveal delay={0.2}>
                <div className="bg-black rounded-xl md:rounded-2xl p-4 md:p-6 text-white">
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-2">Stay Updated</h3>
                  <p className="text-white/50 text-xs md:text-sm mb-3 md:mb-4">
                    Subscribe for the latest insights delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-white/10 border border-white/10 rounded-lg py-2.5 md:py-3 px-3 md:px-4 text-xs md:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-lime/50 mb-2 md:mb-3"
                  />
                  <button className="w-full bg-lime text-black py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white transition-colors">
                    Subscribe
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-lime">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-4 md:mb-6">
              Want to Share
              <br />
              Your Story?
            </h2>
            <p className="text-black/60 text-base md:text-lg max-w-xl mx-auto mb-6 md:mb-8 px-4">
              We're always looking for guest contributors. If you have insights to share, we'd love to hear from you.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 md:gap-3 bg-black text-white dark:bg-white dark:text-black px-6 md:px-8 py-3 md:py-4 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-lime hover:text-black transition-all duration-500 group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
