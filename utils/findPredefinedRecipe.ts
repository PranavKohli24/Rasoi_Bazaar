import { Recipe } from "../types";
import { predefinedRecipes } from "../data/predefinedRecipes";
import { toSlug } from "./dishRoutes";

// Strips conversational filler ("i want to eat ... today") from a search.
export const normalizeDishQuery = (input: string): string => {
  let text = input.trim().toLowerCase();

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

/* ------------------------------------------------------------------ */
/* Alias index: every predefined recipe is reachable by its full key,  */
/* its dishName, and shorter forms derived from them, so             */
/* "quick 20-minute paneer bhurji" also answers "paneer bhurji".      */
/* ------------------------------------------------------------------ */

// lowercase, punctuation -> spaces, collapsed whitespace
const matchKey = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

// Descriptive words people don't type ("quick 20-minute paneer bhurji")
const LEADING_QUALIFIERS =
  /^(?:(?:quick|healthy|classic|easy|simple|homemade|home style|instant|traditional|\d+ minute)\s+)+/;
const TRAILING_QUALIFIERS = /\s+(?:on tawa|on the stovetop|on stovetop|at home)$/;

// Bracket contents that are a cooking note, not another name for the dish
const IGNORED_ALIASES = new Set(["stovetop"]);

const variantsOf = (name: string): string[] => {
  const out = new Set<string>();
  const add = (v: string) => {
    const k = matchKey(v);
    if (k.length >= 3 && !IGNORED_ALIASES.has(k)) out.add(k);
  };

  // "poha (kanda batata poha)" -> base "poha", bracket "kanda batata poha"
  const base = matchKey(name.replace(/\([^)]*\)/g, " "));
  const brackets = [...name.matchAll(/\(([^)]*)\)/g)].map((m) => m[1]);

  add(base);
  const noLeading = base.replace(LEADING_QUALIFIERS, "");
  const noTrailing = base.replace(TRAILING_QUALIFIERS, "");
  const noBoth = noLeading.replace(TRAILING_QUALIFIERS, "");
  add(noLeading);
  add(noTrailing);
  add(noBoth);

  brackets.forEach(add);

  return [...out];
};

const byKey = new Map<string, Recipe>();
const bySlug = new Map<string, Recipe>();

const register = (map: Map<string, Recipe>, key: string, recipe: Recipe) => {
  if (key && !map.has(key)) map.set(key, recipe); // first registration wins
};

const entries = Object.entries(predefinedRecipes);

// Pass 1: exact keys and dish names always take priority over derived aliases
for (const [key, recipe] of entries) {
  register(byKey, matchKey(key), recipe);
  register(byKey, matchKey(recipe.dishName), recipe);
  register(bySlug, toSlug(key), recipe);
}

// Pass 2: derived aliases (only fill gaps, never override)
for (const [key, recipe] of entries) {
  for (const v of [...variantsOf(key), ...variantsOf(recipe.dishName)]) {
    register(byKey, v, recipe);
  }
}

// Manual aliases for common searches the auto-aliases can't derive.
// Format: "what people type": "predefined recipe key"
const MANUAL_ALIASES: Record<string, string> = {
  // earlier
  "chole": "chana masala",
  "chickpea curry": "chana masala",
  "chole bature": "chole bhature",
  "chole batura": "chole bhature",
  "idli": "idli sambar",
  "dal": "dal tadka",
  "tadka dal": "dal tadka",
  "dal fry": "dal tadka",
  "bread omelette": "french toast (anda bread)",
  "egg toast": "french toast (anda bread)",

  // halwa
  "halwa": "atta halwa (wheat flour halwa)",
  "kada prasad": "atta halwa (wheat flour halwa)",
  "suji halwa": "rava kesari (semolina halwa)",
  "sooji halwa": "rava kesari (semolina halwa)",
  "suji ka halwa": "rava kesari (semolina halwa)",
  "sooji ka halwa": "rava kesari (semolina halwa)",

  // sabzi / dal / chole
  "beans": "french beans (beans ki sabzi)",
  "green beans": "french beans (beans ki sabzi)",
  "beans sabzi": "french beans (beans ki sabzi)",
  "french beans sabzi": "french beans (beans ki sabzi)",
  "farasbi": "french beans (beans ki sabzi)",
  "soya chunks": "nutrela (soya chunks curry)",
  "soya chunk": "nutrela (soya chunks curry)",
  "soya chunks masala": "nutrela (soya chunks curry)",
  "soya chunk curry": "nutrela (soya chunks curry)",
  "meal maker": "nutrela (soya chunks curry)",
  "chana dal fry": "chana dal (chana dal tadka)",
  "white chana": "white chole (safed chole)",
  "kabuli chana": "white chole (safed chole)",

  // pasta, maggi, macaroni
  "masala pasta": "pasta (indian masala pasta)",
  "red sauce pasta": "pasta (indian masala pasta)",
  "desi pasta": "pasta (indian masala pasta)",
  "maggi noodles": "maggi (masala maggi noodles)",
  "masala maggi": "maggi (masala maggi noodles)",
  "instant noodles": "maggi (masala maggi noodles)",
  "noodles": "maggi (masala maggi noodles)",
  "macroni": "macaroni (masala macaroni)",
  "masala macroni": "macaroni (masala macaroni)",
  "macaroni pasta": "macaroni (masala macaroni)",

  // cake, pakode, chai
  "eggless cake": "cake (simple eggless vanilla cake)",
  "vanilla cake": "cake (simple eggless vanilla cake)",
  "sponge cake": "cake (simple eggless vanilla cake)",
  "plain cake": "cake (simple eggless vanilla cake)",
  "pakoda": "pakode (pakora)",
  "pakore": "pakode (pakora)",
  "padoke": "pakode (pakora)",
  "bhajiya": "pakode (pakora)",
  "bhajia": "pakode (pakora)",
  "onion pakora": "pakode (pakora)",
  "onion pakode": "pakode (pakora)",
  "onion pakoda": "pakode (pakora)",
  "tea": "chai (masala chai)",
  "masala tea": "chai (masala chai)",
  "adrak chai": "chai (masala chai)",
  "cutting chai": "chai (masala chai)",
};

for (const [alias, targetKey] of Object.entries(MANUAL_ALIASES)) {
  const recipe = predefinedRecipes[targetKey];
  if (recipe) register(byKey, matchKey(alias), recipe);
}


export const findPredefinedRecipe = (query: string): Recipe | null => {
  const raw = matchKey(query);
  if (!raw) return null;

  // "i want paneer bhurji recipe please" -> "paneer bhurji"
  const cleaned = matchKey(normalizeDishQuery(query)).replace(/\s+recipe$/, "");

  return (
    byKey.get(cleaned) ??
    byKey.get(raw) ??
    bySlug.get(toSlug(query)) ??
    bySlug.get(toSlug(cleaned)) ??
    null
  );
};