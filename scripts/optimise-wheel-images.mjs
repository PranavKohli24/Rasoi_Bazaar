import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, parse } from "path";

const INPUT_DIR = "public/wheels";
const OUTPUT_DIR = "public/wheels";

const files = (await readdir(INPUT_DIR)).filter(
  (f) => /\.(png|jpe?g)$/i.test(f)
);

console.log(`\nConverting ${files.length} images to lossless WebP...\n`);

await Promise.all(
  files.map(async (file) => {
    const inputPath = join(INPUT_DIR, file);
    const outputPath = join(OUTPUT_DIR, parse(file).name + ".webp");

    await sharp(inputPath)
      .webp({ lossless: true, effort: 6 })
      .toFile(outputPath);

    const before = (await stat(inputPath)).size;
    const after = (await stat(outputPath)).size;

    const saving = (((before - after) / before) * 100).toFixed(0);

    console.log(
      `✓ ${file.padEnd(30)} ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (${saving}% change)`
    );
  })
);

console.log("\n✅ All wheel images converted!\n");

// node scripts/optimise-wheel-images.mjs