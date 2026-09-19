import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategoryBrowser from "../components/CategoryBrowser";
import RecipeSuggestionChips from "../components/RecipeSuggestionChips";
import { useDishSearch } from "../utils/dishRoutes";

const HomePage: React.FC = () => {
  const { term, setTerm, go } = useDishSearch();

  useEffect(() => {
    document.title = "Rasoi Bazaar | Home-style Indian cooking";
  }, []);

  return (
    <section className="relative z-10 flex min-h-[100svh] w-full flex-col items-center px-4 py-10 text-center sm:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <h1 className="mt-4 bg-gradient-to-b from-orange-100 to-orange-300 bg-clip-text font-serif text-5xl font-black tracking-tight text-transparent drop-shadow-lg sm:mt-6 sm:text-7xl md:text-8xl">
          Rasoi Bazaar
        </h1>

        <div className="mt-3 overflow-hidden">
          <p className="mx-auto max-w-2xl px-2 text-base leading-relaxed text-stone-400 sm:text-lg md:text-xl">
            Your personal guide to home-style Indian cooking.
            <br className="hidden sm:block" />
            <span className="font-medium text-stone-200">
              What delicious dish will you make today?
            </span>
          </p>
        </div>

        {/* 1. Search */}
        <div className="z-20 mt-7 w-full max-w-4xl sm:mt-9">
          <SearchBar
            searchTerm={term}
            setSearchTerm={setTerm}
            onSearch={() => go(term)}
            isLoading={false}
            compact={false}
          />
        </div>

        {/* Quiet shortcut for people who arrive with ingredients */}
        <Link
          to="/cook-what-you-have"
          className="mt-3 rounded-lg px-2 py-1 text-sm text-stone-400 transition-colors hover:text-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
        >
          No dish in mind?{" "}
          <span className="font-medium text-orange-300 underline underline-offset-4">
            Cook with what you have
          </span>
        </Link>

        {/* 2. Browse */}
        <div className="mt-8 w-full max-w-6xl sm:mt-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            <div className="w-full lg:w-2/3">
              <CategoryBrowser onSelect={go} />
            </div>

            <div className="mt-6 w-full lg:mt-8 lg:w-1/3">
              <RecipeSuggestionChips onSelect={go} />
            </div>
          </div>
        </div>

        {/* 3. Cook What You Have */}
        <div className="mt-12 w-full max-w-5xl sm:mt-16">
          <div
            className="flex items-center gap-4"
            role="separator"
            aria-label="or"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-stone-700" />
            <span className="text-sm text-stone-400">
              or start from your kitchen
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-stone-700" />
          </div>

          <div className="relative mt-6 overflow-hidden rounded-3xl border border-orange-400/70 bg-stone-950/65 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10" />

            <div className="relative grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4 p-4 text-left sm:gap-x-6 sm:p-6 md:flex md:gap-7 md:px-7">
              {/* Basket */}
              <div className="flex w-20 shrink-0 justify-center sm:w-28 md:w-40">
                <img
                  src="/basket.png"
                  alt="Basket of fresh ingredients"
                  className="max-h-24 w-full object-contain drop-shadow-2xl sm:max-h-28 md:max-h-32"
                  draggable={false}
                />
              </div>

              {/* Copy */}
              <div className="min-w-0 md:flex-1">
                <h2 className="flex items-center gap-1.5 font-serif text-xl font-black leading-tight text-orange-50 sm:gap-2 sm:text-2xl md:text-3xl">
                  <img
                    src="/chef-hat.svg"
                    alt=""
                    className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
                    draggable={false}
                  />
                  Cook What You Have
                </h2>

                <p className="mt-1.5 max-w-2xl text-sm leading-snug text-stone-300 sm:text-base sm:leading-relaxed">
                  <span className="md:hidden">
                    Tell us what&apos;s in your kitchen and we&apos;ll find
                    dishes you can make right now.
                  </span>
                  <span className="hidden md:inline">
                    Have ingredients lying around? Tell us what you have and
                    we&apos;ll find delicious recipes you can actually make.
                  </span>
                </p>
              </div>

              {/* Action */}
              <div className="col-span-2 shrink-0 md:col-span-1 md:w-auto">
                <Link
                  to="/cook-what-you-have"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300/70 md:w-auto"
                >
                  Get Started
                </Link>
              </div>

              <div className="hidden w-[150px] shrink-0 flex-col items-center justify-center lg:flex">
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
                  aria-hidden="true"
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
        </div>
      </div>
    </section>
  );
};

export default HomePage;