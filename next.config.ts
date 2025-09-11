import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // styled-components SSR/SWC 지원
  },
  images: {
    domains: [
      "placehold.co", 
      "test.com", 
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 🚨 ESLint 에러 무시
  },
  typescript: {
    ignoreBuildErrors: true, // 🚨 타입 에러 무시
  },
};

export default nextConfig;
