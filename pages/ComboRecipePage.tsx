import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompactHeader from "../components/CompactHeader";
import RecipeDisplay from "../components/RecipeDisplay";
import CelebrationPopup from "../components/CelebrationPopup";
import RecipeError from "../components/RecipeError";
import {
  findPredefinedRecipeBySlug,
  findSimilarRecipes,
} from "../utils/findPredefinedRecipe";
import { mergeRecipes } from "../utils/mergeRecipes";
import { useState } from "react";

import { COMBO_RECIPE_PATH, useDishSearch } from "../utils/dishRoutes";
import { addRecentlyCooked } from "../utils/recentlyCooked";

const ComboRecipePage: React.FC = () => {
  const navigate = useNavigate();
    const { go } = useDishSearch();
    const { comboSlug } = useParams<{ comboSlug: string }>();
  const [showCelebration, setShowCelebration] = useState(false);

  const slugs = (comboSlug ?? "").split("+").filter(Boolean);
const resolved = slugs.map((s) => findPredefinedRecipeBySlug(s));

const suggestions = [
  ...new Set(
    slugs.flatMap((s) =>
      findSimilarRecipes(findPredefinedRecipeBySlug(s)?.dishName ?? s, 3)
    )
  ),
];
    const rawRecipes = resolved.filter((r): r is NonNullable<typeof r> => r !== null);
    const recipes = [...new Map(rawRecipes.map((r) => [r.dishName, r])).values()];
    const allResolved = recipes.length >= 2 && rawRecipes.length === slugs.length;

  const merged = allResolved ? mergeRecipes(recipes) : null;

  useEffect(() => {
    document.title = merged
      ? `${merged.dishName} recipe | Rasoi Bazaar`
      : "Rasoi Bazaar";
  }, [merged]);

  useEffect(() => {
    setShowCelebration(false);
  }, [comboSlug]);

    useEffect(() => {
    if (allResolved && merged) {
      addRecentlyCooked({
        dishName: merged.dishName,
        path: `${COMBO_RECIPE_PATH}/${comboSlug}`,
        image: merged.image,
        images: recipes.map((r) => r.image).filter(Boolean) as string[],
      });
    }
    // merged is recomputed every render from `recipes`, so key off the
    // primitive inputs rather than the object identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allResolved, comboSlug]);

  return (
    <div className="relative z-10 w-full">
      <CompactHeader />

      <main className="mx-auto min-h-[60vh] w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto w-full max-w-6xl">
          {!allResolved && (
            <RecipeError
              kind="not-a-dish"
              message="We couldn't load that combo. Try searching again."
              dishName={slugs.join(" + ")}
              suggestions={suggestions}
              onSelectDish={(d) => go(d, { replace: true })}
            />
          )}

          {allResolved && merged && (
            <div className="animate-fade-in-up">
              <RecipeDisplay
                key={comboSlug}
                recipe={merged}
                onFinishCooking={() => setShowCelebration(true)}
              />
            </div>
          )}
        </div>
      </main>

      {showCelebration && merged && (
        <CelebrationPopup
          dishName={merged.dishName}
          dishImage={merged.image}
          onReset={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default ComboRecipePage;