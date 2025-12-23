import type { MetadataRoute } from 'next';
import { suraList } from '@/lib/data/suras';

const siteUrl = 'https://banglaquran.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const baseEntries = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    }
  ];

  const suraEntries = suraList.flatMap((sura) => {
    const base = {
      url: `${siteUrl}/sura/${sura.id}/${sura.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    };
    const modes = ['arabic', 'bangla'].map((mode) => ({
      url: `${siteUrl}/sura/${sura.id}/${sura.slug}/${mode}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6
    }));
    return [base, ...modes];
  });

  return [...baseEntries, ...suraEntries];
}
