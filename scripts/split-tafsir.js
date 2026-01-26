/**
 * Script to split the tafsir JSON file into individual ayah files
 * Similar to how audio files are organized
 */

const fs = require('fs');
const path = require('path');

// Read the main tafsir file
const tafsirPath = path.join(__dirname, 'bn-tafsir-abu-bakr-zakaria.json');
const outputDir = path.join(__dirname, '..', 'lib', 'data', 'tafsirs');

console.log('Reading tafsir file...');
const tafsirData = JSON.parse(fs.readFileSync(tafsirPath, 'utf8'));

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

// Group tafsirs by sura
const tafsirsBySura = {};

Object.keys(tafsirData).forEach((key) => {
  const [suraId, ayahNumber] = key.split(':');
  const suraIdNum = parseInt(suraId, 10);
  const ayahNum = parseInt(ayahNumber, 10);

  if (!tafsirsBySura[suraIdNum]) {
    tafsirsBySura[suraIdNum] = {};
  }

  tafsirsBySura[suraIdNum][ayahNum] = tafsirData[key].text;
});

// Write individual sura files
Object.keys(tafsirsBySura).forEach((suraId) => {
  const paddedId = suraId.toString().padStart(3, '0');
  const fileName = `${paddedId}.json`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(tafsirsBySura[suraId], null, 2), 'utf8');
  console.log(`Created: ${fileName} with ${Object.keys(tafsirsBySura[suraId]).length} ayahs`);
});

console.log('\nTafsir split complete!');
console.log(`Total suras processed: ${Object.keys(tafsirsBySura).length}`);
