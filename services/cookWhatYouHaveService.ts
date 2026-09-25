import { predefinedRecipes } from "../data/predefinedRecipes";
import type { Recipe } from "../types";

/* ------------------------------------------------------------------ */
/* Public API (unchanged so the component doesn't need edits)          */
/* ------------------------------------------------------------------ */

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
  source: "predefined" | "ai";
}

/* ------------------------------------------------------------------ */
/* Single place to see/tune the whole scoring model                    */
/* ------------------------------------------------------------------ */

const MATCH_CONFIG = {
  maxResults: 3,
  minRequiredCoverage: 0.55, // recipe must have >= this fraction of core ingredients matched
  matchThreshold: 0.8, // how confident a fuzzy match must be to "count"
  equipmentMatchThreshold: 0.65,
  weights: {
    requiredCoverage: 0.65,
    overallCoverage: 0.25,
    speed: 0.1,
  },
  maxInputStringLength: 60, // defensive clamp on any single field
  maxIngredientsAccepted: 50,
  maxEquipmentAccepted: 20,
} as const;

/* ------------------------------------------------------------------ */
/* Text normalization                                                  */
/* ------------------------------------------------------------------ */

const STOP_WORDS = new Set([
  "a", "an", "and", "as", "for", "of", "the", "to", "with", "or", "ya", "plus", "extra", "in", "on",
]);

const DESCRIPTOR_WORDS = new Set([
  "finely", "roughly", "thinly", "thickly", "freshly", "lightly",
  "chopped", "sliced", "diced", "cubed", "minced", "grated", "mashed",
  "crushed", "beaten", "peeled", "deseeded", "deveined", "trimmed",
  "halved", "quartered", "julienned", "shredded",
  "boneless", "skinless", "skinned",
  "rinsed", "washed", "soaked", "drained",
  "boiled", "cooked", "steamed", "blanched", "prepared", "homemade",
  "fresh", "frozen", "chilled", "cold", "warm", "hot", "room", "temperature",
  "softened", "melted", "roasted", "toasted", "dried", "dry", "raw",
  "small", "medium", "large", "big", "thick", "thin",
  "optional", "needed", "taste", "garnish", "garnishing", "topping",
  "serving", "cooking", "frying", "brushing", "dusting", "greasing",
  "ripe", "whole", "ground", "plain", "pure", "quality", "good",
  "approx", "approximately", "about",
]);

/** Small, curated dictionary of common no-space compounds users type.
 *  Deliberately a lookup table, not a generic algorithm — this is the
 *  robust, maintainable way to handle "icecream" -> "ice cream" without
 *  accidentally loosening matching everywhere else. */
const COMPOUND_WORD_FIXES: Record<string, string> = {
  icecream: "ice cream",
  milkshake: "milk shake",
  buttermilk: "butter milk",
  breadcrumbs: "bread crumbs",
  breadcrumb: "bread crumb",
  coconutmilk: "coconut milk",
  peanutbutter: "peanut butter",
  currypowder: "curry powder",
  chillipowder: "chilli powder",
  chilipowder: "chili powder",
  garammasala: "garam masala",
  currypaste: "curry paste",
  tomatopuree: "tomato puree",
  tomatoketchup: "tomato ketchup",
};

const applyCompoundFixes = (text: string): string =>
  text.replace(/[a-z]+/g, (word) => COMPOUND_WORD_FIXES[word] ?? word);

const baseNormalize = (value: string): string =>
  value
    .slice(0, MATCH_CONFIG.maxInputStringLength)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[–—−]/g, "-")
    .replace(/[’']/g, "")
    .replace(/[()[\]{}]/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const QUANTITY_PREFIX = new RegExp(
  "^(?:\\d+(?:\\.\\d+)?|\\d+\\s*/\\s*\\d+)(?:\\s*(?:to|-)\\s*(?:\\d+(?:\\.\\d+)?|\\d+\\s*/\\s*\\d+))?\\s*" +
    "(?:kg|g|mg|l|ml|litre|liter|cups?|tbsp|tsp|tablespoons?|teaspoons?|pieces?|cloves?|medium|small|large|" +
    "inch|hours?|hrs?|minutes?|mins?|pinch(?:es)?|handful(?:s)?|sprig(?:s)?|strand(?:s)?|bunch(?:es)?)?\\s*"
);

const stripQuantityPrefix = (text: string): string => text.replace(QUANTITY_PREFIX, "").trim();

const singularize = (word: string): string => {
  if (word.length <= 3) return word;
  if (word.endsWith("oes")) return word.slice(0, -2);
  if (word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.endsWith("ves")) return `${word.slice(0, -3)}f`;
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
};

const tokenize = (raw: string): string[] => {
  let text = stripQuantityPrefix(baseNormalize(raw));
  text = applyCompoundFixes(text);
  text = text.replace(
    /\bfor\s+(?:frying|cooking|brushing|garnish|garnishing|topping|serving|greasing|dusting)\b/g,
    " "
  );

  return text
    .replace(/-/g, " ")
    .split(" ")
    .filter(Boolean)
    .filter((word) => !STOP_WORDS.has(word))
    .filter((word) => !DESCRIPTOR_WORDS.has(word))
    .map(singularize)
    .filter(Boolean);
};

const canonicalKey = (tokens: string[]): string => [...new Set(tokens)].sort().join(" ");

const prettyLabel = (raw: string): string => {
  const text = raw.replace(/\([^)]*\)/g, "").split(",")[0].trim();
  if (!text) return raw.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/* ------------------------------------------------------------------ */
/* Fuzzy matching (Levenshtein)                                        */
/* ------------------------------------------------------------------ */

const levenshtein = (a: string, b: string): number => {
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prevRow = Array.from({ length: b.length + 1 }, (_, i) => i);
  let curRow = new Array<number>(b.length + 1);

  for (let i = 1; i <= a.length; i++) {
    curRow[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curRow[j] = Math.min(curRow[j - 1] + 1, prevRow[j] + 1, prevRow[j - 1] + cost);
    }
    [prevRow, curRow] = [curRow, prevRow];
  }

  return prevRow[b.length];
};

const maxAllowedDistance = (len: number): number => {
  if (len <= 4) return 1;
  if (len <= 7) return 2;
  return 3;
};

const tokenSimilar = (a: string, b: string): boolean => {
  if (a === b) return true;
  if (a.length < 3 || b.length < 3) return false;
  return levenshtein(a, b) <= maxAllowedDistance(Math.max(a.length, b.length));
};

/** Tokens that change an ingredient's *identity*, not just its
 *  description, when they modify a base word. "coconut" and "coconut
 *  milk" are different products — a user who has one should not
 *  silently be credited with having the other. This is the guard that
 *  the naive subset-match logic was missing. */
const IDENTITY_MODIFIERS = new Set([
  "milk", "powder", "paste", "oil", "extract", "essence", "juice", "puree",
  "sauce", "flour", "leaf", "leaves", "seed", "seeds", "water", "chutney",
  "syrup", "vinegar", "butter", "cream", "flake", "flakes", "sheet", "sheets",
  "stick", "sticks",
]);

/** How well does a set of user-typed tokens match a set of alias tokens?
 *  1 = exact, 0.9 = subset with only harmless words dropped, 0.82 = fuzzy
 *  token overlap, or a fuzzy whole-phrase score for short phrases, else 0. */
const aliasMatchScore = (userTokens: string[], aliasTokens: string[]): number => {
  const userSet = new Set(userTokens);
  const aliasSet = new Set(aliasTokens);
  if (!userSet.size || !aliasSet.size) return 0;

  const intersection = [...userSet].filter((t) => aliasSet.has(t));
  const intersectionSize = intersection.length;

  if (intersectionSize === userSet.size && intersectionSize === aliasSet.size) {
    return 1;
  }

  if (intersectionSize === userSet.size || intersectionSize === aliasSet.size) {
    const longer = intersectionSize === userSet.size ? aliasSet : userSet;
    const dropped = [...longer].filter((t) => !intersection.includes(t));
    // "vanilla" -> "vanilla ice cream" is fine to drop "vanilla" here isn't
    // possible (that's the alias side dropping nothing); what we're
    // guarding is e.g. "coconut" -> "coconut milk" dropping "milk".
    if (dropped.some((t) => IDENTITY_MODIFIERS.has(t))) return 0;
    return 0.9;
  }

  const unionSize = new Set([...userSet, ...aliasSet]).size;
  let fuzzyMatched = 0;
  for (const ut of userSet) {
    if (aliasSet.has(ut) || [...aliasSet].some((at) => tokenSimilar(ut, at))) fuzzyMatched++;
  }
  if (fuzzyMatched / unionSize >= 0.75) return 0.82;

  if (userSet.size <= 2 && aliasSet.size <= 2) {
    const a = [...userSet].sort().join("");
    const b = [...aliasSet].sort().join("");
    if (Math.abs(a.length - b.length) <= 3) {
      const dist = levenshtein(a, b);
      const sim = 1 - dist / Math.max(a.length, b.length);
      if (sim >= MATCH_CONFIG.matchThreshold) return sim;
    }
  }

  return 0;
};

/* ------------------------------------------------------------------ */
/* Compiling the recipe dataset — ingredients                          */
/* ------------------------------------------------------------------ */

type RawIngredient = { amount?: string; commonName?: string; englishName?: string };
type RawEquipment = { item?: string; alternative?: string | null };

interface IngredientAlias {
  tokens: string[];
}

interface IngredientRequirement {
  label: string;
  aliases: IngredientAlias[];
  optional: boolean;
}

const isOptionalRow = (row: RawIngredient): boolean =>
  /\boptional\b/i.test(`${row.commonName ?? ""} ${row.englishName ?? ""}`);

const isWaterRow = (row: RawIngredient): boolean =>
  /\b(?:water|paani)\b/i.test(`${row.commonName ?? ""} ${row.englishName ?? ""}`);

const splitAlternatives = (text: string): string[] =>
  text.split(/\s*(?:\bor\b|\bya\b)\s*|\s*\/\s*/i).map((p) => p.trim()).filter(Boolean);

const buildIngredientRequirement = (row: RawIngredient): IngredientRequirement | null => {
  const common = String(row.commonName ?? "").trim();
  const english = String(row.englishName ?? "").trim();
  const phrases = [common, english].filter(Boolean).flatMap(splitAlternatives);

  const seen = new Set<string>();
  const aliases: IngredientAlias[] = [];

  for (const phrase of phrases) {
    const tokens = tokenize(phrase);
    if (!tokens.length) continue;
    const key = canonicalKey(tokens);
    if (seen.has(key)) continue;
    seen.add(key);
    aliases.push({ tokens });
  }

  if (!aliases.length) return null;

  return { label: prettyLabel(english || common), aliases, optional: isOptionalRow(row) };
};

/* ------------------------------------------------------------------ */
/* Compiling the recipe dataset — equipment (fuzzy + either/or aware)  */
/* ------------------------------------------------------------------ */

interface EquipmentOption {
  tokens: string[];
  label: string;
}

interface EquipmentRequirement {
  options: EquipmentOption[];
}

const equipmentOptionFrom = (name: string): EquipmentOption | null => {
  const tokens = tokenize(name);
  return tokens.length ? { tokens, label: prettyLabel(name) } : null;
};

const compileEquipment = (recipe: Recipe): EquipmentRequirement[] => {
  const rows: RawEquipment[] = Array.isArray((recipe as any).equipment) ? (recipe as any).equipment : [];

  const requirements = rows
    .map((row) => {
      const names = [row.item, row.alternative].filter((v): v is string => Boolean(v));
      const options = names.map(equipmentOptionFrom).filter((o): o is EquipmentOption => Boolean(o));
      return options.length ? { options } : null;
    })
    .filter((r): r is EquipmentRequirement => Boolean(r));

  if (requirements.length >= 2) {
    const method: string[] = Array.isArray((recipe as any).method)
      ? ((recipe as any).method as Array<{ instruction?: string }>).map((s) => baseNormalize(String(s?.instruction ?? "")))
      : [];

    const itemNames = rows.map((r) => baseNormalize(String(r.item ?? ""))).filter(Boolean);

    const explicitEither = method.some((instruction) => {
      if (!/\bor\b|\beither\b/.test(instruction)) return false;
      const mentioned = itemNames.filter((name) => instruction.includes(name.replace(/_/g, " ")));
      return mentioned.length >= 2;
    });

    if (explicitEither) {
      const merged = rows.map((r) => equipmentOptionFrom(String(r.item ?? ""))).filter((o): o is EquipmentOption => Boolean(o));
      return merged.length ? [{ options: merged }] : requirements;
    }
  }

  return requirements;
};

const equipmentSatisfied = (reqs: EquipmentRequirement[], userEquipment: { tokens: string[] }[]): boolean =>
  reqs.every((req) =>
    req.options.some((opt) =>
      userEquipment.some((u) => aliasMatchScore(u.tokens, opt.tokens) >= MATCH_CONFIG.equipmentMatchThreshold)
    )
  );

const usedEquipmentLabels = (reqs: EquipmentRequirement[], userEquipment: { tokens: string[] }[]): string[] =>
  reqs.flatMap((req) => {
    const hit = req.options.find((opt) =>
      userEquipment.some((u) => aliasMatchScore(u.tokens, opt.tokens) >= MATCH_CONFIG.equipmentMatchThreshold)
    );
    return hit ? [hit.label] : [];
  });

/* ------------------------------------------------------------------ */
/* Compile dataset once                                                */
/* ------------------------------------------------------------------ */

interface CompiledRecipe {
  key: string;
  dishName: string;
  description: string;
  prepTime: string;
  requirements: IngredientRequirement[];
  equipment: EquipmentRequirement[];
}

const COMPILED_RECIPES: CompiledRecipe[] = Object.entries(predefinedRecipes)
  .map(([key, recipe]) => {
    const rows: RawIngredient[] = Array.isArray((recipe as any).ingredients) ? (recipe as any).ingredients : [];
    const requirements = rows
      .filter((row) => !isWaterRow(row))
      .map(buildIngredientRequirement)
      .filter((r): r is IngredientRequirement => Boolean(r));

    return {
      key,
      dishName: String((recipe as any).dishName ?? "").trim(),
      description: String((recipe as any).description ?? "").trim(),
      prepTime: String((recipe as any).prepTime ?? "").trim(),
      requirements,
      equipment: compileEquipment(recipe),
    };
  })
  .filter((r) => r.dishName && r.requirements.length);

/* ------------------------------------------------------------------ */
/* Candidate generation: inverted index + fuzzy vocab expansion         */
/*                                                                      */
/* Instead of scoring every recipe against every query (O(recipes ×     */
/* requirements × aliases × user ingredients) every single time), we    */
/* build a small vocabulary once at module load, and per-query only     */
/* fuzz-match against that vocabulary (cheap: a few hundred tokens)     */
/* then look up which recipes contain those tokens (O(1) per token).    */
/* Detailed scoring then only runs on the shortlist. This is standard   */
/* "candidate generation, then rerank" search architecture and keeps    */
/* the search fast even if the dataset grows far past ~200 recipes.     */
/* ------------------------------------------------------------------ */

const INGREDIENT_VOCAB = new Set<string>();
const TOKEN_TO_RECIPE_KEYS = new Map<string, Set<string>>();

for (const compiled of COMPILED_RECIPES) {
  for (const req of compiled.requirements) {
    for (const alias of req.aliases) {
      for (const token of alias.tokens) {
        INGREDIENT_VOCAB.add(token);
        let bucket = TOKEN_TO_RECIPE_KEYS.get(token);
        if (!bucket) {
          bucket = new Set();
          TOKEN_TO_RECIPE_KEYS.set(token, bucket);
        }
        bucket.add(compiled.key);
      }
    }
  }
}

const expandToVocabTokens = (token: string): string[] => {
  if (INGREDIENT_VOCAB.has(token)) return [token];
  const near: string[] = [];
  for (const vocabToken of INGREDIENT_VOCAB) {
    if (tokenSimilar(token, vocabToken)) near.push(vocabToken);
  }
  return near;
};

const candidateRecipeKeys = (users: UserIngredient[]): Set<string> => {
  const keys = new Set<string>();
  for (const user of users) {
    for (const token of user.tokens) {
      for (const vocabToken of expandToVocabTokens(token)) {
        TOKEN_TO_RECIPE_KEYS.get(vocabToken)?.forEach((key) => keys.add(key));
      }
    }
  }
  return keys;
};

/* ------------------------------------------------------------------ */
/* User input                                                          */
/* ------------------------------------------------------------------ */

interface UserIngredient {
  original: string;
  tokens: string[];
}

const buildUserIngredients = (list: string[]): UserIngredient[] => {
  const seen = new Set<string>();
  const out: UserIngredient[] = [];

  for (const raw of list.slice(0, MATCH_CONFIG.maxIngredientsAccepted)) {
    const tokens = tokenize(String(raw ?? ""));
    if (!tokens.length) continue;
    const key = canonicalKey(tokens);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ original: String(raw).trim(), tokens });
  }

  return out;
};

const buildUserEquipment = (list: string[]): { tokens: string[] }[] =>
  list
    .slice(0, MATCH_CONFIG.maxEquipmentAccepted)
    .map((e) => ({ tokens: tokenize(String(e ?? "")) }))
    .filter((e) => e.tokens.length);

/* ------------------------------------------------------------------ */
/* Matching + scoring                                                  */
/* ------------------------------------------------------------------ */

const bestMatchScore = (requirement: IngredientRequirement, users: UserIngredient[]): number => {
  let best = 0;
  for (const user of users) {
    for (const alias of requirement.aliases) {
      const score = aliasMatchScore(user.tokens, alias.tokens);
      if (score > best) best = score;
      if (best >= 1) return best;
    }
  }
  return best;
};

const parsePrepMinutes = (value: string): number => {
  const hours = value.match(/(\d+(?:\.\d+)?)\s*(?:hour|hours|hr|hrs)/i);
  const minutes = value.match(/(\d+(?:\.\d+)?)\s*(?:minute|minutes|min|mins)/i);
  if (!hours && !minutes) return Number.POSITIVE_INFINITY;
  return (hours ? Number(hours[1]) * 60 : 0) + (minutes ? Number(minutes[1]) : 0);
};

interface Candidate {
  score: number;
  matchedCount: number;
  prepMinutes: number;
  key: string;
  match: RecipeMatch;
}

const matchRecipes = (
  compiledRecipes: CompiledRecipe[],
  users: UserIngredient[],
  userEquipment: { tokens: string[] }[]
): Candidate[] => {
  const shortlistKeys = candidateRecipeKeys(users);
  const candidates: Candidate[] = [];

  for (const compiled of compiledRecipes) {
    if (!shortlistKeys.has(compiled.key)) continue;
    if (!equipmentSatisfied(compiled.equipment, userEquipment)) continue;

    const required = compiled.requirements.filter((r) => !r.optional);
    const optional = compiled.requirements.filter((r) => r.optional);
    if (!required.length) continue;

    const matchedLabels: string[] = [];
    let requiredMatched = 0;
    let optionalMatched = 0;

    for (const req of required) {
      if (bestMatchScore(req, users) >= MATCH_CONFIG.matchThreshold) {
        requiredMatched++;
        matchedLabels.push(req.label);
      }
    }

    const coverage = requiredMatched / required.length;
    if (coverage < MATCH_CONFIG.minRequiredCoverage) continue;

    for (const req of optional) {
      if (bestMatchScore(req, users) >= MATCH_CONFIG.matchThreshold) {
        optionalMatched++;
        matchedLabels.push(req.label);
      }
    }

    const overallTotal = required.length + optional.length;
    const overallMatched = requiredMatched + optionalMatched;
    const overallCoverage = overallTotal ? overallMatched / overallTotal : coverage;

    const prepMinutes = parsePrepMinutes(compiled.prepTime);
    const speed = Number.isFinite(prepMinutes) ? 1 / Math.max(prepMinutes, 5) : 0;

    const { weights } = MATCH_CONFIG;
    const score = coverage * weights.requiredCoverage + overallCoverage * weights.overallCoverage + speed * weights.speed;
    const pct = Math.round(coverage * 100);

    candidates.push({
      score,
      matchedCount: overallMatched,
      prepMinutes,
      key: compiled.key,
      match: {
        dishName: compiled.dishName,
        description: compiled.description,
        prepTime: compiled.prepTime,
        ingredientsUsed: matchedLabels,
        equipmentUsed: usedEquipmentLabels(compiled.equipment, userEquipment),
        whyItWorks: `Uses ${requiredMatched} of ${required.length} core ingredients you have (${pct}% match), with equipment you picked.`,
      },
    });
  }

  candidates.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 0.0001) return b.score - a.score;
    if (b.matchedCount !== a.matchedCount) return b.matchedCount - a.matchedCount;
    if (a.prepMinutes !== b.prepMinutes) return a.prepMinutes - b.prepMinutes;
    return a.key.localeCompare(b.key);
  });

  return candidates;
};

/* ------------------------------------------------------------------ */
/* Caching + public predefined-search function                         */
/* ------------------------------------------------------------------ */

const MATCH_CACHE = new Map<string, CookWhatYouHaveResponse>();
const MAX_CACHE_ENTRIES = 50;

const cloneResponse = (response: CookWhatYouHaveResponse): CookWhatYouHaveResponse => ({
  source: response.source,
  recipes: response.recipes.map((r) => ({ ...r, ingredientsUsed: [...r.ingredientsUsed], equipmentUsed: [...r.equipmentUsed] })),
});

const buildCacheKey = (input: CookWhatYouHaveInput): string =>
  JSON.stringify({
    equipment: input.equipment.map((e) => canonicalKey(tokenize(String(e ?? "")))).filter(Boolean).sort(),
    ingredients: input.ingredients.map((i) => canonicalKey(tokenize(String(i ?? "")))).filter(Boolean).sort(),
  });

export const findMatchingPredefinedRecipes = (input: CookWhatYouHaveInput): CookWhatYouHaveResponse => {
  if (!input.equipment.length) throw new Error("Please select at least one piece of equipment.");
  if (!input.ingredients.length) throw new Error("Please add at least one ingredient.");

  const cacheKey = buildCacheKey(input);
  const cached = MATCH_CACHE.get(cacheKey);
  if (cached) return cloneResponse(cached);

  const userEquipment = buildUserEquipment(input.equipment);
  const users = buildUserIngredients(input.ingredients);

  const candidates = matchRecipes(COMPILED_RECIPES, users, userEquipment);

  const recipes: RecipeMatch[] = [];
  const seen = new Set<string>();

  for (const candidate of candidates) {
    const identity = candidate.match.dishName.toLowerCase().trim();
    if (seen.has(identity)) continue;
    seen.add(identity);
    recipes.push(candidate.match);
    if (recipes.length >= MATCH_CONFIG.maxResults) break;
  }

  const response: CookWhatYouHaveResponse = { recipes, source: "predefined" };

  if (MATCH_CACHE.size >= MAX_CACHE_ENTRIES) {
    const oldest = MATCH_CACHE.keys().next().value;
    if (typeof oldest === "string") MATCH_CACHE.delete(oldest);
  }
  MATCH_CACHE.set(cacheKey, response);

  return cloneResponse(response);
};

/* ------------------------------------------------------------------ */
/* AI fallback (unchanged behavior, only used when predefined yields 0) */
/* ------------------------------------------------------------------ */

const GENERIC_ERROR = "The kitchen assistant couldn't find recipes right now. Please try again.";
const OFFLINE_ERROR = "Couldn't reach our kitchen. Check your connection and try again.";

const textValue = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

const stringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string").map((v) => v.trim()).filter(Boolean) : [];

const cleanAiMatches = (value: unknown): RecipeMatch[] =>
  (Array.isArray(value) ? value : [])
    .flatMap((raw: any): RecipeMatch[] => {
      const dishName = textValue(raw?.dishName);
      if (!dishName) return [];
      return [
        {
          dishName,
          description: textValue(raw?.description),
          prepTime: textValue(raw?.prepTime),
          ingredientsUsed: stringList(raw?.ingredientsUsed),
          equipmentUsed: stringList(raw?.equipmentUsed),
          whyItWorks: textValue(raw?.whyItWorks),
        },
      ];
    })
    .slice(0, MATCH_CONFIG.maxResults);

const findRecipesWithOpenRouter = async (input: CookWhatYouHaveInput): Promise<CookWhatYouHaveResponse> => {
  let response: Response;

  try {
    response = await fetch("/api/cook-match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ equipment: input.equipment, ingredients: input.ingredients }),
    });
  } catch (error) {
    console.error("Cook What You Have AI fallback failed:", error);
    throw new Error(OFFLINE_ERROR);
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    console.error("The cook-match API didn't return JSON. Locally, start the app with `vercel dev` instead of `npm run dev`.");
  }

  if (!response.ok) {
    console.error("Cook What You Have AI fallback error:", response.status, JSON.stringify(data?.error));
    throw new Error(typeof data?.error?.message === "string" && data.error.message ? data.error.message : GENERIC_ERROR);
  }

  if (!Array.isArray(data?.recipes)) {
    console.error("The cook-match API returned an unexpected response:", data);
    throw new Error(GENERIC_ERROR);
  }

  return { recipes: cleanAiMatches(data.recipes), source: "ai" };
};

export const findRecipesFromIngredients = async (input: CookWhatYouHaveInput): Promise<CookWhatYouHaveResponse> => {
  const predefined = findMatchingPredefinedRecipes(input);
  if (predefined.recipes.length > 0) return predefined;
  return findRecipesWithOpenRouter(input);
};