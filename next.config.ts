import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'work-test-web-2024-eze6j4scpq-lz.a.run.app',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
