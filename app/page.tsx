import HomeSearch from '@/components/home-search';
import SiteHeader from '@/components/site-header';
import ContinueReadingCard from '@/components/continue-reading-card';
import { toBnDigits } from '@/lib/format';
import { suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';
import {
  defaultOgImage,
  languageAlternates,
  serializeJsonLd,
  seoIntentClusters,
  siteDescription,
  siteLocale,
  siteName,
  siteTitle,
  siteUrl
} from '@/lib/seo';

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'বাংলা কোরআন',
    'কোরআন বাংলা',
    'কোরআন বাংলা অনুবাদ',
    'কোরআন তাফসির',
    'কোরআন অডিও',
    'Bangla Quran',
    'Quran Bangla translation',
    'Surah Bangla meaning',
    'Bangla Quran audio'
  ],
  alternates: {
    canonical: '/',
    languages: languageAlternates
  },
  openGraph: {
    type: 'website',
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: siteLocale.replace('-', '_'),
    images: [defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/quran.png', alt: defaultOgImage.alt }]
  }
};

export default function Page() {
  const popularSurahs = suraList.slice(0, 6);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      inLanguage: siteLocale,
      description: siteDescription
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: siteTitle,
      url: siteUrl,
      inLanguage: siteLocale,
      description: siteDescription,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl
      },
      about: {
        '@type': 'Thing',
        name: 'Al-Quran reading in Bangla'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'জনপ্রিয় সূরা',
      itemListElement: popularSurahs.map((sura, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/sura/${sura.id}/${sura.slug}`,
        name: `সূরা ${sura.nameBn}`
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Bangla Quran search intent clusters',
      hasDefinedTerm: seoIntentClusters.map((cluster) => ({
        '@type': 'DefinedTerm',
        name: cluster
      }))
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

        <section className="home-hero home-hero-v1">
          <div className="home-hero-center">
            <div className="home-kicker">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</div>
            <p className="home-greeting">আসসালামু আলাইকুম</p>
            <h1 className="home-title">বাংলা কোরআন</h1>
            <p className="home-subtitle">
              আরবি, বাংলা অনুবাদ, তাফসির ও অডিও তিলাওয়াতসহ ১১৪টি সূরা পড়ুন ও শুনুন।
            </p>
            <p className="home-lead">
              বাংলাভাষী পাঠকদের জন্য সহজ কোরআন পাঠ
            </p>

            <div className="hero-actions-row">
              <ContinueReadingCard />
              <a href="#sura-list" className="home-hero-card hero-card-small">
                <div className="hero-icon">📚</div>
                <h3 className="hero-card-title">সূরা তালিকা</h3>
                <p className="hero-card-sub">{toBnDigits(114)} সূরা</p>
              </a>

              <a href="/saved-ayahs" className="home-hero-card hero-card-small">
                <div className="hero-icon">🔖</div>
                <h3 className="hero-card-title">সংরক্ষিত আয়াত</h3>
                <p className="hero-card-sub">আপনার প্রিয় আয়াত</p>
              </a>
            </div>
          </div>
        </section>

        <section className="home-seo-links" aria-labelledby="guided-reading-title">
          <div className="home-section-copy">
            <h2 id="guided-reading-title" className="home-section-title">
              কোরআন পড়া, শোনা ও তাফসির গাইড
            </h2>
            <p className="home-section-text">
              বাংলা কোরআন পাঠের গুরুত্বপূর্ণ পথগুলো এক জায়গায় — পূর্ণ কোরআন, অডিও তিলাওয়াত ও
              সূরা ভিত্তিক তাফসির।
            </p>
          </div>
          <div className="home-link-grid">
            <a className="home-link-card" href="/bangla-quran-reading">
              <h3>বাংলা কোরআন পড়ুন</h3>
              <p>আরবি ও বাংলা অনুবাদসহ ধারাবাহিকভাবে ১১৪টি সূরা পড়ুন।</p>
            </a>
            <a className="home-link-card" href="/audio-quran-bangla">
              <h3>অডিও কোরআন তিলাওয়াত</h3>
              <p>আরবি ও বাংলা তিলাওয়াত শুনে শুনে আয়াত অনুসরণ করুন।</p>
            </a>
            <a className="home-link-card" href="/tafsir-by-surah">
              <h3>সূরা অনুযায়ী তাফসির</h3>
              <p>প্রতিটি সূরার আয়াতভিত্তিক তাফসির সহজে ব্রাউজ করুন।</p>
            </a>
          </div>
        </section>

        <HomeSearch suras={suraList} />
      </div>
    </main>
  );
}
