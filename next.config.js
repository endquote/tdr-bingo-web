/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // something about this screws up openlayers
  // https://nextjs.org/docs/advanced-features/compiler#minification
  swcMinify: false,
  experimental: {
    swcPlugins: [
      // https://jotai.org/docs/api/swc#swc-jotai-debug-label
      ["@swc-jotai/debug-label", {}],
      // https://jotai.org/docs/api/swc#swc-jotai-react-refresh
      ["@swc-jotai/react-refresh", {}],
    ],
  },
};

module.exports = nextConfig
