/** Read-only Dineout discovery: search + details. No booking, no auth-gated
 *  cart flow — this is the "explore restaurants" browse feature only. */

export interface DineoutRestaurant {
  id: string;
  name: string;
  cuisine: string[];
  locality: string;
  area: string;
  ratingValue?: string;
  ratingCount?: number;
  costForTwo: string;
  imageUrl?: string;
  distance?: string;
  highlights?: string[];
  dealTitles?: string[];
}

export interface DineoutRestaurantDetails {
  restaurant: {
    id: string;
    name: string;
    cuisines: string[];
    address: string;
    avgRating?: number;
    totalRatings?: string;
    costForTwo: string;
    timings: string;
    offers: string[];
    bankOffers: string[];
  };
  amenities: string[];
}

const GENERIC_ERROR = "Couldn't load restaurants right now. Please try again.";

async function postJson<T>(url: string, body: unknown, fallbackError: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Dineout request failed:", url, error);
    throw new Error("Couldn't reach Swiggy. Check your connection and try again.");
  }

  const text = await response.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("Dineout API returned invalid JSON:", url, text.slice(0, 200));
    throw new Error(fallbackError);
  }

  if (!response.ok || data?.success === false) {
    console.error("Dineout request failed:", url, response.status, data?.error);
    throw new Error(fallbackError);
  }

  return data as T;
}

const normalizeDineoutRestaurant = (raw: any): DineoutRestaurant => ({
  id: String(raw?.id ?? raw?.restaurantId ?? Math.random()),
  name: String(raw?.name ?? "Restaurant"),
  cuisine: Array.isArray(raw?.cuisine) ? raw.cuisine : [],
  locality: raw?.locality ?? "",
  area: raw?.area ?? "",
  ratingValue: raw?.rating?.value,
  ratingCount: raw?.rating?.count,
  costForTwo: raw?.costForTwo ?? "",
  imageUrl: raw?.imageUrl,
  distance: raw?.distance,
  highlights: raw?.highlights,
  dealTitles: (raw?.availableDeals ?? []).map((d: any) => d.dealTitle).filter(Boolean),
});

/**
 * Discovery search for a region. Backend route expected at
 * POST /api/swiggy/dineout-search, proxying to search_restaurants_dineout
 * and returning { success, result: { structuredContent: { restaurants } } }
 * — mirrors the shape /api/swiggy/search-restaurants already returns.
 */
export const searchDineoutRestaurants = async (
  query: string,
  latitude: number,
  longitude: number,
  limit = 10
): Promise<DineoutRestaurant[]> => {
  const data = await postJson<any>(
    "/api/swiggy/dineout",
    { action: "search", query, latitude, longitude, limit },
    GENERIC_ERROR
  );

  const restaurants = data?.result?.structuredContent?.restaurants ?? [];
  return restaurants.map(normalizeDineoutRestaurant);
};

/**
 * Backend route expected at POST /api/swiggy/dineout-details, proxying to
 * get_restaurant_details.
 */
export const getDineoutRestaurantDetails = async (
  restaurantId: string,
  latitude: number,
  longitude: number
): Promise<DineoutRestaurantDetails> => {
  const data = await postJson<any>(
    "/api/swiggy/dineout",
    { action: "details", restaurantId, latitude, longitude },
    "Couldn't load restaurant details. Please try again."
  );

  const payload = data?.result?.structuredContent?.data;
  const raw = payload?.restaurant ?? {};

  return {
    restaurant: {
      id: String(raw.id ?? restaurantId),
      name: raw.name ?? "Restaurant",
      cuisines: raw.cuisines ?? [],
      address: raw.address ?? "",
      avgRating: typeof raw.avgRating === "number" ? raw.avgRating : undefined,
      totalRatings: raw.totalRatings,
      costForTwo: raw.costForTwo ?? "",
      timings: raw.timings ?? "",
      offers: raw.offers ?? [],
      bankOffers: raw.bankOffers ?? [],
    },
    amenities: payload?.amenities ?? [],
  };
};