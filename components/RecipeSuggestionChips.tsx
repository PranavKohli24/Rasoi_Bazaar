import React from 'react';

interface RecipeSuggestionChipsProps {
    onSelect: (dish: string) => void;
}

const suggestions = ["Paneer Butter Masala", "Chicken Biryani", "Masala Dosa", "Aloo Gobi", "Dal Makhani", "Samosa"];

const RecipeSuggestionChips: React.FC<RecipeSuggestionChipsProps> = ({ onSelect }) => {
    return (
        <div
        className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8 lg:mt-0 animate-fade-in-up"
        style={{ animationDelay: '0.5s' }}
        >
            <p className="w-full text-center lg:text-left text-stone-400 mb-2">Or you can try one of these:</p>
            {suggestions.map((dish, index) => (
                <button 
                    key={index}
                    onClick={() => onSelect(dish)}
                    className="px-4 py-2 bg-stone-800/60 text-stone-200 rounded-full border border-stone-700 hover:bg-stone-700/80 hover:text-white transition-colors duration-200"
                >
                    {dish}
                </button>
            ))}
        </div>
    );
};

export default RecipeSuggestionChips;