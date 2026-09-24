export interface CookWhatYouHaveInput {
  equipment: string[];
  ingredients: string[];
}

export interface RecipeMatch {
  dishName: string;
  description: string;
  prepTime: string;
  ingredientsUsed: string[];
  equipmentUsed: string[];
  whyItWorks: string;
}

export interface CookWhatYouHaveResponse {
  recipes: RecipeMatch[];
}

/*
 * The matching itself runs on the server (/api/cook-match). The AI key, model
 * and prompt live there, so nothing secret is shipped to the browser.
 * To change the model, set OPENROUTER_MODEL in the Vercel environment variables.
 */

const GENERIC_ERROR =
  "The kitchen assistant couldn't find recipes right now. Please try again.";
const OFFLINE_ERROR =
  "Couldn't reach our kitchen. Check your connection and try again.";

const text = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const textList = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(text).filter(Boolean) : [];

/** Keeps only complete results, so a half-filled one can never break the results screen. */
const cleanMatches = (value: unknown): RecipeMatch[] =>
  (Array.isArray(value) ? value : [])
    .flatMap((raw: any): RecipeMatch[] => {
      const dishName = text(raw?.dishName);
      if (!dishName) return [];

      return [
        {
          dishName,
          description: text(raw?.description),
          prepTime: text(raw?.prepTime),
          ingredientsUsed: textList(raw?.ingredientsUsed),
          equipmentUsed: textList(raw?.equipmentUsed),
          whyItWorks: text(raw?.whyItWorks),
        },
      ];
    })
    .slice(0, 3);

export const findRecipesFromIngredients = async (
  input: CookWhatYouHaveInput
): Promise<CookWhatYouHaveResponse> => {
  if (!input.equipment.length) {
    throw new Error("Please select at least one piece of equipment.");
  }

  if (!input.ingredients.length) {
    throw new Error("Please add at least one ingredient.");
  }

  let response: Response;

  try {
    response = await fetch("/api/cook-match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        equipment: input.equipment,
        ingredients: input.ingredients,
      }),
    });
  } catch (error) {
    console.error("Cook What You Have request failed:", error);
    throw new Error(OFFLINE_ERROR);
  }

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    console.error(
      "The cook-match API didn't return JSON. Locally, start the app with `vercel dev` instead of `npm run dev`."
    );
  }

  if (!response.ok) {
    console.error("Cook What You Have error:", response.status, JSON.stringify(data?.error));

    // The server only sends messages that are safe to show.
    throw new Error(
      typeof data?.error?.message === "string" && data.error.message
        ? data.error.message
        : GENERIC_ERROR
    );
  }

  if (!Array.isArray(data?.recipes)) {
    console.error("The cook-match API returned an unexpected response:", data);
    throw new Error(GENERIC_ERROR);
  }

  return { recipes: cleanMatches(data.recipes) };
};