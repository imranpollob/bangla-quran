import HomeSearch from '@/components/home-search';
import ThemeToggle from '@/components/theme-toggle';
import { toBnDigits } from '@/lib/format';
import { suraList } from '@/lib/data/suras';

export default function Page() {
  return (
    <div className="home">
      <div className="page-shell home-shell">
        <div className="home-topbar">
          <div className="home-brand">
            <div className="home-emblem">
              <img src="/favicon.ico" alt="কোরআন" />
            </div>
            <div>
              <h1 className="home-brand-title">বাংলা কোরআন</h1>
              <div className="home-brand-sub">Arabic + Bangla with Audio</div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <section className="home-hero home-hero-v1">
          <div className="home-hero-center">
            <div className="home-kicker">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</div>
            <h2 className="home-title">আসসালামু আলাইকুম</h2>
            <p className="home-subtitle">
              আপনার তিলাওয়াত যাত্রায় স্বাগতম
            </p>

            <div className="hero-actions-row">
              <a href="#sura-list" className="home-hero-card hero-card-small">
                <div className="hero-icon">📚</div>
                <h3 className="hero-card-title">সূরা তালিকা</h3>
                <p className="hero-card-sub">{toBnDigits(114)} সূরা</p>
              </a>

              <a href="#saved-ayahs" className="home-hero-card hero-card-small">
                <div className="hero-icon">🔖</div>
                <h3 className="hero-card-title">সংরক্ষিত আয়াত</h3>
                <p className="hero-card-sub">আপনার প্রিয় আয়াত</p>
              </a>

              <a href="#learning" className="home-hero-card hero-card-small">
                <div className="hero-icon">📖</div>
                <h3 className="hero-card-title">শিক্ষা কার্যক্রম</h3>
                <p className="hero-card-sub">শেখার কার্যক্রম</p>
              </a>
            </div>
          </div>
        </section>

        <HomeSearch suras={suraList} />
      </div>
    </div>
  );
}
