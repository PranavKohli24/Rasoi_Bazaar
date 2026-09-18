import React, { useRef } from 'react';

interface CategoryBrowserProps {
    onSelect: (dish: string) => void;
}

const categories = [
    {
        name: 'Quick Meals',
        description: 'Under 30 minutes',
        searchTerms: [
            'Quick 20-minute Paneer Bhurji',
            'Poha (Kanda Batata Poha)',
            'Vegetable Upma',
            'Egg Bhurji (Anda Bhurji)',
            'Quick Vegetable Pulao',
        ],
        icon: (
            <img
                src="/quick-meals.svg"
                alt=""
                className="h-11 w-11 mb-3 object-contain"
                draggable={false}
            />
        )
    },
    {
        name: 'Healthy & Light',
        description: 'Nutritious & wholesome',
        searchTerms: [
            'Healthy Moong Dal Cheela',
            'Vegetable Dalia (Broken Wheat Porridge)',
            'Curd Rice (Thayir Sadam)',
            'Sprouts Chaat',
            'Lauki Chana Dal (Bottle Gourd with Split Chickpea Lentils)',
        ],
        icon: (
            <img
                src="/healthy-light.svg"
                alt=""
                className="h-11 w-11 mb-3 object-contain"
                draggable={false}
            />
        )
    },
    {
        name: 'Decadent Desserts',
        description: 'Sweet indulgences',
        searchTerms: [
            'Kheer',
            'Gajar Halwa (Carrot Halwa)',
            'Besan Ladoo',
            'Rava Kesari (Semolina Halwa)',
            'Gulab Jamun (home-style, with milk powder)',
        ],
        icon: (
            <img
                src="/dessert-classics.svg"
                alt=""
                className="h-11 w-11 mb-3 object-contain"
                draggable={false}
            />
        )
    },
    {
        name: 'Vegetarian Mains',
        description: 'Hearty & flavorful',
        searchTerms: [
            'Palak Paneer',
            'Chana Masala',
            'Rajma (Red Kidney Bean Curry)',
            'Bhindi Masala (Okra Stir-fry)',
            'Baingan Bharta (Smoky Roasted Eggplant Mash)',
        ],
        icon: (
            <img
                src="/vegetarian-mains.svg"
                alt=""
                className="h-11 w-11 mb-3 object-contain"
                draggable={false}
            />
        )
    },
    {
        name: 'Chicken Classics',
        description: 'All-time favorites',
        searchTerms: [
            'Classic Chicken Korma',
            'Butter Chicken (Murgh Makhani)',
            'Home-style Chicken Curry',
            'Chicken Tikka Masala (Stovetop)',
            'Chicken 65',
        ],
        icon: (
            <img
                src="/chicken-classics.svg"
                alt=""
                className="h-11 w-11 mb-3 object-contain"
                draggable={false}
            />
        )
    },
    {
        name: 'Breads & Rice',
        description: 'Perfect accompaniments',
        searchTerms: [
            'Garlic Naan on Tawa',
            'Jeera Rice',
            'Aloo Paratha',
            'Laccha Paratha (Multi-layered Flatbread)',
            'Lemon Rice (Chitranna)',
        ],
        icon: (
            <img
                src="/rice-classics.svg"
                alt=""
                className="h-11 w-11 mb-3 object-contain"
                draggable={false}
            />
        )
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
        <div className="w-full animate-fade-in-up">
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-700 to-stone-600" />
                <p className="shrink-0 text-center text-stone-200 text-base sm:text-lg font-medium tracking-tight">
                    Or Explore by Category
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-stone-700 to-stone-600" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        type="button"
                        onClick={() => handleCategoryClick(cat.name, cat.searchTerms)}
                        className="group min-h-[132px] sm:min-h-[142px] flex flex-col items-center justify-center text-center px-4 py-5 sm:px-5 bg-stone-900/55 rounded-2xl border border-stone-700/70 backdrop-blur-md transition-all duration-250 hover:bg-stone-800/70 hover:border-orange-300/30 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    >
                        <div className="text-orange-300/90 group-hover:text-orange-200 transition-colors duration-300">
                            {cat.icon}
                        </div>

                        <h3 className="font-semibold text-sm sm:text-lg text-white tracking-tight leading-tight">
                            {cat.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-stone-400 mt-1">
                            {cat.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryBrowser;
