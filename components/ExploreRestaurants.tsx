import React, { useEffect, useState } from "react";
import {
  DineoutRestaurant,
  DineoutRestaurantDetails,
  searchDineoutRestaurants,
  getDineoutRestaurantDetails,
} from "../services/dineoutService";
import { IndiaRegion, getRegionCoordinates, getRegionCuisineQuery } from "../utils/indiaRegions";

const tileCard =
  "rounded-2xl border border-stone-700 border-b-stone-950 bg-gradient-to-b from-stone-800 to-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_1px_0_rgba(0,0,0,0.5),0_10px_24px_-8px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400/60";

const ghostButton =
  "inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70";

const Shimmer: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`rounded-md bg-stone-800 animate-pulse ${className}`} />
);

const RestaurantSkeletonGrid: React.FC = () => (
  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-7" aria-hidden="true">
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="rounded-lg border border-stone-700/70 bg-stone-900 p-1.5">
        <Shimmer className="h-28 w-full sm:h-32" />
        <div className="mt-2 space-y-1.5 px-1">
          <Shimmer className="h-3 w-3/4" />
          <Shimmer className="h-2.5 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
    <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5Z" />
  </svg>
);

interface ExploreRestaurantsProps {
  region: IndiaRegion;
}

const ExploreRestaurants: React.FC<ExploreRestaurantsProps> = ({ region }) => {
  const [restaurants, setRestaurants] = useState<DineoutRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<DineoutRestaurant | null>(null);
  const [details, setDetails] = useState<DineoutRestaurantDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setRestaurants([]);
    setSelected(null);
    setDetails(null);

    const { lat, lng } = getRegionCoordinates(region);
    const query = getRegionCuisineQuery(region);

    searchDineoutRestaurants(query, lat, lng)
      .then((results) => {
        if (!cancelled) setRestaurants(results);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Couldn't load restaurants.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [region]);

  const openDetails = (restaurant: DineoutRestaurant) => {
    setSelected(restaurant);
    setDetails(null);
    setDetailsError(null);
    setIsLoadingDetails(true);

    const { lat, lng } = getRegionCoordinates(region);

    getDineoutRestaurantDetails(restaurant.id, lat, lng)
      .then(setDetails)
      .catch((err) => setDetailsError(err instanceof Error ? err.message : "Couldn't load details."))
      .finally(() => setIsLoadingDetails(false));
  };

  return (
    <div className="mt-8">
      <h3 className="font-serif text-base font-semibold tracking-tight text-stone-300 sm:text-lg">
        Explore restaurants in {region.name}
      </h3>

      {isLoading ? (
        <RestaurantSkeletonGrid />
      ) : error ? (
        <p className="mt-4 text-sm text-stone-400">{error}</p>
      ) : restaurants.length === 0 ? (
        <p className="mt-4 text-sm text-stone-400">
          We couldn't find restaurants for {region.name} right now.
        </p>
      ) : selected ? (
        <RestaurantDetailsPanel
          restaurant={selected}
          details={details}
          isLoading={isLoadingDetails}
          error={detailsError}
          onBack={() => setSelected(null)}
        />
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-7">
          {restaurants.map((restaurant, i) => (
            <button
              key={restaurant.id}
              type="button"
              onClick={() => openDetails(restaurant)}
              className={`group text-left transition-transform duration-200 hover:-translate-y-0.5 ${
                i % 2 === 0 ? "-rotate-1" : "rotate-1"
              } hover:rotate-0`}
            >
              <div className="overflow-hidden rounded-lg border border-stone-700/70 bg-stone-900 p-1.5 shadow-md">
                {restaurant.imageUrl ? (
                  <img
                    src={restaurant.imageUrl}
                    alt=""
                    loading="lazy"
                    className="h-28 w-full rounded-[2px] object-cover sm:h-32"
                  />
                ) : (
                  <div className="h-28 w-full rounded-[2px] bg-orange-100/10 sm:h-32" />
                )}
              </div>
              <div className="mt-2 px-1">
                <span className="block font-serif font-semibold text-stone-100">{restaurant.name}</span>
                {restaurant.cuisine.length > 0 && (
                  <span className="block truncate text-xs text-stone-400">
                    {restaurant.cuisine.slice(0, 3).join(", ")}
                  </span>
                )}
                <div className="mt-1 flex items-center gap-2 text-xs text-stone-400">
                  {restaurant.ratingValue && (
                    <span className="flex items-center gap-0.5 text-orange-200">
                      <StarIcon className="h-3 w-3" />
                      {restaurant.ratingValue}
                    </span>
                  )}
                  {restaurant.costForTwo && <span>{restaurant.costForTwo}</span>}
                </div>
                {restaurant.dealTitles && restaurant.dealTitles[0] && (
                  <span className="mt-1.5 inline-block truncate rounded-full bg-orange-900/40 px-2 py-0.5 text-[10px] font-semibold text-orange-200">
                    {restaurant.dealTitles[0]}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const RestaurantDetailsPanel: React.FC<{
  restaurant: DineoutRestaurant;
  details: DineoutRestaurantDetails | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}> = ({ restaurant, details, isLoading, error, onBack }) => (
  <div className={`${tileCard} mt-4 p-4 sm:p-6`}>
    <button type="button" onClick={onBack} className={`${ghostButton} -ml-2 mb-3`}>
      <span aria-hidden="true">←</span> Back to restaurants
    </button>

    <h4 className="font-serif text-xl font-black text-orange-50">{restaurant.name}</h4>

    {isLoading ? (
      <div className="mt-4 space-y-2.5">
        <Shimmer className="h-3.5 w-2/3" />
        <Shimmer className="h-3.5 w-1/2" />
        <Shimmer className="h-3.5 w-3/4" />
      </div>
    ) : error ? (
      <p className="mt-3 text-sm text-stone-400">{error}</p>
    ) : details ? (
      <div className="mt-3 space-y-3 text-sm text-stone-300">
        <p>{details.restaurant.address}</p>
        <p className="text-stone-400">{details.restaurant.timings}</p>
        <p className="text-stone-400">{details.restaurant.costForTwo}</p>

        {details.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {details.amenities.map((amenity) => (
              <span
                key={amenity}
                className="rounded-full border border-stone-700 px-2.5 py-1 text-xs text-stone-300"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {details.restaurant.deals.length > 0 && (
          <div className="space-y-1.5">
            {details.restaurant.deals.map((deal) => (
              <div
                key={deal.id}
                className="rounded-lg bg-orange-900/30 px-3 py-2 text-xs font-medium text-orange-200"
              >
                {deal.title}
              </div>
            ))}
          </div>
        )}
      </div>
    ) : null}
  </div>
);

export default ExploreRestaurants;