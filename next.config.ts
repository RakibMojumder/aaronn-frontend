import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com" },
      { hostname: "assets.aceternity.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
