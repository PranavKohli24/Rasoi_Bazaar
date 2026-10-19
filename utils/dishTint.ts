/**
 * Everything for the recipe-page background tint, in one file:
 *   - color math (LAB-space, center-weighted k-means dominant-color
 *     extraction, pastel conversion)
 *   - browser canvas extraction (fallback for AI-generated dishes)
 *   - the public getDishTint() entry point, used by useDishTint.ts
 *
 * Two things make this work where a naive "average the pixels" approach
 * doesn't:
 *
 *   1. Clustering happens in LAB space, not raw RGB. In plain RGB,
 *      "tomato red", "turmeric orange" and "roti brown" sit close enough
 *      together that distance-based clustering blurs them into one bucket.
 *      LAB is built to match human color perception, so hues that actually
 *      look different to the eye end up measurably far apart to the
 *      algorithm too.
 *
 *   2. Every sampled pixel carries a WEIGHT based on how close it sits to
 *      the center of the frame (a smooth Gaussian falloff, not a hard
 *      crop) — center pixels count the most, near-center pixels count
 *      moderately, and edge/corner pixels (plate rim, table, props)
 *      barely register. This is used both when clustering (weighted
 *      centroids) and when picking the winning cluster (weighted size),
 *      so the food itself — which is almost always centered in a dish
 *      photo — dominates the result.
 *
 * Destination: utils/dishTint.ts
 */

import { Recipe } from "../types";
import dishTints from "../data/dishTints.json";
import dishTintOverrides from "../data/dishTintOverrides.json";

export type RGB = [number, number, number];
type LAB = [number, number, number];

export const DEFAULT_TINT = "hsl(30, 15%, 96%)"; // matches the current cream (#FFF8F1-ish)

/* ---------------------------------------------------------- color math */

export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return [0, 0, l * 100];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  switch (max) {
    case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
    case gn: h = ((bn - rn) / d + 2) / 6; break;
    default: h = ((rn - gn) / d + 4) / 6;
  }

  return [h * 360, s * 100, l * 100];
};

/* ---- sRGB <-> CIE LAB (D65), standard formulas ---- */

const srgbToLinear = (c: number): number => {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
};

const linearToSrgb = (c: number): number => {
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(v * 255)));
};

const Xn = 0.95047, Yn = 1.0, Zn = 1.08883; // D65 reference white

const rgbToLab = (r: number, g: number, b: number): LAB => {
  const rl = srgbToLinear(r), gl = srgbToLinear(g), bl = srgbToLinear(b);

  const x = (rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375) / Xn;
  const y = (rl * 0.2126729 + gl * 0.7151522 + bl * 0.072175) / Yn;
  const z = (rl * 0.0193339 + gl * 0.119192 + bl * 0.9503041) / Zn;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x), fy = f(y), fz = f(z);

  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
};

const labToRgb = ([L, a, b]: LAB): RGB => {
  const fy = (L + 16) / 116;
  const fx = fy + a / 500;
  const fz = fy - b / 200;

  const finv = (t: number) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);
  const x = finv(fx) * Xn, y = finv(fy) * Yn, z = finv(fz) * Zn;

  const rl = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  const gl = x * -0.969266 + y * 1.8760108 + z * 0.041556;
  const bl = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  return [linearToSrgb(rl), linearToSrgb(gl), linearToSrgb(bl)];
};

/**
 * A food photo is usually taller or wider than it is tall — this trims
 * only enough off the longer dimension to make it square (centered), so
 * sampling can map cleanly onto a square grid. This is NOT the main
 * center-prioritization mechanism (that's computeCenterWeight below) —
 * it just avoids stretching/distorting the image when fitting it to a
 * square sample.
 */
export const computeSquareCropRect = (width: number, height: number) => {
  const side = Math.min(width, height);
  const x = Math.round((width - side) / 2);
  const y = Math.round((height - side) / 2);
  return { x, y, side };
};

// Higher = sharper falloff toward the edges (more aggressively centered).
const CENTER_WEIGHT_ALPHA = 2.2;

/**
 * The actual center-prioritization: a smooth Gaussian weight for a pixel
 * at (col, row) in a `size`x`size` sample grid. 1.0 dead center, fading
 * toward 0 at the corners — continuous, not a hard cutoff, so "center,
 * then near-center, then edges last" is a gradient rather than an
 * in-or-out decision.
 */
export const computeCenterWeight = (col: number, row: number, size: number): number => {
  const c = (size - 1) / 2;
  const dx = (col - c) / c;
  const dy = (row - c) / c;
  const dist2 = dx * dx + dy * dy; // 0 at center, ~2 at a corner
  return Math.exp(-CENTER_WEIGHT_ALPHA * dist2);
};

const distSq3 = (a: readonly number[], b: readonly number[]): number => {
  const d0 = a[0] - b[0], d1 = a[1] - b[1], d2 = a[2] - b[2];
  return d0 * d0 + d1 * d1 + d2 * d2;
};

/** Weighted k-means: centroids and cluster sizes are both weight-sums, not raw counts. */
const kMeansClusterWeighted = (
  points: LAB[],
  weights: number[],
  k: number,
  iterations: number
): { centroid: LAB; weight: number }[] => {
  if (points.length === 0) return [];
  const n = points.length;
  const clusterCount = Math.min(k, n);

  let centroids: LAB[] = Array.from({ length: clusterCount }, (_, i) => points[Math.floor((i * n) / clusterCount)]);
  let assignments = new Array(n).fill(0);

  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < n; i++) {
      let bestCluster = 0;
      let bestDist = Infinity;
      for (let c = 0; c < clusterCount; c++) {
        const d = distSq3(points[i], centroids[c]);
        if (d < bestDist) { bestDist = d; bestCluster = c; }
      }
      assignments[i] = bestCluster;
    }

    const sums = Array.from({ length: clusterCount }, () => [0, 0, 0] as [number, number, number]);
    const weightSums = new Array(clusterCount).fill(0);
    for (let i = 0; i < n; i++) {
      const c = assignments[i];
      const w = weights[i];
      sums[c][0] += points[i][0] * w;
      sums[c][1] += points[i][1] * w;
      sums[c][2] += points[i][2] * w;
      weightSums[c] += w;
    }
    for (let c = 0; c < clusterCount; c++) {
      if (weightSums[c] > 0) {
        centroids[c] = [sums[c][0] / weightSums[c], sums[c][1] / weightSums[c], sums[c][2] / weightSums[c]];
      }
    }
  }

  const finalWeights = new Array(clusterCount).fill(0);
  for (let i = 0; i < n; i++) finalWeights[assignments[i]] += weights[i];

  return centroids.map((centroid, i) => ({ centroid, weight: finalWeights[i] }));
};

// Compute doesn't matter — this runs once per image at build time (and is
// still trivially fast in the browser fallback).
const K = 8;
const ITERATIONS = 15;

/**
 * Finds the most representative FOOD color among sampled RGB pixels, each
 * with an optional center-proximity weight (see computeCenterWeight).
 * Without weights, every pixel counts equally (used by filtering checks
 * elsewhere); the sampling code below always supplies real weights.
 */
export const pickDominantColor = (pixels: RGB[], weights?: number[]): RGB | null => {
  if (pixels.length === 0) return null;
  const w = weights ?? pixels.map(() => 1);

  const filteredPixels: RGB[] = [];
  const filteredWeights: number[] = [];
  for (let i = 0; i < pixels.length; i++) {
    const [r, g, b] = pixels[i];
    const [, s, l] = rgbToHsl(r, g, b);
    if (l > 97 || l < 6) continue; // only drop blown-out highlights / near-black shadow — keep genuinely pale food (rice, curd, coconut) in play
    filteredPixels.push(pixels[i]);
    filteredWeights.push(w[i]);
  }

  // If filtering removed almost everything (a near-monochrome photo),
  // fall back to the unfiltered set rather than clustering on noise.
  const usablePixels = filteredPixels.length >= 20 ? filteredPixels : pixels;
  const usableWeights = filteredPixels.length >= 20 ? filteredWeights : w;

  const labPoints = usablePixels.map(([r, g, b]) => rgbToLab(r, g, b));
  const clusters = kMeansClusterWeighted(labPoints, usableWeights, K, ITERATIONS).filter((c) => c.weight > 0);
  if (clusters.length === 0) return null;

  const totalWeight = usableWeights.reduce((a, b) => a + b, 0);
  let bestScore = -Infinity;
  let bestRgb: RGB = labToRgb(clusters[0].centroid);

  for (const cluster of clusters) {
    const rgb = labToRgb(cluster.centroid);
    const [, s] = rgbToHsl(...rgb);
    const weightFrac = cluster.weight / totalWeight;

    // sqrt on weight share = diminishing returns for just covering more of
    // the (center-weighted) frame; power >1 on saturation = strongly
    // reward genuinely vivid clusters even when they're a smaller share.
        // Size now matters roughly proportionally (not compressed by sqrt), and
    // saturation gives a meaningful but bounded boost — enough for a vivid
    // turmeric-yellow or tomato-red region to win over a duller same-size
    // region, but not enough for a small saturated accent (a garnish, a
    // bowl's rim) to override a dish that's genuinely pale overall.
    const score = Math.pow(weightFrac, 0.8) * (0.4 + (s / 100) * 1.4);

    if (score > bestScore) {
      bestScore = score;
      bestRgb = rgb;
    }
  }

  return bestRgb;
};

/**
 * Converts a dominant food color into a soft but clearly-colored page
 * background tint. Preserves more of the source's real saturation spread
 * (a muted source stays subtler, a vivid source reads clearly) instead of
 * flattening every dish into the same narrow pastel band.
 */
// The brand orange (#FC6C26) sits at roughly this hue — buttons, icons,
// and the "saffron" accent throughout the UI all live here.
const BRAND_HUE = 21;

const hueDistance = (a: number, b: number): number => {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
};

export const toBackgroundTint = (rgb: RGB): string => {
  const [h, s] = rgbToHsl(...rgb);
  const tintSaturation = Math.min(55, Math.max(18, s * 0.9));
  const tintLightness = 80;
  return `hsl(${Math.round(h)}, ${Math.round(tintSaturation)}%, ${tintLightness}%)`;
};

/* ------------------------------------------------- browser extraction */

const SAMPLE_SIZE = 90;

/**
 * Loads an image (same-origin only), draws a center-cropped-to-square
 * version to a small offscreen canvas, builds a per-pixel center weight
 * from its grid position, and extracts a soft background tint. Resolves
 * to DEFAULT_TINT on any failure — never throws.
 */
const extractThemeColorFromImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // harmless for same-origin, required if that ever changes

    img.onload = () => {
      try {

        const canvas = document.createElement("canvas");
        canvas.width = SAMPLE_SIZE;
        canvas.height = SAMPLE_SIZE;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(DEFAULT_TINT);

        // No cropping — the WHOLE image is sampled (stretched to fit the
        // square grid if needed). Nothing gets physically excluded; only
        // computeCenterWeight decides what matters, and it does that
        // smoothly rather than cutting content off outright.
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

        const pixels: RGB[] = [];
        const weights: number[] = [];
        let idx = 0;
        for (let i = 0; i < data.length; i += 4) {
          const col = idx % SAMPLE_SIZE;
          const row = Math.floor(idx / SAMPLE_SIZE);
          pixels.push([data[i], data[i + 1], data[i + 2]]);
          weights.push(computeCenterWeight(col, row, SAMPLE_SIZE));
          idx++;
        }

        const dominant = pickDominantColor(pixels, weights);
        resolve(dominant ? toBackgroundTint(dominant) : DEFAULT_TINT);
      } catch {
        resolve(DEFAULT_TINT);
      }
    };

    img.onerror = () => resolve(DEFAULT_TINT);
    img.src = imageUrl;
  });
};

/* --------------------------------------------------------- public API */

const TINT_CACHE_PREFIX = "rasoi:tint:";
const tints: Record<string, string> = dishTints;
const overrides: Record<string, string> = dishTintOverrides;

export const getDishTint = async (recipe: Recipe): Promise<string> => {
  const override = overrides[recipe.dishName];
  if (override) return override;

  const precomputed = tints[recipe.dishName];
  if (precomputed) return precomputed;

  if (!recipe.image) return DEFAULT_TINT;

  const cacheKey = `${TINT_CACHE_PREFIX}${recipe.dishName}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {
    /* ignore storage problems */
  }

  const tint = await extractThemeColorFromImage(recipe.image);
  try {
    sessionStorage.setItem(cacheKey, tint);
  } catch {
    /* ignore storage problems */
  }
  return tint;
};