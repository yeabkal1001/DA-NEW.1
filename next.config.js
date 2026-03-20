/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Performance optimizations
  swcMinify: true,
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

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Logging configuration
  logging: {
    browserToTerminal: true,
  },

  // Enable React Compiler (Next.js 16+)
  reactCompiler: true,

  // Optimize webpack bundling
  webpack: (config, { isServer }) => {
    config.optimization.moduleIds = 'deterministic';
    
    if (!isServer) {
      config.optimization.runtimeChunk = 'single';
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            filename: 'chunks/vendor.js',
            chunks: 'all',
            reuseExistingChunk: true,
            priority: 20,
            reuseExistingChunk: true,
            enforce: true,
            test: /node_modules/,
          },
          // Common chunk
          common: {
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            filename: 'chunks/common.js',
          },
          // GSAP chunk
          gsap: {
            test: /[\\/]node_modules[\\/](gsap)[\\/]/,
            name: 'chunks/gsap',
            priority: 15,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
}

export default nextConfig
