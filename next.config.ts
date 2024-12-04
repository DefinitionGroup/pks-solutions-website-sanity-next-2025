import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // output: 'export',
    // assetPrefix: '/pks001',
    // basePath: '/pks001',
    images: { unoptimized: true ,
      remotePatterns: [
        {
          protocol: 'https',
          hostname:'images.unsplash.com'
        },
      ],
    },

};

export default nextConfig;
