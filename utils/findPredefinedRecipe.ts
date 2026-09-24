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
  // added home-style basics and common everyday searches
  "omelette": "egg omelette",
  "omelet": "egg omelette",
  "egg omlette": "egg omelette",
  "boiled egg": "boiled eggs",
  "boiled eggs recipe": "boiled eggs",
  "vegetable sandwich": "veg sandwich",
  "veggie sandwich": "veg sandwich",
  "paneer toast": "paneer sandwich",
  "besan chilla": "besan chila",
  "besan cheela": "besan chila",
  "besan cheela recipe": "besan chila",
  "ven pongal": "pongal (ven pongal)",
  "pongal rice": "pongal (ven pongal)",
  "chole rice": "chole chawal",
  "chana chawal": "chole chawal",
  "kadhi rice": "kadhi chawal",
  "kadhi chawal recipe": "kadhi chawal",
  "dalia": "vegetable dalia (broken wheat porridge)",
  "vegetable dalia": "vegetable dalia (broken wheat porridge)",
  "plain dalia": "vegetable dalia (broken wheat porridge)",
  "upma": "vegetable upma",
  "upma recipe": "vegetable upma",
  "pulao": "quick vegetable pulao",
  "veg pulao": "quick vegetable pulao",
  "vegetable pulao": "quick vegetable pulao",
  "bread pakora": "bread pakoda",
  "bread pakoda": "bread pakoda",
  "bread pakoda recipe": "bread pakoda",
  "bread padoka": "bread pakoda",
  "kachori recipe": "kachori (moong dal kachori)",
  "bhel": "bhel puri",
  "bhel poori": "bhel puri",
  "paneer tikka recipe": "paneer tikka",
  "rasam sadam": "rasam rice",
  "rasam rice recipe": "rasam rice",
  "chicken kebab": "chicken kabab",
  "chicken kabab recipe": "chicken kabab",
  "seekh kebab": "seekh kabab",
  "seekh kebab recipe": "seekh kabab",
  "mutton kebab": "mutton kabab",
  "mutton kabab recipe": "mutton kabab",
  "chicken salami recipe": "chicken salami (home style)",
  "paneer gravy": "paneer curry",
  "chicken keema recipe": "chicken keema",
  "chicken qeema": "chicken keema",
  "biryani": "chicken biryani",

  // latest everyday sabzis, dals and breads
  "aloo tamatar": "aloo tamatar sabzi",
  "aloo tamatar ki sabzi": "aloo tamatar sabzi",
  "aloo tamatar sabzi": "aloo tamatar sabzi",
  "kadhi": "kadhi",
  "plain kadhi": "kadhi",
  "paneer": "shahi paneer",
  "paneer sabzi": "shahi paneer",
  "mushroom": "mushroom masala",
  "mushroom ki sabzi": "mushroom masala",
  "mushroom curry": "mushroom masala",
  "palak mushroom": "palak mushroom",
  "spinach mushroom": "palak mushroom",
  "aloo matar": "aloo matar",
  "aloo mutter": "aloo matar",
  "dal palak": "dal palak",
  "spinach dal": "dal palak",
  "lobia": "lobia masala",
  "lobiya": "lobia masala",
  "lobia curry": "lobia masala",
  "aloo methi": "aloo methi",
  "aloo methi sabzi": "aloo methi",
  "gobi": "gobi masala",
  "gobhi": "gobi masala",
  "gobi ki sabzi": "gobi masala",
  "gobhi masala": "gobi masala",
  "kofta": "kofta curry (lauki kofta)",
  "kofta curry": "kofta curry (lauki kofta)",
  "lauki kofta": "kofta curry (lauki kofta)",
  "malai kofta": "malai kofta",
  "dum aloo": "dum aloo",
  "dum aloo curry": "dum aloo",
  "tori": "tori sabzi",
  "turai": "tori sabzi",
  "tori ki sabzi": "tori sabzi",
  "turai ki sabzi": "tori sabzi",
  "moong dal": "moong dal",
  "mung dal": "moong dal",
  "masoor dal": "masoor dal",
  "masoor dal fry": "masoor dal",
  "dal baati": "dal baati",
  "dal bati": "dal baati",
  "daal baati": "dal baati",
  "dahi vada": "dahi vada",
  "dahi bhalla": "dahi vada",
  "dahi bhale": "dahi vada",
  "thepla": "thepla",
  "methi thepla": "thepla",
  "matar pulao": "matar pulao",
  "matar pulav": "matar pulao",
  "peas pulao": "matar pulao",
  "kothu parotta": "kothu parotta",
  "kothu paratha": "kothu parotta",
  "kothu roti": "kothu parotta",
  "patta gobhi": "patta gobhi sabzi",
  "patta gobi": "patta gobhi sabzi",
  "patta gobhi sabzi": "patta gobhi sabzi",
  "cabbage sabzi": "patta gobhi sabzi",
  "paneer lababdar": "paneer lababdar",
  "paneer lababdar curry": "paneer lababdar",
  "matar korma": "matar korma",
  "mutter korma": "matar korma",
  "peas korma": "matar korma",
  "korma": "classic chicken korma",
  "chicken korma": "classic chicken korma",
  "amritsari chole": "amritsari chole",
  "amritsari chana": "amritsari chole",
  "rajma masala": "rajma (red kidney bean curry)",
  "sarson ka saag": "sarson ka saag",
  "sarson da saag": "sarson ka saag",
  "sarson saag": "sarson ka saag",
  "makki di roti": "makki di roti",
  "makki ki roti": "makki di roti",
  "makki roti": "makki di roti",
  "mooli ki sabzi": "mooli ki sabzi",
  "mooli sabzi": "mooli ki sabzi",
  "radish sabzi": "mooli ki sabzi",
  "lauki sabzi": "lauki sabzi",
  "lauki ki sabzi": "lauki sabzi",
  "dudhi sabzi": "lauki sabzi",
  "arbi": "arbi masala",
  "arbi masala": "arbi masala",
  "arbi ki sabzi": "arbi masala",
  "colocasia sabzi": "arbi masala",
  "soya chaap": "soya chaap",
  "soya chaap masala": "soya chaap",
  "soy chaap": "soya chaap",
  "papdi chaat": "papdi chaat",
  "papri chaat": "papdi chaat",
  "papdi chat": "papdi chaat",
  "sev puri": "sev puri",
  "sev poori": "sev puri",
  "sev batata puri": "sev puri",
  "dahi puri": "dahi puri",
  "dahi poori": "dahi puri",

  // newly added home-style recipes
  "roti": "roti (chapati)",
  "chapati": "roti (chapati)",
  "chapatti": "roti (chapati)",
  "chappati": "roti (chapati)",
  "phulka": "roti (chapati)",
  "sambar chawal": "sambar chawal",
  "sambar rice": "sambar chawal",
  "sambhar chawal": "sambar chawal",
  "sambhar rice": "sambar chawal",
  "pani puri": "pani puri (golgappe)",
  "golgappe": "pani puri (golgappe)",
  "gol gappe": "pani puri (golgappe)",
  "paani puri": "pani puri (golgappe)",
  "pani pauri": "pani puri (golgappe)",
  "paani pauri": "pani puri (golgappe)",
  "golgappa": "pani puri (golgappe)",
  "gol gappa": "pani puri (golgappe)",
  "rasmalai": "rasmalai",
  "mutton curry": "mutton curry",
  "mutton masala": "mutton curry",
  "medu vada": "medu vada",
  "medhu vada": "medu vada",
  "medu vadai": "medu vada",
  "tinda": "tinda sabzi",
  "tinda ki sabzi": "tinda sabzi",
  "gajar matar": "gajar matar",
  "gajar aur matar": "gajar matar",
  "kadai chicken": "kadai chicken",
  "karahi chicken": "kadai chicken",
  "kadai murgh": "kadai chicken",
  "mutton biryani": "mutton biryani",
  "mutton biriyani": "mutton biryani",
  "uttapam": "uttapam",
  "uthappam": "uttapam",
  "momos": "momos (veg momos)",
  "momo": "momos (veg momos)",
  "veg momos": "momos (veg momos)",
  "vegetable momos": "momos (veg momos)",
  // bharta / bhindi
  "bharta": "baingan bharta (smoky roasted eggplant mash)",
  "baingan bharta": "baingan bharta (smoky roasted eggplant mash)",
  "bhindi": "bhindi masala (okra stir-fry)",

  // mushroom + peas
  "matar mushroom": "mutter mushroom",
  "mushroom matar": "mutter mushroom",
  "matar mushroom masala": "mutter mushroom",
  "mutter mushroom masala": "mutter mushroom",

  // earlier
  "chole": "chana masala",
  "chole masala": "chana masala",
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


    // kadai paneer, tandoori chicken, biryani, vada pav, rasam, khichdi, lassi
  "karahi paneer": "kadai paneer",
  "tandoori murgh": "tandoori chicken (oven-style)",
  "chicken tandoori": "tandoori chicken (oven-style)",
  "vegetable biryani": "veg biryani",
  "veg dum biryani": "veg biryani",
  "batata vada": "vada pav",
  "vada pao": "vada pav",
  "moong dal khichdi": "khichdi (moong dal khichdi)",
  "dal khichdi": "khichdi (moong dal khichdi)",
  "sweet lassi": "lassi (sweet lassi)",
  "mithi lassi": "lassi (sweet lassi)",

  // focused aliases and routing requested for common searches
  "cheela": "besan chila",
  "chilla": "besan chila",
  "cheela recipe": "besan chila",
  "chilla recipe": "besan chila",
  "egg": "egg omelette",
  "eggs": "egg omelette",
  "egg omelet": "egg omelette",
  "egg omelette recipe": "egg omelette",
  "chicken": "butter chicken (murgh makhani)",
  "chicken recipe": "butter chicken (murgh makhani)",
  "fish": "fish curry (fish masala)",
  "fish curry": "fish curry (fish masala)",
  "machli": "fish curry (fish masala)",
  "machhli curry": "fish curry (fish masala)",
  "fish finger": "fish fingers",
  "fish fingers recipe": "fish fingers",
  "kadhi pakora": "kadhi pakora",
  "kadhi pakoda": "kadhi pakora",
  "pakora kadhi": "kadhi pakora",
  "keema matar": "keema matar",
  "matar keema": "keema matar",
  "keema mattar": "keema matar",
  "karela": "karela sabzi",
  "karela ki sabzi": "karela sabzi",
  "bitter gourd sabzi": "karela sabzi",
  "toor dal": "toor dal",
  "tuvar dal": "toor dal",
  "toor daal": "toor dal",
  "tur dal": "toor dal",
  "aloo tikki": "aloo tikki",
  "aloo tikki chaat": "aloo tikki",
  "dhokla": "dhokla (besan dhokla)",
  "dhokla recipe": "dhokla (besan dhokla)",
  "besan dhokla": "dhokla (besan dhokla)",
  "tomato rice": "tomato rice",
  "tomato bhaat": "tomato rice",
  "parotta": "parotta",
  "parota": "parotta",
  "plain parotta": "parotta",
  "achari paneer": "achari paneer",
  "achari paneer recipe": "achari paneer",
  "vegetable kurma": "vegetable kurma",
  "veg kurma": "vegetable kurma",
  "kurma": "vegetable kurma",
  "vegetable korma": "vegetable kurma",
  "veg korma": "vegetable kurma",
  "aloo shimla mirch": "aloo shimla mirch",
  "shimla mirch": "aloo shimla mirch",
  "aloo capsicum": "aloo shimla mirch",
  "pindi chole": "pindi chole",
  "pindi chana": "pindi chole",
  "pindi chole recipe": "pindi chole",
  "rogan josh": "rogan josh",
  "mutton rogan josh": "rogan josh",
  "rogan gosht": "rogan josh",
  "kulfi": "kulfi",
  "kulfi ice cream": "kulfi",
  "malai kulfi": "kulfi",
  "sushi": "sushi (veg sushi)",
  "veg sushi": "sushi (veg sushi)",
  "vegetable sushi": "sushi (veg sushi)",
  "vangi bath": "vangi bath",
  "vangi bhath": "vangi bath",
  "baingan bhath": "vangi bath",
  "brinjal rice": "vangi bath",
  "sambar": "sambar",
  "sambhar": "sambar",
  "sambar recipe": "sambar",
  "parippu curry": "parippu curry",
  "parippu dal": "parippu curry",
  "kerala dal": "parippu curry",
  "benne dosa": "benne dosa",
  "butter dosa": "benne dosa",
  "benne masala dosa": "benne dosa",
  "rava dosa": "rava dosa",
  "rav dosa": "rava dosa",
  "suji dosa": "rava dosa",
  "thatte idli": "thatte idli",
  "thatte idly": "thatte idli",
  "plate idli": "thatte idli",
  "bisi bele bath": "bisi bele bath",
  "bisi bele bhath": "bisi bele bath",
  "bisibelebath": "bisi bele bath",
  "khara bath": "khara bath",
  "khara bhaat": "khara bath",
  "uppittu": "khara bath",
  "puliyogare": "puliyogare",
  "puliyodarai": "puliyogare",
  "puliogare": "puliyogare",
  "tamarind rice": "puliyogare",
  "aloo palya": "aloo palya",
  "potato palya": "aloo palya",
  "potato stir fry": "aloo palya",
  "chitranna": "lemon rice (chitranna)",
  "chitranna rice": "lemon rice (chitranna)",
  "lemon rice": "lemon rice (chitranna)",
  "tinda masala": "tinda sabzi",

  // added everyday basics
  "dal chawal": "dal chawal",
  "dal rice": "dal chawal",
  "aloo sabzi": "aloo sabzi",
  "aloo ki sabzi": "aloo sabzi",
  "bread butter": "bread butter",
  "butter bread": "bread butter",
  "bread jam": "bread jam",
  "jam bread": "bread jam",
  "bread honey": "bread honey",
  "honey bread": "bread honey",
  "curd": "dahi (homemade curd)",
  "dahi": "dahi (homemade curd)",
  "homemade curd": "dahi (homemade curd)",
  "mutter poha": "mutter poha (peas poha)",
  "matar poha": "mutter poha (peas poha)",
  "peas poha": "mutter poha (peas poha)",
  "mixed veg": "mixed veg sabzi",
  "mixed veg sabzi": "mixed veg sabzi",
  "mixed vegetable sabzi": "mixed veg sabzi",
  "shukto": "shukto",
  "shukta": "shukto",
  "vermicelli": "vermicelli (masala seviyan)",
  "seviyan": "vermicelli (masala seviyan)",
  "semiya": "vermicelli (masala seviyan)",
  "vermicelli upma": "vermicelli (masala seviyan)",
  "masala seviyan": "vermicelli (masala seviyan)",
  "chocolate cake": "chocolate cake",
  "choco cake": "chocolate cake",
  "strawberry cake": "strawberry cake",
  "pineapple cake": "pineapple cake",
  "pinapple cake": "pineapple cake",
  "ananas cake": "pineapple cake",
  "aamti": "aamti",
  "amti": "aamti",
  "gobhi paratha": "gobhi paratha",
  "gobhi parantha": "gobhi paratha",
  "cauliflower paratha": "gobhi paratha",
  "mooli paratha": "mooli paratha",
  "muli paratha": "mooli paratha",
  "radish paratha": "mooli paratha",
  "paneer momos": "paneer momos",
  "paneer momo": "paneer momos",
  "chicken momos": "chicken momos",
  "chicken momo": "chicken momos",
  "tandoori momos": "tandoori momos",
  "tandoori momo": "tandoori momos",

};

for (const [alias, targetKey] of Object.entries(MANUAL_ALIASES)) {
  const recipe = predefinedRecipes[targetKey];
  if (recipe) register(byKey, matchKey(alias), recipe);
}
/* ------------------------------------------------------------------ */
/* Fuzzy matching: catches typos and small variations ("rajma chawl"  */
/* -> "rajma chawal", "chiken biryani" -> "chicken biryani") without  */
/* needing a hardcoded list of every possible misspelling.            */
/* ------------------------------------------------------------------ */

// Standard Levenshtein edit distance (insertions/deletions/substitutions).
const levenshtein = (a: string, b: string): number => {
  const alen = a.length;
  const blen = b.length;
  if (alen === 0) return blen;
  if (blen === 0) return alen;

  let prevRow = new Array<number>(blen + 1);
  let curRow = new Array<number>(blen + 1);
  for (let j = 0; j <= blen; j++) prevRow[j] = j;

  for (let i = 1; i <= alen; i++) {
    curRow[0] = i;
    for (let j = 1; j <= blen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curRow[j] = Math.min(
        curRow[j - 1] + 1, // insertion
        prevRow[j] + 1, // deletion
        prevRow[j - 1] + cost // substitution
      );
    }
    [prevRow, curRow] = [curRow, prevRow];
  }
  return prevRow[blen];
};

// How many edits we tolerate scales with string length, so short words
// ("dal") don't accidentally match unrelated short words, while longer
// phrases get more room for typos.
const maxAllowedDistance = (len: number): number => {
  if (len <= 4) return 1;
  if (len <= 8) return 2;
  return Math.min(4, Math.round(len * 0.3));
};

const similarity = (a: string, b: string): number => {
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : 1 - dist / maxLen;
};

// Word-order-insensitive comparison, so "biryani chicken" still finds
// "chicken biryani".
const sortedWords = (s: string): string => s.split(" ").sort().join(" ");

// Every alias we know about, built once at module load. Fuzzy search is
// a linear scan over this, which is fine for a few hundred entries.
const allKeys: string[] = Array.from(byKey.keys());

const fuzzyFindKey = (query: string): Recipe | null => {
  if (!query || query.length < 3) return null;

  const queryWords = query.split(" ");
  const querySorted = sortedWords(query);

  let best: { recipe: Recipe; score: number } | null = null;

  for (const key of allKeys) {
    // Cheap length pre-filter: two strings that differ wildly in length
    // can't be within a small edit distance of each other.
    if (Math.abs(key.length - query.length) > maxAllowedDistance(Math.max(key.length, query.length)) + 3) {
      continue;
    }

    // Signal 1: direct edit distance on the whole string.
    const directDist = levenshtein(query, key);
    const directOk = directDist <= maxAllowedDistance(Math.max(query.length, key.length));
    const directScore = similarity(query, key);

    // Signal 2: same words, different order/spacing ("biryani chicken").
    const keySorted = sortedWords(key);
    const sortedDist = levenshtein(querySorted, keySorted);
    const sortedOk = sortedDist <= maxAllowedDistance(Math.max(querySorted.length, keySorted.length));
    const sortedScore = similarity(querySorted, keySorted);

    // Signal 3: token overlap - handles a missing/extra word ("chana masala
    // curry" vs "chana masala") and per-word typos.
    const keyWords = key.split(" ");
    let matchedWords = 0;
    for (const qw of queryWords) {
      const hasMatch = keyWords.some((kw) => {
        if (qw === kw) return true;
        if (qw.length < 3 || kw.length < 3) return false;
        return levenshtein(qw, kw) <= maxAllowedDistance(Math.max(qw.length, kw.length));
      });
      if (hasMatch) matchedWords++;
    }
    const tokenScore =
      matchedWords / Math.max(queryWords.length, keyWords.length);

    if (!directOk && !sortedOk && tokenScore < 0.75) continue;

    const score = Math.max(directScore, sortedScore, tokenScore * 0.95);

    if (!best || score > best.score) {
      const recipe = byKey.get(key)!;
      best = { recipe, score };
    }
  }

  // Require a reasonably confident match - this is the "typo tolerance"
  // threshold; below it we'd rather fall through to the AI than guess wrong.
  return best && best.score >= 0.72 ? best.recipe : null;
};

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
    fuzzyFindKey(cleaned) ??
    fuzzyFindKey(raw) ??
    null
  );
};
