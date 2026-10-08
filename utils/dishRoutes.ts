import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findPredefinedRecipe, findPredefinedRecipes } from "./findPredefinedRecipe";
import { toSlug, fromSlug } from "./slug";

export { toSlug, fromSlug };

export const RECIPE_PATH = "/recipe";
export const COMBO_RECIPE_PATH = "/recipe/combo";

export const useDishSearch = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  const go = (dish: string, options?: { replace?: boolean }) => {
    const slug = toSlug(dish);
    if (!slug) return;
    setTerm("");

    const matches = findPredefinedRecipes(dish);

    if (matches && matches.length >= 2) {
      const comboSlug = matches.map((r) => toSlug(r.dishName)).join("+");
      navigate(`${COMBO_RECIPE_PATH}/${comboSlug}`, { replace: options?.replace });
      return;
    }

    const predefined = matches?.[0] ?? findPredefinedRecipe(dish);
    const targetSlug = predefined ? toSlug(predefined.dishName) : slug;

    navigate(`${RECIPE_PATH}/${targetSlug}`, { replace: options?.replace });
  };

  return { term, setTerm, go };
};