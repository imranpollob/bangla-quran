import AyahAudioButton from '@/components/ayah-audio-button';
import AyahTextSizeControls from '@/components/ayah-text-size-controls';
import BookmarkButton from '@/components/bookmark-button';
import ThemeToggle from '@/components/theme-toggle';
import type { Mode, SuraMeta } from '@/lib/data/suras';
import type { Ayah } from '@/lib/data/types';
import { toBnDigits } from '@/lib/format';

interface Props {
  sura: SuraMeta;
  ayahs: Ayah[];
  mode: Mode;
  slug: string;
}

const modeLabels: Record<Mode, string> = {
  both: 'আরবি + বাংলা',
  arabic: 'আরবি',
  bangla: 'বাংলা'
};

export default function SuraPage({ sura, ayahs, mode, slug }: Props) {
  const showArabic = mode !== 'bangla';
  const showBangla = mode !== 'arabic';

  return (
    <div className="page-shell">
      <div className="sura-header">
        <div>
          <p style={{ margin: '0 0 6px', color: 'var(--muted)' }}>
            <a href="/" className="mode-link" style={{ padding: '6px 10px' }}>
              ← সব সূরা
            </a>
          </p>
          <h1 className="sura-title" style={{ margin: 0 }}>
            {toBnDigits(sura.id)}. {sura.nameBn}
          </h1>
          <p className="sura-meta">
            {sura.nameAr ? `${sura.nameAr} · ` : ''}
            {sura.revelationPlace
              ? `${sura.revelationPlace === 'makki' ? 'মাক্কী' : 'মাদানী'} · `
              : ''}
            {toBnDigits(sura.ayahCount)} আয়াত
          </p>
        </div>
        <div className="sura-toolbar">
          <a
            className={`toggle ${mode === 'both' ? 'active' : ''}`}
            href={`/sura/${sura.id}/${slug}`}
          >
            আরবি + বাংলা
          </a>
          <a
            className={`toggle ${mode === 'arabic' ? 'active' : ''}`}
            href={`/sura/${sura.id}/${slug}/arabic`}
          >
            আরবি
          </a>
          <a
            className={`toggle ${mode === 'bangla' ? 'active' : ''}`}
            href={`/sura/${sura.id}/${slug}/bangla`}
          >
            বাংলা
          </a>
          <ThemeToggle />
          <AyahTextSizeControls />
        </div>
      </div>


      <div className="ayah-list" style={{ marginTop: 24 }}>
        {ayahs.map((ayah) => {
          const anchor = `ayah-${ayah.number}`;
          const label =
            ayah.number === '0'
              ? 'বিসমিল্লাহ'
              : `আয়াত ${toBnDigits(ayah.number)}`;
          return (
            <article className="ayah-card" id={anchor} key={anchor}>
              <div className="ayah-top">
                <div className="ayah-number">{label}</div>
                <div className="ayah-actions">
                  <BookmarkButton
                    suraId={sura.id}
                    ayahNumber={ayah.number}
                    mode={mode}
                  />
                  <a className="toggle" href={`#${anchor}`} aria-label="Permalink">
                    #
                  </a>
                </div>
              </div>
              {showArabic && (
                <div className="ayah-line ayah-line-arabic">
                  <AyahAudioButton src={ayah.audio.ar} label="Arabic audio" />
                  <div className="arabic-text">{ayah.arabic}</div>
                </div>
              )}
              {showBangla && (
                <div className="ayah-line ayah-line-bangla">
                  <AyahAudioButton src={ayah.audio.bn} label="Bangla audio" />
                  <div className="bangla-text">{ayah.bangla}</div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="info-banner">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <span className="badge">বুকমার্ক</span>
          <span>নির্বাচিত আয়াত সংরক্ষণ করুন — অতিথি মোডে লোকাল স্টোরেজে থাকে।</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
          <span className="badge">প্রগ্রেস</span>
          <span>
            পরবর্তী ধাপে Supabase সাইন-ইন ও সিঙ্ক যোগ হবে যাতে বুকমার্ক/স্ট্রিক সব
            ডিভাইসে থাকে।
          </span>
        </div>
      </div>
    </div>
  );
}
