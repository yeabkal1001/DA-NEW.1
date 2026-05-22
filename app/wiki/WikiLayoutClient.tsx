'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Folder, FileText, Search, Menu, X } from 'lucide-react';
import { WikiCategory, WikiArticle } from '@/src/lib/wiki';
import WikiSearch from '@/src/components/WikiSearch';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface WikiLayoutClientProps {
  wikiStructure: WikiCategory;
  flatArticles: WikiArticle[];
  children: React.ReactNode;
}

export default function WikiLayoutClient({
  wikiStructure,
  flatArticles,
  children,
}: WikiLayoutClientProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on navigation
  useEffect(() => {
    const handle = setTimeout(() => {
      setIsMobileSidebarOpen(false);
    }, 0);
    return () => clearTimeout(handle);
  }, [pathname]);

  // Handle global key shortcut (Cmd+K / Ctrl+K or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isArticleActive = (slug: string) => {
    const activeSlug = pathname.replace(/^\/wiki\/?/, '');
    return activeSlug === slug;
  };

  // Render Category Navigation Tree
  const renderCategory = (category: WikiCategory, depth = 0) => {
    return (
      <div key={category.slug || 'root'} className="space-y-1.5">
        {category.name !== 'Project Documentation' && (
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-wider text-muted-foreground uppercase",
              depth > 0 && "ml-2"
            )}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>{category.name}</span>
          </div>
        )}

        {/* Articles in this Category */}
        <div className={cn("space-y-0.5", category.name !== 'Project Documentation' && "border-l border-border/60 ml-4 pl-2")}>
          {category.articles.map(article => {
            const active = isArticleActive(article.slug);
            return (
              <Link
                key={article.slug}
                href={`/wiki/${article.slug}`}
                className={cn(
                  "group flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 w-full text-left",
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground/75 hover:text-foreground hover:bg-muted"
                )}
              >
                <FileText className={cn("w-3.5 h-3.5 shrink-0", active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                <span className="truncate">{article.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Subcategories */}
        {category.subcategories.map(sub => renderCategory(sub, depth + 1))}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-16">
      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden flex items-center justify-between border border-border/80 bg-background/60 backdrop-blur-md rounded-full px-4 py-2.5 shadow-xl">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground px-2 py-1 rounded-md hover:bg-muted"
        >
          <Menu className="w-4 h-4 text-primary" />
          <span>Docs Menu</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
          <kbd className="border border-border/60 bg-muted px-1.5 py-0.5 rounded text-[8px] tracking-normal shadow-sm">
            /
          </kbd>
        </button>
      </div>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-[110] lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="relative w-full max-w-[280px] bg-background border-r border-border h-full flex flex-col p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-foreground">Wiki</span>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search trigger inside drawer */}
              <button
                onClick={() => {
                  setIsMobileSidebarOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center justify-between border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground mb-6 hover:bg-muted transition-colors w-full"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" />
                  <span>Search docs...</span>
                </div>
                <kbd className="border border-border/60 bg-muted px-1 rounded text-[8px] tracking-normal">
                  /
                </kbd>
              </button>

              {/* Navigation tree */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-6 scrollbar-hide">
                {renderCategory(wikiStructure)}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Permanent Sidebar */}
      <aside className="hidden lg:block w-[280px] shrink-0 sticky top-[6.5rem] max-h-[calc(100vh-8.5rem)] flex flex-col">
        {/* Search trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center justify-between border border-border/80 bg-background/50 hover:bg-muted/50 rounded-xl px-4 py-3 text-xs text-muted-foreground mb-6 hover:border-foreground/20 transition-all duration-300 w-full group shadow-md"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="group-hover:text-foreground transition-colors">Search documentation...</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="border border-border/60 bg-muted px-1.5 py-0.5 rounded text-[8px] tracking-normal font-sans shadow-sm">
              Ctrl
            </kbd>
            <kbd className="border border-border/60 bg-muted px-1.5 py-0.5 rounded text-[8px] tracking-normal font-sans shadow-sm">
              K
            </kbd>
          </div>
        </button>

        {/* Scrollable Tree */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-hide border-r border-border/30">
          <div className="flex items-center gap-2 px-3 text-xs font-black uppercase tracking-[0.2em] text-foreground mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Navigation</span>
          </div>
          {renderCategory(wikiStructure)}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        {children}
      </main>

      {/* Global Search Dialog overlay */}
      <WikiSearch
        articles={flatArticles}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
