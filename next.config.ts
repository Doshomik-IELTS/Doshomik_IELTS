import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow serving static HTML files alongside the app router
  outputFileTracingIncludes: {
    "/*": ["./public/**/*"],
  },
};

export default nextConfig;
