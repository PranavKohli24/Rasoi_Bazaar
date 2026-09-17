import React, { useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  isLoading,
  compact = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!compact) {
      setIsExpanded(false);
    }
  }, [compact]);

  // Close the expanded search when clicking outside it.
  useEffect(() => {
    if (!compact || !isExpanded) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [compact, isExpanded]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && !isLoading) {
      if (compact) {
        setIsExpanded(false);
      }

      onSearch();
    }
  };

  const handleSearchClick = () => {
    // Compact mode: clicking the icon opens the search.
    if (compact && !isExpanded) {
      setIsExpanded(true);
      return;
    }

    // Compact mode: submitting the search closes it first.
    if (compact) {
      setIsExpanded(false);
    }

    onSearch();
  };

  return (
    <div
      ref={searchContainerRef}
      className={
        compact
          ? `ml-auto transition-all duration-300 ${
              isExpanded ? 'w-full' : 'w-11'
            }`
          : 'w-full max-w-2xl mx-auto px-1 sm:px-0'
      }
    >
      {!compact && (
        <label
          htmlFor="recipe-search"
          className="block text-left text-orange-200/80 text-sm font-medium mb-2 ml-1"
        >
          Enter a dish name{' '}
          <span className="text-stone-500 font-normal">
            (e.g. "Rajma Chawal")
          </span>
        </label>
      )}

      {compact && !isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label="Search for another recipe"
          className="w-11 h-11 rounded-full bg-stone-900/80 border border-stone-700 hover:border-orange-500/70 hover:bg-stone-800 text-stone-300 hover:text-orange-300 flex items-center justify-center transition-all duration-300 shadow-lg"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      ) : (
        <div
          className={`flex items-stretch ${
            compact
              ? 'gap-2'
              : 'flex-col sm:flex-row gap-3 sm:gap-4'
          }`}
        >
          <div className="relative w-full flex-grow group">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-orange-500">
              <svg
                className="h-5 w-5 text-stone-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Input Field - Fixed Font Size for Mobile */}
            <input
              id="recipe-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus={compact && isExpanded}
              placeholder={
                compact
                  ? 'cook another masterpiece?'
                  : 'What masterpiece will you create today?'
              }
              disabled={isLoading}
              className={`w-full
                ${
                  compact
                    ? 'h-11 pl-11 pr-4 text-sm rounded-full border-stone-700'
                    : 'h-12 sm:h-14 pl-11 sm:pl-12 pr-4 text-sm sm:text-lg rounded-xl border-orange-700'
                }
                bg-stone-900 text-stone-100 placeholder-stone-500
                border-2
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                focus:shadow-[0_0_15px_rgba(234,88,12,0.4)]
                transition-all duration-200`}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSearchClick}
            disabled={isLoading}
            className={`${
              compact
                ? 'px-5 h-11 rounded-full text-sm'
                : 'w-full sm:w-auto min-w-[160px] h-12 sm:h-14 rounded-xl'
            }
            bg-orange-600 hover:bg-orange-500 active:scale-95
            text-white font-medium
            transition-all duration-200
            disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed disabled:active:scale-100
            shadow-lg shadow-orange-900/20
            flex items-center justify-center
            border-2 border-transparent hover:border-orange-400/30`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Cooking...</span>
              </div>
            ) : (
              'Generate Recipe'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;