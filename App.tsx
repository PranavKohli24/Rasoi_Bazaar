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

    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);

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

  const handleSearch = () => {
    performSearch(searchTerm);
  };
  
  const handleSuggestionSelect = (dish: string) => {
    setSearchTerm(dish);
    performSearch(dish);
  };

  const handleFinishCooking = () => {
    setShowCelebration(true);
  };

  const handleReset = () => {
    setShowCelebration(false);
    setRecipe(null);
    setSearchTerm('');
    setError(null);
    setIsHero(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen text-stone-200 font-sans transition-all duration-500">
      
      {/* --- Hero Section --- */}
      <section 
        className={`relative w-full flex flex-col justify-center items-center px-4 text-center transition-all duration-700 ease-in-out ${isHero ? 'min-h-screen' : 'pt-24 pb-12'}`}
      >
        <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2187&auto=format&fit=crop')", opacity: isHero ? 0.15 : 0, transition: 'opacity 1s ease-in-out'}}
        >
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
            <div className="animate-fade-in-up">
                <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-black text-white drop-shadow-2xl  mt-8 sm:mt-10">
  Rasoi Bazaar
</h1>
<p className="mt-3 text-base sm:text-lg md:text-xl text-orange-200/90 max-w-xl sm:max-w-2xl mx-auto px-2">
  Your personal guide to home-style Indian cooking. <br />
  What delicious journey will you make today?
</p>

            </div>

            <div className="w-full max-w-2xl my-8 z-10">
                <SearchBar 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                />
            </div>
            
            {isHero && !isLoading && !recipe && (
              <div className="w-full max-w-3xl">
                <CategoryBrowser onSelect={handleSuggestionSelect} />
                <RecipeSuggestionChips onSelect={handleSuggestionSelect} />
              </div>
            )}
        </div>
      </section>

      {/* --- Results Section --- */}
      <main ref={resultsRef} className="container mx-auto px-4 pb-20">
        <div className="w-full max-w-7xl mx-auto">
            {isLoading && <CookingCompanion />}
            {error && <ErrorMessage message={error} />}
            {recipe && !isLoading && <RecipeDisplay recipe={recipe} onFinishCooking={handleFinishCooking} />}
        </div>
      </main>

      <footer className="text-center py-6 mt-auto text-stone-500 text-sm bg-stone-900/50 border-t border-stone-800">
        <p>Happy Cooking!</p>
        <p>For any queries, 
          contact at: hey@pranavkohli.me</p>
      </footer>
      
      {showCelebration && <CelebrationPopup onReset={handleReset} />}
    </div>
  );
};

export default App;