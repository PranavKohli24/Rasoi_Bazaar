import React from 'react';
import SectionDivider from './SectionDivider';

interface CategoryBrowserProps {
    onSelect: (dish: string) => void;
}

// `tint` is a soft pastel behind each icon (peach, butter, rose, sage, sand, mint).
const categories = [
    {
        name: 'Quick Meals',
        description: 'Under 30 minutes',
        icon: '/quick-meals.svg',
        tint: '#FFE8D6',
        searchTerms: [
            'Quick 20-minute Paneer Bhurji',
            'Poha (Kanda Batata Poha)',
            'Vegetable Upma',
            'Egg Bhurji (Anda Bhurji)',
            'Quick Vegetable Pulao',
        ],
    },
    {
        name: 'Healthy & Light',
        description: 'Nutritious & wholesome',
        icon: '/healthy-light.svg',
        tint: '#DDEBD3',
        searchTerms: [
            'Healthy Moong Dal Cheela',
            'Vegetable Dalia (Broken Wheat Porridge)',
            'Curd Rice (Thayir Sadam)',
            'Sprouts Chaat',
            'Lauki Chana Dal (Bottle Gourd with Split Chickpea Lentils)',
        ],
    },
    {
        name: 'Decadent Desserts',
        description: 'Sweet indulgences',
        icon: '/dessert-classics.svg',
        tint: '#FADDD8',
        searchTerms: [
            'Kheer',
            'Gajar Halwa (Carrot Halwa)',
            'Besan Ladoo',
            'Rava Kesari (Semolina Halwa)',
            'Gulab Jamun (home-style, with milk powder)',
        ],
    },
    {
        name: 'Vegetarian Mains',
        description: 'Hearty & flavorful',
        icon: '/vegetarian-mains.svg',
        tint: '#E4F0DA',
        searchTerms: [
            'Palak Paneer',
            'Chana Masala',
            'Rajma (Red Kidney Bean Curry)',
            'Bhindi Masala (Okra Stir-fry)',
            'Baingan Bharta (Smoky Roasted Eggplant Mash)',
        ],
    },
    {
        name: 'Chicken Classics',
        description: 'All-time favorites',
        icon: '/chicken-classics.svg',
        tint: '#FFF1C9',
        searchTerms: [
            'Classic Chicken Korma',
            'Butter Chicken (Murgh Makhani)',
            'Home-style Chicken Curry',
            'Chicken Tikka Masala (Stovetop)',
            'Chicken 65',
        ],
    },
    {
        name: 'Breads & Rice',
        description: 'Perfect accompaniments',
        icon: '/rice-classics.svg',
        tint: '#F3E6D3',
        searchTerms: [
            'Garlic Naan on Tawa',
            'Jeera Rice',
            'Aloo Paratha',
            'Laccha Paratha (Multi-layered Flatbread)',
            'Lemon Rice (Chitranna)',
        ],
    },
];

// Remembered per browser tab. The home page unmounts whenever you open a
// recipe, so this can't live in component state or the "no repeats" rule
// would reset every time you come back.
const USED_DISHES_KEY = 'rasoi:used-dishes';

const loadUsedDishes = (): Record<string, string[]> => {
    try {
        return JSON.parse(sessionStorage.getItem(USED_DISHES_KEY) ?? '{}') ?? {};
    } catch {
        return {};
    }
};

const saveUsedDishes = (used: Record<string, string[]>) => {
    try {
        sessionStorage.setItem(USED_DISHES_KEY, JSON.stringify(used));
    } catch {
        /* ignore storage problems */
    }
};

const CategoryBrowser: React.FC<CategoryBrowserProps> = ({ onSelect }) => {
    const handleCategoryClick = (
        categoryName: string,
        searchTerms: string[]
    ) => {
        const used = loadUsedDishes();
        const usedDishes = (used[categoryName] ?? []).filter((dish) =>
            searchTerms.includes(dish)
        );

        let availableDishes = searchTerms.filter(
            (dish) => !usedDishes.includes(dish)
        );

        // Every dish has been shown: start a new round, but never open the
        // round with the dish that was just shown.
        if (availableDishes.length === 0) {
            const lastShown = usedDishes[usedDishes.length - 1];
            availableDishes = searchTerms.filter((dish) => dish !== lastShown);
            usedDishes.length = 0;
        }

        const randomDish =
            availableDishes[Math.floor(Math.random() * availableDishes.length)];

        used[categoryName] = [...usedDishes, randomDish];
        saveUsedDishes(used);

        onSelect(randomDish);
    };

    return (
        <section aria-labelledby="browse-heading" className="w-full">
            <SectionDivider
                heading
                id="browse-heading"
                label="Or explore by category"
            />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        type="button"
                        onClick={() =>
                            handleCategoryClick(cat.name, cat.searchTerms)
                        }
                        className="group relative flex flex-col items-start gap-3 rounded-2xl border border-stone-700 bg-stone-900 p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 sm:p-5"
                    >
                        <span
                            className="flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14"
                            style={{ backgroundColor: cat.tint }}
                        >
                            <img
                                src={cat.icon}
                                alt=""
                                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                                draggable={false}
                            />
                        </span>

                        <span className="block">
                            <span className="block text-base font-semibold leading-tight text-stone-100 sm:text-lg">
                                {cat.name}
                            </span>
                            <span className="mt-1 block text-sm text-stone-400">
                                {cat.description}
                            </span>
                        </span>

                        <span
                            aria-hidden="true"
                            className="absolute right-4 top-4 text-stone-600 transition-colors group-hover:text-orange-200"
                        >
                            ↗
                        </span>
                    </button>
                ))}
            </div>

            <p className="mt-4 text-center text-sm text-stone-400">
                Tap a category and we&apos;ll pick a dish for you.
            </p>
        </section>
    );
};

export default CategoryBrowser;