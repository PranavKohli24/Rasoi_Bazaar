import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CompactHeader from "../components/CompactHeader";
import SearchBar from "../components/SearchBar";
import CategoryBrowser from "../components/CategoryBrowser";
import RecipeSuggestionChips from "../components/RecipeSuggestionChips";
import SectionDivider from "../components/SectionDivider";
import { useDishSearch } from "../utils/dishRoutes";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";

const COOK_STEPS = [
  "Tap the appliances you own",
  "Add what's in your pantry",
  "Pick a dish and get the recipe",
];

const HomePage: React.FC = () => {
  const { term, setTerm, go } = useDishSearch();
  const goWithPreload = (dish: string) => {
    const predefined = findPredefinedRecipe(dish);
    if (predefined?.image) new Image().src = predefined.image;
    go(dish);
  };

  // Once the big wordmark scrolls out of view, the header wordmark fades in.
  const brandRef = useRef<HTMLHeadingElement>(null);
  const [brandInView, setBrandInView] = useState(true);

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
        {/* Hero: the brand, then one job, find a dish */}
        <section className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-4 py-14 text-center sm:py-20 lg:min-h-0 lg:justify-start lg:pb-12 lg:pt-28">
          <span className="rounded-full bg-orange-400/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-100">
            Aaj khane mai kya banaye?
          </span>

          <h1
            ref={brandRef}
            className="mt-5 font-brand text-4xl font-black tracking-tight text-orange-200 sm:text-6xl"
          >
            Rasoi Bazaar
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg md:text-xl">
            Recipes you can follow, with ingredients you have.
            <br className="hidden sm:block" />
            <span className="font-medium text-stone-100">
              What delicious dish will you make today?
            </span>
          </p>

          <div className="mt-8 w-full max-w-2xl">
            <SearchBar
              searchTerm={term}
              setSearchTerm={setTerm}
              onSearch={() => goWithPreload(term)}
              isLoading={false}
              compact={false}
            />
          </div>

          <div className="mt-6 w-full max-w-2xl">
            <RecipeSuggestionChips onSelect={goWithPreload} />
          </div>

          <Link
            to="/cook-what-you-have"
            className="mt-5 rounded-lg px-2 py-1 text-sm text-stone-400 transition-colors hover:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
          >
            No dish in mind?{" "}
            <span className="font-semibold text-orange-200 underline underline-offset-4">
              Cook with what you have
            </span>
          </Link>
        </section>

        {/* Two ways to get ideas: browse, or start from your kitchen */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-3">
              <CategoryBrowser onSelect={goWithPreload} />
            </div>

            <aside className="flex flex-col lg:col-span-2">
              <SectionDivider label="or start from your kitchen" />

              <div className="relative mt-5 flex flex-1 flex-col overflow-hidden rounded-3xl border border-orange-400/30 bg-[#FFE8D6] p-6 shadow-sm sm:p-7">
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
                    src="/basket.png"
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

                {/* Button, with the handwritten note and arrow pointing at it */}
                <div className="mt-auto flex flex-col gap-4 pt-7 sm:flex-row sm:items-center">
                  <Link
                    to="/cook-what-you-have"
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:w-auto"
                  >
                    Get started
                    <span aria-hidden="true">→</span>
                  </Link>

                  <div
                    className="hidden w-[150px] shrink-0 flex-col items-center justify-center sm:flex"
                    aria-hidden="true"
                  >
                    <div className="cook-note">
                      Good food
                      <br />
                      starts with
                      <br />
                      what you have
                    </div>

                    <svg className="cook-note-arrow" viewBox="0 0 68 48">
                      <path d="M61 2 C60 13, 56 22, 47 29 C38 36, 27 38, 10 38" />
                      <path d="M10 38 L21 31" />
                      <path d="M10 38 L21 44" />
                    </svg>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;