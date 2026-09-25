import { Recipe } from "../types";

// Researched kitchen-data pass: all 196 predefined recipes were audited for practical home cooking.
// Nutrition values are rounded estimates per serving based on the recipe yield below.
// Actual nutrition varies with ingredient brands, produce size, and oil absorption.

export const predefinedRecipes: Record<string, Recipe> = {
  "quick 20-minute paneer bhurji": {
    "dishName": "Paneer Bhurji",
    "description": "A quick, spicy and comforting Indian paneer dish made with crumbled paneer, onions,.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "200 g",
        "commonName": "Paneer",
        "englishName": "paneer"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomato"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a pan over medium heat. Add the cumin seeds and let them sizzle for about 10 seconds."
      },
      {
        "step": 2,
        "instruction": "Add the chopped onion and green chilli. Cook for 3 to 4 minutes, stirring often, until the onion turns soft and lightly golden."
      },
      {
        "step": 3,
        "instruction": "Add the chopped tomatoes. Cook for 4 to 5 minutes until they turn soft and the mixture looks jammy."
      },
      {
        "step": 4,
        "instruction": "Add turmeric, red chilli powder and salt. Stir well."
      },
      {
        "step": 5,
        "instruction": "Crumble the paneer with your hands and add it to the pan."
      },
      {
        "step": 6,
        "instruction": "Gently mix the paneer into the masala and cook for 1 to 2 minutes only, just until heated through."
      },
      {
        "step": 7,
        "instruction": "Sprinkle garam masala and give it one final mix.",
        "tip": {
          "title": "Keep the paneer soft",
          "content": "Don't cook the paneer for too long or it can turn chewy and rubbery."
        }
      },
      {
        "step": 8,
        "instruction": "Serve hot with roti, paratha or bread."
      }
    ],
    "notes": [
      "Add chopped coriander leaves at the end for extra freshness.",
      "Adjust the green chilli and red chilli powder to your spice preference."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 20,
      "carbs": 9,
      "fat": 27
    }
  },
  "poha (kanda batata poha)": {
    "dishName": "Poha (Kanda Batata Poha)",
    "description": "A light, tangy flattened-rice breakfast tempered with mustard seeds, curry leaves, peanuts and.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Poha",
        "englishName": "flattened rice"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Aloo",
        "englishName": "potato, chopped (optional)"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Moongfali",
        "englishName": "peanuts"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar (optional)"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1",
        "commonName": "Nimbu",
        "englishName": "lemon"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse the poha in a colander for a few seconds, tossing it gently, until the flakes are softened but still separate. Drain well and let it rest for 5 minutes."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a pan and add mustard seeds. Let them pop."
      },
      {
        "step": 3,
        "instruction": "Add peanuts and fry until lightly golden."
      },
      {
        "step": 4,
        "instruction": "Add curry leaves and chopped onion. If using potato, add it now and cook covered for 4 to 5 minutes, stirring once or twice, until the potato is tender."
      },
      {
        "step": 5,
        "instruction": "Add turmeric, green chilli, salt and sugar. Mix well."
      },
      {
        "step": 6,
        "instruction": "Add the softened poha and toss gently to combine. Cover and cook for 2 to 3 minutes on low heat."
      },
      {
        "step": 7,
        "instruction": "Turn off the heat, squeeze in lemon juice and garnish with coriander.",
        "tip": {
          "title": "Don't soak",
          "content": "Rinse the poha instead of soaking it. Soaking can make it mushy instead of light and fluffy."
        }
      }
    ],
    "notes": [
      "If using very thin poha, rinse quickly so it does not turn mushy.",
      "Add peas or a little grated coconut if you like."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 7,
      "carbs": 53,
      "fat": 10
    }
  },
  "vegetable upma": {
    "dishName": "Vegetable Upma",
    "description": "A warm, savory semolina porridge studded with vegetables and tempered spices.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Rava",
        "englishName": "semolina"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, peas and beans, chopped"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Urad Dal",
        "englishName": "split black gram"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "2.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "to taste",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dry roast rava in a pan on low heat until lightly aromatic and slightly golden. Set it aside."
      },
      {
        "step": 2,
        "instruction": "Heat oil, add mustard seeds and urad dal, and let them sizzle until the dal turns light golden."
      },
      {
        "step": 3,
        "instruction": "Add curry leaves, green chilli and onion. Cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add chopped vegetables and cook for 3 to 4 minutes."
      },
      {
        "step": 5,
        "instruction": "Add water and salt, and bring it to a boil."
      },
      {
        "step": 6,
        "instruction": "Lower the heat. Add the hot water slowly while stirring, then sprinkle in the roasted rava gradually while stirring continuously."
      },
      {
        "step": 7,
        "instruction": "Cover and cook on low heat for 3 to 4 minutes, until the water is absorbed and the rava is soft and fluffy."
      },
      {
        "step": 8,
        "instruction": "Squeeze in lemon juice, fluff gently and serve hot.",
        "tip": {
          "title": "Avoid lumps",
          "content": "Add the rava slowly while stirring constantly. This prevents almost all lumps."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 285,
      "protein": 8,
      "carbs": 43,
      "fat": 9
    }
  },
  "egg bhurji (anda bhurji)": {
    "dishName": "Egg Bhurji (Anda Bhurji)",
    "description": "Spicy scrambled eggs cooked with onions, tomatoes and chillies.",
    "prepTime": "Approx. 15 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4",
        "commonName": "Ande",
        "englishName": "eggs"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a pan. Add chopped onion and green chilli and cook until soft."
      },
      {
        "step": 2,
        "instruction": "Add chopped tomato and cook until mushy."
      },
      {
        "step": 3,
        "instruction": "Add turmeric, red chilli powder and salt. Mix well."
      },
      {
        "step": 4,
        "instruction": "Crack the eggs into a bowl and whisk them briefly. Pour them into the pan over the cooked masala."
      },
      {
        "step": 5,
        "instruction": "Let the eggs sit undisturbed for about 20 seconds, then gently stir and fold until just set, about 2 minutes. Remove from heat while they still look slightly glossy.",
        "tip": {
          "title": "Don't overcook",
          "content": "Stop stirring the moment the eggs look just set. Residual heat finishes them and keeps them soft."
        }
      },
      {
        "step": 6,
        "instruction": "Garnish with coriander and serve hot with toast or roti."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 300,
      "protein": 15,
      "carbs": 6,
      "fat": 24
    }
  },
  "quick vegetable pulao": {
    "dishName": "Quick Vegetable Pulao",
    "description": "A fragrant one-pot rice dish loaded with mixed vegetables and whole spices, ready.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice, rinsed and soaked 15 minutes"
      },
      {
        "amount": "1 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, peas and beans"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1 inch",
        "commonName": "Dalchini",
        "englishName": "cinnamon"
      },
      {
        "amount": "3",
        "commonName": "Laung",
        "englishName": "cloves"
      },
      {
        "amount": "2",
        "commonName": "Elaichi",
        "englishName": "cardamom pods"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "1 1/2 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat ghee in a pot and add the whole spices. Let them sizzle for a few seconds."
      },
      {
        "step": 2,
        "instruction": "Add sliced onion and cook until light golden."
      },
      {
        "step": 3,
        "instruction": "Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 4,
        "instruction": "Add mixed vegetables and sauté for 2 to 3 minutes."
      },
      {
        "step": 5,
        "instruction": "Drain the soaked rice, add it to the pot and stir gently for a minute to coat it in ghee."
      },
      {
        "step": 6,
        "instruction": "Add water and salt, and bring to a boil."
      },
      {
        "step": 7,
        "instruction": "Cover and cook on low heat for 12 to 15 minutes, until the water is absorbed and the rice is tender. Do not stir while it cooks."
      },
      {
        "step": 8,
        "instruction": "Let it rest covered for 5 minutes, then fluff gently with a fork.",
        "tip": {
          "title": "Handle gently",
          "content": "Don't stir the rice too much once it is cooking. Excess stirring can break the grains."
        }
      }
    ],
    "notes": [
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 7,
      "carbs": 55,
      "fat": 9
    }
  },
  "healthy moong dal cheela": {
    "dishName": "Moong Dal Cheela",
    "description": "A light, protein-rich savoury pancake made from ground yellow moong dal, perfect for.",
    "prepTime": "Approx. 30 minutes (plus 2 hours soaking)",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Peeli Moong Dal",
        "englishName": "split yellow moong dal (soaked 2 hrs)"
      },
      {
        "amount": "1 inch",
        "commonName": "Adrak",
        "englishName": "ginger"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil, for cooking"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked moong dal and add it to a mixer grinder with ginger, green chilli and a little water."
      },
      {
        "step": 2,
        "instruction": "Grind with a little water to make a smooth, pourable batter that is slightly thicker than dosa batter."
      },
      {
        "step": 3,
        "instruction": "Pour the batter into a bowl. Add cumin seeds, chopped onion, coriander leaves and salt. Mix well."
      },
      {
        "step": 4,
        "instruction": "Heat a tawa on medium flame. Once hot, pour a ladle of batter in the centre."
      },
      {
        "step": 5,
        "instruction": "Pour a ladleful of batter onto the hot tawa and spread it gently into a thin circle, about 12 to 15 cm wide.",
        "tip": {
          "title": "Keep it thin",
          "content": "A thinner cheela cooks faster and turns out crisper at the edges."
        }
      },
      {
        "step": 6,
        "instruction": "Drizzle a little oil around the edges. Cook for 2 to 3 minutes until the base turns golden."
      },
      {
        "step": 7,
        "instruction": "Flip carefully and cook the other side for another 1 to 2 minutes."
      },
      {
        "step": 8,
        "instruction": "Serve hot with mint chutney or plain yogurt."
      }
    ],
    "notes": [
      "Soaking the dal for at least 2 hours makes grinding much easier. You can soak it the night before if you're short on time.",
      "Add grated carrot or finely chopped spinach to the batter for extra nutrition."
    ],
    "nutrition": {
      "calories": 290,
      "protein": 16,
      "carbs": 38,
      "fat": 8
    }
  },
  "vegetable dalia (broken wheat porridge)": {
    "dishName": "Vegetable Dalia (Broken Wheat Porridge)",
    "description": "A light, fiber-rich savory porridge made from broken wheat and vegetables.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Dalia",
        "englishName": "broken wheat"
      },
      {
        "amount": "1 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "mixed vegetables, chopped"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dry roast dalia in a pan for 2 to 3 minutes until lightly aromatic. Set it aside."
      },
      {
        "step": 2,
        "instruction": "Heat oil, add mustard and cumin seeds, and let them sizzle."
      },
      {
        "step": 3,
        "instruction": "Add chopped onion and cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add vegetables and sauté for 2 to 3 minutes."
      },
      {
        "step": 5,
        "instruction": "Add turmeric and salt. Mix well."
      },
      {
        "step": 6,
        "instruction": "Add water and bring it to a boil."
      },
      {
        "step": 7,
        "instruction": "Add the roasted dalia and water. Cook covered on low heat for 12 to 15 minutes, stirring once or twice, until tender. Add a splash of hot water if you want it softer."
      },
      {
        "step": 8,
        "instruction": "Serve hot, optionally with a spoon of ghee on top."
      }
    ],
    "notes": [
      "Great for breakfast or a light dinner. Keep it slightly soupy for easier digestion."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 8,
      "carbs": 38,
      "fat": 6
    }
  },
  "curd rice (thayir sadam)": {
    "dishName": "Curd Rice (Thayir Sadam)",
    "description": "Cool, comforting rice mixed with yogurt and a light tempering.",
    "prepTime": "Approx. 15 minutes (plus cooked rice)",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Pakka Chawal",
        "englishName": "cooked rice"
      },
      {
        "amount": "1 cup",
        "commonName": "Dahi",
        "englishName": "curd / yogurt"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Doodh",
        "englishName": "milk, optional"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Urad Dal",
        "englishName": "split black gram"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Adrak",
        "englishName": "grated ginger"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "optional",
        "commonName": "Anar ya Angoor",
        "englishName": "pomegranate or grapes for garnish"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mash the cooked rice lightly while it is still warm. Let it cool until just warm rather than hot."
      },
      {
        "step": 2,
        "instruction": "Add curd, milk and salt. Mix until creamy. Add a tablespoon or two of water if the mixture feels too thick."
      },
      {
        "step": 3,
        "instruction": "In a small pan, heat oil. Add mustard seeds and urad dal and let them sizzle until golden."
      },
      {
        "step": 4,
        "instruction": "Add curry leaves, green chilli and grated ginger. Sizzle for a few seconds."
      },
      {
        "step": 5,
        "instruction": "Pour the tempering over the curd rice and mix."
      },
      {
        "step": 6,
        "instruction": "Chill for 20 to 30 minutes before serving for best flavor, or serve at room temperature."
      }
    ],
    "notes": [
      "Add the milk if you're not eating right away. It helps keep curd rice from becoming too sour or dry.",
      "For the best texture, use soft-cooked short- or medium-grain rice and do not mix the curd into piping-hot rice."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 7,
      "carbs": 38,
      "fat": 8
    }
  },
  "sprouts chaat": {
    "dishName": "Sprouts Chaat",
    "description": "A crunchy, protein-rich salad of sprouted moong beans tossed with vegetables, lemon and spices.",
    "prepTime": "Approx. 15 minutes (plus sprouting time)",
    "equipment": [],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Sprouted Moong",
        "englishName": "sprouted moong beans"
      },
      {
        "amount": "1/2",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1/2",
        "commonName": "Kheera",
        "englishName": "cucumber, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1",
        "commonName": "Nimbu",
        "englishName": "lemon"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Bhuna Jeera Powder",
        "englishName": "roasted cumin powder"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "For home-sprouted moong, steam or boil the sprouts for 3 to 5 minutes, then drain and cool. Packaged ready-to-eat sprouts can be used as directed on the pack."
      },
      {
        "step": 2,
        "instruction": "In a bowl, combine sprouts, chopped onion, tomato and cucumber."
      },
      {
        "step": 3,
        "instruction": "Add chopped green chilli, chaat masala, roasted cumin powder and salt."
      },
      {
        "step": 4,
        "instruction": "Squeeze lemon juice over the top."
      },
      {
        "step": 5,
        "instruction": "Toss well and garnish with coriander leaves."
      },
      {
        "step": 6,
        "instruction": "Serve immediately for maximum crunch."
      }
    ],
    "notes": [
      "To sprout moong at home, soak overnight, then keep wrapped in a damp cloth for a day.",
      "Raw or lightly cooked sprouts can carry harmful bacteria, so thoroughly cooked sprouts are the safer choice for children, older adults, pregnant people and anyone with a weakened immune system."
    ],
    "nutrition": {
      "calories": 120,
      "protein": 7,
      "carbs": 21,
      "fat": 1
    }
  },
  "lauki chana dal (bottle gourd with split chickpea lentils)": {
    "dishName": "Lauki Chana Dal",
    "description": "A light, nutritious dal-vegetable combo of bottle gourd simmered with chana dal.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/2 cup",
        "commonName": "Chana Dal",
        "englishName": "chana dal, soaked 30 minutes"
      },
      {
        "amount": "2 cups",
        "commonName": "Lauki",
        "englishName": "bottle gourd, cubed"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked chana dal. Pressure cook it with turmeric and 1 1/2 cups water for 3 to 4 whistles, until tender but not completely mushy."
      },
      {
        "step": 2,
        "instruction": "In a pan, heat oil and add cumin seeds. Let them sizzle."
      },
      {
        "step": 3,
        "instruction": "Add chopped onion and cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 5,
        "instruction": "Add chopped tomato and cook until mushy."
      },
      {
        "step": 6,
        "instruction": "Add bottle gourd cubes and salt. Mix well."
      },
      {
        "step": 7,
        "instruction": "Add the cooked chana dal along with its water and mix."
      },
      {
        "step": 8,
        "instruction": "Cover and simmer for 10 to 12 minutes, stirring once or twice, until the lauki is tender and the dal is at a spoonable consistency."
      },
      {
        "step": 9,
        "instruction": "Garnish with coriander and serve with roti or rice."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 210,
      "protein": 10,
      "carbs": 29,
      "fat": 6
    }
  },
  "kheer": {
    "dishName": "Kheer",
    "description": "Creamy rice pudding slow-simmered in sweetened milk, fragrant with cardamom and topped with toasted nuts.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/4 cup",
        "commonName": "Chawal",
        "englishName": "basmati rice, washed and soaked for 20 minutes"
      },
      {
        "amount": "1 litre",
        "commonName": "Doodh",
        "englishName": "full-fat milk"
      },
      {
        "amount": "1/3 cup",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Elaichi Powder",
        "englishName": "cardamom powder"
      },
      {
        "amount": "a few strands",
        "commonName": "Kesar",
        "englishName": "saffron (optional)"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Badam aur Kishmish",
        "englishName": "chopped almonds and raisins"
      },
      {
        "amount": "1 tsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked rice and set it aside."
      },
      {
        "step": 2,
        "instruction": "Pour the milk into a heavy-bottomed pan and bring it to a boil over medium heat."
      },
      {
        "step": 3,
        "instruction": "Once boiling, add the drained rice and lower the heat to a gentle simmer."
      },
      {
        "step": 4,
        "instruction": "Let it simmer for 30 to 35 minutes, stirring every few minutes, until the rice is fully soft and the milk has thickened noticeably.",
        "tip": {
          "title": "Don't rush this step",
          "content": "Stirring often and keeping the heat low stops the milk from catching at the bottom and gives the kheer its rich, creamy texture."
        }
      },
      {
        "step": 5,
        "instruction": "Add the sugar and mix well. Simmer for another 5 minutes, stirring occasionally."
      },
      {
        "step": 6,
        "instruction": "Add cardamom powder and saffron strands, and stir through."
      },
      {
        "step": 7,
        "instruction": "In a small pan, heat the ghee and lightly toast the chopped almonds and raisins for a minute, until the raisins puff up."
      },
      {
        "step": 8,
        "instruction": "Stir most of the toasted nuts into the kheer, saving a few for garnish."
      },
      {
        "step": 9,
        "instruction": "Serve warm, or chill in the refrigerator for a few hours and serve cold."
      }
    ],
    "notes": [
      "The kheer will continue to thicken as it cools, so take it off the heat while it is still slightly thinner than you want the final texture to be.",
      "For a shortcut version, use leftover cooked rice and simmer it in the milk for about 15 minutes instead of 30."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 6,
      "carbs": 41,
      "fat": 7
    }
  },
  "gajar halwa (carrot halwa)": {
    "dishName": "Gajar Halwa (Carrot Halwa)",
    "description": "Sweet grated carrots slow-cooked in milk and ghee until rich and fudgy, finished with nuts.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 cups",
        "commonName": "Gajar",
        "englishName": "red carrots, grated"
      },
      {
        "amount": "2 cups",
        "commonName": "Doodh",
        "englishName": "full-fat milk"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Elaichi Powder",
        "englishName": "cardamom powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Badam aur Kaju",
        "englishName": "chopped cashews and almonds"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Kishmish",
        "englishName": "raisins"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat 1 tablespoon ghee in a heavy-bottomed pan and add grated carrots. Sauté for 5 minutes."
      },
      {
        "step": 2,
        "instruction": "Add milk, bring it to a gentle boil and then simmer, stirring often."
      },
      {
        "step": 3,
        "instruction": "Cook for 25 to 30 minutes, stirring every few minutes, until the milk is almost completely absorbed and the carrots are tender."
      },
      {
        "step": 4,
        "instruction": "Add sugar and mix well. The mixture will loosen as the sugar melts. Continue cooking for 8 to 10 minutes until it thickens again."
      },
      {
        "step": 5,
        "instruction": "Add the remaining ghee and cardamom powder and mix well."
      },
      {
        "step": 6,
        "instruction": "In a small pan, lightly toast the cashews, almonds and raisins in a little ghee."
      },
      {
        "step": 7,
        "instruction": "Stir most of the nuts into the halwa, saving some for garnish."
      },
      {
        "step": 8,
        "instruction": "Serve warm or chilled.",
        "tip": {
          "title": "Prevent sticking",
          "content": "Stir often during the milk-absorption stage so the halwa does not catch at the bottom."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 260,
      "protein": 5,
      "carbs": 38,
      "fat": 10
    }
  },
  "besan ladoo": {
    "dishName": "Besan Ladoo",
    "description": "Nutty, melt-in-the-mouth sweet balls made from roasted gram flour, ghee and sugar.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Pisi Cheeni",
        "englishName": "powdered sugar"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Elaichi Powder",
        "englishName": "cardamom powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Badam/Pista",
        "englishName": "chopped almonds or pistachios (optional)"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat ghee in a heavy pan on low heat and add besan."
      },
      {
        "step": 2,
        "instruction": "Roast the besan on low heat for 12 to 15 minutes, stirring continuously, until it smells nutty and turns slightly deeper in colour. Do not let it burn."
      },
      {
        "step": 3,
        "instruction": "Keep stirring. The besan will first clump, then turn smooth and glossy once fully roasted."
      },
      {
        "step": 4,
        "instruction": "Turn off the heat and let it cool for 10 to 15 minutes until warm, not hot."
      },
      {
        "step": 5,
        "instruction": "Add powdered sugar and cardamom powder and mix well."
      },
      {
        "step": 6,
        "instruction": "Once cool enough to touch, take small portions and roll them into round ladoos with your palms."
      },
      {
        "step": 7,
        "instruction": "Press a few chopped nuts gently onto the surface, if using."
      },
      {
        "step": 8,
        "instruction": "Let the ladoos set for 30 minutes before serving.",
        "tip": {
          "title": "Timing matters",
          "content": "Add the sugar only after the besan has cooled slightly. Adding it while too hot can make the ladoos set too hard."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 155,
      "protein": 4,
      "carbs": 19,
      "fat": 7
    }
  },
  "rava kesari (semolina halwa)": {
    "dishName": "Rava Kesari (Semolina Halwa)",
    "description": "A glossy, saffron-scented semolina dessert made in one pan in under 20 minutes.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Rava",
        "englishName": "fine semolina"
      },
      {
        "amount": "1 cup",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "2.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "4 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Kaju aur Kishmish",
        "englishName": "cashews and raisins"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Elaichi Powder",
        "englishName": "cardamom powder"
      },
      {
        "amount": "optional",
        "commonName": "Kesar",
        "englishName": "saffron strands or a pinch of orange food color"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat 1 tablespoon ghee in a pan and roast cashews and raisins until golden and puffed. Set them aside."
      },
      {
        "step": 2,
        "instruction": "In the same pan, add the remaining ghee and rava. Roast on low heat for 4 to 5 minutes until aromatic."
      },
      {
        "step": 3,
        "instruction": "Bring the water to a boil. If using saffron, steep it in 1 tablespoon of the hot water for a minute before adding it."
      },
      {
        "step": 4,
        "instruction": "Carefully pour the hot water into the roasted rava in a slow stream while stirring continuously. The mixture will bubble, so keep your hand away from the steam."
      },
      {
        "step": 5,
        "instruction": "Keep stirring until all the water is absorbed and the rava softens, about 2 to 3 minutes."
      },
      {
        "step": 6,
        "instruction": "Add sugar and mix well. The mixture will loosen again as the sugar melts."
      },
      {
        "step": 7,
        "instruction": "Cook for 4 to 5 minutes, stirring, until the halwa becomes glossy and starts leaving the sides of the pan."
      },
      {
        "step": 8,
        "instruction": "Add cardamom powder and the toasted nuts, mix well and serve warm.",
        "tip": {
          "title": "Avoid lumps",
          "content": "Pour the water in slowly while stirring constantly. This single step prevents almost all lumps."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 260,
      "protein": 4,
      "carbs": 41,
      "fat": 9
    }
  },
  "gulab jamun (home-style, with milk powder)": {
    "dishName": "Gulab Jamun",
    "description": "Soft, spongy fried milk dumplings soaked in warm cardamom-rose sugar syrup.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Milk Powder",
        "englishName": "milk powder"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "3-4 tbsp",
        "commonName": "Doodh",
        "englishName": "milk, for binding"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Elaichi Powder",
        "englishName": "cardamom powder"
      },
      {
        "amount": "a few drops",
        "commonName": "Gulab Jal",
        "englishName": "rose water, optional"
      },
      {
        "amount": "as needed",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee, for deep frying"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "In a bowl, mix milk powder, flour and baking soda."
      },
      {
        "step": 2,
        "instruction": "Add milk a little at a time and gently bring everything together into a soft, smooth dough. Do not knead hard."
      },
      {
        "step": 3,
        "instruction": "Cover and rest the dough for 10 minutes."
      },
      {
        "step": 4,
        "instruction": "Meanwhile, boil sugar and water together for 8 to 10 minutes until lightly sticky. Add cardamom powder and rose water and keep warm."
      },
      {
        "step": 5,
        "instruction": "Divide the dough into small balls, rolling gently between your palms until completely smooth with no cracks."
      },
      {
        "step": 6,
        "instruction": "Heat the oil or ghee on low-medium heat. Test with a tiny piece of dough: it should rise slowly and steadily, not darken immediately."
      },
      {
        "step": 7,
        "instruction": "Fry in batches on low-medium heat, gently moving them around, until evenly golden-brown and cooked through, about 6 to 8 minutes."
      },
      {
        "step": 8,
        "instruction": "Immediately drop the hot fried balls into the warm sugar syrup."
      },
      {
        "step": 9,
        "instruction": "Let them soak for at least 30 minutes before serving.",
        "tip": {
          "title": "Fry low and slow",
          "content": "Frying too hot browns the outside before the inside cooks, leaving a raw center."
        }
      }
    ],
    "notes": [
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 165,
      "protein": 2,
      "carbs": 24,
      "fat": 7
    }
  },
  "palak paneer": {
    "dishName": "Palak Paneer",
    "description": "Soft paneer cubes simmered in a silky, vibrant green spinach gravy, gently spiced.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "250 g",
        "commonName": "Palak",
        "englishName": "spinach, washed"
      },
      {
        "amount": "200 g",
        "commonName": "Paneer",
        "englishName": "paneer, cubed"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Malai / Cream",
        "englishName": "fresh cream (optional)"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Makhan / Tel",
        "englishName": "butter or oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Bring a pan of water to a boil. Add the spinach and blanch for 1 to 2 minutes, just until wilted."
      },
      {
        "step": 2,
        "instruction": "Drain immediately and place the spinach in cold water for about 1 minute. Drain again."
      },
      {
        "step": 3,
        "instruction": "Blend the blanched spinach into a smooth puree using a mixer grinder. Set aside."
      },
      {
        "step": 4,
        "instruction": "Heat butter or oil in a pan. Add cumin seeds and let them sizzle."
      },
      {
        "step": 5,
        "instruction": "Add chopped onions and cook until light golden. Add ginger-garlic paste and green chilli, and cook for a minute."
      },
      {
        "step": 6,
        "instruction": "Add chopped tomatoes and cook until soft and the oil starts to separate."
      },
      {
        "step": 7,
        "instruction": "Add the spinach puree and salt. Simmer gently for 5 to 7 minutes until the raw spinach smell fades and the gravy thickens slightly."
      },
      {
        "step": 8,
        "instruction": "Add the paneer and garam masala. Simmer gently for 2 minutes, just long enough to warm the paneer.",
        "tip": {
          "title": "Softer paneer",
          "content": "For extra-soft paneer, soak the cubes in warm water for 10 minutes before adding them."
        }
      },
      {
        "step": 9,
        "instruction": "Stir in the cream if using, and serve hot with roti or steamed rice."
      }
    ],
    "notes": [
      "Skip the cream for a lighter everyday version.",
      "A small piece of ginger and a pinch of sugar in the puree helps balance bitterness from the spinach."
    ],
    "nutrition": {
      "calories": 265,
      "protein": 13,
      "carbs": 13,
      "fat": 18
    }
  },
  "chana masala": {
    "dishName": "Chana Masala",
    "description": "Spiced chickpeas simmered in a tangy onion-tomato gravy.",
    "prepTime": "Approx. 40 minutes (using boiled/canned chickpeas)",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Chole",
        "englishName": "chickpeas, boiled or canned"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "2",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Chana Masala",
        "englishName": "chana masala powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      },
      {
        "amount": "1",
        "commonName": "Nimbu",
        "englishName": "lemon"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a pan. Add cumin seeds and let them sizzle."
      },
      {
        "step": 2,
        "instruction": "Add chopped onion and cook until golden."
      },
      {
        "step": 3,
        "instruction": "Add ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 4,
        "instruction": "Add chopped tomatoes and cook until soft and mushy."
      },
      {
        "step": 5,
        "instruction": "Add turmeric, red chilli powder, chana masala powder and salt. Mix well and cook for 2 minutes."
      },
      {
        "step": 6,
        "instruction": "Add the boiled chickpeas and 1/2 to 1 cup of their cooking liquid or water. Mix well."
      },
      {
        "step": 7,
        "instruction": "Simmer for 15 to 20 minutes, lightly mashing a few chickpeas to thicken the gravy.",
        "tip": {
          "title": "Natural thickener",
          "content": "Mashing a few chickpeas against the pan thickens the gravy without needing flour."
        }
      },
      {
        "step": 8,
        "instruction": "Squeeze lemon juice, garnish with coriander and serve hot with rice or bhature."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 250,
      "protein": 11,
      "carbs": 36,
      "fat": 7
    }
  },
  "rajma (red kidney bean curry)": {
    "dishName": "Rajma",
    "description": "Red kidney beans simmered in a thick, spiced onion-tomato gravy.",
    "prepTime": "Approx. 50 minutes (plus overnight soaking)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Rajma",
        "englishName": "kidney beans, soaked overnight"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "2",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked rajma and add it to a pressure cooker with fresh water and a pinch of salt."
      },
      {
        "step": 2,
        "instruction": "Pressure cook until the rajma is completely soft and easily mashable between your fingers. If any beans are still firm, add a little water and cook again before making the curry."
      },
      {
        "step": 3,
        "instruction": "In a pan, heat oil and add cumin seeds. Let them sizzle."
      },
      {
        "step": 4,
        "instruction": "Add chopped onion and cook until golden."
      },
      {
        "step": 5,
        "instruction": "Add ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 6,
        "instruction": "Add chopped tomatoes and cook until soft and the oil separates."
      },
      {
        "step": 7,
        "instruction": "Add red chilli powder, coriander powder and salt and mix well."
      },
      {
        "step": 8,
        "instruction": "Add the cooked rajma with its water and mix well."
      },
      {
        "step": 9,
        "instruction": "Simmer for 20 to 25 minutes, mashing a few beans to thicken, until the gravy is rich and thick.",
        "tip": {
          "title": "Patience pays off",
          "content": "Rajma tastes better the longer it simmers. Don't rush this step if you have time."
        }
      },
      {
        "step": 10,
        "instruction": "Sprinkle garam masala, garnish with coriander and serve hot with steamed rice."
      }
    ],
    "notes": [
      "Kidney beans should be thoroughly cooked until soft; do not serve them undercooked."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 12,
      "carbs": 40,
      "fat": 8
    }
  },
  "bhindi masala (okra stir-fry)": {
    "dishName": "Bhindi Masala",
    "description": "Crisp-tender okra sautéed with onions and spices.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "300 g",
        "commonName": "Bhindi",
        "englishName": "okra"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "1 medium (optional)",
        "commonName": "Tamatar",
        "englishName": "tomato, optional"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the bhindi, then dry it completely before cutting. Trim the ends and slice into 1 to 2 cm pieces."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a wide pan on medium-high heat. Add the okra and cook uncovered for 8 to 10 minutes, stirring occasionally, until no longer slimy and lightly browned."
      },
      {
        "step": 3,
        "instruction": "Push the okra to the side. Add chopped onion to the empty space and cook until soft."
      },
      {
        "step": 4,
        "instruction": "Mix the onion and okra together. Add turmeric, red chilli powder, coriander powder and salt."
      },
      {
        "step": 5,
        "instruction": "Cook for 3 to 4 minutes, stirring gently, until the okra is tender and lightly browned. If using tomato, add the chopped tomato at this stage and cook until just soft."
      },
      {
        "step": 6,
        "instruction": "Sprinkle amchur powder, mix and cook for 1 more minute."
      },
      {
        "step": 7,
        "instruction": "Serve hot with roti or dal-rice."
      }
    ],
    "notes": [
      "Never cover the pan while cooking okra. Trapped steam is what makes it slimy.",
      "Keeping the bhindi dry before cutting helps reduce sliminess. Cook it uncovered so steam can escape."
    ],
    "nutrition": {
      "calories": 230,
      "protein": 5,
      "carbs": 16,
      "fat": 16
    }
  },
  "mutter mushroom": {
    "dishName": "Matar Mushroom",
    "description": "Tender mushrooms and green peas cooked in a lightly spiced onion-tomato masala.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "200 g",
        "commonName": "Mushroom",
        "englishName": "button mushrooms, sliced"
      },
      {
        "amount": "1 cup",
        "commonName": "Matar",
        "englishName": "green peas, fresh or frozen"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves, optional"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Clean the mushrooms, trim the stems if needed and slice them. Keep them aside."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai on medium-high heat. Add the sliced mushrooms and sauté for 4 to 5 minutes until they release their moisture and lightly brown. Remove and set aside."
      },
      {
        "step": 3,
        "instruction": "In the same kadai, add chopped onion and cook until soft and lightly golden."
      },
      {
        "step": 4,
        "instruction": "Add ginger-garlic paste and green chilli. Cook for 30 seconds until fragrant."
      },
      {
        "step": 5,
        "instruction": "Add chopped tomatoes, turmeric, coriander powder, red chilli powder and salt. Cook until the tomatoes soften and the masala becomes thick."
      },
      {
        "step": 6,
        "instruction": "Add green peas and water. Cover and cook for 5 to 7 minutes, until the peas are tender."
      },
      {
        "step": 7,
        "instruction": "Add the sautéed mushrooms and mix gently. Simmer uncovered for 4 to 5 minutes until the gravy reaches your preferred consistency."
      },
      {
        "step": 8,
        "instruction": "Add garam masala and crushed kasuri methi if using. Mix well and cook for 1 more minute.",
        "tip": {
          "title": "Don't overcook the mushrooms",
          "content": "Keep the final simmer short so the mushrooms stay tender instead of becoming rubbery."
        }
      },
      {
        "step": 9,
        "instruction": "Garnish with coriander leaves and serve hot with roti, naan or rice."
      }
    ],
    "notes": [
      "Frozen peas can go straight into the pan. Fresh peas may need a few extra minutes to become tender.",
      "For a drier version, use less water and simmer uncovered until the masala coats the mushrooms and peas."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 8,
      "carbs": 22,
      "fat": 11
    }
  },
  "baingan bharta (smoky roasted eggplant mash)": {
    "dishName": "Baingan Bharta",
    "description": "Fire-roasted eggplant mashed and cooked with onions, tomatoes and spices.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 large",
        "commonName": "Baingan",
        "englishName": "eggplant"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "2",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Roast the whole eggplant directly over an open gas flame, turning occasionally with tongs, until the skin is charred all over and the inside is soft, about 12 to 15 minutes."
      },
      {
        "step": 2,
        "instruction": "Let it cool slightly, peel off the charred skin and mash the flesh with a fork."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a pan and add cumin seeds. Let them sizzle."
      },
      {
        "step": 4,
        "instruction": "Add chopped onion and green chilli and cook until golden."
      },
      {
        "step": 5,
        "instruction": "Add ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 6,
        "instruction": "Add chopped tomatoes and cook until soft and mushy."
      },
      {
        "step": 7,
        "instruction": "Add turmeric, red chilli powder and salt. Mix well."
      },
      {
        "step": 8,
        "instruction": "Add the mashed eggplant, mix well and cook for 8 to 10 minutes, stirring occasionally."
      },
      {
        "step": 9,
        "instruction": "Garnish with coriander and serve hot with roti.",
        "tip": {
          "title": "Don't skip the char",
          "content": "Roasting the eggplant directly over flame is what gives bharta its signature smoky flavour."
        }
      }
    ],
    "notes": [
      "No gas flame? Roast the eggplant covered on the stovetop in a pan, turning often, or grill it."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 4,
      "carbs": 17,
      "fat": 15
    }
  },
  "classic chicken korma": {
    "dishName": "Chicken Korma",
    "description": "A rich, mildly spiced chicken curry made creamy with cashews and browned onions.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken",
        "englishName": "chicken, curry-cut pieces"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "2 large",
        "commonName": "Pyaaz",
        "englishName": "onions, thinly sliced"
      },
      {
        "amount": "10",
        "commonName": "Kaju",
        "englishName": "cashews"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 inch",
        "commonName": "Dalchini",
        "englishName": "cinnamon stick"
      },
      {
        "amount": "2",
        "commonName": "Elaichi",
        "englishName": "green cardamom pods"
      },
      {
        "amount": "4",
        "commonName": "Laung",
        "englishName": "cloves"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix the chicken with yogurt, a pinch of salt and 1 teaspoon of ginger-garlic paste. Set aside for 20 minutes."
      },
      {
        "step": 2,
        "instruction": "Heat 1 tablespoon ghee in a pan and fry the sliced onions until deep golden brown. Set aside to cool."
      },
      {
        "step": 3,
        "instruction": "Blend the fried onions with the cashews and a little water into a smooth paste."
      },
      {
        "step": 4,
        "instruction": "Heat the remaining ghee in a kadai. Add bay leaf, cinnamon, cardamom and cloves and let them sizzle for a few seconds."
      },
      {
        "step": 5,
        "instruction": "Add the remaining ginger-garlic paste and cook for a minute until fragrant."
      },
      {
        "step": 6,
        "instruction": "Add the marinated chicken and cook on medium-high heat for 5 to 6 minutes, stirring occasionally."
      },
      {
        "step": 7,
        "instruction": "Add red chilli powder and salt. Mix well."
      },
      {
        "step": 8,
        "instruction": "Stir in the onion-cashew paste. Add 1 cup water, cover and simmer for 15 to 20 minutes until the chicken is fully cooked."
      },
      {
        "step": 9,
        "instruction": "Sprinkle garam masala and simmer for 2 more minutes.",
        "tip": {
          "title": "Extra richness",
          "content": "Stir in 2 tablespoons of cream at the end for an even more luxurious, restaurant-style korma."
        }
      },
      {
        "step": 10,
        "instruction": "Serve hot with naan, roti or steamed rice."
      }
    ],
    "notes": [
      "Korma is meant to be mild. Go easy on the red chilli powder if you prefer a gentler flavour.",
      "Frying the onions until truly deep golden is key to the classic korma flavour.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 450,
      "protein": 38,
      "carbs": 9,
      "fat": 29
    }
  },
  "butter chicken (murgh makhani)": {
    "dishName": "Butter Chicken (Murgh Makhani)",
    "description": "Tender chicken in a velvety, buttery tomato-cashew gravy.",
    "prepTime": "Approx. 50 minutes (plus 30 min marination)",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken",
        "englishName": "boneless chicken"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "4",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "10",
        "commonName": "Kaju",
        "englishName": "cashews"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Malai",
        "englishName": "cream"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Marinate the chicken with yogurt, 1 teaspoon ginger-garlic paste, 1/2 teaspoon red chilli powder and salt for 30 minutes."
      },
      {
        "step": 2,
        "instruction": "Heat 1 tablespoon butter in a pan. Cook the marinated chicken on medium-high heat until browned and cooked through, about 8 to 10 minutes. Set aside."
      },
      {
        "step": 3,
        "instruction": "Boil chopped tomatoes and cashews together in a little water for 10 minutes until soft. Cool and blend into a smooth puree."
      },
      {
        "step": 4,
        "instruction": "In the same pan, heat the remaining butter, add the remaining ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 5,
        "instruction": "Add the tomato-cashew puree and cook for 8 to 10 minutes, stirring, until it thickens."
      },
      {
        "step": 6,
        "instruction": "Add the remaining red chilli powder, salt and sugar. Mix well."
      },
      {
        "step": 7,
        "instruction": "Add the cooked chicken back in and simmer for 5 minutes."
      },
      {
        "step": 8,
        "instruction": "Stir in cream and crushed kasuri methi. Sprinkle garam masala."
      },
      {
        "step": 9,
        "instruction": "Simmer for 2 more minutes and serve hot with naan or rice.",
        "tip": {
          "title": "Release more flavor",
          "content": "Crush the kasuri methi between your palms before adding it to release more aroma."
        }
      }
    ],
    "notes": [
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 470,
      "protein": 38,
      "carbs": 14,
      "fat": 29
    }
  },
  "home-style chicken curry": {
    "dishName": "Home-style Chicken Curry",
    "description": "A comforting everyday chicken curry with a spiced onion-tomato gravy.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken",
        "englishName": "chicken, curry-cut"
      },
      {
        "amount": "2",
        "commonName": "Pyaaz",
        "englishName": "onions"
      },
      {
        "amount": "2",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a pot and add sliced onions. Cook until golden brown."
      },
      {
        "step": 2,
        "instruction": "Add ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 3,
        "instruction": "Add chopped tomatoes and cook until soft and the oil separates."
      },
      {
        "step": 4,
        "instruction": "Add turmeric, red chilli powder, coriander powder and salt. Mix and cook for 2 minutes."
      },
      {
        "step": 5,
        "instruction": "Add chicken pieces, mix well to coat in the masala and cook for 5 to 6 minutes."
      },
      {
        "step": 6,
        "instruction": "Add water, cover and simmer on medium-low heat for 20 to 25 minutes until the chicken is fully cooked and tender."
      },
      {
        "step": 7,
        "instruction": "Sprinkle garam masala and simmer for 2 more minutes."
      },
      {
        "step": 8,
        "instruction": "Garnish with coriander and serve hot with rice or roti.",
        "tip": {
          "title": "Build the base",
          "content": "Browning the onions well, deep golden rather than just soft, builds most of the curry's flavour."
        }
      }
    ],
    "notes": [
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 390,
      "protein": 36,
      "carbs": 8,
      "fat": 24
    }
  },
  "chicken tikka masala (stovetop)": {
    "dishName": "Chicken Tikka Masala (Stovetop)",
    "description": "Charred spiced chicken chunks simmered in a creamy tomato gravy.",
    "prepTime": "Approx. 1 hour (plus 30 min marination)",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken",
        "englishName": "boneless chicken, cubed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "3",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Malai",
        "englishName": "cream"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Marinate the chicken cubes with yogurt, half the ginger-garlic paste, red chilli powder, garam masala and salt for at least 30 minutes."
      },
      {
        "step": 2,
        "instruction": "Heat 1 tablespoon oil in a pan on high heat. Cook the marinated chicken in batches until charred at the edges and cooked through, 6 to 8 minutes per batch. Set aside."
      },
      {
        "step": 3,
        "instruction": "In the same pan, heat butter and add chopped onion. Cook until golden."
      },
      {
        "step": 4,
        "instruction": "Add the remaining ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 5,
        "instruction": "Add pureed tomatoes and cook for 8 to 10 minutes until thickened."
      },
      {
        "step": 6,
        "instruction": "Add salt and mix well, then stir in cream."
      },
      {
        "step": 7,
        "instruction": "Add the charred chicken back into the gravy and simmer for 5 to 6 minutes."
      },
      {
        "step": 8,
        "instruction": "Sprinkle crushed kasuri methi, mix and serve hot with naan or rice.",
        "tip": {
          "title": "The tandoor trick",
          "content": "Cook the chicken on high heat in batches without crowding the pan. This helps mimic the charred flavour."
        }
      }
    ],
    "notes": [
      "This version is designed entirely for stovetop cooking and does not require a tandoor.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 430,
      "protein": 38,
      "carbs": 16,
      "fat": 24
    }
  },
  "chicken 65": {
    "dishName": "Chicken 65",
    "description": "Crispy, spicy deep-fried chicken bites with a tangy curry-leaf tempering.",
    "prepTime": "Approx. 40 minutes (plus 30 min marination)",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken",
        "englishName": "boneless chicken, cubed"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Corn Flour",
        "englishName": "corn flour"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Chawal Ka Atta",
        "englishName": "rice flour"
      },
      {
        "amount": "1",
        "commonName": "Anda",
        "englishName": "egg, optional"
      },
      {
        "amount": "a handful",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "2",
        "commonName": "Hari Mirch",
        "englishName": "green chillies, slit"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "cooking oil, for deep frying"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Marinate the chicken with yogurt, ginger-garlic paste, 1 teaspoon red chilli powder, turmeric and salt for 30 minutes."
      },
      {
        "step": 2,
        "instruction": "Add corn flour, rice flour and egg if using to the marinated chicken and mix to coat evenly."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai on medium heat. Fry chicken pieces in batches until golden and crisp, about 6 to 8 minutes per batch. Drain on paper towels."
      },
      {
        "step": 4,
        "instruction": "In a separate small pan, heat 1 tablespoon oil and add curry leaves and slit green chillies. Let them sizzle for a few seconds."
      },
      {
        "step": 5,
        "instruction": "Add the remaining red chilli powder and a splash of water to make a quick spice paste. Cook for 30 seconds."
      },
      {
        "step": 6,
        "instruction": "Toss the fried chicken in the tempering until well coated."
      },
      {
        "step": 7,
        "instruction": "Serve hot immediately as a starter or side.",
        "tip": {
          "title": "Extra crunch",
          "content": "Double-fry the chicken. Fry once until light golden, rest for 5 minutes, then fry again briefly until deep golden."
        }
      }
    ],
    "notes": [
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain.",
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 28,
      "carbs": 22,
      "fat": 18
    }
  },
  "garlic naan on tawa": {
    "dishName": "Garlic Naan",
    "description": "Soft, pillowy homemade naan bubbled with garlic butter.",
    "prepTime": "Approx. 2.5 hours (mostly resting time)",
    "equipment": [
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Baking Powder",
        "englishName": "baking powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "4 cloves",
        "commonName": "Lehsun",
        "englishName": "garlic, finely chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Makhan (pighla hua)",
        "englishName": "butter, melted"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped (optional)"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "In a large bowl, mix flour, baking powder, baking soda, sugar and salt."
      },
      {
        "step": 2,
        "instruction": "Add yogurt and oil. Gradually add a little water and knead into a soft, smooth dough."
      },
      {
        "step": 3,
        "instruction": "Cover the dough with a damp cloth and let it rest in a warm place for at least 2 hours until slightly puffed.",
        "tip": {
          "title": "Warm spot tip",
          "content": "If your kitchen is cold, keep the covered bowl inside your switched-off oven or microwave with the light on."
        }
      },
      {
        "step": 4,
        "instruction": "Divide the dough into equal balls about the size of a golf ball."
      },
      {
        "step": 5,
        "instruction": "Roll each ball into an oval shape, about 1/4 inch thick. Sprinkle chopped garlic on top and press it gently into the dough with the rolling pin."
      },
      {
        "step": 6,
        "instruction": "Heat a tawa on medium-high heat until very hot. Place the rolled naan on it, garlic-side up."
      },
      {
        "step": 7,
        "instruction": "Cover with a lid and cook for 1 to 2 minutes until bubbles form on top."
      },
      {
        "step": 8,
        "instruction": "Flip the naan and cook the other side for another minute until golden brown spots appear."
      },
      {
        "step": 9,
        "instruction": "For extra char, hold the cooked naan with tongs directly over an open flame for 5 to 10 seconds per side."
      },
      {
        "step": 10,
        "instruction": "Brush generously with melted garlic butter and sprinkle coriander leaves. Serve hot."
      }
    ],
    "notes": [
      "The dough must feel soft and slightly sticky. This is what makes the naan fluffy.",
      "Naan is best eaten fresh and hot, straight off the tawa."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 8,
      "carbs": 44,
      "fat": 8
    }
  },
  "jeera rice": {
    "dishName": "Jeera Rice",
    "description": "Fragrant basmati rice tempered with roasted cumin seeds.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice, rinsed and soaked 15 min"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "2 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat ghee in a pot. Add cumin seeds and bay leaf, and let them sizzle until the cumin becomes fragrant and slightly darker."
      },
      {
        "step": 2,
        "instruction": "Drain the soaked rice, add it to the pot and stir gently for a minute to coat it in ghee."
      },
      {
        "step": 3,
        "instruction": "Add water and salt and bring to a boil."
      },
      {
        "step": 4,
        "instruction": "Cover, reduce the heat to low and cook for 12 to 15 minutes until the water is absorbed."
      },
      {
        "step": 5,
        "instruction": "Turn off the heat and let the rice rest covered for 5 minutes."
      },
      {
        "step": 6,
        "instruction": "Fluff gently with a fork, garnish with coriander and serve hot.",
        "tip": {
          "title": "Even grains",
          "content": "Don't skip soaking the rice. It helps the grains cook evenly and stay separate."
        }
      }
    ],
    "notes": [
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 230,
      "protein": 4,
      "carbs": 40,
      "fat": 6
    }
  },
  "aloo paratha": {
    "dishName": "Aloo Paratha",
    "description": "Whole wheat flatbread stuffed with a spiced mashed potato filling, cooked golden on a tawa.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Atta",
        "englishName": "whole wheat flour, plus extra for dusting"
      },
      {
        "amount": "3",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and mashed"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped (optional)"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Adrak",
        "englishName": "ginger, grated"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "as needed",
        "commonName": "Ghee/Tel",
        "englishName": "ghee or oil for cooking"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Knead the whole wheat flour with water and a pinch of salt into a soft dough. Cover and rest for 15 to 20 minutes."
      },
      {
        "step": 2,
        "instruction": "For the filling, mix mashed potatoes with onion, green chilli, ginger, red chilli powder, amchur, coriander leaves and salt."
      },
      {
        "step": 3,
        "instruction": "Divide the dough into balls slightly larger than a golf ball, and the filling into slightly smaller portions."
      },
      {
        "step": 4,
        "instruction": "Roll one dough ball into a small circle, place filling in the centre and gather the edges up to seal it."
      },
      {
        "step": 5,
        "instruction": "Gently flatten the stuffed ball and roll it out carefully into a paratha, dusting with flour as needed."
      },
      {
        "step": 6,
        "instruction": "Heat a tawa on medium heat and place the paratha on it."
      },
      {
        "step": 7,
        "instruction": "Cook until small bubbles appear, flip and spread a little ghee on top."
      },
      {
        "step": 8,
        "instruction": "Flip again, spread ghee on the other side too and cook until both sides have golden-brown spots."
      },
      {
        "step": 9,
        "instruction": "Serve hot with yogurt, pickle or butter.",
        "tip": {
          "title": "Handle with care",
          "content": "Roll gently and evenly. Pressing too hard can cause the filling to poke through."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 250,
      "protein": 6,
      "carbs": 38,
      "fat": 8
    }
  },
  "laccha paratha (multi-layered flatbread)": {
    "dishName": "Laccha Paratha",
    "description": "A flaky, multi-layered whole wheat flatbread with crisp folds.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Atta",
        "englishName": "whole wheat flour"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel/Ghee",
        "englishName": "oil or ghee, plus extra for cooking"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Knead the flour with a pinch of salt, 1 tablespoon oil and enough water into a soft, smooth dough. Cover and rest for 20 minutes."
      },
      {
        "step": 2,
        "instruction": "Divide into equal balls and roll one ball into a thin circle."
      },
      {
        "step": 3,
        "instruction": "Brush the surface lightly with oil or ghee and dust with a little flour."
      },
      {
        "step": 4,
        "instruction": "Fold the dough into pleats like a fan, then coil the pleated strip into a round spiral and tuck the end underneath."
      },
      {
        "step": 5,
        "instruction": "Rest the spiral for 5 minutes, then gently roll it out again into a round paratha without pressing too hard."
      },
      {
        "step": 6,
        "instruction": "Heat a tawa on medium-high heat. Cook the paratha, flipping occasionally and drizzling a little ghee on each side, until golden-brown spots appear on both sides."
      },
      {
        "step": 7,
        "instruction": "Once cooked, gently crush the paratha between your palms to separate the layers."
      },
      {
        "step": 8,
        "instruction": "Serve hot with curry or yogurt.",
        "tip": {
          "title": "Keep the layers",
          "content": "Roll and fold gently. Too much pressure flattens out the layers you just created."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 260,
      "protein": 6,
      "carbs": 36,
      "fat": 10
    }
  },
  "lemon rice (chitranna)": {
    "dishName": "Lemon Rice (Chitranna)",
    "description": "Tangy, lightly spiced rice tempered with peanuts, curry leaves and fresh lemon juice.",
    "prepTime": "Approx. 20 minutes (using pre-cooked rice)",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Pakka Chawal",
        "englishName": "cooked rice, cooled"
      },
      {
        "amount": "1-2",
        "commonName": "Nimbu",
        "englishName": "lemons"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Moongfali",
        "englishName": "peanuts"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Urad Dal",
        "englishName": "split black gram"
      },
      {
        "amount": "1 tsp",
        "commonName": "Chana Dal",
        "englishName": "split Bengal gram"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a pan and add mustard seeds. Let them pop."
      },
      {
        "step": 2,
        "instruction": "Add urad dal and chana dal and fry until light golden."
      },
      {
        "step": 3,
        "instruction": "Add peanuts and fry until lightly golden and crunchy."
      },
      {
        "step": 4,
        "instruction": "Add curry leaves and green chilli and sizzle for a few seconds."
      },
      {
        "step": 5,
        "instruction": "Add turmeric and mix."
      },
      {
        "step": 6,
        "instruction": "Add the cooled cooked rice and salt. Gently toss to combine without mashing the grains."
      },
      {
        "step": 7,
        "instruction": "Turn off the heat, squeeze in lemon juice generously and toss again."
      },
      {
        "step": 8,
        "instruction": "Garnish with coriander leaves and serve at room temperature.",
        "tip": {
          "title": "Use cold rice",
          "content": "Day-old rice works great. Warm rice can turn mushy when mixed."
        }
      }
    ],
    "notes": [
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 5,
      "carbs": 40,
      "fat": 8
    }
  },
  "paneer butter masala": {
    "dishName": "Paneer Butter Masala",
    "description": "Soft paneer cubes in a luxuriously creamy, buttery tomato gravy.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "200 g",
        "commonName": "Paneer",
        "englishName": "paneer, cubed"
      },
      {
        "amount": "4 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, roughly chopped"
      },
      {
        "amount": "10",
        "commonName": "Kaju",
        "englishName": "cashews"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "kashmiri red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves, crushed"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Malai / Cream",
        "englishName": "fresh cream"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil the chopped tomatoes and cashews together in a small pan with a little water for 10 minutes until the tomatoes turn soft."
      },
      {
        "step": 2,
        "instruction": "Let the mixture cool slightly, then blend it into a smooth puree."
      },
      {
        "step": 3,
        "instruction": "Heat 2 tablespoons of butter in a pan. Add ginger-garlic paste and cook for a minute until fragrant."
      },
      {
        "step": 4,
        "instruction": "Pour in the tomato-cashew puree. Cook on medium heat for 8 to 10 minutes, stirring occasionally, until it thickens slightly."
      },
      {
        "step": 5,
        "instruction": "Add red chilli powder, salt and sugar. Mix well."
      },
      {
        "step": 6,
        "instruction": "Gently add the paneer cubes and simmer for 3 to 4 minutes.",
        "tip": {
          "title": "Silky texture",
          "content": "Pass the puree through a sieve before adding it back to the pan for an extra-smooth, restaurant-style gravy."
        }
      },
      {
        "step": 7,
        "instruction": "Stir in the cream and remaining butter. Sprinkle crushed kasuri methi and garam masala on top."
      },
      {
        "step": 8,
        "instruction": "Mix gently and serve hot with naan or jeera rice."
      }
    ],
    "notes": [
      "Crushing the kasuri methi between your palms before adding releases much more of its aroma.",
      "For a lighter version, reduce the butter and cream slightly."
    ],
    "nutrition": {
      "calories": 380,
      "protein": 15,
      "carbs": 17,
      "fat": 28
    }
  },
  "chicken biryani": {
    "dishName": "Chicken Biryani",
    "description": "Fragrant basmati rice layered with spiced, marinated chicken and slow-cooked to perfection.",
    "prepTime": "Approx. 1.5 hours (plus 30 mins marination)",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken",
        "englishName": "chicken, curry-cut pieces"
      },
      {
        "amount": "2 cups",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice, soaked 30 mins"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "2 large",
        "commonName": "Pyaaz (talaa hua)",
        "englishName": "onions, thinly sliced and fried until golden"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Biryani Masala",
        "englishName": "biryani masala powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 inch",
        "commonName": "Dalchini",
        "englishName": "cinnamon stick"
      },
      {
        "amount": "3",
        "commonName": "Elaichi",
        "englishName": "green cardamom pods"
      },
      {
        "amount": "4",
        "commonName": "Laung",
        "englishName": "cloves"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Pudina",
        "englishName": "mint leaves, chopped"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "a few strands in 2 tbsp warm milk",
        "commonName": "Kesar Doodh",
        "englishName": "saffron soaked in warm milk"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Marinate the chicken with yogurt, ginger-garlic paste, biryani masala, red chilli powder and salt. Set aside for 30 minutes."
      },
      {
        "step": 2,
        "instruction": "Boil a large pot of water with the whole spices and salt."
      },
      {
        "step": 3,
        "instruction": "Add the soaked rice and cook until it is about 70% done, still slightly firm at the centre.",
        "tip": {
          "title": "Don't overcook the rice",
          "content": "The rice finishes cooking later with the chicken, so slightly undercooking it now is important."
        }
      },
      {
        "step": 4,
        "instruction": "Drain the rice immediately and spread it out on a plate to stop it cooking further."
      },
      {
        "step": 5,
        "instruction": "In your heavy-bottomed pot, heat 1 tablespoon ghee and cook the marinated chicken on medium-high heat for 8 to 10 minutes until half-cooked."
      },
      {
        "step": 6,
        "instruction": "Spread the half-cooked chicken evenly across the bottom of the pot."
      },
      {
        "step": 7,
        "instruction": "Layer the partially cooked rice evenly over the chicken."
      },
      {
        "step": 8,
        "instruction": "Top with fried onions, chopped mint, coriander, saffron milk and the remaining ghee."
      },
      {
        "step": 9,
        "instruction": "Cover the pot with a tight-fitting lid and cook on very low heat for 20 to 25 minutes."
      },
      {
        "step": 10,
        "instruction": "Turn off the heat and let the biryani rest, covered, for 10 minutes before opening."
      },
      {
        "step": 11,
        "instruction": "Gently fluff and mix the layers before serving hot, with raita on the side."
      }
    ],
    "notes": [
      "If the lid is not fully sealed, seal the edges with dough or a damp cloth so steam does not escape.",
      "A heavy base or a tawa underneath the pot helps prevent the bottom layer from burning."
    ],
    "nutrition": {
      "calories": 650,
      "protein": 35,
      "carbs": 71,
      "fat": 25
    }
  },
  "masala dosa": {
    "dishName": "Masala Dosa",
    "description": "A crisp, golden fermented rice-and-lentil crepe, filled with a lightly spiced potato masala.",
    "prepTime": "Approx. 45 minutes (plus 8–12 hours fermentation)",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Dosa Batter",
        "englishName": "fermented dosa batter"
      },
      {
        "amount": "3 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and mashed"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, sliced"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "few leaves",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "If making batter at home, soak rice and urad dal separately, grind into a smooth batter and let it ferment for 8 to 12 hours.",
        "tip": {
          "title": "Save time",
          "content": "Good-quality store-bought dosa batter works just as well and skips the fermentation step."
        }
      },
      {
        "step": 2,
        "instruction": "For the filling, heat oil in a pan. Add mustard seeds and let them pop."
      },
      {
        "step": 3,
        "instruction": "Add curry leaves and sliced onions. Cook until the onions turn soft."
      },
      {
        "step": 4,
        "instruction": "Add green chilli and turmeric and stir for a few seconds."
      },
      {
        "step": 5,
        "instruction": "Add mashed potatoes and salt. Mix well and cook for 3 to 4 minutes."
      },
      {
        "step": 6,
        "instruction": "Heat a tawa on medium-high heat. Pour a ladle of dosa batter in the centre."
      },
      {
        "step": 7,
        "instruction": "Using the back of the ladle, spread it outward in a thin circular motion."
      },
      {
        "step": 8,
        "instruction": "Drizzle a little oil around the edges and cook until the base turns golden and crisp."
      },
      {
        "step": 9,
        "instruction": "Place a portion of potato filling in the centre and fold the dosa."
      },
      {
        "step": 10,
        "instruction": "Serve immediately with coconut chutney and sambar."
      }
    ],
    "notes": [
      "A well-fermented batter is the secret to a crisp dosa.",
      "Keep the tawa hot but not smoking.",
      "Store-bought fermented batter is fine for a quicker version."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 8,
      "carbs": 55,
      "fat": 12
    }
  },
  "aloo gobi": {
    "dishName": "Aloo Gobi",
    "description": "A simple, everyday dry sabzi of potatoes and cauliflower, lightly spiced and cooked until tender.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, cubed"
      },
      {
        "amount": "1 medium",
        "commonName": "Gobi",
        "englishName": "cauliflower, cut into florets"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 inch",
        "commonName": "Adrak",
        "englishName": "ginger, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a pan. Add cumin seeds and let them sizzle."
      },
      {
        "step": 2,
        "instruction": "Add chopped ginger and green chilli and cook for 30 seconds."
      },
      {
        "step": 3,
        "instruction": "Add potatoes and cauliflower and stir to coat them in oil."
      },
      {
        "step": 4,
        "instruction": "Add turmeric, red chilli powder, coriander powder and salt. Mix well."
      },
      {
        "step": 5,
        "instruction": "Cover and cook on low-medium heat for 15 to 18 minutes, stirring every few minutes.",
        "tip": {
          "title": "Check for doneness",
          "content": "A potato piece should be soft enough to pierce easily with a fork."
        }
      },
      {
        "step": 6,
        "instruction": "Once both vegetables are tender, sprinkle garam masala and mix gently."
      },
      {
        "step": 7,
        "instruction": "Garnish with coriander and serve hot with roti or dal-rice."
      }
    ],
    "notes": [
      "Avoid adding water. Aloo gobi is meant to be a dry sabzi cooked in its own steam.",
      "Cutting both vegetables roughly the same size helps them cook evenly."
    ],
    "nutrition": {
      "calories": 270,
      "protein": 6,
      "carbs": 34,
      "fat": 12
    }
  },
  "dal makhani": {
    "dishName": "Dal Makhani",
    "description": "Slow-cooked black lentils in a rich, buttery, creamy gravy.",
    "prepTime": "Approx. 1 hour (plus overnight soaking)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Sabut Urad Dal",
        "englishName": "whole black gram, soaked overnight"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Rajma",
        "englishName": "red kidney beans, soaked overnight"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 cup",
        "commonName": "Tamatar Puree",
        "englishName": "tomato puree"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Malai / Cream",
        "englishName": "fresh cream"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked urad dal and rajma, rinse, and pressure cook with enough water for 18 to 20 whistles, or until both are very soft and easily mashable. Let the pressure release naturally."
      },
      {
        "step": 2,
        "instruction": "Pressure cook for 6 to 8 whistles until the lentils and beans are completely soft and mashable."
      },
      {
        "step": 3,
        "instruction": "In a separate pan, heat butter. Add chopped onions and cook until golden."
      },
      {
        "step": 4,
        "instruction": "Add ginger-garlic paste and cook for a minute until fragrant."
      },
      {
        "step": 5,
        "instruction": "Add tomato puree, red chilli powder and salt. Cook for 5 to 6 minutes until the oil starts to separate."
      },
      {
        "step": 6,
        "instruction": "Add the cooked dal and rajma along with their cooking water. Mix well."
      },
      {
        "step": 7,
        "instruction": "Simmer on low heat for 25 to 30 minutes, stirring occasionally and lightly mashing some of the lentils with the back of your spoon.",
        "tip": {
          "title": "The real secret",
          "content": "Dal makhani tastes best the longer and slower it simmers. This gives it its signature creamy texture."
        }
      },
      {
        "step": 8,
        "instruction": "Stir in the cream and a final knob of butter. Sprinkle garam masala and simmer for 2 more minutes."
      },
      {
        "step": 9,
        "instruction": "Serve hot with rice or naan."
      }
    ],
    "notes": [
      "Soaking the dal and rajma overnight significantly cuts down cooking time.",
      "For a richer flavour, let the dal simmer on very low heat for an extra 30 minutes.",
      "The beans should be very soft before the final simmer. This is what gives dal makhani its creamy texture without needing a lot of cream."
    ],
    "nutrition": {
      "calories": 350,
      "protein": 14,
      "carbs": 42,
      "fat": 14
    }
  },
  "samosa": {
    "dishName": "Samosa",
    "description": "Crispy, golden pastry triangles stuffed with a spiced potato and pea filling.",
    "prepTime": "Approx. 1 hour",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "4 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil for the dough"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "3 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and mashed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Hari Matar",
        "englishName": "green peas"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 inch",
        "commonName": "Adrak",
        "englishName": "ginger, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "cooking oil for deep frying"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "In a bowl, mix flour, salt, carom seeds and oil. Rub the oil into the flour until it feels crumbly."
      },
      {
        "step": 2,
        "instruction": "Gradually add water and knead into a stiff, firm dough. Cover and rest for 20 minutes."
      },
      {
        "step": 3,
        "instruction": "For the filling, heat a little oil in a pan. Add cumin seeds and let them sizzle."
      },
      {
        "step": 4,
        "instruction": "Add ginger and green chilli and cook for 30 seconds."
      },
      {
        "step": 5,
        "instruction": "Add green peas and cook for 2 to 3 minutes until softened."
      },
      {
        "step": 6,
        "instruction": "Add mashed potatoes, garam masala, amchur and salt. Mix well and cook for 2 more minutes. Let the filling cool."
      },
      {
        "step": 7,
        "instruction": "Divide the dough into small balls. Roll each ball into an oval, then cut it in half."
      },
      {
        "step": 8,
        "instruction": "Take one semi-circle, wet the straight edge with water and fold it into a cone shape, sealing the edge."
      },
      {
        "step": 9,
        "instruction": "Fill the cone with 1 to 2 tablespoons of potato filling, then seal the open edge firmly with water.",
        "tip": {
          "title": "No air pockets",
          "content": "Press out any trapped air before sealing. This helps stop the samosa from bursting while frying."
        }
      },
      {
        "step": 10,
        "instruction": "Heat oil in a kadai on medium-low heat. Gently slide in the samosas and fry slowly until golden and crisp all over, about 12 to 15 minutes."
      },
      {
        "step": 11,
        "instruction": "Drain on paper towels and serve hot with tamarind or mint chutney."
      }
    ],
    "notes": [
      "Fry on medium-low heat, not high, so the samosa cooks through without burning.",
      "The filling should be completely cool before stuffing.",
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 5,
      "carbs": 28,
      "fat": 10
    }
  },
  "rajma chawal": {
    "dishName": "Rajma Chawal",
    "description": "Soft kidney beans in a thick, homely onion-tomato gravy served over fluffy rice.",
    "prepTime": "Approx. 1 hour (plus overnight soaking)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Rajma",
        "englishName": "kidney beans, soaked overnight"
      },
      {
        "amount": "1 cup",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, finely chopped"
      },
      {
        "amount": "3 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked rajma and add it to a pressure cooker with 3 cups of fresh water and a pinch of salt. Cook for 6 to 7 whistles, until a bean crushes easily between your fingers."
      },
      {
        "step": 2,
        "instruction": "While it cooks, rinse basmati until the water is mostly clear. Cook with 2 cups water and a pinch of salt for 12 to 15 minutes. Keep covered until serving."
      },
      {
        "step": 3,
        "instruction": "Heat oil or ghee in a kadai. Add the cumin seeds and bay leaf and let them sizzle for 10 seconds."
      },
      {
        "step": 4,
        "instruction": "Add the chopped onions and cook for 8 to 10 minutes, stirring now and then, until they turn golden brown. Don't rush this. It sets the flavour of the whole dish."
      },
      {
        "step": 5,
        "instruction": "Add the ginger-garlic paste and cook for 1 minute, until the raw smell is gone."
      },
      {
        "step": 6,
        "instruction": "Add the tomatoes and cook for 6 to 8 minutes, pressing them with your spatula, until they turn mushy and you see oil at the edges."
      },
      {
        "step": 7,
        "instruction": "Add turmeric, red chilli powder, coriander powder and salt. Add a splash of water and cook for 2 minutes so the spices don't stick."
      },
      {
        "step": 8,
        "instruction": "Add the cooked rajma along with about 2 cups of its cooking water. Mash a few beans against the side of the pan with your spoon.",
        "tip": {
          "title": "Free thickener",
          "content": "Those mashed beans are what make the gravy thick and creamy. No flour or cream needed."
        }
      },
      {
        "step": 9,
        "instruction": "Simmer on low heat for 20 minutes, stirring occasionally, until the gravy is thick and the beans taste rich and soft."
      },
      {
        "step": 10,
        "instruction": "Stir in the garam masala and half the coriander. Serve the rajma over the hot rice, topped with the remaining coriander."
      }
    ],
    "notes": [
      "Rajma tastes even better the next day, once the flavours have settled in.",
      "In a hurry? Use 2 cups of canned rajma (rinsed) and simmer for 15 minutes. You can skip step 1.",
      "Serve with sliced raw onion, a wedge of lemon and a little pickle on the side.",
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 470,
      "protein": 14,
      "carbs": 74,
      "fat": 13
    }
  },
  "chole bhature": {
    "dishName": "Chole Bhature",
    "description": "Tangy, spicy chickpea curry with puffy, golden fried bread.",
    "prepTime": "Approx. 1.5 hours (plus overnight soaking and 2 hours dough rest)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Kabuli Chana",
        "englishName": "white chickpeas, soaked overnight"
      },
      {
        "amount": "1",
        "commonName": "Chai Patti (tea bag)",
        "englishName": "tea bag, for colour"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2 tsp",
        "commonName": "Chole Masala",
        "englishName": "chole masala powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour, for bhature"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Suji",
        "englishName": "fine semolina, for bhature"
      },
      {
        "amount": "1/3 cup",
        "commonName": "Dahi",
        "englishName": "yogurt, for bhature"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "cooking oil, for deep frying"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix maida, suji, baking soda, sugar, salt, yogurt and oil. Add warm water little by little and knead into a soft dough."
      },
      {
        "step": 2,
        "instruction": "Cover the dough with a damp cloth and rest it in a warm spot for 2 hours. It should look puffed up."
      },
      {
        "step": 3,
        "instruction": "Drain the chickpeas and add them to the cooker with the tea bag, salt and 3 cups water. Cook for 8 to 10 whistles. Remove the tea bag and keep the chickpeas in their water.",
        "tip": {
          "title": "The dhaba colour trick",
          "content": "The tea bag gives chole that deep brown colour you see at restaurants. You won't taste the tea at all."
        }
      },
      {
        "step": 4,
        "instruction": "Heat 2 tablespoons oil in a kadai and add the cumin seeds. Add the onions and cook for 8 to 10 minutes until golden brown."
      },
      {
        "step": 5,
        "instruction": "Add the ginger-garlic paste and cook for 1 minute. Add the tomatoes and cook for 6 to 8 minutes until they turn soft and mushy."
      },
      {
        "step": 6,
        "instruction": "Add turmeric, red chilli powder, coriander powder, chole masala and salt. Add a splash of water and cook for 2 minutes."
      },
      {
        "step": 7,
        "instruction": "Add the boiled chickpeas with about 1.5 cups of their water. Mash a few chickpeas to thicken the gravy and simmer for 15 to 20 minutes."
      },
      {
        "step": 8,
        "instruction": "Stir in the amchur, taste, and adjust the salt. Keep the chole warm on the lowest heat."
      },
      {
        "step": 9,
        "instruction": "Divide the rested dough into 6 balls. Lightly oil your rolling pin and surface, and roll each ball into an oval about 1/4 inch thick."
      },
      {
        "step": 10,
        "instruction": "Heat oil for frying in a kadai on medium-high heat. To test it, drop in a small piece of dough. It should rise to the top in a couple of seconds."
      },
      {
        "step": 11,
        "instruction": "Slide one bhatura in and gently press it down with the slotted spoon. It puffs up within seconds. Flip and fry for about 30 seconds more until golden. Drain and repeat.",
        "tip": {
          "title": "Oil temperature matters",
          "content": "If the oil is too cool, the bhature turn oily and don't puff. If it's too hot, they brown before they cook inside."
        }
      },
      {
        "step": 12,
        "instruction": "Serve the bhature hot with the chole, sliced raw onion, green chillies and a lemon wedge."
      }
    ],
    "notes": [
      "Don't roll the bhature too thin, or they won't puff properly.",
      "No time for the 2-hour rest? Rest the dough for 30 minutes with a pinch more baking soda. It'll still work, just slightly less fluffy.",
      "The chole can be made a day ahead and reheated with a splash of water.",
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through.",
      "Black tea is optional and mainly adds darker colour; skip it without changing the basic recipe."
    ],
    "nutrition": {
      "calories": 570,
      "protein": 18,
      "carbs": 88,
      "fat": 16
    }
  },
  "chole kulche": {
    "dishName": "Chole Kulche",
    "description": "Spicy, tangy chickpea curry served with soft, tawa-cooked kulchas.",
    "prepTime": "Approx. 1.5 hours (plus overnight soaking and 1 hour dough rest)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Kabuli Chana",
        "englishName": "white chickpeas, soaked overnight"
      },
      {
        "amount": "1",
        "commonName": "Chai Patti (tea bag)",
        "englishName": "tea bag, for colour"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2 tsp",
        "commonName": "Chole Masala",
        "englishName": "chole masala powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour, for kulche"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt, for kulche"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Baking Powder",
        "englishName": "baking powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kalonji",
        "englishName": "nigella seeds (optional)"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Makhan",
        "englishName": "butter, for brushing"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix maida, baking powder, baking soda, sugar, salt, yogurt and oil. Add water as needed and knead into a soft dough."
      },
      {
        "step": 2,
        "instruction": "Cover with a damp cloth and rest the dough for 1 hour."
      },
      {
        "step": 3,
        "instruction": "Drain the chickpeas and pressure cook with the tea bag, salt and 3 cups water for 8 to 10 whistles. Remove the tea bag and keep the chickpeas in their water."
      },
      {
        "step": 4,
        "instruction": "Heat 2 tablespoons oil in a kadai and add the cumin seeds. Add the onions and cook for 8 to 10 minutes until golden brown."
      },
      {
        "step": 5,
        "instruction": "Add the ginger-garlic paste and cook for a minute. Add the tomatoes and cook for 6 to 8 minutes until mushy and the oil separates."
      },
      {
        "step": 6,
        "instruction": "Add turmeric, red chilli powder, chole masala and salt, with a splash of water. Cook for 2 minutes."
      },
      {
        "step": 7,
        "instruction": "Add the chickpeas with about 1.5 cups of their water. Mash a few to thicken the gravy and simmer for 15 to 20 minutes. Finish with amchur and keep warm."
      },
      {
        "step": 8,
        "instruction": "Divide the dough into 6 balls. Roll each into a round about 1/4 inch thick, pressing a pinch of kalonji into the top if using."
      },
      {
        "step": 9,
        "instruction": "Brush a little water on the bottom side of the kulcha. Place it water-side down on a hot tawa and cook for about 1 minute until bubbles appear."
      },
      {
        "step": 10,
        "instruction": "Flip and cook the other side for 1 to 2 minutes until golden spots appear. Brush with butter and serve hot.",
        "tip": {
          "title": "Soft kulche",
          "content": "Keep cooked kulche wrapped in a clean cloth. The steam keeps them soft until everyone's ready to eat."
        }
      },
      {
        "step": 11,
        "instruction": "Serve the kulche with the hot chole, sliced onion, green chilli and lemon."
      }
    ],
    "notes": [
      "The dough should feel soft and a little sticky. Add a little flour only if it really sticks to your hands.",
      "The chole can be made a day ahead and gets tastier overnight.",
      "Black tea is optional and mainly adds darker colour; skip it without changing the basic recipe."
    ],
    "nutrition": {
      "calories": 520,
      "protein": 16,
      "carbs": 80,
      "fat": 15
    }
  },
  "shahi paneer": {
    "dishName": "Shahi Paneer",
    "description": "Soft paneer cubes in a rich, creamy, mildly sweet gravy made from onions,.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "250 g",
        "commonName": "Paneer",
        "englishName": "paneer, cubed"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, roughly chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, roughly chopped"
      },
      {
        "amount": "15",
        "commonName": "Kaju",
        "englishName": "cashews"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Dahi",
        "englishName": "yogurt, whisked smooth"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2",
        "commonName": "Elaichi",
        "englishName": "green cardamom pods"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kashmiri Lal Mirch",
        "englishName": "Kashmiri red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves, crushed"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Malai",
        "englishName": "fresh cream"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Put the onions, tomatoes, cashews and cardamom in a small pot with 1.5 cups water. Bring to a boil and simmer for 10 to 12 minutes until everything is soft."
      },
      {
        "step": 2,
        "instruction": "Let it cool for a few minutes, then blend into a very smooth puree. A smooth puree is the secret to that silky restaurant gravy."
      },
      {
        "step": 3,
        "instruction": "Heat ghee in a pan and add the bay leaf. Add the ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 4,
        "instruction": "Pour in the puree and cook on medium heat for 8 to 10 minutes, stirring often, until it thickens and the ghee starts to show at the edges."
      },
      {
        "step": 5,
        "instruction": "Turn the heat to low. Add the whisked yogurt a spoon at a time, stirring constantly so it doesn't split.",
        "tip": {
          "title": "Curd without splitting",
          "content": "Whisk the yogurt until smooth and add it on low heat. Cold, lumpy yogurt in a boiling gravy is what makes it curdle."
        }
      },
      {
        "step": 6,
        "instruction": "Add Kashmiri chilli powder, coriander powder, sugar and salt. Add 1/2 cup water and simmer for 5 minutes."
      },
      {
        "step": 7,
        "instruction": "Add the paneer cubes and simmer gently for 4 to 5 minutes."
      },
      {
        "step": 8,
        "instruction": "Stir in the cream, crushed kasuri methi and garam masala. Cook for 1 more minute and switch off the heat."
      },
      {
        "step": 9,
        "instruction": "Serve hot with naan, roti or jeera rice."
      }
    ],
    "notes": [
      "Soaking paneer cubes in warm water for 10 minutes before adding keeps them extra soft.",
      "Shahi paneer is meant to be mild and slightly sweet. Add more chilli only if you like it spicy.",
      "Rub the kasuri methi between your palms before adding so it releases its aroma."
    ],
    "nutrition": {
      "calories": 430,
      "protein": 15,
      "carbs": 18,
      "fat": 33
    }
  },
  "dal tadka": {
    "dishName": "Dal Tadka",
    "description": "Everyday yellow dal, cooked soft and finished with a sizzling garlic-cumin tadka.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/2 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Moong Dal",
        "englishName": "split yellow lentils"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "4 cloves",
        "commonName": "Lehsun",
        "englishName": "garlic, finely chopped"
      },
      {
        "amount": "2",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chillies"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "1/2",
        "commonName": "Nimbu",
        "englishName": "lemon, juiced"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash both dals well until the water runs clear. Add them to a pressure cooker with turmeric, salt and 3 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 4 to 5 whistles until soft. Let the pressure release, then whisk the dal until creamy. Add hot water if it is too thick."
      },
      {
        "step": 3,
        "instruction": "In a pan, heat 1 tablespoon ghee. Add half the cumin seeds and a pinch of hing."
      },
      {
        "step": 4,
        "instruction": "Add the chopped onion and cook for 4 to 5 minutes until golden."
      },
      {
        "step": 5,
        "instruction": "Add the tomato and red chilli powder and cook for 3 to 4 minutes until the tomato turns soft and mushy."
      },
      {
        "step": 6,
        "instruction": "Pour this masala into the dal, mix well and simmer for 5 minutes so the flavours come together."
      },
      {
        "step": 7,
        "instruction": "Heat the remaining ghee. Add cumin, garlic and dried red chillies. Fry for about 30 seconds until the garlic turns light golden.",
        "tip": {
          "title": "Don't burn the garlic",
          "content": "Take it off the heat the moment it turns light golden. Dark garlic tastes bitter and can spoil the whole dal."
        }
      },
      {
        "step": 8,
        "instruction": "Pour the sizzling tadka over the dal. Add the lemon juice and coriander and cover for a minute."
      },
      {
        "step": 9,
        "instruction": "Serve hot with rice or roti."
      }
    ],
    "notes": [
      "Mixing moong dal with toor dal makes it cook faster and taste creamier.",
      "Dal thickens as it sits, so add a little hot water when you reheat it."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 12,
      "carbs": 38,
      "fat": 9
    }
  },
  "matar paneer": {
    "dishName": "Matar Paneer",
    "description": "Soft paneer and sweet green peas in a spiced onion-tomato gravy.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "200 g",
        "commonName": "Paneer",
        "englishName": "paneer, cubed"
      },
      {
        "amount": "1 cup",
        "commonName": "Hari Matar",
        "englishName": "green peas, fresh or frozen"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, chopped"
      },
      {
        "amount": "3 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves (optional)"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add the cumin seeds. Let them sizzle for 10 seconds."
      },
      {
        "step": 2,
        "instruction": "Add the onions and cook for 6 to 8 minutes until golden."
      },
      {
        "step": 3,
        "instruction": "Add the ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 4,
        "instruction": "Add the tomatoes, turmeric, red chilli powder, coriander powder and salt. Cook for 8 to 10 minutes until the tomatoes turn mushy and the oil separates from the masala."
      },
      {
        "step": 5,
        "instruction": "Let the masala cool for a few minutes, then blend it to a smooth paste and return it to the pan. Skip this step if you like a chunkier gravy.",
        "tip": {
          "title": "Smooth vs. homestyle",
          "content": "Blending gives a restaurant-style smooth gravy. Leaving it chunky is how most homes make it, and it's just as tasty."
        }
      },
      {
        "step": 6,
        "instruction": "Add the peas and 1 cup water. Cover and cook for 5 to 7 minutes until the peas are tender."
      },
      {
        "step": 7,
        "instruction": "Add the paneer cubes and simmer gently for 3 to 4 minutes."
      },
      {
        "step": 8,
        "instruction": "Crush the kasuri methi between your palms and add it with the garam masala. Mix gently."
      },
      {
        "step": 9,
        "instruction": "Garnish with coriander and serve hot with roti, paratha or rice."
      }
    ],
    "notes": [
      "Frozen peas work perfectly. Add them straight from the freezer.",
      "If you like a richer gravy, add 2 tablespoons of cream or a spoon of cashew paste at the end."
    ],
    "nutrition": {
      "calories": 380,
      "protein": 17,
      "carbs": 26,
      "fat": 23
    }
  },
  "pav bhaji": {
    "dishName": "Pav Bhaji",
    "description": "Buttery, spicy mashed vegetable curry served with toasted pav.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, peeled and cubed"
      },
      {
        "amount": "1 cup",
        "commonName": "Gobi",
        "englishName": "cauliflower florets"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Hari Matar",
        "englishName": "green peas"
      },
      {
        "amount": "1",
        "commonName": "Gajar",
        "englishName": "carrot, chopped"
      },
      {
        "amount": "1",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, finely chopped"
      },
      {
        "amount": "3 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Pav Bhaji Masala",
        "englishName": "pav bhaji masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kashmiri Lal Mirch",
        "englishName": "Kashmiri red chilli powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "4 tbsp",
        "commonName": "Makhan",
        "englishName": "butter, plus extra for the pav"
      },
      {
        "amount": "8",
        "commonName": "Pav",
        "englishName": "pav buns"
      },
      {
        "amount": "1",
        "commonName": "Nimbu",
        "englishName": "lemon"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Put the potatoes, cauliflower, peas and carrot in a pressure cooker with 1 cup water and a pinch of salt. Cook for 3 to 4 whistles, until everything is very soft."
      },
      {
        "step": 2,
        "instruction": "Heat 2 tablespoons butter in a large pan. Add half the chopped onions and cook for 4 to 5 minutes until soft."
      },
      {
        "step": 3,
        "instruction": "Add the capsicum and cook for 2 minutes. Add the ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 4,
        "instruction": "Add the tomatoes and cook for 8 to 10 minutes, pressing them down, until they turn completely mushy."
      },
      {
        "step": 5,
        "instruction": "Add turmeric, red chilli powder, pav bhaji masala and salt. Cook for 2 minutes, adding a splash of water if it sticks."
      },
      {
        "step": 6,
        "instruction": "Add the boiled vegetables with the water they cooked in. Mash everything with a potato masher until mostly smooth, leaving a few small chunks."
      },
      {
        "step": 7,
        "instruction": "Add 1/2 to 1 cup water, depending on how thick you like it. Simmer for 10 minutes, mashing again as needed."
      },
      {
        "step": 8,
        "instruction": "Stir in 1 to 2 tablespoons butter and half the lemon juice. Turn off the heat and garnish with coriander.",
        "tip": {
          "title": "Butter is the point",
          "content": "Good pav bhaji is buttery. Add butter at the end so the flavour stays fresh, and don't be shy."
        }
      },
      {
        "step": 9,
        "instruction": "Slit each pav in half. Melt a little butter on a tawa, sprinkle a pinch of pav bhaji masala, and toast the pav for about 1 minute on each side until golden and crisp."
      },
      {
        "step": 10,
        "instruction": "Serve the bhaji hot with the toasted pav, remaining chopped onion, a lemon wedge and a small dab of butter on top."
      }
    ],
    "notes": [
      "Chopped raw onion and lemon on the side are what make pav bhaji taste like the real thing.",
      "Leftover bhaji tastes even better the next day. Add a splash of water when reheating."
    ],
    "nutrition": {
      "calories": 450,
      "protein": 11,
      "carbs": 66,
      "fat": 16
    }
  },
  "egg curry (anda curry)": {
    "dishName": "Egg Curry (Anda Curry)",
    "description": "Boiled eggs simmered in a spiced onion-tomato gravy.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "5",
        "commonName": "Ande",
        "englishName": "eggs"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil the eggs in water for 10 minutes. Cool them in cold water, peel, and make 2 to 3 small slits on each egg with a knife so the masala can get in."
      },
      {
        "step": 2,
        "instruction": "Heat 1 tablespoon oil in a pan. Add a pinch of turmeric and red chilli powder, then fry the eggs for 2 minutes until lightly golden and set aside.",
        "tip": {
          "title": "Why fry the eggs?",
          "content": "A light fry gives the eggs a golden skin that holds the masala better and stops them from turning rubbery in the gravy."
        }
      },
      {
        "step": 3,
        "instruction": "In the same pan, heat the remaining oil. Add the cumin seeds and let them sizzle."
      },
      {
        "step": 4,
        "instruction": "Add the onions and cook for 8 to 10 minutes until golden brown."
      },
      {
        "step": 5,
        "instruction": "Add the ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 6,
        "instruction": "Add the tomatoes and cook for 6 to 8 minutes until soft and the oil starts to separate."
      },
      {
        "step": 7,
        "instruction": "Add turmeric, red chilli powder, coriander powder and salt. Add a splash of water and cook for 2 minutes."
      },
      {
        "step": 8,
        "instruction": "Add 1 cup water and bring to a gentle boil. Simmer for 5 minutes for the gravy to thicken slightly."
      },
      {
        "step": 9,
        "instruction": "Add the eggs, spoon the gravy over them and simmer for 5 minutes. Add the garam masala."
      },
      {
        "step": 10,
        "instruction": "Garnish with coriander and serve hot with rice or roti."
      }
    ],
    "notes": [
      "Don't boil the eggs for longer than 10 minutes, or the yolks turn grey and chalky.",
      "Want a thicker, restaurant-style gravy? Blend the onion-tomato masala before adding the water."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 18,
      "carbs": 11,
      "fat": 27
    }
  },
  "idli sambar": {
    "dishName": "Idli Sambar",
    "description": "Soft, fluffy steamed rice-lentil cakes served with a tangy, spiced lentil-and-vegetable sambar.",
    "prepTime": "Approx. 50 minutes (using ready idli batter)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 cups",
        "commonName": "Idli Batter",
        "englishName": "fermented idli batter"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1",
        "commonName": "Gajar",
        "englishName": "carrot, chopped"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Lauki ya Sahjan",
        "englishName": "bottle gourd or drumstick pieces (optional)"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Imli",
        "englishName": "tamarind pulp, or a small lemon-sized ball soaked in warm water"
      },
      {
        "amount": "2 tsp",
        "commonName": "Sambar Powder",
        "englishName": "sambar powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "2",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chillies"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the toor dal and pressure cook it with turmeric and 2 cups water for 4 to 5 whistles, until completely soft. Mash it with a spoon."
      },
      {
        "step": 2,
        "instruction": "Grease the idli plates lightly with oil and fill each mould with batter, about 3/4 full."
      },
      {
        "step": 3,
        "instruction": "Steam the idlis for 10 to 12 minutes on medium heat. To check, insert a knife into an idli. If it comes out clean, they're done. Let them rest for 2 minutes before removing.",
        "tip": {
          "title": "Easy idli removal",
          "content": "Dip a spoon in water and run it around each idli. They pop out without breaking."
        }
      },
      {
        "step": 4,
        "instruction": "For the sambar, put the chopped carrot, onion, tomato and other vegetables in a pot with 2 cups water and a pinch of salt. Cook for 8 to 10 minutes until tender."
      },
      {
        "step": 5,
        "instruction": "Add the tamarind pulp and sambar powder and simmer for 3 to 4 minutes."
      },
      {
        "step": 6,
        "instruction": "Add the mashed dal and 1/2 cup extra water if needed. Add salt and simmer for 5 to 7 minutes until it reaches a soup-like consistency."
      },
      {
        "step": 7,
        "instruction": "For the tadka, heat oil or ghee in a small pan. Add the mustard seeds and let them pop. Add the dried red chillies, curry leaves and hing and let them sizzle for 10 seconds."
      },
      {
        "step": 8,
        "instruction": "Pour the tadka over the sambar, add coriander and stir."
      },
      {
        "step": 9,
        "instruction": "Serve the hot idlis in a bowl with sambar poured over or on the side, ideally with coconut chutney."
      }
    ],
    "notes": [
      "Good store-bought idli batter works just as well and saves you the overnight fermentation.",
      "Sambar is better the next day. Add a little water when reheating.",
      "Dip leftover idlis in the sambar the next morning. They're just as good.",
      "Store-bought fermented batter is fine for a quicker version."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 11,
      "carbs": 49,
      "fat": 9
    }
  },
  "dosa (plain crispy dosa)": {
    "dishName": "Plain Dosa",
    "description": "Thin, crisp, golden dosa made from fermented rice-lentil batter.",
    "prepTime": "Approx. 30 minutes (using ready dosa batter)",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Dosa Batter",
        "englishName": "fermented dosa batter"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water, to loosen the batter"
      },
      {
        "amount": "1/2",
        "commonName": "Pyaaz",
        "englishName": "onion, halved, for greasing the tawa"
      },
      {
        "amount": "as needed",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee, for cooking"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Take the batter out of the fridge 20 to 30 minutes before cooking so it comes to room temperature. Add a pinch of salt only if needed and stir gently."
      },
      {
        "step": 2,
        "instruction": "Add a little water and stir until the batter is thin and pourable, like thin cream. It should fall off the ladle in a smooth stream."
      },
      {
        "step": 3,
        "instruction": "Heat the tawa on medium-high heat for 2 to 3 minutes. Sprinkle a few drops of water. They should sizzle and disappear quickly."
      },
      {
        "step": 4,
        "instruction": "Stick a fork into the cut side of the onion half, dip it in a little oil and rub it over the hot tawa. This cleans and seasons the surface.",
        "tip": {
          "title": "Tawa temperature",
          "content": "If the tawa is too hot, the batter won't spread. If it's too cool, the dosa sticks. Sprinkle a little water on it between dosas to bring the temperature down."
        }
      },
      {
        "step": 5,
        "instruction": "Pour a ladle of batter in the centre. Quickly spread it outward in circles with the back of the ladle, moving from the middle to the edges, into a thin round."
      },
      {
        "step": 6,
        "instruction": "Drizzle 1 teaspoon oil or ghee around the edges and over the top. Cook for 2 to 3 minutes without flipping, until the underside is golden and the edges lift away."
      },
      {
        "step": 7,
        "instruction": "Fold the dosa in half or roll it and serve straight away."
      },
      {
        "step": 8,
        "instruction": "Serve hot with coconut chutney, sambar or a spoon of ghee and podi."
      }
    ],
    "notes": [
      "The first dosa usually breaks or sticks. That's normal. Just get the tawa temperature right and the rest will be perfect.",
      "Thin batter makes a crisp dosa. Slightly thicker batter makes a softer one.",
      "Want a filling? Look up our Masala Dosa recipe for the classic potato masala.",
      "Store-bought fermented batter is fine for a quicker version."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 4,
      "carbs": 28,
      "fat": 6
    }
  },
  "french toast (anda bread)": {
    "dishName": "French Toast (Anda Bread)",
    "description": "Bread dipped in a spiced egg mixture with onion, green chilli and coriander,.",
    "prepTime": "Approx. 15 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 slices",
        "commonName": "Bread",
        "englishName": "bread slices"
      },
      {
        "amount": "2",
        "commonName": "Ande",
        "englishName": "eggs"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Doodh",
        "englishName": "milk"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "1 pinch",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 pinch",
        "commonName": "Kali Mirch",
        "englishName": "black pepper"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Makhan ya Tel",
        "englishName": "butter or oil, for cooking"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "In a shallow bowl, beat the eggs with milk, onion, green chilli, coriander, turmeric, pepper and salt until well mixed."
      },
      {
        "step": 2,
        "instruction": "Heat a tawa on medium heat and add a little butter or oil."
      },
      {
        "step": 3,
        "instruction": "Dip one slice of bread into the egg mixture for about 3 seconds on each side. It should soak in but not fall apart.",
        "tip": {
          "title": "Don't soak it",
          "content": "A quick dip is enough. Leaving the bread too long makes it soggy and hard to flip."
        }
      },
      {
        "step": 4,
        "instruction": "Place it on the tawa. Spoon a little extra egg mixture with the onions over the top if any is left."
      },
      {
        "step": 5,
        "instruction": "Cook for 2 to 3 minutes until golden brown underneath, then flip and cook the other side for 2 minutes."
      },
      {
        "step": 6,
        "instruction": "Repeat with the remaining slices, adding butter to the tawa each time."
      },
      {
        "step": 7,
        "instruction": "Serve hot with tomato ketchup or green chutney."
      }
    ],
    "notes": [
      "Slightly stale bread works best because it absorbs the egg without falling apart.",
      "Prefer sweet? Skip the onion, chilli, coriander and pepper. Add 1 tablespoon sugar and a pinch of cardamom powder or cinnamon to the egg mixture instead."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 12,
      "carbs": 30,
      "fat": 17
    }
  },
  "french beans (beans ki sabzi)": {
    "dishName": "French Beans Sabzi (Beans ki Sabzi)",
    "description": "Tender, lightly spiced dry french beans with onion and cumin.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "250 g",
        "commonName": "French Beans",
        "englishName": "french beans, trimmed and chopped small"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Nariyal",
        "englishName": "grated fresh coconut (optional)"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the beans, pat them dry, snip off both ends and chop into small pieces, about the size of your little fingertip. Smaller pieces cook faster and evenly."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai and add the cumin seeds. Let them sizzle for 10 seconds."
      },
      {
        "step": 3,
        "instruction": "Add the onion and green chilli and cook for 4 to 5 minutes until the onion turns soft and light golden."
      },
      {
        "step": 4,
        "instruction": "Add the beans, turmeric, coriander powder, red chilli powder and salt. Mix well so every piece is coated."
      },
      {
        "step": 5,
        "instruction": "Sprinkle 2 tablespoons of water, cover with a lid and cook on low heat for 8 to 10 minutes, stirring every 3 minutes, until the beans are tender but still bright green.",
        "tip": {
          "title": "Don't add much water",
          "content": "The beans cook in their own steam. Too much water makes them soggy and dull in colour."
        }
      },
      {
        "step": 6,
        "instruction": "Remove the lid and cook for 2 to 3 minutes on medium heat to dry off any extra moisture. Add the grated coconut, if using, and mix."
      },
      {
        "step": 7,
        "instruction": "Serve hot with roti or dal and rice."
      }
    ],
    "notes": [
      "To check if it's done, bite one piece. It should be soft with a slight bite, not mushy.",
      "Add a diced potato with the beans for a heartier sabzi. It will need 3 to 4 extra minutes."
    ],
    "nutrition": {
      "calories": 150,
      "protein": 4,
      "carbs": 18,
      "fat": 7
    }
  },
  "nutrela (soya chunks curry)": {
    "dishName": "Nutrela (Soya Chunks Curry)",
    "description": "Soft, juicy soya chunks simmered in a spiced onion-tomato gravy.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Nutrela / Soya Chunks",
        "englishName": "soya chunks"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Dahi",
        "englishName": "yogurt, whisked"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil 3 cups of water with 1/2 tsp salt. Add the soya chunks and let them soak and simmer for 10 minutes until soft and doubled in size."
      },
      {
        "step": 2,
        "instruction": "Drain them, rinse in cold water, then squeeze each chunk between your palms until all the water comes out. Set aside.",
        "tip": {
          "title": "Squeeze well",
          "content": "This is the most important step. It removes the raw beany smell and lets the chunks soak up the masala."
        }
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai and add the cumin seeds. Let them sizzle, then add the onions and cook for 8 to 10 minutes until golden brown."
      },
      {
        "step": 4,
        "instruction": "Add the ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 5,
        "instruction": "Add the tomatoes and cook for 6 to 8 minutes until they turn mushy and the oil separates at the edges."
      },
      {
        "step": 6,
        "instruction": "Add turmeric, red chilli powder, coriander powder and salt. Add a splash of water and cook for 2 minutes."
      },
      {
        "step": 7,
        "instruction": "Turn the heat to low and stir in the whisked yogurt, mixing constantly for 1 minute so it doesn't split."
      },
      {
        "step": 8,
        "instruction": "Add the squeezed soya chunks and stir until they are fully coated. Fry for 3 to 4 minutes."
      },
      {
        "step": 9,
        "instruction": "Add 1 cup water, cover and simmer for 8 to 10 minutes until the gravy thickens and the chunks are soft."
      },
      {
        "step": 10,
        "instruction": "Sprinkle garam masala and coriander. Serve hot with roti or rice."
      }
    ],
    "notes": [
      "For a dry sabzi, add only 1/4 cup water and cook uncovered until the masala clings to the chunks.",
      "Add a cup of green peas or cubed potato with the water for a heartier curry."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 23,
      "carbs": 24,
      "fat": 8
    }
  },
  "atta halwa (wheat flour halwa)": {
    "dishName": "Atta Halwa (Wheat Flour Halwa)",
    "description": "Warm, ghee-rich halwa made from roasted whole wheat flour and sugar.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/2 cup",
        "commonName": "Atta",
        "englishName": "whole wheat flour"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Cheeni",
        "englishName": "sugar (or grated jaggery)"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "2",
        "commonName": "Elaichi",
        "englishName": "green cardamom pods, crushed"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Badam",
        "englishName": "chopped almonds (optional)"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "In a small pot, bring the water, sugar and cardamom to a boil. Stir until the sugar dissolves, then keep it hot on the lowest heat."
      },
      {
        "step": 2,
        "instruction": "Melt the ghee in a kadai on low heat. Add the atta."
      },
      {
        "step": 3,
        "instruction": "Roast on low heat, stirring constantly, for 10 to 12 minutes. You'll know it's ready when the atta turns golden brown, smells nutty and the ghee starts separating from the edges.",
        "tip": {
          "title": "Patience with the roast",
          "content": "The roasting decides the taste. Under-roasted atta tastes raw, so keep going until it's a deep golden colour."
        }
      },
      {
        "step": 4,
        "instruction": "Stand back a little and carefully pour in the hot syrup while stirring. It will splutter and bubble, which is normal."
      },
      {
        "step": 5,
        "instruction": "Keep stirring for 2 to 3 minutes until the halwa thickens, turns glossy and leaves the sides of the pan."
      },
      {
        "step": 6,
        "instruction": "Turn off the heat, top with almonds and serve warm."
      }
    ],
    "notes": [
      "Always add hot syrup to the roasted atta. Cold water causes lumps.",
      "For a more traditional taste, swap the sugar for the same amount of grated jaggery."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 5,
      "carbs": 44,
      "fat": 15
    }
  },
  "chana dal (chana dal tadka)": {
    "dishName": "Chana Dal (Chana Dal Tadka)",
    "description": "Nutty, thick split chickpea dal with a garlicky onion-tomato tadka.",
    "prepTime": "Approx. 45 minutes (plus 1 hour soaking)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Chana Dal",
        "englishName": "split chickpeas, soaked 1 hour"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "2",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chillies"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked chana dal and add it to a pressure cooker with turmeric, salt and 3 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 5 to 6 whistles, until the dal is soft and can be mashed easily with a spoon. Let the pressure release on its own, then lightly mash a few spoonfuls.",
        "tip": {
          "title": "Chana dal is slow to soften",
          "content": "It takes longer than toor or moong dal. If it's still firm after opening, give it 2 more whistles."
        }
      },
      {
        "step": 3,
        "instruction": "Heat 1 tablespoon ghee in a pan. Add the cumin seeds and a pinch of hing."
      },
      {
        "step": 4,
        "instruction": "Add the onion and cook for 5 to 6 minutes until golden. Add the ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 5,
        "instruction": "Add the tomato, coriander powder and red chilli powder. Cook for 4 to 5 minutes until the tomato turns soft and mushy."
      },
      {
        "step": 6,
        "instruction": "Pour this masala into the dal, mix well and simmer for 8 to 10 minutes. Add hot water if it gets too thick."
      },
      {
        "step": 7,
        "instruction": "For the final tadka, heat the remaining ghee, add the dried red chillies and let them sizzle for 10 seconds. Pour it over the dal."
      },
      {
        "step": 8,
        "instruction": "Garnish with coriander and serve hot with rice or roti."
      }
    ],
    "notes": [
      "In a hurry? Soak the dal for at least 30 minutes and add 1 extra whistle.",
      "A squeeze of lemon at the end brightens the taste."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 12,
      "carbs": 33,
      "fat": 9
    }
  },
  "white chole (safed chole)": {
    "dishName": "White Chole (Safed Chole)",
    "description": "Mild, pale chickpea curry in a smooth onion-ginger gravy with yogurt.",
    "prepTime": "Approx. 1 hour (plus overnight soaking)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Kabuli Chana",
        "englishName": "white chickpeas, soaked overnight"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, roughly chopped"
      },
      {
        "amount": "1 inch",
        "commonName": "Adrak",
        "englishName": "ginger"
      },
      {
        "amount": "2",
        "commonName": "Hari Mirch",
        "englishName": "green chillies"
      },
      {
        "amount": "8",
        "commonName": "Kaju",
        "englishName": "cashews (optional, for creaminess)"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Dahi",
        "englishName": "yogurt, whisked smooth"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked chickpeas and pressure cook with 3 cups water and 1/2 tsp salt for 8 to 10 whistles, until very soft. Keep them in their water."
      },
      {
        "step": 2,
        "instruction": "Blend the onions, ginger, green chillies and cashews with a few tablespoons of water into a smooth, pale paste."
      },
      {
        "step": 3,
        "instruction": "Heat ghee in a kadai and add the cumin seeds and bay leaf. Let them sizzle for 10 seconds."
      },
      {
        "step": 4,
        "instruction": "Add the onion paste and cook on medium-low heat for 8 to 10 minutes, stirring often, until the raw smell goes and the paste looks thick. Don't let it brown.",
        "tip": {
          "title": "Keep it pale",
          "content": "The white look comes from cooking the paste gently. If it turns brown, lower the heat and add a splash of water."
        }
      },
      {
        "step": 5,
        "instruction": "Add the coriander powder and salt, then turn the heat to low and stir in the whisked yogurt. Mix constantly for 1 to 2 minutes so it doesn't split."
      },
      {
        "step": 6,
        "instruction": "Add the boiled chickpeas with about 1.5 cups of their water. Mash a few chickpeas against the side of the pan to thicken the gravy."
      },
      {
        "step": 7,
        "instruction": "Simmer for 15 minutes, stirring occasionally, until the gravy is creamy."
      },
      {
        "step": 8,
        "instruction": "Add the garam masala and amchur, mix, and turn off the heat. Garnish with coriander and serve hot."
      }
    ],
    "notes": [
      "This is a mild chole. For more heat, add an extra green chilli or a pinch of white pepper.",
      "Serve with kulche, bhature, jeera rice or plain roti."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 12,
      "carbs": 36,
      "fat": 10
    }
  },
  "pasta (indian masala pasta)": {
    "dishName": "Pasta (Indian Masala Pasta)",
    "description": "Desi-style red sauce pasta with onion, capsicum and a little garam masala.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Pasta",
        "englishName": "penne or any short pasta"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1/2",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, chopped"
      },
      {
        "amount": "3 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, blended into puree"
      },
      {
        "amount": "3 cloves",
        "commonName": "Lehsun",
        "englishName": "garlic, finely chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Oregano",
        "englishName": "dried oregano or mixed herbs"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tomato Ketchup",
        "englishName": "tomato ketchup"
      },
      {
        "amount": "1 pinch",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel ya Makhan",
        "englishName": "oil or butter"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Cheese",
        "englishName": "grated cheese (optional)"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Bring 6 cups of water to a boil with 1 tablespoon salt and a teaspoon of oil. Add the pasta and cook for 8 to 9 minutes until al dente."
      },
      {
        "step": 2,
        "instruction": "Drain the pasta, but save 1/2 cup of the starchy pasta water. Rinse the pasta lightly with cold water so it doesn't stick.",
        "tip": {
          "title": "Save the pasta water",
          "content": "A splash of this starchy water later makes the sauce cling to the pasta instead of sliding off."
        }
      },
      {
        "step": 3,
        "instruction": "Heat oil or butter in a kadai. Add the garlic and cook for 20 seconds until fragrant."
      },
      {
        "step": 4,
        "instruction": "Add the onion and cook for 3 to 4 minutes until soft. Add the capsicum and cook for 2 minutes."
      },
      {
        "step": 5,
        "instruction": "Add the tomato puree, red chilli powder, salt and sugar. Cook for 6 to 8 minutes, stirring, until the sauce thickens and the oil separates."
      },
      {
        "step": 6,
        "instruction": "Stir in the ketchup, oregano and garam masala."
      },
      {
        "step": 7,
        "instruction": "Add the boiled pasta and a few spoonfuls of the saved pasta water. Toss well on medium heat for 2 minutes until the sauce coats every piece."
      },
      {
        "step": 8,
        "instruction": "Top with grated cheese if using, cover for 1 minute so it melts, and serve hot."
      }
    ],
    "notes": [
      "Add sweet corn, boiled peas or chopped carrot for a veggie-loaded version.",
      "Swap the garam masala for a pinch of chaat masala for extra tang."
    ],
    "nutrition": {
      "calories": 420,
      "protein": 13,
      "carbs": 60,
      "fat": 14
    }
  },
  "maggi (masala maggi noodles)": {
    "dishName": "Maggi (Masala Maggi Noodles)",
    "description": "Loaded masala Maggi with onion, tomato and green chilli.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 packets",
        "commonName": "Maggi Noodles",
        "englishName": "instant noodles with tastemaker"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Tamatar",
        "englishName": "tomato, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "peas, carrot or capsicum (optional)"
      },
      {
        "amount": "2.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Makhan ya Tel",
        "englishName": "butter or oil"
      },
      {
        "amount": "1 pinch",
        "commonName": "Kali Mirch",
        "englishName": "black pepper"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat butter or oil in a pan. Add the onion and green chilli and cook for 1 to 2 minutes until soft."
      },
      {
        "step": 2,
        "instruction": "Add the tomato and any vegetables and cook for 2 minutes."
      },
      {
        "step": 3,
        "instruction": "Add the water and both tastemaker sachets. Stir and bring it to a boil."
      },
      {
        "step": 4,
        "instruction": "Break the noodle cakes into the boiling water. Cook for 2 to 3 minutes, gently pushing the noodles down and turning them, until they turn soft."
      },
      {
        "step": 5,
        "instruction": "Cover and cook for 1 more minute on low heat. Stop when most of the water has been absorbed and a little masala gravy is left.",
        "tip": {
          "title": "Don't overcook",
          "content": "Maggi keeps cooking in its own heat after you switch off the stove. Turn it off when it's slightly saucy and it will thicken perfectly on the plate."
        }
      },
      {
        "step": 6,
        "instruction": "Sprinkle pepper and coriander, and serve hot straight from the pan."
      }
    ],
    "notes": [
      "For extra protein, crack an egg into the boiling water before adding the noodles and stir gently.",
      "Want a soupy Maggi? Use 3 cups water instead of 2.5."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 7,
      "carbs": 42,
      "fat": 15
    }
  },
  "macaroni (masala macaroni)": {
    "dishName": "Macaroni (Masala Macaroni)",
    "description": "Street-style masala macaroni tossed with veggies, tomato and Indian spices.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Macaroni",
        "englishName": "elbow macaroni"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, finely chopped"
      },
      {
        "amount": "1/2",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, finely chopped"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Gajar",
        "englishName": "carrot, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tomato Ketchup",
        "englishName": "tomato ketchup"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel ya Makhan",
        "englishName": "oil or butter"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil 5 cups of water with 1 tablespoon salt. Add the macaroni and cook for 7 to 8 minutes until soft but not mushy. Drain and rinse under cold water."
      },
      {
        "step": 2,
        "instruction": "Heat oil or butter in a kadai. Add the onion and green chilli and cook for 2 to 3 minutes until soft."
      },
      {
        "step": 3,
        "instruction": "Add the carrot and capsicum and cook for 3 minutes so they stay slightly crunchy."
      },
      {
        "step": 4,
        "instruction": "Add the tomato, red chilli powder and salt. Cook for 3 to 4 minutes until the tomato turns mushy."
      },
      {
        "step": 5,
        "instruction": "Stir in the ketchup, garam masala and chaat masala."
      },
      {
        "step": 6,
        "instruction": "Add the boiled macaroni and toss on medium heat for 2 to 3 minutes until every piece is coated in the masala.",
        "tip": {
          "title": "Stops sticking",
          "content": "Rinsing the boiled macaroni in cold water and adding a little oil keeps it from clumping together."
        }
      },
      {
        "step": 7,
        "instruction": "Garnish with coriander and serve hot."
      }
    ],
    "notes": [
      "Add a handful of grated cheese at the end and cover for a minute for a cheesy version.",
      "Sweet corn and boiled peas are also great additions."
    ],
    "nutrition": {
      "calories": 400,
      "protein": 12,
      "carbs": 59,
      "fat": 13
    }
  },
  "cake (simple eggless vanilla cake)": {
    "dishName": "Cake (Simple Eggless Vanilla Cake)",
    "description": "A soft, fluffy eggless vanilla sponge made with curd and basic pantry ingredients.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Cheeni",
        "englishName": "powdered sugar"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Dahi",
        "englishName": "thick curd / yogurt"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Tel",
        "englishName": "neutral cooking oil"
      },
      {
        "amount": "1 tsp",
        "commonName": "Baking Powder",
        "englishName": "baking powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "1 tsp",
        "commonName": "Vanilla Essence",
        "englishName": "vanilla essence"
      },
      {
        "amount": "3 to 4 tbsp",
        "commonName": "Doodh",
        "englishName": "milk, to adjust the batter"
      },
      {
        "amount": "1 pinch",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Preheat the oven to 180°C (350°F) for 10 minutes. Grease the tin with a little oil and dust it with flour."
      },
      {
        "step": 2,
        "instruction": "In a bowl, whisk the curd and sugar until the sugar dissolves and the mixture looks smooth."
      },
      {
        "step": 3,
        "instruction": "Add the oil and vanilla and whisk well."
      },
      {
        "step": 4,
        "instruction": "Sieve the maida, baking powder, baking soda and salt directly into the bowl."
      },
      {
        "step": 5,
        "instruction": "Fold gently with a spatula in one direction until no dry flour is left. Add milk one spoon at a time until the batter falls off the spoon in a thick ribbon. Don't over-mix.",
        "tip": {
          "title": "Gentle mixing",
          "content": "Over-mixing makes the cake dense and chewy. Mix only until the flour disappears."
        }
      },
      {
        "step": 6,
        "instruction": "Pour the batter into the tin and tap it once or twice on the counter to remove air bubbles."
      },
      {
        "step": 7,
        "instruction": "Bake for 30 to 35 minutes. To check, insert a toothpick or knife into the centre. If it comes out clean, the cake is done."
      },
      {
        "step": 8,
        "instruction": "Let the cake cool in the tin for 10 minutes, then turn it out onto a plate and let it cool fully before cutting."
      }
    ],
    "notes": [
      "Don't open the oven in the first 20 minutes, or the cake may sink in the middle.",
      "Add 1/2 cup chopped nuts or tutti frutti to the batter for a fun variation.",
      "If using the pot method, bake on the lowest flame for 35 to 45 minutes and check with a toothpick.",
      "Let the cake cool in the pan for 10 minutes, then cool completely on a rack before slicing or frosting."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 5,
      "carbs": 32,
      "fat": 10
    }
  },
  "pakode (pakora)": {
    "dishName": "Pakode (Pakora)",
    "description": "Crispy, golden onion and potato fritters made with gram flour and spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 large",
        "commonName": "Pyaaz",
        "englishName": "onions, thinly sliced"
      },
      {
        "amount": "1 medium",
        "commonName": "Aloo",
        "englishName": "potato, thinly sliced (optional)"
      },
      {
        "amount": "1 cup",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Chawal Ka Atta",
        "englishName": "rice flour, for extra crunch"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "cooking oil, for deep frying"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "In a bowl, mix the sliced onion, potato and 1/2 teaspoon salt. Rub with your hands and leave for 10 minutes. The vegetables will release water.",
        "tip": {
          "title": "Little or no water",
          "content": "The water from the salted onions is usually enough to make the batter. Too much added water makes soggy pakode."
        }
      },
      {
        "step": 2,
        "instruction": "Add the besan, rice flour, green chilli, ajwain, red chilli powder, turmeric and coriander to the bowl."
      },
      {
        "step": 3,
        "instruction": "Mix well. Add water 1 tablespoon at a time, only if needed, until the batter is thick and just coats the vegetables."
      },
      {
        "step": 4,
        "instruction": "Heat oil in a kadai on medium heat. To test it, drop a small bit of batter in. It should rise to the top in a few seconds."
      },
      {
        "step": 5,
        "instruction": "Drop small spoonfuls of batter into the oil, without crowding the pan. Fry for 4 to 5 minutes, turning occasionally, until deep golden and crisp."
      },
      {
        "step": 6,
        "instruction": "Drain on paper towels and repeat with the rest."
      },
      {
        "step": 7,
        "instruction": "Serve hot with green chutney, tomato ketchup and a cup of chai."
      }
    ],
    "notes": [
      "Fry on medium heat. Too-hot oil browns the outside and leaves the inside raw.",
      "Try palak, gobi or paneer slices in place of the potato.",
      "Reheat leftover pakode in a dry pan or oven to crisp them up again.",
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 8,
      "carbs": 28,
      "fat": 15
    }
  },
  "chai (masala chai)": {
    "dishName": "Chai (Masala Chai)",
    "description": "Strong, milky Indian tea simmered with ginger and cardamom.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1 cup",
        "commonName": "Doodh",
        "englishName": "milk"
      },
      {
        "amount": "2 tsp",
        "commonName": "Chai Patti",
        "englishName": "loose black tea leaves"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, adjust to taste"
      },
      {
        "amount": "1/2 inch",
        "commonName": "Adrak",
        "englishName": "ginger, crushed"
      },
      {
        "amount": "1",
        "commonName": "Elaichi",
        "englishName": "green cardamom pod, crushed"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Bring the water to a boil in a saucepan. Add the crushed ginger and cardamom and let them boil for 1 to 2 minutes."
      },
      {
        "step": 2,
        "instruction": "Add the tea leaves and boil for 1 minute until the water turns a deep amber."
      },
      {
        "step": 3,
        "instruction": "Add the sugar and milk and stir."
      },
      {
        "step": 4,
        "instruction": "Let it come to a boil. When the chai rises to the rim, lower the heat for a few seconds, then let it rise again. Repeat once more, about 2 to 3 minutes total.",
        "tip": {
          "title": "The 2-3 boil rule",
          "content": "Letting the chai rise a couple of times gives it a rich colour and stronger flavour. Don't leave it unattended, because milk boils over quickly."
        }
      },
      {
        "step": 5,
        "instruction": "Strain into cups and serve hot."
      }
    ],
    "notes": [
      "Like it stronger? Add an extra 1/2 teaspoon of tea leaves. Like it milkier? Use 1/2 cup water and 1.5 cups milk.",
      "In winter, add a pinch of black pepper or a small piece of cinnamon for a warming chai."
    ],
    "nutrition": {
      "calories": 90,
      "protein": 3,
      "carbs": 13,
      "fat": 3
    }
  },
  "kadai paneer": {
    "dishName": "Kadai Paneer",
    "description": "Paneer and capsicum tossed with freshly ground kadai masala, onion and tomato.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "200 g",
        "commonName": "Paneer",
        "englishName": "paneer, cubed"
      },
      {
        "amount": "1 large",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, cubed"
      },
      {
        "amount": "1 large",
        "commonName": "Pyaaz",
        "englishName": "onion, cubed and layers separated"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Dhaniya (sabut)",
        "englishName": "whole coriander seeds"
      },
      {
        "amount": "3",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chillies"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 inch",
        "commonName": "Adrak (julienne)",
        "englishName": "ginger, sliced thin, for garnish"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dry roast the whole coriander seeds and dried red chillies in the kadai on low heat for 1 to 2 minutes, until you smell them toasting. Take them out and let them cool."
      },
      {
        "step": 2,
        "instruction": "Coarsely crush the roasted coriander and chillies in a grinder - just a few pulses, you want a coarse texture, not a fine powder. This is your kadai masala.",
        "tip": {
          "title": "The whole point of the dish",
          "content": "Coarse, freshly ground kadai masala is what makes this dish taste completely different from any other paneer curry. Don't use fine ready-made powder here."
        }
      },
      {
        "step": 3,
        "instruction": "Heat oil in the kadai. Add the onion and capsicum and stir-fry on high heat for 2 to 3 minutes, so they stay a little crunchy. Take them out and set aside."
      },
      {
        "step": 4,
        "instruction": "In the same kadai, add the ginger-garlic paste and cook for 30 seconds until fragrant."
      },
      {
        "step": 5,
        "instruction": "Add the tomatoes and cook for 6 to 7 minutes, pressing them down, until soft and mushy."
      },
      {
        "step": 6,
        "instruction": "Add the crushed kadai masala, turmeric and salt. Mix well and cook for 2 minutes."
      },
      {
        "step": 7,
        "instruction": "Add the fried onion and capsicum back in, along with the paneer cubes. Toss gently on high heat for 2 to 3 minutes so everything is coated but the paneer stays soft."
      },
      {
        "step": 8,
        "instruction": "Sprinkle garam masala, top with the ginger juliennes and coriander leaves, and serve hot with roti or naan."
      }
    ],
    "notes": [
      "This is meant to be a semi-dry dish, not a gravy. If it looks too dry, splash in a couple tablespoons of water rather than making it a curry.",
      "Adding the capsicum and onion back in near the end keeps them crunchy, which is the real texture difference from a soft paneer gravy like palak paneer."
    ],
    "nutrition": {
      "calories": 390,
      "protein": 15,
      "carbs": 22,
      "fat": 27
    }
  },
  "tandoori chicken (oven-style)": {
    "dishName": "Tandoori Chicken",
    "description": "Tangy yogurt-marinated chicken roasted at home until browned and lightly charred.",
    "prepTime": "Approx. 50 minutes (plus 4+ hours marination)",
    "equipment": [
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "800 g",
        "commonName": "Chicken",
        "englishName": "chicken leg pieces, skin removed, slit deeply"
      },
      {
        "amount": "1",
        "commonName": "Nimbu",
        "englishName": "lemon, juiced"
      },
      {
        "amount": "1 cup",
        "commonName": "Dahi (gaadha)",
        "englishName": "thick yogurt, whisked"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Kashmiri Lal Mirch",
        "englishName": "Kashmiri red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera Powder",
        "englishName": "cumin powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds, crushed"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Sarson ya Tel",
        "englishName": "mustard oil or any cooking oil"
      },
      {
        "amount": "as needed",
        "commonName": "Makhan (pighla hua)",
        "englishName": "melted butter, for basting"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rub the chicken pieces with lemon juice and 1/2 tsp salt. Set aside for 15 minutes - this helps the deeper marinade stick and cuts any raw smell."
      },
      {
        "step": 2,
        "instruction": "In a large bowl, mix yogurt, ginger-garlic paste, chilli powder, garam masala, coriander powder, cumin powder, ajwain, oil and salt into a smooth marinade."
      },
      {
        "step": 3,
        "instruction": "Add the chicken to the marinade and massage it in well, pushing some into the slits you made. Cover and refrigerate for at least 4 hours, ideally overnight.",
        "tip": {
          "title": "Longer is better",
          "content": "The deep slits and long marination are what let the flavour actually reach the bone, not just sit on the surface."
        }
      },
      {
        "step": 4,
        "instruction": "Take the chicken out 20 minutes before cooking so it isn't fridge-cold. Preheat the oven to 220°C (425°F)."
      },
      {
        "step": 5,
        "instruction": "Arrange the pieces on a wire rack over a tray (or directly on a greased tray) and roast for 25 to 30 minutes, turning once halfway through."
      },
      {
        "step": 6,
        "instruction": "Switch the oven to grill/broil mode for the last 3 to 5 minutes to get charred spots on top. Watch closely so it doesn't burn."
      },
      {
        "step": 7,
        "instruction": "Optional: skip the charcoal smoke. The oven-cooked chicken is ready to serve as is."
      },
      {
        "step": 8,
        "instruction": "Brush generously with melted butter, squeeze over some fresh lemon and serve hot with mint chutney and sliced onions."
      }
    ],
    "notes": [
      "No wire rack? Just flip the pieces once or twice during roasting so both sides colour evenly.",
      "The char on top is from high heat, not from burning - keep an eye on it in the last few minutes under the grill.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 45,
      "carbs": 9,
      "fat": 16
    }
  },
  "veg biryani": {
    "dishName": "Veg Biryani",
    "description": "Fragrant basmati rice layered with a spiced mixed-vegetable masala and slow-cooked on dum.",
    "prepTime": "Approx. 1 hour",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice, soaked 30 minutes"
      },
      {
        "amount": "2 cups",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, beans, cauliflower, peas, chopped"
      },
      {
        "amount": "1",
        "commonName": "Aloo",
        "englishName": "potato, cubed"
      },
      {
        "amount": "2 large",
        "commonName": "Pyaaz (talaa hua)",
        "englishName": "onions, thinly sliced and fried golden"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt, whisked"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Biryani Masala",
        "englishName": "biryani masala powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 inch, 3, 4, 1",
        "commonName": "Dalchini, Elaichi, Laung, Tej Patta",
        "englishName": "cinnamon, cardamom, cloves, bay leaf"
      },
      {
        "amount": "a small handful",
        "commonName": "Pudina aur Hara Dhaniya",
        "englishName": "mint and coriander leaves, chopped"
      },
      {
        "amount": "a few strands in 2 tbsp warm milk",
        "commonName": "Kesar Doodh",
        "englishName": "saffron soaked in warm milk"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil water with the whole spices and salt. Add soaked rice and cook until about 70% done, with the centre still slightly firm."
      },
      {
        "step": 2,
        "instruction": "Drain the rice immediately and spread it on a plate so it doesn't keep cooking."
      },
      {
        "step": 3,
        "instruction": "Heat ghee in the kadai. Add the ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 4,
        "instruction": "Add the potato and mixed vegetables and stir-fry for 4 to 5 minutes."
      },
      {
        "step": 5,
        "instruction": "Add red chilli powder, biryani masala and salt. Mix well."
      },
      {
        "step": 6,
        "instruction": "Turn the heat to low and stir in the whisked yogurt, mixing constantly for a minute so it doesn't split. Cover and cook for 8 to 10 minutes until the vegetables are just tender."
      },
      {
        "step": 7,
        "instruction": "Spread this vegetable masala evenly across the bottom of the kadai."
      },
      {
        "step": 8,
        "instruction": "Layer the partially cooked rice evenly on top. Scatter the fried onions, mint, coriander and saffron milk over the rice."
      },
      {
        "step": 9,
        "instruction": "Cover the kadai with a tight lid (seal the edges with dough or a damp cloth if it doesn't fit snugly) and cook on the lowest possible heat for 20 minutes.",
        "tip": {
          "title": "Low and slow",
          "content": "This gentle steaming, called dum, is what finishes cooking the rice and lets all the layered flavours mix through evenly. Don't rush it with high heat."
        }
      },
      {
        "step": 10,
        "instruction": "Turn off the heat and let it rest, covered, for 10 minutes. Gently fluff the layers together and serve hot with raita."
      }
    ],
    "notes": [
      "Cut all the vegetables roughly the same size so they cook evenly.",
      "A tawa placed under the kadai during the dum step helps stop the bottom layer from catching."
    ],
    "nutrition": {
      "calories": 400,
      "protein": 9,
      "carbs": 62,
      "fat": 13
    }
  },
  "vada pav": {
    "dishName": "Vada Pav",
    "description": "Spiced potato fritter tucked into a soft pav with chutneys.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and mashed"
      },
      {
        "amount": "1 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun-Hari Mirch Paste",
        "englishName": "ginger, garlic and green chilli, crushed together"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 cup",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "8",
        "commonName": "Pav",
        "englishName": "pav buns"
      },
      {
        "amount": "10 cloves",
        "commonName": "Lehsun",
        "englishName": "garlic, for dry chutney"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Sukha Nariyal",
        "englishName": "dry desiccated coconut, for dry chutney"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder, for dry chutney"
      },
      {
        "amount": "as needed",
        "commonName": "Hari Chutney",
        "englishName": "green coriander-mint chutney, to serve"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "cooking oil, for deep frying and toasting"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dry roast garlic and coconut until light golden. Cool, then grind coarsely with chilli powder and salt."
      },
      {
        "step": 2,
        "instruction": "Heat 1 tablespoon oil in the kadai. Add mustard seeds and let them pop, then add curry leaves and the ginger-garlic-chilli paste. Cook for 30 seconds."
      },
      {
        "step": 3,
        "instruction": "Add turmeric and the mashed potato, along with salt. Mix everything together well and cook for 2 minutes. Let it cool slightly."
      },
      {
        "step": 4,
        "instruction": "Shape the potato mixture into round balls, about the size of a small lemon."
      },
      {
        "step": 5,
        "instruction": "Make the batter by whisking besan, baking soda, a pinch of salt and enough water into a smooth, medium-thick batter, like pancake batter."
      },
      {
        "step": 6,
        "instruction": "Heat oil in the kadai for deep frying. Dip each potato ball in the batter, coating it fully, and slide it gently into the hot oil.",
        "tip": {
          "title": "Test the oil first",
          "content": "Drop a bit of batter in - it should rise to the top steadily, not instantly. Too-hot oil browns the vada before the inside heats through."
        }
      },
      {
        "step": 7,
        "instruction": "Fry in batches for 4 to 5 minutes, turning occasionally, until deep golden and crisp all over. Drain on paper towels."
      },
      {
        "step": 8,
        "instruction": "Slit each pav and toast it lightly on the tawa with a little oil or butter until warm."
      },
      {
        "step": 9,
        "instruction": "Spread chutneys on the pav, place the hot vada inside and press gently. Serve immediately. Add fried green chilli if you like."
      }
    ],
    "notes": [
      "The batter should coat the back of a spoon and drip off slowly. Too thin and it won't stick; too thick and it turns doughy.",
      "Vada pav is best eaten fresh and hot, right after frying."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 9,
      "carbs": 44,
      "fat": 10
    }
  },
  "rasam": {
    "dishName": "Rasam",
    "description": "Thin, tangy South Indian tomato-lentil soup with pepper and a fragrant tadka.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/4 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Imli",
        "englishName": "tamarind pulp, or a small lemon-sized ball soaked in warm water"
      },
      {
        "amount": "2 tsp",
        "commonName": "Rasam Powder",
        "englishName": "rasam powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kali Mirch (kuti hui)",
        "englishName": "black pepper, crushed"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera (kuta hua)",
        "englishName": "cumin seeds, crushed"
      },
      {
        "amount": "1 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "2",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chillies"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "a handful",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the toor dal and pressure cook it with turmeric and 1.5 cups water for 4 to 5 whistles, until completely soft. Mash it smooth with a spoon or whisk."
      },
      {
        "step": 2,
        "instruction": "In a kadai, add the mashed dal, chopped tomatoes, tamarind pulp, rasam powder and salt, along with 2 cups water. Mix well."
      },
      {
        "step": 3,
        "instruction": "Bring it to a gentle boil and simmer for 8 to 10 minutes until the tomatoes soften and the raw tamarind smell is gone."
      },
      {
        "step": 4,
        "instruction": "Add the crushed pepper and cumin. Let it simmer for 2 more minutes, but don't let it boil hard once this is added.",
        "tip": {
          "title": "Never let rasam boil hard",
          "content": "A gentle simmer keeps rasam light and fragrant. A rolling boil cooks off the very aroma that makes it special."
        }
      },
      {
        "step": 5,
        "instruction": "For the tadka, heat ghee in a small pan. Add mustard seeds and let them pop."
      },
      {
        "step": 6,
        "instruction": "Add the dried red chillies, curry leaves and a pinch of hing. Sizzle for 10 seconds and pour the tadka over the rasam."
      },
      {
        "step": 7,
        "instruction": "Garnish with coriander leaves. Turn off the heat as soon as it starts to froth up at the edges - that's your sign it's ready."
      },
      {
        "step": 8,
        "instruction": "Serve hot, either as a soup on its own or poured over steamed rice."
      }
    ],
    "notes": [
      "Rasam should be thin and soupy, not thick like sambar. Add more water if it looks too concentrated.",
      "A ripe, slightly squashed tomato added whole while simmering, then mashed in, gives extra body and flavour."
    ],
    "nutrition": {
      "calories": 100,
      "protein": 3,
      "carbs": 15,
      "fat": 3
    }
  },
  "khichdi (moong dal khichdi)": {
    "dishName": "Khichdi",
    "description": "Soft, comforting rice and moong dal cooked together with mild spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/2 cup",
        "commonName": "Chawal",
        "englishName": "rice, rinsed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Peeli Moong Dal",
        "englishName": "split yellow moong dal, rinsed"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, beans, peas, chopped (optional)"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, slit"
      },
      {
        "amount": "1 inch",
        "commonName": "Adrak",
        "englishName": "ginger, finely chopped"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "4 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the rice and dal together until the water runs mostly clear. Soak them in water for 10 minutes, then drain."
      },
      {
        "step": 2,
        "instruction": "Heat 1 tablespoon ghee in the kadai. Add cumin seeds, bay leaf and a pinch of hing and let them sizzle for 10 seconds."
      },
      {
        "step": 3,
        "instruction": "Add the ginger and green chilli and cook for 30 seconds. If using vegetables, add them now and stir-fry for 2 minutes."
      },
      {
        "step": 4,
        "instruction": "Transfer this tempering to the pressure cooker. Add the drained rice and dal, turmeric and salt."
      },
      {
        "step": 5,
        "instruction": "Add the water and mix once. Close the lid and cook for 3 to 4 whistles on medium heat.",
        "tip": {
          "title": "Softer is the goal",
          "content": "Khichdi should be soft and slightly mushy, almost like a thick porridge, not separate grains like plain rice. If in doubt, add a little more water."
        }
      },
      {
        "step": 6,
        "instruction": "Let the pressure release on its own. Open the lid and give it a good stir - it should fall off the spoon easily. Add a splash of hot water if it looks too thick."
      },
      {
        "step": 7,
        "instruction": "Spoon the remaining ghee on top and serve hot, with a side of yogurt, papad or pickle."
      }
    ],
    "notes": [
      "For a version that's easy on the stomach when unwell, skip the vegetables and tempering and just simmer rice, dal, turmeric and salt together.",
      "Leftover khichdi thickens as it cools - loosen it with a little hot water or milk when reheating."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 10,
      "carbs": 45,
      "fat": 9
    }
  },
  "lassi (sweet lassi)": {
    "dishName": "Sweet Lassi",
    "description": "Thick, chilled, sweetened yogurt drink blended till frothy.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Dahi (gaadha, thanda)",
        "englishName": "thick, chilled yogurt"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Thanda Doodh",
        "englishName": "chilled milk"
      },
      {
        "amount": "4 tbsp",
        "commonName": "Cheeni",
        "englishName": "sugar, adjust to taste"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Elaichi Powder",
        "englishName": "cardamom powder"
      },
      {
        "amount": "a few ice cubes",
        "commonName": "Barf",
        "englishName": "ice cubes"
      },
      {
        "amount": "a pinch",
        "commonName": "Kesar",
        "englishName": "saffron strands, for garnish (optional)"
      },
      {
        "amount": "1 tsp",
        "commonName": "Malai",
        "englishName": "fresh cream, for topping (optional)"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Whisk the yogurt in a bowl first for about a minute until it looks smooth and lump-free. This makes blending much easier."
      },
      {
        "step": 2,
        "instruction": "Add the whisked yogurt, milk, sugar, cardamom powder and ice cubes to the grinder."
      },
      {
        "step": 3,
        "instruction": "Blend on high for 30 to 45 seconds until completely smooth and frothy on top.",
        "tip": {
          "title": "Getting that froth",
          "content": "Blending with ice cubes already in the jar, rather than adding them after, is what gives lassi its light, frothy top layer."
        }
      },
      {
        "step": 4,
        "instruction": "Taste and add a little more sugar if needed, then blend for 5 more seconds to mix it in."
      },
      {
        "step": 5,
        "instruction": "Pour into tall glasses. Top with a few saffron strands and a small spoon of fresh cream if using, and serve immediately."
      }
    ],
    "notes": [
      "Use thick, full-fat yogurt - thin or watery yogurt makes a runny lassi no matter how much you blend it.",
      "For mango lassi, blend in 1 cup of chopped ripe mango and reduce the sugar to taste."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 8,
      "carbs": 29,
      "fat": 8
    }
  },
  "roti (chapati)": {
    "dishName": "Roti (Chapati)",
    "description": "Soft everyday whole-wheat flatbread cooked on a hot tawa and puffed over flame.",
    "prepTime": "Approx. 30 minutes (plus 15 minutes resting)",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Gehu ka Atta",
        "englishName": "whole wheat flour"
      },
      {
        "amount": "3/4 to 1 cup",
        "commonName": "Paani",
        "englishName": "water, as needed"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt, optional"
      },
      {
        "amount": "1 tsp",
        "commonName": "Ghee",
        "englishName": "ghee, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Add whole wheat flour and salt to a bowl. Add water little by little and bring it together into a soft dough."
      },
      {
        "step": 2,
        "instruction": "Knead the dough for 5 to 7 minutes until smooth and soft. Cover and let it rest for 15 minutes."
      },
      {
        "step": 3,
        "instruction": "Divide the dough into small balls. Dust one with flour and roll it into a thin circle, about 6 inches wide."
      },
      {
        "step": 4,
        "instruction": "Heat the tawa on medium-high heat. Place the rolled roti on it and cook until small bubbles appear."
      },
      {
        "step": 5,
        "instruction": "Flip the roti and cook the other side until light brown spots appear.",
        "tip": {
          "title": "Keep the tawa hot",
          "content": "A properly heated tawa helps the roti cook quickly and puff instead of turning dry."
        }
      },
      {
        "step": 6,
        "instruction": "Move the roti directly onto the stove flame for a few seconds, flipping once, until it puffs. Skip this step if your stove does not support direct flame cooking."
      },
      {
        "step": 7,
        "instruction": "Brush with a little ghee if using and serve hot."
      }
    ],
    "notes": [
      "Use slightly warm water for a softer dough.",
      "Keep the dough covered while rolling so it does not dry out."
    ],
    "nutrition": {
      "calories": 120,
      "protein": 3,
      "carbs": 25,
      "fat": 1
    }
  },
  "sambar chawal": {
    "dishName": "Sambar Chawal",
    "description": "A comforting one-pot South Indian rice dish cooked with toor dal, vegetables, tamarind.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/2 cup",
        "commonName": "Chawal",
        "englishName": "rice, rinsed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas, rinsed"
      },
      {
        "amount": "1 cup",
        "commonName": "Mixed Sabzi",
        "englishName": "carrot, beans and potato, chopped"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Sambar Masala",
        "englishName": "sambar powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Imli Pulp",
        "englishName": "tamarind pulp"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "3.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, slit"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Add rice, dal, turmeric and 3 cups water to the cooker. Cook for 3 to 4 whistles, then let the pressure release naturally."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Add mustard seeds, cumin seeds, hing and curry leaves. Let them sizzle for a few seconds."
      },
      {
        "step": 3,
        "instruction": "Add onion and green chilli and cook until the onion softens. Add tomato and cook until mushy."
      },
      {
        "step": 4,
        "instruction": "Add the chopped vegetables, sambar powder and salt. Add 1/2 cup water, cover and cook until the vegetables are nearly tender."
      },
      {
        "step": 5,
        "instruction": "Add the cooked rice and dal mixture. Stir in tamarind pulp and mix gently. Simmer for 5 to 7 minutes, adding a splash of water if needed.",
        "tip": {
          "title": "Keep it soft",
          "content": "Sambar chawal should be soft and spoonable, not dry. Add a little hot water if it thickens too much."
        }
      },
      {
        "step": 6,
        "instruction": "Taste and adjust salt or tamarind if needed. Garnish with coriander and serve hot."
      }
    ],
    "notes": [
      "You can use any quick-cooking vegetables you already have, such as bottle gourd, pumpkin or peas.",
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 370,
      "protein": 8,
      "carbs": 62,
      "fat": 10
    }
  },
  "pani puri (golgappe)": {
    "dishName": "Pani Puri (Golgappe)",
    "description": "Crispy puris filled with spiced potato, tangy tamarind water and mint water, prepared.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "24",
        "commonName": "Puri",
        "englishName": "ready-made pani puri shells"
      },
      {
        "amount": "2 medium",
        "commonName": "Aloo",
        "englishName": "boiled potatoes, mashed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Kala Chana",
        "englishName": "boiled black chickpeas"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Imli Pulp",
        "englishName": "tamarind pulp"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Pudina",
        "englishName": "fresh mint leaves"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dhaniya",
        "englishName": "fresh coriander leaves"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1 tsp",
        "commonName": "Bhuna Jeera",
        "englishName": "roasted cumin powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kali Namak",
        "englishName": "black salt"
      },
      {
        "amount": "2 cups",
        "commonName": "Paani",
        "englishName": "cold water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Add mint, coriander, green chilli, roasted cumin powder, black salt and 1/2 cup water to the grinder. Blend until smooth."
      },
      {
        "step": 2,
        "instruction": "Pour the green mixture into a bowl. Add the tamarind pulp and 1.5 cups cold water. Mix and adjust salt to taste."
      },
      {
        "step": 3,
        "instruction": "Mix the mashed potato and boiled black chickpeas with a pinch of chaat masala and salt."
      },
      {
        "step": 4,
        "instruction": "Crack a small opening in each puri and fill it with the potato-chickpea mixture.",
        "tip": {
          "title": "Make them just before eating",
          "content": "Fill the puris right before serving so they stay crisp instead of becoming soggy."
        }
      },
      {
        "step": 5,
        "instruction": "Dip or spoon the chilled pani into each puri and serve immediately."
      }
    ],
    "notes": [
      "Use ready-made puris for an easy home version. There is no need to deep-fry anything for this recipe.",
      "Chill the pani for 20 to 30 minutes for a better street-style result."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 7,
      "carbs": 40,
      "fat": 7
    }
  },
  "rasmalai": {
    "dishName": "Rasmalai",
    "description": "Soft milk dumplings soaked in sweet, cardamom-scented milk, finished with saffron and nuts.",
    "prepTime": "Approx. 45 minutes (plus 1 hour chilling)",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "8",
        "commonName": "Rasmalai Pieces",
        "englishName": "ready-made rasgulla pieces"
      },
      {
        "amount": "750 ml",
        "commonName": "Doodh",
        "englishName": "full-fat milk"
      },
      {
        "amount": "1/3 cup",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Elaichi Powder",
        "englishName": "cardamom powder"
      },
      {
        "amount": "a few strands",
        "commonName": "Kesar",
        "englishName": "saffron, optional"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Badam aur Pista",
        "englishName": "chopped almonds and pistachios"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Gently squeeze each rasgulla between your palms to remove some of the syrup. Do not crush them."
      },
      {
        "step": 2,
        "instruction": "Pour the milk into a kadai and bring it to a gentle boil on the stove."
      },
      {
        "step": 3,
        "instruction": "Lower the heat and simmer the milk for 15 to 20 minutes, stirring often, until it reduces slightly."
      },
      {
        "step": 4,
        "instruction": "Add sugar, cardamom and saffron if using. Stir until the sugar dissolves."
      },
      {
        "step": 5,
        "instruction": "Add the squeezed rasgulla pieces and simmer gently for 3 to 4 minutes so they absorb the flavored milk.",
        "tip": {
          "title": "Don't boil hard",
          "content": "Keep the heat low after adding the rasgulla. A hard boil can make the pieces break or lose their soft texture."
        }
      },
      {
        "step": 6,
        "instruction": "Turn off the heat, add the chopped nuts and let the rasmalai cool. Chill for at least 1 hour before serving."
      }
    ],
    "notes": [
      "Using ready-made rasgulla makes this a very easy home version.",
      "The milk thickens more as it chills, so do not reduce it too aggressively on the stove."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 5,
      "carbs": 31,
      "fat": 4
    }
  },
  "mutton curry": {
    "dishName": "Mutton Curry",
    "description": "Tender mutton simmered in an onion-tomato gravy with everyday Indian spices.",
    "prepTime": "Approx. 1 hour 15 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Mutton",
        "englishName": "mutton curry-cut pieces"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in the cooker. Add cumin seeds and bay leaf and let them sizzle."
      },
      {
        "step": 2,
        "instruction": "Add onions and cook until deep golden. Add ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 3,
        "instruction": "Add tomatoes, turmeric, chilli powder, coriander powder and salt. Cook until the tomatoes are soft and the oil starts to separate."
      },
      {
        "step": 4,
        "instruction": "Lower the heat. Add yogurt a little at a time, stirring continuously so it does not split. Cook for 2 minutes."
      },
      {
        "step": 5,
        "instruction": "Add the mutton and cook on medium heat for 6 to 8 minutes, stirring so the pieces get coated in the masala."
      },
      {
        "step": 6,
        "instruction": "Add water, close the cooker and cook for 5 to 6 whistles on medium heat. Let the pressure release naturally."
      },
      {
        "step": 7,
        "instruction": "Open the cooker and simmer uncovered for 8 to 10 minutes until the gravy reaches the thickness you like. Stir in garam masala.",
        "tip": {
          "title": "Don't rush the final simmer",
          "content": "A few extra minutes uncovered helps the curry thicken and brings the masala together without needing extra ingredients."
        }
      },
      {
        "step": 8,
        "instruction": "Garnish with coriander and serve hot with roti, rice or naan."
      }
    ],
    "notes": [
      "Cooking time can vary with the size and cut of the mutton. Cook until the meat is tender before serving.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 450,
      "protein": 28,
      "carbs": 22,
      "fat": 28
    }
  },
  "medu vada": {
    "dishName": "Medu Vada",
    "description": "Crisp outside and soft inside South Indian lentil fritters made from urad dal,.",
    "prepTime": "Approx. 35 minutes (plus 4 hours soaking)",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Urad Dal",
        "englishName": "split black gram, soaked 4 hours"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak",
        "englishName": "ginger, finely chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "oil, for frying"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked urad dal well. Add it to the grinder with a small splash of water and grind to a smooth, thick batter."
      },
      {
        "step": 2,
        "instruction": "Transfer the batter to a bowl. Beat it vigorously with a spoon for 2 to 3 minutes to make it lighter."
      },
      {
        "step": 3,
        "instruction": "Mix in green chilli, ginger, cumin, curry leaves, coriander, hing and salt."
      },
      {
        "step": 4,
        "instruction": "Heat oil in a kadai on medium heat. Wet your hand, take a small portion of batter, make a hole in the centre and slide it carefully into the oil.",
        "tip": {
          "title": "Check the batter",
          "content": "A small bit of batter dropped into water should float. If it sinks, beat the batter a little longer before shaping the vada."
        }
      },
      {
        "step": 5,
        "instruction": "Fry a few vadas at a time until golden and crisp on both sides. Keep the heat around medium so the centre cooks through."
      },
      {
        "step": 6,
        "instruction": "Remove onto a plate. Serve hot with sambar or coconut chutney."
      }
    ],
    "notes": [
      "Do not add too much water while grinding. A thick batter is easier to shape and gives softer vadas.",
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 7,
      "carbs": 24,
      "fat": 6
    }
  },
  "tinda sabzi": {
    "dishName": "Tinda Sabzi",
    "description": "A simple everyday North Indian sabzi of tender tinda cooked with onion and.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Tinda",
        "englishName": "round gourd, peeled and chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds. Let them sizzle."
      },
      {
        "step": 2,
        "instruction": "Add onion and cook until soft. Add tomato and cook until mushy."
      },
      {
        "step": 3,
        "instruction": "Add turmeric, coriander powder, chilli powder and salt. Stir well."
      },
      {
        "step": 4,
        "instruction": "Add chopped tinda and mix until every piece is coated with the masala."
      },
      {
        "step": 5,
        "instruction": "Add 2 tablespoons water, cover and cook on low heat for 12 to 15 minutes, stirring once or twice, until the tinda is tender.",
        "tip": {
          "title": "Don't add too much water",
          "content": "Tinda releases water as it cooks. Start with just a little and add more only if the pan looks dry."
        }
      },
      {
        "step": 6,
        "instruction": "Sprinkle garam masala, mix gently and cook uncovered for 1 minute. Garnish with coriander and serve hot."
      }
    ],
    "notes": [
      "Choose small, firm tinda for a more tender sabzi."
    ],
    "nutrition": {
      "calories": 110,
      "protein": 2,
      "carbs": 14,
      "fat": 5
    }
  },
  "gajar matar": {
    "dishName": "Gajar Matar",
    "description": "A simple winter sabzi of sweet carrots and green peas cooked with cumin.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 medium",
        "commonName": "Gajar",
        "englishName": "carrots, peeled and chopped"
      },
      {
        "amount": "1 cup",
        "commonName": "Matar",
        "englishName": "green peas"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds. Let them sizzle."
      },
      {
        "step": 2,
        "instruction": "Add onion and cook until soft. Add tomato and cook until mushy."
      },
      {
        "step": 3,
        "instruction": "Add turmeric, coriander powder, chilli powder and salt. Mix well."
      },
      {
        "step": 4,
        "instruction": "Add carrots and peas and stir until coated with the masala."
      },
      {
        "step": 5,
        "instruction": "Add water, cover and cook on low-medium heat for 10 to 12 minutes until the carrots are tender but still hold their shape.",
        "tip": {
          "title": "Keep the carrots firm",
          "content": "Stop cooking once the carrots are tender. Overcooking turns the sabzi soft and watery."
        }
      },
      {
        "step": 6,
        "instruction": "Add garam masala, cook uncovered for 1 minute and garnish with coriander."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 140,
      "protein": 6,
      "carbs": 16,
      "fat": 6
    }
  },
  "kadai chicken": {
    "dishName": "Kadai Chicken",
    "description": "A spicy, smoky-style chicken curry made at home with onions, tomatoes, capsicum and.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken",
        "englishName": "boneless or curry-cut chicken"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, sliced"
      },
      {
        "amount": "3 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, sliced"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Dhaniya",
        "englishName": "coriander seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "3",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chillies"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dry roast coriander seeds, cumin seeds and dried red chillies in the kadai for 1 to 2 minutes until fragrant. Let them cool slightly."
      },
      {
        "step": 2,
        "instruction": "Crush the roasted spices in the grinder into a coarse powder."
      },
      {
        "step": 3,
        "instruction": "Heat oil in the kadai. Add onion and cook until light golden. Add ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 4,
        "instruction": "Add tomatoes, turmeric, chilli powder and salt. Cook until the tomatoes soften and the oil starts to separate."
      },
      {
        "step": 5,
        "instruction": "Add the chicken and half of the crushed spice powder. Cook on medium-high heat for 7 to 8 minutes, stirring often."
      },
      {
        "step": 6,
        "instruction": "Add water and the remaining crushed spice powder. Cover and cook on low-medium heat for 12 to 15 minutes, until the chicken is fully cooked and tender.",
        "tip": {
          "title": "Keep the gravy thick",
          "content": "Chicken and tomatoes release moisture while cooking, so add more water only if the pan looks dry."
        }
      },
      {
        "step": 7,
        "instruction": "Add sliced capsicum and cook uncovered for 3 to 4 minutes so it stays slightly crisp. Garnish with coriander and serve hot."
      }
    ],
    "notes": [
      "The freshly roasted and crushed whole spices give the dish its characteristic kadai-style flavour.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 390,
      "protein": 38,
      "carbs": 10,
      "fat": 22
    }
  },
  "mutton biryani": {
    "dishName": "Mutton Biryani",
    "description": "Spiced mutton and fragrant basmati rice layered and cooked together on the stove.",
    "prepTime": "Approx. 1 hour 30 minutes (plus 30 minutes marination)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Mutton",
        "englishName": "mutton curry-cut pieces"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice, rinsed and soaked 20 minutes"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "2 medium",
        "commonName": "Pyaaz",
        "englishName": "onions, thinly sliced"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1 inch",
        "commonName": "Dalchini",
        "englishName": "cinnamon"
      },
      {
        "amount": "3",
        "commonName": "Laung",
        "englishName": "cloves"
      },
      {
        "amount": "2",
        "commonName": "Elaichi",
        "englishName": "cardamom pods"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2",
        "commonName": "Hari Mirch",
        "englishName": "green chillies, slit"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix the mutton with yogurt, half the ginger-garlic paste, chilli powder, turmeric and a little salt. Rest for 30 minutes."
      },
      {
        "step": 2,
        "instruction": "Heat oil or ghee in the cooker. Add bay leaf, cinnamon, cloves, cardamom and cumin seeds and let them sizzle."
      },
      {
        "step": 3,
        "instruction": "Add onions and cook until golden. Add the remaining ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 4,
        "instruction": "Add tomatoes, coriander powder and the remaining salt. Cook until the tomatoes are soft and the oil starts to separate."
      },
      {
        "step": 5,
        "instruction": "Add the marinated mutton and cook on medium-high heat for 6 to 8 minutes, stirring often."
      },
      {
        "step": 6,
        "instruction": "Add 1.5 cups water, close the cooker and cook for 5 to 6 whistles on medium heat. Let the pressure release naturally."
      },
      {
        "step": 7,
        "instruction": "Open the cooker and check that the mutton is tender. If needed, cook it for a few more minutes before adding the rice."
      },
      {
        "step": 8,
        "instruction": "Add the soaked, drained rice, remaining water, green chillies and garam masala. Mix gently and bring to a boil.",
        "tip": {
          "title": "Handle the rice gently",
          "content": "Once the rice goes in, stir only once or twice so the soaked basmati grains do not break."
        }
      },
      {
        "step": 9,
        "instruction": "Cover and cook on the lowest heat for 15 to 18 minutes until the rice is tender and the liquid is absorbed."
      },
      {
        "step": 10,
        "instruction": "Turn off the stove and rest covered for 10 minutes. Fluff gently, garnish with coriander and serve."
      }
    ],
    "notes": [
      "Use tender curry-cut mutton and make sure it is fully cooked before serving.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 650,
      "protein": 34,
      "carbs": 66,
      "fat": 28
    }
  },
  "uttapam": {
    "dishName": "Uttapam",
    "description": "Soft, thick South Indian savory pancakes topped with onion, tomato and green chilli,.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Dosa Batter",
        "englishName": "ready dosa batter"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "oil, for cooking"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix the chopped onion, tomato, green chilli and coriander in a bowl. Add a small pinch of salt."
      },
      {
        "step": 2,
        "instruction": "Heat the tawa on medium heat and lightly grease it with oil."
      },
      {
        "step": 3,
        "instruction": "Pour a ladle of dosa batter onto the centre and gently spread it into a thick round. Do not spread it as thin as a dosa."
      },
      {
        "step": 4,
        "instruction": "Scatter the onion-tomato topping over the surface and press it lightly into the batter."
      },
      {
        "step": 5,
        "instruction": "Drizzle a little oil around the edges and cook for 2 to 3 minutes until the base is golden and the top looks mostly set.",
        "tip": {
          "title": "Keep it thick",
          "content": "Uttapam should stay soft and fluffy. Spreading the batter too thin turns it into a dosa instead."
        }
      },
      {
        "step": 6,
        "instruction": "Flip carefully and cook the topping side for 1 to 2 minutes until lightly golden."
      },
      {
        "step": 7,
        "instruction": "Serve hot with coconut chutney or sambar."
      }
    ],
    "notes": [
      "A slightly thick, pourable dosa batter works best. If your batter is very thick, loosen it with a little water.",
      "Store-bought fermented batter is fine for a quicker version."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 6,
      "carbs": 38,
      "fat": 8
    }
  },
  "momos (veg momos)": {
    "dishName": "Momos (Veg Momos)",
    "description": "Soft steamed dumplings filled with finely chopped vegetables, made with simple wrappers and.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Patta Gobhi",
        "englishName": "cabbage, finely chopped"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Gajar",
        "englishName": "carrot, finely chopped"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Spring Onion",
        "englishName": "spring onion, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak",
        "englishName": "ginger, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lehsun",
        "englishName": "garlic, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Soy Sauce",
        "englishName": "soy sauce"
      },
      {
        "amount": "1 tsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Paani",
        "englishName": "water, as needed"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Kali Mirch",
        "englishName": "black pepper"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix maida with a pinch of salt. Add water little by little and knead into a smooth dough. Cover and rest for 20 minutes."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Add ginger and garlic, then cabbage, carrot and spring onion. Stir-fry on medium-high heat for 2 to 3 minutes."
      },
      {
        "step": 3,
        "instruction": "Add soy sauce, black pepper and a little salt. Cook for 1 minute, then turn off the stove and cool the filling completely."
      },
      {
        "step": 4,
        "instruction": "Divide the dough into small balls. Roll each one very thin, add a spoonful of filling and fold the edges over the filling to seal."
      },
      {
        "step": 5,
        "instruction": "Add 2 to 3 cups water to the cooker and use its steaming setup or rack. Place the momos above the water on a lightly greased plate."
      },
      {
        "step": 6,
        "instruction": "Cover and steam for 10 to 12 minutes until the wrappers look slightly translucent and are cooked through.",
        "tip": {
          "title": "Keep them above the water",
          "content": "The momos should steam, not sit in the boiling water. Keep the water level below the plate or steamer rack."
        }
      },
      {
        "step": 7,
        "instruction": "Carefully remove the momos and serve hot with your favorite chutney."
      }
    ],
    "notes": [
      "Keep the rolled wrappers covered with a damp cloth so they do not dry while shaping the remaining momos.",
      "You can add finely chopped paneer to the vegetable filling for a richer home-style version."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 8,
      "carbs": 31,
      "fat": 7
    }
  },
  "egg omelette": {
    "dishName": "Egg Omelette",
    "description": "A simple Indian-style omelette with eggs, onion, green chilli and coriander, ready in minutes.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2",
        "commonName": "Ande",
        "englishName": "eggs"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Crack the eggs into a bowl and beat them until smooth."
      },
      {
        "step": 2,
        "instruction": "Mix in onion, green chilli, coriander, red chilli powder and salt."
      },
      {
        "step": 3,
        "instruction": "Heat the tawa on medium heat and spread the oil."
      },
      {
        "step": 4,
        "instruction": "Pour in the egg mixture and spread it gently into an even layer."
      },
      {
        "step": 5,
        "instruction": "Cook for 1 to 2 minutes until the edges set, then loosen them with a spatula."
      },
      {
        "step": 6,
        "instruction": "Fold the omelette and cook for another 30 seconds. Serve hot."
      }
    ],
    "notes": [
      "Add chopped tomato or grated cheese for a different home-style omelette."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 13,
      "carbs": 5,
      "fat": 12
    }
  },
  "boiled eggs": {
    "dishName": "Boiled Eggs",
    "description": "Simple boiled eggs with a soft, medium or hard centre, made on the.",
    "prepTime": "Approx. 12 minutes",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4",
        "commonName": "Ande",
        "englishName": "eggs"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "optional",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Place the eggs in a pan and add enough water to cover them by about 2 cm."
      },
      {
        "step": 2,
        "instruction": "Bring the water to a full boil over medium-high heat."
      },
      {
        "step": 3,
        "instruction": "For hard-boiled eggs, boil for 9 to 10 minutes after the water starts boiling."
      },
      {
        "step": 4,
        "instruction": "Turn off the stove and place the eggs in cool water for 5 minutes."
      },
      {
        "step": 5,
        "instruction": "Tap the shells gently, peel the eggs and serve."
      }
    ],
    "notes": [
      "For softer yolks, reduce the boiling time by 2 to 3 minutes."
    ],
    "nutrition": {
      "calories": 155,
      "protein": 13,
      "carbs": 3,
      "fat": 10
    }
  },
  "veg sandwich": {
    "dishName": "Veg Sandwich",
    "description": "An easy Indian vegetable sandwich with chutney, cucumber, tomato, onion and lightly toasted bread.",
    "prepTime": "Approx. 15 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 slices",
        "commonName": "Bread",
        "englishName": "bread"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hari Chutney",
        "englishName": "green chutney"
      },
      {
        "amount": "1 small",
        "commonName": "Kheera",
        "englishName": "cucumber, thinly sliced"
      },
      {
        "amount": "1 small",
        "commonName": "Tamatar",
        "englishName": "tomato, thinly sliced"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, thinly sliced"
      },
      {
        "amount": "1 small",
        "commonName": "Aloo",
        "englishName": "boiled potato, sliced"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Spread green chutney on one side of each bread slice."
      },
      {
        "step": 2,
        "instruction": "Layer potato, cucumber, tomato and onion on two slices."
      },
      {
        "step": 3,
        "instruction": "Sprinkle chaat masala over the vegetables and close the sandwiches."
      },
      {
        "step": 4,
        "instruction": "Heat the tawa and melt a little butter."
      },
      {
        "step": 5,
        "instruction": "Toast the sandwiches on both sides until lightly crisp and golden."
      },
      {
        "step": 6,
        "instruction": "Cut and serve hot with chutney or ketchup."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 260,
      "protein": 7,
      "carbs": 38,
      "fat": 9
    }
  },
  "paneer sandwich": {
    "dishName": "Paneer Sandwich",
    "description": "A quick toasted sandwich filled with crumbled paneer, onion, capsicum and mild Indian spices.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 slices",
        "commonName": "Bread",
        "englishName": "bread"
      },
      {
        "amount": "150 g",
        "commonName": "Paneer",
        "englishName": "crumbled paneer"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1/2",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, finely chopped"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and cook onion and capsicum for 2 to 3 minutes."
      },
      {
        "step": 2,
        "instruction": "Add paneer, turmeric, red chilli powder, chaat masala and salt. Mix well."
      },
      {
        "step": 3,
        "instruction": "Cook for 2 minutes, then turn off the stove."
      },
      {
        "step": 4,
        "instruction": "Butter the bread slices and place the paneer filling between two slices."
      },
      {
        "step": 5,
        "instruction": "Toast the sandwiches on a hot tawa until crisp and golden on both sides."
      },
      {
        "step": 6,
        "instruction": "Cut and serve hot."
      }
    ],
    "notes": [
      "Add grated cheese if you want a richer sandwich."
    ],
    "nutrition": {
      "calories": 350,
      "protein": 13,
      "carbs": 30,
      "fat": 20
    }
  },
  "cheese sandwich": {
    "dishName": "Cheese Sandwich",
    "description": "A simple toasted sandwich filled with melted cheese, onion, capsicum and mild seasoning.",
    "prepTime": "Approx. 15 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 slices",
        "commonName": "Bread",
        "englishName": "bread"
      },
      {
        "amount": "100 g",
        "commonName": "Cheese",
        "englishName": "grated cheese"
      },
      {
        "amount": "1/2 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1/2",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, finely chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Hari Chutney",
        "englishName": "green chutney"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Oregano",
        "englishName": "dried oregano"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Chilli Flakes",
        "englishName": "red chilli flakes, optional"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix grated cheese, onion, capsicum, oregano, chilli flakes and a little salt in a bowl."
      },
      {
        "step": 2,
        "instruction": "Spread green chutney on one side of each bread slice."
      },
      {
        "step": 3,
        "instruction": "Place the cheese mixture between two slices to make two sandwiches."
      },
      {
        "step": 4,
        "instruction": "Heat the tawa on low to medium heat and melt a little butter."
      },
      {
        "step": 5,
        "instruction": "Toast the sandwiches on both sides until the bread is golden and the cheese melts.",
        "tip": {
          "title": "Melt the cheese evenly",
          "content": "Keep the heat low to medium so the bread browns without burning before the cheese melts."
        }
      },
      {
        "step": 6,
        "instruction": "Cut in half and serve hot."
      }
    ],
    "notes": [
      "Use any easily available melting cheese such as processed cheese, mozzarella or a cheese blend."
    ],
    "nutrition": {
      "calories": 390,
      "protein": 16,
      "carbs": 38,
      "fat": 20
    }
  },
  "besan chila": {
    "dishName": "Besan Chila",
    "description": "A quick savoury pancake made with gram flour, onion, green chilli and spices,.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix besan, turmeric, ajwain, salt, onion, chilli and coriander in a bowl."
      },
      {
        "step": 2,
        "instruction": "Add water little by little and make a smooth, medium-thick batter."
      },
      {
        "step": 3,
        "instruction": "Heat the tawa on medium heat and lightly grease it with oil."
      },
      {
        "step": 4,
        "instruction": "Pour a ladle of batter and spread it into a thin round chila."
      },
      {
        "step": 5,
        "instruction": "Cook until the top looks set and the bottom is golden."
      },
      {
        "step": 6,
        "instruction": "Flip, cook the other side for 1 to 2 minutes and serve hot."
      }
    ],
    "notes": [
      "Add grated carrot, tomato or spinach for extra vegetables."
    ],
    "nutrition": {
      "calories": 225,
      "protein": 7,
      "carbs": 29,
      "fat": 9
    }
  },
  "pongal (ven pongal)": {
    "dishName": "Pongal (Ven Pongal)",
    "description": "A soft South Indian rice and moong dal dish cooked with ginger, pepper,.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/2 cup",
        "commonName": "Chawal",
        "englishName": "rice"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Moong Dal",
        "englishName": "split yellow moong dal"
      },
      {
        "amount": "4 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kali Mirch",
        "englishName": "whole black peppercorns"
      },
      {
        "amount": "1 inch",
        "commonName": "Adrak",
        "englishName": "ginger, chopped"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse the rice and moong dal together until the water is mostly clear."
      },
      {
        "step": 2,
        "instruction": "Add rice, dal, water and salt to the cooker."
      },
      {
        "step": 3,
        "instruction": "Cook for 3 to 4 whistles until the rice and dal are very soft."
      },
      {
        "step": 4,
        "instruction": "Heat ghee in the cooker after opening it. Add cumin, pepper, ginger, curry leaves and hing."
      },
      {
        "step": 5,
        "instruction": "Cook for 30 seconds, then mix the tempering into the soft rice and dal."
      },
      {
        "step": 6,
        "instruction": "Add a little hot water if needed, mix until creamy and serve hot."
      }
    ],
    "notes": [
      "Pongal should be soft and moist, not dry. Add a little hot water before serving if it thickens."
    ],
    "nutrition": {
      "calories": 310,
      "protein": 10,
      "carbs": 47,
      "fat": 9
    }
  },
  "chole chawal": {
    "dishName": "Chole Chawal",
    "description": "Spiced Punjabi-style chickpeas served with fluffy basmati rice, made simply in one home kitchen.",
    "prepTime": "Approx. 50 minutes (plus overnight soaking)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Kabuli Chana",
        "englishName": "white chickpeas, soaked overnight"
      },
      {
        "amount": "1 cup",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2 tsp",
        "commonName": "Chole Masala",
        "englishName": "chole masala powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Pressure cook the soaked chickpeas with 2 cups water and a little salt for 5 to 6 whistles."
      },
      {
        "step": 2,
        "instruction": "Rinse the rice. Add it to a pot with 2 cups water and a little salt, then cook covered until fluffy."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai. Add cumin and let it sizzle."
      },
      {
        "step": 4,
        "instruction": "Add onion and cook until golden. Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 5,
        "instruction": "Add tomatoes, turmeric and chole masala. Cook until the tomatoes turn soft."
      },
      {
        "step": 6,
        "instruction": "Add the cooked chickpeas with some cooking water and simmer for 10 minutes."
      },
      {
        "step": 7,
        "instruction": "Taste for salt, turn off the stove and serve the chole with the cooked rice."
      }
    ],
    "notes": [
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 470,
      "protein": 14,
      "carbs": 74,
      "fat": 13
    }
  },
  "kadhi chawal": {
    "dishName": "Kadhi Chawal",
    "description": "A comforting North Indian yogurt and gram flour kadhi served with simple steamed rice.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1 cup",
        "commonName": "Chawal",
        "englishName": "rice"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Methi",
        "englishName": "fenugreek seeds"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chilli"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Whisk yogurt, besan, turmeric, salt and water until completely smooth."
      },
      {
        "step": 2,
        "instruction": "Pour the mixture into a kadai and cook on medium heat, stirring often."
      },
      {
        "step": 3,
        "instruction": "Let it come to a gentle simmer, then cook for 20 to 25 minutes until slightly thick."
      },
      {
        "step": 4,
        "instruction": "Cook the rice separately until soft and fluffy."
      },
      {
        "step": 5,
        "instruction": "For the tadka, heat oil and add mustard, cumin, fenugreek, hing, dried chilli and curry leaves."
      },
      {
        "step": 6,
        "instruction": "Sizzle for a few seconds and pour the tadka into the kadhi."
      },
      {
        "step": 7,
        "instruction": "Serve the hot kadhi over steamed rice."
      }
    ],
    "notes": [
      "Keep the kadhi simmering gently. Hard boiling can make the yogurt split."
    ],
    "nutrition": {
      "calories": 400,
      "protein": 8,
      "carbs": 70,
      "fat": 10
    }
  },
  "bread pakoda": {
    "dishName": "Bread Pakoda",
    "description": "Crispy bread slices coated in a simple besan batter and shallow or deep.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "6 slices",
        "commonName": "Bread",
        "englishName": "bread"
      },
      {
        "amount": "1 cup",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "cooking oil, for frying"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "optional",
        "commonName": "Aloo",
        "englishName": "boiled potato filling"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix besan, ajwain, chilli powder, turmeric and salt."
      },
      {
        "step": 2,
        "instruction": "Add water little by little to make a smooth batter that coats the bread."
      },
      {
        "step": 3,
        "instruction": "Spread the optional potato filling on bread and close with another slice."
      },
      {
        "step": 4,
        "instruction": "Heat oil in a kadai on medium heat."
      },
      {
        "step": 5,
        "instruction": "Dip each sandwich or bread slice in the batter and gently lower it into the hot oil."
      },
      {
        "step": 6,
        "instruction": "Fry until crisp and golden on both sides, then drain and serve hot."
      }
    ],
    "notes": [
      "For a lighter version, cook the battered bread on a lightly oiled tawa instead of deep frying.",
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 9,
      "carbs": 39,
      "fat": 12
    }
  },
  "kachori (moong dal kachori)": {
    "dishName": "Kachori (Moong Dal Kachori)",
    "description": "Crisp flaky kachori filled with a mildly spiced roasted moong dal mixture, made.",
    "prepTime": "Approx. 1 hour",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Moong Dal",
        "englishName": "yellow moong dal, soaked 1 hour"
      },
      {
        "amount": "1 tsp",
        "commonName": "Saunf",
        "englishName": "fennel seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya",
        "englishName": "coriander seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "4 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "cooking oil, for frying"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix maida, 3 tablespoons ghee and salt. Add water gradually and make a firm dough. Rest for 20 minutes."
      },
      {
        "step": 2,
        "instruction": "Drain the soaked dal and grind it coarsely in a grinder without making a smooth paste."
      },
      {
        "step": 3,
        "instruction": "Heat 1 tablespoon ghee in a kadai. Add cumin, fennel and coriander seeds."
      },
      {
        "step": 4,
        "instruction": "Add the ground dal, chilli powder and amchur. Cook until the mixture is dry and fragrant. Cool it."
      },
      {
        "step": 5,
        "instruction": "Divide the dough and filling into small portions. Flatten each dough ball, fill and seal."
      },
      {
        "step": 6,
        "instruction": "Gently flatten each kachori and keep the edges slightly thicker."
      },
      {
        "step": 7,
        "instruction": "Fry the kachoris in medium-hot oil on low to medium heat until puffed and golden."
      },
      {
        "step": 8,
        "instruction": "Drain well and serve warm."
      }
    ],
    "notes": [
      "Keep the oil at medium heat. Very hot oil can brown the outside before the kachori cooks through.",
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 7,
      "carbs": 41,
      "fat": 12
    }
  },
  "bhel puri": {
    "dishName": "Bhel Puri",
    "description": "A crunchy Mumbai-style snack made with puffed rice, vegetables, chutneys and sev, easy.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 cups",
        "commonName": "Murmura",
        "englishName": "puffed rice"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Sev",
        "englishName": "sev"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Tamatar",
        "englishName": "tomato, finely chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Aloo",
        "englishName": "boiled potato, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hari Chutney",
        "englishName": "green chutney"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Imli Chutney",
        "englishName": "tamarind chutney"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1",
        "commonName": "Nimbu",
        "englishName": "lemon"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dry roast the puffed rice in a kadai on low heat for 2 to 3 minutes so it stays crisp."
      },
      {
        "step": 2,
        "instruction": "Let it cool for a minute, then add onion, tomato and boiled potato."
      },
      {
        "step": 3,
        "instruction": "Add green chutney, tamarind chutney and chaat masala."
      },
      {
        "step": 4,
        "instruction": "Squeeze in lemon juice and toss everything quickly."
      },
      {
        "step": 5,
        "instruction": "Top with sev and serve immediately."
      }
    ],
    "notes": [
      "Mix the chutneys just before eating so the puffed rice stays crunchy."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 10,
      "carbs": 26,
      "fat": 12
    }
  },
  "paneer tikka": {
    "dishName": "Paneer Tikka",
    "description": "Easy home-style paneer tikka marinated in yogurt and spices, then cooked on a.",
    "prepTime": "Approx. 30 minutes (plus 20 minutes marination)",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "250 g",
        "commonName": "Paneer",
        "englishName": "paneer, cubed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "thick yogurt"
      },
      {
        "amount": "1/2",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, cubed"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, cubed"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix yogurt, chilli powder, turmeric, garam masala, coriander powder, lemon juice and salt."
      },
      {
        "step": 2,
        "instruction": "Add paneer, capsicum and onion. Mix gently and rest for 20 minutes."
      },
      {
        "step": 3,
        "instruction": "Heat the tawa and spread a little oil."
      },
      {
        "step": 4,
        "instruction": "Place the marinated paneer and vegetables on the hot tawa."
      },
      {
        "step": 5,
        "instruction": "Cook on medium-high heat, turning gently, until the paneer and vegetables get light char marks."
      },
      {
        "step": 6,
        "instruction": "Serve hot with lemon wedges or chutney."
      }
    ],
    "notes": [
      "Do not cook paneer for too long or it can become firm and chewy."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 6,
      "carbs": 33,
      "fat": 16
    }
  },
  "rasam rice": {
    "dishName": "Rasam Rice",
    "description": "Comforting steamed rice mixed with a thin, tangy tomato rasam and a simple.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Chawal",
        "englishName": "rice"
      },
      {
        "amount": "2",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kali Mirch",
        "englishName": "black pepper, crushed"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rasam Powder",
        "englishName": "rasam powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chilli"
      },
      {
        "amount": "1 tsp",
        "commonName": "Imli",
        "englishName": "tamarind pulp"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Cook the rice until soft and keep it warm."
      },
      {
        "step": 2,
        "instruction": "Crush the tomatoes and add them to a kadai with water, turmeric, rasam powder and salt."
      },
      {
        "step": 3,
        "instruction": "Simmer for 8 to 10 minutes until the tomatoes soften and the rasam smells fragrant."
      },
      {
        "step": 4,
        "instruction": "Add tamarind pulp, cumin and crushed pepper. Simmer for 2 more minutes."
      },
      {
        "step": 5,
        "instruction": "Heat ghee in a small kadai and add mustard, dried chilli and curry leaves."
      },
      {
        "step": 6,
        "instruction": "Pour the tadka into the rasam and turn off the stove."
      },
      {
        "step": 7,
        "instruction": "Mix hot rice with rasam and serve immediately."
      }
    ],
    "notes": [
      "Keep rasam thin and pourable. Add hot water if it gets too concentrated.",
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 10,
      "carbs": 26,
      "fat": 12
    }
  },
  "chicken kabab": {
    "dishName": "Chicken Kabab",
    "description": "Juicy home-style chicken kababs marinated in yogurt and spices, then cooked on a.",
    "prepTime": "Approx. 35 minutes (plus 30 minutes marination)",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken",
        "englishName": "boneless chicken, small pieces"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix yogurt, ginger-garlic paste, chilli powder, turmeric, garam masala, coriander, lemon and salt."
      },
      {
        "step": 2,
        "instruction": "Add chicken and coat well. Marinate for 30 minutes."
      },
      {
        "step": 3,
        "instruction": "Heat the tawa and spread a little oil."
      },
      {
        "step": 4,
        "instruction": "Place the chicken pieces on the hot tawa without crowding them."
      },
      {
        "step": 5,
        "instruction": "Cook on medium heat, turning every few minutes, until browned and fully cooked inside."
      },
      {
        "step": 6,
        "instruction": "Serve hot with lemon and onion."
      }
    ],
    "notes": [
      "Cut the chicken into similar sizes so all pieces cook evenly.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 12,
      "carbs": 36,
      "fat": 12
    }
  },
  "seekh kabab": {
    "dishName": "Seekh Kabab",
    "description": "Juicy spiced minced-meat seekh kababs made at home without a tandoor, shaped and.",
    "prepTime": "Approx. 40 minutes (plus 20 minutes resting)",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken Keema",
        "englishName": "chicken mince"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix chicken mince, onion, chilli, ginger-garlic paste, spices, coriander, lemon and salt."
      },
      {
        "step": 2,
        "instruction": "Mix firmly until the mixture becomes sticky, then rest it for 20 minutes."
      },
      {
        "step": 3,
        "instruction": "Wet your hands and shape the mixture into long, flat kababs."
      },
      {
        "step": 4,
        "instruction": "Heat a tawa and lightly oil it."
      },
      {
        "step": 5,
        "instruction": "Place the kababs on the hot tawa and cook on medium heat, turning gently."
      },
      {
        "step": 6,
        "instruction": "Cook until browned outside and fully cooked inside. Serve hot."
      }
    ],
    "notes": [
      "Keep the mixture cold and handle it gently so the kababs hold their shape.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 6,
      "carbs": 41,
      "fat": 8
    }
  },
  "mutton kabab": {
    "dishName": "Mutton Kabab",
    "description": "Simple home-style minced mutton kababs seasoned with ginger, chilli and warm spices, cooked.",
    "prepTime": "Approx. 45 minutes (plus 20 minutes resting)",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Mutton Keema",
        "englishName": "mutton mince"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix mutton mince with onion, ginger-garlic paste, chilli, spices, coriander, lemon and salt."
      },
      {
        "step": 2,
        "instruction": "Grind the mixture briefly so it becomes sticky and binds well. Rest for 20 minutes."
      },
      {
        "step": 3,
        "instruction": "Shape the mixture into small flat kababs with wet hands."
      },
      {
        "step": 4,
        "instruction": "Heat the tawa on medium heat and lightly oil it."
      },
      {
        "step": 5,
        "instruction": "Cook the kababs slowly, turning carefully, until browned and cooked through."
      },
      {
        "step": 6,
        "instruction": "Serve hot with onion and lemon."
      }
    ],
    "notes": [
      "Mutton mince should be cooked completely before serving. Keep the heat moderate so the centre cooks without burning the outside.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 6,
      "carbs": 30,
      "fat": 13
    }
  },
  "chicken salami (home style)": {
    "dishName": "Chicken Salami (Home-Style)",
    "description": "Home-style spiced chicken slices, cooked and steamed rather than cured.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "300 g",
        "commonName": "Chicken",
        "englishName": "boneless chicken"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kali Mirch",
        "englishName": "black pepper"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Cornflour",
        "englishName": "cornflour"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Grind the chicken with ginger-garlic paste, pepper, chilli, coriander, lemon and salt until finely minced."
      },
      {
        "step": 2,
        "instruction": "Mix in cornflour until the mixture becomes firm enough to shape."
      },
      {
        "step": 3,
        "instruction": "Shape the mixture into a short thick log and chill for 10 minutes."
      },
      {
        "step": 4,
        "instruction": "Slice the log into thin rounds."
      },
      {
        "step": 5,
        "instruction": "Heat a lightly oiled tawa and cook the slices on medium heat."
      },
      {
        "step": 6,
        "instruction": "Turn them until browned on both sides and fully cooked through. Serve hot or use in sandwiches."
      }
    ],
    "notes": [
      "This is a quick home-style chicken preparation, not cured salami. Cook it completely before eating."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 5,
      "carbs": 24,
      "fat": 14
    }
  },
  "paneer curry": {
    "dishName": "Paneer Curry",
    "description": "An easy everyday paneer curry with onion, tomato, ginger, garlic and mild spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "250 g",
        "commonName": "Paneer",
        "englishName": "paneer, cubed"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai. Add onion and cook until soft and lightly golden."
      },
      {
        "step": 2,
        "instruction": "Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 3,
        "instruction": "Add tomatoes, turmeric, chilli powder, coriander powder and salt."
      },
      {
        "step": 4,
        "instruction": "Cook until the tomatoes are soft and the oil begins to separate."
      },
      {
        "step": 5,
        "instruction": "Add water and simmer for 5 minutes to make a smooth gravy."
      },
      {
        "step": 6,
        "instruction": "Add paneer and garam masala. Simmer gently for 3 to 4 minutes."
      },
      {
        "step": 7,
        "instruction": "Turn off the stove and serve hot with roti, naan or rice."
      }
    ],
    "notes": [
      "Do not boil the paneer for too long. A short simmer keeps it soft."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 6,
      "carbs": 30,
      "fat": 12
    }
  },
  "chicken keema": {
    "dishName": "Chicken Keema",
    "description": "A simple dry-style minced chicken dish cooked with onion, tomato, ginger, garlic and everyday spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Chicken Keema",
        "englishName": "chicken mince"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and cook onion until lightly golden."
      },
      {
        "step": 2,
        "instruction": "Add ginger-garlic paste and green chilli. Cook for 30 seconds."
      },
      {
        "step": 3,
        "instruction": "Add tomatoes, turmeric, coriander powder, chilli powder and salt."
      },
      {
        "step": 4,
        "instruction": "Cook until the tomatoes become soft and the oil starts to separate."
      },
      {
        "step": 5,
        "instruction": "Add chicken keema and break it up with the spoon as it cooks."
      },
      {
        "step": 6,
        "instruction": "Cook for 8 to 10 minutes, then add water and simmer until the keema is fully cooked."
      },
      {
        "step": 7,
        "instruction": "Add garam masala and coriander. Cook for 1 minute and serve hot."
      }
    ],
    "notes": [
      "Keep breaking up the mince while cooking so the keema stays loose and evenly cooked.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 15,
      "carbs": 11,
      "fat": 25
    }
  },
  "aloo tamatar sabzi": {
    "dishName": "Aloo Tamatar Sabzi",
    "description": "A simple everyday potato and tomato curry made with basic spices, perfect with.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, peeled and cubed"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add onion and green chilli. Cook until the onion turns soft."
      },
      {
        "step": 3,
        "instruction": "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until mushy."
      },
      {
        "step": 4,
        "instruction": "Add potato cubes and mix well so they are coated with the masala."
      },
      {
        "step": 5,
        "instruction": "Pour in water, cover and cook on medium heat until the potatoes are tender."
      },
      {
        "step": 6,
        "instruction": "Lightly mash a few potatoes to thicken the gravy. Add garam masala."
      },
      {
        "step": 7,
        "instruction": "Garnish with coriander and serve hot with roti, puri or rice."
      }
    ],
    "notes": [
      "Mash a few cooked potatoes into the gravy for a naturally thicker curry without adding flour."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 7,
      "carbs": 53,
      "fat": 10
    }
  },
  "kadhi": {
    "dishName": "Kadhi",
    "description": "A simple Punjabi-style yogurt and gram-flour curry with a tangy, creamy texture and gentle spices.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Methi Dana",
        "englishName": "fenugreek seeds"
      },
      {
        "amount": "1",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chilli"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Whisk yogurt, besan and water until completely smooth."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Add cumin, fenugreek seeds and dried chilli."
      },
      {
        "step": 3,
        "instruction": "Add onion and cook until soft. Add ginger-garlic paste and cook for 1 minute."
      },
      {
        "step": 4,
        "instruction": "Add turmeric, coriander powder and chilli powder. Stir for 20 seconds."
      },
      {
        "step": 5,
        "instruction": "Pour in the yogurt mixture slowly while stirring constantly."
      },
      {
        "step": 6,
        "instruction": "Bring to a gentle boil, then simmer for 20 to 25 minutes. Stir every few minutes."
      },
      {
        "step": 7,
        "instruction": "Add salt, garnish with coriander and serve hot with rice or roti.",
        "tip": {
          "title": "Prevent curdling",
          "content": "Keep stirring until the kadhi starts simmering. Avoid high heat at the beginning."
        }
      }
    ],
    "notes": [
      "This is a plain kadhi without pakoras, so it is faster and easier for an everyday meal."
    ],
    "nutrition": {
      "calories": 400,
      "protein": 15,
      "carbs": 22,
      "fat": 28
    }
  },
  "mushroom masala": {
    "dishName": "Mushroom Masala",
    "description": "Mushrooms cooked in a simple onion-tomato masala with everyday Indian spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "250 g",
        "commonName": "Mushroom",
        "englishName": "button mushrooms, sliced"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and sauté mushrooms on medium-high heat for 4 to 5 minutes. Set aside."
      },
      {
        "step": 2,
        "instruction": "Add cumin seeds, then onion. Cook until golden."
      },
      {
        "step": 3,
        "instruction": "Add ginger-garlic paste and green chilli. Cook for 30 seconds."
      },
      {
        "step": 4,
        "instruction": "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until soft."
      },
      {
        "step": 5,
        "instruction": "Add water and cook the masala for 3 to 4 minutes until slightly thick."
      },
      {
        "step": 6,
        "instruction": "Add the mushrooms and simmer for 5 minutes so they absorb the masala."
      },
      {
        "step": 7,
        "instruction": "Add garam masala, garnish with coriander and serve hot."
      }
    ],
    "notes": [
      "Do not overcook mushrooms. They should stay tender instead of becoming rubbery."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 6,
      "carbs": 49,
      "fat": 9
    }
  },
  "palak mushroom": {
    "dishName": "Palak Mushroom",
    "description": "Tender mushrooms cooked in a smooth spinach gravy with mild Indian spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "250 g",
        "commonName": "Mushroom",
        "englishName": "button mushrooms, sliced"
      },
      {
        "amount": "250 g",
        "commonName": "Palak",
        "englishName": "spinach leaves"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2",
        "commonName": "Hari Mirch",
        "englishName": "green chillies"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Cook spinach and green chillies in a covered pan for 2 to 3 minutes until wilted."
      },
      {
        "step": 2,
        "instruction": "Cool slightly, then blend the spinach into a smooth puree."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai and cook mushrooms for 4 to 5 minutes. Set aside."
      },
      {
        "step": 4,
        "instruction": "Add cumin, onion and ginger-garlic paste. Cook until the onion softens."
      },
      {
        "step": 5,
        "instruction": "Add turmeric, coriander powder, salt and the spinach puree."
      },
      {
        "step": 6,
        "instruction": "Simmer for 5 minutes, then add mushrooms and garam masala."
      },
      {
        "step": 7,
        "instruction": "Cook for 2 more minutes, turn off the stove and add lemon juice."
      }
    ],
    "notes": [
      "A quick blend keeps the spinach bright and makes the gravy easy to follow and eat."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 12,
      "carbs": 27,
      "fat": 7
    }
  },
  "aloo matar": {
    "dishName": "Aloo Matar",
    "description": "A simple potato and green pea curry with a light onion-tomato gravy for.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, cubed"
      },
      {
        "amount": "1 cup",
        "commonName": "Matar",
        "englishName": "green peas, fresh or frozen"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add onion and ginger-garlic paste. Cook until lightly golden."
      },
      {
        "step": 3,
        "instruction": "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add potatoes and peas. Mix well."
      },
      {
        "step": 5,
        "instruction": "Add water, cover and cook until the potatoes are tender."
      },
      {
        "step": 6,
        "instruction": "Mash one or two potato pieces into the gravy to thicken it."
      },
      {
        "step": 7,
        "instruction": "Add garam masala and serve hot with roti, puri or rice."
      }
    ],
    "notes": [
      "Frozen peas work well when fresh peas are not available."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 8,
      "carbs": 24,
      "fat": 10
    }
  },
  "dal palak": {
    "dishName": "Dal Palak",
    "description": "Comforting lentils cooked with spinach, tomato and simple spices for an easy everyday meal.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/2 cup",
        "commonName": "Moong Dal",
        "englishName": "split yellow moong dal"
      },
      {
        "amount": "2 cups",
        "commonName": "Palak",
        "englishName": "spinach, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse the dal and add it to a cooker with turmeric and 2 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 2 to 3 whistles. Let the pressure release, then lightly mash the dal."
      },
      {
        "step": 3,
        "instruction": "Heat ghee in a kadai and add cumin seeds."
      },
      {
        "step": 4,
        "instruction": "Add ginger-garlic paste, green chilli and tomato. Cook until soft."
      },
      {
        "step": 5,
        "instruction": "Add spinach, red chilli powder and salt. Cook until the spinach wilts."
      },
      {
        "step": 6,
        "instruction": "Add the cooked dal and simmer for 4 to 5 minutes."
      },
      {
        "step": 7,
        "instruction": "Turn off the stove, add lemon juice and serve with rice or roti."
      }
    ],
    "notes": [
      "Spinach cooks quickly, so add it near the end to keep its fresh flavor."
    ],
    "nutrition": {
      "calories": 190,
      "protein": 6,
      "carbs": 19,
      "fat": 10
    }
  },
  "lobia masala": {
    "dishName": "Lobia Masala",
    "description": "Black-eyed beans cooked in a simple tomato and spice gravy, ideal with rice or roti.",
    "prepTime": "Approx. 45 minutes (plus soaking)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Lobia",
        "englishName": "black-eyed peas, soaked 2 hours"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak",
        "englishName": "grated ginger"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked lobia and add it to a cooker with 2.5 cups water and a little salt."
      },
      {
        "step": 2,
        "instruction": "Cook for 5 to 6 whistles until the lobia is soft. Save 1 cup cooking water."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai and add cumin seeds. Add onion and ginger. Cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until mushy."
      },
      {
        "step": 5,
        "instruction": "Add the cooked lobia and 1 cup reserved water."
      },
      {
        "step": 6,
        "instruction": "Cover and simmer for 10 minutes until the gravy thickens."
      },
      {
        "step": 7,
        "instruction": "Add garam masala and lemon juice. Serve hot with rice or roti."
      }
    ],
    "notes": [
      "Lobia should be fully soft before you add it to the masala."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 6,
      "carbs": 16,
      "fat": 10
    }
  },
  "aloo methi": {
    "dishName": "Aloo Methi",
    "description": "A dry everyday sabzi of potatoes and fresh fenugreek leaves with simple spices.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, small cubes"
      },
      {
        "amount": "2 cups",
        "commonName": "Methi",
        "englishName": "fresh fenugreek leaves, chopped"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add onion and green chilli. Cook until the onion softens."
      },
      {
        "step": 3,
        "instruction": "Add potatoes, turmeric, chilli powder and salt. Mix well."
      },
      {
        "step": 4,
        "instruction": "Cover and cook on low heat for 8 to 10 minutes, stirring once or twice."
      },
      {
        "step": 5,
        "instruction": "Add chopped methi and coriander powder. Mix well."
      },
      {
        "step": 6,
        "instruction": "Cook uncovered for 5 to 7 minutes until the potatoes are tender and the methi is cooked."
      },
      {
        "step": 7,
        "instruction": "Taste, adjust salt and serve hot with roti or paratha."
      }
    ],
    "notes": [
      "Do not add much water. Aloo methi is meant to be a dry sabzi.",
      "A pinch of sugar can balance very bitter methi if needed."
    ],
    "nutrition": {
      "calories": 290,
      "protein": 9,
      "carbs": 36,
      "fat": 12
    }
  },
  "gobi masala": {
    "dishName": "Gobi Masala",
    "description": "Cauliflower cooked in a simple onion-tomato masala for an easy home-style curry.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "400 g",
        "commonName": "Gobi",
        "englishName": "cauliflower florets"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves, optional"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat 1 tablespoon oil in a kadai and sauté cauliflower until lightly golden. Set aside."
      },
      {
        "step": 2,
        "instruction": "Add the remaining oil and cumin seeds. Add onion and cook until golden."
      },
      {
        "step": 3,
        "instruction": "Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 4,
        "instruction": "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until soft."
      },
      {
        "step": 5,
        "instruction": "Add water and cook the masala for 3 to 4 minutes."
      },
      {
        "step": 6,
        "instruction": "Add the cauliflower, cover and simmer until tender."
      },
      {
        "step": 7,
        "instruction": "Add garam masala and optional kasuri methi. Serve hot."
      }
    ],
    "notes": [
      "You can skip the initial cauliflower sauté for a lighter version and simmer it directly in the masala."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 9,
      "carbs": 35,
      "fat": 7
    }
  },
  "kofta curry (lauki kofta)": {
    "dishName": "Kofta Curry (Lauki Kofta)",
    "description": "Soft bottle-gourd koftas cooked in a simple onion-tomato gravy, made fully on the stovetop.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Lauki",
        "englishName": "bottle gourd, grated and squeezed dry"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix grated lauki, besan, ajwain, chilli powder, garam masala and salt into a firm mixture."
      },
      {
        "step": 2,
        "instruction": "Shape small balls and shallow-fry them in a kadai with oil until golden on all sides. Set aside."
      },
      {
        "step": 3,
        "instruction": "In the same kadai, add onion and ginger-garlic paste. Cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add tomatoes, turmeric, coriander powder and salt. Cook until mushy."
      },
      {
        "step": 5,
        "instruction": "Add water and simmer the gravy for 5 minutes."
      },
      {
        "step": 6,
        "instruction": "Add the koftas and simmer gently for 4 to 5 minutes."
      },
      {
        "step": 7,
        "instruction": "Turn off the stove and serve hot with roti or rice.",
        "tip": {
          "title": "Keep koftas light",
          "content": "Squeeze out as much water as possible from the grated lauki before adding besan."
        }
      }
    ],
    "notes": [
      "Do not boil the koftas hard after adding them, or they can break apart."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 12,
      "carbs": 35,
      "fat": 8
    }
  },
  "malai kofta": {
    "dishName": "Malai Kofta",
    "description": "Soft paneer-potato koftas in a mild creamy tomato gravy, simplified for easy home cooking.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "200 g",
        "commonName": "Paneer",
        "englishName": "paneer, grated"
      },
      {
        "amount": "1 medium",
        "commonName": "Aloo",
        "englishName": "potato, boiled and mashed"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Cornflour",
        "englishName": "cornstarch"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "8",
        "commonName": "Kaju",
        "englishName": "cashews, optional"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Malai",
        "englishName": "cream"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix grated paneer, mashed potato, cornflour, garam masala and salt."
      },
      {
        "step": 2,
        "instruction": "Shape small balls and shallow-fry in a kadai until golden. Set aside."
      },
      {
        "step": 3,
        "instruction": "Cook onion, tomatoes and ginger-garlic paste until soft. Cool slightly."
      },
      {
        "step": 4,
        "instruction": "Blend the cooked mixture with cashews and a little water."
      },
      {
        "step": 5,
        "instruction": "Heat a little oil, add turmeric, chilli powder and coriander powder, then add the puree."
      },
      {
        "step": 6,
        "instruction": "Add water and simmer for 8 minutes until smooth and slightly thick."
      },
      {
        "step": 7,
        "instruction": "Add cream, kasuri methi and salt. Gently add koftas and simmer for 2 minutes."
      },
      {
        "step": 8,
        "instruction": "Serve hot with roti, naan or rice.",
        "tip": {
          "title": "Optional nuts",
          "content": "Skip cashews for a simpler gravy. The curry will still be creamy from the malai."
        }
      }
    ],
    "notes": [
      "Keep the koftas slightly firm before adding them to the gravy so they hold their shape."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 8,
      "carbs": 34,
      "fat": 10
    }
  },
  "dum aloo": {
    "dishName": "Dum Aloo",
    "description": "Baby potatoes simmered in a spiced yogurt-tomato gravy, made easily on the stovetop.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Aloo",
        "englishName": "baby potatoes"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt, whisked"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "10",
        "commonName": "Kaju",
        "englishName": "cashews, optional"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Saunf Powder",
        "englishName": "fennel powder"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil baby potatoes until almost tender. Cool, peel and prick them lightly with a fork."
      },
      {
        "step": 2,
        "instruction": "Shallow-fry the potatoes in a kadai until golden. Set aside."
      },
      {
        "step": 3,
        "instruction": "Cook onion, tomatoes, ginger-garlic paste and cashews until soft. Cool and blend smooth."
      },
      {
        "step": 4,
        "instruction": "Heat a little oil and add cumin, turmeric, chilli powder, coriander powder and fennel powder."
      },
      {
        "step": 5,
        "instruction": "Add the blended gravy and cook for 4 to 5 minutes."
      },
      {
        "step": 6,
        "instruction": "Lower the heat and slowly add whisked yogurt while stirring."
      },
      {
        "step": 7,
        "instruction": "Add water and potatoes. Cover and simmer for 8 to 10 minutes."
      },
      {
        "step": 8,
        "instruction": "Add garam masala, adjust salt and serve hot."
      }
    ],
    "notes": [
      "If the yogurt is very sour, use a little less and balance the gravy with a pinch of sugar."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 6,
      "carbs": 20,
      "fat": 15
    }
  },
  "tori sabzi": {
    "dishName": "Tori Sabzi",
    "description": "A light everyday sabzi made with ridge gourd, onion and simple Indian spices.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Tori",
        "englishName": "ridge gourd, peeled and chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add onion and green chilli. Cook until soft."
      },
      {
        "step": 3,
        "instruction": "Add tomato, turmeric, coriander powder, chilli powder and salt. Cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add chopped tori and mix well."
      },
      {
        "step": 5,
        "instruction": "Cover and cook on medium-low heat until the tori is tender. No extra water is usually needed."
      },
      {
        "step": 6,
        "instruction": "Cook uncovered for 2 to 3 minutes if excess water remains."
      },
      {
        "step": 7,
        "instruction": "Add garam masala and serve hot with roti."
      }
    ],
    "notes": [
      "Tori releases water as it cooks, so add extra water only if the kadai becomes dry."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 15,
      "carbs": 18,
      "fat": 22
    }
  },
  "moong dal": {
    "dishName": "Moong Dal",
    "description": "A quick yellow moong dal with a simple cumin-garlic tadka, perfect for rice or roti.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Moong Dal",
        "englishName": "split yellow moong dal"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2 cloves",
        "commonName": "Lehsun",
        "englishName": "garlic, chopped"
      },
      {
        "amount": "1",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chilli"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse the dal and add it to a cooker with turmeric, tomato, green chilli and 2.5 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 2 whistles and let the pressure release."
      },
      {
        "step": 3,
        "instruction": "Lightly mash the dal and add salt. Add hot water if it is too thick."
      },
      {
        "step": 4,
        "instruction": "Heat ghee in a kadai and add cumin, garlic and dried chilli."
      },
      {
        "step": 5,
        "instruction": "When the garlic turns golden, turn the heat low and add hing and chilli powder."
      },
      {
        "step": 6,
        "instruction": "Pour the tadka over the dal and simmer for 2 minutes."
      },
      {
        "step": 7,
        "instruction": "Serve hot with rice, roti or jeera rice."
      }
    ],
    "notes": [
      "Moong dal cooks quickly, so avoid overcooking it into a very thick paste."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 7,
      "carbs": 33,
      "fat": 9
    }
  },
  "masoor dal": {
    "dishName": "Masoor Dal",
    "description": "A fast red lentil dal made with tomatoes, cumin and garlic using basic pantry ingredients.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Masoor Dal",
        "englishName": "red lentils"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2 cloves",
        "commonName": "Lehsun",
        "englishName": "garlic, chopped"
      },
      {
        "amount": "1",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chilli"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse masoor dal and add it to a cooker with tomatoes, turmeric, chilli and 2.5 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 2 whistles and let the pressure release."
      },
      {
        "step": 3,
        "instruction": "Mash the dal lightly and add salt."
      },
      {
        "step": 4,
        "instruction": "Heat ghee in a kadai. Add cumin, garlic and dried chilli."
      },
      {
        "step": 5,
        "instruction": "When the garlic turns golden, lower the heat and add hing and chilli powder."
      },
      {
        "step": 6,
        "instruction": "Pour the tadka into the dal. Add optional kasuri methi and simmer for 2 minutes."
      },
      {
        "step": 7,
        "instruction": "Serve hot with rice or roti."
      }
    ],
    "notes": [
      "Masoor dal is naturally quick-cooking, so it is a good option when you need dinner fast."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 14,
      "carbs": 35,
      "fat": 6
    }
  },
  "dal baati": {
    "dishName": "Dal Baati",
    "description": "A simple Rajasthani meal of baked whole-wheat baati served with spiced mixed dal and ghee.",
    "prepTime": "Approx. 1 hour 15 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Atta",
        "englishName": "whole wheat flour"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Suji",
        "englishName": "semolina"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1/3 cup",
        "commonName": "Dahi",
        "englishName": "yogurt"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Moong Dal",
        "englishName": "split yellow moong dal"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak",
        "englishName": "grated ginger"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee for serving"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix atta, suji, 2 tablespoons ghee, salt and yogurt. Add water and make a firm dough. Rest 15 minutes."
      },
      {
        "step": 2,
        "instruction": "Divide the dough into 6 balls and press each one slightly flat. Make a small dent in the centre."
      },
      {
        "step": 3,
        "instruction": "Bake the baatis at 200°C for 25 to 30 minutes, turning once halfway."
      },
      {
        "step": 4,
        "instruction": "Rinse both dals and add them to a cooker with turmeric, salt and 3 cups water. Cook for 3 to 4 whistles."
      },
      {
        "step": 5,
        "instruction": "Lightly mash the cooked dal and keep it aside."
      },
      {
        "step": 6,
        "instruction": "Heat ghee in a kadai. Add cumin and ginger, then chilli and coriander powder."
      },
      {
        "step": 7,
        "instruction": "Add the cooked dal and simmer for 5 minutes. Adjust the consistency with hot water."
      },
      {
        "step": 8,
        "instruction": "Crack the hot baatis slightly and pour ghee over them."
      },
      {
        "step": 9,
        "instruction": "Serve baati with dal and extra ghee if desired."
      }
    ],
    "notes": [
      "The oven gives a crisp outer crust while keeping the baati soft inside. Serve immediately for the best texture."
    ],
    "nutrition": {
      "calories": 270,
      "protein": 17,
      "carbs": 35,
      "fat": 7
    }
  },
  "dahi vada": {
    "dishName": "Dahi Vada",
    "description": "Soft urad dal vadas soaked in yogurt and topped with simple spices and optional chutneys.",
    "prepTime": "Approx. 45 minutes (plus soaking)",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Urad Dal",
        "englishName": "whole or split urad dal, soaked 5 to 6 hours"
      },
      {
        "amount": "2 cups",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 inch",
        "commonName": "Adrak",
        "englishName": "ginger"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Bhuna Jeera Powder",
        "englishName": "roasted cumin powder"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Imli Chutney",
        "englishName": "tamarind chutney, optional"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Hari Chutney",
        "englishName": "green chutney, optional"
      },
      {
        "amount": "as needed",
        "commonName": "Tel",
        "englishName": "oil for frying"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked dal and blend with ginger, green chilli, cumin, hing and a little cold water until fluffy."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Drop small portions of batter and fry on medium heat until golden."
      },
      {
        "step": 3,
        "instruction": "Soak the hot vadas in warm water for 15 minutes."
      },
      {
        "step": 4,
        "instruction": "Gently press each vada between your palms to remove excess water."
      },
      {
        "step": 5,
        "instruction": "Whisk yogurt with salt until smooth and lightly pourable."
      },
      {
        "step": 6,
        "instruction": "Add the vadas to the yogurt and chill for at least 1 hour."
      },
      {
        "step": 7,
        "instruction": "Top with chaat masala, roasted cumin, and optional chutneys."
      },
      {
        "step": 8,
        "instruction": "Serve chilled.",
        "tip": {
          "title": "Keep them soft",
          "content": "Do not make the batter watery. A thick, fluffy batter gives softer vadas."
        }
      }
    ],
    "notes": [
      "The chutneys are optional for a simpler home version."
    ],
    "nutrition": {
      "calories": 500,
      "protein": 17,
      "carbs": 61,
      "fat": 21
    }
  },
  "thepla": {
    "dishName": "Thepla",
    "description": "Soft Gujarati methi flatbreads made with atta, spices and fresh fenugreek leaves.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Atta",
        "englishName": "whole wheat flour"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "1 cup",
        "commonName": "Methi",
        "englishName": "fenugreek leaves, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak",
        "englishName": "grated ginger"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "oil for dough"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "oil for cooking"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix atta, besan, methi, spices, ginger, chilli, yogurt and salt."
      },
      {
        "step": 2,
        "instruction": "Add a little water and knead into a soft dough. Add 1 tablespoon oil and knead again."
      },
      {
        "step": 3,
        "instruction": "Rest the dough for 15 minutes, then divide into small balls."
      },
      {
        "step": 4,
        "instruction": "Roll each ball into a medium-thin round. Keep the thickness even."
      },
      {
        "step": 5,
        "instruction": "Heat a tawa and cook the thepla until small bubbles appear. Flip."
      },
      {
        "step": 6,
        "instruction": "Cook the other side until golden spots appear. Drizzle a little oil on both sides."
      },
      {
        "step": 7,
        "instruction": "Serve hot with yogurt or pickle.",
        "tip": {
          "title": "Keep them soft",
          "content": "Do not roll the thepla too thin, and keep the tawa at medium heat."
        }
      }
    ],
    "notes": [
      "You can skip methi to make a plain spiced thepla."
    ],
    "nutrition": {
      "calories": 260,
      "protein": 10,
      "carbs": 37,
      "fat": 8
    }
  },
  "matar pulao": {
    "dishName": "Matar Pulao",
    "description": "A fragrant one-pot basmati rice dish with green peas and whole spices, easy.",
    "prepTime": "Approx. 35 minutes (plus 15 minutes soaking)",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice, soaked 15 minutes"
      },
      {
        "amount": "1 cup",
        "commonName": "Matar",
        "englishName": "green peas"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, sliced"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1 inch",
        "commonName": "Dalchini",
        "englishName": "cinnamon"
      },
      {
        "amount": "3",
        "commonName": "Laung",
        "englishName": "cloves"
      },
      {
        "amount": "2",
        "commonName": "Elaichi",
        "englishName": "green cardamom pods"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Ghee ya Tel",
        "englishName": "ghee or oil"
      },
      {
        "amount": "2 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain the soaked rice well."
      },
      {
        "step": 2,
        "instruction": "Heat ghee in a kadai and add bay leaf, cinnamon, cloves and cardamom."
      },
      {
        "step": 3,
        "instruction": "Add onion and cook until lightly golden. Add ginger-garlic paste."
      },
      {
        "step": 4,
        "instruction": "Add peas and cook for 2 minutes."
      },
      {
        "step": 5,
        "instruction": "Add rice and gently mix for 1 minute."
      },
      {
        "step": 6,
        "instruction": "Add water and salt. Bring to a boil."
      },
      {
        "step": 7,
        "instruction": "Cover, lower the heat and cook for 12 to 15 minutes."
      },
      {
        "step": 8,
        "instruction": "Rest covered for 5 minutes, then fluff gently and serve."
      }
    ],
    "notes": [
      "Do not stir the rice while it cooks. This helps keep the grains separate.",
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 5,
      "carbs": 44,
      "fat": 6
    }
  },
  "kothu parotta": {
    "dishName": "Kothu Parotta",
    "description": "Shredded parotta stir-fried with onion, tomato, curry leaves and spices in an easy home-style version.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4",
        "commonName": "Parotta",
        "englishName": "cooked parottas or parathas"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Saunf Powder",
        "englishName": "fennel powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Tear cooked parottas into small pieces."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Add mustard seeds, curry leaves and green chilli."
      },
      {
        "step": 3,
        "instruction": "Add onion and cook until soft. Add tomato and salt."
      },
      {
        "step": 4,
        "instruction": "Cook until the tomato breaks down, then add chilli powder, garam masala and fennel powder."
      },
      {
        "step": 5,
        "instruction": "Add water and cook until the masala is moist but not watery."
      },
      {
        "step": 6,
        "instruction": "Add the shredded parotta and toss well on medium heat."
      },
      {
        "step": 7,
        "instruction": "Cook for 2 to 3 minutes, add coriander and serve hot."
      }
    ],
    "notes": [
      "Leftover roti, paratha or parotta works very well for this recipe."
    ],
    "nutrition": {
      "calories": 400,
      "protein": 10,
      "carbs": 58,
      "fat": 14
    }
  },
  "patta gobhi sabzi": {
    "dishName": "Patta Gobhi Sabzi",
    "description": "A simple dry cabbage sabzi cooked with cumin, turmeric and everyday Indian spices.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 cups",
        "commonName": "Patta Gobhi",
        "englishName": "cabbage, finely sliced"
      },
      {
        "amount": "1 medium",
        "commonName": "Aloo",
        "englishName": "potato, optional, small cubes"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Paani",
        "englishName": "water, only if needed"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add potato if using. Cook for 5 minutes."
      },
      {
        "step": 3,
        "instruction": "Add cabbage, green chilli, turmeric, chilli powder and salt."
      },
      {
        "step": 4,
        "instruction": "Toss well and cook uncovered for 8 to 10 minutes."
      },
      {
        "step": 5,
        "instruction": "Add a splash of water only if the kadai looks dry."
      },
      {
        "step": 6,
        "instruction": "Add coriander powder and garam masala. Cook for 2 minutes."
      },
      {
        "step": 7,
        "instruction": "Serve hot with roti or dal-rice."
      }
    ],
    "notes": [
      "Keep the lid off most of the time so the cabbage stays dry instead of watery."
    ],
    "nutrition": {
      "calories": 160,
      "protein": 5,
      "carbs": 26,
      "fat": 4
    }
  },
  "paneer lababdar": {
    "dishName": "Paneer Lababdar",
    "description": "Paneer in a tomato-cashew gravy with onion, spices and a little cream, simplified.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "200 g",
        "commonName": "Paneer",
        "englishName": "paneer, cubed"
      },
      {
        "amount": "3 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "10",
        "commonName": "Kaju",
        "englishName": "cashews"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Malai",
        "englishName": "cream"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel ya Makhan",
        "englishName": "oil or butter"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Cook tomatoes and cashews with 1/2 cup water until soft."
      },
      {
        "step": 2,
        "instruction": "Cool slightly and blend into a smooth puree."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai and cook onion until golden. Add ginger-garlic paste."
      },
      {
        "step": 4,
        "instruction": "Add tomato puree, turmeric, coriander powder, chilli powder and salt. Cook until thick."
      },
      {
        "step": 5,
        "instruction": "Add 1/2 to 1 cup water and simmer for 5 minutes."
      },
      {
        "step": 6,
        "instruction": "Add paneer cubes and cook gently for 2 minutes."
      },
      {
        "step": 7,
        "instruction": "Add cream, garam masala and kasuri methi. Mix gently and turn off the stove."
      },
      {
        "step": 8,
        "instruction": "Serve hot with roti, naan or rice.",
        "tip": {
          "title": "Keep paneer soft",
          "content": "Do not boil the paneer for long. Two minutes in the hot gravy is enough."
        }
      }
    ],
    "notes": [
      "This version keeps the richer restaurant-style flavor while using straightforward home steps."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 5,
      "carbs": 26,
      "fat": 6
    }
  },
  "matar korma": {
    "dishName": "Matar Korma",
    "description": "Green peas cooked in a mild onion-cashew yogurt gravy with gentle whole spices.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Matar",
        "englishName": "green peas"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "10",
        "commonName": "Kaju",
        "englishName": "cashews"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt, whisked"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1",
        "commonName": "Elaichi",
        "englishName": "green cardamom"
      },
      {
        "amount": "1 inch",
        "commonName": "Dalchini",
        "englishName": "cinnamon"
      },
      {
        "amount": "2",
        "commonName": "Laung",
        "englishName": "cloves"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Cook onion and cashews in 1/2 cup water until soft. Cool and blend smooth."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Add cardamom, cinnamon and cloves."
      },
      {
        "step": 3,
        "instruction": "Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 4,
        "instruction": "Add the onion-cashew puree, turmeric, coriander powder, chilli powder and salt."
      },
      {
        "step": 5,
        "instruction": "Cook for 4 to 5 minutes, then lower the heat and add whisked yogurt slowly."
      },
      {
        "step": 6,
        "instruction": "Add peas and water. Cover and simmer until peas are tender."
      },
      {
        "step": 7,
        "instruction": "Add garam masala, taste and serve with roti, paratha or rice."
      }
    ],
    "notes": [
      "For a simpler version, skip cashews and use an extra 2 tablespoons of yogurt."
    ],
    "nutrition": {
      "calories": 170,
      "protein": 5,
      "carbs": 22,
      "fat": 7
    }
  },
  "amritsari chole": {
    "dishName": "Amritsari Chole",
    "description": "Dark, tangy chickpeas cooked with tea, whole spices and a punchy onion-tomato masala.",
    "prepTime": "Approx. 1 hour (plus soaking)",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Kabuli Chana",
        "englishName": "white chickpeas, soaked overnight"
      },
      {
        "amount": "1",
        "commonName": "Chai Patti",
        "englishName": "tea bag"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Chole Masala",
        "englishName": "chole masala powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel ya Ghee",
        "englishName": "oil or ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Kala Namak",
        "englishName": "black salt"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Drain soaked chickpeas. Add them to a cooker with 3 cups water, tea bag and salt."
      },
      {
        "step": 2,
        "instruction": "Cook for 6 to 7 whistles. Let pressure release, then remove the tea bag."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai and add cumin. Add onion and ginger-garlic paste."
      },
      {
        "step": 4,
        "instruction": "Cook until golden, then add tomatoes, turmeric, chilli powder and chole masala."
      },
      {
        "step": 5,
        "instruction": "Cook until the masala turns thick and glossy."
      },
      {
        "step": 6,
        "instruction": "Add chickpeas with 1 cup cooking water and simmer for 10 to 12 minutes."
      },
      {
        "step": 7,
        "instruction": "Add amchur and black salt. Serve hot with kulcha, bhatura or rice."
      }
    ],
    "notes": [
      "Tea adds the deep colour commonly associated with Amritsari chole. Remove the tea bag before simmering.",
      "Black tea is optional and mainly adds darker colour; skip it without changing the basic recipe."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 8,
      "carbs": 50,
      "fat": 10
    }
  },
  "sarson ka saag": {
    "dishName": "Sarson Ka Saag",
    "description": "A homestyle Punjabi winter saag made with mustard greens, spinach and simple spices.",
    "prepTime": "Approx. 1 hour 15 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Sarson",
        "englishName": "mustard greens, washed"
      },
      {
        "amount": "150 g",
        "commonName": "Palak",
        "englishName": "spinach"
      },
      {
        "amount": "100 g",
        "commonName": "Bathua",
        "englishName": "bathua leaves, optional"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "2",
        "commonName": "Hari Mirch",
        "englishName": "green chillies"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Makki ka Atta",
        "englishName": "corn flour"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Makhan ya Ghee",
        "englishName": "butter or ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Roughly chop mustard greens, spinach and optional bathua."
      },
      {
        "step": 2,
        "instruction": "Add the greens, green chillies and 1 cup water to a cooker. Cook for 3 whistles."
      },
      {
        "step": 3,
        "instruction": "Let the pressure release, cool slightly and blend the greens coarsely."
      },
      {
        "step": 4,
        "instruction": "Heat butter or ghee in a kadai. Add onion and ginger-garlic paste."
      },
      {
        "step": 5,
        "instruction": "Add tomatoes, turmeric and coriander powder. Cook until soft."
      },
      {
        "step": 6,
        "instruction": "Add the green puree and salt. Simmer for 15 minutes."
      },
      {
        "step": 7,
        "instruction": "Mix corn flour with 2 tablespoons water and stir it in."
      },
      {
        "step": 8,
        "instruction": "Simmer for 5 more minutes, then add garam masala."
      },
      {
        "step": 9,
        "instruction": "Serve hot with makki di roti.",
        "tip": {
          "title": "Keep it rustic",
          "content": "Do not blend the greens completely smooth. A slightly coarse texture feels more homestyle."
        }
      }
    ],
    "notes": [
      "Bathua is optional and can be replaced with extra spinach."
    ],
    "nutrition": {
      "calories": 380,
      "protein": 7,
      "carbs": 54,
      "fat": 15
    }
  },
  "makki di roti": {
    "dishName": "Makki Di Roti",
    "description": "A rustic Punjabi cornmeal flatbread cooked on a tawa and traditionally served with saag.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Makki ka Atta",
        "englishName": "fine maize flour"
      },
      {
        "amount": "1 cup",
        "commonName": "Gunguna Paani",
        "englishName": "warm water, as needed"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix makki flour and salt."
      },
      {
        "step": 2,
        "instruction": "Add warm water little by little and knead into a soft dough."
      },
      {
        "step": 3,
        "instruction": "Divide into small balls. Flatten each ball with your hands into a round roti."
      },
      {
        "step": 4,
        "instruction": "Heat a tawa on medium heat and place the roti carefully."
      },
      {
        "step": 5,
        "instruction": "Cook until the edges look dry, then flip gently."
      },
      {
        "step": 6,
        "instruction": "Cook both sides until brown spots appear. Press the edges gently so they cook evenly."
      },
      {
        "step": 7,
        "instruction": "Brush with optional ghee and serve hot with sarson ka saag.",
        "tip": {
          "title": "Prevent cracks",
          "content": "Use warm water and make the dough soft. A dry dough will crack while shaping."
        }
      }
    ],
    "notes": [
      "Makki dough has no gluten, so shaping it by hand is easier than trying to roll it thin."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 12,
      "carbs": 34,
      "fat": 13
    }
  },
  "mooli ki sabzi": {
    "dishName": "Mooli Ki Sabzi",
    "description": "A quick North Indian radish sabzi with simple spices, ideal for winter home meals.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 medium",
        "commonName": "Mooli",
        "englishName": "radishes, chopped"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Mooli ke Patte",
        "englishName": "radish leaves, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 pinch",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Paani",
        "englishName": "water, only if needed"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add hing and cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add green chilli and chopped radish. Cook for 4 minutes."
      },
      {
        "step": 3,
        "instruction": "Add radish leaves, turmeric, chilli powder and salt."
      },
      {
        "step": 4,
        "instruction": "Cover and cook until the radish becomes tender."
      },
      {
        "step": 5,
        "instruction": "Cook uncovered for a few minutes until excess moisture dries out."
      },
      {
        "step": 6,
        "instruction": "Add garam masala and mix well."
      },
      {
        "step": 7,
        "instruction": "Serve hot with roti or paratha."
      }
    ],
    "notes": [
      "Young radishes cook faster and are milder in taste."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 14,
      "carbs": 41,
      "fat": 9
    }
  },
  "lauki sabzi": {
    "dishName": "Lauki Sabzi",
    "description": "A light everyday bottle-gourd sabzi cooked with onion, tomato and minimal spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Lauki",
        "englishName": "bottle gourd, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1/2 inch",
        "commonName": "Adrak",
        "englishName": "ginger, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder, optional"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Saunf Powder",
        "englishName": "fennel powder, optional"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add onion, ginger and green chilli. Cook until soft."
      },
      {
        "step": 3,
        "instruction": "Add tomato, turmeric, optional coriander powder and salt. Cook until mushy."
      },
      {
        "step": 4,
        "instruction": "Add lauki and mix well."
      },
      {
        "step": 5,
        "instruction": "Add water, cover and cook until the lauki is tender."
      },
      {
        "step": 6,
        "instruction": "Cook uncovered if there is too much water. Add garam masala and optional fennel powder."
      },
      {
        "step": 7,
        "instruction": "Garnish with coriander if using and serve hot with roti or rice."
      }
    ],
    "notes": [
      "Lauki releases its own water, so add liquid gradually."
    ],
    "nutrition": {
      "calories": 180,
      "protein": 6,
      "carbs": 26,
      "fat": 6
    }
  },
  "arbi masala": {
    "dishName": "Arbi Masala",
    "description": "Crisp-edged colocasia cooked with ajwain, turmeric and tangy Indian spices.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Arbi",
        "englishName": "colocasia roots"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Cook whole arbi in a cooker for 1 whistle with enough water. Let it cool completely."
      },
      {
        "step": 2,
        "instruction": "Peel the arbi and cut into thick slices."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai and add ajwain and hing."
      },
      {
        "step": 4,
        "instruction": "Add arbi, turmeric, coriander powder, chilli powder and salt."
      },
      {
        "step": 5,
        "instruction": "Cook on medium heat until the arbi turns crisp and golden, turning gently."
      },
      {
        "step": 6,
        "instruction": "Add amchur and garam masala. Toss for 30 seconds."
      },
      {
        "step": 7,
        "instruction": "Garnish with coriander and serve hot."
      }
    ],
    "notes": [
      "Cooling the boiled arbi before peeling reduces stickiness and helps it crisp in the kadai."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 9,
      "carbs": 46,
      "fat": 9
    }
  },
  "soya chaap": {
    "dishName": "Soya Chaap Masala",
    "description": "Home-style soya chaap in a spiced onion-tomato gravy with yogurt and simple whole spices.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "400 g",
        "commonName": "Soya Chaap",
        "englishName": "soya chaap, cut into pieces"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kasuri Methi",
        "englishName": "dried fenugreek leaves"
      },
      {
        "amount": "2.5 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix soya chaap with yogurt, chilli powder and a little salt. Rest for 10 minutes."
      },
      {
        "step": 2,
        "instruction": "Shallow-fry the chaap in a kadai until lightly golden. Set aside."
      },
      {
        "step": 3,
        "instruction": "Cook onion, tomatoes and ginger-garlic paste until soft. Cool and blend smooth."
      },
      {
        "step": 4,
        "instruction": "Heat oil, add cumin, turmeric, coriander powder and chilli powder."
      },
      {
        "step": 5,
        "instruction": "Add the blended masala and cook until glossy."
      },
      {
        "step": 6,
        "instruction": "Lower the heat and add the yogurt marinade slowly. Stir well."
      },
      {
        "step": 7,
        "instruction": "Add water and soya chaap. Cover and simmer for 8 minutes."
      },
      {
        "step": 8,
        "instruction": "Add garam masala and kasuri methi. Serve hot with roti or paratha."
      }
    ],
    "notes": [
      "Use ready-made soya chaap sticks or pieces. The recipe itself is fully cooked on the stovetop."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 7,
      "carbs": 45,
      "fat": 8
    }
  },
  "papdi chaat": {
    "dishName": "Papdi Chaat",
    "description": "Crisp papdi topped with potato, chickpeas, yogurt, chutneys, spices and sev in a home-style chaat.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "20",
        "commonName": "Papdi",
        "englishName": "crisp papdi"
      },
      {
        "amount": "2 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and chopped"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Kabuli Chana",
        "englishName": "boiled chickpeas"
      },
      {
        "amount": "1 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Imli Chutney",
        "englishName": "tamarind chutney"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Hari Chutney",
        "englishName": "green chutney"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Sev",
        "englishName": "fine sev"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Bhuna Jeera Powder",
        "englishName": "roasted cumin powder"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil and chop the potatoes. Keep boiled chickpeas ready."
      },
      {
        "step": 2,
        "instruction": "Arrange papdi on a plate and top with potato and chickpeas."
      },
      {
        "step": 3,
        "instruction": "Add whisked yogurt, then drizzle green and tamarind chutneys."
      },
      {
        "step": 4,
        "instruction": "Sprinkle chaat masala, roasted cumin and chilli powder."
      },
      {
        "step": 5,
        "instruction": "Top with sev and coriander."
      },
      {
        "step": 6,
        "instruction": "Serve immediately so the papdi stays crisp.",
        "tip": {
          "title": "Avoid soggy papdi",
          "content": "Keep the chutneys ready and assemble only just before serving."
        }
      }
    ],
    "notes": [
      "Store-bought papdi, chutneys and sev are fine for a quick home assembly; the toppings are all prepared at home."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 7,
      "carbs": 35,
      "fat": 8
    }
  },
  "sev puri": {
    "dishName": "Sev Puri",
    "description": "A quick Mumbai-style chaat of crisp puris, potato, chutneys, onion, spices and fine sev.",
    "prepTime": "Approx. 15 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "20",
        "commonName": "Papdi",
        "englishName": "small crisp papdi"
      },
      {
        "amount": "2 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Imli Chutney",
        "englishName": "tamarind chutney"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Hari Chutney",
        "englishName": "green chutney"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Sev",
        "englishName": "fine sev"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Bhuna Jeera Powder",
        "englishName": "roasted cumin powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil and chop the potatoes. Season lightly with salt."
      },
      {
        "step": 2,
        "instruction": "Arrange the papdi on a plate and add the potato and onion."
      },
      {
        "step": 3,
        "instruction": "Drizzle green chutney and tamarind chutney over each papdi."
      },
      {
        "step": 4,
        "instruction": "Sprinkle chaat masala, roasted cumin and a few drops of lemon juice."
      },
      {
        "step": 5,
        "instruction": "Top generously with fine sev and coriander. Serve immediately."
      }
    ],
    "notes": [
      "Unlike dahi puri, sev puri is usually served without yogurt so the texture stays crisp."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 11,
      "carbs": 32,
      "fat": 12
    }
  },
  "dahi puri": {
    "dishName": "Dahi Puri",
    "description": "Crisp hollow puris filled with potato, yogurt, chutneys, spices and sev for an.",
    "prepTime": "Approx. 15 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "20",
        "commonName": "Pani Puri Puri",
        "englishName": "small crisp puris"
      },
      {
        "amount": "2 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and mashed"
      },
      {
        "amount": "1 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt, whisked"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Imli Chutney",
        "englishName": "tamarind chutney"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Hari Chutney",
        "englishName": "green chutney"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Sev",
        "englishName": "fine sev"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Bhuna Jeera Powder",
        "englishName": "roasted cumin powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil, peel and mash the potatoes. Add a pinch of salt and chaat masala."
      },
      {
        "step": 2,
        "instruction": "Make a small hole in each puri and fill with a little potato."
      },
      {
        "step": 3,
        "instruction": "Add whisked yogurt to each puri."
      },
      {
        "step": 4,
        "instruction": "Drizzle green chutney and tamarind chutney."
      },
      {
        "step": 5,
        "instruction": "Sprinkle chaat masala, cumin powder and chilli powder."
      },
      {
        "step": 6,
        "instruction": "Top with sev and coriander. Serve immediately.",
        "tip": {
          "title": "Assemble last",
          "content": "Keep the puris dry until everyone is ready to eat so they stay crisp."
        }
      }
    ],
    "notes": [
      "Store-bought puris are perfectly fine for this quick home assembly."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 4,
      "carbs": 38,
      "fat": 9
    }
  },
  "fish curry (fish masala)": {
    "dishName": "Fish Curry",
    "description": "Simple Indian fish curry with onion, tomato and warm spices.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Machhli",
        "englishName": "firm fish pieces"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rub fish with a little turmeric, chilli powder and salt. Keep aside for 10 minutes."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai and lightly sear the fish for 2 minutes on each side. Remove."
      },
      {
        "step": 3,
        "instruction": "Add cumin seeds to the same kadai. Let them sizzle."
      },
      {
        "step": 4,
        "instruction": "Add onion and cook until light golden. Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 5,
        "instruction": "Add tomatoes, turmeric, chilli powder, coriander powder and salt. Cook until soft."
      },
      {
        "step": 6,
        "instruction": "Add water and garam masala. Simmer for 5 minutes to make a smooth gravy."
      },
      {
        "step": 7,
        "instruction": "Gently place the fish in the gravy and simmer for 5 to 7 minutes, until cooked through."
      },
      {
        "step": 8,
        "instruction": "Garnish with coriander and serve hot with rice.",
        "tip": {
          "title": "Don't overcook the fish",
          "content": "Once it flakes easily with a fork, turn off the heat. Fish can break if simmered too long."
        }
      }
    ],
    "notes": [
      "Tamarind can be added for extra tang if you like a more coastal-style curry.",
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 480,
      "protein": 38,
      "carbs": 14,
      "fat": 30
    }
  },
  "fish fingers": {
    "dishName": "Fish Fingers",
    "description": "Crispy homemade fish fingers made in the oven or air fryer with a.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "air_fryer",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "400 g",
        "commonName": "Machhli",
        "englishName": "boneless fish fillets"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "1",
        "commonName": "Anda",
        "englishName": "egg, beaten"
      },
      {
        "amount": "1 cup",
        "commonName": "Bread Crumbs",
        "englishName": "breadcrumbs"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kali Mirch",
        "englishName": "black pepper"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "oil, for brushing"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Cut fish into finger-sized strips. Mix with lemon juice, salt, pepper and turmeric."
      },
      {
        "step": 2,
        "instruction": "Coat each fish strip lightly in flour, then dip in beaten egg."
      },
      {
        "step": 3,
        "instruction": "Roll the fish in breadcrumbs until fully coated."
      },
      {
        "step": 4,
        "instruction": "Place the coated fish in the air fryer or on an oven tray. Brush lightly with oil."
      },
      {
        "step": 5,
        "instruction": "Air fry at 200°C for 10 to 12 minutes, turning halfway. Or bake at 220°C for 15 to 18 minutes."
      },
      {
        "step": 6,
        "instruction": "Cook until golden and the fish is opaque inside."
      },
      {
        "step": 7,
        "instruction": "Serve hot with ketchup or mint chutney.",
        "tip": {
          "title": "Keep the coating dry",
          "content": "Do not overcrowd the air fryer or tray. Leave a little space around each piece so the crust gets crisp."
        }
      }
    ],
    "notes": [
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain.",
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 5,
      "carbs": 28,
      "fat": 10
    }
  },
  "kadhi pakora": {
    "dishName": "Kadhi Pakora",
    "description": "Soft gram-flour pakoras served in a tangy yogurt kadhi.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "1 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Methi",
        "englishName": "fenugreek seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "oil for pakoras"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "oil for kadhi"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix 1/2 cup besan with onion, green chilli, chilli powder, salt and enough water to make a thick batter."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Drop small spoonfuls of batter and shallow-fry the pakoras until golden. Set aside."
      },
      {
        "step": 3,
        "instruction": "Whisk yogurt, the remaining besan, turmeric and 3 cups water until smooth."
      },
      {
        "step": 4,
        "instruction": "Heat 1 tablespoon oil in the kadai. Add mustard seeds, cumin, fenugreek and hing."
      },
      {
        "step": 5,
        "instruction": "Pour in the yogurt mixture slowly while stirring. Bring it to a gentle boil."
      },
      {
        "step": 6,
        "instruction": "Lower the heat and simmer for 20 to 25 minutes, stirring sometimes, until the kadhi thickens slightly."
      },
      {
        "step": 7,
        "instruction": "Add the pakoras and simmer for 5 minutes so they soak up the kadhi."
      },
      {
        "step": 8,
        "instruction": "Serve hot with rice.",
        "tip": {
          "title": "Keep kadhi at a gentle simmer",
          "content": "Hard boiling can make yogurt split. Low heat gives a smoother kadhi."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 350,
      "protein": 7,
      "carbs": 47,
      "fat": 15
    }
  },
  "keema matar": {
    "dishName": "Keema Matar",
    "description": "Home-style minced mutton cooked with green peas, onion, tomato and everyday spices.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Mutton Keema",
        "englishName": "minced mutton"
      },
      {
        "amount": "1 cup",
        "commonName": "Matar",
        "englishName": "green peas"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a cooker or deep kadai. Add cumin seeds and let them sizzle."
      },
      {
        "step": 2,
        "instruction": "Add onion and cook until golden. Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 3,
        "instruction": "Add tomatoes, turmeric, coriander powder, chilli powder and salt. Cook until the tomatoes soften."
      },
      {
        "step": 4,
        "instruction": "Add keema and peas. Cook on medium heat for 5 to 6 minutes, stirring to break up the keema."
      },
      {
        "step": 5,
        "instruction": "Add 1 cup water and mix well."
      },
      {
        "step": 6,
        "instruction": "Cover and cook in the cooker for 3 whistles. Or simmer covered in a kadai for 25 to 30 minutes."
      },
      {
        "step": 7,
        "instruction": "Open carefully, add garam masala and simmer for 3 minutes if the gravy is thin."
      },
      {
        "step": 8,
        "instruction": "Garnish with coriander and serve with roti or rice.",
        "tip": {
          "title": "Break the keema well",
          "content": "Stir and press the mince as it cooks so you get small, separate pieces instead of large clumps."
        }
      }
    ],
    "notes": [
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 360,
      "protein": 8,
      "carbs": 48,
      "fat": 15
    }
  },
  "karela sabzi": {
    "dishName": "Karela Sabzi",
    "description": "Simple bitter gourd sabzi cooked with onion and spices for an everyday Indian meal.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "500 g",
        "commonName": "Karela",
        "englishName": "bitter gourd"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, sliced"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Saunf",
        "englishName": "fennel seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Slice karela thinly. Remove the seeds if they are large."
      },
      {
        "step": 2,
        "instruction": "Mix karela with a little salt and leave for 10 minutes. Gently squeeze out excess liquid."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai. Add fennel seeds and let them sizzle."
      },
      {
        "step": 4,
        "instruction": "Add karela and cook uncovered on medium heat for 12 to 15 minutes, stirring often."
      },
      {
        "step": 5,
        "instruction": "Add onion, turmeric, chilli powder, coriander powder and salt."
      },
      {
        "step": 6,
        "instruction": "Cook for another 8 to 10 minutes until the karela is tender and lightly browned."
      },
      {
        "step": 7,
        "instruction": "Add amchur, mix well and cook for 1 minute."
      },
      {
        "step": 8,
        "instruction": "Serve hot with roti and dal.",
        "tip": {
          "title": "For less bitterness",
          "content": "Salting and squeezing the karela before cooking makes the flavor milder."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 180,
      "protein": 5,
      "carbs": 24,
      "fat": 7
    }
  },
  "toor dal": {
    "dishName": "Toor Dal",
    "description": "Everyday yellow lentils cooked until soft and finished with a simple cumin-garlic tadka.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas, rinsed"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "3 cloves",
        "commonName": "Lehsun",
        "englishName": "garlic, sliced"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the dal and add it to a cooker with turmeric, tomato, onion, salt and 3 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 4 whistles, then let the pressure release naturally."
      },
      {
        "step": 3,
        "instruction": "Open and lightly whisk the dal so it becomes creamy. Add a little water if needed."
      },
      {
        "step": 4,
        "instruction": "Heat ghee in a kadai. Add cumin seeds and sliced garlic."
      },
      {
        "step": 5,
        "instruction": "When the garlic turns light golden, add chilli powder and turn the heat low."
      },
      {
        "step": 6,
        "instruction": "Pour the tadka over the dal and mix."
      },
      {
        "step": 7,
        "instruction": "Simmer for 2 minutes so the flavors come together."
      },
      {
        "step": 8,
        "instruction": "Garnish with coriander and serve with rice or roti.",
        "tip": {
          "title": "Make it creamy",
          "content": "Whisk the cooked dal for 20 to 30 seconds instead of adding extra cream or butter."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 200,
      "protein": 5,
      "carbs": 27,
      "fat": 8
    }
  },
  "aloo tikki": {
    "dishName": "Aloo Tikki",
    "description": "Crispy shallow-fried potato patties made with simple spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and mashed"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera Powder",
        "englishName": "roasted cumin powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Corn Flour",
        "englishName": "corn flour"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "oil for shallow frying"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Boil the potatoes until soft. Peel and mash them until smooth."
      },
      {
        "step": 2,
        "instruction": "Mix potatoes with coriander, chaat masala, chilli powder, cumin powder, salt and corn flour."
      },
      {
        "step": 3,
        "instruction": "Divide the mixture into 6 small balls and flatten them into thick patties."
      },
      {
        "step": 4,
        "instruction": "Heat a thin layer of oil in a kadai."
      },
      {
        "step": 5,
        "instruction": "Cook the tikkis on medium heat for 3 to 4 minutes per side until crisp and golden."
      },
      {
        "step": 6,
        "instruction": "Flip gently once the first side has formed a crust."
      },
      {
        "step": 7,
        "instruction": "Serve hot with green chutney and tamarind chutney.",
        "tip": {
          "title": "Crisp without breaking",
          "content": "Let the potato mixture cool before shaping and do not flip the tikki too early."
        }
      }
    ],
    "notes": [
      "Keep the oil at a steady medium heat. If the outside browns very quickly, lower the heat so the centre cooks through."
    ],
    "nutrition": {
      "calories": 330,
      "protein": 8,
      "carbs": 45,
      "fat": 13
    }
  },
  "dhokla (besan dhokla)": {
    "dishName": "Dhokla",
    "description": "Soft, fluffy besan dhokla made at home with a quick batter and simple tempering.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Besan",
        "englishName": "gram flour"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water, as needed"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "1 tsp",
        "commonName": "Eno",
        "englishName": "fruit salt"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "oil"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Til",
        "englishName": "sesame seeds"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, sliced"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Whisk besan, yogurt, turmeric, sugar, salt and water into a smooth thick batter."
      },
      {
        "step": 2,
        "instruction": "Let the batter rest for 10 minutes."
      },
      {
        "step": 3,
        "instruction": "Just before steaming, mix in lemon juice and Eno gently. Do not overmix."
      },
      {
        "step": 4,
        "instruction": "Grease a shallow heat-safe pan with oil and pour in the batter."
      },
      {
        "step": 5,
        "instruction": "Add water to a cooker and place the pan inside. Cover and steam without pressure for 15 to 18 minutes."
      },
      {
        "step": 6,
        "instruction": "Check with a knife. It should come out mostly clean."
      },
      {
        "step": 7,
        "instruction": "Heat 1 tablespoon oil in a kadai. Add mustard seeds, sesame seeds, curry leaves and chilli."
      },
      {
        "step": 8,
        "instruction": "Pour the tempering over the dhokla, cut into pieces and serve.",
        "tip": {
          "title": "Add Eno last",
          "content": "The batter gets its lift from the fresh Eno, so mix it in only when you are ready to steam."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 240,
      "protein": 6,
      "carbs": 34,
      "fat": 9
    }
  },
  "tomato rice": {
    "dishName": "Tomato Rice",
    "description": "Tangy South Indian tomato rice made with cooked rice, tomatoes and simple tempering spices.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 cups",
        "commonName": "Pakka Chawal",
        "englishName": "cooked rice"
      },
      {
        "amount": "3 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Urad Dal",
        "englishName": "split black gram"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai. Add mustard seeds and let them pop."
      },
      {
        "step": 2,
        "instruction": "Add urad dal, green chilli and curry leaves. Cook for 30 seconds."
      },
      {
        "step": 3,
        "instruction": "Add onion and cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add tomatoes, turmeric, chilli powder, garam masala and salt."
      },
      {
        "step": 5,
        "instruction": "Cook until the tomatoes become soft and the mixture looks thick."
      },
      {
        "step": 6,
        "instruction": "Add cooked rice and gently mix until every grain is coated."
      },
      {
        "step": 7,
        "instruction": "Cook on low heat for 3 to 4 minutes."
      },
      {
        "step": 8,
        "instruction": "Serve hot with yogurt or papad.",
        "tip": {
          "title": "Use cool cooked rice",
          "content": "Rice that has cooled slightly stays separate and does not turn mushy when mixed."
        }
      }
    ],
    "notes": [
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 350,
      "protein": 9,
      "carbs": 45,
      "fat": 15
    }
  },
  "parotta": {
    "dishName": "Parotta",
    "description": "Flaky South Indian flatbread made at home on a tawa with a simple soft dough.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "oil"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Paani",
        "englishName": "water, as needed"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "oil, for cooking"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix flour, sugar, salt, 1 tablespoon oil and water to make a soft dough."
      },
      {
        "step": 2,
        "instruction": "Knead for 5 minutes until the dough feels smooth. Rest it for 20 minutes."
      },
      {
        "step": 3,
        "instruction": "Divide into 6 balls. Roll each ball very thin and brush lightly with oil."
      },
      {
        "step": 4,
        "instruction": "Fold or pleat the thin sheet into a loose rope, then coil it into a round."
      },
      {
        "step": 5,
        "instruction": "Flatten each coil gently with your hands or a rolling pin substitute using light pressure."
      },
      {
        "step": 6,
        "instruction": "Heat a tawa and cook each parotta on medium heat until light golden spots appear on both sides."
      },
      {
        "step": 7,
        "instruction": "Brush a little oil and press the edges gently for flaky layers."
      },
      {
        "step": 8,
        "instruction": "Serve hot with vegetable kurma or curry.",
        "tip": {
          "title": "Rest the dough",
          "content": "A soft dough and enough resting time make the parotta easier to stretch and keep the layers tender."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 330,
      "protein": 8,
      "carbs": 45,
      "fat": 13
    }
  },
  "achari paneer": {
    "dishName": "Achari Paneer",
    "description": "Paneer cooked with tangy pickling spices, onion, tomato and yogurt for a bright,.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "250 g",
        "commonName": "Paneer",
        "englishName": "paneer cubes"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, sliced"
      },
      {
        "amount": "2 medium",
        "commonName": "Tamatar",
        "englishName": "tomatoes, chopped"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt, whisked"
      },
      {
        "amount": "1 tsp",
        "commonName": "Saunf",
        "englishName": "fennel seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kalonji",
        "englishName": "nigella seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Methi",
        "englishName": "fenugreek seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai. Add mustard, cumin, fennel, nigella and fenugreek seeds."
      },
      {
        "step": 2,
        "instruction": "Let the spices sizzle for a few seconds, then add onion and cook until soft."
      },
      {
        "step": 3,
        "instruction": "Add tomatoes, turmeric, chilli powder and salt. Cook until the tomatoes soften."
      },
      {
        "step": 4,
        "instruction": "Lower the heat. Add whisked yogurt slowly while stirring so it stays smooth."
      },
      {
        "step": 5,
        "instruction": "Add water and simmer for 5 minutes."
      },
      {
        "step": 6,
        "instruction": "Add paneer cubes and cook gently for 4 to 5 minutes."
      },
      {
        "step": 7,
        "instruction": "Taste and adjust salt or chilli. Serve hot with roti or rice.",
        "tip": {
          "title": "Keep yogurt smooth",
          "content": "Add yogurt on low heat and stir continuously for the first minute to reduce the chance of curdling."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 300,
      "protein": 10,
      "carbs": 42,
      "fat": 10
    }
  },
  "vegetable kurma": {
    "dishName": "Vegetable Kurma",
    "description": "Creamy South Indian-style vegetable kurma made with mixed vegetables, coconut, cashews and mild spices.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, potato, beans and peas, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Nariyal",
        "englishName": "grated coconut"
      },
      {
        "amount": "8",
        "commonName": "Kaju",
        "englishName": "cashews"
      },
      {
        "amount": "2",
        "commonName": "Hari Mirch",
        "englishName": "green chillies"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Saunf",
        "englishName": "fennel seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Blend coconut, cashews, green chilli, fennel, cumin and yogurt into a smooth paste."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a cooker. Add onion and cook until soft."
      },
      {
        "step": 3,
        "instruction": "Add tomato and turmeric. Cook until the tomato softens."
      },
      {
        "step": 4,
        "instruction": "Add the ground paste and cook for 2 minutes on low heat, stirring often."
      },
      {
        "step": 5,
        "instruction": "Add mixed vegetables, water and salt. Mix well."
      },
      {
        "step": 6,
        "instruction": "Cook for 2 whistles, then let the pressure release naturally."
      },
      {
        "step": 7,
        "instruction": "Open and simmer for 2 to 3 minutes if the gravy looks thin."
      },
      {
        "step": 8,
        "instruction": "Serve hot with parotta, dosa, poori or rice.",
        "tip": {
          "title": "Keep it mild",
          "content": "Kurma is usually lightly spiced. Let the coconut and yogurt carry the flavor instead of adding too much chilli."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 240,
      "protein": 8,
      "carbs": 32,
      "fat": 9
    }
  },
  "aloo shimla mirch": {
    "dishName": "Aloo Shimla Mirch",
    "description": "Simple potato and capsicum sabzi cooked with cumin and everyday Indian spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, cubed"
      },
      {
        "amount": "2 medium",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, sliced"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, sliced"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add potatoes, turmeric and salt. Toss well."
      },
      {
        "step": 3,
        "instruction": "Cover and cook on low heat for 10 to 12 minutes until the potatoes are almost tender."
      },
      {
        "step": 4,
        "instruction": "Add onion and capsicum. Mix well."
      },
      {
        "step": 5,
        "instruction": "Add coriander powder and chilli powder."
      },
      {
        "step": 6,
        "instruction": "Cook uncovered for 8 to 10 minutes until the capsicum is tender but still has a little bite."
      },
      {
        "step": 7,
        "instruction": "Add amchur, mix and cook for 1 minute."
      },
      {
        "step": 8,
        "instruction": "Serve hot with roti or dal.",
        "tip": {
          "title": "Keep the capsicum from going mushy",
          "content": "Add it after the potatoes are mostly cooked and finish the dish uncovered."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 300,
      "protein": 8,
      "carbs": 44,
      "fat": 10
    }
  },
  "pindi chole": {
    "dishName": "Pindi Chole",
    "description": "Dark, tangy Punjabi-style chickpeas made with whole spices and a dry roasted masala.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Kabuli Chana",
        "englishName": "white chickpeas, soaked overnight"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Anardana",
        "englishName": "dried pomegranate seeds, crushed"
      },
      {
        "amount": "1 tsp",
        "commonName": "Chole Masala",
        "englishName": "chole masala powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Adrak",
        "englishName": "ginger, julienned"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Add soaked chickpeas, salt, bay leaf and 2 cups water to a cooker."
      },
      {
        "step": 2,
        "instruction": "Cook for 5 to 6 whistles, then let the pressure release naturally."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai. Add cumin and ginger and cook for 30 seconds."
      },
      {
        "step": 4,
        "instruction": "Add coriander powder, anardana, chole masala, chilli powder and turmeric."
      },
      {
        "step": 5,
        "instruction": "Add the cooked chickpeas with a little of their cooking water."
      },
      {
        "step": 6,
        "instruction": "Cook uncovered for 10 to 12 minutes until the masala coats the chickpeas and the gravy is mostly dry."
      },
      {
        "step": 7,
        "instruction": "Lightly press a few chickpeas with the back of a spoon to thicken the masala."
      },
      {
        "step": 8,
        "instruction": "Serve hot with bhature, poori or roti.",
        "tip": {
          "title": "Pindi chole should be fairly dry",
          "content": "Let the final stage cook uncovered so the spice mixture clings to the chickpeas instead of staying watery."
        }
      }
    ],
    "notes": [
      "Black tea is optional and mainly adds darker colour; skip it without changing the basic recipe."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 7,
      "carbs": 33,
      "fat": 9
    }
  },
  "rogan josh": {
    "dishName": "Rogan Josh",
    "description": "Home-style Kashmiri-inspired mutton curry with yogurt and warm spices, made tender in a pressure cooker.",
    "prepTime": "Approx. 1 hour",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "750 g",
        "commonName": "Mutton",
        "englishName": "mutton, curry-cut"
      },
      {
        "amount": "1 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt, whisked"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2",
        "commonName": "Elaichi",
        "englishName": "green cardamom"
      },
      {
        "amount": "1",
        "commonName": "Dalchini",
        "englishName": "cinnamon stick"
      },
      {
        "amount": "3",
        "commonName": "Laung",
        "englishName": "cloves"
      },
      {
        "amount": "1",
        "commonName": "Tej Patta",
        "englishName": "bay leaf"
      },
      {
        "amount": "2 tsp",
        "commonName": "Kashmiri Lal Mirch",
        "englishName": "Kashmiri red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Saunf Powder",
        "englishName": "fennel powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Sonth Powder",
        "englishName": "dry ginger powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Whisk the yogurt until smooth and keep it ready."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a cooker. Add cardamom, cinnamon, cloves and bay leaf."
      },
      {
        "step": 3,
        "instruction": "Add mutton and cook on medium-high heat for 6 to 8 minutes, stirring until lightly browned."
      },
      {
        "step": 4,
        "instruction": "Lower the heat. Add Kashmiri chilli, fennel powder, dry ginger powder and salt."
      },
      {
        "step": 5,
        "instruction": "Add yogurt slowly while stirring continuously so it does not split."
      },
      {
        "step": 6,
        "instruction": "Add water, close the cooker and cook for 5 to 6 whistles, until the mutton is tender."
      },
      {
        "step": 7,
        "instruction": "Let the pressure release naturally. Open and simmer uncovered for 5 minutes."
      },
      {
        "step": 8,
        "instruction": "Add garam masala and serve hot with rice or roti.",
        "tip": {
          "title": "Use Kashmiri chilli",
          "content": "It gives the curry its deep red color without making it extremely hot."
        }
      }
    ],
    "notes": [
      "Cook chicken, fish or minced meat until fully cooked through; the thickest piece should be opaque and no raw centre should remain."
    ],
    "nutrition": {
      "calories": 240,
      "protein": 7,
      "carbs": 35,
      "fat": 8
    }
  },
  "kulfi": {
    "dishName": "Kulfi",
    "description": "Creamy homemade cardamom-pistachio kulfi made by reducing milk and freezing it.",
    "prepTime": "Approx. 45 minutes plus freezing",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 litre",
        "commonName": "Doodh",
        "englishName": "full-fat milk"
      },
      {
        "amount": "1/3 cup",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Khoya",
        "englishName": "mawa, crumbled"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Elaichi Powder",
        "englishName": "cardamom powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Pista",
        "englishName": "pistachios, chopped"
      },
      {
        "amount": "a few strands",
        "commonName": "Kesar",
        "englishName": "saffron, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat milk in a deep kadai on medium heat and bring it to a gentle boil."
      },
      {
        "step": 2,
        "instruction": "Lower the heat and simmer for 25 to 30 minutes, stirring often, until the milk reduces noticeably."
      },
      {
        "step": 3,
        "instruction": "Add crumbled khoya and sugar. Stir until the khoya melts and the mixture becomes thick."
      },
      {
        "step": 4,
        "instruction": "Add cardamom and saffron if using. Cook for 2 more minutes."
      },
      {
        "step": 5,
        "instruction": "Turn off the heat and mix in most of the pistachios."
      },
      {
        "step": 6,
        "instruction": "Let the mixture cool completely, then pour into small freezer-safe moulds or cups."
      },
      {
        "step": 7,
        "instruction": "Freeze for at least 6 hours or until firm."
      },
      {
        "step": 8,
        "instruction": "Unmould and top with the remaining pistachios before serving.",
        "tip": {
          "title": "Cool before freezing",
          "content": "A fully cooled mixture freezes more evenly and reduces ice crystals."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 180,
      "protein": 7,
      "carbs": 20,
      "fat": 8
    }
  },
  "sushi (veg sushi)": {
    "dishName": "Sushi",
    "description": "Simple homemade vegetable sushi using seasoned rice, nori and crunchy vegetables.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Sushi Rice",
        "englishName": "short-grain rice"
      },
      {
        "amount": "2 sheets",
        "commonName": "Nori",
        "englishName": "nori sheets"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Sirka",
        "englishName": "rice vinegar"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1",
        "commonName": "Kheera",
        "englishName": "cucumber, thin strips"
      },
      {
        "amount": "1",
        "commonName": "Gajar",
        "englishName": "carrot, thin strips"
      },
      {
        "amount": "1/2",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, thin strips"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Mayonnaise",
        "englishName": "eggless mayonnaise, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse the rice until the water looks mostly clear."
      },
      {
        "step": 2,
        "instruction": "Cook the rice in a cooker with 1.25 cups water. Let it rest covered for 10 minutes."
      },
      {
        "step": 3,
        "instruction": "Mix vinegar, sugar and salt. Gently fold it into the warm rice and let the rice cool."
      },
      {
        "step": 4,
        "instruction": "Place one nori sheet on a clean flat surface and spread a thin layer of rice over it."
      },
      {
        "step": 5,
        "instruction": "Place cucumber, carrot and capsicum in a line near one edge. Add a little mayonnaise if using."
      },
      {
        "step": 6,
        "instruction": "Roll the nori tightly with your hands, pressing gently as you go."
      },
      {
        "step": 7,
        "instruction": "Moisten the nori edge with a little water to seal the roll."
      },
      {
        "step": 8,
        "instruction": "Slice into pieces with a sharp wet knife and serve immediately.",
        "tip": {
          "title": "Do not overfill",
          "content": "A thin rice layer and a small amount of filling make the roll much easier to close by hand."
        }
      }
    ],
    "notes": [
      "Soy sauce, pickled ginger or wasabi can be served on the side if you have them."
    ],
    "nutrition": {
      "calories": 250,
      "protein": 7,
      "carbs": 33,
      "fat": 10
    }
  },
  "vangi bath": {
    "dishName": "Vangi Bath",
    "description": "Karnataka-style brinjal rice made with cooked rice, eggplant and a tangy spice mix.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Chawal",
        "englishName": "rice"
      },
      {
        "amount": "2 cups",
        "commonName": "Baingan",
        "englishName": "small eggplant, sliced"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, sliced, optional"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Urad Dal",
        "englishName": "split black gram"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Moongfali",
        "englishName": "peanuts"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Hing",
        "englishName": "asafoetida"
      },
      {
        "amount": "1 tsp",
        "commonName": "Vangi Bath Masala",
        "englishName": "vangi bath masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Imli",
        "englishName": "tamarind pulp"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Gud",
        "englishName": "jaggery"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Cook rice in a cooker with 1.5 cups water and a little salt. Let it cool slightly."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Add mustard seeds, urad dal, peanuts, curry leaves and hing."
      },
      {
        "step": 3,
        "instruction": "Add eggplant and turmeric. Cook until the eggplant is tender."
      },
      {
        "step": 4,
        "instruction": "Add onion if using and cook for 2 to 3 minutes."
      },
      {
        "step": 5,
        "instruction": "Add vangi bath masala, tamarind pulp, jaggery and salt. Mix well."
      },
      {
        "step": 6,
        "instruction": "Cook for 3 to 4 minutes until the masala becomes thick."
      },
      {
        "step": 7,
        "instruction": "Add cooked rice and gently mix until well coated."
      },
      {
        "step": 8,
        "instruction": "Cook on low heat for 3 minutes and serve warm.",
        "tip": {
          "title": "Use slightly cool rice",
          "content": "Freshly cooked rice can turn soft while mixing. Letting it cool a little keeps the grains separate."
        }
      }
    ],
    "notes": [
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 430,
      "protein": 13,
      "carbs": 63,
      "fat": 14
    }
  },
  "sambar": {
    "dishName": "Sambar",
    "description": "Everyday South Indian sambar made with toor dal, vegetables, tamarind and a simple tempering.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3/4 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, beans, pumpkin or drumstick"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Sambar Masala",
        "englishName": "sambar powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Imli",
        "englishName": "tamarind pulp"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "2",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chillies"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "4 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the toor dal and add it to a cooker with turmeric and 2.5 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 4 whistles and let the pressure release naturally."
      },
      {
        "step": 3,
        "instruction": "Mash the dal lightly. Add vegetables, tomato, onion, salt and 1 cup water."
      },
      {
        "step": 4,
        "instruction": "Simmer until the vegetables are tender, about 10 to 12 minutes."
      },
      {
        "step": 5,
        "instruction": "Add sambar powder and tamarind pulp. Simmer for 5 minutes."
      },
      {
        "step": 6,
        "instruction": "Heat oil in a kadai. Add mustard, cumin, dried chillies and curry leaves."
      },
      {
        "step": 7,
        "instruction": "Pour the tempering into the sambar and mix well."
      },
      {
        "step": 8,
        "instruction": "Simmer for 2 minutes and serve hot with rice, idli or dosa.",
        "tip": {
          "title": "Adjust the thickness",
          "content": "Sambar should be pourable. Add a little hot water if it becomes too thick while standing."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 250,
      "protein": 7,
      "carbs": 35,
      "fat": 9
    }
  },
  "parippu curry": {
    "dishName": "Parippu Curry",
    "description": "Kerala-style yellow dal cooked with mild spices and coconut for a simple home meal.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Peeli Moong Dal",
        "englishName": "split yellow moong dal"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Nariyal",
        "englishName": "grated coconut"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "plain yogurt, optional"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "2",
        "commonName": "Sukhi Lal Mirch",
        "englishName": "dried red chillies"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "2.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the moong dal and add it to a cooker with turmeric, salt and 2.5 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 3 whistles and let the pressure release naturally."
      },
      {
        "step": 3,
        "instruction": "Grind coconut, cumin and green chilli with a little water into a coarse paste."
      },
      {
        "step": 4,
        "instruction": "Stir the coconut paste into the cooked dal."
      },
      {
        "step": 5,
        "instruction": "Simmer on low heat for 5 minutes. Add yogurt if using and keep the heat very low."
      },
      {
        "step": 6,
        "instruction": "Heat ghee in a kadai. Add mustard seeds, curry leaves and dried red chillies."
      },
      {
        "step": 7,
        "instruction": "Pour the tempering over the dal and mix."
      },
      {
        "step": 8,
        "instruction": "Serve hot with rice.",
        "tip": {
          "title": "Keep yogurt optional",
          "content": "The dal tastes good without yogurt too. Add it only for extra tang and creaminess."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 380,
      "protein": 12,
      "carbs": 42,
      "fat": 18
    }
  },
  "benne dosa": {
    "dishName": "Benne Dosa",
    "description": "Buttery South Indian dosa made from fermented dosa batter and cooked crisp on.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Dosa Batter",
        "englishName": "fermented dosa batter"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Paani",
        "englishName": "water, as needed"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Stir the dosa batter. Add a little water if it is very thick."
      },
      {
        "step": 2,
        "instruction": "Heat a tawa on medium-high heat and lightly grease it with butter."
      },
      {
        "step": 3,
        "instruction": "Pour a ladle of batter in the center and spread it into a thin circle."
      },
      {
        "step": 4,
        "instruction": "Add a little butter around the edges and on top."
      },
      {
        "step": 5,
        "instruction": "Cook until the underside is golden and the edges look crisp."
      },
      {
        "step": 6,
        "instruction": "Fold and serve hot. Repeat with the remaining batter.",
        "tip": {
          "title": "Use a hot tawa",
          "content": "The batter should sizzle when it touches the tawa. A hot surface helps create the crisp edges."
        }
      }
    ],
    "notes": [
      "For benne masala dosa, add a spoonful of potato masala before folding.",
      "Store-bought fermented batter is fine for a quicker version."
    ],
    "nutrition": {
      "calories": 290,
      "protein": 12,
      "carbs": 27,
      "fat": 15
    }
  },
  "rava dosa": {
    "dishName": "Rava Dosa",
    "description": "Thin, crisp South Indian dosa made from semolina and rice flour with cumin.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Rava",
        "englishName": "fine semolina"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Chawal Flour",
        "englishName": "rice flour"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "3 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "oil, for cooking"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix rava, rice flour, maida, cumin, chilli and salt."
      },
      {
        "step": 2,
        "instruction": "Add water slowly and whisk into a very thin, watery batter."
      },
      {
        "step": 3,
        "instruction": "Rest the batter for 15 minutes. Stir again before cooking."
      },
      {
        "step": 4,
        "instruction": "Heat a tawa well. Pour the batter from a little height, starting around the edges."
      },
      {
        "step": 5,
        "instruction": "Fill any gaps with a little batter. Drizzle a few drops of oil."
      },
      {
        "step": 6,
        "instruction": "Cook until the dosa is crisp and golden. Do not flip."
      },
      {
        "step": 7,
        "instruction": "Lift gently and serve hot. Stir the batter before each dosa.",
        "tip": {
          "title": "Keep the batter thin",
          "content": "Rava dosa batter should be much thinner than regular dosa batter. Add water if it thickens while standing."
        }
      }
    ],
    "notes": [
      "Store-bought fermented batter is fine for a quicker version."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 11,
      "carbs": 39,
      "fat": 9
    }
  },
  "thatte idli": {
    "dishName": "Thatte Idli",
    "description": "Soft, flat Karnataka-style idli made from fermented rice and urad dal batter and.",
    "prepTime": "Approx. 30 minutes plus fermentation",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Idli Batter",
        "englishName": "fermented idli batter"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Paani",
        "englishName": "water, as needed"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Stir the idli batter gently. Add a little water if it is too thick to spread."
      },
      {
        "step": 2,
        "instruction": "Grease shallow heat-safe plates and pour batter to a medium thickness."
      },
      {
        "step": 3,
        "instruction": "Add water to a cooker and place the plates inside."
      },
      {
        "step": 4,
        "instruction": "Cover and steam without pressure for 10 to 12 minutes."
      },
      {
        "step": 5,
        "instruction": "Check with a knife. It should come out clean."
      },
      {
        "step": 6,
        "instruction": "Let the idli cool for 2 minutes, then loosen the edges and remove."
      },
      {
        "step": 7,
        "instruction": "Serve hot with sambar or chutney.",
        "tip": {
          "title": "Do not overfill",
          "content": "Leave some space in the plate because the batter rises while steaming."
        }
      }
    ],
    "notes": [
      "Store-bought fermented batter is fine for a quicker version."
    ],
    "nutrition": {
      "calories": 280,
      "protein": 10,
      "carbs": 40,
      "fat": 9
    }
  },
  "bisi bele bath": {
    "dishName": "Bisi Bele Bath",
    "description": "Karnataka-style rice and lentils cooked with vegetables, tamarind and a warm spice mix.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1/2 cup",
        "commonName": "Chawal",
        "englishName": "rice"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, beans, peas and capsicum"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1.5 tbsp",
        "commonName": "Bisi Bele Bath Masala",
        "englishName": "bisi bele bath masala"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Imli",
        "englishName": "tamarind pulp"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Moongfali",
        "englishName": "peanuts"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "4 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash rice and dal together. Add them to a cooker with turmeric and 3 cups water."
      },
      {
        "step": 2,
        "instruction": "Cook for 4 whistles and let the pressure release naturally."
      },
      {
        "step": 3,
        "instruction": "Add vegetables, tomato, onion, salt and 1 cup water to the cooker."
      },
      {
        "step": 4,
        "instruction": "Cook for 1 more whistle, then release the pressure."
      },
      {
        "step": 5,
        "instruction": "Add bisi bele bath masala and tamarind pulp. Mix well."
      },
      {
        "step": 6,
        "instruction": "Simmer on the stove for 5 minutes. Add hot water if the mixture is too thick."
      },
      {
        "step": 7,
        "instruction": "Heat ghee in a kadai and lightly roast the peanuts for 1 minute."
      },
      {
        "step": 8,
        "instruction": "Pour the peanut tempering over the bisi bele bath and serve hot.",
        "tip": {
          "title": "Expect it to thicken",
          "content": "Bisi bele bath becomes thicker as it sits. Keep it a little loose while cooking."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 220,
      "protein": 2,
      "carbs": 33,
      "fat": 9
    }
  },
  "khara bath": {
    "dishName": "Khara Bath",
    "description": "Savory Karnataka-style semolina breakfast made with vegetables, spices and a simple tempering.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Rava",
        "englishName": "semolina"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, peas and beans"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Urad Dal",
        "englishName": "split black gram"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Vangi Bath Masala",
        "englishName": "bath masala or sambar powder"
      },
      {
        "amount": "2.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dry roast rava in a kadai on low heat for 3 to 4 minutes. Set aside."
      },
      {
        "step": 2,
        "instruction": "Heat ghee in the same kadai. Add mustard seeds and urad dal."
      },
      {
        "step": 3,
        "instruction": "Add curry leaves, green chilli and onion. Cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add vegetables and cook for 3 to 4 minutes."
      },
      {
        "step": 5,
        "instruction": "Add water, salt and masala. Bring to a boil."
      },
      {
        "step": 6,
        "instruction": "Lower the heat and slowly add roasted rava while stirring continuously."
      },
      {
        "step": 7,
        "instruction": "Cover and cook for 3 to 4 minutes until fluffy."
      },
      {
        "step": 8,
        "instruction": "Mix gently and serve hot.",
        "tip": {
          "title": "Avoid lumps",
          "content": "Keep stirring while adding the rava slowly. This is the easiest way to get smooth khara bath."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 220,
      "protein": 3,
      "carbs": 32,
      "fat": 9
    }
  },
  "puliyogare": {
    "dishName": "Puliyogare",
    "description": "Tangy Karnataka-style tamarind rice made with peanuts, sesame and a simple spice mix.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 cups",
        "commonName": "Pakka Chawal",
        "englishName": "cooked rice"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Imli",
        "englishName": "thick tamarind pulp"
      },
      {
        "amount": "1 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Urad Dal",
        "englishName": "split black gram"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Moongfali",
        "englishName": "peanuts"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Til",
        "englishName": "sesame seeds"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Puliyogare Powder",
        "englishName": "puliyogare spice powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Gud",
        "englishName": "jaggery"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai. Add mustard seeds and let them pop."
      },
      {
        "step": 2,
        "instruction": "Add urad dal, peanuts, sesame seeds and curry leaves. Cook until lightly golden."
      },
      {
        "step": 3,
        "instruction": "Add turmeric and puliyogare powder. Stir for 20 seconds."
      },
      {
        "step": 4,
        "instruction": "Add tamarind pulp, jaggery, salt and 1/4 cup water."
      },
      {
        "step": 5,
        "instruction": "Cook for 3 to 4 minutes until the mixture becomes thick and glossy."
      },
      {
        "step": 6,
        "instruction": "Add cooked rice and mix gently."
      },
      {
        "step": 7,
        "instruction": "Cook on low heat for 2 minutes, then turn off the stove."
      },
      {
        "step": 8,
        "instruction": "Let it rest for 5 minutes before serving.",
        "tip": {
          "title": "Let it rest",
          "content": "Puliyogare tastes better after a few minutes of resting because the tamarind masala spreads through the rice."
        }
      }
    ],
    "notes": [
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 4,
      "carbs": 28,
      "fat": 10
    }
  },
  "aloo palya": {
    "dishName": "Aloo Palya",
    "description": "Simple Karnataka-style potato stir-fry with mustard, curry leaves and a little chilli.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and cubed"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Urad Dal",
        "englishName": "split black gram"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Nariyal",
        "englishName": "grated coconut, optional"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai. Add mustard seeds and let them pop."
      },
      {
        "step": 2,
        "instruction": "Add urad dal, green chilli and curry leaves. Cook until the dal turns light golden."
      },
      {
        "step": 3,
        "instruction": "Add turmeric and red chilli powder."
      },
      {
        "step": 4,
        "instruction": "Add boiled potato cubes and salt. Toss gently."
      },
      {
        "step": 5,
        "instruction": "Cook uncovered for 6 to 8 minutes until the edges turn lightly crisp."
      },
      {
        "step": 6,
        "instruction": "Add coconut if using and mix for 1 minute."
      },
      {
        "step": 7,
        "instruction": "Serve hot as a side with dosa, rice or roti.",
        "tip": {
          "title": "Do not over-stir",
          "content": "Boiled potatoes can break easily. Toss gently instead of stirring constantly."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 180,
      "protein": 8,
      "carbs": 19,
      "fat": 8
    }
  },
  "dal chawal": {
    "dishName": "Dal Chawal",
    "description": "Simple home-style yellow dal served with soft steamed rice.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Basmati Chawal",
        "englishName": "basmati rice"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 medium",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1 medium",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Ghee",
        "englishName": "ghee"
      },
      {
        "amount": "3.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse the rice and dal separately until the water is mostly clear."
      },
      {
        "step": 2,
        "instruction": "Add rice to the cooker with 2 cups water. Cook for 2 whistles and let pressure release."
      },
      {
        "step": 3,
        "instruction": "Add dal, turmeric, salt and 1.5 cups water to the cooker. Cook for 4 whistles and let pressure release."
      },
      {
        "step": 4,
        "instruction": "Heat ghee in a kadai. Add cumin, onion and green chilli. Cook until the onion softens."
      },
      {
        "step": 5,
        "instruction": "Add tomato and cook until soft and mushy."
      },
      {
        "step": 6,
        "instruction": "Add the cooked dal and a little water. Simmer for 4 to 5 minutes.",
        "tip": {
          "title": "Easy dal",
          "content": "Keep the dal a little thinner than you want. It thickens as it sits."
        }
      },
      {
        "step": 7,
        "instruction": "Garnish with coriander and serve hot with the rice."
      }
    ],
    "notes": [
      "Add a squeeze of lemon if you like a brighter dal.",
      "Let cooked rice rest covered for about 5 minutes before fluffing; this helps the grains settle and stay separate."
    ],
    "nutrition": {
      "calories": 300,
      "protein": 15,
      "carbs": 44,
      "fat": 7
    }
  },
  "aloo sabzi": {
    "dishName": "Aloo Sabzi",
    "description": "Simple dry potato sabzi with cumin, turmeric and chilli for an everyday meal.",
    "prepTime": "Approx. 25 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and cubed"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "as needed",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add green chilli and cook for 20 seconds."
      },
      {
        "step": 3,
        "instruction": "Add turmeric, chilli powder and coriander powder. Stir for 10 seconds."
      },
      {
        "step": 4,
        "instruction": "Add boiled potatoes and salt. Toss gently so the potatoes stay in pieces."
      },
      {
        "step": 5,
        "instruction": "Cook uncovered for 6 to 8 minutes until the edges turn lightly crisp.",
        "tip": {
          "title": "Keep it dry",
          "content": "Do not add water. A dry aloo sabzi is faster and tastes better with crisp edges."
        }
      },
      {
        "step": 6,
        "instruction": "Garnish with coriander and serve with roti or dal rice."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 150,
      "protein": 3,
      "carbs": 30,
      "fat": 2
    }
  },
  "bread butter": {
    "dishName": "Bread Butter",
    "description": "Quick toasted bread spread with butter, perfect for breakfast or a snack.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 slices",
        "commonName": "Bread",
        "englishName": "bread slices"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Makhan",
        "englishName": "butter"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat a tawa on low to medium heat."
      },
      {
        "step": 2,
        "instruction": "Toast the bread for about 1 minute on each side."
      },
      {
        "step": 3,
        "instruction": "Spread butter on the hot bread and serve.",
        "tip": {
          "title": "Keep it crisp",
          "content": "Use medium heat so the bread browns without burning."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 230,
      "protein": 9,
      "carbs": 26,
      "fat": 10
    }
  },
  "bread jam": {
    "dishName": "Bread Jam",
    "description": "Quick toasted bread spread with fruit jam for an easy breakfast or snack.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 slices",
        "commonName": "Bread",
        "englishName": "bread slices"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Jam",
        "englishName": "fruit jam"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat a tawa on low to medium heat."
      },
      {
        "step": 2,
        "instruction": "Toast the bread lightly on both sides."
      },
      {
        "step": 3,
        "instruction": "Spread jam over the warm bread and serve."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 390,
      "protein": 18,
      "carbs": 52,
      "fat": 12
    }
  },
  "bread honey": {
    "dishName": "Bread Honey",
    "description": "Simple toasted bread finished with honey for a quick sweet snack.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4 slices",
        "commonName": "Bread",
        "englishName": "bread slices"
      },
      {
        "amount": "3 tbsp",
        "commonName": "Shehad",
        "englishName": "honey"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat a tawa on low to medium heat."
      },
      {
        "step": 2,
        "instruction": "Toast the bread lightly on both sides."
      },
      {
        "step": 3,
        "instruction": "Drizzle honey over the warm bread and serve.",
        "tip": {
          "title": "Do not overheat honey",
          "content": "Add honey after toasting so it stays easy to spread."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 330,
      "protein": 7,
      "carbs": 53,
      "fat": 10
    }
  },
  "dahi (homemade curd)": {
    "dishName": "Dahi (Homemade Curd)",
    "description": "Fresh homemade curd made by setting milk with a little existing curd.",
    "prepTime": "Approx. 15 minutes active (plus 6 to 8 hours setting)",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 litre",
        "commonName": "Doodh",
        "englishName": "full-fat milk"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Dahi",
        "englishName": "plain curd, as starter"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat milk on the stove until it comes to a full boil."
      },
      {
        "step": 2,
        "instruction": "Let the milk cool until comfortably warm, not hot. Stir the starter curd into the milk until evenly mixed, then cover the bowl.",
        "tip": {
          "title": "Important",
          "content": "Very hot milk can kill the cultures and stop the curd from setting."
        }
      },
      {
        "step": 3,
        "instruction": "Cover and keep the milk in a warm place for 6 to 8 hours without moving it."
      },
      {
        "step": 4,
        "instruction": "Once set, refrigerate the curd before serving."
      }
    ],
    "notes": [
      "Use a spoonful of fresh plain curd as the starter for the next batch.",
      "Milk that is too hot can weaken the starter; use comfortably warm milk."
    ],
    "nutrition": {
      "calories": 450,
      "protein": 12,
      "carbs": 60,
      "fat": 18
    }
  },
  "mutter poha (peas poha)": {
    "dishName": "Mutter Poha",
    "description": "Light flattened rice cooked with green peas, onion, peanuts and lemon.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Poha",
        "englishName": "flattened rice"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Matar",
        "englishName": "green peas"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Moongfali",
        "englishName": "peanuts"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "a few",
        "commonName": "Kadi Patta",
        "englishName": "curry leaves"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1",
        "commonName": "Nimbu",
        "englishName": "lemon"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse poha in a strainer until soft. Do not soak it."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Add mustard seeds and let them pop."
      },
      {
        "step": 3,
        "instruction": "Add peanuts, curry leaves, green chilli and onion. Cook until the onion softens."
      },
      {
        "step": 4,
        "instruction": "Add peas, turmeric and salt. Cook for 3 to 4 minutes."
      },
      {
        "step": 5,
        "instruction": "Add the poha and toss gently. Cover and cook for 2 minutes.",
        "tip": {
          "title": "Keep it fluffy",
          "content": "Do not stir the poha too much after adding it."
        }
      },
      {
        "step": 6,
        "instruction": "Turn off the stove, add lemon juice and mix gently."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 220,
      "protein": 6,
      "carbs": 22,
      "fat": 12
    }
  },
  "mixed veg sabzi": {
    "dishName": "Mixed Veg Sabzi",
    "description": "Simple everyday mixed vegetables cooked with onion, tomato and mild spices.",
    "prepTime": "Approx. 30 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Aloo",
        "englishName": "potato, cubed"
      },
      {
        "amount": "1 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot, beans, peas and cauliflower"
      },
      {
        "amount": "1",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat oil in a kadai and add cumin seeds."
      },
      {
        "step": 2,
        "instruction": "Add onion and cook until soft and lightly golden."
      },
      {
        "step": 3,
        "instruction": "Add ginger-garlic paste and cook for 30 seconds."
      },
      {
        "step": 4,
        "instruction": "Add tomato, turmeric, coriander powder and chilli powder. Cook until soft."
      },
      {
        "step": 5,
        "instruction": "Add potato, mixed vegetables and salt. Toss well."
      },
      {
        "step": 6,
        "instruction": "Add water, cover and cook on low heat for 12 to 15 minutes until the vegetables are tender.",
        "tip": {
          "title": "Check the vegetables",
          "content": "Add another splash of water if the pan gets dry before the vegetables are cooked."
        }
      },
      {
        "step": 7,
        "instruction": "Open the lid and cook for 2 minutes to remove excess moisture."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 280,
      "protein": 7,
      "carbs": 38,
      "fat": 11
    }
  },
  "shukto": {
    "dishName": "Shukto",
    "description": "Bengali-style mixed vegetable curry with bitter gourd and a gentle mustard finish.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 small",
        "commonName": "Karela",
        "englishName": "bitter gourd, sliced"
      },
      {
        "amount": "1 medium",
        "commonName": "Aloo",
        "englishName": "potato, cubed"
      },
      {
        "amount": "1 small",
        "commonName": "Kacha Kela",
        "englishName": "raw banana, cubed"
      },
      {
        "amount": "1 small",
        "commonName": "Baingan",
        "englishName": "eggplant, cubed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Mooli",
        "englishName": "radish, sliced"
      },
      {
        "amount": "1 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Methi",
        "englishName": "fenugreek seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Sarson",
        "englishName": "yellow mustard seeds for paste"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Nariyal",
        "englishName": "grated coconut"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Doodh",
        "englishName": "milk"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "mustard oil or cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "water"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Soak the mustard seeds in a little water for 10 minutes, then grind them with coconut into a smooth paste."
      },
      {
        "step": 2,
        "instruction": "Heat oil in a kadai. Add fenugreek and cumin seeds and let them sizzle."
      },
      {
        "step": 3,
        "instruction": "Add bitter gourd and cook for 2 minutes."
      },
      {
        "step": 4,
        "instruction": "Add potato, raw banana, eggplant and radish. Toss for 3 minutes."
      },
      {
        "step": 5,
        "instruction": "Add turmeric, salt and water. Cover and cook on low heat until the vegetables are tender."
      },
      {
        "step": 6,
        "instruction": "Lower the heat. Stir in mustard-coconut paste and milk.",
        "tip": {
          "title": "Keep it gentle",
          "content": "Do not boil hard after adding the milk and mustard paste."
        }
      },
      {
        "step": 7,
        "instruction": "Simmer for 3 to 4 minutes and turn off the stove."
      }
    ],
    "notes": [
      "Shukto should be mildly bitter, creamy and light rather than spicy."
    ],
    "nutrition": {
      "calories": 290,
      "protein": 7,
      "carbs": 43,
      "fat": 10
    }
  },
  "vermicelli (masala seviyan)": {
    "dishName": "Vermicelli (Masala Seviyan)",
    "description": "Quick savory vermicelli cooked with vegetables, peanuts and simple Indian spices.",
    "prepTime": "Approx. 20 minutes",
    "equipment": [
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Vermicelli",
        "englishName": "thin vermicelli"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, chopped"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "peas, carrot and beans, chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Moongfali",
        "englishName": "peanuts"
      },
      {
        "amount": "1/4 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2.5 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1",
        "commonName": "Nimbu",
        "englishName": "lemon"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dry roast the vermicelli in a kadai for 2 to 3 minutes. Set it aside."
      },
      {
        "step": 2,
        "instruction": "Heat oil and add mustard seeds, cumin seeds and peanuts. Cook until the peanuts turn lightly golden."
      },
      {
        "step": 3,
        "instruction": "Add onion and green chilli. Cook until soft."
      },
      {
        "step": 4,
        "instruction": "Add vegetables, turmeric and salt. Cook for 3 minutes."
      },
      {
        "step": 5,
        "instruction": "Add water and bring it to a boil."
      },
      {
        "step": 6,
        "instruction": "Add roasted vermicelli and stir. Cover and cook on low heat for 4 to 5 minutes until the water is absorbed.",
        "tip": {
          "title": "Avoid mushy seviyan",
          "content": "Turn off the stove as soon as the water is absorbed."
        }
      },
      {
        "step": 7,
        "instruction": "Add lemon juice, fluff gently and serve."
      }
    ],
    "notes": [
      "This is the savory Indian breakfast-style version."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 16,
      "carbs": 42,
      "fat": 10
    }
  },
  "chocolate cake": {
    "dishName": "Chocolate Cake",
    "description": "Easy eggless chocolate cake made in a home oven with cocoa and curd.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Cocoa Powder",
        "englishName": "unsweetened cocoa powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Baking Powder",
        "englishName": "baking powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Dahi",
        "englishName": "thick curd"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Doodh",
        "englishName": "milk"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Tel",
        "englishName": "neutral oil"
      },
      {
        "amount": "1 tsp",
        "commonName": "Vanilla",
        "englishName": "vanilla essence"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Chocolate Chips",
        "englishName": "chocolate chips, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Preheat the oven to 180°C."
      },
      {
        "step": 2,
        "instruction": "Mix flour, cocoa, baking powder and baking soda in one bowl."
      },
      {
        "step": 3,
        "instruction": "In another bowl, mix curd, sugar, oil, milk and vanilla until smooth."
      },
      {
        "step": 4,
        "instruction": "Add the dry ingredients to the wet mixture. Mix just until the flour disappears.",
        "tip": {
          "title": "Do not overmix",
          "content": "Over-mixing can make the cake dense."
        }
      },
      {
        "step": 5,
        "instruction": "Pour into a greased cake tin. Add chocolate chips if using."
      },
      {
        "step": 6,
        "instruction": "Bake at 180°C for 30 to 35 minutes until a knife comes out clean."
      },
      {
        "step": 7,
        "instruction": "Cool for 15 minutes before removing and slicing."
      }
    ],
    "notes": [
      "Let the cake cool in the pan for 10 minutes, then cool completely on a rack before slicing or frosting."
    ],
    "nutrition": {
      "calories": 350,
      "protein": 20,
      "carbs": 36,
      "fat": 14
    }
  },
  "strawberry cake": {
    "dishName": "Strawberry Cake",
    "description": "Simple eggless vanilla cake topped with fresh strawberries and lightly sweetened cream.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "thick curd"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Doodh",
        "englishName": "milk"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Tel",
        "englishName": "neutral oil"
      },
      {
        "amount": "1 tsp",
        "commonName": "Baking Powder",
        "englishName": "baking powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "1 tsp",
        "commonName": "Vanilla",
        "englishName": "vanilla essence"
      },
      {
        "amount": "1 cup",
        "commonName": "Strawberry",
        "englishName": "fresh strawberries, sliced"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Malai",
        "englishName": "fresh cream"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Preheat the oven to 180°C."
      },
      {
        "step": 2,
        "instruction": "Mix flour, baking powder and baking soda."
      },
      {
        "step": 3,
        "instruction": "Mix curd, sugar, milk, oil and vanilla until smooth."
      },
      {
        "step": 4,
        "instruction": "Fold the dry mixture into the wet mixture until just combined."
      },
      {
        "step": 5,
        "instruction": "Pour into a greased cake tin and bake for 30 to 35 minutes."
      },
      {
        "step": 6,
        "instruction": "Cool the cake fully."
      },
      {
        "step": 7,
        "instruction": "Top with lightly whipped cream and sliced strawberries.",
        "tip": {
          "title": "Cool before topping",
          "content": "Warm cake can melt the cream and make the topping slide."
        }
      }
    ],
    "notes": [
      "Use chilled cream and fresh strawberries for the easiest topping.",
      "Let the cake cool in the pan for 10 minutes, then cool completely on a rack before slicing or frosting."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 20,
      "carbs": 33,
      "fat": 12
    }
  },
  "pineapple cake": {
    "dishName": "Pineapple Cake",
    "description": "Easy eggless sponge topped with pineapple pieces and lightly sweetened cream.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "thick curd"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Doodh",
        "englishName": "milk"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Tel",
        "englishName": "neutral oil"
      },
      {
        "amount": "1 tsp",
        "commonName": "Baking Powder",
        "englishName": "baking powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Baking Soda",
        "englishName": "baking soda"
      },
      {
        "amount": "1 tsp",
        "commonName": "Vanilla",
        "englishName": "vanilla essence"
      },
      {
        "amount": "1 cup",
        "commonName": "Ananas",
        "englishName": "pineapple pieces, drained"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Malai",
        "englishName": "fresh cream"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Preheat the oven to 180°C."
      },
      {
        "step": 2,
        "instruction": "Mix flour, baking powder and baking soda."
      },
      {
        "step": 3,
        "instruction": "Mix curd, sugar, milk, oil and vanilla until smooth."
      },
      {
        "step": 4,
        "instruction": "Fold the dry mixture into the wet mixture until just combined."
      },
      {
        "step": 5,
        "instruction": "Pour into a greased cake tin and bake for 30 to 35 minutes."
      },
      {
        "step": 6,
        "instruction": "Cool the cake fully."
      },
      {
        "step": 7,
        "instruction": "Top with cream and drained pineapple pieces.",
        "tip": {
          "title": "Drain the fruit well",
          "content": "Extra pineapple juice can make the cake soggy."
        }
      }
    ],
    "notes": [
      "Let the cake cool in the pan for 10 minutes, then cool completely on a rack before slicing or frosting."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 18,
      "carbs": 33,
      "fat": 13
    }
  },
  "aamti": {
    "dishName": "Aamti",
    "description": "Maharashtrian-style toor dal with goda masala, tamarind and a little jaggery.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "kadai",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Toor Dal",
        "englishName": "split pigeon peas"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1 tsp",
        "commonName": "Jeera",
        "englishName": "cumin seeds"
      },
      {
        "amount": "1 tsp",
        "commonName": "Rai",
        "englishName": "mustard seeds"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Goda Masala",
        "englishName": "Maharashtrian goda masala"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Imli",
        "englishName": "tamarind pulp"
      },
      {
        "amount": "1 tsp",
        "commonName": "Gud",
        "englishName": "jaggery"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Nariyal",
        "englishName": "grated coconut"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "oil"
      },
      {
        "amount": "4 cups",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Rinse the toor dal and cook it in a cooker with turmeric and 3 cups water for 4 to 5 whistles."
      },
      {
        "step": 2,
        "instruction": "Let the pressure release, then lightly mash the dal."
      },
      {
        "step": 3,
        "instruction": "Heat oil in a kadai. Add mustard seeds and cumin seeds."
      },
      {
        "step": 4,
        "instruction": "Add goda masala and stir for 15 seconds."
      },
      {
        "step": 5,
        "instruction": "Add dal, tamarind, jaggery, coconut and salt."
      },
      {
        "step": 6,
        "instruction": "Add water as needed and simmer for 8 to 10 minutes.",
        "tip": {
          "title": "Balance the flavor",
          "content": "Aamti should taste mildly sweet, tangy and spiced. Adjust jaggery or tamarind at the end."
        }
      },
      {
        "step": 7,
        "instruction": "Serve hot with steamed rice."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 450,
      "protein": 12,
      "carbs": 60,
      "fat": 18
    }
  },
  "gobhi paratha": {
    "dishName": "Gobhi Paratha",
    "description": "Whole-wheat flatbread stuffed with spiced grated cauliflower and cooked on a tawa.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Atta",
        "englishName": "whole wheat flour"
      },
      {
        "amount": "2 cups",
        "commonName": "Gobi",
        "englishName": "cauliflower, finely grated"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "oil or ghee"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix atta, a pinch of salt and enough water to make a soft dough. Rest for 15 minutes."
      },
      {
        "step": 2,
        "instruction": "Squeeze excess water from grated cauliflower."
      },
      {
        "step": 3,
        "instruction": "Mix cauliflower with chilli, spices, coriander and salt."
      },
      {
        "step": 4,
        "instruction": "Take a dough ball, flatten it and place filling in the centre. Bring the edges together and seal."
      },
      {
        "step": 5,
        "instruction": "Flatten gently and place on a hot tawa."
      },
      {
        "step": 6,
        "instruction": "Cook both sides, adding a little oil or ghee, until golden spots appear.",
        "tip": {
          "title": "Avoid soggy filling",
          "content": "Squeeze the cauliflower well before making the filling."
        }
      },
      {
        "step": 7,
        "instruction": "Serve hot with curd or pickle."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 380,
      "protein": 11,
      "carbs": 57,
      "fat": 12
    }
  },
  "mooli paratha": {
    "dishName": "Mooli Paratha",
    "description": "Whole-wheat flatbread stuffed with spiced grated radish and cooked on a tawa.",
    "prepTime": "Approx. 40 minutes",
    "equipment": [
      {
        "item": "tawa",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Atta",
        "englishName": "whole wheat flour"
      },
      {
        "amount": "2 cups",
        "commonName": "Mooli",
        "englishName": "radish, grated"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, chopped"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Ajwain",
        "englishName": "carom seeds"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Amchur",
        "englishName": "dry mango powder"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Hara Dhaniya",
        "englishName": "coriander leaves, chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tel",
        "englishName": "oil or ghee"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Make a soft dough with atta, salt and water. Rest for 15 minutes."
      },
      {
        "step": 2,
        "instruction": "Squeeze as much water as possible from the grated radish."
      },
      {
        "step": 3,
        "instruction": "Mix radish with chilli, spices, coriander and salt."
      },
      {
        "step": 4,
        "instruction": "Fill a dough ball with the radish mixture and seal it."
      },
      {
        "step": 5,
        "instruction": "Flatten gently and cook on a hot tawa."
      },
      {
        "step": 6,
        "instruction": "Cook both sides with a little oil or ghee until golden.",
        "tip": {
          "title": "Keep the filling dry",
          "content": "Radish releases water quickly, so mix the salt into the filling just before stuffing."
        }
      },
      {
        "step": 7,
        "instruction": "Serve hot with curd or pickle."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 220,
      "protein": 6,
      "carbs": 26,
      "fat": 10
    }
  },
  "paneer momos": {
    "dishName": "Paneer Momos",
    "description": "Soft steamed dumplings filled with paneer, cabbage and simple spices, easy to make at home.",
    "prepTime": "Approx. 50 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "200 g",
        "commonName": "Paneer",
        "englishName": "crumbled paneer"
      },
      {
        "amount": "1 cup",
        "commonName": "Patta Gobhi",
        "englishName": "cabbage, finely chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak",
        "englishName": "ginger, finely chopped"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Soya Sauce",
        "englishName": "soy sauce"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kali Mirch",
        "englishName": "black pepper"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix maida, a pinch of salt and enough water to make a soft dough. Rest for 20 minutes."
      },
      {
        "step": 2,
        "instruction": "Mix paneer, cabbage, onion, ginger, chilli, soy sauce, pepper and salt."
      },
      {
        "step": 3,
        "instruction": "Divide the dough into small balls and flatten each one into a thin circle."
      },
      {
        "step": 4,
        "instruction": "Place a little filling in the centre and fold the edges to seal the momo."
      },
      {
        "step": 5,
        "instruction": "Add 2 to 3 cups water to a cooker and place the momos on a lightly greased plate above the water."
      },
      {
        "step": 6,
        "instruction": "Cover and steam for 10 to 12 minutes until the wrappers look slightly glossy.",
        "tip": {
          "title": "Steam, do not boil",
          "content": "Keep the momos above the water so they steam gently."
        }
      },
      {
        "step": 7,
        "instruction": "Serve hot with red chilli chutney."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 210,
      "protein": 5,
      "carbs": 27,
      "fat": 9
    }
  },
  "chicken momos": {
    "dishName": "Chicken Momos",
    "description": "Steamed dumplings filled with seasoned chicken and vegetables, made in a home cooker.",
    "prepTime": "Approx. 55 minutes",
    "equipment": [
      {
        "item": "cooker",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "250 g",
        "commonName": "Chicken",
        "englishName": "chicken mince"
      },
      {
        "amount": "1 cup",
        "commonName": "Patta Gobhi",
        "englishName": "cabbage, finely chopped"
      },
      {
        "amount": "1 small",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1",
        "commonName": "Hari Mirch",
        "englishName": "green chilli, finely chopped"
      },
      {
        "amount": "1 tsp",
        "commonName": "Soya Sauce",
        "englishName": "soy sauce"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Kali Mirch",
        "englishName": "black pepper"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "as needed",
        "commonName": "Paani",
        "englishName": "water"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix maida, a pinch of salt and enough water to make a soft dough. Rest for 20 minutes."
      },
      {
        "step": 2,
        "instruction": "Mix chicken mince, cabbage, onion, ginger-garlic paste, chilli, soy sauce, pepper and salt."
      },
      {
        "step": 3,
        "instruction": "Roll small dough balls into thin circles."
      },
      {
        "step": 4,
        "instruction": "Place a little filling in the centre and seal the edges tightly."
      },
      {
        "step": 5,
        "instruction": "Add water to a cooker and place the momos above the water on a lightly greased plate."
      },
      {
        "step": 6,
        "instruction": "Cover and steam for 12 to 15 minutes until the chicken is fully cooked.",
        "tip": {
          "title": "Check the centre",
          "content": "Cut one momo open before serving the batch. The chicken should be fully cooked with no pink centre."
        }
      },
      {
        "step": 7,
        "instruction": "Serve hot with chilli chutney."
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 200,
      "protein": 4,
      "carbs": 28,
      "fat": 8
    }
  },
  "tandoori momos": {
    "dishName": "Tandoori Momos",
    "description": "Home-style baked momos coated in a smoky-spiced yogurt marinade, using an oven instead.",
    "prepTime": "Approx. 45 minutes",
    "equipment": [
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "12",
        "commonName": "Momos",
        "englishName": "prepared veg or paneer momos"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Dahi",
        "englishName": "thick yogurt"
      },
      {
        "amount": "1 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Haldi",
        "englishName": "turmeric"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1 tsp",
        "commonName": "Dhaniya Powder",
        "englishName": "coriander powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Adrak-Lehsun Paste",
        "englishName": "ginger-garlic paste"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix yogurt, spices, ginger-garlic paste, lemon juice, oil and salt into a smooth marinade."
      },
      {
        "step": 2,
        "instruction": "Coat the prepared momos well with the marinade."
      },
      {
        "step": 3,
        "instruction": "Rest the coated momos for 15 minutes."
      },
      {
        "step": 4,
        "instruction": "Preheat the oven to 220°C."
      },
      {
        "step": 5,
        "instruction": "Place the momos on a lightly greased tray and bake for 12 to 15 minutes."
      },
      {
        "step": 6,
        "instruction": "Turn them once and bake for 5 more minutes until lightly charred.",
        "tip": {
          "title": "For more color",
          "content": "Brush a little oil on the momos before the final 5 minutes."
        }
      },
      {
        "step": 7,
        "instruction": "Serve hot with mint chutney or onion rings."
      }
    ],
    "notes": [
      "Use prepared veg or paneer momos when you want the fastest home version."
    ],
    "nutrition": {
      "calories": 320,
      "protein": 16,
      "carbs": 42,
      "fat": 10
    }
  },
  "home style pizza": {
    "dishName": "Pizza",
    "description": "An easy homemade vegetable pizza with a crisp base, pizza sauce, cheese and.",
    "prepTime": "Approx. 45 minutes (plus 45 minutes dough resting)",
    "equipment": [
      {
        "item": "oven",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Maida",
        "englishName": "all-purpose flour"
      },
      {
        "amount": "1 tsp",
        "commonName": "Active Dry Yeast",
        "englishName": "active dry yeast"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "3/4 cup",
        "commonName": "Paani",
        "englishName": "warm water, as needed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Pizza Sauce",
        "englishName": "pizza sauce"
      },
      {
        "amount": "1 cup",
        "commonName": "Mozzarella Cheese",
        "englishName": "mozzarella cheese, grated"
      },
      {
        "amount": "1/2",
        "commonName": "Shimla Mirch",
        "englishName": "capsicum, thinly sliced"
      },
      {
        "amount": "1/2",
        "commonName": "Pyaaz",
        "englishName": "onion, thinly sliced"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Sweet Corn",
        "englishName": "sweet corn, optional"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Oregano",
        "englishName": "dried oregano"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chilli Flakes",
        "englishName": "red chilli flakes, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix yeast, sugar and warm water. Rest for 5 to 10 minutes until slightly frothy."
      },
      {
        "step": 2,
        "instruction": "Add maida, salt and oil. Knead into a soft dough. Rest covered for 45 minutes."
      },
      {
        "step": 3,
        "instruction": "Preheat the oven to 220°C."
      },
      {
        "step": 4,
        "instruction": "Cook the capsicum and onion in a pan with a little oil for 2 minutes. Keep them slightly crisp."
      },
      {
        "step": 5,
        "instruction": "Flatten the dough into a round base and spread pizza sauce over it."
      },
      {
        "step": 6,
        "instruction": "Add mozzarella, vegetables and corn if using. Sprinkle oregano and chilli flakes."
      },
      {
        "step": 7,
        "instruction": "Bake for 10 to 14 minutes until the cheese melts and the edges are golden.",
        "tip": {
          "title": "Watch the edges",
          "content": "Start checking after 10 minutes because ovens vary."
        }
      },
      {
        "step": 8,
        "instruction": "Slice and serve hot."
      }
    ],
    "notes": [
      "For an easier version, use a ready-made pizza base and skip the dough steps."
    ],
    "nutrition": {
      "calories": 450,
      "protein": 12,
      "carbs": 60,
      "fat": 18
    }
  },
  "home style burger": {
    "dishName": "Burger",
    "description": "A simple homemade veg burger with a crisp potato-vegetable patty, bun, cheese and.",
    "prepTime": "Approx. 35 minutes",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      },
      {
        "item": "pan",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2",
        "commonName": "Burger Buns",
        "englishName": "burger buns"
      },
      {
        "amount": "2 medium",
        "commonName": "Aloo",
        "englishName": "potatoes, boiled and mashed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Mixed Vegetables",
        "englishName": "carrot and peas, finely chopped"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Pyaaz",
        "englishName": "onion, finely chopped"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Bread Crumbs",
        "englishName": "breadcrumbs"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Lal Mirch Powder",
        "englishName": "red chilli powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Garam Masala",
        "englishName": "garam masala"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Chaat Masala",
        "englishName": "chaat masala"
      },
      {
        "amount": "to taste",
        "commonName": "Namak",
        "englishName": "salt"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Tel",
        "englishName": "cooking oil"
      },
      {
        "amount": "2 slices",
        "commonName": "Cheese",
        "englishName": "cheese, optional"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Mayonnaise",
        "englishName": "mayonnaise, optional"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Tomato Ketchup",
        "englishName": "tomato ketchup"
      },
      {
        "amount": "4 leaves",
        "commonName": "Lettuce",
        "englishName": "lettuce, optional"
      },
      {
        "amount": "1",
        "commonName": "Tamatar",
        "englishName": "tomato, sliced"
      },
      {
        "amount": "1/2",
        "commonName": "Pyaaz",
        "englishName": "onion, sliced"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix mashed potato, vegetables, onion, breadcrumbs, spices and salt."
      },
      {
        "step": 2,
        "instruction": "Shape the mixture into two thick patties. Chill for 10 minutes if they feel soft."
      },
      {
        "step": 3,
        "instruction": "Heat a little oil in a pan and cook the patties for 3 to 4 minutes on each side until golden."
      },
      {
        "step": 4,
        "instruction": "Toast the cut sides of the buns in the same pan for 1 to 2 minutes."
      },
      {
        "step": 5,
        "instruction": "Spread ketchup and mayonnaise if using on the bun halves."
      },
      {
        "step": 6,
        "instruction": "Add lettuce, tomato, onion and the hot patty. Add cheese if using."
      },
      {
        "step": 7,
        "instruction": "Close the burger and serve immediately.",
        "tip": {
          "title": "Keep it crisp",
          "content": "Toast the buns just before assembling so the sauce does not make them soggy."
        }
      }
    ],
    "notes": [
      "For a simpler burger, use only the potato patty, ketchup, onion and tomato."
    ],
    "nutrition": {
      "calories": 380,
      "protein": 11,
      "carbs": 57,
      "fat": 12
    }
  },
  "easy chocolate ice cream": {
    "dishName": "Chocolate Ice Cream",
    "description": "No-churn chocolate ice cream made with cream, condensed milk and cocoa.",
    "prepTime": "Approx. 15 minutes (plus freezing time)",
    "equipment": [
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Fresh Cream",
        "englishName": "chilled heavy cream"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Condensed Milk",
        "englishName": "sweetened condensed milk"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Cocoa Powder",
        "englishName": "unsweetened cocoa powder"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Vanilla",
        "englishName": "vanilla extract"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Chill the bowl and cream well before starting."
      },
      {
        "step": 2,
        "instruction": "Whisk the chilled cream until it becomes thick and forms soft peaks."
      },
      {
        "step": 3,
        "instruction": "Mix in the cocoa powder until smooth, then fold in the sweetened condensed milk."
      },
      {
        "step": 4,
        "instruction": "Fold gently so you do not knock out too much air."
      },
      {
        "step": 5,
        "instruction": "Transfer to a freezer-safe container and cover the surface."
      },
      {
        "step": 6,
        "instruction": "Freeze for at least 6 hours, preferably overnight, until firm."
      },
      {
        "step": 7,
        "instruction": "Let it sit at room temperature for 5 to 10 minutes before scooping.",
        "tip": {
          "title": "Creamy scoops",
          "content": "A short rest before serving softens the ice cream slightly and makes scooping easier."
        }
      }
    ],
    "notes": [
      "For a stronger chocolate flavour, add 1 extra tablespoon of cocoa powder."
    ],
    "nutrition": {
      "calories": 220,
      "protein": 5,
      "carbs": 28,
      "fat": 10
    }
  },
  "easy vanilla ice cream": {
    "dishName": "Vanilla Ice Cream",
    "description": "No-churn vanilla ice cream made with cream, condensed milk and vanilla.",
    "prepTime": "Approx. 15 minutes (plus freezing time)",
    "equipment": [
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Fresh Cream",
        "englishName": "chilled heavy cream"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Condensed Milk",
        "englishName": "sweetened condensed milk"
      },
      {
        "amount": "1 tsp",
        "commonName": "Vanilla",
        "englishName": "vanilla extract"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Chill the bowl and cream well before starting."
      },
      {
        "step": 2,
        "instruction": "Whisk the chilled cream until it becomes thick and forms soft peaks."
      },
      {
        "step": 3,
        "instruction": "Mix in the vanilla and sweetened condensed milk until smooth."
      },
      {
        "step": 4,
        "instruction": "Fold gently so you do not knock out too much air."
      },
      {
        "step": 5,
        "instruction": "Transfer to a freezer-safe container and cover the surface."
      },
      {
        "step": 6,
        "instruction": "Freeze for at least 6 hours, preferably overnight, until firm."
      },
      {
        "step": 7,
        "instruction": "Let it sit at room temperature for 5 to 10 minutes before scooping.",
        "tip": {
          "title": "Creamy scoops",
          "content": "A short rest before serving softens the ice cream slightly and makes scooping easier."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 210,
      "protein": 5,
      "carbs": 27,
      "fat": 9
    }
  },
  "easy strawberry ice cream": {
    "dishName": "Strawberry Ice Cream",
    "description": "No-churn strawberry ice cream made with fresh strawberries, cream and condensed milk.",
    "prepTime": "Approx. 20 minutes (plus freezing time)",
    "equipment": [
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Strawberries",
        "englishName": "fresh strawberries, hulled"
      },
      {
        "amount": "1 cup",
        "commonName": "Fresh Cream",
        "englishName": "chilled heavy cream"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Condensed Milk",
        "englishName": "sweetened condensed milk"
      },
      {
        "amount": "1 tsp",
        "commonName": "Vanilla",
        "englishName": "vanilla extract"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Chill the bowl and cream well before starting."
      },
      {
        "step": 2,
        "instruction": "Whisk the chilled cream until it becomes thick and forms soft peaks."
      },
      {
        "step": 3,
        "instruction": "Fold in the finely chopped or blended strawberries and sweetened condensed milk until evenly mixed."
      },
      {
        "step": 4,
        "instruction": "Fold gently so you do not knock out too much air."
      },
      {
        "step": 5,
        "instruction": "Transfer to a freezer-safe container and cover the surface."
      },
      {
        "step": 6,
        "instruction": "Freeze for at least 6 hours, preferably overnight, until firm."
      },
      {
        "step": 7,
        "instruction": "Let it sit at room temperature for 5 to 10 minutes before scooping.",
        "tip": {
          "title": "Creamy scoops",
          "content": "A short rest before serving softens the ice cream slightly and makes scooping easier."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 200,
      "protein": 4,
      "carbs": 28,
      "fat": 8
    }
  },
  "easy orange juice": {
    "dishName": "Orange Juice",
    "description": "Fresh homemade orange juice made in minutes with sweet oranges and a little water.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "4",
        "commonName": "Santra",
        "englishName": "sweet oranges, peeled"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Paani",
        "englishName": "cold water"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, optional"
      },
      {
        "amount": "a few",
        "commonName": "Baraf",
        "englishName": "ice cubes, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Peel the oranges and remove any seeds."
      },
      {
        "step": 2,
        "instruction": "Add the orange segments and cold water to a grinder."
      },
      {
        "step": 3,
        "instruction": "Blend until the juice is smooth."
      },
      {
        "step": 4,
        "instruction": "Taste and add sugar only if the oranges are not sweet enough."
      },
      {
        "step": 5,
        "instruction": "Pour into a glass and serve cold, with ice if you like.",
        "tip": {
          "title": "Keep it fresh",
          "content": "Use sweet, juicy oranges and drink the juice soon after blending."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 110,
      "protein": 2,
      "carbs": 26,
      "fat": 0
    }
  },
  "fresh apple juice": {
    "dishName": "Apple Juice",
    "description": "Simple homemade apple juice blended with fresh apples and a little chilled water.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 large",
        "commonName": "Seb",
        "englishName": "sweet apples, cored and chopped"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "cold water"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice, optional"
      },
      {
        "amount": "a few",
        "commonName": "Baraf",
        "englishName": "ice cubes, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the apples, remove the cores and chop them into small pieces."
      },
      {
        "step": 2,
        "instruction": "Add the apples and cold water to a grinder."
      },
      {
        "step": 3,
        "instruction": "Blend until smooth."
      },
      {
        "step": 4,
        "instruction": "Add lemon juice if you want a fresher, slightly tangy taste."
      },
      {
        "step": 5,
        "instruction": "Pour into a glass and serve immediately.",
        "tip": {
          "title": "Avoid browning",
          "content": "Blend and serve the juice soon after cutting the apples for a fresher colour and taste."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 150,
      "protein": 1,
      "carbs": 34,
      "fat": 1
    }
  },
  "easy mango juice": {
    "dishName": "Mango Juice",
    "description": "A quick homemade mango drink made with ripe mangoes, chilled water and optional sugar.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 medium",
        "commonName": "Aam",
        "englishName": "ripe mangoes, peeled and chopped"
      },
      {
        "amount": "1 cup",
        "commonName": "Paani",
        "englishName": "chilled water"
      },
      {
        "amount": "1 to 2 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, optional"
      },
      {
        "amount": "a few",
        "commonName": "Baraf",
        "englishName": "ice cubes, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Peel the mangoes and remove the stones."
      },
      {
        "step": 2,
        "instruction": "Add the mango pieces and chilled water to a grinder."
      },
      {
        "step": 3,
        "instruction": "Blend until smooth and pourable."
      },
      {
        "step": 4,
        "instruction": "Taste and add sugar only if needed."
      },
      {
        "step": 5,
        "instruction": "Pour into glasses and serve chilled.",
        "tip": {
          "title": "Use ripe mangoes",
          "content": "Sweet, ripe mangoes give the juice better flavour without needing much extra sugar."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 150,
      "protein": 1,
      "carbs": 36,
      "fat": 0
    }
  },
  "fresh pineapple juice": {
    "dishName": "Pineapple Juice",
    "description": "Bright homemade pineapple juice made with fresh pineapple and chilled water.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Ananas",
        "englishName": "fresh pineapple, peeled and chopped"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "cold water"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, optional"
      },
      {
        "amount": "a few",
        "commonName": "Baraf",
        "englishName": "ice cubes, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Peel the pineapple, remove the hard core and chop it."
      },
      {
        "step": 2,
        "instruction": "Add pineapple and cold water to a grinder."
      },
      {
        "step": 3,
        "instruction": "Blend until smooth."
      },
      {
        "step": 4,
        "instruction": "Taste and add sugar only if the pineapple is not sweet enough."
      },
      {
        "step": 5,
        "instruction": "Pour into glasses and serve cold.",
        "tip": {
          "title": "Balance the taste",
          "content": "Very ripe pineapple gives a naturally sweet juice, so taste before adding sugar."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 85,
      "protein": 1,
      "carbs": 20,
      "fat": 0
    }
  },
  "fresh grape juice": {
    "dishName": "Grape Juice",
    "description": "Easy homemade grape juice blended from sweet seedless grapes and chilled water.",
    "prepTime": "Approx. 10 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "2 cups",
        "commonName": "Angoor",
        "englishName": "seedless grapes, washed"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Paani",
        "englishName": "cold water"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice, optional"
      },
      {
        "amount": "a few",
        "commonName": "Baraf",
        "englishName": "ice cubes, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Wash the grapes well and remove any stems."
      },
      {
        "step": 2,
        "instruction": "Add the grapes and cold water to a grinder."
      },
      {
        "step": 3,
        "instruction": "Blend until smooth."
      },
      {
        "step": 4,
        "instruction": "Add lemon juice if you want a slightly sharper taste."
      },
      {
        "step": 5,
        "instruction": "Pour into glasses and serve immediately.",
        "tip": {
          "title": "Use seedless grapes",
          "content": "Seedless grapes make the juice easier to blend and give a smoother drink."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 140,
      "protein": 1,
      "carbs": 34,
      "fat": 0
    }
  },
  "fresh watermelon juice": {
    "dishName": "Watermelon Juice",
    "description": "A refreshing summer drink made by blending juicy watermelon with no cooking required.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "3 cups",
        "commonName": "Tarbooz",
        "englishName": "watermelon, deseeded and cubed"
      },
      {
        "amount": "1 tsp",
        "commonName": "Nimbu Ras",
        "englishName": "lemon juice, optional"
      },
      {
        "amount": "a few",
        "commonName": "Pudina",
        "englishName": "mint leaves, optional"
      },
      {
        "amount": "a few",
        "commonName": "Baraf",
        "englishName": "ice cubes, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Cut the watermelon into small cubes and remove as many seeds as possible."
      },
      {
        "step": 2,
        "instruction": "Add the watermelon to a grinder."
      },
      {
        "step": 3,
        "instruction": "Blend for a few seconds until juicy and smooth."
      },
      {
        "step": 4,
        "instruction": "Add lemon juice or mint if you like."
      },
      {
        "step": 5,
        "instruction": "Pour into glasses and serve cold.",
        "tip": {
          "title": "No extra water needed",
          "content": "Watermelon already contains plenty of water, so blend it on its own first."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 90,
      "protein": 1,
      "carbs": 22,
      "fat": 0
    }
  },
  "easy vanilla milkshake": {
    "dishName": "Vanilla Milkshake",
    "description": "A simple creamy vanilla milkshake made with chilled milk, vanilla ice cream and.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Doodh",
        "englishName": "chilled milk"
      },
      {
        "amount": "2 scoops",
        "commonName": "Vanilla Ice Cream",
        "englishName": "vanilla ice cream"
      },
      {
        "amount": "1/2 tsp",
        "commonName": "Vanilla",
        "englishName": "vanilla extract"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Add chilled milk, vanilla ice cream and vanilla to a grinder."
      },
      {
        "step": 2,
        "instruction": "Blend for 20 to 30 seconds until smooth and frothy."
      },
      {
        "step": 3,
        "instruction": "Taste and add sugar only if needed."
      },
      {
        "step": 4,
        "instruction": "Pour into a glass and serve immediately.",
        "tip": {
          "title": "Keep it thick",
          "content": "Use cold milk and firm ice cream for a thicker shake."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 350,
      "protein": 9,
      "carbs": 52,
      "fat": 12
    }
  },
  "easy chocolate milkshake": {
    "dishName": "Chocolate Milkshake",
    "description": "A quick creamy chocolate milkshake made with chilled milk, chocolate ice cream and cocoa.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Doodh",
        "englishName": "chilled milk"
      },
      {
        "amount": "2 scoops",
        "commonName": "Chocolate Ice Cream",
        "englishName": "chocolate ice cream"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Cocoa Powder",
        "englishName": "unsweetened cocoa powder"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Add chilled milk, chocolate ice cream and cocoa powder to a grinder."
      },
      {
        "step": 2,
        "instruction": "Blend for 20 to 30 seconds until smooth."
      },
      {
        "step": 3,
        "instruction": "Taste and add sugar only if you want it sweeter."
      },
      {
        "step": 4,
        "instruction": "Pour into a glass and serve cold.",
        "tip": {
          "title": "Richer chocolate",
          "content": "Use good cocoa powder and chocolate ice cream for a deeper flavour."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 390,
      "protein": 10,
      "carbs": 58,
      "fat": 13
    }
  },
  "easy strawberry milkshake": {
    "dishName": "Strawberry Milkshake",
    "description": "A simple strawberry milkshake made with fresh strawberries, chilled milk and strawberry ice cream.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Strawberries",
        "englishName": "fresh strawberries, hulled"
      },
      {
        "amount": "1 cup",
        "commonName": "Doodh",
        "englishName": "chilled milk"
      },
      {
        "amount": "2 scoops",
        "commonName": "Strawberry Ice Cream",
        "englishName": "strawberry ice cream"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Add strawberries, chilled milk and strawberry ice cream to a grinder."
      },
      {
        "step": 2,
        "instruction": "Blend for 20 to 30 seconds until smooth and creamy."
      },
      {
        "step": 3,
        "instruction": "Taste and add sugar only if needed."
      },
      {
        "step": 4,
        "instruction": "Pour into a glass and serve immediately.",
        "tip": {
          "title": "Use ripe berries",
          "content": "Sweet ripe strawberries give better flavour and colour without extra sugar."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 330,
      "protein": 9,
      "carbs": 51,
      "fat": 10
    }
  },
  "easy oreo milkshake": {
    "dishName": "Oreo Milkshake",
    "description": "A quick creamy cookie shake made with Oreo biscuits, chilled milk and vanilla ice cream.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "5",
        "commonName": "Oreo Biscuits",
        "englishName": "Oreo-style chocolate sandwich cookies"
      },
      {
        "amount": "1.5 cups",
        "commonName": "Doodh",
        "englishName": "chilled milk"
      },
      {
        "amount": "2 scoops",
        "commonName": "Vanilla Ice Cream",
        "englishName": "vanilla ice cream"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Break the biscuits into pieces and add them to a grinder with the milk and ice cream."
      },
      {
        "step": 2,
        "instruction": "Blend for 20 to 30 seconds until smooth, with a few cookie crumbs if you like."
      },
      {
        "step": 3,
        "instruction": "Taste and add sugar only if needed."
      },
      {
        "step": 4,
        "instruction": "Pour into a glass and serve immediately.",
        "tip": {
          "title": "Cookie texture",
          "content": "Blend a little less if you want small Oreo pieces in the shake."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 430,
      "protein": 10,
      "carbs": 59,
      "fat": 17
    }
  },
  "hot coffee": {
    "dishName": "Hot Coffee",
    "description": "Simple hot milk coffee made with instant coffee, milk and optional sugar, ready.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Doodh",
        "englishName": "milk"
      },
      {
        "amount": "1 tsp",
        "commonName": "Coffee",
        "englishName": "instant coffee powder"
      },
      {
        "amount": "1 to 2 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar, optional"
      },
      {
        "amount": "1 tbsp",
        "commonName": "Paani",
        "englishName": "hot water"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat the milk on the stove until hot, but do not let it boil over."
      },
      {
        "step": 2,
        "instruction": "Mix coffee, sugar and hot water in a cup until smooth."
      },
      {
        "step": 3,
        "instruction": "Pour the hot milk into the coffee mixture and stir well."
      },
      {
        "step": 4,
        "instruction": "Taste and adjust the sugar if needed."
      },
      {
        "step": 5,
        "instruction": "Serve hot immediately.",
        "tip": {
          "title": "Make it frothy",
          "content": "Stir the coffee mixture quickly before adding the milk for a lighter foam on top."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 100,
      "protein": 5,
      "carbs": 11,
      "fat": 4
    }
  },
  "easy cold coffee": {
    "dishName": "Cold Coffee",
    "description": "Creamy chilled coffee blended with cold milk, coffee and ice cream.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 cups",
        "commonName": "Doodh",
        "englishName": "chilled milk"
      },
      {
        "amount": "1.5 tsp",
        "commonName": "Coffee",
        "englishName": "instant coffee powder"
      },
      {
        "amount": "2 scoops",
        "commonName": "Vanilla Ice Cream",
        "englishName": "vanilla ice cream"
      },
      {
        "amount": "1 to 2 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "5 to 6",
        "commonName": "Baraf",
        "englishName": "ice cubes"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dissolve the coffee in 1 tablespoon warm water."
      },
      {
        "step": 2,
        "instruction": "Add chilled milk, coffee, sugar, ice cream and ice to a grinder."
      },
      {
        "step": 3,
        "instruction": "Blend for 20 to 30 seconds until smooth and frothy."
      },
      {
        "step": 4,
        "instruction": "Taste and add more sugar if needed."
      },
      {
        "step": 5,
        "instruction": "Pour into a glass and serve immediately.",
        "tip": {
          "title": "Keep it creamy",
          "content": "Use cold milk and firm ice cream so the drink stays thick instead of watery."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 290,
      "protein": 10,
      "carbs": 36,
      "fat": 12
    }
  },
  "easy coffee frappe": {
    "dishName": "Coffee Frappe",
    "description": "Thick iced coffee blended with milk, coffee, ice and ice cream.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 cup",
        "commonName": "Doodh",
        "englishName": "chilled milk"
      },
      {
        "amount": "1 tsp",
        "commonName": "Coffee",
        "englishName": "instant coffee powder"
      },
      {
        "amount": "1 scoop",
        "commonName": "Vanilla Ice Cream",
        "englishName": "vanilla ice cream"
      },
      {
        "amount": "1 to 2 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar"
      },
      {
        "amount": "1 cup",
        "commonName": "Baraf",
        "englishName": "ice cubes"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Dissolve the coffee in 1 tablespoon warm water."
      },
      {
        "step": 2,
        "instruction": "Add milk, coffee, ice cream, sugar and ice to a grinder."
      },
      {
        "step": 3,
        "instruction": "Blend until thick, smooth and frothy."
      },
      {
        "step": 4,
        "instruction": "Taste and add sugar if needed."
      },
      {
        "step": 5,
        "instruction": "Pour into a chilled glass and serve immediately.",
        "tip": {
          "title": "Make it thicker",
          "content": "Use more ice and less milk for a thicker frappe."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 250,
      "protein": 7,
      "carbs": 33,
      "fat": 10
    }
  },
  "easy iced latte": {
    "dishName": "Iced Latte",
    "description": "A simple homemade iced latte made with strong coffee, cold milk and ice.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "grinder",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1 tsp",
        "commonName": "Coffee",
        "englishName": "instant coffee powder"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Paani",
        "englishName": "hot water"
      },
      {
        "amount": "1 cup",
        "commonName": "Doodh",
        "englishName": "cold milk"
      },
      {
        "amount": "1 tsp",
        "commonName": "Cheeni",
        "englishName": "sugar or syrup, optional"
      },
      {
        "amount": "6 to 8",
        "commonName": "Baraf",
        "englishName": "ice cubes"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Mix coffee with hot water until fully dissolved."
      },
      {
        "step": 2,
        "instruction": "Add the coffee, cold milk and sugar to a grinder and blend for 10 seconds."
      },
      {
        "step": 3,
        "instruction": "Fill a glass with ice cubes."
      },
      {
        "step": 4,
        "instruction": "Pour the coffee mixture over the ice."
      },
      {
        "step": 5,
        "instruction": "Stir and serve cold.",
        "tip": {
          "title": "Keep the layers",
          "content": "Pour the milk slowly over the ice if you want a clear coffee-and-milk look."
        }
      }
    ],
    "notes": [],
    "nutrition": {
      "calories": 120,
      "protein": 6,
      "carbs": 15,
      "fat": 4
    }
  },
  "easy vietnamese coffee": {
    "dishName": "Vietnamese Coffee",
    "description": "Strong coffee sweetened with condensed milk, served hot or over ice.",
    "prepTime": "Approx. 5 minutes",
    "equipment": [
      {
        "item": "stove",
        "isSpecialized": false,
        "alternative": null
      }
    ],
    "ingredients": [
      {
        "amount": "1.5 tsp",
        "commonName": "Coffee",
        "englishName": "strong instant coffee powder"
      },
      {
        "amount": "1/4 cup",
        "commonName": "Paani",
        "englishName": "hot water"
      },
      {
        "amount": "2 tbsp",
        "commonName": "Condensed Milk",
        "englishName": "sweetened condensed milk"
      },
      {
        "amount": "1/2 cup",
        "commonName": "Baraf",
        "englishName": "ice cubes, optional"
      }
    ],
    "method": [
      {
        "step": 1,
        "instruction": "Heat the water on the stove until very hot."
      },
      {
        "step": 2,
        "instruction": "Mix the coffee with the hot water until strong and fully dissolved."
      },
      {
        "step": 3,
        "instruction": "Add condensed milk to a glass."
      },
      {
        "step": 4,
        "instruction": "Pour the strong coffee over the condensed milk and stir well."
      },
      {
        "step": 5,
        "instruction": "Serve hot, or add ice and serve cold.",
        "tip": {
          "title": "Vietnamese-style balance",
          "content": "Use strong coffee and sweet condensed milk. Start with less condensed milk and add more to taste."
        }
      }
    ],
    "notes": [
      "This is a simplified home version using instant coffee instead of a traditional Vietnamese coffee filter.",
      "A traditional Vietnamese phin filter is optional. For a simple Indian-kitchen version, use very strong instant coffee.)"
    ],
    "nutrition": {
      "calories": 160,
      "protein": 3,
      "carbs": 19,
      "fat": 8
    }
  },

  // ============================================================
  // REGIONAL INDIA SPECIALS
  // ============================================================

  "rajma gogji": {
    dishName: "Rajma Gogji",
    description: "Kashmiri kidney beans and tender turnip simmered with fennel, dry ginger and gentle Kashmiri spices.",
    prepTime: "Approx. 55 minutes (plus overnight soaking)",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Kashmiri Rajma", englishName: "small red kidney beans, soaked overnight" },
      { amount: "3 medium", commonName: "Gogji", englishName: "turnips, peeled and cubed" },
      { amount: "1 tbsp", commonName: "Sarson Tel", englishName: "mustard oil" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1 tsp", commonName: "Saunf Powder", englishName: "fennel powder" },
      { amount: "1 tsp", commonName: "Saunth", englishName: "dry ginger powder" },
      { amount: "1 tsp", commonName: "Kashmiri Lal Mirch", englishName: "Kashmiri red chilli powder" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 inch", commonName: "Dalchini", englishName: "cinnamon" },
      { amount: "3", commonName: "Laung", englishName: "cloves" },
      { amount: "4 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked rajma and rinse it once with fresh water." },
      { step: 2, instruction: "Add rajma, cinnamon, cloves, turmeric, salt and 4 cups water to a cooker." },
      { step: 3, instruction: "Pressure cook until the rajma is completely tender, about 5 to 6 whistles on a medium-low flame. Let the pressure release naturally.", tip: { title: "Rajma should soften", content: "The beans should mash easily between your fingers. If they are still firm, cook for 1 to 2 more whistles." } },
      { step: 4, instruction: "Heat mustard oil in a kadai until it just starts to smoke, then lower the heat." },
      { step: 5, instruction: "Add cumin and hing. Let them sizzle for a few seconds." },
      { step: 6, instruction: "Add fennel powder, dry ginger powder and Kashmiri chilli powder. Stir quickly for 10 to 15 seconds so the spices do not burn." },
      { step: 7, instruction: "Add the turnips and cook for 6 to 8 minutes, turning them occasionally, until lightly golden." },
      { step: 8, instruction: "Add the cooked rajma with its cooking liquid. Stir gently and simmer for 10 to 15 minutes until the turnips are tender and the gravy lightly thickens." },
      { step: 9, instruction: "Taste for salt and serve hot with steamed rice." },
    ],
    notes: ["Rajma Gogji is traditionally a Kashmiri winter preparation. Some Kashmiri versions avoid onion and tomato and rely on fennel, dry ginger and asafoetida for flavor."],
    nutrition: { calories: 270, protein: 13, carbs: 37, fat: 8 },
  },

  "siddu": {
    dishName: "Siddu",
    description: "Soft Himachali steamed wheat buns filled with a simple spiced urad dal mixture and served warm with ghee.",
    prepTime: "Approx. 5 hours 30 minutes (including 4 to 5 hours proofing)",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Atta", englishName: "whole wheat flour" },
      { amount: "1/2 tsp", commonName: "Dry Yeast", englishName: "instant dry yeast" },
      { amount: "1/2 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "1 tsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "3/4 cup", commonName: "Paani", englishName: "lukewarm water, as needed" },
      { amount: "1/2 cup", commonName: "Dhuli Urad Dal", englishName: "split skinned black gram, soaked 3 hours" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "grated ginger" },
      { amount: "1 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "2 tbsp", commonName: "Ghee", englishName: "ghee, for serving" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix flour, yeast, sugar and salt. Add lukewarm water gradually and knead into a soft, smooth dough." },
      { step: 2, instruction: "Rub the dough with 1 teaspoon oil, cover it and leave it in a warm place for 4 to 5 hours, until it has nearly doubled." },
      { step: 3, instruction: "Drain the soaked urad dal and grind it with cumin, ginger and green chilli using only a little water. Keep the mixture coarse rather than runny." },
      { step: 4, instruction: "Mix the ground dal with coriander, chilli powder and salt." },
      { step: 5, instruction: "Divide the risen dough into 4 portions. Flatten one portion into a thick disc, place some filling in the centre and seal the edges over the filling." },
      { step: 6, instruction: "Repeat with the remaining dough and filling, keeping the sealed side underneath." },
      { step: 7, instruction: "Add 2 to 3 cups water to a cooker, place the trivet inside and bring the water to a boil. Do not use the pressure weight." },
      { step: 8, instruction: "Place the stuffed buns on the trivet, cover and steam for 15 to 20 minutes until puffed and cooked through.", tip: { title: "Steam without pressure", content: "Use the cooker only as a steamer. Keep the whistle and pressure valve off." } },
      { step: 9, instruction: "Split open while hot and serve with ghee, dal or chutney." },
    ],
    notes: ["Siddu is associated with Himachal Pradesh, especially areas such as Kullu, Mandi and Shimla. The filling varies by household; savoury urad dal is a practical home version."],
    nutrition: { calories: 285, protein: 9, carbs: 46, fat: 8 },
  },

  "aloo ke gutke": {
    dishName: "Aloo Ke Gutke",
    description: "Chunky potatoes tossed in mustard oil, cumin, dried chillies and simple Pahadi spices.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "5 medium", commonName: "Aloo", englishName: "potatoes, boiled and cubed" },
      { amount: "2 tbsp", commonName: "Sarson Tel", englishName: "mustard oil" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "1/4 tsp", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Jeera Powder", englishName: "roasted cumin powder" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Boil the potatoes until just tender. Cool, peel and cut them into bite-size chunks." },
      { step: 2, instruction: "Heat mustard oil in a kadai until it is hot and lightly smoking. Lower the heat." },
      { step: 3, instruction: "Add cumin, dried red chillies and hing. Let them sizzle for a few seconds." },
      { step: 4, instruction: "Add turmeric, coriander powder and chilli powder. Stir quickly for 10 seconds." },
      { step: 5, instruction: "Add the potato chunks and salt. Toss gently so the potatoes do not break." },
      { step: 6, instruction: "Cook uncovered on medium heat for 8 to 10 minutes, turning occasionally, until the edges are golden and lightly crisp.", tip: { title: "Keep them chunky", content: "Use potatoes that are cooked through but still firm enough to hold their shape in the kadai." } },
      { step: 7, instruction: "Sprinkle roasted cumin powder and coriander leaves, toss once and serve hot." },
    ],
    notes: ["Garhwali versions may use jakhiya instead of cumin. Cumin is a practical substitute when jakhiya is unavailable."],
    nutrition: { calories: 225, protein: 4, carbs: 31, fat: 10 },
  },

  "gatte ki sabzi": {
    dishName: "Gatte Ki Sabzi",
    description: "Tender gram-flour dumplings simmered in a tangy yogurt gravy with Rajasthani spices.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Besan", englishName: "gram flour" },
      { amount: "2 tbsp", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/4 tsp", commonName: "Hing", englishName: "asafoetida" },
      { amount: "1 cup", commonName: "Dahi", englishName: "plain yogurt, whisked" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Saunf Powder", englishName: "fennel powder" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "2 cups", commonName: "Paani", englishName: "water, plus extra for boiling" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix besan, 2 tablespoons yogurt, oil, ajwain, turmeric, coriander powder, chilli powder, hing and salt." },
      { step: 2, instruction: "Add a little water at a time and knead into a firm dough that holds its shape." },
      { step: 3, instruction: "Divide the dough into 3 portions and roll each into a thick rope." },
      { step: 4, instruction: "Bring a kadai of water to a gentle boil, add the dough ropes and cook for 10 to 12 minutes until firm. Remove and cool." },
      { step: 5, instruction: "Cut the cooked rolls into bite-size gatte. Reserve 1 cup of the cooking water." },
      { step: 6, instruction: "Heat 1 tablespoon oil in a kadai. Add cumin and hing, then ginger-garlic paste. Cook for 30 seconds." },
      { step: 7, instruction: "Lower the heat. Add fennel powder, turmeric, chilli powder and a splash of water, then cook for 30 seconds." },
      { step: 8, instruction: "Whisk the yogurt until smooth. Add it slowly while stirring constantly so it does not split." },
      { step: 9, instruction: "Add 2 cups water and the reserved cooking water. Bring to a gentle simmer." },
      { step: 10, instruction: "Add the gatte and simmer for 7 to 10 minutes until the gravy lightly thickens. Stir gently." },
      { step: 11, instruction: "Add garam masala and coriander. Taste for salt and serve with roti or rice.", tip: { title: "Keep yogurt smooth", content: "Whisk the yogurt well and keep the heat low while adding it. High heat can make it curdle." } },
    ],
    notes: ["Traditional Rajasthani versions often avoid tomato and let the yogurt, besan and spices carry the gravy."],
    nutrition: { calories: 305, protein: 11, carbs: 31, fat: 15 },
  },

  "sev tameta": {
    dishName: "Sev Tameta",
    description: "Tangy Gujarati tomato curry sweetened lightly and finished with crunchy sev just before serving.",
    prepTime: "Approx. 25 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "5 medium", commonName: "Tamatar", englishName: "ripe tomatoes, chopped" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1 tbsp", commonName: "Lasun", englishName: "garlic, finely chopped" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1 tsp", commonName: "Gud", englishName: "jaggery, grated" },
      { amount: "1/4 cup", commonName: "Paani", englishName: "water" },
      { amount: "1 cup", commonName: "Sev", englishName: "thick sev" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat oil in a kadai over medium heat. Add cumin and let it sizzle." },
      { step: 2, instruction: "Add onion and garlic. Cook for 2 to 3 minutes until the onion softens." },
      { step: 3, instruction: "Add turmeric, chilli powder and coriander powder. Stir for 15 seconds." },
      { step: 4, instruction: "Add chopped tomatoes, salt and jaggery. Cook for 8 to 10 minutes until the tomatoes break down and become saucy." },
      { step: 5, instruction: "Add water and simmer for 3 to 4 minutes. Taste and balance the sweet, tangy and spicy flavors." },
      { step: 6, instruction: "Turn off the heat. Stir in half the sev and coriander just before serving.", tip: { title: "Add sev last", content: "Adding sev too early makes it completely soft. Mix some in at the end and keep extra sev for topping." } },
      { step: 7, instruction: "Serve immediately with rotli, bhakri or rice." },
    ],
    notes: ["Kathiawadi versions can be hotter and may use more jaggery. Adjust the balance to your tomatoes and taste."],
    nutrition: { calories: 215, protein: 5, carbs: 25, fat: 11 },
  },

  "bharli vangi": {
    dishName: "Bharli Vangi",
    description: "Baby brinjals stuffed with a nutty Maharashtrian peanut-coconut masala and slow-cooked until tender.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "8 small", commonName: "Baingan", englishName: "baby brinjals" },
      { amount: "1/2 cup", commonName: "Moongfali", englishName: "roasted peanuts" },
      { amount: "2 tbsp", commonName: "Sukha Nariyal", englishName: "dry coconut" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion" },
      { amount: "1 tbsp", commonName: "Til", englishName: "sesame seeds" },
      { amount: "1 tbsp", commonName: "Gud", englishName: "jaggery" },
      { amount: "1 tbsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Garam Masala", englishName: "garam masala" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "6", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Wash the baby brinjals and pat them completely dry. Cut a cross from the bottom toward the stem, keeping the stem attached." },
      { step: 2, instruction: "Grind peanuts, dry coconut, sesame, onion, jaggery, tamarind, chilli powder, turmeric, garam masala and salt into a thick paste using very little water." },
      { step: 3, instruction: "Gently fill each brinjal with the masala, keeping some masala aside for the gravy." },
      { step: 4, instruction: "Heat oil in a kadai. Add mustard seeds, cumin and curry leaves and let them crackle." },
      { step: 5, instruction: "Place the stuffed brinjals in the kadai and cook on medium heat for 4 to 5 minutes, turning carefully." },
      { step: 6, instruction: "Add the remaining masala and 1/2 cup water. Mix gently around the brinjals." },
      { step: 7, instruction: "Cover and cook on low heat for 20 to 25 minutes, turning the brinjals once or twice, until they are tender and the masala is thick.", tip: { title: "Cook slowly", content: "Keep the heat low after adding water. The brinjals need time to soften without burning the nutty masala." } },
      { step: 8, instruction: "Serve hot with bhakri, chapati or rice." },
    ],
    notes: ["Small, tender brinjals work best because the skin cooks evenly and the stuffing stays inside."],
    nutrition: { calories: 235, protein: 7, carbs: 19, fat: 16 },
  },

  "ros omelette": {
    dishName: "Ros Omelette",
    description: "A fluffy Goan onion omelette topped with a rich coconut-tomato ros and served with soft pao.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "4", commonName: "Ande", englishName: "eggs" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, finely chopped" },
      { amount: "1 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil, for omelette" },
      { amount: "1/2 cup", commonName: "Nariyal", englishName: "grated coconut" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, chopped for ros" },
      { amount: "1 tbsp", commonName: "Adrak-Lehsun Paste", englishName: "ginger-garlic paste" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Kashmiri Lal Mirch", englishName: "Kashmiri red chilli powder" },
      { amount: "1 tsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil, for ros" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Heat 1 tablespoon oil in a kadai. Add cumin and let it sizzle." },
      { step: 2, instruction: "Add the ros onion and ginger-garlic paste. Cook for 3 to 4 minutes until soft." },
      { step: 3, instruction: "Add coconut and chopped tomato. Cook for 4 to 5 minutes until the tomato softens." },
      { step: 4, instruction: "Add coriander powder, turmeric and Kashmiri chilli powder. Cook for 30 seconds." },
      { step: 5, instruction: "Add 1 cup water, tamarind and salt. Simmer for 5 minutes." },
      { step: 6, instruction: "Cool slightly, grind the mixture to a smooth gravy and return it to the kadai. Simmer for 3 to 4 minutes.", tip: { title: "Smooth ros", content: "Blend the coconut mixture until smooth. A smooth gravy coats the omelette much better." } },
      { step: 7, instruction: "Whisk the eggs with chopped onion, green chilli, coriander and a little salt." },
      { step: 8, instruction: "Heat a pan with a little oil. Pour in half the egg mixture and cook on medium heat until the underside is set and lightly golden." },
      { step: 9, instruction: "Flip and cook the other side until just set. Repeat for the second omelette." },
      { step: 10, instruction: "Place an omelette on a plate, pour hot ros over it and serve with pao." },
    ],
    notes: ["Goan ros omelette is often served with a leftover curry-style gravy. This home version uses a simple coconut-tomato ros inspired by Goan Xacuti-style flavors."],
    nutrition: { calories: 430, protein: 20, carbs: 17, fat: 31 },
  },

  "beef ularthiyathu": {
    dishName: "Beef Ularthiyathu",
    description: "Kerala-style beef cooked tender with black pepper, ginger, garlic, curry leaves and coconut pieces.",
    prepTime: "Approx. 55 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Beef", englishName: "beef, trimmed and cut into small pieces" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, sliced" },
      { amount: "8", commonName: "Chhote Pyaaz", englishName: "shallots, sliced" },
      { amount: "1 tbsp", commonName: "Adrak", englishName: "ginger, chopped" },
      { amount: "1 tbsp", commonName: "Lasun", englishName: "garlic, chopped" },
      { amount: "1 tbsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tsp", commonName: "Dhaniya Powder", englishName: "coriander powder" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Kali Mirch Powder", englishName: "black pepper powder" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 inch", commonName: "Dalchini", englishName: "cinnamon" },
      { amount: "3", commonName: "Laung", englishName: "cloves" },
      { amount: "8", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "50 g", commonName: "Nariyal", englishName: "fresh coconut pieces" },
      { amount: "1/2 tsp", commonName: "Sirka", englishName: "vinegar" },
      { amount: "2 tbsp", commonName: "Nariyal Tel", englishName: "coconut oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Mix beef with chilli powder, coriander powder, turmeric, pepper, cumin, cinnamon, cloves, ginger, garlic, salt and vinegar." },
      { step: 2, instruction: "Add the marinated beef and 1 cup water to a cooker." },
      { step: 3, instruction: "Pressure cook until the beef is tender, about 5 to 6 whistles depending on the cut. Let the pressure release naturally." },
      { step: 4, instruction: "Heat coconut oil in a kadai. Add half the curry leaves, onion, shallots and coconut pieces." },
      { step: 5, instruction: "Cook on medium heat for 5 to 7 minutes until the onions soften and the coconut gets light golden edges." },
      { step: 6, instruction: "Add the cooked beef and enough cooking liquid to keep the mixture moist. Cook uncovered on medium-high heat, stirring often." },
      { step: 7, instruction: "Continue cooking for 10 to 15 minutes until most of the liquid evaporates and the beef becomes dark, dry and well coated.", tip: { title: "Ularthiyathu finish", content: "The final dish should be moist but not gravy-like, with the masala clinging to the beef and a little fat visible around it." } },
      { step: 8, instruction: "Add the remaining curry leaves, toss once and serve hot with parotta, appam or rice." },
    ],
    notes: ["Kerala Tourism describes Beef Ularthiyathu as a Central Travancore specialty. This is a practical pressure-cooker adaptation for a home kitchen."],
    nutrition: { calories: 455, protein: 31, carbs: 8, fat: 34 },
  },

  "gutti vankaya": {
    dishName: "Gutti Vankaya",
    description: "Tender baby brinjals stuffed with a peanut-coconut spice paste and simmered in tangy tamarind gravy.",
    prepTime: "Approx. 50 minutes",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "8 small", commonName: "Vankaya", englishName: "baby brinjals" },
      { amount: "1/4 cup", commonName: "Moongfali", englishName: "peanuts" },
      { amount: "2 tbsp", commonName: "Til", englishName: "sesame seeds" },
      { amount: "2 tbsp", commonName: "Sukha Nariyal", englishName: "dry coconut" },
      { amount: "1 tbsp", commonName: "Dhaniya", englishName: "coriander seeds" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "4", commonName: "Lasun", englishName: "garlic cloves" },
      { amount: "1 inch", commonName: "Adrak", englishName: "ginger" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "8", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "3 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Wash the baby brinjals and pat them dry. Make two cuts to form a cross, keeping the stem attached." },
      { step: 2, instruction: "Dry roast peanuts, sesame, dry coconut, coriander seeds and cumin on low heat until aromatic. Cool them." },
      { step: 3, instruction: "Grind the roasted mixture with onion, garlic, ginger, turmeric, chilli powder, tamarind and salt into a thick paste." },
      { step: 4, instruction: "Stuff each brinjal with the masala. Keep the remaining masala aside." },
      { step: 5, instruction: "Heat oil in a kadai. Add mustard seeds and curry leaves and let them crackle." },
      { step: 6, instruction: "Place the stuffed brinjals in the kadai and cook for 5 minutes, turning gently so the outside starts to soften." },
      { step: 7, instruction: "Add the remaining masala and 1 cup water. Mix very gently around the brinjals." },
      { step: 8, instruction: "Cover and simmer on low heat for 18 to 22 minutes until the brinjals are fork-tender and the gravy thickens.", tip: { title: "Check the centre", content: "Push a knife gently into one brinjal. It should slide in easily without the brinjal falling apart." } },
      { step: 9, instruction: "Serve hot with rice or roti." },
    ],
    notes: ["Gutti Vankaya has several Andhra variations. Peanut, sesame, coconut and tamarind make a practical home-style version with the characteristic nutty-tangy profile."],
    nutrition: { calories: 300, protein: 8, carbs: 22, fat: 22 },
  },

  "bagara baingan": {
    dishName: "Bagara Baingan",
    description: "Hyderabadi baby brinjals cooked in a nutty peanut-sesame gravy sharpened with tamarind.",
    prepTime: "Approx. 55 minutes",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "8 to 10 small", commonName: "Baingan", englishName: "baby brinjals" },
      { amount: "1/4 cup", commonName: "Moongfali", englishName: "peanuts" },
      { amount: "2 tbsp", commonName: "Til", englishName: "sesame seeds" },
      { amount: "2 tbsp", commonName: "Sukha Nariyal", englishName: "dry coconut" },
      { amount: "1 tbsp", commonName: "Dhaniya", englishName: "coriander seeds" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "2 medium", commonName: "Pyaaz", englishName: "onions, sliced" },
      { amount: "1 inch", commonName: "Adrak", englishName: "ginger" },
      { amount: "5", commonName: "Lasun", englishName: "garlic cloves" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Kalonji", englishName: "nigella seeds" },
      { amount: "8", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "Kashmiri red chilli powder" },
      { amount: "2 tbsp", commonName: "Imli", englishName: "tamarind pulp" },
      { amount: "1/2 tsp", commonName: "Gud", englishName: "jaggery, optional" },
      { amount: "4 tbsp", commonName: "Tel", englishName: "cooking oil" },
      { amount: "1.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Wash and dry the brinjals. Make a cross cut from the base, keeping the stems attached." },
      { step: 2, instruction: "Dry roast peanuts, sesame, dry coconut, coriander seeds and cumin until aromatic. Cool completely." },
      { step: 3, instruction: "In the same kadai, cook one sliced onion with ginger and garlic until lightly golden." },
      { step: 4, instruction: "Grind the roasted ingredients and browned onion mixture into a smooth, thick paste with a little water." },
      { step: 5, instruction: "Heat 2 tablespoons oil. Shallow-fry the brinjals for 5 to 7 minutes, turning them, until partly tender. Remove them." },
      { step: 6, instruction: "Add the remaining oil. Add mustard, nigella seeds and curry leaves and let them crackle." },
      { step: 7, instruction: "Add the remaining onion and cook until soft. Add the ground masala, turmeric, chilli powder and salt. Cook for 8 to 10 minutes until the oil shows at the edges." },
      { step: 8, instruction: "Add tamarind pulp, optional jaggery and 1.5 cups water. Bring to a gentle simmer." },
      { step: 9, instruction: "Add the fried brinjals. Cover and simmer on low heat for 10 to 12 minutes until the brinjals are tender and the gravy is thick.", tip: { title: "Don't rush the brinjal", content: "Cook until a knife slides into the centre easily. Undercooked brinjal stays firm and can taste bitter." } },
      { step: 10, instruction: "Serve hot with biryani, rice or roti." },
    ],
    notes: ["Bagara Baingan is strongly associated with Hyderabadi cuisine and is commonly served alongside biryani. The defining flavor comes from roasted nuts, sesame, coconut and tamarind."],
    nutrition: { calories: 285, protein: 7, carbs: 21, fat: 21 },
  },

  "dalma": {
    dishName: "Dalma",
    description: "Odia toor dal cooked with seasonal vegetables and finished with a fragrant cumin-garlic tempering.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Toor Dal", englishName: "split pigeon peas" },
      { amount: "1 cup", commonName: "Kaddu", englishName: "pumpkin, cubed" },
      { amount: "1 medium", commonName: "Aloo", englishName: "potato, cubed" },
      { amount: "1 small", commonName: "Baingan", englishName: "eggplant, cubed" },
      { amount: "1 small", commonName: "Kaccha Kela", englishName: "raw banana, cubed" },
      { amount: "1 medium", commonName: "Tamatar", englishName: "tomato, chopped" },
      { amount: "1 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "4", commonName: "Lasun", englishName: "garlic cloves, sliced" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "1 tbsp", commonName: "Ghee", englishName: "ghee" },
      { amount: "2 tbsp", commonName: "Nariyal", englishName: "fresh grated coconut, optional" },
      { amount: "5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Rinse the toor dal well and add it to a cooker with turmeric and 3 cups water." },
      { step: 2, instruction: "Add pumpkin, potato, eggplant, raw banana, tomato and salt." },
      { step: 3, instruction: "Pressure cook for 3 to 4 whistles until the dal is soft and the vegetables are tender. Let the pressure release naturally." },
      { step: 4, instruction: "Open the cooker and gently mash the dal a little. Add hot water if it is too thick." },
      { step: 5, instruction: "Heat ghee in a kadai. Add cumin, dried red chilli and garlic." },
      { step: 6, instruction: "Cook until the garlic turns lightly golden and fragrant." },
      { step: 7, instruction: "Pour the tempering over the dalma and mix gently. Add grated coconut if using.", tip: { title: "Keep it light", content: "Dalma should be hearty but not heavily spiced. Let the lentils, vegetables and tempering carry the flavor." } },
      { step: 8, instruction: "Serve hot with steamed rice." },
    ],
    notes: ["Dalma has many seasonal versions. Traditional Odia preparations can be made without onion and garlic, while everyday home versions vary by household."],
    nutrition: { calories: 235, protein: 11, carbs: 34, fat: 6 },
  },

  "litti chokha": {
    dishName: "Litti Chokha",
    description: "Roasted whole-wheat balls stuffed with spiced sattu and served with smoky brinjal-potato chokha.",
    prepTime: "Approx. 1 hour",
    equipment: [
      { item: "oven", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Atta", englishName: "whole wheat flour" },
      { amount: "1/2 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "2 tbsp", commonName: "Tel", englishName: "oil or ghee" },
      { amount: "1 cup", commonName: "Sattu", englishName: "roasted gram flour" },
      { amount: "1 tsp", commonName: "Kalonji", englishName: "nigella seeds" },
      { amount: "1 tsp", commonName: "Ajwain", englishName: "carom seeds" },
      { amount: "1 tsp", commonName: "Lal Mirch Powder", englishName: "red chilli powder" },
      { amount: "1 tbsp", commonName: "Nimbu Ras", englishName: "lemon juice" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies, chopped" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "grated ginger" },
      { amount: "1 tbsp", commonName: "Sarson Tel", englishName: "mustard oil" },
      { amount: "2 medium", commonName: "Baingan", englishName: "eggplants" },
      { amount: "2 medium", commonName: "Tamatar", englishName: "tomatoes" },
      { amount: "2 medium", commonName: "Aloo", englishName: "potatoes, boiled" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Paani", englishName: "water" },
    ],
    method: [
      { step: 1, instruction: "Mix atta, ajwain, salt and oil. Add water gradually and knead into a soft dough. Rest for 15 minutes." },
      { step: 2, instruction: "Mix sattu with kalonji, ajwain, chilli powder, lemon juice, coriander, green chilli, ginger, mustard oil and salt. Add 1 to 2 tablespoons water so the filling holds together when pressed." },
      { step: 3, instruction: "Divide the dough into 8 balls. Flatten each, place filling in the centre and seal the dough around it. Roll gently into a smooth ball." },
      { step: 4, instruction: "Heat the oven to 220°C. Place the littis on a baking surface and roast for 25 to 30 minutes, turning once or twice, until firm and browned all over." },
      { step: 5, instruction: "For the chokha, roast the eggplants and tomatoes directly over a medium flame until the skins are charred and the centres are soft." },
      { step: 6, instruction: "Peel the roasted vegetables and mash them with the boiled potatoes, mustard oil, chopped chilli, coriander, lemon juice and salt." },
      { step: 7, instruction: "Brush the hot littis with a little ghee and lightly crack them before serving with chokha.", tip: { title: "Cook the centre", content: "The outside should be firm and lightly charred, but the centre must not feel doughy. Turn the littis during roasting for even cooking." } },
      { step: 8, instruction: "Serve hot with extra chokha and ghee." },
    ],
    notes: ["Traditionally litti is roasted over embers. A hot oven is the easiest home-kitchen substitute and gives a reliable cooked centre."],
    nutrition: { calories: 365, protein: 11, carbs: 49, fat: 13 },
  },

  "dhuska": {
    dishName: "Dhuska",
    description: "Jharkhandi rice-and-dal fritters with a crisp outside and soft centre, traditionally paired with aloo chana.",
    prepTime: "Approx. 7 hours (including soaking and fermentation)",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Chawal", englishName: "rice" },
      { amount: "1/2 cup", commonName: "Chana Dal", englishName: "split Bengal gram" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "grated ginger" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt" },
      { amount: "as needed", commonName: "Tel", englishName: "oil, for frying" },
    ],
    method: [
      { step: 1, instruction: "Wash the rice and chana dal separately and soak both for 5 to 6 hours, or overnight." },
      { step: 2, instruction: "Drain well. Grind the rice and dal with green chilli, ginger and cumin, using just enough water to make a thick, slightly coarse batter." },
      { step: 3, instruction: "Mix in turmeric and salt. Cover and leave the batter at room temperature for 6 to 8 hours.", tip: { title: "Check the batter", content: "It should look slightly aerated and smell mildly fermented. Keep it thick rather than watery." } },
      { step: 4, instruction: "Heat oil in a kadai over medium heat. Test with a small drop of batter; it should rise steadily without browning immediately." },
      { step: 5, instruction: "Drop a small ladleful of batter into the oil and gently shape it into a thick disc. Fry without overcrowding the kadai." },
      { step: 6, instruction: "Cook for 3 to 4 minutes per side until deep golden and cooked through. Drain on a plate." },
      { step: 7, instruction: "Serve hot with potato-chana curry or a simple chutney." },
    ],
    notes: ["A quick non-fermented version can be made with a tiny pinch of baking soda, but overnight fermentation gives a more traditional flavor and texture."],
    nutrition: { calories: 335, protein: 9, carbs: 48, fat: 12 },
  },

  "khar": {
    dishName: "Assamese Khar",
    description: "A gentle Assamese raw-papaya preparation flavored with alkaline khar water and mustard oil.",
    prepTime: "Approx. 35 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 cups", commonName: "Kaccha Papita", englishName: "raw papaya, peeled and cubed" },
      { amount: "1 tbsp", commonName: "Sarson Tel", englishName: "mustard oil" },
      { amount: "1/2 tsp", commonName: "Panch Phoron", englishName: "Bengali five-spice blend" },
      { amount: "1", commonName: "Sukhi Lal Mirch", englishName: "dried red chilli" },
      { amount: "1/2 cup", commonName: "Khar Paani", englishName: "traditional banana-ash alkaline water" },
      { amount: "1/4 tsp", commonName: "Baking Soda", englishName: "food-grade baking soda, only if khar water is unavailable" },
      { amount: "1.5 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Peel and cube the raw papaya. Rinse it well." },
      { step: 2, instruction: "Heat mustard oil in a kadai until it is hot. Lower the heat and add panch phoron and dried red chilli." },
      { step: 3, instruction: "Add the papaya and stir for 2 to 3 minutes." },
      { step: 4, instruction: "Add 1.5 cups water and a little salt. Cover and cook for 12 to 15 minutes until the papaya is tender." },
      { step: 5, instruction: "Add traditional khar water. If it is unavailable, dissolve 1/4 teaspoon food-grade baking soda in 3 tablespoons water and use that instead.", tip: { title: "Use khar sparingly", content: "Khar is alkaline and has a distinct taste. Add a little, taste, and only add more if needed." } },
      { step: 6, instruction: "Simmer uncovered for 3 to 5 minutes until the papaya is soft and the liquid lightly coats it." },
      { step: 7, instruction: "Serve hot as part of an Assamese meal, usually with plain rice." },
    ],
    notes: ["Traditional Assamese khar is made by filtering water through ash from dried banana peel or related plant material. The baking-soda method here is only a practical home substitute."],
    nutrition: { calories: 105, protein: 2, carbs: 12, fat: 6 },
  },

  "eromba": {
    dishName: "Eromba",
    description: "A fiery Manipuri mash of boiled vegetables, roasted chillies and fermented fish called ngari.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "stove", isSpecialized: false, alternative: null },
      { item: "pan", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "3 medium", commonName: "Aloo", englishName: "potatoes" },
      { amount: "1 cup", commonName: "Kela", englishName: "green banana, sliced, optional" },
      { amount: "6 to 8", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "30 g", commonName: "Ngari", englishName: "fermented fish" },
      { amount: "1 small", commonName: "Pyaaz", englishName: "onion, chopped" },
      { amount: "3", commonName: "Lasun", englishName: "garlic cloves" },
      { amount: "1 tbsp", commonName: "Sarson Tel", englishName: "mustard oil" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Boil the potatoes, and green banana if using, until completely tender. Drain." },
      { step: 2, instruction: "Roast the dried chillies in a dry pan on low heat for 1 to 2 minutes until aromatic. Do not burn them." },
      { step: 3, instruction: "Roast the ngari briefly in the same pan until warmed through and fragrant." },
      { step: 4, instruction: "Mash the potatoes and banana roughly while still warm." },
      { step: 5, instruction: "Crush the roasted chillies, ngari, onion and garlic together. Add salt." },
      { step: 6, instruction: "Mix the chilli-fish mixture into the warm mashed vegetables by hand or with a spoon until well combined.", tip: { title: "Control the heat", content: "Use fewer dried chillies for a milder version, but keep the fermented fish if you want the dish to remain recognisably Eromba." } },
      { step: 7, instruction: "Finish with coriander and a thin drizzle of mustard oil. Serve at room temperature with steamed rice." },
    ],
    notes: ["Ngari is the defining fermented ingredient in traditional Meitei Eromba. A substitute changes the character of the dish, so it is better to label any fish-free version separately."],
    nutrition: { calories: 165, protein: 8, carbs: 22, fat: 6 },
  },

  "dohneiihong": {
    dishName: "Dohneiihong",
    description: "Khasi pork slow-cooked with roasted black sesame, onions, ginger and garlic for a dark nutty gravy.",
    prepTime: "Approx. 1 hour",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Suar ka Gosht", englishName: "pork, preferably with some fat" },
      { amount: "4 tbsp", commonName: "Kala Til", englishName: "black sesame seeds" },
      { amount: "1 large", commonName: "Pyaaz", englishName: "onion, sliced" },
      { amount: "1 tbsp", commonName: "Adrak", englishName: "ginger, finely chopped" },
      { amount: "1 tbsp", commonName: "Lasun", englishName: "garlic, finely chopped" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies" },
      { amount: "1/2 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "2 tbsp", commonName: "Sarson Tel", englishName: "mustard oil" },
      { amount: "1 cup", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Dry roast black sesame in a kadai on low heat until it smells nutty and just starts to crackle. Cool it." },
      { step: 2, instruction: "Grind the roasted sesame into a coarse powder or thick paste. Do not add much water." },
      { step: 3, instruction: "Add pork, salt and 1 cup water to a cooker. Pressure cook until about 80% tender, roughly 4 to 5 whistles, then let the pressure release naturally." },
      { step: 4, instruction: "Heat mustard oil in a kadai. Add onion, ginger, garlic and green chilli. Cook until the onion softens and starts to brown." },
      { step: 5, instruction: "Add the cooked pork and turmeric. Toss on medium heat for 8 to 10 minutes so the meat picks up color and the pork fat renders." },
      { step: 6, instruction: "Add the ground black sesame and enough pork cooking liquid to keep the mixture moist." },
      { step: 7, instruction: "Cook on low heat for 8 to 10 minutes, stirring often, until the sesame forms a dark coating and the pork is completely tender.", tip: { title: "Toast sesame lightly", content: "Black sesame can turn bitter if burned. Stop roasting as soon as it becomes fragrant and begins to crackle." } },
      { step: 8, instruction: "Serve hot with plain steamed rice." },
    ],
    notes: ["Dohneiihong is a Khasi dish from Meghalaya and deliberately uses very few spices. Black sesame and pork are the main flavors."],
    nutrition: { calories: 470, protein: 27, carbs: 7, fat: 37 },
  },

  "axone pork": {
    dishName: "Axone Pork",
    description: "Naga pork cooked with fermented soybean axone, ginger, garlic, chillies and optional bamboo shoot.",
    prepTime: "Approx. 1 hour 25 minutes",
    equipment: [
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "500 g", commonName: "Suar ka Gosht", englishName: "pork, cut into 3 cm pieces" },
      { amount: "2 tbsp", commonName: "Axone", englishName: "fermented soybean paste" },
      { amount: "1 large", commonName: "Pyaaz", englishName: "onion, sliced" },
      { amount: "1 tbsp", commonName: "Adrak", englishName: "ginger, sliced" },
      { amount: "1 tbsp", commonName: "Lasun", englishName: "garlic, chopped" },
      { amount: "2", commonName: "Sukhi Lal Mirch", englishName: "dried red chillies" },
      { amount: "2", commonName: "Hari Mirch", englishName: "green chillies" },
      { amount: "100 g", commonName: "Bamboo Shoot", englishName: "bamboo shoot, rinsed and sliced, optional" },
      { amount: "2", commonName: "Tamatar", englishName: "tomatoes, chopped, optional" },
      { amount: "2 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Place the pork in a kadai over medium heat with 2 tablespoons water. Cook for about 10 minutes so the fat begins to render." },
      { step: 2, instruction: "Add onion, garlic and half the ginger. Cook in the rendered pork fat for 5 minutes until the onion softens." },
      { step: 3, instruction: "Add axone and cook for 2 to 3 minutes, stirring well so it coats the pork." },
      { step: 4, instruction: "Add the remaining ginger, dried chillies, green chillies and optional bamboo shoot or tomato." },
      { step: 5, instruction: "Add 2 cups water and simmer on low heat, covered, until the pork is tender, about 35 to 45 minutes.", tip: { title: "Axone is strong", content: "The fermented soybean flavor intensifies as it cooks. Start with 2 tablespoons and add more next time if you prefer a stronger version." } },
      { step: 6, instruction: "Remove the lid and cook uncovered for 8 to 10 minutes until the liquid reduces and the pork is well coated." },
      { step: 7, instruction: "Taste for salt and serve hot with plain rice." },
    ],
    notes: ["Axone, also called akhuni, is a fermented soybean product central to several Naga preparations. This is a practical stovetop home version."],
    nutrition: { calories: 455, protein: 26, carbs: 8, fat: 36 },
  },

  "bai": {
    dishName: "Bai",
    description: "A light Mizo vegetable stew of seasonal produce, green chilli and a little fermented flavor.",
    prepTime: "Approx. 30 minutes",
    equipment: [
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Patta Gobhi", englishName: "cabbage, chopped" },
      { amount: "1 cup", commonName: "Phali", englishName: "green beans, cut" },
      { amount: "1 cup", commonName: "Kaddu", englishName: "pumpkin or squash, cubed" },
      { amount: "1/2 cup", commonName: "Bamboo Shoot", englishName: "bamboo shoot, rinsed and sliced, optional" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli, slit" },
      { amount: "1 tsp", commonName: "Bekang", englishName: "fermented soybean, optional" },
      { amount: "1 tbsp", commonName: "Suar ki Charbi", englishName: "pork fat, optional" },
      { amount: "2 cups", commonName: "Paani", englishName: "water" },
      { amount: "to taste", commonName: "Namak", englishName: "salt" },
    ],
    method: [
      { step: 1, instruction: "Add the cabbage, beans, pumpkin and optional bamboo shoot to a kadai with 2 cups water and salt." },
      { step: 2, instruction: "Cover and cook on medium heat for 10 to 12 minutes until the vegetables begin to soften." },
      { step: 3, instruction: "Add the slit green chilli and optional fermented soybean or pork fat." },
      { step: 4, instruction: "Cook uncovered for another 8 to 10 minutes until the vegetables are tender and the broth is lightly reduced." },
      { step: 5, instruction: "Taste for salt. The finished bai should be simple and brothy rather than heavily spiced.", tip: { title: "Keep it simple", content: "Bai is valued for clean vegetable flavors. Heavy spice mixes will overpower the dish." } },
      { step: 6, instruction: "Serve hot with plain rice." },
    ],
    notes: ["Bai varies widely by household and season. Government of Mizoram sources describe bamboo-shoot bai as a particularly common version; this recipe keeps the base vegetable-forward so it is easy to cook at home."],
    nutrition: { calories: 105, protein: 4, carbs: 14, fat: 4 },
  },

  "fara": {
    dishName: "Fara",
    description: "Chhattisgarhi steamed rice dumplings filled with lightly spiced chana dal and served with chutney.",
    prepTime: "Approx. 45 minutes",
    equipment: [
      { item: "grinder", isSpecialized: false, alternative: null },
      { item: "cooker", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "1 cup", commonName: "Chana Dal", englishName: "split Bengal gram, soaked 2 hours" },
      { amount: "1 cup", commonName: "Chawal ka Aata", englishName: "rice flour" },
      { amount: "1 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1", commonName: "Hari Mirch", englishName: "green chilli" },
      { amount: "1 tsp", commonName: "Adrak", englishName: "grated ginger" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "2 tbsp", commonName: "Hara Dhaniya", englishName: "coriander leaves, chopped" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt, for dough" },
      { amount: "1/2 tsp", commonName: "Namak", englishName: "salt, for filling" },
      { amount: "2 tbsp", commonName: "Til", englishName: "sesame seeds" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil" },
      { amount: "1.5 cups", commonName: "Paani", englishName: "boiling water, as needed" },
    ],
    method: [
      { step: 1, instruction: "Drain the soaked chana dal and grind it coarsely with green chilli, ginger, cumin and a little water." },
      { step: 2, instruction: "Mix the dal with turmeric, coriander and salt. Keep the filling aside." },
      { step: 3, instruction: "Bring 1.5 cups water to a boil. Gradually mix the hot water into rice flour and salt to form a soft, warm dough. Knead briefly when cool enough to handle.", tip: { title: "Use hot water", content: "Hot water makes the rice-flour dough flexible enough to shape without cracking." } },
      { step: 4, instruction: "Divide the dough into small balls. Flatten each into a small disc and place 1 heaped teaspoon filling in the centre." },
      { step: 5, instruction: "Fold and seal the edges firmly so no filling can escape during steaming." },
      { step: 6, instruction: "Add water to a cooker and place the trivet inside. Arrange the fara on the trivet, cover without using pressure and steam for 15 to 18 minutes." },
      { step: 7, instruction: "Heat oil in a kadai. Add sesame seeds and let them sizzle. Toss the steamed fara in the tempering for 1 to 2 minutes if you want a lightly seasoned finish." },
      { step: 8, instruction: "Serve hot with green chutney or tomato-garlic chutney." },
    ],
    notes: ["There are both plain and stuffed versions of fara. The stuffed chana-dal version makes a more complete meal and uses simple ingredients."],
    nutrition: { calories: 225, protein: 7, carbs: 35, fat: 6 },
  },

  "poha jalebi": {
    dishName: "Poha Jalebi",
    description: "Indore-style poha topped with sev and lemon, served alongside crisp syrupy jalebi for breakfast.",
    prepTime: "Approx. 40 minutes",
    equipment: [
      { item: "pan", isSpecialized: false, alternative: null },
      { item: "kadai", isSpecialized: false, alternative: null },
      { item: "stove", isSpecialized: false, alternative: null },
    ],
    ingredients: [
      { amount: "2 cups", commonName: "Poha", englishName: "thick flattened rice" },
      { amount: "1 medium", commonName: "Pyaaz", englishName: "onion, finely chopped" },
      { amount: "1/2 tsp", commonName: "Rai", englishName: "mustard seeds" },
      { amount: "1/2 tsp", commonName: "Jeera", englishName: "cumin seeds" },
      { amount: "1/2 tsp", commonName: "Saunf", englishName: "fennel seeds" },
      { amount: "6", commonName: "Kadi Patta", englishName: "curry leaves" },
      { amount: "1/4 tsp", commonName: "Haldi", englishName: "turmeric" },
      { amount: "1/2 tsp", commonName: "Chaat Masala", englishName: "chaat masala" },
      { amount: "1/2 tsp", commonName: "Bhuna Jeera Powder", englishName: "roasted cumin powder" },
      { amount: "1 tsp", commonName: "Cheeni", englishName: "sugar" },
      { amount: "1 tbsp", commonName: "Doodh", englishName: "milk" },
      { amount: "1/2 cup", commonName: "Sev", englishName: "sev" },
      { amount: "2 tbsp", commonName: "Anar", englishName: "pomegranate seeds" },
      { amount: "1", commonName: "Nimbu", englishName: "lemon" },
      { amount: "1 tbsp", commonName: "Tel", englishName: "oil" },
      { amount: "for jalebi", commonName: "Maida", englishName: "all-purpose flour" },
      { amount: "2 tbsp", commonName: "Dahi", englishName: "plain yogurt" },
      { amount: "1/4 tsp", commonName: "Baking Powder", englishName: "baking powder" },
      { amount: "3/4 cup", commonName: "Cheeni", englishName: "sugar, for syrup" },
      { amount: "1/2 cup", commonName: "Paani", englishName: "water" },
      { amount: "as needed", commonName: "Tel", englishName: "oil, for frying jalebi" },
    ],
    method: [
      { step: 1, instruction: "Whisk the jalebi flour, yogurt, baking powder and enough water into a smooth, thick batter. Rest for 15 minutes." },
      { step: 2, instruction: "Boil 3/4 cup sugar with 1/2 cup water for 5 to 6 minutes until the syrup feels slightly sticky between cool fingertips." },
      { step: 3, instruction: "Rinse the poha in a strainer until softened. Drain completely and leave it for 5 minutes." },
      { step: 4, instruction: "Heat oil in a pan. Add mustard, cumin and fennel. Let them sizzle." },
      { step: 5, instruction: "Add curry leaves and onion. Cook for 2 to 3 minutes, then add turmeric, sugar and salt." },
      { step: 6, instruction: "Add the softened poha, a splash of milk and chaat masala. Toss gently for 2 to 3 minutes. Finish with roasted cumin powder." },
      { step: 7, instruction: "Heat jalebi-frying oil in a kadai over medium heat. Pipe small spirals of batter into the oil and fry until golden and crisp." },
      { step: 8, instruction: "Drain the jalebi briefly, then dip it in warm syrup for about 30 seconds and remove." },
      { step: 9, instruction: "Top the poha with sev and pomegranate. Squeeze lemon over it and serve immediately with the warm jalebi.", tip: { title: "Serve together", content: "Indori poha is best when the poha stays fluffy and the sev stays crisp. Add the sev and lemon just before eating." } },
    ],
    notes: ["Poha-Jalebi is especially associated with Indore, Madhya Pradesh. Indori poha commonly uses jeeravan-style spice, sev and a little sweetness; the jalebi is served alongside rather than mixed into the poha."],
    nutrition: { calories: 455, protein: 7, carbs: 70, fat: 16 },
  },

};

/** Number of servings represented by each recipe batch, used as the basis for per-serving nutrition. */
export const predefinedRecipeServings: Record<string, number> = {
  "quick 20-minute paneer bhurji": 2,
  "poha (kanda batata poha)": 3,
  "vegetable upma": 3,
  "egg bhurji (anda bhurji)": 2,
  "quick vegetable pulao": 3,
  "healthy moong dal cheela": 3,
  "vegetable dalia (broken wheat porridge)": 3,
  "curd rice (thayir sadam)": 3,
  "sprouts chaat": 2,
  "lauki chana dal (bottle gourd with split chickpea lentils)": 3,
  "kheer": 6,
  "gajar halwa (carrot halwa)": 6,
  "besan ladoo": 16,
  "rava kesari (semolina halwa)": 5,
  "gulab jamun (home-style, with milk powder)": 14,
  "palak paneer": 4,
  "chana masala": 4,
  "rajma (red kidney bean curry)": 4,
  "bhindi masala (okra stir-fry)": 4,
  "mutter mushroom": 4,
  "baingan bharta (smoky roasted eggplant mash)": 4,
  "classic chicken korma": 4,
  "butter chicken (murgh makhani)": 4,
  "home-style chicken curry": 4,
  "chicken tikka masala (stovetop)": 4,
  "chicken 65": 4,
  "garlic naan on tawa": 6,
  "jeera rice": 4,
  "aloo paratha": 6,
  "laccha paratha (multi-layered flatbread)": 6,
  "lemon rice (chitranna)": 4,
  "paneer butter masala": 4,
  "chicken biryani": 4,
  "masala dosa": 4,
  "aloo gobi": 4,
  "dal makhani": 4,
  "samosa": 6,
  "rajma chawal": 4,
  "chole bhature": 4,
  "chole kulche": 4,
  "shahi paneer": 4,
  "dal tadka": 4,
  "matar paneer": 4,
  "pav bhaji": 4,
  "egg curry (anda curry)": 4,
  "idli sambar": 4,
  "dosa (plain crispy dosa)": 4,
  "french toast (anda bread)": 4,
  "french beans (beans ki sabzi)": 4,
  "nutrela (soya chunks curry)": 4,
  "atta halwa (wheat flour halwa)": 6,
  "chana dal (chana dal tadka)": 4,
  "white chole (safed chole)": 4,
  "pasta (indian masala pasta)": 4,
  "maggi (masala maggi noodles)": 4,
  "macaroni (masala macaroni)": 4,
  "cake (simple eggless vanilla cake)": 8,
  "pakode (pakora)": 3,
  "chai (masala chai)": 4,
  "kadai paneer": 4,
  "tandoori chicken (oven-style)": 4,
  "veg biryani": 4,
  "vada pav": 4,
  "rasam": 4,
  "khichdi (moong dal khichdi)": 4,
  "lassi (sweet lassi)": 4,
  "roti (chapati)": 8,
  "sambar chawal": 4,
  "pani puri (golgappe)": 6,
  "rasmalai": 6,
  "mutton curry": 4,
  "medu vada": 7,
  "tinda sabzi": 4,
  "gajar matar": 4,
  "kadai chicken": 4,
  "mutton biryani": 4,
  "uttapam": 5,
  "momos (veg momos)": 4,
  "egg omelette": 1,
  "boiled eggs": 2,
  "veg sandwich": 4,
  "paneer sandwich": 4,
  "cheese sandwich": 2,
  "besan chila": 4,
  "pongal (ven pongal)": 4,
  "chole chawal": 4,
  "kadhi chawal": 4,
  "bread pakoda": 4,
  "kachori (moong dal kachori)": 4,
  "bhel puri": 3,
  "paneer tikka": 4,
  "rasam rice": 4,
  "chicken kabab": 4,
  "seekh kabab": 4,
  "mutton kabab": 4,
  "chicken salami (home style)": 4,
  "paneer curry": 4,
  "chicken keema": 4,
  "aloo tamatar sabzi": 4,
  "kadhi": 4,
  "mushroom masala": 4,
  "palak mushroom": 4,
  "aloo matar": 4,
  "dal palak": 4,
  "lobia masala": 4,
  "aloo methi": 4,
  "gobi masala": 4,
  "kofta curry (lauki kofta)": 4,
  "malai kofta": 4,
  "dum aloo": 4,
  "tori sabzi": 4,
  "moong dal": 4,
  "masoor dal": 4,
  "dal baati": 4,
  "dahi vada": 6,
  "thepla": 6,
  "matar pulao": 4,
  "kothu parotta": 4,
  "patta gobhi sabzi": 4,
  "paneer lababdar": 4,
  "matar korma": 4,
  "amritsari chole": 4,
  "sarson ka saag": 4,
  "makki di roti": 6,
  "mooli ki sabzi": 4,
  "lauki sabzi": 4,
  "arbi masala": 4,
  "soya chaap": 4,
  "papdi chaat": 3,
  "sev puri": 6,
  "dahi puri": 6,
  "fish curry (fish masala)": 4,
  "fish fingers": 4,
  "kadhi pakora": 4,
  "keema matar": 4,
  "karela sabzi": 4,
  "toor dal": 4,
  "aloo tikki": 4,
  "dhokla (besan dhokla)": 4,
  "tomato rice": 4,
  "parotta": 6,
  "achari paneer": 4,
  "vegetable kurma": 4,
  "aloo shimla mirch": 4,
  "pindi chole": 4,
  "rogan josh": 4,
  "kulfi": 4,
  "sushi (veg sushi)": 4,
  "vangi bath": 4,
  "sambar": 4,
  "parippu curry": 4,
  "benne dosa": 6,
  "rava dosa": 6,
  "thatte idli": 6,
  "bisi bele bath": 4,
  "khara bath": 4,
  "puliyogare": 4,
  "aloo palya": 4,
  "dal chawal": 4,
  "aloo sabzi": 4,
  "bread butter": 2,
  "bread jam": 2,
  "bread honey": 2,
  "dahi (homemade curd)": 4,
  "mutter poha (peas poha)": 4,
  "mixed veg sabzi": 4,
  "shukto": 4,
  "vermicelli (masala seviyan)": 4,
  "chocolate cake": 8,
  "strawberry cake": 8,
  "pineapple cake": 8,
  "aamti": 4,
  "gobhi paratha": 6,
  "mooli paratha": 6,
  "paneer momos": 4,
  "chicken momos": 4,
  "tandoori momos": 4,
  "home style pizza": 2,
  "home style burger": 4,
  "easy chocolate ice cream": 4,
  "easy vanilla ice cream": 4,
  "easy strawberry ice cream": 4,
  "easy orange juice": 2,
  "fresh apple juice": 2,
  "easy mango juice": 2,
  "fresh pineapple juice": 2,
  "fresh grape juice": 2,
  "fresh watermelon juice": 2,
  "easy vanilla milkshake": 2,
  "easy chocolate milkshake": 2,
  "easy strawberry milkshake": 2,
  "easy oreo milkshake": 2,
  "hot coffee": 1,
  "easy cold coffee": 2,
  "easy coffee frappe": 2,
  "easy iced latte": 1,
  "easy vietnamese coffee": 1,

  "rajma gogji": 4,
  "siddu": 4,
  "aloo ke gutke": 4,
  "gatte ki sabzi": 4,
  "sev tameta": 4,
  "bharli vangi": 4,
  "ros omelette": 2,
  "beef ularthiyathu": 4,
  "gutti vankaya": 4,
  "bagara baingan": 4,
  "dalma": 4,
  "litti chokha": 4,
  "dhuska": 4,
  "khar": 4,
  "eromba": 3,
  "dohneiihong": 4,
  "axone pork": 4,
  "bai": 4,
  "fara": 4,
  "poha jalebi": 2,

};
