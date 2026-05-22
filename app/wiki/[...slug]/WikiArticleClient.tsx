'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, ArrowRight, Hash } from 'lucide-react';
import { WikiArticle } from '@/src/lib/wiki';
import { cn } from '@/lib/utils';

interface TOCItem {
  text: string;
  id: string;
  level: number;
}

interface WikiArticleClientProps {
  title: string;
  content: string;
  toc: TOCItem[];
  breadcrumbs: { name: string; link: string }[];
  nextArticle: WikiArticle | null;
  prevArticle: WikiArticle | null;
}

export default function WikiArticleClient({
  title,
  content,
  toc,
  breadcrumbs,
  nextArticle,
  prevArticle,
}: WikiArticleClientProps) {
  const [activeId, setActiveId] = useState('');

  // Scroll active section tracking in TOC
  useEffect(() => {
    const headingElements = toc.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for navbar and breathing room

      // Find which heading is currently active
      let currentActiveId = '';
      for (const el of headingElements) {
        if (el.offsetTop <= scrollPosition) {
          currentActiveId = el.id;
        } else {
          break;
        }
      }

      // If scroll position is near top, default to first item
      if (window.scrollY < 100 && toc.length > 0) {
        currentActiveId = toc[0].id;
      }

      if (currentActiveId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  // Inject Copy-to-Clipboard buttons into all pre/code blocks
  useEffect(() => {
    const preBlocks = document.querySelectorAll('.wiki-content pre');
    
    preBlocks.forEach((pre, _index) => {
      // Avoid duplicate injections
      if (pre.querySelector('.copy-code-btn')) return;

      pre.classList.add('relative', 'group/pre');

      const button = document.createElement('button');
      button.className = 'copy-code-btn absolute top-3 right-3 p-1.5 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 opacity-0 group-hover/pre:opacity-100 focus:opacity-100 transition-all duration-200 z-10';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      
      // Render simple copy SVG icon
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      `;

      button.addEventListener('click', async () => {
        const codeElement = pre.querySelector('code');
        if (codeElement) {
          const text = codeElement.innerText;
          try {
            await navigator.clipboard.writeText(text);
            
            // Temporary copy success indicator
            button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><path d="M20 6 9 17l-5-5"/></svg>
            `;
            button.classList.add('border-primary/30');

            setTimeout(() => {
              button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              `;
              button.classList.remove('border-primary/30');
            }, 2000);
          } catch (err) {
            console.error('Failed to copy text: ', err);
          }
        }
      });

      pre.appendChild(button);
    });
  }, [content]);

  const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
      // Flash animation on the header
      el.classList.add('header-highlight');
      setTimeout(() => el.classList.remove('header-highlight'), 2000);
      // Set hash manually
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">
      {/* Article Content Area */}
      <div className="flex-1 min-w-0 w-full space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
          <Link href="/wiki" className="hover:text-foreground transition-colors">
            WIKI
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.link}>
              <ChevronRight className="w-3 h-3 text-muted-foreground/50 shrink-0" />
              <Link
                href={crumb.link}
                className={
                  idx === breadcrumbs.length - 1
                    ? 'text-primary font-bold'
                    : 'hover:text-foreground transition-colors'
                }
              >
                {crumb.name}
              </Link>
            </React.Fragment>
          ))}
        </nav>

        {/* Title Block */}
        <div className="space-y-3 border-b border-border/60 pb-6">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-[1.1]">
            {title}
          </h1>
        </div>

        {/* Parsed Markdown HTML */}
        <article
          className="wiki-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Footer Navigation Panel */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-border/80 pt-8 mt-12">
          {prevArticle ? (
            <Link
              href={`/wiki/${prevArticle.slug}`}
              className="w-full sm:w-auto group flex flex-col gap-1.5 border border-border/80 bg-background/50 hover:bg-muted/40 hover:border-primary/20 rounded-xl px-5 py-4 text-left transition-all duration-300 shadow-sm"
            >
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <ArrowLeft className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                Previous Chapter
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors truncate max-w-[200px]">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextArticle ? (
            <Link
              href={`/wiki/${nextArticle.slug}`}
              className="w-full sm:w-auto group flex flex-col gap-1.5 border border-border/80 bg-background/50 hover:bg-muted/40 hover:border-primary/20 rounded-xl px-5 py-4 text-right items-end transition-all duration-300 shadow-sm"
            >
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                Next Chapter
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors truncate max-w-[200px]">
                {nextArticle.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </div>

      {/* Sticky Table of Contents (TOC) Desktop Sidebar */}
      {toc.length > 0 && (
        <aside className="hidden xl:block w-[240px] shrink-0 sticky top-[6.5rem] max-h-[calc(100vh-8.5rem)] overflow-y-auto pl-4 border-l border-border/30 scrollbar-hide py-1">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-primary" />
            <span>On This Page</span>
          </div>

          <ul className="space-y-2.5">
            {toc.map(item => {
              const active = item.id === activeId;
              return (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
                  className="list-none"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={e => handleTOCClick(e, item.id)}
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider transition-all duration-300 block text-left",
                      active
                        ? "text-primary translate-x-1"
                        : "text-muted-foreground hover:text-foreground hover:translate-x-0.5"
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      )}
    </div>
  );
}
