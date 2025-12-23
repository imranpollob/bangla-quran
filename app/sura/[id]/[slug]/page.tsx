import SuraPage from '@/components/sura-page';
import { loadAyahsForSura } from '@/lib/data/loader';
import { getSuraById, suraList } from '@/lib/data/suras';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const siteUrl = 'https://banglaquran.app';

function buildMetadata(id: string, slug: string, title: string): Metadata {
  const url = `${siteUrl}/sura/${id}/${slug}`;
  return {
    title,
    alternates: { canonical: url },
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
  params: { id: string; slug: string };
}): Promise<Metadata> {
  const sura = getSuraById(Number(params.id));
  if (!sura) return buildMetadata(params.id, params.slug, 'Sura not found');
  const title = `${sura.id}. ${sura.nameBn} | আরবি ও বাংলা অনুবাদ`;
  return buildMetadata(params.id, params.slug, title);
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
