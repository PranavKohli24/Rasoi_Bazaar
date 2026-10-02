import React, { useEffect, useRef, useState } from 'react';
import { suggestDishCompletion } from '@/utils/findPredefinedRecipe'; // ← adjust to wherever that file actually lives

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (term: string) => void;
  isLoading: boolean;
  compact?: boolean;
  /** Placeholder used by the compact (header) search box */
  compactPlaceholder?: string;
  /** Enables the photo button (hero search only) */
  onImageSelected?: (file: File) => void;
  imagePreview?: string | null;
  isIdentifying?: boolean;
  onClearImage?: () => void;
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
  onImageSelected,
  imagePreview = null,
  isIdentifying = false,
  onClearImage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [exampleIndex, setExampleIndex] = useState(0);
  const [typedExample, setTypedExample] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    if (compact || isLoading || isIdentifying) {
      setSuggestion('');
      return;
    }
    setSuggestion(suggestDishCompletion(searchTerm) ?? '');
  }, [searchTerm, compact, isLoading, isIdentifying]);

  const acceptSuggestion = () => {
    if (!suggestion) return;
    setSearchTerm(suggestion);
    setSuggestion('');
  };

  const NAVIGATION_KEYS = new Set(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End']);

  const checkCaretAtEnd = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const atEnd =
      input.selectionStart === input.value.length &&
      input.selectionEnd === input.value.length;
    if (atEnd && suggestion) acceptSuggestion();
  };

  // Only fires checkCaretAtEnd for keys that MOVE the cursor without changing
  // the text — never for normal typing, which also happens to land the
  // cursor at the end and would otherwise trigger a false accept.
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!NAVIGATION_KEYS.has(event.key)) return;
    checkCaretAtEnd(event);
  };
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isPhotoMenuOpen, setIsPhotoMenuOpen] = useState(false);
  // Touch devices get the "Take a photo" option; desktops go straight to the file picker.
  const [canUseCamera] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  const canUpload = !compact && !!onImageSelected;
  const showCamera = canUpload && searchTerm.length === 0;

  useEffect(() => {
    if (!compact) setIsExpanded(false);
  }, [compact]);

  // Type and erase example dishes while the input is not focused.
  // The typewriter only runs while the box is idle. Otherwise it is paused and
  // the placeholder falls back to its full default text.
  const isTypewriterIdle =
    !compact &&
    !searchTerm &&
    !isLoading &&
    !isIdentifying &&
    !isPhotoMenuOpen &&
    !isInputFocused;

  // Type and erase example dishes while idle.
  useEffect(() => {
    if (!isTypewriterIdle) {
      // Start the next run from an empty word instead of resuming mid-word
      setTypedExample('');
      setIsDeleting(false);
      return;
    }

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
  }, [isTypewriterIdle, exampleIndex, typedExample, isDeleting]);

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

  // Close the photo menu on outside click, Escape, or once the user starts typing.
  useEffect(() => {
    if (!isPhotoMenuOpen) return;

    const handleOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsPhotoMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsPhotoMenuOpen(false);
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPhotoMenuOpen]);

  useEffect(() => {
    if (searchTerm) setIsPhotoMenuOpen(false);
  }, [searchTerm]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const atEnd =
      input.selectionStart === input.value.length &&
      input.selectionEnd === input.value.length;

    if (suggestion && atEnd && (event.key === 'Tab' || event.key === 'ArrowRight' || event.key === 'End')) {
      event.preventDefault();
      acceptSuggestion();
      return;
    }

    if (event.key === 'Enter' && !isLoading) {
      const termToSearch = suggestion || searchTerm;

      if (suggestion) {
        setSearchTerm(suggestion);
        setSuggestion('');
      }

      if (compact) setIsExpanded(false);
      onSearch(termToSearch);
    }
  };

  const handleSearchClick = () => {
    // Compact mode: the first click opens the search.
    if (compact && !isExpanded) {
      setIsExpanded(true);
      return;
    }

    const termToSearch = suggestion || searchTerm;

    if (suggestion) {
      setSearchTerm(suggestion);
      setSuggestion('');
    }

    if (compact) setIsExpanded(false);
    onSearch(termToSearch);
  };

  const handlePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSelected?.(file);
    e.target.value = ''; // allow re-picking the same photo
    setIsPhotoMenuOpen(false);
  };

    const placeholder = compact
    ? compactPlaceholder
    : isTypewriterIdle
      ? typedExample
      : 'What masterpiece will you make?';

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
            {/* Visual box — background, border, focus ring. Drawn separately so the
            ghost suggestion can show through a transparent input on top of it. */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 border bg-stone-900 shadow-sm transition-all duration-200 group-focus-within:border-orange-400 group-focus-within:ring-4 group-focus-within:ring-orange-400/15 ${
                compact ? 'h-11 rounded-full border-stone-700' : 'h-12 rounded-xl border-stone-700 sm:h-14'
              }`}
            />

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500 transition-colors duration-200 group-focus-within:text-orange-200">
              <SearchIcon className="h-5 w-5" />
            </div>

            {/* Ghost completion: "rajma ch" (invisible, matches real input exactly) + "awal" (dim) */}
            {!compact && suggestion && (
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre pl-11 text-sm sm:pl-12 sm:text-lg ${
                  showCamera ? 'pr-12 sm:pr-14' : 'pr-3 sm:pr-4'
                }`}
              >
                <span className="invisible">{searchTerm}</span>
                <span className="text-stone-500/40">{suggestion.slice(searchTerm.length)}</span>
              </div>
            )}

            <input
              id="recipe-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onClick={checkCaretAtEnd}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              autoFocus={compact && isExpanded}
              placeholder={placeholder}
              disabled={isLoading}
              autoComplete="off"
              className={`relative w-full border border-transparent bg-transparent text-stone-100 placeholder-stone-500 transition-all duration-200 focus:outline-none disabled:opacity-60 text-ellipsis ${
                compact
                  ? 'h-11 rounded-full pl-10 pr-3 text-xs sm:pr-4 sm:text-sm'
                  : `h-12 rounded-xl pl-11 text-sm sm:h-14 sm:pl-12 sm:text-lg ${
                    showCamera ? 'pr-12 sm:pr-14' : 'pr-3 sm:pr-4'
                  }`
              }`}
            />

            {showCamera && (
              <>
                {/* Gallery / file picker */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePicked}
                />
                {/* Opens the rear camera directly on phones */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handlePicked}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (canUseCamera) setIsPhotoMenuOpen((open) => !open);
                    else fileInputRef.current?.click();
                  }}
                  disabled={isLoading || isIdentifying}
                  aria-label="Identify a dish from a photo"
                  aria-haspopup={canUseCamera ? 'menu' : undefined}
                  aria-expanded={canUseCamera ? isPhotoMenuOpen : undefined}
                  title="Identify a dish from a photo"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-500 transition-colors hover:text-orange-200 focus:outline-none focus-visible:text-orange-200 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </button>

                {isPhotoMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-stone-700 bg-stone-900 py-1 text-left shadow-lg"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsPhotoMenuOpen(false);
                        cameraInputRef.current?.click();
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-stone-200 hover:bg-stone-800 focus:bg-stone-800 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-orange-200"
                        aria-hidden="true"
                      >
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                      Take a photo
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsPhotoMenuOpen(false);
                        fileInputRef.current?.click();
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-stone-200 hover:bg-stone-800 focus:bg-stone-800 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-orange-200"
                        aria-hidden="true"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <path d="M17 8l-5-5-5 5" />
                        <path d="M12 3v12" />
                      </svg>
                      Upload a photo
                    </button>
                  </div>
                )}
              </>
            )}
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

      {canUpload && imagePreview && (
        <div className="mt-3 flex items-center gap-3 text-left">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Your photo"
              className="h-14 w-14 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={onClearImage}
              aria-label="Remove photo"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-800 text-xs text-stone-200 ring-1 ring-stone-600 hover:bg-stone-700"
            >
              ×
            </button>
          </div>
          {isIdentifying && (
            <span className="shimmer-text text-sm font-medium">Identifying your dish…</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;