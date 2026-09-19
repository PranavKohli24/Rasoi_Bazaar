import React, { useRef } from 'react';
import SectionDivider from './SectionDIvider';

interface CategoryBrowserProps {
    onSelect: (dish: string) => void;
}

const categories = [
    {
        name: 'Quick Meals',
        description: 'Under 30 minutes',
        icon: '/quick-meals.svg',
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
        searchTerms: [
            'Garlic Naan on Tawa',
            'Jeera Rice',
            'Aloo Paratha',
            'Laccha Paratha (Multi-layered Flatbread)',
            'Lemon Rice (Chitranna)',
        ],
    },
];

const CategoryBrowser: React.FC<CategoryBrowserProps> = ({ onSelect }) => {
    const usedDishesRef = useRef<Record<string, string[]>>({});

    const handleCategoryClick = (
        categoryName: string,
        searchTerms: string[]
    ) => {
        const usedDishes = usedDishesRef.current[categoryName] || [];

        let availableDishes = searchTerms.filter(
            (dish) => !usedDishes.includes(dish)
        );

        if (availableDishes.length === 0) {
            usedDishesRef.current[categoryName] = [];
            availableDishes = [...searchTerms];
        }

        const randomDish =
            availableDishes[Math.floor(Math.random() * availableDishes.length)];

        usedDishesRef.current[categoryName] = [
            ...(usedDishesRef.current[categoryName] || []),
            randomDish,
        ];

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
                        className="group relative flex flex-col items-start gap-3 rounded-2xl border border-stone-800 bg-stone-900/50 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300/40 hover:bg-stone-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 sm:p-5"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10 transition-colors group-hover:bg-orange-400/20 sm:h-12 sm:w-12">
                            <img
                                src={cat.icon}
                                alt=""
                                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                                draggable={false}
                            />
                        </span>

                        <span className="block">
                            <span className="block text-base font-semibold leading-tight text-orange-50 sm:text-lg">
                                {cat.name}
                            </span>
                            <span className="mt-1 block text-sm text-stone-400">
                                {cat.description}
                            </span>
                        </span>

                        <span
                            aria-hidden="true"
                            className="absolute right-4 top-4 text-stone-600 transition-colors group-hover:text-orange-300"
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