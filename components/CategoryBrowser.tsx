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
                className="h-10 w-10 mb-3 object-contain"
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
                className="h-10 w-10 mb-3 object-contain"
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
                className="h-10 w-10 mb-3 object-contain"
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
                className="h-10 w-10 mb-3 object-contain"
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
                className="h-10 w-10 mb-3 object-contain"
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
                className="h-10 w-10 mb-3 object-contain"
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

        // Keep only dishes that haven't been shown yet
        let availableDishes = searchTerms.filter(
            (dish) => !usedDishes.includes(dish)
        );

        // If all 5 have already been shown, reset the category
        if (availableDishes.length === 0) {
            usedDishesRef.current[categoryName] = [];
            availableDishes = [...searchTerms];
        }

        // Pick randomly from the remaining dishes
        const randomDish =
            availableDishes[Math.floor(Math.random() * availableDishes.length)];

        // Remember this dish
        usedDishesRef.current[categoryName] = [
            ...usedDishesRef.current[categoryName] || [],
            randomDish,
        ];

        onSelect(randomDish);
    };

    return (
        <div
            className="w-full animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
        >
            <p className="w-full text-center text-stone-300 mb-4 text-lg">
                Or Explore by Category
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.name, cat.searchTerms)}
                        className="group flex flex-col items-center justify-center text-center p-5 bg-stone-800/50 rounded-2xl border border-stone-700/80 backdrop-blur-sm hover:bg-stone-800/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    >
                        <div className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                            {cat.icon}
                        </div>

                        <h3 className="font-semibold text-base sm:text-lg text-white tracking-tight">
                            {cat.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
                            {cat.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryBrowser;