"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
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

type AudioLang = 'ar' | 'bn';

export default function SuraPage({ sura, ayahs, mode, slug }: Props) {
  const showArabic = mode !== 'bangla';
  const showBangla = mode !== 'arabic';
  const basePath = `/sura/${sura.id}/${slug}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{ index: number; lang: AudioLang } | null>(
    null
  );
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) {
        setMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToAyah = useCallback((index: number) => {
    const node = ayahRefs.current[index];
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const startPlayback = useCallback(
    (index: number, lang: AudioLang) => {
      const audio = audioRef.current;
      const src = ayahs[index]?.audio?.[lang];
      if (!audio || !src) return;

      audio.src = src;
      audio.currentTime = 0;
      audio.play().catch(() => {});
      setCurrentTrack({ index, lang });
      scrollToAyah(index);
    },
    [ayahs, scrollToAyah]
  );

  const togglePlay = useCallback(
    (index: number, lang: AudioLang) => {
      const audio = audioRef.current;
      if (!audio) return;

      const isSameTrack = currentTrack?.index === index && currentTrack?.lang === lang;
      if (isSameTrack) {
        if (audio.paused) {
          if (audio.ended) {
            audio.currentTime = 0;
          }
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
        return;
      }

      startPlayback(index, lang);
    },
    [currentTrack, startPlayback]
  );

  const getNextTrack = useCallback(
    (index: number, lang: AudioLang): { index: number; lang: AudioLang } | null => {
      const currentAyah = ayahs[index];
      if (!currentAyah) return null;

      const hasArabic = Boolean(currentAyah.audio.ar);
      const hasBangla = Boolean(currentAyah.audio.bn);

      // In both mode, play Arabic then Bangla of the same ayah before moving on.
      if (mode === 'both' && lang === 'ar' && showBangla && hasBangla) {
        return { index, lang: 'bn' };
      }

      const nextIndex = index + 1;
      const nextAyah = ayahs[nextIndex];
      if (!nextAyah) return null;

      const nextHasArabic = Boolean(nextAyah.audio.ar);
      const nextHasBangla = Boolean(nextAyah.audio.bn);

      if (showArabic && nextHasArabic) {
        return { index: nextIndex, lang: 'ar' };
      }

      if (showBangla && nextHasBangla) {
        return { index: nextIndex, lang: 'bn' };
      }

      return null;
    },
    [ayahs, mode, showArabic, showBangla]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsAudioPlaying(true);
    const handlePause = () => setIsAudioPlaying(false);
    const handleEnded = () => {
      setIsAudioPlaying(false);
      if (!currentTrack) return;

      const nextTrack = getNextTrack(currentTrack.index, currentTrack.lang);
      if (!nextTrack) {
        setCurrentTrack(null);
        return;
      }

      startPlayback(nextTrack.index, nextTrack.lang);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, getNextTrack, startPlayback]);

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
          <button
            type="button"
            className="sura-menu-button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          {menuOpen && (
            <div className="sura-menu-panel">
              <div className="sura-toolbar sura-toolbar-mobile">
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
                <div className="sura-menu-utilities">
                  <ThemeToggle />
                  <AyahTextSizeControls />
                </div>
              </div>
            </div>
          )}
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
          {ayahs.map((ayah, index) => {
            const anchor = `ayah-${ayah.number}`;
            const label =
              ayah.number === '0'
                ? 'বিসমিল্লাহ'
                : `আয়াত ${toBnDigits(ayah.number)}`;
            const isPlayingAyah = currentTrack?.index === index && isAudioPlaying;
            const hasBanglaAudio = Boolean(ayah.audio.bn);

            return (
              <article
                className={`ayah-card ${isPlayingAyah ? 'ayah-card-playing' : ''}`}
                id={anchor}
                key={anchor}
                ref={(node) => {
                  ayahRefs.current[index] = node;
                }}
              >
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
                    <AyahAudioButton
                      label="Arabic audio"
                      isActive={currentTrack?.index === index && currentTrack?.lang === 'ar'}
                      isPlaying={isAudioPlaying}
                      onToggle={() => togglePlay(index, 'ar')}
                    />
                    <div className="arabic-text">{ayah.arabic}</div>
                  </div>
                )}
                {showBangla && (
                  <div className="ayah-line ayah-line-bangla">
                    {hasBanglaAudio && (
                      <AyahAudioButton
                        label="Bangla audio"
                        isActive={currentTrack?.index === index && currentTrack?.lang === 'bn'}
                        isPlaying={isAudioPlaying}
                        onToggle={() => togglePlay(index, 'bn')}
                      />
                    )}
                    <div className="bangla-text">{ayah.bangla}</div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
      <audio ref={audioRef} preload="none" />
    </>
  );
}
