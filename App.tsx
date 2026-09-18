import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Recipe } from './types';
import { fetchRecipe } from './services/geminiService';
import SearchBar from './components/SearchBar';
import RecipeDisplay from './components/RecipeDisplay';
import CookingCompanion from './components/CookingCompanion';
import ErrorMessage from './components/ErrorMessage';
import CategoryBrowser from './components/CategoryBrowser';
import CelebrationPopup from './components/CelebrationPopup';
import RecipeSuggestionChips from './components/RecipeSuggestionChips';
import CookWhatYouHave from './components/CookWhatYouHave';

const BACKGROUND_DESKTOP = "/background.png";
const BACKGROUND_MOBILE = "/background_mobile.png";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHero, setIsHero] = useState<boolean>(true);
  const [showCookWhatYouHave, setShowCookWhatYouHave] = useState(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotionRef = useRef<boolean>(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

 const cookWhatYouHaveRef = useRef<HTMLDivElement>(null);
  const backPressTimeRef = useRef<number | null>(null);
  const recipeHistoryActiveRef = useRef(false);
  const ignoreNextPopRef = useRef(false);
  const restoringHistoryRef = useRef(false);
  const activeRequestIdRef = useRef(0);

  useEffect(() => {
    const previousScrollRestoration = history.scrollRestoration;

    history.scrollRestoration = 'manual';

    return () => {
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (!isHero && !recipeHistoryActiveRef.current) {
      history.pushState({ recipeScreen: true }, '', window.location.href);
      recipeHistoryActiveRef.current = true;
    }
  }, [isHero]);

  useEffect(() => {
  if (!showCookWhatYouHave) return;

  const timer = window.setTimeout(() => {
    cookWhatYouHaveRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, 100);

  return () => window.clearTimeout(timer);
}, [showCookWhatYouHave]);

  useEffect(() => {
    const handlePopState = () => {
      if (ignoreNextPopRef.current) {
        ignoreNextPopRef.current = false;
        return;
      }

      if (restoringHistoryRef.current) {
        restoringHistoryRef.current = false;
        return;
      }

      if (!recipeHistoryActiveRef.current) {
        return;
      }

      const now = Date.now();
      const lastBack = backPressTimeRef.current;

      if (lastBack && now - lastBack <= 10000) {
        backPressTimeRef.current = null;
        recipeHistoryActiveRef.current = false;
        activeRequestIdRef.current++;

        setShowCelebration(false);
        setRecipe(null);
        setSearchTerm('');
        setError(null);
        setIsHero(true);
        setIsLoading(false);

        const prefersReducedMotion =
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
        return;
      }

      backPressTimeRef.current = now;
      restoringHistoryRef.current = true;
      history.forward();

      window.setTimeout(() => {
        if (
          backPressTimeRef.current &&
          Date.now() - backPressTimeRef.current >= 10000
        ) {
          backPressTimeRef.current = null;
        }
      }, 10000);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const performSearch = useCallback(async (dish: string) => {
    if (!dish.trim() || isLoading) return;

    const requestId = ++activeRequestIdRef.current;

    setIsHero(false);
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 400);

    try {
      const fetchedRecipe = await fetchRecipe(dish);
      if (activeRequestIdRef.current !== requestId) return;
      setRecipe(fetchedRecipe);
      setSearchTerm('');
    } catch (err) {
      if (activeRequestIdRef.current !== requestId) return;

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      if (activeRequestIdRef.current === requestId) setIsLoading(false);
    }
  }, [isLoading]);

  const handleSearch = () => performSearch(searchTerm);

  const handleSuggestionSelect = (dish: string) => {
    setSearchTerm(dish);
    performSearch(dish);
  };

  const handleFinishCooking = () => setShowCelebration(true);

  const handleReset = () => {
    setShowCelebration(false);
    setRecipe(null);
    setSearchTerm('');
    setError(null);
    setIsHero(true);
    setIsLoading(false);
    backPressTimeRef.current = null;
    activeRequestIdRef.current++;

    if (recipeHistoryActiveRef.current) {
      recipeHistoryActiveRef.current = false;
      ignoreNextPopRef.current = true;
      history.back();
    }

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-orange-500/30">
      <div className="fixed inset-x-0 top-0 z-0 pointer-events-none overflow-hidden h-[100svh]">
        <picture className="absolute inset-0 block">
          <source
            media="(max-width: 767px)"
            srcSet={BACKGROUND_MOBILE}
          />
          <img
            src={BACKGROUND_DESKTOP}
            alt=""
            loading="eager"
            fetchPriority="high"
            onLoad={() => setBackgroundLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              opacity: backgroundLoaded ? (isHero ? 0.35 : 0.09) : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-stone-950/25" />
      </div>

      <section
        className={`relative z-10 w-full flex flex-col items-center px-4 text-center transition-all duration-700 ease-in-out ${
          isHero ? 'min-h-[100svh] py-10 sm:py-14' : 'pt-24 pb-12'
        }`}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          {!isHero && (
            <h1 className="absolute top-4 left-4 sm:top-6 sm:left-8 z-50 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-300 drop-shadow-lg tracking-tight">
              Rasoi Bazaar
            </h1>
          )}

          <div
            className={`w-full transition-all duration-700 ${
              isHero ? 'opacity-100 translate-y-0' : 'opacity-100 scale-90'
            }`}
          >
            {isHero && (
              <>
                <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-300 drop-shadow-lg mt-4 sm:mt-6 tracking-tight">
                  Rasoi Bazaar
                </h1>

                <div className="overflow-hidden mt-3">
                  <p className="text-base sm:text-lg md:text-xl text-stone-400 max-w-2xl mx-auto px-2 leading-relaxed">
                    Your personal guide to home-style Indian cooking.
                    <br className="hidden sm:block" />
                    <span className="text-stone-200 font-medium">
                      What delicious dish will you make today?
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>

          <div
            className={
              isHero
                ? 'w-full max-w-4xl mt-7 sm:mt-9 z-20'
                : 'absolute top-[55px] right-3 z-30 w-[min(92vw,760px)]'
            }
          >
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              isLoading={isLoading}
              compact={!isHero}
            />
          </div>

          {isHero && (
            <div className="w-full max-w-5xl mt-5 sm:mt-7">
              <div className="relative overflow-hidden rounded-3xl border border-orange-400/70 bg-stone-950/65 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10" />

                <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-7 px-5 py-5 sm:px-7 sm:py-6 text-left">
                  <div className="shrink-0 w-28 sm:w-36 md:w-40 flex justify-center">
                    <img
                      src="/basket.png"
                      alt="Basket of fresh ingredients"
                      className="w-full max-h-28 sm:max-h-32 object-contain drop-shadow-2xl"
                      draggable={false}
                    />
                  </div>

                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                      <img
                          src="/chef-hat.svg"
                          alt=""
                          className="h-7 w-7 object-contain"
                          draggable={false}
                      />
                      <h2 className="font-serif text-2xl sm:text-3xl font-black text-orange-50">
                        Cook What You Have
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
                      Have ingredients lying around? Tell us what you have and
                      we&apos;ll find delicious recipes you can actually make.
                    </p>
                  </div>

                  <div className="shrink-0 w-full md:w-auto">
                    <button
    type="button"
    onClick={() => setShowCookWhatYouHave(true)}
    className="inline-flex items-center justify-center rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 shadow-lg transition-all duration-200 hover:bg-orange-100 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-300/70"
>
    Get Started
</button>
                  </div>

                  <div className="hidden lg:flex flex-col items-center justify-center w-[150px] shrink-0">
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
          )}

          <div
    className={`w-full max-w-6xl transition-all duration-500 ${
        isHero && !isLoading
            ? 'opacity-100 translate-y-0 mt-8 sm:mt-10'
            : 'opacity-0 translate-y-4 pointer-events-none absolute'
    }`}
>
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">

        {/* Categories */}
        <div className="w-full lg:w-2/3">
            <CategoryBrowser onSelect={handleSuggestionSelect} />
        </div>

        {/* Quick suggestions */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-8">
            <RecipeSuggestionChips onSelect={handleSuggestionSelect} />
        </div>

    </div>
</div>
        </div>
      </section>

{showCookWhatYouHave && (
  <div ref={cookWhatYouHaveRef}>
    <CookWhatYouHave
      onSelectDish={(dish) => {
        setShowCookWhatYouHave(false);
        handleSuggestionSelect(dish);
      }}
    />
  </div>
)}
      <main
        ref={resultsRef}
        className="relative z-10 container mx-auto px-4 pb-20 min-h-[40vh]"
      >
        <div className="w-full max-w-6xl mx-auto">
          {isLoading && <CookingCompanion />}
          {error && <ErrorMessage message={error} />}
          {recipe && !isLoading && (
            <div className="animate-fade-in-up">
              <RecipeDisplay
                recipe={recipe}
                onFinishCooking={handleFinishCooking}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 text-center pb-10 pt-2 mt-auto">
        {isHero && (
          <div className="flex items-center justify-center gap-5 px-4 mb-4">
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent to-stone-600" />
            <span className="text-base text-orange-200/90">😋</span>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-l from-transparent to-stone-600" />
          </div>
        )}

        <p className="font-[cursive] text-lg sm:text-xl text-orange-100/85">
          Good Food Brings People Together
        </p>

        <div className="mt-4 text-sm text-stone-600">
    <p>
        Designed & Built by{' '}
        <a
            href="https://www.linkedin.com/in/pranavkohli24/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-200/80 hover:text-orange-400 transition-colors"
        >
            Pranav Kohli
        </a>
    </p>

    <p className="mt-1">
        For any queries, mail me (Pranav) at:{' '}
        <a
            href="mailto:hey@pranavkohli.me"
            className="hover:text-stone-400 transition-colors"
        >
            hey@pranavkohli.me
        </a>
    </p>

    <p className="mt-1">
        © {new Date().getFullYear()} Rasoi Bazaar
    </p>
</div>
      </footer>

      {showCelebration && (
        <CelebrationPopup
          dishName={recipe?.dishName}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default App;
