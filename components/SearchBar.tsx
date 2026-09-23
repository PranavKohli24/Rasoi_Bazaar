import React, { useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  compact?: boolean;
  /** Placeholder used by the compact (header) search box */
  compactPlaceholder?: string;
}

// Dishes typed out (then erased) in the placeholder while the input is idle.
const EXAMPLES = [
  'Rajma Chawal',
  'Shahi Paneer',
  'Dal Makhani',
  'Chole Bhature',
  'Mushroom',
];

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  isLoading,
  compact = false,
  compactPlaceholder = 'cook another masterpiece?',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [exampleIndex, setExampleIndex] = useState(0);
  const [typedExample, setTypedExample] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!compact) setIsExpanded(false);
  }, [compact]);

  // Type and erase example dishes while the input is not focused.
  useEffect(() => {
    if (compact || searchTerm || isLoading || isInputFocused) return;

    const currentExample = EXAMPLES[exampleIndex];
    const isFinishedTyping = typedExample.length === currentExample.length;
    const delay = isDeleting ? 35 : isFinishedTyping ? 1600 : 60;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (typedExample.length < currentExample.length) {
          setTypedExample(currentExample.slice(0, typedExample.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else if (typedExample.length > 0) {
        setTypedExample(typedExample.slice(0, -1));
      } else {
        setIsDeleting(false);
        setExampleIndex((prev) => (prev + 1) % EXAMPLES.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [compact, searchTerm, isLoading, isInputFocused, exampleIndex, typedExample, isDeleting]);

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
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [compact, isExpanded]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      if (compact) setIsExpanded(false);
      onSearch();
    }
  };

  const handleSearchClick = () => {
    // Compact mode: the first click opens the search.
    if (compact && !isExpanded) {
      setIsExpanded(true);
      return;
    }
    // Compact mode: submitting closes it.
    if (compact) setIsExpanded(false);
    onSearch();
  };

  const placeholder = compact
    ? compactPlaceholder
    : isInputFocused
      ? 'What masterpiece will you make?'
      : typedExample;

  return (
    <div
      ref={searchContainerRef}
      className={
        compact
          ? `ml-auto transition-all duration-300 ${isExpanded ? 'w-full' : 'w-11'}`
          : 'mx-auto w-full max-w-2xl px-1 sm:px-0'
      }
    >
      {!compact && (
        <label
          htmlFor="recipe-search"
          className="mb-2 ml-1 block text-left text-sm font-medium text-stone-300"
        >
          Enter a dish name{' '}
          <span className="font-normal text-stone-500">(try something delicious)</span>
        </label>
      )}

      {compact && !isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label="Search for another recipe"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 bg-stone-900 text-stone-300 shadow-sm transition-all duration-300 hover:border-orange-400 hover:bg-orange-400/10 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      ) : (
        <div
          className={`flex items-stretch ${
            compact ? 'gap-2' : 'flex-col gap-3 sm:flex-row sm:gap-4'
          }`}
        >
          <div className="group relative w-full flex-grow">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500 transition-colors duration-200 group-focus-within:text-orange-200">
              <SearchIcon className="h-5 w-5" />
            </div>

            <input
              id="recipe-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              autoFocus={compact && isExpanded}
              placeholder={placeholder}
              disabled={isLoading}
              className={`w-full border bg-stone-900 text-stone-100 shadow-sm placeholder-stone-500 transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-400/15 disabled:opacity-60 text-ellipsis ${
                compact
                  ? 'h-11 rounded-full border-stone-700 pl-10 pr-3 text-xs sm:pr-4 sm:text-sm'
                  : 'h-12 rounded-xl border-stone-700 pl-11 pr-3 text-sm sm:h-14 sm:pl-12 sm:pr-4 sm:text-lg'
              }`}
            />
          </div>

          <button
            type="button"
            onClick={handleSearchClick}
            disabled={isLoading}
            aria-label="Generate recipe"
            className={`flex items-center justify-center bg-orange-200 font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-100 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 disabled:cursor-not-allowed disabled:bg-stone-800 disabled:text-stone-500 disabled:shadow-none disabled:active:scale-100 ${
              compact
                ? 'h-11 w-11 shrink-0 rounded-full text-sm sm:w-auto sm:px-4'
                : 'h-12 w-full min-w-[160px] rounded-xl sm:h-14 sm:w-auto sm:px-6'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className={compact ? 'hidden sm:inline' : ''}>Cooking...</span>
              </span>
            ) : compact ? (
              <>
                <span className="hidden sm:inline">Generate Recipe</span>
                <svg
                  className="h-5 w-5 sm:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
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