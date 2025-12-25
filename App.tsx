import React, { useState, useCallback, useRef } from 'react';
import { Recipe } from './types';
import { fetchRecipe } from './services/geminiService';
import SearchBar from './components/SearchBar';
import RecipeDisplay from './components/RecipeDisplay';
import CookingCompanion from './components/CookingCompanion';
import ErrorMessage from './components/ErrorMessage';
import RecipeSuggestionChips from './components/RecipeSuggestionChips';
import CategoryBrowser from './components/CategoryBrowser';
import CelebrationPopup from './components/CelebrationPopup';

const BACKGROUND_IMG = "https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?cs=srgb&dl=pexels-mvdheuvel-2284166.jpg&fm=jpg?q=80&w=2187&auto=format&fit=crop";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHero, setIsHero] = useState<boolean>(true);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const performSearch = useCallback(async (dish: string) => {
    if (!dish.trim() || isLoading) return;

    setIsHero(false);
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    // Small delay to allow the layout transition to start before scrolling
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);

    try {
      const fetchedRecipe = await fetchRecipe(dish);
      setRecipe(fetchedRecipe);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unexpected error occurred.');
        }
    } finally {
      setIsLoading(false);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Added bg-stone-950 to ensure dark mode works everywhere
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans transition-colors duration-500 selection:bg-orange-500/30">
      
      {/* --- Global Background Image (Fixed Position for better Mobile Performance) --- */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('${BACKGROUND_IMG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isHero ? 0.15 : 0.05, // Dim the background when reading recipe
          transition: 'opacity 1s ease-in-out'
        }}
      />

      {/* --- Hero Section --- */}
      <section 
        className={`relative z-10 w-full flex flex-col justify-center items-center px-4 text-center transition-all duration-700 ease-in-out ${isHero ? 'min-h-[90vh]' : 'pt-24 pb-12'}`}
      >
        <div className="w-full flex flex-col items-center max-w-4xl">
            <div className={`transition-all duration-700 ${isHero ? 'opacity-100 translate-y-0' : 'opacity-100 scale-90'}`}>
                <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-300 drop-shadow-lg mt-8 sm:mt-10 tracking-tight">
                  Rasoi Bazaar
                </h1>
                
                {/* Hide description when not in hero mode to save space */}
                <div className={`overflow-hidden transition-all duration-500 ${isHero ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                  <p className="text-base sm:text-lg md:text-xl text-stone-400 max-w-xl sm:max-w-2xl mx-auto px-2 leading-relaxed">
                    Your personal guide to home-style Indian cooking. <br className="hidden sm:block"/>
                    <span className="text-orange-200/90 font-medium">What delicious dish will you make today?</span>
                  </p>
                </div>
            </div>

            <div className="w-full max-w-2xl my-8 z-20">
                <SearchBar 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                />
            </div>
            
            {/* Suggestion Chips - Only show in Hero */}
            <div className={`w-full max-w-4xl transition-all duration-500 ${isHero && !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none absolute'}`}>
               <CategoryBrowser onSelect={handleSuggestionSelect} />
               <div className="mt-6">
                 <RecipeSuggestionChips onSelect={handleSuggestionSelect} />
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
        <p className="font-serif italic text-stone-400 mb-2">Happy Cooking!</p>
        <p>
          For any queries, contact at: {' '}
          <a href="mailto:hey@pranavkohli.me" className="text-orange-300/80 hover:text-orange-300 hover:underline transition-colors">
            hey@pranavkohli.me
          </a>
        </p>
      </footer>
      
      {showCelebration && <CelebrationPopup onReset={handleReset} />}
    </div>
  );
};

export default App;
