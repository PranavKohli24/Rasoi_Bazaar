import React, { useState } from "react";
import { displayDishName } from "../utils/displayDishName";

export type ErrorKind = "unavailable" | "not-a-dish" | "busy" | "offline";

interface RecipeErrorProps {
  kind?: ErrorKind;
  message?: string;
  dishName?: string;
  onSelectDish?: (dish: string) => void;
  /** Dishes related to the failed search, e.g. other chocolate desserts. Falls back to DEFAULT_DISHES when empty. */
  suggestions?: string[];
}

// Fallback when nothing related to the search was found.
const DEFAULT_DISHES = [
  "Paneer Butter Masala",
  "Shahi Paneer",
  "Chole Bhature",
  "Aloo Paratha",
  "Masala Dosa",
  "Pav Bhaji",
];

interface Copy {
  title: string;
  body: string;
}

const getCopy = (kind: ErrorKind, dish: string, message?: string): Copy => {
  switch (kind) {
    case "not-a-dish":
      return {
        title: dish ? `Hmm, is “${dish}” a dish?` : "Hmm, we couldn't spot a dish there",
        body: message || "Try a dish name like Paneer Butter Masala.",
      };
    case "busy":
      return {
        title: "Our kitchen is packed right now",
        body: message || "Lots of hungry people at the moment. Please try again in a minute.",
      };
    case "offline":
      return {
        title: "We couldn't reach the kitchen",
        body: message || "Check your connection and try again.",
      };
    default:
      return {
        title: dish ? `We don't have a recipe for “${dish}” yet` : "We don't have that recipe yet",
        body: "We couldn't put this one together just now. Try searching for something else, or start with something we can serve up instantly.",
      };
  }
};

const STEAM_CSS = `
@keyframes recipe-error-steam {
  0%, 100% { opacity: 0.35; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-3px); }
}
.recipe-error-steam { animation: recipe-error-steam 2.4s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .recipe-error-steam { animation: none; }
}
`;

const RecipeError: React.FC<RecipeErrorProps> = ({
  kind = "unavailable",
  message,
  dishName,
  onSelectDish,
  suggestions,
}) => {
  const dishesToShow = suggestions?.length ? suggestions : DEFAULT_DISHES;
  const dish = dishName ? displayDishName(dishName) : "";
  const { title, body } = getCopy(kind, dish, message);

  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSelectDish?.(trimmed);
  };

  return (
    <div className="mx-auto mt-4 w-full max-w-2xl animate-fade-in-up overflow-hidden rounded-3xl border border-orange-400/30 bg-stone-900 px-5 py-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:px-10 sm:py-10">
      <style>{STEAM_CSS}</style>

      {/* Empty bowl with a little steam */}
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FFE3C2]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-14 w-14 text-orange-600"
          aria-hidden="true"
        >
          <path d="M10 30h44a22 22 0 0 1-44 0z" />
          <path d="M24 56h16" />
          <path className="recipe-error-steam" d="M24 22c-3-3 3-5 0-9" />
          <path
            className="recipe-error-steam"
            style={{ animationDelay: "0.4s" }}
            d="M32 22c-3-3 3-5 0-9"
          />
          <path
            className="recipe-error-steam"
            style={{ animationDelay: "0.8s" }}
            d="M40 22c-3-3 3-5 0-9"
          />
        </svg>
      </div>

      <div role="alert">
        <h2 className="mt-6 break-words font-serif text-2xl font-black text-orange-100 sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-300 sm:text-base">
          {body}
        </p>
      </div>

      {onSelectDish && (
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-6 flex max-w-md flex-col items-stretch justify-center gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try another dish, e.g. Rajma Chawal"
            className="w-full flex-1 rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 placeholder-stone-500 shadow-sm transition-colors focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-400/15 sm:text-base"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="inline-flex items-center justify-center rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 disabled:cursor-not-allowed disabled:bg-stone-800 disabled:text-stone-500 disabled:shadow-none disabled:hover:translate-y-0"
          >
            Search
          </button>
        </form>
      )}

      {onSelectDish && (
        <div className="mt-9">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
            <span className="h-px flex-1 bg-stone-700/70" />
            {suggestions?.length ? "You might like these instead" : "Or start with a sure thing"}
            <span className="h-px flex-1 bg-stone-700/70" />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {dishesToShow.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onSelectDish(name)}
                className="rounded-full border border-stone-700 bg-stone-950 px-4 py-2 text-sm text-stone-100 transition-colors hover:border-orange-400 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
              >
                {name}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-stone-500">Ready instantly, no waiting.</p>
        </div>
      )}
    </div>
  );
};

export default RecipeError;