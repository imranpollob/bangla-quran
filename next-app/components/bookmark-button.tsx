'use client';

import { useEffect, useState } from 'react';

interface Bookmark {
  suraId: number;
  ayahNumber: string;
  mode?: string;
  updatedAt: string;
}

interface Props {
  suraId: number;
  ayahNumber: string;
  mode?: string;
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

export default function BookmarkButton({ suraId, ayahNumber, mode }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const list = readBookmarks();
    setActive(list.some((b) => b.suraId === suraId && b.ayahNumber === ayahNumber));
  }, [suraId, ayahNumber]);

  const toggle = () => {
    const list = readBookmarks();
    const exists = list.some(
      (b) => b.suraId === suraId && b.ayahNumber === ayahNumber
    );
    const next = exists
      ? list.filter((b) => !(b.suraId === suraId && b.ayahNumber === ayahNumber))
      : [
          ...list,
          {
            suraId,
            ayahNumber,
            mode,
            updatedAt: new Date().toISOString()
          }
        ];
    writeBookmarks(next);
    setActive(!exists);
  };

  return (
    <button
      type="button"
      className={`bookmark-button ${active ? 'active' : ''}`}
      onClick={toggle}
      aria-pressed={active}
    >
      {active ? '🔖 Saved' : '🔖 Save'}
    </button>
  );
}
