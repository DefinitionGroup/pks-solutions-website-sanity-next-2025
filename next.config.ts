import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    if (process.env.VERCEL_ENV !== 'preview' || process.env.PKS_CUSTOMER_PREVIEW !== '1') return [];
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
      ],
    }];
  },
  serverExternalPackages: ["get-it"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Enable React Strict Mode
  reactStrictMode: true,
};

export default nextConfig;
