import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Details",
  description: "Explore our project case study - see the challenges, solutions, and results of our digital transformation work.",
  openGraph: {
    type: "article",
    siteName: "Digital Addis",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
