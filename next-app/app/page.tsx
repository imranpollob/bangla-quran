import HomeSearch from '@/components/home-search';
import ThemeToggle from '@/components/theme-toggle';
import { suraList } from '@/lib/data/suras';

export default function Page() {
  return (
    <div className="page-shell">
      <div className="header">
        <div>
          <h2 style={{ margin: 0 }}>Bangla Quran (Next.js preview)</h2>
          <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
            SEO-friendly, PWA-ready rebuild with Supabase hooks and offline storage.
          </p>
        </div>
        <ThemeToggle />
      </div>
      <HomeSearch suras={suraList} />
    </div>
  );
}
