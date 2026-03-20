import type { Metadata } from "next";

// Dynamic metadata will be generated in the page component using generateMetadata
export const metadata: Metadata = {
  title: "Blog Post",
  description: "Read insights on technology, design, and digital transformation from Digital Addis experts.",
  openGraph: {
    type: "article",
    siteName: "Digital Addis",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
