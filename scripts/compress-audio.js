#!/usr/bin/env node

/**
 * Compress Quran audio while keeping reasonable quality.
 *
 * Usage:
 *   node scripts/compress-audio.js --sura=1 [--bitrate=56] [--dest=audio/compressed]
 *   node scripts/compress-audio.js --all [--bitrate=56] [--dest=audio/compressed]
 *
 * - Re-encodes to MP3 using libmp3lame at the given CBR bitrate and mono channel.
 * - Processes both Arabic (`audio/arabic`) and Bangla (`audio/bt`) files for the given sura.
 */

const fs = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');

const args = process.argv.slice(2);

function getArg(name, fallback) {
  const match = args.find((arg) => arg.startsWith(`--${name}=`));
  if (!match) return fallback;
  return match.split('=')[1];
}

function hasFlag(name) {
  return args.includes(`--${name}`);
}

async function listMatching(dir, predicate) {
  const entries = await fs.readdir(dir);
  return entries.filter(predicate).sort();
}

function compressFile(input, output, bitrateKbps) {
  return new Promise((resolve, reject) => {
    const ff = spawn(
      'ffmpeg',
      [
        '-y',
        '-i',
        input,
        '-vn',
        '-codec:a',
        'libmp3lame',
        '-b:a',
        `${bitrateKbps}k`,
        '-ac',
        '1',
        output
      ],
      { stdio: ['ignore', 'inherit', 'inherit'] }
    );

    ff.on('error', reject);
    ff.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code} for ${input}`));
    });
  });
}

async function main() {
  const bitrate = parseInt(getArg('bitrate', '56'), 10);
  const destRoot = getArg('dest', 'audio/compressed');
  const srcRoot = 'audio';

  async function compressSura(suraId) {
    const suraPrefix3 = String(suraId).padStart(3, '0');
    const banglaPrefix = `${suraId}-`;

    const arabicSrcDir = path.join(srcRoot, 'arabic');
    const banglaSrcDir = path.join(srcRoot, 'bt');
    const arabicDestDir = path.join(destRoot, 'arabic');
    const banglaDestDir = path.join(destRoot, 'bt');

    await fs.mkdir(arabicDestDir, { recursive: true });
    await fs.mkdir(banglaDestDir, { recursive: true });

    const arabicFiles = await listMatching(arabicSrcDir, (name) =>
      name.startsWith(suraPrefix3) && name.endsWith('.mp3')
    );
    const banglaFiles = await listMatching(banglaSrcDir, (name) =>
      name.startsWith(banglaPrefix) && name.endsWith('.mp3')
    );

    const tasks = [
      ...arabicFiles.map((file) => ({
        input: path.join(arabicSrcDir, file),
        output: path.join(arabicDestDir, file)
      })),
      ...banglaFiles.map((file) => ({
        input: path.join(banglaSrcDir, file),
        output: path.join(banglaDestDir, file)
      }))
    ];

    if (!tasks.length) {
      console.log(`No files found for sura ${suraId}`);
      return;
    }

    console.log(
      `Compressing sura ${suraId} (${tasks.length} files) -> ${destRoot} at ${bitrate}k mono`
    );

    const results = [];
    for (const task of tasks) {
      const before = (await fs.stat(task.input)).size;
      await compressFile(task.input, task.output, bitrate);
      const after = (await fs.stat(task.output)).size;
      results.push({ ...task, before, after });
      const pct = (((before - after) / before) * 100).toFixed(1);
      console.log(
        `✓ ${path.basename(task.input)}: ${(before / 1024).toFixed(1)} KB -> ${(after / 1024).toFixed(1)} KB (${pct}% saved)`
      );
    }

    const totalBefore = results.reduce((sum, r) => sum + r.before, 0);
    const totalAfter = results.reduce((sum, r) => sum + r.after, 0);
    const totalPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
    console.log(
      `Done. Total: ${(totalBefore / 1024).toFixed(1)} KB -> ${(totalAfter / 1024).toFixed(1)} KB (${totalPct}% saved)`
    );
  }

  if (hasFlag('all')) {
    for (let suraId = 1; suraId <= 114; suraId += 1) {
      await compressSura(suraId);
    }
    return;
  }

  const suraInput = getArg('sura');
  if (!suraInput) {
    console.error(
      'Usage: node scripts/compress-audio.js --sura=<number> [--bitrate=56] [--dest=audio/compressed]\n' +
        '   or: node scripts/compress-audio.js --all [--bitrate=56] [--dest=audio/compressed]'
    );
    process.exit(1);
  }

  const suraId = parseInt(suraInput, 10);
  if (Number.isNaN(suraId) || suraId < 0) {
    console.error(`Invalid sura: ${suraInput}`);
    process.exit(1);
  }

  await compressSura(suraId);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
