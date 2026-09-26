import React from "react";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";

interface RecipeSuggestionChipsProps {
  onSelect: (dish: string) => void;
}

const suggestions = [
  "Paneer Butter Masala",
  "Chicken Biryani",
  "Masala Dosa",
  "Aloo Gobi",
  "Dal Makhani",
  "Samosa",
];

// Preload a dish image as early as possible — on hover (desktop) or
// touchstart (mobile) — so it's already in the browser cache by the
// time the recipe page mounts.
const preloadImage = (dish: string) => {
  const predefined = findPredefinedRecipe(dish);
  if (predefined?.image) new Image().src = predefined.image;
};

const RecipeSuggestionChips: React.FC<RecipeSuggestionChipsProps> = ({
  onSelect,
}) => (
  <div className="animate-fade-in-up">
    <p className="mb-3 text-center text-sm text-stone-400">
      Or try one of these
    </p>
    <div className="flex flex-wrap justify-center gap-2.5">
      {suggestions.map((dish) => (
        <button
          key={dish}
          type="button"
          onClick={() => onSelect(dish)}
          onMouseEnter={() => preloadImage(dish)}
          onTouchStart={() => preloadImage(dish)}
          className="rounded-full border border-stone-700 bg-stone-900 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm transition-colors duration-200 hover:border-orange-400 hover:bg-orange-400/10 hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
        >
          {dish}
        </button>
      ))}
    </div>
  </div>
);

export default RecipeSuggestionChips;