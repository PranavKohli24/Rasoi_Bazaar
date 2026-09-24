/**
 * POST /api/cook-match   body: { equipment: string[], ingredients: string[] }
 *
 * Runs on Vercel, so the OpenRouter key stays on the server. Set
 * OPENROUTER_API_KEY (no VITE_ prefix) in Vercel > Settings > Environment
 * Variables. OPENROUTER_MODEL is optional (defaults to "openrouter/free").
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

const MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";
const BASE_URL = "https://openrouter.ai/api/v1";
const MAX_ATTEMPTS = 2; // one retry if the model returns broken JSON

const RATE_LIMIT = 6; // requests ...
const RATE_WINDOW_MS = 60_000; // ... per minute, per visitor

// Limits on what one request may contain (stops giant prompts being sent through us).
const MAX_EQUIPMENT = 12;
const MAX_INGREDIENTS = 40;
const MAX_ITEM_LENGTH = 40;

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

/* ---------- prompt (kept on the server) ---------- */

const buildPrompt = (equipment: string[], ingredients: string[]): string => `
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

Return ONLY the requested JSON structure: {"recipes": [ ... ]}
`;

/* ---------- the endpoint ---------- */

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return fail(res, 405, "METHOD_NOT_ALLOWED", GENERIC_ERROR);
  }

  if (!originAllowed(req)) return fail(res, 403, "FORBIDDEN", GENERIC_ERROR);

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY is not set on the server. Add it in Vercel > Settings > Environment Variables, then redeploy.");
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

  if (!equipment.length) {
    return fail(res, 400, "INVALID_INPUT", "Please select at least one piece of equipment.");
  }
  if (!ingredients.length) {
    return fail(res, 400, "INVALID_INPUT", "Please add at least one ingredient.");
  }

  const origin = header(req, "origin") || `https://${header(req, "host")}`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let content = "";

    try {
      const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": origin,
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
            { role: "user", content: buildPrompt(equipment, ingredients) },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        console.error("OpenRouter error:", response.status, (await response.text()).slice(0, 500));
        return response.status === 429 || response.status === 503
          ? fail(res, 503, "BUSY", BUSY_ERROR)
          : fail(res, 502, "SERVER", GENERIC_ERROR);
      }

      const data: any = await response.json();
      content = str(data?.choices?.[0]?.message?.content);
    } catch (error) {
      console.error("OpenRouter request failed:", error);
      return fail(res, 502, "SERVER", GENERIC_ERROR);
    }

    let parsed: any;
    try {
      parsed = JSON.parse(content.replace(/^```json\s*/i, "").replace(/```$/i, "").trim());
    } catch {
      console.error(`OpenRouter returned invalid JSON (attempt ${attempt}).`);
      continue; // try once more
    }

    if (!parsed || !Array.isArray(parsed.recipes)) {
      console.error(`OpenRouter returned an unexpected shape (attempt ${attempt}).`);
      continue;
    }

    return res.status(200).json({ recipes: cleanMatches(parsed.recipes) });
  }

  return fail(res, 502, "SERVER", GENERIC_ERROR);
}