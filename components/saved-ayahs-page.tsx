'use client';

import { useEffect, useMemo, useState } from 'react';
import ThemeToggle from '@/components/theme-toggle';
import { getSuraById } from '@/lib/data/suras';
import { loadAyahsForSura } from '@/lib/data/loader';
import { toBnDigits } from '@/lib/format';
import type { Ayah } from '@/lib/data/types';

interface Bookmark {
  suraId: number;
  ayahNumber: string;
  mode?: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'bq-bookmarks';

function readBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Bookmark[]) : [];
  } catch (e) {
    return [];
  }
}

function writeBookmarks(next: Bookmark[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    // ignore write errors
  }
}

function getModeLabel(mode?: string) {
  if (mode === 'arabic') return 'আরবি';
  if (mode === 'bangla') return 'বাংলা';
  return 'আরবি + বাংলা';
}

function buildAyahHref(bookmark: Bookmark, slug: string) {
  const base = `/sura/${bookmark.suraId}/${slug}`;
  if (bookmark.mode === 'arabic' || bookmark.mode === 'bangla') {
    return `${base}/${bookmark.mode}#ayah-${bookmark.ayahNumber}`;
  }
  return `${base}#ayah-${bookmark.ayahNumber}`;
}

export default function SavedAyahsPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [ayahsBySura, setAyahsBySura] = useState<Record<number, Ayah[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBookmarks(readBookmarks());
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    const suraIds = Array.from(new Set(bookmarks.map((bookmark) => bookmark.suraId)));
    if (suraIds.length === 0) {
      setAyahsBySura({});
      return () => {
        active = false;
      };
    }

    Promise.all(
      suraIds.map(async (id) => ({
        id,
        ayahs: await loadAyahsForSura(id)
      }))
    )
      .then((entries) => {
        if (!active) return;
        setAyahsBySura((prev) => {
          const next = { ...prev };
          for (const entry of entries) {
            next[entry.id] = entry.ayahs;
          }
          return next;
        });
      })
      .catch(() => { });

    return () => {
      active = false;
    };
  }, [bookmarks]);

  const sortedBookmarks = useMemo(() => {
    return [...bookmarks].sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    });
  }, [bookmarks]);

  const total = sortedBookmarks.length;
  const canClear = total > 0;

  const removeBookmark = (target: Bookmark) => {
    setBookmarks((prev) => {
      const next = prev.filter(
        (bookmark) =>
          !(
            bookmark.suraId === target.suraId &&
            bookmark.ayahNumber === target.ayahNumber
          )
      );
      writeBookmarks(next);
      return next;
    });
  };

  const clearAll = () => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm('সব সংরক্ষিত আয়াত মুছে ফেলবেন?');
      if (!confirmed) return;
    }
    writeBookmarks([]);
    setBookmarks([]);
    setAyahsBySura({});
  };

  return (
    <div className="saved-ayahs-page">
      <div className="page-shell">
        <div className="saved-ayahs-topbar">
          <a href="/" className="mode-link">
            ← সব সূরা
          </a>
          <h1 className="saved-ayahs-title">সংরক্ষিত আয়াত</h1>
          <div className="saved-ayahs-actions">
            {canClear && (
              <button type="button" className="toggle" onClick={clearAll}>
                🧹 সব মুছে ফেলুন
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
        <p className="saved-ayahs-sub">
          {total === 0
            ? 'আপনার সংরক্ষিত আয়াতগুলো এখানে দেখানো হবে।'
            : `${toBnDigits(total)} টি আয়াত সংরক্ষিত আছে`}
        </p>

        {loading && <div className="info-banner">সংরক্ষিত আয়াত লোড হচ্ছে...</div>}
        {!loading && total === 0 && (
          <div className="info-banner">
            আপনি এখনো কোনো আয়াত সংরক্ষণ করেননি।
          </div>
        )}

        {total > 0 && (
          <div className="ayah-list">
            {sortedBookmarks.map((bookmark) => {
              const sura = getSuraById(bookmark.suraId);
              if (!sura) return null;
              const ayah = ayahsBySura[bookmark.suraId]?.find(
                (item) => item.number === bookmark.ayahNumber
              );
              const label =
                bookmark.ayahNumber === '0'
                  ? 'বিসমিল্লাহ'
                  : `আয়াত ${toBnDigits(bookmark.ayahNumber)}`;
              const title = `${toBnDigits(sura.id)}. ${sura.nameBn}`;
              const href = buildAyahHref(bookmark, sura.slug);
              const modeLabel = getModeLabel(bookmark.mode);
              const meta = sura.nameAr
                ? `${sura.nameAr} · ${modeLabel}`
                : modeLabel;

              return (
                <article
                  className="ayah-card saved-ayah-card"
                  key={`${bookmark.suraId}-${bookmark.ayahNumber}`}
                >
                  <div className="ayah-top">
                    <div className="ayah-number">
                      {title} · {label}
                    </div>
                    <div className="ayah-actions">
                      <a className="toggle" href={href}>
                        📖 পড়ুন
                      </a>
                      <button
                        type="button"
                        className="toggle"
                        onClick={() => removeBookmark(bookmark)}
                      >
                        ❌ মুছুন
                      </button>
                    </div>
                  </div>
                  {ayah ? (
                    <>
                      <div className="arabic-text">{ayah.arabic}</div>
                      <div className="bangla-text">{ayah.bangla}</div>
                    </>
                  ) : (
                    <div className="info-banner">আয়াত লোড হচ্ছে...</div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
