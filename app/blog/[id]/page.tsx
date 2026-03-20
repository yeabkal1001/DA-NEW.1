'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/sections/Footer";
import { ScrollReveal } from "@/src/components/ScrollReveal";
import { ArrowLeft, ArrowRight, Calendar, Clock, Facebook, Linkedin, Twitter, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Blog post data - in real app this would come from a CMS/database
const blogPostsData: Record<string, {
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  authorImage: string;
  authorBio: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  relatedPosts: { id: number; title: string; image: string; category: string }[];
}> = {
  "1": {
    title: "The Future of AI in Ethiopian Business",
    excerpt: "Exploring how artificial intelligence is reshaping the business landscape in Ethiopia.",
    content: [
      "Artificial Intelligence is no longer a futuristic concept—it's here, and it's transforming how businesses operate across the globe. In Ethiopia, we're witnessing an exciting shift as organizations begin to embrace AI technologies to solve real-world challenges and drive growth.",
      "From automating customer service interactions to optimizing supply chain operations, AI is opening up new possibilities for Ethiopian businesses of all sizes. The technology is particularly promising in sectors like agriculture, healthcare, and financial services, where data-driven insights can have a transformative impact.",
      "## The Current State of AI in Ethiopia",
      "Ethiopia's digital transformation journey has accelerated in recent years, creating fertile ground for AI adoption. Several factors are contributing to this growth: improved internet infrastructure, a young and tech-savvy population, and increasing investment in the technology sector.",
      "Local startups and established enterprises are beginning to experiment with AI-powered solutions. From chatbots handling customer inquiries in Amharic to machine learning algorithms predicting crop yields, the applications are diverse and impactful.",
      "## Key Opportunities",
      "**Agriculture**: With over 70% of the population engaged in agriculture, AI-powered precision farming tools can help optimize crop yields, predict weather patterns, and manage resources more efficiently.",
      "**Healthcare**: AI diagnostic tools are helping healthcare providers in remote areas make faster, more accurate diagnoses. Telemedicine platforms enhanced with AI are expanding access to quality healthcare.",
      "**Financial Services**: Banks and fintech companies are using AI for credit scoring, fraud detection, and personalized financial services, helping to expand financial inclusion.",
      "## Challenges to Address",
      "While the opportunities are significant, there are challenges to overcome. Data availability and quality remain concerns, as AI systems require large datasets to function effectively. Additionally, there's a need for more AI talent and expertise within the country.",
      "Infrastructure limitations, particularly in rural areas, can also hinder AI deployment. Addressing these challenges will require collaboration between government, private sector, and educational institutions.",
      "## Looking Ahead",
      "The future of AI in Ethiopia is bright. As infrastructure improves and more professionals gain AI skills, we can expect to see innovative solutions emerging from Ethiopian tech companies. The key is to focus on solving local problems with AI, rather than simply importing solutions from elsewhere.",
      "At Digital Addis, we're committed to helping organizations navigate this AI transformation. Whether you're looking to implement your first AI solution or scale existing capabilities, we're here to guide you every step of the way."
    ],
    category: "Technology",
    author: "Yeabkal Demeke",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    authorBio: "CEO & Co-Founder of Digital Addis. Technology enthusiast with 15+ years of experience in digital transformation.",
    date: "March 15, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
    tags: ["AI", "Business", "Technology", "Innovation", "Ethiopia"],
    relatedPosts: [
      { id: 2, title: "Building Secure Digital Infrastructure", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=400", category: "Technology" },
      { id: 5, title: "The Rise of Fintech in Ethiopia", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=400", category: "Business" },
      { id: 7, title: "Digital Transformation Lessons", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400", category: "Insights" },
    ],
  },
  "2": {
    title: "Building Secure Digital Infrastructure",
    excerpt: "Cybersecurity best practices for protecting your organization's digital assets.",
    content: [
      "In today's interconnected world, cybersecurity is not just an IT concern—it's a business imperative. As organizations increasingly rely on digital infrastructure, the need for robust security measures has never been more critical.",
      "This guide explores essential cybersecurity practices that every organization should implement to protect their digital assets and maintain customer trust.",
      "## Understanding the Threat Landscape",
      "Cyber threats are evolving at an unprecedented pace. From sophisticated ransomware attacks to social engineering schemes, organizations face a wide range of security challenges. Understanding these threats is the first step toward effective protection.",
      "Ethiopian businesses are not immune to these global threats. In fact, as the country's digital ecosystem grows, it becomes an increasingly attractive target for cybercriminals. Organizations must be proactive in their security approach.",
      "## Essential Security Measures",
      "**Multi-Factor Authentication (MFA)**: Implementing MFA across all systems significantly reduces the risk of unauthorized access. Even if passwords are compromised, the additional authentication layer provides protection.",
      "**Regular Security Audits**: Conducting periodic security assessments helps identify vulnerabilities before they can be exploited. This includes both technical assessments and policy reviews.",
      "**Employee Training**: Human error remains one of the biggest security vulnerabilities. Regular training programs help employees recognize and respond to potential threats.",
      "**Data Encryption**: Encrypting sensitive data both at rest and in transit ensures that even if data is intercepted, it remains unreadable to unauthorized parties.",
      "## Building a Security Culture",
      "Effective cybersecurity goes beyond tools and technologies—it requires building a security-conscious culture throughout the organization. This means making security everyone's responsibility, from the C-suite to entry-level employees.",
      "Leadership must champion security initiatives and provide the resources needed for effective implementation. When security is treated as a priority at the highest levels, it becomes embedded in organizational DNA.",
      "## Incident Response Planning",
      "Despite best efforts, security incidents can occur. Having a well-documented incident response plan ensures that your organization can respond quickly and effectively when threats are detected.",
      "The plan should outline roles and responsibilities, communication protocols, and steps for containment and recovery. Regular drills help ensure that team members are prepared to execute the plan under pressure.",
      "## Conclusion",
      "Building secure digital infrastructure is an ongoing journey, not a destination. As threats evolve, so must your security measures. By implementing these best practices and maintaining vigilance, organizations can significantly reduce their risk exposure and protect their most valuable digital assets."
    ],
    category: "Technology",
    author: "Daniel Abebe",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    authorBio: "Head of Cybersecurity at Digital Addis. Certified security professional with expertise in enterprise security architecture.",
    date: "March 10, 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1600",
    tags: ["Cybersecurity", "Infrastructure", "Best Practices", "Security"],
    relatedPosts: [
      { id: 1, title: "The Future of AI in Ethiopian Business", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400", category: "Technology" },
      { id: 4, title: "Cloud Migration Strategies", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400", category: "Development" },
      { id: 7, title: "Digital Transformation Lessons", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400", category: "Insights" },
    ],
  },
  "3": {
    title: "Design Thinking: Transforming UX in East Africa",
    excerpt: "How design thinking principles create intuitive digital products.",
    content: [
      "Design thinking has revolutionized how we approach product development, placing users at the center of every decision. In East Africa, this methodology is helping create digital products that truly resonate with local users.",
      "This article explores how design thinking principles can transform user experience design and lead to more successful digital products.",
      "## What is Design Thinking?",
      "Design thinking is a human-centered approach to innovation that draws from the designer's toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success.",
      "The methodology consists of five stages: Empathize, Define, Ideate, Prototype, and Test. Each stage builds upon the previous one, creating a comprehensive framework for problem-solving.",
      "## Applying Design Thinking in East Africa",
      "**Understanding Local Context**: Successful design in East Africa requires deep understanding of local culture, infrastructure, and user behavior. This means going beyond assumptions and conducting genuine user research.",
      "**Mobile-First Design**: With high mobile penetration rates, designing for mobile isn't optional—it's essential. Design thinking helps create mobile experiences that work within local constraints like varying network conditions.",
      "**Inclusive Design**: Design thinking encourages creating products accessible to all users, including those with disabilities or limited technical literacy. This is particularly important in diverse markets.",
      "## Case Study: A Banking App Redesign",
      "We recently applied design thinking to redesign a mobile banking app for an Ethiopian financial institution. The process began with extensive user research, including interviews with customers across different demographics.",
      "Key insights emerged: users wanted simpler navigation, vernacular language options, and offline capabilities. The redesigned app addressed these needs, resulting in a 40% increase in user engagement.",
      "## Overcoming Challenges",
      "Implementing design thinking isn't without challenges. Limited resources, tight timelines, and organizational resistance can all pose obstacles. However, even small steps toward user-centered design can yield significant results.",
      "Start by incorporating user research into your existing process. Even informal conversations with users can provide valuable insights that improve your products.",
      "## The Impact",
      "Organizations that embrace design thinking consistently create better products. They reduce development costs by identifying issues early, increase customer satisfaction, and build stronger brand loyalty.",
      "As East Africa's digital ecosystem continues to mature, design thinking will play an increasingly important role in creating products that truly serve local needs while meeting global standards of excellence."
    ],
    category: "Design",
    author: "Sara Tesfaye",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    authorBio: "Lead UX Designer at Digital Addis. Passionate about creating user-centered designs that solve real problems.",
    date: "March 5, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=1600",
    tags: ["Design Thinking", "UX Design", "Product Design", "East Africa"],
    relatedPosts: [
      { id: 6, title: "Creating Accessible Digital Products", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400", category: "Design" },
      { id: 1, title: "The Future of AI in Ethiopian Business", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400", category: "Technology" },
      { id: 5, title: "The Rise of Fintech in Ethiopia", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=400", category: "Business" },
    ],
  },
};

export default function BlogPostPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const postId = params.id as string;
  const post = blogPostsData[postId];

  useEffect(() => {
    // Only run animation if post exists and heroRef is available
    if (!post || !heroRef.current) return;
    
    // Small delay to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const elements = heroRef.current?.querySelectorAll(".blog-post-reveal");
        if (elements && elements.length > 0) {
          gsap.from(elements, {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          });
        }
      }, heroRef);
      return () => ctx.revert();
    }, 50);
    
    return () => clearTimeout(timer);
  }, [postId, post]);

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Article Not Found</h1>
            <Link href="/blog" className="text-lime hover:underline">
              Back to Blog
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
      <section ref={heroRef} className="relative min-h-[60vh] lg:min-h-[75vh] bg-black text-white flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 w-full">
          {/* Back Button */}
          <Link 
            href="/blog"
            className="blog-post-reveal inline-flex items-center gap-2 text-white/60 hover:text-lime text-sm font-bold uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="blog-post-reveal flex items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-lime text-black rounded-full text-xs font-bold uppercase">
              {post.category}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} read
            </span>
          </div>
          
          <h1 className="blog-post-reveal text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-[900] leading-[1.05] tracking-tight mb-8 max-w-3xl">
            {post.title}
          </h1>
          
          <div className="blog-post-reveal flex items-center gap-4">
            <img 
              src={post.authorImage} 
              alt={post.author}
              className="w-14 h-14 rounded-full object-cover border-2 border-lime"
            />
            <div>
              <p className="text-white font-bold text-lg">{post.author}</p>
              <p className="text-white/50 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <ScrollReveal key={index} delay={index * 0.02}>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-12 mb-6">
                      {paragraph.replace('## ', '')}
                    </h2>
                  </ScrollReveal>
                );
              }
              if (paragraph.startsWith('**') && paragraph.includes('**:')) {
                const parts = paragraph.split('**:');
                const title = parts[0].replace('**', '');
                const content = parts[1];
                return (
                  <ScrollReveal key={index} delay={index * 0.02}>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      <strong className="text-black">{title}:</strong>{content}
                    </p>
                  </ScrollReveal>
                );
              }
              return (
                <ScrollReveal key={index} delay={index * 0.02}>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Tags */}
          <ScrollReveal className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm font-bold hover:bg-lime transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* Share */}
          <ScrollReveal className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="font-bold uppercase tracking-wider text-sm text-gray-500">Share this article</p>
              <div className="flex gap-3">
                <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-lime transition-colors group">
                  <Twitter className="w-5 h-5 text-gray-600 group-hover:text-black" />
                </button>
                <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-lime transition-colors group">
                  <Facebook className="w-5 h-5 text-gray-600 group-hover:text-black" />
                </button>
                <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-lime transition-colors group">
                  <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-black" />
                </button>
                <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-lime transition-colors group">
                  <Share2 className="w-5 h-5 text-gray-600 group-hover:text-black" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <img 
                  src={post.authorImage} 
                  alt={post.author}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-lime"
                />
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Written by</p>
                  <h3 className="text-2xl font-black mb-3">{post.author}</h3>
                  <p className="text-gray-600 leading-relaxed">{post.authorBio}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="text-[2rem] md:text-[3rem] font-[900] leading-[0.95] tracking-tighter uppercase text-center">
              Related <span className="text-lime italic">Articles</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            {post.relatedPosts.map((related, index) => (
              <ScrollReveal key={related.id} delay={index * 0.1}>
                <Link href={`/blog/${related.id}`} className="group block">
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={related.image} 
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-lime text-black rounded-full text-xs font-bold">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-lime transition-colors leading-snug">
                    {related.title}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[2rem] md:text-[3.5rem] font-[900] leading-[0.95] tracking-tighter uppercase mb-6">
              Stay <span className="text-lime italic">Updated</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest insights on technology, design, and digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/10 rounded-full py-4 px-6 text-white placeholder:text-white/30 focus:outline-none focus:border-lime/50 transition-colors"
              />
              <button className="bg-lime text-black px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider hover:bg-white transition-colors">
                Subscribe
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
