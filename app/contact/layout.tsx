import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Digital Addis. Start your digital transformation journey today. Contact us for software development, cybersecurity, cloud services, and digital consulting.",
  keywords: [
    "contact Digital Addis",
    "hire software developers Ethiopia",
    "IT consulting inquiry",
    "digital agency contact",
    "get quote software development"
  ],
  openGraph: {
    title: "Contact Us | Digital Addis",
    description: "Ready to transform your digital presence? Get in touch with our team and start your project today.",
    url: "https://digitaladdis.com/contact",
    images: [{ url: "/og-contact.jpg", width: 1200, height: 630, alt: "Contact Digital Addis" }],
  },
  twitter: {
    title: "Contact Us | Digital Addis",
    description: "Ready to transform your digital presence? Get in touch with our team today.",
  },
  alternates: {
    canonical: "https://digitaladdis.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
