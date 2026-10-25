/**
 * One-off / occasional build script: reads every predefined recipe's
 * image from /public/dishes, extracts a soft background tint using the
 * same color math the app uses at runtime (imported from utils/dishTint.ts),
 * and writes the results to data/dishTints.json.
 *
 * Runs ONCE per image (or whenever you add/change predefined dishes) — not
 * in the browser, not per page load — so it costs zero runtime performance.
 * Since it's a one-time cost, this samples at a much higher resolution than
 * the browser fallback does (180x180 vs 90x90) for more accurate clustering.
 *
 * Destination: scripts/generateDishTints.ts
 *
 * Setup (one time):
 *   npm install --save-dev sharp tsx
 *
 * Run (whenever predefinedRecipes.ts or /public/dishes changes):
 *   npx tsx scripts/generateDishTints.ts
 *
 * Safe to re-run any time — it just overwrites dishTints.json.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { predefinedRecipes } from "../data/predefinedRecipes";
import {
  pickDominantColor,
  toBackgroundTint,
  computeCenterWeight,
  RGB,
} from "../utils/dishTint";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const OUTPUT_PATH = path.resolve(process.cwd(), "data", "dishTints.json");

const SAMPLE_SIZE = 180; // generous — this is a one-time cost, not per-pageload

async function extractTintForImage(imagePath: string): Promise<string | null> {
  try {
    const metadata = await sharp(imagePath).metadata();
    if (!metadata.width || !metadata.height) return null;

    const { data, info } = await sharp(imagePath)
      .resize(SAMPLE_SIZE, SAMPLE_SIZE, { fit: "fill" }) // stretch, don't crop — nothing gets excluded
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixels: RGB[] = [];
    const weights: number[] = [];
    let idx = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      const col = idx % SAMPLE_SIZE;
      const row = Math.floor(idx / SAMPLE_SIZE);
      pixels.push([data[i], data[i + 1], data[i + 2]]);
      weights.push(computeCenterWeight(col, row, SAMPLE_SIZE));
      idx++;
    }

    const dominant = pickDominantColor(pixels, weights);
    return dominant ? toBackgroundTint(dominant) : null;
  } catch (err) {
    console.warn(`  ! Could not process ${imagePath}: ${(err as Error).message}`);
    return null;
  }
}

async function main() {
  const entries = Object.values(predefinedRecipes);

  // Several recipe keys/aliases can point at the same dish/image — de-dupe
  // by dishName so we don't process the same file twice.
  const uniqueByDishName = new Map<string, string>();
  for (const recipe of entries) {
    if (recipe.image && !uniqueByDishName.has(recipe.dishName)) {
      uniqueByDishName.set(recipe.dishName, recipe.image);
    }
  }

  console.log(`Found ${uniqueByDishName.size} unique dish images to process.\n`);

  const result: Record<string, string> = {};
  let done = 0;
  let skipped = 0;

  for (const [dishName, imageUrl] of uniqueByDishName) {
    const absolutePath = path.join(PUBLIC_DIR, imageUrl.replace(/^\//, ""));

    if (!fs.existsSync(absolutePath)) {
      console.warn(`  ! Missing file for "${dishName}": ${absolutePath}`);
      skipped++;
      continue;
    }

    const tint = await extractTintForImage(absolutePath);
    if (tint) {
      result[dishName] = tint;
      done++;
    } else {
      skipped++;
    }

    if ((done + skipped) % 50 === 0) {
      console.log(`  ...${done + skipped}/${uniqueByDishName.size}`);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2) + "\n");

  console.log(`\nDone. ${done} tints written, ${skipped} skipped.`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});

// npx tsx scripts/generateDishTints.ts