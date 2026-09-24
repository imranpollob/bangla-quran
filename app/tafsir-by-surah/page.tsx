import type { Metadata } from 'next';
import SiteHeader from '@/components/site-header';
import { suraList } from '@/lib/data/suras';
import { toBnDigits } from '@/lib/format';
import { serializeJsonLd, siteLocale, siteName, siteUrl } from '@/lib/seo';

const description = 'সূরা অনুযায়ী কোরআনের বাংলা তাফসির পড়ুন। প্রতিটি সূরার আয়াতভিত্তিক তাফসিরে দ্রুত যান।';

export const metadata: Metadata = {
  title: 'তাফসির বাই সূরা | কোরআনের বাংলা তাফসির তালিকা',
  description,
  keywords: ['tafsir by surah', 'বাংলা তাফসির', 'সূরা অনুযায়ী তাফসির', 'quran tafsir bangla'],
  alternates: {
    canonical: '/tafsir-by-surah'
  }
};

export default function Page() {
  const url = `${siteUrl}/tafsir-by-surah`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'সূরা অনুযায়ী তাফসির তালিকা',
      url,
      inLanguage: siteLocale,
      description,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl
      }
    }
  ];

  return (
    <main className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <div className="page-shell home-shell">
        <SiteHeader />
        <section className="home-sura-section">
          <div className="home-section-copy">
            <h1 className="home-section-title">সূরা অনুযায়ী তাফসির</h1>
            <p className="home-section-text">
              নিচের যেকোনো সূরায় গিয়ে আয়াতের তাফসির বাটনে ক্লিক করে বিস্তারিত বাংলা তাফসির পড়ুন।
            </p>
          </div>
          <div className="home-link-grid">
            {suraList.map((sura) => (
              <a key={sura.id} className="home-link-card" href={`/sura/${sura.id}/${sura.slug}`}>
                {toBnDigits(sura.id)}. {sura.nameBn}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
