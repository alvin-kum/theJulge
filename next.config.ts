import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // styled-components SSR/SWC 지원
  },
};

export default nextConfig;
