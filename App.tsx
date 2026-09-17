import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Recipe } from './types';
import { fetchRecipe } from './services/geminiService';
import SearchBar from './components/SearchBar';
import RecipeDisplay from './components/RecipeDisplay';
import CookingCompanion from './components/CookingCompanion';
import ErrorMessage from './components/ErrorMessage';
import RecipeSuggestionChips from './components/RecipeSuggestionChips';
import CategoryBrowser from './components/CategoryBrowser';
import CelebrationPopup from './components/CelebrationPopup';

// High-quality background image
// Responsive background images
const BACKGROUND_DESKTOP = "/background.png";
const BACKGROUND_MOBILE = "/background_mobile.png";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHero, setIsHero] = useState<boolean>(true);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);


  const resultsRef = useRef<HTMLDivElement>(null);

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
  const handlePopState = () => {
    // Ignore the popstate caused by our own reset navigation.
    if (ignoreNextPopRef.current) {
      ignoreNextPopRef.current = false;
      return;
    }

    // Ignore the popstate caused by history.forward()
    // when handling the first back press.
    if (restoringHistoryRef.current) {
      restoringHistoryRef.current = false;
      return;
    }

    if (!recipeHistoryActiveRef.current) {
      return;
    }

    const now = Date.now();
    const lastBack = backPressTimeRef.current;

    // Second back within 10 seconds → stay on the current
    // Home history entry and reset the app.
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

      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // First back → temporarily go to Home, then immediately
    // restore the recipe history entry.
    backPressTimeRef.current = now;
    restoringHistoryRef.current = true;
    history.forward();

    // After 10 seconds, forget the first back.
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

    const requestId = ++activeRequestIdRef.current;   // NEW: tag this search

    setIsHero(false);
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);

    try {
      const fetchedRecipe = await fetchRecipe(dish);
      if (activeRequestIdRef.current !== requestId) return;
      setRecipe(fetchedRecipe);
      setSearchTerm('');
    } catch (err) {
        if (activeRequestIdRef.current !== requestId) return;   // NEW: abandoned, ignore
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unexpected error occurred.');
        }
    } finally {
      if (activeRequestIdRef.current === requestId) setIsLoading(false);   // CHANGED
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

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans transition-colors duration-500 selection:bg-orange-500/30">
      
      {/* --- Responsive Global Background Layer --- */}
<picture className="fixed inset-0 z-0 pointer-events-none block">
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
  className="w-full h-full object-cover object-center"
  style={{
    opacity: backgroundLoaded ? (isHero ? 0.35 : 0.09) : 0,
    transition: 'opacity 0.8s ease-in-out'
  }}
/>
</picture>

      {/* --- Hero Section --- */}
      <section 
        className={`relative z-10 w-full flex flex-col justify-center items-center px-4 text-center transition-all duration-700 ease-in-out ${isHero ? 'min-h-[90vh]' : 'pt-24 pb-12'}`}
      >
        <div className="w-full flex flex-col items-center max-w-6xl">
            {!isHero && (
  <h1 className="absolute top-4 left-4 sm:top-6 sm:left-8 z-50 font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-300 drop-shadow-lg tracking-tight">
    Rasoi Bazaar
  </h1>
)}

<div className={`transition-all duration-700 ${isHero ? 'opacity-100 translate-y-0' : 'opacity-100 scale-90'}`}>
  {isHero && (
    <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-300 drop-shadow-lg mt-8 sm:mt-10 tracking-tight">
      Rasoi Bazaar
    </h1>
  )}

  {/* Description collapses when not in hero mode */}
  <div className={`overflow-hidden transition-all duration-500 ${isHero ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
    <p className="text-base sm:text-lg md:text-xl text-stone-400 max-w-xl sm:max-w-2xl mx-auto px-2 leading-relaxed">
      Your personal guide to home-style Indian cooking.{" "}
      <br className="hidden sm:block" />
      <span className="text-orange-200/90 font-medium">
        What delicious dish will you make today?
      </span>
    </p>
  </div>
</div>
            <div
              className={
                isHero
                  ? "w-full max-w-2xl my-8 z-20"
                  : "absolute top-[55px] right-3 z-30 w-[min(92vw,760px)]"
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
            
            {/* Suggestions - Only visible in Hero mode */}
            <div
              className={`w-full max-w-6xl transition-all duration-500 ${
                isHero && !isLoading
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none absolute'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
                
                {/* Categories */}
                <div className="w-full lg:w-2/3">
                  <CategoryBrowser onSelect={handleSuggestionSelect} />
                </div>

                {/* Suggestions */}
                <div className="w-full lg:w-1/3 mt-6 lg:mt-8">
                  <RecipeSuggestionChips onSelect={handleSuggestionSelect} />
                </div>

              </div>
            </div>
        </div>
      </section>

      {/* --- Results Section --- */}
      <main ref={resultsRef} className="relative z-10 container mx-auto px-4 pb-20 min-h-[40vh]">
        <div className="w-full max-w-6xl mx-auto">
            {isLoading && <CookingCompanion />}
            {error && <ErrorMessage message={error} />}
            {recipe && !isLoading && (
              <div className="animate-fade-in-up">
                <RecipeDisplay recipe={recipe} onFinishCooking={handleFinishCooking} />
              </div>
            )}
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="relative z-10 text-center py-8 mt-auto text-stone-500 text-sm bg-stone-950/80 backdrop-blur-md border-t border-stone-800/50">
        <div className="flex flex-col items-center gap-2">
            <p className="font-serif italic text-stone-400">
              Happy Cooking!
            </p>

            {/* Branding / Portfolio Link */}
            <p>
              Designed & Built by{' '}
              <a 
                href="https://www.linkedin.com/in/pranavkohli24/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-200 hover:text-orange-400 font-medium transition-colors duration-300"
              >
                Pranav Kohli
              </a>
            </p>

            {/* Contact Info */}
            <div className="text-xs text-stone-600 mt-2">
              <p>© {new Date().getFullYear()} Rasoi Bazaar</p>
              <p className="mt-1">
                For any queries, mail me(Pranav) at: {' '}
                <a href="mailto:hey@pranavkohli.me" className="hover:text-stone-400 transition-colors">
                  hey@pranavkohli.me
                </a>
              </p>
            </div>
        </div>
      </footer>
      
      {/* --- Modals --- */}
      {showCelebration && <CelebrationPopup onReset={handleReset} />}
    </div>
  );
};

export default App;
