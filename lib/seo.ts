export const siteUrl = 'https://banglaquran.app';
export const siteName = 'বাংলা কোরআন';
export const siteTitle = 'বাংলা কোরআন | অডিও, বাংলা অনুবাদ ও তাফসির';
export const siteDescription =
  'বাংলা ভাষাভাষীদের জন্য আরবি কোরআন, বাংলা অনুবাদ, তাফসির ও অডিও তিলাওয়াতসহ ১১৪টি সূরা পড়ুন ও শুনুন।';
export const siteLocale = 'bn-BD';

export const seoIntentClusters = [
  'bangla-quran-reading',
  'surah-with-bangla-meaning',
  'audio-tilawat-in-bangla',
  'tafsir-by-surah'
] as const;

export const seoLanguageStrategy = 'bangla-plus-transliteration';
export const seoAudienceGeography = 'bangladesh-and-global-bengali';

export const languageAlternates = {
  'bn-BD': siteUrl,
  bn: siteUrl,
  'x-default': siteUrl
} as const;

export const defaultOgImage = {
  url: '/quran.png',
  width: 1200,
  height: 630,
  alt: 'বাংলা কোরআন - Quran in Bangla with Tafsir and Audio'
} as const;

export function buildAbsoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}

export function buildSuraUrl(id: string | number, slug: string, mode?: string) {
  const baseUrl = `${siteUrl}/sura/${id}/${slug}`;
  return mode ? `${baseUrl}/${mode}` : baseUrl;
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
