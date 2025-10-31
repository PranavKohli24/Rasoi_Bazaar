import React from 'react';

interface RecipeSuggestionChipsProps {
    onSelect: (dish: string) => void;
}

const suggestions = ["Paneer Butter Masala", "Chicken Biryani", "Masala Dosa", "Aloo Gobi", "Dal Makhani", "Samosa"];

const RecipeSuggestionChips: React.FC<RecipeSuggestionChipsProps> = ({ onSelect }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <p className="w-full text-center text-stone-400 mb-2">Or you can try one of these:</p>
            {suggestions.map((dish, index) => (
                <button 
                    key={index}
                    onClick={() => onSelect(dish)}
                    className="px-4 py-2 bg-stone-700/50 text-orange-200 rounded-full border border-stone-600 hover:bg-orange-400 hover:text-stone-900 hover:border-orange-400 transition-all duration-300 transform hover:scale-105"
                >
                    {dish}
                </button>
            ))}
        </div>
    );
};

export default RecipeSuggestionChips;