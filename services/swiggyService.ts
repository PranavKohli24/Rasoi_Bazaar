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
  /** e.g. "Opens next at 6 am, today" — only present when closed */
  nextOpenText?: string;
}

/** The most of one product a person can add from our modal (they can change it in Instamart later). */
export const MAX_CART_QUANTITY = 9;

/** ---- Cart review (pre-checkout) ---- */

export interface InstamartCartLineItem {
  name: string;
  quantity: number;
  price?: string;
}

export interface InstamartBillLineItem {
  label: string;
  value: string;
}

export interface InstamartBill {
  lineItems: InstamartBillLineItem[];
  toPay: InstamartBillLineItem;
}

export interface InstamartCartSummary {
  items: InstamartCartLineItem[];
  bill: InstamartBill | null;
  minOrderNotMet: boolean;
  minOrderPaise: number;
}

/** ---- Food cart review (pre-checkout) ----
 * Mirrors InstamartCartSummary, but the limit runs the other way: Swiggy
 * food orders (Builders Club, v1) have a hard ₹1000 *ceiling* rather than
 * a minimum, so this tracks "over the cap" instead of "under the minimum".
 */
export interface SwiggyFoodCartSummary {
  items: InstamartCartLineItem[];
  bill: InstamartBill | null;
  exceedsMaxOrder: boolean;
  maxOrderPaise: number;
}

export interface FoodCheckoutResult {
  orderId: string;
}

/** ---- Checkout ---- */

export interface InstamartCheckoutResult {
  orderId: string;
  verifiedViaOrderHistory: boolean;
}

/** ---- Order tracking ---- */

export interface InstamartTrackedOrder {
  orderId: string;
  orderTitle?: string;
  orderSubtitle?: string;
  status?: { statusMessage?: string; subStatusMessage?: string };
  storeInfo?: { name?: string; address?: string };
  deliveryInfo?: { addressLabel?: string; fullAddress?: string };
  items?: { name: string; quantity: number; price: string }[];
  itemCount?: number;
  placedAt?: string;
  /**
   * -1 means "stop polling, this order is in a final state" (e.g.
   * delivered). A positive number is how many seconds to wait before
   * polling again. Confirmed from a real delivered-order response; the
   * in-progress shape (ETA field, intermediate statusMessage values) is
   * not yet confirmed — see the `etaMinutes` field below.
   */
  pollingIntervalSeconds?: number;
  /**
   * PLACEHOLDER — the real field carrying a live ETA for an in-progress
   * order hasn't been confirmed yet (we've only seen a delivered-order
   * response, which has no ETA left to report). Once you track a real
   * in-progress order, check `raw` below for the actual field and wire
   * it in here.
   */
  etaMinutes?: number | null;
  /** The unprocessed structuredContent, so nothing is lost while field
   * names above get confirmed against real responses. */
  raw?: unknown;
}

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

  window.location.href = "/api/swiggy/start";
  return true;
};

/**
 * A person-initiated retry — e.g. tapping "Sign in to Swiggy" after the
 * throttle in startSwiggyLogin blocked an automatic redirect. A deliberate
 * tap isn't a loop, so this clears the throttle and redirects immediately.
 */
export const retrySwiggyLogin = (): void => {
  try {
    sessionStorage.setItem(LOGIN_ATTEMPT_KEY, String(Date.now()));
  } catch {
    /* ignore storage problems */
  }
  window.location.href = "/api/swiggy/start";
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
  const data = await getApiResponse<any>(
    "/api/swiggy/instamart-cart",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", addressId, items }),
    },
    { fallbackError: "Couldn't update your Instamart cart. Please try again." }
  );

  if (data?.success !== true) {
    console.error("Instamart cart update was not confirmed:", data?.error);
    throw new Error("Couldn't update your Instamart cart. Please try again.");
  }

  return data;
};

export const checkoutInstamartOrder = async (): Promise<InstamartCheckoutResult> => {
  const data = await getApiResponse<any>(
    "/api/swiggy/instamart-cart",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "checkout", paymentMethod: "COD" }),
    },
    { fallbackError: "Couldn't place your order. Please try again." }
  );

  if (data?.success !== true || !data?.orderId) {
    console.error("Instamart checkout was not confirmed:", data?.error);
    throw new Error("Couldn't place your order. Please try again.");
  }

  return {
    orderId: String(data.orderId),
    verifiedViaOrderHistory: Boolean(data.verifiedViaOrderHistory),
  };
};

/**
 * The cart review step, right before checkout: what's in it, the bill, and
 * whether the ₹99 Instamart minimum has been met.
 */
export const getInstamartCart = async (): Promise<InstamartCartSummary> => {
  const data = await getApiResponse<any>(
    "/api/swiggy/instamart-cart",
    undefined,
    {
      retries: 1,
      fallbackError: "Couldn't load your cart. Please try again.",
    }
  );

  if (data?.success !== true) {
    throw new Error("Couldn't load your cart. Please try again.");
  }

  return {
    items: data.items ?? [],
    bill: data.bill ?? null,
    minOrderNotMet: Boolean(data.minOrderNotMet),
    minOrderPaise: data.minOrderPaise ?? 9900,
  };
};

/* ------------------------------------------------------------------ */
/* Mock order tracking — dev/testing only, never hits Swiggy           */
/* ------------------------------------------------------------------ */

const MOCK_ITEMS = [
  { name: "1 x Cadbury Bournville Rich Cocoa 70% Dark Chocolate Bar", quantity: 1, price: "₹142" },
  { name: "1 x Harvest Gold White Bread", quantity: 1, price: "₹35" },
  { name: "1 x NOICE Freshly Ground Sharbati Atta (Whole Wheat Flour)", quantity: 1, price: "₹1" },
  { name: "2 x Cadbury Oreo Strawberry Flavour Crème Sandwich Biscuit", quantity: 1, price: "₹20" },
  { name: "4 x Amul Taaza Milk 1 Ltr", quantity: 1, price: "₹232" },
  { name: "1 x Supreme Harvest Crystal Sugar", quantity: 1, price: "₹68" },
];

const MOCK_ORDER_STAGES: any[] = [
  {
    orderTitle: "Instamart order",
    orderSubtitle: "06:48 PM • 6 items",
    status: { statusMessage: "Order Placed" },
    storeInfo: { name: "Instamart", address: "UGF, Azadpur, A-78 Industrial area near Hand Cinema Delhi-110009" },
    deliveryInfo: { addressLabel: "Home", fullAddress: "House Number 12, Ishwar Colony, Ishwar Colony, Kalyan Vihar, Delhi, 110033, India" },
    items: MOCK_ITEMS,
    itemCount: 6,
    placedAt: "06:48 PM",
    pollingIntervalSeconds: 5,
  },
  {
    orderTitle: "Instamart order",
    orderSubtitle: "06:48 PM • 6 items",
    status: { statusMessage: "Packing your order" },
    storeInfo: { name: "Instamart", address: "UGF, Azadpur, A-78 Industrial area near Hand Cinema Delhi-110009" },
    deliveryInfo: { addressLabel: "Home", fullAddress: "House Number 12, Ishwar Colony, Ishwar Colony, Kalyan Vihar, Delhi, 110033, India" },
    items: MOCK_ITEMS,
    itemCount: 6,
    placedAt: "06:48 PM",
    pollingIntervalSeconds: 5,
  },
  {
    orderId: "250780698930835",
    orderTitle: "Instamart order",
    orderSubtitle: "06:48 PM • 6 items",
    status: {
      statusMessage: "Out for delivery",
      subStatusMessage: "AVINASH KUMAR is on the way to deliver your order",
      etaMinutes: 10,
      etaText: "10 mins",
    },
    storeInfo: { name: "Instamart", address: "UGF, Azadpur, A-78 Industrial area near Hand Cinema Delhi-110009" },
    deliveryInfo: { addressLabel: "Home", fullAddress: "House Number 12, Ishwar Colony, Ishwar Colony, Kalyan Vihar, Delhi, 110033, India" },
    items: MOCK_ITEMS,
    itemCount: 6,
    placedAt: "06:48 PM",
    pollingIntervalSeconds: 30,
  },
  {
    orderId: "250780698930835",
    orderTitle: "Instamart order",
    orderSubtitle: "06:48 PM • 6 items",
    status: {
      statusMessage: "Out for delivery",
      subStatusMessage: "AVINASH KUMAR is on the way to deliver your order",
      etaMinutes: 4,
      etaText: "4 mins",
    },
    storeInfo: { name: "Instamart", address: "UGF, Azadpur, A-78 Industrial area near Hand Cinema Delhi-110009" },
    deliveryInfo: { addressLabel: "Home", fullAddress: "House Number 12, Ishwar Colony, Ishwar Colony, Kalyan Vihar, Delhi, 110033, India" },
    items: MOCK_ITEMS,
    itemCount: 6,
    placedAt: "06:48 PM",
    pollingIntervalSeconds: 30,
  },
  {
    orderId: "250780698930835",
    orderTitle: "Instamart order",
    orderSubtitle: "06:48 PM • 6 items",
    status: { statusMessage: "Arrived at location", subStatusMessage: "AVINASH KUMAR has reached your location" },
    storeInfo: { name: "Instamart", address: "UGF, Azadpur, A-78 Industrial area near Hand Cinema Delhi-110009" },
    deliveryInfo: { addressLabel: "Home", fullAddress: "House Number 12, Ishwar Colony, Ishwar Colony, Kalyan Vihar, Delhi, 110033, India" },
    items: MOCK_ITEMS,
    itemCount: 6,
    placedAt: "06:48 PM",
    pollingIntervalSeconds: 30,
  },
  {
    orderId: "250780698930835",
    orderTitle: "Instamart order",
    orderSubtitle: "06:48 PM • 6 items",
    status: { statusMessage: "Order Delivered" },
    storeInfo: { name: "Instamart", address: "UGF, Azadpur, A-78 Industrial area near Hand Cinema Delhi-110009" },
    deliveryInfo: { addressLabel: "Delivered to Home", fullAddress: "House Number 12, Ishwar Colony, Ishwar Colony, Kalyan Vihar, Delhi, 110033, India" },
    items: MOCK_ITEMS,
    itemCount: 6,
    placedAt: "06:48 PM",
    pollingIntervalSeconds: -1,
  },
];

const mockOrderProgress = new Map<string, number>();

export const isMockOrderId = (orderId: string) => orderId.startsWith("MOCK-");

const trackMockInstamartOrder = async (orderId: string): Promise<InstamartTrackedOrder> => {
  await sleep(400);
  const i = mockOrderProgress.get(orderId) ?? 0;
  const tracking = MOCK_ORDER_STAGES[Math.min(i, MOCK_ORDER_STAGES.length - 1)];
  mockOrderProgress.set(orderId, i + 1);

  return {
    orderId,
    orderTitle: tracking.orderTitle,
    orderSubtitle: tracking.orderSubtitle,
    status: tracking.status,
    storeInfo: tracking.storeInfo,
    deliveryInfo: tracking.deliveryInfo,
    items: tracking.items,
    itemCount: tracking.itemCount,
    placedAt: tracking.placedAt,
    pollingIntervalSeconds: tracking.pollingIntervalSeconds,
    etaMinutes: tracking.status?.etaMinutes ?? null,
    raw: tracking,
  };
};

/**
 * Live status for one Instamart order. Poll no faster than every 10
 * seconds (per Swiggy's own guidance), and stop entirely once
 * `pollingIntervalSeconds` comes back as -1 — that's the signal the order
 * has reached a final state (e.g. delivered).
 */
export const trackInstamartOrder = async (
  orderId: string
): Promise<InstamartTrackedOrder> => {
  if (isMockOrderId(orderId)) return trackMockInstamartOrder(orderId);
  const data = await getApiResponse<any>(
    `/api/swiggy/track-instamart-order?orderId=${encodeURIComponent(orderId)}`,
    undefined,
    {
      fallbackError: "Couldn't check your order status. Please try again.",
    }
  );

  if (data?.success !== true) {
    throw new Error("Couldn't check your order status. Please try again.");
  }

  const tracking = data.tracking ?? {};

  return {
    orderId: String(tracking.orderId ?? orderId),
    orderTitle: tracking.orderTitle,
    orderSubtitle: tracking.orderSubtitle,
    status: tracking.status,
    storeInfo: tracking.storeInfo,
    deliveryInfo: tracking.deliveryInfo,
    items: tracking.items,
    itemCount: tracking.itemCount,
    placedAt: tracking.placedAt,
    pollingIntervalSeconds: tracking.pollingIntervalSeconds,
    // PLACEHOLDER — see the InstamartTrackedOrder.etaMinutes comment above.
    etaMinutes: tracking.status?.etaMinutes ?? null,
    raw: tracking,
  };
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
    nextOpenText: typeof raw?.nextOpenTime === "string" ? raw.nextOpenTime : undefined,
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

/**
 * The food-cart review step, right before checkout: what's in it, the
 * bill, and whether the ₹1000 Builders Club cap has been exceeded. Unlike
 * Instamart's cart (tied to the session), the food cart is tied to a
 * restaurant + address, so addressId is required here.
 */
export const getFoodCart = async (
  addressId: string
): Promise<SwiggyFoodCartSummary> => {
  const data = await getApiResponse<any>(
    `/api/swiggy/food-cart?addressId=${encodeURIComponent(addressId)}`,
    undefined,
    {
      retries: 1,
      fallbackError: "Couldn't load your Swiggy cart. Please try again.",
    }
  );

  if (data?.success !== true) {
    throw new Error("Couldn't load your Swiggy cart. Please try again.");
  }

  return {
    items: data.items ?? [],
    bill: data.bill ?? null,
    exceedsMaxOrder: Boolean(data.exceedsMaxOrder),
    maxOrderPaise: data.maxOrderPaise ?? 100000,
  };
};

export const checkoutFoodOrder = async (
  addressId: string
): Promise<FoodCheckoutResult> => {
  const data = await getApiResponse<any>(
    "/api/swiggy/food-cart",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "checkout", addressId, paymentMethod: "COD" }),
    },
    { fallbackError: "Couldn't place your order. Please try again." }
  );

  if (data?.success !== true || !data?.orderId) {
    console.error("Food checkout was not confirmed:", data?.error);
    throw new Error("Couldn't place your order. Please try again.");
  }

  return { orderId: String(data.orderId) };
};

/**
 * Live status for one food order. Same polling rules as Instamart: no
 * faster than every 10 seconds, stop once `pollingIntervalSeconds` is -1.
 */
export const trackFoodOrder = async (
  orderId: string
): Promise<InstamartTrackedOrder> => {
  const data = await getApiResponse<any>(
    `/api/swiggy/track-food-order?orderId=${encodeURIComponent(orderId)}`,
    undefined,
    {
      fallbackError: "Couldn't check your order status. Please try again.",
    }
  );

  if (data?.success !== true) {
    throw new Error("Couldn't check your order status. Please try again.");
  }

  const tracking = data.tracking ?? {};

  return {
    orderId: String(tracking.orderId ?? orderId),
    orderTitle: tracking.orderTitle,
    orderSubtitle: tracking.orderSubtitle,
    status: tracking.status,
    storeInfo: tracking.storeInfo,
    deliveryInfo: tracking.deliveryInfo,
    items: tracking.items,
    itemCount: tracking.itemCount,
    placedAt: tracking.placedAt,
    pollingIntervalSeconds: tracking.pollingIntervalSeconds,
    etaMinutes: tracking.etaMinutes ?? tracking.eta ?? null,
    raw: tracking,
  };
};