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

// Mirrors RecipeDisplay's palette — kept local since this file has no
// shared import for it.
const COLOR = {
  surface: "#FFFEFA",
  ink: "#2B1A0C",
  inkSoft: "#6B5238",
  border: "#EAD9AE",
  saffron: "#FC6C26",
  saffronDark: "#D1560F",
  saffronTint: "#FFE3C2",
  mustard: "#FFEFC0",
} as const;

const NutritionIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path d="M4 20v-9" />
    <path d="M12 20V4" />
    <path d="M20 20v-6" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const NUTRITION_ROWS = (n: Nutrition): { label: string; value: string }[] => [
  { label: "Calories", value: `${n.calories} kcal` },
  { label: "Protein", value: `${n.protein} g` },
  { label: "Carbs", value: `${n.carbs} g` },
  { label: "Fat", value: `${n.fat} g` },
];

const PANEL_WIDTH = 224; // 14rem, matches the old w-56
// The panel's row count is fixed (always 4 nutrition rows), so its height
// is predictable — no need to measure the DOM before first paint.
const ESTIMATED_PANEL_HEIGHT = 210;
const VIEWPORT_MARGIN = 16; // keep clear of the screen edge
const GAP = 8; // space between the button and the panel, either side

interface PanelPosition {
  top: number;
  left: number;
  width: number;
  placement: "top" | "bottom";
  arrowLeft: number; // px from the panel's left edge, pointing back at the button
}

const NutritionInfo: React.FC<NutritionInfoProps> = ({ nutrition }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Position the panel from the button's actual on-screen location: below
  // by default, flipped above when there isn't room underneath, and
  // horizontally clamped so it never runs past the viewport edge.
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

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const needsSpace = ESTIMATED_PANEL_HEIGHT + GAP + VIEWPORT_MARGIN;

      // Prefer below; flip above only when below is cramped and above has
      // genuinely more room (not just "also cramped").
      const placement: "top" | "bottom" =
        spaceBelow < needsSpace && spaceAbove > spaceBelow ? "top" : "bottom";

      const top =
        placement === "top"
          ? Math.max(VIEWPORT_MARGIN, rect.top - ESTIMATED_PANEL_HEIGHT - GAP)
          : rect.bottom + GAP;

      // Keep the little arrow aligned to the button's center, clamped so
      // it never pokes out past the panel's own rounded corners.
      const buttonCenter = rect.left + rect.width / 2;
      const arrowLeft = Math.min(Math.max(buttonCenter - left, 16), width - 16);

      setPanelPosition({ top, left, width, placement, arrowLeft });
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
        aria-label={`Nutrition per serving: ${nutrition.calories} calories. ${
          isOpen ? "Hide" : "Show"
        } full breakdown`}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2"
        style={{
          backgroundColor: isOpen ? COLOR.saffronTint : COLOR.mustard,
          color: COLOR.ink,
        }}
      >
        <NutritionIcon className="h-4 w-4" style={{ color: COLOR.saffron }} />
        {nutrition.calories} kcal
        <ChevronDownIcon
          className="h-3.5 w-3.5 transition-transform duration-200"
          style={{ color: COLOR.inkSoft, transform: isOpen ? "rotate(180deg)" : undefined }}
        />
      </button>

      {isOpen &&
        panelPosition &&
        createPortal(
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            className="fixed z-50 animate-fade-in-up"
            style={{
              top: panelPosition.top,
              left: panelPosition.left,
              width: panelPosition.width,
              animationDuration: "0.15s",
            }}
          >
            {panelPosition.placement === "bottom" && (
              <span
                aria-hidden="true"
                className="absolute -top-[5px] h-2.5 w-2.5 rotate-45 border-l border-t"
                style={{
                  left: panelPosition.arrowLeft - 5,
                  backgroundColor: COLOR.surface,
                  borderColor: COLOR.border,
                }}
              />
            )}

            <div
              className="rounded-2xl border p-4 shadow-[0_8px_30px_rgba(43,26,12,0.16)]"
              style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}
            >
              <p className="text-xs font-semibold" style={{ color: COLOR.inkSoft }}>
                Nutrition, per serving
              </p>

              <dl className="mt-3 space-y-2">
                {NUTRITION_ROWS(nutrition).map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <dt style={{ color: COLOR.inkSoft }}>{row.label}</dt>
                    <dd className="font-semibold" style={{ color: COLOR.ink }}>
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-3 text-xs leading-relaxed" style={{ color: COLOR.inkSoft, opacity: 0.75 }}>
                Estimated; actual values vary with brands and portions.
              </p>
            </div>

            {panelPosition.placement === "top" && (
              <span
                aria-hidden="true"
                className="absolute -bottom-[5px] h-2.5 w-2.5 rotate-45 border-b border-r"
                style={{
                  left: panelPosition.arrowLeft - 5,
                  backgroundColor: COLOR.surface,
                  borderColor: COLOR.border,
                }}
              />
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default NutritionInfo;