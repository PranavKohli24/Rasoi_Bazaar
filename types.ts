export interface Equipment {
  item: string;
  isSpecialized: boolean;
  alternative: string | null;
}

export interface Ingredient {
  amount: string;
  commonName: string;
  englishName: string;
}

export interface Tip {
  title: string;
  content: string;
}

export interface MethodStep {
  step: number;
  instruction: string;
  tip?: Tip;
}

export interface Recipe {
  dishName: string;
  description: string;
  prepTime: string;
  equipment: Equipment[];
  ingredients: Ingredient[];
  method: MethodStep[];
  notes: string[];
}