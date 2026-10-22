import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  loadRecentlyCooked,
  removeRecentlyCooked,
  RecentDish,
} from "../utils/recentlyCooked";
import SectionDivider from "./SectionDivider";

const VISIBLE_COUNT = 5;

const RecentlyCooked: React.FC = () => {
  const [dishes, setDishes] = useState<RecentDish[]>(() =>
    loadRecentlyCooked().slice(0, VISIBLE_COUNT)
  );

  const handleRemove = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeRecentlyCooked(path);
    setDishes((prev) => prev.filter((d) => d.path !== path));
  };

  if (dishes.length === 0) return null;

  return (
    <section aria-labelledby="recent-heading" className="mt-10 w-full">
      <SectionDivider heading id="recent-heading" label="Recently cooked" />

      <div className="mt-5 flex gap-3 overflow-x-auto pb-1 sm:gap-4">
        {dishes.map((dish) => {
          const hasMultipleImages =
            (dish.images?.length ?? 0) > 1;

          return (
            <Link
              key={dish.path}
              to={dish.path}
              className={`group relative flex shrink-0 flex-col overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 ${
                hasMultipleImages ? "w-max" : "w-28 sm:w-32"
              }`}
            >
              <button
                type="button"
                onClick={(e) => handleRemove(e, dish.path)}
                aria-label={`Remove ${dish.dishName} from recently cooked`}
                className="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-stone-950/70 text-stone-200 opacity-0 transition-opacity duration-150 hover:bg-stone-950 hover:text-orange-200 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-orange-300/70 group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>

              {hasMultipleImages ? (
                <div className="flex h-28 sm:h-32">
                  {dish.images!.map((image, index) => (
                    <div
                      key={`${dish.path}-${index}`}
                      className="h-28 w-28 shrink-0 overflow-hidden bg-stone-800 sm:h-32 sm:w-32"
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="aspect-square w-full overflow-hidden bg-stone-800">
                  {dish.image ? (
                    <img
                      src={dish.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      draggable={false}
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center text-2xl"
                      aria-hidden="true"
                    >
                      🍽️
                    </div>
                  )}
                </div>
              )}

              <span className="px-2.5 py-2 text-xs font-medium leading-tight text-stone-100 sm:text-sm">
                {dish.dishName}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RecentlyCooked;