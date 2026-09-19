import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDishSearch } from "../utils/dishRoutes";

/**
 * Logo (links home) + compact search, used on every page except the home page.
 * Positioned absolutely, so render it inside a `relative` container.
 */
const CompactHeader: React.FC = () => {
  const { term, setTerm, go } = useDishSearch();

  return (
    <>
      <Link
        to="/"
        aria-label="Rasoi Bazaar home"
        className="absolute left-4 top-4 z-50 rounded-lg font-serif text-3xl font-black tracking-tight text-transparent drop-shadow-lg bg-clip-text bg-gradient-to-b from-orange-100 to-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 sm:left-8 sm:top-6 sm:text-4xl lg:text-5xl"
      >
        Rasoi Bazaar
      </Link>

      <div className="absolute right-3 top-[55px] z-30 w-[min(92vw,760px)]">
        <SearchBar
          searchTerm={term}
          setSearchTerm={setTerm}
          onSearch={() => go(term)}
          isLoading={false}
          compact
        />
      </div>
    </>
  );
};

export default CompactHeader;