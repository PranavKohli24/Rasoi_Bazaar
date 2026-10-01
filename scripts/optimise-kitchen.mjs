import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, parse } from "path";

const DIR = "public/kitchen";
const SCENE_FILE = /^kitchen\.(png|jpe?g)$/i;
const SCENE_WIDTH = 1600; // shown at ~1150px max, so 1600 covers retina
const ITEM_WIDTH = 600;   // equipment shows at ~300px max

const files = (await readdir(DIR)).filter((f) => /\.(png|jpe?g)$/i.test(f));
console.log(`\nConverting ${files.length} images in ${DIR}...\n`);

const rows = await Promise.all(
  files.map(async (file) => {
    const input = join(DIR, file);
    const output = join(DIR, parse(file).name + ".webp");
    const isScene = SCENE_FILE.test(file);

    const info = await sharp(input)
      .resize(isScene ? SCENE_WIDTH : ITEM_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: isScene ? 80 : 88, alphaQuality: 100, effort: 6 })
      .toFile(output);

    const before = (await stat(input)).size;
    return { file, before, after: info.size, width: info.width, height: info.height };
  })
);

for (const r of rows.sort((a, b) => a.file.localeCompare(b.file))) {
  const saving = (((r.before - r.after) / r.before) * 100).toFixed(0);
  console.log(
    `✓ ${r.file.padEnd(20)} ${(r.before / 1024).toFixed(0).padStart(5)} KB → ${(r.after / 1024)
      .toFixed(0)
      .padStart(4)} KB (${saving}% smaller)   size: ${r.width} x ${r.height}`
  );
}

console.log("\n✅ Done. Copy the 'size' numbers into KitchenEquipmentSelector.tsx.\n");