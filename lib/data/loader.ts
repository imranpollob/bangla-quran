import { padSuraId } from './suras';
import type { Ayah } from './types';

export async function loadAyahsForSura(id: number): Promise<Ayah[]> {
  const padded = padSuraId(id);
  // Dynamic import keeps this tree-shakable while allowing static JSON lookup.
  const data: Ayah[] = await import(`./ayahs/${padded}.json`).then(
    (mod) => mod.default || mod
  );
  return data;
}

export async function loadTafsirForSura(id: number): Promise<Record<number, string>> {
  const padded = padSuraId(id);
  try {
    const data: Record<number, string> = await import(`./tafsirs/${padded}.json`).then(
      (mod) => mod.default || mod
    );
    return data;
  } catch (error) {
    console.warn(`Tafsir not found for sura ${id}`);
    return {};
  }
}
