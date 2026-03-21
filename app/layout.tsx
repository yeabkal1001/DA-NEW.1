import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ErrorBoundary } from "@/src/components/ErrorBoundary";
import { PageLoader } from "@/src/components/PageLoader";
import { ThemeProvider } from "@/src/components/theme-provider";
import { cn } from "@/src/lib/utils";

const sans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap"
});

const moonWalk = localFont({
  src: "../public/fonts/Moon Walk Font/Moon Walk.otf",
  variable: "--font-moonwalk",
});

// Enhanced SEO metadata for the entire site
export const metadata: Metadata = {
  metadataBase: new URL('https://digitaladdis.com'),
  title: {
    default: "Digital Addis | Leading Digital Agency in Ethiopia",
    template: "%s | Digital Addis"
  },
  description: "Digital Addis is Ethiopia's premier digital agency specializing in custom software development, cybersecurity, cloud services, and digital transformation solutions.",
  keywords: [
    "digital agency Ethiopia",
    "software development Addis Ababa",
    "cybersecurity Ethiopia",
    "cloud services Africa",
    "web development Ethiopia",
    "mobile app development",
    "digital transformation",
    "IT consulting Ethiopia",
    "UI/UX design",
    "enterprise software"
  ],
  authors: [{ name: "Digital Addis", url: "https://digitaladdis.com" }],
  creator: "Digital Addis",
  publisher: "Digital Addis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digitaladdis.com",
    siteName: "Digital Addis",
    title: "Digital Addis | Leading Digital Agency in Ethiopia",
    description: "Ethiopia's premier digital agency specializing in custom software development, cybersecurity, cloud services, and digital transformation solutions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Addis - Creative Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Addis | Leading Digital Agency in Ethiopia",
    description: "Ethiopia's premier digital agency specializing in custom software development, cybersecurity, and digital transformation.",
    images: ["/og-image.jpg"],
    creator: "@digitaladdis",
  },
  alternates: {
    canonical: "https://digitaladdis.com",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital Addis",
  alternateName: "DA",
  url: "https://digitaladdis.com",
  logo: "https://digitaladdis.com/dalogo.webp",
  description: "Ethiopia's premier digital agency specializing in custom software development, cybersecurity, cloud services, and digital transformation solutions.",
  foundingDate: "2014",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Innovation Drive, Bole",
    addressLocality: "Addis Ababa",
    addressCountry: "Ethiopia"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+251-911-123-456",
    contactType: "customer service",
    email: "hello@digitaladdis.com",
    availableLanguage: ["English", "Amharic"]
  },
  sameAs: [
    "https://www.linkedin.com/company/digitaladdis",
    "https://twitter.com/digitaladdis",
    "https://www.facebook.com/digitaladdis"
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 9.0054,
      longitude: 38.7636
    },
    geoRadius: "5000"
  },
  knowsAbout: [
    "Software Development",
    "Cybersecurity",
    "Cloud Computing",
    "Digital Transformation",
    "UI/UX Design",
    "Mobile App Development"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch for third-party resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/dalogo.webp"
          as="image"
          type="image/webp"
        />
        
        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn("antialiased", sans.variable, moonWalk.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
