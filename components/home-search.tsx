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
    <section id="sura-list" className="home-sura-section">
      <div className="home-section-head">
        <div>
          <h2 className="home-section-title">সব সূরা এক জায়গায়</h2>
          <p className="home-section-subtitle">
            নাম বা ইংরেজি উচ্চারণ লিখে সূরা খুঁজুন।
          </p>
        </div>
        <div className="home-section-badge">
          ফলাফল {toBnDigits(filtered.length)}
        </div>
      </div>
      <div className="home-search-wrap">
        <input
          className="home-search-input"
          placeholder="যেমনঃ ইয়াসিন / yasin"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="home-search-hint">
          দ্রুত নেভিগেশনের জন্য আরবি+বাংলা, আরবি অথবা বাংলা মোডে পড়ুন।
        </div>
      </div>
      <div className="sura-grid home-grid">
        {filtered.map((sura) => (
          <div className="card home-sura-card" key={sura.id}>
            <a
              className="sura-card-link"
              href={`/sura/${sura.id}/${sura.slug}`}
            >
              <div className="sura-caligraphy" aria-hidden="true">
                <div className="sura-icon sura-icon-base">{`surah-icon`}</div>
                <div className="sura-icon sura-icon-number">
                  {`surah${String(sura.id).padStart(3, '0')}`}
                </div>
              </div>
              <div className="sura-info">
                <h3 className="sura-name">
                  {toBnDigits(sura.id)}. {sura.nameBn}
                </h3>
                <div className="sura-meta">
                  {sura.nameAr ? `${sura.nameAr} · ` : ''}
                  {sura.revelationPlace
                    ? `${sura.revelationPlace === 'makki' ? 'মাক্কী' : 'মাদানী'} · `
                    : ''}
                  {toBnDigits(sura.ayahCount)} আয়াত
                </div>
              </div>
            </a>
            <div className="sura-actions">
              <div className="sura-modes">
                <a
                  className="sura-mode-chip"
                  href={`/sura/${sura.id}/${sura.slug}`}
                >
                  আরবি + বাংলা
                </a>
                <a
                  className="sura-mode-chip"
                  href={`/sura/${sura.id}/${sura.slug}/arabic`}
                >
                  আরবি
                </a>
                <a
                  className="sura-mode-chip"
                  href={`/sura/${sura.id}/${sura.slug}/bangla`}
                >
                  বাংলা
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
