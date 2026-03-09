import SuraPage from '@/components/sura-page';
import { loadAyahsForSura, loadTafsirForSura } from '@/lib/data/loader';
import { getSuraById, normalizeMode, suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SuraMeta } from '@/lib/data/suras';
import { buildSuraUrl, serializeJsonLd, siteName, siteUrl } from '@/lib/seo';
import { toBnDigits } from '@/lib/format';

const ogImage = { url: '/quran.png', width: 1200, height: 630, alt: siteName };
const modePaths = ['arabic', 'bangla'];

function formatRevelationPlace(revelationPlace?: SuraMeta['revelationPlace']) {
  if (!revelationPlace) return '';
  return revelationPlace === 'makki' ? 'মাক্কী' : 'মাদানী';
}

function buildDescription(sura: SuraMeta, mode: 'arabic' | 'bangla') {
  const revelation = formatRevelationPlace(sura.revelationPlace);
  const revelationText = revelation ? ` (${revelation})` : '';
  const nameAr = sura.nameAr ? ` (${sura.nameAr})` : '';
  const modeText = mode === 'arabic' ? 'আরবি' : 'বাংলা অনুবাদ';
  return `সূরা ${sura.nameBn}${nameAr}${revelationText}। ${sura.ayahCount} আয়াত। ${modeText} পড়ুন ও শুনুন।`;
}

function buildKeywords(sura: SuraMeta, mode: 'arabic' | 'bangla') {
  const modeLabel = mode === 'arabic' ? 'আরবি' : 'বাংলা';
  return [
    'Bangla Quran',
    'বাংলা কোরআন',
    'কোরআন',
    `সূরা ${sura.nameBn}`,
    `${modeLabel} সূরা`,
    sura.slug,
    sura.nameAr || undefined,
    ...sura.keywords
  ].filter((value): value is string => Boolean(value));
}

function buildMetadata(
  id: string,
  slug: string,
  mode: string,
  title: string,
  description?: string,
  keywords?: string[]
): Metadata {
  const url = buildSuraUrl(id, slug, mode);
  const canonicalUrl = buildSuraUrl(id, slug);
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: false,
      follow: true
    },
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
  params: { id: string; slug: string; mode: string };
}): Promise<Metadata> {
  const sura = getSuraById(Number(params.id));
  const mode = normalizeMode(params.mode);
  if (!sura || mode === 'both') {
    return {
      title: 'Sura not found',
      robots: { index: false, follow: false }
    };
  }

  const title = `${sura.id}. ${sura.nameBn} | ${mode === 'arabic' ? 'আরবি' : 'বাংলা'
    }`;
  const description = buildDescription(sura, mode === 'arabic' ? 'arabic' : 'bangla');
  const keywords = buildKeywords(sura, mode === 'arabic' ? 'arabic' : 'bangla');
  return buildMetadata(params.id, params.slug, mode, title, description, keywords);
}

export async function generateStaticParams() {
  return suraList.flatMap((sura) =>
    modePaths.map((mode) => ({
      id: sura.id.toString(),
      slug: sura.slug,
      mode
    }))
  );
}

export default async function Page({
  params
}: {
  params: { id: string; slug: string; mode: string };
}) {
  const sura = getSuraById(Number(params.id));
  const mode = normalizeMode(params.mode);
  if (!sura || mode === 'both') return notFound();

  const ayahs = await loadAyahsForSura(sura.id);
  const tafsirs = await loadTafsirForSura(sura.id);
  const url = buildSuraUrl(params.id, params.slug, mode);
  const description = buildDescription(sura, mode);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${toBnDigits(sura.id)}. ${sura.nameBn} - ${mode === 'arabic' ? 'আরবি' : 'বাংলা অনুবাদ'
        }`,
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
          item: buildSuraUrl(params.id, params.slug)
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: mode === 'arabic' ? 'আরবি' : 'বাংলা অনুবাদ',
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
      <SuraPage sura={sura} ayahs={ayahs} tafsirs={tafsirs} mode={mode} slug={params.slug} />
    </>
  );
}
