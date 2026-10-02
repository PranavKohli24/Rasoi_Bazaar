import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "../types";
import { fetchRecipe, isRecipe } from "../services/geminiService";
import CompactHeader from "../components/CompactHeader";
import RecipeLoading from "../components/RecipeLoading";
import RecipeError, { ErrorKind } from "../components/RecipeError";
import RecipeDisplay from "../components/RecipeDisplay";
import CelebrationPopup from "../components/CelebrationPopup";
import {
  findPredefinedRecipeBySlug,
  findSimilarRecipes,
} from "../utils/findPredefinedRecipe";
import { RECIPE_PATH, toSlug, fromSlug, useDishSearch } from "../utils/dishRoutes";

// Shown instead of any technical error text.
const FRIENDLY_ERROR =
  "We couldn't cook up this recipe right now. Please try again in a moment, or search for another dish.";

const RecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { slug: rawSlug } = useParams<{ slug?: string }>();
  const slug = rawSlug?.toLowerCase();
  const { go } = useDishSearch();

  // Predefined dishes resolve instantly from the slug. Anything else needs a
  // display name to show while loading; the exact match arrives once the
  // fetch resolves (see the effect below, which corrects the URL to match).
  const predefined = slug ? findPredefinedRecipeBySlug(slug) : null;
  const dish = predefined?.dishName ?? (slug ? fromSlug(slug) : "");

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(!!slug);
  const [error, setError] = useState<{ message: string; kind: ErrorKind } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (!slug) return; // bare /recipe: nothing to load

    let cancelled = false;
    setShowCelebration(false);

    if (predefined) {
      // Land on the recipe's own canonical URL even if this slug came from
      // an alias, a typo, or an old link ("rajma-chawl" -> "rajma-chawal").
      const canonicalSlug = toSlug(predefined.dishName);
      if (canonicalSlug !== slug) {
        navigate(`${RECIPE_PATH}/${canonicalSlug}`, { replace: true });
        return;
      }

      if (predefined.image) {
        const preload = new Image();
        preload.src = predefined.image;
      }

      setRecipe(predefined);
      setError(null);
      setIsLoading(false);
      return;
    }

    const cacheKey = `rasoi:recipe:${slug}`;

    // Reuse a recipe fetched earlier this session (refresh / back button)
    try {
      const cached = sessionStorage.getItem(cacheKey);
      const parsed = cached ? JSON.parse(cached) : null;
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

        if (fetched.image) {
          const preload = new Image();
          preload.src = fetched.image;
        }

        // The URL should reflect the recipe's real name, not the raw search
        // ("chocolate cake plz" -> /recipe/chocolate-cake). Cache it there and
        // quietly fix the URL if it doesn't already match.
        const canonicalSlug = toSlug(fetched.dishName);

        try {
          sessionStorage.setItem(`rasoi:recipe:${canonicalSlug}`, JSON.stringify(fetched));
        } catch {
          /* ignore storage problems */
        }

        if (canonicalSlug !== slug) {
          navigate(`${RECIPE_PATH}/${canonicalSlug}`, { replace: true });
          return;
        }

        setRecipe(fetched);
      })
      .catch((err) => {
        if (cancelled) return;

        console.error("Recipe fetch failed:", err);

        const kind: ErrorKind =
          err?.name === "NotADishError"
            ? "not-a-dish"
            : err?.name === "BusyError"
            ? "busy"
            : err?.name === "OfflineError"
            ? "offline"
            : "unavailable";

        setError({
          message: err instanceof Error && err.message ? err.message : FRIENDLY_ERROR,
          kind,
        });
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, navigate]);

  useEffect(() => {
    document.title = slug
      ? `${recipe?.dishName ?? dish} recipe | Rasoi Bazaar`
      : "Rasoi Bazaar";
  }, [recipe, dish, slug]);

  return (
    <div className="relative z-10 w-full">
      <CompactHeader />

      <main className="mx-auto min-h-[60vh] w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto w-full max-w-6xl">
          {!slug && (
            <p className="mx-auto mt-10 max-w-md text-center text-stone-400">
              Search for a dish above to get started.
            </p>
          )}

          {slug && isLoading && <RecipeLoading dishName={dish} />}

          {slug && error && (
            <RecipeError
              kind={error.kind}
              message={error.message}
              dishName={dish}
              suggestions={findSimilarRecipes(dish)}
              onSelectDish={(d) => go(d, { replace: true })}
            />
          )}

          {slug && recipe && !isLoading && (
            <div className="animate-fade-in-up">
              <RecipeDisplay
                key={slug}
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
          dishImage={recipe?.image} 
          onReset={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default RecipePage;