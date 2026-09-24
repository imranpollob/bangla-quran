import type { Metadata } from 'next';
import SiteHeader from '@/components/site-header';
import { serializeJsonLd, siteLocale, siteName, siteUrl } from '@/lib/seo';

const description =
  'আরবি ও বাংলা অডিও তিলাওয়াতসহ সূরা পড়ুন ও শুনুন। আয়াতভিত্তিক প্লে, মোড পরিবর্তন ও ধারাবাহিক শুনার অভিজ্ঞতা।';

export const metadata: Metadata = {
  title: 'অডিও কোরআন বাংলা | আরবি ও বাংলা তিলাওয়াত',
  description,
  keywords: ['audio quran bangla', 'বাংলা অডিও কোরআন', 'quran tilawat bangla', 'সূরা অডিও'],
  alternates: {
    canonical: '/audio-quran-bangla'
  }
};

export default function Page() {
  const url = `${siteUrl}/audio-quran-bangla`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'অডিও কোরআন বাংলা',
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
            <h1 className="home-section-title">অডিও কোরআন বাংলা</h1>
            <p className="home-section-text">
              প্রতিটি সূরায় আরবি ও বাংলা তিলাওয়াত চালু করতে আয়াতের পাশে থাকা অডিও বাটন ব্যবহার করুন।
              আরবি + বাংলা মোডে ধারাবাহিকভাবে শুনে পড়ার সুবিধা পাবেন।
            </p>
          </div>
          <div className="home-link-grid">
            <a className="home-link-card" href="/">
              সূরা তালিকা থেকে অডিওসহ পড়া শুরু করুন
            </a>
            <a className="home-link-card" href="/bangla-quran-reading">
              কোরআন পড়ার সম্পূর্ণ গাইড
            </a>
            <a className="home-link-card" href="/tafsir-by-surah">
              তাফসিরভিত্তিক সূরা তালিকা
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
