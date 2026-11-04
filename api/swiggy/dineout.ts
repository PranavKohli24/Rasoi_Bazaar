// api/swiggy/dineout.ts
// Read-only discovery: search restaurants + restaurant details via Swiggy
// Dineout. No addressId (lat/lng only), no booking/slots/payment — that's
// a later phase.

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("cookie") ?? "";

  for (const cookie of cookieHeader.split(";")) {
    const [key, ...parts] = cookie.trim().split("=");
    if (key === name) {
      return decodeURIComponent(parts.join("="));
    }
  }

  return null;
}

function parseSwiggyResponse(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    // Try SSE
  }

  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (!data) continue;
    try {
      return JSON.parse(data);
    } catch {
      continue;
    }
  }

  return null;
}

function getSession(request: Request): { accessToken: string } | null {
  const sessionCookie = getCookie(request, "swiggy_session");
  if (!sessionCookie) return null;

  try {
    return JSON.parse(Buffer.from(sessionCookie, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

const notConnected = () =>
  new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function callDineoutMcp(
  accessToken: string | null,
  name: string,
  mcpArguments: Record<string, unknown>
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return fetch("https://mcp.swiggy.com/dineout", {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name, arguments: mcpArguments },
    }),
  });
}

/* ------------------------------------------------------------------ */
/* POST — dispatches on body.action: "search" | "details"              */
/* ------------------------------------------------------------------ */

export async function POST(request: Request): Promise<Response> {
  // Discovery (search/details) is browsable without a Swiggy login — only
  // booking-stage tools need a connected account. Pass the token along if
  // we have one (it may give better/personalized results), but don't
  // block the request if we don't.
  const session = getSession(request);
  const accessToken = session?.accessToken ?? null;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const action = body?.action;

  if (action === "search") {
    return handleSearch(accessToken, body);
  }

  if (action === "details") {
    return handleDetails(accessToken, body);
  }

  return json({ error: "Missing or unknown action. Use 'search' or 'details'." }, 400);
}

/**
 * Parses get_restaurant_details' plain-text summary (same situation as
 * search — no structuredContent in practice). Format is "Label: value"
 * lines, e.g.:
 *   Restaurant: Lazeez Affaire, Scindia House
 *   Cuisines: North Indian, Mughlai
 *   Address: 3.6 km •  Ground Floor, ...
 *   Rating: 4.5 (293 Google ratings)
 *   Cost for two: ₹3000 for two
 *   Timings: Closed, Opens at 11AM
 *   Offers: Flat 30% off on Total Bill; Flat 20% off on Total Bill
 *   Bank offers: Flat 10% off* (use DINE150); Cashback ₹125 (use PAYTMNEW)
 *   Amenities: ... (if present)
 */
function parseRestaurantDetailsFromSummaryText(text: string, restaurantId: string): any {
  const lines = text.split(/\r?\n/);
  const fields: Record<string, string> = {};

  for (const line of lines) {
    const match = line.match(/^([A-Za-z ]+):\s*(.*)$/);
    if (!match) continue;
    const [, label, value] = match;
    fields[label.trim().toLowerCase()] = value.trim();
  }

  const splitList = (value: string | undefined) =>
    value
      ? value.split(";").map((v) => v.trim()).filter(Boolean)
      : [];

  const ratingMatch = fields["rating"]?.match(/([\d.]+)\s*(?:\((.+)\))?/);

  // Address often arrives as "7.5 km • 15A/56, West Extension..." — split
  // the leading distance off so it can be shown as its own badge.
  const rawAddress = fields["address"] ?? "";
  const addressMatch = rawAddress.match(/^([\d.]+\s*km)\s*•\s*(.+)$/i);

  return {
    id: restaurantId,
    name: fields["restaurant"] ?? "Restaurant",
    cuisines: fields["cuisines"] ? fields["cuisines"].split(",").map((c) => c.trim()) : [],
    address: addressMatch ? addressMatch[2].trim() : rawAddress,
    distance: addressMatch ? addressMatch[1] : undefined,
    avgRating: ratingMatch ? Number(ratingMatch[1]) : undefined,
    totalRatings: ratingMatch?.[2],
    costForTwo: fields["cost for two"] ?? "",
    timings: fields["timings"] ?? "",
    offers: splitList(fields["offers"]),
    bankOffers: splitList(fields["bank offers"]),
    amenities: splitList(fields["amenities"]),
  };
}


/**
 * Fallback for when Swiggy's Dineout search returns only a plain-text
 * summary (result.content[0].text) with no structuredContent — which is
 * what we're actually seeing in practice. Parses lines like:
 *   "1. Farzi Cafe — North Indian | 4.0★ | ₹2000 for two | Connaught Place (ID: 302252)"
 *   "7. Somewhere Restaurant & Bar — ₹2300 for two | 4.0★ | 4.1 km, Connaught Place | Connaught Place • ₹2300 for two • North Indian (ID: 600860)"
 * Best-effort: Swiggy doesn't document this text format, so this is
 * heuristic. Fields it can't confidently find are just left blank.
 */
function parseRestaurantsFromSummaryText(text: string): any[] {
  const lines = text.split(/\r?\n/);
  const restaurants: any[] = [];

  const lineRegex = /^\d+\.\s*(.+?)\s*—\s*(.*?)\s*\(ID:\s*([\w-]+)\)\s*$/;

  for (const line of lines) {
    const match = line.match(lineRegex);
    if (!match) continue;

    const [, name, meta, id] = match;

    const ratingMatch = meta.match(/(\d+(?:\.\d+)?)\s*★/);
    const costMatch = meta.match(/₹[\d,]+\s*for two/i);
    const distanceMatch = meta.match(/[\d.]+\s*km/);

    const pipeParts = meta.split("|").map((p) => p.trim()).filter(Boolean);

    let area = "";
    let cuisine = "";

    const comboPart = pipeParts.find((p) => p.includes("•"));
    if (comboPart) {
      const comboSplit = comboPart.split("•").map((p) => p.trim()).filter(Boolean);
      area = comboSplit[0] ?? "";
      cuisine = comboSplit[comboSplit.length - 1] ?? "";
    } else {
      area = pipeParts[pipeParts.length - 1] ?? "";
      cuisine = pipeParts.find((p) => !/₹|★|km/i.test(p)) ?? "";
    }

    restaurants.push({
      id,
      name: name.trim(),
      cuisine: cuisine ? [cuisine] : [],
      locality: area,
      area,
      rating: ratingMatch ? { value: ratingMatch[1] } : undefined,
      costForTwo: costMatch ? costMatch[0] : "",
      distance: distanceMatch ? distanceMatch[0] : undefined,
    });
  }

  return restaurants;
}

/* ---- search ---- */

async function handleSearch(accessToken: string | null, body: any): Promise<Response> {
  try {
    const query = body?.query;
    const latitude = body?.latitude;
    const longitude = body?.longitude;
    const limit = typeof body?.limit === "number" ? body.limit : 10;

    if (!query || typeof query !== "string" || !query.trim()) {
      return json({ error: "Missing query" }, 400);
    }
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return json({ error: "Missing latitude/longitude" }, 400);
    }

    const response = await callDineoutMcp(accessToken, "search_restaurants_dineout", {
      query: query.trim(),
      latitude,
      longitude,
      limit,
    });

    const text = await response.text();
    console.log("Dineout search raw response:", response.status, text.slice(0, 1000));

    if (response.status === 401) {
      return json({ error: "Swiggy Dineout requires a connected account for this request." }, 401);
    }

    const data = parseSwiggyResponse(text);

    if (!data) {
      console.error("Dineout search: could not parse response:", text.slice(0, 500));
      return json({ error: "Could not parse Swiggy Dineout search response" }, 502);
    }

    if (data?.result?.isError) {
      const mcpErrorText = data?.result?.content?.[0]?.text ?? "Swiggy Dineout search failed.";
      console.error("Dineout search: MCP tool error:", mcpErrorText);
      return json({ error: mcpErrorText }, 502);
    }
    const content = data?.result?.structuredContent ?? {};
    let restaurants = content?.restaurants ?? content?.data?.restaurants ?? [];

    // Swiggy sometimes returns only a plain-text summary with no
    // structuredContent — parse that text instead of showing nothing.
    if (restaurants.length === 0) {
      const summaryText = data?.result?.content?.[0]?.text;
      if (typeof summaryText === "string") {
        restaurants = parseRestaurantsFromSummaryText(summaryText);
      }
    }

    return json({ success: true, result: { structuredContent: { restaurants } } });
  } catch (error) {
    console.error("Dineout search error:", error);
    return json(
      { error: error instanceof Error ? error.message : "Failed to search Dineout restaurants" },
      500
    );
  }
}

/* ---- details ---- */

async function handleDetails(accessToken: string | null, body: any): Promise<Response> {
  try {
    const restaurantId = body?.restaurantId;
    const latitude = body?.latitude;
    const longitude = body?.longitude;

    if (!restaurantId || typeof restaurantId !== "string") {
      return json({ error: "Missing restaurantId" }, 400);
    }
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return json({ error: "Missing latitude/longitude" }, 400);
    }

    const response = await callDineoutMcp(accessToken, "get_restaurant_details", {
      restaurantId,
      latitude,
      longitude,
    });

    const text = await response.text();
    console.log("Dineout details raw response:", response.status, text.slice(0, 1000));

    if (response.status === 401) {
      return json({ error: "Swiggy Dineout requires a connected account for this request." }, 401);
    }

    const data = parseSwiggyResponse(text);

    if (!data) {
      console.error("Dineout details: could not parse response:", text.slice(0, 500));
      return json({ error: "Could not parse Swiggy Dineout details response" }, 502);
    }

    if (data?.result?.isError) {
      const mcpErrorText = data?.result?.content?.[0]?.text ?? "Swiggy Dineout details failed.";
      console.error("Dineout details: MCP tool error:", mcpErrorText);
      return json({ error: mcpErrorText }, 502);
    }

    // get_restaurant_details nests its payload one level deeper than
    // search does: structuredContent.data.{restaurant,menuImages,amenities}
    const content = data?.result?.structuredContent ?? {};
    const payload = content?.data ?? content;

    let restaurant = payload?.restaurant ?? null;
    let amenities = payload?.amenities ?? [];

    // Same situation as search — Swiggy often returns only a plain-text
    // summary with no structuredContent. Parse that instead of showing nothing.
    if (!restaurant) {
      const summaryText = data?.result?.content?.[0]?.text;
      if (typeof summaryText === "string") {
        const parsed = parseRestaurantDetailsFromSummaryText(summaryText, restaurantId);
        restaurant = parsed;
        amenities = parsed.amenities;
      }
    }

    return json({
      success: true,
      result: {
        structuredContent: {
          data: {
            restaurant,
            menuImages: payload?.menuImages ?? [],
            amenities,
          },
        },
      },
    });
  } catch (error) {
    console.error("Dineout details error:", error);
    return json(
      { error: error instanceof Error ? error.message : "Failed to load Dineout restaurant details" },
      500
    );
  }
}