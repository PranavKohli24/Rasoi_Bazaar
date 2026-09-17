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

export interface SwiggyRestaurant {
  id: string;
  name: string;
  rating?: number;
  costForTwo?: number;
  eta?: string;
  distance?: string;
  cuisines?: string[];
  availabilityStatus?: string;
}

async function getApiResponse<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    url,
    options
  );

  const text =
    await response.text();

  let data: any;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Server returned invalid JSON: ${text.slice(
        0,
        200
      )}`
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error ??
        data?.message ??
        "Request failed"
    );
  }

  return data as T;
}

export const startSwiggyLogin = () => {
  window.location.href =
    "/api/swiggy/auth/start";
};

export const getSwiggyAddresses =
  async (): Promise<SwiggyAddress[]> => {
    const response =
      await getApiResponse<any>(
        "/api/swiggy/addresses"
      );

    return (
      response?.result
        ?.structuredContent
        ?.addresses ?? []
    );
  };

export const searchInstamartProducts =
  async (
    addressId: string,
    query: string
  ): Promise<InstamartProduct[]> => {
    const response =
      await getApiResponse<any>(
        "/api/swiggy/search-products",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            addressId,
            query,
          }),
        }
      );

    return (
      response?.result
        ?.structuredContent
        ?.products ?? []
    );
  };

  export const searchRestaurants = async (
  addressId: string,
  query: string
): Promise<SwiggyRestaurant[]> => {
  const response = await getApiResponse<any>("/api/swiggy/search-restaurants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ addressId, query }),
  });

  return response?.result?.structuredContent?.restaurants ?? [];
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
  const response = await fetch(
    "/api/swiggy/add-to-cart",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        addressId,
        items,
      }),
    }
  );

  const text =
    await response.text();

  let data: any;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      "Server returned invalid JSON."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.error ??
        "Could not update your Instamart cart."
    );
  }

  if (data?.success !== true) {
    throw new Error(
      data?.error ??
        "Swiggy could not verify the cart update."
    );
  }

  return data;
};