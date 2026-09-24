import SuraPage from '@/components/sura-page';
import { loadAyahsForSura, loadTafsirForSura } from '@/lib/data/loader';
import { getSuraById, suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SuraMeta } from '@/lib/data/suras';
import { toBnDigits } from '@/lib/format';
import {
  buildSuraUrl,
  defaultOgImage,
  serializeJsonLd,
  siteLocale,
  siteName,
  siteUrl
} from '@/lib/seo';

const ogImage = defaultOgImage;

function formatRevelationPlace(revelationPlace?: SuraMeta['revelationPlace']) {
  if (!revelationPlace) return '';
  return revelationPlace === 'makki' ? 'মাক্কী' : 'মাদানী';
}

function buildDescription(sura: SuraMeta) {
  const revelation = formatRevelationPlace(sura.revelationPlace);
  const revelationText = revelation ? ` (${revelation})` : '';
  const nameAr = sura.nameAr ? ` (${sura.nameAr})` : '';
  return `সূরা ${sura.nameBn}${nameAr}${revelationText}। মোট ${toBnDigits(
    sura.ayahCount
  )} আয়াত। আরবি তেলাওয়াত, বাংলা অনুবাদ ও তাফসিরসহ পড়ুন ও শুনুন।`;
}

function buildKeywords(sura: SuraMeta) {
  const normalizedName = sura.nameBn.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
  return [
    'Bangla Quran',
    'বাংলা কোরআন',
    'কোরআন',
    `সূরা ${sura.nameBn}`,
    `${sura.nameBn} বাংলা অর্থ`,
    `${normalizedName} tafsir`,
    `${sura.slug} bangla`,
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
    alternates: {
      canonical: url,
      languages: {
        'bn-BD': url,
        bn: url,
        'x-default': url
      }
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
  params: { id: string; slug: string };
}): Promise<Metadata> {
  const sura = getSuraById(Number(params.id));
  if (!sura) {
    return {
      title: 'Sura not found',
      robots: { index: false, follow: false }
    };
  }
  const title = `${toBnDigits(sura.id)}. সূরা ${sura.nameBn}${sura.nameAr ? ` (${sura.nameAr})` : ''
    } | বাংলা অনুবাদ, তাফসির ও অডিও`;
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
      inLanguage: siteLocale,
      description,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl
      },
      about: [
        {
          '@type': 'Thing',
          name: `Surah ${sura.slug}`
        },
        {
          '@type': 'Thing',
          name: 'Quran tafsir and translation in Bangla'
        }
      ],
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: `সূরা ${sura.nameBn}`,
      inLanguage: ['ar', siteLocale],
      isPartOf: {
        '@type': 'Book',
        name: 'Al-Quran'
      },
      learningResourceType: 'Religious text with translation and tafsir',
      url
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
