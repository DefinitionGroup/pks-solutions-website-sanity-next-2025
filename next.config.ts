import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output:'export',
    distDir: 'pks001',
    basePath: '/pks001',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname:'images.unsplash.com'
        },
      ],
    },

};

export default nextConfig;
