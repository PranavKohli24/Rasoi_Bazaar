/**
 * Random-but-even placement for the scattered food background.
 * Pure functions, no React, so the layout logic is easy to test and tweak.
 */

export interface BackgroundItem {
  id: number;
  kind: "doodle" | "equipment";
  index: number;
  /** Position in px from the top-left of the background layer */
  left: number;
  top: number;
  /** Size in px */
  size: number;
  /** Degrees */
  rotate: number;
  flip: boolean;
}

/** Small seeded random generator: same seed gives the same layout. */
export const makeRng = (seed: number) => {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const buildLayout = (
  width: number,
  height: number,
  rand: () => number,
  doodleCount: number,
  equipmentCount: number
): BackgroundItem[] => {
  const small = width < 768;
  const spacing = small ? 140 : 185; // bigger gap = calmer background
  const target = Math.min(60, Math.max(8, Math.round((width * height) / (spacing * spacing * 1.25))));

  // A shuffled "bag" of every picture, dealt out in turn, so the same item
  // doesn't show up twice in a row and everything appears about equally.
  const bag: { kind: "doodle" | "equipment"; index: number }[] = [];
  for (let i = 0; i < doodleCount; i++) bag.push({ kind: "doodle", index: i });
  for (let i = 0; i < equipmentCount; i++) bag.push({ kind: "equipment", index: i });
  const shuffle = () => {
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
  };
  shuffle();

  const placed: { x: number; y: number; gap: number }[] = [];
  const items: BackgroundItem[] = [];
  let dealt = 0;

  for (let n = 0; n < target; n++) {
    const gap = spacing * (0.85 + rand() * 0.35); // uneven gaps look hand-placed
    let spot: { x: number; y: number } | null = null;

    for (let attempt = 0; attempt < 40 && !spot; attempt++) {
      const x = rand() * width;
      const y = rand() * height;
      const clear = placed.every(
        (p) => Math.hypot(p.x - x, p.y - y) >= Math.max(p.gap, gap) * 0.95
      );
      if (clear) spot = { x, y };
    }
    if (!spot) continue;

    placed.push({ ...spot, gap });

    const pick = bag[dealt % bag.length];
    dealt++;
    if (dealt % bag.length === 0) shuffle();

    const base = small ? 30 : 38;
    const range = small ? 20 : 26;

    items.push({
      id: n,
      kind: pick.kind,
      index: pick.index,
      left: Math.round(spot.x),
      top: Math.round(spot.y),
      size: Math.round(base + rand() * range),
      rotate: Math.round(rand() * 56 - 28),
      flip: false,
    });
  }

  return items;
};