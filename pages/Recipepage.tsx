import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Recipe } from "../types";
import { fetchRecipe, isRecipe } from "../services/geminiService";
import CompactHeader from "../components/CompactHeader";
import CookingCompanion from "../components/CookingCompanion";
import ErrorMessage from "../components/ErrorMessage";
import RecipeDisplay from "../components/RecipeDisplay";
import CelebrationPopup from "../components/CelebrationPopup";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";
import { toSlug } from "../utils/dishRoutes";

const LAST_DISH_KEY = "rasoi:last-dish";

// Shown instead of any technical error text.
const FRIENDLY_ERROR =
  "We couldn't cook up this recipe right now. Please try again in a moment, or search for another dish.";

const readLastDish = (): string => {
  try {
    return sessionStorage.getItem(LAST_DISH_KEY) ?? "";
  } catch {
    return "";
  }
};

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // The dish comes from navigation state. The session fallback keeps refresh
  // and returning from an external login (e.g. Swiggy) working.
  const stateDish = (location.state as { dish?: string } | null)?.dish;
  const dish = stateDish ?? readLastDish();
  const slug = toSlug(dish);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load the recipe whenever the URL changes (search, link, refresh, back/forward)
  useEffect(() => {
    if (!dish) {
      navigate("/", { replace: true });
      return;
    }

    try {
      sessionStorage.setItem(LAST_DISH_KEY, dish);
    } catch {
      /* ignore storage problems */
    }

    let cancelled = false;
    const cacheKey = `rasoi:recipe:${slug}`;

    setShowCelebration(false);

        // Predefined recipes are matched by full name, dish name and shorter aliases,
    // so no API call is needed.
    const predefined = findPredefinedRecipe(dish);

    if (predefined) {
      setRecipe(predefined);
      setError(null);
      setIsLoading(false);
      return;
    }
    

    // Reuse a recipe fetched earlier this session (refresh / back button)
    try {
      const cached = sessionStorage.getItem(cacheKey);
      const parsed = cached ? JSON.parse(cached) : null;
      // A saved copy that is broken or from an older version is ignored and fetched again.
      if (isRecipe(parsed)) {
        setRecipe(parsed);
        setError(null);
        setIsLoading(false);
        return;
      }
    } catch {
      /* ignore storage problems */
    }

    setRecipe(null);
    setError(null);
    setIsLoading(true);

    fetchRecipe(dish)
      .then((fetched) => {
        if (cancelled) return;
        setRecipe(fetched);
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(fetched));
        } catch {
          /* ignore storage problems */
        }
      })
      .catch((err) => {
        if (cancelled) return;
        // geminiService only throws user-safe messages (e.g. "That doesn't look like a
        // dish - try Paneer Butter Masala"), so those are shown as written. Anything
        // unexpected falls back to the friendly message. Details go to the console.
        console.error("Recipe fetch failed:", err);
        setError(err instanceof Error && err.message ? err.message : FRIENDLY_ERROR);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, dish, navigate]);

  useEffect(() => {
    document.title = `${recipe?.dishName ?? dish} recipe | Rasoi Bazaar`;
  }, [recipe, dish]);

  return (
    <div className="relative z-10 w-full">
      <CompactHeader />

      <main className="mx-auto min-h-[60vh] w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto w-full max-w-6xl">
          {isLoading && <CookingCompanion />}
          {error && <ErrorMessage message={error} />}
          {recipe && !isLoading && (
            <div className="animate-fade-in-up">
              <RecipeDisplay
                recipe={recipe}
                onFinishCooking={() => setShowCelebration(true)}
              />
            </div>
          )}
        </div>
      </main>

      {showCelebration && (
        <CelebrationPopup
          dishName={recipe?.dishName}
          onReset={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default RecipePage;