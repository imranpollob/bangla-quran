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
