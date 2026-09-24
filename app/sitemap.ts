import type { MetadataRoute } from 'next';
import { suraList } from '@/lib/data/suras';
import { siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'weekly' as const,
      priority: 1,
      lastModified: now
    }
  ];

  const suraEntries: MetadataRoute.Sitemap = suraList.map((sura) => ({
    url: `${siteUrl}/sura/${sura.id}/${sura.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now
  }));

  return [...baseEntries, ...suraEntries];
}
