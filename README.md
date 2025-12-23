# Bangla Quran (Next.js preview)

SEO/PWA-friendly rebuild of the Bangla Quran site using Next.js (App Router) with room for Supabase auth/sync.

## Quick start
```bash
npm install
npm run dev
```

## What’s here
- App Router structure: `/` search page, `/sura/[id]/[slug]` (both), `/sura/[id]/[slug]/arabic`, `/bangla`.
- PWA essentials: manifest, sitemap, robots.txt; service worker to be added next.
- Theme toggle (light/dark) with persisted preference.
- Local bookmarks per ayah (saved in `localStorage`).
- Sample data for Surah Al-Fatihah in `lib/data/ayahs/001.json` and metadata in `lib/data/suras.ts`.
- Audio served from `public/audio` (symlinked to `../audio`).

## To do next
- Add remaining sura metadata/ayah JSON (script recommended to convert existing HTML).
- Wire Supabase auth + syncing layer for bookmarks/progress/streaks.
- Add service worker caching strategy for HTML/data/audio.
- Style refinements and accessibility pass on the reader UI.
