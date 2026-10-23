import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Serve Umami first-party from /stats.
  rewrites: () => [
    {
      source: '/stats/:match*',
      destination: 'https://analytics.rufusmai.com/:match*',
    },
  ],
};

export default nextConfig;
