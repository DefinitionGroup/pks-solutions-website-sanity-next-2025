import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  // Configure webpack to handle the get-it package
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      setImmediate: false,
    };
    return config;
  },
};

export default nextConfig;
