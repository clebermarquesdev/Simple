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
};

// Em ambiente de desenvolvimento, exportamos apenas a configuração limpa do Next.js.
// Isso evita que o plugin PWA entre em conflito com o Turbopack, o que causa os reloads e panics.
export default process.env.NODE_ENV === "development" ? nextConfig : withPWA(nextConfig);
