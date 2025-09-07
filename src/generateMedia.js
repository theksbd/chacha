// scripts/generateMedia.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mediaDir = path.join(__dirname, '../media');
const outputFile = path.join(__dirname, '../src/media.js');

// Allowed extensions
const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const videoExts = ['.mp4', '.mov', '.avi', '.webm'];

// Read files in folder
const files = fs.readdirSync(mediaDir);

const mediaArray = files
  .map(file => {
    const ext = path.extname(file).toLowerCase();
    const type = imageExts.includes(ext)
      ? 'image'
      : videoExts.includes(ext)
      ? 'video'
      : null;

    if (!type) return null;

    return { type, src: `./media/${file}` };
  })
  .filter(Boolean);

// Generate JS file
const content =
  `// Auto-generated file, do not edit manually\n` +
  `export const media = ${JSON.stringify(mediaArray, null, 2)};\n`;

fs.writeFileSync(outputFile, content, 'utf-8');

console.log(`✅ Media list generated with ${mediaArray.length} files.`);
