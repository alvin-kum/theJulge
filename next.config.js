/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    // ✅ Next 15 권장: domains → remotePatterns
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "test.com" },
      { protocol: "https", hostname: "bootcamp-project-api.s3.ap-northeast-2.amazonaws.com" },
      // 필요하다면 다른 S3 버킷이나 CDN 호스트도 여기에 추가
      // 예) { protocol: "https", hostname: "**.s3.ap-northeast-2.amazonaws.com" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
