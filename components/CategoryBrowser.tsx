import React from 'react';
import SectionDivider from './SectionDivider';

interface CategoryBrowserProps {
    onSelect: (dish: string) => void;
}

// `tint` is a soft pastel behind each icon (peach, butter, rose, sage, sand, mint).
const categories = [
    {
        name: 'Quick Meals',
        description: 'Easy everyday favourites',
        icon: '/quick-meals.svg',
        tint: '#FFE3C2',
        searchTerms: [
            'Paneer Bhurji',
            'Poha (Kanda Batata Poha)',
            'Vegetable Upma',
            'Egg Bhurji (Anda Bhurji)',
            'Quick Vegetable Pulao',
            'Masala Maggi Noodles',
            'Veg Sandwich',
            'Bread Omelette',
            'Masala Oats',
        ],
    },
    {
        name: 'Healthy & Light',
        description: 'Nutritious & wholesome',
        icon: '/healthy-light.svg',
        tint: '#DDEBD3',
        searchTerms: [
            'Moong Dal Cheela',
            'Vegetable Dalia (Broken Wheat Porridge)',
            'Curd Rice (Thayir Sadam)',
            'Sprouts Chaat',
            'Lauki Chana Dal',
            'Khichdi'
        ],
    },
    {
        name: 'Decadent Desserts',
        description: 'Sweet treats worth making',
        icon: '/dessert-classics.svg',
        tint: '#FADDD8',
        searchTerms: [
            'Chocolate Ice Cream',
            'Vanilla Ice Cream',
            'Strawberry Ice Cream',
            'Fruit Custard',
            'Chocolate Milkshake',
            'Falooda',
            'Kulfi',
            'Kheer',
            'Gulab Jamun',
            'Rasmalai',
        ],
    },
    {
        name: 'Vegetarian Mains',
        description: 'Everyday Indian comfort food',
        icon: '/vegetarian-mains.svg',
        tint: '#E4F0DA',
        searchTerms: [
            'Paneer Butter Masala',
            'Chana Masala',
            'Rajma',
            'Aloo Gobi',
            'Dal Tadka',
            'Matar Paneer',
            'Kadai Paneer',
            'Bhindi Masala',
            'Shahi Paneer',
            'Chole Chawal',
        ],
    },
    {
        name: 'Chicken Classics',
        description: 'Popular chicken favourites',
        icon: '/chicken-classics.svg',
        tint: '#FFF1C9',
        searchTerms: [
            'Butter Chicken (Murgh Makhani)',
            'Home-style Chicken Curry',
            'Chicken Korma',
            'Chicken Tikka',
            'Chicken 65',
            'Chicken Biryani',
            'Chicken Keema',
            'Chilli Chicken',
            'Chicken Fried Rice',
            'Chicken Kathi Roll',
        ],
    },
    {
        name: 'Breads & Rice',
        description: 'Everyday staples & sides',
        icon: '/rice-classics.svg',
        tint: '#F3E6D3',
        searchTerms: [
            'Roti (Chapati)',
            'Garlic Naan',
            'Aloo Paratha',
            'Laccha Paratha',
            'Jeera Rice',
            'Plain Rice',
            'Lemon Rice (Chitranna)',
            'Veg Biryani',
            'Matar Pulao',
            'Coconut Rice',
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

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
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