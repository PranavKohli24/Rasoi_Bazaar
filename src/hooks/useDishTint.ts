/**
 * Applies a recipe's background tint as a CSS variable on <html>, with a
 * smooth transition so it eases in rather than popping. Runs after the
 * recipe's image is already showing — never blocks or delays the photo.
 *
 * Destination: src/hooks/useDishTint.ts
 * (same folder as your existing useStepTimers.ts)
 */

import { useEffect } from "react";
import { Recipe } from "../../types";
import { getDishTint, DEFAULT_TINT } from "../../utils/dishTint";

export const useDishTint = (recipe: Recipe | null) => {
  useEffect(() => {
    if (!recipe) {
      document.documentElement.style.setProperty("--bg-tint", DEFAULT_TINT);
      return;
    }

    let cancelled = false;

    getDishTint(recipe).then((tint) => {
      if (!cancelled) {
        document.documentElement.style.setProperty("--bg-tint", tint);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [recipe]);

  // Reset to default on unmount, so leaving the recipe page doesn't leave
  // a stray tint behind on the home page / elsewhere.
  useEffect(() => {
    return () => {
      document.documentElement.style.setProperty("--bg-tint", DEFAULT_TINT);
    };
  }, []);
};