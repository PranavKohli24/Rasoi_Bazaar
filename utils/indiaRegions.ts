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
    name: "Chandigarh",
    slug: "chandigarh",
    code: "CH",
    cities: ["Chandigarh"],
    coverImage: "/regions/chandigarh.png",
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
