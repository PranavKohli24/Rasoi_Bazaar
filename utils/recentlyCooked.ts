import { Recipe } from "../types";
import { toSlug } from "./slug";

const RECENTLY_COOKED_KEY = "rasoi:recently-cooked";
const MAX_RECENT = 8;

export interface RecentDish {
  dishName: string;
  slug: string;
  image?: string;
}

export const loadRecentlyCooked = (): RecentDish[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECENTLY_COOKED_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// Called once a recipe has actually loaded (predefined or fetched) —
// not on search, so a typo or an abandoned fetch never counts as "cooked".
export const addRecentlyCooked = (recipe: Pick<Recipe, "dishName" | "image">) => {
  const slug = toSlug(recipe.dishName);
  if (!slug) return;

  try {
    const existing = loadRecentlyCooked().filter((d) => d.slug !== slug);
    const next: RecentDish[] = [
      { dishName: recipe.dishName, slug, image: recipe.image },
      ...existing,
    ].slice(0, MAX_RECENT);
    localStorage.setItem(RECENTLY_COOKED_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage problems */
  }
};

export const removeRecentlyCooked = (slug: string) => {
  try {
    const next = loadRecentlyCooked().filter((d) => d.slug !== slug);
    localStorage.setItem(RECENTLY_COOKED_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage problems */
  }
};