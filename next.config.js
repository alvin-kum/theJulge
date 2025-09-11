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
      // 실제 사용하는 외부 이미지 호스트가 있으면 여기에 추가
      // 예) { protocol: "https", hostname: "images.example.com" },
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
