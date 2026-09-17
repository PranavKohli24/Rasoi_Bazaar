function getCookie(
  request: Request,
  name: string
): string | null {
  const cookieHeader =
    request.headers.get("cookie") ?? "";

  for (const cookie of cookieHeader.split(";")) {
    const [key, ...parts] =
      cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(
        parts.join("=")
      );
    }
  }

  return null;
}

function parseSwiggyResponse(
  text: string
): any {
  try {
    return JSON.parse(text);
  } catch {
    // Try SSE
  }

  for (const line of text.split(
    /\r?\n/
  )) {
    if (!line.startsWith("data:")) {
      continue;
    }

    const data =
      line.slice(5).trim();

    if (!data) {
      continue;
    }

    try {
      return JSON.parse(data);
    } catch {
      continue;
    }
  }

  return null;
}

function getStructuredContent(
  data: any
) {
  return (
    data?.result?.structuredContent ??
    data?.structuredContent ??
    data?.result?.data ??
    data?.data ??
    {}
  );
}

function getToolError(
  data: any
): string | null {
  if (data?.success === false) {
    return (
      data?.error?.message ??
      data?.message ??
      "Swiggy request failed."
    );
  }

  if (data?.result?.isError === true) {
    return (
      data?.result?.message ??
      "Swiggy tool call failed."
    );
  }

  return null;
}

function getCartItems(
  data: any
): any[] {
  const content =
    getStructuredContent(data);

  const items =
    content?.items ??
    content?.cartItems ??
    content?.cart?.items ??
    [];

  return Array.isArray(items)
    ? items
    : [];
}

function getItemSpinId(
  item: any
): string | undefined {
  return (
    item?.spinId ??
    item?.variation?.spinId ??
    item?.sku?.spinId
  );
}

function getItemSkuId(
  item: any
): string | undefined {
  return (
    item?.skuId ??
    item?.variation?.skuId ??
    item?.sku?.skuId
  );
}

function getItemQuantity(
  item: any
): number {
  const quantity = Number(
    item?.quantity ??
      item?.qty ??
      0
  );

  return Number.isFinite(quantity)
    ? quantity
    : 0;
}

export async function POST(
  request: Request
): Promise<Response> {
  try {
    const sessionCookie =
      getCookie(
        request,
        "swiggy_session"
      );

    if (!sessionCookie) {
      return new Response(
        JSON.stringify({
          error:
            "SWIGGY_NOT_CONNECTED",
        }),
        {
          status: 401,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const session = JSON.parse(
      Buffer.from(
        sessionCookie,
        "base64url"
      ).toString("utf8")
    );

    const body =
      await request.json();

    const {
      addressId,
      items,
    } = body;

    if (!addressId) {
      return new Response(
        JSON.stringify({
          error:
            "addressId is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return new Response(
        JSON.stringify({
          error:
            "At least one cart item is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    /*
     * Get the cart BEFORE updating it.
     */
    const beforeResponse =
      await fetch(
        "https://mcp.swiggy.com/im",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${session.accessToken}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json, text/event-stream",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),
            method: "tools/call",
            params: {
              name: "get_cart",
              arguments: {},
            },
          }),
        }
      );

    const beforeText =
      await beforeResponse.text();

    const beforeData =
      parseSwiggyResponse(
        beforeText
      );

    if (!beforeData) {
      return new Response(
        JSON.stringify({
          error:
            "Could not read your current Swiggy cart.",
        }),
        {
          status: 502,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const beforeError =
      getToolError(beforeData);

    if (beforeError) {
      return new Response(
        JSON.stringify({
          error: beforeError,
        }),
        {
          status: 502,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const beforeItems =
      getCartItems(
        beforeData
      );

    /*
     * Convert existing cart into
     * update_cart format.
     */
    const cartItems: {
  spinId: string;
  skuId?: string;
  quantity: number;
}[] = beforeItems
  .map((item: any) => {
    const spinId =
      getItemSpinId(item);

    if (!spinId) {
      return null;
    }

    const skuId =
      getItemSkuId(item);

    const quantity =
      getItemQuantity(item);

    return {
      spinId,

      ...(skuId
        ? { skuId }
        : {}),

      quantity:
        quantity > 0
          ? quantity
          : 1,
    };
  })
  .filter(
    (
      item
    ): item is {
      spinId: string;
      skuId?: string;
      quantity: number;
    } => item !== null
  );

    /*
     * Merge all newly selected items.
     */
    for (const newItem of items) {
      if (
        !newItem?.spinId
      ) {
        continue;
      }

      const quantity =
        Number(
          newItem.quantity
        ) > 0
          ? Number(
              newItem.quantity
            )
          : 1;

      const existingIndex =
        cartItems.findIndex(
          (item: any) =>
            item.spinId ===
            newItem.spinId
        );

      if (
        existingIndex >= 0
      ) {
        cartItems[
          existingIndex
        ].quantity +=
          quantity;

        if (
          newItem.skuId
        ) {
          cartItems[
            existingIndex
          ].skuId =
            newItem.skuId;
        }
      } else {
        cartItems.push({
          spinId:
            newItem.spinId,

          ...(newItem.skuId
            ? {
                skuId:
                  newItem.skuId,
              }
            : {}),

          quantity,
        });
      }
    }

    /*
     * Update the cart ONCE.
     */
    const updateResponse =
      await fetch(
        "https://mcp.swiggy.com/im",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${session.accessToken}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json, text/event-stream",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),

            method: "tools/call",

            params: {
              name: "update_cart",

              arguments: {
                selectedAddressId:
                  addressId,

                items:
                  cartItems,
              },
            },
          }),
        }
      );

    const updateText =
      await updateResponse.text();

    const updateData =
      parseSwiggyResponse(
        updateText
      );

    if (!updateData) {
      return new Response(
        JSON.stringify({
          error:
            "Could not parse Swiggy cart update response.",
        }),
        {
          status: 502,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const updateError =
      getToolError(
        updateData
      );

    if (updateError) {
      return new Response(
        JSON.stringify({
          error: updateError,
        }),
        {
          status: 502,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    /*
     * Get the cart AGAIN after update.
     */
    const afterResponse =
      await fetch(
        "https://mcp.swiggy.com/im",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${session.accessToken}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json, text/event-stream",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),

            method: "tools/call",

            params: {
              name: "get_cart",
              arguments: {},
            },
          }),
        }
      );

    const afterText =
      await afterResponse.text();

    const afterData =
      parseSwiggyResponse(
        afterText
      );

    if (!afterData) {
      return new Response(
        JSON.stringify({
          error:
            "Cart update was sent, but the updated cart could not be verified.",
        }),
        {
          status: 502,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const afterError =
      getToolError(
        afterData
      );

    if (afterError) {
      return new Response(
        JSON.stringify({
          error:
            "Cart update could not be verified.",
          details:
            afterError,
        }),
        {
          status: 502,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    const afterItems =
      getCartItems(
        afterData
      );

    /*
     * Verify EVERY requested item.
     *
     * The quantity after the update must be
     * greater than the quantity before.
     */
    for (const requestedItem of items) {
      const beforeItem =
        beforeItems.find(
          (item: any) =>
            getItemSpinId(
              item
            ) ===
            requestedItem.spinId
        );

      const afterItem =
        afterItems.find(
          (item: any) =>
            getItemSpinId(
              item
            ) ===
            requestedItem.spinId
        );

      const beforeQuantity =
        beforeItem
          ? getItemQuantity(
              beforeItem
            )
          : 0;

      const afterQuantity =
        afterItem
          ? getItemQuantity(
              afterItem
            )
          : 0;

      const requestedQuantity =
        Number(
          requestedItem.quantity
        ) > 0
          ? Number(
              requestedItem.quantity
            )
          : 1;

      if (
        afterQuantity <
        beforeQuantity +
          requestedQuantity
      ) {
        return new Response(
          JSON.stringify({
            error:
              "Swiggy accepted the cart update, but the item quantity did not increase in the verified cart.",

            spinId:
              requestedItem.spinId,

            beforeQuantity,

            afterQuantity,

            requestedQuantity,
          }),
          {
            status: 409,
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );
      }
    }

    console.log("BEFORE ITEMS:", JSON.stringify(beforeItems, null, 2));
    console.log("AFTER ITEMS:", JSON.stringify(afterItems, null, 2));
    console.log("UPDATE RESPONSE:", JSON.stringify(updateData, null, 2));

    return new Response(
      JSON.stringify({
        success: true,

        message:
          "All selected items were added to your Instamart cart.",

        cart:
          afterData,
      }),
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Add to cart error:",
      error
    );

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Failed to update Instamart cart",
      }),
      {
        status: 500,

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  }
}