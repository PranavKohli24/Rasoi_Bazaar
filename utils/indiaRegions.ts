import { predefinedRecipes } from "../data/predefinedRecipes";
import { Recipe } from "../types";

export interface IndiaRegion {
  name: string;
  slug: string;
  /** 2-letter code used by react-svgmap-india to identify this state/UT */
  code: string;
  cities: string[];
  /** Only set for the handful of states featured in "Popular destinations" */
  coverImage?: string;
}

// code -> name comes straight from react-svgmap-india's own state list, so
// clicking any state on the real map will always resolve to a real region.
export const INDIA_REGIONS: IndiaRegion[] = [
  { name: "Andaman and Nicobar Islands", slug: "andaman-and-nicobar-islands", code: "AN", cities: ["Port Blair"] },
  { name: "Andhra Pradesh", slug: "andhra-pradesh", code: "AP", cities: ["Visakhapatnam", "Vijayawada", "Tirupati"] },
  { name: "Arunachal Pradesh", slug: "arunachal-pradesh", code: "AR", cities: ["Itanagar", "Tawang"] },
  { name: "Assam", slug: "assam", code: "AS", cities: ["Guwahati", "Dibrugarh"] },
  { name: "Bihar", slug: "bihar", code: "BR", cities: ["Patna", "Gaya", "Bodh Gaya"] },
  { name: "Chandigarh", slug: "chandigarh", code: "CH", cities: ["Chandigarh"] },
  { name: "Chhattisgarh", slug: "chhattisgarh", code: "CT", cities: ["Raipur", "Bilaspur"] },
  { name: "Dadra and Nagar Haveli and Daman and Diu", slug: "dadra-nagar-haveli-daman-diu", code: "DD", cities: ["Daman", "Diu", "Silvassa"] },
  { name: "Delhi", slug: "delhi", code: "DL", cities: ["New Delhi"] },
  { name: "Goa", slug: "goa", code: "GA", cities: ["Panaji", "Margao"] },
  {
    name: "Gujarat",
    slug: "gujarat",
    code: "GJ",
    cities: ["Ahmedabad", "Dwarka", "Somnath"],
    coverImage: "/destinations/gujarat.webp",
  },
  {
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    code: "HP",
    cities: ["Shimla", "Manali", "Dharamshala"],
    coverImage: "/destinations/himachal.webp",
  },
  { name: "Haryana", slug: "haryana", code: "HR", cities: ["Gurugram", "Kurukshetra"] },
  { name: "Jharkhand", slug: "jharkhand", code: "JH", cities: ["Ranchi", "Jamshedpur"] },
  {
    name: "Jammu and Kashmir",
    slug: "jammu-kashmir",
    code: "JK",
    cities: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
    coverImage: "/destinations/kashmir.webp",
  },
  { name: "Karnataka", slug: "karnataka", code: "KA", cities: ["Bengaluru", "Mysuru", "Hampi"] },
  {
    name: "Kerala",
    slug: "kerala",
    code: "KL",
    cities: ["Kochi", "Alappuzha", "Munnar"],
    coverImage: "/destinations/kerala.webp",
  },
  { name: "Ladakh", slug: "ladakh", code: "LA", cities: ["Leh", "Kargil"] },
  { name: "Lakshadweep", slug: "lakshadweep", code: "LD", cities: ["Kavaratti"] },
  { name: "Maharashtra", slug: "maharashtra", code: "MH", cities: ["Mumbai", "Pune", "Nagpur"] },
  { name: "Meghalaya", slug: "meghalaya", code: "ML", cities: ["Shillong", "Cherrapunji"] },
  { name: "Manipur", slug: "manipur", code: "MN", cities: ["Imphal"] },
  { name: "Madhya Pradesh", slug: "madhya-pradesh", code: "MP", cities: ["Bhopal", "Indore", "Ujjain"] },
  { name: "Mizoram", slug: "mizoram", code: "MZ", cities: ["Aizawl"] },
  { name: "Nagaland", slug: "nagaland", code: "NL", cities: ["Kohima", "Dimapur"] },
  { name: "Odisha", slug: "odisha", code: "OR", cities: ["Bhubaneswar", "Puri", "Konark"] },
  { name: "Punjab", slug: "punjab", code: "PB", cities: ["Amritsar", "Chandigarh", "Ludhiana"] },
  { name: "Puducherry", slug: "puducherry", code: "PY", cities: ["Puducherry"] },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    code: "RJ",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"],
    coverImage: "/destinations/rajasthan.webp",
  },
  { name: "Sikkim", slug: "sikkim", code: "SK", cities: ["Gangtok"] },
  { name: "Telangana", slug: "telangana", code: "TG", cities: ["Hyderabad", "Warangal"] },
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    code: "TN",
    cities: ["Chennai", "Madurai", "Coimbatore", "Rameswaram"],
    coverImage: "/destinations/tamil-nadu.webp",
  },
  { name: "Tripura", slug: "tripura", code: "TR", cities: ["Agartala"] },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", code: "UP", cities: ["Lucknow", "Varanasi", "Agra"] },
  { name: "Uttarakhand", slug: "uttarakhand", code: "UT", cities: ["Dehradun", "Rishikesh", "Nainital"] },
  { name: "West Bengal", slug: "west-bengal", code: "WB", cities: ["Kolkata", "Darjeeling"] },
];

// The handful shown as photo cards in "Popular destinations" on the landing view.
export const POPULAR_REGION_SLUGS = [
  "rajasthan",
  "jammu-kashmir",
  "kerala",
  "himachal-pradesh",
  "tamil-nadu",
  "gujarat",
];

export const POPULAR_REGIONS = INDIA_REGIONS.filter((r) =>
  POPULAR_REGION_SLUGS.includes(r.slug)
);

export function findRegionBySlug(slug: string): IndiaRegion | undefined {
  return INDIA_REGIONS.find((r) => r.slug === slug.toLowerCase());
}

export function findRegionByQuery(query: string): IndiaRegion | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;

  return INDIA_REGIONS.find(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cities.some((city) => city.toLowerCase().includes(q))
  );
}

// react-svgmap-india's onClick hands back a "value" — we don't know for
// certain whether that's the 2-letter code or the full name, so this
// matches either one safely.
export function findRegionByMapClickValue(value: string): IndiaRegion | undefined {
  const v = value.trim().toLowerCase();
  return INDIA_REGIONS.find(
    (r) => r.code.toLowerCase() === v || r.name.toLowerCase() === v
  );
}

export function getDishesByState(stateName: string): Recipe[] {
  return Object.values(predefinedRecipes).filter(
    (recipe) => recipe.state?.toLowerCase() === stateName.toLowerCase()
  );
}

export function searchRegions(query: string, limit = 6): IndiaRegion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return INDIA_REGIONS.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cities.some((city) => city.toLowerCase().includes(q))
  ).slice(0, limit);
}