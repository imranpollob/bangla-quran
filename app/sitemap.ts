import type { MetadataRoute } from 'next';
import { suraList } from '@/lib/data/suras';

const siteUrl = 'https://banglaquran.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'weekly' as const,
      priority: 1
    }
  ];

  const suraEntries: MetadataRoute.Sitemap = suraList.map((sura) => ({
    url: `${siteUrl}/sura/${sura.id}/${sura.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  return [...baseEntries, ...suraEntries];
}
