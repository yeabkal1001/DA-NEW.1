'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { WikiArticle } from '@/src/lib/wiki';
import WikiSearch from '@/src/components/WikiSearch';

interface WikiDashboardClientProps {
  articles: WikiArticle[];
}

export default function WikiDashboardClient({ articles }: WikiDashboardClientProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Input Box */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="w-full flex items-center justify-between border border-border bg-background/50 hover:bg-muted/40 hover:border-primary/20 rounded-2xl px-5 py-4 text-sm text-muted-foreground transition-all duration-300 shadow-md group"
      >
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          <span className="text-left text-muted-foreground group-hover:text-foreground/80 transition-colors">
            Type `/` or click here to search repository documentation...
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <kbd className="border border-border bg-muted px-2 py-0.5 rounded text-[10px] tracking-normal font-sans shadow-sm">
            Ctrl
          </kbd>
          <kbd className="border border-border bg-muted px-2 py-0.5 rounded text-[10px] tracking-normal font-sans shadow-sm">
            K
          </kbd>
        </div>
      </button>

      {/* Local search modal */}
      <WikiSearch
        articles={articles}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
