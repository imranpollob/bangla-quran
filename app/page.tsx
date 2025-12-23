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
              <img src="/quran.png" alt="কোরআন" />
            </div>
            <div>
              <h1 className="home-brand-title">বাংলা কোরআন</h1>
              <div className="home-brand-sub">Arabic + Bangla with Audio</div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <section className="home-hero">
          <div>
            <div className="home-kicker">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</div>
            <h2 className="home-title">আলোর পথে কোরআনের সাথে থাকুন</h2>
            <p className="home-subtitle">
              আরবি তিলাওয়াত, বাংলা অনুবাদ ও সহজ নেভিগেশন—একই স্থানে। অফলাইন,
              বুকমার্ক ও দ্রুত সার্চ দিয়ে প্রতিদিনের পড়া সহজ করুন।
            </p>
            <div className="home-actions">
              <a className="primary-button" href="#sura-list">
                সূরা তালিকা দেখুন
              </a>
              <a className="ghost-button" href="/sura/1/al-fatihah">
                সূরা ফাতিহা
              </a>
            </div>
            <div className="home-stats">
              <div className="stat-card">
                <span className="stat-number">{toBnDigits(114)}</span>
                <span className="stat-label">সম্পূর্ণ সূরা সংগ্রহ</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{toBnDigits(3)}</span>
                <span className="stat-label">দেখার মোড</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">অডিও</span>
                <span className="stat-label">শুদ্ধ তিলাওয়াত</span>
              </div>
            </div>
          </div>

          <div className="home-hero-card">
            <h3>দ্রুত শুরু করুন</h3>
            <p style={{ margin: '0 0 12px', color: 'var(--muted)' }}>
              প্রিয় সূরা থেকে শুরু করুন অথবা সূরা তালিকা থেকে বেছে নিন।
            </p>
            <ul className="home-hero-list">
              <li>
                <a href="/sura/36/ya-sin">
                  সূরা ইয়াসিন
                  <span>→</span>
                </a>
              </li>
              <li>
                <a href="/sura/55/ar-rahman">
                  সূরা আর-রহমান
                  <span>→</span>
                </a>
              </li>
              <li>
                <a href="/sura/67/al-mulk">
                  সূরা আল-মুলক
                  <span>→</span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <HomeSearch suras={suraList} />
      </div>
    </div>
  );
}
