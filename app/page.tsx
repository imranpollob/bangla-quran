import HomeSearch from '@/components/home-search';
import SiteHeader from '@/components/site-header';
import ContinueReadingCard from '@/components/continue-reading-card';
import { toBnDigits } from '@/lib/format';
import { suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/'
  }
};

export default function Page() {
  return (
    <div className="home">
      <div className="page-shell home-shell">
        <SiteHeader />

        <section className="home-hero home-hero-v1">
          <div className="home-hero-center">
            <div className="home-kicker">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</div>
            <h2 className="home-title">আসসালামু আলাইকুম</h2>
            <p className="home-subtitle">
              আপনার তিলাওয়াত যাত্রায় স্বাগতম
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
    </div>
  );
}
