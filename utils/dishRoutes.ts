import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findPredefinedRecipe } from "./findPredefinedRecipe";
import { toSlug, fromSlug } from "./slug";

// Re-exported so existing imports from "./dishRoutes" keep working.
export { toSlug, fromSlug };

/** Every dish gets its own URL: /recipe/<slug>. Bare /recipe has no dish yet. */
export const RECIPE_PATH = "/recipe";

/** Search box state + "go to the recipe page" action, shared by home and compact header */
export const useDishSearch = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  const go = (dish: string, options?: { replace?: boolean }) => {
    const slug = toSlug(dish);
    if (!slug) return;
    setTerm("");

    // A predefined dish always gets its own canonical URL, however it was
    // typed, aliased or misspelled ("rajma chawl" -> /recipe/rajma-chawal).
    const predefined = findPredefinedRecipe(dish);
    const targetSlug = predefined ? toSlug(predefined.dishName) : slug;

    navigate(`${RECIPE_PATH}/${targetSlug}`, { replace: options?.replace });
  };

  return { term, setTerm, go };
};