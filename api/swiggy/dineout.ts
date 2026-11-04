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
    const restaurants = content?.restaurants ?? content?.data?.restaurants ?? [];

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

    return json({
      success: true,
      result: {
        structuredContent: {
          data: {
            restaurant: payload?.restaurant ?? null,
            menuImages: payload?.menuImages ?? [],
            amenities: payload?.amenities ?? [],
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