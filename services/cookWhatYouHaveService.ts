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
 * Change ONLY this line when you want to switch models.
 *
 * Examples:
 * "openrouter/free"
 * "openai/gpt-oss-20b:free"
 * "google/gemma-4-26b-a4b:free"
 */
const MODEL = "openrouter/free";

const BASE_URL = "https://openrouter.ai/api/v1";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const responseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    recipes: {
      type: "array",
      maxItems: 3,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          dishName: {
            type: "string",
          },
          description: {
            type: "string",
          },
          prepTime: {
            type: "string",
          },
          ingredientsUsed: {
            type: "array",
            items: {
              type: "string",
            },
          },
          equipmentUsed: {
            type: "array",
            items: {
              type: "string",
            },
          },
          whyItWorks: {
            type: "string",
          },
        },
        required: [
          "dishName",
          "description",
          "prepTime",
          "ingredientsUsed",
          "equipmentUsed",
          "whyItWorks",
        ],
      },
    },
  },
  required: ["recipes"],
};

const buildPrompt = ({
  equipment,
  ingredients,
}: CookWhatYouHaveInput): string => {
  return `
You are the recipe-matching engine for an Indian cooking app.

The user has given us their COMPLETE list of available ingredients and kitchen equipment.

AVAILABLE EQUIPMENT:
${equipment.map((item) => `- ${item}`).join("\n")}

AVAILABLE INGREDIENTS:
${ingredients.map((item) => `- ${item}`).join("\n")}

Your task:
Find up to 3 real dishes that the user can ACTUALLY cook right now.

STRICT RULES:

1. Only recommend dishes that can be made with the ingredients provided.
2. Do NOT assume the user has ingredients that are not listed.
3. Do NOT assume salt, oil, butter, spices, dairy, vegetables, herbs or garnishes unless they appear in the ingredient list.
4. Water is always available and does not need to be listed.
5. The required cooking equipment must be available.
6. Do not recommend a dish if an essential ingredient is missing.
7. Prefer dishes that use several of the ingredients the user already has.
8. Prefer practical home-style Indian dishes, but dishes from other cuisines are allowed when they genuinely fit.
9. Do not invent fictional dishes.
10. Return fewer than 3 results if fewer than 3 valid dishes exist.
11. Do not return dishes with missing essential ingredients.
12. Keep every description and explanation to one short sentence.
13. Do not provide cooking instructions.
14. Prefer the simplest valid dishes first.

For every result return:
- dishName
- description
- prepTime
- ingredientsUsed
- equipmentUsed
- whyItWorks

The recipes do NOT need to be limited to dishes already known by the app. Discover suitable real dishes from the available ingredients.

Return ONLY the requested JSON structure.
`;
};

export const findRecipesFromIngredients = async (
  input: CookWhatYouHaveInput
): Promise<CookWhatYouHaveResponse> => {
  if (!API_KEY) {
    throw new Error(
      "OpenRouter API key is missing. Add VITE_OPENROUTER_API_KEY to your environment."
    );
  }

  if (!input.equipment.length) {
    throw new Error("Please select at least one piece of equipment.");
  }

  if (!input.ingredients.length) {
    throw new Error("Please add at least one ingredient.");
  }

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Rasoi Bazaar",
      },
      body: JSON.stringify({
        model: MODEL,

        messages: [
          {
            role: "system",
            content:
            "Match recipes strictly to the provided ingredients and equipment. Return ONLY valid JSON matching the requested structure. Do not write any text outside the JSON.",
          },
          {
            role: "user",
            content: buildPrompt(input),
          },
        ],

        response_format: {
        type: "json_object",
        },

        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("OpenRouter error:", errorText);

      throw new Error(
        "The kitchen assistant couldn't find recipes right now. Please try again."
      );
    }

    const data = await response.json();

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("The kitchen assistant returned an empty response.");
    }

    const cleanedContent = content
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanedContent) as CookWhatYouHaveResponse;

    if (!Array.isArray(parsed.recipes)) {
      throw new Error("The kitchen assistant returned an invalid response.");
    }

    return {
      recipes: parsed.recipes.slice(0, 3),
    };
  } catch (error) {
    console.error("Cook What You Have error:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Something went wrong while finding recipes from your ingredients."
    );
  }
};