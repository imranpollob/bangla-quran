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
      'Read and listen to the Quran in Arabic with Bangla translation. Offline-ready with bookmarks and progress tracking.',
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
