import { DineoutRestaurant } from "../services/dineoutService";

export type CuisineChoice = "Italian" | "North Indian" | "Chinese" | "Japanese" | "Any";
export type BudgetChoice = "under500" | "500to1000" | "any";

export interface NegotiatorPerson {
  id: string;
  name: string;
  avatarIndex: number;
  cuisine: CuisineChoice;
  budget: BudgetChoice;
  note: string;
  answered: boolean;
}

export interface RestaurantMatch {
  restaurant: DineoutRestaurant;
  matchCount: number;
  totalPeople: number;
  matchedNames: string[];
}

export const CUISINE_OPTIONS: CuisineChoice[] = ["Italian", "North Indian", "Chinese", "Japanese", "Any"];
export const BUDGET_OPTIONS: BudgetChoice[] = ["under500", "500to1000", "any"];

export const BUDGET_LABELS: Record<BudgetChoice, string> = {
  under500: "Under ₹500",
  "500to1000": "₹500–1000",
  any: "Any budget",
};

function parsePerPersonCost(costForTwo: string): number | null {
  const match = costForTwo.match(/[\d,]+/);
  if (!match) return null;
  const total = Number(match[0].replace(/,/g, ""));
  return Number.isFinite(total) ? total / 2 : null;
}

function matchesCuisine(restaurantCuisines: string[], pick: CuisineChoice): boolean {
  if (pick === "Any") return true;
  const normalized = pick.toLowerCase();
  return restaurantCuisines.some((c) => c.toLowerCase().includes(normalized));
}

function matchesBudget(costForTwo: string, pick: BudgetChoice): boolean {
  if (pick === "any") return true;
  const perPerson = parsePerPersonCost(costForTwo);
  if (perPerson === null) return true; // unknown cost — don't penalize the restaurant
  return pick === "under500" ? perPerson < 500 : perPerson >= 500 && perPerson <= 1000;
}

function scoreRestaurant(restaurant: DineoutRestaurant, people: NegotiatorPerson[]): RestaurantMatch {
  const matchedNames: string[] = [];
  for (const person of people) {
    if (matchesCuisine(restaurant.cuisine, person.cuisine) && matchesBudget(restaurant.costForTwo, person.budget)) {
      matchedNames.push(person.name);
    }
  }
  return { restaurant, matchCount: matchedNames.length, totalPeople: people.length, matchedNames };
}

/** Ranks restaurants by how many people they satisfy, highest first;
 *  ties broken by rating. Dedupes restaurants that showed up under
 *  multiple cuisine searches. */
export function rankRestaurants(restaurants: DineoutRestaurant[], people: NegotiatorPerson[]): RestaurantMatch[] {
  const scored = restaurants.map((r) => scoreRestaurant(r, people));
  const byId = new Map<string, RestaurantMatch>();

  for (const match of scored) {
    const existing = byId.get(match.restaurant.id);
    if (!existing || match.matchCount > existing.matchCount) {
      byId.set(match.restaurant.id, match);
    }
  }

  return Array.from(byId.values()).sort((a, b) => {
    if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
    return Number(b.restaurant.ratingValue ?? 0) - Number(a.restaurant.ratingValue ?? 0);
  });
}

/** Distinct specific cuisine picks (excludes "Any"), used to decide
 *  which search queries to run. */
export function distinctCuisinePicks(people: NegotiatorPerson[]): string[] {
  return Array.from(new Set(people.map((p) => p.cuisine).filter((c): c is CuisineChoice => c !== "Any")));
}