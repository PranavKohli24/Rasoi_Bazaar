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

function getCartContent(data: any) {
  return data?.result?.structuredContent ?? {};
}

function getCartItems(data: any): any[] {
  const content = getCartContent(data);
  const items = content?.data?.items ?? content?.items ?? [];
  return Array.isArray(items) ? items : [];
}

export async function POST(request: Request): Promise<Response> {
  try {
    const sessionCookie = getCookie(request, "swiggy_session");

    if (!sessionCookie) {
      return new Response(
        JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let session: { accessToken: string };

    try {
      session = JSON.parse(
        Buffer.from(sessionCookie, "base64url").toString("utf8")
      );
    } catch {
      return new Response(
        JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.json();

    const addressId = body?.addressId;
    const restaurantId = body?.restaurantId;
    const restaurantName = body?.restaurantName;
    const dishName = body?.dishName;

    if (!addressId) {
      return new Response(
        JSON.stringify({ error: "Missing addressId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!restaurantId) {
      return new Response(
        JSON.stringify({ error: "Missing restaurantId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!dishName || typeof dishName !== "string" || !dishName.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing dishName" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    /*
     * ---------------------------------------------------------------
     * 1. Search for this dish INSIDE the selected restaurant
     * ---------------------------------------------------------------
     */

    const searchResponse = await fetch("https://mcp.swiggy.com/food", {
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
          name: "search_menu",
          arguments: {
            addressId,
            query: dishName.trim(),
            restaurantIdOfAddedItem: restaurantId,
          },
        },
      }),
    });

    if (searchResponse.status === 401) {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const searchText = await searchResponse.text();
    const searchData = parseSwiggyResponse(searchText);

    if (!searchData) {
      return new Response(
        JSON.stringify({ error: "Could not parse Swiggy menu search response" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const items =
      searchData?.result?.structuredContent?.items ??
      searchData?.result?.structuredContent?.data?.items ??
      [];

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({
          error: `Couldn't find ${dishName} at ${restaurantName ?? "this restaurant"}.`,
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    /*
     * ---------------------------------------------------------------
     * 2. Pick the closest matching dish
     * ---------------------------------------------------------------
     */

    const normalizedQuery = dishName.trim().toLowerCase();

    const exactMatch =
      items.find(
        (item: any) =>
          String(item?.name ?? "").trim().toLowerCase() === normalizedQuery
      ) ?? null;

    const partialMatch =
      items.find((item: any) => {
        const name = String(item?.name ?? "").trim().toLowerCase();
        return name.includes(normalizedQuery) || normalizedQuery.includes(name);
      }) ?? null;

    const selectedItem = exactMatch ?? partialMatch ?? items[0];

    const menuItemId = selectedItem?.menu_item_id ?? selectedItem?.id ?? null;

    if (!menuItemId) {
      return new Response(
        JSON.stringify({
          error: `Couldn't identify ${dishName} at ${restaurantName ?? "this restaurant"}.`,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    /*
     * ---------------------------------------------------------------
     * 3. Handle variants when Swiggy provides them
     * ---------------------------------------------------------------
     */

    const cartItem: any = {
      menu_item_id: String(menuItemId),
      quantity: 1,
    };

    if (Array.isArray(selectedItem?.variations) && selectedItem.variations.length > 0) {
      const availableVariation =
        selectedItem.variations.find(
          (variation: any) =>
            Number(variation?.inStock ?? 1) > 0 &&
            Number(variation?.default ?? 0) === 1
        ) ??
        selectedItem.variations.find(
          (variation: any) => Number(variation?.inStock ?? 1) > 0
        );

      if (availableVariation?.id) {
        cartItem.variants = [
          {
            group_id: availableVariation.groupId,
            variation_id: availableVariation.id,
          },
        ];
      }
    }

    if (Array.isArray(selectedItem?.variantsV2) && selectedItem.variantsV2.length > 0) {
      const resolvedVariants: { group_id: string; variation_id: string }[] = [];

      for (const group of selectedItem.variantsV2) {
        const variations = Array.isArray(group?.variations) ? group.variations : [];

        const chosen =
          variations.find(
            (v: any) => Number(v?.inStock ?? 1) > 0 && Number(v?.default ?? 0) === 1
          ) ?? variations.find((v: any) => Number(v?.inStock ?? 1) > 0);

        if (!chosen?.id) {
          return new Response(
            JSON.stringify({
              error: `${selectedItem.name} requires a customization before it can be added to the cart.`,
            }),
            { status: 409, headers: { "Content-Type": "application/json" } }
          );
        }

        resolvedVariants.push({ group_id: group.groupId, variation_id: chosen.id });
      }

      cartItem.variantsV2 = resolvedVariants;
    }

    /*
     * ---------------------------------------------------------------
     * 4. Add the resolved menu item to the food cart
     * ---------------------------------------------------------------
     */

    const cartResponse = await fetch("https://mcp.swiggy.com/food", {
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
          name: "update_food_cart",
          arguments: {
            restaurantId,
            addressId,
            cartItems: [cartItem],
          },
        },
      }),
    });

    if (cartResponse.status === 401) {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cartText = await cartResponse.text();
    const cartData = parseSwiggyResponse(cartText);

    if (!cartData) {
      return new Response(
        JSON.stringify({ error: "Could not parse Swiggy cart response" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const cartContent = cartData?.result?.structuredContent;

    const toolError =
      cartData?.result?.isError ||
      cartContent?.success === false ||
      cartContent?.successful === false ||
      (Array.isArray(cartContent?.errorCodes) && cartContent.errorCodes.length > 0);

    if (toolError) {
      return new Response(
        JSON.stringify({
          error:
            cartContent?.titleMessage ??
            cartContent?.statusMessage ??
            cartContent?.error?.message ??
            cartContent?.message ??
            "Swiggy could not update the food cart.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    /*
     * ---------------------------------------------------------------
     * 5. VERIFY — re-fetch the cart and confirm the item is really there
     * ---------------------------------------------------------------
     */

    const verifyResponse = await fetch("https://mcp.swiggy.com/food", {
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
          name: "get_food_cart",
          arguments: { addressId },
        },
      }),
    });

    if (verifyResponse.status === 401) {
      return new Response(JSON.stringify({ error: "SWIGGY_NOT_CONNECTED" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const verifyText = await verifyResponse.text();
    const verifyData = parseSwiggyResponse(verifyText);

    console.log("VERIFY GET_FOOD_CART RAW:", JSON.stringify(verifyData, null, 2));

    const verifiedItems = getCartItems(verifyData);

    const isConfirmed = verifiedItems.some(
      (item: any) => String(item?.menu_item_id ?? item?.id ?? "") === String(menuItemId)
    );

    if (!isConfirmed) {
      return new Response(
        JSON.stringify({
          error:
            "Swiggy accepted the cart update, but the item could not be verified in the cart afterward.",
          cart: verifyData,
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        restaurantId,
        restaurantName,
        dishName: selectedItem.name,
        menuItemId: String(menuItemId),
        verifiedCart: verifyData,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Add dish to food cart error:", error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Failed to add dish to Swiggy cart",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}