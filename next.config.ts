import type { NextConfig } from "next";

// GitHub Pages serves this repo at /portfolio-nxt-app. Override with
// NEXT_PUBLIC_BASE_PATH="" if the site ever moves to a root domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio-nxt-app";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
