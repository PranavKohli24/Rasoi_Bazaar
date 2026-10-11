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

interface CartBillLineItem {
  label: string;
  value: string;
}

/*
 * Confirmed against a real get_cart response: each item has itemName /
 * itemVariant / discountedFinalPrice, not the generic name/price fields
 * guessed earlier. Normalized here so the frontend never has to know
 * Swiggy's raw field names.
 */
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

    const cartContent = cartData?.result?.structuredContent ?? {};

    const errorCodes: string[] = Array.isArray(cartContent?.errorCodes)
      ? cartContent.errorCodes
      : [];
    const errorMessage: string =
      cartContent?.titleMessage ?? cartContent?.statusMessage ?? cartContent?.message ?? "";

    const notServiceable =
      errorCodes.includes("ADDRESS_NOT_SERVICEABLE") ||
      /not\s*serviceable/i.test(errorMessage);

    if (notServiceable) {
      return new Response(
        JSON.stringify({
          error: "Instamart doesn't deliver to this address right now.",
        }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    const items = extractCartItems(cartContent);
    const bill = extractBill(cartContent);

    const billTotalPaise =
      parseRupeesToPaise(bill?.toPay?.value) ??
      parseRupeesToPaise(cartContent?.cartTotalAmount);

    const minOrderNotMet =
      errorCodes.includes("MIN_ORDER_NOT_MET") ||
      /minimum\s*order/i.test(errorMessage) ||
      (billTotalPaise !== null && billTotalPaise < MIN_ORDER_PAISE);
    
    return new Response(
      JSON.stringify({
        success: true,
        items,
        bill,
        minOrderNotMet,
        minOrderPaise: MIN_ORDER_PAISE,
        raw: cartContent,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Get Instamart cart error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to load Instamart cart",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}