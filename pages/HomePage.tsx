import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CompactHeader from "../components/CompactHeader";
import SearchBar from "../components/SearchBar";
import CategoryBrowser from "../components/CategoryBrowser";
import RecipeSuggestionChips from "../components/RecipeSuggestionChips";
import SectionDivider from "../components/SectionDivider";
import { useDishSearch } from "../utils/dishRoutes";

const COOK_STEPS = [
  "Tap the appliances you own",
  "Add what's in your pantry",
  "Pick a dish and get the recipe",
];

const HomePage: React.FC = () => {
  const { term, setTerm, go } = useDishSearch();

  // The big wordmark sits in the middle of the hero. Once it scrolls out of
  // view, the header wordmark fades in at the top-left to take its place.
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
          <h1
            ref={brandRef}
            className="bg-gradient-to-b from-orange-100 to-orange-300 bg-clip-text font-brand text-6xl font-black tracking-tight text-transparent drop-shadow-lg sm:text-8xl"
          >
            Rasoi Bazaar
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg md:text-xl">
            Your personal guide to home-style Indian cooking.
            <br className="hidden sm:block" />
            <span className="font-medium text-stone-200">
              What delicious dish will you make today?
            </span>
          </p>

          <div className="mt-8 w-full max-w-2xl">
            <SearchBar
              searchTerm={term}
              setSearchTerm={setTerm}
              onSearch={() => go(term)}
              isLoading={false}
              compact={false}
            />
          </div>

          <div className="mt-5 w-full max-w-2xl">
            <RecipeSuggestionChips onSelect={go} />
          </div>

          <Link
            to="/cook-what-you-have"
            className="mt-4 rounded-lg px-2 py-1 text-sm text-stone-400 transition-colors hover:text-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
          >
            No dish in mind?{" "}
            <span className="font-medium text-orange-300 underline underline-offset-4">
              Cook with what you have
            </span>
          </Link>
        </section>

        {/* Two ways to get ideas: browse, or start from your kitchen */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-3">
              <CategoryBrowser onSelect={go} />
            </div>

            <aside className="flex flex-col lg:col-span-2">
              <SectionDivider label="or start from your kitchen" />

              <div className="relative mt-5 flex flex-1 flex-col overflow-hidden rounded-3xl border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-stone-900/60 to-stone-950/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-400/15">
                    <img
                      src="/chef-hat.svg"
                      alt=""
                      className="h-6 w-6 object-contain"
                      draggable={false}
                    />
                  </span>

                  <img
                    src="/basket.png"
                    alt=""
                    className="-mr-1 -mt-2 h-24 w-auto object-contain drop-shadow-2xl sm:h-28"
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
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:w-auto"
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

                    <svg
                      className="cook-note-arrow"
                      viewBox="0 0 68 48"
                    >
                      {/* Main curved arrow */}
                      <path d="M61 2 C60 13, 56 22, 47 29 C38 36, 27 38, 10 38" />

                      {/* Arrow head pointing toward Get Started */}
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