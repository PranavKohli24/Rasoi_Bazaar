import React, { useEffect, useRef, useState } from "react";
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
  "Add what's in your pantry",
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

          <div className="mt-8 w-full max-w-2xl">
            {mode === "search" ? (
              <>
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
              </>
            ) : (
              <div className="rounded-3xl border border-orange-400/30 bg-[#FFE3C2] p-6 text-left sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-orange-200"
                      aria-hidden="true"
                    >
                      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
                      <path d="M6 17h12" />
                    </svg>
                  </span>

                  <img
                    src="/cookwhatyouhave_cover.png"
                    alt=""
                    className="-mr-1 -mt-2 h-24 w-auto object-contain drop-shadow-lg sm:h-28"
                    draggable={false}
                  />
                </div>

                <h2 className="mt-4 font-serif text-2xl font-black text-orange-50 sm:text-3xl">
                  Cook what you have
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-stone-300 sm:text-base">
                  Not sure what to make? Show us your kitchen and pantry, and
                  we&apos;ll suggest dishes you can cook right now.
                </p>

                <ol className="mt-5 space-y-3">
                  {COOK_STEPS.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-center gap-3 text-sm text-stone-200"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-200 text-xs font-bold text-stone-900">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <Link
                  to="/cook-what-you-have"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:w-auto"
                >
                  Get started
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Value-prop strip — collapsible for returning users who already know this */}
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