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

  // Common Hinglish endings people use when asking for a recipe.
  // Kept conservative so we do not accidentally alter real dish names.
  const hinglishLeadingFillers = [
    /^(?:mujhe|mereko|mujhko|mujko|muje)\s+/,
    /^(?:aaj|abhi|ghar\s+(?:pe|par))\s+/,
    /^kaise\s+(?:banaye|banayen|banau|banate\s+hain|banani\s+hai|banana\s+hai)\s+/,
  ];

  const hinglishTrailingFillers = [
    /\s+(?:chahiye|batao|bata\s+do|bataiye)\s*$/,
    /\s+(?:banana|banani|khana|khani)\s+hai\s*$/,
    /\s+kaise\s+(?:banaye|banayen|banau|banate\s+hain)\s*$/,
    /\s+(?:ki|ka|ke)\s+(?:recipe|vidhi|tarika)\s*(?:batao|bata\s+do|bataiye)?\s*$/,
    /\s+(?:banane|banaane)\s+(?:ki|ka|ke)\s+(?:recipe|vidhi|tarika)\s*(?:batao|bata\s+do|bataiye)?\s*$/,
    /\s+recipe\s+(?:batao|bata\s+do|bataiye)\s*$/,
  ];

  let hinglishChanged = true;
  while (hinglishChanged) {
    hinglishChanged = false;

    for (const pattern of hinglishLeadingFillers) {
      const stripped = text.replace(pattern, "");
      if (stripped !== text) {
        text = stripped.trim();
        hinglishChanged = true;
      }
    }

    for (const pattern of hinglishTrailingFillers) {
      const stripped = text.replace(pattern, "");
      if (stripped !== text) {
        text = stripped.trim();
        hinglishChanged = true;
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
// Generic terms (for example "paneer") are intentionally left unresolved when ambiguous.
// Format: "what people type": "predefined recipe key"
const MANUAL_ALIASES: Record<string, string> = {
  // added home-style basics and common everyday searches
  "omelette": "egg omelette",
  "omelet": "egg omelette",
  "egg omlette": "egg omelette",
  "boiled egg": "boiled eggs",
  "boiled eggs recipe": "boiled eggs",
  "sandwich" : "veg sandwich",
  "vegetable sandwich": "veg sandwich",
  "veggie sandwich": "veg sandwich",
  "paneer":"shahi paneer",
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

  // regional India specials
  "rajma gogji": "rajma gogji",
  "rajma shalgam": "rajma gogji",
  "gogji rajma": "rajma gogji",
  "siddu": "siddu",
  "himachali siddu": "siddu",
  "aloo ke gutke": "aloo ke gutke",
  "aloo gutke": "aloo ke gutke",
  "gatte ki sabzi": "gatte ki sabzi",
  "gatte sabzi": "gatte ki sabzi",
  "gatte curry": "gatte ki sabzi",
  "sev tameta": "sev tameta",
  "sev tameta nu shaak": "sev tameta",
  "bharli vangi": "bharli vangi",
  "bharli baingan": "bharli vangi",
  "stuffed brinjal maharashtrian": "bharli vangi",
  "ros omelette": "ros omelette",
  "ros omlette": "ros omelette",
  "goan ros omelette": "ros omelette",
  "beef ularthiyathu": "beef ularthiyathu",
  "beef ularthiyathu recipe": "beef ularthiyathu",
  "beef fry ularthiyathu": "beef ularthiyathu",
  "gutti vankaya": "gutti vankaya",
  "gutti vankaya kura": "gutti vankaya",
  "gutti vankaya curry": "gutti vankaya",
  "bagara baingan": "bagara baingan",
  "baghare baingan": "bagara baingan",
  "bagara baingan curry": "bagara baingan",
  "dalma": "dalma",
  "dalma recipe": "dalma",
  "dalma odia": "dalma",
  "litti chokha": "litti chokha",
  "litti": "litti chokha",
  "dhuska": "dhuska",
  "dhuskha": "dhuska",
  "jharkhand dhuska": "dhuska",
  "khar": "khar",
  "assamese khar": "khar",
  "papaya khar": "khar",
  "eromba": "eromba",
  "eromba recipe": "eromba",
  "manipuri eromba": "eromba",
  "dohneiihong": "dohneiihong",
  "dohneiiong": "dohneiihong",
  "doh neiihong": "dohneiihong",
  "doh neiiong": "dohneiihong",
  "axone pork": "axone pork",
  "akhuni pork": "axone pork",
  "pork with axone": "axone pork",
  "bai": "bai",
  "mizo bai": "bai",
  "bai mizoram": "bai",
  "fara": "fara",
  "chhattisgarhi fara": "fara",
  "fara recipe": "fara",
  "poha jalebi": "poha jalebi",
  "indori poha jalebi": "poha jalebi",
  "indore poha jalebi": "poha jalebi",

  // latest everyday sabzis, dals and breads
  "aloo tamatar": "aloo tamatar sabzi",
  "aloo tamatar ki sabzi": "aloo tamatar sabzi",
  "aloo tamatar sabzi": "aloo tamatar sabzi",
  "kadhi": "kadhi",
  "plain kadhi": "kadhi",
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
  "dhuli moong": "moong dal",
  "green gram": "moong dal",
  "masoor dal": "masoor dal",
  "masoor dal fry": "masoor dal",
  "red lentils": "masoor dal",
  "split red lentils": "masoor dal",
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
  "amritsari pindi chole": "pindi chole",
  "amritsari pindi chana": "pindi chole",
  "amritsari chana": "amritsari chole",
  "rajma masala": "rajma (red kidney bean curry)",
  "kidney beans": "rajma (red kidney bean curry)",
  "red kidney beans": "rajma (red kidney bean curry)",
  "rajma rice" : "rajma chawal",
  "kidney bean rice": "rajma chawal",
  "rajma rice bowl": "rajma chawal",
  "sabut urad": "dal makhani",
  "sabut urad dal": "dal makhani",
  "whole black gram": "dal makhani",
  "black gram": "dal makhani",
  "whole urad": "dal makhani",
  "split chickpeas": "chana dal (chana dal tadka)",
  "dhuli moong dal": "moong dal",
  "arhar dal": "toor dal",
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
  "taro root": "arbi masala",
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
  "khichdi chawal": "khichdi (moong dal khichdi)",
  "khichdi rice": "khichdi (moong dal khichdi)",
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
  "okra": "bhindi masala (okra stir-fry)",
  "ladyfinger": "bhindi masala (okra stir-fry)",

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
  "bread omelette": "egg omelette",
  "bread omelet": "egg omelette",
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
  "pigeon peas": "toor dal",
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
  "aloo samosa" : "samosa",
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

    // newly added dals and drinks
  "sabut moong": "sabut moong dal",
  "sabut moong ki dal": "sabut moong dal",
  "sabut moong dal recipe": "sabut moong dal",
  "whole moong dal": "sabut moong dal",
  "whole green moong": "sabut moong dal",
  "green moong dal": "sabut moong dal",
  "hari moong dal": "sabut moong dal",

  "sabut masoor": "sabut masoor dal",
  "sabut masoor ki dal": "sabut masoor dal",
  "sabut masoor dal recipe": "sabut masoor dal",
  "whole masoor dal": "sabut masoor dal",
  "whole brown masoor": "sabut masoor dal",
  "brown masoor dal": "sabut masoor dal",
  "brown lentil dal": "sabut masoor dal",
  "whole masoor": "sabut masoor dal",
  "brown lentils": "sabut masoor dal",

  "kulthi": "kulthi dal",
  "kulthi ki dal": "kulthi dal",
  "kulthi dal recipe": "kulthi dal",
  "kulith dal": "kulthi dal",
  "kulath dal": "kulthi dal",
  "gahat dal": "kulthi dal",
  "horse gram dal": "kulthi dal",
  "horsegram dal": "kulthi dal",

  "moth": "moth dal",
  "moth ki dal": "moth dal",
  "moth dal recipe": "moth dal",
  "matki dal": "moth dal",
  "matki ki dal": "moth dal",
  "moth beans dal": "moth dal",
  "moth bean curry": "moth dal",

  "aamti": "amti dal",
  "amti": "amti dal",
  "amti daal": "amti dal",
  "amti recipe": "amti dal",
  "maharashtrian amti": "amti dal",
  "maharashtrian amti dal": "amti dal",
  "maharashtra dal": "amti dal",

  "chikoo": "chiku juice",
  "chiku juice recipe": "chiku juice",
  "chickoo juice": "chiku juice",
  "chicku juice": "chiku juice",
  "sapota juice": "chiku juice",
  "sappota juice": "chiku juice",
  "sapota drink": "chiku juice",
  "chikoo drink": "chiku juice",

  "mosambi": "mosambi juice",
  "mosambi juice recipe": "mosambi juice",
  "mosambi ka juice": "mosambi juice",
  "mosambi ka juice recipe": "mosambi juice",
  "mosambi drink": "mosambi juice",
  "sweet lime juice": "mosambi juice",
  "sweet lime drink": "mosambi juice",

  "litchi": "litchi juice",
  "litchi juice recipe": "litchi juice",
  "litchi ka juice": "litchi juice",
  "litchi drink": "litchi juice",
  "litchi sharbat": "litchi juice",
  "lychee juice": "litchi juice",
  "lychee juice recipe": "litchi juice",
  "lychee drink": "litchi juice",

  // pizza and burger
  "pizza": "home style pizza",
  "veg pizza": "home style pizza",
  "vegetable pizza": "home style pizza",
  "homemade pizza": "home style pizza",
  "burger": "home style burger",
  "veg burger": "home style burger",
  "vegetable burger": "home style burger",
  "homemade burger": "home style burger",

  // ice cream
  "icecream": "easy chocolate ice cream",
  "ice cream": "easy chocolate ice cream",
  "chocolate icecream": "easy chocolate ice cream",
  "chocolate ice cream": "easy chocolate ice cream",
  "vanilla icecream": "easy vanilla ice cream",
  "vanilla ice cream": "easy vanilla ice cream",
  "strawberry icecream": "easy strawberry ice cream",
  "strawberry ice cream": "easy strawberry ice cream",

  // juices
  "juice": "easy orange juice",
  "orange juice": "easy orange juice",
  "orange juice recipe": "easy orange juice",
  "apple juice": "fresh apple juice",
  "apple juice recipe": "fresh apple juice",
  "mango juice": "easy mango juice",
  "mango juice recipe": "easy mango juice",
  "pineapple juice": "fresh pineapple juice",
  "pineapple juice recipe": "fresh pineapple juice",
  "grape juice": "fresh grape juice",
  "grape juice recipe": "fresh grape juice",
  "watermelon juice": "fresh watermelon juice",
  "watermelon juice recipe": "fresh watermelon juice",

  // milkshakes
  "vanilla milk shake": "easy vanilla milkshake",
  "vanilla milkshake": "easy vanilla milkshake",
  "vanilla shake": "easy vanilla milkshake",
  "chocolate milk shake": "easy chocolate milkshake",
  "chocolate milkshake": "easy chocolate milkshake",
  "chocolate shake": "easy chocolate milkshake",
  "strawberry milk shake": "easy strawberry milkshake",
  "strawberry milkshake": "easy strawberry milkshake",
  "strawberry shake": "easy strawberry milkshake",
  "oreo milk shake": "easy oreo milkshake",
  "oreo milkshake": "easy oreo milkshake",
  "oreo shake": "easy oreo milkshake",
  "orea shake": "easy oreo milkshake",
  "milk shake": "easy vanilla milkshake",
  "milkshake": "easy vanilla milkshake",
  "shake": "easy vanilla milkshake",
  "coffee": "hot coffee",
  "hot coffee": "hot coffee",
  "hot coffee recipe": "hot coffee",
  "cold coffee": "easy cold coffee",
  "cold coffee recipe": "easy cold coffee",
  "frappe": "easy coffee frappe",
  "coffee frappe": "easy coffee frappe",
  "iced frappe": "easy coffee frappe",
  "iced latte": "easy iced latte",
  "ice latte": "easy iced latte",
  "iced coffee latte": "easy iced latte",
  "vietnamese coffee": "easy vietnamese coffee",
  "vietnamse coffee": "easy vietnamese coffee",
  "vietnamese": "easy vietnamese coffee",
  "vietnamse": "easy vietnamese coffee",

  // common explicit recipe searches and Indian spelling variants
  "paneer bhurji": "quick 20-minute paneer bhurji",
  "paneer bhurji recipe": "quick 20-minute paneer bhurji",
  "anda bhurji": "egg bhurji (anda bhurji)",
  "egg bhurji recipe": "egg bhurji (anda bhurji)",
  "kanda batata poha": "poha (kanda batata poha)",
  "thayir sadam": "curd rice (thayir sadam)",
  "dahi chawal": "curd rice (thayir sadam)",
  "dahi rice" : "curd rice (thayir sadam)",
  "curd rice recipe": "curd rice (thayir sadam)",
  "lauki chana dal": "lauki chana dal (bottle gourd with split chickpea lentils)",
  "gajar ka halwa": "gajar halwa (carrot halwa)",
  "carrot halwa": "gajar halwa (carrot halwa)",
  "besan ladoo": "besan ladoo",
  "besan laddu": "besan ladoo",
  "gulab jamun": "gulab jamun (home-style, with milk powder)",
  "chicken 65": "chicken 65",
  "chicken 65 recipe": "chicken 65",
  "garlic naan": "garlic naan on tawa",
  "jeera rice": "jeera rice",
  "aloo paratha": "aloo paratha",
  "laccha paratha": "laccha paratha (multi-layered flatbread)",
  "paneer butter masala": "paneer butter masala",
  "butter paneer": "paneer butter masala",
  "chicken biryani recipe": "chicken biryani",
  "veg biryani recipe": "veg biryani",
  "pav bhaji recipe": "pav bhaji",
  "idli sambar recipe": "idli sambar",
  "plain dosa": "dosa (plain crispy dosa)",
  "masala dosa recipe": "masala dosa",
  "momo recipe": "momos (veg momos)",
  "veg momo": "momos (veg momos)",
  "mutton curry recipe": "mutton curry",
  "mutton biryani recipe": "mutton biryani",
  "south indian thali rice": "sambar chawal",

    // yellow dal / dal tadka
  "yellow dal": "dal tadka",
  "yellow daal": "dal tadka",
  "peeli dal": "dal tadka",
  "peeli daal": "dal tadka",
  "yellow dal tadka": "dal tadka",
  "daal tadka": "dal tadka",
  "dal tarka": "dal tadka",
  "daal tarka": "dal tadka",
  "plain yellow dal": "dal tadka",

  // Bedmi Puri
  "bedmi poori": "bedmi puri",
  "bedami puri": "bedmi puri",
  "bedami poori": "bedmi puri",
  "bedmi puri recipe": "bedmi puri",
  "bedmi poori recipe": "bedmi puri",
  "urad dal puri": "bedmi puri",

  // Oats
  "oats": "quick oats (plain oats)",
  "plain oats": "quick oats (plain oats)",
  "quick oats": "quick oats (plain oats)",
  "quick oat": "quick oats (plain oats)",
  "plain oatmeal": "quick oats (plain oats)",
  "oatmeal": "quick oats (plain oats)",
  "rolled oats": "rolled oats porridge",
  "rolled oat porridge": "rolled oats porridge",
  "rolled oats porridge recipe": "rolled oats porridge",
  "oats porridge": "rolled oats porridge",
  "oat porridge": "rolled oats porridge",
  "steel cut oats": "steel cut oats porridge",
  "steel-cut oats": "steel cut oats porridge",
  "steel cut oatmeal": "steel cut oats porridge",
  "steel cut oats porridge": "steel cut oats porridge",
  "masala oats recipe": "masala oats",
  "savoury oats": "masala oats",
  "savory oats": "masala oats",
  "vegetable masala oats": "masala oats",
  "oat upma": "oats upma",
  "oats upma recipe": "oats upma",
  "oats uppittu": "oats upma",

  // Sattu Paratha
  "sattu ka paratha": "sattu paratha",
  "sattu parantha": "sattu paratha",
  "sattu ka parantha": "sattu paratha",
  "bihari sattu paratha": "sattu paratha",
  "sattu paratha recipe": "sattu paratha",
  "sattu stuffed paratha": "sattu paratha",
  "chana sattu paratha": "sattu paratha",

  // Amritsari Fish
  "amritsari machhi": "amritsari fish",
  "amritsari machli": "amritsari fish",
  "amritsari macchi": "amritsari fish",
  "amritsari fish fry": "amritsari fish",
  "amritsari fried fish": "amritsari fish",
  "amritsari fish recipe": "amritsari fish",
  "amritsari machhi fry": "amritsari fish",

  // Bajra Khichdi
  "bajre ki khichdi": "bajra khichdi",
  "bajre ki khichri": "bajra khichdi",
  "bajra khichri": "bajra khichdi",
  "bajra dal khichdi": "bajra khichdi",
  "bajra moong dal khichdi": "bajra khichdi",
  "bajra khichdi recipe": "bajra khichdi",

  // Gujarati Dal / Gujarati Kadhi
  "gujarati daal": "gujarati dal",
  "gujarati dal recipe": "gujarati dal",
  "gujarati tuvar dal": "gujarati dal",
  "gujarati tuver dal": "gujarati dal",
  "gujarati toor dal": "gujarati dal",
  "gujarati tuvar ni dal": "gujarati dal",
  "gujarati karhi": "gujarati kadhi",
  "gujarati kadhi recipe": "gujarati kadhi",
  "gujarati dahi kadhi": "gujarati kadhi",
  "sweet gujarati kadhi": "gujarati kadhi",
  "gujarati kadhi karhi": "gujarati kadhi",

  // Usal Pav
  "usal paav": "usal pav",
  "usal pao": "usal pav",
  "usal pav recipe": "usal pav",
  "matki usal": "usal pav",
  "matki usal pav": "usal pav",
  "matki usal paav": "usal pav",
  "usal bhaji": "usal pav",

  // Kanda Bhaji
  "kanda bhajji": "kanda bhaji",
  "kanda bhajiya": "kanda bhaji",
  "kanda bajji": "kanda bhaji",
  "kanda pakoda": "kanda bhaji",
  "kanda pakodi": "kanda bhaji",
  "onion bhaji": "kanda bhaji",
  "onion bhajji": "kanda bhaji",
  "onion bhajiya": "kanda bhaji",
  "pyaaz pakoda": "kanda bhaji",
  "pyaz pakoda": "kanda bhaji",
  "pyaaz pakora": "kanda bhaji",
  "pyaz pakora": "kanda bhaji",

  // Chana Ghugni
  "ghugni": "chana ghugni",
  "ghuguni": "chana ghugni",
  "chana ghuguni": "chana ghugni",
  "kala chana ghugni": "chana ghugni",
  "kala chana ghuguni": "chana ghugni",
  "bihari ghugni": "chana ghugni",
  "ghugni curry": "chana ghugni",
  "chana ghugni recipe": "chana ghugni",

  // Dal Pitha
  "dal pittha": "dal pitha",
  "dal peetha": "dal pitha",
  "bihari dal pitha": "dal pitha",
  "bihari dal pittha": "dal pitha",
  "chana dal pitha": "dal pitha",
  "dal pitha recipe": "dal pitha",

  // Masor Tenga
  "maasor tenga": "masor tenga",
  "masor tanga": "masor tenga",
  "assamese masor tenga": "masor tenga",
  "masor tenga recipe": "masor tenga",
  "assamese sour fish curry": "masor tenga",
  "assamese fish curry": "masor tenga",

  // Thukpa
  "thupka": "thukpa",
  "thukpa soup": "thukpa",
  "thukpa noodles": "thukpa",
  "thukpa noodle soup": "thukpa",
  "veg thukpa": "thukpa",
  "vegetable thukpa": "thukpa",
  "veg thukpa soup": "thukpa",

  // Hyderabadi Biryani
  "hyderabad biryani": "hyderabadi biryani",
  "hyderabadi chicken biryani": "hyderabadi biryani",
  "hyderabadi dum biryani": "hyderabadi biryani",
  "hyderabadi chicken dum biryani": "hyderabadi biryani",
  "hyderabad chicken biryani": "hyderabadi biryani",
  "dum biryani hyderabad": "hyderabadi biryani",
  "hyderabadi biriyani": "hyderabadi biryani",
  "hyderabad biriyani": "hyderabadi biryani",

  // Mirchi Ka Salan
  "mirchi salan": "mirchi ka salan",
  "mirchi ka salan recipe": "mirchi ka salan",
  "mirchi salan recipe": "mirchi ka salan",
  "hyderabadi mirchi ka salan": "mirchi ka salan",
  "hyderabadi mirchi salan": "mirchi ka salan",
  "green chilli salan": "mirchi ka salan",

  // Gongura Pachadi
  "gongura chutney": "gongura pachadi",
  "gongura pachadi recipe": "gongura pachadi",
  "andhra gongura chutney": "gongura pachadi",
  "andhra gongura pachadi": "gongura pachadi",
  "gongura roti pachadi": "gongura pachadi",
  "gongura rotti pachadi": "gongura pachadi",

  // Mysore Masala Dosa
  "mysuru masala dosa": "mysore masala dosa",
  "mysore masala dosai": "mysore masala dosa",
  "mysore masala dose": "mysore masala dosa",
  "mysuru masala dose": "mysore masala dosa",
  "mysuru masala dosai": "mysore masala dosa",
  "mysore masala dosa recipe": "mysore masala dosa",

  // Ragi Mudde
  "ragi sangati": "ragi mudde",
  "ragi kali": "ragi mudde",
  "ragikali": "ragi mudde",
  "ragi mudda": "ragi mudde",
  "ragi mudde recipe": "ragi mudde",

  // Kootu variants
  "poricha koottu": "poricha kootu",
  "poricha kootu recipe": "poricha kootu",
  "puli koottu": "puli kootu",
  "puli kootu recipe": "puli kootu",
  "pumpkin puli kootu": "puli kootu",
  "mor koottu": "mor kootu",
  "more kootu": "mor kootu",
  "mor kootu recipe": "mor kootu",

  // Poriyal
  "porial": "poriyal",
  "poriyal recipe": "poriyal",
  "beans poriyal": "poriyal",
  "beans porial": "poriyal",
  "green beans poriyal": "poriyal",
  "french beans poriyal": "poriyal",

  // Podi Curry
  "podi kari": "podi curry",
  "podi curry recipe": "podi curry",
  "vazhakkai podi curry": "podi curry",
  "vazhakai podi curry": "podi curry",
  "vazhakkai podi": "podi curry",
  "vazhakkai podi potta curry": "podi curry",
  "raw banana podi curry": "podi curry",
  "raw banana podi": "podi curry",
  "plantain podi curry": "podi curry",
  "vazhakkai varuval": "podi curry",
  "vazhakkai poriyal": "podi curry",

  // Gushtaba
  "goshtaba": "gushtaba",
  "gushtaba curry": "gushtaba",
  "kashmiri gushtaba": "gushtaba",
  "kashmiri goshtaba": "gushtaba",
  "gushtaba yakhni": "gushtaba",
  "goshtaba yakhni": "gushtaba",

  // Haak Saag
  "haakh": "haak saag",
  "haakh saag": "haak saag",
  "kashmiri haak": "haak saag",
  "kashmiri haakh": "haak saag",
  "haak sabzi": "haak saag",

  // Nadru Yakhni
  "nadur yakhni": "nadru yakhni",
  "nadir yakhni": "nadru yakhni",
  "nandru yakhni": "nadru yakhni",
  "kamal kakdi yakhni": "nadru yakhni",
  "lotus stem yakhni": "nadru yakhni",
  "kashmiri lotus stem curry": "nadru yakhni",
  "nadru yakhni recipe": "nadru yakhni",

  // Chole Tikki
  "chole aloo tikki": "chole tikki",
  "chole tikki chaat": "chole tikki",
  "aloo tikki chole": "chole tikki",
  "tikki chole": "chole tikki",
  "chole ki tikki": "chole tikki",
  "chole tikki recipe": "chole tikki",

  // Dessert spellings
  "rabdi": "rabri",
  "rabadi": "rabri",
  "rabri recipe": "rabri",
  "rabdi recipe": "rabri",
  "rabri doodh": "rabri",
  "doodh rabri": "rabri",

  "ghewar": "ghevar",
  "ghebar": "ghevar",
  "ghevar recipe": "ghevar",
  "ghewar recipe": "ghevar",
  "malai ghevar": "ghevar",
  "rabdi ghevar": "ghevar",

  "sondesh": "sandesh",
  "bengali sandesh": "sandesh",
  "bengali sondesh": "sandesh",
  "chhena sandesh": "sandesh",
  "sandesh recipe": "sandesh",

  "misti doi": "mishti doi",
  "mishti dahi": "mishti doi",
  "mishti dohi": "mishti doi",
  "bengali mishti doi": "mishti doi",
  "sweet doi": "mishti doi",
  "sweet dahi": "mishti doi",
  "mishti doi recipe": "mishti doi",

  // high-value Indian typing / transliteration variants
  "daal": "dal tadka",
  "dal tadka recipe": "dal tadka",
  "dal fry recipe": "dal tadka",
  "dal tarka recipe": "dal tadka",

  "subzi": "mixed veg sabzi",
  "sabji": "mixed veg sabzi",
  "subji": "mixed veg sabzi",
  "sabzi recipe": "mixed veg sabzi",
  "sabji recipe": "mixed veg sabzi",
  "subzi recipe": "mixed veg sabzi",

  "alu paratha": "aloo paratha",
  "aloo parantha": "aloo paratha",
  "alu parantha": "aloo paratha",
  "aloo paratha recipe": "aloo paratha",
  "aloo ke parathe": "aloo paratha",
  "aloo paranthe": "aloo paratha",

  "gobi parantha": "gobhi paratha",
  "gobhi paratha recipe": "gobhi paratha",
  "gobi paratha": "gobhi paratha",
  "alu gobhi": "aloo gobi",
  "aloo gobhi": "aloo gobi",

  "gobi sabji": "gobi masala",
  "gobhi sabji": "gobi masala",
  "gobhi ki sabzi": "gobi masala",
  "gobhi masala recipe": "gobi masala",

  "bhindi sabji": "bhindi masala (okra stir-fry)",
  "bhindi ki sabzi": "bhindi masala (okra stir-fry)",
  "bhendi": "bhindi masala (okra stir-fry)",
  "bhendi masala": "bhindi masala (okra stir-fry)",
  "bhindi masala recipe": "bhindi masala (okra stir-fry)",

  "matar": "matar pulao",
  "mutter": "matar pulao",
  "mattar": "matar pulao",
  "matar rice": "matar pulao",
  "mutter rice": "matar pulao",
  "matar pulao recipe": "matar pulao",

  "aloo mattar": "aloo matar",
  "aloo matar sabji": "aloo matar",
  "aloo matar ki sabzi": "aloo matar",
  "alu matar": "aloo matar",
  "alu mutter": "aloo matar",

  "baigan bharta": "baingan bharta (smoky roasted eggplant mash)",
  "baigan ka bharta": "baingan bharta (smoky roasted eggplant mash)",
  "baingan bharta recipe": "baingan bharta (smoky roasted eggplant mash)",
  "baigan bharta recipe": "baingan bharta (smoky roasted eggplant mash)",
  "brinjal bharta": "baingan bharta (smoky roasted eggplant mash)",

  "aloo gobi": "gobi masala",
  "alu gobi": "gobi masala",

  "lauki ki sabji": "lauki sabzi",
  "lauki subzi": "lauki sabzi",
  "dudhi ki sabzi": "lauki sabzi",
  "ghiya sabzi": "lauki sabzi",
  "ghiya ki sabzi": "lauki sabzi",

  "tori sabji": "tori sabzi",
  "turai sabji": "tori sabzi",
  "turiya": "tori sabzi",
  "turiya ki sabzi": "tori sabzi",

  "mooli subzi": "mooli ki sabzi",
  "muli sabzi": "mooli ki sabzi",
  "muli ki sabzi": "mooli ki sabzi",
  "mooli ki subzi": "mooli ki sabzi",

  "karela sabji": "karela sabzi",
  "karele ki sabzi": "karela sabzi",
  "karela fry": "karela sabzi",
  "karela ki subzi": "karela sabzi",

  "dal makhani recipe": "dal makhani",
  "daal makhani": "dal makhani",
  "maa ki dal": "dal makhani",
  "ma ki dal": "dal makhani",
  "maa daal": "dal makhani",
  "kaali dal": "dal makhani",
  "kali dal": "dal makhani",

  "tur daal": "toor dal",
  "tuvar daal": "toor dal",
  "arhar dal recipe": "toor dal",
  "arhar ki dal": "toor dal",
  "arhar ki daal": "toor dal",

  "chana daal": "chana dal (chana dal tadka)",
  "chana daal fry": "chana dal (chana dal tadka)",
  "chana dal recipe": "chana dal (chana dal tadka)",
  "chana dal tadka": "chana dal (chana dal tadka)",

  "rajma chawl": "rajma chawal",
  "rajma chaawal": "rajma chawal",
  "rajma chawal recipe": "rajma chawal",
  "rajma masala recipe": "rajma (red kidney bean curry)",

  "chole masala recipe": "chana masala",
  "chana masala recipe": "chana masala",
  "chana curry": "chana masala",
  "kabuli chana curry": "chana masala",
  "chhole": "chana masala",
  "chhole masala": "chana masala",

  "pindi chana recipe": "pindi chole",
  "pindi chhole": "pindi chole",
  "chhole bhature": "chole bhature",
  "chole bhature recipe": "chole bhature",
  "chole bhatura recipe": "chole bhature",

  "kadhi chawal": "kadhi chawal",
  "karhi chawal": "kadhi chawal",
  "karhi rice": "kadhi chawal",
  "kadi chawal": "kadhi chawal",
  "kadhi rice recipe": "kadhi chawal",

  "sambhar recipe": "sambar",
  "sambar sadam": "sambar chawal",
  "sambhar sadam": "sambar chawal",
  "sambar rice recipe": "sambar chawal",

  "idly sambar": "idli sambar",
  "idli sambhar": "idli sambar",
  "idly sambhar": "idli sambar",

  "masala dosai": "masala dosa",
  "masala dose": "masala dosa",
  "dosa masala": "masala dosa",
  "dosa batter": "dosa (plain crispy dosa)",

  "pohe": "poha (kanda batata poha)",
  "poha recipe": "poha (kanda batata poha)",
  "kanda poha": "poha (kanda batata poha)",
  "kanda batata pohe": "poha (kanda batata poha)",
  "batata poha": "poha (kanda batata poha)",

  "khichari": "khichdi (moong dal khichdi)",
  "khichadi": "khichdi (moong dal khichdi)",
  "khichdi recipe": "khichdi (moong dal khichdi)",
  "dal khichari": "khichdi (moong dal khichdi)",
  "moong dal khichari": "khichdi (moong dal khichdi)",

  "kachauri": "kachori (moong dal kachori)",
  "dal kachori": "kachori (moong dal kachori)",
  "dal kachauri": "kachori (moong dal kachori)",

  "jalebi recipe": "jalebi",
  "jilebi": "jalebi",
  "jalebi sweet": "jalebi",
  "rasgulla recipe": "rasgulla",
  "rasagulla": "rasgulla",
  "rosogolla": "rasgulla",
  "rasgulla sweet": "rasgulla",

  "khir": "kheer",
  "kheer recipe": "kheer",
  "rice kheer": "kheer",
  "chawal ki kheer": "kheer",
  "chawal kheer": "kheer",

  "gajar halwa": "gajar halwa (carrot halwa)",
  "gajar ka halwa recipe": "gajar halwa (carrot halwa)",
  "gajrela": "gajar halwa (carrot halwa)",

  "besan ladoo recipe": "besan ladoo",
  "besan laddu recipe": "besan ladoo",
  "besan ke ladoo": "besan ladoo",
  "besan ke laddu": "besan ladoo",

  "gulab jamun recipe": "gulab jamun (home-style, with milk powder)",
  "gulabjaman": "gulab jamun (home-style, with milk powder)",
  "gulab jamun sweet": "gulab jamun (home-style, with milk powder)",

  // newly-added whole dals / Amti / juices
  "sabut mung dal": "sabut moong dal",
  "sabut mung": "sabut moong dal",
  "whole mung dal": "sabut moong dal",
  "whole green gram dal": "sabut moong dal",

  "sabut masoor ki daal": "sabut masoor dal",
  "whole masoor ki dal": "sabut masoor dal",

  "kulith": "kulthi dal",
  "kulath": "kulthi dal",
  "gahat ki dal": "kulthi dal",
  "gahat ki daal": "kulthi dal",
  "horse gram": "kulthi dal",

  "matki": "moth dal",
  "matki ki daal": "moth dal",
  "moth bean dal": "moth dal",
  "moth beans": "moth dal",
  "moth ki daal": "moth dal",

  "aamti dal": "amti dal",
  "aamti daal": "amti dal",
  "amti daal recipe": "amti dal",
  "maharashtrian dal": "amti dal",

  "chikoo juice recipe": "chiku juice",
  "chiku ka juice": "chiku juice",
  "chikoo ka juice": "chiku juice",
  "sapota juice recipe": "chiku juice",
  "sapota ka juice": "chiku juice",

  "mausambi juice": "mosambi juice",
  "mausambi ka juice": "mosambi juice",
  "mausambi juice recipe": "mosambi juice",
  "sweet lime ka juice": "mosambi juice",

  "lychee": "litchi juice",
  "lychee ka juice": "litchi juice",

  // common food-order / casual query wording
  "ghar ki dal": "dal tadka",
  "ghar wali dal": "dal tadka",
  "ghar ki sabzi": "mixed veg sabzi",
  "ghar wali sabzi": "mixed veg sabzi",
  "simple dal": "dal tadka",
  "simple sabzi": "mixed veg sabzi",
  "daily dal": "dal tadka",
  "everyday dal": "dal tadka",

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
        curRow[j - 1] + 1,
        prevRow[j] + 1,
        prevRow[j - 1] + cost
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
    if (
      Math.abs(key.length - query.length) >
      maxAllowedDistance(Math.max(key.length, query.length)) + 3
    ) {
      continue;
    }

    // Signal 1: direct edit distance on the whole string.
    const directDist = levenshtein(query, key);
    const directOk =
      directDist <= maxAllowedDistance(Math.max(query.length, key.length));
    const directScore = similarity(query, key);

    // Signal 2: same words, different order/spacing ("biryani chicken").
    const keySorted = sortedWords(key);
    const sortedDist = levenshtein(querySorted, keySorted);
    const sortedOk =
      sortedDist <=
      maxAllowedDistance(Math.max(querySorted.length, keySorted.length));
    const sortedScore = similarity(querySorted, keySorted);

    // Signal 3: token overlap - handles a missing/extra word ("chana masala
    // curry" vs "chana masala") and per-word typos.
    const keyWords = key.split(" ");
    let matchedWords = 0;

    for (const qw of queryWords) {
      const hasMatch = keyWords.some((kw) => {
        if (qw === kw) return true;
        if (qw.length < 3 || kw.length < 3) return false;

        return (
          levenshtein(qw, kw) <=
          maxAllowedDistance(Math.max(qw.length, kw.length))
        );
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