import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

// 1. Setup Keys: Check for MAIN_API_KEY, fallback to API_KEY if needed.
const MAIN_API_KEY = process.env.MAIN_API_KEY || process.env.API_KEY;
const BACKUP_API_KEY = process.env.BACKUP_API_KEY;

if (!MAIN_API_KEY) {
  throw new Error("MAIN_API_KEY (or API_KEY) environment variable not set");
}

// 2. Define Schema
const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    dishName: { type: Type.STRING, description: "The name of the dish." },
    description: { type: Type.STRING, description: "A short, incredibly tempting one-liner (max 15 words) that makes the user immediately hungry. Use evocative, sensory words focusing on texture, aroma, and rich flavors (e.g., 'velvety,' 'fragrant,' 'zesty,' 'smoky'). This is the hook that sells the recipe." },
    prepTime: { type: Type.STRING, description: "Estimated total preparation and cooking time, e.g., 'Approx. 45 minutes'." },
    equipment: {
      type: Type.ARRAY,
      description: "List of kitchen equipment needed. Assume a standard Indian kitchen. Identify specialized tools and provide alternatives.",
      items: {
        type: Type.OBJECT,
        properties: {
          item: { type: Type.STRING, description: "Name of the equipment." },
          isSpecialized: { type: Type.BOOLEAN, description: "True if this is a specialized tool not found in a typical Indian kitchen (e.g., oven, stand mixer)." },
          alternative: { type: Type.STRING, description: "A simple, common alternative if the equipment is specialized (e.g., 'use a tawa instead of an oven'). Null if not specialized." }
        },
        required: ["item", "isSpecialized", "alternative"]
      }
    },
    ingredients: {
      type: Type.ARRAY,
      description: "List of ingredients with exact amounts. Use common Indian names and provide English equivalents.",
      items: {
        type: Type.OBJECT,
        properties: {
          amount: { type: Type.STRING, description: "The quantity, e.g., '1 cup', '2 tsp', '1 katori'." },
          commonName: { type: Type.STRING, description: "The common Indian name for the ingredient, e.g., 'atta', 'jeera'." },
          englishName: { type: Type.STRING, description: "The English name for the ingredient, e.g., 'whole wheat flour', 'cumin seeds'." }
        },
        required: ["amount", "commonName", "englishName"]
      }
    },
    method: {
      type: Type.ARRAY,
      description: "The step-by-step instructions for preparing the dish, including India-specific tips.",
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER, description: "The step number." },
          instruction: { type: Type.STRING, description: "Detailed instruction for this step, with tips like checking tadka or dough consistency." },
          tip: {
            type: Type.OBJECT,
            description: "An optional, short, practical cooking tip directly related to this specific step. Only include if a truly useful, non-obvious tip applies.",
            properties: {
              title: { type: Type.STRING, description: "A short, catchy title for the tip, e.g., 'Pro Tip' or 'Secret to Fluffiness'." },
              content: { type: Type.STRING, description: "The content of the tip, e.g., 'Crushing kasuri methi in your palm before adding releases its aroma and flavor.'" }
            }
          }
        },
        required: ["step", "instruction"]
      }
    },
    notes: {
      type: Type.ARRAY,
      description: "Additional notes, tips, regional variations, or substitution suggestions.",
      items: { type: Type.STRING }
    }
  },
  required: ["dishName", "description", "prepTime", "equipment", "ingredients", "method", "notes"]
};

// 3. Define System Instruction
const SYSTEM_INSTRUCTION = `You are a passionate and knowledgeable Indian home cook, guiding a beginner in their kitchen. Your tone should be warm, encouraging, and detailed, like sharing a secret family recipe.

Your most important job is to make the recipe extremely simple and easy to follow. Do not overcomplicate it. Write for someone who has never cooked before. Break down each step into a single, small, manageable action. For example, instead of 'sauté onions until translucent, then add ginger-garlic paste and spices', break it into separate steps: '1. Add the chopped onions to the hot oil.', '2. Cook them, stirring often, until they look soft and see-through.', '3. Now, stir in the ginger-garlic paste.', '4. Add all the spice powders and stir for one minute.' Avoid technical culinary terms. The goal is clarity and simplicity above all else.

Where relevant, provide a short, useful 'tip' for a specific step. This should be a small piece of advice that enhances the result, like how to test oil temperature or why a certain ingredient is added at a specific time. Give it a catchy title. Do not add tips to every step, only where they add real value.

Your primary focus is on authentic Indian recipes and cooking styles.
Assume the user has a standard Indian kitchen: a gas stove, pressure cooker, kadai (wok), tawa (griddle), belan (rolling pin), and basic utensils. They likely do not have an oven, stand mixer, or food processor.
When a recipe traditionally needs special equipment (like an oven for naan or a tandoor), you MUST state this clearly upfront in the equipment section. Then, you MUST provide a practical, home-friendly alternative using common equipment (e.g., "cook the naan on a tawa").
Use ingredient names commonly understood in Indian kitchens (e.g., "atta," "jeera," "haldi"). For clarity, ALWAYS provide the English equivalent in the 'englishName' field.
Use measurements common in Indian cooking like cups, teaspoons, tablespoons, katori, or grams.
Provide practical, India-specific cooking tips, but explain them simply. For example, when talking about tadka, say "Heat the oil and add the mustard seeds. Wait for them to pop and crackle before moving on."
If a dish has significant regional variations (e.g., Sambar), mention them in the notes.
You must provide an estimated total preparation and cooking time.
You must return the recipe in the requested JSON format.`;

// 4. Helper Function: Handles the actual API call logic
const generateRecipeWithKey = async (apiKey: string, dishName: string): Promise<Recipe> => {
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate a step-by-step recipe for ${dishName}.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: recipeSchema,
      temperature: 0.7,
    },
  });

  const jsonText = response.text?.trim();
  if (!jsonText) {
    throw new Error("API returned an empty response.");
  }

  // Strip markdown code blocks if present
  const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
  const recipeData = JSON.parse(cleanedJsonText);

  return recipeData as Recipe;
};

// 5. Main Exported Function: Handles the fallback logic
export const fetchRecipe = async (dishName: string): Promise<Recipe> => {
  try {
    // Attempt 1: Use Main Key
    return await generateRecipeWithKey(MAIN_API_KEY, dishName);
  } catch (error) {
    console.error("Primary API Key failed. Error:", error);

    // Attempt 2: Use Backup Key (if it exists)
    if (BACKUP_API_KEY) {
      console.log("Switching to Backup API Key...");
      try {
        return await generateRecipeWithKey(BACKUP_API_KEY, dishName);
      } catch (backupError) {
        console.error("Backup API Key also failed:", backupError);
        // Throw a combined error message or the last error
        if (backupError instanceof Error) {
           throw new Error(`Failed to fetch recipe with both keys. Backup error: ${backupError.message}`);
        }
        throw new Error("Failed to fetch recipe with both keys.");
      }
    }

    // If no backup key exists, rethrow the original error
    if (error instanceof Error) {
      throw new Error(`Failed to fetch recipe: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching the recipe.");
  }
};
