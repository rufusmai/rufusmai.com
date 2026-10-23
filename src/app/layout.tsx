import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';

import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Rufus Maiwald',
    template: '%s - Rufus Maiwald',
  },
  description: 'Rufus Maiwald Softwareentwicklung',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <Script
        defer
        src="/stats/script.js"
        data-website-id="1d1ae607-8a41-427e-b78f-028b000d5461"
        data-domains="rufusmai.com"
      />
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'flex min-h-screen flex-col antialiased'
        )}
      >
        <main className="flex grow flex-col">{children}</main>
      </body>
    </html>
  );
}
