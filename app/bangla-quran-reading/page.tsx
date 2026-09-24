import type { Metadata } from 'next';
import SiteHeader from '@/components/site-header';
import { serializeJsonLd, siteLocale, siteName, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'বাংলা কোরআন পড়ার গাইড | ১১৪ সূরা, অনুবাদ, তাফসির ও অডিও',
  description:
    'বাংলা ভাষাভাষীদের জন্য পূর্ণ কোরআন পড়ার গাইড। আরবি টেক্সট, বাংলা অনুবাদ, তাফসির ও অডিও তিলাওয়াতসহ ১১৪টি সূরা পড়ুন।',
  keywords: [
    'Bangla Quran reading',
    'বাংলা কোরআন পড়া',
    'Quran Bangla translation',
    'সূরা পড়ার গাইড'
  ],
  alternates: {
    canonical: '/bangla-quran-reading'
  }
};

export default function Page() {
  const url = `${siteUrl}/bangla-quran-reading`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'বাংলা কোরআন পড়ার গাইড',
      url,
      inLanguage: siteLocale,
      description: metadata.description,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'বাংলা কোরআন',
          item: siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'বাংলা কোরআন পড়ার গাইড',
          item: url
        }
      ]
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
            <h1 className="home-section-title">বাংলা কোরআন পড়ার গাইড</h1>
            <p className="home-section-text">
              ১১৪টি সূরা ধারাবাহিকভাবে পড়তে হোমপেজের সূরা তালিকা ব্যবহার করুন। প্রতিটি সূরায় আরবি + বাংলা,
              কেবল আরবি, এবং কেবল বাংলা মোড রয়েছে।
            </p>
          </div>
          <div className="home-link-grid">
            <a className="home-link-card" href="/">
              সূরা তালিকা থেকে পড়া শুরু করুন
            </a>
            <a className="home-link-card" href="/audio-quran-bangla">
              অডিও তিলাওয়াতসহ শোনার গাইড
            </a>
            <a className="home-link-card" href="/tafsir-by-surah">
              সূরা অনুযায়ী তাফসির দেখুন
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
