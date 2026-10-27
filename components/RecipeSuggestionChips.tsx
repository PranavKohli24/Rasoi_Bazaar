import React, { useEffect, useRef, useState } from "react";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";

interface RecipeSuggestionChipsProps {
  onSelect: (dish: string) => void;
}

// Fixed pool of 50 curated dishes.
const suggestionBuckets = {
  snacks: [
    "Samosa",
    "Pakode (Pakora)",
    "Aloo Tikki",
    "Pani Puri (Golgappe)",
    "Vada Pav",
    "Dhokla",
    "Pav Bhaji",
    "Bhel Puri",
    "Bread Pakoda",
    "Momos (Veg Momos)",
  ],

  mains: [
    "Paneer Butter Masala",
    "Dal Makhani",
    "Chana Masala",
    "Rajma",
    "Palak Paneer",
    "Aloo Gobi",
    "Shahi Paneer",
    "Matar Paneer",
    "Butter Chicken (Murgh Makhani)",
    "Home-style Chicken Curry",
    "Chicken Korma",
    "Mutton Curry",
    "Egg Curry (Anda Curry)",
    "Fish Curry",
    "Kadai Paneer",
  ],

  rice: [
    "Chicken Biryani",
    "Veg Biryani",
    "Rajma Chawal",
    "Jeera Rice",
    "Lemon Rice (Chitranna)",
    "Quick Vegetable Pulao",
    "Curd Rice (Thayir Sadam)",
    "Tomato Rice",
    "Khichdi",
    "Tawa Pulao",
  ],

  desserts: [
    "Gulab Jamun",
    "Kheer",
    "Gajar Halwa (Carrot Halwa)",
    "Rasgulla",
    "Jalebi",
    "Rasmalai",
    "Besan Ladoo",
    "Kulfi",
    "Shrikhand",
    "Payasam",
  ],

  regional: [
    "Undhiyu",
    "Shukto",
    "Pakhala Bhata",
    "Dal Baati Churma",
    "Chhena Poda",
  ],
} as const;

// Fisher-Yates shuffle. The original array remains unchanged.
const shuffle = <T,>(items: readonly T[]): T[] => {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

// Pick dishes from a single category.
const pickFrom = (
  bucket: readonly string[],
  count: number,
  excluded: readonly string[]
): string[] => {
  const available = bucket.filter((dish) => !excluded.includes(dish));

  return shuffle(available).slice(0, count);
};

// Six dishes per refresh, balanced across all five categories.
const chooseSuggestions = (
  previous: readonly string[] = []
): string[] => {
  const selected = [
    ...pickFrom(suggestionBuckets.snacks, 1, previous),
    ...pickFrom(suggestionBuckets.mains, 2, previous),
    ...pickFrom(suggestionBuckets.rice, 1, previous),
    ...pickFrom(suggestionBuckets.desserts, 1, previous),
    ...pickFrom(suggestionBuckets.regional, 1, previous),
  ];

  return shuffle(selected);
};

// Preload the dish image on hover or touch.
const preloadImage = (dish: string) => {
  const predefined = findPredefinedRecipe(dish);

  if (predefined?.image) {
    new Image().src = predefined.image;
  }
};

const RecipeSuggestionChips: React.FC<RecipeSuggestionChipsProps> = ({
  onSelect,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([
    "Paneer Butter Masala",
    "Chicken Biryani",
    "Masala Dosa",
    "Aloo Gobi",
    "Dal Makhani",
    "Samosa",
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const refreshTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  const refreshSuggestions = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    refreshTimeoutRef.current = setTimeout(() => {
      setSuggestions((current) => chooseSuggestions(current));
      setHasRefreshed(true);
      setIsRefreshing(false);
      refreshTimeoutRef.current = null;
    }, 200);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="relative mb-3 flex items-center justify-center">
        <p className="text-center text-sm text-stone-400">
          Or try one of these
        </p>

        <button
          type="button"
          onClick={refreshSuggestions}
          aria-label="Refresh dish suggestions"
          title="Refresh suggestions"
          disabled={isRefreshing}
          className="absolute right-0 flex h-8 w-8 items-center
            justify-center rounded-full text-stone-400
            transition-colors hover:text-stone-200
            disabled:cursor-default"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 7v5h-5" />
            <path d="M4 17v-5h5" />
            <path d="M5.8 9a7 7 0 0 1 10.1-2.3" />
            <path d="M18.2 15a7 7 0 0 1-10.1 2.3" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5">
        {suggestions.map((dish, index) => (
          <button
            key={dish}
            type="button"
            onClick={() => onSelect(dish)}
            onMouseEnter={() => preloadImage(dish)}
            onTouchStart={() => preloadImage(dish)}
            style={{
              animationDelay: hasRefreshed ? `${index * 45}ms` : "0ms",
            }}
            className={`rounded-full border border-stone-700
              bg-stone-900 px-4 py-2 text-sm font-medium text-stone-200
              shadow-sm transition-all duration-200 ease-out
              hover:border-orange-400 hover:bg-orange-400/10
              hover:text-orange-100 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-orange-300/70
              ${
                isRefreshing
                  ? "pointer-events-none translate-y-1 scale-95 opacity-0 blur-[2px]"
                  : "translate-y-0 scale-100 opacity-100"
              }
              ${
                hasRefreshed && !isRefreshing
                  ? "suggestion-chip-enter"
                  : ""
              }`}
          >
            {dish}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeSuggestionChips;