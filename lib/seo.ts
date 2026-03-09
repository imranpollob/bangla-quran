export const siteUrl = 'https://banglaquran.app';
export const siteName = 'বাংলা কোরআন';
export const siteTitle = 'বাংলা কোরআন | অডিও, বাংলা অনুবাদ ও তাফসির';
export const siteDescription =
  'বাংলা ভাষাভাষীদের জন্য আরবি কোরআন, বাংলা অনুবাদ, তাফসির ও অডিও তিলাওয়াতসহ ১১৪টি সূরা পড়ুন ও শুনুন।';

export function buildSuraUrl(id: string | number, slug: string, mode?: string) {
  const baseUrl = `${siteUrl}/sura/${id}/${slug}`;
  return mode ? `${baseUrl}/${mode}` : baseUrl;
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
