import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Explicit Label for Clarity */}
      <label 
        htmlFor="recipe-search" 
        className="block text-left text-orange-200/80 text-sm font-medium mb-2 ml-1"
      >
        Enter a dish name (e.g. "Butter Chicken")
      </label>

      <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
        <div className="relative w-full sm:flex-grow group">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-orange-500">
            <svg
              className="h-5 w-5 text-stone-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Input Field - High Contrast Style */}
          <input
            id="recipe-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What masterpiece will you create today?"
            disabled={isLoading}
            className="w-full pl-11 sm:pl-14 pr-4 py-3 text-base sm:text-lg 
              bg-stone-900 text-stone-100 placeholder-stone-500 
              border-2 border-orange-700 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
              focus:shadow-[0_0_15px_rgba(234,88,12,0.4)] 
              transition-all duration-200"
          />
        </div>

        {/* Button */}
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="w-full sm:w-auto min-w-[160px] bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-orange-900/20 flex items-center justify-center border border-transparent hover:border-orange-400/30"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
               <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
              </svg>
              <span>Cooking...</span>
            </div>
          ) : (
            'Generate Recipe'
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
