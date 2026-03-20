'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { ArrowRight, Calendar, Clock, User, Search, TrendingUp } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Technology", "Design", "Development", "Business", "Insights"];

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Ethiopian Business: Opportunities and Challenges",
    excerpt: "Exploring how artificial intelligence is reshaping the business landscape in Ethiopia and what organizations need to know to stay competitive.",
    category: "Technology",
    author: "Yeabkal Demeke",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: 2,
    title: "Building Secure Digital Infrastructure: A Guide for Ethiopian Enterprises",
    excerpt: "Cybersecurity best practices and strategies for protecting your organization's digital assets in an increasingly connected world.",
    category: "Technology",
    author: "Daniel Abebe",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    date: "March 10, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: 3,
    title: "Design Thinking: Transforming User Experience in East Africa",
    excerpt: "How design thinking principles are being applied to create more intuitive and culturally relevant digital products in the region.",
    category: "Design",
    author: "Sara Tesfaye",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 4,
    title: "Cloud Migration Strategies for Growing Businesses",
    excerpt: "A comprehensive guide to planning and executing a successful cloud migration that minimizes disruption and maximizes value.",
    category: "Development",
    author: "Hanna Bekele",
    authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100",
    date: "February 28, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 5,
    title: "The Rise of Fintech in Ethiopia: Digital Banking Revolution",
    excerpt: "An in-depth look at how financial technology is transforming banking and payments across Ethiopia.",
    category: "Business",
    author: "Yeabkal Demeke",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    date: "February 20, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 6,
    title: "Creating Accessible Digital Products: Why Inclusion Matters",
    excerpt: "Best practices for building digital products that are accessible to all users, regardless of ability.",
    category: "Design",
    author: "Sara Tesfaye",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    date: "February 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 7,
    title: "Digital Transformation: Lessons from Ethiopian Government Projects",
    excerpt: "Key insights and lessons learned from major digital transformation initiatives in the public sector.",
    category: "Insights",
    author: "Daniel Abebe",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    date: "February 10, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 8,
    title: "Scaling Your Startup: Technical Considerations for Growth",
    excerpt: "Technical strategies and architecture decisions that help startups scale effectively without breaking the bank.",
    category: "Development",
    author: "Hanna Bekele",
    authorImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100",
    date: "February 5, 2024",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 9,
    title: "The Power of Brand Storytelling in Digital Marketing",
    excerpt: "How authentic storytelling can differentiate your brand and create meaningful connections with your audience.",
    category: "Business",
    author: "Yeabkal Demeke",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    date: "January 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
];

const trendingTopics = [
  "Artificial Intelligence",
  "Cloud Computing",
  "Cybersecurity",
  "Digital Transformation",
  "Fintech",
  "UX Design",
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
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] bg-black text-white flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-lime/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 pt-40">
          <div className="max-w-3xl">
            <div className="blog-hero-reveal inline-flex items-center p-1 px-4 mb-8 bg-white/5 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-lime rounded-full mr-3 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Blog & Insights</span>
            </div>
            
            <h1 className="blog-hero-reveal text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-8">
              Ideas, Insights
              <br />
              <span className="text-lime italic">& Innovation</span>
            </h1>
            
            <p className="blog-hero-reveal text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Explore our latest thoughts on technology, design, digital transformation, and the future of business in Ethiopia and beyond.
            </p>

            {/* Search Bar */}
            <div className="blog-hero-reveal relative max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:border-lime/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-12">
            <div className="inline-flex items-center p-1 px-4 mb-4 bg-black/5 rounded-full">
              <TrendingUp className="w-3 h-3 mr-2" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Featured Articles</span>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.15}>
                <article className="group relative bg-black rounded-[2rem] overflow-hidden h-[450px]">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-lime text-black rounded-full text-xs font-bold">
                        {post.category}
                      </span>
                      <span className="text-white/40 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-lime transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.authorImage} 
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white text-sm font-bold">{post.author}</p>
                          <p className="text-white/40 text-xs">{post.date}</p>
                        </div>
                      </div>
                      <button className="w-12 h-12 bg-lime rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5 text-black" />
                      </button>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts with Sidebar */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScrollReveal className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    Latest <span className="text-lime">Articles</span>
                  </h2>
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 4).map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
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

              <div className="space-y-6">
                {filteredPosts.filter(p => !p.featured).map((post, index) => (
                  <ScrollReveal key={post.id} delay={index * 0.05}>
                    <article className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-lime/50 hover:shadow-lg transition-all duration-300">
                      <div className="grid sm:grid-cols-3 gap-0">
                        <div className="relative h-48 sm:h-auto overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="sm:col-span-2 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-1 bg-lime/10 text-black rounded text-xs font-bold">
                              {post.category}
                            </span>
                            <span className="text-gray-400 text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-lime transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img 
                                src={post.authorImage} 
                                alt={post.author}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="text-sm font-medium">{post.author}</span>
                            </div>
                            <span className="text-gray-400 text-xs">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>

              {filteredPosts.filter(p => !p.featured).length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-400">No articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 border border-black/5">
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setActiveCategory(category)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeCategory === category
                              ? 'bg-lime text-black'
                              : 'hover:bg-black/5'
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
                <div className="bg-white rounded-2xl p-6 border border-black/5">
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4">Trending Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-3 py-2 bg-black/5 rounded-full text-xs font-bold hover:bg-lime hover:text-black transition-colors cursor-pointer"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Newsletter */}
              <ScrollReveal delay={0.2}>
                <div className="bg-black rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-black uppercase tracking-tight mb-2">Stay Updated</h3>
                  <p className="text-white/50 text-sm mb-4">
                    Subscribe to our newsletter for the latest insights delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-white/10 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-lime/50 mb-3 text-sm"
                  />
                  <button className="w-full bg-lime text-black py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors">
                    Subscribe
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-lime">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
              Want to Share
              <br />
              Your Story?
            </h2>
            <p className="text-black/60 text-lg max-w-xl mx-auto mb-8">
              We're always looking for guest contributors. If you have insights to share, we'd love to hear from you.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all duration-500 group"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
