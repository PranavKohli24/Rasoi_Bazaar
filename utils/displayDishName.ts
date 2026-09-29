import { normalizeDishQuery } from "./findPredefinedRecipe";

/** "  i want to eat rajma chawal today " -> "Rajma Chawal" */
export const displayDishName = (input: string): string => {
  const cleaned = normalizeDishQuery(input) || input.trim();

  return cleaned
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
};