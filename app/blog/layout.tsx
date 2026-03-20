import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest insights on technology, design, and digital transformation from Digital Addis experts. Stay updated with trends in AI, cybersecurity, cloud computing, and more.",
  keywords: [
    "tech blog Ethiopia",
    "digital transformation insights",
    "cybersecurity articles",
    "software development tips",
    "AI in Africa",
    "fintech Ethiopia",
    "UX design blog"
  ],
  openGraph: {
    title: "Blog & Insights | Digital Addis",
    description: "Expert insights on technology, design, and digital transformation from Ethiopia's leading digital agency.",
    url: "https://digitaladdis.com/blog",
    images: [{ url: "/og-blog.jpg", width: 1200, height: 630, alt: "Digital Addis Blog" }],
  },
  twitter: {
    title: "Blog & Insights | Digital Addis",
    description: "Expert insights on technology, design, and digital transformation.",
  },
  alternates: {
    canonical: "https://digitaladdis.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
