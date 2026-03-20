import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Digital Addis portfolio of successful projects spanning web development, mobile apps, enterprise solutions, and digital transformation across Ethiopia and Africa.",
  keywords: [
    "software projects Ethiopia",
    "web development portfolio",
    "mobile app case studies",
    "enterprise solutions",
    "digital transformation projects",
    "Ethiopian tech projects"
  ],
  openGraph: {
    title: "Our Projects | Digital Addis Portfolio",
    description: "Explore 120+ successful projects delivered across banking, government, healthcare, and more.",
    url: "https://digitaladdis.com/projects",
    images: [{ url: "/og-projects.jpg", width: 1200, height: 630, alt: "Digital Addis Projects" }],
  },
  twitter: {
    title: "Our Projects | Digital Addis Portfolio",
    description: "Explore our portfolio of 120+ successful digital projects across various industries.",
  },
  alternates: {
    canonical: "https://digitaladdis.com/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
