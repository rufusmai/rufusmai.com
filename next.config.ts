import { withBotId } from 'botid/next/config';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Serve Umami first-party from /stats.
  rewrites: () => [
    {
      source: '/stats/:match*',
      destination: 'https://analytics.rufusmai.com/:match*',
    },
  ],
};

export default withBotId(withNextIntl(nextConfig));
