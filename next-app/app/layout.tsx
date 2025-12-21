import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import ThemeScript from '@/components/theme-script';

export const metadata: Metadata = {
  metadataBase: new URL('https://banglaquran.app'),
  title: 'Bangla Quran | Arabic & Bangla with Audio',
  description:
    'Read and listen to the Quran in Arabic with Bangla translation. Browse all 114 suras with audio, bookmarks, and offline-ready experience.',
  applicationName: 'Bangla Quran',
  openGraph: {
    type: 'website',
    title: 'Bangla Quran | Arabic & Bangla with Audio',
    description:
      'Read and listen to the Quran in Arabic with Bangla translation. Browse all 114 suras with audio, bookmarks, and offline-ready experience.',
    siteName: 'Bangla Quran',
    url: 'https://banglaquran.app',
    images: [{ url: '/quran.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bangla Quran | Arabic & Bangla with Audio',
    description:
      'Read and listen to the Quran in Arabic with Bangla translation. Browse all 114 suras with audio, bookmarks, and offline-ready experience.',
    images: ['/quran.png']
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <ThemeScript />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
