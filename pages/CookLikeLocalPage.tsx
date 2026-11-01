import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CompactHeader from "../components/CompactHeader";
import IndiaMap from "../components/IndiaMap";
import { toSlug } from "../utils/dishRoutes";
import {
  INDIA_REGIONS,
  POPULAR_REGIONS,
  findRegionBySlug,
  searchRegions,
  getDishesByState,
} from "../utils/indiaRegions";

const DISHES_PREVIEW_COUNT = 4;

/** Thin dashed rule with a dot at each end — the page's one recurring
 *  "travel route" motif, used sparingly between major sections. */
const RouteDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`} aria-hidden="true">
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-200/70" />
    <span className="h-px flex-1 border-t border-dashed border-stone-600" />
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-200/70" />
  </div>
);

const CookLikeLocalPage: React.FC = () => {
  const navigate = useNavigate();
  const { stateSlug } = useParams<{ stateSlug?: string }>();
  const [query, setQuery] = useState("");
  const [showAllRegions, setShowAllRegions] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const selectedRegion = stateSlug ? findRegionBySlug(stateSlug) : undefined;
  const dishes = useMemo(
    () => (selectedRegion ? getDishesByState(selectedRegion.name) : []),
    [selectedRegion]
  );
  const previewDishes = dishes.slice(0, DISHES_PREVIEW_COUNT);
  const remainingCount = Math.max(dishes.length - DISHES_PREVIEW_COUNT, 0);
  const suggestions = useMemo(() => searchRegions(query), [query]);

  const goToRegion = (slug: string) => navigate(`/cook-like-a-local/${slug}`);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location isn't available on this device.");
      return;
    }

    setLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
          );
          const data = await res.json();
          const stateName: string | undefined = data?.principalSubdivision;

          const match =
            stateName &&
            INDIA_REGIONS.find(
              (r) =>
                r.name.toLowerCase() === stateName.toLowerCase() ||
                stateName.toLowerCase().includes(r.name.toLowerCase())
            );

          if (match) {
            goToRegion(match.slug);
          } else {
            setLocationError("Couldn't match your location to a state. Try searching instead.");
          }
        } catch {
          setLocationError("Couldn't look up your location. Try searching instead.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setLocationError("Location permission was denied. Try searching instead.");
      }
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions[0]) goToRegion(suggestions[0].slug);
  };

  const handleSuggestionClick = (slug: string) => {
    setQuery("");
    goToRegion(slug);
  };

  return (
    <div className="relative z-10 w-full">
      <CompactHeader showSearch={false} />

      <main className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
        <h1 className="font-brand text-4xl font-black tracking-tight text-orange-200 sm:text-5xl">
          Cook like a local
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-stone-400 sm:text-lg">
          Travelling somewhere? Discover traditional dishes from that region and cook them yourself.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative mt-7">
          <div className="flex items-center gap-3 rounded-full border border-stone-700 bg-stone-900 px-4 py-3 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-stone-500" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city or state..."
              className="w-full bg-transparent text-stone-100 placeholder:text-stone-500 focus:outline-none"
            />
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 shadow-lg">
              {suggestions.map((region) => (
                <li key={region.slug}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(region.slug)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-orange-100/10"
                  >
                    <span className="font-medium text-stone-100">{region.name}</span>
                    <span className="text-xs text-stone-400">{region.cities.slice(0, 2).join(", ")}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>

        {!selectedRegion && (
          <>
            <button
              type="button"
              onClick={handleUseMyLocation}
              disabled={locating}
              className="mt-3 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left hover:bg-orange-100/10 disabled:opacity-60"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-200/40 text-orange-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 ${locating ? "animate-spin" : ""}`} aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                </svg>
              </span>
              <span className="flex-1 text-sm">
                <span className="font-semibold text-stone-100">
                  {locating ? "Finding your location..." : "Use my current location"}
                </span>
                <span className="block text-stone-400">Find local dishes near you</span>
              </span>
            </button>

            {locationError && (
              <p className="mt-1 pl-4 text-sm text-red-300" role="alert">
                {locationError}
              </p>
            )}
          </>
        )}

        <RouteDivider className="mt-8" />

        {!selectedRegion ? (
          <>
            <section className="mt-8">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-xl font-bold text-stone-100">
                  {showAllRegions ? "All states & union territories" : "Popular destinations"}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAllRegions((v) => !v)}
                  className="text-sm font-semibold text-orange-200 hover:text-orange-100"
                >
                  {showAllRegions ? "Show less" : "See all"}
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-7">
                {(showAllRegions ? INDIA_REGIONS : POPULAR_REGIONS).map((region, i) => (
                  <button
                    key={region.slug}
                    type="button"
                    onClick={() => goToRegion(region.slug)}
                    className={`group text-left transition-transform duration-200 hover:-translate-y-0.5 ${
                      i % 2 === 0 ? "-rotate-1" : "rotate-1"
                    } hover:rotate-0`}
                  >
                    <div className="relative">
                      {/* washi-tape accent, pinning the photo to the page */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-2 left-5 z-10 h-5 w-12 -rotate-3 bg-orange-100/20 shadow-sm"
                      />
                      <div className="overflow-hidden rounded-lg border border-stone-700/70 bg-stone-900 p-1.5 shadow-md">
                        {region.coverImage ? (
                          <img
                            src={region.coverImage}
                            alt=""
                            className="h-28 w-full rounded-[2px] object-cover sm:h-32"
                          />
                        ) : (
                          <div className="flex h-28 w-full items-center justify-center rounded-[2px] bg-orange-100/10 sm:h-32">
                            <span className="font-brand text-2xl text-orange-200/50">{region.code}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 px-1">
                      <span className="block font-serif font-semibold text-stone-100">{region.name}</span>
                      <span className="block text-xs text-stone-400">{region.cities.slice(0, 3).join(", ")}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <RouteDivider className="mt-9" />

            <div className="mt-8 flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-200/40 text-orange-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" />
                  <path d="M9 4v14M15 6v14" />
                  <circle cx="17" cy="9" r="2.3" className="fill-orange-200" stroke="none" />
                </svg>
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-100">Explore every corner of India</h3>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-stone-400">
                  From famous classics to hidden regional specialities, discover authentic recipes
                  from all 28 states and 8 union territories.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <section className="relative mt-8 flex items-stretch gap-5 rounded-2xl border border-stone-700/60 bg-stone-900 p-5">
              {/* postmark badge — the page's one bold device, used once here */}
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-4 flex h-[4.5rem] w-[4.5rem] rotate-6 items-center justify-center rounded-full border-2 border-dashed border-orange-200/60 bg-stone-900"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-orange-200/40 text-center">
                  <span className="font-hand text-sm leading-none text-orange-100">
                    Selected
                    <br />
                    Region
                  </span>
                </div>
              </div>

              <div className="w-24 shrink-0 sm:w-28">
                <IndiaMap variant="compact" selectedSlug={selectedRegion.slug} />
              </div>
              <div className="flex-1 pt-1">
                <h2 className="font-brand text-2xl font-black leading-tight text-stone-100 sm:text-3xl">
                  {selectedRegion.name}
                </h2>
                <p className="mt-2 text-sm text-stone-400">{selectedRegion.cities.join(", ")}</p>
              </div>
            </section>

            <RouteDivider className="mt-8" />

            <section className="mt-8">
              <h2 className="font-serif text-xl font-bold text-stone-100">
                Popular dishes from {selectedRegion.name}
              </h2>

              {previewDishes.length === 0 ? (
                <p className="mt-4 text-sm text-stone-400">
                  We don't have dishes tagged for {selectedRegion.name} yet.
                </p>
              ) : (
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {previewDishes.map((dish) => (
                    <Link
                      key={dish.dishName}
                      to={`/recipe/${toSlug(dish.dishName)}`}
                      className="overflow-hidden rounded-xl border border-stone-700/60 bg-stone-900 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      {dish.image && (
                        <img src={dish.image} alt="" className="h-28 w-full object-cover sm:h-36" />
                      )}
                      <div className="px-3 py-3">
                        <span className="block font-semibold text-stone-100">{dish.dishName}</span>
                        <span className="block text-xs text-stone-400">{dish.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {remainingCount > 0 && (
                <button
                  type="button"
                  className="relative mt-6 w-full rounded-xl border border-dashed border-orange-200/50 bg-orange-100/5 py-4 pl-7 pr-5 text-left font-semibold text-orange-100 hover:bg-orange-100/10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--bg-tint,#FFF8F1)]"
                  />
                  More from {selectedRegion.name}
                  <span className="float-right text-orange-200">{remainingCount}+ dishes</span>
                </button>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default CookLikeLocalPage;