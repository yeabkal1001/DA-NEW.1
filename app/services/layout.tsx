import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Digital Addis comprehensive digital services including custom software development, cybersecurity, cloud services, IoT solutions, digital consulting, and professional training.",
  keywords: [
    "software development services",
    "cybersecurity services Ethiopia",
    "cloud migration",
    "IoT solutions Africa",
    "digital consulting",
    "IT training Ethiopia",
    "enterprise software",
    "mobile app development"
  ],
  openGraph: {
    title: "Our Services | Digital Addis",
    description: "From custom software development to cybersecurity and cloud services, discover our full range of digital solutions.",
    url: "https://digitaladdis.com/services",
    images: [{ url: "/og-services.jpg", width: 1200, height: 630, alt: "Digital Addis Services" }],
  },
  twitter: {
    title: "Our Services | Digital Addis",
    description: "Custom software, cybersecurity, cloud services, and more. Discover our comprehensive digital solutions.",
  },
  alternates: {
    canonical: "https://digitaladdis.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
