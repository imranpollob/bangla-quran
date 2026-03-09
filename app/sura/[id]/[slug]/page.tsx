import SuraPage from '@/components/sura-page';
import { loadAyahsForSura, loadTafsirForSura } from '@/lib/data/loader';
import { getSuraById, suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SuraMeta } from '@/lib/data/suras';
import { toBnDigits } from '@/lib/format';
import { buildSuraUrl, serializeJsonLd, siteName, siteUrl } from '@/lib/seo';

const ogImage = { url: '/quran.png', width: 1200, height: 630, alt: siteName };

function formatRevelationPlace(revelationPlace?: SuraMeta['revelationPlace']) {
  if (!revelationPlace) return '';
  return revelationPlace === 'makki' ? 'মাক্কী' : 'মাদানী';
}

function buildDescription(sura: SuraMeta) {
  const revelation = formatRevelationPlace(sura.revelationPlace);
  const revelationText = revelation ? ` (${revelation})` : '';
  const nameAr = sura.nameAr ? ` (${sura.nameAr})` : '';
  return `সূরা ${sura.nameBn}${nameAr}${revelationText}। ${sura.ayahCount} আয়াত। আরবি ও বাংলা অনুবাদসহ পড়ুন ও শুনুন।`;
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
  const url = buildSuraUrl(id, slug);
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
      siteName,
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
  const tafsirs = await loadTafsirForSura(sura.id);
  const url = buildSuraUrl(params.id, params.slug);
  const description = buildDescription(sura);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${toBnDigits(sura.id)}. ${sura.nameBn}`,
      url,
      inLanguage: 'bn-BD',
      description,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl
      },
      breadcrumb: {
        '@id': `${url}#breadcrumb`
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'বাংলা কোরআন',
          item: siteUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: `সূরা ${sura.nameBn}`,
          item: url
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <SuraPage sura={sura} ayahs={ayahs} tafsirs={tafsirs} mode="both" slug={params.slug} />
    </>
  );
}
