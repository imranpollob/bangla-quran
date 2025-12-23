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
  const basePath = `/sura/${sura.id}/${slug}`;

  return (
    <>
      <div className="sura-sticky-nav">
        <div className="page-shell sura-nav-bar">
          <a href="/" className="mode-link" style={{ padding: '6px 10px' }}>
            ← সব সূরা
          </a>
          <div className="sura-nav-title">
            <a href={basePath} className="sura-title-link">
              {toBnDigits(sura.id)}. {sura.nameBn}
            </a>
          </div>
          <div className="sura-toolbar">
            <a className={`toggle ${mode === 'both' ? 'active' : ''}`} href={basePath}>
              আরবি + বাংলা
            </a>
            <a
              className={`toggle ${mode === 'arabic' ? 'active' : ''}`}
              href={`${basePath}/arabic`}
            >
              আরবি
            </a>
            <a
              className={`toggle ${mode === 'bangla' ? 'active' : ''}`}
              href={`${basePath}/bangla`}
            >
              বাংলা
            </a>
            <ThemeToggle />
            <AyahTextSizeControls />
          </div>
        </div>
      </div>

      <div className="page-shell">
        <div className="sura-hero">
          <a
            className="sura-caligraphy sura-caligraphy-large"
            href={basePath}
            aria-label={`সুরা ${sura.nameBn}`}
          >
            <div className="sura-icon sura-icon-number">
              {`surah${String(sura.id).padStart(3, '0')}`}
            </div>
            <div className="sura-icon sura-icon-base">{`surah-icon`}</div>
          </a>
          <div>
            <h1 className="sura-title" style={{ margin: 0 }}>
              <a href={basePath} className="sura-title-link">
                {toBnDigits(sura.id)}. {sura.nameBn}
              </a>
            </h1>
            <p className="sura-meta">
              {sura.nameAr ? `${sura.nameAr} · ` : ''}
              {sura.revelationPlace
                ? `${sura.revelationPlace === 'makki' ? 'মাক্কী' : 'মাদানী'} · `
                : ''}
              {toBnDigits(sura.ayahCount)} আয়াত
            </p>
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
      </div>
    </>
  );
}
