export type Mode = 'both' | 'arabic' | 'bangla';

export interface SuraMeta {
  id: number;
  slug: string;
  nameBn: string;
  nameAr: string;
  revelationPlace: 'makki' | 'madani';
  ayahCount: number;
  keywords: string[];
}

export const suraList: SuraMeta[] = [
  {
    id: 1,
    slug: 'al-fatihah',
    nameBn: 'সূরা আল ফাতিহা',
    nameAr: 'سُّوْرَةُ الْفَاتِحَةِ',
    revelationPlace: 'makki',
    ayahCount: 7,
    keywords: ['fatiha', 'fatihah', 'fateha']
  }
  // TODO: add remaining suras and sync audio/text metadata
];

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
