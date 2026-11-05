import React, { useEffect, useState } from "react";
import {
  DineoutRestaurant,
  DineoutRestaurantDetails,
  searchDineoutRestaurants,
  getDineoutRestaurantDetails,
} from "../services/dineoutService";
import { IndiaRegion, getRegionCoordinates, getRegionCuisineQuery } from "../utils/indiaRegions";

import DinnerNegotiator from "./DinnerNegotiator";

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
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
    const [negotiatorOpen, setNegotiatorOpen] = useState(false);

  // Reset to the region's default coordinates whenever the region changes —
  // a location grant for one state shouldn't silently apply to another.
  useEffect(() => {
    setUserCoords(null);
    setLocationDenied(false);
  }, [region]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setRestaurants([]);
    setSelected(null);
    setDetails(null);

    const { lat, lng } = userCoords ?? getRegionCoordinates(region);
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
  }, [region, userCoords]);

  const openDetails = (restaurant: DineoutRestaurant) => {
    setSelected(restaurant);
    setDetails(null);
    setDetailsError(null);
    setIsLoadingDetails(true);

    const { lat, lng } = userCoords ?? getRegionCoordinates(region);

    getDineoutRestaurantDetails(restaurant.id, lat, lng)
      .then(setDetails)
      .catch((err) => setDetailsError(err instanceof Error ? err.message : "Couldn't load details."))
      .finally(() => setIsLoadingDetails(false));
  };

    const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationDenied(true);
      return;
    }

    setLocating(true);
    setLocationDenied(false);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserCoords({ lat: coords.latitude, lng: coords.longitude });
        setLocating(false);
      },
      () => {
        setLocationDenied(true);
        setLocating(false);
      }
    );
  };

  return (
    <div className="mt-8">
      <h3 className="font-serif text-base font-semibold tracking-tight text-stone-300 sm:text-lg">
        Explore restaurants in {region.name}
      </h3>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={locating || !!userCoords}
          className="text-xs font-medium text-orange-200 transition-colors hover:text-orange-100 disabled:cursor-default disabled:text-stone-500"
        >
          {locating
            ? "Finding your location..."
            : userCoords
            ? "Showing results near you"
            : "Use my location for nearby results"}
        </button>
        {locationDenied && (
          <span className="text-xs text-stone-500">Couldn't get your location — showing {region.name}'s main city instead.</span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setNegotiatorOpen(true)}
        className="mt-3 rounded-full border border-orange-400/50 bg-stone-900 px-3.5 py-2 text-xs font-semibold text-orange-200 hover:bg-stone-800"
      >
        Can't decide together? Let's negotiate 🤝
      </button>

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
                  {restaurant.distance && <span>{restaurant.distance} away</span>}
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
      <DinnerNegotiator
        region={region}
        isOpen={negotiatorOpen}
        onClose={() => setNegotiatorOpen(false)}
        onViewRestaurant={(restaurant) => {
          setNegotiatorOpen(false);
          openDetails(restaurant);
        }}
      />
    </div>
  );
};

const StarIconSm: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
    <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5Z" />
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

const PinIconSm: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const RestaurantDetailsPanel: React.FC<{
  restaurant: DineoutRestaurant;
  details: DineoutRestaurantDetails | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}> = ({ restaurant, details, isLoading, error, onBack }) => (
  <div className="mt-4 overflow-hidden rounded-2xl border border-stone-700 bg-stone-900">
    <div className="p-4 sm:p-6">
      <button type="button" onClick={onBack} className={`${ghostButton} -ml-2 mb-2`}>
        <span aria-hidden="true">←</span> Back to restaurants
      </button>

      <h4 className="font-serif text-2xl font-black leading-tight text-orange-50">
        {details?.restaurant.name ?? restaurant.name}
      </h4>

      {!isLoading && !error && details && (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {typeof details.restaurant.avgRating === "number" && (
            <span className="flex items-center gap-1 font-semibold text-orange-200">
              <StarIconSm className="h-3.5 w-3.5" />
              {details.restaurant.avgRating}
              {details.restaurant.totalRatings && (
                <span className="font-normal text-stone-400">({details.restaurant.totalRatings})</span>
              )}
            </span>
          )}
          {details.restaurant.costForTwo && (
            <span className="text-stone-400">{details.restaurant.costForTwo}</span>
          )}
          {details.restaurant.distance && (
            <span className="text-stone-400">{details.restaurant.distance} away</span>
          )}
        </div>
      )}

      {details?.restaurant.cuisines && details.restaurant.cuisines.length > 0 && !isLoading && !error && (
        <p className="mt-1 text-sm text-stone-400">{details.restaurant.cuisines.join(", ")}</p>
      )}
    </div>

    {isLoading ? (
      <div className="space-y-2.5 px-4 pb-5 sm:px-6">
        <Shimmer className="h-3.5 w-2/3" />
        <Shimmer className="h-3.5 w-1/2" />
        <Shimmer className="h-3.5 w-3/4" />
      </div>
    ) : error ? (
      <p className="px-4 pb-5 text-sm text-stone-400 sm:px-6">{error}</p>
    ) : details ? (
      <div className="space-y-4 border-t border-stone-800 px-4 py-4 sm:px-6">
        {details.restaurant.address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              details.restaurant.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2.5 text-sm text-stone-300 transition-colors hover:text-orange-200"
          >
            <PinIconSm className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
            <span className="underline decoration-stone-600 decoration-dotted underline-offset-2">
              {details.restaurant.address}
            </span>
          </a>
        )}

        {details.restaurant.timings && (
          <div className="flex items-start gap-2.5 text-sm text-stone-300">
            <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
            <span>{details.restaurant.timings}</span>
          </div>
        )}

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

        {details.restaurant.offers.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">Offers</p>
            <div className="space-y-1.5">
              {details.restaurant.offers.map((offer, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-orange-900/40 bg-stone-950 px-3 py-2 text-xs font-medium text-orange-200"
                >
                  {offer}
                </div>
              ))}
            </div>
          </div>
        )}

        {details.restaurant.bankOffers.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">Bank offers</p>
            <div className="space-y-1.5">
              {details.restaurant.bankOffers.map((offer, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-stone-700 px-3 py-2 text-xs text-stone-300"
                >
                  {offer}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ) : null}
  </div>
);

export default ExploreRestaurants;