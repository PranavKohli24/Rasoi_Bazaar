import React, { useEffect, useRef, useState } from "react";
import KitchenEquipmentSelector from "./KitchenEquipmentSelector";
import { findRecipesFromIngredients } from "../services/cookWhatYouHaveService";
import type { RecipeMatch } from "../services/cookWhatYouHaveService";

interface CookWhatYouHaveProps {
  onSelectDish: (dish: string) => void;
}

const QUICK_INGREDIENTS = [
  "Onion",
  "Tomato",
  "Potato",
  "Paneer",
  "Rice",
  "Atta",
  "Dal",
  "Eggs",
  "Milk",
  "Curd",
  "Green chilli",
  "Ginger",
  "Garlic",
  "Salt",
  "Oil",
  "Ghee",
  "Turmeric",
  "Cumin",
];

const STEPS = ["Equipment", "Ingredients", "Dishes"];

const FRIENDLY_ERROR =
  "We couldn't find a recipe for that combination. Try adding another ingredient or piece of equipment.";

const STORAGE_KEY = "rasoi:cook-what-you-have:v3";

interface SavedState {
  equipment: string[];
  ingredients: string[];
  results: RecipeMatch[];
  step: 1 | 2 | 3;
  resultSource?: "predefined" | "ai";
}

const loadSaved = (): SavedState | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (
      !Array.isArray(parsed.equipment) ||
      !Array.isArray(parsed.ingredients) ||
      !Array.isArray(parsed.results)
    ) {
      return null;
    }

    return parsed as SavedState;
  } catch {
    return null;
  }
};

const LOADING_MESSAGES = [
  "Checking our recipe collection…",
  "Matching your ingredients…",
  "Checking what your kitchen can make…",
  "Almost ready…",
];

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-orange-200 px-6 py-3 font-semibold text-stone-900 shadow-md transition-all duration-200 hover:bg-orange-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";

const footerButton = primaryButton.replace(
  "px-6 py-3",
  "px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base"
);

const ghostButton =
  "inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70";

const footerBar =
  "sticky bottom-0 z-40 flex items-center justify-between gap-3 rounded-b-3xl border-t border-stone-700 bg-stone-900/95 px-5 py-4 backdrop-blur-md sm:px-12";

const Stepper: React.FC<{ current: number }> = ({ current }) => (
  <ol
    className="mx-auto flex w-full max-w-md items-center"
    aria-label="Progress"
  >
    {STEPS.map((label, index) => {
      const number = index + 1;
      const done = number < current;
      const active = number === current;

      return (
        <React.Fragment key={label}>
          <li
            className="flex flex-col items-center gap-1.5"
            aria-current={active ? "step" : undefined}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                done
                  ? "bg-orange-200 text-white"
                  : active
                  ? "bg-orange-200 text-white ring-4 ring-orange-400/25"
                  : "border border-stone-700 bg-stone-900 text-stone-500"
              }`}
            >
              {done ? "✓" : number}
            </span>
            <span
              className={`text-xs font-medium sm:text-sm ${
                active
                  ? "text-orange-100"
                  : done
                  ? "text-stone-300"
                  : "text-stone-500"
              }`}
            >
              {label}
            </span>
          </li>

          {index < STEPS.length - 1 && (
            <div
              className={`mx-2 mb-6 h-0.5 flex-1 rounded-full transition-colors duration-300 sm:mx-3 ${
                done ? "bg-orange-200" : "bg-stone-700"
              }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </ol>
);

const Chip: React.FC<{
  label: string;
  onRemove: () => void;
}> = ({ label, onRemove }) => (
  <button
    type="button"
    onClick={onRemove}
    aria-label={`Remove ${label}`}
    className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/10 py-1.5 pl-3.5 pr-2.5 text-sm text-orange-100 transition-colors hover:bg-orange-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
  >
    {label}
    <span
      className="text-base leading-none text-orange-300"
      aria-hidden="true"
    >
      ×
    </span>
  </button>
);

const ResultSkeleton: React.FC = () => (
  <div className="animate-pulse rounded-2xl border border-stone-700 bg-stone-900 p-5">
    <div className="h-5 w-1/2 rounded bg-stone-800" />
    <div className="mt-3 h-3 w-full rounded bg-stone-800" />
    <div className="mt-2 h-3 w-4/5 rounded bg-stone-800" />
    <div className="mt-5 flex gap-2">
      <div className="h-6 w-16 rounded-full bg-stone-800" />
      <div className="h-6 w-20 rounded-full bg-stone-800" />
      <div className="h-6 w-14 rounded-full bg-stone-800" />
    </div>
  </div>
);

const SteamingPot: React.FC = () => (
  <span className="shrink-0" aria-hidden="true">
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14 text-orange-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path className="pot-steam pot-steam-1" d="M22 24c-3-4 3-6 0-11" />
      <path className="pot-steam pot-steam-2" d="M32 24c-3-4 3-6 0-11" />
      <path className="pot-steam pot-steam-3" d="M42 24c-3-4 3-6 0-11" />
      <g className="pot-lid">
        <path d="M15 31h34" />
        <path d="M29 31a3 3 0 0 1 6 0" />
      </g>
      <path
        d="M17 34h30v11a7 7 0 0 1-7 7H24a7 7 0 0 1-7-7V34Z"
        fill="#FFE8D6"
      />
      <path d="M17 38h-5M47 38h5" />
    </svg>
    <style>{`
      @keyframes pot-steam {
        0% { opacity: 0; transform: translateY(6px); }
        40% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-6px); }
      }
      @keyframes pot-lid {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-1.5px) rotate(-2deg); }
      }
      .pot-steam { animation: pot-steam 1.8s ease-in-out infinite; }
      .pot-steam-2 { animation-delay: 0.3s; }
      .pot-steam-3 { animation-delay: 0.6s; }
      .pot-lid {
        transform-box: fill-box;
        transform-origin: center;
        animation: pot-lid 0.5s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .pot-steam, .pot-lid { animation: none; }
        .pot-steam { opacity: 0.8; }
      }
    `}</style>
  </span>
);

const CookWhatYouHave: React.FC<CookWhatYouHaveProps> = ({
  onSelectDish,
}) => {
  const [saved] = useState(loadSaved);

  const [step, setStep] = useState<1 | 2 | 3>(() => {
    if (!saved) return 1;
    if (saved.results.length > 0) return 3;
    if (!saved.equipment.length) return 1;
    return saved.step === 1 ? 1 : 2;
  });

  const [equipment, setEquipment] = useState<string[]>(
    saved?.equipment ?? []
  );
  const [ingredients, setIngredients] = useState<string[]>(
    saved?.ingredients ?? []
  );
  const [ingredientInput, setIngredientInput] = useState("");
  const [results, setResults] = useState<RecipeMatch[]>(
    saved?.results ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [resultSource, setResultSource] = useState<
    "predefined" | "ai"
  >(saved?.resultSource ?? "predefined");
  const [error, setError] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isLoading) return;

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          equipment,
          ingredients,
          results,
          step,
          resultSource,
        })
      );
    } catch {
      /* Ignore storage failures. */
    }
  }, [equipment, ingredients, results, step, resultSource, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setLoadingMessageIndex(0);
      return;
    }

    const id = window.setInterval(() => {
      setLoadingMessageIndex(
        (index) => (index + 1) % LOADING_MESSAGES.length
      );
    }, 1800);

    return () => window.clearInterval(id);
  }, [isLoading]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    sectionRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [step]);

  const addIngredients = (raw: string) => {
    const newItems = raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!newItems.length) return;

    setIngredients((current) => {
      const seen = new Set(
        current.map((item) => item.toLowerCase())
      );

      const additions = newItems.filter((item) => {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      return [...current, ...additions];
    });
  };

  const addFromInput = () => {
    addIngredients(ingredientInput);
    setIngredientInput("");
  };

  const removeIngredient = (ingredient: string) =>
    setIngredients((current) =>
      current.filter((item) => item !== ingredient)
    );

  const toggleQuickIngredient = (item: string) => {
    const existing = ingredients.find(
      (current) =>
        current.toLowerCase() === item.toLowerCase()
    );

    if (existing) removeIngredient(existing);
    else addIngredients(item);
  };

  const handleIngredientKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addFromInput();
    }
  };

  const handleFindRecipes = async () => {
    const pending = ingredientInput.trim();

    const finalIngredients = pending
      ? [
          ...ingredients,
          ...pending
            .split(",")
            .map((item) => item.trim())
            .filter(
              (item) =>
                item &&
                !ingredients.some(
                  (existing) =>
                    existing.toLowerCase() === item.toLowerCase()
                )
            ),
        ]
      : ingredients;

    if (!equipment.length) {
      setError("Pick at least one piece of equipment.");
      return;
    }

    if (!finalIngredients.length) {
      setError("Add at least one ingredient to continue.");
      return;
    }

    if (pending) {
      setIngredients(finalIngredients);
      setIngredientInput("");
    }

    setError(null);
    setResults([]);
    setResultSource("predefined");
    setIsLoading(true);
    setStep(3);

    try {
      const response = await findRecipesFromIngredients({
        equipment,
        ingredients: finalIngredients,
      });

      if (!response.recipes.length) {
        setError(FRIENDLY_ERROR);
      } else {
        setResults(response.recipes);
        setResultSource(response.source);
      }
    } catch (err) {
      console.error("Cook what you have failed:", err);
      setError(
        err instanceof Error && err.message
          ? err.message
          : FRIENDLY_ERROR
      );
    } finally {
      setIsLoading(false);
    }
  };

  const startOver = () => {
    setResults([]);
    setEquipment([]);
    setIngredients([]);
    setIngredientInput("");
    setError(null);
    setIsLoading(false);
    setResultSource("predefined");
    setStep(1);
  };

  const goToIngredients = () => {
    setResults([]);
    setError(null);
    setResultSource("predefined");
    setStep(2);
  };

  return (
    <section
      ref={sectionRef}
      id="cook-what-you-have"
      className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-3 py-10 sm:px-4 sm:py-20"
    >
      <div className="rounded-3xl border border-stone-700 bg-stone-900 shadow-[0_12px_40px_rgba(120,70,30,0.10)]">
        <header className="px-5 pb-6 pt-8 text-center sm:px-12 sm:pb-8 sm:pt-12">
          <h2 className="font-serif text-3xl font-black tracking-tight text-orange-50 sm:text-4xl">
            Cook what you have
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
            Show us your kitchen and pantry. We&apos;ll suggest dishes you can
            make right now.
          </p>
          <div className="mt-7 sm:mt-9">
            <Stepper current={step} />
          </div>
        </header>

        <div className="border-t border-stone-700" />

        {step === 1 && (
          <>
            <div className="px-5 pb-8 pt-8 sm:px-12 sm:pb-10 sm:pt-10">
              <KitchenEquipmentSelector
                selectedEquipment={equipment}
                onChange={setEquipment}
              />
            </div>

            <div className={footerBar}>
              <p className="min-w-0 flex-1 text-sm leading-tight text-stone-400">
                {equipment.length === 0 ? (
                  "Select at least one"
                ) : (
                  <>
                    <span className="font-semibold text-orange-200">
                      {equipment.length}
                    </span>{" "}
                    selected
                  </>
                )}
              </p>

              <button
                type="button"
                disabled={!equipment.length}
                onClick={() => {
                  setError(null);
                  setStep(2);
                }}
                className={`${footerButton} shrink-0 whitespace-nowrap`}
              >
                Next: ingredients
                <span
                  aria-hidden="true"
                  className="hidden sm:inline"
                >
                  →
                </span>
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mx-auto max-w-3xl px-5 pb-8 pt-8 sm:px-12 sm:pb-10 sm:pt-10">
              <h3 className="font-serif text-2xl font-black text-orange-50 sm:text-3xl">
                What&apos;s in your pantry?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400 sm:text-base">
                Add everything you&apos;re happy to cook with. We only suggest
                dishes made from what you list, so include basics like salt and oil.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3">
                <span className="text-sm text-stone-500">Cooking with</span>
                <div className="flex flex-1 flex-wrap gap-1.5">
                  {equipment.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#FFE8D6] px-2.5 py-1 text-xs font-medium text-stone-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStep(1);
                  }}
                  className="text-sm font-medium text-orange-200 transition-colors hover:text-orange-100 focus:outline-none focus-visible:underline"
                >
                  Edit
                </button>
              </div>

              <label
                htmlFor="ingredient-input"
                className="mt-7 block text-sm font-semibold text-stone-100"
              >
                Type ingredients
              </label>
              <div className="mt-2 flex gap-2 sm:gap-3">
                <input
                  id="ingredient-input"
                  type="text"
                  value={ingredientInput}
                  onChange={(event) => setIngredientInput(event.target.value)}
                  onKeyDown={handleIngredientKeyDown}
                  placeholder="e.g. paneer, onion, dal"
                  autoComplete="off"
                  enterKeyHint="done"
                  className="min-w-0 flex-1 rounded-xl border border-stone-700 bg-stone-900 px-4 py-3 text-base text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                />
                <button
                  type="button"
                  onClick={addFromInput}
                  disabled={!ingredientInput.trim()}
                  className="rounded-xl border border-stone-700 bg-stone-800 px-5 py-3 font-semibold text-stone-100 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
                >
                  Add
                </button>
              </div>
              <p className="mt-2 text-xs text-stone-500">
                Separate with commas to add several at once.
              </p>

              <div className="mt-6">
                <p className="text-sm font-semibold text-stone-100">
                  Or tap to add
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_INGREDIENTS.map((item) => {
                    const active = ingredients.some(
                      (current) =>
                        current.toLowerCase() === item.toLowerCase()
                    );

                    return (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleQuickIngredient(item)}
                        className={`rounded-full border px-3.5 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 ${
                          active
                            ? "border-orange-400 bg-orange-400/15 text-orange-100"
                            : "border-stone-700 bg-stone-900 text-stone-300 hover:border-orange-300/70 hover:text-stone-100"
                        }`}
                      >
                        {active ? "✓ " : "+ "}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-stone-700 bg-stone-950 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-stone-100">
                    Your ingredients
                    <span className="ml-2 text-orange-300">
                      ({ingredients.length})
                    </span>
                  </h4>

                  {ingredients.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIngredients([])}
                      className="text-sm text-stone-500 transition-colors hover:text-orange-200"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {ingredients.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ingredients.map((ingredient) => (
                      <Chip
                        key={ingredient}
                        label={ingredient}
                        onRemove={() => removeIngredient(ingredient)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-stone-500">
                    Nothing added yet. Type above or tap a suggestion.
                  </p>
                )}
              </div>

              {error && (
                <p role="alert" className="mt-5 text-sm text-orange-100">
                  {error}
                </p>
              )}
            </div>

            <div className={footerBar}>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep(1);
                }}
                className={ghostButton}
              >
                <span aria-hidden="true">←</span> Back
              </button>

              <button
                type="button"
                onClick={handleFindRecipes}
                disabled={ingredients.length === 0 && !ingredientInput.trim()}
                className={`${footerButton} min-w-[10.5rem] shrink-0 whitespace-nowrap sm:min-w-[12.5rem]`}
              >
                Find what I can make
              </button>
            </div>
          </>
        )}

        {step === 3 && isLoading && (
          <div
            className="px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10"
            role="status"
            aria-live="polite"
          >
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-4">
                <SteamingPot />
                <div>
                  <h3 className="font-serif text-xl font-black text-orange-50 sm:text-2xl">
                    Finding dishes you can make…
                  </h3>
                  <p className="mt-1 text-sm text-stone-400">
                    {LOADING_MESSAGES[loadingMessageIndex]}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4" aria-hidden="true">
                <ResultSkeleton />
                <ResultSkeleton />
                <ResultSkeleton />
              </div>
            </div>
          </div>
        )}

        {step === 3 && !isLoading && error && (
          <div className="px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10">
            <div className="mx-auto max-w-3xl">
              <div
                role="alert"
                className="rounded-2xl border border-orange-400/30 bg-[#FFE8D6]/60 p-5 sm:p-6"
              >
                <h3 className="font-serif text-xl font-black text-orange-50 sm:text-2xl">
                  Couldn&apos;t find dishes this time
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300 sm:text-base">
                  {error}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStep(2);
                  }}
                  className={primaryButton}
                >
                  Edit ingredients
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && !isLoading && !error && results.length > 0 && (
          <div className="px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10">
            <div className="mx-auto max-w-3xl">
                            <div>
                <h3 className="font-serif text-2xl font-black text-orange-50 sm:text-3xl">
                  You can make {results.length === 1 ? "this" : "these"}
                </h3>
                <p className="mt-2 text-sm text-stone-400">
                  {resultSource === "predefined"
                    ? "Matched from our recipe collection using "
                    : "Found by our kitchen assistant using "}
                  {ingredients.length} ingredients and {equipment.length} pieces of equipment you picked.
                </p>
              </div>

              <div className="mt-6 grid gap-4">
                {results.map((recipe) => (
                  <article
                    key={recipe.dishName}
                    className="rounded-2xl border border-stone-700 bg-stone-900 p-5 shadow-sm transition-all hover:border-orange-400/60 hover:shadow-md sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h4 className="min-w-0 font-serif text-xl font-bold text-orange-50 sm:text-2xl">
                        {recipe.dishName}
                      </h4>
                      <span className="max-w-full whitespace-normal break-words rounded-full bg-[#FFF1C9] px-3 py-1 text-xs font-semibold text-stone-200">
                        {recipe.prepTime}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-stone-400 sm:text-base">
                      {recipe.description}
                    </p>

                    <p className="mt-4 rounded-r-lg border-l-2 border-orange-300 bg-stone-950 py-2 pl-3 pr-2 text-sm leading-relaxed text-stone-300">
                      {recipe.whyItWorks}
                    </p>

                    <div className="mt-5 space-y-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 text-xs text-stone-500">
                          Uses
                        </span>
                        {recipe.ingredientsUsed.map((ingredient) => (
                          <span
                            key={ingredient}
                            className="rounded-full bg-[#DDEBD3] px-2.5 py-1 text-xs font-medium text-stone-200"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={goToIngredients}
                          className={ghostButton}
                        >
                          Edit ingredients
                        </button>
                        <button
                          type="button"
                          onClick={startOver}
                          className={ghostButton}
                        >
                          Start over
                        </button>
                      </div>
                      
                      {recipe.equipmentUsed?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="mr-1 text-xs text-stone-500">
                            On
                          </span>
                          {recipe.equipmentUsed.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-[#FFE8D6] px-2.5 py-1 text-xs font-medium text-stone-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectDish(recipe.dishName)}
                      className={`${primaryButton} mt-6 w-full sm:w-auto`}
                    >
                      Get the recipe
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CookWhatYouHave;
