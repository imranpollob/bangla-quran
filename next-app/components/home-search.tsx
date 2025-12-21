'use client';

import { useMemo, useState } from 'react';
import { toBnDigits } from '@/lib/format';
import type { SuraMeta } from '@/lib/data/suras';

interface Props {
  suras: SuraMeta[];
}

export default function HomeSearch({ suras }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return suras;
    return suras.filter((s) => {
      return (
        s.nameBn.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, suras]);

  return (
    <>
      <div className="header">
        <div>
          <h1 style={{ margin: 0 }}>কোরআন</h1>
          <p style={{ color: 'var(--muted)', margin: '6px 0 0' }}>
            Next.js সংস্করণ · বর্তমানে {suras.length}/114 সূরা উদাহরণ হিসেবে যুক্ত
          </p>
        </div>
        <div className="grid-actions">
          <div className="pill">
            <span role="img" aria-label="offline">
              📱
            </span>
            Offline-ready PWA
          </div>
          <div className="pill">
            <span role="img" aria-label="progress">
              🔖
            </span>
            Bookmarks & progress
          </div>
        </div>
      </div>
      <input
        className="search-box"
        placeholder="যেমনঃ ইয়াসিন / yasin"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="sura-grid" style={{ marginTop: 20 }}>
        {filtered.map((sura) => (
          <div className="card" key={sura.id}>
            <h3>
              {toBnDigits(sura.id)}. {sura.nameBn}
            </h3>
            <div className="meta">
              {sura.nameAr ? `${sura.nameAr} · ` : ''}
              {sura.revelationPlace
                ? `${sura.revelationPlace === 'makki' ? 'মাক্কী' : 'মাদানী'} · `
                : ''}
              {toBnDigits(sura.ayahCount)} আয়াত
            </div>
            <div className="mode-links">
              <a className="mode-link" href={`/sura/${sura.id}/${sura.slug}`}>
                আরবি + বাংলা
              </a>
              <a
                className="mode-link"
                href={`/sura/${sura.id}/${sura.slug}/arabic`}
              >
                শুধু আরবি
              </a>
              <a
                className="mode-link"
                href={`/sura/${sura.id}/${sura.slug}/bangla`}
              >
                শুধু বাংলা
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
