/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Visual baselines are captured against the dev server; the dev-tools
  // indicator is tooling UI, not the site, and must not appear in them.
  devIndicators: false
};

export default nextConfig;
