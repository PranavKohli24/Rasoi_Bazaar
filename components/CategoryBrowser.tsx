import React from 'react';

interface CategoryBrowserProps {
    onSelect: (dish: string) => void;
}

const categories = [
    { 
        name: 'Quick Meals', 
        description: 'Under 30 minutes', 
        searchTerm: 'Quick 20-minute Paneer Bhurji', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" /></svg>
    },
    { 
        name: 'Healthy & Light', 
        description: 'Nutritious & wholesome', 
        searchTerm: 'Healthy Moong Dal Cheela', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 4.343a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM14.95 5.05a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" /></svg>
    },
    { 
        name: 'Decadent Desserts', 
        description: 'Sweet indulgences', 
        searchTerm: 'Royal Shahi Tukda', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v6h-1.172a3 3 0 00-2.121.879l-2.438 2.438a1 1 0 01-.707.293H8.414a1 1 0 01-.707-.293l-2.438-2.438A3 3 0 003.172 11H2V5a3 3 0 013-3zM11 5a1 1 0 10-2 0v1a1 1 0 102 0V5z" clipRule="evenodd" /></svg>
    },
    { 
        name: 'Vegetarian Mains', 
        description: 'Hearty & flavorful', 
        searchTerm: 'Palak Paneer', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" viewBox="0 0 20 20" fill="currentColor"><path d="M17.13,4.06C16.74,2.8,15.6,2,14.24,2H5.76C4.4,2,3.26,2.8,2.87,4.06L2,6.87V15a2,2,0,0,0,2,2H16a2,2,0,0,0,2-2V6.87ZM5,12a1,1,0,1,1,1-1A1,1,0,0,1,5,12Zm10,0a1,1,0,1,1,1-1A1,1,0,0,1,15,12Z"/></svg>
    },
    { 
        name: 'Chicken Classics', 
        description: 'All-time favorites', 
        searchTerm: 'Classic Chicken Korma', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.4,2.6C12,1.3,10,2.1,9.3,3.7c-2,4.6,0.1,9.5,4.2,12.3c0.8,0.5,1.7,0.2,2.1-0.7c0.5-1-0.1-2.1-1.1-2.5 c-2.4-0.9-4-3.5-3.5-5.9c0.2-1,1.3-1.6,2.3-1.3c0.8,0.2,1.2,1.1,1,1.9C13.5,8,14.8,8,15.3,7.2C16.5,5.2,15.4,3.4,13.4,2.6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.6,15.2c2.8,2,4.6,5.1,4.2,8.2c-0.2,1.4-1.7,2.3-3,1.8s-2-2.1-1.8-3.5c0.4-3.4-1.3-6.5-4-8.2" /></svg>
    },
    { 
        name: 'Breads & Rice', 
        description: 'Perfect accompaniments', 
        searchTerm: 'Garlic Naan on Tawa', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.5,10.9c0.7-3,3.4-5.4,6.5-5.4s5.8,2.4,6.5,5.4" /><path strokeLinecap="round" strokeLinejoin="round" d="M5,13.2c0.6-2.1,2.6-3.7,4.9-3.7s4.4,1.6,4.9,3.7" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.9,15.4C7.4,14,8.6,13,10,13s2.6,1,3.1,2.4" /><path strokeLinecap="round" strokeLinejoin="round" d="M12,2a8.5,8.5,0,0,1,8.5,8.5c0,4.7-3.8,8.5-8.5,8.5S3.5,15.2,3.5,10.5A8.5,8.5,0,0,1,12,2Z" /></svg>
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
