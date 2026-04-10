import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que ESLint bloquee el build en Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Evita que errores de TypeScript bloqueen el build en Vercel
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        // Cubre public/**, sign/**, y render/**
        protocol: "https",
        hostname: "pevhwevmgixwepvguqwx.supabase.co",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
