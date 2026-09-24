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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "tawa", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
    
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

  "mutter mushroom": {
    dishName: "Matar Mushroom",
    description:
      "Tender mushrooms and green peas cooked in a lightly spiced onion-tomato masala - a comforting everyday North Indian curry.",
    prepTime: "Approx. 35 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      {
        amount: "200 g",
        commonName: "Mushroom",
        englishName: "button mushrooms, sliced",
      },
      {
        amount: "1 cup",
        commonName: "Matar",
        englishName: "green peas, fresh or frozen",
      },
      {
        amount: "1 medium",
        commonName: "Pyaaz",
        englishName: "onion, finely chopped",
      },
      {
        amount: "2 medium",
        commonName: "Tamatar",
        englishName: "tomatoes, finely chopped",
      },
      {
        amount: "1 tsp",
        commonName: "Adrak-Lehsun Paste",
        englishName: "ginger-garlic paste",
      },
      {
        amount: "1",
        commonName: "Hari Mirch",
        englishName: "green chilli, chopped",
      },
      {
        amount: "1/4 tsp",
        commonName: "Haldi",
        englishName: "turmeric",
      },
      {
        amount: "1 tsp",
        commonName: "Dhaniya Powder",
        englishName: "coriander powder",
      },
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
      {
        amount: "1/2 tsp",
        commonName: "Kasuri Methi",
        englishName: "dried fenugreek leaves, optional",
      },
      {
        amount: "2 tbsp",
        commonName: "Tel",
        englishName: "cooking oil",
      },
      {
        amount: "1/2 cup",
        commonName: "Paani",
        englishName: "water",
      },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      {
        amount: "as needed",
        commonName: "Hara Dhaniya",
        englishName: "coriander leaves, chopped",
      },
    ],
    method: [
      {
        step: 1,
        instruction:
          "Clean the mushrooms, trim the stems if needed and slice them. Keep them aside.",
      },
      {
        step: 2,
        instruction:
          "Heat oil in a kadai on medium-high heat. Add the sliced mushrooms and sauté for 4 to 5 minutes until they release their moisture and lightly brown. Remove and set aside.",
      },
      {
        step: 3,
        instruction:
          "In the same kadai, add chopped onion and cook until soft and lightly golden.",
      },
      {
        step: 4,
        instruction:
          "Add ginger-garlic paste and green chilli. Cook for 30 seconds until fragrant.",
      },
      {
        step: 5,
        instruction:
          "Add chopped tomatoes, turmeric, coriander powder, red chilli powder and salt. Cook until the tomatoes soften and the masala becomes thick.",
      },
      {
        step: 6,
        instruction:
          "Add green peas and water. Cover and cook for 5 to 7 minutes, until the peas are tender.",
      },
      {
        step: 7,
        instruction:
          "Add the sautéed mushrooms and mix gently. Simmer uncovered for 4 to 5 minutes until the gravy reaches your preferred consistency.",
      },
      {
        step: 8,
        instruction:
          "Add garam masala and crushed kasuri methi if using. Mix well and cook for 1 more minute.",
        tip: {
          title: "Don't overcook the mushrooms",
          content:
            "Keep the final simmer short so the mushrooms stay tender instead of becoming rubbery.",
        },
      },
      {
        step: 9,
        instruction:
          "Garnish with coriander leaves and serve hot with roti, naan or rice.",
      },
    ],
    notes: [
      "Frozen peas can go straight into the pan. Fresh peas may need a few extra minutes to become tender.",
      "For a drier version, use less water and simmer uncovered until the masala coats the mushrooms and peas.",
    ],
  },

  "baingan bharta (smoky roasted eggplant mash)": {
    dishName: "Baingan Bharta",
    description:
      "Fire-roasted eggplant mashed and cooked with onions, tomatoes and spices - smoky and rustic.",
    prepTime: "Approx. 40 minutes",
    equipment: [

      { item: "stove", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "oven", isSpecialized: false, alternative: null },
      { item: "tawa", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "tawa", isSpecialized: false, alternative: null },
    
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

      { item: "tawa", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "tawa", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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
          "While it cooks, rinse basmati until the water is mostly clear. Cook with 2 cups water and a pinch of salt for 12 to 15 minutes. Keep covered until serving.",
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
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
          "Mix maida, suji, baking soda, sugar, salt, yogurt and oil. Add warm water little by little and knead into a soft dough.",
      },
      {
        step: 2,
        instruction:
          "Cover the dough with a damp cloth and rest it in a warm spot for 2 hours. It should look puffed up.",
      },
      {
        step: 3,
        instruction:
          "Drain the chickpeas and add them to the cooker with the tea bag, salt and 3 cups water. Cook for 8 to 10 whistles. Remove the tea bag and keep the chickpeas in their water.",
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "tawa", isSpecialized: false, alternative: null },
    
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
          "Mix maida, baking powder, baking soda, sugar, salt, yogurt and oil. Add water as needed and knead into a soft dough.",
      },
      {
        step: 2,
        instruction:
          "Cover with a damp cloth and rest the dough for 1 hour.",
      },
      {
        step: 3,
        instruction:
          "Drain the chickpeas and pressure cook with the tea bag, salt and 3 cups water for 8 to 10 whistles. Remove the tea bag and keep the chickpeas in their water.",
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

      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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
          "Cook for 4 to 5 whistles until soft. Let the pressure release, then whisk the dal until creamy. Add hot water if it is too thick.",
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
          "Heat the remaining ghee. Add cumin, garlic and dried red chillies. Fry for about 30 seconds until the garlic turns light golden.",
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

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "tawa", isSpecialized: false, alternative: null },
    
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

      { item: "tawa", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "oven", isSpecialized: false, alternative: null },
    
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

      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "pan", isSpecialized: false, alternative: null },
    
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
      { item: "grinder", isSpecialized: false, alternative: null },
    
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

      { item: "oven", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
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
        instruction: "Optional: skip the charcoal smoke. The oven-cooked chicken is ready to serve as is.",
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
      { item: "cooker", isSpecialized: false, alternative: null },
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
      { step: 1, instruction: "Boil water with the whole spices and salt. Add soaked rice and cook until about 70% done, with the centre still slightly firm." },
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
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
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
      { step: 1, instruction: "Dry roast garlic and coconut until light golden. Cool, then grind coarsely with chilli powder and salt." },
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
      { step: 9, instruction: "Spread chutneys on the pav, place the hot vada inside and press gently. Serve immediately. Add fried green chilli if you like." },
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

      { item: "cooker", isSpecialized: false, alternative: null },
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

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
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

      { item: "grinder", isSpecialized: false, alternative: null },
    
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


  "roti (chapati)": {
    dishName: "Roti (Chapati)",
    description:
      "Soft everyday Indian flatbread made from whole wheat flour, cooked on a tawa and finished directly over the stove for a light puff.",
    prepTime: "Approx. 30 minutes (plus 15 minutes resting)",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Gehu ka Atta", englishName: "whole wheat flour" },
      { amount: "3/4 to 1 cup", commonName: "Paani", englishName: "water, as needed" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt, optional" },
      { amount: "1 tsp", commonName: "Ghee", englishName: "ghee, optional" },
    ],
    method: [
      { step: 1, instruction: "Add whole wheat flour and salt to a bowl. Add water little by little and bring it together into a soft dough." },
      { step: 2, instruction: "Knead the dough for 5 to 7 minutes until smooth and soft. Cover and let it rest for 15 minutes." },
      { step: 3, instruction: "Divide the dough into small balls. Dust one with flour and roll it into a thin circle, about 6 inches wide." },
      { step: 4, instruction: "Heat the tawa on medium-high heat. Place the rolled roti on it and cook until small bubbles appear." },
      {
        step: 5,
        instruction: "Flip the roti and cook the other side until light brown spots appear.",
        tip: {
          title: "Keep the tawa hot",
          content: "A properly heated tawa helps the roti cook quickly and puff instead of turning dry.",
        },
      },
      { step: 6, instruction: "Move the roti directly onto the stove flame for a few seconds, flipping once, until it puffs. Skip this step if your stove does not support direct flame cooking." },
      { step: 7, instruction: "Brush with a little ghee if using and serve hot." },
    ],
    notes: [
      "Use slightly warm water for a softer dough.",
      "Keep the dough covered while rolling so it does not dry out.",
    ],
  },

  "sambar chawal": {
    dishName: "Sambar Chawal",
    description:
      "A comforting one-pot South Indian rice dish cooked with toor dal, vegetables, tamarind and sambar spices for an easy home meal.",
    prepTime: "Approx. 40 minutes",
    equipment: [

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "1/2 cup", commonName: "Chawal", englishName: "rice, rinsed" },
      { amount: "1/2 cup", commonName: "Toor Dal", englishName: "split pigeon peas, rinsed" },
      { amount: "1 cup", commonName: "Mixed Sabzi", englishName: "carrot, beans and potato, chopped" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1.5 tbsp", commonName: "Sambar Masala", englishName: "sambar powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1 tbsp", commonName: "Imli Pulp", englishName: "tamarind pulp" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "3.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, slit" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Add rice, dal, turmeric and 3 cups water to the cooker. Cook for 3 to 4 whistles, then let the pressure release naturally." },
      { step: 2, instruction: "Heat oil in a kadai. Add mustard seeds, cumin seeds, hing and curry leaves. Let them sizzle for a few seconds." },
      { step: 3, instruction: "Add onion and green chilli and cook until the onion softens. Add tomato and cook until mushy." },
      { step: 4, instruction: "Add the chopped vegetables, sambar powder and salt. Add 1/2 cup water, cover and cook until the vegetables are nearly tender." },
      {
        step: 5,
        instruction: "Add the cooked rice and dal mixture. Stir in tamarind pulp and mix gently. Simmer for 5 to 7 minutes, adding a splash of water if needed.",
        tip: {
          title: "Keep it soft",
          content: "Sambar chawal should be soft and spoonable, not dry. Add a little hot water if it thickens too much.",
        },
      },
      { step: 6, instruction: "Taste and adjust salt or tamarind if needed. Garnish with coriander and serve hot." },
    ],
    notes: [
      "You can use any quick-cooking vegetables you already have, such as bottle gourd, pumpkin or peas.",
    ],
  },

  "pani puri (golgappe)": {
    dishName: "Pani Puri (Golgappe)",
    description:
      "Crispy puris filled with spiced potato, tangy tamarind water and mint water, prepared easily at home with ready-made puris.",
    prepTime: "Approx. 25 minutes",
    equipment: [

      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "24", commonName: "Puri", englishName: "ready-made pani puri shells" },
      { amount: "2 medium", commonName: "Aloo", englishName: "boiled potatoes, mashed" },
      { amount: "1/2 cup", commonName: "Kala Chana", englishName: "boiled black chickpeas" },
      { amount: "1 tbsp", commonName: "Imli Pulp", englishName: "tamarind pulp" },
      { amount: "1/2 cup", commonName: "Pudina", englishName: "fresh mint leaves" },
      { amount: "1/2 cup", commonName: "Dhaniya", englishName: "fresh coriander leaves" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1 tsp", commonName: "Bhuna Jeera", englishName: "roasted cumin powder" },
      { amount: "1 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1 tsp", commonName: "Kali Namak", englishName: "black salt" },
      { amount: "2 cups", commonName: "Paani", englishName: "cold water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Add mint, coriander, green chilli, roasted cumin powder, black salt and 1/2 cup water to the grinder. Blend until smooth." },
      { step: 2, instruction: "Pour the green mixture into a bowl. Add the tamarind pulp and 1.5 cups cold water. Mix and adjust salt to taste." },
      { step: 3, instruction: "Mix the mashed potato and boiled black chickpeas with a pinch of chaat masala and salt." },
      {
        step: 4,
        instruction: "Crack a small opening in each puri and fill it with the potato-chickpea mixture.",
        tip: {
          title: "Make them just before eating",
          content: "Fill the puris right before serving so they stay crisp instead of becoming soggy.",
        },
      },
      { step: 5, instruction: "Dip or spoon the chilled pani into each puri and serve immediately." },
    ],
    notes: [
      "Use ready-made puris for an easy home version. There is no need to deep-fry anything for this recipe.",
      "Chill the pani for 20 to 30 minutes for a better street-style result.",
    ],
  },

  "rasmalai": {
    dishName: "Rasmalai",
    description:
      "Soft milk dumplings soaked in sweet, cardamom-scented milk, finished with saffron and nuts for an easy homemade dessert.",
    prepTime: "Approx. 45 minutes (plus 1 hour chilling)",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "8", commonName: "Rasmalai Pieces", englishName: "ready-made rasgulla pieces" },
      { amount: "750 ml", commonName: "Doodh", englishName: "full-fat milk" },
      { amount: "1/3 cup", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/4 tsp", commonName: "Elaichi Powder", englishName: "cardamom powder" },
      { amount: "a few strands", commonName: "Kesar", englishName: "saffron, optional" },
      { amount: "2 tbsp", commonName: "Badam aur Pista", englishName: "chopped almonds and pistachios" },
    ],
    method: [
      { step: 1, instruction: "Gently squeeze each rasgulla between your palms to remove some of the syrup. Do not crush them." },
      { step: 2, instruction: "Pour the milk into a kadai and bring it to a gentle boil on the stove." },
      { step: 3, instruction: "Lower the heat and simmer the milk for 15 to 20 minutes, stirring often, until it reduces slightly." },
      { step: 4, instruction: "Add sugar, cardamom and saffron if using. Stir until the sugar dissolves." },
      {
        step: 5,
        instruction: "Add the squeezed rasgulla pieces and simmer gently for 3 to 4 minutes so they absorb the flavored milk.",
        tip: {
          title: "Don't boil hard",
          content: "Keep the heat low after adding the rasgulla. A hard boil can make the pieces break or lose their soft texture.",
        },
      },
      { step: 6, instruction: "Turn off the heat, add the chopped nuts and let the rasmalai cool. Chill for at least 1 hour before serving." },
    ],
    notes: [
      "Using ready-made rasgulla makes this a very easy home version.",
      "The milk thickens more as it chills, so do not reduce it too aggressively on the stove.",
    ],
  },

  "mutton curry": {
    dishName: "Mutton Curry",
    description:
      "A homestyle Indian mutton curry made with onions, tomatoes and everyday spices, cooked until the meat is tender and the gravy is rich.",
    prepTime: "Approx. 1 hour 15 minutes",
    equipment: [

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "500 g", commonName: "Mutton", englishName: "mutton curry-cut pieces" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, finely chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1.5 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Dahi", englishName: "yogurt" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2 cups", commonName: "Paani", englishName: "water" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in the cooker. Add cumin seeds and bay leaf and let them sizzle." },
      { step: 2, instruction: "Add onions and cook until deep golden. Add ginger-garlic paste and cook for 1 minute." },
      { step: 3, instruction: "Add tomatoes, turmeric, chilli powder, coriander powder and salt. Cook until the tomatoes are soft and the oil starts to separate." },
      { step: 4, instruction: "Lower the heat. Add yogurt a little at a time, stirring continuously so it does not split. Cook for 2 minutes." },
      { step: 5, instruction: "Add the mutton and cook on medium heat for 6 to 8 minutes, stirring so the pieces get coated in the masala." },
      { step: 6, instruction: "Add water, close the cooker and cook for 5 to 6 whistles on medium heat. Let the pressure release naturally." },
      {
        step: 7,
        instruction: "Open the cooker and simmer uncovered for 8 to 10 minutes until the gravy reaches the thickness you like. Stir in garam masala.",
        tip: {
          title: "Don't rush the final simmer",
          content: "A few extra minutes uncovered helps the curry thicken and brings the masala together without needing extra ingredients.",
        },
      },
      { step: 8, instruction: "Garnish with coriander and serve hot with roti, rice or naan." },
    ],
    notes: [
      "Cooking time can vary with the size and cut of the mutton. Cook until the meat is tender before serving.",
    ],
  },

  "medu vada": {
    dishName: "Medu Vada",
    description:
      "Crisp outside and soft inside South Indian lentil fritters made from urad dal, perfect with sambar or coconut chutney.",
    prepTime: "Approx. 35 minutes (plus 4 hours soaking)",
    equipment: [

      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Urad Dal", englishName: "split black gram, soaked 4 hours" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "ginger, finely chopped" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves, chopped" },
      { amount: "1 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Tel", englishName: "oil, for frying" },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked urad dal well. Add it to the grinder with a small splash of water and grind to a smooth, thick batter." },
      { step: 2, instruction: "Transfer the batter to a bowl. Beat it vigorously with a spoon for 2 to 3 minutes to make it lighter." },
      { step: 3, instruction: "Mix in green chilli, ginger, cumin, curry leaves, coriander, hing and salt." },
      {
        step: 4,
        instruction: "Heat oil in a kadai on medium heat. Wet your hand, take a small portion of batter, make a hole in the centre and slide it carefully into the oil.",
        tip: {
          title: "Check the batter",
          content: "A small bit of batter dropped into water should float. If it sinks, beat the batter a little longer before shaping the vada.",
        },
      },
      { step: 5, instruction: "Fry a few vadas at a time until golden and crisp on both sides. Keep the heat around medium so the centre cooks through." },
      { step: 6, instruction: "Remove onto a plate. Serve hot with sambar or coconut chutney." },
    ],
    notes: [
      "Do not add too much water while grinding. A thick batter is easier to shape and gives softer vadas.",
    ],
  },

  "tinda sabzi": {
    dishName: "Tinda Sabzi",
    description:
      "A simple everyday North Indian sabzi of tender tinda cooked with onion and basic spices in a kadai.",
    prepTime: "Approx. 30 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "500 g", commonName: "Tinda", englishName: "round gourd, peeled and chopped" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2 tbsp", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds. Let them sizzle." },
      { step: 2, instruction: "Add onion and cook until soft. Add tomato and cook until mushy." },
      { step: 3, instruction: "Add turmeric, coriander powder, chilli powder and salt. Stir well." },
      { step: 4, instruction: "Add chopped tinda and mix until every piece is coated with the masala." },
      {
        step: 5,
        instruction: "Add 2 tablespoons water, cover and cook on low heat for 12 to 15 minutes, stirring once or twice, until the tinda is tender.",
        tip: {
          title: "Don't add too much water",
          content: "Tinda releases water as it cooks. Start with just a little and add more only if the pan looks dry.",
        },
      },
      { step: 6, instruction: "Sprinkle garam masala, mix gently and cook uncovered for 1 minute. Garnish with coriander and serve hot." },
    ],
    notes: [
      "Choose small, firm tinda for a more tender sabzi.",
    ],
  },

  "gajar matar": {
    dishName: "Gajar Matar",
    description:
      "A simple winter sabzi of sweet carrots and green peas cooked with cumin and mild spices, ideal for everyday home meals.",
    prepTime: "Approx. 25 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "3 medium", commonName: "Gajar", englishName: "carrots, peeled and chopped" },
      { amount: "1 cup", commonName: "Matar", englishName: "green peas" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1 small", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1/4 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds. Let them sizzle." },
      { step: 2, instruction: "Add onion and cook until soft. Add tomato and cook until mushy." },
      { step: 3, instruction: "Add turmeric, coriander powder, chilli powder and salt. Mix well." },
      { step: 4, instruction: "Add carrots and peas and stir until coated with the masala." },
      {
        step: 5,
        instruction: "Add water, cover and cook on low-medium heat for 10 to 12 minutes until the carrots are tender but still hold their shape.",
        tip: {
          title: "Keep the carrots firm",
          content: "Stop cooking once the carrots are tender. Overcooking turns the sabzi soft and watery.",
        },
      },
      { step: 6, instruction: "Add garam masala, cook uncovered for 1 minute and garnish with coriander." },
    ],
    notes: [],
  },

  "kadai chicken": {
    dishName: "Kadai Chicken",
    description:
      "A spicy, smoky-style chicken curry made at home with onions, tomatoes, capsicum and freshly crushed whole spices.",
    prepTime: "Approx. 50 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "500 g", commonName: "Chicken", englishName: "boneless or curry-cut chicken" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, sliced" },
      { amount: "3 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1", commonName: "Shimla Mirch", englishName: "capsicum, sliced" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tbsp", commonName: "Dhaniya", englishName: "coriander seeds" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "3", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Dry roast coriander seeds, cumin seeds and dried red chillies in the kadai for 1 to 2 minutes until fragrant. Let them cool slightly." },
      { step: 2, instruction: "Crush the roasted spices in the grinder into a coarse powder." },
      { step: 3, instruction: "Heat oil in the kadai. Add onion and cook until light golden. Add ginger-garlic paste and cook for 1 minute." },
      { step: 4, instruction: "Add tomatoes, turmeric, chilli powder and salt. Cook until the tomatoes soften and the oil starts to separate." },
      { step: 5, instruction: "Add the chicken and half of the crushed spice powder. Cook on medium-high heat for 7 to 8 minutes, stirring often." },
      {
        step: 6,
        instruction: "Add water, cover and cook on low-medium heat for 15 to 18 minutes until the chicken is cooked through.",
        tip: {
          title: "Keep the gravy thick",
          content: "Chicken and tomatoes release moisture while cooking, so add more water only if the pan looks dry.",
        },
      },
      { step: 7, instruction: "Add capsicum, remaining crushed spices and garam masala. Cook uncovered for 3 to 4 minutes so the capsicum stays slightly crisp." },
      { step: 8, instruction: "Garnish with coriander and serve hot with roti, naan or rice." },
    ],
    notes: [
      "The freshly roasted and crushed whole spices give the dish its characteristic kadai-style flavour.",
    ],
  },

  "mutton biryani": {
    dishName: "Mutton Biryani",
    description:
      "A home-style mutton biryani made with tender spiced mutton, basmati rice, yogurt and whole spices, finished together on the stove.",
    prepTime: "Approx. 1 hour 30 minutes (plus 30 minutes marination)",
    equipment: [

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "500 g", commonName: "Mutton", englishName: "mutton curry-cut pieces" },
      { amount: "1.5 cups", commonName: "Basmati Chawal", englishName: "basmati rice, rinsed and soaked 20 minutes" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "yogurt" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, thinly sliced" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "1 inch", commonName: "Dalchini", englishName: "cinnamon" },
      { amount: "3", commonName: "Laung", englishName: "cloves" },
      { amount: "2", commonName: "Elaichi", englishName: "cardamom pods" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies, slit" },
      { amount: "2 tbsp", commonName: "Ghee ya Tel", englishName: "ghee or oil" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Mix the mutton with yogurt, half the ginger-garlic paste, chilli powder, turmeric and a little salt. Rest for 30 minutes." },
      { step: 2, instruction: "Heat oil or ghee in the cooker. Add bay leaf, cinnamon, cloves, cardamom and cumin seeds and let them sizzle." },
      { step: 3, instruction: "Add onions and cook until golden. Add the remaining ginger-garlic paste and cook for 1 minute." },
      { step: 4, instruction: "Add tomatoes, coriander powder and the remaining salt. Cook until the tomatoes are soft and the oil starts to separate." },
      { step: 5, instruction: "Add the marinated mutton and cook on medium-high heat for 6 to 8 minutes, stirring often." },
      { step: 6, instruction: "Add 1.5 cups water, close the cooker and cook for 5 to 6 whistles on medium heat. Let the pressure release naturally." },
      { step: 7, instruction: "Open the cooker and check that the mutton is tender. If needed, cook it for a few more minutes before adding the rice." },
      {
        step: 8,
        instruction: "Add the soaked, drained rice, remaining water, green chillies and garam masala. Mix gently and bring to a boil.",
        tip: {
          title: "Handle the rice gently",
          content: "Once the rice goes in, stir only once or twice so the soaked basmati grains do not break.",
        },
      },
      { step: 9, instruction: "Cover and cook on the lowest heat for 15 to 18 minutes until the rice is tender and the liquid is absorbed." },
      { step: 10, instruction: "Turn off the stove and rest covered for 10 minutes. Fluff gently, garnish with coriander and serve." },
    ],
    notes: [
      "Use tender curry-cut mutton and make sure it is fully cooked before serving.",
    ],
  },

  "uttapam": {
    dishName: "Uttapam",
    description:
      "Soft, thick South Indian savory pancakes topped with onion, tomato and green chilli, cooked on a tawa at home.",
    prepTime: "Approx. 20 minutes",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Dosa Batter", englishName: "ready dosa batter" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "as needed", commonName: "Tel", englishName: "oil, for cooking" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix the chopped onion, tomato, green chilli and coriander in a bowl. Add a small pinch of salt." },
      { step: 2, instruction: "Heat the tawa on medium heat and lightly grease it with oil." },
      { step: 3, instruction: "Pour a ladle of dosa batter onto the centre and gently spread it into a thick round. Do not spread it as thin as a dosa." },
      { step: 4, instruction: "Scatter the onion-tomato topping over the surface and press it lightly into the batter." },
      {
        step: 5,
        instruction: "Drizzle a little oil around the edges and cook for 2 to 3 minutes until the base is golden and the top looks mostly set.",
        tip: {
          title: "Keep it thick",
          content: "Uttapam should stay soft and fluffy. Spreading the batter too thin turns it into a dosa instead.",
        },
      },
      { step: 6, instruction: "Flip carefully and cook the topping side for 1 to 2 minutes until lightly golden." },
      { step: 7, instruction: "Serve hot with coconut chutney or sambar." },
    ],
    notes: [
      "A slightly thick, pourable dosa batter works best. If your batter is very thick, loosen it with a little water.",
    ],
  },

  "momos (veg momos)": {
    dishName: "Momos (Veg Momos)",
    description:
      "Soft steamed dumplings filled with finely chopped vegetables, made with simple wrappers and steamed at home in a covered cooker.",
    prepTime: "Approx. 45 minutes",
    equipment: [

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "1/2 cup", commonName: "Patta Gobhi", englishName: "cabbage, finely chopped" },
      { amount: "1/2 cup", commonName: "Gajar", englishName: "carrot, finely chopped" },
      { amount: "1/4 cup", commonName: "Spring Onion", englishName: "spring onion, finely chopped" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "ginger, finely chopped" },
      { amount: "1 tsp", commonName: "Lehsun", englishName: "garlic, finely chopped" },
      { amount: "1 tsp", commonName: "Soy Sauce", englishName: "soy sauce" },
      { amount: "1 tsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "3/4 cup", commonName: "Paani", englishName: "water, as needed" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1/4 tsp", commonName: "Kali Mirch", englishName: "black pepper" },
    ],
    method: [
      { step: 1, instruction: "Mix maida with a pinch of salt. Add water little by little and knead into a smooth dough. Cover and rest for 20 minutes." },
      { step: 2, instruction: "Heat oil in a kadai. Add ginger and garlic, then cabbage, carrot and spring onion. Stir-fry on medium-high heat for 2 to 3 minutes." },
      { step: 3, instruction: "Add soy sauce, black pepper and a little salt. Cook for 1 minute, then turn off the stove and cool the filling completely." },
      { step: 4, instruction: "Divide the dough into small balls. Roll each one very thin, add a spoonful of filling and fold the edges over the filling to seal." },
      { step: 5, instruction: "Add 2 to 3 cups water to the cooker and use its steaming setup or rack. Place the momos above the water on a lightly greased plate." },
      {
        step: 6,
        instruction: "Cover and steam for 10 to 12 minutes until the wrappers look slightly translucent and are cooked through.",
        tip: {
          title: "Keep them above the water",
          content: "The momos should steam, not sit in the boiling water. Keep the water level below the plate or steamer rack.",
        },
      },
      { step: 7, instruction: "Carefully remove the momos and serve hot with your favorite chutney." },
    ],
    notes: [
      "Keep the rolled wrappers covered with a damp cloth so they do not dry while shaping the remaining momos.",
      "You can add finely chopped paneer to the vegetable filling for a richer home-style version.",
    ],
  },
  // ============================================================
  // MORE HOME CLASSICS
  // ============================================================

  "egg omelette": {
    dishName: "Egg Omelette",
    description:
      "A simple Indian-style omelette with eggs, onion, green chilli and coriander, ready in minutes.",
    prepTime: "Approx. 10 minutes",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "2", commonName: "Ande", englishName: "eggs" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "1/4 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1 tsp", commonName: "Tel", englishName: "cooking oil" },
    ],
    method: [
      { step: 1, instruction: "Crack the eggs into a bowl and beat them until smooth." },
      { step: 2, instruction: "Mix in onion, green chilli, coriander, red chilli powder and salt." },
      { step: 3, instruction: "Heat the tawa on medium heat and spread the oil." },
      { step: 4, instruction: "Pour in the egg mixture and spread it gently into an even layer." },
      { step: 5, instruction: "Cook for 1 to 2 minutes until the edges set, then loosen them with a spatula." },
      { step: 6, instruction: "Fold the omelette and cook for another 30 seconds. Serve hot." },
    ],
    notes: ["Add chopped tomato or grated cheese for a different home-style omelette."]
  },

  "boiled eggs": {
    dishName: "Boiled Eggs",
    description:
      "Simple boiled eggs with a soft, medium or hard centre, made on the stove in one pot.",
    prepTime: "Approx. 12 minutes",
    equipment: [

      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "4", commonName: "Ande", englishName: "eggs" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
      { amount: "optional", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Place the eggs in a pan and add enough water to cover them by about 2 cm." },
      { step: 2, instruction: "Bring the water to a full boil over medium-high heat." },
      { step: 3, instruction: "For hard-boiled eggs, boil for 9 to 10 minutes after the water starts boiling." },
      { step: 4, instruction: "Turn off the stove and place the eggs in cool water for 5 minutes." },
      { step: 5, instruction: "Tap the shells gently, peel the eggs and serve." },
    ],
    notes: ["For softer yolks, reduce the boiling time by 2 to 3 minutes."]
  },

  "veg sandwich": {
    dishName: "Veg Sandwich",
    description:
      "An easy Indian vegetable sandwich with chutney, cucumber, tomato, onion and lightly toasted bread.",
    prepTime: "Approx. 15 minutes",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "4 slices", commonName: "Bread", englishName: "bread" },
      { amount: "2 tbsp", commonName: "Hari Chutney", englishName: "green chutney" },
      { amount: "1 small", commonName: "Kheera", englishName: "cucumber, thinly sliced" },
      { amount: "1 small", commonName: "Tamatar", englishName: "tomato, thinly sliced" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, thinly sliced" },
      { amount: "1 small", commonName: "Aloo", englishName: "boiled potato, sliced" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1 tbsp", commonName: "Makhan", englishName: "butter" },
    ],
    method: [
      { step: 1, instruction: "Spread green chutney on one side of each bread slice." },
      { step: 2, instruction: "Layer potato, cucumber, tomato and onion on two slices." },
      { step: 3, instruction: "Sprinkle chaat masala over the vegetables and close the sandwiches." },
      { step: 4, instruction: "Heat the tawa and melt a little butter." },
      { step: 5, instruction: "Toast the sandwiches on both sides until lightly crisp and golden." },
      { step: 6, instruction: "Cut and serve hot with chutney or ketchup." },
    ],
    notes: []
  },

  "paneer sandwich": {
    dishName: "Paneer Sandwich",
    description:
      "A quick toasted sandwich filled with crumbled paneer, onion, capsicum and mild Indian spices.",
    prepTime: "Approx. 20 minutes",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "4 slices", commonName: "Bread", englishName: "bread" },
      { amount: "150 g", commonName: "Paneer", englishName: "crumbled paneer" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1/2", commonName: "Shimla Mirch", englishName: "capsicum, finely chopped" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 tbsp", commonName: "Makhan", englishName: "butter" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and cook onion and capsicum for 2 to 3 minutes." },
      { step: 2, instruction: "Add paneer, turmeric, red chilli powder, chaat masala and salt. Mix well." },
      { step: 3, instruction: "Cook for 2 minutes, then turn off the stove." },
      { step: 4, instruction: "Butter the bread slices and place the paneer filling between two slices." },
      { step: 5, instruction: "Toast the sandwiches on a hot tawa until crisp and golden on both sides." },
      { step: 6, instruction: "Cut and serve hot." },
    ],
    notes: ["Add grated cheese if you want a richer sandwich."]
  },

  "besan chila": {
    dishName: "Besan Chila",
    description:
      "A quick savoury pancake made with gram flour, onion, green chilli and spices, cooked on a tawa.",
    prepTime: "Approx. 20 minutes",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
    ],
    method: [
      { step: 1, instruction: "Mix besan, turmeric, ajwain, salt, onion, chilli and coriander in a bowl." },
      { step: 2, instruction: "Add water little by little and make a smooth, medium-thick batter." },
      { step: 3, instruction: "Heat the tawa on medium heat and lightly grease it with oil." },
      { step: 4, instruction: "Pour a ladle of batter and spread it into a thin round chila." },
      { step: 5, instruction: "Cook until the top looks set and the bottom is golden." },
      { step: 6, instruction: "Flip, cook the other side for 1 to 2 minutes and serve hot." },
    ],
    notes: ["Add grated carrot, tomato or spinach for extra vegetables."]
  },

  "pongal (ven pongal)": {
    dishName: "Pongal (Ven Pongal)",
    description:
      "A soft South Indian rice and moong dal dish cooked with ginger, pepper, cumin and ghee.",
    prepTime: "Approx. 30 minutes",
    equipment: [

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "1/2 cup", commonName: "Chawal", englishName: "rice" },
      { amount: "1/2 cup", commonName: "Moong Dal", englishName: "split yellow moong dal" },
      { amount: "4 cups", commonName: "Paani", englishName: "water" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 tsp", commonName: "Kali Mirch", englishName: "whole black peppercorns" },
      { amount: "1 inch", commonName: "Adrak", englishName: "ginger, chopped" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "2 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Rinse the rice and moong dal together until the water is mostly clear." },
      { step: 2, instruction: "Add rice, dal, water and salt to the cooker." },
      { step: 3, instruction: "Cook for 3 to 4 whistles until the rice and dal are very soft." },
      { step: 4, instruction: "Heat ghee in the cooker after opening it. Add cumin, pepper, ginger, curry leaves and hing." },
      { step: 5, instruction: "Cook for 30 seconds, then mix the tempering into the soft rice and dal." },
      { step: 6, instruction: "Add a little hot water if needed, mix until creamy and serve hot." },
    ],
    notes: ["Pongal should be soft and moist, not dry. Add a little hot water before serving if it thickens."]
  },

  "chole chawal": {
    dishName: "Chole Chawal",
    description:
      "Spiced Punjabi-style chickpeas served with fluffy basmati rice, made simply in one home kitchen.",
    prepTime: "Approx. 50 minutes (plus overnight soaking)",
    equipment: [

      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Kabuli Chana", englishName: "white chickpeas, soaked overnight" },
      { amount: "1 cup", commonName: "Basmati Chawal", englishName: "basmati rice" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "2 tsp", commonName: "Chole Masala", englishName: "chole masala powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
    ],
    method: [
      { step: 1, instruction: "Pressure cook the soaked chickpeas with 2 cups water and a little salt for 5 to 6 whistles." },
      { step: 2, instruction: "Rinse the rice. Add it to a pot with 2 cups water and a little salt, then cook covered until fluffy." },
      { step: 3, instruction: "Heat oil in a kadai. Add cumin and let it sizzle." },
      { step: 4, instruction: "Add onion and cook until golden. Add ginger-garlic paste and cook for 30 seconds." },
      { step: 5, instruction: "Add tomatoes, turmeric and chole masala. Cook until the tomatoes turn soft." },
      { step: 6, instruction: "Add the cooked chickpeas with some cooking water and simmer for 10 minutes." },
      { step: 7, instruction: "Taste for salt, turn off the stove and serve the chole with the cooked rice." },
    ],
    notes: []
  },

  "kadhi chawal": {
    dishName: "Kadhi Chawal",
    description:
      "A comforting North Indian yogurt and gram flour kadhi served with simple steamed rice.",
    prepTime: "Approx. 45 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "3 tbsp", commonName: "Besan", englishName: "gram flour" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "1 cup", commonName: "Chawal", englishName: "rice" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/4 tsp", commonName: "Methi", englishName: "fenugreek seeds" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1", commonName: "Sukhi Lal Mirch", englishName: "dried red chilli" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Whisk yogurt, besan, turmeric, salt and water until completely smooth." },
      { step: 2, instruction: "Pour the mixture into a kadai and cook on medium heat, stirring often." },
      { step: 3, instruction: "Let it come to a gentle simmer, then cook for 20 to 25 minutes until slightly thick." },
      { step: 4, instruction: "Cook the rice separately until soft and fluffy." },
      { step: 5, instruction: "For the tadka, heat oil and add mustard, cumin, fenugreek, hing, dried chilli and curry leaves." },
      { step: 6, instruction: "Sizzle for a few seconds and pour the tadka into the kadhi." },
      { step: 7, instruction: "Serve the hot kadhi over steamed rice." },
    ],
    notes: ["Keep the kadhi simmering gently. Hard boiling can make the yogurt split." ]
  },

  "bread pakoda": {
    dishName: "Bread Pakoda",
    description:
      "Crispy bread slices coated in a simple besan batter and shallow or deep fried at home.",
    prepTime: "Approx. 25 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "6 slices", commonName: "Bread", englishName: "bread" },
      { amount: "1 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
      { amount: "as needed", commonName: "Tel", englishName: "cooking oil, for frying" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "optional", commonName: "Aloo", englishName: "boiled potato filling" },
    ],
    method: [
      { step: 1, instruction: "Mix besan, ajwain, chilli powder, turmeric and salt." },
      { step: 2, instruction: "Add water little by little to make a smooth batter that coats the bread." },
      { step: 3, instruction: "Spread the optional potato filling on bread and close with another slice." },
      { step: 4, instruction: "Heat oil in a kadai on medium heat." },
      { step: 5, instruction: "Dip each sandwich or bread slice in the batter and gently lower it into the hot oil." },
      { step: 6, instruction: "Fry until crisp and golden on both sides, then drain and serve hot." },
    ],
    notes: ["For a lighter version, cook the battered bread on a lightly oiled tawa instead of deep frying."]
  },

  "kachori (moong dal kachori)": {
    dishName: "Kachori (Moong Dal Kachori)",
    description:
      "Crisp flaky kachori filled with a mildly spiced roasted moong dal mixture, made at home with a kadai.",
    prepTime: "Approx. 1 hour",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "1/2 cup", commonName: "Moong Dal", englishName: "yellow moong dal, soaked 1 hour" },
      { amount: "1 tsp", commonName: "Saunf", englishName: "fennel seeds" },
      { amount: "1 tsp", commonName: "Dhaniya", englishName: "coriander seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "4 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
      { amount: "as needed", commonName: "Tel", englishName: "cooking oil, for frying" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix maida, 3 tablespoons ghee and salt. Add water gradually and make a firm dough. Rest for 20 minutes." },
      { step: 2, instruction: "Drain the soaked dal and grind it coarsely in a grinder without making a smooth paste." },
      { step: 3, instruction: "Heat 1 tablespoon ghee in a kadai. Add cumin, fennel and coriander seeds." },
      { step: 4, instruction: "Add the ground dal, chilli powder and amchur. Cook until the mixture is dry and fragrant. Cool it." },
      { step: 5, instruction: "Divide the dough and filling into small portions. Flatten each dough ball, fill and seal." },
      { step: 6, instruction: "Gently flatten each kachori and keep the edges slightly thicker." },
      { step: 7, instruction: "Fry the kachoris in medium-hot oil on low to medium heat until puffed and golden." },
      { step: 8, instruction: "Drain well and serve warm." },
    ],
    notes: ["Keep the oil at medium heat. Very hot oil can brown the outside before the kachori cooks through."]
  },

  "bhel puri": {
    dishName: "Bhel Puri",
    description:
      "A crunchy Mumbai-style snack made with puffed rice, vegetables, chutneys and sev, easy to assemble at home.",
    prepTime: "Approx. 10 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "4 cups", commonName: "Murmura", englishName: "puffed rice" },
      { amount: "1/2 cup", commonName: "Sev", englishName: "sev" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 small", commonName: "Tamatar", englishName: "tomato, finely chopped" },
      { amount: "1 small", commonName: "Aloo", englishName: "boiled potato, chopped" },
      { amount: "2 tbsp", commonName: "Hari Chutney", englishName: "green chutney" },
      { amount: "2 tbsp", commonName: "Imli Chutney", englishName: "tamarind chutney" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1", commonName: "Nimbu", englishName: "lemon" },
    ],
    method: [
      { step: 1, instruction: "Dry roast the puffed rice in a kadai on low heat for 2 to 3 minutes so it stays crisp." },
      { step: 2, instruction: "Let it cool for a minute, then add onion, tomato and boiled potato." },
      { step: 3, instruction: "Add green chutney, tamarind chutney and chaat masala." },
      { step: 4, instruction: "Squeeze in lemon juice and toss everything quickly." },
      { step: 5, instruction: "Top with sev and serve immediately." },
    ],
    notes: ["Mix the chutneys just before eating so the puffed rice stays crunchy."]
  },

  "paneer tikka": {
    dishName: "Paneer Tikka",
    description:
      "Easy home-style paneer tikka marinated in yogurt and spices, then cooked on a hot tawa until lightly charred.",
    prepTime: "Approx. 30 minutes (plus 20 minutes marination)",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "250 g", commonName: "Paneer", englishName: "paneer, cubed" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "thick yogurt" },
      { amount: "1/2", commonName: "Shimla Mirch", englishName: "capsicum, cubed" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, cubed" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix yogurt, chilli powder, turmeric, garam masala, coriander powder, lemon juice and salt." },
      { step: 2, instruction: "Add paneer, capsicum and onion. Mix gently and rest for 20 minutes." },
      { step: 3, instruction: "Heat the tawa and spread a little oil." },
      { step: 4, instruction: "Place the marinated paneer and vegetables on the hot tawa." },
      { step: 5, instruction: "Cook on medium-high heat, turning gently, until the paneer and vegetables get light char marks." },
      { step: 6, instruction: "Serve hot with lemon wedges or chutney." },
    ],
    notes: ["Do not cook paneer for too long or it can become firm and chewy."]
  },

  "rasam rice": {
    dishName: "Rasam Rice",
    description:
      "Comforting steamed rice mixed with a thin, tangy tomato rasam and a simple South Indian tempering.",
    prepTime: "Approx. 30 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Chawal", englishName: "rice" },
      { amount: "2", commonName: "Tamatar", englishName: "tomatoes" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Kali Mirch", englishName: "black pepper, crushed" },
      { amount: "1/2 tsp", commonName: "Rasam Powder", englishName: "rasam powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1", commonName: "Sukhi Lal Mirch", englishName: "dried red chilli" },
      { amount: "1 tsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Cook the rice until soft and keep it warm." },
      { step: 2, instruction: "Crush the tomatoes and add them to a kadai with water, turmeric, rasam powder and salt." },
      { step: 3, instruction: "Simmer for 8 to 10 minutes until the tomatoes soften and the rasam smells fragrant." },
      { step: 4, instruction: "Add tamarind pulp, cumin and crushed pepper. Simmer for 2 more minutes." },
      { step: 5, instruction: "Heat ghee in a small kadai and add mustard, dried chilli and curry leaves." },
      { step: 6, instruction: "Pour the tadka into the rasam and turn off the stove." },
      { step: 7, instruction: "Mix hot rice with rasam and serve immediately." },
    ],
    notes: ["Keep rasam thin and pourable. Add hot water if it gets too concentrated."]
  },

  "chicken kabab": {
    dishName: "Chicken Kabab",
    description:
      "Juicy home-style chicken kababs marinated in yogurt and spices, then cooked on a tawa until lightly charred.",
    prepTime: "Approx. 35 minutes (plus 30 minutes marination)",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "500 g", commonName: "Chicken", englishName: "boneless chicken, small pieces" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "yogurt" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tbsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix yogurt, ginger-garlic paste, chilli powder, turmeric, garam masala, coriander, lemon and salt." },
      { step: 2, instruction: "Add chicken and coat well. Marinate for 30 minutes." },
      { step: 3, instruction: "Heat the tawa and spread a little oil." },
      { step: 4, instruction: "Place the chicken pieces on the hot tawa without crowding them." },
      { step: 5, instruction: "Cook on medium heat, turning every few minutes, until browned and fully cooked inside." },
      { step: 6, instruction: "Serve hot with lemon and onion." },
    ],
    notes: ["Cut the chicken into similar sizes so all pieces cook evenly."]
  },

  "seekh kabab": {
    dishName: "Seekh Kabab",
    description:
      "Juicy spiced minced-meat seekh kababs made at home without a tandoor, shaped and cooked on a tawa.",
    prepTime: "Approx. 40 minutes (plus 20 minutes resting)",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "500 g", commonName: "Chicken Keema", englishName: "chicken mince" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin powder" },
      { amount: "1 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "1 tbsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix chicken mince, onion, chilli, ginger-garlic paste, spices, coriander, lemon and salt." },
      { step: 2, instruction: "Mix firmly until the mixture becomes sticky, then rest it for 20 minutes." },
      { step: 3, instruction: "Wet your hands and shape the mixture into long, flat kababs." },
      { step: 4, instruction: "Heat a tawa and lightly oil it." },
      { step: 5, instruction: "Place the kababs on the hot tawa and cook on medium heat, turning gently." },
      { step: 6, instruction: "Cook until browned outside and fully cooked inside. Serve hot." },
    ],
    notes: ["Keep the mixture cold and handle it gently so the kababs hold their shape."]
  },

  "mutton kabab": {
    dishName: "Mutton Kabab",
    description:
      "Simple home-style minced mutton kababs seasoned with ginger, chilli and warm spices, cooked on a tawa.",
    prepTime: "Approx. 45 minutes (plus 20 minutes resting)",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "500 g", commonName: "Mutton Keema", englishName: "mutton mince" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
      { amount: "1 tbsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix mutton mince with onion, ginger-garlic paste, chilli, spices, coriander, lemon and salt." },
      { step: 2, instruction: "Grind the mixture briefly so it becomes sticky and binds well. Rest for 20 minutes." },
      { step: 3, instruction: "Shape the mixture into small flat kababs with wet hands." },
      { step: 4, instruction: "Heat the tawa on medium heat and lightly oil it." },
      { step: 5, instruction: "Cook the kababs slowly, turning carefully, until browned and cooked through." },
      { step: 6, instruction: "Serve hot with onion and lemon." },
    ],
    notes: ["Mutton mince should be cooked completely before serving. Keep the heat moderate so the centre cooks without burning the outside."]
  },

  "chicken salami (home style)": {
    dishName: "Chicken Salami (Home-Style)",
    description:
      "A quick home-style spiced chicken slice inspired by deli salami, cooked fully on a tawa rather than cured.",
    prepTime: "Approx. 30 minutes",
    equipment: [

      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "300 g", commonName: "Chicken", englishName: "boneless chicken" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Kali Mirch", englishName: "black pepper" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tbsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 tbsp", commonName: "Cornflour", englishName: "cornflour" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Grind the chicken with ginger-garlic paste, pepper, chilli, coriander, lemon and salt until finely minced." },
      { step: 2, instruction: "Mix in cornflour until the mixture becomes firm enough to shape." },
      { step: 3, instruction: "Shape the mixture into a short thick log and chill for 10 minutes." },
      { step: 4, instruction: "Slice the log into thin rounds." },
      { step: 5, instruction: "Heat a lightly oiled tawa and cook the slices on medium heat." },
      { step: 6, instruction: "Turn them until browned on both sides and fully cooked through. Serve hot or use in sandwiches." },
    ],
    notes: ["This is a quick home-style chicken preparation, not cured salami. Cook it completely before eating."]
  },

  "paneer curry": {
    dishName: "Paneer Curry",
    description:
      "An easy everyday paneer curry with onion, tomato, ginger, garlic and mild spices in a simple gravy.",
    prepTime: "Approx. 30 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "250 g", commonName: "Paneer", englishName: "paneer, cubed" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai. Add onion and cook until soft and lightly golden." },
      { step: 2, instruction: "Add ginger-garlic paste and cook for 30 seconds." },
      { step: 3, instruction: "Add tomatoes, turmeric, chilli powder, coriander powder and salt." },
      { step: 4, instruction: "Cook until the tomatoes are soft and the oil begins to separate." },
      { step: 5, instruction: "Add water and simmer for 5 minutes to make a smooth gravy." },
      { step: 6, instruction: "Add paneer and garam masala. Simmer gently for 3 to 4 minutes." },
      { step: 7, instruction: "Turn off the stove and serve hot with roti, naan or rice." },
    ],
    notes: ["Do not boil the paneer for too long. A short simmer keeps it soft."]
  },

  "chicken keema": {
    dishName: "Chicken Keema",
    description:
      "A simple dry-style minced chicken dish cooked with onion, tomato, ginger, garlic and everyday spices.",
    prepTime: "Approx. 30 minutes",
    equipment: [

      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    
    ],
    ingredients: [
      { amount: "500 g", commonName: "Chicken Keema", englishName: "chicken mince" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and cook onion until lightly golden." },
      { step: 2, instruction: "Add ginger-garlic paste and green chilli. Cook for 30 seconds." },
      { step: 3, instruction: "Add tomatoes, turmeric, coriander powder, chilli powder and salt." },
      { step: 4, instruction: "Cook until the tomatoes become soft and the oil starts to separate." },
      { step: 5, instruction: "Add chicken keema and break it up with the spoon as it cooks." },
      { step: 6, instruction: "Cook for 8 to 10 minutes, then add water and simmer until the keema is fully cooked." },
      { step: 7, instruction: "Add garam masala and coriander. Cook for 1 minute and serve hot." },
    ],
    notes: ["Keep breaking up the mince while cooking so the keema stays loose and evenly cooked."]
  },


  "aloo tamatar sabzi": {
    dishName: "Aloo Tamatar Sabzi",
    description: "A simple everyday potato and tomato curry made with basic spices, perfect with roti, puri or rice.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 medium", commonName: "Aloo", englishName: "potatoes, peeled and cubed" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add onion and green chilli. Cook until the onion turns soft." },
      { step: 3, instruction: "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until mushy." },
      { step: 4, instruction: "Add potato cubes and mix well so they are coated with the masala." },
      { step: 5, instruction: "Pour in water, cover and cook on medium heat until the potatoes are tender." },
      { step: 6, instruction: "Lightly mash a few potatoes to thicken the gravy. Add garam masala." },
      { step: 7, instruction: "Garnish with coriander and serve hot with roti, puri or rice." },
    ],
    notes: ["Mash a few cooked potatoes into the gravy for a naturally thicker curry without adding flour."]
  },

  "kadhi": {
    dishName: "Kadhi",
    description: "A simple Punjabi-style yogurt and gram-flour curry with a tangy, creamy texture and gentle spices.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1/4 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Methi Dana", englishName: "fenugreek seeds" },
      { amount: "1", commonName: "Sukhi Lal Mirch", englishName: "dried red chilli" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/4 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Tel ya Ghee", englishName: "oil or ghee" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Whisk yogurt, besan and water until completely smooth." },
      { step: 2, instruction: "Heat oil in a kadai. Add cumin, fenugreek seeds and dried chilli." },
      { step: 3, instruction: "Add onion and cook until soft. Add ginger-garlic paste and cook for 1 minute." },
      { step: 4, instruction: "Add turmeric, coriander powder and chilli powder. Stir for 20 seconds." },
      { step: 5, instruction: "Pour in the yogurt mixture slowly while stirring constantly." },
      { step: 6, instruction: "Bring to a gentle boil, then simmer for 20 to 25 minutes. Stir every few minutes." },
      { step: 7, instruction: "Add salt, garnish with coriander and serve hot with rice or roti.", tip: { title: "Prevent curdling", content: "Keep stirring until the kadhi starts simmering. Avoid high heat at the beginning." } },
    ],
    notes: ["This is a plain kadhi without pakoras, so it is faster and easier for an everyday meal."]
  },

  "mushroom masala": {
    dishName: "Mushroom Masala",
    description: "Mushrooms cooked in a simple onion-tomato masala with everyday Indian spices.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "250 g", commonName: "Mushroom", englishName: "button mushrooms, sliced" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and sauté mushrooms on medium-high heat for 4 to 5 minutes. Set aside." },
      { step: 2, instruction: "Add cumin seeds, then onion. Cook until golden." },
      { step: 3, instruction: "Add ginger-garlic paste and green chilli. Cook for 30 seconds." },
      { step: 4, instruction: "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until soft." },
      { step: 5, instruction: "Add water and cook the masala for 3 to 4 minutes until slightly thick." },
      { step: 6, instruction: "Add the mushrooms and simmer for 5 minutes so they absorb the masala." },
      { step: 7, instruction: "Add garam masala, garnish with coriander and serve hot." },
    ],
    notes: ["Do not overcook mushrooms. They should stay tender instead of becoming rubbery."]
  },

  "palak mushroom": {
    dishName: "Palak Mushroom",
    description: "Tender mushrooms cooked in a smooth spinach gravy with mild Indian spices.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "250 g", commonName: "Mushroom", englishName: "button mushrooms, sliced" },
      { amount: "250 g", commonName: "Palak", englishName: "spinach leaves" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1 tsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
    ],
    method: [
      { step: 1, instruction: "Cook spinach and green chillies in a covered pan for 2 to 3 minutes until wilted." },
      { step: 2, instruction: "Cool slightly, then blend the spinach into a smooth puree." },
      { step: 3, instruction: "Heat oil in a kadai and cook mushrooms for 4 to 5 minutes. Set aside." },
      { step: 4, instruction: "Add cumin, onion and ginger-garlic paste. Cook until the onion softens." },
      { step: 5, instruction: "Add turmeric, coriander powder, salt and the spinach puree." },
      { step: 6, instruction: "Simmer for 5 minutes, then add mushrooms and garam masala." },
      { step: 7, instruction: "Cook for 2 more minutes, turn off the stove and add lemon juice." },
    ],
    notes: ["A quick blend keeps the spinach bright and makes the gravy easy to follow and eat."]
  },

  "aloo matar": {
    dishName: "Aloo Matar",
    description: "A simple potato and green pea curry with a light onion-tomato gravy for an everyday meal.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 medium", commonName: "Aloo", englishName: "potatoes, cubed" },
      { amount: "1 cup", commonName: "Matar", englishName: "green peas, fresh or frozen" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add onion and ginger-garlic paste. Cook until lightly golden." },
      { step: 3, instruction: "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until soft." },
      { step: 4, instruction: "Add potatoes and peas. Mix well." },
      { step: 5, instruction: "Add water, cover and cook until the potatoes are tender." },
      { step: 6, instruction: "Mash one or two potato pieces into the gravy to thicken it." },
      { step: 7, instruction: "Add garam masala and serve hot with roti, puri or rice." },
    ],
    notes: ["Frozen peas work well when fresh peas are not available."]
  },

  "dal palak": {
    dishName: "Dal Palak",
    description: "Comforting lentils cooked with spinach, tomato and simple spices for an easy everyday meal.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1/2 cup", commonName: "Moong Dal", englishName: "split yellow moong dal" },
      { amount: "2 cups", commonName: "Palak", englishName: "spinach, chopped" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tbsp", commonName: "Ghee ya Tel", englishName: "ghee or oil" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1 tsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
    ],
    method: [
      { step: 1, instruction: "Rinse the dal and add it to a cooker with turmeric and 2 cups water." },
      { step: 2, instruction: "Cook for 2 to 3 whistles. Let the pressure release, then lightly mash the dal." },
      { step: 3, instruction: "Heat ghee in a kadai and add cumin seeds." },
      { step: 4, instruction: "Add ginger-garlic paste, green chilli and tomato. Cook until soft." },
      { step: 5, instruction: "Add spinach, red chilli powder and salt. Cook until the spinach wilts." },
      { step: 6, instruction: "Add the cooked dal and simmer for 4 to 5 minutes." },
      { step: 7, instruction: "Turn off the stove, add lemon juice and serve with rice or roti." },
    ],
    notes: ["Spinach cooks quickly, so add it near the end to keep its fresh flavor."]
  },

  "lobia masala": {
    dishName: "Lobia Masala",
    description: "Black-eyed beans cooked in a simple tomato and spice gravy, ideal with rice or roti.",
    prepTime: "Approx. 45 minutes (plus soaking)",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Lobia", englishName: "black-eyed peas, soaked 2 hours" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "grated ginger" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1 tsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked lobia and add it to a cooker with 2.5 cups water and a little salt." },
      { step: 2, instruction: "Cook for 5 to 6 whistles until the lobia is soft. Save 1 cup cooking water." },
      { step: 3, instruction: "Heat oil in a kadai and add cumin seeds. Add onion and ginger. Cook until soft." },
      { step: 4, instruction: "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until mushy." },
      { step: 5, instruction: "Add the cooked lobia and 1 cup reserved water." },
      { step: 6, instruction: "Cover and simmer for 10 minutes until the gravy thickens." },
      { step: 7, instruction: "Add garam masala and lemon juice. Serve hot with rice or roti." },
    ],
    notes: ["Lobia should be fully soft before you add it to the masala."]
  },

  "aloo methi": {
    dishName: "Aloo Methi",
    description: "A dry everyday sabzi of potatoes and fresh fenugreek leaves with simple spices.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 medium", commonName: "Aloo", englishName: "potatoes, small cubes" },
      { amount: "2 cups", commonName: "Methi", englishName: "fresh fenugreek leaves, chopped" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add onion and green chilli. Cook until the onion softens." },
      { step: 3, instruction: "Add potatoes, turmeric, chilli powder and salt. Mix well." },
      { step: 4, instruction: "Cover and cook on low heat for 8 to 10 minutes, stirring once or twice." },
      { step: 5, instruction: "Add chopped methi and coriander powder. Mix well." },
      { step: 6, instruction: "Cook uncovered for 5 to 7 minutes until the potatoes are tender and the methi is cooked." },
      { step: 7, instruction: "Taste, adjust salt and serve hot with roti or paratha." },
    ],
    notes: ["Do not add much water. Aloo methi is meant to be a dry sabzi.", "A pinch of sugar can balance very bitter methi if needed."]
  },

  "gobi masala": {
    dishName: "Gobi Masala",
    description: "Cauliflower cooked in a simple onion-tomato masala for an easy home-style curry.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "400 g", commonName: "Gobi", englishName: "cauliflower florets" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Kasuri Methi", englishName: "dried fenugreek leaves, optional" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "3/4 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat 1 tablespoon oil in a kadai and sauté cauliflower until lightly golden. Set aside." },
      { step: 2, instruction: "Add the remaining oil and cumin seeds. Add onion and cook until golden." },
      { step: 3, instruction: "Add ginger-garlic paste and cook for 30 seconds." },
      { step: 4, instruction: "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until soft." },
      { step: 5, instruction: "Add water and cook the masala for 3 to 4 minutes." },
      { step: 6, instruction: "Add the cauliflower, cover and simmer until tender." },
      { step: 7, instruction: "Add garam masala and optional kasuri methi. Serve hot." },
    ],
    notes: ["You can skip the initial cauliflower sauté for a lighter version and simmer it directly in the masala."]
  },

  "kofta curry (lauki kofta)": {
    dishName: "Kofta Curry (Lauki Kofta)",
    description: "Soft bottle-gourd koftas cooked in a simple onion-tomato gravy, made fully on the stovetop.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Lauki", englishName: "bottle gourd, grated and squeezed dry" },
      { amount: "1/2 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix grated lauki, besan, ajwain, chilli powder, garam masala and salt into a firm mixture." },
      { step: 2, instruction: "Shape small balls and shallow-fry them in a kadai with oil until golden on all sides. Set aside." },
      { step: 3, instruction: "In the same kadai, add onion and ginger-garlic paste. Cook until soft." },
      { step: 4, instruction: "Add tomatoes, turmeric, coriander powder and salt. Cook until mushy." },
      { step: 5, instruction: "Add water and simmer the gravy for 5 minutes." },
      { step: 6, instruction: "Add the koftas and simmer gently for 4 to 5 minutes." },
      { step: 7, instruction: "Turn off the stove and serve hot with roti or rice.", tip: { title: "Keep koftas light", content: "Squeeze out as much water as possible from the grated lauki before adding besan." } },
    ],
    notes: ["Do not boil the koftas hard after adding them, or they can break apart."]
  },

  "malai kofta": {
    dishName: "Malai Kofta",
    description: "Soft paneer-potato koftas in a mild creamy tomato gravy, simplified for easy home cooking.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "200 g", commonName: "Paneer", englishName: "paneer, grated" },
      { amount: "1 medium", commonName: "Aloo", englishName: "potato, boiled and mashed" },
      { amount: "2 tbsp", commonName: "Cornflour", englishName: "cornstarch" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "8", commonName: "Kaju", englishName: "cashews, optional" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Kasuri Methi", englishName: "dried fenugreek leaves" },
      { amount: "2 tbsp", commonName: "Malai", englishName: "cream" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix grated paneer, mashed potato, cornflour, garam masala and salt." },
      { step: 2, instruction: "Shape small balls and shallow-fry in a kadai until golden. Set aside." },
      { step: 3, instruction: "Cook onion, tomatoes and ginger-garlic paste until soft. Cool slightly." },
      { step: 4, instruction: "Blend the cooked mixture with cashews and a little water." },
      { step: 5, instruction: "Heat a little oil, add turmeric, chilli powder and coriander powder, then add the puree." },
      { step: 6, instruction: "Add water and simmer for 8 minutes until smooth and slightly thick." },
      { step: 7, instruction: "Add cream, kasuri methi and salt. Gently add koftas and simmer for 2 minutes." },
      { step: 8, instruction: "Serve hot with roti, naan or rice.", tip: { title: "Optional nuts", content: "Skip cashews for a simpler gravy. The curry will still be creamy from the malai." } },
    ],
    notes: ["Keep the koftas slightly firm before adding them to the gravy so they hold their shape."]
  },

  "dum aloo": {
    dishName: "Dum Aloo",
    description: "Baby potatoes simmered in a spiced yogurt-tomato gravy, made easily on the stovetop.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Aloo", englishName: "baby potatoes" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "plain yogurt, whisked" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes" },
      { amount: "10", commonName: "Kaju", englishName: "cashews, optional" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Saunf Powder", englishName: "fennel powder" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Boil baby potatoes until almost tender. Cool, peel and prick them lightly with a fork." },
      { step: 2, instruction: "Shallow-fry the potatoes in a kadai until golden. Set aside." },
      { step: 3, instruction: "Cook onion, tomatoes, ginger-garlic paste and cashews until soft. Cool and blend smooth." },
      { step: 4, instruction: "Heat a little oil and add cumin, turmeric, chilli powder, coriander powder and fennel powder." },
      { step: 5, instruction: "Add the blended gravy and cook for 4 to 5 minutes." },
      { step: 6, instruction: "Lower the heat and slowly add whisked yogurt while stirring." },
      { step: 7, instruction: "Add water and potatoes. Cover and simmer for 8 to 10 minutes." },
      { step: 8, instruction: "Add garam masala, adjust salt and serve hot." },
    ],
    notes: ["If the yogurt is very sour, use a little less and balance the gravy with a pinch of sugar."]
  },

  "tori sabzi": {
    dishName: "Tori Sabzi",
    description: "A light everyday sabzi made with ridge gourd, onion and simple Indian spices.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Tori", englishName: "ridge gourd, peeled and chopped" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add onion and green chilli. Cook until soft." },
      { step: 3, instruction: "Add tomato, turmeric, coriander powder, chilli powder and salt. Cook until soft." },
      { step: 4, instruction: "Add chopped tori and mix well." },
      { step: 5, instruction: "Cover and cook on medium-low heat until the tori is tender. No extra water is usually needed." },
      { step: 6, instruction: "Cook uncovered for 2 to 3 minutes if excess water remains." },
      { step: 7, instruction: "Add garam masala and serve hot with roti." },
    ],
    notes: ["Tori releases water as it cooks, so add extra water only if the kadai becomes dry."]
  },

  "moong dal": {
    dishName: "Moong Dal",
    description: "A quick yellow moong dal with a simple cumin-garlic tadka, perfect for rice or roti.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Moong Dal", englishName: "split yellow moong dal" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2 cloves", commonName: "Lehsun", englishName: "garlic, chopped" },
      { amount: "1", commonName: "Sukhi Lal Mirch", englishName: "dried red chilli" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1/4 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Ghee ya Tel", englishName: "ghee or oil" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Rinse the dal and add it to a cooker with turmeric, tomato, green chilli and 2.5 cups water." },
      { step: 2, instruction: "Cook for 2 whistles and let the pressure release." },
      { step: 3, instruction: "Lightly mash the dal and add salt. Add hot water if it is too thick." },
      { step: 4, instruction: "Heat ghee in a kadai and add cumin, garlic and dried chilli." },
      { step: 5, instruction: "When the garlic turns golden, turn the heat low and add hing and chilli powder." },
      { step: 6, instruction: "Pour the tadka over the dal and simmer for 2 minutes." },
      { step: 7, instruction: "Serve hot with rice, roti or jeera rice." },
    ],
    notes: ["Moong dal cooks quickly, so avoid overcooking it into a very thick paste."]
  },

  "masoor dal": {
    dishName: "Masoor Dal",
    description: "A fast red lentil dal made with tomatoes, cumin and garlic using basic pantry ingredients.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Masoor Dal", englishName: "red lentils" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2 cloves", commonName: "Lehsun", englishName: "garlic, chopped" },
      { amount: "1", commonName: "Sukhi Lal Mirch", englishName: "dried red chilli" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Ghee ya Tel", englishName: "ghee or oil" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1 tsp", commonName: "Kasuri Methi", englishName: "dried fenugreek leaves, optional" },
    ],
    method: [
      { step: 1, instruction: "Rinse masoor dal and add it to a cooker with tomatoes, turmeric, chilli and 2.5 cups water." },
      { step: 2, instruction: "Cook for 2 whistles and let the pressure release." },
      { step: 3, instruction: "Mash the dal lightly and add salt." },
      { step: 4, instruction: "Heat ghee in a kadai. Add cumin, garlic and dried chilli." },
      { step: 5, instruction: "When the garlic turns golden, lower the heat and add hing and chilli powder." },
      { step: 6, instruction: "Pour the tadka into the dal. Add optional kasuri methi and simmer for 2 minutes." },
      { step: 7, instruction: "Serve hot with rice or roti." },
    ],
    notes: ["Masoor dal is naturally quick-cooking, so it is a good option when you need dinner fast."]
  },

  "dal baati": {
    dishName: "Dal Baati",
    description: "A simple Rajasthani meal of baked whole-wheat baati served with spiced mixed dal and ghee.",
    prepTime: "Approx. 1 hour 15 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "oven", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Atta", englishName: "whole wheat flour" },
      { amount: "2 tbsp", commonName: "Suji", englishName: "semolina" },
      { amount: "3 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "1/3 cup", commonName: "Dahi", englishName: "yogurt" },
      { amount: "1/2 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "1/2 cup", commonName: "Moong Dal", englishName: "split yellow moong dal" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tbsp", commonName: "Adrak", englishName: "grated ginger" },
      { amount: "2 tbsp", commonName: "Ghee", englishName: "ghee for serving" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix atta, suji, 2 tablespoons ghee, salt and yogurt. Add water and make a firm dough. Rest 15 minutes." },
      { step: 2, instruction: "Divide the dough into 6 balls and press each one slightly flat. Make a small dent in the centre." },
      { step: 3, instruction: "Bake the baatis at 200°C for 25 to 30 minutes, turning once halfway." },
      { step: 4, instruction: "Rinse both dals and add them to a cooker with turmeric, salt and 3 cups water. Cook for 3 to 4 whistles." },
      { step: 5, instruction: "Lightly mash the cooked dal and keep it aside." },
      { step: 6, instruction: "Heat ghee in a kadai. Add cumin and ginger, then chilli and coriander powder." },
      { step: 7, instruction: "Add the cooked dal and simmer for 5 minutes. Adjust the consistency with hot water." },
      { step: 8, instruction: "Crack the hot baatis slightly and pour ghee over them." },
      { step: 9, instruction: "Serve baati with dal and extra ghee if desired." },
    ],
    notes: ["The oven gives a crisp outer crust while keeping the baati soft inside. Serve immediately for the best texture."]
  },

  "dahi vada": {
    dishName: "Dahi Vada",
    description: "Soft urad dal vadas soaked in yogurt and topped with simple spices and optional chutneys.",
    prepTime: "Approx. 45 minutes (plus soaking)",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Urad Dal", englishName: "whole or split urad dal, soaked 5 to 6 hours" },
      { amount: "2 cups", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 inch", commonName: "Adrak", englishName: "ginger" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1/2 tsp", commonName: "Bhuna Jeera Powder", englishName: "roasted cumin powder" },
      { amount: "1/2 cup", commonName: "Imli Chutney", englishName: "tamarind chutney, optional" },
      { amount: "1/2 cup", commonName: "Hari Chutney", englishName: "green chutney, optional" },
      { amount: "as needed", commonName: "Tel", englishName: "oil for frying" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked dal and blend with ginger, green chilli, cumin, hing and a little cold water until fluffy." },
      { step: 2, instruction: "Heat oil in a kadai. Drop small portions of batter and fry on medium heat until golden." },
      { step: 3, instruction: "Soak the hot vadas in warm water for 15 minutes." },
      { step: 4, instruction: "Gently press each vada between your palms to remove excess water." },
      { step: 5, instruction: "Whisk yogurt with salt until smooth and lightly pourable." },
      { step: 6, instruction: "Add the vadas to the yogurt and chill for at least 1 hour." },
      { step: 7, instruction: "Top with chaat masala, roasted cumin, and optional chutneys." },
      { step: 8, instruction: "Serve chilled.", tip: { title: "Keep them soft", content: "Do not make the batter watery. A thick, fluffy batter gives softer vadas." } },
    ],
    notes: ["The chutneys are optional for a simpler home version."]
  },

  "thepla": {
    dishName: "Thepla",
    description: "Soft Gujarati methi flatbreads made with atta, spices and fresh fenugreek leaves.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Atta", englishName: "whole wheat flour" },
      { amount: "3 tbsp", commonName: "Besan", englishName: "gram flour" },
      { amount: "1 cup", commonName: "Methi", englishName: "fenugreek leaves, finely chopped" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "grated ginger" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil for dough" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil for cooking" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix atta, besan, methi, spices, ginger, chilli, yogurt and salt." },
      { step: 2, instruction: "Add a little water and knead into a soft dough. Add 1 tablespoon oil and knead again." },
      { step: 3, instruction: "Rest the dough for 15 minutes, then divide into small balls." },
      { step: 4, instruction: "Roll each ball into a medium-thin round. Keep the thickness even." },
      { step: 5, instruction: "Heat a tawa and cook the thepla until small bubbles appear. Flip." },
      { step: 6, instruction: "Cook the other side until golden spots appear. Drizzle a little oil on both sides." },
      { step: 7, instruction: "Serve hot with yogurt or pickle.", tip: { title: "Keep them soft", content: "Do not roll the thepla too thin, and keep the tawa at medium heat." } },
    ],
    notes: ["You can skip methi to make a plain spiced thepla."]
  },

  "matar pulao": {
    dishName: "Matar Pulao",
    description: "A fragrant one-pot basmati rice dish with green peas and whole spices, easy for lunch or dinner.",
    prepTime: "Approx. 35 minutes (plus 15 minutes soaking)",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Basmati Chawal", englishName: "basmati rice, soaked 15 minutes" },
      { amount: "1 cup", commonName: "Matar", englishName: "green peas" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, sliced" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "1 inch", commonName: "Dalchini", englishName: "cinnamon" },
      { amount: "3", commonName: "Laung", englishName: "cloves" },
      { amount: "2", commonName: "Elaichi", englishName: "green cardamom pods" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1.5 tbsp", commonName: "Ghee ya Tel", englishName: "ghee or oil" },
      { amount: "2 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked rice well." },
      { step: 2, instruction: "Heat ghee in a kadai and add bay leaf, cinnamon, cloves and cardamom." },
      { step: 3, instruction: "Add onion and cook until lightly golden. Add ginger-garlic paste." },
      { step: 4, instruction: "Add peas and cook for 2 minutes." },
      { step: 5, instruction: "Add rice and gently mix for 1 minute." },
      { step: 6, instruction: "Add water and salt. Bring to a boil." },
      { step: 7, instruction: "Cover, lower the heat and cook for 12 to 15 minutes." },
      { step: 8, instruction: "Rest covered for 5 minutes, then fluff gently and serve." },
    ],
    notes: ["Do not stir the rice while it cooks. This helps keep the grains separate."]
  },

  "kothu parotta": {
    dishName: "Kothu Parotta",
    description: "Shredded parotta stir-fried with onion, tomato, curry leaves and spices in an easy home-style version.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4", commonName: "Parotta", englishName: "cooked parottas or parathas" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/4 tsp", commonName: "Saunf Powder", englishName: "fennel powder" },
      { amount: "1 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1/4 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Tear cooked parottas into small pieces." },
      { step: 2, instruction: "Heat oil in a kadai. Add mustard seeds, curry leaves and green chilli." },
      { step: 3, instruction: "Add onion and cook until soft. Add tomato and salt." },
      { step: 4, instruction: "Cook until the tomato breaks down, then add chilli powder, garam masala and fennel powder." },
      { step: 5, instruction: "Add water and cook until the masala is moist but not watery." },
      { step: 6, instruction: "Add the shredded parotta and toss well on medium heat." },
      { step: 7, instruction: "Cook for 2 to 3 minutes, add coriander and serve hot." },
    ],
    notes: ["Leftover roti, paratha or parotta works very well for this recipe."]
  },

  "patta gobhi sabzi": {
    dishName: "Patta Gobhi Sabzi",
    description: "A simple dry cabbage sabzi cooked with cumin, turmeric and everyday Indian spices.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 cups", commonName: "Patta Gobhi", englishName: "cabbage, finely sliced" },
      { amount: "1 medium", commonName: "Aloo", englishName: "potato, optional, small cubes" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2 tbsp", commonName: "Paani", englishName: "water, only if needed" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add potato if using. Cook for 5 minutes." },
      { step: 3, instruction: "Add cabbage, green chilli, turmeric, chilli powder and salt." },
      { step: 4, instruction: "Toss well and cook uncovered for 8 to 10 minutes." },
      { step: 5, instruction: "Add a splash of water only if the kadai looks dry." },
      { step: 6, instruction: "Add coriander powder and garam masala. Cook for 2 minutes." },
      { step: 7, instruction: "Serve hot with roti or dal-rice." },
    ],
    notes: ["Keep the lid off most of the time so the cabbage stays dry instead of watery."]
  },

  "paneer lababdar": {
    dishName: "Paneer Lababdar",
    description: "Paneer in a tomato-cashew gravy with onion, spices and a little cream, simplified for home cooking.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "200 g", commonName: "Paneer", englishName: "paneer, cubed" },
      { amount: "3 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "10", commonName: "Kaju", englishName: "cashews" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Kasuri Methi", englishName: "dried fenugreek leaves" },
      { amount: "2 tbsp", commonName: "Malai", englishName: "cream" },
      { amount: "2 tbsp", commonName: "Tel ya Makhan", englishName: "oil or butter" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Cook tomatoes and cashews with 1/2 cup water until soft." },
      { step: 2, instruction: "Cool slightly and blend into a smooth puree." },
      { step: 3, instruction: "Heat oil in a kadai and cook onion until golden. Add ginger-garlic paste." },
      { step: 4, instruction: "Add tomato puree, turmeric, coriander powder, chilli powder and salt. Cook until thick." },
      { step: 5, instruction: "Add 1/2 to 1 cup water and simmer for 5 minutes." },
      { step: 6, instruction: "Add paneer cubes and cook gently for 2 minutes." },
      { step: 7, instruction: "Add cream, garam masala and kasuri methi. Mix gently and turn off the stove." },
      { step: 8, instruction: "Serve hot with roti, naan or rice.", tip: { title: "Keep paneer soft", content: "Do not boil the paneer for long. Two minutes in the hot gravy is enough." } },
    ],
    notes: ["This version keeps the richer restaurant-style flavor while using straightforward home steps."]
  },

  "matar korma": {
    dishName: "Matar Korma",
    description: "Green peas cooked in a mild onion-cashew yogurt gravy with gentle whole spices.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Matar", englishName: "green peas" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "10", commonName: "Kaju", englishName: "cashews" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "plain yogurt, whisked" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1", commonName: "Elaichi", englishName: "green cardamom" },
      { amount: "1 inch", commonName: "Dalchini", englishName: "cinnamon" },
      { amount: "2", commonName: "Laung", englishName: "cloves" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/4 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel ya Ghee", englishName: "oil or ghee" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Cook onion and cashews in 1/2 cup water until soft. Cool and blend smooth." },
      { step: 2, instruction: "Heat oil in a kadai. Add cardamom, cinnamon and cloves." },
      { step: 3, instruction: "Add ginger-garlic paste and cook for 30 seconds." },
      { step: 4, instruction: "Add the onion-cashew puree, turmeric, coriander powder, chilli powder and salt." },
      { step: 5, instruction: "Cook for 4 to 5 minutes, then lower the heat and add whisked yogurt slowly." },
      { step: 6, instruction: "Add peas and water. Cover and simmer until peas are tender." },
      { step: 7, instruction: "Add garam masala, taste and serve with roti, paratha or rice." },
    ],
    notes: ["For a simpler version, skip cashews and use an extra 2 tablespoons of yogurt."]
  },

  "amritsari chole": {
    dishName: "Amritsari Chole",
    description: "Dark, tangy chickpeas cooked with tea, whole spices and a punchy onion-tomato masala.",
    prepTime: "Approx. 1 hour (plus soaking)",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Kabuli Chana", englishName: "white chickpeas, soaked overnight" },
      { amount: "1", commonName: "Chai Patti", englishName: "tea bag" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 tsp", commonName: "Chole Masala", englishName: "chole masala powder" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1.5 tbsp", commonName: "Tel ya Ghee", englishName: "oil or ghee" },
      { amount: "to taste", commonName: "Kala Namak", englishName: "black salt" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Drain soaked chickpeas. Add them to a cooker with 3 cups water, tea bag and salt." },
      { step: 2, instruction: "Cook for 6 to 7 whistles. Let pressure release, then remove the tea bag." },
      { step: 3, instruction: "Heat oil in a kadai and add cumin. Add onion and ginger-garlic paste." },
      { step: 4, instruction: "Cook until golden, then add tomatoes, turmeric, chilli powder and chole masala." },
      { step: 5, instruction: "Cook until the masala turns thick and glossy." },
      { step: 6, instruction: "Add chickpeas with 1 cup cooking water and simmer for 10 to 12 minutes." },
      { step: 7, instruction: "Add amchur and black salt. Serve hot with kulcha, bhatura or rice." },
    ],
    notes: ["Tea adds the deep colour commonly associated with Amritsari chole. Remove the tea bag before simmering."]
  },

  "sarson ka saag": {
    dishName: "Sarson Ka Saag",
    description: "A homestyle Punjabi winter saag made with mustard greens, spinach and simple spices.",
    prepTime: "Approx. 1 hour 15 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Sarson", englishName: "mustard greens, washed" },
      { amount: "150 g", commonName: "Palak", englishName: "spinach" },
      { amount: "100 g", commonName: "Bathua", englishName: "bathua leaves, optional" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies" },
      { amount: "1 tbsp", commonName: "Makki ka Atta", englishName: "corn flour" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Makhan ya Ghee", englishName: "butter or ghee" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Roughly chop mustard greens, spinach and optional bathua." },
      { step: 2, instruction: "Add the greens, green chillies and 1 cup water to a cooker. Cook for 3 whistles." },
      { step: 3, instruction: "Let the pressure release, cool slightly and blend the greens coarsely." },
      { step: 4, instruction: "Heat butter or ghee in a kadai. Add onion and ginger-garlic paste." },
      { step: 5, instruction: "Add tomatoes, turmeric and coriander powder. Cook until soft." },
      { step: 6, instruction: "Add the green puree and salt. Simmer for 15 minutes." },
      { step: 7, instruction: "Mix corn flour with 2 tablespoons water and stir it in." },
      { step: 8, instruction: "Simmer for 5 more minutes, then add garam masala." },
      { step: 9, instruction: "Serve hot with makki di roti.", tip: { title: "Keep it rustic", content: "Do not blend the greens completely smooth. A slightly coarse texture feels more homestyle." } },
    ],
    notes: ["Bathua is optional and can be replaced with extra spinach."]
  },

  "makki di roti": {
    dishName: "Makki Di Roti",
    description: "A rustic Punjabi cornmeal flatbread cooked on a tawa and traditionally served with saag.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Makki ka Atta", englishName: "fine maize flour" },
      { amount: "1 cup", commonName: "Gunguna Paani", englishName: "warm water, as needed" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "1 tbsp", commonName: "Ghee", englishName: "ghee, optional" },
    ],
    method: [
      { step: 1, instruction: "Mix makki flour and salt." },
      { step: 2, instruction: "Add warm water little by little and knead into a soft dough." },
      { step: 3, instruction: "Divide into small balls. Flatten each ball with your hands into a round roti." },
      { step: 4, instruction: "Heat a tawa on medium heat and place the roti carefully." },
      { step: 5, instruction: "Cook until the edges look dry, then flip gently." },
      { step: 6, instruction: "Cook both sides until brown spots appear. Press the edges gently so they cook evenly." },
      { step: 7, instruction: "Brush with optional ghee and serve hot with sarson ka saag.", tip: { title: "Prevent cracks", content: "Use warm water and make the dough soft. A dry dough will crack while shaping." } },
    ],
    notes: ["Makki dough has no gluten, so shaping it by hand is easier than trying to roll it thin."]
  },

  "mooli ki sabzi": {
    dishName: "Mooli Ki Sabzi",
    description: "A quick North Indian radish sabzi with simple spices, ideal for winter home meals.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 medium", commonName: "Mooli", englishName: "radishes, chopped" },
      { amount: "1/2 cup", commonName: "Mooli ke Patte", englishName: "radish leaves, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 pinch", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2 tbsp", commonName: "Paani", englishName: "water, only if needed" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add hing and cumin seeds." },
      { step: 2, instruction: "Add green chilli and chopped radish. Cook for 4 minutes." },
      { step: 3, instruction: "Add radish leaves, turmeric, chilli powder and salt." },
      { step: 4, instruction: "Cover and cook until the radish becomes tender." },
      { step: 5, instruction: "Cook uncovered for a few minutes until excess moisture dries out." },
      { step: 6, instruction: "Add garam masala and mix well." },
      { step: 7, instruction: "Serve hot with roti or paratha." },
    ],
    notes: ["Young radishes cook faster and are milder in taste."]
  },

  "lauki sabzi": {
    dishName: "Lauki Sabzi",
    description: "A light everyday bottle-gourd sabzi cooked with onion, tomato and minimal spices.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Lauki", englishName: "bottle gourd, chopped" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1/2 inch", commonName: "Adrak", englishName: "ginger, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder, optional" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Saunf Powder", englishName: "fennel powder, optional" },
      { amount: "1.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add onion, ginger and green chilli. Cook until soft." },
      { step: 3, instruction: "Add tomato, turmeric, optional coriander powder and salt. Cook until mushy." },
      { step: 4, instruction: "Add lauki and mix well." },
      { step: 5, instruction: "Add water, cover and cook until the lauki is tender." },
      { step: 6, instruction: "Cook uncovered if there is too much water. Add garam masala and optional fennel powder." },
      { step: 7, instruction: "Garnish with coriander if using and serve hot with roti or rice." },
    ],
    notes: ["Lauki releases its own water, so add liquid gradually."]
  },

  "arbi masala": {
    dishName: "Arbi Masala",
    description: "Crisp-edged colocasia cooked with ajwain, turmeric and tangy Indian spices.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Arbi", englishName: "colocasia roots" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1/4 tsp", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Cook whole arbi in a cooker for 1 whistle with enough water. Let it cool completely." },
      { step: 2, instruction: "Peel the arbi and cut into thick slices." },
      { step: 3, instruction: "Heat oil in a kadai and add ajwain and hing." },
      { step: 4, instruction: "Add arbi, turmeric, coriander powder, chilli powder and salt." },
      { step: 5, instruction: "Cook on medium heat until the arbi turns crisp and golden, turning gently." },
      { step: 6, instruction: "Add amchur and garam masala. Toss for 30 seconds." },
      { step: 7, instruction: "Garnish with coriander and serve hot." },
    ],
    notes: ["Cooling the boiled arbi before peeling reduces stickiness and helps it crisp in the kadai."]
  },

  "soya chaap": {
    dishName: "Soya Chaap Masala",
    description: "Home-style soya chaap in a spiced onion-tomato gravy with yogurt and simple whole spices.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "400 g", commonName: "Soya Chaap", englishName: "soya chaap, cut into pieces" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Kasuri Methi", englishName: "dried fenugreek leaves" },
      { amount: "2.5 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix soya chaap with yogurt, chilli powder and a little salt. Rest for 10 minutes." },
      { step: 2, instruction: "Shallow-fry the chaap in a kadai until lightly golden. Set aside." },
      { step: 3, instruction: "Cook onion, tomatoes and ginger-garlic paste until soft. Cool and blend smooth." },
      { step: 4, instruction: "Heat oil, add cumin, turmeric, coriander powder and chilli powder." },
      { step: 5, instruction: "Add the blended masala and cook until glossy." },
      { step: 6, instruction: "Lower the heat and add the yogurt marinade slowly. Stir well." },
      { step: 7, instruction: "Add water and soya chaap. Cover and simmer for 8 minutes." },
      { step: 8, instruction: "Add garam masala and kasuri methi. Serve hot with roti or paratha." },
    ],
    notes: ["Use ready-made soya chaap sticks or pieces. The recipe itself is fully cooked on the stovetop."]
  },

  "papdi chaat": {
    dishName: "Papdi Chaat",
    description: "Crisp papdi topped with potato, chickpeas, yogurt, chutneys, spices and sev in a home-style chaat.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "20", commonName: "Papdi", englishName: "crisp papdi" },
      { amount: "2 medium", commonName: "Aloo", englishName: "potatoes, boiled and chopped" },
      { amount: "1/2 cup", commonName: "Kabuli Chana", englishName: "boiled chickpeas" },
      { amount: "1 cup", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1/4 cup", commonName: "Imli Chutney", englishName: "tamarind chutney" },
      { amount: "1/4 cup", commonName: "Hari Chutney", englishName: "green chutney" },
      { amount: "1/2 cup", commonName: "Sev", englishName: "fine sev" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1/2 tsp", commonName: "Bhuna Jeera Powder", englishName: "roasted cumin powder" },
      { amount: "1/4 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Boil and chop the potatoes. Keep boiled chickpeas ready." },
      { step: 2, instruction: "Arrange papdi on a plate and top with potato and chickpeas." },
      { step: 3, instruction: "Add whisked yogurt, then drizzle green and tamarind chutneys." },
      { step: 4, instruction: "Sprinkle chaat masala, roasted cumin and chilli powder." },
      { step: 5, instruction: "Top with sev and coriander." },
      { step: 6, instruction: "Serve immediately so the papdi stays crisp.", tip: { title: "Avoid soggy papdi", content: "Keep the chutneys ready and assemble only just before serving." } },
    ],
    notes: ["Store-bought papdi, chutneys and sev are fine for a quick home assembly; the toppings are all prepared at home."]
  },

  "sev puri": {
    dishName: "Sev Puri",
    description: "A quick Mumbai-style chaat of crisp puris, potato, chutneys, onion, spices and fine sev.",
    prepTime: "Approx. 15 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "20", commonName: "Papdi", englishName: "small crisp papdi" },
      { amount: "2 medium", commonName: "Aloo", englishName: "potatoes, boiled and chopped" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1/4 cup", commonName: "Imli Chutney", englishName: "tamarind chutney" },
      { amount: "1/4 cup", commonName: "Hari Chutney", englishName: "green chutney" },
      { amount: "1/2 cup", commonName: "Sev", englishName: "fine sev" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1/2 tsp", commonName: "Bhuna Jeera Powder", englishName: "roasted cumin powder" },
      { amount: "1/2 tsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Boil and chop the potatoes. Season lightly with salt." },
      { step: 2, instruction: "Arrange the papdi on a plate and add the potato and onion." },
      { step: 3, instruction: "Drizzle green chutney and tamarind chutney over each papdi." },
      { step: 4, instruction: "Sprinkle chaat masala, roasted cumin and a few drops of lemon juice." },
      { step: 5, instruction: "Top generously with fine sev and coriander. Serve immediately." },
    ],
    notes: ["Unlike dahi puri, sev puri is usually served without yogurt so the texture stays crisp."]
  },

  "dahi puri": {
    dishName: "Dahi Puri",
    description: "Crisp hollow puris filled with potato, yogurt, chutneys, spices and sev for an easy home-style chaat.",
    prepTime: "Approx. 15 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "20", commonName: "Pani Puri Puri", englishName: "small crisp puris" },
      { amount: "2 medium", commonName: "Aloo", englishName: "potatoes, boiled and mashed" },
      { amount: "1 cup", commonName: "Dahi", englishName: "plain yogurt, whisked" },
      { amount: "1/4 cup", commonName: "Imli Chutney", englishName: "tamarind chutney" },
      { amount: "1/4 cup", commonName: "Hari Chutney", englishName: "green chutney" },
      { amount: "1/2 cup", commonName: "Sev", englishName: "fine sev" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1/2 tsp", commonName: "Bhuna Jeera Powder", englishName: "roasted cumin powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Boil, peel and mash the potatoes. Add a pinch of salt and chaat masala." },
      { step: 2, instruction: "Make a small hole in each puri and fill with a little potato." },
      { step: 3, instruction: "Add whisked yogurt to each puri." },
      { step: 4, instruction: "Drizzle green chutney and tamarind chutney." },
      { step: 5, instruction: "Sprinkle chaat masala, cumin powder and chilli powder." },
      { step: 6, instruction: "Top with sev and coriander. Serve immediately.", tip: { title: "Assemble last", content: "Keep the puris dry until everyone is ready to eat so they stay crisp." } },
    ],
    notes: ["Store-bought puris are perfectly fine for this quick home assembly."]
  },

  "fish curry (fish masala)": {
    dishName: "Fish Curry",
    description: "A simple Indian fish curry with onion, tomato and warm spices. Easy enough for a weeknight home lunch with rice.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Machhli", englishName: "firm fish pieces" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Rub fish with a little turmeric, chilli powder and salt. Keep aside for 10 minutes." },
      { step: 2, instruction: "Heat oil in a kadai and lightly sear the fish for 2 minutes on each side. Remove." },
      { step: 3, instruction: "Add cumin seeds to the same kadai. Let them sizzle." },
      { step: 4, instruction: "Add onion and cook until light golden. Add ginger-garlic paste and cook for 30 seconds." },
      { step: 5, instruction: "Add tomatoes, turmeric, chilli powder, coriander powder and salt. Cook until soft." },
      { step: 6, instruction: "Add water and garam masala. Simmer for 5 minutes to make a smooth gravy." },
      { step: 7, instruction: "Gently place the fish in the gravy and simmer for 5 to 7 minutes, until cooked through." },
      { step: 8, instruction: "Garnish with coriander and serve hot with rice." , tip: { title: "Don't overcook the fish", content: "Once it flakes easily with a fork, turn off the heat. Fish can break if simmered too long." } },
    ],
    notes: [
      "Tamarind can be added for extra tang if you like a more coastal-style curry.",
    ],
  },
  "fish fingers": {
    dishName: "Fish Fingers",
    description: "Crispy homemade fish fingers made in the oven or air fryer with a simple spiced coating.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "air_fryer", isSpecialized: false, alternative: null },
      { item: "oven", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "400 g", commonName: "Machhli", englishName: "boneless fish fillets" },
      { amount: "1/2 cup", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "1", commonName: "Anda", englishName: "egg, beaten" },
      { amount: "1 cup", commonName: "Bread Crumbs", englishName: "breadcrumbs" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Kali Mirch", englishName: "black pepper" },
      { amount: "1 tsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil, for brushing" },
    ],
    method: [
      { step: 1, instruction: "Cut fish into finger-sized strips. Mix with lemon juice, salt, pepper and turmeric." },
      { step: 2, instruction: "Coat each fish strip lightly in flour, then dip in beaten egg." },
      { step: 3, instruction: "Roll the fish in breadcrumbs until fully coated." },
      { step: 4, instruction: "Place the coated fish in the air fryer or on an oven tray. Brush lightly with oil." },
      { step: 5, instruction: "Air fry at 200°C for 10 to 12 minutes, turning halfway. Or bake at 220°C for 15 to 18 minutes." },
      { step: 6, instruction: "Cook until golden and the fish is opaque inside." },
      { step: 7, instruction: "Serve hot with ketchup or mint chutney." , tip: { title: "Keep the coating dry", content: "Do not overcrowd the air fryer or tray. Leave a little space around each piece so the crust gets crisp." } },
    ],
    notes: [
    ],
  },
  "kadhi pakora": {
    dishName: "Kadhi Pakora",
    description: "Soft gram-flour pakoras served in a tangy yogurt kadhi. A simple home-style version using a kadai and stove.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "1 cup", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Methi", englishName: "fenugreek seeds" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Hing", englishName: "asafoetida" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil for pakoras" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil for kadhi" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix 1/2 cup besan with onion, green chilli, chilli powder, salt and enough water to make a thick batter." },
      { step: 2, instruction: "Heat oil in a kadai. Drop small spoonfuls of batter and shallow-fry the pakoras until golden. Set aside." },
      { step: 3, instruction: "Whisk yogurt, the remaining besan, turmeric and 3 cups water until smooth." },
      { step: 4, instruction: "Heat 1 tablespoon oil in the kadai. Add mustard seeds, cumin, fenugreek and hing." },
      { step: 5, instruction: "Pour in the yogurt mixture slowly while stirring. Bring it to a gentle boil." },
      { step: 6, instruction: "Lower the heat and simmer for 20 to 25 minutes, stirring sometimes, until the kadhi thickens slightly." },
      { step: 7, instruction: "Add the pakoras and simmer for 5 minutes so they soak up the kadhi." },
      { step: 8, instruction: "Serve hot with rice." , tip: { title: "Keep kadhi at a gentle simmer", content: "Hard boiling can make yogurt split. Low heat gives a smoother kadhi." } },
    ],
    notes: [
    ],
  },
  "keema matar": {
    dishName: "Keema Matar",
    description: "Home-style minced mutton cooked with green peas, onion, tomato and everyday spices.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Mutton Keema", englishName: "minced mutton" },
      { amount: "1 cup", commonName: "Matar", englishName: "green peas" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a cooker or deep kadai. Add cumin seeds and let them sizzle." },
      { step: 2, instruction: "Add onion and cook until golden. Add ginger-garlic paste and cook for 30 seconds." },
      { step: 3, instruction: "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until the tomatoes soften." },
      { step: 4, instruction: "Add keema and peas. Cook on medium heat for 5 to 6 minutes, stirring to break up the keema." },
      { step: 5, instruction: "Add 1 cup water and mix well." },
      { step: 6, instruction: "Cover and cook in the cooker for 3 whistles. Or simmer covered in a kadai for 25 to 30 minutes." },
      { step: 7, instruction: "Open carefully, add garam masala and simmer for 3 minutes if the gravy is thin." },
      { step: 8, instruction: "Garnish with coriander and serve with roti or rice." , tip: { title: "Break the keema well", content: "Stir and press the mince as it cooks so you get small, separate pieces instead of large clumps." } },
    ],
    notes: [
    ],
  },
  "karela sabzi": {
    dishName: "Karela Sabzi",
    description: "Simple bitter gourd sabzi cooked with onion and spices for an everyday Indian meal.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Karela", englishName: "bitter gourd" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, sliced" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Saunf", englishName: "fennel seeds" },
      { amount: "1 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Slice karela thinly. Remove the seeds if they are large." },
      { step: 2, instruction: "Mix karela with a little salt and leave for 10 minutes. Gently squeeze out excess liquid." },
      { step: 3, instruction: "Heat oil in a kadai. Add fennel seeds and let them sizzle." },
      { step: 4, instruction: "Add karela and cook uncovered on medium heat for 12 to 15 minutes, stirring often." },
      { step: 5, instruction: "Add onion, turmeric, chilli powder, coriander powder and salt." },
      { step: 6, instruction: "Cook for another 8 to 10 minutes until the karela is tender and lightly browned." },
      { step: 7, instruction: "Add amchur, mix well and cook for 1 minute." },
      { step: 8, instruction: "Serve hot with roti and dal." , tip: { title: "For less bitterness", content: "Salting and squeezing the karela before cooking makes the flavor milder." } },
    ],
    notes: [
    ],
  },
  "toor dal": {
    dishName: "Toor Dal",
    description: "Everyday yellow lentils cooked until soft and finished with a simple cumin-garlic tadka.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Toor Dal", englishName: "split pigeon peas, rinsed" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "3 cloves", commonName: "Lehsun", englishName: "garlic, sliced" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Wash the dal and add it to a cooker with turmeric, tomato, onion, salt and 3 cups water." },
      { step: 2, instruction: "Cook for 4 whistles, then let the pressure release naturally." },
      { step: 3, instruction: "Open and lightly whisk the dal so it becomes creamy. Add a little water if needed." },
      { step: 4, instruction: "Heat ghee in a kadai. Add cumin seeds and sliced garlic." },
      { step: 5, instruction: "When the garlic turns light golden, add chilli powder and turn the heat low." },
      { step: 6, instruction: "Pour the tadka over the dal and mix." },
      { step: 7, instruction: "Simmer for 2 minutes so the flavors come together." },
      { step: 8, instruction: "Garnish with coriander and serve with rice or roti." , tip: { title: "Make it creamy", content: "Whisk the cooked dal for 20 to 30 seconds instead of adding extra cream or butter." } },
    ],
    notes: [
    ],
  },
  "aloo tikki": {
    dishName: "Aloo Tikki",
    description: "Crispy shallow-fried potato patties made with simple spices. Great as a snack or chaat base.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 medium", commonName: "Aloo", englishName: "potatoes, boiled and mashed" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "1 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Jeera Powder", englishName: "roasted cumin powder" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "2 tbsp", commonName: "Corn Flour", englishName: "corn flour" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil for shallow frying" },
    ],
    method: [
      { step: 1, instruction: "Boil the potatoes until soft. Peel and mash them until smooth." },
      { step: 2, instruction: "Mix potatoes with coriander, chaat masala, chilli powder, cumin powder, salt and corn flour." },
      { step: 3, instruction: "Divide the mixture into 6 small balls and flatten them into thick patties." },
      { step: 4, instruction: "Heat a thin layer of oil in a kadai." },
      { step: 5, instruction: "Cook the tikkis on medium heat for 3 to 4 minutes per side until crisp and golden." },
      { step: 6, instruction: "Flip gently once the first side has formed a crust." },
      { step: 7, instruction: "Serve hot with green chutney and tamarind chutney." , tip: { title: "Crisp without breaking", content: "Let the potato mixture cool before shaping and do not flip the tikki too early." } },
    ],
    notes: [
    ],
  },
  "dhokla (besan dhokla)": {
    dishName: "Dhokla",
    description: "Soft, fluffy besan dhokla made at home with a quick batter and simple tempering.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water, as needed" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1 tsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "1 tsp", commonName: "Eno", englishName: "fruit salt" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1 tsp", commonName: "Til", englishName: "sesame seeds" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, sliced" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
    ],
    method: [
      { step: 1, instruction: "Whisk besan, yogurt, turmeric, sugar, salt and water into a smooth thick batter." },
      { step: 2, instruction: "Let the batter rest for 10 minutes." },
      { step: 3, instruction: "Just before steaming, mix in lemon juice and Eno gently. Do not overmix." },
      { step: 4, instruction: "Grease a shallow heat-safe pan with oil and pour in the batter." },
      { step: 5, instruction: "Add water to a cooker and place the pan inside. Cover and steam without pressure for 15 to 18 minutes." },
      { step: 6, instruction: "Check with a knife. It should come out mostly clean." },
      { step: 7, instruction: "Heat 1 tablespoon oil in a kadai. Add mustard seeds, sesame seeds, curry leaves and chilli." },
      { step: 8, instruction: "Pour the tempering over the dhokla, cut into pieces and serve." , tip: { title: "Add Eno last", content: "The batter gets its lift from the fresh Eno, so mix it in only when you are ready to steam." } },
    ],
    notes: [
    ],
  },
  "tomato rice": {
    dishName: "Tomato Rice",
    description: "Tangy South Indian tomato rice made with cooked rice, tomatoes and simple tempering spices.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 cups", commonName: "Pakka Chawal", englishName: "cooked rice" },
      { amount: "3 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1 tsp", commonName: "Urad Dal", englishName: "split black gram" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai. Add mustard seeds and let them pop." },
      { step: 2, instruction: "Add urad dal, green chilli and curry leaves. Cook for 30 seconds." },
      { step: 3, instruction: "Add onion and cook until soft." },
      { step: 4, instruction: "Add tomatoes, turmeric, chilli powder, garam masala and salt." },
      { step: 5, instruction: "Cook until the tomatoes become soft and the mixture looks thick." },
      { step: 6, instruction: "Add cooked rice and gently mix until every grain is coated." },
      { step: 7, instruction: "Cook on low heat for 3 to 4 minutes." },
      { step: 8, instruction: "Serve hot with yogurt or papad." , tip: { title: "Use cool cooked rice", content: "Rice that has cooled slightly stays separate and does not turn mushy when mixed." } },
    ],
    notes: [
    ],
  },
  "parotta": {
    dishName: "Parotta",
    description: "Flaky South Indian flatbread made at home on a tawa with a simple soft dough.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "1 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil" },
      { amount: "3/4 cup", commonName: "Paani", englishName: "water, as needed" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil, for cooking" },
    ],
    method: [
      { step: 1, instruction: "Mix flour, sugar, salt, 1 tablespoon oil and water to make a soft dough." },
      { step: 2, instruction: "Knead for 5 minutes until the dough feels smooth. Rest it for 20 minutes." },
      { step: 3, instruction: "Divide into 6 balls. Roll each ball very thin and brush lightly with oil." },
      { step: 4, instruction: "Fold or pleat the thin sheet into a loose rope, then coil it into a round." },
      { step: 5, instruction: "Flatten each coil gently with your hands or a rolling pin substitute using light pressure." },
      { step: 6, instruction: "Heat a tawa and cook each parotta on medium heat until light golden spots appear on both sides." },
      { step: 7, instruction: "Brush a little oil and press the edges gently for flaky layers." },
      { step: 8, instruction: "Serve hot with vegetable kurma or curry." , tip: { title: "Rest the dough", content: "A soft dough and enough resting time make the parotta easier to stretch and keep the layers tender." } },
    ],
    notes: [
    ],
  },
  "achari paneer": {
    dishName: "Achari Paneer",
    description: "Paneer cooked with tangy pickling spices, onion, tomato and yogurt for a bright, mildly spicy curry.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "250 g", commonName: "Paneer", englishName: "paneer cubes" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, sliced" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes, chopped" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "plain yogurt, whisked" },
      { amount: "1 tsp", commonName: "Saunf", englishName: "fennel seeds" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Kalonji", englishName: "nigella seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Methi", englishName: "fenugreek seeds" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai. Add mustard, cumin, fennel, nigella and fenugreek seeds." },
      { step: 2, instruction: "Let the spices sizzle for a few seconds, then add onion and cook until soft." },
      { step: 3, instruction: "Add tomatoes, turmeric, chilli powder and salt. Cook until the tomatoes soften." },
      { step: 4, instruction: "Lower the heat. Add whisked yogurt slowly while stirring so it stays smooth." },
      { step: 5, instruction: "Add water and simmer for 5 minutes." },
      { step: 6, instruction: "Add paneer cubes and cook gently for 4 to 5 minutes." },
      { step: 7, instruction: "Taste and adjust salt or chilli. Serve hot with roti or rice." , tip: { title: "Keep yogurt smooth", content: "Add yogurt on low heat and stir continuously for the first minute to reduce the chance of curdling." } },
    ],
    notes: [
    ],
  },
  "vegetable kurma": {
    dishName: "Vegetable Kurma",
    description: "Creamy South Indian-style vegetable kurma made with mixed vegetables, coconut, cashews and mild spices.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Mixed Vegetables", englishName: "carrot, potato, beans and peas, chopped" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1/4 cup", commonName: "Nariyal", englishName: "grated coconut" },
      { amount: "8", commonName: "Kaju", englishName: "cashews" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies" },
      { amount: "1/2 tsp", commonName: "Saunf", englishName: "fennel seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Blend coconut, cashews, green chilli, fennel, cumin and yogurt into a smooth paste." },
      { step: 2, instruction: "Heat oil in a cooker. Add onion and cook until soft." },
      { step: 3, instruction: "Add tomato and turmeric. Cook until the tomato softens." },
      { step: 4, instruction: "Add the ground paste and cook for 2 minutes on low heat, stirring often." },
      { step: 5, instruction: "Add mixed vegetables, water and salt. Mix well." },
      { step: 6, instruction: "Cook for 2 whistles, then let the pressure release naturally." },
      { step: 7, instruction: "Open and simmer for 2 to 3 minutes if the gravy looks thin." },
      { step: 8, instruction: "Serve hot with parotta, dosa, poori or rice." , tip: { title: "Keep it mild", content: "Kurma is usually lightly spiced. Let the coconut and yogurt carry the flavor instead of adding too much chilli." } },
    ],
    notes: [
    ],
  },
  "aloo shimla mirch": {
    dishName: "Aloo Shimla Mirch",
    description: "Simple potato and capsicum sabzi cooked with cumin and everyday Indian spices.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 medium", commonName: "Aloo", englishName: "potatoes, cubed" },
      { amount: "2 medium", commonName: "Shimla Mirch", englishName: "capsicum, sliced" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, sliced" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add potatoes, turmeric and salt. Toss well." },
      { step: 3, instruction: "Cover and cook on low heat for 10 to 12 minutes until the potatoes are almost tender." },
      { step: 4, instruction: "Add onion and capsicum. Mix well." },
      { step: 5, instruction: "Add coriander powder and chilli powder." },
      { step: 6, instruction: "Cook uncovered for 8 to 10 minutes until the capsicum is tender but still has a little bite." },
      { step: 7, instruction: "Add amchur, mix and cook for 1 minute." },
      { step: 8, instruction: "Serve hot with roti or dal." , tip: { title: "Keep the capsicum from going mushy", content: "Add it after the potatoes are mostly cooked and finish the dish uncovered." } },
    ],
    notes: [
    ],
  },
  "pindi chole": {
    dishName: "Pindi Chole",
    description: "Dark, tangy Punjabi-style chickpeas made with whole spices and a dry roasted masala. Easy pressure-cooker version.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Kabuli Chana", englishName: "white chickpeas, soaked overnight" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tsp", commonName: "Anardana", englishName: "dried pomegranate seeds, crushed" },
      { amount: "1 tsp", commonName: "Chole Masala", englishName: "chole masala powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tbsp", commonName: "Adrak", englishName: "ginger, julienned" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Add soaked chickpeas, salt, bay leaf and 2 cups water to a cooker." },
      { step: 2, instruction: "Cook for 5 to 6 whistles, then let the pressure release naturally." },
      { step: 3, instruction: "Heat oil in a kadai. Add cumin and ginger and cook for 30 seconds." },
      { step: 4, instruction: "Add coriander powder, anardana, chole masala, chilli powder and turmeric." },
      { step: 5, instruction: "Add the cooked chickpeas with a little of their cooking water." },
      { step: 6, instruction: "Cook uncovered for 10 to 12 minutes until the masala coats the chickpeas and the gravy is mostly dry." },
      { step: 7, instruction: "Lightly press a few chickpeas with the back of a spoon to thicken the masala." },
      { step: 8, instruction: "Serve hot with bhature, poori or roti." , tip: { title: "Pindi chole should be fairly dry", content: "Let the final stage cook uncovered so the spice mixture clings to the chickpeas instead of staying watery." } },
    ],
    notes: [
    ],
  },
  "rogan josh": {
    dishName: "Rogan Josh",
    description: "Home-style Kashmiri-inspired mutton curry with yogurt and warm spices, made tender in a pressure cooker.",
    prepTime: "Approx. 1 hour",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "750 g", commonName: "Mutton", englishName: "mutton, curry-cut" },
      { amount: "1 cup", commonName: "Dahi", englishName: "plain yogurt, whisked" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2", commonName: "Elaichi", englishName: "green cardamom" },
      { amount: "1", commonName: "Dalchini", englishName: "cinnamon stick" },
      { amount: "3", commonName: "Laung", englishName: "cloves" },
      { amount: "1", commonName: "Tej Patta", englishName: "bay leaf" },
      { amount: "2 tsp", commonName: "Kashmiri Lal Mirch", englishName: "Kashmiri red chilli powder" },
      { amount: "1/2 tsp", commonName: "Saunf Powder", englishName: "fennel powder" },
      { amount: "1/2 tsp", commonName: "Sonth Powder", englishName: "dry ginger powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Whisk the yogurt until smooth and keep it ready." },
      { step: 2, instruction: "Heat oil in a cooker. Add cardamom, cinnamon, cloves and bay leaf." },
      { step: 3, instruction: "Add mutton and cook on medium-high heat for 6 to 8 minutes, stirring until lightly browned." },
      { step: 4, instruction: "Lower the heat. Add Kashmiri chilli, fennel powder, dry ginger powder and salt." },
      { step: 5, instruction: "Add yogurt slowly while stirring continuously so it does not split." },
      { step: 6, instruction: "Add water, close the cooker and cook for 5 to 6 whistles, until the mutton is tender." },
      { step: 7, instruction: "Let the pressure release naturally. Open and simmer uncovered for 5 minutes." },
      { step: 8, instruction: "Add garam masala and serve hot with rice or roti." , tip: { title: "Use Kashmiri chilli", content: "It gives the curry its deep red color without making it extremely hot." } },
    ],
    notes: [
    ],
  },
  "kulfi": {
    dishName: "Kulfi",
    description: "Easy homemade cardamom-pistachio kulfi made by reducing milk on the stove and freezing it until firm.",
    prepTime: "Approx. 45 minutes plus freezing",
    equipment: [
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 litre", commonName: "Doodh", englishName: "full-fat milk" },
      { amount: "1/3 cup", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 cup", commonName: "Khoya", englishName: "mawa, crumbled" },
      { amount: "1/4 tsp", commonName: "Elaichi Powder", englishName: "cardamom powder" },
      { amount: "2 tbsp", commonName: "Pista", englishName: "pistachios, chopped" },
      { amount: "a few strands", commonName: "Kesar", englishName: "saffron, optional" },
    ],
    method: [
      { step: 1, instruction: "Heat milk in a deep kadai on medium heat and bring it to a gentle boil." },
      { step: 2, instruction: "Lower the heat and simmer for 25 to 30 minutes, stirring often, until the milk reduces noticeably." },
      { step: 3, instruction: "Add crumbled khoya and sugar. Stir until the khoya melts and the mixture becomes thick." },
      { step: 4, instruction: "Add cardamom and saffron if using. Cook for 2 more minutes." },
      { step: 5, instruction: "Turn off the heat and mix in most of the pistachios." },
      { step: 6, instruction: "Let the mixture cool completely, then pour into small freezer-safe moulds or cups." },
      { step: 7, instruction: "Freeze for at least 6 hours or until firm." },
      { step: 8, instruction: "Unmould and top with the remaining pistachios before serving." , tip: { title: "Cool before freezing", content: "A fully cooled mixture freezes more evenly and reduces ice crystals." } },
    ],
    notes: [
    ],
  },
  "sushi (veg sushi)": {
    dishName: "Sushi",
    description: "Simple homemade vegetable sushi using seasoned rice, nori and crunchy vegetables. No sushi mat needed.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Sushi Rice", englishName: "short-grain rice" },
      { amount: "2 sheets", commonName: "Nori", englishName: "nori sheets" },
      { amount: "1 tbsp", commonName: "Sirka", englishName: "rice vinegar" },
      { amount: "1 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "1", commonName: "Kheera", englishName: "cucumber, thin strips" },
      { amount: "1", commonName: "Gajar", englishName: "carrot, thin strips" },
      { amount: "1/2", commonName: "Shimla Mirch", englishName: "capsicum, thin strips" },
      { amount: "1 tbsp", commonName: "Mayonnaise", englishName: "eggless mayonnaise, optional" },
    ],
    method: [
      { step: 1, instruction: "Rinse the rice until the water looks mostly clear." },
      { step: 2, instruction: "Cook the rice in a cooker with 1.25 cups water. Let it rest covered for 10 minutes." },
      { step: 3, instruction: "Mix vinegar, sugar and salt. Gently fold it into the warm rice and let the rice cool." },
      { step: 4, instruction: "Place one nori sheet on a clean flat surface and spread a thin layer of rice over it." },
      { step: 5, instruction: "Place cucumber, carrot and capsicum in a line near one edge. Add a little mayonnaise if using." },
      { step: 6, instruction: "Roll the nori tightly with your hands, pressing gently as you go." },
      { step: 7, instruction: "Moisten the nori edge with a little water to seal the roll." },
      { step: 8, instruction: "Slice into pieces with a sharp wet knife and serve immediately." , tip: { title: "Do not overfill", content: "A thin rice layer and a small amount of filling make the roll much easier to close by hand." } },
    ],
    notes: [
      "Soy sauce, pickled ginger or wasabi can be served on the side if you have them.",
    ],
  },
  "vangi bath": {
    dishName: "Vangi Bath",
    description: "Karnataka-style brinjal rice made with cooked rice, eggplant and a tangy spice mix.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Chawal", englishName: "rice" },
      { amount: "2 cups", commonName: "Baingan", englishName: "small eggplant, sliced" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, sliced, optional" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1 tsp", commonName: "Urad Dal", englishName: "split black gram" },
      { amount: "2 tbsp", commonName: "Moongfali", englishName: "peanuts" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1/4 tsp", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1 tsp", commonName: "Vangi Bath Masala", englishName: "vangi bath masala" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tbsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1/2 tsp", commonName: "Gud", englishName: "jaggery" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Cook rice in a cooker with 1.5 cups water and a little salt. Let it cool slightly." },
      { step: 2, instruction: "Heat oil in a kadai. Add mustard seeds, urad dal, peanuts, curry leaves and hing." },
      { step: 3, instruction: "Add eggplant and turmeric. Cook until the eggplant is tender." },
      { step: 4, instruction: "Add onion if using and cook for 2 to 3 minutes." },
      { step: 5, instruction: "Add vangi bath masala, tamarind pulp, jaggery and salt. Mix well." },
      { step: 6, instruction: "Cook for 3 to 4 minutes until the masala becomes thick." },
      { step: 7, instruction: "Add cooked rice and gently mix until well coated." },
      { step: 8, instruction: "Cook on low heat for 3 minutes and serve warm." , tip: { title: "Use slightly cool rice", content: "Freshly cooked rice can turn soft while mixing. Letting it cool a little keeps the grains separate." } },
    ],
    notes: [
    ],
  },
  "sambar": {
    dishName: "Sambar",
    description: "Everyday South Indian sambar made with toor dal, vegetables, tamarind and a simple tempering.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3/4 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "1.5 cups", commonName: "Mixed Vegetables", englishName: "carrot, beans, pumpkin or drumstick" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1.5 tbsp", commonName: "Sambar Masala", englishName: "sambar powder" },
      { amount: "1 tbsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "4 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Wash the toor dal and add it to a cooker with turmeric and 2.5 cups water." },
      { step: 2, instruction: "Cook for 4 whistles and let the pressure release naturally." },
      { step: 3, instruction: "Mash the dal lightly. Add vegetables, tomato, onion, salt and 1 cup water." },
      { step: 4, instruction: "Simmer until the vegetables are tender, about 10 to 12 minutes." },
      { step: 5, instruction: "Add sambar powder and tamarind pulp. Simmer for 5 minutes." },
      { step: 6, instruction: "Heat oil in a kadai. Add mustard, cumin, dried chillies and curry leaves." },
      { step: 7, instruction: "Pour the tempering into the sambar and mix well." },
      { step: 8, instruction: "Simmer for 2 minutes and serve hot with rice, idli or dosa." , tip: { title: "Adjust the thickness", content: "Sambar should be pourable. Add a little hot water if it becomes too thick while standing." } },
    ],
    notes: [
    ],
  },
  "parippu curry": {
    dishName: "Parippu Curry",
    description: "Kerala-style yellow dal cooked with mild spices and coconut for a simple home meal.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Peeli Moong Dal", englishName: "split yellow moong dal" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 cup", commonName: "Nariyal", englishName: "grated coconut" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "plain yogurt, optional" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "1 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "2.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Wash the moong dal and add it to a cooker with turmeric, salt and 2.5 cups water." },
      { step: 2, instruction: "Cook for 3 whistles and let the pressure release naturally." },
      { step: 3, instruction: "Grind coconut, cumin and green chilli with a little water into a coarse paste." },
      { step: 4, instruction: "Stir the coconut paste into the cooked dal." },
      { step: 5, instruction: "Simmer on low heat for 5 minutes. Add yogurt if using and keep the heat very low." },
      { step: 6, instruction: "Heat ghee in a kadai. Add mustard seeds, curry leaves and dried red chillies." },
      { step: 7, instruction: "Pour the tempering over the dal and mix." },
      { step: 8, instruction: "Serve hot with rice." , tip: { title: "Keep yogurt optional", content: "The dal tastes good without yogurt too. Add it only for extra tang and creaminess." } },
    ],
    notes: [
    ],
  },
  "benne dosa": {
    dishName: "Benne Dosa",
    description: "Buttery South Indian dosa made from fermented dosa batter and cooked crisp on a hot tawa.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Dosa Batter", englishName: "fermented dosa batter" },
      { amount: "3 tbsp", commonName: "Makhan", englishName: "butter" },
      { amount: "1/4 cup", commonName: "Paani", englishName: "water, as needed" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Stir the dosa batter. Add a little water if it is very thick." },
      { step: 2, instruction: "Heat a tawa on medium-high heat and lightly grease it with butter." },
      { step: 3, instruction: "Pour a ladle of batter in the center and spread it into a thin circle." },
      { step: 4, instruction: "Add a little butter around the edges and on top." },
      { step: 5, instruction: "Cook until the underside is golden and the edges look crisp." },
      { step: 6, instruction: "Fold and serve hot. Repeat with the remaining batter." , tip: { title: "Use a hot tawa", content: "The batter should sizzle when it touches the tawa. A hot surface helps create the crisp edges." } },
    ],
    notes: [
      "For benne masala dosa, add a spoonful of potato masala before folding.",
    ],
  },
  "rava dosa": {
    dishName: "Rava Dosa",
    description: "Thin, crisp South Indian dosa made from semolina and rice flour with cumin and green chilli.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Rava", englishName: "fine semolina" },
      { amount: "1/2 cup", commonName: "Chawal Flour", englishName: "rice flour" },
      { amount: "2 tbsp", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "3 cups", commonName: "Paani", englishName: "water" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil, for cooking" },
    ],
    method: [
      { step: 1, instruction: "Mix rava, rice flour, maida, cumin, chilli and salt." },
      { step: 2, instruction: "Add water slowly and whisk into a very thin, watery batter." },
      { step: 3, instruction: "Rest the batter for 15 minutes. Stir again before cooking." },
      { step: 4, instruction: "Heat a tawa well. Pour the batter from a little height, starting around the edges." },
      { step: 5, instruction: "Fill any gaps with a little batter. Drizzle a few drops of oil." },
      { step: 6, instruction: "Cook until the dosa is crisp and golden. Do not flip." },
      { step: 7, instruction: "Lift gently and serve hot. Stir the batter before each dosa." , tip: { title: "Keep the batter thin", content: "Rava dosa batter should be much thinner than regular dosa batter. Add water if it thickens while standing." } },
    ],
    notes: [
    ],
  },
  "thatte idli": {
    dishName: "Thatte Idli",
    description: "Soft, flat Karnataka-style idli made from fermented rice and urad dal batter and steamed until fluffy.",
    prepTime: "Approx. 30 minutes plus fermentation",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Idli Batter", englishName: "fermented idli batter" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "1/4 cup", commonName: "Paani", englishName: "water, as needed" },
    ],
    method: [
      { step: 1, instruction: "Stir the idli batter gently. Add a little water if it is too thick to spread." },
      { step: 2, instruction: "Grease shallow heat-safe plates and pour batter to a medium thickness." },
      { step: 3, instruction: "Add water to a cooker and place the plates inside." },
      { step: 4, instruction: "Cover and steam without pressure for 10 to 12 minutes." },
      { step: 5, instruction: "Check with a knife. It should come out clean." },
      { step: 6, instruction: "Let the idli cool for 2 minutes, then loosen the edges and remove." },
      { step: 7, instruction: "Serve hot with sambar or chutney." , tip: { title: "Do not overfill", content: "Leave some space in the plate because the batter rises while steaming." } },
    ],
    notes: [
    ],
  },
  "bisi bele bath": {
    dishName: "Bisi Bele Bath",
    description: "Karnataka-style rice and lentils cooked with vegetables, tamarind and a warm spice mix.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1/2 cup", commonName: "Chawal", englishName: "rice" },
      { amount: "1/2 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "1.5 cups", commonName: "Mixed Vegetables", englishName: "carrot, beans, peas and capsicum" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1.5 tbsp", commonName: "Bisi Bele Bath Masala", englishName: "bisi bele bath masala" },
      { amount: "1 tbsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "2 tbsp", commonName: "Moongfali", englishName: "peanuts" },
      { amount: "1 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "4 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Wash rice and dal together. Add them to a cooker with turmeric and 3 cups water." },
      { step: 2, instruction: "Cook for 4 whistles and let the pressure release naturally." },
      { step: 3, instruction: "Add vegetables, tomato, onion, salt and 1 cup water to the cooker." },
      { step: 4, instruction: "Cook for 1 more whistle, then release the pressure." },
      { step: 5, instruction: "Add bisi bele bath masala and tamarind pulp. Mix well." },
      { step: 6, instruction: "Simmer on the stove for 5 minutes. Add hot water if the mixture is too thick." },
      { step: 7, instruction: "Heat ghee in a kadai and lightly roast the peanuts for 1 minute." },
      { step: 8, instruction: "Pour the peanut tempering over the bisi bele bath and serve hot." , tip: { title: "Expect it to thicken", content: "Bisi bele bath becomes thicker as it sits. Keep it a little loose while cooking." } },
    ],
    notes: [
    ],
  },
  "khara bath": {
    dishName: "Khara Bath",
    description: "Savory Karnataka-style semolina breakfast made with vegetables, spices and a simple tempering.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Rava", englishName: "semolina" },
      { amount: "1/2 cup", commonName: "Mixed Vegetables", englishName: "carrot, peas and beans" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1 tsp", commonName: "Urad Dal", englishName: "split black gram" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1 tbsp", commonName: "Vangi Bath Masala", englishName: "bath masala or sambar powder" },
      { amount: "2.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "2 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Dry roast rava in a kadai on low heat for 3 to 4 minutes. Set aside." },
      { step: 2, instruction: "Heat ghee in the same kadai. Add mustard seeds and urad dal." },
      { step: 3, instruction: "Add curry leaves, green chilli and onion. Cook until soft." },
      { step: 4, instruction: "Add vegetables and cook for 3 to 4 minutes." },
      { step: 5, instruction: "Add water, salt and masala. Bring to a boil." },
      { step: 6, instruction: "Lower the heat and slowly add roasted rava while stirring continuously." },
      { step: 7, instruction: "Cover and cook for 3 to 4 minutes until fluffy." },
      { step: 8, instruction: "Mix gently and serve hot." , tip: { title: "Avoid lumps", content: "Keep stirring while adding the rava slowly. This is the easiest way to get smooth khara bath." } },
    ],
    notes: [
    ],
  },
  "puliyogare": {
    dishName: "Puliyogare",
    description: "Tangy Karnataka-style tamarind rice made with peanuts, sesame and a simple spice mix.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 cups", commonName: "Pakka Chawal", englishName: "cooked rice" },
      { amount: "2 tbsp", commonName: "Imli", englishName: "thick tamarind pulp" },
      { amount: "1 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1 tsp", commonName: "Urad Dal", englishName: "split black gram" },
      { amount: "2 tbsp", commonName: "Moongfali", englishName: "peanuts" },
      { amount: "1 tbsp", commonName: "Til", englishName: "sesame seeds" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tbsp", commonName: "Puliyogare Powder", englishName: "puliyogare spice powder" },
      { amount: "1 tsp", commonName: "Gud", englishName: "jaggery" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai. Add mustard seeds and let them pop." },
      { step: 2, instruction: "Add urad dal, peanuts, sesame seeds and curry leaves. Cook until lightly golden." },
      { step: 3, instruction: "Add turmeric and puliyogare powder. Stir for 20 seconds." },
      { step: 4, instruction: "Add tamarind pulp, jaggery, salt and 1/4 cup water." },
      { step: 5, instruction: "Cook for 3 to 4 minutes until the mixture becomes thick and glossy." },
      { step: 6, instruction: "Add cooked rice and mix gently." },
      { step: 7, instruction: "Cook on low heat for 2 minutes, then turn off the stove." },
      { step: 8, instruction: "Let it rest for 5 minutes before serving." , tip: { title: "Let it rest", content: "Puliyogare tastes better after a few minutes of resting because the tamarind masala spreads through the rice." } },
    ],
    notes: [
    ],
  },
  "aloo palya": {
    dishName: "Aloo Palya",
    description: "Simple Karnataka-style potato stir-fry with mustard, curry leaves and a little chilli.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 medium", commonName: "Aloo", englishName: "potatoes, boiled and cubed" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1 tsp", commonName: "Urad Dal", englishName: "split black gram" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Nariyal", englishName: "grated coconut, optional" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai. Add mustard seeds and let them pop." },
      { step: 2, instruction: "Add urad dal, green chilli and curry leaves. Cook until the dal turns light golden." },
      { step: 3, instruction: "Add turmeric and red chilli powder." },
      { step: 4, instruction: "Add boiled potato cubes and salt. Toss gently." },
      { step: 5, instruction: "Cook uncovered for 6 to 8 minutes until the edges turn lightly crisp." },
      { step: 6, instruction: "Add coconut if using and mix for 1 minute." },
      { step: 7, instruction: "Serve hot as a side with dosa, rice or roti." , tip: { title: "Do not over-stir", content: "Boiled potatoes can break easily. Toss gently instead of stirring constantly." } },
    ],
    notes: [
    ],
  },


  // added everyday home recipes
  "dal chawal": {
    dishName: "Dal Chawal",
    description: "Simple home-style yellow dal served with soft steamed rice.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Basmati Chawal", englishName: "basmati rice" },
      { amount: "1/2 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "3.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Rinse the rice and dal separately until the water is mostly clear." },
      { step: 2, instruction: "Add rice to the cooker with 2 cups water. Cook for 2 whistles and let pressure release." },
      { step: 3, instruction: "Add dal, turmeric, salt and 1.5 cups water to the cooker. Cook for 4 whistles and let pressure release." },
      { step: 4, instruction: "Heat ghee in a kadai. Add cumin, onion and green chilli. Cook until the onion softens." },
      { step: 5, instruction: "Add tomato and cook until soft and mushy." },
      { step: 6, instruction: "Add the cooked dal and a little water. Simmer for 4 to 5 minutes.", tip: { title: "Easy dal", content: "Keep the dal a little thinner than you want. It thickens as it sits." } },
      { step: 7, instruction: "Garnish with coriander and serve hot with the rice." },
    ],
    notes: [
      "Add a squeeze of lemon if you like a brighter dal.",
    ],
  },

  "aloo sabzi": {
    dishName: "Aloo Sabzi",
    description: "Simple dry potato sabzi with cumin, turmeric and chilli for an everyday meal.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 medium", commonName: "Aloo", englishName: "potatoes, boiled and cubed" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Hara Dhaniya", englishName: "coriander leaves" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add green chilli and cook for 20 seconds." },
      { step: 3, instruction: "Add turmeric, chilli powder and coriander powder. Stir for 10 seconds." },
      { step: 4, instruction: "Add boiled potatoes and salt. Toss gently so the potatoes stay in pieces." },
      { step: 5, instruction: "Cook uncovered for 6 to 8 minutes until the edges turn lightly crisp.", tip: { title: "Keep it dry", content: "Do not add water. A dry aloo sabzi is faster and tastes better with crisp edges." } },
      { step: 6, instruction: "Garnish with coriander and serve with roti or dal rice." },
    ],
    notes: [
    ],
  },

  "bread butter": {
    dishName: "Bread Butter",
    description: "Quick toasted bread spread with butter, perfect for breakfast or a snack.",
    prepTime: "Approx. 5 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 slices", commonName: "Bread", englishName: "bread slices" },
      { amount: "2 tbsp", commonName: "Makhan", englishName: "butter" },
    ],
    method: [
      { step: 1, instruction: "Heat a tawa on low to medium heat." },
      { step: 2, instruction: "Toast the bread for about 1 minute on each side." },
      { step: 3, instruction: "Spread butter on the hot bread and serve.", tip: { title: "Keep it crisp", content: "Use medium heat so the bread browns without burning." } },
    ],
    notes: [
    ],
  },

  "bread jam": {
    dishName: "Bread Jam",
    description: "Quick toasted bread spread with fruit jam for an easy breakfast or snack.",
    prepTime: "Approx. 5 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 slices", commonName: "Bread", englishName: "bread slices" },
      { amount: "3 tbsp", commonName: "Jam", englishName: "fruit jam" },
    ],
    method: [
      { step: 1, instruction: "Heat a tawa on low to medium heat." },
      { step: 2, instruction: "Toast the bread lightly on both sides." },
      { step: 3, instruction: "Spread jam over the warm bread and serve." },
    ],
    notes: [
    ],
  },

  "bread honey": {
    dishName: "Bread Honey",
    description: "Simple toasted bread finished with honey for a quick sweet snack.",
    prepTime: "Approx. 5 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4 slices", commonName: "Bread", englishName: "bread slices" },
      { amount: "3 tbsp", commonName: "Shehad", englishName: "honey" },
    ],
    method: [
      { step: 1, instruction: "Heat a tawa on low to medium heat." },
      { step: 2, instruction: "Toast the bread lightly on both sides." },
      { step: 3, instruction: "Drizzle honey over the warm bread and serve.", tip: { title: "Do not overheat honey", content: "Add honey after toasting so it stays easy to spread." } },
    ],
    notes: [
    ],
  },

  "dahi (homemade curd)": {
    dishName: "Dahi (Homemade Curd)",
    description: "Fresh homemade curd made by setting milk with a little existing curd.",
    prepTime: "Approx. 15 minutes active (plus 6 to 8 hours setting)",
    equipment: [
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 litre", commonName: "Doodh", englishName: "full-fat milk" },
      { amount: "2 tbsp", commonName: "Dahi", englishName: "plain curd, as starter" },
    ],
    method: [
      { step: 1, instruction: "Heat milk on the stove until it comes to a full boil." },
      { step: 2, instruction: "Turn off the stove and let the milk cool until it feels warm, not hot.", tip: { title: "Important", content: "Very hot milk can kill the cultures and stop the curd from setting." } },
      { step: 3, instruction: "Mix the starter curd until smooth and stir it gently into the warm milk." },
      { step: 4, instruction: "Cover and keep the milk in a warm place for 6 to 8 hours without moving it." },
      { step: 5, instruction: "Once set, refrigerate the curd before serving." },
    ],
    notes: [
      "Use a spoonful of fresh plain curd as the starter for the next batch.",
    ],
  },

  "mutter poha (peas poha)": {
    dishName: "Mutter Poha",
    description: "Light flattened rice cooked with green peas, onion, peanuts and lemon.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Poha", englishName: "flattened rice" },
      { amount: "1/2 cup", commonName: "Matar", englishName: "green peas" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "2 tbsp", commonName: "Moongfali", englishName: "peanuts" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "a few", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1", commonName: "Nimbu", englishName: "lemon" },
    ],
    method: [
      { step: 1, instruction: "Rinse poha in a strainer until soft. Do not soak it." },
      { step: 2, instruction: "Heat oil in a kadai. Add mustard seeds and let them pop." },
      { step: 3, instruction: "Add peanuts, curry leaves, green chilli and onion. Cook until the onion softens." },
      { step: 4, instruction: "Add peas, turmeric and salt. Cook for 3 to 4 minutes." },
      { step: 5, instruction: "Add the poha and toss gently. Cover and cook for 2 minutes.", tip: { title: "Keep it fluffy", content: "Do not stir the poha too much after adding it." } },
      { step: 6, instruction: "Turn off the stove, add lemon juice and mix gently." },
    ],
    notes: [
    ],
  },

  "mixed veg sabzi": {
    dishName: "Mixed Veg Sabzi",
    description: "Simple everyday mixed vegetables cooked with onion, tomato and mild spices.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Aloo", englishName: "potato, cubed" },
      { amount: "1 cup", commonName: "Mixed Vegetables", englishName: "carrot, beans, peas and cauliflower" },
      { amount: "1", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai and add cumin seeds." },
      { step: 2, instruction: "Add onion and cook until soft and lightly golden." },
      { step: 3, instruction: "Add ginger-garlic paste and cook for 30 seconds." },
      { step: 4, instruction: "Add tomato, turmeric, coriander powder and chilli powder. Cook until soft." },
      { step: 5, instruction: "Add potato, mixed vegetables and salt. Toss well." },
      { step: 6, instruction: "Add water, cover and cook on low heat for 12 to 15 minutes until the vegetables are tender.", tip: { title: "Check the vegetables", content: "Add another splash of water if the pan gets dry before the vegetables are cooked." } },
      { step: 7, instruction: "Open the lid and cook for 2 minutes to remove excess moisture." },
    ],
    notes: [
    ],
  },

  "shukto": {
    dishName: "Shukto",
    description: "Bengali-style mixed vegetable curry with bitter gourd and a gentle mustard finish.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 small", commonName: "Karela", englishName: "bitter gourd, sliced" },
      { amount: "1 medium", commonName: "Aloo", englishName: "potato, cubed" },
      { amount: "1 small", commonName: "Kacha Kela", englishName: "raw banana, cubed" },
      { amount: "1 small", commonName: "Baingan", englishName: "eggplant, cubed" },
      { amount: "1/2 cup", commonName: "Mooli", englishName: "radish, sliced" },
      { amount: "1 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Methi", englishName: "fenugreek seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 tbsp", commonName: "Sarson", englishName: "yellow mustard seeds for paste" },
      { amount: "2 tbsp", commonName: "Nariyal", englishName: "grated coconut" },
      { amount: "1/2 cup", commonName: "Doodh", englishName: "milk" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "mustard oil or cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
    ],
    method: [
      { step: 1, instruction: "Soak the mustard seeds in a little water for 10 minutes, then grind them with coconut into a smooth paste." },
      { step: 2, instruction: "Heat oil in a kadai. Add fenugreek and cumin seeds and let them sizzle." },
      { step: 3, instruction: "Add bitter gourd and cook for 2 minutes." },
      { step: 4, instruction: "Add potato, raw banana, eggplant and radish. Toss for 3 minutes." },
      { step: 5, instruction: "Add turmeric, salt and water. Cover and cook on low heat until the vegetables are tender." },
      { step: 6, instruction: "Lower the heat. Stir in mustard-coconut paste and milk.", tip: { title: "Keep it gentle", content: "Do not boil hard after adding the milk and mustard paste." } },
      { step: 7, instruction: "Simmer for 3 to 4 minutes and turn off the stove." },
    ],
    notes: [
      "Shukto should be mildly bitter, creamy and light rather than spicy.",
    ],
  },

  "vermicelli (masala seviyan)": {
    dishName: "Vermicelli (Masala Seviyan)",
    description: "Quick savory vermicelli cooked with vegetables, peanuts and simple Indian spices.",
    prepTime: "Approx. 20 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Vermicelli", englishName: "thin vermicelli" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "1/2 cup", commonName: "Mixed Vegetables", englishName: "peas, carrot and beans, chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2 tbsp", commonName: "Moongfali", englishName: "peanuts" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1", commonName: "Nimbu", englishName: "lemon" },
    ],
    method: [
      { step: 1, instruction: "Dry roast the vermicelli in a kadai for 2 to 3 minutes. Set it aside." },
      { step: 2, instruction: "Heat oil and add mustard seeds, cumin seeds and peanuts. Cook until the peanuts turn lightly golden." },
      { step: 3, instruction: "Add onion and green chilli. Cook until soft." },
      { step: 4, instruction: "Add vegetables, turmeric and salt. Cook for 3 minutes." },
      { step: 5, instruction: "Add water and bring it to a boil." },
      { step: 6, instruction: "Add roasted vermicelli and stir. Cover and cook on low heat for 4 to 5 minutes until the water is absorbed.", tip: { title: "Avoid mushy seviyan", content: "Turn off the stove as soon as the water is absorbed." } },
      { step: 7, instruction: "Add lemon juice, fluff gently and serve." },
    ],
    notes: [
      "This is the savory Indian breakfast-style version.",
    ],
  },

  "chocolate cake": {
    dishName: "Chocolate Cake",
    description: "Easy eggless chocolate cake made in a home oven with cocoa and curd.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "oven", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "3/4 cup", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 cup", commonName: "Cocoa Powder", englishName: "unsweetened cocoa powder" },
      { amount: "1 tsp", commonName: "Baking Powder", englishName: "baking powder" },
      { amount: "1/2 tsp", commonName: "Baking Soda", englishName: "baking soda" },
      { amount: "3/4 cup", commonName: "Dahi", englishName: "thick curd" },
      { amount: "1/2 cup", commonName: "Doodh", englishName: "milk" },
      { amount: "1/2 cup", commonName: "Tel", englishName: "neutral oil" },
      { amount: "1 tsp", commonName: "Vanilla", englishName: "vanilla essence" },
      { amount: "1/2 cup", commonName: "Chocolate Chips", englishName: "chocolate chips, optional" },
    ],
    method: [
      { step: 1, instruction: "Preheat the oven to 180°C." },
      { step: 2, instruction: "Mix flour, cocoa, baking powder and baking soda in one bowl." },
      { step: 3, instruction: "In another bowl, mix curd, sugar, oil, milk and vanilla until smooth." },
      { step: 4, instruction: "Add the dry ingredients to the wet mixture. Mix just until the flour disappears.", tip: { title: "Do not overmix", content: "Over-mixing can make the cake dense." } },
      { step: 5, instruction: "Pour into a greased cake tin. Add chocolate chips if using." },
      { step: 6, instruction: "Bake at 180°C for 30 to 35 minutes until a knife comes out clean." },
      { step: 7, instruction: "Cool for 15 minutes before removing and slicing." },
    ],
    notes: [
    ],
  },

  "strawberry cake": {
    dishName: "Strawberry Cake",
    description: "Simple eggless vanilla cake topped with fresh strawberries and lightly sweetened cream.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "oven", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "3/4 cup", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "thick curd" },
      { amount: "1/2 cup", commonName: "Doodh", englishName: "milk" },
      { amount: "1/2 cup", commonName: "Tel", englishName: "neutral oil" },
      { amount: "1 tsp", commonName: "Baking Powder", englishName: "baking powder" },
      { amount: "1/2 tsp", commonName: "Baking Soda", englishName: "baking soda" },
      { amount: "1 tsp", commonName: "Vanilla", englishName: "vanilla essence" },
      { amount: "1 cup", commonName: "Strawberry", englishName: "fresh strawberries, sliced" },
      { amount: "1/2 cup", commonName: "Malai", englishName: "fresh cream" },
    ],
    method: [
      { step: 1, instruction: "Preheat the oven to 180°C." },
      { step: 2, instruction: "Mix flour, baking powder and baking soda." },
      { step: 3, instruction: "Mix curd, sugar, milk, oil and vanilla until smooth." },
      { step: 4, instruction: "Fold the dry mixture into the wet mixture until just combined." },
      { step: 5, instruction: "Pour into a greased cake tin and bake for 30 to 35 minutes." },
      { step: 6, instruction: "Cool the cake fully." },
      { step: 7, instruction: "Top with lightly whipped cream and sliced strawberries.", tip: { title: "Cool before topping", content: "Warm cake can melt the cream and make the topping slide." } },
    ],
    notes: [
      "Use chilled cream and fresh strawberries for the easiest topping.",
    ],
  },

  "pineapple cake": {
    dishName: "Pineapple Cake",
    description: "Easy eggless sponge topped with pineapple pieces and lightly sweetened cream.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "oven", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1.5 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "3/4 cup", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "thick curd" },
      { amount: "1/2 cup", commonName: "Doodh", englishName: "milk" },
      { amount: "1/2 cup", commonName: "Tel", englishName: "neutral oil" },
      { amount: "1 tsp", commonName: "Baking Powder", englishName: "baking powder" },
      { amount: "1/2 tsp", commonName: "Baking Soda", englishName: "baking soda" },
      { amount: "1 tsp", commonName: "Vanilla", englishName: "vanilla essence" },
      { amount: "1 cup", commonName: "Ananas", englishName: "pineapple pieces, drained" },
      { amount: "1/2 cup", commonName: "Malai", englishName: "fresh cream" },
    ],
    method: [
      { step: 1, instruction: "Preheat the oven to 180°C." },
      { step: 2, instruction: "Mix flour, baking powder and baking soda." },
      { step: 3, instruction: "Mix curd, sugar, milk, oil and vanilla until smooth." },
      { step: 4, instruction: "Fold the dry mixture into the wet mixture until just combined." },
      { step: 5, instruction: "Pour into a greased cake tin and bake for 30 to 35 minutes." },
      { step: 6, instruction: "Cool the cake fully." },
      { step: 7, instruction: "Top with cream and drained pineapple pieces.", tip: { title: "Drain the fruit well", content: "Extra pineapple juice can make the cake soggy." } },
    ],
    notes: [
    ],
  },

  "aamti": {
    dishName: "Aamti",
    description: "Maharashtrian-style toor dal with goda masala, tamarind and a little jaggery.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1 tbsp", commonName: "Goda Masala", englishName: "Maharashtrian goda masala" },
      { amount: "1 tbsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1 tsp", commonName: "Gud", englishName: "jaggery" },
      { amount: "1 tbsp", commonName: "Nariyal", englishName: "grated coconut" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil" },
      { amount: "4 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Rinse the toor dal and cook it in a cooker with turmeric and 3 cups water for 4 to 5 whistles." },
      { step: 2, instruction: "Let the pressure release, then lightly mash the dal." },
      { step: 3, instruction: "Heat oil in a kadai. Add mustard seeds and cumin seeds." },
      { step: 4, instruction: "Add goda masala and stir for 15 seconds." },
      { step: 5, instruction: "Add dal, tamarind, jaggery, coconut and salt." },
      { step: 6, instruction: "Add water as needed and simmer for 8 to 10 minutes.", tip: { title: "Balance the flavor", content: "Aamti should taste mildly sweet, tangy and spiced. Adjust jaggery or tamarind at the end." } },
      { step: 7, instruction: "Serve hot with steamed rice." },
    ],
    notes: [
    ],
  },

  "gobhi paratha": {
    dishName: "Gobhi Paratha",
    description: "Whole-wheat flatbread stuffed with spiced grated cauliflower and cooked on a tawa.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Atta", englishName: "whole wheat flour" },
      { amount: "2 cups", commonName: "Gobi", englishName: "cauliflower, finely grated" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "1 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil or ghee" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix atta, a pinch of salt and enough water to make a soft dough. Rest for 15 minutes." },
      { step: 2, instruction: "Squeeze excess water from grated cauliflower." },
      { step: 3, instruction: "Mix cauliflower with chilli, spices, coriander and salt." },
      { step: 4, instruction: "Take a dough ball, flatten it and place filling in the centre. Bring the edges together and seal." },
      { step: 5, instruction: "Flatten gently and place on a hot tawa." },
      { step: 6, instruction: "Cook both sides, adding a little oil or ghee, until golden spots appear.", tip: { title: "Avoid soggy filling", content: "Squeeze the cauliflower well before making the filling." } },
      { step: 7, instruction: "Serve hot with curd or pickle." },
    ],
    notes: [
    ],
  },

  "mooli paratha": {
    dishName: "Mooli Paratha",
    description: "Whole-wheat flatbread stuffed with spiced grated radish and cooked on a tawa.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "tawa", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Atta", englishName: "whole wheat flour" },
      { amount: "2 cups", commonName: "Mooli", englishName: "radish, grated" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, chopped" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Amchur", englishName: "dry mango powder" },
      { amount: "1 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil or ghee" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Make a soft dough with atta, salt and water. Rest for 15 minutes." },
      { step: 2, instruction: "Squeeze as much water as possible from the grated radish." },
      { step: 3, instruction: "Mix radish with chilli, spices, coriander and salt." },
      { step: 4, instruction: "Fill a dough ball with the radish mixture and seal it." },
      { step: 5, instruction: "Flatten gently and cook on a hot tawa." },
      { step: 6, instruction: "Cook both sides with a little oil or ghee until golden.", tip: { title: "Keep the filling dry", content: "Radish releases water quickly, so mix the salt into the filling just before stuffing." } },
      { step: 7, instruction: "Serve hot with curd or pickle." },
    ],
    notes: [
    ],
  },

  "paneer momos": {
    dishName: "Paneer Momos",
    description: "Soft steamed dumplings filled with paneer, cabbage and simple spices, easy to make at home.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "200 g", commonName: "Paneer", englishName: "crumbled paneer" },
      { amount: "1 cup", commonName: "Patta Gobhi", englishName: "cabbage, finely chopped" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "ginger, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1 tsp", commonName: "Soya Sauce", englishName: "soy sauce" },
      { amount: "1/2 tsp", commonName: "Kali Mirch", englishName: "black pepper" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix maida, a pinch of salt and enough water to make a soft dough. Rest for 20 minutes." },
      { step: 2, instruction: "Mix paneer, cabbage, onion, ginger, chilli, soy sauce, pepper and salt." },
      { step: 3, instruction: "Divide the dough into small balls and flatten each one into a thin circle." },
      { step: 4, instruction: "Place a little filling in the centre and fold the edges to seal the momo." },
      { step: 5, instruction: "Add 2 to 3 cups water to a cooker and place the momos on a lightly greased plate above the water." },
      { step: 6, instruction: "Cover and steam for 10 to 12 minutes until the wrappers look slightly glossy.", tip: { title: "Steam, do not boil", content: "Keep the momos above the water so they steam gently." } },
      { step: 7, instruction: "Serve hot with red chilli chutney." },
    ],
    notes: [
    ],
  },

  "chicken momos": {
    dishName: "Chicken Momos",
    description: "Steamed dumplings filled with seasoned chicken and vegetables, made in a home cooker.",
    prepTime: "Approx. 55 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "250 g", commonName: "Chicken", englishName: "chicken mince" },
      { amount: "1 cup", commonName: "Patta Gobhi", englishName: "cabbage, finely chopped" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1 tsp", commonName: "Soya Sauce", englishName: "soy sauce" },
      { amount: "1/2 tsp", commonName: "Kali Mirch", englishName: "black pepper" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix maida, a pinch of salt and enough water to make a soft dough. Rest for 20 minutes." },
      { step: 2, instruction: "Mix chicken mince, cabbage, onion, ginger-garlic paste, chilli, soy sauce, pepper and salt." },
      { step: 3, instruction: "Roll small dough balls into thin circles." },
      { step: 4, instruction: "Place a little filling in the centre and seal the edges tightly." },
      { step: 5, instruction: "Add water to a cooker and place the momos above the water on a lightly greased plate." },
      { step: 6, instruction: "Cover and steam for 12 to 15 minutes until the chicken is fully cooked.", tip: { title: "Check the centre", content: "Cut one momo open before serving the batch. The chicken should be fully cooked with no pink centre." } },
      { step: 7, instruction: "Serve hot with chilli chutney." },
    ],
    notes: [
    ],
  },

  "tandoori momos": {
    dishName: "Tandoori Momos",
    description: "Home-style baked momos coated in a smoky-spiced yogurt marinade, using an oven instead of a tandoor.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "oven", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "12", commonName: "Momos", englishName: "prepared veg or paneer momos" },
      { amount: "1/2 cup", commonName: "Dahi", englishName: "thick yogurt" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1 tbsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix yogurt, spices, ginger-garlic paste, lemon juice, oil and salt into a smooth marinade." },
      { step: 2, instruction: "Coat the prepared momos well with the marinade." },
      { step: 3, instruction: "Rest the coated momos for 15 minutes." },
      { step: 4, instruction: "Preheat the oven to 220°C." },
      { step: 5, instruction: "Place the momos on a lightly greased tray and bake for 12 to 15 minutes." },
      { step: 6, instruction: "Turn them once and bake for 5 more minutes until lightly charred.", tip: { title: "For more color", content: "Brush a little oil on the momos before the final 5 minutes." } },
      { step: 7, instruction: "Serve hot with mint chutney or onion rings." },
    ],
    notes: [
      "Use prepared veg or paneer momos when you want the fastest home version.",
    ],
  },

  "home style pizza": {
    dishName: "Pizza",
    description:
      "An easy homemade vegetable pizza with a crisp base, pizza sauce, cheese and simple toppings baked in a home oven.",
    prepTime: "Approx. 45 minutes (plus 45 minutes dough resting)",
    equipment: [
      { item: "oven", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "1 tsp", commonName: "Active Dry Yeast", englishName: "active dry yeast" },
      { amount: "1 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "3/4 cup", commonName: "Paani", englishName: "warm water, as needed" },
      { amount: "1/2 cup", commonName: "Pizza Sauce", englishName: "pizza sauce" },
      { amount: "1 cup", commonName: "Mozzarella Cheese", englishName: "mozzarella cheese, grated" },
      { amount: "1/2", commonName: "Shimla Mirch", englishName: "capsicum, thinly sliced" },
      { amount: "1/2", commonName: "Pyaaz", englishName: "onion, thinly sliced" },
      { amount: "2 tbsp", commonName: "Sweet Corn", englishName: "sweet corn, optional" },
      { amount: "1/2 tsp", commonName: "Oregano", englishName: "dried oregano" },
      { amount: "1/2 tsp", commonName: "Chilli Flakes", englishName: "red chilli flakes, optional" },
    ],
    method: [
      { step: 1, instruction: "Mix yeast, sugar and warm water. Rest for 5 to 10 minutes until slightly frothy." },
      { step: 2, instruction: "Add maida, salt and oil. Knead into a soft dough. Rest covered for 45 minutes." },
      { step: 3, instruction: "Preheat the oven to 220°C." },
      { step: 4, instruction: "Cook the capsicum and onion in a pan with a little oil for 2 minutes. Keep them slightly crisp." },
      { step: 5, instruction: "Flatten the dough into a round base and spread pizza sauce over it." },
      { step: 6, instruction: "Add mozzarella, vegetables and corn if using. Sprinkle oregano and chilli flakes." },
      { step: 7, instruction: "Bake for 10 to 14 minutes until the cheese melts and the edges are golden.", tip: { title: "Watch the edges", content: "Start checking after 10 minutes because ovens vary." } },
      { step: 8, instruction: "Slice and serve hot." },
    ],
    notes: [
      "For an easier version, use a ready-made pizza base and skip the dough steps.",
    ],
  },

  "home style burger": {
    dishName: "Burger",
    description:
      "A simple homemade veg burger with a crisp potato-vegetable patty, bun, cheese and fresh toppings cooked on the stove.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2", commonName: "Burger Buns", englishName: "burger buns" },
      { amount: "2 medium", commonName: "Aloo", englishName: "potatoes, boiled and mashed" },
      { amount: "1/2 cup", commonName: "Mixed Vegetables", englishName: "carrot and peas, finely chopped" },
      { amount: "1 tbsp", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "2 tbsp", commonName: "Bread Crumbs", englishName: "breadcrumbs" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "2 slices", commonName: "Cheese", englishName: "cheese, optional" },
      { amount: "2 tbsp", commonName: "Mayonnaise", englishName: "mayonnaise, optional" },
      { amount: "2 tbsp", commonName: "Tomato Ketchup", englishName: "tomato ketchup" },
      { amount: "4 leaves", commonName: "Lettuce", englishName: "lettuce, optional" },
      { amount: "1", commonName: "Tamatar", englishName: "tomato, sliced" },
      { amount: "1/2", commonName: "Pyaaz", englishName: "onion, sliced" },
    ],
    method: [
      { step: 1, instruction: "Mix mashed potato, vegetables, onion, breadcrumbs, spices and salt." },
      { step: 2, instruction: "Shape the mixture into two thick patties. Chill for 10 minutes if they feel soft." },
      { step: 3, instruction: "Heat a little oil in a pan and cook the patties for 3 to 4 minutes on each side until golden." },
      { step: 4, instruction: "Toast the cut sides of the buns in the same pan for 1 to 2 minutes." },
      { step: 5, instruction: "Spread ketchup and mayonnaise if using on the bun halves." },
      { step: 6, instruction: "Add lettuce, tomato, onion and the hot patty. Add cheese if using." },
      { step: 7, instruction: "Close the burger and serve immediately.", tip: { title: "Keep it crisp", content: "Toast the buns just before assembling so the sauce does not make them soggy." } },
    ],
    notes: [
      "For a simpler burger, use only the potato patty, ketchup, onion and tomato.",
    ],
  },
};