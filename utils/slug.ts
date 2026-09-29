/** "Paneer Butter Masala!" -> "paneer-butter-masala" */
export const toSlug = (dish: string): string =>
  dish
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** "paneer-butter-masala" -> "Paneer Butter Masala" */
export const fromSlug = (slug: string): string =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");