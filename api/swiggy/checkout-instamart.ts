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

async function callSwiggyTool(accessToken: string, name: string, args: Record<string, unknown>) {
  const response = await fetch("https://mcp.swiggy.com/im", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });

  const text = await response.text();
  return { status: response.status, data: parseSwiggyResponse(text) };
}

/*
 * The docs flag that `checkout` is NOT idempotent: a 5xx doesn't tell you
 * whether the order actually went through on Swiggy's side before the
 * connection dropped. So instead of surfacing a raw error (which a client
 * might retry and risk placing two orders), we check get_orders for
 * anything placed in roughly the last couple of minutes before deciding
 * whether this was a real failure or just a response that got lost.
 */
async function wasOrderRecentlyPlaced(accessToken: string): Promise<any | null> {
  const { data } = await callSwiggyTool(accessToken, "get_orders", {});
  const orders = data?.result?.structuredContent?.orders ?? [];

  if (!Array.isArray(orders) || orders.length === 0) return null;

  // Defensive: sort newest-first ourselves rather than trusting order.
  const parsedTime = (o: any): number => {
    const t = Date.parse(o?.placedAt ?? "");
    return Number.isFinite(t) ? t : 0;
  };
  const newest = [...orders].sort((a, b) => parsedTime(b) - parsedTime(a))[0];

  const TWO_MINUTES_MS = 2 * 60 * 1000;
  const isRecent = Date.now() - parsedTime(newest) < TWO_MINUTES_MS;

  return isRecent ? newest : null;
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

    let session: { accessToken: string };

    try {
      session = JSON.parse(Buffer.from(sessionCookie, "base64url").toString("utf8"));
    } catch {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    // v1: Cash on Delivery only. UPI is a planned fast-follow (QR/intent +
    // payment-confirmation polling), deliberately left out of this route.
    const paymentMethod = body?.paymentMethod ?? "COD";

    if (paymentMethod !== "COD") {
      return new Response(
        JSON.stringify({ error: "Only Cash on Delivery is supported right now." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { status, data } = await callSwiggyTool(session.accessToken, "checkout", {
      paymentMethod,
    });

    if (status === 401) {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isServerError = status >= 500 || !data;

    if (isServerError) {
      // Don't trust the failure at face value — see if the order actually
      // landed anyway before telling the client it's safe to retry.
      const recentOrder = await wasOrderRecentlyPlaced(session.accessToken);

      if (recentOrder) {
        return new Response(
          JSON.stringify({
            success: true,
            orderId: String(recentOrder.orderId ?? recentOrder.id),
            verifiedViaOrderHistory: true,
            order: recentOrder,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          error: "Checkout failed and no order was found. Safe to try again.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const checkoutContent = data?.result?.structuredContent;

    const errorCodes: string[] = Array.isArray(checkoutContent?.errorCodes)
      ? checkoutContent.errorCodes
      : [];
    const errorMessage: string =
      checkoutContent?.titleMessage ?? checkoutContent?.statusMessage ?? checkoutContent?.message ?? "";

    const toolError =
      data?.result?.isError ||
      checkoutContent?.success === false ||
      errorCodes.length > 0;

    if (toolError) {
      if (errorCodes.includes("MIN_ORDER_NOT_MET") || /minimum\s*order/i.test(errorMessage)) {
        return new Response(
          JSON.stringify({ error: "Your cart is under the ₹99 Instamart minimum." }),
          { status: 422, headers: { "Content-Type": "application/json" } }
        );
      }
      if (errorCodes.includes("ADDRESS_NOT_SERVICEABLE") || /not\s*serviceable/i.test(errorMessage)) {
        return new Response(
          JSON.stringify({ error: "Instamart doesn't deliver to this address." }),
          { status: 422, headers: { "Content-Type": "application/json" } }
        );
      }
      if (/cart\s*expired|abandoned/i.test(errorMessage)) {
        return new Response(
          JSON.stringify({ error: "Your cart expired. Please rebuild it and try again." }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: errorMessage || "Swiggy could not place this order." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const orderId = checkoutContent?.orderId ?? checkoutContent?.data?.orderId ?? null;

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: "Order placed, but no order ID was returned." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: String(orderId),
        verifiedViaOrderHistory: false,
        order: checkoutContent,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Instamart checkout error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to place Instamart order",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}