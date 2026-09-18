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
      "A warm, savory semolina porridge studded with vegetables and tempered spices — quick and filling.",
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
      "Spicy scrambled eggs cooked with onions, tomatoes and chillies — a protein-packed 15-minute favorite.",
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
      "A light, fiber-rich savory porridge made from broken wheat and vegetables — wholesome and easy to digest.",
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
      "Cool, comforting rice mixed with yogurt and a light tempering — a soothing South Indian classic.",
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
      "A crunchy, protein-rich salad of sprouted moong beans tossed with vegetables, lemon and spices — no cooking needed.",
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
      "A light, nutritious dal-vegetable combo of bottle gourd simmered with chana dal — mild and easy on the stomach.",
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
      "Sweet grated carrots slow-cooked in milk and ghee until rich and fudgy, finished with nuts — a winter classic.",
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
      "Nutty, melt-in-the-mouth sweet balls made from roasted gram flour, ghee and sugar — no frying needed.",
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
      "Spiced chickpeas simmered in a tangy onion-tomato gravy — a hearty, protein-rich staple.",
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
      "Red kidney beans simmered in a thick, spiced onion-tomato gravy — the classic pair to steamed rice.",
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
      "Crisp-tender okra sautéed with onions and spices — a simple, everyday dry sabzi.",
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
      "Fire-roasted eggplant mashed and cooked with onions, tomatoes and spices — smoky and rustic.",
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
      "A rich, mildly spiced chicken curry made creamy with cashews and browned onions — comfort food at its finest.",
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
      "Tender chicken in a velvety, buttery tomato-cashew gravy — India's most beloved chicken curry.",
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
      "A comforting everyday chicken curry with a spiced onion-tomato gravy — simple, no fancy ingredients needed.",
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
      "Charred spiced chicken chunks simmered in a creamy tomato gravy — done entirely on the stovetop, no tandoor needed.",
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
      "Crispy, spicy deep-fried chicken bites with a tangy curry-leaf tempering — a popular South Indian starter.",
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
      "Soft, pillowy homemade naan bubbled with garlic butter — made entirely on a tawa, no tandoor needed.",
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
      "Fragrant basmati rice tempered with roasted cumin seeds — the simplest, most comforting rice side dish.",
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
      "A flaky, multi-layered whole wheat flatbread with crisp folds — cooked entirely on a tawa.",
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
      "Tangy, lightly spiced rice tempered with peanuts, curry leaves and fresh lemon juice — perfect for lunchboxes.",
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
      "Soft paneer cubes in a luxuriously creamy, buttery tomato gravy — a restaurant favourite made simple at home.",
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
      "Fragrant basmati rice layered with spiced, marinated chicken and slow-cooked to perfection — a true celebration dish.",
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
      "A crisp, golden fermented rice-and-lentil crepe, filled with a lightly spiced potato masala — a South Indian classic.",
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
      "Slow-cooked black lentils in a rich, buttery, creamy gravy — deeply comforting and full of flavour.",
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
      "Crispy, golden pastry triangles stuffed with a spiced potato and pea filling — the ultimate Indian tea-time snack.",
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
};