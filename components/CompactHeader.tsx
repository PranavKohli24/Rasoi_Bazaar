import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDishSearch } from "../utils/dishRoutes";

interface SiteHeaderProps {
  /** Show the compact search box (hidden on the home page, where search is the hero) */
  showSearch?: boolean;
  /**
   * Float over the page instead of taking up space (used on the home page,
   * where the big hero wordmark sits in the middle of the screen).
   */
  overlay?: boolean;
  /** When false the header is invisible. The home page reveals it once the hero wordmark scrolls away. */
  revealed?: boolean;
}

/**
 * Shared top bar: wordmark on the left, search on the right.
 * Sticky from the sm breakpoint up; scrolls away on phones to save space.
 */
const CompactHeader: React.FC<SiteHeaderProps> = ({
  showSearch = true,
  overlay = false,
  revealed = true,
}) => {
  const { term, setTerm, go } = useDishSearch();

  const position = overlay
    ? "fixed inset-x-0 top-0"
    : "relative sm:sticky sm:top-0";

  const visibility = revealed
    ? "translate-y-0 border-stone-800/70 bg-stone-950/80 opacity-100"
    : "pointer-events-none -translate-y-2 border-transparent bg-transparent opacity-0";

  return (
    <header
      aria-hidden={!revealed}
      className={`${position} ${visibility} z-40 border-b backdrop-blur-md transition-all duration-300 motion-reduce:transition-none`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          tabIndex={revealed ? 0 : -1}
          aria-label="Rasoi Bazaar home"
          className="rounded-lg bg-gradient-to-b from-orange-100 to-orange-300 bg-clip-text font-brand text-2xl font-black tracking-tight text-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 sm:text-3xl"
        >
          Rasoi Bazaar
        </Link>

        {showSearch && (
          <div className="order-last w-full sm:order-none sm:ml-auto sm:w-auto sm:max-w-xl sm:flex-1">
            <SearchBar
              searchTerm={term}
              setSearchTerm={setTerm}
              onSearch={() => go(term)}
              isLoading={false}
              compact
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default CompactHeader;