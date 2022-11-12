/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // something about this screws up openlayers
  // https://nextjs.org/docs/advanced-features/compiler#minification
  swcMinify: false,
};

module.exports = nextConfig
