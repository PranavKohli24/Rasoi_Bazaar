import React from 'react';

interface CategoryBrowserProps {
    onSelect: (dish: string) => void;
}

const categories = [
    {
        name: 'Quick Meals',
        description: 'Under 30 minutes',
        searchTerm: 'Quick 20-minute Paneer Bhurji',
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
        searchTerm: 'Healthy Moong Dal Cheela',
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
        searchTerm: 'Kheer',
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
        searchTerm: 'Palak Paneer',
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
        searchTerm: 'Classic Chicken Korma',
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
        searchTerm: 'Garlic Naan on Tawa',
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
    return (
        <div className="w-full animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="w-full text-center text-stone-300 mb-4 text-lg">Or Explore by Category</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map((cat) => (
                    <button 
                        key={cat.name}
                        onClick={() => onSelect(cat.searchTerm)}
                        className="group flex flex-col items-center justify-center text-center p-4 bg-stone-800/60 rounded-xl border-2 border-stone-700 backdrop-blur-sm hover:bg-stone-700/80 hover:border-orange-500/70 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
                    >
                        <div className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                            {cat.icon}
                        </div>
                        <h3 className="font-bold text-base sm:text-lg text-white">{cat.name}</h3>
                        <p className="text-xs sm:text-sm text-stone-400">{cat.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryBrowser;
