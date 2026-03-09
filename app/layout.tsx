import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import ThemeScript from '@/components/theme-script';
import GoToTop from '@/components/go-to-top';
import { siteDescription, siteName, siteTitle, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'বাংলা কোরআন',
    'কোরআন বাংলা অনুবাদ',
    'কোরআন তাফসির',
    'কোরআন অডিও',
    'Bangla Quran',
    'Quran Bangla translation'
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    title: siteTitle,
    description: siteDescription,
    siteName,
    url: siteUrl,
    locale: 'bn_BD',
    images: [{ url: '/quran.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
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
      <body>
        {children}
        <GoToTop />
      </body>
    </html>
  );
}
