export interface MockCartItem {
  ingredientName: string;
  matchedProduct: string;
  price: number;
  quantity: string;
  available: boolean;
}

export interface MockRestaurant {
  name: string;
  rating: number;
  eta: string;
  priceForOne: number;
  matchedDish: string;
}

const fakeDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Strips extra parenthetical detail so mock product names look realistic
const cleanProductName = (name: string): string => {
  return name.split('(')[0].trim();
};

export const addIngredientsToInstamartCart = async (
  ingredients: { amount: string; commonName: string; englishName: string }[]
): Promise<MockCartItem[]> => {
  await fakeDelay(1200);
  return ingredients.map((ing) => {
    const cleanName = cleanProductName(ing.englishName);
    return {
      ingredientName: `${ing.commonName} (${ing.englishName})`,
      matchedProduct: `${cleanName} - 1 pack`,
      price: Math.floor(Math.random() * 80) + 20,
      quantity: ing.amount,
      available: Math.random() > 0.15,
    };
  });
};

export const findRestaurantsForDish = async (
  dishName: string
): Promise<MockRestaurant[]> => {
  await fakeDelay(1000);
  const fakeRestaurantNames = ["Spice Route Kitchen", "Desi Tadka", "The Curry Leaf", "Ghar Ka Khana", "Namak Swaad Anusaar"];
  return fakeRestaurantNames.slice(0, 3).map((name) => ({
    name,
    rating: +(3.8 + Math.random() * 1.2).toFixed(1),
    eta: `${20 + Math.floor(Math.random() * 25)} mins`,
    priceForOne: Math.floor(Math.random() * 150) + 150,
    matchedDish: dishName,
  }));
};