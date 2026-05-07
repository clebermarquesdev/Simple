import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // Fallback offline route
  fallbacks: {
    document: "/~offline",
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
};

export default withPWA(nextConfig);
