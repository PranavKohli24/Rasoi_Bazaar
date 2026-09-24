import { GoogleGenAI, Type } from "@google/genai";

/**
 * POST /api/recipe   body: { dish: string }
 *
 * Runs on Vercel, so the Gemini key stays on the server and is never sent to
 * the browser. Set GEMINI_API_KEY (no VITE_ prefix) in Vercel > Settings >
 * Environment Variables. GEMINI_MODEL is optional.
 */

// Local stand-ins so this file doesn't depend on which type packages are installed.
declare const process: { env: Record<string, string | undefined> };
interface Req {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}
interface Res {
  status(code: number): Res;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
}

export const config = { maxDuration: 60 };

const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const MAX_ATTEMPTS = 2; // one retry if the model returns broken or incomplete JSON

const RATE_LIMIT = 8; // recipe requests ...
const RATE_WINDOW_MS = 60_000; // ... per minute, per visitor

const GENERIC_ERROR = "Something went wrong while preparing your recipe. Please try again.";
const BUSY_ERROR = "Our kitchen is a little busy right now. Please try again in a moment.";

/* ---------- small helpers ---------- */

const header = (req: Req, name: string): string => {
  const value = req.headers[name];
  return (Array.isArray(value) ? value[0] : value) ?? "";
};

// `debug` (the real upstream error) is only ever sent when running locally with `vercel dev`.
const fail = (res: Res, status: number, code: string, message: string, debug?: string) =>
  res.status(status).json({ error: { code, message, ...(debug ? { debug } : {}) } });

const clientIp = (req: Req): string =>
  header(req, "x-forwarded-for").split(",")[0].trim() ||
  header(req, "x-real-ip") ||
  req.socket?.remoteAddress ||
  "unknown";

// Best-effort limiter. Serverless instances don't share memory, so this is a speed bump,
// not a wall. For real protection add a Vercel Firewall rate-limit rule or Upstash Ratelimit.
const hits = new Map<string, number[]>();
const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  const limited = recent.length >= RATE_LIMIT;
  if (!limited) recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return limited;
};

// Only accept calls made from our own site (blocks other websites; curl can still call it).
const originAllowed = (req: Req): boolean => {
  const origin = header(req, "origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === header(req, "host");
  } catch {
    return false;
  }
};

const readBody = (req: Req): Record<string, unknown> | null => {
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body && typeof body === "object" ? (body as Record<string, unknown>) : null;
};

const cleanText = (value: unknown, max: number): string =>
  typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max)
    : "";

/* ---------- checking and repairing what the model returns ---------- */

const str = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

/** Returns a clean, complete recipe, or null if the model's answer can't be used. */
const normalizeRecipe = (data: Record<string, any>) => {
  const equipment = (Array.isArray(data.equipment) ? data.equipment : []).flatMap((e: any) => {
    const item = str(e?.item);
    if (!item) return [];
    const alternative = str(e?.alternative);
    return [
      {
        item,
        isSpecialized: e?.isSpecialized === true,
        alternative: alternative && alternative.toLowerCase() !== "null" ? alternative : null,
      },
    ];
  });

  const ingredients = (Array.isArray(data.ingredients) ? data.ingredients : []).flatMap((i: any) => {
    const englishName = str(i?.englishName);
    const commonName = str(i?.commonName) || englishName;
    if (!commonName) return [];
    return [{ amount: str(i?.amount) || "as needed", commonName, englishName: englishName || commonName }];
  });

  const method: { step: number; instruction: string; tip?: { title: string; content: string } }[] = [];
  for (const s of Array.isArray(data.method) ? data.method : []) {
    const instruction = str(s?.instruction);
    if (!instruction) continue;
    const title = str(s?.tip?.title);
    const content = str(s?.tip?.content);
    method.push({
      step: method.length + 1, // always 1, 2, 3 ... whatever the model numbered them
      instruction,
      ...(title && content ? { tip: { title, content } } : {}),
    });
  }

  const notes = (Array.isArray(data.notes) ? data.notes : []).map(str).filter(Boolean);
  const dishName = str(data.dishName);

  if (!dishName || ingredients.length < 1 || method.length < 2) return null;

  return {
    dishName,
    description: str(data.description) || `A comforting home-style ${dishName}.`,
    prepTime: str(data.prepTime) || "Time varies",
    equipment,
    ingredients,
    method,
    notes,
  };
};

/* ---------- prompt and response format (kept on the server) ---------- */

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

/* ---------- the endpoint ---------- */

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return fail(res, 405, "METHOD_NOT_ALLOWED", GENERIC_ERROR);
  }

  if (!originAllowed(req)) return fail(res, 403, "FORBIDDEN", GENERIC_ERROR);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set on the server. Add it in Vercel > Settings > Environment Variables, then redeploy.");
    return fail(res, 500, "NOT_CONFIGURED", GENERIC_ERROR);
  }

  if (isRateLimited(clientIp(req))) {
    return fail(
      res,
      429,
      "RATE_LIMITED",
      "You're cooking up recipes very quickly! Please wait a minute and try again."
    );
  }

  const dish = cleanText(readBody(req)?.dish, 61);
  if (dish.length < 2 || dish.length > 60) {
    return fail(res, 400, "INVALID_INPUT", "Please enter a valid dish name.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `The user typed: "${dish.replace(/"/g, "'")}". Extract the dish they mean (if any) and generate a step-by-step recipe for it, following the system instructions.`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let text: string;

    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: recipeSchema,
          temperature: 0.7,
          maxOutputTokens: 6000,
          thinkingConfig: { thinkingBudget: 512 },
        },
      });
      text = response.text?.trim() ?? "";
    } catch (error) {
      const raw = error instanceof Error ? error.message : String(error);
      const message = raw.split(apiKey).join("[key]"); // never log or send the key
      console.error("Gemini request failed:", message);

      const debug = process.env.VERCEL_ENV === "development" ? message.slice(0, 800) : undefined;
      const overloaded =
        message.includes('"code":503') ||
        message.includes("UNAVAILABLE") ||
        message.includes("high demand");
      const quota = message.includes('"code":429') || message.includes("RESOURCE_EXHAUSTED");

      if (overloaded) return fail(res, 503, "BUSY", BUSY_ERROR, debug);
      if (quota) {
        return fail(
          res,
          429,
          "QUOTA",
          "We're getting a lot of requests right now. Please try again in a minute.",
          debug
        );
      }
      return fail(res, 502, "SERVER", GENERIC_ERROR, debug);
    }

    let data: Record<string, any>;
    try {
      data = JSON.parse(text.replace(/^```json\s*|```$/g, ""));
    } catch {
      console.error(`Gemini returned invalid JSON (attempt ${attempt}).`);
      continue; // try once more
    }

    if (!data || data.isValidDish !== true) {
      const reason = str(data?.rejectionReason);
      return fail(
        res,
        422,
        "NOT_A_DISH",
        reason || "That doesn't look like a dish. Try entering a specific recipe name!"
      );
    }

    const recipe = normalizeRecipe(data);
    if (recipe) return res.status(200).json({ recipe });

    console.error(`Gemini returned an incomplete recipe (attempt ${attempt}).`);
  }

  return fail(res, 502, "SERVER", GENERIC_ERROR);
}