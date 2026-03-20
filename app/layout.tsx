import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ErrorBoundary } from "@/src/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Digital Addis",
  description: "Digital Addis - Creative Digital Agency",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: "#CCFF00",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Digital Addis",
    description: "Digital Addis - Creative Digital Agency",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#CCFF00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://vgdhkdqepaxaupyqhqun.supabase.co" />
        <link rel="dns-prefetch" href="https://vgdhkdqepaxaupyqhqun.supabase.co" />
        
        {/* Prefetch critical font */}
        <link
          rel="preload"
          href="/dalogo.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
