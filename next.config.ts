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
  ],
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85, 90, 100],
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
