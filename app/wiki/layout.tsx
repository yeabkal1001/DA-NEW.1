import React from 'react';
import { getWikiStructure, flattenWikiArticles } from '@/src/lib/wiki';
import { Navbar } from '@/components/Navbar';
import '@/app/wiki/wiki.css';
import WikiLayoutClient from '@/app/wiki/WikiLayoutClient';

export const metadata = {
  title: 'Digital Addis - Agency Repo Wiki',
  description: 'Structured documentation, architecture details, and technical references for the Digital Addis workspace.',
};

export default async function WikiLayout({ children }: { children: React.ReactNode }) {
  // Read wiki structure and flat list of articles on the server
  const wikiStructure = getWikiStructure();
  const flatArticles = flattenWikiArticles(wikiStructure);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Wiki Wrapper - Adds top spacing to clear fixed Navbar */}
      <div className="flex-1 pt-24 md:pt-28 max-w-[1400px] w-full mx-auto px-4 md:px-8">
        <WikiLayoutClient wikiStructure={wikiStructure} flatArticles={flatArticles}>
          {children}
        </WikiLayoutClient>
      </div>
    </div>
  );
}
