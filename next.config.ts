import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.102", "localhost", "127.0.0.1"],

  // Image optimization configuration
  images: {
    // Supported formats for automatic optimization
    formats: ["image/avif", "image/webp"],

    // Responsive image sizes
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],

    // Allow local images from public/ and YouTube thumbnail CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },

  // Performance: experimental features
  experimental: {
    // Optimize CSS output
    optimizeCss: false,
  },

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
