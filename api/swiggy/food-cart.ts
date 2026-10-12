// api/swiggy/food-cart.ts

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
  const total = content?.data?.pricing?.to_pay ?? content?.data?.total ?? content?.total ?? 0;
  const parsed = Number(total);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getCartPricing(data: any): any {
  const content = getCartContent(data);
  return content?.data?.pricing ?? {};
}

const formatRupees = (value: unknown): string => {
  const n = Number(value);
  return Number.isFinite(n) ? `₹${n % 1 === 0 ? n : n.toFixed(2)}` : "₹0";
};

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

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/* ------------------------------------------------------------------ */
/* GET ?addressId=... — the cart review step, right before checkout    */
/* ------------------------------------------------------------------ */

export async function GET(request: Request): Promise<Response> {
  try {
    const session = getSession(request);
    if (!session) return notConnected();

    const url = new URL(request.url);
    const addressId = url.searchParams.get("addressId");

    if (!addressId) {
      return json({ error: "Missing addressId" }, 400);
    }

    const cartResponse = await callFoodMcp(session.accessToken, "get_food_cart", { addressId });
    if (cartResponse.status === 401) return notConnected();

    const cartText = await cartResponse.text();
    const cartData = parseSwiggyResponse(cartText);

    if (!cartData) {
      return json({ error: "Could not parse Swiggy food cart response" }, 502);
    }

    const rawItems = getCartItems(cartData);
    const total = getCartTotal(cartData);
    const pricing = getCartPricing(cartData);

    const items = rawItems.map((item: any) => {
      const unitPrice = item?.final_price ?? item?.total ?? item?.subtotal ?? item?.price;
      return {
        name: String(item?.name ?? item?.itemName ?? "Item"),
        quantity: Number(item?.quantity ?? 1),
        price: unitPrice !== undefined ? formatRupees(unitPrice) : undefined,
      };
    });

    const lineItems: { label: string; value: string }[] = [];
    if (pricing?.item_total !== undefined) {
      lineItems.push({ label: "Item total", value: formatRupees(pricing.item_total) });
    }
    if (pricing?.delivery_charge !== undefined) {
      lineItems.push({
        label: "Delivery",
        value: Number(pricing.delivery_charge) === 0 ? "FREE" : formatRupees(pricing.delivery_charge),
      });
    }
    if (pricing?.taxes_and_charges !== undefined) {
      lineItems.push({ label: "Taxes & charges", value: formatRupees(pricing.taxes_and_charges) });
    }

    const bill =
      total > 0
        ? { lineItems, toPay: { label: "To pay", value: formatRupees(total) } }
        : null;
    return json({
      success: true,
      items,
      bill,
      exceedsMaxOrder: total > MAX_FOOD_ORDER_RUPEES,
      maxOrderPaise: MAX_FOOD_ORDER_RUPEES * 100,
    });
  } catch (error) {
    console.error("Get food cart error:", error);
    return json({ error: error instanceof Error ? error.message : "Failed to load Swiggy food cart" }, 500);
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

  if (action === "add") {
    return handleAddDish(session.accessToken, body);
  }

  if (action === "checkout") {
    return handleCheckout(session.accessToken, body);
  }

  return json({ error: "Missing or unknown action. Use 'add' or 'checkout'." }, 400);
}

/* ---- add dish (formerly add-dish-to-food-cart.ts) ---- */

async function handleAddDish(accessToken: string, body: any): Promise<Response> {
  try {
    const addressId = body?.addressId;
    const restaurantId = body?.restaurantId;
    const restaurantName = body?.restaurantName;
    const dishName = body?.dishName;

    if (!addressId) return json({ error: "Missing addressId" }, 400);
    if (!restaurantId) return json({ error: "Missing restaurantId" }, 400);
    if (!dishName || typeof dishName !== "string" || !dishName.trim()) {
      return json({ error: "Missing dishName" }, 400);
    }

    /*
     * 1. Search for this dish INSIDE the selected restaurant
     */
    const searchResponse = await callFoodMcp(accessToken, "search_menu", {
      addressId,
      query: dishName.trim(),
      restaurantIdOfAddedItem: restaurantId,
    });

    if (searchResponse.status === 401) return notConnected();

    const searchText = await searchResponse.text();
    const searchData = parseSwiggyResponse(searchText);

    if (!searchData) {
      return json({ error: "Could not parse Swiggy menu search response" }, 502);
    }

    const items =
      searchData?.result?.structuredContent?.items ??
      searchData?.result?.structuredContent?.data?.items ??
      [];

    if (!Array.isArray(items) || items.length === 0) {
      return json(
        { error: `Couldn't find ${dishName} at ${restaurantName ?? "this restaurant"}.` },
        404
      );
    }

    /*
     * 2. Pick the closest matching dish
     */
    const normalizedQuery = dishName.trim().toLowerCase();

    const exactMatch =
      items.find((item: any) => String(item?.name ?? "").trim().toLowerCase() === normalizedQuery) ?? null;

    const partialMatch =
      items.find((item: any) => {
        const name = String(item?.name ?? "").trim().toLowerCase();
        return name.includes(normalizedQuery) || normalizedQuery.includes(name);
      }) ?? null;

    const selectedItem = exactMatch ?? partialMatch ?? items[0];
    const menuItemId = selectedItem?.menu_item_id ?? selectedItem?.id ?? null;

    if (!menuItemId) {
      return json(
        { error: `Couldn't identify ${dishName} at ${restaurantName ?? "this restaurant"}.` },
        502
      );
    }

    /*
     * 3. Handle variants when Swiggy provides them
     */
    const cartItem: any = {
      menu_item_id: String(menuItemId),
      quantity: 1,
    };

    if (Array.isArray(selectedItem?.variations) && selectedItem.variations.length > 0) {
      const availableVariation =
        selectedItem.variations.find(
          (variation: any) => Number(variation?.inStock ?? 1) > 0 && Number(variation?.default ?? 0) === 1
        ) ?? selectedItem.variations.find((variation: any) => Number(variation?.inStock ?? 1) > 0);

      if (availableVariation?.id) {
        cartItem.variants = [
          { group_id: availableVariation.groupId, variation_id: availableVariation.id },
        ];
      }
    }

    if (Array.isArray(selectedItem?.variantsV2) && selectedItem.variantsV2.length > 0) {
      const resolvedVariants: { group_id: string; variation_id: string }[] = [];

      for (const group of selectedItem.variantsV2) {
        const variations = Array.isArray(group?.variations) ? group.variations : [];

        const chosen =
          variations.find((v: any) => Number(v?.inStock ?? 1) > 0 && Number(v?.default ?? 0) === 1) ??
          variations.find((v: any) => Number(v?.inStock ?? 1) > 0);

        if (!chosen?.id) {
          return json(
            { error: `${selectedItem.name} requires a customization before it can be added to the cart.` },
            409
          );
        }

        resolvedVariants.push({ group_id: group.groupId, variation_id: chosen.id });
      }

      cartItem.variantsV2 = resolvedVariants;
    }

    /*
     * 4. Add the resolved menu item to the food cart
     */
    const cartResponse = await callFoodMcp(accessToken, "update_food_cart", {
      restaurantId,
      addressId,
      cartItems: [cartItem],
    });

    if (cartResponse.status === 401) return notConnected();

    const cartText = await cartResponse.text();
    const cartData = parseSwiggyResponse(cartText);

    if (!cartData) {
      return json({ error: "Could not parse Swiggy cart response" }, 502);
    }

    const cartContent = cartData?.result?.structuredContent;

    const toolError =
      cartData?.result?.isError ||
      cartContent?.success === false ||
      cartContent?.successful === false ||
      (Array.isArray(cartContent?.errorCodes) && cartContent.errorCodes.length > 0);

    if (toolError) {
      return json(
        {
          error:
            cartContent?.titleMessage ??
            cartContent?.statusMessage ??
            cartContent?.error?.message ??
            cartContent?.message ??
            "Swiggy could not update the food cart.",
        },
        502
      );
    }

    /*
     * 5. VERIFY — re-fetch the cart and confirm the item is really there
     */
    const verifyResponse = await callFoodMcp(accessToken, "get_food_cart", { addressId });
    if (verifyResponse.status === 401) return notConnected();

    const verifyText = await verifyResponse.text();
    const verifyData = parseSwiggyResponse(verifyText);

    const verifiedItems = getCartItems(verifyData);

    const isConfirmed = verifiedItems.some(
      (item: any) => String(item?.menu_item_id ?? item?.id ?? "") === String(menuItemId)
    );

    if (!isConfirmed) {
      return json(
        {
          error: "Swiggy accepted the cart update, but the item could not be verified in the cart afterward.",
          cart: verifyData,
        },
        409
      );
    }

    return json({
      success: true,
      restaurantId,
      restaurantName,
      dishName: selectedItem.name,
      menuItemId: String(menuItemId),
      verifiedCart: verifyData,
    });
  } catch (error) {
    console.error("Add dish to food cart error:", error);
    return json(
      { error: error instanceof Error ? error.message : "Failed to add dish to Swiggy cart" },
      500
    );
  }
}

/* ---- checkout ---- */

async function handleCheckout(accessToken: string, body: any): Promise<Response> {
  try {
    const addressId = body?.addressId;

    if (!addressId) {
      return json({ error: "Missing addressId" }, 400);
    }

    const cartResponse = await callFoodMcp(accessToken, "get_food_cart", { addressId });
    if (cartResponse.status === 401) return notConnected();

    const cartText = await cartResponse.text();
    const cartData = parseSwiggyResponse(cartText);
    const total = getCartTotal(cartData);

    if (total > MAX_FOOD_ORDER_RUPEES) {
      return json(
        { error: `Your cart is over the ₹${MAX_FOOD_ORDER_RUPEES} order limit — please remove an item.` },
        409
      );
    }

    // Critical: place_food_order is not idempotent. If this fails with a
    // 5xx, the caller should check get_food_orders before retrying rather
    // than calling this again blindly (see the MCP recipe's "What can go
    // wrong" section). We don't auto-retry here for that reason.
    const orderResponse = await callFoodMcp(accessToken, "place_food_order", { paymentMethod: "COD" });
    if (orderResponse.status === 401) return notConnected();

    const orderText = await orderResponse.text();
    const orderData = parseSwiggyResponse(orderText);

    if (!orderData) {
      return json({ error: "Could not parse Swiggy order response" }, 502);
    }

    const orderContent = orderData?.result?.structuredContent;

    const toolError =
      orderData?.result?.isError ||
      orderContent?.success === false ||
      orderContent?.successful === false ||
      (Array.isArray(orderContent?.errorCodes) && orderContent.errorCodes.length > 0);

    if (toolError) {
      return json(
        {
          error:
            orderContent?.titleMessage ??
            orderContent?.statusMessage ??
            orderContent?.error?.message ??
            orderContent?.message ??
            "Swiggy could not place this order.",
        },
        502
      );
    }

    const orderId = orderContent?.orderId ?? orderContent?.data?.orderId ?? null;

    if (!orderId) {
      return json(
        { error: "Swiggy accepted the order but didn't return an order ID.", raw: orderContent },
        502
      );
    }

    return json({ success: true, orderId: String(orderId) });
  } catch (error) {
    console.error("Food checkout error:", error);
    return json({ error: error instanceof Error ? error.message : "Failed to place Swiggy order" }, 500);
  }
}