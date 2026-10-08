import { Recipe, Ingredient, Equipment, MethodStep } from "../types";

const parsePrepMinutes = (prepTime: string): number | null => {
  const match = prepTime.match(/(\d+)\s*(?:-|to)?\s*(\d+)?\s*(hours?|hrs?|minutes?|mins?)/i);
  if (!match) return null;
  const first = parseInt(match[1], 10);
  const second = match[2] ? parseInt(match[2], 10) : null;
  const value = second ? Math.max(first, second) : first;
  const unit = match[3].toLowerCase();
  return unit.startsWith("h") ? value * 60 : value;
};

const formatPrepMinutes = (totalMinutes: number): string => {
  if (totalMinutes < 60) return `${totalMinutes} mins`;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins === 0 ? `${hours} hr${hours > 1 ? "s" : ""}` : `${hours} hr ${mins} mins`;
};

const mergePrepTime = (recipes: Recipe[]): string => {
  const minutes = recipes.map((r) => parsePrepMinutes(r.prepTime));
  if (minutes.every((m): m is number => m !== null)) {
    return formatPrepMinutes(minutes.reduce((a, b) => a + b, 0));
  }
  // Couldn't parse one of them — fall back to just listing both as given.
  return recipes.map((r) => r.prepTime).join(" + ");
};

const mergeIngredients = (recipes: Recipe[]): Ingredient[] =>
  recipes.flatMap((r) =>
    r.ingredients.map((ing) => ({
      ...ing,
      commonName: `${ing.commonName} (for ${r.dishName})`,
    }))
  );

const mergeEquipment = (recipes: Recipe[]): Equipment[] => {
  const byName = new Map<string, Equipment>();
  for (const r of recipes) {
    for (const tool of r.equipment) {
      const key = tool.item.trim().toLowerCase();
      const existing = byName.get(key);
      if (!existing) {
        byName.set(key, tool);
      } else if (tool.isSpecialized && !existing.isSpecialized) {
        byName.set(key, tool); // prefer the entry that carries the workaround note
      }
    }
  }
  return [...byName.values()];
};

const mergeMethod = (recipes: Recipe[]): MethodStep[] => {
  const steps: MethodStep[] = [];
  let stepNumber = 1;

  recipes.forEach((r, i) => {
    r.method.forEach((s) => {
      steps.push({ ...s, step: stepNumber++ });
    });

    const next = recipes[i + 1];
    if (next) {
      steps.push({
        step: stepNumber++,
        instruction: `${r.dishName} is ready. Now let's make ${next.dishName}.`,
        isTransition: true,
      });
    }
  });

  return steps;
};

const mergeNutrition = (recipes: Recipe[]) => {
  if (!recipes.every((r) => r.nutrition)) return undefined;
  return recipes.reduce(
    (total, r) => ({
      calories: total.calories + r.nutrition!.calories,
      protein: total.protein + r.nutrition!.protein,
      carbs: total.carbs + r.nutrition!.carbs,
      fat: total.fat + r.nutrition!.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

/** Combines two or more predefined recipes into one cook-along Recipe:
 *  make the first dish fully, then the next, then the next — all inside
 *  a single RecipeDisplay session. */
export const mergeRecipes = (recipes: Recipe[]): Recipe => {
  if (recipes.length === 1) return recipes[0];

  return {
    dishName: recipes.map((r) => r.dishName).join(" & "),
    description: recipes.map((r) => r.description).join(" "),
    prepTime: mergePrepTime(recipes),
    equipment: mergeEquipment(recipes),
    ingredients: mergeIngredients(recipes),
    method: mergeMethod(recipes),
    notes: recipes.flatMap((r) => r.notes.map((n) => `${r.dishName}: ${n}`)),
    nutrition: mergeNutrition(recipes),
    image: recipes.find((r) => r.image)?.image,
    images: recipes.map((r) => r.image).filter((src): src is string => !!src),
  };
};