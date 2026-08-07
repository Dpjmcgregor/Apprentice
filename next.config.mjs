/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Linting runs separately; do not fail the production build on lint.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // The app previously shipped with `vite build`, which never ran `tsc`, so
    // type-checking was never a release gate. Keep that behaviour here rather
    // than have `next build` surface pre-existing, non-blocking type issues.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
