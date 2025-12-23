import SuraPage from '@/components/sura-page';
import { loadAyahsForSura } from '@/lib/data/loader';
import { getSuraById, normalizeMode, suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const siteUrl = 'https://banglaquran.app';
const modePaths = ['arabic', 'bangla'];

function buildMetadata(
  id: string,
  slug: string,
  mode: string,
  title: string
): Metadata {
  const url = `${siteUrl}/sura/${id}/${slug}/${mode}`;
  const canonical = `${siteUrl}/sura/${id}/${slug}`;
  return {
    title,
    alternates: {
      canonical,
      languages: {
        bn: canonical
      }
    },
    openGraph: {
      title,
      url
    },
    twitter: {
      title
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
  if (!sura) return buildMetadata(params.id, params.slug, params.mode, 'Sura not found');

  const title = `${sura.id}. ${sura.nameBn} | ${
    mode === 'arabic' ? 'আরবি' : 'বাংলা'
  }`;
  return buildMetadata(params.id, params.slug, mode, title);
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

  return <SuraPage sura={sura} ayahs={ayahs} mode={mode} slug={params.slug} />;
}
