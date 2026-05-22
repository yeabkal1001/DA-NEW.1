import React from 'react';
import { notFound } from 'next/navigation';
import { getWikiArticle } from '@/src/lib/wiki';
import WikiArticleClient from '@/app/wiki/[...slug]/WikiArticleClient';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const articleData = getWikiArticle(slug);
  
  if (!articleData) {
    return {
      title: 'Not Found - Digital Addis Wiki',
    };
  }

  return {
    title: `${articleData.title} - Digital Addis Wiki`,
    description: `Structured repo documentation for ${articleData.title} under the Digital Addis workspace.`,
  };
}

export default async function WikiArticlePage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const articleData = getWikiArticle(slug);

  if (!articleData) {
    notFound();
  }

  return (
    <WikiArticleClient
      title={articleData.title}
      content={articleData.content}
      toc={articleData.toc}
      breadcrumbs={articleData.breadcrumbs}
      nextArticle={articleData.nextArticle}
      prevArticle={articleData.prevArticle}
    />
  );
}
