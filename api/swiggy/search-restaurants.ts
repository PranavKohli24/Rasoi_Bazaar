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

export async function POST(request: Request): Promise<Response> {
  try {
    const sessionCookie = getCookie(request, "swiggy_session");

    if (!sessionCookie) {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const session = JSON.parse(
      Buffer.from(sessionCookie, "base64url").toString("utf8")
    );

    const body = await request.json();
    const addressId = body?.addressId;
    const query = body?.query;

    if (!addressId) {
      return new Response(JSON.stringify({ error: "Missing addressId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!query || typeof query !== "string" || !query.trim()) {
      return new Response(JSON.stringify({ error: "Missing search query" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const swiggyResponse = await fetch("https://mcp.swiggy.com/food", {
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
          name: "search_restaurants",
          arguments: { addressId, query: query.trim() },
        },
      }),
    });

    const text = await swiggyResponse.text();
    const data = parseSwiggyResponse(text);

    if (!data) {
      return new Response(
        JSON.stringify({ error: "Could not parse Swiggy restaurant search response" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("RESTAURANT SEARCH RAW:", JSON.stringify(data, null, 2));

    const restaurants =
      data?.result?.structuredContent?.restaurants ??
      data?.result?.structuredContent?.data?.restaurants ??
      [];

    const openRestaurants = restaurants.filter(
      (r: any) => (r?.availabilityStatus ?? "OPEN") === "OPEN"
    );

    return new Response(
      JSON.stringify({ result: { structuredContent: { restaurants: openRestaurants } } }),
      { status: swiggyResponse.status, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Search restaurants error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to search restaurants",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}