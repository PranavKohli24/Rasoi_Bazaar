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

/**
 * Unlike track-instamart-order, the Food MCP's track_food_order tool takes
 * just an orderId — no lat/lng geocoding step (see the "Order food
 * end-to-end" MCP recipe, step 7).
 */
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

    const trackResponse = await fetch("https://mcp.swiggy.com/food", {
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
          name: "track_food_order",
          arguments: { orderId },
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
        tracking: trackContent ?? trackData,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Track food order error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to track food order",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}