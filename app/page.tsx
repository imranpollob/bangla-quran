import HomeSearch from '@/components/home-search';
import SiteHeader from '@/components/site-header';
import ContinueReadingCard from '@/components/continue-reading-card';
import { toBnDigits } from '@/lib/format';
import { suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';
import { serializeJsonLd, siteDescription, siteName, siteTitle, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'বাংলা কোরআন',
    'কোরআন বাংলা',
    'কোরআন বাংলা অনুবাদ',
    'কোরআন তাফসির',
    'কোরআন অডিও',
    'Bangla Quran'
  ],
  alternates: {
    canonical: '/'
  }
};

export default function Page() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      inLanguage: 'bn-BD',
      description: siteDescription
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: siteTitle,
      url: siteUrl,
      inLanguage: 'bn-BD',
      description: siteDescription,
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

        <HomeSearch suras={suraList} />
      </div>
    </main>
  );
}
