/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // something about this screws up openlayers
  swcMinify: false,
};

module.exports = nextConfig
