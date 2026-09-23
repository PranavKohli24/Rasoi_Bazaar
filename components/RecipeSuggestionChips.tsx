import React from "react";

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
          className="rounded-full border border-stone-700 bg-stone-900 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm transition-colors duration-200 hover:border-orange-400 hover:bg-orange-400/10 hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
        >
          {dish}
        </button>
      ))}
    </div>
  </div>
);

export default RecipeSuggestionChips;