import SuraPage from '@/components/sura-page';
import { loadAyahsForSura } from '@/lib/data/loader';
import { getSuraById, suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SuraMeta } from '@/lib/data/suras';

const siteUrl = 'https://banglaquran.app';
const ogImage = { url: '/quran.png', width: 1200, height: 630, alt: 'Bangla Quran' };

function formatRevelationPlace(revelationPlace?: SuraMeta['revelationPlace']) {
  if (!revelationPlace) return '';
  return revelationPlace === 'makki' ? 'মাক্কী' : 'মাদানী';
}

function buildDescription(sura: SuraMeta) {
  const revelation = formatRevelationPlace(sura.revelationPlace);
  const revelationText = revelation ? ` (${revelation})` : '';
  const nameAr = sura.nameAr ? ` (${sura.nameAr})` : '';
  return `সূরা ${sura.nameBn}${nameAr}${revelationText}। ${sura.ayahCount} আয়াত। আরবি পাঠ ও বাংলা অনুবাদসহ পড়ুন ও শুনুন।`;
}

function buildKeywords(sura: SuraMeta) {
  return [
    'Bangla Quran',
    'বাংলা কোরআন',
    'কোরআন',
    `সূরা ${sura.nameBn}`,
    sura.slug,
    sura.nameAr || undefined,
    ...sura.keywords
  ].filter((value): value is string => Boolean(value));
}

function buildMetadata(
  id: string,
  slug: string,
  title: string,
  description?: string,
  keywords?: string[]
): Metadata {
  const url = `${siteUrl}/sura/${id}/${slug}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Bangla Quran',
      images: [ogImage]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/quran.png']
    }
  };
}

export async function generateMetadata({
  params
}: {
  params: { id: string; slug: string };
}): Promise<Metadata> {
  const sura = getSuraById(Number(params.id));
  if (!sura) {
    return {
      title: 'Sura not found',
      robots: { index: false, follow: false }
    };
  }
  const title = `${sura.id}. ${sura.nameBn} | আরবি ও বাংলা অনুবাদ`;
  const description = buildDescription(sura);
  const keywords = buildKeywords(sura);
  return buildMetadata(params.id, params.slug, title, description, keywords);
}

export async function generateStaticParams() {
  return suraList.map((sura) => ({
    id: sura.id.toString(),
    slug: sura.slug
  }));
}

export default async function Page({
  params
}: {
  params: { id: string; slug: string };
}) {
  const sura = getSuraById(Number(params.id));
  if (!sura) return notFound();

  const ayahs = await loadAyahsForSura(sura.id);

  return <SuraPage sura={sura} ayahs={ayahs} mode="both" slug={params.slug} />;
}
