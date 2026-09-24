import { Recipe } from "../types";
import { predefinedRecipes } from "../data/predefinedRecipes";

/*
 * Recipes for dishes we don't have written up are generated on the server
 * (/api/recipe). The AI key, prompt and response format all live there, so
 * nothing secret is shipped to the browser.
 */

// Strips common conversational filler so natural phrasing like
// "i want to eat rajma chawal today" or "can you give me a recipe for chole bhature please"
// still matches a predefined recipe keyed just "rajma chawal" / "chole bhature".
const normalizeDishQuery = (input: string): string => {
  let text = input.trim().toLowerCase();

  // Leading filler phrases (intent/request wrappers)
  const leadingFillers = [
    /^i\s+(really\s+)?(want|wanna|feel like|would like|need)\s+to\s+(eat|have|make|cook)\s+/,
    /^i\s+(really\s+)?(want|wanna|feel like|would like|need)\s+/,
    /^(can|could|would)\s+you\s+(please\s+)?(give|show|tell|send)\s+me\s+(a\s+|the\s+)?(recipe\s+(for|of)\s+)?/,
    /^(please\s+)?(give|show|tell|send)\s+me\s+(a\s+|the\s+)?(recipe\s+(for|of)\s+)?/,
    /^how\s+(do\s+i|to)\s+(make|cook|prepare)\s+/,
    /^(recipe|make|cook|prepare)\s+(for|of)\s+/,
    /^i(’|'| a)?m\s+craving\s+/,
    /^craving\s+/,
    /^please\s+/,
  ];

  // Trailing filler words (time/politeness tacked on the end)
  const trailingFillers = [
    /\s+(today|tonight|now|please|asap|tomorrow|for\s+dinner|for\s+lunch|for\s+breakfast)\s*$/,
  ];

  let changed = true;
  while (changed) {
    changed = false;
    for (const pattern of leadingFillers) {
      const stripped = text.replace(pattern, "");
      if (stripped !== text) {
        text = stripped.trim();
        changed = true;
      }
    }
    for (const pattern of trailingFillers) {
      const stripped = text.replace(pattern, "");
      if (stripped !== text) {
        text = stripped.trim();
        changed = true;
      }
    }
  }

  return text.trim();
};

/**
 * True only for a complete, usable recipe. Used on everything that comes from
 * the server and on recipes read back from the browser's saved copy, so a
 * broken or outdated recipe can never crash the recipe page.
 */
export const isRecipe = (value: unknown): value is Recipe => {
  const r = value as Partial<Recipe> | null;

  return (
    !!r &&
    typeof r === "object" &&
    typeof r.dishName === "string" &&
    r.dishName.trim() !== "" &&
    typeof r.description === "string" &&
    typeof r.prepTime === "string" &&
    Array.isArray(r.notes) &&
    Array.isArray(r.equipment) &&
    r.equipment.every((e: any) => !!e && typeof e.item === "string") &&
    Array.isArray(r.ingredients) &&
    r.ingredients.length > 0 &&
    r.ingredients.every(
      (i: any) =>
        !!i &&
        typeof i.amount === "string" &&
        typeof i.commonName === "string" &&
        typeof i.englishName === "string"
    ) &&
    Array.isArray(r.method) &&
    r.method.length > 0 &&
    r.method.every((s: any) => !!s && typeof s.instruction === "string")
  );
};

const GENERIC_ERROR =
  "Something went wrong while preparing your recipe. Please try again.";
const OFFLINE_ERROR =
  "Couldn't reach our kitchen. Check your connection and try again.";

export const fetchRecipe = async (dishName: string): Promise<Recipe> => {
  const key = dishName.trim().toLowerCase();

  // Cheap client-side pre-filter for obviously junk input before hitting the API.
  if (!key || key.length < 2 || key.length > 60) {
    throw new Error("Please enter a valid dish name.");
  }

  // Strip conversational filler ("i want to eat ... today") so natural phrasing
  // still hits the predefined-recipe cache instead of always falling through to the API.
  const normalizedKey = normalizeDishQuery(key);

  const predefinedRecipe =
    predefinedRecipes[normalizedKey] ?? predefinedRecipes[key];

  if (predefinedRecipe) {
    return predefinedRecipe;
  }

  let response: Response;

  try {
    response = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dish: dishName }),
    });
  } catch (error) {
    console.error("Recipe request failed:", error);
    throw new Error(OFFLINE_ERROR);
  }

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    console.error(
      "The recipe API didn't return JSON. Locally, start the app with `vercel dev` instead of `npm run dev`."
    );
  }

  if (!response.ok) {
    console.error("Recipe request failed:", response.status, JSON.stringify(data?.error));

    // The server only sends messages that are safe to show (e.g. "That doesn't look like a dish...").
    const message =
      typeof data?.error?.message === "string" && data.error.message
        ? data.error.message
        : GENERIC_ERROR;

    const error = new Error(message);

    // Lets the caller show a custom state for "that isn't a dish".
    if (data?.error?.code === "NOT_A_DISH") {
      error.name = "NotADishError";
    }

    throw error;
  }

  if (!isRecipe(data?.recipe)) {
    console.error("The recipe API returned an unusable recipe:", data);
    throw new Error(GENERIC_ERROR);
  }

  return data.recipe;
};