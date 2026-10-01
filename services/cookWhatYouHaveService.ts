import { predefinedRecipes } from "../data/predefinedRecipes";
import type { Recipe } from "../types";

/* ------------------------------------------------------------------ */
/* Public API                                                               */
/* ------------------------------------------------------------------ */

export interface CookWhatYouHaveInput {
  equipment: string[];
  ingredients: string[];
  assumeStaples?: boolean;
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
  source: "predefined" | "ai" | "mixed";
}

/* ------------------------------------------------------------------ */
/* Single place to see/tune the whole scoring model                    */
/* ------------------------------------------------------------------ */

const MATCH_CONFIG = {
  maxResults: 3,
  matchThreshold: 0.8,
  equipmentMatchThreshold: 0.65,
  weights: {
    richness: 0.45,     // dish is built from many real ingredients
    utilization: 0.4,   // dish uses many of the user's picks
    optional: 0.1,
    speed: 0.05,        // tie-breaker only
  },
  trivialPantrySize: 8, // user picked this many main ingredients or more...
  trivialMaxMain: 2,    // ...hide dishes with this few main ingredients (paratha)
  maxInputStringLength: 60,
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
   "deep", "fry", "stuffing", "filling",
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

  // A plain "dal" covers any specific dal (toor, moong, masoor...).
  if (userSet.size === 1 && userSet.has("dal") && aliasSet.has("dal")) return 0.85;


  const intersection = [...userSet].filter((t) => aliasSet.has(t));
  const intersectionSize = intersection.length;

  if (intersectionSize === userSet.size && intersectionSize === aliasSet.size) {
    return 1;
  }

  // A user can be more specific than a recipe requirement when the extra
  // words are harmless descriptors: "chopped onion" -> "onion".
  if (intersectionSize === aliasSet.size && intersectionSize < userSet.size) {
    const extraUserTokens = [...userSet].filter((t) => !intersection.includes(t));
    if (extraUserTokens.every((t) => DESCRIPTOR_WORDS.has(t))) return 0.9;
  }

  // Do not credit a generic user ingredient for a more specific requirement:
  // "milk" must not satisfy "coconut milk".
  if (intersectionSize === userSet.size && intersectionSize < aliasSet.size) {
    const missingRequirementTokens = [...aliasSet].filter((t) => !intersection.includes(t));
    if (missingRequirementTokens.every((t) => DESCRIPTOR_WORDS.has(t))) return 0.9;
    return 0;
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

const STAPLE_PHRASES = [
  "salt", "oil", "cooking oil", "vegetable oil", "refined oil", "mustard oil",
  "ghee", "sugar", "turmeric", "turmeric powder", "haldi",
  "cumin", "cumin seeds", "jeera", "chilli powder", "red chilli powder",
  "chili powder", "coriander powder", "garam masala", "black pepper",
  "mustard seeds",
];

const STAPLE_KEYS = new Set(STAPLE_PHRASES.map((p) => canonicalKey(tokenize(p))));

const isStaple = (req: IngredientRequirement): boolean =>
  req.aliases.some((alias) => STAPLE_KEYS.has(canonicalKey(alias.tokens)));

// Garnishes: nice to have, never a reason to reject a dish.
const GARNISH_PHRASES = ["coriander leaves", "curry leaves", "lemon", "lemon juice"];
const GARNISH_KEYS = new Set(GARNISH_PHRASES.map((p) => canonicalKey(tokenize(p))));

const isGarnish = (req: IngredientRequirement): boolean =>
  req.aliases.some((alias) => GARNISH_KEYS.has(canonicalKey(alias.tokens)));

const joinNatural = (items: string[]): string =>
  items.length <= 1
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
  

const matchRecipes = (
  compiledRecipes: CompiledRecipe[],
  users: UserIngredient[],
  userEquipment: { tokens: string[] }[],
  assumeStaples: boolean
): Candidate[] => {
  const shortlistKeys = candidateRecipeKeys(users);
  const threshold = MATCH_CONFIG.matchThreshold;
  const userMain = users.filter((u) => {
  const key = canonicalKey(u.tokens);
    return !STAPLE_KEYS.has(key) && !GARNISH_KEYS.has(key);
  });
  const candidates: Candidate[] = [];

  for (const compiled of compiledRecipes) {
    if (!shortlistKeys.has(compiled.key)) continue;
    if (!equipmentSatisfied(compiled.equipment, userEquipment)) continue;

    const required = compiled.requirements.filter((r) => !r.optional);
    const optional = compiled.requirements.filter((r) => r.optional);
    const mainRequired = required.filter((r) => !isStaple(r) && !isGarnish(r));
    if (!mainRequired.length) continue;

    // Hide trivial dishes (paratha, plain rice) when the user has a big pantry.
    if (
      userMain.length >= MATCH_CONFIG.trivialPantrySize &&
      mainRequired.length <= MATCH_CONFIG.trivialMaxMain
    ) {
      continue;
    }

    // Every required ingredient must be available. Staples are free when the toggle is on.
    const missingSomething = required.some(
      (r) => !(assumeStaples && isStaple(r)) && !isGarnish(r) && bestMatchScore(r, users) < threshold
    );
    if (missingSomething) continue;

    const optionalMain = optional.filter((r) => !isStaple(r) && bestMatchScore(r, users) >= threshold);

    // How many of the user's own picks does this dish actually consume?
    const usedUsers = userMain.filter((u) =>
      mainRequired.some((r) =>
        r.aliases.some((a) => aliasMatchScore(u.tokens, a.tokens) >= threshold)
      )
    ).length;

    const richness = Math.min(mainRequired.length, 8) / 8;
    const utilization = userMain.length ? usedUsers / userMain.length : 0;
    const optionalCoverage = optional.length ? optionalMain.length / optional.length : 0;

    const prepMinutes = parsePrepMinutes(compiled.prepTime);
    const speed = Number.isFinite(prepMinutes) ? 1 / Math.max(prepMinutes, 5) : 0;

    const { weights } = MATCH_CONFIG;
    const score =
      richness * weights.richness +
      utilization * weights.utilization +
      optionalCoverage * weights.optional +
      speed * weights.speed;

    const usedLabels = [...mainRequired, ...optionalMain].map((r) => r.label);
    const shown = usedLabels.slice(0, 4).map((l) => l.toLowerCase());
    const prep = compiled.prepTime ? ` Ready in ${compiled.prepTime}.` : "";

    candidates.push({
      score,
      matchedCount: usedLabels.length,
      prepMinutes,
      key: compiled.key,
      match: {
        dishName: compiled.dishName,
        description: compiled.description,
        prepTime: compiled.prepTime,
        ingredientsUsed: usedLabels,
        equipmentUsed: usedEquipmentLabels(compiled.equipment, userEquipment),
        whyItWorks: `Uses your ${joinNatural(shown)}.${prep}`,
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

const AI_CACHE = new Map<string, RecipeMatch[]>();
const MAX_AI_CACHE_ENTRIES = 30;

const cloneMatches = (list: RecipeMatch[]): RecipeMatch[] =>
  list.map((r) => ({
    ...r,
    ingredientsUsed: [...r.ingredientsUsed],
    equipmentUsed: [...r.equipmentUsed],
  }));

const rememberAi = (key: string, list: RecipeMatch[]) => {
  if (AI_CACHE.size >= MAX_AI_CACHE_ENTRIES) {
    const oldest = AI_CACHE.keys().next().value;
    if (typeof oldest === "string") AI_CACHE.delete(oldest);
  }
  AI_CACHE.set(key, cloneMatches(list));
};

const cloneResponse = (response: CookWhatYouHaveResponse): CookWhatYouHaveResponse => ({
  source: response.source,
  recipes: response.recipes.map((r) => ({ ...r, ingredientsUsed: [...r.ingredientsUsed], equipmentUsed: [...r.equipmentUsed] })),
});

const buildCacheKey = (input: CookWhatYouHaveInput): string =>
  JSON.stringify({
    assumeStaples: input.assumeStaples ?? true,
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

  const candidates = matchRecipes(
    COMPILED_RECIPES,
    users,
    userEquipment,
    input.assumeStaples ?? true
  );

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
/* AI fallback: only fills recipe slots the predefined collection cannot cover. */
/* ------------------------------------------------------------------ */

const GENERIC_ERROR = "The kitchen assistant couldn't find recipes right now. Please try again.";
const OFFLINE_ERROR = "Couldn't reach our kitchen. Check your connection and try again.";

const TIMEOUT_ERROR = "The kitchen assistant is taking too long. Please try again.";
const AI_TIMEOUT_MS = 25_000; // covers the server's one JSON retry

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

const mergeUniqueRecipes = (
  predefined: RecipeMatch[],
  ai: RecipeMatch[],
  maxResults: number
): RecipeMatch[] => {
  const seen = new Set<string>();
  const merged: RecipeMatch[] = [];

  for (const recipe of [...predefined, ...ai]) {
    const key = recipe.dishName.trim().toLowerCase();
    if (!key || seen.has(key)) continue;

    seen.add(key);
    merged.push(recipe);

    if (merged.length >= maxResults) break;
  }

  return merged;
};

const findRecipesWithOpenRouter = async (
  input: CookWhatYouHaveInput,
  count: number,
  excludeDishNames: string[] = []
): Promise<RecipeMatch[]> => {
  if (count <= 0) return [];

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    let response: Response;

    try {
      response = await fetch("/api/cook-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          equipment: input.equipment,
          ingredients: input.ingredients,
          assumeStaples: input.assumeStaples ?? true,
          count,
          excludeDishNames,
        }),
      });
    } catch (error) {
      if (controller.signal.aborted) throw new Error(TIMEOUT_ERROR);
      console.error("Cook What You Have AI fallback failed:", error);
      throw new Error(OFFLINE_ERROR);
    }

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      if (controller.signal.aborted) throw new Error(TIMEOUT_ERROR);
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

    return cleanAiMatches(data.recipes).slice(0, count);
  } finally {
    window.clearTimeout(timer);
  }
};


export const findRecipesFromIngredients = async (
  input: CookWhatYouHaveInput,
  onLocalResults?: (recipes: RecipeMatch[]) => void
): Promise<CookWhatYouHaveResponse> => {
  const predefined = findMatchingPredefinedRecipes(input);
  const predefinedCount = predefined.recipes.length;

  if (predefinedCount >= MATCH_CONFIG.maxResults) {
    return {
      recipes: predefined.recipes.slice(0, MATCH_CONFIG.maxResults),
      source: "predefined",
    };
  }

  // Show local matches immediately while the AI fills the remaining slots.
  if (predefinedCount > 0) onLocalResults?.(predefined.recipes);

  const missingCount = MATCH_CONFIG.maxResults - predefinedCount;
  const aiKey = buildCacheKey(input);

  try {
    const cachedAi = AI_CACHE.get(aiKey);

    const ai = cachedAi
      ? cloneMatches(cachedAi)
      : await findRecipesWithOpenRouter(
          input,
          missingCount,
          predefined.recipes.map((recipe) => recipe.dishName)
        );

    // Only remember successful, non-empty answers so a bad run can be retried.
    if (!cachedAi && ai.length > 0) rememberAi(aiKey, ai);

    const recipes = mergeUniqueRecipes(
      predefined.recipes,
      ai,
      MATCH_CONFIG.maxResults
    );

    return {
      recipes,
      source:
        predefinedCount === 0
          ? "ai"
          : ai.length > 0
          ? "mixed"
          : "predefined",
    };
  } catch (error) {
    if (predefinedCount > 0) {
      console.error("AI fallback failed; returning predefined matches:", error);
      return {
        recipes: predefined.recipes.slice(0, MATCH_CONFIG.maxResults),
        source: "predefined",
      };
    }

    throw error;
  }
};

