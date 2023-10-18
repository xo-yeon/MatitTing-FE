/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["k.kakaocdn.net", "ssl.pstatic.net"],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    KAKAO_KEY: process.env.KAKAO_KEY,
    KAKAO_RESTAPI_KEY: process.env.KAKAO_RESTAPI_KEY,
  },
  images: {
    domains: ["cdn.pixabay.com"],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
