import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import ThemeScript from '@/components/theme-script';
import GoToTop from '@/components/go-to-top';
import SiteFooter from '@/components/site-footer';
import {
  defaultOgImage,
  languageAlternates,
  siteDescription,
  siteLocale,
  siteName,
  siteTitle,
  siteUrl
} from '@/lib/seo';

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
  alternates: {
    canonical: '/',
    languages: languageAlternates
  },
  openGraph: {
    type: 'website',
    title: siteTitle,
    description: siteDescription,
    siteName,
    url: siteUrl,
    locale: siteLocale.replace('-', '_'),
    images: [defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/quran.png', alt: defaultOgImage.alt }]
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
    apple: [{ url: '/quran.png' }]
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
        <SiteFooter />
        <GoToTop />
      </body>
    </html>
  );
}
