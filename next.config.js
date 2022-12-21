const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  register: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
