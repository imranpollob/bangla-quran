import type { MetadataRoute } from 'next';
import { siteDescription, siteName } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: 'Quran',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b1220',
    theme_color: '#0ea5e9',
    description: siteDescription,
    icons: [
      {
        src: '/quran.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'any maskable'
      }
    ],
    categories: ['education', 'books', 'lifestyle'],
    lang: 'bn-BD'
  };
}
