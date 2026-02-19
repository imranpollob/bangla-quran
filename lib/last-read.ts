import type { Mode } from '@/lib/data/suras';

export const LAST_READ_STORAGE_KEY = 'bq-last-read';
export const LAST_READ_UPDATED_EVENT = 'bq-last-read-updated';

export interface LastReadEntry {
  suraId: number;
  suraSlug: string;
  suraNameBn: string;
  ayahNumber: string;
  mode: Mode;
  updatedAt: string;
}

function isValidMode(mode: unknown): mode is Mode {
  return mode === 'both' || mode === 'arabic' || mode === 'bangla';
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function readLastRead(): LastReadEntry | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LAST_READ_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed)) return null;

    if (
      typeof parsed.suraId !== 'number' ||
      typeof parsed.suraSlug !== 'string' ||
      typeof parsed.suraNameBn !== 'string' ||
      typeof parsed.ayahNumber !== 'string' ||
      !isValidMode(parsed.mode) ||
      typeof parsed.updatedAt !== 'string'
    ) {
      return null;
    }

    return {
      suraId: parsed.suraId,
      suraSlug: parsed.suraSlug,
      suraNameBn: parsed.suraNameBn,
      ayahNumber: parsed.ayahNumber,
      mode: parsed.mode,
      updatedAt: parsed.updatedAt
    };
  } catch (e) {
    return null;
  }
}

export function saveLastRead(
  value: Omit<LastReadEntry, 'updatedAt'> & { updatedAt?: string }
) {
  if (typeof window === 'undefined') return;

  const next: LastReadEntry = {
    ...value,
    updatedAt: value.updatedAt || new Date().toISOString()
  };

  try {
    window.localStorage.setItem(LAST_READ_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent<LastReadEntry>(LAST_READ_UPDATED_EVENT, { detail: next }));
  } catch (e) {
    // ignore write errors
  }
}

export function buildLastReadHref(lastRead: LastReadEntry): string {
  const base = `/sura/${lastRead.suraId}/${lastRead.suraSlug}`;
  const path = lastRead.mode === 'both' ? base : `${base}/${lastRead.mode}`;
  return `${path}#ayah-${lastRead.ayahNumber}`;
}
