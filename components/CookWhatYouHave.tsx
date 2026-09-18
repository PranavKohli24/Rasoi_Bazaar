import React, { useState } from "react";
import {
  findRecipesFromIngredients,
  RecipeMatch,
} from "../services/cookWhatYouHaveService";

interface CookWhatYouHaveProps {
  onSelectDish: (dish: string) => void;
}

const equipmentOptions = [
  "Gas Stove",
  "Induction",
  "Tawa",
  "Kadai",
  "Pressure Cooker",
  "Mixer / Grinder",
  "Oven",
  "Microwave",
  "Air Fryer",
];

const CookWhatYouHave: React.FC<CookWhatYouHaveProps> = ({
  onSelectDish,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  const [equipment, setEquipment] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");

  const [results, setResults] = useState<RecipeMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleEquipment = (item: string) => {
    setEquipment((current) =>
      current.includes(item)
        ? current.filter((equipment) => equipment !== item)
        : [...current, item]
    );
  };

  const addIngredient = () => {
    const value = ingredientInput.trim();

    if (!value) return;

    const newIngredients = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setIngredients((current) => {
      const merged = [...current, ...newIngredients];

      return Array.from(
        new Set(merged.map((item) => item.toLowerCase()))
      ).map(
        (lowercaseItem) =>
          merged.find(
            (originalItem) =>
              originalItem.toLowerCase() === lowercaseItem
          )!
      );
    });

    setIngredientInput("");
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients((current) =>
      current.filter((item) => item !== ingredient)
    );
  };

  const handleIngredientKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addIngredient();
    }
  };

  const handleFindRecipes = async () => {
    if (!equipment.length) {
      setError("Please select at least one piece of equipment.");
      return;
    }

    if (!ingredients.length) {
      setError("Please add at least one ingredient.");
      return;
    }

    setError(null);
    setResults([]);
    setIsLoading(true);

    try {
      const response = await findRecipesFromIngredients({
        equipment,
        ingredients,
      });

      setResults(response.recipes);
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

  const handleStartIngredients = () => {
    if (!equipment.length) {
      setError("Please select at least one piece of equipment.");
      return;
    }

    setError(null);
    setStep(2);
  };

  return (
    <section
      id="cook-what-you-have"
      className="relative z-10 w-full max-w-5xl mx-auto px-4 py-20"
    >
      <div className="rounded-3xl border border-orange-400/40 bg-stone-950/75 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.4)] overflow-hidden">
        <div className="px-6 py-8 sm:px-10 sm:py-10">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-[0.18em]">
              Cook What You Have
            </p>

            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-black text-orange-50">
              Let&apos;s see what&apos;s possible.
            </h2>

            <p className="mt-3 text-stone-400">
              Tell us what&apos;s in your kitchen and we&apos;ll find dishes
              you can actually make.
            </p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="mt-10 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-white">
                What equipment do you have?
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                Select everything available in your kitchen.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                {equipmentOptions.map((item) => {
                  const selected = equipment.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleEquipment(item)}
                      className={`rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                        selected
                          ? "border-orange-300 bg-orange-400/15 text-orange-100 shadow-[0_0_24px_rgba(251,146,60,0.08)]"
                          : "border-stone-700/80 bg-stone-900/60 text-stone-300 hover:border-stone-500 hover:bg-stone-800/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                            selected
                              ? "border-orange-300 bg-orange-200 text-stone-900"
                              : "border-stone-600"
                          }`}
                        >
                          {selected ? "✓" : ""}
                        </span>

                        <span className="font-medium">
                          {item}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-300">
                  {error}
                </p>
              )}

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={handleStartIngredients}
                  className="rounded-xl bg-orange-200 px-6 py-3 font-semibold text-stone-900 transition hover:bg-orange-100 hover:-translate-y-0.5"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && !results.length && (
            <div className="mt-10 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-white">
                What ingredients do you have?
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                Add everything you&apos;re willing to cook with.
              </p>

              {/* Ingredient input */}
              <div className="mt-6 flex gap-3">
                <input
                  type="text"
                  value={ingredientInput}
                  onChange={(event) =>
                    setIngredientInput(event.target.value)
                  }
                  onKeyDown={handleIngredientKeyDown}
                  placeholder="e.g. paneer, onion, tomato"
                  className="flex-1 rounded-xl border border-stone-700 bg-stone-900/80 px-4 py-3 text-stone-100 placeholder:text-stone-600 outline-none transition focus:border-orange-400"
                />

                <button
                  type="button"
                  onClick={addIngredient}
                  className="rounded-xl border border-stone-700 bg-stone-800 px-5 py-3 font-semibold text-stone-200 transition hover:bg-stone-700"
                >
                  Add
                </button>
              </div>

              {/* Ingredient chips */}
              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {ingredients.map((ingredient) => (
                    <button
                      key={ingredient}
                      type="button"
                      onClick={() => removeIngredient(ingredient)}
                      className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-sm text-orange-100 hover:bg-orange-400/20 transition"
                    >
                      {ingredient}
                      <span className="text-orange-300">×</span>
                    </button>
                  ))}
                </div>
              )}

              {error && (
                <p className="mt-4 text-sm text-red-300">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStep(1);
                  }}
                  className="text-sm text-stone-500 hover:text-stone-300 transition"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={handleFindRecipes}
                  disabled={isLoading}
                  className="rounded-xl bg-orange-200 px-6 py-3 font-semibold text-stone-900 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Finding dishes..." : "Find What I Can Make"}
                </button>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {results.length > 0 && (
            <div className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    You can make these
                  </h3>

                  <p className="mt-1 text-sm text-stone-500">
                    Based only on the ingredients and equipment you selected.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setResults([]);
                    setError(null);
                  }}
                  className="text-sm text-stone-500 hover:text-stone-300 transition"
                >
                  Start over
                </button>
              </div>

              <div className="grid gap-4 mt-6">
                {results.map((recipe) => (
                  <div
                    key={recipe.dishName}
                    className="rounded-2xl border border-stone-700/80 bg-stone-900/60 p-5 hover:border-orange-400/40 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                      <div className="min-w-0">
                        <h4 className="text-xl font-semibold text-orange-50">
                          {recipe.dishName}
                        </h4>

                        <p className="mt-1 text-sm text-stone-400">
                          {recipe.description}
                        </p>

                        <p className="mt-3 text-sm text-stone-300">
                          {recipe.whyItWorks}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {recipe.ingredientsUsed.map((ingredient) => (
                            <span
                              key={ingredient}
                              className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-300"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>

                        <p className="mt-4 text-xs text-stone-500">
                          {recipe.prepTime}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectDish(recipe.dishName)}
                        className="shrink-0 rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 transition hover:bg-orange-100"
                      >
                        Make this
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CookWhatYouHave;