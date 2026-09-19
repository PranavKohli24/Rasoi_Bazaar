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

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-orange-200 px-6 py-3 font-semibold text-stone-900 shadow-lg transition-all duration-200 hover:bg-orange-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";

const ghostButton =
  "inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70";

/* ---------- Small pieces ---------- */

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
                  ? "bg-orange-400 text-stone-950"
                  : active
                  ? "bg-orange-200 text-stone-900 ring-4 ring-orange-400/25"
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
                  : "text-stone-600"
              }`}
            >
              {label}
            </span>
          </li>

          {index < STEPS.length - 1 && (
            <div
              className={`mx-2 mb-6 h-0.5 flex-1 rounded-full transition-colors duration-300 sm:mx-3 ${
                done ? "bg-orange-400" : "bg-stone-800"
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
    className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 py-1.5 pl-3.5 pr-2.5 text-sm text-orange-100 transition-colors hover:bg-orange-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
  >
    {label}
    <span className="text-base leading-none text-orange-300" aria-hidden="true">
      ×
    </span>
  </button>
);

const ResultSkeleton: React.FC = () => (
  <div className="animate-pulse rounded-2xl border border-stone-800 bg-stone-900/50 p-5">
    <div className="h-5 w-1/2 rounded bg-stone-800" />
    <div className="mt-3 h-3 w-full rounded bg-stone-800/70" />
    <div className="mt-2 h-3 w-4/5 rounded bg-stone-800/70" />
    <div className="mt-5 flex gap-2">
      <div className="h-6 w-16 rounded-full bg-stone-800" />
      <div className="h-6 w-20 rounded-full bg-stone-800" />
      <div className="h-6 w-14 rounded-full bg-stone-800" />
    </div>
  </div>
);

/* ---------- Main component ---------- */

const CookWhatYouHave: React.FC<CookWhatYouHaveProps> = ({ onSelectDish }) => {
  const [step, setStep] = useState<1 | 2>(1);

  const [equipment, setEquipment] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");

  const [results, setResults] = useState<RecipeMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  const showingResults = results.length > 0;
  const currentStep = showingResults ? 3 : step;

  // Bring the top of the card into view whenever the user moves between steps
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
  }, [currentStep]);

  /* ----- Ingredient helpers ----- */

  const addIngredients = (raw: string) => {
    const newItems = raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

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

  const toggleQuickIngredient = (item: string) => {
    const exists = ingredients.some(
      (current) => current.toLowerCase() === item.toLowerCase()
    );

    if (exists) {
      removeIngredient(
        ingredients.find(
          (current) => current.toLowerCase() === item.toLowerCase()
        )!
      );
    } else {
      addIngredients(item);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients((current) => current.filter((item) => item !== ingredient));
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
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
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

  /* ----- Render ----- */

  return (
    <section
      ref={sectionRef}
      id="cook-what-you-have"
      className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-4 px-3 py-10 sm:px-4 sm:py-20"
    >
      <div className="rounded-3xl border border-orange-400/30 bg-stone-950/80 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
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
            <Stepper current={currentStep} />
          </div>
        </header>

        <div className="border-t border-stone-800/80" />

        {/* STEP 1 — Equipment */}
        {step === 1 && (
          <>
            <div className="px-5 pb-8 pt-8 sm:px-12 sm:pb-10 sm:pt-10">
              <KitchenEquipmentSelector
                selectedEquipment={equipment}
                onChange={setEquipment}
              />
            </div>

            <div className="sticky bottom-0 z-40 flex items-center justify-between gap-4 rounded-b-3xl border-t border-stone-800 bg-stone-950/95 px-5 py-4 backdrop-blur-md sm:px-12">
              <p className="text-sm text-stone-400">
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
                disabled={equipment.length === 0}
                onClick={() => {
                  setError(null);
                  setStep(2);
                }}
                className={primaryButton}
              >
                Next: ingredients
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        )}

        {/* STEP 2 — Ingredients */}
        {step === 2 && !showingResults && (
          <>
            <div className="mx-auto max-w-3xl px-5 pb-8 pt-8 sm:px-12 sm:pb-10 sm:pt-10">
              <h3 className="font-serif text-2xl font-black text-orange-50 sm:text-3xl">
                What&apos;s in your pantry?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400 sm:text-base">
                Add everything you&apos;re happy to cook with. We only suggest
                dishes made from what you list, so include basics like salt
                and oil.
              </p>

              {/* Equipment recap */}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-stone-800 bg-stone-900/50 px-4 py-3">
                <span className="text-sm text-stone-500">Cooking with</span>
                <div className="flex flex-1 flex-wrap gap-1.5">
                  {equipment.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-stone-800 px-2.5 py-1 text-xs text-stone-300"
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
                  className="text-sm font-medium text-orange-300 transition-colors hover:text-orange-200 focus:outline-none focus-visible:underline"
                >
                  Edit
                </button>
              </div>

              {/* Input */}
              <label
                htmlFor="ingredient-input"
                className="mt-7 block text-sm font-semibold text-stone-200"
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
                  placeholder="e.g. paneer, onion, tomato"
                  autoComplete="off"
                  enterKeyHint="done"
                  className="min-w-0 flex-1 rounded-xl border border-stone-700 bg-stone-900/80 px-4 py-3 text-base text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
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
                <p className="text-sm font-semibold text-stone-200">
                  Or tap to add
                </p>
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
                            : "border-stone-700 bg-stone-900/60 text-stone-300 hover:border-stone-500 hover:text-stone-100"
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
              <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900/40 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-white">
                    Your ingredients
                    <span className="ml-2 text-orange-300">
                      ({ingredients.length})
                    </span>
                  </h4>

                  {ingredients.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIngredients([])}
                      className="text-sm text-stone-500 transition-colors hover:text-orange-300"
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
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                >
                  {error}
                </div>
              )}

              {isLoading && (
                <div className="mt-6 grid gap-3" aria-hidden="true">
                  <ResultSkeleton />
                  <ResultSkeleton />
                </div>
              )}
            </div>

            <div className="sticky bottom-0 z-40 flex items-center justify-between gap-3 rounded-b-3xl border-t border-stone-800 bg-stone-950/95 px-5 py-4 backdrop-blur-md sm:px-12">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep(1);
                }}
                disabled={isLoading}
                className={ghostButton}
              >
                <span aria-hidden="true">←</span> Back
              </button>

              <button
                type="button"
                onClick={handleFindRecipes}
                disabled={isLoading || ingredients.length === 0}
                className={primaryButton}
              >
                {isLoading ? "Finding dishes…" : "Find what I can make"}
              </button>
            </div>
          </>
        )}

        {/* RESULTS */}
        {showingResults && (
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
                  <button
                    type="button"
                    onClick={() => {
                      setResults([]);
                      setError(null);
                      setStep(2);
                    }}
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
              </div>

              <div className="mt-6 grid gap-4">
                {results.map((recipe) => (
                  <article
                    key={recipe.dishName}
                    className="rounded-2xl border border-stone-700/80 bg-stone-900/60 p-5 transition-colors hover:border-orange-400/40 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-serif text-xl font-bold text-orange-50 sm:text-2xl">
                        {recipe.dishName}
                      </h4>
                      <span className="shrink-0 rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1 text-xs font-medium text-stone-300">
                        {recipe.prepTime}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-stone-400 sm:text-base">
                      {recipe.description}
                    </p>

                    <p className="mt-4 border-l-2 border-orange-400/60 pl-3 text-sm leading-relaxed text-stone-300">
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
                            className="rounded-full bg-stone-800 px-2.5 py-1 text-xs text-stone-300"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>

                      {recipe.equipmentUsed?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="mr-1 text-xs text-stone-500">
                            On
                          </span>
                          {recipe.equipmentUsed.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-orange-400/25 bg-orange-400/10 px-2.5 py-1 text-xs text-orange-200"
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