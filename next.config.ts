import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.1.27',
    '192.168.1.28',
    '192.168.1.*',
    '192.168.*.*',
    'localhost:3000',
    '192.168.1.27:3000',
    'localhost',
    '127.0.0.1',
    '172.20.10.3',
    '172.20.10.*',
  ],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'gsap',
      'lenis',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
