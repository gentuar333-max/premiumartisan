import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lfawgdcgvpwbpiyftcfk.supabase.co",
      },
    ],
  },
};

export default nextConfig;