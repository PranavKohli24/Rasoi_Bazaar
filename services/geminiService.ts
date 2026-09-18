import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';
import { predefinedRecipes } from "../data/predefinedRecipes";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

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

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    isValidDish: {
      type: Type.BOOLEAN,
      description: "True if the input is a real, recognizable food dish (from any cuisine, not just Indian). False if the input is gibberish, a random phrase, an object, a person's name, a request unrelated to food, or anything that isn't an actual dish."
    },
    rejectionReason: {
      type: Type.STRING,
      description: "If isValidDish is false, a short, friendly, one-sentence explanation of why (e.g. 'That doesn't look like a dish name - try something like Paneer Butter Masala.'). Empty string if isValidDish is true."
    },
    dishName: { type: Type.STRING, description: "The name of the dish. Empty string if isValidDish is false." },
    description: { type: Type.STRING, description: "A short, incredibly tempting one-liner (max 15 words) that makes the user immediately hungry. Use evocative, sensory words focusing on texture, aroma, and rich flavors (e.g., 'velvety,' 'fragrant,' 'zesty,' 'smoky'). This is the hook that sells the recipe. Empty string if isValidDish is false." },
    prepTime: { type: Type.STRING, description: "Estimated total preparation and cooking time, e.g., 'Approx. 45 minutes'. Empty string if isValidDish is false." },
    equipment: {
      type: Type.ARRAY,
      description: "List of kitchen equipment needed. Assume a standard Indian kitchen. Identify specialized tools and provide alternatives. Empty array if isValidDish is false.",
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
      description: "List of ingredients with exact amounts. Use common Indian names and provide English equivalents. Empty array if isValidDish is false.",
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
      description: "The step-by-step instructions for preparing the dish, including India-specific tips. Empty array if isValidDish is false.",
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER, description: "The step number." },
          instruction: { type: Type.STRING, description: "Detailed instruction for this step, with tips like checking tadka or dough consistency." },
          tip: {
            type: Type.OBJECT,
            description:
              "An optional, short, practical cooking tip directly related to this specific step. Only include if a genuinely useful tip applies.",
            properties: {
              title: {
                type: Type.STRING,
                description:
                  "A very short clickable label, 2-4 words maximum. Example: 'Check Oil Heat', 'Avoid Raw Tomatoes', 'For Softer Paneer'."
              },
              content: {
                type: Type.STRING,
                description:
                  "A useful, concise explanation of the tip in 1-2 sentences. Never leave this empty if a tip object is provided."
              }
            },
            required: ["title", "content"]
          }
        },
        required: ["step", "instruction"]
      }
    },
    notes: {
      type: Type.ARRAY,
      description: "Additional notes, tips, regional variations, or substitution suggestions. Empty array if isValidDish is false.",
      items: { type: Type.STRING }
    }
  },
  required: ["isValidDish", "rejectionReason", "dishName", "description", "prepTime", "equipment", "ingredients", "method", "notes"]
};


export const fetchRecipe = async (dishName: string): Promise<Recipe> => {
  const key = dishName
  .trim()
  .toLowerCase();

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
  const systemInstruction = `You are a passionate and knowledgeable Indian home cook, guiding a beginner in their kitchen. Your tone should be warm, encouraging, and detailed, like sharing a secret family recipe.

The user's input may be phrased conversationally rather than as a bare dish name - for example "i want to eat rajma chawal today", "can you give me a recipe for chole bhature please", or "craving some hot pakoras rn". In such cases, first extract the actual dish being referred to, ignoring filler words like greetings, politeness, intent phrases ("I want to eat", "give me a recipe for"), and time references ("today", "tonight", "for dinner"). Use ONLY the extracted dish name as "dishName" in your response (properly capitalized, no leftover filler words) and treat validity/recipe generation as being about that extracted dish, not the raw sentence.

Before writing anything else, first decide whether the (extracted) input refers to an actual, real food dish (from any cuisine, not just Indian). If it is NOT a real dish - for example it's gibberish, a random phrase, an object, a person's name, a place, or a request unrelated to food - set "isValidDish" to false, write a short, friendly, one-sentence "rejectionReason" (suggest a real dish as an example), and leave every other field as an empty string or empty array. Do NOT invent a fictional, joke, or "best guess" recipe for invalid input, no matter how tempting or close it seems. Only proceed to write a full recipe if "isValidDish" is true.

Your most important job is to make the recipe extremely simple and easy to follow. Do not overcomplicate it. Write for someone who has never cooked before. Break down each step into a single, small, manageable action. For example, instead of 'sauté onions until translucent, then add ginger-garlic paste and spices', break it into separate steps: '1. Add the chopped onions to the hot oil.', '2. Cook them, stirring often, until they look soft and see-through.', '3. Now, stir in the ginger-garlic paste.', '4. Add all the spice powders and stir for one minute.' Avoid technical culinary terms. The goal is clarity and simplicity above all else.

Where relevant, provide a short, useful 'tip' for a specific step. This should be a small piece of advice that enhances the result, like how to test oil temperature or why a certain ingredient is added at a specific time. Give it a catchy title. Do not add tips to every step, only where they add real value.

Your primary focus is on authentic Indian recipes and cooking styles.
Assume the user has a standard Indian kitchen: a gas stove, pressure cooker, kadai (wok), tawa (griddle), belan (rolling pin), and basic utensils. They likely do not have an oven, stand mixer, or food processor.
When a recipe traditionally needs special equipment (like an oven for naan or a tandoor), you MUST state this clearly upfront in the equipment section. Then, you MUST provide a practical, home-friendly alternative using common equipment (e.g., "cook the naan on a tawa").
Use ingredient names commonly understood in Indian kitchens (e.g., "atta," "jeera," "haldi"). For clarity, ALWAYS provide the English equivalent in the 'englishName' field.
Use measurements common in Indian cooking like cups, teaspoons, tablespoons, katori, or grams.
Provide practical, India-specific cooking tips, but explain them simply. For example, when talking about tadka, say "Heat the oil and add the mustard seeds. Wait for them to pop and crackle before moving on."
If a dish has significant regional variations (e.g., Sambar), mention them in the notes.
Tip titles must be extremely short, 2-4 words maximum.
They should work as a small clickable label next to a lightbulb icon.
Never put the actual tip explanation in the title.
If you provide a tip, you MUST provide both a short title and a non-empty content message.
The title should be 2-4 words maximum.
The content should be concise and useful, usually 1-2 sentences.
Never return a tip object with only a title.
You must provide an estimated total preparation and cooking time.
You must return the recipe in the requested JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `The user typed: "${dishName}". Extract the dish they mean (if any) and generate a step-by-step recipe for it, following the system instructions.`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.7,
        maxOutputTokens: 6000,
        thinkingConfig: {
          thinkingBudget: 512,
        },
      },
    });

    const jsonText = response.text?.trim();
    if (!jsonText) {
      throw new Error("API returned an empty response.");
    }
    
    // Sometimes the response might be wrapped in markdown, so we strip it.
    const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
    const recipeData = JSON.parse(cleanedJsonText);

    if (!recipeData.isValidDish) {
      const message =
        recipeData.rejectionReason && recipeData.rejectionReason.trim()
          ? recipeData.rejectionReason
          : "That doesn't look like a dish. Try entering a specific recipe name!";

      const notADishError = new Error(message);
      notADishError.name = "NotADishError";
      throw notADishError;
    }

    return recipeData as Recipe;
  } catch (error) {
  console.error("Error fetching recipe from Gemini API:", error);

  // Let our own "not a real dish" rejection pass straight through,
  // so the caller can show a custom, designed error state for it.
  if (error instanceof Error && error.name === "NotADishError") {
    throw error;
  }

  const errorMessage = error instanceof Error ? error.message : String(error);

  if (
    errorMessage.includes('"code":503') ||
    errorMessage.includes("UNAVAILABLE") ||
    errorMessage.includes("high demand")
  ) {
    throw new Error(
      "Our kitchen is a little busy right now. Please try again in a moment."
    );
  }

  throw new Error(
    "Something went wrong while preparing your recipe. Please try again."
  );
}
};