const RECENTLY_COOKED_KEY = "rasoi:recently-cooked";
const MAX_RECENT = 8;

export interface RecentDish {
  dishName: string;
  path: string; // full route — single recipe or combo
  image?: string;
  images?: string[];
}

export const loadRecentlyCooked = (): RecentDish[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECENTLY_COOKED_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const addRecentlyCooked = (dish: RecentDish) => {
  if (!dish.path) return;

  try {
    const existing = loadRecentlyCooked().filter((d) => d.path !== dish.path);
    const next: RecentDish[] = [dish, ...existing].slice(0, MAX_RECENT);
    localStorage.setItem(RECENTLY_COOKED_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage problems */
  }
};

export const removeRecentlyCooked = (path: string) => {
  try {
    const next = loadRecentlyCooked().filter((d) => d.path !== path);
    localStorage.setItem(RECENTLY_COOKED_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage problems */
  }
};