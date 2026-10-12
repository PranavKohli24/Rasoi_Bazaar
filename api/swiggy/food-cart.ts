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

// Swiggy v1: hard ₹1000 cap on Builders Club food orders (see the "Order
// food end-to-end" MCP recipe, step 6). Unlike Instamart's minimum, this
// is a ceiling, so the cart review needs to flag going *over* it.
const MAX_FOOD_ORDER_RUPEES = 1000;

function getCartContent(data: any) {
  return data?.result?.structuredContent ?? {};
}

function getCartItems(data: any): any[] {
  const content = getCartContent(data);
  const items = content?.data?.items ?? content?.items ?? [];
  return Array.isArray(items) ? items : [];
}

function getCartTotal(data: any): number {
  const content = getCartContent(data);
  const total = content?.data?.total ?? content?.total ?? 0;
  const parsed = Number(total);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function callFoodMcp(
  accessToken: string,
  name: string,
  mcpArguments: Record<string, unknown>
): Promise<Response> {
  return fetch("https://mcp.swiggy.com/food", {
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
      params: { name, arguments: mcpArguments },
    }),
  });
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

/**
 * GET ?addressId=... — the cart review step, right before checkout: what's
 * in it, the bill, and whether the ₹1000 cap has been exceeded.
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const session = getSession(request);
    if (!session) return notConnected();

    const url = new URL(request.url);
    const addressId = url.searchParams.get("addressId");

    if (!addressId) {
      return new Response(JSON.stringify({ error: "Missing addressId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cartResponse = await callFoodMcp(session.accessToken, "get_food_cart", { addressId });

    if (cartResponse.status === 401) return notConnected();

    const cartText = await cartResponse.text();
    const cartData = parseSwiggyResponse(cartText);

    if (!cartData) {
      return new Response(
        JSON.stringify({ error: "Could not parse Swiggy food cart response" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const rawItems = getCartItems(cartData);
    const total = getCartTotal(cartData);

    const items = rawItems.map((item: any) => ({
      name: String(item?.name ?? item?.itemName ?? "Item"),
      quantity: Number(item?.quantity ?? 1),
      price:
        item?.price !== undefined
          ? `₹${item.price}`
          : item?.finalPrice !== undefined
          ? `₹${item.finalPrice}`
          : undefined,
    }));

    const bill =
      total > 0
        ? {
            lineItems: [] as { label: string; value: string }[],
            toPay: { label: "To pay", value: `₹${total}` },
          }
        : null;

    return new Response(
      JSON.stringify({
        success: true,
        items,
        bill,
        exceedsMaxOrder: total > MAX_FOOD_ORDER_RUPEES,
        maxOrderPaise: MAX_FOOD_ORDER_RUPEES * 100,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Get food cart error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to load Swiggy food cart",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * POST { action: "checkout", addressId, paymentMethod } — places the food
 * order via place_food_order. The ₹1000 cap is checked again here (not
 * just client-side) before calling Swiggy, since that's a cheaper failure
 * than a rejected order.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const session = getSession(request);
    if (!session) return notConnected();

    const body = await request.json();
    const action = body?.action;
    const addressId = body?.addressId;

    if (action !== "checkout") {
      return new Response(JSON.stringify({ error: "Unsupported action" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!addressId) {
      return new Response(JSON.stringify({ error: "Missing addressId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cartResponse = await callFoodMcp(session.accessToken, "get_food_cart", { addressId });
    if (cartResponse.status === 401) return notConnected();

    const cartText = await cartResponse.text();
    const cartData = parseSwiggyResponse(cartText);
    console.log("FOOD CART RAW:", JSON.stringify(cartData, null, 2));
    const total = getCartTotal(cartData);

    if (total > MAX_FOOD_ORDER_RUPEES) {
      return new Response(
        JSON.stringify({
          error: `Your cart is over the ₹${MAX_FOOD_ORDER_RUPEES} order limit — please remove an item.`,
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Critical: place_food_order is not idempotent. If this fails with a
    // 5xx, the caller should check get_food_orders before retrying rather
    // than calling this again blindly (see the MCP recipe's "What can go
    // wrong" section). We don't auto-retry here for that reason.
    const orderResponse = await callFoodMcp(session.accessToken, "place_food_order", {
      paymentMethod: "COD",
    });

    if (orderResponse.status === 401) return notConnected();

    const orderText = await orderResponse.text();
    const orderData = parseSwiggyResponse(orderText);

    if (!orderData) {
      return new Response(
        JSON.stringify({ error: "Could not parse Swiggy order response" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const orderContent = orderData?.result?.structuredContent;

    const toolError =
      orderData?.result?.isError ||
      orderContent?.success === false ||
      orderContent?.successful === false ||
      (Array.isArray(orderContent?.errorCodes) && orderContent.errorCodes.length > 0);

    if (toolError) {
      return new Response(
        JSON.stringify({
          error:
            orderContent?.titleMessage ??
            orderContent?.statusMessage ??
            orderContent?.error?.message ??
            orderContent?.message ??
            "Swiggy could not place this order.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const orderId = orderContent?.orderId ?? orderContent?.data?.orderId ?? null;

    if (!orderId) {
      return new Response(
        JSON.stringify({
          error: "Swiggy accepted the order but didn't return an order ID.",
          raw: orderContent,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, orderId: String(orderId) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Food checkout error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to place Swiggy order",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}