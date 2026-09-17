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
    // Try SSE below
  }

  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    if (!line.startsWith("data:")) {
      continue;
    }

    const data = line
      .slice(5)
      .trim();

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

function normalize(
  value: string = ""
): string {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/*
 * Convert common Indian ingredient names
 * into the canonical name we want to search/filter.
 */
function canonicalizeQuery(
  query: string
): string {
  const normalized =
    normalize(query);

  const aliases: Record<
    string,
    string
  > = {
    makhan: "butter",
    makkhan: "butter",
    makhhan: "butter",
    "desi makhan": "butter",

    "chat masala":
      "chaat masala",
  };

  return (
    aliases[normalized] ??
    normalized
  );
}

/*
 * Obvious false positives that Swiggy's
 * broad search can return.
 */
const EXCLUDED_TERMS: Record<
  string,
  string[]
> = {
  butter: [
    "cream",
    "buttermilk",
    "butter milk",
    "chaach",
    "chach",
    "chaas",
    "paneer",
    "feta",
    "milk",
    "cheese",
  ],

  "chaat masala": [
    "peri peri",
    "mixed herbs",
    "pasta",
    "pasta mix",
    "chilli flakes",
    "chili flakes",
    "oregano",
    "chipotle",
    "tamarind",
    "imli",
    "paneer masala",
    "paneer tikka",
    "pizza",
  ],

  bread: [
    "cake",
    "rusk",
    "biscuit",
    "cookie",
    "croissant",
    "muffin",
  ],
};

function getRelevantProducts(
  products: any[],
  query: string
): any[] {
  const normalizedQuery =
    canonicalizeQuery(query);

  const excludedTerms =
    EXCLUDED_TERMS[
      normalizedQuery
    ] ?? [];

  const queryTokens =
    normalizedQuery
      .split(" ")
      .filter(
        (token) => token.length > 2
      );

  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "fresh",
    "pure",
    "premium",
    "natural",
    "best",
    "quality",
    "pack",
    "packet",
    "piece",
    "pieces",
  ]);

  const importantTokens =
    queryTokens.filter(
      (token) =>
        !stopWords.has(token)
    );

  const scoredProducts =
    products
      .filter((product) => {
        /*
         * Ignore products that are not
         * available.
         */
        if (
          product?.inStock === false ||
          product?.isAvail === false
        ) {
          return false;
        }

        /*
         * Product must have at least one
         * purchasable variation.
         */
        return (
          Array.isArray(
            product?.variations
          ) &&
          product.variations.some(
            (variation: any) =>
              variation
                ?.isInStockAndAvailable
          )
        );
      })
      .map((product) => {
        const productName =
          normalize(
            product?.displayName ??
              ""
          );

        const productText =
          normalize(
            `${product?.displayName ?? ""} ${
              product?.brand ?? ""
            }`
          );

        /*
         * Remove obvious unrelated products.
         */
        const isExcluded =
          excludedTerms.some(
            (term) =>
              productText.includes(
                normalize(term)
              )
          );

        if (isExcluded) {
          return null;
        }

        let score = 0;

        /*
         * Exact ingredient phrase.
         */
        if (
          productText.includes(
            normalizedQuery
          )
        ) {
          score += 100;
        }

        /*
         * Token matches.
         */
        for (
          const token of importantTokens
        ) {
          if (
            productText.includes(token)
          ) {
            score += 20;
          }

          /*
           * Extra weight if the token
           * is actually in the product name.
           */
          if (
            productName.includes(token)
          ) {
            score += 15;
          }
        }

        if (score === 0) {
          return null;
        }

        return {
          product,
          score,
        };
      })
      .filter(
        (
          item
        ): item is {
          product: any;
          score: number;
        } =>
          item !== null
      )
      .sort(
        (a, b) =>
          b.score - a.score
      );

  /*
   * Only return the top 3 relevant
   * products.
   */
  return scoredProducts
    .slice(0, 3)
    .map(({ product }) => ({
      ...product,

      /*
       * Don't send unavailable variations
       * to the frontend.
       */
      variations:
        product.variations?.filter(
          (variation: any) =>
            variation
              ?.isInStockAndAvailable
        ) ?? [],
    }));
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

    const addressId =
      body?.addressId;

    const query =
      body?.query;

    if (!addressId) {
      return new Response(
        JSON.stringify({
          error:
            "Missing addressId",
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
      !query ||
      typeof query !== "string" ||
      !query.trim()
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Missing search query",
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

    const swiggyResponse =
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
              name: "search_products",

              arguments: {
                addressId,
                query: query.trim(),
              },
            },
          }),
        }
      );

    const text =
      await swiggyResponse.text();

    const data =
      parseSwiggyResponse(text);

    if (!data) {
      return new Response(
        JSON.stringify({
          error:
            "Could not parse Swiggy product search response",
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
     * Get raw products returned by Swiggy.
     */
    const products =
      data?.result
        ?.structuredContent
        ?.products ?? [];

    /*
     * Clean them up before returning
     * them to React.
     */
    const filteredProducts =
      getRelevantProducts(
        products,
        query
      );

    return new Response(
      JSON.stringify({
        result: {
          structuredContent: {
            products:
              filteredProducts,
          },
        },
      }),
      {
        status:
          swiggyResponse.status,

        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Search Instamart products error:",
      error
    );

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Failed to search Instamart products",
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