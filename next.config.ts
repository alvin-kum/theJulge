import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // styled-components SSR/SWC 지원
  },
  images: {
    domains: [
      "placehold.co", // placeholder 이미지
      "test.com", // Unsplash 같은 외부 이미지
      // 필요한 도메인 추가
    ],
  },
};

export default nextConfig;
