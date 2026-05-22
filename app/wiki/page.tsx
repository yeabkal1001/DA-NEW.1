import React from 'react';
import Link from 'next/link';
import { getWikiStructure, flattenWikiArticles } from '@/src/lib/wiki';
import { Compass, Terminal, Cpu, Zap, ArrowRight } from 'lucide-react';
import WikiDashboardClient from '@/app/wiki/WikiDashboardClient';

export default async function WikiDashboard() {
  const wikiStructure = getWikiStructure();
  const flatArticles = flattenWikiArticles(wikiStructure);

  // Compute repository stats dynamically
  const totalArticles = flatArticles.length;
  const categoriesCount = wikiStructure.subcategories.length;

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-12">
      {/* Intro Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-[0.2em] text-primary">
          <Zap className="w-3.5 h-3.5" />
          <span>Agency Repo Knowledge</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-[1.1]">
          Digital Addis <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
            Repository Wiki
          </span>
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Welcome to the centralized internal documentation viewer for the Digital Addis workspace.
          This wiki is dynamically synchronized with the codebase to help you quickly understand 
          architecture, design systems, layouts, and animations.
        </p>
      </div>

      {/* Interactive dashboard search & actions wrapper */}
      <WikiDashboardClient articles={flatArticles} />

      {/* Quick Navigation Cards */}
      <div className="space-y-6">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
          Explore Core Categories
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/wiki/getting-started"
            className="group block border border-border/80 bg-background/50 hover:bg-muted/40 rounded-xl p-6 transition-all duration-300 hover:border-primary/30 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-primary/15 text-primary w-fit">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                  Getting Started
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  Set up your local workspace, configure environments, run dev scripts, and prepare for high-performance builds.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link
            href="/wiki/project-overview"
            className="group block border border-border/80 bg-background/50 hover:bg-muted/40 rounded-xl p-6 transition-all duration-300 hover:border-primary/30 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-primary/15 text-primary w-fit">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                  Project Overview
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  Understand our brand identity, client target demographics, Ethiopia-centric digital design values, and product goals.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link
            href="/wiki/architecture-overview"
            className="group block border border-border/80 bg-background/50 hover:bg-muted/40 rounded-xl p-6 transition-all duration-300 hover:border-primary/30 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-primary/15 text-primary w-fit">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                  Architecture Overview
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  Explore dynamic App Router components, GSAP animation states, state models, and optimization mechanisms.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          <Link
            href="/wiki/animation-system"
            className="group block border border-border/80 bg-background/50 hover:bg-muted/40 rounded-xl p-6 transition-all duration-300 hover:border-primary/30 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-primary/15 text-primary w-fit">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                  Animation System
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  Deep-dive into GSAP timelines, ScrollTrigger contexts, custom React lifecycle managers, and CPU/memory safeguards.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>

      {/* Workspace Stats Panel */}
      <div className="border border-border/80 bg-muted/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between shadow-sm">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Knowledge Base Metrics
          </h3>
          <p className="text-xs text-muted-foreground">
            Automatically parsed files and structures currently tracked from the `.antigravity` repowiki sync.
          </p>
        </div>

        <div className="flex gap-8 md:gap-16">
          <div className="text-center">
            <div className="text-3xl font-black text-primary">{totalArticles}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Chapters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-primary">{categoriesCount}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-primary">EN</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Language</div>
          </div>
        </div>
      </div>
    </div>
  );
}
