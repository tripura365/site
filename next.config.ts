import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "news-provider-bucket.s3.ap-south-1.amazonaws.com" },
      { hostname: "img.youtube.com" },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 8,
  },
};

export default nextConfig;
