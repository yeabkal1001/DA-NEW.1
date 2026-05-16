import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '../public/images/image sequence 2');
const outputDir = path.join(__dirname, '../public/images/image sequence 2 processed');

async function processImages() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const files = await fs.readdir(inputDir);
    const webpFiles = files.filter(f => f.endsWith('.webp')).sort();

    console.log(`Found ${webpFiles.length} images in total.`);

    for (const file of webpFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      try {
        await fs.access(outputPath);
        // console.log(`Skipping ${file}, already exists.`);
        continue;
      } catch {
        // File doesn't exist, process it
      }

      console.log(`Processing ${file}...`);
      try {
        const blob = await removeBackground(inputPath);
        const buffer = Buffer.from(await blob.arrayBuffer());
        await fs.writeFile(outputPath, buffer);
        console.log(`Done: ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
    console.log('All processing complete!');
  } catch (err) {
    console.error('Fatal error:', err);
  }
}

processImages();
