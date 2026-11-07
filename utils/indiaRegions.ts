import { predefinedRecipes } from "../data/predefinedRecipes";
import { Recipe } from "../types";

export interface IndiaRegion {
  name: string;
  slug: string;
  /** 2-letter code used by react-svgmap-india to identify this state/UT */
  code: string;
  cities: string[];
  /** Cover image displayed for the region */
  coverImage?: string;
}

// code -> name comes straight from react-svgmap-india's own state list.
export const INDIA_REGIONS: IndiaRegion[] = [
  {
    name: "Andaman and Nicobar Islands",
    slug: "andaman-and-nicobar-islands",
    code: "AN",
    cities: ["Port Blair"],
    coverImage: "/regions/andaman.png",
  },
  {
    name: "Andhra Pradesh",
    slug: "andhra-pradesh",
    code: "AP",
    cities: ["Visakhapatnam", "Vijayawada", "Tirupati"],
    coverImage: "/regions/andhra.png",
  },
  {
    name: "Arunachal Pradesh",
    slug: "arunachal-pradesh",
    code: "AR",
    cities: ["Itanagar", "Tawang"],
    coverImage: "/regions/arunachal.png",
  },
  {
    name: "Assam",
    slug: "assam",
    code: "AS",
    cities: ["Guwahati", "Dibrugarh"],
    coverImage: "/regions/assam.png",
  },
  {
    name: "Bihar",
    slug: "bihar",
    code: "BR",
    cities: ["Patna", "Gaya", "Bodh Gaya"],
    coverImage: "/regions/bihar.png",
  },
  {
    name: "Chhattisgarh",
    slug: "chhattisgarh",
    code: "CT",
    cities: ["Raipur", "Bilaspur"],
    coverImage: "/regions/chhattisgarh.png",
  },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    slug: "dadra-nagar-haveli-daman-diu",
    code: "DD",
    cities: ["Daman", "Diu", "Silvassa"],
    coverImage: "/regions/damandiu.png",
  },
  {
    name: "Delhi",
    slug: "delhi",
    code: "DL",
    cities: ["New Delhi"],
    coverImage: "/regions/delhi.png",
  },
  {
    name: "Goa",
    slug: "goa",
    code: "GA",
    cities: ["Panaji", "Margao"],
    coverImage: "/regions/goa.png",
  },
  {
    name: "Gujarat",
    slug: "gujarat",
    code: "GJ",
    cities: ["Ahmedabad", "Dwarka", "Somnath"],
    coverImage: "/regions/gujarat.png",
  },
  {
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    code: "HP",
    cities: ["Shimla", "Manali", "Dharamshala"],
    coverImage: "/regions/himachal.png",
  },
  {
    name: "Haryana",
    slug: "haryana",
    code: "HR",
    cities: ["Gurugram", "Kurukshetra"],
    coverImage: "/regions/haryana.png",
  },
  {
    name: "Jharkhand",
    slug: "jharkhand",
    code: "JH",
    cities: ["Ranchi", "Jamshedpur"],
    coverImage: "/regions/jharkhand.png",
  },
  {
    name: "Jammu and Kashmir",
    slug: "jammu-kashmir",
    code: "JK",
    cities: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
    coverImage: "/regions/kashmir.png",
  },
  {
    name: "Karnataka",
    slug: "karnataka",
    code: "KA",
    cities: ["Bengaluru", "Mysuru", "Hampi"],
    coverImage: "/regions/karnataka.png",
  },
  {
    name: "Kerala",
    slug: "kerala",
    code: "KL",
    cities: ["Kochi", "Alappuzha", "Munnar"],
    coverImage: "/regions/kerala.png",
  },
  {
    name: "Ladakh",
    slug: "ladakh",
    code: "LA",
    cities: ["Leh", "Kargil"],
    coverImage: "/regions/ladakh.png",
  },
  {
    name: "Lakshadweep",
    slug: "lakshadweep",
    code: "LD",
    cities: ["Kavaratti"],
    coverImage: "/regions/lakshadweep.png",
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    code: "MH",
    cities: ["Mumbai", "Pune", "Nagpur"],
    coverImage: "/regions/maharashtra.png",
  },
  {
    name: "Meghalaya",
    slug: "meghalaya",
    code: "ML",
    cities: ["Shillong", "Cherrapunji"],
    coverImage: "/regions/meghalaya.png",
  },
  {
    name: "Manipur",
    slug: "manipur",
    code: "MN",
    cities: ["Imphal"],
    coverImage: "/regions/manipur.png",
  },
  {
    name: "Madhya Pradesh",
    slug: "madhya-pradesh",
    code: "MP",
    cities: ["Bhopal", "Indore", "Ujjain"],
    coverImage: "/regions/madhya.png",
  },
  {
    name: "Mizoram",
    slug: "mizoram",
    code: "MZ",
    cities: ["Aizawl"],
    coverImage: "/regions/mizoram.png",
  },
  {
    name: "Nagaland",
    slug: "nagaland",
    code: "NL",
    cities: ["Kohima", "Dimapur"],
    coverImage: "/regions/nagaland.png",
  },
  {
    name: "Odisha",
    slug: "odisha",
    code: "OR",
    cities: ["Bhubaneswar", "Puri", "Konark"],
    coverImage: "/regions/odisha.png",
  },
  {
    name: "Punjab",
    slug: "punjab",
    code: "PB",
    cities: ["Amritsar", "Chandigarh", "Ludhiana"],
    coverImage: "/regions/punjab.png",
  },
  {
    name: "Puducherry",
    slug: "puducherry",
    code: "PY",
    cities: ["Puducherry"],
    coverImage: "/regions/puducherry.png",
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    code: "RJ",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"],
    coverImage: "/regions/rajasthan.png",
  },
  {
    name: "Sikkim",
    slug: "sikkim",
    code: "SK",
    cities: ["Gangtok"],
    coverImage: "/regions/sikkim.png",
  },
  {
    name: "Telangana",
    slug: "telangana",
    code: "TG",
    cities: ["Hyderabad", "Warangal"],
    coverImage: "/regions/telengana.png",
  },
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    code: "TN",
    cities: ["Chennai", "Madurai", "Coimbatore", "Rameswaram"],
    coverImage: "/regions/tamil-nadu.png",
  },
  {
    name: "Tripura",
    slug: "tripura",
    code: "TR",
    cities: ["Agartala"],
    coverImage: "/regions/tripura.png",
  },
  {
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    code: "UP",
    cities: ["Lucknow", "Varanasi", "Agra"],
    coverImage: "/regions/uttar.png",
  },
  {
    name: "Uttarakhand",
    slug: "uttarakhand",
    code: "UT",
    cities: ["Dehradun", "Rishikesh", "Nainital"],
    coverImage: "/regions/uttarakhand.png",
  },
  {
    name: "West Bengal",
    slug: "west-bengal",
    code: "WB",
    cities: ["Kolkata", "Darjeeling"],
    coverImage: "/regions/bengal.png",
  },
];

// Regions shown as photo cards in "Popular destinations".
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

export function findRegionBySlug(
  slug: string
): IndiaRegion | undefined {
  return INDIA_REGIONS.find(
    (r) => r.slug === slug.toLowerCase()
  );
}

export function findRegionByQuery(
  query: string
): IndiaRegion | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;

  return INDIA_REGIONS.find(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cities.some((city) => city.toLowerCase().includes(q))
  );
}

// Matches either the 2-letter code or the full region name.
export function findRegionByMapClickValue(
  value: string
): IndiaRegion | undefined {
  const v = value.trim().toLowerCase();

  return INDIA_REGIONS.find(
    (r) =>
      r.code.toLowerCase() === v ||
      r.name.toLowerCase() === v
  );
}

export function getDishesByState(
  stateName: string
): Recipe[] {
  return Object.values(predefinedRecipes).filter(
    (recipe) =>
      recipe.state?.toLowerCase() === stateName.toLowerCase()
  );
}

export function searchRegions(
  query: string,
  limit = 6
): IndiaRegion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return INDIA_REGIONS.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cities.some((city) => city.toLowerCase().includes(q))
  ).slice(0, limit);
}

// In-memory cache so repeated lookups for the same place don't re-hit the API.
const geocodeCache = new Map<string, IndiaRegion[]>();

function matchRegionByStateName(stateName: string): IndiaRegion | undefined {
  const s = stateName.toLowerCase();
  return INDIA_REGIONS.find(
    (r) =>
      r.name.toLowerCase() === s ||
      s.includes(r.name.toLowerCase()) ||
      r.name.toLowerCase().includes(s)
  );
}

// Falls back to real geocoding for any place name not in our hardcoded
// `cities` lists — covers the thousands of towns/cities we can't realistically
// hardcode (e.g. searching "Mysuru road" or a small town still resolves to
// its actual state).
export async function searchRegionsRemote(
  query: string,
  limit = 6
): Promise<IndiaRegion[]> {
  const q = query.trim();
  if (q.length < 3) return [];

  const cacheKey = q.toLowerCase();
  const cached = geocodeCache.get(cacheKey);
  if (cached) return cached;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", q);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("countrycodes", "in");
    url.searchParams.set("limit", "5");

    const res = await fetch(url.toString(), {
      headers: { "Accept-Language": "en" },
    });

    if (!res.ok) return [];

    const results: Array<{ address?: { state?: string } }> = await res.json();

    const matchedRegions: IndiaRegion[] = [];
    const seenSlugs = new Set<string>();

    for (const result of results) {
      const stateName = result.address?.state;
      if (!stateName) continue;

      const region = matchRegionByStateName(stateName);
      if (region && !seenSlugs.has(region.slug)) {
        seenSlugs.add(region.slug);
        matchedRegions.push(region);
      }
    }

    const limited = matchedRegions.slice(0, limit);
    geocodeCache.set(cacheKey, limited);
    return limited;
  } catch {
    return [];
  }
}

// Add to the bottom of indiaRegions.ts, after getDishesByState / searchRegions

/** Approximate coordinates of each region's primary city, for Dineout search. */
export const REGION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "andaman-and-nicobar-islands": { lat: 11.6234, lng: 92.7265 },
  "andhra-pradesh": { lat: 17.6868, lng: 83.2185 },
  "arunachal-pradesh": { lat: 27.0844, lng: 93.6053 },
  assam: { lat: 26.1445, lng: 91.7362 },
  bihar: { lat: 25.5941, lng: 85.1376 },
  chhattisgarh: { lat: 21.2514, lng: 81.6296 },
  "dadra-nagar-haveli-daman-diu": { lat: 20.3974, lng: 72.8328 },
  delhi: { lat: 28.6139, lng: 77.209 },
  goa: { lat: 15.4909, lng: 73.8278 },
  gujarat: { lat: 23.0225, lng: 72.5714 },
  "himachal-pradesh": { lat: 31.1048, lng: 77.1734 },
  haryana: { lat: 28.4595, lng: 77.0266 },
  jharkhand: { lat: 23.3441, lng: 85.3096 },
  "jammu-kashmir": { lat: 34.0837, lng: 74.7973 },
  karnataka: { lat: 12.9716, lng: 77.5946 },
  kerala: { lat: 9.9312, lng: 76.2673 },
  ladakh: { lat: 34.1526, lng: 77.5771 },
  lakshadweep: { lat: 10.5593, lng: 72.6358 },
  maharashtra: { lat: 19.076, lng: 72.8777 },
  meghalaya: { lat: 25.5788, lng: 91.8933 },
  manipur: { lat: 24.817, lng: 93.9368 },
  "madhya-pradesh": { lat: 23.2599, lng: 77.4126 },
  mizoram: { lat: 23.7271, lng: 92.7176 },
  nagaland: { lat: 25.6751, lng: 94.1086 },
  odisha: { lat: 20.2961, lng: 85.8245 },
  punjab: { lat: 31.634, lng: 74.8723 },
  puducherry: { lat: 11.9416, lng: 79.8083 },
  rajasthan: { lat: 26.9124, lng: 75.7873 },
  sikkim: { lat: 27.3389, lng: 88.6065 },
  telangana: { lat: 17.385, lng: 78.4867 },
  "tamil-nadu": { lat: 13.0827, lng: 80.2707 },
  tripura: { lat: 23.8315, lng: 91.2868 },
  "uttar-pradesh": { lat: 26.8467, lng: 80.9462 },
  uttarakhand: { lat: 30.3165, lng: 78.0322 },
  "west-bengal": { lat: 22.5726, lng: 88.3639 },
};

/** Best-effort cuisine term to search Dineout with for each region.
 *  search_restaurants_dineout resolves free text on its own, so these
 *  don't need to be exact facet ids — just a reasonable starting query. */
export const REGION_CUISINE_QUERY: Record<string, string> = {
  "andaman-and-nicobar-islands": "Seafood",
  "andhra-pradesh": "Andhra",
  "arunachal-pradesh": "North Eastern",
  assam: "Assamese",
  bihar: "North Indian",
  chhattisgarh: "North Indian",
  "dadra-nagar-haveli-daman-diu": "Seafood",
  delhi: "North Indian",
  goa: "Goan",
  gujarat: "Gujarati",
  "himachal-pradesh": "North Indian",
  haryana: "North Indian",
  jharkhand: "North Indian",
  "jammu-kashmir": "Kashmiri",
  karnataka: "South Indian",
  kerala: "Kerala",
  ladakh: "Tibetan",
  lakshadweep: "Seafood",
  maharashtra: "Maharashtrian",
  meghalaya: "North Eastern",
  manipur: "North Eastern",
  "madhya-pradesh": "North Indian",
  mizoram: "North Eastern",
  nagaland: "North Eastern",
  odisha: "North Indian",
  punjab: "Punjabi",
  puducherry: "South Indian",
  rajasthan: "Rajasthani",
  sikkim: "Tibetan",
  telangana: "Hyderabadi",
  "tamil-nadu": "South Indian",
  tripura: "North Eastern",
  "uttar-pradesh": "Mughlai",
  uttarakhand: "North Indian",
  "west-bengal": "Bengali",
};

export function getRegionCoordinates(region: IndiaRegion) {
  return REGION_COORDINATES[region.slug] ?? REGION_COORDINATES["delhi"];
}

export function getRegionCuisineQuery(region: IndiaRegion) {
  return REGION_CUISINE_QUERY[region.slug] ?? region.name;
}