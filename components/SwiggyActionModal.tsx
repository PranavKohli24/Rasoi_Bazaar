import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  SwiggyAddress,
  InstamartProduct,
  InstamartVariation,
  SwiggyRestaurant,
  InstamartCartSummary,
  SwiggyFoodCartSummary,
  MAX_CART_QUANTITY,
} from "../services/swiggyService";

interface SwiggyActionModalProps {
  type: "instamart" | "swiggy" | null;
  isLoading: boolean;
  onBackToProducts?: () => void;
  onGoToCheckout?: () => void;
  loadingStage?: "addresses" | "restaurants" | "ingredients" | "cart" | null;
  restaurants: SwiggyRestaurant[];
  addresses?: SwiggyAddress[];
  selectedAddressId?: string | null;
  onSelectAddress?: (addressId: string) => void;
  onContinueAddress?: () => void;
  onGoToAddress?: () => void;
  onConfirmAddress?: () => void;
  isChoosingAddress?: boolean;
  ingredientProducts?: Record<string, InstamartProduct[]>;
  searchIngredientNames?: string[];
  pendingIngredientNames?: string[];
  selectedProducts?: Record<string, InstamartVariation>;
  /** Ingredient name -> amount the recipe needs, e.g. "Paneer" -> "200 g" */
  ingredientAmounts?: Record<string, string>;
  /** Ingredient name -> how many packs to add */
  quantities?: Record<string, number>;
  onChangeQuantity?: (ingredientName: string, delta: 1 | -1) => void;
  onSelectProduct?: (ingredientName: string, variation: InstamartVariation) => void;
  onAddIngredients?: () => void;
  cartAdded?: boolean;
  cartSummary?: InstamartCartSummary | null;
  isLoadingCartSummary?: boolean;
  cartSummaryError?: string | null;
  shortageWarning?: string | null;
  onCheckout?: () => void;
  isCheckingOut?: boolean;
  selectedRestaurant?: SwiggyRestaurant | null;
  onSelectRestaurant?: (restaurant: SwiggyRestaurant) => void;
  onAddDishToCart?: () => void;
  foodCartAdded?: boolean;
  foodCartSummary?: SwiggyFoodCartSummary | null;
  isLoadingFoodCartSummary?: boolean;
  foodCartSummaryError?: string | null;
  onCheckoutFood?: () => void;
  isCheckingOutFood?: boolean;
  error?: string | null;
  onMinimize: () => void;
  onClose: () => void;
  dishName?: string;
  needsSwiggyReconnect?: boolean;
  onRetrySwiggyLogin?: () => void;
}

type Step = "address" | "products" | "done";

/* ------------------------------------------------------------------------
   DESIGN — shares the exact token set used across RecipeDisplay, the
   CompactHeader and CookWhatYouHave: warm cream surfaces, a single orange
   accent, Fraunces for headings, DM Sans for everything else. Nothing here
   introduces a second palette or a second typeface family; the shelf/
   trolley/flying-item flourishes stay, just recolored onto these tokens.
   ------------------------------------------------------------------------ */

const COLOR = {
  surface: "#FFFEFA",       // card surface — matches RecipeDisplay's COLOR.surface
  surfaceSunken: "#F7EEDD", // sunken panel / header bg — vanilla tone, distinguishable from white but calm
  ink: "#2B1A0C",           // headings / primary text
  inkSoft: "#6B5238",       // secondary text
  inkFaint: "#9C7C4E",      // tertiary / faint text
  border: "#EAD9AE",        // borders
  saffron: "#FC6C26",       // primary orange
  saffronDark: "#D1560F",   // orange hover / dark
  saffronTint: "#FFE3C2",   // soft orange background tint
  clay: "#C65D42",          // secondary accent (closed / needs-attention states)
  clayTint: "#F5E1DA",
} as const;

/* ---------- Icons ---------- */

const Svg: React.FC<{ className?: string; strokeWidth?: number; children: React.ReactNode }> = ({
  className,
  strokeWidth = 2,
  children,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {children}
  </svg>
);

type IconC = React.FC<{
  className?: string;
  style?: React.CSSProperties;
}>;

const CloseIcon: IconC = ({ className }) => <Svg className={className}><path d="M6 6l12 12M18 6 6 18" /></Svg>;
const MinusIcon: IconC = ({ className }) => <Svg className={className}><path d="M5 12h14" /></Svg>;
const CheckIcon: IconC = ({ className }) => (
  <Svg className={className} strokeWidth={3}><path d="M5 12l5 5L20 7" /></Svg>
);
const PinIcon: IconC = ({ className }) => (
  <Svg className={className}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </Svg>
);
const InfoIcon: IconC = ({ className }) => (
  <Svg className={className}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></Svg>
);
const UtensilsIcon: IconC = ({ className }) => (
  <Svg className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </Svg>
);

const ChevronIcon: IconC = ({ className }) => <Svg className={className}><path d="m9 18 6-6-6-6" /></Svg>;

const BasketIcon: IconC = ({ className }) => (
  <Svg className={className}>
    <path d="M5 10h14l-1.6 9.4a2 2 0 0 1-2 1.6H8.6a2 2 0 0 1-2-1.6L5 10Z" />
    <path d="M9 10c0-3.3 1.3-6 3-6s3 2.7 3 6" />
  </Svg>
);

/* ---------- Header glyphs ----------
   Full-color illustrations instead of a single-stroke icon-in-a-tile,
   echoing the basket/plated-dish vocabulary used in the success
   animations. Colors now trace back to COLOR.saffron / saffronDark /
   saffronTint rather than a separate "stamp" palette. */

const GroceryHeaderIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 44 42" className={className} aria-hidden="true">
    <path
      d="M15 16c0-4.6 3.1-7.8 7-7.8s7 3.2 7 7.8"
      fill="none"
      stroke={COLOR.saffron}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M7 16h30l-3.2 18.2a3 3 0 0 1-3 2.5H13.2a3 3 0 0 1-3-2.5L7 16Z"
      fill={COLOR.saffronTint}
      stroke={COLOR.saffron}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M13.5 21.5 14.8 33M22 21.5V33M30.5 21.5 29.2 33" stroke={COLOR.saffronDark} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DishHeaderIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 54 42" className={className} aria-hidden="true">
    <circle cx="27" cy="21" r="12.5" fill={COLOR.saffronTint} stroke={COLOR.saffron} strokeWidth="2.2" />
    <circle cx="27" cy="21" r="7" fill="none" stroke={COLOR.saffron} strokeWidth="1.6" opacity="0.55" />

    <g fill={COLOR.saffron}>
      <rect x="3.3" y="7" width="1.5" height="9" rx="0.75" />
      <rect x="5.7" y="7" width="1.5" height="9" rx="0.75" />
      <rect x="8.1" y="7" width="1.5" height="9" rx="0.75" />
    </g>
    <path
      d="M3.3 14.6c0 2.6 1.9 4.3 3.9 4.3s3.9-1.7 3.9-4.3"
      fill="none"
      stroke={COLOR.saffron}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect x="6.1" y="18.7" width="1.9" height="15.3" rx="0.95" fill={COLOR.saffron} />

    <ellipse cx="47.3" cy="12.4" rx="4.3" ry="5.9" fill={COLOR.saffron} />
    <rect x="46.3" y="17.7" width="2" height="16.3" rx="1" fill={COLOR.saffron} />
  </svg>
);

/* "Not found" — a plate being searched, nothing on it. */
const DishSearchIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 56 48" className={className} aria-hidden="true">
    <circle cx="23" cy="28" r="17" fill={COLOR.saffronTint} stroke={COLOR.saffron} strokeWidth="2.2" />
    <circle cx="23" cy="28" r="9.5" fill="none" stroke={COLOR.saffron} strokeWidth="1.3" opacity="0.5" />
    <circle cx="37" cy="15" r="9" fill={COLOR.surface} stroke={COLOR.saffronDark} strokeWidth="2.6" />
    <line x1="43.3" y1="21.3" x2="50" y2="28" stroke={COLOR.saffronDark} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* "Found, but closed" — a stall with its shutter down. */
const ClosedStallIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 56 46" className={className} aria-hidden="true">
    <path d="M5 15 10 4h36l5 11Z" fill={COLOR.saffronDark} />
    <path
      d="M5 15q3.1 4.2 6.2 0t6.2 0 6.2 0 6.2 0 6.2 0 6.2 0 6.2 0"
      fill="none"
      stroke={COLOR.surface}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="9" y="19" width="38" height="21" rx="1.5" fill={COLOR.saffronTint} stroke={COLOR.saffron} strokeWidth="2.2" />
    <path d="M9 25.5h38M9 32h38" stroke={COLOR.saffron} strokeWidth="1.6" opacity="0.55" />
    <circle cx="44" cy="35" r="7" fill={COLOR.surface} stroke={COLOR.saffronDark} strokeWidth="2" />
    <path d="M44 31.5v3.5l2.3 2.3" stroke={COLOR.saffronDark} strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);

/* "Reconnect" — a door with an arrow stepping back through it. */
const ReconnectIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 52 48" className={className} aria-hidden="true">
    <rect x="8" y="5" width="22" height="38" rx="2" fill={COLOR.saffronTint} stroke={COLOR.saffron} strokeWidth="2.2" />
    <circle cx="25" cy="24" r="1.6" fill={COLOR.saffronDark} />
    <path
      d="M33 24h14m0 0-5-5m5 5-5 5"
      fill="none"
      stroke={COLOR.saffronDark}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Simple produce glyphs for the "items landing in the basket" animation —
   kept as naturalistic carrot/tomato/leaf colors, not part of the UI chrome. */
const CarrotIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 20 24" className={className} aria-hidden="true">
    <path
      d="M10 8c3 0 5 2.2 5 5.2 0 4-3.2 8-5 9.6-1.8-1.6-5-5.6-5-9.6C5 10.2 7 8 10 8Z"
      fill="#E8893B"
    />
    <path d="M10 8V3M7.3 6.3 5.8 3M12.7 6.3 14.2 3" stroke="#7A9B52" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);
const TomatoIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
    <circle cx="10" cy="11" r="7" fill="#D6451C" />
    <path d="M10 4v2.2M7 4.6c1 1 2 1.5 3 1.5s2-.5 3-1.5" stroke="#6E8F4A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);
const LeafIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
    <path d="M4 16C4 8 10 4 17 4c0 7-4 13-12 13-1 0-1-1-1-1Z" fill="#8FA85C" />
    <path d="M16 5 6 15" stroke="#6E8640" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* ---------- Shop shelf (Instamart "aisle") ----------
   Pure presentation, grafted onto the existing product grid: a canvas-drawn
   wooden plank under each ingredient's row and a trolley products visibly
   fly into. None of this reads selection state on its own — it's driven
   entirely by the same selectedProducts/onSelectProduct data the grid
   already used. */


const TrolleyIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 48 44" className={className} aria-hidden="true">
    <path d="M3 4h4l2.4 5" stroke={COLOR.saffronDark} strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <path
      d="M10 9h31l-4 16a3 3 0 0 1-2.9 2.3H16a3 3 0 0 1-2.9-2.3L10 9Z"
      fill={COLOR.saffronTint}
      stroke={COLOR.saffron}
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path d="M15 9l2.2 18.3M24.5 9v18.3M34 9l-2.2 18.3" stroke={COLOR.saffronDark} strokeWidth="1.4" opacity="0.55" />
    <circle cx="18" cy="38" r="3.4" fill={COLOR.saffronDark} />
    <circle cx="33" cy="38" r="3.4" fill={COLOR.saffronDark} />
    <circle cx="18" cy="38" r="1.2" fill={COLOR.saffronTint} />
    <circle cx="33" cy="38" r="1.2" fill={COLOR.saffronTint} />
  </svg>
);

const TrolleyWidget = React.forwardRef<HTMLDivElement, { count: number; bounceKey: number }>(
  ({ count, bounceKey }, ref) => (
    <div className="pointer-events-none sticky bottom-1 z-20 flex justify-end pr-0.5">
      <div
        key={bounceKey}
        ref={ref}
        className={`pointer-events-none relative flex h-14 w-14 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16 ${
          bounceKey > 0 ? "trolley-bounce" : ""
        }`}
        style={{
          borderColor: COLOR.saffron,
          backgroundColor: COLOR.surface,
          boxShadow: "0 8px 18px rgba(43,26,12,0.3)",
        }}
      >
        <TrolleyIcon className="h-8 w-8 sm:h-9 sm:w-9" />
        {count > 0 && (
          <span
            className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-bold sm:h-6 sm:min-w-[24px] sm:text-xs"
            style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
          >
            {count}
          </span>
        )}
      </div>
    </div>
  )
);
TrolleyWidget.displayName = "TrolleyWidget";

/* Arcs a cloned product thumbnail between a shelf slot and the trolley —
   a real parabola, so a "select" visibly lands in the basket and an
   "unselect" visibly leaves it. Purely visual: never touches selection
   state itself. */

type FlyDirection = "in" | "out";

interface FlyItem {
  id: number;
  imageUrl: string;
  fromRect: DOMRect;
  toRect: DOMRect;
  direction: FlyDirection;
}

const FLY_DURATION_MS = 560;
const FLY_ARC_HEIGHT = 64;

const FlyingItemSprite: React.FC<{ item: FlyItem; onDone: () => void }> = ({ item, onDone }) => {
  const [t, setT] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const progress = Math.min(1, (now - startTimeRef.current) / FLY_DURATION_MS);
      setT(progress);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else onDone();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const from = item.direction === "in" ? item.fromRect : item.toRect;
  const to = item.direction === "in" ? item.toRect : item.fromRect;
  const ease = 1 - Math.pow(1 - t, 3);

  const fromCx = from.left + from.width / 2;
  const fromCy = from.top + from.height / 2;
  const toCx = to.left + to.width / 2;
  const toCy = to.top + to.height / 2;

  const cx = fromCx + (toCx - fromCx) * ease;
  const cy = fromCy + (toCy - fromCy) * ease - Math.sin(Math.PI * t) * FLY_ARC_HEIGHT;

  const startSize = item.direction === "in" ? 46 : 20;
  const endSize = item.direction === "in" ? 20 : 46;
  const size = startSize + (endSize - startSize) * ease;

  const opacity = t < 0.88 ? 1 : 1 - (t - 0.88) / 0.12;
  const spin = (item.direction === "in" ? 1 : -1) * 22 * ease;

  return (
    <img
      src={item.imageUrl}
      alt=""
      aria-hidden="true"
      style={{
        position: "fixed",
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: size,
        borderRadius: 9,
        objectFit: "cover",
        pointerEvents: "none",
        zIndex: 70,
        opacity,
        transform: `rotate(${spin}deg)`,
        boxShadow: "0 10px 18px rgba(43,26,12,0.35)",
      }}
    />
  );
};

const FlyingIngredients: React.FC<{ items: FlyItem[]; onDone: (id: number) => void }> = ({ items, onDone }) => (
  <>
    {items.map((item) => (
      <FlyingItemSprite key={item.id} item={item} onDone={() => onDone(item.id)} />
    ))}
  </>
);

/* ---------- Shared bits ---------- */

const primaryButton =
  "flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1";

const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 sm:h-10 sm:w-10";

const footerClass = "px-5 py-4 sm:px-8 sm:py-5";

/* Replaces a plain in-button spinner: the label stays legible, a soft
   diagonal sheen sweeps across the button so it reads as "working" rather
   than "frozen," and a small ring spins quietly next to the text. */
const AddingToCart: React.FC<{ label?: string }> = ({ label = "Adding to cart" }) => (
  <span className="relative flex w-full items-center justify-center gap-2.5 overflow-hidden">
    <span className="sweep pointer-events-none absolute inset-0" aria-hidden="true" />
    <span
      className="relative z-10 h-4 w-4 shrink-0 animate-spin rounded-full border-2"
      style={{ borderColor: `${COLOR.surface}45`, borderTopColor: COLOR.surface }}
      aria-hidden="true"
    />
    <span className="relative z-10">{label}</span>
  </span>
);

/* Checkout confirmation: visual replacement for the existing COD button.
   The parent continues to own checkout state and calls the same handler.
   Typography mirrors RecipeDisplay's SwipeToConfirm exactly (same
   text-[15px] font-medium tracking-wide treatment). */
interface SwipeToConfirmCheckoutProps {
  onConfirm?: () => void;
  disabled?: boolean;
}

const CHECKOUT_SWIPE_THUMB = 48;
const CHECKOUT_SWIPE_PADDING = 5;
const CHECKOUT_SWIPE_THRESHOLD = 0.65;
const CHECKOUT_ACTION_LABEL = "Slide to Pay with Cash on Delivery";

const SwipeToConfirmCheckout: React.FC<SwipeToConfirmCheckoutProps> = ({
  onConfirm,
  disabled = false,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const dragStartRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      setMaxDrag(Math.max(0, track.offsetWidth - CHECKOUT_SWIPE_THUMB - CHECKOUT_SWIPE_PADDING * 2));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const confirm = () => {
    if (disabled || isConfirmed || maxDrag <= 0) return;
    setIsConfirmed(true);
    setDragX(maxDrag);
    window.setTimeout(() => onConfirm?.(), 380);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || isConfirmed) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = event.clientX - dragX;
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled || isConfirmed) return;
    setDragX(Math.min(Math.max(event.clientX - dragStartRef.current, 0), maxDrag));
  };

  const finishDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (maxDrag > 0 && dragX >= maxDrag * CHECKOUT_SWIPE_THRESHOLD) {
      confirm();
    } else {
      setDragX(0);
    }
  };

  const progress = maxDrag === 0 ? 0 : dragX / maxDrag;
  const nearThreshold = isConfirmed || progress >= CHECKOUT_SWIPE_THRESHOLD;

  return (
    <div
      ref={trackRef}
      className="relative h-[58px] w-full select-none overflow-hidden rounded-full border sm:h-[64px]"
      style={{
        backgroundColor: COLOR.surfaceSunken,
        borderColor: COLOR.border,
        boxShadow: "inset 0 1px 3px rgba(43,26,12,0.08)",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${CHECKOUT_SWIPE_THUMB + CHECKOUT_SWIPE_PADDING + dragX}px`,
          backgroundColor: COLOR.saffron,
          transition: isDragging ? "none" : "width 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-16 text-center text-[15px] font-medium tracking-wide sm:text-base"
        style={{
          color: isConfirmed ? COLOR.surface : COLOR.saffronDark,
          opacity: isConfirmed ? 1 : Math.max(0, 1 - progress / 0.55),
          transition: isDragging ? "none" : "opacity 0.2s ease",
        }}
      >
        {CHECKOUT_ACTION_LABEL}
      </span>

      <div
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={CHECKOUT_ACTION_LABEL}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuetext={CHECKOUT_ACTION_LABEL}
        aria-disabled={disabled}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            confirm();
          }
        }}
        className="absolute top-1/2 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          left: CHECKOUT_SWIPE_PADDING,
          width: CHECKOUT_SWIPE_THUMB,
          height: CHECKOUT_SWIPE_THUMB,
          marginTop: -CHECKOUT_SWIPE_THUMB / 2,
          backgroundColor: COLOR.surface,
          color: COLOR.saffronDark,
          boxShadow: nearThreshold
            ? `0 2px 8px rgba(43,26,12,0.18), 0 0 0 4px ${COLOR.saffronTint}`
            : isDragging
            ? "0 4px 12px rgba(43,26,12,0.22)"
            : "0 1px 4px rgba(43,26,12,0.14)",
          transform: `translateX(${dragX}px) scale(${isDragging ? 1.04 : 1})`,
          transition: isDragging
            ? "box-shadow 0.15s ease"
            : "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease",
          touchAction: "none",
          cursor: disabled ? "not-allowed" : isConfirmed ? "default" : isDragging ? "grabbing" : "grab",
        }}
      >
        {nearThreshold ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <Svg className="h-5 w-5"><path d="m9 18 6-6-6-6" /></Svg>
        )}
      </div>
    </div>
  );
};

/* ---------- Success stage ----------
   Two beats: a scene specific to what's being added plays first, then a
   checkmark that draws itself, with the copy settling in right after. */

type SuccessPhase = "filling" | "done";
const FILL_DURATION_MS = 2150;
const DRAG_MINIMIZE_THRESHOLD = 90;

const GroceryFillScene: React.FC = () => (
  <>
    <span className="veggie-fall absolute top-1" style={{ left: "38%", animationDelay: "0ms" }}>
      <CarrotIcon className="h-5 w-5 sm:h-6 sm:w-6" />
    </span>
    <span className="veggie-fall absolute top-1" style={{ left: "52%", animationDelay: "650ms" }}>
      <TomatoIcon className="h-5 w-5 sm:h-6 sm:w-6" />
    </span>
    <span className="veggie-fall absolute top-1" style={{ left: "45%", animationDelay: "1300ms" }}>
      <LeafIcon className="h-5 w-5 sm:h-6 sm:w-6" />
    </span>

    <svg viewBox="0 0 64 56" className="basket-wobble absolute bottom-0 h-[72px] w-[72px] origin-bottom sm:h-[92px] sm:w-[92px]">
      <path
        d="M22 20c0-6.5 4.5-11 10-11s10 4.5 10 11"
        fill="none"
        stroke={COLOR.saffron}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M13 20h38l-4.3 27.3a4 4 0 0 1-4 3.4H21.3a4 4 0 0 1-4-3.4L13 20Z"
        fill={COLOR.saffronTint}
        stroke={COLOR.saffron}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M20 28l1.8 16M32 28v16M44 28l-1.8 16" stroke={COLOR.saffronDark} strokeWidth="2" strokeLinecap="round" />
    </svg>
  </>
);

const DishPlatingScene: React.FC = () => (
  <svg viewBox="0 0 120 120" className="h-32 w-32 sm:h-40 sm:w-40" style={{ overflow: "visible" }}>
    <ellipse cx="60" cy="80" rx="38" ry="14" fill={COLOR.surfaceSunken} stroke={COLOR.border} strokeWidth="2" />
    <ellipse cx="60" cy="78" rx="27" ry="9.5" fill={COLOR.saffronTint} />

    <ellipse cx="60" cy="76" rx="16" ry="8" fill={COLOR.saffronDark} />
    <ellipse cx="53" cy="72" rx="5" ry="3" fill={COLOR.saffron} />
    <ellipse cx="67" cy="73" rx="4.5" ry="2.6" fill={COLOR.saffron} />

    <path className="steam-rise" d="M50 64c-2-4 2-6 0-10" stroke={COLOR.inkFaint} strokeWidth="2" strokeLinecap="round" fill="none" style={{ animationDelay: "0.95s" }} />
    <path className="steam-rise" d="M60 62c-2-4 2-6 0-10" stroke={COLOR.inkFaint} strokeWidth="2" strokeLinecap="round" fill="none" style={{ animationDelay: "1.1s" }} />
    <path className="steam-rise" d="M70 64c-2-4 2-6 0-10" stroke={COLOR.inkFaint} strokeWidth="2" strokeLinecap="round" fill="none" style={{ animationDelay: "1.25s" }} />

    <g className="utensil-slide-left">
      <path d="M24 56v26M20 56v9M28 56v9M24 65v0" stroke={COLOR.ink} strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
    <g className="utensil-slide-right">
      <path d="M96 56c4 2 4 9 0 11v15" stroke={COLOR.ink} strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>

    <g className="cloche-lift">
      <path d="M31 72a29 23 0 0 1 58 0Z" fill={COLOR.surface} stroke={COLOR.saffron} strokeWidth="3" strokeLinejoin="round" />
      <rect x="57" y="40" width="6" height="7" rx="2" fill={COLOR.saffron} />
      <circle cx="60" cy="38" r="3.6" fill={COLOR.saffron} />
    </g>
  </svg>
);

const SuccessStage: React.FC<{ eyebrow: string; text: string; variant: "grocery" | "dish" }> = ({ eyebrow, text, variant }) => {
  const [phase, setPhase] = useState<SuccessPhase>("filling");

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("done"), FILL_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center sm:py-12">
      <div className="relative flex h-36 w-32 items-center justify-center sm:h-44 sm:w-40" aria-hidden="true">
        {phase === "filling" ? (
          variant === "grocery" ? (
            <GroceryFillScene />
          ) : (
            <DishPlatingScene />
          )
        ) : (
          <svg viewBox="0 0 64 64" className="h-16 w-16 sm:h-20 sm:w-20">
            <circle cx="32" cy="32" r="27" fill="none" stroke={COLOR.saffron} strokeWidth="4" pathLength={100} className="tick-circle" />
            <path
              d="M20 33l8 8 16-18"
              fill="none"
              stroke={COLOR.saffron}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={100}
              className="tick-check"
            />
          </svg>
        )}
      </div>

      {phase === "done" && (
        <>
          <p
            className="stamp-label mt-3 text-xs font-semibold sm:text-sm"
            style={{ color: COLOR.saffronDark, animationDelay: "0.55s" }}
          >
            {eyebrow}
          </p>
          <h4 className="stamp-label mt-1 font-serif text-2xl font-black sm:text-3xl" style={{ color: COLOR.ink, animationDelay: "0.65s" }}>
            Added to cart
          </h4>
          <p
            className="stamp-label mx-auto mt-2 max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-base"
            style={{ color: COLOR.inkSoft, animationDelay: "0.75s" }}
          >
            {text}
          </p>
        </>
      )}
    </div>
  );
};

interface CartContext {
  icon: "grocery" | "dish";
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

const CartContextHeader: React.FC<{ context: CartContext }> = ({ context }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = context.imageUrl && !imageFailed;

  return (
    <div
      className="flex items-center gap-3.5 rounded-2xl border p-3 sm:p-3.5"
      style={{ borderColor: COLOR.border, backgroundColor: COLOR.surfaceSunken }}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-16 sm:w-16"
        style={{ backgroundColor: COLOR.saffronTint }}
      >
        {showImage ? (
          <img
            src={context.imageUrl}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : context.icon === "dish" ? (
          <UtensilsIcon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: COLOR.saffronDark } as React.CSSProperties} />
        ) : (
          <BasketIcon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: COLOR.saffronDark } as React.CSSProperties} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-bold sm:text-base" style={{ color: COLOR.ink }}>
          {context.title}
        </p>
        {context.subtitle && (
          <p className="mt-0.5 line-clamp-1 text-xs sm:text-sm" style={{ color: COLOR.inkSoft }}>
            {context.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

interface CartItemImage {
  names: string[];
  imageUrl: string;
}

const normalizeCartItemName = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const findCartItemImage = (
  item: { name: string; imageUrl?: string | null },
  itemImages?: CartItemImage[],
): string | undefined => {
  const directImage = item.imageUrl?.trim();
  if (directImage) return directImage;

  const normalizedItemName = normalizeCartItemName(item.name);
  if (!normalizedItemName || !itemImages?.length) return undefined;

  // Prefer exact matches, then the most specific product-name partial match.
  for (const candidate of itemImages) {
    if (candidate.names.some((name) => normalizeCartItemName(name) === normalizedItemName)) {
      return candidate.imageUrl;
    }
  }

  const partialMatches = itemImages
    .flatMap((candidate) =>
      candidate.names.map((name) => ({
        imageUrl: candidate.imageUrl,
        normalizedName: normalizeCartItemName(name),
      })),
    )
    .filter(
      ({ normalizedName }) =>
        normalizedName.length >= 5 &&
        (normalizedItemName.includes(normalizedName) || normalizedName.includes(normalizedItemName)),
    )
    .sort((a, b) => b.normalizedName.length - a.normalizedName.length);

  if (partialMatches[0]?.imageUrl) return partialMatches[0].imageUrl;

  // Cart names sometimes omit or rearrange words from the catalog name
  // (for example, "Amul Taaza Milk 1 L" vs. "Amul Taaza Toned Fresh Milk").
  // A two-word overlap helps find the selected product without assigning an
  // image to unrelated items based on a generic word such as "milk" alone.
  const ignoredTokens = new Set(["the", "and", "for", "with", "pack", "piece", "pcs", "gms", "gm", "ml", "kgs"]);
  const itemTokens = new Set(
    normalizedItemName.split(" ").filter((token) => token.length >= 3 && !ignoredTokens.has(token)),
  );
  if (itemTokens.size < 2) return undefined;

  const tokenMatches = itemImages
    .flatMap((candidate) =>
      candidate.names.map((name) => {
        const candidateTokens = new Set(
          normalizeCartItemName(name)
            .split(" ")
            .filter((token) => token.length >= 3 && !ignoredTokens.has(token)),
        );
        const overlap = [...itemTokens].filter((token) => candidateTokens.has(token)).length;
        return { imageUrl: candidate.imageUrl, overlap, candidateTokenCount: candidateTokens.size };
      }),
    )
    .filter((candidate) => candidate.overlap >= 2)
    .sort(
      (a, b) =>
        b.overlap - a.overlap ||
        Math.abs(a.candidateTokenCount - itemTokens.size) - Math.abs(b.candidateTokenCount - itemTokens.size),
    );

  return tokenMatches[0]?.imageUrl;
};

const CartItemThumbnail: React.FC<{ imageUrl?: string; itemName: string }> = ({ imageUrl, itemName }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-24 sm:w-24"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {imageUrl && !imageFailed ? (
        <img
          src={imageUrl}
          alt={itemName}
          decoding="async"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-contain p-0.5"
        />
      ) : (
        <BasketIcon className="h-8 w-8" style={{ color: COLOR.inkFaint } as React.CSSProperties} />
      )}
    </div>
  );
};

const CartReviewStep: React.FC<{
  items: import("../services/swiggyService").InstamartCartLineItem[];
  bill: import("../services/swiggyService").InstamartBill | null;
  isLoading: boolean;
  error?: string | null;
  warning?: string | null;
  context?: CartContext;
  itemImages?: CartItemImage[];
  showItemThumbnails?: boolean;
}> = ({ items, bill, isLoading, error, warning, context, itemImages, showItemThumbnails = false }) => {
  if (isLoading && items.length === 0 && !bill) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center" role="status" aria-live="polite">
        <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
          <span className="punch-pulse absolute inset-0 rounded-full border-2" style={{ borderColor: COLOR.saffron }} />
          <BasketIcon className="relative h-7 w-7 sm:h-9 sm:w-9" style={{ color: COLOR.saffron } as React.CSSProperties} />
        </div>
        <p className="mt-5 font-serif text-lg font-black sm:text-xl" style={{ color: COLOR.ink }}>Loading your cart</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm sm:text-base" style={{ color: COLOR.inkSoft }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up space-y-5" style={{ animationDuration: "0.25s" }}>
      {context && <CartContextHeader context={context} />}

      <p className="text-xs font-semibold sm:text-sm" style={{ color: COLOR.inkSoft }}>
        Review your cart
      </p>

      <ul className="divide-y rounded-xl border" style={{ borderColor: COLOR.border }}>
        {items.map((item, i) => {
          const imageUrl = findCartItemImage(item, itemImages);

          return (
            <li key={i} className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm sm:px-5 sm:py-3.5 sm:text-base">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {(showItemThumbnails || imageUrl) && (
                  <CartItemThumbnail imageUrl={imageUrl} itemName={item.name} />
                )}
                <span className="min-w-0 break-words" style={{ color: COLOR.ink }}>
                  {item.quantity > 1 ? `${item.quantity} × ` : ""}{item.name}
                </span>
              </div>
              {item.price && (
                <span className="shrink-0 pt-px tabular-nums" style={{ color: COLOR.inkSoft }}>
                  {item.price}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {bill && (
        <div className="rounded-xl border px-3.5 py-3 sm:px-5 sm:py-4" style={{ borderColor: COLOR.border }}>
          {bill.lineItems.map((line, i) => (
            <div key={i} className="flex items-center justify-between py-1 text-xs sm:text-sm" style={{ color: COLOR.inkSoft }}>
              <span>{line.label}</span>
              <span className="tabular-nums">{line.value}</span>
            </div>
          ))}
          <div
            className="mt-1.5 flex items-center justify-between border-t pt-1.5 text-sm font-bold sm:text-base"
            style={{ borderColor: COLOR.border, color: COLOR.ink }}
          >
            <span>{bill.toPay.label}</span>
            <span className="tabular-nums">{bill.toPay.value}</span>
          </div>
        </div>
      )}

      {warning && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-sm leading-relaxed sm:px-5 sm:py-4 sm:text-base"
          style={{ borderColor: COLOR.border, backgroundColor: COLOR.surfaceSunken, color: COLOR.inkSoft }}
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8"
            style={{ backgroundColor: COLOR.saffronTint, color: COLOR.saffronDark }}
          >
            <InfoIcon className="h-4 w-4" />
          </span>
          <p className="pt-0.5">{warning}</p>
        </div>
      )}
    </div>
  );
};

/* ---------- Address-stage loader ---------- */

const ADDRESS_CAPTIONS = ["Connecting to your Swiggy account", "Checking your saved addresses"];

const AddressStageLoader: React.FC = () => {
  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setCaptionIndex((i) => (i + 1) % ADDRESS_CAPTIONS.length), 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-14 text-center" role="status" aria-live="polite">
      <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <span className="punch-pulse absolute inset-0 rounded-full border-2" style={{ borderColor: COLOR.saffron }} />
        <span
          className="punch-pulse absolute inset-0 rounded-full border-2"
          style={{ borderColor: COLOR.saffron, animationDelay: "0.5s" }}
        />
        <PinIcon className="relative h-7 w-7 sm:h-9 sm:w-9" style={{ color: COLOR.saffron } as React.CSSProperties} />
      </div>

      <p className="mt-5 font-serif text-lg font-black sm:text-xl" style={{ color: COLOR.ink }}>
        Finding your addresses
      </p>
      <p
        key={captionIndex}
        className="mt-1.5 animate-fade-in-up text-xs sm:text-sm"
        style={{ color: COLOR.inkSoft, animationDuration: "0.3s" }}
      >
        {ADDRESS_CAPTIONS[captionIndex]}
      </p>
    </div>
  );
};

/* ---------- Skeletons ---------- */

const shimmerStyle: React.CSSProperties = {
  background: `linear-gradient(100deg, ${COLOR.border} 30%, ${COLOR.saffronTint} 50%, ${COLOR.border} 70%)`,
  backgroundSize: "200% 100%",
};

const Shimmer: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`skeleton-shimmer rounded-md ${className}`} style={shimmerStyle} />
);

const RestaurantSkeletonList: React.FC = () => (
  <ul className="space-y-3" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <li key={i} className="flex gap-3.5 rounded-xl border p-3 sm:p-4" style={{ borderColor: COLOR.border }}>
        <Shimmer className="h-16 w-16 shrink-0 rounded-lg sm:h-20 sm:w-20" />
        <div className="min-w-0 flex-1 space-y-2.5 py-1">
          <Shimmer className="h-3.5 w-3/4" />
          <Shimmer className="h-2.5 w-1/2" />
          <Shimmer className="h-2.5 w-2/3" />
        </div>
      </li>
    ))}
  </ul>
);

const IngredientSkeletonGroup: React.FC = () => (
  <div className="space-y-6" aria-hidden="true">
    {[0, 1].map((row) => (
      <div key={row}>
        <Shimmer className="mb-3 h-3.5 w-24" />
        <div className="flex gap-3 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-28 shrink-0 rounded-xl border p-2.5 sm:w-36 sm:p-3" style={{ borderColor: COLOR.border }}>
              <Shimmer className="mx-auto mb-2.5 h-14 w-14 rounded-lg sm:h-20 sm:w-20" />
              <Shimmer className="mb-1.5 h-2.5 w-full" />
              <Shimmer className="h-2.5 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ---------- Content pieces ---------- */

const RestaurantRow: React.FC<{
  restaurant: SwiggyRestaurant;
  selected?: boolean;
  onSelect?: (restaurant: SwiggyRestaurant) => void;
}> = ({ restaurant, selected = false, onSelect }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const meta = [restaurant.deliveryText, restaurant.distanceText, restaurant.costForTwoText].filter(Boolean);
  const cuisines = restaurant.cuisines?.slice(0, 3).join(", ");

  return (
    <li
      className="hover-float relative overflow-hidden rounded-xl border-2 transition-colors duration-150"
      style={{
        borderColor: selected ? COLOR.saffron : COLOR.border,
        backgroundColor: selected ? COLOR.saffronTint : COLOR.surface,
        opacity: restaurant.isOpen ? 1 : 0.55,
      }}
    >
      <button
        type="button"
        disabled={!restaurant.isOpen}
        onClick={() => onSelect?.(restaurant)}
        aria-label={`Order ${restaurant.name} on Swiggy`}
        className="flex w-full items-center gap-3.5 p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed sm:gap-4 sm:p-4"
      >
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-20 sm:w-20"
          style={{ backgroundColor: COLOR.saffronTint }}
        >
          {restaurant.imageUrl && !imageFailed ? (
            <img
              src={restaurant.imageUrl}
              alt=""
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <UtensilsIcon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: COLOR.saffronDark } as React.CSSProperties} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base" style={{ color: COLOR.ink }}>
            {restaurant.name}
          </p>
          {cuisines && (
            <p className="mt-0.5 truncate text-[11px] sm:text-xs" style={{ color: COLOR.inkFaint }}>
              {cuisines}
            </p>
          )}
          {meta.length > 0 && (
            <p className="mt-1.5 text-[11px] sm:text-xs" style={{ color: COLOR.inkSoft }}>
              {meta.join(" · ")}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {!restaurant.isOpen && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]"
                style={{ backgroundColor: COLOR.surfaceSunken, color: COLOR.inkSoft }}
              >
                Closed
              </span>
            )}
            {restaurant.veg && (
              <span
                className="rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]"
                style={{ borderColor: COLOR.border, color: COLOR.inkSoft }}
              >
                Veg
              </span>
            )}
            {restaurant.offer && (
              <span
                className="max-w-full truncate rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-[11px]"
                style={{ backgroundColor: COLOR.saffronDark, color: COLOR.surface }}
              >
                {restaurant.offer}
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  );
};

const TicketTabs: React.FC<{
  step: Step;
  hasProducts: boolean;
  secondLabel: string;
  showCheckoutTab?: boolean;
  onAddressClick?: () => void;
  onIngredientsClick?: () => void;
  onBackToProductsClick?: () => void;
  onCheckoutClick?: () => void;
}> = ({
  step,
  hasProducts,
  secondLabel,
  showCheckoutTab = false,
  onAddressClick,
  onIngredientsClick,
  onBackToProductsClick,
  onCheckoutClick,
}) => {
  const order: Step[] = ["address", "products", "done"];
  const activeIndex = order.indexOf(step);

  const productsHandler =
    step === "address" ? onIngredientsClick : step === "done" ? onBackToProductsClick : undefined;

  const tabs: { key: Step; label: string; onClick?: () => void; clickable: boolean }[] = [
    {
      key: "address",
      label: "Address",
      onClick: onAddressClick,
      clickable: step !== "address" && !!onAddressClick,
    },
    {
      key: "products",
      label: secondLabel,
      onClick: productsHandler,
      clickable: step !== "products" && hasProducts && !!productsHandler,
    },
  ];

  if (showCheckoutTab) {
    tabs.push({
      key: "done",
      label: "Checkout",
      onClick: onCheckoutClick,
      clickable: step !== "done" && !!onCheckoutClick,
    });
  }

  return (
    <div className="mt-5 flex items-start">
      {tabs.map((t, i) => {
        const reached = order.indexOf(t.key) <= activeIndex;
        const current = order[activeIndex] === t.key;
        const passed = order.indexOf(t.key) < activeIndex;
        const done = current || passed;

        const label = (
          <span className="flex flex-col items-center gap-1.5">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold leading-none transition-all duration-300 sm:h-8 sm:w-8 sm:text-sm"
              style={{
                backgroundColor: done ? COLOR.saffron : COLOR.surfaceSunken,
                color: done ? COLOR.surface : COLOR.inkFaint,
                border: done ? "none" : `1px solid ${COLOR.border}`,
                boxShadow: current ? `0 0 0 4px ${COLOR.saffronTint}` : "none",
              }}
            >
              {passed ? <CheckIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : i + 1}
            </span>
            <span
              className="text-[11px] font-medium leading-none transition-colors sm:text-xs"
              style={{ color: current ? COLOR.saffronDark : reached ? COLOR.ink : COLOR.inkFaint }}
            >
              {t.label}
            </span>
          </span>
        );

        return (
          <React.Fragment key={t.key}>
            {t.clickable ? (
              <button
                type="button"
                onClick={t.onClick}
                className="shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              >
                {label}
              </button>
            ) : (
              <span className="shrink-0">{label}</span>
            )}

            {i < tabs.length - 1 && (
              <span
                className="ticket-tab-connector mx-2 h-[2.5px] min-w-[16px] flex-1 overflow-hidden rounded-full"
                style={{ backgroundColor: COLOR.border, marginTop: "12.75px" }}
                aria-hidden="true"
              >
                <span
                  className="block h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: passed ? "100%" : "0%",
                    backgroundColor: COLOR.saffron,
                  }}
                />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const EmptyAddresses: React.FC = () => (
  <div className="py-10 text-center">
    <span
      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
      style={{ backgroundColor: COLOR.saffronTint, color: COLOR.saffronDark }}
    >
      <PinIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </span>
    <h4 className="mt-4 text-base font-semibold sm:text-lg" style={{ color: COLOR.ink }}>
      No delivery address found
    </h4>
    <p className="mt-1.5 text-sm sm:text-base" style={{ color: COLOR.inkSoft }}>
      Add an address to your Swiggy account first.
    </p>
  </div>
);

const SingleAddressConfirm: React.FC<{ address: SwiggyAddress }> = ({ address }) => (
  <div className="rounded-xl border-2 px-4 py-4 sm:px-5 sm:py-5" style={{ borderColor: COLOR.saffron, backgroundColor: COLOR.saffronTint }}>
    <div className="flex items-start gap-3.5">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
        style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
      >
        <PinIcon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold sm:text-base" style={{ color: COLOR.ink }}>
          {address.addressTag || address.addressCategory || "Address"}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed sm:text-sm" style={{ color: COLOR.inkSoft }}>
          {address.addressLine}
        </p>
      </div>
    </div>
    <p className="mt-3 text-xs font-medium sm:text-sm" style={{ color: COLOR.saffronDark }}>
      Only saved address · delivering here
    </p>
  </div>
);

/* Address selection reads as a single choice, so it's a radio: a hollow
   ring that fills with a dot when selected, next to a pin badge — not a
   checkbox. */
const AddressList: React.FC<{
  addresses?: SwiggyAddress[];
  selectedAddressId?: string | null;
  onSelectAddress?: (addressId: string) => void;
}> = ({ addresses, selectedAddressId, onSelectAddress }) => (
  <div className="space-y-2.5" role="radiogroup" aria-label="Delivery address">
    {addresses?.map((address, i) => {
      const selected = selectedAddressId === address.id;

      return (
        <button
          key={address.id}
          type="button"
          role="radio"
          aria-checked={selected}
          onClick={() => onSelectAddress?.(address.id)}
          className="w-full animate-fade-in-up rounded-xl border-2 px-4 py-3.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 sm:px-5 sm:py-4"
          style={{
            borderColor: selected ? COLOR.saffron : COLOR.border,
            backgroundColor: selected ? COLOR.saffronTint : COLOR.surface,
            animationDuration: "0.25s",
            animationDelay: `${i * 60}ms`,
            animationFillMode: "backwards",
          }}
        >
          <div className="flex items-center gap-3.5">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9"
              style={{
                backgroundColor: selected ? COLOR.saffron : COLOR.surfaceSunken,
                color: selected ? COLOR.surface : COLOR.inkFaint,
              }}
            >
              <PinIcon className="h-3.5 w-3.5" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold sm:text-base" style={{ color: COLOR.ink }}>
                {address.addressTag || address.addressCategory || "Address"}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed sm:text-sm" style={{ color: COLOR.inkSoft }}>
                {address.addressLine}
              </p>
            </div>

            {/* Radio indicator — ring + dot, not a checkbox square. */}
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
              style={{
                borderColor: selected ? COLOR.saffron : COLOR.border,
                backgroundColor: COLOR.surface,
              }}
            >
              {selected && (
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLOR.saffron }} />
              )}
            </span>
          </div>
        </button>
      );
    })}
  </div>
);

/* ---------- Modal ---------- */
const SwiggyActionModal: React.FC<SwiggyActionModalProps> = ({
  type,
  isLoading,
  loadingStage,
  onBackToProducts,
  onGoToCheckout,
  restaurants,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onContinueAddress,
  onGoToAddress,
  onConfirmAddress,
  isChoosingAddress,
  ingredientProducts,
  searchIngredientNames,
  pendingIngredientNames,
  selectedProducts,
  ingredientAmounts,
  quantities,
  onChangeQuantity,
  onSelectProduct,
  onAddIngredients,
  cartAdded,
  cartSummary,
  isLoadingCartSummary,
  cartSummaryError,
  shortageWarning,
  onCheckout,
  isCheckingOut,
  selectedRestaurant,
  onSelectRestaurant,
  onAddDishToCart,
  foodCartAdded,
  foodCartSummary,
  isLoadingFoodCartSummary,
  foodCartSummaryError,
  onCheckoutFood,
  isCheckingOutFood,
  dishName,
  needsSwiggyReconnect,
  onRetrySwiggyLogin,
  error,
  onMinimize,
  onClose,
}) => {
  useEffect(() => {
    if (!type) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [type]);

  // Back-button trap: an open modal should swallow one back press to
  // minimize itself, not navigate the page away.
  const pushedHistoryStateRef = useRef(false);
  const suppressNextPopRef = useRef(false);

  useEffect(() => {
    if (type && !pushedHistoryStateRef.current) {
      window.history.pushState({ __swiggyModal: true }, "");
      pushedHistoryStateRef.current = true;
    }
  }, [type]);

const onMinimizeRef = useRef(onMinimize);
useEffect(() => {
  onMinimizeRef.current = onMinimize;
}, [onMinimize]);

useEffect(() => {
  const onPopState = () => {
    if (suppressNextPopRef.current) {
      suppressNextPopRef.current = false;
      pushedHistoryStateRef.current = false;
      return;
    }
    if (!pushedHistoryStateRef.current) return;
    pushedHistoryStateRef.current = false;
    onMinimizeRef.current();
  };
  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
}, []); // mounted once, never torn down by parent re-renders

  useEffect(() => {
    if (!type && pushedHistoryStateRef.current) {
      suppressNextPopRef.current = true;
      pushedHistoryStateRef.current = false;
      window.history.back();
    }
  }, [type]);

  const triggerMinimize = () => {
    if (pushedHistoryStateRef.current) {
      suppressNextPopRef.current = true;
      pushedHistoryStateRef.current = false;
      window.history.back();
    }
    onMinimize();
  };

  const triggerClose = () => {
    if (pushedHistoryStateRef.current) {
      suppressNextPopRef.current = true;
      pushedHistoryStateRef.current = false;
      window.history.back();
    }
    onClose();
  };

  const dragStartYRef = useRef<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button")) {
      return;
    }
    dragStartYRef.current = event.clientY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    const delta = event.clientY - dragStartYRef.current;
    setDragY(Math.max(0, delta));
  };

  const handleDragEnd = () => {
    if (dragStartYRef.current === null) return;
    dragStartYRef.current = null;
    setIsDragging(false);
    if (dragY > DRAG_MINIMIZE_THRESHOLD) {
      setDragY(0);
      triggerMinimize();
    } else {
      setDragY(0);
    }
  };

  useEffect(() => {
    if (!type) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") triggerMinimize();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [type]);

  const [hasSearchedRestaurants, setHasSearchedRestaurants] = useState(false);
  const wasLoadingRestaurants = loadingStage === "restaurants" && isLoading;

  const [instamartStage, setInstamartStage] = useState<"success" | "review">("success");
  const wasCartAdded = useRef(false);

  useEffect(() => {
    if (cartAdded && !wasCartAdded.current) {
      setInstamartStage("success");
      const timer = window.setTimeout(() => setInstamartStage("review"), FILL_DURATION_MS + 1100);
      wasCartAdded.current = true;
      return () => window.clearTimeout(timer);
    }
    if (!cartAdded) {
      wasCartAdded.current = false;
    }
  }, [cartAdded]);

  const [foodStage, setFoodStage] = useState<"success" | "review">("success");
  const wasFoodCartAdded = useRef(false);

  useEffect(() => {
    if (foodCartAdded && !wasFoodCartAdded.current) {
      setFoodStage("success");
      const timer = window.setTimeout(() => setFoodStage("review"), FILL_DURATION_MS + 1100);
      wasFoodCartAdded.current = true;
      return () => window.clearTimeout(timer);
    }
    if (!foodCartAdded) {
      wasFoodCartAdded.current = false;
    }
  }, [foodCartAdded]);

  const trolleyRef = useRef<HTMLDivElement>(null);
  const productButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [flyingItems, setFlyingItems] = useState<FlyItem[]>([]);
  const flyIdRef = useRef(0);
  const [trolleyBounceKey, setTrolleyBounceKey] = useState(0);

  const registerProductRef = (spinId: string) => (el: HTMLButtonElement | null) => {
    if (el) productButtonRefs.current.set(spinId, el);
    else productButtonRefs.current.delete(spinId);
  };

  const removeFlyingItem = (id: number) =>
    setFlyingItems((items) => items.filter((item) => item.id !== id));

  const handlePickProduct = (ingredientName: string, variation: InstamartVariation) => {
    const wasSelected = selectedProducts?.[ingredientName]?.spinId === variation.spinId;
    const buttonEl = productButtonRefs.current.get(variation.spinId);
    const trolleyEl = trolleyRef.current;

    if (buttonEl && trolleyEl && variation.imageUrl) {
      const fromRect = buttonEl.getBoundingClientRect();
      const toRect = trolleyEl.getBoundingClientRect();
      const id = flyIdRef.current++;
      setFlyingItems((items) => [
        ...items,
        { id, imageUrl: variation.imageUrl as string, fromRect, toRect, direction: wasSelected ? "out" : "in" },
      ]);
      if (!wasSelected) {
        window.setTimeout(() => setTrolleyBounceKey((k) => k + 1), FLY_DURATION_MS - 90);
      }
    }

    onSelectProduct?.(ingredientName, variation);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
const [showBottomFade, setShowBottomFade] = useState(true);

const handleContentScroll = () => {
  const el = scrollContainerRef.current;
  if (!el) return;
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  setShowBottomFade(distanceFromBottom > 12);
};

useEffect(() => {
    const id = requestAnimationFrame(handleContentScroll);
    return () => cancelAnimationFrame(id);
  });
  
  useEffect(() => {
    if (wasLoadingRestaurants) {
      setHasSearchedRestaurants(true);
    }
  }, [wasLoadingRestaurants]);

  useEffect(() => {
    if (isChoosingAddress) {
      setHasSearchedRestaurants(false);
    }
  }, [isChoosingAddress]);

  const handleCheckoutTabClick = () => {
    if (type === "instamart") {
      wasCartAdded.current = true;
      setInstamartStage("review");
    } else if (type === "swiggy") {
      wasFoodCartAdded.current = true;
      setFoodStage("review");
    }
    onGoToCheckout?.();
  };

  const hasCartDataToReturnTo =
    type === "instamart" ? !!cartSummary : type === "swiggy" ? !!foodCartSummary : false;

  if (!type) return null;

  const hasAddresses = !!addresses && addresses.length > 0;

  const hasInstamartProducts =
    (searchIngredientNames && searchIngredientNames.length > 0) ||
    (ingredientProducts && Object.keys(ingredientProducts).length > 0);

  const hasProducts = hasInstamartProducts;
  const hasRestaurants = restaurants && restaurants.length > 0;
  const hasResults = type === "swiggy" ? hasRestaurants : hasInstamartProducts;
  const selectedCount = Object.keys(selectedProducts ?? {}).length;

  const showAddressScreen =
    type === "swiggy"
      ? isChoosingAddress || (!hasRestaurants && !hasSearchedRestaurants)
      : !cartAdded && (isChoosingAddress || !hasInstamartProducts);

  const instamartNames =
    searchIngredientNames && searchIngredientNames.length > 0
      ? searchIngredientNames
      : Object.keys(ingredientProducts ?? {});

  // Keep the selected variation images available during cart review, even
  // when the cart-summary API only returns each line item's name/price.
  const instamartItemImages: CartItemImage[] = Object.entries(selectedProducts ?? {}).flatMap(
    ([ingredientName, variation]) => {
      if (!variation.imageUrl) return [];

      const matchingProduct = (ingredientProducts?.[ingredientName] ?? []).find((product) =>
        (product.variations ?? []).some((candidate) => candidate.spinId === variation.spinId),
      );

      const names = [matchingProduct?.displayName, ingredientName].filter(
        (name): name is string => typeof name === "string" && name.trim().length > 0,
      );

      return [{ names, imageUrl: variation.imageUrl }];
    },
  );

  const instamartSearchDone = (pendingIngredientNames?.length ?? 0) === 0;

  const noItemsAtAll =
    type === "instamart" &&
    !cartAdded &&
    !showAddressScreen &&
    instamartNames.length > 0 &&
    instamartSearchDone &&
    instamartNames.every(
      (name) => !(ingredientProducts?.[name] ?? []).some((p) => (p.variations ?? []).length > 0)
    );

  const currentStep: Step =
    (type === "instamart" && cartAdded) || (type === "swiggy" && foodCartAdded)
      ? "done"
      : showAddressScreen && !(type === "swiggy" && wasLoadingRestaurants)
      ? "address"
      : "products";

  const isInitialLoading = isLoading && loadingStage !== "cart";
  const isSubmitting = isLoading && loadingStage === "cart";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex animate-fade-in-up items-end justify-center p-0 backdrop-blur-sm sm:items-center sm:p-4"
      style={{ animationDuration: "0.2s", backgroundColor: "rgba(43,26,12,0.4)" }}
      onClick={triggerMinimize}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="swiggy-modal-title"
        className="flex h-[75vh] w-full max-w-md flex-col rounded-t-3xl border shadow-2xl sm:max-w-xl sm:rounded-3xl lg:max-w-2xl lg:h-[80vh]"
        style={{
          borderColor: COLOR.border,
          backgroundColor: COLOR.surface,
          boxShadow: "0 24px 48px rgba(43,26,12,0.25)",
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? "none" : "transform 0.2s ease",
          opacity: 1 - Math.min(dragY / 400, 0.4),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="touch-none rounded-t-3xl px-5 pb-4 pt-3 cursor-grab active:cursor-grabbing sm:cursor-auto sm:px-8 sm:pt-6"
          style={{ backgroundColor: COLOR.surfaceSunken }}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full sm:hidden" style={{ backgroundColor: COLOR.border }} aria-hidden="true" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center sm:h-14 sm:w-14">
                {type === "instamart" ? <GroceryHeaderIcon className="h-11 w-11 sm:h-14 sm:w-14" /> : <DishHeaderIcon className="h-11 w-11 sm:h-14 sm:w-14" />}
              </span>
              <div>
                <p className="text-xs font-semibold sm:text-sm" style={{ color: COLOR.saffronDark }}>
                  {type === "instamart" ? "Instamart Pickup" : "Swiggy Delivery"}
                </p>
                <h3
                  id="swiggy-modal-title"
                  className="font-serif text-xl font-black leading-tight tracking-tight sm:text-3xl"
                  style={{ color: COLOR.ink }}
                >
                  {type === "instamart" ? "Get ingredients" : "Order this dish"}
                </h3>
              </div>
            </div>

            <div className="-mr-1 mt-0.5 flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={triggerMinimize}
                aria-label="Minimize"
                className={iconButton}
                style={{ borderColor: COLOR.border, color: COLOR.inkSoft, backgroundColor: COLOR.surface }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLOR.saffron;
                  e.currentTarget.style.color = COLOR.saffronDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLOR.border;
                  e.currentTarget.style.color = COLOR.inkSoft;
                }}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={triggerClose}
                aria-label="Close"
                className={iconButton}
                style={{ borderColor: COLOR.border, color: COLOR.inkSoft, backgroundColor: COLOR.surface }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLOR.saffron;
                  e.currentTarget.style.color = COLOR.saffronDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLOR.border;
                  e.currentTarget.style.color = COLOR.inkSoft;
                }}
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <TicketTabs
            step={currentStep}
            hasProducts={!!hasResults}
            secondLabel={type === "swiggy" ? "Restaurants" : "Ingredients"}
            showCheckoutTab
            onAddressClick={onGoToAddress}
            onIngredientsClick={onConfirmAddress}
            onBackToProductsClick={onBackToProducts}
            onCheckoutClick={hasCartDataToReturnTo ? handleCheckoutTabClick : undefined}
          />
        </div>

        {/* seam between header and body */}
        <div
          className="h-[3px]"
          style={{ background: `linear-gradient(180deg, ${COLOR.border}, transparent)` }}
          aria-hidden="true"
        />

        {/* Scrollable content */}
        <div className="relative min-h-0 flex-1">
          <div
            ref={scrollContainerRef}
            onScroll={handleContentScroll}
            className="modal-scroll h-full overflow-y-auto px-5 py-5 sm:px-8 sm:py-6"
          >
            {needsSwiggyReconnect ? (
            <div className="py-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16" aria-hidden="true">
                <ReconnectIcon className="h-14 w-14 sm:h-16 sm:w-16" />
              </span>
              <h4 className="mt-4 font-serif text-xl font-black sm:text-2xl" style={{ color: COLOR.ink }}>
                Reconnect to Swiggy
              </h4>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-base" style={{ color: COLOR.inkSoft }}>
                We tried signing you in a moment ago and it didn&apos;t go through. Let&apos;s try again.
              </p>
              {onRetrySwiggyLogin && (
                <button
                  type="button"
                  onClick={onRetrySwiggyLogin}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-8 sm:py-3.5 sm:text-base"
                  style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                >
                  Sign in to Swiggy
                </button>
              )}
            </div>
          ) : (
            <>
              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-2xl border px-4 py-3.5 text-sm leading-relaxed sm:px-5 sm:py-4 sm:text-base"
                  style={{ borderColor: COLOR.border, backgroundColor: COLOR.surfaceSunken, color: COLOR.inkSoft }}
                >
                  {error}
                </div>
              )}

              {isInitialLoading ? (
                loadingStage === "addresses" ? (
                  <AddressStageLoader />
                ) : loadingStage === "restaurants" ? (
                  <RestaurantSkeletonList />
                ) : (
                  <IngredientSkeletonGroup />
                )
              ) : type === "instamart" ? (
                <>
                  {cartAdded && instamartStage === "success" ? (
                    <SuccessStage
                      variant="grocery"
                      eyebrow="Instamart cart"
                      text="Your selected ingredients are in your Instamart cart, alongside anything already there."
                    />
                  ) : cartAdded ? (
                    <CartReviewStep
                      items={cartSummary?.items ?? []}
                      bill={cartSummary?.bill ?? null}
                      isLoading={!!isLoadingCartSummary}
                      error={cartSummaryError}
                      itemImages={instamartItemImages}
                      showItemThumbnails
                      warning={
                        shortageWarning ??
                        (cartSummary?.minOrderNotMet
                          ? `Add a little more — Instamart has a ₹${(cartSummary.minOrderPaise / 100).toFixed(0)} minimum order.`
                          : null)
                      }
                    />
                  ) : !hasAddresses ? (
                    <EmptyAddresses />
                  ) : showAddressScreen ? (
                    <div>
                      <p className="mb-4 text-xs font-semibold sm:text-sm" style={{ color: COLOR.inkSoft }}>
                        {hasProducts ? "Change delivery address" : "Deliver ingredients to"}
                      </p>
                      {addresses && addresses.length === 1 ? (
                        <SingleAddressConfirm address={addresses[0]} />
                      ) : (
                        <AddressList addresses={addresses} selectedAddressId={selectedAddressId} onSelectAddress={onSelectAddress} />
                      )}
                    </div>
                  ) : noItemsAtAll ? (
                    <div className="py-10 text-center">
                      <span
                        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
                        style={{ backgroundColor: COLOR.saffronTint, color: COLOR.saffronDark }}
                      >
                        <InfoIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </span>
                      <h4 className="mt-4 font-serif text-xl font-black sm:text-2xl" style={{ color: COLOR.ink }}>
                        We couldn&apos;t find these on Instamart
                      </h4>
                      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-base" style={{ color: COLOR.inkSoft }}>
                        None of the missing ingredients are available for this address right now.
                      </p>
                      {onGoToAddress && (
                        <button
                          type="button"
                          onClick={onGoToAddress}
                          className={secondaryButton}
                          style={{ borderColor: COLOR.border, color: COLOR.ink, backgroundColor: COLOR.surface }}
                        >
                          Try another address
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="animate-fade-in-up space-y-6 sm:space-y-7" style={{ animationDuration: "0.25s" }}>
                      {instamartNames.map((ingredientName) => {
                        const isPending = pendingIngredientNames?.includes(ingredientName);
                        const products = ingredientProducts?.[ingredientName] ?? [];
                        const chosen = selectedProducts?.[ingredientName];
                        const qty = quantities?.[ingredientName] ?? 1;

                        return (
                          <div key={ingredientName}>
                            <div className="mb-2.5 flex items-center justify-between gap-3 sm:mb-3">
                              <p className="text-sm font-bold sm:text-base" style={{ color: COLOR.ink }}>
                                {ingredientName}
                              </p>
                              {ingredientAmounts?.[ingredientName] && (
                                <span
                                  className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium sm:text-xs"
                                  style={{ backgroundColor: COLOR.surfaceSunken, color: COLOR.inkSoft }}
                                >
                                  {ingredientAmounts[ingredientName]}
                                </span>
                              )}
                            </div>

                            {isPending ? (
                              <div className="modal-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
                                {[1, 2, 3].map((i) => (
                                  <div key={i} className="w-28 shrink-0 rounded-xl border p-2.5 sm:w-36 sm:p-3" style={{ borderColor: COLOR.border }}>
                                    <Shimmer className="mx-auto mb-2.5 h-14 w-14 rounded-lg sm:h-20 sm:w-20" />
                                    <Shimmer className="mb-1.5 h-2.5 w-full" />
                                    <Shimmer className="h-2.5 w-2/3" />
                                  </div>
                                ))}
                              </div>
                            ) : !products.some((p) => (p.variations ?? []).length > 0) ? (
                              <p className="text-sm sm:text-base" style={{ color: COLOR.inkFaint }}>
                                Not available at your address.
                              </p>
                            ) : (
                              <div className="modal-scroll -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1 pt-3 sm:gap-3.5 sm:pt-4">
                              {products.flatMap((product) =>
                                  (product.variations ?? []).map((variation) => {
                                    const selected = chosen?.spinId === variation.spinId;
                                    const unavailable = !variation.isInStockAndAvailable || !product.inStock;

                                    return (
                                      <button
                                        key={variation.spinId}
                                        ref={registerProductRef(variation.spinId)}
                                        type="button"
                                        disabled={unavailable}
                                        aria-pressed={selected}
                                        onClick={() => handlePickProduct(ingredientName, variation)}
                                        className="hover-float relative w-32 shrink-0 snap-start rounded-2xl border-2 p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 sm:w-[168px] sm:p-3.5"
                                        style={{
                                          borderColor: selected ? COLOR.saffron : COLOR.border,
                                          backgroundColor: selected ? COLOR.saffronTint : COLOR.surface,
                                          boxShadow: selected
                                            ? `0 0 0 1px ${COLOR.saffron}, 0 8px 16px -10px rgba(43,26,12,0.3)`
                                            : "0 1px 2px rgba(43,26,12,0.06)",
                                        }}
                                      >
                                        {selected && (
                                          <span
                                            aria-hidden="true"
                                            className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full"
                                            style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                                          >
                                            <CheckIcon className="h-3 w-3" />
                                          </span>
                                        )}

                                        <div
                                          className="mb-2.5 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border sm:h-28"
                                          style={{ borderColor: COLOR.border, backgroundColor: "#FFFFFF" }}
                                        >
                                          {variation.imageUrl ? (
                                            <img
                                              src={variation.imageUrl}
                                              alt={product.displayName}
                                              className="h-full w-full object-cover p-1.5"
                                            />
                                          ) : (
                                            <BasketIcon className="h-7 w-7" style={{ color: COLOR.inkFaint } as React.CSSProperties} />
                                          )}
                                        </div>

                                        <p className="line-clamp-2 text-xs font-semibold leading-snug sm:text-sm" style={{ color: COLOR.ink }}>
                                          {product.displayName}
                                        </p>
                                        <p className="mt-0.5 truncate text-[11px] sm:text-xs" style={{ color: COLOR.inkFaint }}>
                                          {variation.quantityDescription}
                                        </p>

                                        <div className="mt-1.5 flex items-baseline justify-between">
                                          <p className="text-sm font-bold tabular-nums sm:text-base" style={{ color: COLOR.saffronDark }}>
                                            ₹{variation.price.offerPrice}
                                          </p>
                                          {variation.price.mrp > variation.price.offerPrice && (
                                            <p className="text-[11px] tabular-nums line-through sm:text-xs" style={{ color: COLOR.inkFaint }}>
                                              ₹{variation.price.mrp}
                                            </p>
                                          )}
                                        </div>

                                        {unavailable && (
                                          <p className="mt-1 text-[10px] font-medium sm:text-[11px]" style={{ color: COLOR.clay }}>
                                            Unavailable
                                          </p>
                                        )}
                                      </button>
                                    );
                                  })
                                )}
                              </div>
                            )}

                            {!isPending && chosen && (
                              <div
                                className="mt-3 flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 sm:px-4 sm:py-3"
                                style={{ borderColor: COLOR.border, backgroundColor: COLOR.surfaceSunken }}
                              >
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-xs font-semibold sm:text-sm" style={{ color: COLOR.ink }}>
                                    {chosen.quantityDescription}
                                  </p>
                                  <p className="mt-0.5 text-xs font-bold tabular-nums sm:text-sm" style={{ color: COLOR.saffronDark }}>
                                    ₹{chosen.price.offerPrice * qty}
                                  </p>
                                </div>

                                <div
                                  className="flex shrink-0 items-center gap-0.5 rounded-full border p-0.5 sm:gap-1"
                                  style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}
                                  role="group"
                                  aria-label={`Quantity for ${ingredientName}`}
                                >
                                  <button
                                    type="button"
                                    onClick={() => onChangeQuantity?.(ingredientName, -1)}
                                    disabled={qty <= 1}
                                    aria-label={`Decrease quantity for ${ingredientName}`}
                                    className="flex h-7 w-7 items-center justify-center rounded-full text-base leading-none transition-colors focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-35 sm:h-8 sm:w-8"
                                    style={{ color: COLOR.ink }}
                                  >
                                    −
                                  </button>

                                  <span className="w-5 text-center text-sm font-bold tabular-nums sm:text-base" style={{ color: COLOR.ink }} aria-live="polite">
                                    {qty}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => onChangeQuantity?.(ingredientName, 1)}
                                    disabled={qty >= MAX_CART_QUANTITY}
                                    aria-label={`Increase quantity for ${ingredientName}`}
                                    className="flex h-7 w-7 items-center justify-center rounded-full text-base leading-none transition-colors focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-35 sm:h-8 sm:w-8"
                                    style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {instamartSearchDone && (
                        <TrolleyWidget ref={trolleyRef} count={selectedCount} bounceKey={trolleyBounceKey} />
                      )}
                    </div>
                  )}
                </>
              ) : (
                /* Swiggy restaurant flow */
                <>
                  {!hasAddresses ? (
                    <EmptyAddresses />
                  ) : showAddressScreen ? (
                    <div>
                      <p className="mb-4 text-xs font-semibold sm:text-sm" style={{ color: COLOR.inkSoft }}>
                        Deliver this dish to
                      </p>
                      {addresses && addresses.length === 1 ? (
                        <SingleAddressConfirm address={addresses[0]} />
                      ) : (
                        <AddressList addresses={addresses} selectedAddressId={selectedAddressId} onSelectAddress={onSelectAddress} />
                      )}
                    </div>
                  ) : foodCartAdded && foodStage === "success" ? (
                    <SuccessStage
                      variant="dish"
                      eyebrow="Swiggy cart"
                      text={`Your dish from ${selectedRestaurant?.name} is in your Swiggy cart.`}
                    />
                  ) : foodCartAdded ? (
                    <CartReviewStep
                      items={foodCartSummary?.items ?? []}
                      bill={foodCartSummary?.bill ?? null}
                      isLoading={!!isLoadingFoodCartSummary}
                      error={foodCartSummaryError}
                      warning={
                        foodCartSummary?.exceedsMaxOrder
                          ? `Your cart is over the ₹${(foodCartSummary.maxOrderPaise / 100).toFixed(0)} order limit — please remove an item.`
                          : null
                      }
                      context={
                        selectedRestaurant
                          ? {
                              icon: "dish",
                              title: selectedRestaurant.name,
                              subtitle: [selectedRestaurant.deliveryText, selectedRestaurant.areaName]
                                .filter(Boolean)
                                .join(" · "),
                              imageUrl: selectedRestaurant.imageUrl,
                            }
                          : undefined
                      }
                    />
                  ) : restaurants.length === 0 ? (
                    <div className="py-10 text-center">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16" aria-hidden="true">
                        <DishSearchIcon className="h-14 w-14 sm:h-16 sm:w-16" />
                      </span>
                      <h4 className="mt-4 font-serif text-xl font-black sm:text-2xl" style={{ color: COLOR.ink }}>
                        {dishName ? `${dishName} isn't on Swiggy near you` : "Couldn't find this dish nearby"}
                      </h4>
                      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-base" style={{ color: COLOR.inkSoft }}>
                        No restaurants delivering to this address have it on their menu right now.
                      </p>
                      {onGoToAddress && (
                        <button
                          type="button"
                          onClick={onGoToAddress}
                          className={secondaryButton}
                          style={{ borderColor: COLOR.border, color: COLOR.ink, backgroundColor: COLOR.surface }}
                        >
                          Try another address
                        </button>
                      )}
                    </div>
                  ) : restaurants.every((restaurant) => !restaurant.isOpen) ? (
                    <div className="py-10 text-center">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16" aria-hidden="true">
                        <ClosedStallIcon className="h-14 w-14 sm:h-16 sm:w-16" />
                      </span>
                      <h4 className="mt-4 font-serif text-xl font-black sm:text-2xl" style={{ color: COLOR.ink }}>
                        Found it - but they&apos;re closed right now
                      </h4>
                      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-base" style={{ color: COLOR.inkSoft }}>
                        {restaurants.length} {restaurants.length === 1 ? "place serves" : "places serve"}{" "}
                        {dishName ?? "this dish"} near you, just not at this hour.
                      </p>

                      <ul className="mx-auto mt-5 max-w-xs space-y-2 text-left sm:max-w-sm">
                        {restaurants.slice(0, 4).map((restaurant) => (
                          <li
                            key={restaurant.id}
                            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5"
                            style={{ backgroundColor: COLOR.surfaceSunken }}
                          >
                            <span className="min-w-0 truncate text-xs font-semibold sm:text-sm" style={{ color: COLOR.ink }}>
                              {restaurant.name}
                            </span>
                            {restaurant.nextOpenText && (
                              <span
                                className="shrink-0 text-[10px] sm:text-xs"
                                style={{ color: COLOR.saffronDark }}
                              >
                                {restaurant.nextOpenText}
                              </span>
                            )}
                          </li>
                        ))}
                        {restaurants.length > 4 && (
                          <li className="text-center text-[10px] sm:text-xs" style={{ color: COLOR.inkFaint }}>
                            +{restaurants.length - 4} more nearby
                          </li>
                        )}
                      </ul>
                    </div>
                  ) : (
                    <ul className="animate-fade-in-up space-y-3" style={{ animationDuration: "0.25s" }}>
                      {restaurants.map((restaurant) => (
                        <RestaurantRow
                          key={restaurant.id}
                          restaurant={restaurant}
                          selected={selectedRestaurant?.id === restaurant.id}
                          onSelect={onSelectRestaurant}
                        />
                      ))}
                    </ul>
                  )}
                </>
              )}
            </>
          )}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 transition-opacity duration-200 sm:h-16"
            style={{
              opacity: showBottomFade ? 1 : 0,
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              maskImage: "linear-gradient(to top, black, transparent)",
              WebkitMaskImage: "linear-gradient(to top, black, transparent)",
              background: `linear-gradient(to top, ${COLOR.surface}, transparent)`,
            }}
          />
        </div>

        {/* Footers */}
        {!isInitialLoading && !needsSwiggyReconnect && hasAddresses && showAddressScreen && (
          <div className={footerClass} style={{ borderColor: COLOR.border }}>
            <button
              type="button"
              onClick={onContinueAddress}
              disabled={!selectedAddressId}
              className={primaryButton}
              style={{
                backgroundColor: selectedAddressId ? COLOR.saffron : COLOR.surfaceSunken,
                color: selectedAddressId ? COLOR.surface : COLOR.inkFaint,
              }}
            >
              {hasResults ? "Continue" : type === "swiggy" ? "Find restaurants" : "Find ingredients"}
            </button>
          </div>
        )}

        {!isInitialLoading && !needsSwiggyReconnect && type === "instamart" && !cartAdded && hasAddresses && !showAddressScreen && !noItemsAtAll && (
          <div className={footerClass} style={{ borderColor: COLOR.border }}>
            <div className="mb-2.5 flex items-center justify-between text-[11px] sm:text-xs" style={{ color: COLOR.inkFaint }}>
              <span>{selectedCount} of {instamartNames.length} picked</span>
              {selectedCount > 0 && <span style={{ color: COLOR.saffronDark }}>Ready</span>}
            </div>
            <button
              type="button"
              onClick={onAddIngredients}
              disabled={selectedCount === 0 || isSubmitting}
              className={primaryButton}
              style={{
                backgroundColor: selectedCount > 0 ? COLOR.saffron : COLOR.surfaceSunken,
                color: selectedCount > 0 ? COLOR.surface : COLOR.inkFaint,
              }}
            >
              {isSubmitting ? (
                <AddingToCart />
              ) : selectedCount > 0 ? (
                `Add ${selectedCount} ${selectedCount === 1 ? "item" : "items"} to cart`
              ) : (
                "Select items to continue"
              )}
            </button>
          </div>
        )}
        {!isInitialLoading && !needsSwiggyReconnect && type === "instamart" && cartAdded && instamartStage === "review" && (
          <div className={footerClass} style={{ borderColor: COLOR.border }}>
            {isCheckingOut ? (
              <div className={`${primaryButton} cursor-wait`} style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }} role="status" aria-live="polite">
                <AddingToCart label="Placing your order" />
              </div>
            ) : (
              <SwipeToConfirmCheckout
                onConfirm={onCheckout}
                disabled={!cartSummary || !!cartSummary?.minOrderNotMet}
              />
            )}
          </div>
        )}

        {!isInitialLoading && !needsSwiggyReconnect && type === "swiggy" && !foodCartAdded && hasAddresses && !showAddressScreen && hasRestaurants && (
          <div className={footerClass} style={{ borderColor: COLOR.border }}>
            <button
              type="button"
              onClick={onAddDishToCart}
              disabled={!selectedRestaurant || isSubmitting}
              className={primaryButton}
              style={{
                backgroundColor: selectedRestaurant ? COLOR.saffron : COLOR.surfaceSunken,
                color: selectedRestaurant ? COLOR.surface : COLOR.inkFaint,
              }}
            >
              {isSubmitting ? (
                <AddingToCart />
              ) : selectedRestaurant ? (
                "Add this dish to cart"
              ) : (
                "Select a restaurant to continue"
              )}
            </button>
          </div>
        )}

        {!isInitialLoading && !needsSwiggyReconnect && type === "swiggy" && foodCartAdded && foodStage === "review" && (
          <div className={footerClass} style={{ borderColor: COLOR.border }}>
            {isCheckingOutFood ? (
              <div className={`${primaryButton} cursor-wait`} style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }} role="status" aria-live="polite">
                <AddingToCart label="Placing your order" />
              </div>
            ) : (
              <SwipeToConfirmCheckout
                onConfirm={onCheckoutFood}
                disabled={!foodCartSummary || !!foodCartSummary?.exceedsMaxOrder}
              />
            )}
          </div>
        )}
      </div>

      <FlyingIngredients items={flyingItems} onDone={removeFlyingItem} />

      <style>{`
        .modal-scroll::-webkit-scrollbar { height: 4px; width: 4px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: ${COLOR.inkFaint}55; border-radius: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }

        @media (hover: hover) and (pointer: fine) {
          .hover-float {
            transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform;
          }
          .hover-float:hover {
            transform: perspective(800px) rotateX(2deg) translateY(-3px) scale(1.01);
            box-shadow: 0 14px 24px -12px rgba(43,26,12,0.32);
            z-index: 5;
          }
          .hover-float:active {
            transform: perspective(800px) rotateX(1deg) translateY(-2px) scale(1.005);
          }
        }
        
        @media (min-width: 640px) {
          .ticket-tab-connector {
            margin-top: 14.75px !important;
          }
        }
        @keyframes skeleton-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .skeleton-shimmer { animation: skeleton-sweep 1.6s ease-in-out infinite; }

        @keyframes punch-pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .punch-pulse { animation: punch-pulse 1.6s ease-out infinite; }

        @keyframes sweep-move {
          0% { background-position: 160% 0; }
          100% { background-position: -60% 0; }
        }
        .sweep {
          background: linear-gradient(100deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%);
          background-size: 220% 100%;
          animation: sweep-move 1.2s linear infinite;
        }

        @keyframes veggie-fall {
          0% { transform: translateY(-6px) rotate(-10deg) scale(1); opacity: 0; }
          12% { opacity: 1; }
          68% { transform: translateY(78px) rotate(8deg) scale(1); opacity: 1; }
          100% { transform: translateY(88px) rotate(14deg) scale(0.25); opacity: 0; }
        }
        .veggie-fall { animation: veggie-fall 0.62s cubic-bezier(0.55, 0.05, 0.86, 0.4) both; }

        @keyframes basket-wobble {
          0%, 20% { transform: scaleY(1) scaleX(1); }
          26% { transform: scaleY(0.84) scaleX(1.1); }
          32%, 51% { transform: scaleY(1) scaleX(1); }
          57% { transform: scaleY(0.84) scaleX(1.1); }
          63%, 82% { transform: scaleY(1) scaleX(1); }
          88% { transform: scaleY(0.84) scaleX(1.1); }
          94%, 100% { transform: scaleY(1) scaleX(1); }
        }
        .basket-wobble { animation: basket-wobble 2.15s ease-in-out both; }

        @keyframes cloche-lift {
          0%, 22% { transform: translateY(0) rotate(0deg); opacity: 1; }
          70% { transform: translateY(-34px) rotate(-18deg); opacity: 1; }
          100% { transform: translateY(-46px) rotate(-22deg); opacity: 0; }
        }
        .cloche-lift { animation: cloche-lift 1.15s cubic-bezier(0.3, 0.8, 0.4, 1) both; }

        @keyframes steam-rise {
          0% { opacity: 0; transform: translateY(4px) scaleY(0.8); }
          35% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-14px) scaleY(1.1); }
        }
        .steam-rise { animation: steam-rise 1.1s ease-out both; }

        @keyframes utensil-slide-left {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .utensil-slide-left { animation: utensil-slide-left 0.5s ease-out both; }

        @keyframes utensil-slide-right {
          0% { opacity: 0; transform: translateX(10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .utensil-slide-right { animation: utensil-slide-right 0.5s ease-out both; }

        @keyframes tick-draw {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .tick-circle {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: tick-draw 0.4s ease-out forwards;
        }
        .tick-check {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: tick-draw 0.3s ease-out forwards;
          animation-delay: 0.38s;
        }

        @keyframes stamp-label-in {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .stamp-label { animation: stamp-label-in 0.35s ease-out both; animation-delay: 0.28s; }

        @keyframes trolley-bounce {
          0% { transform: scale(1) rotate(0deg); }
          30% { transform: scale(1.18) rotate(-5deg); }
          55% { transform: scale(0.94) rotate(4deg); }
          80% { transform: scale(1.05) rotate(-1.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .trolley-bounce { animation: trolley-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }

        @media (prefers-reduced-motion: reduce) {
          .skeleton-shimmer, .punch-pulse, .sweep, .veggie-fall, .basket-wobble,
          .cloche-lift, .steam-rise, .utensil-slide-left, .utensil-slide-right,
          .tick-circle, .tick-check, .stamp-label, .trolley-bounce {
            animation: none !important;
            opacity: 1;
            transform: none;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default SwiggyActionModal;