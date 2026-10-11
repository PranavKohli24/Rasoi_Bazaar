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

/*
 * Free geocoding via OpenStreetMap's Nominatim — no API key required.
 * Usage policy: max 1 request/sec, must set a descriptive User-Agent.
 * We cache nothing here; callers should cache per-address if calling often.
 */
async function tryGeocode(query: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "RasoiBazaar/1.0 (order-tracking; contact: dev@rasoibazaar.local)",
    },
  });

  if (!response.ok) return null;

  const results = (await response.json()) as any[];

  if (!Array.isArray(results) || results.length === 0) return null;

  const lat = Number(results[0]?.lat);
  const lng = Number(results[0]?.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  return { lat, lng };
}

async function geocodeAddress(addressLine: string): Promise<{ lat: number; lng: number } | null> {
  // Attempt 1: the full address line as-is.
  const fullAttempt = await tryGeocode(addressLine);
  if (fullAttempt) return fullAttempt;

  // Attempt 2: pull out the PIN code (6 digits) + city/state tail, which is
  // far more reliable than a messy, repeated-phrase full address string.
  const pinMatch = addressLine.match(/\b(\d{6})\b/);
  const pin = pinMatch?.[1];

  if (pin) {
    const beforePin = addressLine.slice(0, pinMatch.index).trim();
    const parts = beforePin.split(",").map((p) => p.trim()).filter(Boolean);
    const tail = parts.slice(-2).join(", ");

    const simplified = tail ? `${tail}, ${pin}, India` : `${pin}, India`;

    const pinAttempt = await tryGeocode(simplified);
    if (pinAttempt) return pinAttempt;

    // Attempt 3: PIN code alone, worst case but still usually resolvable.
    const pinOnlyAttempt = await tryGeocode(`${pin}, India`);
    if (pinOnlyAttempt) return pinOnlyAttempt;
  }

  return null;
}

export async function GET(request: Request): Promise<Response> {
  try {
    const sessionCookie = getCookie(request, "swiggy_session");

    if (!sessionCookie) {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let session: { accessToken: string };

    try {
      session = JSON.parse(Buffer.from(sessionCookie, "base64url").toString("utf8"));
    } catch {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);
    const orderId = url.searchParams.get("orderId");

    if (!orderId) {
      return new Response(JSON.stringify({ error: "Missing orderId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    /*
     * ---------------------------------------------------------------
     * 1. Get the order so we know its delivery address text
     * ---------------------------------------------------------------
     */

    const ordersResponse = await fetch("https://mcp.swiggy.com/im", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "tools/call",
        params: { name: "get_orders", arguments: {} },
      }),
    });

    if (ordersResponse.status === 401) {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ordersText = await ordersResponse.text();
    const ordersData = parseSwiggyResponse(ordersText);

    const orders = ordersData?.result?.structuredContent?.orders ?? [];

    const order = orders.find((o: any) => String(o?.orderId) === String(orderId));

    if (!order) {
      return new Response(
        JSON.stringify({ error: "Could not find this order in your recent Instamart orders." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const addressLine = order?.deliveryAddress?.addressLine;

    if (!addressLine) {
      return new Response(
        JSON.stringify({ error: "This order has no delivery address on file." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    /*
     * ---------------------------------------------------------------
     * 2. Geocode the address text into lat/lng
     * ---------------------------------------------------------------
     */

    const coords = await geocodeAddress(addressLine);

    if (!coords) {
      return new Response(
        JSON.stringify({
          error: "Could not resolve delivery address to a location for tracking.",
          addressLine,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    /*
     * ---------------------------------------------------------------
     * 3. Track the order with the resolved coordinates
     * ---------------------------------------------------------------
     */

    const trackResponse = await fetch("https://mcp.swiggy.com/im", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "tools/call",
        params: {
          name: "track_order",
          arguments: { orderId, lat: coords.lat, lng: coords.lng },
        },
      }),
    });

    if (trackResponse.status === 401) {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const trackText = await trackResponse.text();
    const trackData = parseSwiggyResponse(trackText);

    const trackContent = trackData?.result?.structuredContent;

    if (trackData?.result?.isError || trackContent?.success === false) {
      return new Response(
        JSON.stringify({ error: trackContent?.error?.message ?? "Could not track this order." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        resolvedCoords: coords,
        tracking: trackContent ?? trackData,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Track Instamart order error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to track Instamart order",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}