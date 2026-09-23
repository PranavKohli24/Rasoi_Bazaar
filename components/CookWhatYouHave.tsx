import React, { useEffect, useRef, useState } from "react";
import KitchenEquipmentSelector from "./KitchenEquipmentSelector";
import {
  findRecipesFromIngredients,
  RecipeMatch,
} from "../services/cookWhatYouHaveService";

interface CookWhatYouHaveProps {
  onSelectDish: (dish: string) => void;
}

const QUICK_INGREDIENTS = [
  "Onion", "Tomato", "Potato", "Paneer", "Rice", "Atta", "Dal", "Eggs", "Milk",
  "Curd", "Green chilli", "Ginger", "Garlic", "Salt", "Oil", "Ghee", "Turmeric", "Cumin",
];

const STEPS = ["Equipment", "Ingredients", "Dishes"];

// Keep progress so the browser back button from a recipe returns to results.
const STORAGE_KEY = "rasoi:cook-what-you-have";

interface SavedState {
  equipment: string[];
  ingredients: string[];
  results: RecipeMatch[];
  step: 1 | 2 | 3;
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
  "Checking your pantry…",
  "Matching dishes to your appliances…",
  "Picking the simplest options…",
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

/* ---------- Small pieces ---------- */

const Stepper: React.FC<{ current: number }> = ({ current }) => (
  <ol className="mx-auto flex w-full max-w-md items-center" aria-label="Progress">
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
                active ? "text-orange-100" : done ? "text-stone-300" : "text-stone-500"
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

const Chip: React.FC<{ label: string; onRemove: () => void }> = ({
  label,
  onRemove,
}) => (
  <button
    type="button"
    onClick={onRemove}
    aria-label={`Remove ${label}`}
    className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/10 py-1.5 pl-3.5 pr-2.5 text-sm text-orange-100 transition-colors hover:bg-orange-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
  >
    {label}
    <span className="text-base leading-none text-orange-300" aria-hidden="true">×</span>
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

/* ---------- Main component ---------- */

const CookWhatYouHave: React.FC<CookWhatYouHaveProps> = ({ onSelectDish }) => {
  const [saved] = useState(loadSaved);

  const [step, setStep] = useState<1 | 2 | 3>(() => {
    if (!saved) return 1;
    if (saved.results.length > 0) return 3;
    if (!saved.equipment.length) return 1;
    return saved.step === 1 ? 1 : 2;
  });

  const [equipment, setEquipment] = useState<string[]>(saved?.equipment ?? []);
  const [ingredients, setIngredients] = useState<string[]>(saved?.ingredients ?? []);
  const [ingredientInput, setIngredientInput] = useState("");
  const [results, setResults] = useState<RecipeMatch[]>(saved?.results ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  // Save progress (not while a request is in flight)
  useEffect(() => {
    if (isLoading) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ equipment, ingredients, results, step })
      );
    } catch {
      /* ignore storage problems */
    }
  }, [equipment, ingredients, results, step, isLoading]);

  // Rotate the loading message so the wait feels active
  useEffect(() => {
    if (!isLoading) {
      setLoadingMessageIndex(0);
      return;
    }
    const id = window.setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [isLoading]);

  // Bring the top of the card into view when the user moves between steps
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sectionRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [step]);

  /* ----- Ingredient helpers ----- */

  const addIngredients = (raw: string) => {
    const newItems = raw.split(",").map((item) => item.trim()).filter(Boolean);
    if (!newItems.length) return;

    setIngredients((current) => {
      const seen = new Set(current.map((item) => item.toLowerCase()));
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
    setIngredients((current) => current.filter((item) => item !== ingredient));

  const toggleQuickIngredient = (item: string) => {
    const existing = ingredients.find(
      (current) => current.toLowerCase() === item.toLowerCase()
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

  /* ----- Actions ----- */

  const handleFindRecipes = async () => {
    // Include anything typed but not yet added
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
                !ingredients.some((i) => i.toLowerCase() === item.toLowerCase())
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
    setIsLoading(true);
    setStep(3); // move on immediately; the wait happens on the next screen

    try {
      const response = await findRecipesFromIngredients({
        equipment,
        ingredients: finalIngredients,
      });

      if (!response.recipes.length) {
        setError(
          "No dishes match this exact combination. Try adding a few more ingredients, like salt, oil or spices."
        );
      } else {
        setResults(response.recipes);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
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
    setStep(1);
  };

  const goToIngredients = () => {
    setResults([]);
    setError(null);
    setStep(2);
  };

  /* ----- Render ----- */

  return (
    <section
      ref={sectionRef}
      id="cook-what-you-have"
      className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-3 py-10 sm:px-4 sm:py-20"
    >
      <div className="rounded-3xl border border-stone-700 bg-stone-900 shadow-[0_12px_40px_rgba(120,70,30,0.10)]">
        {/* Header */}
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

        {/* STEP 1: Equipment */}
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
                    <span className="font-semibold text-orange-200">{equipment.length}</span>{" "}
                    selected
                  </>
                )}
              </p>

              <button
                type="button"
                disabled={equipment.length === 0}
                onClick={() => {
                  setError(null);
                  setStep(2);
                }}
                className={`${footerButton} shrink-0 whitespace-nowrap`}
              >
                Next: ingredients
                <span aria-hidden="true" className="hidden sm:inline">→</span>
              </button>
            </div>
          </>
        )}

        {/* STEP 2: Ingredients */}
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

              {/* Equipment recap */}
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

              {/* Input */}
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

              {/* Quick add */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-stone-100">Or tap to add</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_INGREDIENTS.map((item) => {
                    const active = ingredients.some(
                      (current) => current.toLowerCase() === item.toLowerCase()
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

              {/* Your list */}
              <div className="mt-8 rounded-2xl border border-stone-700 bg-stone-950 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-stone-100">
                    Your ingredients
                    <span className="ml-2 text-orange-300">({ingredients.length})</span>
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
                disabled={ingredients.length === 0}
                className={`${footerButton} min-w-[10.5rem] shrink-0 whitespace-nowrap sm:min-w-[12.5rem]`}
              >
                Find what I can make
              </button>
            </div>
          </>
        )}

        {/* STEP 3: Loading */}
        {step === 3 && isLoading && (
          <div
            className="px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10"
            role="status"
            aria-live="polite"
          >
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-4">
                <span
                  className="h-10 w-10 shrink-0 animate-spin rounded-full border-[3px] border-orange-400/20 border-t-orange-300"
                  aria-hidden="true"
                />
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

        {/* STEP 3: Error */}
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
                <button type="button" onClick={handleFindRecipes} className={primaryButton}>
                  Try again
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStep(2);
                  }}
                  className={ghostButton}
                >
                  Edit ingredients
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 3 && !isLoading && !error && results.length > 0 && (
          <div className="px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-black text-orange-50 sm:text-3xl">
                    You can make {results.length === 1 ? "this" : "these"}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">
                    Based only on the {ingredients.length} ingredients and{" "}
                    {equipment.length} appliances you picked.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1 self-start sm:self-auto">
                  <button type="button" onClick={goToIngredients} className={ghostButton}>
                    Edit ingredients
                  </button>
                  <button type="button" onClick={startOver} className={ghostButton}>
                    Start over
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {results.map((recipe) => (
                  <article
                    key={recipe.dishName}
                    className="rounded-2xl border border-stone-700 bg-stone-900 p-5 shadow-sm transition-all hover:border-orange-400/60 hover:shadow-md sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-serif text-xl font-bold text-orange-50 sm:text-2xl">
                        {recipe.dishName}
                      </h4>
                      <span className="shrink-0 rounded-full bg-[#FFF1C9] px-3 py-1 text-xs font-semibold text-stone-200">
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
                        <span className="mr-1 text-xs text-stone-500">Uses</span>
                        {recipe.ingredientsUsed.map((ingredient) => (
                          <span
                            key={ingredient}
                            className="rounded-full bg-[#DDEBD3] px-2.5 py-1 text-xs font-medium text-stone-200"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>

                      {recipe.equipmentUsed?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="mr-1 text-xs text-stone-500">On</span>
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