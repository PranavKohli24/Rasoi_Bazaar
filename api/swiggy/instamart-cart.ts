// api/swiggy/instamart-cart.ts

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

/* ------------------------------------------------------------------ */
/* GET — cart review                                                   */
/* ------------------------------------------------------------------ */

interface CartBillLineItem {
  label: string;
  value: string;
}

function extractCartItems(content: any): { name: string; quantity: number; price?: string }[] {
  const rawItems = content?.items ?? content?.data?.items ?? [];
  if (!Array.isArray(rawItems)) return [];

  return rawItems.map((item: any) => ({
    name: item?.itemVariant
      ? `${item?.itemName ?? "Item"} (${item.itemVariant})`
      : item?.itemName ?? "Item",
    quantity: typeof item?.quantity === "number" ? item.quantity : 1,
    price:
      typeof item?.discountedFinalPrice === "number"
        ? `₹${item.discountedFinalPrice}`
        : undefined,
  }));
}

function extractBill(content: any): { lineItems: CartBillLineItem[]; toPay: CartBillLineItem } | null {
  const breakdown = content?.billBreakdown;
  if (!breakdown?.toPay) return null;

  return {
    lineItems: Array.isArray(breakdown.lineItems) ? breakdown.lineItems : [],
    toPay: breakdown.toPay,
  };
}

function parseRupeesToPaise(value: string | undefined): number | null {
  if (!value) return null;
  const cleaned = value.replace(/[^\d.]/g, "");
  const rupees = parseFloat(cleaned);
  return Number.isFinite(rupees) ? Math.round(rupees * 100) : null;
}

const MIN_ORDER_PAISE = 99 * 100;

export async function GET(request: Request): Promise<Response> {
  try {
    const session = getSession(request);
    if (!session) return notConnected();

    const cartResponse = await fetch("https://mcp.swiggy.com/im", {
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
        params: { name: "get_cart", arguments: {} },
      }),
    });

    if (cartResponse.status === 401) return notConnected();

    const cartText = await cartResponse.text();
    const cartData = parseSwiggyResponse(cartText);

    if (!cartData) {
      return json({ error: "Could not parse Swiggy cart response" }, 502);
    }

    const cartContent = cartData?.result?.structuredContent ?? {};

    const errorCodes: string[] = Array.isArray(cartContent?.errorCodes) ? cartContent.errorCodes : [];
    const errorMessage: string =
      cartContent?.titleMessage ?? cartContent?.statusMessage ?? cartContent?.message ?? "";

    const notServiceable =
      errorCodes.includes("ADDRESS_NOT_SERVICEABLE") || /not\s*serviceable/i.test(errorMessage);

    if (notServiceable) {
      return json({ error: "Instamart doesn't deliver to this address right now." }, 422);
    }

    const items = extractCartItems(cartContent);
    const bill = extractBill(cartContent);

    const billTotalPaise =
      parseRupeesToPaise(bill?.toPay?.value) ?? parseRupeesToPaise(cartContent?.cartTotalAmount);

    const minOrderNotMet =
      errorCodes.includes("MIN_ORDER_NOT_MET") ||
      /minimum\s*order/i.test(errorMessage) ||
      (billTotalPaise !== null && billTotalPaise < MIN_ORDER_PAISE);

    return json({
      success: true,
      items,
      bill,
      minOrderNotMet,
      minOrderPaise: MIN_ORDER_PAISE,
      raw: cartContent,
    });
  } catch (error) {
    console.error("Get Instamart cart error:", error);
    return json({ error: error instanceof Error ? error.message : "Failed to load Instamart cart" }, 500);
  }
}

/* ------------------------------------------------------------------ */
/* POST — dispatches on body.action: "add" | "checkout"                */
/* ------------------------------------------------------------------ */

export async function POST(request: Request): Promise<Response> {
  const session = getSession(request);
  if (!session) return notConnected();

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const action = body?.action;

  if (action === "checkout") {
    return handleCheckout(session.accessToken, body);
  }

  if (action === "add") {
    return handleAddToCart(session.accessToken, body);
  }

  return json({ error: "Missing or unknown action. Use 'add' or 'checkout'." }, 400);
}

/* ---- checkout ---- */

async function wasOrderRecentlyPlaced(accessToken: string): Promise<any | null> {
  const { data } = await callSwiggyTool(accessToken, "get_orders", {});
  const orders = data?.result?.structuredContent?.orders ?? [];

  if (!Array.isArray(orders) || orders.length === 0) return null;

  const parsedTime = (o: any): number => {
    const t = Date.parse(o?.placedAt ?? "");
    return Number.isFinite(t) ? t : 0;
  };
  const newest = [...orders].sort((a, b) => parsedTime(b) - parsedTime(a))[0];

  const TWO_MINUTES_MS = 2 * 60 * 1000;
  const isRecent = Date.now() - parsedTime(newest) < TWO_MINUTES_MS;

  return isRecent ? newest : null;
}

async function handleCheckout(accessToken: string, body: any): Promise<Response> {
  try {
    const paymentMethod = body?.paymentMethod ?? "COD";

    if (paymentMethod !== "COD") {
      return json({ error: "Only Cash on Delivery is supported right now." }, 400);
    }

    const { status, data } = await callSwiggyTool(accessToken, "checkout", { paymentMethod });

    if (status === 401) return notConnected();

    const isServerError = status >= 500 || !data;

    if (isServerError) {
      const recentOrder = await wasOrderRecentlyPlaced(accessToken);

      if (recentOrder) {
        return json({
          success: true,
          orderId: String(recentOrder.orderId ?? recentOrder.id),
          verifiedViaOrderHistory: true,
          order: recentOrder,
        });
      }

      return json({ error: "Checkout failed and no order was found. Safe to try again." }, 502);
    }

    const checkoutContent = data?.result?.structuredContent;

    const errorCodes: string[] = Array.isArray(checkoutContent?.errorCodes) ? checkoutContent.errorCodes : [];
    const errorMessage: string =
      checkoutContent?.titleMessage ?? checkoutContent?.statusMessage ?? checkoutContent?.message ?? "";

    const toolError = data?.result?.isError || checkoutContent?.success === false || errorCodes.length > 0;

    if (toolError) {
      if (errorCodes.includes("MIN_ORDER_NOT_MET") || /minimum\s*order/i.test(errorMessage)) {
        return json({ error: "Your cart is under the ₹99 Instamart minimum." }, 422);
      }
      if (errorCodes.includes("ADDRESS_NOT_SERVICEABLE") || /not\s*serviceable/i.test(errorMessage)) {
        return json({ error: "Instamart doesn't deliver to this address." }, 422);
      }
      if (/cart\s*expired|abandoned/i.test(errorMessage)) {
        return json({ error: "Your cart expired. Please rebuild it and try again." }, 409);
      }

      return json({ error: errorMessage || "Swiggy could not place this order." }, 502);
    }

    const orderId = checkoutContent?.orderId ?? checkoutContent?.data?.orderId ?? null;

    if (!orderId) {
      return json({ error: "Order placed, but no order ID was returned." }, 502);
    }

    return json({
      success: true,
      orderId: String(orderId),
      verifiedViaOrderHistory: false,
      order: checkoutContent,
    });
  } catch (error) {
    console.error("Instamart checkout error:", error);
    return json({ error: error instanceof Error ? error.message : "Failed to place Instamart order" }, 500);
  }
}

/* ---- add to cart ---- */

function getStructuredContent(data: any) {
  return (
    data?.result?.structuredContent ??
    data?.structuredContent ??
    data?.result?.data ??
    data?.data ??
    {}
  );
}

function getToolError(data: any): string | null {
  if (data?.success === false) {
    return data?.error?.message ?? data?.message ?? "Swiggy request failed.";
  }

  if (data?.result?.isError === true) {
    return data?.result?.message ?? "Swiggy tool call failed.";
  }

  return null;
}

function getCartItemsRaw(data: any): any[] {
  const content = getStructuredContent(data);
  const items = content?.items ?? content?.cartItems ?? content?.cart?.items ?? [];
  return Array.isArray(items) ? items : [];
}

function getItemSpinId(item: any): string | undefined {
  return item?.spinId ?? item?.variation?.spinId ?? item?.sku?.spinId;
}

function getItemSkuId(item: any): string | undefined {
  return item?.skuId ?? item?.variation?.skuId ?? item?.sku?.skuId;
}

function getItemQuantity(item: any): number {
  const quantity = Number(item?.quantity ?? item?.qty ?? 0);
  return Number.isFinite(quantity) ? quantity : 0;
}

async function handleAddToCart(accessToken: string, body: any): Promise<Response> {
  try {
    const { addressId, items } = body;

    if (!addressId) {
      return json({ error: "addressId is required" }, 400);
    }

    if (!Array.isArray(items) || items.length === 0) {
      return json({ error: "At least one cart item is required" }, 400);
    }

    // Get the cart BEFORE updating it.
    const beforeResponse = await fetch("https://mcp.swiggy.com/im", {
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
        params: { name: "get_cart", arguments: {} },
      }),
    });

    if (beforeResponse.status === 401) return notConnected();

    const beforeText = await beforeResponse.text();
    const beforeData = parseSwiggyResponse(beforeText);

    if (!beforeData) {
      return json({ error: "Could not read your current Swiggy cart." }, 502);
    }

    const beforeError = getToolError(beforeData);
    if (beforeError) {
      return json({ error: beforeError }, 502);
    }

    const beforeItems = getCartItemsRaw(beforeData);

    // Convert existing cart into update_cart format.
    const cartItems: { spinId: string; skuId?: string; quantity: number }[] = beforeItems
      .map((item: any) => {
        const spinId = getItemSpinId(item);
        if (!spinId) return null;

        const skuId = getItemSkuId(item);
        const quantity = getItemQuantity(item);

        return {
          spinId,
          ...(skuId ? { skuId } : {}),
          quantity: quantity > 0 ? quantity : 1,
        };
      })
      .filter((item): item is { spinId: string; skuId?: string; quantity: number } => item !== null);

    // Merge all newly selected items.
    for (const newItem of items) {
      if (!newItem?.spinId) continue;

      const quantity = Number(newItem.quantity) > 0 ? Number(newItem.quantity) : 1;

      const existingIndex = cartItems.findIndex((item: any) => item.spinId === newItem.spinId);

      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += quantity;
        if (newItem.skuId) {
          cartItems[existingIndex].skuId = newItem.skuId;
        }
      } else {
        cartItems.push({
          spinId: newItem.spinId,
          ...(newItem.skuId ? { skuId: newItem.skuId } : {}),
          quantity,
        });
      }
    }

    // Update the cart ONCE.
    const updateResponse = await fetch("https://mcp.swiggy.com/im", {
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
        params: {
          name: "update_cart",
          arguments: { selectedAddressId: addressId, items: cartItems },
        },
      }),
    });

    if (updateResponse.status === 401) return notConnected();

    const updateText = await updateResponse.text();
    const updateData = parseSwiggyResponse(updateText);

    if (!updateData) {
      return json({ error: "Could not parse Swiggy cart update response." }, 502);
    }

    const updateError = getToolError(updateData);
    if (updateError) {
      return json({ error: updateError }, 502);
    }

    // Get the cart AGAIN after update.
    const afterResponse = await fetch("https://mcp.swiggy.com/im", {
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
        params: { name: "get_cart", arguments: {} },
      }),
    });

    if (afterResponse.status === 401) return notConnected();

    const afterText = await afterResponse.text();
    const afterData = parseSwiggyResponse(afterText);

    if (!afterData) {
      return json({ error: "Cart update was sent, but the updated cart could not be verified." }, 502);
    }

    const afterError = getToolError(afterData);
    if (afterError) {
      return json({ error: "Cart update could not be verified.", details: afterError }, 502);
    }

    const afterItems = getCartItemsRaw(afterData);

    // Verify EVERY requested item.
    for (const requestedItem of items) {
      const beforeItem = beforeItems.find((item: any) => getItemSpinId(item) === requestedItem.spinId);
      const afterItem = afterItems.find((item: any) => getItemSpinId(item) === requestedItem.spinId);

      const beforeQuantity = beforeItem ? getItemQuantity(beforeItem) : 0;
      const afterQuantity = afterItem ? getItemQuantity(afterItem) : 0;
      const requestedQuantity = Number(requestedItem.quantity) > 0 ? Number(requestedItem.quantity) : 1;

      if (afterQuantity < beforeQuantity + requestedQuantity) {
        return json(
          {
            error:
              "Swiggy accepted the cart update, but the item quantity did not increase in the verified cart.",
            spinId: requestedItem.spinId,
            beforeQuantity,
            afterQuantity,
            requestedQuantity,
          },
          409
        );
      }
    }

    return json({
      success: true,
      message: "All selected items were added to your Instamart cart.",
      cart: afterData,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return json({ error: error instanceof Error ? error.message : "Failed to update Instamart cart" }, 500);
  }
}