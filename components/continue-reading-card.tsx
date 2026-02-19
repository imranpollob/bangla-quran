'use client';

import { useEffect, useMemo, useState } from 'react';
import { toBnDigits } from '@/lib/format';
import {
  LAST_READ_UPDATED_EVENT,
  buildLastReadHref,
  readLastRead,
  type LastReadEntry
} from '@/lib/last-read';

function getModeLabel(mode: LastReadEntry['mode']) {
  if (mode === 'arabic') return 'আরবি';
  if (mode === 'bangla') return 'বাংলা';
  return 'আরবি + বাংলা';
}

function getAyahLabel(ayahNumber: string) {
  if (ayahNumber === '0') return 'বিসমিল্লাহ';
  return `আয়াত ${toBnDigits(ayahNumber)}`;
}

export default function ContinueReadingCard() {
  const [lastRead, setLastRead] = useState<LastReadEntry | null>(null);

  useEffect(() => {
    const sync = () => setLastRead(readLastRead());
    const onLastReadUpdated = () => sync();

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener(LAST_READ_UPDATED_EVENT, onLastReadUpdated);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(LAST_READ_UPDATED_EVENT, onLastReadUpdated);
    };
  }, []);

  const href = useMemo(() => {
    if (!lastRead) return '';
    return buildLastReadHref(lastRead);
  }, [lastRead]);

  if (!lastRead) return null;

  return (
    <a href={href} className="home-hero-card hero-card-small">
      <div className="hero-icon">📖</div>
      <h3 className="hero-card-title">সর্বশেষ পঠিত</h3>
      <p className="hero-card-sub">
        {toBnDigits(lastRead.suraId)}. {lastRead.suraNameBn} · {getAyahLabel(lastRead.ayahNumber)}
      </p>
    </a>
  );
}
