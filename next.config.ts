import type { NextConfig } from 'next';

// Static export: the site is plain HTML/CSS/JS and runs on any host
// (Vercel, Netlify, cPanel/DirectAdmin, S3). See README for deployment.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
