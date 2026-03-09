import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bangla Quran',
    short_name: 'Quran',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b1220',
    theme_color: '#0ea5e9',
    description:
      'বাংলা ভাষাভাষীদের জন্য আরবি কোরআন, বাংলা অনুবাদ, তাফসির ও অডিও তিলাওয়াতসহ অফলাইন-রেডি অভিজ্ঞতা।',
    icons: [
      {
        src: '/quran.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
    lang: 'bn'
  };
}
