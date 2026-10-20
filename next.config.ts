import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.102", "localhost", "127.0.0.1"],

  // Image optimization configuration (Optimized for Vercel limits & CPU efficiency)
  images: {
    // WebP only for fast encoding and lower serverless CPU compute
    formats: ["image/webp"],

    // Streamlined responsive image sizes to prevent exhausting the 5,000 monthly quota
    deviceSizes: [640, 1080, 1920],
    imageSizes:  [32, 64, 128, 256],

    // Cache optimized images on edge CDN for 30 days so they are never re-transformed repeatedly
    minimumCacheTTL: 2592000,

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

  compress: true,

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Cache lifetimes for static assets & fonts
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Route redirects for program aliases and tracking paths
  async redirects() {
    return [
      {
        source: "/full-stack-digital-creator-program",
        destination: "/programs/full-stack-creator",
        permanent: true,
      },
      {
        source: "/full-stack-creator",
        destination: "/programs/full-stack-creator",
        permanent: true,
      },
      {
        source: "/full-stack",
        destination: "/programs/full-stack-creator",
        permanent: true,
      },
      {
        source: "/90-days-graphic-design-mentorship",
        destination: "/programs/90-days-graphic-design",
        permanent: true,
      },
      {
        source: "/graphic-design",
        destination: "/programs/90-days-graphic-design",
        permanent: true,
      },
      {
        source: "/workshop",
        destination: "/programs/3-hours-live-workshop",
        permanent: true,
      },
      {
        source: "/3-hours-live-workshop",
        destination: "/programs/3-hours-live-workshop",
        permanent: true,
      },
      {
        source: "/live-workshop",
        destination: "/programs/3-hours-live-workshop",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
