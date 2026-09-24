import { Recipe } from "../types";

export const predefinedRecipes: Record<string, Recipe> = {
  // ============================================================
  // QUICK MEALS
  // ============================================================

  "quick 20-minute paneer bhurji": {
    dishName: "Paneer Bhurji",
    description:
      "A quick, spicy and comforting Indian paneer dish made with crumbled paneer, onions, tomatoes and everyday spices.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      { amount: "200 g", commonName: "Paneer", englishName: "paneer" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomato" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a pan over medium heat." },
      {
        step: 2,
        instruction:
          "Add chopped onions and green chilli. Cook, stirring often, until the onions turn soft.",
      },
      {
        step: 3,
        instruction:
          "Add chopped tomatoes and cook until they become soft and slightly mushy.",
      },
      {
        step: 4,
        instruction:
          "Add turmeric, red chilli powder and salt. Stir well.",
      },
      {
        step: 5,
        instruction:
          "Crumble the paneer with your hands and add it to the pan.",
      },
      {
        step: 6,
        instruction:
          "Mix everything gently and cook for 2 to 3 minutes.",
      },
      {
        step: 7,
        instruction:
          "Sprinkle garam masala and give it one final mix.",
        tip: {
          title: "Keep the paneer soft",
          content:
            "Don't cook the paneer for too long or it can turn chewy and rubbery.",
        },
      },
      {
        step: 8,
        instruction: "Serve hot with roti, paratha or bread.",
      },
    ],
    notes: [
      "Add chopped coriander leaves at the end for extra freshness.",
      "Adjust the green chilli and red chilli powder to your spice preference.",
    ],
  },

  "poha (kanda batata poha)": {
    dishName: "Poha (Kanda Batata Poha)",
    description:
      "A light, tangy flattened-rice breakfast tempered with mustard seeds, curry leaves, peanuts and a squeeze of lemon.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Strainer", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "2 cups",
        commonName: "Poha",
        englishName: "flattened rice",
      },
      {
        amount: "1",
        commonName: "Pyaaz",
        englishName: "onion, chopped",
      },
      {
        amount: "1 small",
        commonName: "Aloo",
        englishName: "potato, chopped (optional)",
      },
      {
        amount: "2 tbsp",
        commonName: "Moongfali",
        englishName: "peanuts",
      },
      {
        amount: "1/2 tsp",
        commonName: "Rai",
        englishName: "mustard seeds",
      },
      {
        amount: "a few",
        commonName: "Kadi Patta",
        englishName: "curry leaves",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli",
      },
      {
        amount: "2 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      {
        amount: "1/2 tsp",
        commonName: "Cheeni",
        englishName: "sugar (optional)",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "1",
        commonName: "Nimbu",
        englishName: "lemon",
      },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Rinse poha in a strainer under running water for a few seconds until softened. Do not soak it.",
      },
      {
        step: 2,
        instruction:
          "Heat oil in a pan and add mustard seeds. Let them pop.",
      },
      {
        step: 3,
        instruction:
          "Add peanuts and fry until lightly golden.",
      },
      {
        step: 4,
        instruction:
          "Add curry leaves and chopped onion, along with potato if using. Cook until soft.",
      },
      {
        step: 5,
        instruction:
          "Add turmeric, green chilli, salt and sugar. Mix well.",
      },
      {
        step: 6,
        instruction:
          "Add the softened poha and toss gently to combine. Cover and cook for 2 to 3 minutes on low heat.",
      },
      {
        step: 7,
        instruction:
          "Turn off the heat, squeeze in lemon juice and garnish with coriander.",
        tip: {
          title: "Don't soak",
          content:
            "Rinse the poha instead of soaking it. Soaking can make it mushy instead of light and fluffy.",
        },
      },
    ],
    notes: [
      "Rinsing instead of soaking keeps the poha light and fluffy.",
    ],
  },

  "vegetable upma": {
    dishName: "Vegetable Upma",
    description:
      "A warm, savory semolina porridge studded with vegetables and tempered spices - quick and filling.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Rava",
        englishName: "semolina",
      },
      {
        amount: "1/2 cup",
        commonName: "Mixed Vegetables",
        englishName: "carrot, peas and beans, chopped",
      },
      {
        amount: "1",
        commonName: "Pyaaz",
        englishName: "onion",
      },
      {
        amount: "1/2 tsp",
        commonName: "Rai",
        englishName: "mustard seeds",
      },
      {
        amount: "1 tsp",
        commonName: "Urad Dal",
        englishName: "split black gram",
      },
      {
        amount: "a few",
        commonName: "Kadi Patta",
        englishName: "curry leaves",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli",
      },
      {
        amount: "2.5 cups",
        commonName: "Paani",
        englishName: "water",
      },
      {
        amount: "2 tbsp",
        commonName: "Tel ya Ghee",
        englishName: "oil or ghee",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "to taste",
        commonName: "Nimbu Ras",
        englishName: "lemon juice",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Dry roast rava in a pan on low heat until lightly aromatic and slightly golden. Set it aside.",
      },
      {
        step: 2,
        instruction:
          "Heat oil, add mustard seeds and urad dal, and let them sizzle until the dal turns light golden.",
      },
      {
        step: 3,
        instruction:
          "Add curry leaves, green chilli and onion. Cook until soft.",
      },
      {
        step: 4,
        instruction:
          "Add chopped vegetables and cook for 3 to 4 minutes.",
      },
      {
        step: 5,
        instruction:
          "Add water and salt, and bring it to a boil.",
      },
      {
        step: 6,
        instruction:
          "Lower the heat and slowly add the roasted rava while stirring continuously.",
      },
      {
        step: 7,
        instruction:
          "Cover and cook on low heat for 3 to 4 minutes until the water is absorbed and the upma looks fluffy.",
      },
      {
        step: 8,
        instruction:
          "Squeeze in lemon juice, fluff gently and serve hot.",
        tip: {
          title: "Avoid lumps",
          content:
            "Add the rava slowly while stirring constantly. This prevents almost all lumps.",
        },
      },
    ],
    notes: [],
  },

  "egg bhurji (anda bhurji)": {
    dishName: "Egg Bhurji (Anda Bhurji)",
    description:
      "Spicy scrambled eggs cooked with onions, tomatoes and chillies - a protein-packed 15-minute favorite.",
    prepTime: "Approx. 15 minutes",
    equipment: [
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      { amount: "4", commonName: "Ande", englishName: "eggs" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat oil in a pan. Add chopped onion and green chilli and cook until soft.",
      },
      {
        step: 2,
        instruction:
          "Add chopped tomato and cook until mushy.",
      },
      {
        step: 3,
        instruction:
          "Add turmeric, red chilli powder and salt. Mix well.",
      },
      {
        step: 4,
        instruction:
          "Crack the eggs directly into the pan.",
      },
      {
        step: 5,
        instruction:
          "Scramble continuously with a spatula, breaking up the curds as they form, for 2 to 3 minutes until just set.",
        tip: {
          title: "Don't overcook",
          content:
            "Stop stirring the moment the eggs look just set. Residual heat finishes them and keeps them soft.",
        },
      },
      {
        step: 6,
        instruction:
          "Garnish with coriander and serve hot with toast or roti.",
      },
    ],
    notes: [],
  },

  "quick vegetable pulao": {
    dishName: "Quick Vegetable Pulao",
    description:
      "A fragrant one-pot rice dish loaded with mixed vegetables and whole spices, ready in under 30 minutes.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "Pot with lid", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Basmati Chawal",
        englishName: "basmati rice, rinsed and soaked 15 minutes",
      },
      {
        amount: "1 cup",
        commonName: "Mixed Vegetables",
        englishName: "carrot, peas and beans",
      },
      {
        amount: "1",
        commonName: "Pyaaz",
        englishName: "onion",
      },
      {
        amount: "1",
        commonName: "Tej Patta",
        englishName: "bay leaf",
      },
      {
        amount: "1 inch",
        commonName: "Dalchini",
        englishName: "cinnamon",
      },
      {
        amount: "3",
        commonName: "Laung",
        englishName: "cloves",
      },
      {
        amount: "2",
        commonName: "Elaichi",
        englishName: "cardamom pods",
      },
      {
        amount: "1 tsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "2 tbsp",
        commonName: "Ghee ya Tel",
        englishName: "ghee or oil",
      },
      {
        amount: "2 cups",
        commonName: "Paani",
        englishName: "water",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat ghee in a pot and add the whole spices. Let them sizzle for a few seconds.",
      },
      {
        step: 2,
        instruction:
          "Add sliced onion and cook until light golden.",
      },
      {
        step: 3,
        instruction:
          "Add ginger-garlic paste and cook for 30 seconds.",
      },
      {
        step: 4,
        instruction:
          "Add mixed vegetables and sauté for 2 to 3 minutes.",
      },
      {
        step: 5,
        instruction:
          "Drain the soaked rice, add it to the pot and stir gently for a minute to coat it in ghee.",
      },
      {
        step: 6,
        instruction:
          "Add water and salt, and bring to a boil.",
      },
      {
        step: 7,
        instruction:
          "Cover, reduce the heat to low and cook for 12 to 15 minutes until the water is absorbed and the rice is fluffy.",
      },
      {
        step: 8,
        instruction:
          "Let it rest covered for 5 minutes, then fluff gently with a fork.",
        tip: {
          title: "Handle gently",
          content:
            "Don't stir the rice too much once it is cooking. Excess stirring can break the grains.",
        },
      },
    ],
    notes: [],
  },

  // ============================================================
  // HEALTHY & LIGHT
  // ============================================================

  "healthy moong dal cheela": {
    dishName: "Moong Dal Cheela",
    description:
      "A light, protein-rich savoury pancake made from ground yellow moong dal, perfect for a wholesome breakfast.",
    prepTime: "Approx. 30 minutes (plus 2 hours soaking)",
    equipment: [
      { item: "Mixer grinder", isSpecialized: false, alternative: null },
      {
        item: "Tawa (griddle)",
        isSpecialized: false,
        alternative: "Flat non-stick pan",
      },
      { item: "Ladle", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Peeli Moong Dal",
        englishName: "split yellow moong dal (soaked 2 hrs)",
      },
      { amount: "1 inch", commonName: "Adrak", englishName: "ginger" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      {
        amount: "1 small",
        commonName: "Pyaaz (kata hua)",
        englishName: "onion, finely chopped",
      },
      {
        amount: "2 tbsp",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves, chopped",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      {
        amount: "2 tbsp",
        commonName: "Tel",
        englishName: "cooking oil, for cooking",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Drain the soaked moong dal and add it to a mixer grinder with ginger, green chilli and a little water.",
      },
      {
        step: 2,
        instruction:
          "Grind to a smooth, thick, pourable batter similar to dosa batter.",
      },
      {
        step: 3,
        instruction:
          "Pour the batter into a bowl. Add cumin seeds, chopped onion, coriander leaves and salt. Mix well.",
      },
      {
        step: 4,
        instruction:
          "Heat a tawa on medium flame. Once hot, pour a ladle of batter in the centre.",
      },
      {
        step: 5,
        instruction:
          "Using the back of the ladle, spread it in a thin, gentle circular motion like a dosa.",
        tip: {
          title: "Keep it thin",
          content:
            "A thinner cheela cooks faster and turns out crisper at the edges.",
        },
      },
      {
        step: 6,
        instruction:
          "Drizzle a little oil around the edges. Cook for 2 to 3 minutes until the base turns golden.",
      },
      {
        step: 7,
        instruction:
          "Flip carefully and cook the other side for another 1 to 2 minutes.",
      },
      {
        step: 8,
        instruction:
          "Serve hot with mint chutney or plain yogurt.",
      },
    ],
    notes: [
      "Soaking the dal for at least 2 hours makes grinding much easier. You can soak it the night before if you're short on time.",
      "Add grated carrot or finely chopped spinach to the batter for extra nutrition.",
    ],
  },

  "vegetable dalia (broken wheat porridge)": {
    dishName: "Vegetable Dalia (Broken Wheat Porridge)",
    description:
      "A light, fiber-rich savory porridge made from broken wheat and vegetables - wholesome and easy to digest.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Dalia",
        englishName: "broken wheat",
      },
      {
        amount: "1 cup",
        commonName: "Mixed Vegetables",
        englishName: "mixed vegetables, chopped",
      },
      {
        amount: "1",
        commonName: "Pyaaz",
        englishName: "onion",
      },
      {
        amount: "1/2 tsp",
        commonName: "Rai",
        englishName: "mustard seeds",
      },
      {
        amount: "1/2 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "3 cups",
        commonName: "Paani",
        englishName: "water",
      },
      {
        amount: "1 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Dry roast dalia in a pan for 2 to 3 minutes until lightly aromatic. Set it aside.",
      },
      {
        step: 2,
        instruction:
          "Heat oil, add mustard and cumin seeds, and let them sizzle.",
      },
      {
        step: 3,
        instruction:
          "Add chopped onion and cook until soft.",
      },
      {
        step: 4,
        instruction:
          "Add vegetables and sauté for 2 to 3 minutes.",
      },
      {
        step: 5,
        instruction:
          "Add turmeric and salt. Mix well.",
      },
      {
        step: 6,
        instruction:
          "Add water and bring it to a boil.",
      },
      {
        step: 7,
        instruction:
          "Add the roasted dalia, stir, cover and simmer on low for 12 to 15 minutes until soft and porridge-like.",
      },
      {
        step: 8,
        instruction:
          "Serve hot, optionally with a spoon of ghee on top.",
      },
    ],
    notes: [
      "Great for breakfast or a light dinner. Keep it slightly soupy for easier digestion.",
    ],
  },

  "curd rice (thayir sadam)": {
    dishName: "Curd Rice (Thayir Sadam)",
    description:
      "Cool, comforting rice mixed with yogurt and a light tempering - a soothing South Indian classic.",
    prepTime: "Approx. 15 minutes (plus cooked rice)",
    equipment: [
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Small pan", isSpecialized: false, alternative: null },
      { item: "Spoon", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "1.5 cups",
        commonName: "Pakka Chawal",
        englishName: "cooked rice",
      },
      {
        amount: "1 cup",
        commonName: "Dahi",
        englishName: "curd / yogurt",
      },
      {
        amount: "1/4 cup",
        commonName: "Doodh",
        englishName: "milk, optional",
      },
      {
        amount: "1/2 tsp",
        commonName: "Rai",
        englishName: "mustard seeds",
      },
      {
        amount: "1 tsp",
        commonName: "Urad Dal",
        englishName: "split black gram",
      },
      {
        amount: "a few",
        commonName: "Kadi Patta",
        englishName: "curry leaves",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli",
      },
      {
        amount: "1/2 tsp",
        commonName: "Adrak",
        englishName: "grated ginger",
      },
      {
        amount: "1 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "optional",
        commonName: "Anar ya Angoor",
        englishName: "pomegranate or grapes for garnish",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Mash the cooked rice lightly with a spoon while it is still warm.",
      },
      {
        step: 2,
        instruction:
          "Add curd and milk, mix until creamy and add salt.",
      },
      {
        step: 3,
        instruction:
          "In a small pan, heat oil. Add mustard seeds and urad dal and let them sizzle until golden.",
      },
      {
        step: 4,
        instruction:
          "Add curry leaves, green chilli and grated ginger. Sizzle for a few seconds.",
      },
      {
        step: 5,
        instruction:
          "Pour the tempering over the curd rice and mix.",
      },
      {
        step: 6,
        instruction:
          "Chill for 20 to 30 minutes before serving for best flavor, or serve at room temperature.",
      },
    ],
    notes: [
      "Add the milk if you're not eating right away. It helps keep curd rice from becoming too sour or dry.",
    ],
  },

  "sprouts chaat": {
    dishName: "Sprouts Chaat",
    description:
      "A crunchy, protein-rich salad of sprouted moong beans tossed with vegetables, lemon and spices - no cooking needed.",
    prepTime: "Approx. 15 minutes (plus sprouting time)",
    equipment: [
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Spoon", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "1.5 cups",
        commonName: "Sprouted Moong",
        englishName: "sprouted moong beans",
      },
      {
        amount: "1/2",
        commonName: "Pyaaz",
        englishName: "onion, chopped",
      },
      {
        amount: "1",
        commonName: "Tamatar",
        englishName: "tomato, chopped",
      },
      {
        amount: "1/2",
        commonName: "Kheera",
        englishName: "cucumber, chopped",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli",
      },
      {
        amount: "1",
        commonName: "Nimbu",
        englishName: "lemon",
      },
      {
        amount: "1/2 tsp",
        commonName: "Chaat Masala",
        englishName: "chaat masala",
      },
      {
        amount: "1/4 tsp",
        commonName: "Bhuna Jeera Powder",
        englishName: "roasted cumin powder",
      },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "If the sprouts aren't pre-cooked, steam or boil them lightly for 3 to 4 minutes to soften. Drain and cool.",
      },
      {
        step: 2,
        instruction:
          "In a bowl, combine sprouts, chopped onion, tomato and cucumber.",
      },
      {
        step: 3,
        instruction:
          "Add chopped green chilli, chaat masala, roasted cumin powder and salt.",
      },
      {
        step: 4,
        instruction:
          "Squeeze lemon juice over the top.",
      },
      {
        step: 5,
        instruction:
          "Toss well and garnish with coriander leaves.",
      },
      {
        step: 6,
        instruction:
          "Serve immediately for maximum crunch.",
      },
    ],
    notes: [
      "To sprout moong at home, soak overnight, then keep wrapped in a damp cloth for a day.",
    ],
  },

  "lauki chana dal (bottle gourd with split chickpea lentils)": {
    dishName: "Lauki Chana Dal",
    description:
      "A light, nutritious dal-vegetable combo of bottle gourd simmered with chana dal - mild and easy on the stomach.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "Pressure cooker", isSpecialized: false, alternative: null },
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "1/2 cup",
        commonName: "Chana Dal",
        englishName: "chana dal, soaked 30 minutes",
      },
      {
        amount: "2 cups",
        commonName: "Lauki",
        englishName: "bottle gourd, cubed",
      },
      {
        amount: "1",
        commonName: "Pyaaz",
        englishName: "onion",
      },
      {
        amount: "1",
        commonName: "Tamatar",
        englishName: "tomato",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1/2 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      {
        amount: "1/2 tsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      {
        amount: "2 cups",
        commonName: "Paani",
        englishName: "water",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Pressure cook the soaked chana dal with turmeric and 1.5 cups water for 3 to 4 whistles, until soft but still holding shape.",
      },
      {
        step: 2,
        instruction:
          "In a pan, heat oil and add cumin seeds. Let them sizzle.",
      },
      {
        step: 3,
        instruction:
          "Add chopped onion and cook until soft.",
      },
      {
        step: 4,
        instruction:
          "Add ginger-garlic paste and cook for 30 seconds.",
      },
      {
        step: 5,
        instruction:
          "Add chopped tomato and cook until mushy.",
      },
      {
        step: 6,
        instruction:
          "Add bottle gourd cubes and salt. Mix well.",
      },
      {
        step: 7,
        instruction:
          "Add the cooked chana dal along with its water and mix.",
      },
      {
        step: 8,
        instruction:
          "Cover and simmer for 12 to 15 minutes until the bottle gourd is tender.",
      },
      {
        step: 9,
        instruction:
          "Garnish with coriander and serve with roti or rice.",
      },
    ],
    notes: [],
  },

  // ============================================================
  // DECADENT DESSERTS
  // ============================================================

  kheer: {
    dishName: "Kheer",
    description:
      "Creamy rice pudding slow-simmered in sweetened milk, fragrant with cardamom and topped with toasted nuts.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      {
        item: "Heavy-bottomed pan",
        isSpecialized: false,
        alternative:
          "Any thick-bottomed pan, to avoid the milk catching and burning",
      },
    ],
    ingredients: [
      {
        amount: "1/4 cup",
        commonName: "Chawal",
        englishName: "basmati rice, washed and soaked for 20 minutes",
      },
      {
        amount: "1 litre",
        commonName: "Doodh",
        englishName: "full-fat milk",
      },
      {
        amount: "1/3 cup",
        commonName: "Cheeni",
        englishName: "sugar",
      },
      {
        amount: "1/4 tsp",
        commonName: "Elaichi Powder",
        englishName: "cardamom powder",
      },
      {
        amount: "a few strands",
        commonName: "Kesar",
        englishName: "saffron (optional)",
      },
      {
        amount: "2 tbsp",
        commonName: "Badam aur Kishmish",
        englishName: "chopped almonds and raisins",
      },
      {
        amount: "1 tsp",
        commonName: "Ghee",
        englishName: "ghee",
      },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked rice and set it aside." },
      {
        step: 2,
        instruction:
          "Pour the milk into a heavy-bottomed pan and bring it to a boil over medium heat.",
      },
      {
        step: 3,
        instruction:
          "Once boiling, add the drained rice and lower the heat to a gentle simmer.",
      },
      {
        step: 4,
        instruction:
          "Let it simmer for 30 to 35 minutes, stirring every few minutes, until the rice is fully soft and the milk has thickened noticeably.",
        tip: {
          title: "Don't rush this step",
          content:
            "Stirring often and keeping the heat low stops the milk from catching at the bottom and gives the kheer its rich, creamy texture.",
        },
      },
      {
        step: 5,
        instruction:
          "Add the sugar and mix well. Simmer for another 5 minutes, stirring occasionally.",
      },
      {
        step: 6,
        instruction:
          "Add cardamom powder and saffron strands, and stir through.",
      },
      {
        step: 7,
        instruction:
          "In a small pan, heat the ghee and lightly toast the chopped almonds and raisins for a minute, until the raisins puff up.",
      },
      {
        step: 8,
        instruction:
          "Stir most of the toasted nuts into the kheer, saving a few for garnish.",
      },
      {
        step: 9,
        instruction:
          "Serve warm, or chill in the refrigerator for a few hours and serve cold.",
      },
    ],
    notes: [
      "The kheer will continue to thicken as it cools, so take it off the heat while it is still slightly thinner than you want the final texture to be.",
      "For a shortcut version, use leftover cooked rice and simmer it in the milk for about 15 minutes instead of 30.",
    ],
  },

  "gajar halwa (carrot halwa)": {
    dishName: "Gajar Halwa (Carrot Halwa)",
    description:
      "Sweet grated carrots slow-cooked in milk and ghee until rich and fudgy, finished with nuts - a winter classic.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "Heavy-bottomed pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
      { item: "Small pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "4 cups",
        commonName: "Gajar",
        englishName: "red carrots, grated",
      },
      {
        amount: "2 cups",
        commonName: "Doodh",
        englishName: "full-fat milk",
      },
      {
        amount: "1/2 cup",
        commonName: "Cheeni",
        englishName: "sugar",
      },
      {
        amount: "3 tbsp",
        commonName: "Ghee",
        englishName: "ghee",
      },
      {
        amount: "1/4 tsp",
        commonName: "Elaichi Powder",
        englishName: "cardamom powder",
      },
      {
        amount: "2 tbsp",
        commonName: "Badam aur Kaju",
        englishName: "chopped cashews and almonds",
      },
      {
        amount: "1 tbsp",
        commonName: "Kishmish",
        englishName: "raisins",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat 1 tablespoon ghee in a heavy-bottomed pan and add grated carrots. Sauté for 5 minutes.",
      },
      {
        step: 2,
        instruction:
          "Add milk, bring it to a gentle boil and then simmer, stirring often.",
      },
      {
        step: 3,
        instruction:
          "Cook for 25 to 30 minutes, stirring regularly, until the milk is fully absorbed and the carrots are soft.",
      },
      {
        step: 4,
        instruction:
          "Add sugar and mix well. The mixture will loosen as the sugar melts. Continue cooking for 8 to 10 minutes until it thickens again.",
      },
      {
        step: 5,
        instruction:
          "Add the remaining ghee and cardamom powder and mix well.",
      },
      {
        step: 6,
        instruction:
          "In a small pan, lightly toast the cashews, almonds and raisins in a little ghee.",
      },
      {
        step: 7,
        instruction:
          "Stir most of the nuts into the halwa, saving some for garnish.",
      },
      {
        step: 8,
        instruction:
          "Serve warm or chilled.",
        tip: {
          title: "Prevent sticking",
          content:
            "Stir often during the milk-absorption stage so the halwa does not catch at the bottom.",
        },
      },
    ],
    notes: [],
  },

  "besan ladoo": {
    dishName: "Besan Ladoo",
    description:
      "Nutty, melt-in-the-mouth sweet balls made from roasted gram flour, ghee and sugar - no frying needed.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "Heavy pan", isSpecialized: false, alternative: null },
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "2 cups",
        commonName: "Besan",
        englishName: "gram flour",
      },
      {
        amount: "3/4 cup",
        commonName: "Ghee",
        englishName: "ghee",
      },
      {
        amount: "3/4 cup",
        commonName: "Pisi Cheeni",
        englishName: "powdered sugar",
      },
      {
        amount: "1/2 tsp",
        commonName: "Elaichi Powder",
        englishName: "cardamom powder",
      },
      {
        amount: "2 tbsp",
        commonName: "Badam/Pista",
        englishName: "chopped almonds or pistachios (optional)",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat ghee in a heavy pan on low heat and add besan.",
      },
      {
        step: 2,
        instruction:
          "Roast on low-medium heat, stirring continuously, for 15 to 18 minutes until aromatic and golden brown.",
      },
      {
        step: 3,
        instruction:
          "Keep stirring. The besan will first clump, then turn smooth and glossy once fully roasted.",
      },
      {
        step: 4,
        instruction:
          "Turn off the heat and let it cool for 10 to 15 minutes until warm, not hot.",
      },
      {
        step: 5,
        instruction:
          "Add powdered sugar and cardamom powder and mix well.",
      },
      {
        step: 6,
        instruction:
          "Once cool enough to touch, take small portions and roll them into round ladoos with your palms.",
      },
      {
        step: 7,
        instruction:
          "Press a few chopped nuts gently onto the surface, if using.",
      },
      {
        step: 8,
        instruction:
          "Let the ladoos set for 30 minutes before serving.",
        tip: {
          title: "Timing matters",
          content:
            "Add the sugar only after the besan has cooled slightly. Adding it while too hot can make the ladoos set too hard.",
        },
      },
    ],
    notes: [],
  },

  "rava kesari (semolina halwa)": {
    dishName: "Rava Kesari (Semolina Halwa)",
    description:
      "A glossy, saffron-scented semolina dessert made in one pan in under 20 minutes.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Small pot", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Rava",
        englishName: "fine semolina",
      },
      {
        amount: "1 cup",
        commonName: "Cheeni",
        englishName: "sugar",
      },
      {
        amount: "2.5 cups",
        commonName: "Paani",
        englishName: "water",
      },
      {
        amount: "4 tbsp",
        commonName: "Ghee",
        englishName: "ghee",
      },
      {
        amount: "2 tbsp",
        commonName: "Kaju aur Kishmish",
        englishName: "cashews and raisins",
      },
      {
        amount: "1/4 tsp",
        commonName: "Elaichi Powder",
        englishName: "cardamom powder",
      },
      {
        amount: "optional",
        commonName: "Kesar",
        englishName: "saffron strands or a pinch of orange food color",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat 1 tablespoon ghee in a pan and roast cashews and raisins until golden and puffed. Set them aside.",
      },
      {
        step: 2,
        instruction:
          "In the same pan, add the remaining ghee and rava. Roast on low heat for 4 to 5 minutes until aromatic.",
      },
      {
        step: 3,
        instruction:
          "In a separate pot, bring the water to a boil with saffron or food color.",
      },
      {
        step: 4,
        instruction:
          "Carefully pour the hot water into the roasted rava while stirring constantly. Pour slowly to avoid lumps.",
      },
      {
        step: 5,
        instruction:
          "Keep stirring until all the water is absorbed and the rava softens, about 2 to 3 minutes.",
      },
      {
        step: 6,
        instruction:
          "Add sugar and mix well. The mixture will loosen again as the sugar melts.",
      },
      {
        step: 7,
        instruction:
          "Cook, stirring, until it thickens and starts leaving the sides of the pan, about 4 to 5 minutes.",
      },
      {
        step: 8,
        instruction:
          "Add cardamom powder and the toasted nuts, mix well and serve warm.",
        tip: {
          title: "Avoid lumps",
          content:
            "Pour the water in slowly while stirring constantly. This single step prevents almost all lumps.",
        },
      },
    ],
    notes: [],
  },

  "gulab jamun (home-style, with milk powder)": {
    dishName: "Gulab Jamun",
    description:
      "Soft, spongy fried milk dumplings soaked in warm cardamom-rose sugar syrup.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Kadai", isSpecialized: false, alternative: "Deep heavy-bottomed pan" },
      { item: "Slotted spoon", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Milk Powder",
        englishName: "milk powder",
      },
      {
        amount: "3 tbsp",
        commonName: "Maida",
        englishName: "all-purpose flour",
      },
      {
        amount: "1/4 tsp",
        commonName: "Baking Soda",
        englishName: "baking soda",
      },
      {
        amount: "3-4 tbsp",
        commonName: "Doodh",
        englishName: "milk, for binding",
      },
      {
        amount: "1.5 cups",
        commonName: "Cheeni",
        englishName: "sugar",
      },
      {
        amount: "1.5 cups",
        commonName: "Paani",
        englishName: "water",
      },
      {
        amount: "1/4 tsp",
        commonName: "Elaichi Powder",
        englishName: "cardamom powder",
      },
      {
        amount: "a few drops",
        commonName: "Gulab Jal",
        englishName: "rose water, optional",
      },
      {
        amount: "as needed",
        commonName: "Tel ya Ghee",
        englishName: "oil or ghee, for deep frying",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "In a bowl, mix milk powder, flour and baking soda.",
      },
      {
        step: 2,
        instruction:
          "Add milk a little at a time and gently bring everything together into a soft, smooth dough. Do not knead hard.",
      },
      {
        step: 3,
        instruction:
          "Cover and rest the dough for 10 minutes.",
      },
      {
        step: 4,
        instruction:
          "Meanwhile, boil sugar and water together for 8 to 10 minutes until lightly sticky. Add cardamom powder and rose water and keep warm.",
      },
      {
        step: 5,
        instruction:
          "Divide the dough into small balls, rolling gently between your palms until completely smooth with no cracks.",
      },
      {
        step: 6,
        instruction:
          "Heat oil or ghee on medium-low heat. Test with a small piece of dough. It should rise slowly without browning too fast.",
      },
      {
        step: 7,
        instruction:
          "Fry the balls in batches, stirring gently and continuously, until evenly deep golden brown all over, about 6 to 8 minutes per batch.",
      },
      {
        step: 8,
        instruction:
          "Immediately drop the hot fried balls into the warm sugar syrup.",
      },
      {
        step: 9,
        instruction:
          "Let them soak for at least 30 minutes before serving.",
        tip: {
          title: "Fry low and slow",
          content:
            "Frying too hot browns the outside before the inside cooks, leaving a raw center.",
        },
      },
    ],
    notes: [],
  },

  // ============================================================
  // VEGETARIAN MAINS
  // ============================================================

  "palak paneer": {
    dishName: "Palak Paneer",
    description:
      "Soft paneer cubes simmered in a silky, vibrant green spinach gravy, gently spiced and utterly comforting.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "Mixer grinder", isSpecialized: false, alternative: null },
      { item: "Pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "1 large bunch",
        commonName: "Palak",
        englishName: "spinach, washed",
      },
      {
        amount: "200 g",
        commonName: "Paneer",
        englishName: "paneer, cubed",
      },
      {
        amount: "1 medium",
        commonName: "Pyaaz",
        englishName: "onion, chopped",
      },
      {
        amount: "1 medium",
        commonName: "Tamatar",
        englishName: "tomato, chopped",
      },
      {
        amount: "1 tsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli",
      },
      {
        amount: "1/2 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      {
        amount: "1/2 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "2 tbsp",
        commonName: "Malai / Cream",
        englishName: "fresh cream (optional)",
      },
      {
        amount: "1 tbsp",
        commonName: "Makhan / Tel",
        englishName: "butter or oil",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Boil water in a pan. Add spinach leaves and let them blanch for 2 minutes.",
      },
      {
        step: 2,
        instruction:
          "Immediately drain and transfer the spinach into cold water to keep its bright green colour.",
      },
      {
        step: 3,
        instruction:
          "Blend the blanched spinach into a smooth puree using a mixer grinder. Set aside.",
      },
      {
        step: 4,
        instruction:
          "Heat butter or oil in a pan. Add cumin seeds and let them sizzle.",
      },
      {
        step: 5,
        instruction:
          "Add chopped onions and cook until light golden. Add ginger-garlic paste and green chilli, and cook for a minute.",
      },
      {
        step: 6,
        instruction:
          "Add chopped tomatoes and cook until soft and the oil starts to separate.",
      },
      {
        step: 7,
        instruction:
          "Pour in the spinach puree and mix well. Add salt and garam masala. Simmer for 5 minutes.",
      },
      {
        step: 8,
        instruction:
          "Gently add the paneer cubes and simmer for another 3 to 4 minutes.",
        tip: {
          title: "Softer paneer",
          content:
            "For extra-soft paneer, soak the cubes in warm water for 10 minutes before adding them.",
        },
      },
      {
        step: 9,
        instruction:
          "Stir in the cream if using, and serve hot with roti or steamed rice.",
      },
    ],
    notes: [
      "Skip the cream for a lighter everyday version.",
      "A small piece of ginger and a pinch of sugar in the puree helps balance bitterness from the spinach.",
    ],
  },

  "chana masala": {
    dishName: "Chana Masala",
    description:
      "Spiced chickpeas simmered in a tangy onion-tomato gravy - a hearty, protein-rich staple.",
    prepTime: "Approx. 40 minutes (using boiled/canned chickpeas)",
    equipment: [
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "2 cups",
        commonName: "Chole",
        englishName: "chickpeas, boiled or canned",
      },
      { amount: "1", commonName: "Pyaaz", englishName: "onion" },
      {
        amount: "2",
        commonName: "Tamatar",
        englishName: "tomatoes",
      },
      {
        amount: "1 tsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1.5 tsp",
        commonName: "Chana Masala",
        englishName: "chana masala powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1/2 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
      { amount: "1", commonName: "Nimbu", englishName: "lemon" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat oil in a pan. Add cumin seeds and let them sizzle.",
      },
      {
        step: 2,
        instruction:
          "Add chopped onion and cook until golden.",
      },
      {
        step: 3,
        instruction:
          "Add ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 4,
        instruction:
          "Add chopped tomatoes and cook until soft and mushy.",
      },
      {
        step: 5,
        instruction:
          "Add turmeric, red chilli powder, chana masala powder and salt. Mix well and cook for 2 minutes.",
      },
      {
        step: 6,
        instruction:
          "Add the boiled chickpeas along with a little water and mix.",
      },
      {
        step: 7,
        instruction:
          "Simmer for 15 to 20 minutes, lightly mashing a few chickpeas to thicken the gravy.",
        tip: {
          title: "Natural thickener",
          content:
            "Mashing a few chickpeas against the pan thickens the gravy without needing flour.",
        },
      },
      {
        step: 8,
        instruction:
          "Squeeze lemon juice, garnish with coriander and serve hot with rice or bhature.",
      },
    ],
    notes: [],
  },

  "rajma (red kidney bean curry)": {
    dishName: "Rajma",
    description:
      "Red kidney beans simmered in a thick, spiced onion-tomato gravy - the classic pair to steamed rice.",
    prepTime: "Approx. 50 minutes (plus overnight soaking)",
    equipment: [
      { item: "Pressure cooker", isSpecialized: false, alternative: null },
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Rajma",
        englishName: "kidney beans, soaked overnight",
      },
      { amount: "1", commonName: "Pyaaz", englishName: "onion" },
      {
        amount: "2",
        commonName: "Tamatar",
        englishName: "tomatoes",
      },
      {
        amount: "1 tsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1 tsp",
        commonName: "Dhaniya Powder",
        englishName: "coriander powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "1/2 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Drain the soaked rajma and add it to a pressure cooker with fresh water and a pinch of salt.",
      },
      {
        step: 2,
        instruction:
          "Pressure cook for 6 to 8 whistles until completely soft and mashable.",
      },
      {
        step: 3,
        instruction:
          "In a pan, heat oil and add cumin seeds. Let them sizzle.",
      },
      {
        step: 4,
        instruction:
          "Add chopped onion and cook until golden.",
      },
      {
        step: 5,
        instruction:
          "Add ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 6,
        instruction:
          "Add chopped tomatoes and cook until soft and the oil separates.",
      },
      {
        step: 7,
        instruction:
          "Add red chilli powder, coriander powder and salt and mix well.",
      },
      {
        step: 8,
        instruction:
          "Add the cooked rajma with its water and mix well.",
      },
      {
        step: 9,
        instruction:
          "Simmer for 20 to 25 minutes, mashing a few beans to thicken, until the gravy is rich and thick.",
        tip: {
          title: "Patience pays off",
          content:
            "Rajma tastes better the longer it simmers. Don't rush this step if you have time.",
        },
      },
      {
        step: 10,
        instruction:
          "Sprinkle garam masala, garnish with coriander and serve hot with steamed rice.",
      },
    ],
    notes: [],
  },

  "bhindi masala (okra stir-fry)": {
    dishName: "Bhindi Masala",
    description:
      "Crisp-tender okra sautéed with onions and spices - a simple, everyday dry sabzi.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "Wide pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
      { item: "Kitchen towel", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "300 g",
        commonName: "Bhindi",
        englishName: "okra",
      },
      {
        amount: "1",
        commonName: "Pyaaz",
        englishName: "onion",
      },
      {
        amount: "1",
        commonName: "Tamatar",
        englishName: "tomato, optional",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1 tsp",
        commonName: "Dhaniya Powder",
        englishName: "coriander powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Amchur",
        englishName: "dry mango powder",
      },
      {
        amount: "3 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Wash the okra and dry it completely with a towel. Trim the ends and slice into rounds or lengthwise.",
      },
      {
        step: 2,
        instruction:
          "Heat oil in a wide pan on medium-high heat. Add the okra and cook uncovered for 8 to 10 minutes, stirring occasionally, until no longer slimy and lightly browned.",
      },
      {
        step: 3,
        instruction:
          "Push the okra to the side. Add chopped onion to the empty space and cook until soft.",
      },
      {
        step: 4,
        instruction:
          "Mix the onion and okra together. Add turmeric, red chilli powder, coriander powder and salt.",
      },
      {
        step: 5,
        instruction:
          "Cook for 3 to 4 minutes, stirring gently.",
      },
      {
        step: 6,
        instruction:
          "Sprinkle amchur powder, mix and cook for 1 more minute.",
      },
      {
        step: 7,
        instruction:
          "Serve hot with roti or dal-rice.",
      },
    ],
    notes: [
      "Never cover the pan while cooking okra. Trapped steam is what makes it slimy.",
    ],
  },

  "baingan bharta (smoky roasted eggplant mash)": {
    dishName: "Baingan Bharta",
    description:
      "Fire-roasted eggplant mashed and cooked with onions, tomatoes and spices - smoky and rustic.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "Gas flame or pan", isSpecialized: false, alternative: "Covered stovetop pan" },
      { item: "Tongs", isSpecialized: false, alternative: null },
      { item: "Pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "1 large",
        commonName: "Baingan",
        englishName: "eggplant",
      },
      { amount: "1", commonName: "Pyaaz", englishName: "onion" },
      {
        amount: "2",
        commonName: "Tamatar",
        englishName: "tomatoes",
      },
      {
        amount: "1 tsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      {
        amount: "3 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Roast the whole eggplant directly over an open gas flame, turning occasionally with tongs, until the skin is charred all over and the inside is soft, about 12 to 15 minutes.",
      },
      {
        step: 2,
        instruction:
          "Let it cool slightly, peel off the charred skin and mash the flesh with a fork.",
      },
      {
        step: 3,
        instruction:
          "Heat oil in a pan and add cumin seeds. Let them sizzle.",
      },
      {
        step: 4,
        instruction:
          "Add chopped onion and green chilli and cook until golden.",
      },
      {
        step: 5,
        instruction:
          "Add ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 6,
        instruction:
          "Add chopped tomatoes and cook until soft and mushy.",
      },
      {
        step: 7,
        instruction:
          "Add turmeric, red chilli powder and salt. Mix well.",
      },
      {
        step: 8,
        instruction:
          "Add the mashed eggplant, mix well and cook for 8 to 10 minutes, stirring occasionally.",
      },
      {
        step: 9,
        instruction:
          "Garnish with coriander and serve hot with roti.",
        tip: {
          title: "Don't skip the char",
          content:
            "Roasting the eggplant directly over flame is what gives bharta its signature smoky flavour.",
        },
      },
    ],
    notes: [
      "No gas flame? Roast the eggplant covered on the stovetop in a pan, turning often, or grill it.",
    ],
  },

  // ============================================================
  // CHICKEN CLASSICS
  // ============================================================

  "classic chicken korma": {
    dishName: "Chicken Korma",
    description:
      "A rich, mildly spiced chicken curry made creamy with cashews and browned onions - comfort food at its finest.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "Kadai or deep pan", isSpecialized: false, alternative: null },
      { item: "Mixer grinder", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "500 g",
        commonName: "Chicken",
        englishName: "chicken, curry-cut pieces",
      },
      {
        amount: "1/2 cup",
        commonName: "Dahi",
        englishName: "yogurt",
      },
      {
        amount: "2 large",
        commonName: "Pyaaz",
        englishName: "onions, thinly sliced",
      },
      {
        amount: "10",
        commonName: "Kaju",
        englishName: "cashews",
      },
      {
        amount: "1 tbsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1 inch, 2, 4",
        commonName: "Dalchini, Elaichi, Laung",
        englishName: "cinnamon stick, green cardamom, cloves",
      },
      {
        amount: "1",
        commonName: "Tej Patta",
        englishName: "bay leaf",
      },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "3 tbsp",
        commonName: "Ghee ya Tel",
        englishName: "ghee or oil",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Mix the chicken with yogurt, a pinch of salt and 1 teaspoon of ginger-garlic paste. Set aside for 20 minutes.",
      },
      {
        step: 2,
        instruction:
          "Heat 1 tablespoon ghee in a pan and fry the sliced onions until deep golden brown. Set aside to cool.",
      },
      {
        step: 3,
        instruction:
          "Blend the fried onions with the cashews and a little water into a smooth paste.",
      },
      {
        step: 4,
        instruction:
          "Heat the remaining ghee in a kadai. Add bay leaf, cinnamon, cardamom and cloves and let them sizzle for a few seconds.",
      },
      {
        step: 5,
        instruction:
          "Add the remaining ginger-garlic paste and cook for a minute until fragrant.",
      },
      {
        step: 6,
        instruction:
          "Add the marinated chicken and cook on medium-high heat for 5 to 6 minutes, stirring occasionally.",
      },
      {
        step: 7,
        instruction:
          "Add red chilli powder and salt. Mix well.",
      },
      {
        step: 8,
        instruction:
          "Stir in the onion-cashew paste. Add 1 cup water, cover and simmer for 15 to 20 minutes until the chicken is fully cooked.",
      },
      {
        step: 9,
        instruction:
          "Sprinkle garam masala and simmer for 2 more minutes.",
        tip: {
          title: "Extra richness",
          content:
            "Stir in 2 tablespoons of cream at the end for an even more luxurious, restaurant-style korma.",
        },
      },
      {
        step: 10,
        instruction:
          "Serve hot with naan, roti or steamed rice.",
      },
    ],
    notes: [
      "Korma is meant to be mild. Go easy on the red chilli powder if you prefer a gentler flavour.",
      "Frying the onions until truly deep golden is key to the classic korma flavour.",
    ],
  },

  "butter chicken (murgh makhani)": {
    dishName: "Butter Chicken (Murgh Makhani)",
    description:
      "Tender chicken in a velvety, buttery tomato-cashew gravy - India's most beloved chicken curry.",
    prepTime: "Approx. 50 minutes (plus 30 min marination)",
    equipment: [
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Blender", isSpecialized: false, alternative: "Mixer grinder" },
    ],
    ingredients: [
      {
        amount: "500 g",
        commonName: "Chicken",
        englishName: "boneless chicken",
      },
      {
        amount: "1/2 cup",
        commonName: "Dahi",
        englishName: "yogurt",
      },
      {
        amount: "1 tbsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "4",
        commonName: "Tamatar",
        englishName: "tomatoes",
      },
      {
        amount: "10",
        commonName: "Kaju",
        englishName: "cashews",
      },
      {
        amount: "3 tbsp",
        commonName: "Makhan",
        englishName: "butter",
      },
      {
        amount: "3 tbsp",
        commonName: "Malai",
        englishName: "cream",
      },
      {
        amount: "1 tsp",
        commonName: "Kasuri Methi",
        englishName: "dried fenugreek leaves",
      },
      {
        amount: "1/2 tsp",
        commonName: "Cheeni",
        englishName: "sugar",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Marinate the chicken with yogurt, 1 teaspoon ginger-garlic paste, 1/2 teaspoon red chilli powder and salt for 30 minutes.",
      },
      {
        step: 2,
        instruction:
          "Heat 1 tablespoon butter in a pan. Cook the marinated chicken on medium-high heat until browned and cooked through, about 8 to 10 minutes. Set aside.",
      },
      {
        step: 3,
        instruction:
          "Boil chopped tomatoes and cashews together in a little water for 10 minutes until soft. Cool and blend into a smooth puree.",
      },
      {
        step: 4,
        instruction:
          "In the same pan, heat the remaining butter, add the remaining ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 5,
        instruction:
          "Add the tomato-cashew puree and cook for 8 to 10 minutes, stirring, until it thickens.",
      },
      {
        step: 6,
        instruction:
          "Add the remaining red chilli powder, salt and sugar. Mix well.",
      },
      {
        step: 7,
        instruction:
          "Add the cooked chicken back in and simmer for 5 minutes.",
      },
      {
        step: 8,
        instruction:
          "Stir in cream and crushed kasuri methi. Sprinkle garam masala.",
      },
      {
        step: 9,
        instruction:
          "Simmer for 2 more minutes and serve hot with naan or rice.",
        tip: {
          title: "Release more flavor",
          content:
            "Crush the kasuri methi between your palms before adding it to release more aroma.",
        },
      },
    ],
    notes: [],
  },

  "home-style chicken curry": {
    dishName: "Home-style Chicken Curry",
    description:
      "A comforting everyday chicken curry with a spiced onion-tomato gravy - simple, no fancy ingredients needed.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "Pot", isSpecialized: false, alternative: "Deep pan" },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "500 g",
        commonName: "Chicken",
        englishName: "chicken, curry-cut",
      },
      {
        amount: "2",
        commonName: "Pyaaz",
        englishName: "onions",
      },
      {
        amount: "2",
        commonName: "Tamatar",
        englishName: "tomatoes",
      },
      {
        amount: "1 tbsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1/2 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1 tsp",
        commonName: "Dhaniya Powder",
        englishName: "coriander powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "3 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      {
        amount: "1 cup",
        commonName: "Paani",
        englishName: "water",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat oil in a pot and add sliced onions. Cook until golden brown.",
      },
      {
        step: 2,
        instruction:
          "Add ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 3,
        instruction:
          "Add chopped tomatoes and cook until soft and the oil separates.",
      },
      {
        step: 4,
        instruction:
          "Add turmeric, red chilli powder, coriander powder and salt. Mix and cook for 2 minutes.",
      },
      {
        step: 5,
        instruction:
          "Add chicken pieces, mix well to coat in the masala and cook for 5 to 6 minutes.",
      },
      {
        step: 6,
        instruction:
          "Add water, cover and simmer on medium-low heat for 20 to 25 minutes until the chicken is fully cooked and tender.",
      },
      {
        step: 7,
        instruction:
          "Sprinkle garam masala and simmer for 2 more minutes.",
      },
      {
        step: 8,
        instruction:
          "Garnish with coriander and serve hot with rice or roti.",
        tip: {
          title: "Build the base",
          content:
            "Browning the onions well, deep golden rather than just soft, builds most of the curry's flavour.",
        },
      },
    ],
    notes: [],
  },

  "chicken tikka masala (stovetop)": {
    dishName: "Chicken Tikka Masala (Stovetop)",
    description:
      "Charred spiced chicken chunks simmered in a creamy tomato gravy - done entirely on the stovetop, no tandoor needed.",
    prepTime: "Approx. 1 hour (plus 30 min marination)",
    equipment: [
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Wide pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "500 g",
        commonName: "Chicken",
        englishName: "boneless chicken, cubed",
      },
      {
        amount: "1/2 cup",
        commonName: "Dahi",
        englishName: "yogurt",
      },
      {
        amount: "1 tbsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "3",
        commonName: "Tamatar",
        englishName: "tomatoes",
      },
      {
        amount: "1",
        commonName: "Pyaaz",
        englishName: "onion",
      },
      {
        amount: "3 tbsp",
        commonName: "Malai",
        englishName: "cream",
      },
      {
        amount: "2 tbsp",
        commonName: "Makhan",
        englishName: "butter",
      },
      {
        amount: "1 tsp",
        commonName: "Kasuri Methi",
        englishName: "dried fenugreek leaves",
      },
      {
        amount: "2 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Marinate the chicken cubes with yogurt, half the ginger-garlic paste, red chilli powder, garam masala and salt for at least 30 minutes.",
      },
      {
        step: 2,
        instruction:
          "Heat 1 tablespoon oil in a pan on high heat. Cook the marinated chicken in batches until charred at the edges and cooked through, 6 to 8 minutes per batch. Set aside.",
      },
      {
        step: 3,
        instruction:
          "In the same pan, heat butter and add chopped onion. Cook until golden.",
      },
      {
        step: 4,
        instruction:
          "Add the remaining ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 5,
        instruction:
          "Add pureed tomatoes and cook for 8 to 10 minutes until thickened.",
      },
      {
        step: 6,
        instruction:
          "Add salt and mix well, then stir in cream.",
      },
      {
        step: 7,
        instruction:
          "Add the charred chicken back into the gravy and simmer for 5 to 6 minutes.",
      },
      {
        step: 8,
        instruction:
          "Sprinkle crushed kasuri methi, mix and serve hot with naan or rice.",
        tip: {
          title: "The tandoor trick",
          content:
            "Cook the chicken on high heat in batches without crowding the pan. This helps mimic the charred flavour.",
        },
      },
    ],
    notes: [
      "This version is designed entirely for stovetop cooking and does not require a tandoor.",
    ],
  },

  "chicken 65": {
    dishName: "Chicken 65",
    description:
      "Crispy, spicy deep-fried chicken bites with a tangy curry-leaf tempering - a popular South Indian starter.",
    prepTime: "Approx. 40 minutes (plus 30 min marination)",
    equipment: [
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Kadai", isSpecialized: false, alternative: "Deep heavy-bottomed pan" },
      { item: "Small pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "500 g",
        commonName: "Chicken",
        englishName: "boneless chicken, cubed",
      },
      {
        amount: "2 tbsp",
        commonName: "Dahi",
        englishName: "yogurt",
      },
      {
        amount: "1 tbsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1.5 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "3 tbsp",
        commonName: "Corn Flour",
        englishName: "corn flour",
      },
      {
        amount: "2 tbsp",
        commonName: "Chawal Ka Atta",
        englishName: "rice flour",
      },
      {
        amount: "1",
        commonName: "Anda",
        englishName: "egg, optional",
      },
      {
        amount: "a handful",
        commonName: "Kadi Patta",
        englishName: "curry leaves",
      },
      {
        amount: "2",
        commonName: "Hari Mirch",
        englishName: "green chillies, slit",
      },
      {
        amount: "as needed",
        commonName: "Tel",
        englishName: "cooking oil, for deep frying",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Marinate the chicken with yogurt, ginger-garlic paste, 1 teaspoon red chilli powder, turmeric and salt for 30 minutes.",
      },
      {
        step: 2,
        instruction:
          "Add corn flour, rice flour and egg if using to the marinated chicken and mix to coat evenly.",
      },
      {
        step: 3,
        instruction:
          "Heat oil in a kadai on medium heat. Fry chicken pieces in batches until golden and crisp, about 6 to 8 minutes per batch. Drain on paper towels.",
      },
      {
        step: 4,
        instruction:
          "In a separate small pan, heat 1 tablespoon oil and add curry leaves and slit green chillies. Let them sizzle for a few seconds.",
      },
      {
        step: 5,
        instruction:
          "Add the remaining red chilli powder and a splash of water to make a quick spice paste. Cook for 30 seconds.",
      },
      {
        step: 6,
        instruction:
          "Toss the fried chicken in the tempering until well coated.",
      },
      {
        step: 7,
        instruction:
          "Serve hot immediately as a starter or side.",
        tip: {
          title: "Extra crunch",
          content:
            "Double-fry the chicken. Fry once until light golden, rest for 5 minutes, then fry again briefly until deep golden.",
        },
      },
    ],
    notes: [],
  },

  // ============================================================
  // BREADS & RICE
  // ============================================================

  "garlic naan on tawa": {
    dishName: "Garlic Naan",
    description:
      "Soft, pillowy homemade naan bubbled with garlic butter - made entirely on a tawa, no tandoor needed.",
    prepTime: "Approx. 2.5 hours (mostly resting time)",
    equipment: [
      {
        item: "Oven or tandoor",
        isSpecialized: true,
        alternative:
          "Cook on a hot tawa, covered with a lid, then char briefly with tongs directly over an open flame.",
      },
      {
        item: "Tawa (griddle)",
        isSpecialized: false,
        alternative: "Any heavy flat pan",
      },
      {
        item: "Rolling pin (belan)",
        isSpecialized: false,
        alternative: null,
      },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "yogurt" },
      {
        amount: "1/2 tsp",
        commonName: "Baking Powder",
        englishName: "baking powder",
      },
      {
        amount: "1/4 tsp",
        commonName: "Baking Soda",
        englishName: "baking soda",
      },
      { amount: "1 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      {
        amount: "4 cloves",
        commonName: "Lehsun (kata hua)",
        englishName: "garlic, finely chopped",
      },
      {
        amount: "2 tbsp",
        commonName: "Makhan (pighla hua)",
        englishName: "butter, melted",
      },
      {
        amount: "2 tbsp",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves, chopped (optional)",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "In a large bowl, mix flour, baking powder, baking soda, sugar and salt.",
      },
      {
        step: 2,
        instruction:
          "Add yogurt and oil. Gradually add a little water and knead into a soft, smooth dough.",
      },
      {
        step: 3,
        instruction:
          "Cover the dough with a damp cloth and let it rest in a warm place for at least 2 hours until slightly puffed.",
        tip: {
          title: "Warm spot tip",
          content:
            "If your kitchen is cold, keep the covered bowl inside your switched-off oven or microwave with the light on.",
        },
      },
      {
        step: 4,
        instruction:
          "Divide the dough into equal balls about the size of a golf ball.",
      },
      {
        step: 5,
        instruction:
          "Roll each ball into an oval shape, about 1/4 inch thick. Sprinkle chopped garlic on top and press it gently into the dough with the rolling pin.",
      },
      {
        step: 6,
        instruction:
          "Heat a tawa on medium-high heat until very hot. Place the rolled naan on it, garlic-side up.",
      },
      {
        step: 7,
        instruction:
          "Cover with a lid and cook for 1 to 2 minutes until bubbles form on top.",
      },
      {
        step: 8,
        instruction:
          "Flip the naan and cook the other side for another minute until golden brown spots appear.",
      },
      {
        step: 9,
        instruction:
          "For extra char, hold the cooked naan with tongs directly over an open flame for 5 to 10 seconds per side.",
      },
      {
        step: 10,
        instruction:
          "Brush generously with melted garlic butter and sprinkle coriander leaves. Serve hot.",
      },
    ],
    notes: [
      "The dough must feel soft and slightly sticky. This is what makes the naan fluffy.",
      "Naan is best eaten fresh and hot, straight off the tawa.",
    ],
  },

  "jeera rice": {
    dishName: "Jeera Rice",
    description:
      "Fragrant basmati rice tempered with roasted cumin seeds - the simplest, most comforting rice side dish.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "Pot with lid", isSpecialized: false, alternative: null },
      { item: "Fork", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Basmati Chawal",
        englishName: "basmati rice, rinsed and soaked 15 min",
      },
      {
        amount: "1 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      {
        amount: "1",
        commonName: "Tej Patta",
        englishName: "bay leaf",
      },
      {
        amount: "2 tbsp",
        commonName: "Ghee",
        englishName: "ghee",
      },
      {
        amount: "2 cups",
        commonName: "Paani",
        englishName: "water",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat ghee in a pot. Add cumin seeds and bay leaf, and let them sizzle until the cumin becomes fragrant and slightly darker.",
      },
      {
        step: 2,
        instruction:
          "Drain the soaked rice, add it to the pot and stir gently for a minute to coat it in ghee.",
      },
      {
        step: 3,
        instruction:
          "Add water and salt and bring to a boil.",
      },
      {
        step: 4,
        instruction:
          "Cover, reduce the heat to low and cook for 12 to 15 minutes until the water is absorbed.",
      },
      {
        step: 5,
        instruction:
          "Turn off the heat and let the rice rest covered for 5 minutes.",
      },
      {
        step: 6,
        instruction:
          "Fluff gently with a fork, garnish with coriander and serve hot.",
        tip: {
          title: "Even grains",
          content:
            "Don't skip soaking the rice. It helps the grains cook evenly and stay separate.",
        },
      },
    ],
    notes: [],
  },

  "aloo paratha": {
    dishName: "Aloo Paratha",
    description:
      "Whole wheat flatbread stuffed with a spiced mashed potato filling, cooked golden on a tawa.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Tawa", isSpecialized: false, alternative: "Flat non-stick pan" },
      { item: "Rolling pin (belan)", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "2 cups",
        commonName: "Atta",
        englishName: "whole wheat flour, plus extra for dusting",
      },
      {
        amount: "3",
        commonName: "Aloo",
        englishName: "potatoes, boiled and mashed",
      },
      {
        amount: "1/4 cup",
        commonName: "Pyaaz",
        englishName: "onion, finely chopped (optional)",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli, chopped",
      },
      {
        amount: "1/2 tsp",
        commonName: "Adrak",
        englishName: "ginger, grated",
      },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves, chopped",
      },
      {
        amount: "1/2 tsp",
        commonName: "Amchur",
        englishName: "dry mango powder",
      },
      {
        amount: "as needed",
        commonName: "Ghee/Tel",
        englishName: "ghee or oil for cooking",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Knead the whole wheat flour with water and a pinch of salt into a soft dough. Cover and rest for 15 to 20 minutes.",
      },
      {
        step: 2,
        instruction:
          "For the filling, mix mashed potatoes with onion, green chilli, ginger, red chilli powder, amchur, coriander leaves and salt.",
      },
      {
        step: 3,
        instruction:
          "Divide the dough into balls slightly larger than a golf ball, and the filling into slightly smaller portions.",
      },
      {
        step: 4,
        instruction:
          "Roll one dough ball into a small circle, place filling in the centre and gather the edges up to seal it.",
      },
      {
        step: 5,
        instruction:
          "Gently flatten the stuffed ball and roll it out carefully into a paratha, dusting with flour as needed.",
      },
      {
        step: 6,
        instruction:
          "Heat a tawa on medium heat and place the paratha on it.",
      },
      {
        step: 7,
        instruction:
          "Cook until small bubbles appear, flip and spread a little ghee on top.",
      },
      {
        step: 8,
        instruction:
          "Flip again, spread ghee on the other side too and cook until both sides have golden-brown spots.",
      },
      {
        step: 9,
        instruction:
          "Serve hot with yogurt, pickle or butter.",
        tip: {
          title: "Handle with care",
          content:
            "Roll gently and evenly. Pressing too hard can cause the filling to poke through.",
        },
      },
    ],
    notes: [],
  },

  "laccha paratha (multi-layered flatbread)": {
    dishName: "Laccha Paratha",
    description:
      "A flaky, multi-layered whole wheat flatbread with crisp folds - cooked entirely on a tawa.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Tawa", isSpecialized: false, alternative: "Flat non-stick pan" },
      { item: "Rolling pin (belan)", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "2 cups",
        commonName: "Atta",
        englishName: "whole wheat flour",
      },
      {
        amount: "3 tbsp",
        commonName: "Tel/Ghee",
        englishName: "oil or ghee, plus extra for cooking",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "as needed",
        commonName: "Paani",
        englishName: "water",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Knead the flour with a pinch of salt, 1 tablespoon oil and enough water into a soft, smooth dough. Cover and rest for 20 minutes.",
      },
      {
        step: 2,
        instruction:
          "Divide into equal balls and roll one ball into a thin circle.",
      },
      {
        step: 3,
        instruction:
          "Brush the surface lightly with oil or ghee and dust with a little flour.",
      },
      {
        step: 4,
        instruction:
          "Fold the dough into pleats like a fan, then coil the pleated strip into a round spiral and tuck the end underneath.",
      },
      {
        step: 5,
        instruction:
          "Rest the spiral for 5 minutes, then gently roll it out again into a round paratha without pressing too hard.",
      },
      {
        step: 6,
        instruction:
          "Heat a tawa on medium-high heat. Cook the paratha, flipping occasionally and drizzling a little ghee on each side, until golden-brown spots appear on both sides.",
      },
      {
        step: 7,
        instruction:
          "Once cooked, gently crush the paratha between your palms to separate the layers.",
      },
      {
        step: 8,
        instruction:
          "Serve hot with curry or yogurt.",
        tip: {
          title: "Keep the layers",
          content:
            "Roll and fold gently. Too much pressure flattens out the layers you just created.",
        },
      },
    ],
    notes: [],
  },

  "lemon rice (chitranna)": {
    dishName: "Lemon Rice (Chitranna)",
    description:
      "Tangy, lightly spiced rice tempered with peanuts, curry leaves and fresh lemon juice - perfect for lunchboxes.",
    prepTime: "Approx. 20 minutes (using pre-cooked rice)",
    equipment: [
      { item: "Pan", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      {
        amount: "2 cups",
        commonName: "Pakka Chawal",
        englishName: "cooked rice, cooled",
      },
      {
        amount: "1-2",
        commonName: "Nimbu",
        englishName: "lemons",
      },
      {
        amount: "2 tbsp",
        commonName: "Moongfali",
        englishName: "peanuts",
      },
      {
        amount: "1/2 tsp",
        commonName: "Rai",
        englishName: "mustard seeds",
      },
      {
        amount: "1 tsp",
        commonName: "Urad Dal",
        englishName: "split black gram",
      },
      {
        amount: "1 tsp",
        commonName: "Chana Dal",
        englishName: "split Bengal gram",
      },
      {
        amount: "a few",
        commonName: "Kadi Patta",
        englishName: "curry leaves",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "2 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat oil in a pan and add mustard seeds. Let them pop.",
      },
      {
        step: 2,
        instruction:
          "Add urad dal and chana dal and fry until light golden.",
      },
      {
        step: 3,
        instruction:
          "Add peanuts and fry until lightly golden and crunchy.",
      },
      {
        step: 4,
        instruction:
          "Add curry leaves and green chilli and sizzle for a few seconds.",
      },
      {
        step: 5,
        instruction:
          "Add turmeric and mix.",
      },
      {
        step: 6,
        instruction:
          "Add the cooled cooked rice and salt. Gently toss to combine without mashing the grains.",
      },
      {
        step: 7,
        instruction:
          "Turn off the heat, squeeze in lemon juice generously and toss again.",
      },
      {
        step: 8,
        instruction:
          "Garnish with coriander leaves and serve at room temperature.",
        tip: {
          title: "Use cold rice",
          content:
            "Day-old rice works great. Warm rice can turn mushy when mixed.",
        },
      },
    ],
    notes: [],
  },

  // ============================================================
  // EXISTING ADDITIONAL RECIPES
  // ============================================================

  "paneer butter masala": {
    dishName: "Paneer Butter Masala",
    description:
      "Soft paneer cubes in a luxuriously creamy, buttery tomato gravy - a restaurant favourite made simple at home.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "Mixer grinder", isSpecialized: false, alternative: null },
      { item: "Pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "200 g",
        commonName: "Paneer",
        englishName: "paneer, cubed",
      },
      {
        amount: "4 medium",
        commonName: "Tamatar",
        englishName: "tomatoes, roughly chopped",
      },
      { amount: "10", commonName: "Kaju", englishName: "cashews" },
      {
        amount: "1 tsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "kashmiri red chilli powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "1 tsp",
        commonName: "Kasuri Methi",
        englishName: "dried fenugreek leaves, crushed",
      },
      {
        amount: "3 tbsp",
        commonName: "Makhan",
        englishName: "butter",
      },
      {
        amount: "2 tbsp",
        commonName: "Malai / Cream",
        englishName: "fresh cream",
      },
      {
        amount: "1/2 tsp",
        commonName: "Cheeni",
        englishName: "sugar",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Boil the chopped tomatoes and cashews together in a small pan with a little water for 10 minutes until the tomatoes turn soft.",
      },
      {
        step: 2,
        instruction:
          "Let the mixture cool slightly, then blend it into a smooth puree.",
      },
      {
        step: 3,
        instruction:
          "Heat 2 tablespoons of butter in a pan. Add ginger-garlic paste and cook for a minute until fragrant.",
      },
      {
        step: 4,
        instruction:
          "Pour in the tomato-cashew puree. Cook on medium heat for 8 to 10 minutes, stirring occasionally, until it thickens slightly.",
      },
      {
        step: 5,
        instruction:
          "Add red chilli powder, salt and sugar. Mix well.",
      },
      {
        step: 6,
        instruction:
          "Gently add the paneer cubes and simmer for 3 to 4 minutes.",
        tip: {
          title: "Silky texture",
          content:
            "Pass the puree through a sieve before adding it back to the pan for an extra-smooth, restaurant-style gravy.",
        },
      },
      {
        step: 7,
        instruction:
          "Stir in the cream and remaining butter. Sprinkle crushed kasuri methi and garam masala on top.",
      },
      {
        step: 8,
        instruction:
          "Mix gently and serve hot with naan or jeera rice.",
      },
    ],
    notes: [
      "Crushing the kasuri methi between your palms before adding releases much more of its aroma.",
      "For a lighter version, reduce the butter and cream slightly.",
    ],
  },

  "chicken biryani": {
    dishName: "Chicken Biryani",
    description:
      "Fragrant basmati rice layered with spiced, marinated chicken and slow-cooked to perfection - a true celebration dish.",
    prepTime: "Approx. 1.5 hours (plus 30 mins marination)",
    equipment: [
      {
        item: "Heavy-bottomed pot with a tight lid",
        isSpecialized: false,
        alternative:
          "Any thick-bottomed pot; seal the lid with dough or a damp cloth if it does not fit tightly",
      },
      {
        item: "Large pot, for boiling rice",
        isSpecialized: false,
        alternative: null,
      },
    ],
    ingredients: [
      {
        amount: "500 g",
        commonName: "Chicken",
        englishName: "chicken, curry-cut pieces",
      },
      {
        amount: "2 cups",
        commonName: "Basmati Chawal",
        englishName: "basmati rice, soaked 30 mins",
      },
      {
        amount: "1/2 cup",
        commonName: "Dahi",
        englishName: "yogurt",
      },
      {
        amount: "2 large",
        commonName: "Pyaaz (talaa hua)",
        englishName: "onions, thinly sliced and fried until golden",
      },
      {
        amount: "1 tbsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "2 tbsp",
        commonName: "Biryani Masala",
        englishName: "biryani masala powder",
      },
      {
        amount: "1 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1 inch, 3, 4, 1",
        commonName: "Dalchini, Elaichi, Laung, Tej Patta",
        englishName: "cinnamon, cardamom, cloves, bay leaf",
      },
      {
        amount: "small handful",
        commonName: "Pudina aur Hara Dhaniya",
        englishName: "mint and coriander leaves",
      },
      {
        amount: "a few strands in 2 tbsp warm milk",
        commonName: "Kesar Doodh",
        englishName: "saffron soaked in warm milk",
      },
      {
        amount: "3 tbsp",
        commonName: "Ghee",
        englishName: "ghee",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Marinate the chicken with yogurt, ginger-garlic paste, biryani masala, red chilli powder and salt. Set aside for 30 minutes.",
      },
      {
        step: 2,
        instruction:
          "Boil a large pot of water with the whole spices and salt.",
      },
      {
        step: 3,
        instruction:
          "Add the soaked rice and cook until it is about 70% done, still slightly firm at the centre.",
        tip: {
          title: "Don't overcook the rice",
          content:
            "The rice finishes cooking later with the chicken, so slightly undercooking it now is important.",
        },
      },
      {
        step: 4,
        instruction:
          "Drain the rice immediately and spread it out on a plate to stop it cooking further.",
      },
      {
        step: 5,
        instruction:
          "In your heavy-bottomed pot, heat 1 tablespoon ghee and cook the marinated chicken on medium-high heat for 8 to 10 minutes until half-cooked.",
      },
      {
        step: 6,
        instruction:
          "Spread the half-cooked chicken evenly across the bottom of the pot.",
      },
      {
        step: 7,
        instruction:
          "Layer the partially cooked rice evenly over the chicken.",
      },
      {
        step: 8,
        instruction:
          "Top with fried onions, chopped mint, coriander, saffron milk and the remaining ghee.",
      },
      {
        step: 9,
        instruction:
          "Cover the pot with a tight-fitting lid and cook on very low heat for 20 to 25 minutes.",
      },
      {
        step: 10,
        instruction:
          "Turn off the heat and let the biryani rest, covered, for 10 minutes before opening.",
      },
      {
        step: 11,
        instruction:
          "Gently fluff and mix the layers before serving hot, with raita on the side.",
      },
    ],
    notes: [
      "If the lid is not fully sealed, seal the edges with dough or a damp cloth so steam does not escape.",
      "A heavy base or a tawa underneath the pot helps prevent the bottom layer from burning.",
    ],
  },

  "masala dosa": {
    dishName: "Masala Dosa",
    description:
      "A crisp, golden fermented rice-and-lentil crepe, filled with a lightly spiced potato masala - a South Indian classic.",
    prepTime: "Approx. 45 minutes (plus 8–12 hours fermentation)",
    equipment: [
      { item: "Mixer grinder", isSpecialized: false, alternative: null },
      {
        item: "Tawa (griddle)",
        isSpecialized: false,
        alternative: "Large flat non-stick pan",
      },
    ],
    ingredients: [
      {
        amount: "2 cups",
        commonName: "Dosa Batter",
        englishName: "fermented dosa batter",
      },
      {
        amount: "3 medium",
        commonName: "Aloo",
        englishName: "potatoes, boiled and mashed",
      },
      {
        amount: "1 medium",
        commonName: "Pyaaz",
        englishName: "onion, sliced",
      },
      {
        amount: "1/2 tsp",
        commonName: "Rai",
        englishName: "mustard seeds",
      },
      {
        amount: "few leaves",
        commonName: "Kadi Patta",
        englishName: "curry leaves",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli, chopped",
      },
      {
        amount: "2 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "If making batter at home, soak rice and urad dal separately, grind into a smooth batter and let it ferment for 8 to 12 hours.",
        tip: {
          title: "Save time",
          content:
            "Good-quality store-bought dosa batter works just as well and skips the fermentation step.",
        },
      },
      {
        step: 2,
        instruction:
          "For the filling, heat oil in a pan. Add mustard seeds and let them pop.",
      },
      {
        step: 3,
        instruction:
          "Add curry leaves and sliced onions. Cook until the onions turn soft.",
      },
      {
        step: 4,
        instruction:
          "Add green chilli and turmeric and stir for a few seconds.",
      },
      {
        step: 5,
        instruction:
          "Add mashed potatoes and salt. Mix well and cook for 3 to 4 minutes.",
      },
      {
        step: 6,
        instruction:
          "Heat a tawa on medium-high heat. Pour a ladle of dosa batter in the centre.",
      },
      {
        step: 7,
        instruction:
          "Using the back of the ladle, spread it outward in a thin circular motion.",
      },
      {
        step: 8,
        instruction:
          "Drizzle a little oil around the edges and cook until the base turns golden and crisp.",
      },
      {
        step: 9,
        instruction:
          "Place a portion of potato filling in the centre and fold the dosa.",
      },
      {
        step: 10,
        instruction:
          "Serve immediately with coconut chutney and sambar.",
      },
    ],
    notes: [
      "A well-fermented batter is the secret to a crisp dosa.",
      "Keep the tawa hot but not smoking.",
    ],
  },

  "aloo gobi": {
    dishName: "Aloo Gobi",
    description:
      "A simple, everyday dry sabzi of potatoes and cauliflower, lightly spiced and cooked until tender.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      {
        item: "Pan with a lid",
        isSpecialized: false,
        alternative: null,
      },
    ],
    ingredients: [
      {
        amount: "2 medium",
        commonName: "Aloo",
        englishName: "potatoes, cubed",
      },
      {
        amount: "1 medium",
        commonName: "Gobi",
        englishName: "cauliflower, cut into florets",
      },
      {
        amount: "1/2 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1/2 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1 tsp",
        commonName: "Dhaniya Powder",
        englishName: "coriander powder",
      },
      {
        amount: "1/2 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "1 inch",
        commonName: "Adrak",
        englishName: "ginger, finely chopped",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli, chopped",
      },
      {
        amount: "2 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
      {
        amount: "2 tbsp",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat oil in a pan. Add cumin seeds and let them sizzle.",
      },
      {
        step: 2,
        instruction:
          "Add chopped ginger and green chilli and cook for 30 seconds.",
      },
      {
        step: 3,
        instruction:
          "Add potatoes and cauliflower and stir to coat them in oil.",
      },
      {
        step: 4,
        instruction:
          "Add turmeric, red chilli powder, coriander powder and salt. Mix well.",
      },
      {
        step: 5,
        instruction:
          "Cover and cook on low-medium heat for 15 to 18 minutes, stirring every few minutes.",
        tip: {
          title: "Check for doneness",
          content:
            "A potato piece should be soft enough to pierce easily with a fork.",
        },
      },
      {
        step: 6,
        instruction:
          "Once both vegetables are tender, sprinkle garam masala and mix gently.",
      },
      {
        step: 7,
        instruction:
          "Garnish with coriander and serve hot with roti or dal-rice.",
      },
    ],
    notes: [
      "Avoid adding water. Aloo gobi is meant to be a dry sabzi cooked in its own steam.",
      "Cutting both vegetables roughly the same size helps them cook evenly.",
    ],
  },

  "dal makhani": {
    dishName: "Dal Makhani",
    description:
      "Slow-cooked black lentils in a rich, buttery, creamy gravy - deeply comforting and full of flavour.",
    prepTime: "Approx. 1 hour (plus overnight soaking)",
    equipment: [
      {
        item: "Pressure cooker",
        isSpecialized: false,
        alternative:
          "A regular pot works too, but will need longer cooking time and more water",
      },
      { item: "Pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      {
        amount: "1 cup",
        commonName: "Sabut Urad Dal",
        englishName: "whole black gram, soaked overnight",
      },
      {
        amount: "1/4 cup",
        commonName: "Rajma",
        englishName: "red kidney beans, soaked overnight",
      },
      {
        amount: "1 medium",
        commonName: "Pyaaz",
        englishName: "onion, finely chopped",
      },
      {
        amount: "1 cup",
        commonName: "Tamatar Puree",
        englishName: "tomato puree",
      },
      {
        amount: "1 tbsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1 tsp",
        commonName: "Lal Mirch Powder",
        englishName: "red chilli powder",
      },
      {
        amount: "1 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "3 tbsp",
        commonName: "Makhan",
        englishName: "butter",
      },
      {
        amount: "3 tbsp",
        commonName: "Malai / Cream",
        englishName: "fresh cream",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Drain the soaked urad dal and rajma. Add them to a pressure cooker with fresh water and a pinch of salt.",
      },
      {
        step: 2,
        instruction:
          "Pressure cook for 6 to 8 whistles until the lentils and beans are completely soft and mashable.",
      },
      {
        step: 3,
        instruction:
          "In a separate pan, heat butter. Add chopped onions and cook until golden.",
      },
      {
        step: 4,
        instruction:
          "Add ginger-garlic paste and cook for a minute until fragrant.",
      },
      {
        step: 5,
        instruction:
          "Add tomato puree, red chilli powder and salt. Cook for 5 to 6 minutes until the oil starts to separate.",
      },
      {
        step: 6,
        instruction:
          "Add the cooked dal and rajma along with their cooking water. Mix well.",
      },
      {
        step: 7,
        instruction:
          "Simmer on low heat for 25 to 30 minutes, stirring occasionally and lightly mashing some of the lentils with the back of your spoon.",
        tip: {
          title: "The real secret",
          content:
            "Dal makhani tastes best the longer and slower it simmers. This gives it its signature creamy texture.",
        },
      },
      {
        step: 8,
        instruction:
          "Stir in the cream and a final knob of butter. Sprinkle garam masala and simmer for 2 more minutes.",
      },
      {
        step: 9,
        instruction:
          "Serve hot with rice or naan.",
      },
    ],
    notes: [
      "Soaking the dal and rajma overnight significantly cuts down cooking time.",
      "For a richer flavour, let the dal simmer on very low heat for an extra 30 minutes.",
    ],
  },

  "samosa": {
    dishName: "Samosa",
    description:
      "Crispy, golden pastry triangles stuffed with a spiced potato and pea filling - the ultimate Indian tea-time snack.",
    prepTime: "Approx. 1 hour",
    equipment: [
      {
        item: "Kadai, for deep frying",
        isSpecialized: false,
        alternative: "Any deep, heavy-bottomed pan",
      },
      {
        item: "Rolling pin (belan)",
        isSpecialized: false,
        alternative: null,
      },
    ],
    ingredients: [
      {
        amount: "2 cups",
        commonName: "Maida",
        englishName: "all-purpose flour",
      },
      {
        amount: "4 tbsp",
        commonName: "Tel",
        englishName: "cooking oil for the dough",
      },
      {
        amount: "1/2 tsp",
        commonName: "Ajwain",
        englishName: "carom seeds",
      },
      {
        amount: "3 medium",
        commonName: "Aloo",
        englishName: "potatoes, boiled and mashed",
      },
      {
        amount: "1/2 cup",
        commonName: "Hari Matar",
        englishName: "green peas",
      },
      {
        amount: "1/2 tsp",
        commonName: "Jeera",
        englishName: "cumin seeds",
      },
      {
        amount: "1 inch",
        commonName: "Adrak",
        englishName: "ginger, finely chopped",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli, chopped",
      },
      {
        amount: "1 tsp",
        commonName: "Garam Masala",
        englishName: "garam masala",
      },
      {
        amount: "1/2 tsp",
        commonName: "Amchur",
        englishName: "dry mango powder",
      },
      {
        amount: "as needed",
        commonName: "Tel",
        englishName: "cooking oil for deep frying",
      },
      {
        amount: "to taste",
        commonName: "Namak",
        englishName: "salt",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "In a bowl, mix flour, salt, carom seeds and oil. Rub the oil into the flour until it feels crumbly.",
      },
      {
        step: 2,
        instruction:
          "Gradually add water and knead into a stiff, firm dough. Cover and rest for 20 minutes.",
      },
      {
        step: 3,
        instruction:
          "For the filling, heat a little oil in a pan. Add cumin seeds and let them sizzle.",
      },
      {
        step: 4,
        instruction:
          "Add ginger and green chilli and cook for 30 seconds.",
      },
      {
        step: 5,
        instruction:
          "Add green peas and cook for 2 to 3 minutes until softened.",
      },
      {
        step: 6,
        instruction:
          "Add mashed potatoes, garam masala, amchur and salt. Mix well and cook for 2 more minutes. Let the filling cool.",
      },
      {
        step: 7,
        instruction:
          "Divide the dough into small balls. Roll each ball into an oval, then cut it in half.",
      },
      {
        step: 8,
        instruction:
          "Take one semi-circle, wet the straight edge with water and fold it into a cone shape, sealing the edge.",
      },
      {
        step: 9,
        instruction:
          "Fill the cone with 1 to 2 tablespoons of potato filling, then seal the open edge firmly with water.",
        tip: {
          title: "No air pockets",
          content:
            "Press out any trapped air before sealing. This helps stop the samosa from bursting while frying.",
        },
      },
      {
        step: 10,
        instruction:
          "Heat oil in a kadai on medium-low heat. Gently slide in the samosas and fry slowly until golden and crisp all over, about 12 to 15 minutes.",
      },
      {
        step: 11,
        instruction:
          "Drain on paper towels and serve hot with tamarind or mint chutney.",
      },
    ],
    notes: [
      "Fry on medium-low heat, not high, so the samosa cooks through without burning.",
      "The filling should be completely cool before stuffing.",
    ],
  },


    // ============================================================
  // MORE POPULAR INDIAN DISHES
  // ============================================================

  "rajma chawal": {
    dishName: "Rajma Chawal",
    description:
      "Soft kidney beans in a thick, homely onion-tomato gravy served over fluffy rice - the ultimate comfort meal.",
    prepTime: "Approx. 1 hour (plus overnight soaking)",
    equipment: [
      {
        item: "Pressure cooker",
        isSpecialized: false,
        alternative: "A heavy pot, but the beans will need 1.5 to 2 hours to soften",
      },
      { item: "Kadai or deep pan", isSpecialized: false, alternative: null },
      { item: "Pot with lid, for rice", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Rajma", englishName: "kidney beans, soaked overnight" },
      { amount: "1 cup", commonName: "Basmati Chawal", englishName: "basmati rice" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, finely chopped" },
      { amount: "3 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1.5 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "3 tbsp", commonName: "Tel ya Ghee", englishName: "oil or ghee" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Drain the soaked rajma and add it to a pressure cooker with 3 cups of fresh water and a pinch of salt. Cook for 6 to 7 whistles, until a bean crushes easily between your fingers.",
      },
      {
        step: 2,
        instruction:
          "While that cooks, rinse the basmati until the water runs almost clear. Cook it in a pot with 2 cups water and a pinch of salt, covered, on low heat for 12 to 15 minutes. Leave it covered and off the heat until you're ready to serve.",
      },
      {
        step: 3,
        instruction:
          "Heat oil or ghee in a kadai. Add the cumin seeds and bay leaf and let them sizzle for 10 seconds.",
      },
      {
        step: 4,
        instruction:
          "Add the chopped onions and cook for 8 to 10 minutes, stirring now and then, until they turn golden brown. Don't rush this. It sets the flavour of the whole dish.",
      },
      {
        step: 5,
        instruction:
          "Add the ginger-garlic paste and cook for 1 minute, until the raw smell is gone.",
      },
      {
        step: 6,
        instruction:
          "Add the tomatoes and cook for 6 to 8 minutes, pressing them with your spatula, until they turn mushy and you see oil at the edges.",
      },
      {
        step: 7,
        instruction:
          "Add turmeric, red chilli powder, coriander powder and salt. Add a splash of water and cook for 2 minutes so the spices don't stick.",
      },
      {
        step: 8,
        instruction:
          "Add the cooked rajma along with about 2 cups of its cooking water. Mash a few beans against the side of the pan with your spoon.",
        tip: {
          title: "Free thickener",
          content:
            "Those mashed beans are what make the gravy thick and creamy. No flour or cream needed.",
        },
      },
      {
        step: 9,
        instruction:
          "Simmer on low heat for 20 minutes, stirring occasionally, until the gravy is thick and the beans taste rich and soft.",
      },
      {
        step: 10,
        instruction:
          "Stir in the garam masala and half the coriander. Serve the rajma over the hot rice, topped with the remaining coriander.",
      },
    ],
    notes: [
      "Rajma tastes even better the next day, once the flavours have settled in.",
      "In a hurry? Use 2 cups of canned rajma (rinsed) and simmer for 15 minutes. You can skip step 1.",
      "Serve with sliced raw onion, a wedge of lemon and a little pickle on the side.",
    ],
  },

  "chole bhature": {
    dishName: "Chole Bhature",
    description:
      "Tangy, spicy chickpea curry with puffy, golden fried bread - the Punjabi weekend breakfast everyone loves.",
    prepTime: "Approx. 1.5 hours (plus overnight soaking and 2 hours dough rest)",
    equipment: [
      { item: "Pressure cooker", isSpecialized: false, alternative: "A heavy pot, with longer cooking time" },
      { item: "Kadai or deep pan", isSpecialized: false, alternative: null },
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Rolling pin (belan)", isSpecialized: false, alternative: null },
      { item: "Slotted spoon (jhara)", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Kabuli Chana", englishName: "white chickpeas, soaked overnight" },
      { amount: "1", commonName: "Chai Patti (tea bag)", englishName: "tea bag, for colour" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, finely chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "2 tsp", commonName: "Chole Masala", englishName: "chole masala powder" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2 cups", commonName: "Maida", englishName: "all-purpose flour, for bhature" },
      { amount: "2 tbsp", commonName: "Suji", englishName: "fine semolina, for bhature" },
      { amount: "1/3 cup", commonName: "Dahi", englishName: "yogurt, for bhature" },
      { amount: "1/2 tsp", commonName: "Baking Soda", englishName: "baking soda" },
      { amount: "1 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "as needed", commonName: "Tel", englishName: "cooking oil, for deep frying" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Make the dough first, since it needs time. In a bowl, mix maida, suji, baking soda, sugar and 1/2 tsp salt. Add yogurt and 1 tablespoon oil, then knead with a little warm water into a soft, slightly sticky dough.",
      },
      {
        step: 2,
        instruction:
          "Cover the dough with a damp cloth and rest it in a warm spot for 2 hours. It should look puffed up.",
      },
      {
        step: 3,
        instruction:
          "Drain the soaked chickpeas and put them in a pressure cooker with the tea bag, 1/2 tsp salt and 3 cups water. Cook for 8 to 10 whistles, until soft enough to mash with a fingertip. Remove the tea bag and keep the chickpeas in their water.",
        tip: {
          title: "The dhaba colour trick",
          content:
            "The tea bag gives chole that deep brown colour you see at restaurants. You won't taste the tea at all.",
        },
      },
      {
        step: 4,
        instruction:
          "Heat 2 tablespoons oil in a kadai and add the cumin seeds. Add the onions and cook for 8 to 10 minutes until golden brown.",
      },
      {
        step: 5,
        instruction:
          "Add the ginger-garlic paste and cook for 1 minute. Add the tomatoes and cook for 6 to 8 minutes until they turn soft and mushy.",
      },
      {
        step: 6,
        instruction:
          "Add turmeric, red chilli powder, coriander powder, chole masala and salt. Add a splash of water and cook for 2 minutes.",
      },
      {
        step: 7,
        instruction:
          "Add the boiled chickpeas with about 1.5 cups of their water. Mash a few chickpeas to thicken the gravy and simmer for 15 to 20 minutes.",
      },
      {
        step: 8,
        instruction:
          "Stir in the amchur, taste, and adjust the salt. Keep the chole warm on the lowest heat.",
      },
      {
        step: 9,
        instruction:
          "Divide the rested dough into 6 balls. Lightly oil your rolling pin and surface, and roll each ball into an oval about 1/4 inch thick.",
      },
      {
        step: 10,
        instruction:
          "Heat oil for frying in a kadai on medium-high heat. To test it, drop in a small piece of dough. It should rise to the top in a couple of seconds.",
      },
      {
        step: 11,
        instruction:
          "Slide one bhatura in and gently press it down with the slotted spoon. It puffs up within seconds. Flip and fry for about 30 seconds more until golden. Drain and repeat.",
        tip: {
          title: "Oil temperature matters",
          content:
            "If the oil is too cool, the bhature turn oily and don't puff. If it's too hot, they brown before they cook inside.",
        },
      },
      {
        step: 12,
        instruction:
          "Serve the bhature hot with the chole, sliced raw onion, green chillies and a lemon wedge.",
      },
    ],
    notes: [
      "Don't roll the bhature too thin, or they won't puff properly.",
      "No time for the 2-hour rest? Rest the dough for 30 minutes with a pinch more baking soda. It'll still work, just slightly less fluffy.",
      "The chole can be made a day ahead and reheated with a splash of water.",
    ],
  },

  "chole kulche": {
    dishName: "Chole Kulche",
    description:
      "Spicy, tangy chickpea curry served with soft, tawa-cooked kulchas - the classic street-food pairing, made at home.",
    prepTime: "Approx. 1.5 hours (plus overnight soaking and 1 hour dough rest)",
    equipment: [
      { item: "Pressure cooker", isSpecialized: false, alternative: "A heavy pot, with longer cooking time" },
      { item: "Kadai or deep pan", isSpecialized: false, alternative: null },
      { item: "Tawa (griddle)", isSpecialized: false, alternative: "Heavy flat pan" },
      { item: "Rolling pin (belan)", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Kabuli Chana", englishName: "white chickpeas, soaked overnight" },
      { amount: "1", commonName: "Chai Patti (tea bag)", englishName: "tea bag, for colour" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, finely chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "2 tsp", commonName: "Chole Masala", englishName: "chole masala powder" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2 cups", commonName: "Maida", englishName: "all-purpose flour, for kulche" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "yogurt, for kulche" },
      { amount: "1/2 tsp", commonName: "Baking Powder", englishName: "baking powder" },
      { amount: "1/4 tsp", commonName: "Baking Soda", englishName: "baking soda" },
      { amount: "1 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 tsp", commonName: "Kalonji", englishName: "nigella seeds (optional)" },
      { amount: "2 tbsp", commonName: "Makhan", englishName: "butter, for brushing" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Make the kulcha dough first. Mix maida, baking powder, baking soda, sugar and 1/2 tsp salt. Add yogurt and 1 tablespoon oil, then knead with a little water into a soft, smooth dough.",
      },
      {
        step: 2,
        instruction:
          "Cover with a damp cloth and rest the dough for 1 hour.",
      },
      {
        step: 3,
        instruction:
          "Drain the soaked chickpeas and pressure cook them with the tea bag, 1/2 tsp salt and 3 cups water for 8 to 10 whistles, until very soft. Remove the tea bag and keep the chickpeas in their water.",
      },
      {
        step: 4,
        instruction:
          "Heat 2 tablespoons oil in a kadai and add the cumin seeds. Add the onions and cook for 8 to 10 minutes until golden brown.",
      },
      {
        step: 5,
        instruction:
          "Add the ginger-garlic paste and cook for a minute. Add the tomatoes and cook for 6 to 8 minutes until mushy and the oil separates.",
      },
      {
        step: 6,
        instruction:
          "Add turmeric, red chilli powder, chole masala and salt, with a splash of water. Cook for 2 minutes.",
      },
      {
        step: 7,
        instruction:
          "Add the chickpeas with about 1.5 cups of their water. Mash a few to thicken the gravy and simmer for 15 to 20 minutes. Finish with amchur and keep warm.",
      },
      {
        step: 8,
        instruction:
          "Divide the dough into 6 balls. Roll each into a round about 1/4 inch thick, pressing a pinch of kalonji into the top if using.",
      },
      {
        step: 9,
        instruction:
          "Brush a little water on the bottom side of the kulcha. Place it water-side down on a hot tawa and cook for about 1 minute until bubbles appear.",
      },
      {
        step: 10,
        instruction:
          "Flip and cook the other side for 1 to 2 minutes until golden spots appear. Brush with butter and serve hot.",
        tip: {
          title: "Soft kulche",
          content:
            "Keep cooked kulche wrapped in a clean cloth. The steam keeps them soft until everyone's ready to eat.",
        },
      },
      {
        step: 11,
        instruction:
          "Serve the kulche with the hot chole, sliced onion, green chilli and lemon.",
      },
    ],
    notes: [
      "The dough should feel soft and a little sticky. Add a little flour only if it really sticks to your hands.",
      "The chole can be made a day ahead and gets tastier overnight.",
    ],
  },

  "shahi paneer": {
    dishName: "Shahi Paneer",
    description:
      "Soft paneer cubes in a rich, creamy, mildly sweet gravy made from onions, tomatoes and cashews - a proper special-occasion sabzi.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "Mixer grinder", isSpecialized: false, alternative: null },
      { item: "Deep pan or kadai", isSpecialized: false, alternative: null },
      { item: "Small pot, for boiling", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "250 g", commonName: "Paneer", englishName: "paneer, cubed" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, roughly chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, roughly chopped" },
      { amount: "15", commonName: "Kaju", englishName: "cashews" },
      { amount: "1/4 cup", commonName: "Dahi", englishName: "yogurt, whisked smooth" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "2", commonName: "Elaichi", englishName: "green cardamom pods" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "1 tsp", commonName: "Kashmiri Lal Mirch", englishName: "Kashmiri red chilli powder" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 tsp", commonName: "Kasuri Methi", englishName: "dried fenugreek leaves, crushed" },
      { amount: "3 tbsp", commonName: "Malai", englishName: "fresh cream" },
      { amount: "2 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "1/2 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Put the onions, tomatoes, cashews and cardamom in a small pot with 1.5 cups water. Bring to a boil and simmer for 10 to 12 minutes until everything is soft.",
      },
      {
        step: 2,
        instruction:
          "Let it cool for a few minutes, then blend into a very smooth puree. A smooth puree is the secret to that silky restaurant gravy.",
      },
      {
        step: 3,
        instruction:
          "Heat ghee in a pan and add the bay leaf. Add the ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 4,
        instruction:
          "Pour in the puree and cook on medium heat for 8 to 10 minutes, stirring often, until it thickens and the ghee starts to show at the edges.",
      },
      {
        step: 5,
        instruction:
          "Turn the heat to low. Add the whisked yogurt a spoon at a time, stirring constantly so it doesn't split.",
        tip: {
          title: "Curd without splitting",
          content:
            "Whisk the yogurt until smooth and add it on low heat. Cold, lumpy yogurt in a boiling gravy is what makes it curdle.",
        },
      },
      {
        step: 6,
        instruction:
          "Add Kashmiri chilli powder, coriander powder, sugar and salt. Add 1/2 cup water and simmer for 5 minutes.",
      },
      {
        step: 7,
        instruction:
          "Add the paneer cubes and simmer gently for 4 to 5 minutes.",
      },
      {
        step: 8,
        instruction:
          "Stir in the cream, crushed kasuri methi and garam masala. Cook for 1 more minute and switch off the heat.",
      },
      {
        step: 9,
        instruction:
          "Serve hot with naan, roti or jeera rice.",
      },
    ],
    notes: [
      "Soaking paneer cubes in warm water for 10 minutes before adding keeps them extra soft.",
      "Shahi paneer is meant to be mild and slightly sweet. Add more chilli only if you like it spicy.",
      "Rub the kasuri methi between your palms before adding so it releases its aroma.",
    ],
  },

  "dal tadka": {
    dishName: "Dal Tadka",
    description:
      "Everyday yellow dal, cooked soft and finished with a sizzling garlic-cumin tadka - simple, comforting and goes with everything.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "Pressure cooker", isSpecialized: false, alternative: "A pot with a lid, simmered for 40 to 45 minutes" },
      { item: "Small tadka pan", isSpecialized: false, alternative: "Any small pan or steel ladle" },
    ],
    ingredients: [
      { amount: "1/2 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "1/4 cup", commonName: "Moong Dal", englishName: "split yellow lentils" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "4 cloves", commonName: "Lehsun", englishName: "garlic, finely chopped" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "2 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "1/2", commonName: "Nimbu", englishName: "lemon, juiced" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Wash both dals well until the water runs clear. Add them to a pressure cooker with turmeric, salt and 3 cups water.",
      },
      {
        step: 2,
        instruction:
          "Cook for 4 to 5 whistles, until the dal is completely soft. Once the pressure is gone, open the lid and whisk the dal with a spoon until creamy. Add a little hot water if it feels too thick.",
      },
      {
        step: 3,
        instruction:
          "In a pan, heat 1 tablespoon ghee. Add half the cumin seeds and a pinch of hing.",
      },
      {
        step: 4,
        instruction:
          "Add the chopped onion and cook for 4 to 5 minutes until golden.",
      },
      {
        step: 5,
        instruction:
          "Add the tomato and red chilli powder and cook for 3 to 4 minutes until the tomato turns soft and mushy.",
      },
      {
        step: 6,
        instruction:
          "Pour this masala into the dal, mix well and simmer for 5 minutes so the flavours come together.",
      },
      {
        step: 7,
        instruction:
          "For the final tadka, heat the remaining ghee in a small pan. Add the remaining cumin, then the garlic and dried red chillies. Fry for about 30 seconds until the garlic turns light golden.",
        tip: {
          title: "Don't burn the garlic",
          content:
            "Take it off the heat the moment it turns light golden. Dark garlic tastes bitter and can spoil the whole dal.",
        },
      },
      {
        step: 8,
        instruction:
          "Pour the sizzling tadka over the dal. Add the lemon juice and coriander and cover for a minute.",
      },
      {
        step: 9,
        instruction:
          "Serve hot with rice or roti.",
      },
    ],
    notes: [
      "Mixing moong dal with toor dal makes it cook faster and taste creamier.",
      "Dal thickens as it sits, so add a little hot water when you reheat it.",
    ],
  },

  "matar paneer": {
    dishName: "Matar Paneer",
    description:
      "Soft paneer and sweet green peas in a spiced onion-tomato gravy - a north Indian favourite that goes with roti or rice.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "Kadai or deep pan", isSpecialized: false, alternative: null },
      { item: "Mixer grinder", isSpecialized: false, alternative: "Skip it for a chunky, homestyle gravy" },
    ],
    ingredients: [
      { amount: "200 g", commonName: "Paneer", englishName: "paneer, cubed" },
      { amount: "1 cup", commonName: "Hari Matar", englishName: "green peas, fresh or frozen" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, chopped" },
      { amount: "3 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 tsp", commonName: "Kasuri Methi", englishName: "dried fenugreek leaves (optional)" },
      { amount: "2 tbsp", commonName: "Tel ya Ghee", englishName: "oil or ghee" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Heat oil in a kadai and add the cumin seeds. Let them sizzle for 10 seconds.",
      },
      {
        step: 2,
        instruction:
          "Add the onions and cook for 6 to 8 minutes until golden.",
      },
      {
        step: 3,
        instruction:
          "Add the ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 4,
        instruction:
          "Add the tomatoes, turmeric, red chilli powder, coriander powder and salt. Cook for 8 to 10 minutes until the tomatoes turn mushy and the oil separates from the masala.",
      },
      {
        step: 5,
        instruction:
          "Let the masala cool for a few minutes, then blend it to a smooth paste and return it to the pan. Skip this step if you like a chunkier gravy.",
        tip: {
          title: "Smooth vs. homestyle",
          content:
            "Blending gives a restaurant-style smooth gravy. Leaving it chunky is how most homes make it, and it's just as tasty.",
        },
      },
      {
        step: 6,
        instruction:
          "Add the peas and 1 cup water. Cover and cook for 5 to 7 minutes until the peas are tender.",
      },
      {
        step: 7,
        instruction:
          "Add the paneer cubes and simmer gently for 3 to 4 minutes.",
      },
      {
        step: 8,
        instruction:
          "Crush the kasuri methi between your palms and add it with the garam masala. Mix gently.",
      },
      {
        step: 9,
        instruction:
          "Garnish with coriander and serve hot with roti, paratha or rice.",
      },
    ],
    notes: [
      "Frozen peas work perfectly. Add them straight from the freezer.",
      "If you like a richer gravy, add 2 tablespoons of cream or a spoon of cashew paste at the end.",
    ],
  },

  "pav bhaji": {
    dishName: "Pav Bhaji",
    description:
      "Buttery, spicy mashed vegetable curry served with toasted pav - Mumbai's most loved street food, easy to make at home.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "Pressure cooker", isSpecialized: false, alternative: "A pot, boiling the vegetables until very soft" },
      { item: "Large pan or tawa", isSpecialized: false, alternative: null },
      { item: "Potato masher", isSpecialized: false, alternative: "Back of a sturdy spoon or spatula" },
    ],
    ingredients: [
      { amount: "3 medium", commonName: "Aloo", englishName: "potatoes, peeled and cubed" },
      { amount: "1 cup", commonName: "Gobi", englishName: "cauliflower florets" },
      { amount: "1/2 cup", commonName: "Hari Matar", englishName: "green peas" },
      { amount: "1", commonName: "Gajar", englishName: "carrot, chopped" },
      { amount: "1", commonName: "Shimla Mirch", englishName: "capsicum, finely chopped" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, finely chopped" },
      { amount: "3 medium", commonName: "Tamatar", englishName: "tomatoes, finely chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "2 tbsp", commonName: "Pav Bhaji Masala", englishName: "pav bhaji masala" },
      { amount: "1 tsp", commonName: "Kashmiri Lal Mirch", englishName: "Kashmiri red chilli powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "4 tbsp", commonName: "Makhan", englishName: "butter, plus extra for the pav" },
      { amount: "8", commonName: "Pav", englishName: "pav buns" },
      { amount: "1", commonName: "Nimbu", englishName: "lemon" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Put the potatoes, cauliflower, peas and carrot in a pressure cooker with 1 cup water and a pinch of salt. Cook for 3 to 4 whistles, until everything is very soft.",
      },
      {
        step: 2,
        instruction:
          "Heat 2 tablespoons butter in a large pan. Add half the chopped onions and cook for 4 to 5 minutes until soft.",
      },
      {
        step: 3,
        instruction:
          "Add the capsicum and cook for 2 minutes. Add the ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 4,
        instruction:
          "Add the tomatoes and cook for 8 to 10 minutes, pressing them down, until they turn completely mushy.",
      },
      {
        step: 5,
        instruction:
          "Add turmeric, red chilli powder, pav bhaji masala and salt. Cook for 2 minutes, adding a splash of water if it sticks.",
      },
      {
        step: 6,
        instruction:
          "Add the boiled vegetables with the water they cooked in. Mash everything with a potato masher until mostly smooth, leaving a few small chunks.",
      },
      {
        step: 7,
        instruction:
          "Add 1/2 to 1 cup water, depending on how thick you like it. Simmer for 10 minutes, mashing again as needed.",
      },
      {
        step: 8,
        instruction:
          "Stir in 1 to 2 tablespoons butter and half the lemon juice. Turn off the heat and garnish with coriander.",
        tip: {
          title: "Butter is the point",
          content:
            "Good pav bhaji is buttery. Add butter at the end so the flavour stays fresh, and don't be shy.",
        },
      },
      {
        step: 9,
        instruction:
          "Slit each pav in half. Melt a little butter on a tawa, sprinkle a pinch of pav bhaji masala, and toast the pav for about 1 minute on each side until golden and crisp.",
      },
      {
        step: 10,
        instruction:
          "Serve the bhaji hot with the toasted pav, remaining chopped onion, a lemon wedge and a small dab of butter on top.",
      },
    ],
    notes: [
      "Chopped raw onion and lemon on the side are what make pav bhaji taste like the real thing.",
      "Leftover bhaji tastes even better the next day. Add a splash of water when reheating.",
    ],
  },

  "egg curry (anda curry)": {
    dishName: "Egg Curry (Anda Curry)",
    description:
      "Boiled eggs simmered in a spiced onion-tomato gravy - quick, filling and perfect with rice or roti.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "Pot, for boiling eggs", isSpecialized: false, alternative: null },
      { item: "Kadai or deep pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "5", commonName: "Ande", englishName: "eggs" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, finely chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1.5 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Boil the eggs in water for 10 minutes. Cool them in cold water, peel, and make 2 to 3 small slits on each egg with a knife so the masala can get in.",
      },
      {
        step: 2,
        instruction:
          "Heat 1 tablespoon oil in a pan. Add a pinch of turmeric and red chilli powder, then fry the eggs for 2 minutes until lightly golden and set aside.",
        tip: {
          title: "Why fry the eggs?",
          content:
            "A light fry gives the eggs a golden skin that holds the masala better and stops them from turning rubbery in the gravy.",
        },
      },
      {
        step: 3,
        instruction:
          "In the same pan, heat the remaining oil. Add the cumin seeds and let them sizzle.",
      },
      {
        step: 4,
        instruction:
          "Add the onions and cook for 8 to 10 minutes until golden brown.",
      },
      {
        step: 5,
        instruction:
          "Add the ginger-garlic paste and cook for 1 minute.",
      },
      {
        step: 6,
        instruction:
          "Add the tomatoes and cook for 6 to 8 minutes until soft and the oil starts to separate.",
      },
      {
        step: 7,
        instruction:
          "Add turmeric, red chilli powder, coriander powder and salt. Add a splash of water and cook for 2 minutes.",
      },
      {
        step: 8,
        instruction:
          "Add 1 cup water and bring to a gentle boil. Simmer for 5 minutes for the gravy to thicken slightly.",
      },
      {
        step: 9,
        instruction:
          "Add the eggs, spoon the gravy over them and simmer for 5 minutes. Add the garam masala.",
      },
      {
        step: 10,
        instruction:
          "Garnish with coriander and serve hot with rice or roti.",
      },
    ],
    notes: [
      "Don't boil the eggs for longer than 10 minutes, or the yolks turn grey and chalky.",
      "Want a thicker, restaurant-style gravy? Blend the onion-tomato masala before adding the water.",
    ],
  },

  "idli sambar": {
    dishName: "Idli Sambar",
    description:
      "Soft, fluffy steamed rice-lentil cakes served with a tangy, spiced lentil-and-vegetable sambar - a light South Indian breakfast.",
    prepTime: "Approx. 50 minutes (using ready idli batter)",
    equipment: [
      {
        item: "Idli steamer with idli plates",
        isSpecialized: true,
        alternative:
          "Grease small steel bowls or katoris and steam them on a rack inside a covered pot",
      },
      { item: "Pressure cooker", isSpecialized: false, alternative: "A pot, with longer cooking time" },
      { item: "Pot or kadai, for sambar", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 cups", commonName: "Idli Batter", englishName: "fermented idli batter" },
      { amount: "1/2 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1", commonName: "Gajar", englishName: "carrot, chopped" },
      { amount: "1/2 cup", commonName: "Lauki ya Sahjan", englishName: "bottle gourd or drumstick pieces (optional)" },
      { amount: "1 tbsp", commonName: "Imli", englishName: "tamarind pulp, or a small lemon-sized ball soaked in warm water" },
      { amount: "2 tsp", commonName: "Sambar Powder", englishName: "sambar powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "2 tbsp", commonName: "Tel ya Ghee", englishName: "oil or ghee" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Wash the toor dal and pressure cook it with turmeric and 2 cups water for 4 to 5 whistles, until completely soft. Mash it with a spoon.",
      },
      {
        step: 2,
        instruction:
          "Grease the idli plates lightly with oil and fill each mould with batter, about 3/4 full.",
      },
      {
        step: 3,
        instruction:
          "Steam the idlis for 10 to 12 minutes on medium heat. To check, insert a knife into an idli. If it comes out clean, they're done. Let them rest for 2 minutes before removing.",
        tip: {
          title: "Easy idli removal",
          content:
            "Dip a spoon in water and run it around each idli. They pop out without breaking.",
        },
      },
      {
        step: 4,
        instruction:
          "For the sambar, put the chopped carrot, onion, tomato and other vegetables in a pot with 2 cups water and a pinch of salt. Cook for 8 to 10 minutes until tender.",
      },
      {
        step: 5,
        instruction:
          "Add the tamarind pulp and sambar powder and simmer for 3 to 4 minutes.",
      },
      {
        step: 6,
        instruction:
          "Add the mashed dal and 1/2 cup extra water if needed. Add salt and simmer for 5 to 7 minutes until it reaches a soup-like consistency.",
      },
      {
        step: 7,
        instruction:
          "For the tadka, heat oil or ghee in a small pan. Add the mustard seeds and let them pop. Add the dried red chillies, curry leaves and hing and let them sizzle for 10 seconds.",
      },
      {
        step: 8,
        instruction:
          "Pour the tadka over the sambar, add coriander and stir.",
      },
      {
        step: 9,
        instruction:
          "Serve the hot idlis in a bowl with sambar poured over or on the side, ideally with coconut chutney.",
      },
    ],
    notes: [
      "Good store-bought idli batter works just as well and saves you the overnight fermentation.",
      "Sambar is better the next day. Add a little water when reheating.",
      "Dip leftover idlis in the sambar the next morning. They're just as good.",
    ],
  },

  "dosa (plain crispy dosa)": {
    dishName: "Plain Dosa",
    description:
      "Thin, crisp, golden dosa made from fermented rice-lentil batter - simple, light and great with chutney and sambar.",
    prepTime: "Approx. 30 minutes (using ready dosa batter)",
    equipment: [
      {
        item: "Tawa (griddle)",
        isSpecialized: false,
        alternative: "Non-stick flat pan",
      },
      { item: "Ladle (karchi)", isSpecialized: false, alternative: "A steel katori" },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Dosa Batter", englishName: "fermented dosa batter" },
      { amount: "as needed", commonName: "Paani", englishName: "water, to loosen the batter" },
      { amount: "1/2", commonName: "Pyaaz", englishName: "onion, halved, for greasing the tawa" },
      { amount: "as needed", commonName: "Tel ya Ghee", englishName: "oil or ghee, for cooking" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Take the batter out of the fridge 20 to 30 minutes before cooking so it comes to room temperature. Add a pinch of salt only if needed and stir gently.",
      },
      {
        step: 2,
        instruction:
          "Add a little water and stir until the batter is thin and pourable, like thin cream. It should fall off the ladle in a smooth stream.",
      },
      {
        step: 3,
        instruction:
          "Heat the tawa on medium-high heat for 2 to 3 minutes. Sprinkle a few drops of water. They should sizzle and disappear quickly.",
      },
      {
        step: 4,
        instruction:
          "Stick a fork into the cut side of the onion half, dip it in a little oil and rub it over the hot tawa. This cleans and seasons the surface.",
        tip: {
          title: "Tawa temperature",
          content:
            "If the tawa is too hot, the batter won't spread. If it's too cool, the dosa sticks. Sprinkle a little water on it between dosas to bring the temperature down.",
        },
      },
      {
        step: 5,
        instruction:
          "Pour a ladle of batter in the centre. Quickly spread it outward in circles with the back of the ladle, moving from the middle to the edges, into a thin round.",
      },
      {
        step: 6,
        instruction:
          "Drizzle 1 teaspoon oil or ghee around the edges and over the top. Cook for 2 to 3 minutes without flipping, until the underside is golden and the edges lift away.",
      },
      {
        step: 7,
        instruction:
          "Fold the dosa in half or roll it and serve straight away.",
      },
      {
        step: 8,
        instruction:
          "Serve hot with coconut chutney, sambar or a spoon of ghee and podi.",
      },
    ],
    notes: [
      "The first dosa usually breaks or sticks. That's normal. Just get the tawa temperature right and the rest will be perfect.",
      "Thin batter makes a crisp dosa. Slightly thicker batter makes a softer one.",
      "Want a filling? Look up our Masala Dosa recipe for the classic potato masala.",
    ],
  },

  "french toast (anda bread)": {
    dishName: "French Toast (Anda Bread)",
    description:
      "Bread dipped in a spiced egg mixture with onion, green chilli and coriander, then pan-fried golden - a quick desi-style breakfast.",
    prepTime: "Approx. 15 minutes",
    equipment: [
      { item: "Shallow bowl or plate", isSpecialized: false, alternative: null },
      { item: "Tawa or non-stick pan", isSpecialized: false, alternative: null },
      { item: "Fork or whisk", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 slices", commonName: "Bread", englishName: "bread slices" },
      { amount: "2", commonName: "Ande", englishName: "eggs" },
      { amount: "2 tbsp", commonName: "Doodh", englishName: "milk" },
      { amount: "2 tbsp", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "1 pinch", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 pinch", commonName: "Kali Mirch", englishName: "black pepper" },
      { amount: "2 tbsp", commonName: "Makhan ya Tel", englishName: "butter or oil, for cooking" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction:
          "In a shallow bowl, beat the eggs with milk, onion, green chilli, coriander, turmeric, pepper and salt until well mixed.",
      },
      {
        step: 2,
        instruction:
          "Heat a tawa on medium heat and add a little butter or oil.",
      },
      {
        step: 3,
        instruction:
          "Dip one slice of bread into the egg mixture for about 3 seconds on each side. It should soak in but not fall apart.",
        tip: {
          title: "Don't soak it",
          content:
            "A quick dip is enough. Leaving the bread too long makes it soggy and hard to flip.",
        },
      },
      {
        step: 4,
        instruction:
          "Place it on the tawa. Spoon a little extra egg mixture with the onions over the top if any is left.",
      },
      {
        step: 5,
        instruction:
          "Cook for 2 to 3 minutes until golden brown underneath, then flip and cook the other side for 2 minutes.",
      },
      {
        step: 6,
        instruction:
          "Repeat with the remaining slices, adding butter to the tawa each time.",
      },
      {
        step: 7,
        instruction:
          "Serve hot with tomato ketchup or green chutney.",
      },
    ],
    notes: [
      "Slightly stale bread works best because it absorbs the egg without falling apart.",
      "Prefer sweet? Skip the onion, chilli, coriander and pepper. Add 1 tablespoon sugar and a pinch of cardamom powder or cinnamon to the egg mixture instead.",
    ],
  },

    // ============================================================
  // EVERYDAY FAVOURITES: SABZI, DAL, SNACKS & CHAI
  // ============================================================

  "french beans (beans ki sabzi)": {
    dishName: "French Beans Sabzi (Beans ki Sabzi)",
    description:
      "Tender, lightly spiced dry french beans with onion and cumin - a quick everyday sabzi that goes with roti or dal-rice.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "Kadai or pan with a lid", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      { amount: "250 g", commonName: "French Beans", englishName: "french beans, trimmed and chopped small" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "2 tbsp", commonName: "Nariyal", englishName: "grated fresh coconut (optional)" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Wash the beans, pat them dry, snip off both ends and chop into small pieces, about the size of your little fingertip. Smaller pieces cook faster and evenly." },
      { step: 2, instruction: "Heat oil in a kadai and add the cumin seeds. Let them sizzle for 10 seconds." },
      { step: 3, instruction: "Add the onion and green chilli and cook for 4 to 5 minutes until the onion turns soft and light golden." },
      { step: 4, instruction: "Add the beans, turmeric, coriander powder, red chilli powder and salt. Mix well so every piece is coated." },
      {
        step: 5,
        instruction: "Sprinkle 2 tablespoons of water, cover with a lid and cook on low heat for 8 to 10 minutes, stirring every 3 minutes, until the beans are tender but still bright green.",
        tip: {
          title: "Don't add much water",
          content: "The beans cook in their own steam. Too much water makes them soggy and dull in colour.",
        },
      },
      { step: 6, instruction: "Remove the lid and cook for 2 to 3 minutes on medium heat to dry off any extra moisture. Add the grated coconut, if using, and mix." },
      { step: 7, instruction: "Serve hot with roti or dal and rice." },
    ],
    notes: [
      "To check if it's done, bite one piece. It should be soft with a slight bite, not mushy.",
      "Add a diced potato with the beans for a heartier sabzi. It will need 3 to 4 extra minutes.",
    ],
  },

  "nutrela (soya chunks curry)": {
    dishName: "Nutrela (Soya Chunks Curry)",
    description:
      "Soft, juicy soya chunks simmered in a spiced onion-tomato gravy - a protein-packed sabzi that goes well with roti or rice.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "Pot, for soaking soya chunks", isSpecialized: false, alternative: "A large bowl with hot water" },
      { item: "Kadai or deep pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Nutrela / Soya Chunks", englishName: "soya chunks" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, finely chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/4 cup", commonName: "Dahi", englishName: "yogurt, whisked" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1.5 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      { step: 1, instruction: "Boil 3 cups of water with 1/2 tsp salt. Add the soya chunks and let them soak and simmer for 10 minutes until soft and doubled in size." },
      {
        step: 2,
        instruction: "Drain them, rinse in cold water, then squeeze each chunk between your palms until all the water comes out. Set aside.",
        tip: {
          title: "Squeeze well",
          content: "This is the most important step. It removes the raw beany smell and lets the chunks soak up the masala.",
        },
      },
      { step: 3, instruction: "Heat oil in a kadai and add the cumin seeds. Let them sizzle, then add the onions and cook for 8 to 10 minutes until golden brown." },
      { step: 4, instruction: "Add the ginger-garlic paste and cook for 1 minute." },
      { step: 5, instruction: "Add the tomatoes and cook for 6 to 8 minutes until they turn mushy and the oil separates at the edges." },
      { step: 6, instruction: "Add turmeric, red chilli powder, coriander powder and salt. Add a splash of water and cook for 2 minutes." },
      { step: 7, instruction: "Turn the heat to low and stir in the whisked yogurt, mixing constantly for 1 minute so it doesn't split." },
      { step: 8, instruction: "Add the squeezed soya chunks and stir until they are fully coated. Fry for 3 to 4 minutes." },
      { step: 9, instruction: "Add 1 cup water, cover and simmer for 8 to 10 minutes until the gravy thickens and the chunks are soft." },
      { step: 10, instruction: "Sprinkle garam masala and coriander. Serve hot with roti or rice." },
    ],
    notes: [
      "For a dry sabzi, add only 1/4 cup water and cook uncovered until the masala clings to the chunks.",
      "Add a cup of green peas or cubed potato with the water for a heartier curry.",
    ],
  },

  "atta halwa (wheat flour halwa)": {
    dishName: "Atta Halwa (Wheat Flour Halwa)",
    description:
      "Warm, ghee-rich halwa made from roasted whole wheat flour and sugar - the same comforting taste as gurudwara prasad, ready in 20 minutes.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "Heavy-bottomed kadai or pan", isSpecialized: false, alternative: null },
      { item: "Small pot, for hot syrup", isSpecialized: false, alternative: null },
      { item: "Spatula", isSpecialized: false, alternative: "Wooden spoon" },
    ],
    ingredients: [
      { amount: "1/2 cup", commonName: "Atta", englishName: "whole wheat flour" },
      { amount: "1/2 cup", commonName: "Ghee", englishName: "ghee" },
      { amount: "1/2 cup", commonName: "Cheeni", englishName: "sugar (or grated jaggery)" },
      { amount: "1.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "2", commonName: "Elaichi", englishName: "green cardamom pods, crushed" },
      { amount: "1 tbsp", commonName: "Badam", englishName: "chopped almonds (optional)" },
    ],
    method: [
      { step: 1, instruction: "In a small pot, bring the water, sugar and cardamom to a boil. Stir until the sugar dissolves, then keep it hot on the lowest heat." },
      { step: 2, instruction: "Melt the ghee in a kadai on low heat. Add the atta." },
      {
        step: 3,
        instruction: "Roast on low heat, stirring constantly, for 10 to 12 minutes. You'll know it's ready when the atta turns golden brown, smells nutty and the ghee starts separating from the edges.",
        tip: {
          title: "Patience with the roast",
          content: "The roasting decides the taste. Under-roasted atta tastes raw, so keep going until it's a deep golden colour.",
        },
      },
      { step: 4, instruction: "Stand back a little and carefully pour in the hot syrup while stirring. It will splutter and bubble, which is normal." },
      { step: 5, instruction: "Keep stirring for 2 to 3 minutes until the halwa thickens, turns glossy and leaves the sides of the pan." },
      { step: 6, instruction: "Turn off the heat, top with almonds and serve warm." },
    ],
    notes: [
      "Always add hot syrup to the roasted atta. Cold water causes lumps.",
      "For a more traditional taste, swap the sugar for the same amount of grated jaggery.",
    ],
  },

  "chana dal (chana dal tadka)": {
    dishName: "Chana Dal (Chana Dal Tadka)",
    description:
      "Nutty, thick split chickpea dal with a garlicky onion-tomato tadka - hearty and best with hot rice or roti.",
    prepTime: "Approx. 45 minutes (plus 1 hour soaking)",
    equipment: [
      { item: "Pressure cooker", isSpecialized: false, alternative: "A pot with a lid, simmered for 50 to 60 minutes" },
      { item: "Small pan, for tadka", isSpecialized: false, alternative: "Any small pan or steel ladle" },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Chana Dal", englishName: "split chickpeas, soaked 1 hour" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "2 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked chana dal and add it to a pressure cooker with turmeric, salt and 3 cups water." },
      {
        step: 2,
        instruction: "Cook for 5 to 6 whistles, until the dal is soft and can be mashed easily with a spoon. Let the pressure release on its own, then lightly mash a few spoonfuls.",
        tip: {
          title: "Chana dal is slow to soften",
          content: "It takes longer than toor or moong dal. If it's still firm after opening, give it 2 more whistles.",
        },
      },
      { step: 3, instruction: "Heat 1 tablespoon ghee in a pan. Add the cumin seeds and a pinch of hing." },
      { step: 4, instruction: "Add the onion and cook for 5 to 6 minutes until golden. Add the ginger-garlic paste and cook for 1 minute." },
      { step: 5, instruction: "Add the tomato, coriander powder and red chilli powder. Cook for 4 to 5 minutes until the tomato turns soft and mushy." },
      { step: 6, instruction: "Pour this masala into the dal, mix well and simmer for 8 to 10 minutes. Add hot water if it gets too thick." },
      { step: 7, instruction: "For the final tadka, heat the remaining ghee, add the dried red chillies and let them sizzle for 10 seconds. Pour it over the dal." },
      { step: 8, instruction: "Garnish with coriander and serve hot with rice or roti." },
    ],
    notes: [
      "In a hurry? Soak the dal for at least 30 minutes and add 1 extra whistle.",
      "A squeeze of lemon at the end brightens the taste.",
    ],
  },

  "white chole (safed chole)": {
    dishName: "White Chole (Safed Chole)",
    description:
      "Mild, pale chickpea curry in a smooth onion-ginger gravy with yogurt - lighter than the usual dark chole and lovely with kulche or rice.",
    prepTime: "Approx. 1 hour (plus overnight soaking)",
    equipment: [
      { item: "Pressure cooker", isSpecialized: false, alternative: "A heavy pot, with longer cooking time" },
      { item: "Mixer grinder", isSpecialized: false, alternative: null },
      { item: "Kadai or deep pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Kabuli Chana", englishName: "white chickpeas, soaked overnight" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, roughly chopped" },
      { amount: "1 inch", commonName: "Adrak", englishName: "ginger" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies" },
      { amount: "8", commonName: "Kaju", englishName: "cashews (optional, for creaminess)" },
      { amount: "1/4 cup", commonName: "Dahi", englishName: "yogurt, whisked smooth" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "1.5 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "2 tbsp", commonName: "Ghee ya Tel", englishName: "ghee or oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked chickpeas and pressure cook with 3 cups water and 1/2 tsp salt for 8 to 10 whistles, until very soft. Keep them in their water." },
      { step: 2, instruction: "Blend the onions, ginger, green chillies and cashews with a few tablespoons of water into a smooth, pale paste." },
      { step: 3, instruction: "Heat ghee in a kadai and add the cumin seeds and bay leaf. Let them sizzle for 10 seconds." },
      {
        step: 4,
        instruction: "Add the onion paste and cook on medium-low heat for 8 to 10 minutes, stirring often, until the raw smell goes and the paste looks thick. Don't let it brown.",
        tip: {
          title: "Keep it pale",
          content: "The white look comes from cooking the paste gently. If it turns brown, lower the heat and add a splash of water.",
        },
      },
      { step: 5, instruction: "Add the coriander powder and salt, then turn the heat to low and stir in the whisked yogurt. Mix constantly for 1 to 2 minutes so it doesn't split." },
      { step: 6, instruction: "Add the boiled chickpeas with about 1.5 cups of their water. Mash a few chickpeas against the side of the pan to thicken the gravy." },
      { step: 7, instruction: "Simmer for 15 minutes, stirring occasionally, until the gravy is creamy." },
      { step: 8, instruction: "Add the garam masala and amchur, mix, and turn off the heat. Garnish with coriander and serve hot." },
    ],
    notes: [
      "This is a mild chole. For more heat, add an extra green chilli or a pinch of white pepper.",
      "Serve with kulche, bhature, jeera rice or plain roti.",
    ],
  },

  "pasta (indian masala pasta)": {
    dishName: "Pasta (Indian Masala Pasta)",
    description:
      "Desi-style red sauce pasta with onion, capsicum and a little garam masala - tangy, a little spicy and ready in 25 minutes.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "Large pot, for boiling pasta", isSpecialized: false, alternative: null },
      { item: "Kadai or wide pan", isSpecialized: false, alternative: null },
      { item: "Strainer", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Pasta", englishName: "penne or any short pasta" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1/2", commonName: "Shimla Mirch", englishName: "capsicum, chopped" },
      { amount: "3 medium", commonName: "Tamatar", englishName: "tomatoes, blended into puree" },
      { amount: "3 cloves", commonName: "Lehsun", englishName: "garlic, finely chopped" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Oregano", englishName: "dried oregano or mixed herbs" },
      { amount: "1 tbsp", commonName: "Tomato Ketchup", englishName: "tomato ketchup" },
      { amount: "1 pinch", commonName: "Cheeni", englishName: "sugar" },
      { amount: "2 tbsp", commonName: "Tel ya Makhan", englishName: "oil or butter" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Cheese", englishName: "grated cheese (optional)" },
    ],
    method: [
      { step: 1, instruction: "Bring 6 cups of water to a boil with 1 tablespoon salt and a teaspoon of oil. Add the pasta and cook for 8 to 9 minutes until al dente." },
      {
        step: 2,
        instruction: "Drain the pasta, but save 1/2 cup of the starchy pasta water. Rinse the pasta lightly with cold water so it doesn't stick.",
        tip: {
          title: "Save the pasta water",
          content: "A splash of this starchy water later makes the sauce cling to the pasta instead of sliding off.",
        },
      },
      { step: 3, instruction: "Heat oil or butter in a kadai. Add the garlic and cook for 20 seconds until fragrant." },
      { step: 4, instruction: "Add the onion and cook for 3 to 4 minutes until soft. Add the capsicum and cook for 2 minutes." },
      { step: 5, instruction: "Add the tomato puree, red chilli powder, salt and sugar. Cook for 6 to 8 minutes, stirring, until the sauce thickens and the oil separates." },
      { step: 6, instruction: "Stir in the ketchup, oregano and garam masala." },
      { step: 7, instruction: "Add the boiled pasta and a few spoonfuls of the saved pasta water. Toss well on medium heat for 2 minutes until the sauce coats every piece." },
      { step: 8, instruction: "Top with grated cheese if using, cover for 1 minute so it melts, and serve hot." },
    ],
    notes: [
      "Add sweet corn, boiled peas or chopped carrot for a veggie-loaded version.",
      "Swap the garam masala for a pinch of chaat masala for extra tang.",
    ],
  },

  "maggi (masala maggi noodles)": {
    dishName: "Maggi (Masala Maggi Noodles)",
    description:
      "Loaded masala Maggi with onion, tomato and green chilli - a fast, comforting favourite for rainy evenings and late-night hunger.",
    prepTime: "Approx. 10 minutes",
    equipment: [
      { item: "Pan or small kadai with a lid", isSpecialized: false, alternative: null },
      { item: "Spoon or fork", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 packets", commonName: "Maggi Noodles", englishName: "instant noodles with tastemaker" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 small", commonName: "Tamatar", englishName: "tomato, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/4 cup", commonName: "Mixed Vegetables", englishName: "peas, carrot or capsicum (optional)" },
      { amount: "2.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "1 tbsp", commonName: "Makhan ya Tel", englishName: "butter or oil" },
      { amount: "1 pinch", commonName: "Kali Mirch", englishName: "black pepper" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat butter or oil in a pan. Add the onion and green chilli and cook for 1 to 2 minutes until soft." },
      { step: 2, instruction: "Add the tomato and any vegetables and cook for 2 minutes." },
      { step: 3, instruction: "Add the water and both tastemaker sachets. Stir and bring it to a boil." },
      { step: 4, instruction: "Break the noodle cakes into the boiling water. Cook for 2 to 3 minutes, gently pushing the noodles down and turning them, until they turn soft." },
      {
        step: 5,
        instruction: "Cover and cook for 1 more minute on low heat. Stop when most of the water has been absorbed and a little masala gravy is left.",
        tip: {
          title: "Don't overcook",
          content: "Maggi keeps cooking in its own heat after you switch off the stove. Turn it off when it's slightly saucy and it will thicken perfectly on the plate.",
        },
      },
      { step: 6, instruction: "Sprinkle pepper and coriander, and serve hot straight from the pan." },
    ],
    notes: [
      "For extra protein, crack an egg into the boiling water before adding the noodles and stir gently.",
      "Want a soupy Maggi? Use 3 cups water instead of 2.5.",
    ],
  },

  "macaroni (masala macaroni)": {
    dishName: "Macaroni (Masala Macaroni)",
    description:
      "Street-style masala macaroni tossed with veggies, tomato and Indian spices - tangy and slightly spicy, and kids love it.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "Pot, for boiling macaroni", isSpecialized: false, alternative: null },
      { item: "Kadai or wide pan", isSpecialized: false, alternative: null },
      { item: "Strainer", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Macaroni", englishName: "elbow macaroni" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, finely chopped" },
      { amount: "1/2", commonName: "Shimla Mirch", englishName: "capsicum, finely chopped" },
      { amount: "1/4 cup", commonName: "Gajar", englishName: "carrot, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "2 tbsp", commonName: "Tomato Ketchup", englishName: "tomato ketchup" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "2 tbsp", commonName: "Tel ya Makhan", englishName: "oil or butter" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Boil 5 cups of water with 1 tablespoon salt. Add the macaroni and cook for 7 to 8 minutes until soft but not mushy. Drain and rinse under cold water." },
      { step: 2, instruction: "Heat oil or butter in a kadai. Add the onion and green chilli and cook for 2 to 3 minutes until soft." },
      { step: 3, instruction: "Add the carrot and capsicum and cook for 3 minutes so they stay slightly crunchy." },
      { step: 4, instruction: "Add the tomato, red chilli powder and salt. Cook for 3 to 4 minutes until the tomato turns mushy." },
      { step: 5, instruction: "Stir in the ketchup, garam masala and chaat masala." },
      {
        step: 6,
        instruction: "Add the boiled macaroni and toss on medium heat for 2 to 3 minutes until every piece is coated in the masala.",
        tip: {
          title: "Stops sticking",
          content: "Rinsing the boiled macaroni in cold water and adding a little oil keeps it from clumping together.",
        },
      },
      { step: 7, instruction: "Garnish with coriander and serve hot." },
    ],
    notes: [
      "Add a handful of grated cheese at the end and cover for a minute for a cheesy version.",
      "Sweet corn and boiled peas are also great additions.",
    ],
  },

  "cake (simple eggless vanilla cake)": {
    dishName: "Cake (Simple Eggless Vanilla Cake)",
    description:
      "A soft, fluffy eggless vanilla sponge made with curd and basic pantry ingredients - easy for beginners and great with tea.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      {
        item: "Oven",
        isSpecialized: true,
        alternative:
          "A large pot or pressure cooker (gasket and whistle removed) with a layer of salt at the bottom and a stand on top. Preheat covered for 10 minutes, then bake the tin inside on low heat.",
      },
      { item: "Cake tin (6 to 7 inch)", isSpecialized: false, alternative: "Any steel or aluminium round tin" },
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Sieve (chalni)", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "3/4 cup", commonName: "Cheeni", englishName: "powdered sugar" },
      { amount: "3/4 cup", commonName: "Dahi", englishName: "thick curd / yogurt" },
      { amount: "1/2 cup", commonName: "Tel", englishName: "neutral cooking oil" },
      { amount: "1 tsp", commonName: "Baking Powder", englishName: "baking powder" },
      { amount: "1/2 tsp", commonName: "Baking Soda", englishName: "baking soda" },
      { amount: "1 tsp", commonName: "Vanilla Essence", englishName: "vanilla essence" },
      { amount: "3 to 4 tbsp", commonName: "Doodh", englishName: "milk, to adjust the batter" },
      { amount: "1 pinch", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Preheat the oven to 180°C (350°F) for 10 minutes. Grease the tin with a little oil and dust it with flour." },
      { step: 2, instruction: "In a bowl, whisk the curd and sugar until the sugar dissolves and the mixture looks smooth." },
      { step: 3, instruction: "Add the oil and vanilla and whisk well." },
      { step: 4, instruction: "Sieve the maida, baking powder, baking soda and salt directly into the bowl." },
      {
        step: 5,
        instruction: "Fold gently with a spatula in one direction until no dry flour is left. Add milk one spoon at a time until the batter falls off the spoon in a thick ribbon. Don't over-mix.",
        tip: {
          title: "Gentle mixing",
          content: "Over-mixing makes the cake dense and chewy. Mix only until the flour disappears.",
        },
      },
      { step: 6, instruction: "Pour the batter into the tin and tap it once or twice on the counter to remove air bubbles." },
      { step: 7, instruction: "Bake for 30 to 35 minutes. To check, insert a toothpick or knife into the centre. If it comes out clean, the cake is done." },
      { step: 8, instruction: "Let the cake cool in the tin for 10 minutes, then turn it out onto a plate and let it cool fully before cutting." },
    ],
    notes: [
      "Don't open the oven in the first 20 minutes, or the cake may sink in the middle.",
      "Add 1/2 cup chopped nuts or tutti frutti to the batter for a fun variation.",
      "If using the pot method, bake on the lowest flame for 35 to 45 minutes and check with a toothpick.",
    ],
  },

  "pakode (pakora)": {
    dishName: "Pakode (Pakora)",
    description:
      "Crispy, golden onion and potato fritters made with gram flour and spices - the ultimate monsoon snack with chai.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "Kadai", isSpecialized: false, alternative: "Any deep, heavy-bottomed pan" },
      { item: "Mixing bowl", isSpecialized: false, alternative: null },
      { item: "Slotted spoon (jhara)", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 large", commonName: "Pyaaz", englishName: "onions, thinly sliced" },
      { amount: "1 medium", commonName: "Aloo", englishName: "potato, thinly sliced (optional)" },
      { amount: "1 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "2 tbsp", commonName: "Chawal Ka Atta", englishName: "rice flour, for extra crunch" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "as needed", commonName: "Tel", englishName: "cooking oil, for deep frying" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      {
        step: 1,
        instruction: "In a bowl, mix the sliced onion, potato and 1/2 teaspoon salt. Rub with your hands and leave for 10 minutes. The vegetables will release water.",
        tip: {
          title: "Little or no water",
          content: "The water from the salted onions is usually enough to make the batter. Too much added water makes soggy pakode.",
        },
      },
      { step: 2, instruction: "Add the besan, rice flour, green chilli, ajwain, red chilli powder, turmeric and coriander to the bowl." },
      { step: 3, instruction: "Mix well. Add water 1 tablespoon at a time, only if needed, until the batter is thick and just coats the vegetables." },
      { step: 4, instruction: "Heat oil in a kadai on medium heat. To test it, drop a small bit of batter in. It should rise to the top in a few seconds." },
      { step: 5, instruction: "Drop small spoonfuls of batter into the oil, without crowding the pan. Fry for 4 to 5 minutes, turning occasionally, until deep golden and crisp." },
      { step: 6, instruction: "Drain on paper towels and repeat with the rest." },
      { step: 7, instruction: "Serve hot with green chutney, tomato ketchup and a cup of chai." },
    ],
    notes: [
      "Fry on medium heat. Too-hot oil browns the outside and leaves the inside raw.",
      "Try palak, gobi or paneer slices in place of the potato.",
      "Reheat leftover pakode in a dry pan or oven to crisp them up again.",
    ],
  },

  "chai (masala chai)": {
    dishName: "Chai (Masala Chai)",
    description:
      "Strong, milky Indian tea simmered with ginger and cardamom - the everyday cup that starts most Indian mornings. Makes 2 cups.",
    prepTime: "Approx. 10 minutes",
    equipment: [
      { item: "Small saucepan", isSpecialized: false, alternative: null },
      { item: "Strainer", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "1 cup", commonName: "Doodh", englishName: "milk" },
      { amount: "2 tsp", commonName: "Chai Patti", englishName: "loose black tea leaves" },
      { amount: "1.5 tsp", commonName: "Cheeni", englishName: "sugar, adjust to taste" },
      { amount: "1/2 inch", commonName: "Adrak", englishName: "ginger, crushed" },
      { amount: "1", commonName: "Elaichi", englishName: "green cardamom pod, crushed" },
    ],
    method: [
      { step: 1, instruction: "Bring the water to a boil in a saucepan. Add the crushed ginger and cardamom and let them boil for 1 to 2 minutes." },
      { step: 2, instruction: "Add the tea leaves and boil for 1 minute until the water turns a deep amber." },
      { step: 3, instruction: "Add the sugar and milk and stir." },
      {
        step: 4,
        instruction: "Let it come to a boil. When the chai rises to the rim, lower the heat for a few seconds, then let it rise again. Repeat once more, about 2 to 3 minutes total.",
        tip: {
          title: "The 2-3 boil rule",
          content: "Letting the chai rise a couple of times gives it a rich colour and stronger flavour. Don't leave it unattended, because milk boils over quickly.",
        },
      },
      { step: 5, instruction: "Strain into cups and serve hot." },
    ],
    notes: [
      "Like it stronger? Add an extra 1/2 teaspoon of tea leaves. Like it milkier? Use 1/2 cup water and 1.5 cups milk.",
      "In winter, add a pinch of black pepper or a small piece of cinnamon for a warming chai.",
    ],
  },

    // ============================================================
  // MORE FAN-FAVOURITE ADDITIONS
  // ============================================================

  "kadai paneer": {
    dishName: "Kadai Paneer",
    description:
      "Paneer and capsicum tossed in a punchy, freshly ground kadai masala with onion and tomato - drier and spicier than a paneer gravy, not to be confused with palak paneer's smooth spinach base.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: "Crush the coriander and chillies coarsely with a rolling pin instead" },
    ],
    ingredients: [
      { amount: "200 g", commonName: "Paneer", englishName: "paneer, cubed" },
      { amount: "1 large", commonName: "Shimla Mirch", englishName: "capsicum, cubed" },
      { amount: "1 large", commonName: "Pyaaz", englishName: "onion, cubed and layers separated" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Dhaniya (sabut)", englishName: "whole coriander seeds" },
      { amount: "3", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 inch", commonName: "Adrak (julienne)", englishName: "ginger, sliced thin, for garnish" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      {
        step: 1,
        instruction: "Dry roast the whole coriander seeds and dried red chillies in the kadai on low heat for 1 to 2 minutes, until you smell them toasting. Take them out and let them cool.",
      },
      {
        step: 2,
        instruction: "Coarsely crush the roasted coriander and chillies in a grinder - just a few pulses, you want a coarse texture, not a fine powder. This is your kadai masala.",
        tip: {
          title: "The whole point of the dish",
          content: "Coarse, freshly ground kadai masala is what makes this dish taste completely different from any other paneer curry. Don't use fine ready-made powder here.",
        },
      },
      { step: 3, instruction: "Heat oil in the kadai. Add the onion and capsicum and stir-fry on high heat for 2 to 3 minutes, so they stay a little crunchy. Take them out and set aside." },
      { step: 4, instruction: "In the same kadai, add the ginger-garlic paste and cook for 30 seconds until fragrant." },
      { step: 5, instruction: "Add the tomatoes and cook for 6 to 7 minutes, pressing them down, until soft and mushy." },
      { step: 6, instruction: "Add the crushed kadai masala, turmeric and salt. Mix well and cook for 2 minutes." },
      { step: 7, instruction: "Add the fried onion and capsicum back in, along with the paneer cubes. Toss gently on high heat for 2 to 3 minutes so everything is coated but the paneer stays soft." },
      { step: 8, instruction: "Sprinkle garam masala, top with the ginger juliennes and coriander leaves, and serve hot with roti or naan." },
    ],
    notes: [
      "This is meant to be a semi-dry dish, not a gravy. If it looks too dry, splash in a couple tablespoons of water rather than making it a curry.",
      "Adding the capsicum and onion back in near the end keeps them crunchy, which is the real texture difference from a soft paneer gravy like palak paneer.",
    ],
  },

  "tandoori chicken (oven-style)": {
    dishName: "Tandoori Chicken",
    description:
      "Chicken marinated in spiced, tangy yogurt and roasted until charred at the edges and smoky inside - the tandoor flavour, made entirely in a home oven.",
    prepTime: "Approx. 50 minutes (plus 4+ hours marination)",
    equipment: [
      { item: "oven", isSpecialized: true, alternative: "air_fryer, at 400°F (200°C) for 20 to 25 minutes, flipping halfway" },
      { item: "stove", isSpecialized: false, alternative: "Skip this step if you don't want the smoky finish" },
    ],
    ingredients: [
      { amount: "800 g", commonName: "Chicken", englishName: "chicken leg pieces, skin removed, slit deeply" },
      { amount: "1", commonName: "Nimbu", englishName: "lemon, juiced" },
      { amount: "1 cup", commonName: "Dahi (gaadha)", englishName: "thick yogurt, whisked" },
      { amount: "1.5 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1.5 tsp", commonName: "Kashmiri Lal Mirch", englishName: "Kashmiri red chilli powder" },
      { amount: "1 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Jeera Powder", englishName: "cumin powder" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds, crushed" },
      { amount: "2 tbsp", commonName: "Sarson ya Tel", englishName: "mustard oil or any cooking oil" },
      { amount: "as needed", commonName: "Makhan (pighla hua)", englishName: "melted butter, for basting" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Rub the chicken pieces with lemon juice and 1/2 tsp salt. Set aside for 15 minutes - this helps the deeper marinade stick and cuts any raw smell." },
      { step: 2, instruction: "In a large bowl, mix yogurt, ginger-garlic paste, chilli powder, garam masala, coriander powder, cumin powder, ajwain, oil and salt into a smooth marinade." },
      {
        step: 3,
        instruction: "Add the chicken to the marinade and massage it in well, pushing some into the slits you made. Cover and refrigerate for at least 4 hours, ideally overnight.",
        tip: {
          title: "Longer is better",
          content: "The deep slits and long marination are what let the flavour actually reach the bone, not just sit on the surface.",
        },
      },
      { step: 4, instruction: "Take the chicken out 20 minutes before cooking so it isn't fridge-cold. Preheat the oven to 220°C (425°F)." },
      { step: 5, instruction: "Arrange the pieces on a wire rack over a tray (or directly on a greased tray) and roast for 25 to 30 minutes, turning once halfway through." },
      { step: 6, instruction: "Switch the oven to grill/broil mode for the last 3 to 5 minutes to get charred spots on top. Watch closely so it doesn't burn." },
      {
        step: 7,
        instruction: "For a smoky finish, place a small piece of hot charcoal in a steel bowl, set it in the centre of the tray, pour a few drops of oil on it and cover the tray tightly with foil for 2 minutes. This is optional but authentic.",
      },
      { step: 8, instruction: "Brush generously with melted butter, squeeze over some fresh lemon and serve hot with mint chutney and sliced onions." },
    ],
    notes: [
      "No wire rack? Just flip the pieces once or twice during roasting so both sides colour evenly.",
      "The char on top is from high heat, not from burning - keep an eye on it in the last few minutes under the grill.",
    ],
  },

  "veg biryani": {
    dishName: "Veg Biryani",
    description:
      "Fragrant basmati rice layered with a spiced mixed-vegetable masala and slow-cooked on dum - a full celebration meal in one pot.",
    prepTime: "Approx. 1 hour",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "cooker", isSpecialized: false, alternative: "Boil the rice in an open pot instead, draining it once 70% cooked" },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Basmati Chawal", englishName: "basmati rice, soaked 30 minutes" },
      { amount: "2 cups", commonName: "Mixed Vegetables", englishName: "carrot, beans, cauliflower, peas, chopped" },
      { amount: "1", commonName: "Aloo", englishName: "potato, cubed" },
      { amount: "2 large", commonName: "Pyaaz (talaa hua)", englishName: "onions, thinly sliced and fried golden" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "yogurt, whisked" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "2 tbsp", commonName: "Biryani Masala", englishName: "biryani masala powder" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 inch, 3, 4, 1", commonName: "Dalchini, Elaichi, Laung, Tej Patta", englishName: "cinnamon, cardamom, cloves, bay leaf" },
      { amount: "a small handful", commonName: "Pudina aur Hara Dhaniya", englishName: "mint and coriander leaves, chopped" },
      { amount: "a few strands in 2 tbsp warm milk", commonName: "Kesar Doodh", englishName: "saffron soaked in warm milk" },
      { amount: "3 tbsp", commonName: "Ghee ya Tel", englishName: "ghee or oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Boil a large pot (or cooker, uncovered) of water with the whole spices and salt. Add the soaked rice and cook until about 70% done - still a bit firm at the centre when you bite one grain." },
      { step: 2, instruction: "Drain the rice immediately and spread it on a plate so it doesn't keep cooking." },
      { step: 3, instruction: "Heat ghee in the kadai. Add the ginger-garlic paste and cook for 1 minute." },
      { step: 4, instruction: "Add the potato and mixed vegetables and stir-fry for 4 to 5 minutes." },
      { step: 5, instruction: "Add red chilli powder, biryani masala and salt. Mix well." },
      { step: 6, instruction: "Turn the heat to low and stir in the whisked yogurt, mixing constantly for a minute so it doesn't split. Cover and cook for 8 to 10 minutes until the vegetables are just tender." },
      { step: 7, instruction: "Spread this vegetable masala evenly across the bottom of the kadai." },
      { step: 8, instruction: "Layer the partially cooked rice evenly on top. Scatter the fried onions, mint, coriander and saffron milk over the rice." },
      {
        step: 9,
        instruction: "Cover the kadai with a tight lid (seal the edges with dough or a damp cloth if it doesn't fit snugly) and cook on the lowest possible heat for 20 minutes.",
        tip: {
          title: "Low and slow",
          content: "This gentle steaming, called dum, is what finishes cooking the rice and lets all the layered flavours mix through evenly. Don't rush it with high heat.",
        },
      },
      { step: 10, instruction: "Turn off the heat and let it rest, covered, for 10 minutes. Gently fluff the layers together and serve hot with raita." },
    ],
    notes: [
      "Cut all the vegetables roughly the same size so they cook evenly.",
      "A tawa placed under the kadai during the dum step helps stop the bottom layer from catching.",
    ],
  },

  "vada pav": {
    dishName: "Vada Pav",
    description:
      "Spiced mashed potato dumplings, deep fried in a gram flour batter and packed into a soft pav with chutneys - Mumbai's favourite quick bite.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "tawa", isSpecialized: false, alternative: "Toast the pav directly in the kadai on low heat instead" },
      { item: "grinder", isSpecialized: false, alternative: "Crush the garlic and chillies with a mortar and pestle instead" },
    ],
    ingredients: [
      { amount: "4 medium", commonName: "Aloo", englishName: "potatoes, boiled and mashed" },
      { amount: "1 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun-Hari Mirch Paste", englishName: "ginger, garlic and green chilli, crushed together" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "1/4 tsp", commonName: "Baking Soda", englishName: "baking soda" },
      { amount: "8", commonName: "Pav", englishName: "pav buns" },
      { amount: "10 cloves", commonName: "Lehsun", englishName: "garlic, for dry chutney" },
      { amount: "3 tbsp", commonName: "Sukha Nariyal", englishName: "dry desiccated coconut, for dry chutney" },
      { amount: "2 tbsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder, for dry chutney" },
      { amount: "as needed", commonName: "Hari Chutney", englishName: "green coriander-mint chutney, to serve" },
      { amount: "as needed", commonName: "Tel", englishName: "cooking oil, for deep frying and toasting" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "For the dry garlic chutney, dry roast the garlic cloves and coconut in a pan on low heat until light golden and fragrant. Cool, then grind coarsely with red chilli powder and a pinch of salt. Set aside." },
      { step: 2, instruction: "Heat 1 tablespoon oil in the kadai. Add mustard seeds and let them pop, then add curry leaves and the ginger-garlic-chilli paste. Cook for 30 seconds." },
      { step: 3, instruction: "Add turmeric and the mashed potato, along with salt. Mix everything together well and cook for 2 minutes. Let it cool slightly." },
      { step: 4, instruction: "Shape the potato mixture into round balls, about the size of a small lemon." },
      { step: 5, instruction: "Make the batter by whisking besan, baking soda, a pinch of salt and enough water into a smooth, medium-thick batter, like pancake batter." },
      {
        step: 6,
        instruction: "Heat oil in the kadai for deep frying. Dip each potato ball in the batter, coating it fully, and slide it gently into the hot oil.",
        tip: {
          title: "Test the oil first",
          content: "Drop a bit of batter in - it should rise to the top steadily, not instantly. Too-hot oil browns the vada before the inside heats through.",
        },
      },
      { step: 7, instruction: "Fry in batches for 4 to 5 minutes, turning occasionally, until deep golden and crisp all over. Drain on paper towels." },
      { step: 8, instruction: "Slit each pav and toast it lightly on the tawa with a little oil or butter until warm." },
      { step: 9, instruction: "Spread green chutney on one side of the pav and a pinch of dry garlic chutney on the other. Place a hot vada inside and press gently. Serve immediately, with a fried green chilli on the side if you like it spicy." },
    ],
    notes: [
      "The batter should coat the back of a spoon and drip off slowly. Too thin and it won't stick; too thick and it turns doughy.",
      "Vada pav is best eaten fresh and hot, right after frying.",
    ],
  },

  "rasam": {
    dishName: "Rasam",
    description:
      "Thin, tangy, peppery South Indian lentil-tomato soup, finished with a sizzling tadka - light, comforting, and great with rice or on its own.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: "Simmer the dal in a covered pot for 25 to 30 minutes instead" },
      { item: "kadai", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1/4 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Imli", englishName: "tamarind pulp, or a small lemon-sized ball soaked in warm water" },
      { amount: "2 tsp", commonName: "Rasam Powder", englishName: "rasam powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Kali Mirch (kuti hui)", englishName: "black pepper, crushed" },
      { amount: "1 tsp", commonName: "Jeera (kuta hua)", englishName: "cumin seeds, crushed" },
      { amount: "1 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "2 tbsp", commonName: "Ghee ya Tel", englishName: "ghee or oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "a handful", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
    ],
    method: [
      { step: 1, instruction: "Wash the toor dal and pressure cook it with turmeric and 1.5 cups water for 4 to 5 whistles, until completely soft. Mash it smooth with a spoon or whisk." },
      { step: 2, instruction: "In a kadai, add the mashed dal, chopped tomatoes, tamarind pulp, rasam powder and salt, along with 2 cups water. Mix well." },
      { step: 3, instruction: "Bring it to a gentle boil and simmer for 8 to 10 minutes until the tomatoes soften and the raw tamarind smell is gone." },
      {
        step: 4,
        instruction: "Add the crushed pepper and cumin. Let it simmer for 2 more minutes, but don't let it boil hard once this is added.",
        tip: {
          title: "Never let rasam boil hard",
          content: "A gentle simmer keeps rasam light and fragrant. A rolling boil cooks off the very aroma that makes it special.",
        },
      },
      { step: 5, instruction: "For the tadka, heat ghee in a small pan. Add mustard seeds and let them pop." },
      { step: 6, instruction: "Add the dried red chillies, curry leaves and a pinch of hing. Sizzle for 10 seconds and pour the tadka over the rasam." },
      { step: 7, instruction: "Garnish with coriander leaves. Turn off the heat as soon as it starts to froth up at the edges - that's your sign it's ready." },
      { step: 8, instruction: "Serve hot, either as a soup on its own or poured over steamed rice." },
    ],
    notes: [
      "Rasam should be thin and soupy, not thick like sambar. Add more water if it looks too concentrated.",
      "A ripe, slightly squashed tomato added whole while simmering, then mashed in, gives extra body and flavour.",
    ],
  },

  "khichdi (moong dal khichdi)": {
    dishName: "Khichdi",
    description:
      "Soft, comforting rice and moong dal cooked together with mild spices - the classic simple, easy-to-digest one-pot meal.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: "Cook covered in a pot on the stove for 25 to 30 minutes, adding extra water as needed" },
      { item: "kadai", isSpecialized: false, alternative: "Skip the separate tadka and add the whole spices directly to the cooker in step 1" },
    ],
    ingredients: [
      { amount: "1/2 cup", commonName: "Chawal", englishName: "rice, rinsed" },
      { amount: "1/2 cup", commonName: "Peeli Moong Dal", englishName: "split yellow moong dal, rinsed" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 cup", commonName: "Mixed Vegetables", englishName: "carrot, beans, peas, chopped (optional)" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, slit" },
      { amount: "1 inch", commonName: "Adrak", englishName: "ginger, finely chopped" },
      { amount: "3 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "4 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Wash the rice and dal together until the water runs mostly clear. Soak them in water for 10 minutes, then drain." },
      { step: 2, instruction: "Heat 1 tablespoon ghee in the kadai. Add cumin seeds, bay leaf and a pinch of hing and let them sizzle for 10 seconds." },
      { step: 3, instruction: "Add the ginger and green chilli and cook for 30 seconds. If using vegetables, add them now and stir-fry for 2 minutes." },
      { step: 4, instruction: "Transfer this tempering to the pressure cooker. Add the drained rice and dal, turmeric and salt." },
      {
        step: 5,
        instruction: "Add the water and mix once. Close the lid and cook for 3 to 4 whistles on medium heat.",
        tip: {
          title: "Softer is the goal",
          content: "Khichdi should be soft and slightly mushy, almost like a thick porridge, not separate grains like plain rice. If in doubt, add a little more water.",
        },
      },
      { step: 6, instruction: "Let the pressure release on its own. Open the lid and give it a good stir - it should fall off the spoon easily. Add a splash of hot water if it looks too thick." },
      { step: 7, instruction: "Spoon the remaining ghee on top and serve hot, with a side of yogurt, papad or pickle." },
    ],
    notes: [
      "For a version that's easy on the stomach when unwell, skip the vegetables and tempering and just simmer rice, dal, turmeric and salt together.",
      "Leftover khichdi thickens as it cools - loosen it with a little hot water or milk when reheating.",
    ],
  },

  "lassi (sweet lassi)": {
    dishName: "Sweet Lassi",
    description:
      "Thick, chilled, sweetened yogurt drink blended till frothy - the classic cooling companion to a spicy meal or a hot afternoon.",
    prepTime: "Approx. 10 minutes",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: "Whisk vigorously by hand with a wired whisk instead" },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Dahi (gaadha, thanda)", englishName: "thick, chilled yogurt" },
      { amount: "1/2 cup", commonName: "Thanda Doodh", englishName: "chilled milk" },
      { amount: "4 tbsp", commonName: "Cheeni", englishName: "sugar, adjust to taste" },
      { amount: "1/4 tsp", commonName: "Elaichi Powder", englishName: "cardamom powder" },
      { amount: "a few ice cubes", commonName: "Barf", englishName: "ice cubes" },
      { amount: "a pinch", commonName: "Kesar", englishName: "saffron strands, for garnish (optional)" },
      { amount: "1 tsp", commonName: "Malai", englishName: "fresh cream, for topping (optional)" },
    ],
    method: [
      { step: 1, instruction: "Whisk the yogurt in a bowl first for about a minute until it looks smooth and lump-free. This makes blending much easier." },
      { step: 2, instruction: "Add the whisked yogurt, milk, sugar, cardamom powder and ice cubes to the grinder." },
      {
        step: 3,
        instruction: "Blend on high for 30 to 45 seconds until completely smooth and frothy on top.",
        tip: {
          title: "Getting that froth",
          content: "Blending with ice cubes already in the jar, rather than adding them after, is what gives lassi its light, frothy top layer.",
        },
      },
      { step: 4, instruction: "Taste and add a little more sugar if needed, then blend for 5 more seconds to mix it in." },
      { step: 5, instruction: "Pour into tall glasses. Top with a few saffron strands and a small spoon of fresh cream if using, and serve immediately." },
    ],
    notes: [
      "Use thick, full-fat yogurt - thin or watery yogurt makes a runny lassi no matter how much you blend it.",
      "For mango lassi, blend in 1 cup of chopped ripe mango and reduce the sugar to taste.",
    ],
  },
};