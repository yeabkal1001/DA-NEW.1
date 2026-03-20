/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Cache images more aggressively
    minimumCacheTTL: 60,
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
  },

  // Header optimization for gzip/brotli
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Experimental features for better performance (Next.js 16+)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Turbopack configuration for Next.js 16
  turbopack: {},
};

export default nextConfig
