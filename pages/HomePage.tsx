import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CompactHeader from "../components/CompactHeader";
import SearchBar from "../components/SearchBar";
import CategoryBrowser from "../components/CategoryBrowser";
import RecipeSuggestionChips from "../components/RecipeSuggestionChips";
import { useDishSearch } from "../utils/dishRoutes";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";
import { useIdentifyDish } from "../utils/useIdentifyDish";
import RecentlyCooked from "../components/RecentlyCooked";

const AUTO_SEARCH_CONFIDENCE = 0.7;

const COOK_STEPS = [
  "Tap the appliances you own",
  "Add your groceries",
  "Pick a dish and get the recipe",
];

const VALUE_PROPS = [
  {
    icon: (
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5V4.5Z" />
    ),
    title: "Step-by-step recipes",
    body: "Clear instructions for dishes you actually grew up eating.",
  },
  {
    icon: (
      <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13 5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    ),
    title: "Missing something?",
    body: "Order it on Instamart right here - never leave the recipe.",
  },
  {
    icon: (
      <path d="M12 2a7 7 0 0 0-7 7c0 3 2 4.5 2 7h10c0-2.5 2-4 2-7a7 7 0 0 0-7-7ZM9 21h6M10 18h4" />
    ),
    title: "Stuck mid-recipe?",
    body: "Hands full of masala? Just say \u201cHey Chef\u201d to ask your doubts.",
  },
];

type HeroMode = "search" | "cook";

const HomePage: React.FC = () => {
  const { term, setTerm, go } = useDishSearch();
  const [mode, setMode] = useState<HeroMode>("search");
  const swipeStartRef = useRef<{
    x: number;
    y: number;
    startedAt: number;
    isHorizontal: boolean;
  } | null>(null);
  const modeViewportRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const cookPanelRef = useRef<HTMLDivElement>(null);
  const [modePanelHeight, setModePanelHeight] = useState<number>();
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingMode, setIsDraggingMode] = useState(false);

  const handleModeTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const target = event.target;

    // Preserve taps, typing, links, and controls. Swipe from the surrounding panel instead.
    if (
      target instanceof Element &&
      target.closest(
        "button, a, input, textarea, select, [role='button'], [role='tab'], [contenteditable='true']"
      )
    ) {
      swipeStartRef.current = null;
      return;
    }

    const touch = event.touches[0];
    if (!touch) return;

    swipeStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      startedAt: Date.now(),
      isHorizontal: false,
    };
  };

  const handleModeTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const start = swipeStartRef.current;
    const touch = event.touches[0];
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    // Wait until the intent is clearly horizontal, so vertical page scrolling stays natural.
    if (!start.isHorizontal) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.1) {
        swipeStartRef.current = null;
        return;
      }
      start.isHorizontal = true;
    }

    setIsDraggingMode(true);
    setDragOffset(deltaX);
  };

  const finishModeGesture = (deltaX?: number) => {
    const viewportWidth = modeViewportRef.current?.getBoundingClientRect().width ?? 360;
    const distanceThreshold = Math.max(64, Math.min(120, viewportWidth * 0.2));
    const start = swipeStartRef.current;
    const elapsed = start ? Math.max(1, Date.now() - start.startedAt) : 1;
    const velocity = deltaX === undefined ? 0 : deltaX / elapsed;
    const isFastFlick = deltaX !== undefined && Math.abs(deltaX) > 24 && Math.abs(velocity) > 0.45;
    const shouldSwitch = deltaX !== undefined && (Math.abs(deltaX) >= distanceThreshold || isFastFlick);

    if (start?.isHorizontal && shouldSwitch) {
      if (deltaX! < 0 && mode === "search") {
        setMode("cook");
      } else if (deltaX! > 0 && mode === "cook") {
        setMode("search");
      }
    }

    // Re-enable transitions before resetting the offset. The track then glides to its snap point.
    swipeStartRef.current = null;
    setIsDraggingMode(false);
    setDragOffset(0);
  };

  const handleModeTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const start = swipeStartRef.current;
    const touch = event.changedTouches[0];
    if (!start || !touch) {
      setIsDraggingMode(false);
      setDragOffset(0);
      return;
    }

    finishModeGesture(touch.clientX - start.x);
  };

  const handleModeTouchCancel = () => {
    swipeStartRef.current = null;
    setIsDraggingMode(false);
    setDragOffset(0);
  };

  // Let the active panel resist a drag beyond either end, rather than revealing empty space.
  const resistedDragOffset =
    mode === "search"
      ? dragOffset > 0
        ? dragOffset * 0.18
        : dragOffset
      : dragOffset < 0
        ? dragOffset * 0.18
        : dragOffset;

  const trackTransform = `translate3d(calc(${mode === "search" ? "0%" : "-50%"} + ${resistedDragOffset}px), 0, 0)`;

  // Keep the carousel viewport matched to the active panel while it slides.
  // ResizeObserver also catches changes caused by responsive wrapping or async content.
  useLayoutEffect(() => {
    const activePanel = mode === "search" ? searchPanelRef.current : cookPanelRef.current;
    if (!activePanel) return;

    const updateHeight = () => {
      setModePanelHeight(activePanel.getBoundingClientRect().height);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(updateHeight);
    observer.observe(activePanel);
    return () => observer.disconnect();
  }, [mode]);

  const goWithPreload = (dish: string) => {
    const predefined = findPredefinedRecipe(dish);
    if (predefined?.image) new Image().src = predefined.image;
    go(dish);
  };

  const { identify, reset, status, preview, result, error } = useIdentifyDish();

  const handleImage = async (file: File) => {
    const res = await identify(file);
    if (!res?.dishName) return;

    const name = findPredefinedRecipe(res.dishName)?.dishName ?? res.dishName;
    setTerm(name);
    if (res.confidence >= AUTO_SEARCH_CONFIDENCE) goWithPreload(name);
  };

  // Once the big wordmark scrolls out of view, the header wordmark fades in.
  const brandRef = useRef<HTMLHeadingElement>(null);
  const [brandInView, setBrandInView] = useState(true);

  const [valuePropsExpanded, setValuePropsExpanded] = useState(true);

  useEffect(() => {
    document.title = "Rasoi Bazaar | Home-style Indian cooking";
  }, []);

  useEffect(() => {
    const element = brandRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setBrandInView(entry.isIntersecting),
      { rootMargin: "-56px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 w-full">
      <CompactHeader showSearch={false} overlay revealed={!brandInView} />

      <main>
        {/* Hero: one brand moment, one decision */}
        <section className="mx-auto flex min-h-[72svh] max-w-3xl flex-col items-center justify-center px-4 py-12 text-center sm:py-16 lg:min-h-0 lg:pt-24 lg:pb-10">
          <span className="rounded-full bg-orange-400/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-100">
            Aaj khane mai kya banaye?
          </span>

          <h1
            ref={brandRef}
            className="mt-5 font-brand text-4xl font-black tracking-tight text-orange-200 sm:text-6xl"
          >
            Rasoi Bazaar
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-400 sm:text-lg md:text-xl">
            Recipes you can follow, ingredients you can order, and get help when you're stuck.
          </p>

          <div
            className="w-full touch-pan-y"
            onTouchStart={handleModeTouchStart}
            onTouchMove={handleModeTouchMove}
            onTouchEnd={handleModeTouchEnd}
            onTouchCancel={handleModeTouchCancel}
          >
            {/* Mode toggle — replaces two sections competing for attention */}
            <div
              role="tablist"
              aria-label="How do you want to start?"
              className="mt-7 inline-flex rounded-full border border-stone-700 bg-stone-900/60 p-1"
            >
              <button
                role="tab"
                aria-selected={mode === "search"}
                onClick={() => setMode("search")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  mode === "search"
                    ? "bg-orange-200 text-stone-900"
                    : "text-stone-300 hover:text-stone-100"
                }`}
              >
                I know what I want
              </button>
              <button
                role="tab"
                aria-selected={mode === "cook"}
                onClick={() => setMode("cook")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  mode === "cook"
                    ? "bg-orange-200 text-stone-900"
                    : "text-stone-300 hover:text-stone-100"
                }`}
              >
                Help me decide
              </button>
            </div>

            <div className="mx-auto mt-8 w-full max-w-2xl">
              <div
                ref={modeViewportRef}
                className="relative w-full overflow-hidden touch-pan-y transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={modePanelHeight === undefined ? undefined : { height: `${modePanelHeight}px` }}
              >
                <div
                  className={`flex items-start will-change-transform ${
                    isDraggingMode
                      ? "transition-none"
                      : "transition-transform duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  }`}
                  style={{
                    width: "200%",
                    transform: trackTransform,
                  }}
                >
                  <div
                    ref={searchPanelRef}
                    aria-hidden={mode !== "search"}
                    className={`min-w-0 shrink-0 transition-opacity duration-300 ${
                      mode === "search" ? "opacity-100" : "pointer-events-none opacity-95"
                    }`}
                    style={{ width: "50%" }}
                  >
                  <SearchBar
                    searchTerm={term}
                    setSearchTerm={setTerm}
                    onSearch={(search) => goWithPreload(search)}
                    isLoading={false}
                    compact={false}
                    onImageSelected={handleImage}
                    imagePreview={preview}
                    isIdentifying={status === "identifying"}
                    onClearImage={reset}
                  />

                  {status === "error" && (
                    <p className="mt-3 text-sm text-red-300" role="alert">
                      {error}
                    </p>
                  )}

                  {status === "done" && result && !result.dishName && (
                    <p className="mt-3 text-sm text-stone-400" role="status">
                      Couldn&apos;t spot a dish in this photo. Try a closer shot, or type the name above.
                    </p>
                  )}

                  {status === "done" &&
                    result?.dishName &&
                    result.confidence < AUTO_SEARCH_CONFIDENCE && (
                      <div className="mt-3 text-left text-sm text-stone-300" role="status">
                        Not fully sure, but this looks like one of these:
                        <div className="mt-2 flex flex-wrap gap-2">
                          {[
                            { dishName: result.dishName, confidence: result.confidence },
                            ...result.alternatives,
                          ].map((c) => (
                            <button
                              key={c.dishName}
                              type="button"
                              onClick={() => goWithPreload(c.dishName)}
                              className="rounded-full border border-stone-700 bg-stone-900 px-3 py-1 text-stone-100 hover:border-orange-400 hover:text-orange-200"
                            >
                              {c.dishName}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="mt-6">
                    <RecipeSuggestionChips onSelect={goWithPreload} />
                  </div>
                  </div>
                  <div
                    ref={cookPanelRef}
                    aria-hidden={mode !== "cook"}
                    className={`min-w-0 shrink-0 transition-opacity duration-300 ${
                      mode === "cook" ? "opacity-100" : "pointer-events-none opacity-95"
                    }`}
                    style={{ width: "50%" }}
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-stone-700/70 bg-stone-900">
  {/* Photo as a soft backdrop wash — not boxed, not cropped into a panel */}
  <img
    src="/cookwhatyouhave_cover.png"
    alt=""
    className="absolute inset-0 h-full w-full object-cover opacity-[0.35] transition-transform duration-700 ease-out group-hover:scale-105"
    draggable={false}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/85 to-stone-900/35" />
  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />

  {/* Content */}
  <div className="relative px-6 py-8 sm:max-w-md sm:px-9 sm:py-10">
    <h2 className="font-serif text-2xl font-semibold leading-tight text-orange-50 sm:text-[1.7rem]">
      Cook what you have
    </h2>

    <p className="mt-2.5 text-sm leading-relaxed text-stone-300 sm:text-base">
      Show us your appliances and groceries - we&apos;ll match them to dishes
      you can start cooking right now.
    </p>

    <div className="mt-6 divide-y divide-stone-700/50 border-y border-stone-700/50">
      {COOK_STEPS.map((step, index) => (
        <div key={step} className="flex items-baseline gap-3 py-2.5">
          <span className="font-serif text-sm text-orange-300/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm text-stone-200">{step}</span>
        </div>
      ))}
    </div>

    <Link
      to="/cook-what-you-have"
      className="mt-6 inline-flex w-fit items-center justify-center rounded-xl bg-orange-200 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-100 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
    >
      See what you can make
    </Link>
  </div>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value-prop strip — collapsible for returning users who already know this */}
        <section className="relative border-y border-stone-800/70 bg-stone-900/30">
          <button
            type="button"
            onClick={() => setValuePropsExpanded((v) => !v)}
            aria-expanded={valuePropsExpanded}
            aria-label={valuePropsExpanded ? "Minimise" : "Expand"}
            className="absolute right-4 top-3 z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200 sm:right-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform duration-300 ${
                valuePropsExpanded ? "" : "rotate-180"
              }`}
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>

          {valuePropsExpanded ? (
            <div
              key="expanded"
              className="value-props-jump-in mx-auto grid max-w-5xl gap-6 px-4 py-8 pr-12 sm:grid-cols-3 sm:px-6 sm:pr-14"
            >
              {VALUE_PROPS.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-6 w-6 shrink-0 text-orange-300"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-stone-100">{item.title}</p>
                    <p className="mt-0.5 text-sm text-stone-400">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <button
              key="collapsed"
              type="button"
              onClick={() => setValuePropsExpanded(true)}
              className="value-props-jump-in mx-auto block w-full max-w-5xl px-4 py-3 pr-12 text-left text-sm text-stone-400 hover:text-stone-200 sm:px-6 sm:pr-14"
            >
              <span className="font-semibold text-stone-200">About Rasoi Bazaar</span>
              <span className="ml-2">
                Recipes, Instamart ordering, and &ldquo;Hey Chef&rdquo; help - tap to see more
              </span>
            </button>
          )}
        </section>

        {/* Browse, full width — supporting content, not a competing hero */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <CategoryBrowser onSelect={goWithPreload} />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
          <RecentlyCooked />
        </section>
      </main>
    </div>
  );
};

export default HomePage;