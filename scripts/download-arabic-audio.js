#!/usr/bin/env node

/**
 * Download Arabic audio from everyayah.com (Alafasy_64kbps).
 *
 * Usage:
 *   node scripts/download-arabic-audio.js --sura=40 [--start=1] [--end=85]
 *   node scripts/download-arabic-audio.js --list=mismatch.md
 *
 * Options:
 *   --dest=audio/arabic        Output directory (default: audio/arabic)
 *   --base=https://.../        Base URL (default: Alafasy_64kbps)
 *   --concurrency=4            Parallel downloads (default: 3)
 *   --force                    Overwrite existing files
 */

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const https = require('https');
const { pipeline } = require('stream/promises');

const args = process.argv.slice(2);

function getArg(name, fallback) {
  const match = args.find((arg) => arg.startsWith(`--${name}=`));
  if (!match) return fallback;
  return match.split('=').slice(1).join('=');
}

function hasFlag(name) {
  return args.includes(`--${name}`);
}

function pad(value, width) {
  return String(value).padStart(width, '0');
}

async function readSuraCount(suraId) {
  const dataPath = path.join(__dirname, '..', 'lib', 'data', 'suras.json');
  const raw = await fsp.readFile(dataPath, 'utf8');
  const suras = JSON.parse(raw);
  const sura = suras.find((item) => item.id === suraId);
  return sura ? sura.ayahCount : null;
}

async function parseListFile(filePath) {
  const raw = await fsp.readFile(filePath, 'utf8');
  const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const pairs = [];
  const pattern = /(\d+)-(\d+)\.mp3$/;
  for (const line of lines) {
    const match = line.match(pattern);
    if (!match) continue;
    pairs.push({ suraId: Number(match[1]), ayah: Number(match[2]) });
  }
  return pairs;
}

function buildUrl(base, suraId, ayah) {
  return `${base}${pad(suraId, 3)}${pad(ayah, 3)}.mp3`;
}

async function downloadFile(url, destPath) {
  const res = await new Promise((resolve, reject) => {
    https
      .get(url, (response) => resolve(response))
      .on('error', reject);
  });

  if (res.statusCode !== 200) {
    res.resume();
    throw new Error(`HTTP ${res.statusCode} for ${url}`);
  }

  await pipeline(res, fs.createWriteStream(destPath));
}

async function runQueue(items, worker, concurrency) {
  let index = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const current = items[index];
      index += 1;
      await worker(current);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const destRoot = getArg('dest', 'audio/arabic');
  const base = getArg(
    'base',
    'https://everyayah.com/data/Alafasy_64kbps/'
  );
  const concurrency = Math.max(1, parseInt(getArg('concurrency', '3'), 10));
  const force = hasFlag('force');

  const tasks = [];

  const listPath = getArg('list');
  if (listPath) {
    const listPairs = await parseListFile(listPath);
    tasks.push(...listPairs);
  }

  const suraInput = getArg('sura');
  if (suraInput) {
    const suraId = parseInt(suraInput, 10);
    if (Number.isNaN(suraId) || suraId < 0) {
      console.error(`Invalid sura: ${suraInput}`);
      process.exit(1);
    }
    const start = parseInt(getArg('start', '1'), 10);
    let end = getArg('end');
    if (end == null || end === '') {
      const count = await readSuraCount(suraId);
      if (!count) {
        console.error(`Unknown sura ${suraId}. Provide --end explicitly.`);
        process.exit(1);
      }
      end = String(count);
    }
    const endNum = parseInt(end, 10);
    if (Number.isNaN(start) || Number.isNaN(endNum) || start < 0 || endNum < start) {
      console.error(`Invalid range: start=${start} end=${end}`);
      process.exit(1);
    }
    for (let ayah = start; ayah <= endNum; ayah += 1) {
      tasks.push({ suraId, ayah });
    }
  }

  if (!tasks.length) {
    console.error(
      'Usage: node scripts/download-arabic-audio.js --sura=<id> [--start=1] [--end=<n>] [--dest=audio/arabic]\n' +
        '   or: node scripts/download-arabic-audio.js --list=mismatch.md'
    );
    process.exit(1);
  }

  const unique = new Map();
  for (const task of tasks) {
    if (!Number.isInteger(task.suraId) || !Number.isInteger(task.ayah)) continue;
    unique.set(`${task.suraId}-${task.ayah}`, task);
  }

  const entries = Array.from(unique.values());
  await fsp.mkdir(destRoot, { recursive: true });

  console.log(
    `Downloading ${entries.length} file(s) -> ${destRoot} (concurrency=${concurrency})`
  );

  await runQueue(
    entries,
    async ({ suraId, ayah }) => {
      const fileName = `${pad(suraId, 3)}${pad(ayah, 3)}.mp3`;
      const destPath = path.join(destRoot, fileName);
      if (!force) {
        try {
          await fsp.access(destPath);
          console.log(`- skip ${fileName} (exists)`);
          return;
        } catch (e) {
          // continue
        }
      }
      const url = buildUrl(base, suraId, ayah);
      try {
        await downloadFile(url, destPath);
        console.log(`+ ${fileName}`);
      } catch (err) {
        console.error(`! failed ${fileName}: ${err.message}`);
      }
    },
    concurrency
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
