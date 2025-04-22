import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  // assetPrefix: '/pks001',
  // basePath: '/pks001',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Add Cloudinary if you use it for Sanity images
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Keep if you use Cloudinary directly
      },
    ],
  },
};

export default nextConfig;
