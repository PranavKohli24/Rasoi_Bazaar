import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CompactHeader from "../components/CompactHeader";
import IndiaMap from "../components/IndiaMap";
import { toSlug } from "../utils/dishRoutes";
import { DEFAULT_TINT } from "../utils/dishTint";
import {
  INDIA_REGIONS,
  POPULAR_REGIONS,
  findRegionBySlug,
  searchRegions,
  searchRegionsRemote,
  getDishesByState,
  type IndiaRegion,
} from "../utils/indiaRegions";

const DISHES_PREVIEW_COUNT = 4;
const MAP_TINT = "#FBE8D3";

// Same button recipes as CookWhatYouHave, so actions look identical across both features.
const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-orange-200 px-6 py-3 font-semibold text-stone-900 shadow-md transition-all duration-200 hover:bg-orange-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";

const footerButton = primaryButton.replace(
  "px-6 py-3",
  "px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base"
);

const ghostButton =
  "inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70";

// Same gradient-card recipe used for recipe-result cards in CookWhatYouHave.
const tileCard =
  "rounded-2xl border border-stone-700 border-b-stone-950 bg-gradient-to-b from-stone-800 to-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_1px_0_rgba(0,0,0,0.5),0_10px_24px_-8px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_1px_0_rgba(0,0,0,0.5),0_16px_32px_-10px_rgba(0,0,0,0.8)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const LocalLoadingImage: React.FC<{ src: string; alt?: string }> = ({
  src,
  alt = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-28 w-full overflow-hidden rounded-[2px] bg-stone-800 sm:h-32">
      <div
        aria-hidden="true"
        className={`cook-local-image-shimmer absolute inset-0 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="cook-local-image-shimmer__glow" />
      </div>

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

const CookLikeLocalPage: React.FC = () => {
  const navigate = useNavigate();
  const { stateSlug } = useParams<{ stateSlug?: string }>();
  const [query, setQuery] = useState("");
  const [showAllRegions, setShowAllRegions] = useState(false);
  const [showAllDishes, setShowAllDishes] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dropUp, setDropUp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  // --- Zoom transition: shared content wrapper + its transition class ---
  const contentRef = useRef<HTMLDivElement>(null);
  const [transitionClass, setTransitionClass] = useState("");
  const transitionTimersRef = useRef<number[]>([]);

  const clearTransitionTimers = () => {
    transitionTimersRef.current.forEach((id) => window.clearTimeout(id));
    transitionTimersRef.current = [];
  };

  useEffect(() => clearTransitionTimers, []);

  const originFromEvent = (
    e: React.MouseEvent<HTMLElement>
  ): { x: number; y: number } | undefined => {
    const root = contentRef.current;
    if (!root) return undefined;
    const rect = root.getBoundingClientRect();
    if (!rect.width || !rect.height) return undefined;
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  const zoomNavigate = (
    runNavigation: () => void,
    origin?: { x: number; y: number }
  ) => {
    if (transitionClass === "cook-zoom-leave") return; // already mid-transition

    if (origin && contentRef.current) {
      contentRef.current.style.setProperty("--zoom-x", `${origin.x}%`);
      contentRef.current.style.setProperty("--zoom-y", `${origin.y}%`);
    }

    clearTransitionTimers();
    setTransitionClass("cook-zoom-leave");

    const leaveTimer = window.setTimeout(() => {
      runNavigation();
      setTransitionClass("cook-zoom-enter");

      // Double rAF so the browser paints the "enter" (scaled-down, invisible)
      // frame before we flip to "enter-active" and transition it in.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionClass("cook-zoom-enter-active");
        });
      });

      const settleTimer = window.setTimeout(() => {
        setTransitionClass("");
      }, 420);
      transitionTimersRef.current.push(settleTimer);
    }, 260);
    transitionTimersRef.current.push(leaveTimer);
  };

  // Cache preloaded region images to avoid duplicate requests.
  const preloadedRegionImages = useRef(
    new Map<string, HTMLImageElement>()
  );
  const selectedRegion = stateSlug ? findRegionBySlug(stateSlug) : undefined;

  // Gradually preload all region cover images in the background.
  useEffect(() => {
    // Don't compete with the selected region or images
    // currently being displayed in the expanded grid.
    if (selectedRegion || showAllRegions) return;

    const popularImageUrls = new Set(
      POPULAR_REGIONS
        .map((region) => region.coverImage)
        .filter((url): url is string => Boolean(url))
    );

    const imageUrls = [
      ...new Set(
        INDIA_REGIONS
          .map((region) => region.coverImage)
          .filter(
            (url): url is string =>
              typeof url === "string" &&
              url.length > 0 &&
              !popularImageUrls.has(url)
          )
      ),
    ];

    let cancelled = false;
    let nextIndex = 0;
    let activeRequests = 0;

    const loadNext = () => {
      if (cancelled) return;

      while (activeRequests < 2 && nextIndex < imageUrls.length) {
        const imageUrl = imageUrls[nextIndex++];

        // Skip images already being loaded or cached.
        if (preloadedRegionImages.current.has(imageUrl)) {
          continue;
        }

        const image = new window.Image();

        image.decoding = "async";
        image.setAttribute("fetchpriority", "low");

        activeRequests++;

        preloadedRegionImages.current.set(imageUrl, image);

        const finish = () => {
          activeRequests--;

          if (!cancelled) {
            loadNext();
          }
        };

        image.onload = finish;

        image.onerror = () => {
          preloadedRegionImages.current.delete(imageUrl);
          finish();
        };

        image.src = imageUrl;
      }
    };

    // Give initially visible content time to load first.
    const timer = window.setTimeout(loadNext, 1000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [selectedRegion, showAllRegions]);

  const dishes = useMemo(
    () => (selectedRegion ? getDishesByState(selectedRegion.name) : []),
    [selectedRegion]
  );
  const previewDishes = dishes.slice(0, DISHES_PREVIEW_COUNT);
  const extraDishes = dishes.slice(DISHES_PREVIEW_COUNT);
  const remainingCount = extraDishes.length;

  useEffect(() => {
    if (!selectedRegion) return;
    const key = `cookLocalExpanded:${selectedRegion.slug}`;
    const shouldExpand = sessionStorage.getItem(key) === "1";
    sessionStorage.removeItem(key); // one-shot: only applies right after a dish tap
    setShowAllDishes(shouldExpand);
  }, [selectedRegion]);
  // Local matches are instant (hardcoded city lists). When those come up
  // short, we debounce a real geocoding lookup so typing any actual city or
  // town — not just the handful we've hardcoded — resolves to its state.
  const localSuggestions = useMemo(() => searchRegions(query), [query]);
  const [remoteSuggestions, setRemoteSuggestions] = useState<IndiaRegion[]>([]);
  const [isSearchingRemote, setIsSearchingRemote] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    setRemoteSuggestions([]);

    if (trimmed.length < 3 || localSuggestions.length >= 3) {
      setIsSearchingRemote(false);
      return;
    }

    let cancelled = false;
    setIsSearchingRemote(true);

    const timeoutId = window.setTimeout(async () => {
      const results = await searchRegionsRemote(trimmed);
      if (!cancelled) {
        setRemoteSuggestions(results);
        setIsSearchingRemote(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [query, localSuggestions.length]);

  const suggestions = useMemo(() => {
    const combined = [...localSuggestions];
    const seenSlugs = new Set(combined.map((r) => r.slug));
    for (const region of remoteSuggestions) {
      if (!seenSlugs.has(region.slug)) {
        seenSlugs.add(region.slug);
        combined.push(region);
      }
    }
    return combined.slice(0, 6);
  }, [localSuggestions, remoteSuggestions]);

  // Preload images for matching regions as the user searches.
  useEffect(() => {
    const searchQuery = query.trim();

    // Wait until the user has typed at least 3 characters.
    if (searchQuery.length < 3 || suggestions.length === 0) {
      return;
    }

    // Small debounce to avoid unnecessary requests while typing.
    const timeoutId = window.setTimeout(() => {
      suggestions.slice(0, 3).forEach((region) => {
        const imageUrl = region.coverImage;

        if (!imageUrl) return;

        const existingImage = preloadedRegionImages.current.get(imageUrl);

        if (existingImage) {
          existingImage.fetchPriority = "high";
          return;
        }

        const image = new window.Image();
        image.decoding = "async";
        image.fetchPriority = "high";

        image.onerror = () => {
          preloadedRegionImages.current.delete(imageUrl);
        };

        image.src = imageUrl;

        preloadedRegionImages.current.set(imageUrl, image);
      });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [query, suggestions]);

  useEffect(() => {
    document.title = selectedRegion
      ? `${selectedRegion.name} dishes | Rasoi Bazaar`
      : "Cook like a local | Rasoi Bazaar";
    document.documentElement.style.setProperty("--bg-tint", MAP_TINT);
    return () => {
      document.documentElement.style.setProperty("--bg-tint", DEFAULT_TINT);
    };
  }, [selectedRegion]);

  const goToRegion = (slug: string) => navigate(`/cook-like-a-local/${slug}`);

  useEffect(() => {
    if (dropUp && suggestionsListRef.current) {
      suggestionsListRef.current.scrollTop = suggestionsListRef.current.scrollHeight;
    }
  }, [dropUp, suggestions]);

  useLayoutEffect(() => {
    if (suggestions.length === 0) return;

    const update = () => {
      const input = inputRef.current;
      if (!input) return;

      const rect = input.getBoundingClientRect();
      const viewport = window.visualViewport;
      const viewBottom = viewport ? viewport.offsetTop + viewport.height : window.innerHeight;

      const below = viewBottom - 8 - rect.bottom;
      const above = rect.top - 8;
      const needed = suggestions.length * 42 + 8;

      setDropUp(below < needed && above > below);
    };

    update();
    window.visualViewport?.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [suggestions.length]);

  const handleUseMyLocation = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!navigator.geolocation) {
      setLocationError("Location isn't available on this device.");
      return;
    }

    const origin = originFromEvent(e);

    // If permission was already denied, getCurrentPosition fires its error
    // callback almost instantly (no prompt), which flashes the "locating"
    // state on and off. Check first so we can skip that flash entirely.
    if (navigator.permissions?.query) {
      try {
        const status = await navigator.permissions.query({
          name: "geolocation" as PermissionName,
        });
        if (status.state === "denied") {
          setLocationError("Location permission was denied. Try searching instead.");
          return;
        }
      } catch {
        // Permissions API not supported for geolocation on this browser; fall through.
      }
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
            zoomNavigate(() => goToRegion(match.slug), origin);
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

  const handleRegionTileClick = (e: React.MouseEvent<HTMLButtonElement>, slug: string) => {
    zoomNavigate(() => goToRegion(slug), originFromEvent(e));
  };

  const handleBackToAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    zoomNavigate(() => navigate("/cook-like-a-local"), originFromEvent(e));
  };

  return (
    <div className="relative z-10 w-full">
      <style>{`
  .cook-local-image-shimmer {
    background: #F3EBDD;
    transition: opacity 650ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .cook-local-image-shimmer__glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 25%,
      rgba(255, 255, 255, 0.04) 35%,
        rgba(255, 255, 255, 0.65) 48%,
      rgba(255, 255, 255, 0.04) 61%,
      transparent 72%
    );
    transform: translateX(-100%);
    animation: cook-local-image-shimmer-sweep 1.8s
      cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes cook-local-image-shimmer-sweep {
    to {
      transform: translateX(100%);
    }
  }

  /* Zoom-through transition between the destination grid and a selected region */
  .cook-zoom-content {
    transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
    will-change: transform, opacity;
  }
  .cook-zoom-leave {
    opacity: 0;
    transform: scale(1.15);
    transition: opacity 260ms cubic-bezier(0.4, 0, 1, 1),
      transform 260ms cubic-bezier(0.4, 0, 1, 1);
  }
  .cook-zoom-enter {
    opacity: 0;
    transform: scale(0.88);
  }
  .cook-zoom-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 380ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes cook-card-rise {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .cook-card-rise {
    animation: cook-card-rise 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cook-tooltip-in {
    from { opacity: 0; transform: translateY(-6px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .cook-tooltip-in {
    animation: cook-tooltip-in 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes cook-region-pulse {
    0% { box-shadow: 0 0 0 0 rgba(252, 108, 38, 0.45); }
    70% { box-shadow: 0 0 0 14px rgba(252, 108, 38, 0); }
    100% { box-shadow: 0 0 0 0 rgba(252, 108, 38, 0); }
  }
  .cook-region-pulse {
    animation: cook-region-pulse 900ms cubic-bezier(0.22, 1, 0.36, 1);
    border-radius: 9999px;
  }

  .cook-chevron {
    transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .cook-chevron-open {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .cook-local-image-shimmer__glow {
      animation: none;
      opacity: 0.35;
    }
    .cook-zoom-leave,
    .cook-zoom-enter,
    .cook-zoom-enter-active {
      transition: opacity 120ms linear !important;
      transform: none !important;
    }
    .cook-card-rise,
    .cook-region-pulse,
    .cook-tooltip-in {
      animation: none !important;
    }
    .cook-chevron {
      transition: none !important;
    }
  }
`}</style>
      <CompactHeader showSearch={false} />

      <section className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-3 py-10 sm:px-4 sm:py-20">
        <div className="rounded-3xl border border-stone-700 bg-stone-900 shadow-[0_12px_40px_rgba(120,70,30,0.10)]">
          <header className="px-5 pb-2 pt-8 text-center sm:px-12 sm:pb-3 sm:pt-12">
            <h2 className="font-serif text-[25px] font-black tracking-tight text-orange-50 sm:text-4xl">
              Cook like a local
            </h2>
            {!selectedRegion && (
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
                Travelling somewhere? Find local dishes from that region and cook them
                yourself.
              </p>
            )}
          </header>

          <div
            ref={contentRef}
            className={`mx-auto max-w-3xl px-5 pb-8 pt-4 sm:px-12 sm:pb-10 sm:pt-6 cook-zoom-content ${transitionClass}`}
          >
            {!selectedRegion && (
              <div className="sticky top-2 z-30 -mx-5 bg-stone-900/95 px-5 pb-3 pt-1 backdrop-blur-sm sm:-mx-12 sm:px-12">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="overflow-hidden rounded-xl border border-stone-700 bg-stone-950">
                  <div className="flex h-[52px] items-center gap-3 px-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-stone-500" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search city or state..."
                      className="w-full bg-transparent text-base text-stone-100 outline-none placeholder:text-sm placeholder:text-stone-500"
                    />
                  </div>

                  <div className="border-t border-stone-800" />

                  <button
                    type="button"
                    onClick={handleUseMyLocation}
                    disabled={locating}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-stone-900 disabled:opacity-60"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-400/15 text-orange-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 ${locating ? "animate-spin" : ""}`} aria-hidden="true">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                      </svg>
                    </span>
                    <span className="flex-1 text-sm">
                      <span className="font-semibold text-stone-100">
                        {locating ? "Finding your location..." : "Use my current location"}
                      </span>
                      <span className="block text-xs text-stone-400">Find local dishes near you</span>
                    </span>
                  </button>
                </div>

                {(suggestions.length > 0 || isSearchingRemote) && (
                  <ul
                    ref={suggestionsListRef}
                    className={`absolute left-0 right-0 z-40 max-h-64 overflow-auto border-stone-700 bg-stone-900 shadow-lg ${
                      dropUp
                        ? "bottom-full mb-1 rounded-xl border"
                        : "top-[53px] rounded-b-xl border-x border-b"
                    }`}
                  >
                    {(dropUp ? [...suggestions].reverse() : suggestions).map((region) => (
                      <li key={region.slug}>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleSuggestionClick(region.slug)}
                          className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-stone-200 transition-colors hover:bg-stone-800"
                        >
                          <span className="font-medium">{region.name}</span>
                          <span className="text-xs text-stone-400">{region.cities.slice(0, 2).join(", ")}</span>
                        </button>
                      </li>
                    ))}
                    {isSearchingRemote && (
                      <li className="px-4 py-2.5 text-xs text-stone-500">Searching...</li>
                    )}
                  </ul>
                )}

                {locationError && (
                  <div
                    role="alert"
                    className="cook-tooltip-in relative ml-2 mt-3 max-w-xs rounded-xl border border-stone-700 bg-stone-800 p-3 shadow-xl"
                  >
                    {/* Arrow pointing up at the location icon */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-stone-700 bg-stone-800"
                    />
                    <div className="flex items-start gap-2.5">
                      <p className="flex-1 text-xs leading-relaxed text-stone-200">
                        {locationError}
                      </p>
                      <button
                        type="button"
                        onClick={() => setLocationError(null)}
                        className="shrink-0 text-stone-500 transition-colors hover:text-stone-300"
                        aria-label="Dismiss"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </form>
              </div>
            )}

            {!selectedRegion ? (
              <>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-xl font-bold text-orange-50">
                    {showAllRegions ? "All states & union territories" : "Popular destinations"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAllRegions((v) => !v)}
                    className="shrink-0 text-sm font-semibold text-orange-200 transition-colors hover:text-orange-100"
                  >
                    {showAllRegions ? "Show less" : "See all"}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-7">
                  {(showAllRegions ? INDIA_REGIONS : POPULAR_REGIONS).map((region, i) => (
                    <button
                      key={region.slug}
                      type="button"
                      onClick={(e) => handleRegionTileClick(e, region.slug)}
                      className={`group text-left transition-transform duration-200 hover:-translate-y-0.5 ${
                        i % 2 === 0 ? "-rotate-1" : "rotate-1"
                      } hover:rotate-0`}
                    >
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute -top-2 left-5 z-10 h-5 w-12 -rotate-3 bg-orange-100/20 shadow-sm"
                        />
                        <div className="overflow-hidden rounded-lg border border-stone-700/70 bg-stone-900 p-1.5 shadow-md">
                          {region.coverImage ? (
                            <LocalLoadingImage src={region.coverImage} />
                          ) : (
                            <div className="flex h-28 w-full items-center justify-center rounded-[2px] bg-orange-100/10 sm:h-32">
                              <span className="font-serif text-2xl font-black text-orange-300/50">{region.code}</span>
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

              </>
            ) : (
              <>
                <div
                  key={selectedRegion.slug}
                  className="cook-card-rise relative isolate grid min-h-[145px] grid-cols-[46%_minmax(0,1fr)] overflow-hidden rounded-2xl border border-[#F3EBDD] bg-[#fffaf4] shadow-[0_8px_30px_rgba(120,70,30,0.07)] sm:min-h-[175px] sm:grid-cols-[48%_minmax(0,1fr)]"
                >

                  {/* India map */}
                  <div className="relative z-10 flex items-start justify-center px-1.5 pt-2 sm:px-3 sm:pt-3">
                    <div className="cook-region-pulse w-full">
                      <IndiaMap
                        variant="compact"
                        selectedSlug={selectedRegion.slug}
                      />
                    </div>
                  </div>

                  {/* Region information */}
                  <div className="relative flex min-w-0 flex-col justify-between overflow-hidden p-4 sm:p-7">

                    {/* Cover image */}
                    {selectedRegion.coverImage && (
                      <div
                        className="pointer-events-none absolute right-0 top-0 h-[78%] w-[90%]"
                        style={{
                          clipPath: "ellipse(88% 82% at 88% 12%)",
                        }}
                      >
                        <img
                          src={selectedRegion.coverImage}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-cover"
                        />

                        {/* Soft image blending */}
                        {/* Subtle bottom fade only */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#fffaf4]/70 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Region name */}
                    <h3 className="relative z-10 mt-auto -translate-x-1 font-serif text-lg font-black tracking-tight text-orange-500 sm:text-2xl">
                      {selectedRegion.name}
                    </h3>

                  </div>
                </div>


                <h3
                  key={`dishes-heading-${selectedRegion.slug}`}
                  className="cook-card-rise mt-6 font-serif text-base font-semibold tracking-tight text-stone-300 sm:text-lg"
                  style={{ animationDelay: "80ms" }}
                >
                  Popular dishes
                </h3>
                {dishes.length === 0 ? (
                  <p className="mt-4 text-sm text-stone-400">
                    We don't have dishes tagged for {selectedRegion.name} yet.
                  </p>
                ) : (
                  <>
                    <div
                      key={`dishes-preview-${selectedRegion.slug}`}
                      className="cook-card-rise mt-4 grid grid-cols-2 gap-x-4 gap-y-7"
                      style={{ animationDelay: "120ms" }}
                    >
                      {previewDishes.map((dish, i) => (
                        <Link
                          key={dish.dishName}
                          to={`/recipe/${toSlug(dish.dishName)}`}
                          onClick={() => {
                            if (showAllDishes && selectedRegion) {
                              sessionStorage.setItem(
                                `cookLocalExpanded:${selectedRegion.slug}`,
                                "1"
                              );
                            }
                          }}
                          className={`block transition-transform duration-200 hover:-translate-y-0.5 ${
                            i % 2 === 0 ? "rotate-1" : "-rotate-1"
                          } hover:rotate-0`}
                        >
                          <div className="relative">
                            <div className="overflow-hidden rounded-lg border border-stone-700/70 bg-stone-900 p-1.5 shadow-md">
                              {dish.image ? (
                                <LocalLoadingImage src={dish.image} />
                              ) : (
                                <div className="h-28 w-full rounded-[2px] bg-orange-100/10 sm:h-32" />
                              )}
                            </div>
                          </div>
                          <div className="mt-2 px-1">
                            <span className="block font-serif font-semibold text-stone-100">{dish.dishName}</span>
                            <span className="block text-xs text-stone-400">{dish.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {extraDishes.length > 0 && (
                      <div
                        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ gridTemplateRows: showAllDishes ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7">
                            {extraDishes.map((dish, i) => (
                              <Link
                                key={dish.dishName}
                                to={`/recipe/${toSlug(dish.dishName)}`}
                                onClick={() => {
                                  if (showAllDishes && selectedRegion) {
                                    sessionStorage.setItem(
                                      `cookLocalExpanded:${selectedRegion.slug}`,
                                      "1"
                                    );
                                  }
                                }}
                                className={`block transition-all duration-300 ease-out hover:-translate-y-0.5 hover:rotate-0 ${
                                  (previewDishes.length + i) % 2 === 0 ? "rotate-1" : "-rotate-1"
                                } ${
                                  showAllDishes
                                    ? "translate-y-0 opacity-100"
                                    : "-translate-y-2 opacity-0"
                                }`}
                                style={{
                                  transitionDelay: showAllDishes ? `${i * 45}ms` : "0ms",
                                }}
                              >
                                <div className="relative">
                                  <div className="overflow-hidden rounded-lg border border-stone-700/70 bg-stone-900 p-1.5 shadow-md">
                                    {dish.image ? (
                                      <LocalLoadingImage src={dish.image} />
                                    ) : (
                                      <div className="h-28 w-full rounded-[2px] bg-orange-100/10 sm:h-32" />
                                    )}
                                  </div>
                                </div>
                                <div className="mt-2 px-1">
                                  <span className="block font-serif font-semibold text-stone-100">{dish.dishName}</span>
                                  <span className="block text-xs text-stone-400">{dish.description}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
                  {remainingCount > 0 ? (
                    <button
                      type="button"
                      onClick={() => setShowAllDishes((v) => !v)}
                      className={`${footerButton} w-full sm:w-auto`}
                    >
                      {showAllDishes ? "Show less" : `More from ${selectedRegion.name} (${remainingCount}+)`}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`cook-chevron h-4 w-4 ${showAllDishes ? "cook-chevron-open" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={handleBackToAll}
                    className={ghostButton}
                  >
                    <span aria-hidden="true">←</span> All destinations
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookLikeLocalPage;