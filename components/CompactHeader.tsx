
import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { RECIPE_PATH, useDishSearch } from "../utils/dishRoutes";

interface SiteHeaderProps {
  showSearch?: boolean;
  overlay?: boolean;
  revealed?: boolean;
}

const HEADER_SURFACE = "#FFF5EB";

/** Shared top bar: wordmark on the left, search on the right. */
const CompactHeader: React.FC<SiteHeaderProps> = ({
  showSearch = true,
  overlay = false,
  revealed = true,
}) => {
  const { term, setTerm, go } = useDishSearch();
  const { pathname } = useLocation();

  const searchPlaceholder = pathname.startsWith(RECIPE_PATH)
    ? "cook another masterpiece?"
    : "Have a dish in mind?";

  const position = overlay
    ? "fixed inset-x-0 top-0"
    : "relative sm:sticky sm:top-0";

  const visibility = revealed
    ? "translate-y-0 opacity-100"
    : "pointer-events-none -translate-y-2 opacity-0";

  return (
    <header
      aria-hidden={!revealed}
      className={`${position} ${visibility} z-40 transition-all duration-300 motion-reduce:transition-none`}
      style={{
        backgroundColor: revealed ? HEADER_SURFACE : "transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          tabIndex={revealed ? 0 : -1}
          aria-label="Rasoi Bazaar home"
          className="rounded-lg font-brand text-2xl font-black tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 sm:text-3xl"
          style={{ color: "#FC6C26" }}
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
              compactPlaceholder={searchPlaceholder}
            />
          </div>
        )}
      </div>

      
      {/* Desktop: subtle curves beneath the brand and search */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 16"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-full hidden h-4 w-full sm:block"
      >
        <path
          d="M0 0 H1440 V3
            C1380 3 1340 10 1260 10
            C1180 10 1140 3 1080 3
            H390
            C330 3 290 10 210 10
            C130 10 90 3 0 3 Z"
          fill={HEADER_SURFACE}
        />
      </svg>

      {/* Mobile: one tiny, smooth curve beneath the stacked header */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-full h-3 w-full sm:hidden"
      >
        <path
          d="M0 0 H1440 V2 C1080 8 360 8 0 2 Z"
          fill={HEADER_SURFACE}
        />
      </svg>

    </header>
  );
};

export default CompactHeader;