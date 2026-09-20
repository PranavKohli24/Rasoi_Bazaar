export interface SwiggyAddress {
  id: string;
  addressLine: string;
  addressTag?: string;
  addressCategory?: string;
}

export interface InstamartVariation {
  spinId: string;
  skuId: string;
  displayName: string;
  brandName: string;
  imageUrl?: string;

  quantityDescription: string;

  price: {
    mrp: number;
    offerPrice: number;
    unitLevelPrice?: string;
  };

  isInStockAndAvailable: boolean;
}

export interface InstamartProduct {
  productId: string;
  displayName: string;
  brand: string;
  inStock: boolean;
  isAvail: boolean;
  variations: InstamartVariation[];
}

/** A restaurant, with text that is ready to show on screen. */
export interface SwiggyRestaurant {
  id: string;
  name: string;
  imageUrl?: string;
  cuisines?: string[];
  areaName?: string;
  /** e.g. "30 mins" */
  deliveryText?: string;
  /** e.g. "2.1 km" */
  distanceText?: string;
  /** e.g. "₹400 for two" */
  costForTwoText?: string;
  /** A short offer line such as "20% off up to ₹50" */
  offer?: string;
  /** True for pure-veg restaurants */
  veg?: boolean;
  isOpen: boolean;
}

/** The most of one product a person can add from our modal (they can change it in Instamart later). */
export const MAX_CART_QUANTITY = 9;

/* ------------------------------------------------------------------ */
/* Requests                                                            */
/* ------------------------------------------------------------------ */

const NOT_CONNECTED = "SWIGGY_NOT_CONNECTED";

const GENERIC_ERROR = "Something went wrong. Please try again.";
const BUSY_ERROR = "Swiggy is busy right now. Please try again in a moment.";
const OFFLINE_ERROR =
  "Couldn't reach Swiggy. Check your connection and try again.";

const LOGIN_ATTEMPT_KEY = "rasoi:swiggy-login-attempt";
const LOGIN_RETRY_WINDOW_MS = 2 * 60 * 1000;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

const errorText = (value: unknown): string => {
  if (typeof value === "string") return value;

  const message = (value as { message?: unknown } | null)?.message;
  return typeof message === "string" ? message : "";
};

interface RequestOptions {
  /** How many times to retry when Swiggy says "busy" (429 / 503). Only use for read-only calls. */
  retries?: number;
  /** What to tell the person if it fails. Technical details go to the console only. */
  fallbackError?: string;
}

/**
 * Every failure becomes a short, friendly message. The real reason is written
 * to the console for us, never shown to the person. The one exception is the
 * SWIGGY_NOT_CONNECTED code, which the app uses to start the login.
 */
async function getApiResponse<T>(
  url: string,
  init?: RequestInit,
  { retries = 0, fallbackError = GENERIC_ERROR }: RequestOptions = {}
): Promise<T> {
  let attempt = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let response: Response;

    try {
      response = await fetch(url, init);
    } catch (error) {
      console.error("Swiggy request failed:", url, error);
      throw new Error(OFFLINE_ERROR);
    }

    const text = await response.text();

    const isBusy = response.status === 429 || response.status === 503;

    if (isBusy && attempt < retries) {
      attempt += 1;
      // Kept short: Swiggy's MCP layer doesn't enforce rate limits yet (a
      // shed request surfaces as a plain busy/unavailable response), so a
      // snappier backoff here just means a snappier retry, not more load.
      await sleep(400 * attempt);
      continue;
    }

    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      // Under plain `npm run dev` the /api files are served as source code.
      const looksLikeSource = /^\s*(import|export|function|const|async)\b/.test(
        text
      );

      console.error(
        looksLikeSource
          ? "The Swiggy API isn't running. Start the app with `vercel dev` instead of `npm run dev`."
          : `Swiggy API returned invalid JSON (${url}):`,
        text.slice(0, 200)
      );

      throw new Error(fallbackError);
    }

    if (!response.ok) {
      const serverMessage = errorText(data?.error) || errorText(data?.message);

      if (serverMessage === NOT_CONNECTED) {
        throw new Error(NOT_CONNECTED);
      }

      console.error(
        "Swiggy request failed:",
        url,
        response.status,
        serverMessage
      );

      throw new Error(response.status === 429 ? BUSY_ERROR : fallbackError);
    }

    // A working call means we are signed in: allow a fresh login later if it expires
    try {
      sessionStorage.removeItem(LOGIN_ATTEMPT_KEY);
    } catch {
      /* ignore storage problems */
    }

    return data as T;
  }
}

/* ------------------------------------------------------------------ */
/* Login                                                               */
/* ------------------------------------------------------------------ */

/**
 * Sends the person to sign in with Swiggy.
 *
 * Returns false (and does nothing) if we already sent them a moment ago and
 * they still aren't signed in, so a login problem can never turn into an
 * endless loop of redirects.
 */
export const startSwiggyLogin = (): boolean => {
  try {
    const lastAttempt = Number(sessionStorage.getItem(LOGIN_ATTEMPT_KEY) ?? 0);

    if (Date.now() - lastAttempt < LOGIN_RETRY_WINDOW_MS) {
      return false;
    }

    sessionStorage.setItem(LOGIN_ATTEMPT_KEY, String(Date.now()));
  } catch {
    /* ignore storage problems */
  }

  window.location.href = "/api/swiggy/auth/start";
  return true;
};

/* ------------------------------------------------------------------ */
/* Addresses                                                           */
/* ------------------------------------------------------------------ */

export const getSwiggyAddresses = async (): Promise<SwiggyAddress[]> => {
  const response = await getApiResponse<any>(
    "/api/swiggy/addresses",
    undefined,
    {
      retries: 2,
      fallbackError: "Couldn't load your Swiggy addresses. Please try again.",
    }
  );

  return response?.result?.structuredContent?.addresses ?? [];
};

/* ------------------------------------------------------------------ */
/* Instamart                                                           */
/* ------------------------------------------------------------------ */

export const searchInstamartProducts = async (
  addressId: string,
  query: string
): Promise<InstamartProduct[]> => {
  const response = await getApiResponse<any>(
    "/api/swiggy/search-products",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId, query }),
    },
    {
      retries: 2,
      fallbackError: "Couldn't check Instamart right now. Please try again.",
    }
  );

  return response?.result?.structuredContent?.products ?? [];
};

export interface InstamartCartItem {
  spinId: string;
  skuId: string;
  quantity: number;
}

export const addToInstamartCart = async (
  addressId: string,
  items: InstamartCartItem[]
) => {
  // No retries here: we never want to risk sending a cart update twice.
  const data = await getApiResponse<any>(
    "/api/swiggy/add-to-cart",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId, items }),
    },
    {
      fallbackError: "Couldn't update your Instamart cart. Please try again.",
    }
  );

  if (data?.success !== true) {
    console.error("Instamart cart update was not confirmed:", data?.error);
    throw new Error("Couldn't update your Instamart cart. Please try again.");
  }

  return data;
};

/* ------------------------------------------------------------------ */
/* Restaurants                                                         */
/* ------------------------------------------------------------------ */

const toDisplayCost = (value: unknown): string | undefined => {
  if (value === undefined || value === null || value === "") return undefined;

  if (typeof value === "number") return `₹${value} for two`;

  const text = String(value).trim();
  const withSymbol = /^\d/.test(text) ? `₹${text}` : text;

  return /for two/i.test(withSymbol) ? withSymbol : `${withSymbol} for two`;
};

const normalizeRestaurant = (raw: any): SwiggyRestaurant => {
  const minutes =
    typeof raw?.deliveryTimeMinutes === "number"
      ? raw.deliveryTimeMinutes
      : undefined;

  const deliveryText =
    raw?.deliveryTimeRange ||
    (minutes ? `${minutes} mins` : undefined) ||
    (typeof raw?.eta === "string" ? raw.eta : undefined);

  const distanceText =
    typeof raw?.distanceKm === "number"
      ? `${raw.distanceKm.toFixed(1)} km`
      : typeof raw?.distance === "string"
        ? raw.distance
        : undefined;

  return {
    id: String(raw?.id ?? raw?.restaurantId ?? raw?.name ?? Math.random()),
    name: String(raw?.name ?? "Restaurant"),
    imageUrl: raw?.imageUrl || raw?.image || undefined,
    cuisines: Array.isArray(raw?.cuisines) ? raw.cuisines : undefined,
    areaName: raw?.areaName || undefined,
    deliveryText,
    distanceText,
    costForTwoText: toDisplayCost(raw?.costForTwo),
    offer: raw?.offer || undefined,
    veg: typeof raw?.veg === "boolean" ? raw.veg : undefined,
    isOpen:
      raw?.availabilityStatus === undefined ||
      raw?.availabilityStatus === "OPEN",
  };
};

export const searchRestaurants = async (
  addressId: string,
  query: string
): Promise<SwiggyRestaurant[]> => {
  const response = await getApiResponse<any>(
    "/api/swiggy/search-restaurants",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId, query }),
    },
    {
      retries: 2,
      fallbackError: "Couldn't find restaurants right now. Please try again.",
    }
  );

  const restaurants: SwiggyRestaurant[] = (
    response?.result?.structuredContent?.restaurants ?? []
  ).map(normalizeRestaurant);

  // Open restaurants first; closed ones stay visible but at the end
  return [
    ...restaurants.filter((restaurant) => restaurant.isOpen),
    ...restaurants.filter((restaurant) => !restaurant.isOpen),
  ];
};

export const addDishToFoodCart = async (
  addressId: string,
  restaurantId: string,
  restaurantName: string,
  dishName: string
) => {
  // No retries here: a food cart update should never risk being sent twice.
  const data = await getApiResponse<any>(
    "/api/swiggy/add-dish-to-food-cart",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addressId,
        restaurantId,
        restaurantName,
        dishName,
      }),
    },
    {
      fallbackError:
        "Couldn't add this dish to your Swiggy cart. Please try again.",
    }
  );

  if (data?.success !== true) {
    console.error(
      "Food cart update was not confirmed:",
      data?.error
    );
    throw new Error(
      "Couldn't add this dish to your Swiggy cart. Please try again."
    );
  }

  return data;
};
