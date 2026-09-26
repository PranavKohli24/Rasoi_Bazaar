import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, parse } from "path";

const INPUT_DIR  = "public/dishes";
const OUTPUT_DIR = "public/dishes";
const TARGET_WIDTH = 600;   // 2× retina for 176 px display slot
const QUALITY = 95;          // 90 = near-lossless, virtually indistinguishable

const files = (await readdir(INPUT_DIR)).filter(f => /\.(png|jpe?g)$/i.test(f));
console.log(`\nConverting ${files.length} images at quality ${QUALITY}...\n`);

await Promise.all(files.map(async file => {
  const inputPath  = join(INPUT_DIR, file);
  const outputPath = join(OUTPUT_DIR, parse(file).name + ".webp");

  await sharp(inputPath)
    .resize(TARGET_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outputPath);

  const before = (await stat(inputPath)).size;
  const after  = (await stat(outputPath)).size;
  const saving = (((before - after) / before) * 100).toFixed(0);

  console.log(`✓  ${file.padEnd(35)} ${(before/1024).toFixed(0).padStart(5)} KB  →  ${(after/1024).toFixed(0).padStart(4)} KB  (${saving}% smaller)`);
}));

console.log("\n✅ All done! You can now delete the original .png files.\n");