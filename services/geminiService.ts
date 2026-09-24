import { Recipe } from "../types";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";

/*
 * Recipes for dishes we don't have written up are generated on the server
 * (/api/recipe). The AI key, prompt and response format all live there, so
 * nothing secret is shipped to the browser.
 */



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
    // Predefined recipes are matched by full name, dish name and shorter aliases
  // ("paneer bhurji" -> "quick 20-minute paneer bhurji"), so no API call is needed.
  const predefinedRecipe = findPredefinedRecipe(dishName);

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