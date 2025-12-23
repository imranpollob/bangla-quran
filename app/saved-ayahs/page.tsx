import type { Metadata } from 'next';
import SavedAyahsPage from '@/components/saved-ayahs-page';

export const metadata: Metadata = {
  title: 'সংরক্ষিত আয়াত | Bangla Quran',
  description: 'আপনার সংরক্ষিত আয়াতগুলো দেখুন।',
  robots: { index: false, follow: false }
};

export default function Page() {
  return <SavedAyahsPage />;
}
