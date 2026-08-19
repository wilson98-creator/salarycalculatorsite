/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
