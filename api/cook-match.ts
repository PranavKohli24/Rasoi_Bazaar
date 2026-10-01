/**
 * POST /api/cook-match   body: { equipment: string[], ingredients: string[], count?: number, excludeDishNames?: string[] }
 *
 * Runs on Vercel, so the Cloudflare token stays on the server. Set
 * CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN (no VITE_ prefix) in
 * Vercel > Settings > Environment Variables. CF_MODEL is optional.
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

const BASE_URL = "https://api.cloudflare.com/client/v4";
const MODEL = process.env.CF_MODEL || "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const FALLBACK_MODEL = "@cf/meta/llama-3.1-8b-instruct"; // used on the retry

const MAX_ATTEMPTS = 2; // one retry if the model returns broken JSON

const RATE_LIMIT = 6; // requests ...
const RATE_WINDOW_MS = 60_000; // ... per minute, per visitor

// Limits on what one request may contain (stops giant prompts being sent through us).
const MAX_EQUIPMENT = 12;
const MAX_INGREDIENTS = 40;
const MAX_ITEM_LENGTH = 40;
const MAX_RESULTS = 3;
const MAX_EXCLUDED_DISHES = 10;

const GENERIC_ERROR = "The kitchen assistant couldn't find recipes right now. Please try again.";
const BUSY_ERROR = "Our kitchen is a little busy right now. Please try again in a moment.";

/* ---------- small helpers ---------- */

const header = (req: Req, name: string): string => {
  const value = req.headers[name];
  return (Array.isArray(value) ? value[0] : value) ?? "";
};

const fail = (res: Res, status: number, code: string, message: string) =>
  res.status(status).json({ error: { code, message } });

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

const STAPLES = [
  "salt", "oil", "ghee", "sugar", "turmeric", "haldi", "cumin", "jeera",
  "chilli powder", "coriander powder", "garam masala", "black pepper", "mustard seeds",
];


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

/** Single line, no control characters or quote/brace characters that could break the prompt. */
const cleanItem = (value: unknown): string =>
  typeof value === "string"
    ? value
        .replace(/[\u0000-\u001f\u007f]+/g, " ")
        .replace(/["`{}\\]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, MAX_ITEM_LENGTH)
    : "";

const cleanList = (value: unknown, maxItems: number): string[] => {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of value) {
    const item = cleanItem(raw);
    const key = item.toLowerCase();
    if (!item || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length >= maxItems) break;
  }
  return out;
};

const cleanDishNames = (value: unknown): string[] =>
  cleanList(value, MAX_EXCLUDED_DISHES);

/* ---------- checking what the model returns ---------- */

const str = (value: unknown): string => (typeof value === "string" ? value.trim() : "");
const strings = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(str).filter(Boolean) : [];

/** Keeps only complete results, at most 3. */
const cleanMatches = (value: unknown) =>
  (Array.isArray(value) ? value : []).flatMap((r: any) => {
    const dishName = str(r?.dishName);
    if (!dishName) return [];
    return [
      {
        dishName,
        description: str(r?.description),
        prepTime: str(r?.prepTime),
        ingredientsUsed: strings(r?.ingredientsUsed),
        equipmentUsed: strings(r?.equipmentUsed),
        whyItWorks: str(r?.whyItWorks),
      },
    ];
  }).slice(0, 3);

const isAllowed = (name: string, allowed: string[]): boolean => {
  const n = name.toLowerCase().trim();
  if (n.length > 30 || n.split(/\s+/).length > 3) return false; // sentences are not ingredient names
  return allowed.some((a) => n === a || n.includes(a) || a.includes(n));
};

const COMMENTARY = /\b(missing|substitut\w*|however|actually|instead|alternative|optional)\b/i;

const validateMatches = (
  matches: ReturnType<typeof cleanMatches>,
  ingredients: string[],
  equipment: string[],
  assumeStaples: boolean
) => {
  const allowedIngredients = [...ingredients, ...(assumeStaples ? STAPLES : []), "water"].map((s) => s.toLowerCase());
  const allowedEquipment = equipment.map((s) => s.toLowerCase());

  return matches.filter(
  (m) =>
    m.ingredientsUsed.length > 0 &&
    !COMMENTARY.test(m.ingredientsUsed.join(" ")) &&
      m.ingredientsUsed.every((i) => isAllowed(i, allowedIngredients)) &&
      m.equipmentUsed.every((e) => isAllowed(e, allowedEquipment))
  );
};
/* ---------- prompt (kept on the server) ---------- */

const buildPrompt = (equipment: string[], ingredients: string[], count: number, excludeDishNames: string[], assumeStaples: boolean): string => `
You are the recipe-matching engine for an Indian cooking app.

The user has given us their COMPLETE list of available ingredients and kitchen equipment.

AVAILABLE EQUIPMENT:
${equipment.map((item) => `- ${item}`).join("\n")}

AVAILABLE INGREDIENTS:
${ingredients.map((item) => `- ${item}`).join("\n")}
${assumeStaples ? `\nBASIC STAPLES (always available):\n${STAPLES.map((s) => `- ${s}`).join("\n")}\n` : ""}

Your task:
Find up to ${count} real dishes that the user can ACTUALLY cook right now.

STRICT RULES:

1. Only recommend dishes that can be made with the ingredients provided.
2. Do NOT assume the user has ingredients that are not listed.
3. ${assumeStaples
  ? "The BASIC STAPLES above are always available. Do NOT assume any other ingredient that is not listed."
  : "Do NOT assume salt, oil, butter, spices, dairy, vegetables, herbs or garnishes unless they appear in the ingredient list."}
4. Water is always available and does not need to be listed.
5. The required cooking equipment must be available.
6. Do not recommend a dish if an essential ingredient is missing.
7. Prefer dishes that use the MOST of the listed ingredients. Rank dishes that use many of them above dishes that use few.
8. Prefer practical home-style Indian dishes, but dishes from other cuisines are allowed when they genuinely fit.
9. Do not invent fictional dishes.
10. Return no more than ${count} results.
11. Return fewer than ${count} only if fewer valid dishes genuinely exist.
12. Do not return dishes with missing essential ingredients.
13. Keep every description and explanation to one short sentence.
14. Do not provide cooking instructions.
15. Avoid very basic dishes (plain roti, paratha, boiled rice, plain dal) when the user listed many ingredients. Return varied dish types, not variations of one dish.
16. ingredientsUsed and equipmentUsed must contain ONLY short names copied from the lists above (for example "Dal", "Onion"). Never put sentences, notes or substitutions in them.
17. If a dish needs an ingredient that is not listed, do not return that dish at all. Do not suggest substitutes.

Do not recommend any of these dishes because they were already found locally:
${excludeDishNames.length ? excludeDishNames.map((name) => `- ${name}`).join("\n") : "- None"}

For every result return:
- dishName
- description
- prepTime
- ingredientsUsed
- equipmentUsed
- whyItWorks

The recipes do NOT need to be limited to dishes already known by the app. Discover suitable real dishes from the available ingredients.

Return ONLY the requested JSON structure: {"recipes": [ ... ]}
`;

const extractJson = (text: string): any => {
  const cleaned = text.replace(/```(?:json)?/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("No JSON object found");
  return JSON.parse(cleaned.slice(start, end + 1));
};

/* ---------- the endpoint ---------- */

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return fail(res, 405, "METHOD_NOT_ALLOWED", GENERIC_ERROR);
  }

  if (!originAllowed(req)) return fail(res, 403, "FORBIDDEN", GENERIC_ERROR);

  const apiKey = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!apiKey || !accountId) {
    console.error("CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID is not set. Add them in .env.local / Vercel, then restart or redeploy.");
    return fail(res, 500, "NOT_CONFIGURED", GENERIC_ERROR);
  }

  if (isRateLimited(clientIp(req))) {
    return fail(
      res,
      429,
      "RATE_LIMITED",
      "You're searching very quickly! Please wait a minute and try again."
    );
  }

  const body = readBody(req);
  const equipment = cleanList(body?.equipment, MAX_EQUIPMENT);
  const ingredients = cleanList(body?.ingredients, MAX_INGREDIENTS);
  const excludeDishNames = cleanDishNames(body?.excludeDishNames);
  const assumeStaples = body?.assumeStaples !== false;

  const requestedCount = Number(body?.count);
  const count =
    Number.isFinite(requestedCount) && requestedCount > 0
      ? Math.min(Math.floor(requestedCount), MAX_RESULTS)
      : MAX_RESULTS;

  if (!equipment.length) {
    return fail(res, 400, "INVALID_INPUT", "Please select at least one piece of equipment.");
  }
  if (!ingredients.length) {
    return fail(res, 400, "INVALID_INPUT", "Please add at least one ingredient.");
  }


  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  const model = attempt === 1 ? MODEL : FALLBACK_MODEL;
  let content = "";
  let finishReason = "";

  try {
    const response = await fetch(`${BASE_URL}/accounts/${accountId}/ai/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
            {
              role: "system",
              content:
                "Match recipes strictly to the provided ingredients and equipment. Return ONLY valid JSON matching the requested structure. Do not write any text outside the JSON.",
            },
            {
              role: "user",
              content: buildPrompt(equipment, ingredients, count, excludeDishNames, assumeStaples),
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        console.error("Cloudflare error:", response.status, (await response.text()).slice(0, 500));
        return response.status === 429 || response.status === 503
          ? fail(res, 503, "BUSY", BUSY_ERROR)
          : fail(res, 502, "SERVER", GENERIC_ERROR);
      }

      const data: any = await response.json();
      const choice = data?.choices?.[0];
      content = str(choice?.message?.content);
      finishReason = String(choice?.finish_reason ?? "");
    } catch (error) {
      console.error("Cloudflare request failed:", error);
      return fail(res, 502, "SERVER", GENERIC_ERROR);
    }

    let parsed: any;
    try {
      parsed = extractJson(content);
    } catch {
      console.error(
        `Cloudflare returned invalid JSON (attempt ${attempt}). model=${model} finish=${finishReason} raw=`,
        content.slice(0, 300)
      );
      continue; // try once more
    }

    if (!parsed || !Array.isArray(parsed.recipes)) {
      console.error(`Cloudflare returned an unexpected shape (attempt ${attempt}).`);
      continue;
    }

    return res.status(200).json({
      recipes: validateMatches(cleanMatches(parsed.recipes), ingredients, equipment, assumeStaples).slice(0, count),
    });
  }

  return fail(res, 502, "SERVER", GENERIC_ERROR);
}