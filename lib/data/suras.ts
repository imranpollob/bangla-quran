import suraData from './suras.json';

export type Mode = 'both' | 'arabic' | 'bangla';

export interface SuraMeta {
  id: number;
  slug: string;
  nameBn: string;
  nameAr: string;
  ayahCount: number;
  keywords: string[];
  revelationPlace?: 'makki' | 'madani';
}

export const suraList: SuraMeta[] = suraData as SuraMeta[];

export const modes: Mode[] = ['both', 'arabic', 'bangla'];

export function getSuraById(id: number): SuraMeta | undefined {
  return suraList.find((s) => s.id === id);
}

export function padSuraId(id: number): string {
  return id.toString().padStart(3, '0');
}

export function normalizeMode(mode?: string): Mode {
  if (mode === 'arabic') return 'arabic';
  if (mode === 'bangla') return 'bangla';
  return 'both';
}
