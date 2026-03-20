import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Digital Addis - Ethiopia's leading digital agency with 10+ years of experience delivering innovative software solutions, cybersecurity services, and digital transformation.",
  keywords: [
    "about Digital Addis",
    "Ethiopian tech company",
    "software development team",
    "digital agency history",
    "IT company Ethiopia"
  ],
  openGraph: {
    title: "About Digital Addis | Our Story & Mission",
    description: "Discover how Digital Addis has been transforming businesses across Ethiopia with innovative digital solutions for over a decade.",
    url: "https://digitaladdis.com/about",
    images: [{ url: "/og-about.jpg", width: 1200, height: 630, alt: "About Digital Addis" }],
  },
  twitter: {
    title: "About Digital Addis | Our Story & Mission",
    description: "Discover how Digital Addis has been transforming businesses across Ethiopia with innovative digital solutions.",
  },
  alternates: {
    canonical: "https://digitaladdis.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
