'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, CornerDownLeft, X } from 'lucide-react';
import { WikiArticle } from '@/src/lib/wiki';
import { AnimatePresence, motion } from 'framer-motion';

interface WikiSearchProps {
  articles: WikiArticle[];
  isOpen: boolean;
  onClose: () => void;
}

export default function WikiSearch({ articles, isOpen, onClose }: WikiSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (isOpen) {
      const handle = setTimeout(() => {
        inputRef.current?.focus();
        setQuery('');
        setSelectedIndex(0);
      }, 50);
      return () => clearTimeout(handle);
    }
  }, [isOpen]);

  // Handle global shortcut (Cmd+K / Ctrl+K) and Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter articles based on query
  const filteredArticles = articles.filter(article => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return false; // Show nothing or empty list if no query
    return (
      article.title.toLowerCase().includes(cleanQuery) ||
      article.slug.toLowerCase().includes(cleanQuery)
    );
  });

  // Use all articles as fallback if no search query typed yet
  const displayArticles = query ? filteredArticles : articles.slice(0, 5);

  // Handle arrow key and Enter navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (displayArticles.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % displayArticles.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + displayArticles.length) % displayArticles.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectArticle(displayArticles[selectedIndex]);
    }
  };

  const selectArticle = (article: WikiArticle) => {
    router.push(`/wiki/${article.slug}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            ref={containerRef}
            className="relative w-full max-w-xl mx-4 overflow-hidden border bg-background border-border rounded-xl shadow-2xl z-10"
          >
            {/* Header / Input */}
            <div className="flex items-center gap-3 px-4 border-b border-border py-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search documentation (e.g., getting started)..."
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm focus:outline-none placeholder-muted-foreground text-foreground"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-hide">
              {displayArticles.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                    {query ? 'Search Results' : 'Suggested Articles'}
                  </div>
                  {displayArticles.map((article, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={article.slug}
                        onClick={() => selectArticle(article)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-all duration-200 ${
                          isSelected
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
                            }`}
                          />
                          <span className="truncate">{article.title}</span>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-80 font-normal shrink-0">
                            <span>Select</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="w-8 h-8 text-muted-foreground opacity-50 mb-3" />
                  <p className="text-sm font-medium text-foreground">No results found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No articles match &quot;{query}&quot;. Try a different search term.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-2 bg-muted/30 text-[10px] text-muted-foreground">
              <div className="flex gap-4">
                <span>
                  <kbd className="border border-border bg-muted px-1.5 py-0.5 rounded text-[9px] shadow-sm mr-1">
                    ↑↓
                  </kbd>
                  to navigate
                </span>
                <span>
                  <kbd className="border border-border bg-muted px-1.5 py-0.5 rounded text-[9px] shadow-sm mr-1">
                    Enter
                  </kbd>
                  to select
                </span>
              </div>
              <span>
                <kbd className="border border-border bg-muted px-1.5 py-0.5 rounded text-[9px] shadow-sm mr-1">
                  Esc
                </kbd>
                to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
