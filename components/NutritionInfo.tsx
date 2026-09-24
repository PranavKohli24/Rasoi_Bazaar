import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Matches the `nutrition` field on predefinedRecipes.ts entries:
 *   nutrition: { calories: 255, protein: 14, carbs: 8, fat: 19 }
 * Add this as an optional field on your Recipe type:
 *   nutrition?: Nutrition;
 */
export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionInfoProps {
  nutrition?: Nutrition;
}

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <path d="M12 8h.01" />
  </svg>
);

const NUTRITION_ROWS = (n: Nutrition): { label: string; value: string }[] => [
  { label: "Calories", value: `${n.calories} kcal` },
  { label: "Protein", value: `${n.protein} g` },
  { label: "Carbs", value: `${n.carbs} g` },
  { label: "Fat", value: `${n.fat} g` },
];

const PANEL_WIDTH = 224; // 14rem, matches the old w-56
const VIEWPORT_MARGIN = 16; // keep clear of the screen edge
const GAP_BELOW_BUTTON = 8;

const NutritionInfo: React.FC<NutritionInfoProps> = ({ nutrition }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number; width: number } | null>(
    null
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Position the panel from the button's actual on-screen location, clamped
  // so it can never sit past the viewport edge (this is what stops the
  // horizontal scroll on narrow screens).
  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      const width = Math.min(PANEL_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);

      let left = rect.left;
      if (left + width > window.innerWidth - VIEWPORT_MARGIN) {
        left = window.innerWidth - VIEWPORT_MARGIN - width;
      }
      left = Math.max(VIEWPORT_MARGIN, left);

      setPanelPosition({ top: rect.bottom + GAP_BELOW_BUTTON, left, width });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isOpen]);

  // Close on outside click, Escape, or scroll (the panel is fixed, so it
  // would otherwise detach from the button as the page scrolls under it)
  useEffect(() => {
    if (!isOpen) return;

    const handlePointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const handleScroll = () => setIsOpen(false);

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  // Optional field: nothing renders at all when a recipe doesn't have it
  if (!nutrition) return null;

  const panelId = "nutrition-popover";

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label="Nutrition info"
        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE8D6] text-orange-200 transition-colors duration-150 hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
      >
        <InfoIcon className="h-3.5 w-3.5" />
      </button>

      {isOpen &&
        panelPosition &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            className="fixed z-50 rounded-2xl border border-stone-700 bg-stone-900 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] animate-fade-in-up"
            style={{
              top: panelPosition.top,
              left: panelPosition.left,
              width: panelPosition.width,
              animationDuration: "0.15s",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Nutrition, per serving
            </p>

            <dl className="mt-3 space-y-2">
              {NUTRITION_ROWS(nutrition).map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <dt className="text-stone-400">{row.label}</dt>
                  <dd className="font-semibold text-stone-100">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-3 text-xs leading-relaxed text-stone-500">
              Estimated; actual values vary with brands and portions.
            </p>
          </div>,
          document.body
        )}
    </>
  );
};

export default NutritionInfo;