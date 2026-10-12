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
   DESIGN CONCEPT — "order slip"

   Both flows end the same way a kitchen or a grocery run always has: a
   paper slip. So instead of a generic rounded-card wizard, the modal reads
   like a ticket — clean solid rules, monospace numerals for anything
   counted or priced, corner-notched buttons, and a rubber-stamp "ADDED"
   as the one moment of real motion, instead of a generic
   checkmark-in-a-circle. Everything else stays quiet so that stamp has
   somewhere to land.
   ------------------------------------------------------------------------ */

const COLOR = {
  paper: "#FFFBF0",
  paperSunken: "#F6EDD6",
  ink: "#241608",
  inkSoft: "#6B5A42",
  inkFaint: "#A8977A",
  line: "#DCCCA2",
  stamp: "#FC8019",
  stampDark: "#D96A0C",
  stampTint: "#FFE7CC",
  gold: "#C98A2B",
  goldTint: "#FBECC9",
  error: "#A23E2B",
  errorTint: "#F2DCD2",
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
const BasketIcon: IconC = ({ className }) => (
  <Svg className={className}>
    <path d="M5 10h14l-1.6 9.4a2 2 0 0 1-2 1.6H8.6a2 2 0 0 1-2-1.6L5 10Z" />
    <path d="M9 10c0-3.3 1.3-6 3-6s3 2.7 3 6" />
  </Svg>
);

/* ---------- Header glyphs ----------
   The two things a person can start here are different enough that one
   generic line icon in a colored tile doesn't say much about either. These
   sit directly on the paper with no tile, are drawn in full color instead
   of a single stroke, and echo the same basket-of-produce / plated-dish
   vocabulary used in the success animations, so the icon you see at the
   top is a preview of what's coming, not an unrelated glyph. */

const GroceryHeaderIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 44 42" className={className} aria-hidden="true">
    <path
      d="M15 16c0-4.6 3.1-7.8 7-7.8s7 3.2 7 7.8"
      fill="none"
      stroke={COLOR.stamp}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M7 16h30l-3.2 18.2a3 3 0 0 1-3 2.5H13.2a3 3 0 0 1-3-2.5L7 16Z"
      fill={COLOR.stampTint}
      stroke={COLOR.stamp}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M13.5 21.5 14.8 33M22 21.5V33M30.5 21.5 29.2 33" stroke={COLOR.stampDark} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DishHeaderIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 54 42" className={className} aria-hidden="true">
    <circle cx="27" cy="21" r="12.5" fill={COLOR.stampTint} stroke={COLOR.stamp} strokeWidth="2.2" />
    <circle cx="27" cy="21" r="7" fill="none" stroke={COLOR.stamp} strokeWidth="1.6" opacity="0.55" />

    {/* fork: three tines, a neck where they meet, then the handle */}
    <g fill={COLOR.stamp}>
      <rect x="3.3" y="7" width="1.5" height="9" rx="0.75" />
      <rect x="5.7" y="7" width="1.5" height="9" rx="0.75" />
      <rect x="8.1" y="7" width="1.5" height="9" rx="0.75" />
    </g>
    <path
      d="M3.3 14.6c0 2.6 1.9 4.3 3.9 4.3s3.9-1.7 3.9-4.3"
      fill="none"
      stroke={COLOR.stamp}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect x="6.1" y="18.7" width="1.9" height="15.3" rx="0.95" fill={COLOR.stamp} />

    {/* spoon: an oval bowl and a slim handle */}
    <ellipse cx="47.3" cy="12.4" rx="4.3" ry="5.9" fill={COLOR.stamp} />
    <rect x="46.3" y="17.7" width="2" height="16.3" rx="1" fill={COLOR.stamp} />
  </svg>
);

/* "Not found" — a plate being searched, nothing on it. */
const DishSearchIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 56 48" className={className} aria-hidden="true">
    <circle cx="23" cy="28" r="17" fill={COLOR.stampTint} stroke={COLOR.stamp} strokeWidth="2.2" />
    <circle cx="23" cy="28" r="9.5" fill="none" stroke={COLOR.stamp} strokeWidth="1.3" opacity="0.5" />
    <circle cx="37" cy="15" r="9" fill={COLOR.paper} stroke={COLOR.stampDark} strokeWidth="2.6" />
    <line x1="43.3" y1="21.3" x2="50" y2="28" stroke={COLOR.stampDark} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* "Found, but closed" — a stall with its shutter down. */
const ClosedStallIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 56 46" className={className} aria-hidden="true">
    <path d="M5 15 10 4h36l5 11Z" fill={COLOR.stampDark} />
    <path
      d="M5 15q3.1 4.2 6.2 0t6.2 0 6.2 0 6.2 0 6.2 0 6.2 0 6.2 0"
      fill="none"
      stroke={COLOR.paper}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="9" y="19" width="38" height="21" rx="1.5" fill={COLOR.stampTint} stroke={COLOR.stamp} strokeWidth="2.2" />
    <path d="M9 25.5h38M9 32h38" stroke={COLOR.stamp} strokeWidth="1.6" opacity="0.55" />
    <circle cx="44" cy="35" r="7" fill={COLOR.paper} stroke={COLOR.stampDark} strokeWidth="2" />
    <path d="M44 31.5v3.5l2.3 2.3" stroke={COLOR.stampDark} strokeWidth="1.6" strokeLinecap="round" fill="none" />
  </svg>
);

/* "Reconnect" — a door with an arrow stepping back through it. Calm, not an error. */
const ReconnectIcon: IconC = ({ className }) => (
  <svg viewBox="0 0 52 48" className={className} aria-hidden="true">
    <rect x="8" y="5" width="22" height="38" rx="2" fill={COLOR.stampTint} stroke={COLOR.stamp} strokeWidth="2.2" />
    <circle cx="25" cy="24" r="1.6" fill={COLOR.stampDark} />
    <path
      d="M33 24h14m0 0-5-5m5 5-5 5"
      fill="none"
      stroke={COLOR.stampDark}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Small, simple produce glyphs for the "items landing in the basket"
   animation — flat shapes, not realistic illustrations, so they read
   instantly at 20px while falling. */
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

/* ---------- Shared bits ---------- */

const notchLg: React.CSSProperties = {
  clipPath:
    "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
};
const notchSm: React.CSSProperties = {
  clipPath: "polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px)",
};

const primaryButton =
  "flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wide shadow-sm transition-all duration-150 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100";

const iconButton =
  "flex h-8 w-8 items-center justify-center border transition-colors focus:outline-none focus-visible:ring-2";

const footerClass = "border-t px-5 py-4 sm:px-6";

/* Replaces a plain in-button spinner: the label stays legible, a soft
   diagonal sheen sweeps across the button so it reads as "working" rather
   than "frozen," and a small ring spins quietly next to the text. */
const AddingToCart: React.FC<{ label?: string }> = ({ label = "Adding to cart" }) => (
  <span className="relative flex w-full items-center justify-center gap-2.5 overflow-hidden">
    <span className="sweep pointer-events-none absolute inset-0" aria-hidden="true" />
    <span
      className="relative z-10 h-4 w-4 shrink-0 animate-spin rounded-full border-2"
      style={{ borderColor: `${COLOR.paper}45`, borderTopColor: COLOR.paper }}
      aria-hidden="true"
    />
    <span className="relative z-10">{label}</span>
  </span>
);

/* ---------- Success stage ----------
   Two beats, slow enough to actually watch: a scene specific to what's
   being added plays first, then gives way to a checkmark that draws
   itself, with the copy settling in right after. The grocery run gets
   items dropping into a basket; a dish order gets a cloche lifting off a
   plated dish with steam rising — different actions deserve different
   motion, not the same clip relabelled. */

type SuccessPhase = "filling" | "done";
const FILL_DURATION_MS = 2150;
const DRAG_MINIMIZE_THRESHOLD = 90;

const GroceryFillScene: React.FC = () => (
  <>
    <span className="veggie-fall absolute top-1" style={{ left: "38%", animationDelay: "0ms" }}>
      <CarrotIcon className="h-5 w-5" />
    </span>
    <span className="veggie-fall absolute top-1" style={{ left: "52%", animationDelay: "650ms" }}>
      <TomatoIcon className="h-5 w-5" />
    </span>
    <span className="veggie-fall absolute top-1" style={{ left: "45%", animationDelay: "1300ms" }}>
      <LeafIcon className="h-5 w-5" />
    </span>

    <svg viewBox="0 0 64 56" className="basket-wobble absolute bottom-0 h-[72px] w-[72px] origin-bottom">
      <path
        d="M22 20c0-6.5 4.5-11 10-11s10 4.5 10 11"
        fill="none"
        stroke={COLOR.stamp}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M13 20h38l-4.3 27.3a4 4 0 0 1-4 3.4H21.3a4 4 0 0 1-4-3.4L13 20Z"
        fill={COLOR.stampTint}
        stroke={COLOR.stamp}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M20 28l1.8 16M32 28v16M44 28l-1.8 16" stroke={COLOR.stampDark} strokeWidth="2" strokeLinecap="round" />
    </svg>
  </>
);

const DishPlatingScene: React.FC = () => (
  <svg viewBox="0 0 120 120" className="h-32 w-32">
    {/* plate */}
    <ellipse cx="60" cy="80" rx="38" ry="14" fill={COLOR.paperSunken} stroke={COLOR.line} strokeWidth="2" />
    <ellipse cx="60" cy="78" rx="27" ry="9.5" fill={COLOR.stampTint} />

    {/* plated dish */}
    <ellipse cx="60" cy="76" rx="16" ry="8" fill={COLOR.stampDark} />
    <ellipse cx="53" cy="72" rx="5" ry="3" fill={COLOR.gold} />
    <ellipse cx="67" cy="73" rx="4.5" ry="2.6" fill={COLOR.gold} />

    {/* steam */}
    <path className="steam-rise" d="M50 64c-2-4 2-6 0-10" stroke={COLOR.inkFaint} strokeWidth="2" strokeLinecap="round" fill="none" style={{ animationDelay: "0.95s" }} />
    <path className="steam-rise" d="M60 62c-2-4 2-6 0-10" stroke={COLOR.inkFaint} strokeWidth="2" strokeLinecap="round" fill="none" style={{ animationDelay: "1.1s" }} />
    <path className="steam-rise" d="M70 64c-2-4 2-6 0-10" stroke={COLOR.inkFaint} strokeWidth="2" strokeLinecap="round" fill="none" style={{ animationDelay: "1.25s" }} />

    {/* fork */}
    <g className="utensil-slide-left">
      <path d="M24 56v26M20 56v9M28 56v9M24 65v0" stroke={COLOR.ink} strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
    {/* knife */}
    <g className="utensil-slide-right">
      <path d="M96 56c4 2 4 9 0 11v15" stroke={COLOR.ink} strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>

    {/* cloche lid, lifting away to reveal the dish */}
    <g className="cloche-lift">
      <path d="M31 72a29 23 0 0 1 58 0Z" fill={COLOR.paper} stroke={COLOR.stamp} strokeWidth="3" strokeLinejoin="round" />
      <rect x="57" y="40" width="6" height="7" rx="2" fill={COLOR.stamp} />
      <circle cx="60" cy="38" r="3.6" fill={COLOR.stamp} />
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
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="relative flex h-36 w-32 items-center justify-center" aria-hidden="true">
        {phase === "filling" ? (
          variant === "grocery" ? (
            <GroceryFillScene />
          ) : (
            <DishPlatingScene />
          )
        ) : (
          <svg viewBox="0 0 64 64" className="h-16 w-16">
            <circle cx="32" cy="32" r="27" fill="none" stroke={COLOR.stamp} strokeWidth="4" pathLength={100} className="tick-circle" />
            <path
              d="M20 33l8 8 16-18"
              fill="none"
              stroke={COLOR.stamp}
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
            className="stamp-label mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: COLOR.stamp, animationDelay: "0.55s" }}
          >
            {eyebrow}
          </p>
          <h4 className="stamp-label mt-1 font-serif text-2xl font-black" style={{ color: COLOR.ink, animationDelay: "0.65s" }}>
            Added to cart
          </h4>
          <p
            className="stamp-label mx-auto mt-2 max-w-xs text-sm leading-relaxed"
            style={{ color: COLOR.inkSoft, animationDelay: "0.75s" }}
          >
            {text}
          </p>
        </>
      )}
    </div>
  );
};
const CartReviewStep: React.FC<{
  items: import("../services/swiggyService").InstamartCartLineItem[];
  bill: import("../services/swiggyService").InstamartBill | null;
  isLoading: boolean;
  error?: string | null;
  /** Shown as a warning banner below the bill — e.g. a minimum not met, or a cap exceeded. */
  warning?: string | null;
}> = ({ items, bill, isLoading, error, warning }) => {
  if (isLoading && items.length === 0 && !bill) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center" role="status" aria-live="polite">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="punch-pulse absolute inset-0 rounded-full border-2" style={{ borderColor: COLOR.stamp }} />
          <BasketIcon className="relative h-7 w-7" style={{ color: COLOR.stamp } as React.CSSProperties} />
        </div>
        <p className="mt-5 font-serif text-lg font-black" style={{ color: COLOR.ink }}>Loading your cart</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm" style={{ color: COLOR.inkSoft }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up space-y-5" style={{ animationDuration: "0.25s" }}>
      <p className="font-mono text-xs font-bold uppercase tracking-wide" style={{ color: COLOR.inkSoft }}>
        Review your cart
      </p>

      <ul className="divide-y rounded-xl border" style={{ borderColor: COLOR.line }}>
        {items.map((item, i) => (
          <li key={i} className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm">
            <span className="min-w-0 truncate" style={{ color: COLOR.ink }}>
              {item.quantity > 1 ? `${item.quantity} × ` : ""}{item.name}
            </span>
            {item.price && (
              <span className="shrink-0 font-mono tabular-nums" style={{ color: COLOR.inkSoft }}>
                {item.price}
              </span>
            )}
          </li>
        ))}
      </ul>

      {bill && (
        <div className="rounded-xl border px-3.5 py-3" style={{ borderColor: COLOR.line }}>
          {bill.lineItems.map((line, i) => (
            <div key={i} className="flex items-center justify-between py-1 text-xs" style={{ color: COLOR.inkSoft }}>
              <span>{line.label}</span>
              <span className="font-mono tabular-nums">{line.value}</span>
            </div>
          ))}
          <div
            className="mt-1.5 flex items-center justify-between border-t pt-1.5 text-sm font-bold"
            style={{ borderColor: COLOR.line, color: COLOR.ink }}
          >
            <span>{bill.toPay.label}</span>
            <span className="font-mono tabular-nums">{bill.toPay.value}</span>
          </div>
        </div>
      )}

      {warning && (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border-2 px-4 py-3 text-sm leading-relaxed"
          style={{ borderColor: COLOR.error, backgroundColor: COLOR.errorTint, color: COLOR.ink }}
        >
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: COLOR.error } as React.CSSProperties} />
          <p>{warning}</p>
        </div>
      )}
    </div>
  );
};

/* ---------- Address-stage loader ----------
   Usually just one or two rows come back, so a list-shaped skeleton would
   read as fake. This leans into what's actually happening instead: a punch
   mark pulsing like a hole being cut, captioned with what's being fetched. */

const ADDRESS_CAPTIONS = ["Connecting to your Swiggy account", "Checking your saved addresses"];

const AddressStageLoader: React.FC = () => {
  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setCaptionIndex((i) => (i + 1) % ADDRESS_CAPTIONS.length), 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-14 text-center" role="status" aria-live="polite">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="punch-pulse absolute inset-0 rounded-full border-2" style={{ borderColor: COLOR.stamp }} />
        <span
          className="punch-pulse absolute inset-0 rounded-full border-2"
          style={{ borderColor: COLOR.stamp, animationDelay: "0.5s" }}
        />
        <PinIcon className="relative h-7 w-7" style={{ color: COLOR.stamp } as React.CSSProperties} />
      </div>

      <p className="mt-5 font-serif text-lg font-black" style={{ color: COLOR.ink }}>
        Finding your addresses
      </p>
      <p
        key={captionIndex}
        className="mt-1.5 animate-fade-in-up font-mono text-xs uppercase tracking-wide"
        style={{ color: COLOR.inkSoft, animationDuration: "0.3s" }}
      >
        {ADDRESS_CAPTIONS[captionIndex]}
      </p>
    </div>
  );
};

/* ---------- Skeletons ---------- */

const shimmerStyle: React.CSSProperties = {
  background: `linear-gradient(100deg, ${COLOR.line} 30%, ${COLOR.stampTint} 50%, ${COLOR.line} 70%)`,
  backgroundSize: "200% 100%",
};

const Shimmer: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`skeleton-shimmer rounded-md ${className}`} style={shimmerStyle} />
);

const RestaurantSkeletonList: React.FC = () => (
  <ul className="space-y-3" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <li key={i} className="flex gap-3.5 rounded-xl border p-3" style={{ borderColor: COLOR.line }}>
        <Shimmer className="h-16 w-16 shrink-0 rounded-lg" />
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
            <div key={i} className="w-28 shrink-0 rounded-xl border p-2.5" style={{ borderColor: COLOR.line }}>
              <Shimmer className="mx-auto mb-2.5 h-14 w-14 rounded-lg" />
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
      className="relative overflow-hidden rounded-xl border-2 transition-colors duration-150"
      style={{
        borderColor: selected ? COLOR.stamp : COLOR.line,
        backgroundColor: selected ? COLOR.stampTint : COLOR.paper,
        opacity: restaurant.isOpen ? 1 : 0.55,
      }}
    >
      <button
        type="button"
        disabled={!restaurant.isOpen}
        onClick={() => onSelect?.(restaurant)}
        aria-label={`Order ${restaurant.name} on Swiggy`}
        className="flex w-full gap-3.5 p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
      >
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg"
          style={{ backgroundColor: COLOR.goldTint }}
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
            <UtensilsIcon className="h-6 w-6" style={{ color: COLOR.gold } as React.CSSProperties} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold leading-snug" style={{ color: COLOR.ink }}>
            {restaurant.name}
          </p>
          {cuisines && (
            <p className="mt-0.5 truncate font-mono text-[11px] uppercase tracking-wide" style={{ color: COLOR.inkFaint }}>
              {cuisines}
            </p>
          )}
          {meta.length > 0 && (
            <p className="mt-1.5 font-mono text-[11px]" style={{ color: COLOR.inkSoft }}>
              {meta.join(" · ")}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {!restaurant.isOpen && (
              <span
                className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: COLOR.paperSunken, color: COLOR.inkSoft }}
              >
                Closed
              </span>
            )}
            {restaurant.veg && (
              <span
                className="border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide"
                style={{ borderColor: COLOR.line, color: COLOR.inkSoft }}
              >
                Veg
              </span>
            )}
            {restaurant.offer && (
              <span
                className="max-w-full truncate px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: COLOR.gold, color: COLOR.paper }}
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

  // Forward (address -> products) and backward (done -> products) land on
  // the same tab, so pick whichever handler applies to the current step.
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
      // Pure navigation — jumps back to whatever was last added, without
      // calling any add-to-cart API. Only enabled once there's cart data
      // to show, and only from an earlier step (not already on "done").
      onClick: onCheckoutClick,
      clickable: step !== "done" && !!onCheckoutClick,
    });
  }
  return (
    <div className="mt-4 flex items-center gap-4">
      {tabs.map((t, i) => {
        const reached = order.indexOf(t.key) <= activeIndex;
        const current = order[activeIndex] === t.key;
        const label = (
          <span
            className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors"
            style={{ color: current ? COLOR.stamp : reached ? COLOR.ink : COLOR.inkFaint }}
          >
            {String(i + 1).padStart(2, "0")}·{t.label}
          </span>
        );

        return t.clickable ? (
          <button
            key={t.key}
            type="button"
            onClick={t.onClick}
            className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          >
            {label}
          </button>
        ) : (
          <span key={t.key}>{label}</span>
        );
      })}
      <span className="h-px flex-1" style={{ backgroundColor: COLOR.line }} aria-hidden="true" />
    </div>
  );
};

const EmptyAddresses: React.FC = () => (
  <div className="py-10 text-center">
    <span
      className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg"
      style={{ backgroundColor: COLOR.stampTint, color: COLOR.stampDark }}
    >
      <PinIcon className="h-6 w-6" />
    </span>
    <h4 className="mt-4 text-base font-semibold" style={{ color: COLOR.ink }}>
      No delivery address found
    </h4>
    <p className="mt-1.5 text-sm" style={{ color: COLOR.inkSoft }}>
      Add an address to your Swiggy account first.
    </p>
  </div>
);

const SingleAddressConfirm: React.FC<{ address: SwiggyAddress }> = ({ address }) => (
  <div className="rounded-xl border-2 px-4 py-4" style={{ borderColor: COLOR.stamp, backgroundColor: COLOR.stampTint }}>
    <div className="flex items-start gap-3.5">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: COLOR.stamp, color: COLOR.paper }}
      >
        <PinIcon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold" style={{ color: COLOR.ink }}>
          {address.addressTag || address.addressCategory || "Address"}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed" style={{ color: COLOR.inkSoft }}>
          {address.addressLine}
        </p>
      </div>
    </div>
    <p className="mt-3 font-mono text-[11px] uppercase tracking-wide" style={{ color: COLOR.stampDark }}>
      Only saved address · delivering here
    </p>
  </div>
);

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
          className="w-full animate-fade-in-up rounded-xl border-2 px-4 py-3.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          style={{
            borderColor: selected ? COLOR.stamp : COLOR.line,
            backgroundColor: selected ? COLOR.stampTint : COLOR.paper,
            animationDuration: "0.25s",
            animationDelay: `${i * 60}ms`,
            animationFillMode: "backwards",
          }}
        >
          <div className="flex items-center gap-3.5">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors"
              style={{
                borderColor: selected ? COLOR.stamp : COLOR.line,
                backgroundColor: selected ? COLOR.stamp : "transparent",
                color: COLOR.paper,
              }}
            >
              {selected && <CheckIcon className="h-3 w-3" />}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold" style={{ color: COLOR.ink }}>
                {address.addressTag || address.addressCategory || "Address"}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed" style={{ color: COLOR.inkSoft }}>
                {address.addressLine}
              </p>
            </div>
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
  // minimize itself, not navigate the page away. Mirrors the pattern used
  // by the Cooking Companion sheet, but this modal has two close actions
  // (minimize vs. full close), so a ref tracks which one a pending
  // history.back() should resolve to.
  const pushedHistoryStateRef = useRef(false);
const suppressNextPopRef = useRef(false);

useEffect(() => {
  if (type && !pushedHistoryStateRef.current) {
    window.history.pushState({ __swiggyModal: true }, "");
    pushedHistoryStateRef.current = true;
  }
}, [type]);

useEffect(() => {
  const onPopState = () => {
    if (!pushedHistoryStateRef.current) return;
    pushedHistoryStateRef.current = false;
    if (suppressNextPopRef.current) {
      // We already minimized/closed synchronously from a button tap —
      // this popstate is just that tap's own history.back() resolving.
      suppressNextPopRef.current = false;
      return;
    }
    // A real hardware/browser back press — same as before, just minimizes.
    onMinimize();
  };
  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
}, [onMinimize]);

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
  // Drag-to-minimize on the mobile grab handle. Only downward pulls move
  // the sheet; crossing the threshold minimizes (through the same
  // triggerMinimize path as the button/backdrop/Escape, so the back-button
  // history entry gets cleaned up consistently either way).
  const dragStartYRef = useRef<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    // A tap on a button (Minimize, Close, or a TicketTabs tab) is a tap,
    // not a drag — let its own onClick handle it instead of starting a drag.
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
      setDragY(0); // wasn't pulled far enough — snap back open
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
  // Tracks whether a restaurant search has actually completed, so an empty
  // result can show a "nothing found" message instead of silently bouncing
  // back to the address screen (which looks like nothing happened at all).
  const [hasSearchedRestaurants, setHasSearchedRestaurants] = useState(false);
  const wasLoadingRestaurants = loadingStage === "restaurants" && isLoading;

  // Instamart: a brief success animation plays before the cart review step.
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

  // Swiggy food: the same two-beat success-then-review pattern as Instamart.
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

  useEffect(() => {
    if (wasLoadingRestaurants) {
      setHasSearchedRestaurants(true);
    }
  }, [wasLoadingRestaurants]);

  // A fresh address choice invalidates the previous search result.
  useEffect(() => {
    if (isChoosingAddress) {
      setHasSearchedRestaurants(false);
    }
  }, [isChoosingAddress]);

  // Ticket-bar "Checkout" tab: pure navigation back to the last-added
  // cart, never a new add-to-cart call. Marks the success animation as
  // already seen so the effects above don't replay it — jumps straight
  // to the review screen instead.
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
      : showAddressScreen
      ? "address"
      : "products";

  const isInitialLoading = isLoading && loadingStage !== "cart";
  const isSubmitting = isLoading && loadingStage === "cart";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex animate-fade-in-up items-end justify-center p-0 backdrop-blur-sm sm:items-center sm:p-4"
      style={{ animationDuration: "0.2s", backgroundColor: "rgba(36,22,8,0.4)" }}
      onClick={triggerMinimize}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="swiggy-modal-title"
        className="flex max-h-[88vh] w-full max-w-md flex-col rounded-t-2xl border-2 shadow-2xl sm:max-h-[82vh] sm:rounded-2xl"
        style={{
          borderColor: COLOR.line,
          backgroundColor: COLOR.paper,
          boxShadow: "0 24px 48px rgba(36,22,8,0.25)",
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? "none" : "transform 0.2s ease",
          opacity: 1 - Math.min(dragY / 400, 0.4),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — the drag handlers sit on this whole block (handle, title
            row, and ticket tabs), not just the visible grab bar, so there's
            a generous target for dragging to minimize. The guard inside
            handleDragStart keeps every button in here (Minimize, Close, and
            the TicketTabs tabs) tappable as normal. */}
        <div
          className="touch-none px-5 pb-4 pt-3 cursor-grab active:cursor-grabbing sm:cursor-auto sm:px-6 sm:pt-5"
          style={{ backgroundColor: COLOR.paperSunken }}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full sm:hidden" style={{ backgroundColor: COLOR.line }} aria-hidden="true" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                {type === "instamart" ? <GroceryHeaderIcon className="h-11 w-11" /> : <DishHeaderIcon className="h-11 w-11" />}
              </span>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: COLOR.gold }}>
                  {type === "instamart" ? "Instamart Pickup" : "Swiggy Delivery"}
                </p>
                <h3
                  id="swiggy-modal-title"
                  className="font-serif text-xl font-black leading-tight tracking-tight sm:text-2xl"
                  style={{ color: COLOR.ink }}
                >
                  {type === "instamart" ? "Get ingredients" : "Order this dish"}
                </h3>
              </div>
            </div>

            <div className="-mr-1 mt-0.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={triggerMinimize}
                aria-label="Minimize"
                className={iconButton}
                style={{ borderColor: COLOR.line, color: COLOR.inkSoft, ...notchSm }}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={triggerClose}
                aria-label="Close"
                className={iconButton}
                style={{ borderColor: COLOR.line, color: COLOR.inkSoft, ...notchSm }}
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
          style={{ background: `linear-gradient(180deg, ${COLOR.line}, transparent)` }}
          aria-hidden="true"
        />

        {/* Scrollable content */}
        <div className="modal-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {needsSwiggyReconnect ? (
            <div className="py-10 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center" aria-hidden="true">
                <ReconnectIcon className="h-14 w-14" />
              </span>
              <h4 className="mt-4 font-serif text-xl font-black" style={{ color: COLOR.ink }}>
                Reconnect to Swiggy
              </h4>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed" style={{ color: COLOR.inkSoft }}>
                We tried signing you in a moment ago and it didn&apos;t go through. Let&apos;s try again.
              </p>
              {onRetrySwiggyLogin && (
                <button
                  type="button"
                  onClick={onRetrySwiggyLogin}
                  className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold uppercase tracking-wide shadow-sm transition-all duration-150 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ backgroundColor: COLOR.stamp, color: COLOR.paper, ...notchLg }}
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
                  className="mb-5 flex gap-3 rounded-xl border-2 px-4 py-3 text-sm leading-relaxed"
                  style={{ borderColor: COLOR.error, backgroundColor: COLOR.errorTint, color: COLOR.ink }}
                >
                  <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: COLOR.error }} />
                  <p>{error}</p>
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
                  warning={
                    cartSummary?.minOrderNotMet
                      ? `Add a little more — Instamart has a ₹${(cartSummary.minOrderPaise / 100).toFixed(0)} minimum order.`
                      : null
                  }
                />
              ) : !hasAddresses ? (
                <EmptyAddresses />
              ) : showAddressScreen ? (
                <div>
                  <p className="mb-4 font-mono text-xs font-bold uppercase tracking-wide" style={{ color: COLOR.inkSoft }}>
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
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: COLOR.stampTint, color: COLOR.stampDark }}
                  >
                    <InfoIcon className="h-6 w-6" />
                  </span>
                  <h4 className="mt-4 font-serif text-xl font-black" style={{ color: COLOR.ink }}>
                    We couldn&apos;t find these on Instamart
                  </h4>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed" style={{ color: COLOR.inkSoft }}>
                    None of the missing ingredients are available for this address right now.
                  </p>
                  {onGoToAddress && (
                    <button
                      type="button"
                      onClick={onGoToAddress}
                      className="mt-5 border px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                      style={{ borderColor: COLOR.line, color: COLOR.ink, backgroundColor: COLOR.paper }}
                    >
                      Try another address
                    </button>
                  )}
                </div>
              ) : (
                <div className="animate-fade-in-up space-y-6" style={{ animationDuration: "0.25s" }}>
                  {instamartNames.map((ingredientName) => {
                    const isPending = pendingIngredientNames?.includes(ingredientName);
                    const products = ingredientProducts?.[ingredientName] ?? [];
                    const chosen = selectedProducts?.[ingredientName];
                    const qty = quantities?.[ingredientName] ?? 1;

                    return (
                      <div key={ingredientName}>
                        <div className="mb-3 flex items-baseline justify-between gap-3">
                          <p className="text-sm font-semibold" style={{ color: COLOR.ink }}>
                            {ingredientName}
                          </p>
                          {ingredientAmounts?.[ingredientName] && (
                            <p className="shrink-0 font-mono text-[11px]" style={{ color: COLOR.inkFaint }}>
                              {ingredientAmounts[ingredientName]}
                            </p>
                          )}
                        </div>

                        {isPending ? (
                          <div className="modal-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-28 shrink-0 rounded-xl border p-2.5" style={{ borderColor: COLOR.line }}>
                                <Shimmer className="mx-auto mb-2.5 h-14 w-14 rounded-lg" />
                                <Shimmer className="mb-1.5 h-2.5 w-full" />
                                <Shimmer className="h-2.5 w-2/3" />
                              </div>
                            ))}
                          </div>
                        ) : !products.some((p) => (p.variations ?? []).length > 0) ? (
                          <p className="text-sm" style={{ color: COLOR.inkFaint }}>
                            Not available at your address.
                          </p>
                        ) : (
                          <div className="modal-scroll -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
                            {products.flatMap((product) =>
                              (product.variations ?? []).map((variation) => {
                                const selected = chosen?.spinId === variation.spinId;
                                const unavailable = !variation.isInStockAndAvailable || !product.inStock;

                                return (
                                  <button
                                    key={variation.spinId}
                                    type="button"
                                    disabled={unavailable}
                                    aria-pressed={selected}
                                    onClick={() => onSelectProduct?.(ingredientName, variation)}
                                    className="relative w-28 shrink-0 snap-start rounded-xl border-2 p-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40"
                                    style={{
                                      borderColor: selected ? COLOR.stamp : COLOR.line,
                                      backgroundColor: selected ? COLOR.stampTint : COLOR.paper,
                                      boxShadow: selected ? `inset 0 0 0 1px ${COLOR.stamp}` : "none",
                                    }}
                                  >
                                    {selected && (
                                      <span
                                        aria-hidden="true"
                                        className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full"
                                        style={{ backgroundColor: COLOR.stamp, color: COLOR.paper }}
                                      >
                                        <CheckIcon className="h-2.5 w-2.5" />
                                      </span>
                                    )}

                                    {variation.imageUrl && (
                                      <img
                                        src={variation.imageUrl}
                                        alt={product.displayName}
                                        className="mx-auto mb-2.5 h-14 w-14 rounded-lg border bg-white object-cover"
                                        style={{ borderColor: COLOR.line }}
                                      />
                                    )}

                                    <p className="line-clamp-2 text-xs font-medium leading-tight" style={{ color: COLOR.ink }}>
                                      {variation.quantityDescription}
                                    </p>
                                    <p className="mt-1.5 font-mono text-sm font-bold tabular-nums" style={{ color: COLOR.stampDark }}>
                                      ₹{variation.price.offerPrice}
                                    </p>
                                    {unavailable && (
                                      <p className="mt-0.5 font-mono text-[10px] uppercase" style={{ color: COLOR.inkFaint }}>
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
                          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg px-3 py-2" style={{ backgroundColor: COLOR.paperSunken }}>
                            <p className="min-w-0 text-xs" style={{ color: COLOR.inkSoft }}>
                              <span className="font-semibold" style={{ color: COLOR.ink }}>
                                {chosen.quantityDescription}
                              </span>
                            </p>

                            <div className="flex shrink-0 items-center gap-2.5" role="group" aria-label={`Quantity for ${ingredientName}`}>
                              <button
                                type="button"
                                onClick={() => onChangeQuantity?.(ingredientName, -1)}
                                disabled={qty <= 1}
                                aria-label={`Decrease quantity for ${ingredientName}`}
                                className="flex h-7 w-7 items-center justify-center rounded-md border-2 text-base leading-none transition-colors focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-35"
                                style={{ borderColor: COLOR.line, backgroundColor: COLOR.paper, color: COLOR.ink }}
                              >
                                −
                              </button>

                              <span className="w-4 text-center font-mono text-sm font-bold tabular-nums" style={{ color: COLOR.ink }} aria-live="polite">
                                {qty}
                              </span>

                              <button
                                type="button"
                                onClick={() => onChangeQuantity?.(ingredientName, 1)}
                                disabled={qty >= MAX_CART_QUANTITY}
                                aria-label={`Increase quantity for ${ingredientName}`}
                                className="flex h-7 w-7 items-center justify-center rounded-md border-2 text-base leading-none transition-colors focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-35"
                                style={{ borderColor: COLOR.line, backgroundColor: COLOR.paper, color: COLOR.ink }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                  <p className="mb-4 font-mono text-xs font-bold uppercase tracking-wide" style={{ color: COLOR.inkSoft }}>
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
                />

              // AFTER
              ) : restaurants.length === 0 ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center" aria-hidden="true">
                    <DishSearchIcon className="h-14 w-14" />
                  </span>
                  <h4 className="mt-4 font-serif text-xl font-black" style={{ color: COLOR.ink }}>
                    {dishName ? `${dishName} isn't on Swiggy near you` : "Couldn't find this dish nearby"}
                  </h4>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed" style={{ color: COLOR.inkSoft }}>
                    No restaurants delivering to this address have it on their menu right now.
                  </p>
                  {onGoToAddress && (
                    <button
                      type="button"
                      onClick={onGoToAddress}
                      className="mt-5 border px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                      style={{ borderColor: COLOR.line, color: COLOR.ink, backgroundColor: COLOR.paper }}
                    >
                      Try another address
                    </button>
                  )}
                </div>
              ) : restaurants.every((restaurant) => !restaurant.isOpen) ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center" aria-hidden="true">
                    <ClosedStallIcon className="h-14 w-14" />
                  </span>
                  <h4 className="mt-4 font-serif text-xl font-black" style={{ color: COLOR.ink }}>
                    Found it - but they&apos;re closed right now
                  </h4>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed" style={{ color: COLOR.inkSoft }}>
                    {restaurants.length} {restaurants.length === 1 ? "place serves" : "places serve"}{" "}
                    {dishName ?? "this dish"} near you, just not at this hour.
                  </p>

                  <ul className="mx-auto mt-5 max-w-xs space-y-2 text-left">
                    {restaurants.slice(0, 4).map((restaurant) => (
                      <li
                        key={restaurant.id}
                        className="flex items-center justify-between gap-3 rounded-lg px-3 py-2"
                        style={{ backgroundColor: COLOR.paperSunken }}
                      >
                        <span className="min-w-0 truncate text-xs font-semibold" style={{ color: COLOR.ink }}>
                          {restaurant.name}
                        </span>
                        {restaurant.nextOpenText && (
                          <span
                            className="shrink-0 font-mono text-[10px] uppercase tracking-wide"
                            style={{ color: COLOR.stampDark }}
                          >
                            {restaurant.nextOpenText}
                          </span>
                        )}
                      </li>
                    ))}
                    {restaurants.length > 4 && (
                      <li className="text-center font-mono text-[10px] uppercase tracking-wide" style={{ color: COLOR.inkFaint }}>
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

        {/* Footers */}
        {!isInitialLoading && !needsSwiggyReconnect && hasAddresses && showAddressScreen && (
          <div className={footerClass} style={{ borderColor: COLOR.line }}>
            <button
              type="button"
              onClick={onContinueAddress}
              disabled={!selectedAddressId}
              className={primaryButton}
              style={{
                backgroundColor: selectedAddressId ? COLOR.stamp : COLOR.paperSunken,
                color: selectedAddressId ? COLOR.paper : COLOR.inkFaint,
                ...notchLg,
              }}
            >
              {hasResults ? "Continue" : type === "swiggy" ? "Find restaurants" : "Find ingredients"}
            </button>
          </div>
        )}

        {!isInitialLoading && !needsSwiggyReconnect && type === "instamart" && !cartAdded && hasAddresses && !showAddressScreen && !noItemsAtAll && (
          <div className={footerClass} style={{ borderColor: COLOR.line }}>
            <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wide" style={{ color: COLOR.inkFaint }}>
              <span>{selectedCount} of {instamartNames.length} picked</span>
              {selectedCount > 0 && <span style={{ color: COLOR.stampDark }}>Ready</span>}
            </div>
            <button
              type="button"
              onClick={onAddIngredients}
              disabled={selectedCount === 0 || isSubmitting}
              className={primaryButton}
              style={{
                backgroundColor: selectedCount > 0 ? COLOR.stamp : COLOR.paperSunken,
                color: selectedCount > 0 ? COLOR.paper : COLOR.inkFaint,
                ...notchLg,
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
          <div className={footerClass} style={{ borderColor: COLOR.line }}>
            <button
              type="button"
              onClick={onCheckout}
              disabled={isCheckingOut || !cartSummary || !!cartSummary?.minOrderNotMet}
              className={primaryButton}
              style={{ backgroundColor: COLOR.stamp, color: COLOR.paper, ...notchLg }}
            >
              {isCheckingOut ? <AddingToCart label="Placing your order" /> : "Pay with Cash on Delivery"}
            </button>
          </div>
        )}

        {!isInitialLoading && !needsSwiggyReconnect && type === "swiggy" && !foodCartAdded && hasAddresses && !showAddressScreen && selectedRestaurant && (
          <div className={footerClass} style={{ borderColor: COLOR.line }}>
            <button
              type="button"
              onClick={onAddDishToCart}
              disabled={isSubmitting}
              className={primaryButton}
              style={{ backgroundColor: COLOR.stamp, color: COLOR.paper, ...notchLg }}
            >
              {isSubmitting ? <AddingToCart /> : "Add this dish to cart"}
            </button>
          </div>
        )}

        {!isInitialLoading && !needsSwiggyReconnect && type === "swiggy" && foodCartAdded && foodStage === "review" && (
          <div className={footerClass} style={{ borderColor: COLOR.line }}>
            <button
              type="button"
              onClick={onCheckoutFood}
              disabled={isCheckingOutFood || !foodCartSummary || !!foodCartSummary?.exceedsMaxOrder}
              className={primaryButton}
              style={{ backgroundColor: COLOR.stamp, color: COLOR.paper, ...notchLg }}
            >
              {isCheckingOutFood ? <AddingToCart label="Placing your order" /> : "Pay with Cash on Delivery"}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .modal-scroll::-webkit-scrollbar { height: 4px; width: 4px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: ${COLOR.inkFaint}55; border-radius: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }

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

        @media (prefers-reduced-motion: reduce) {
          .skeleton-shimmer, .punch-pulse, .sweep, .veggie-fall, .basket-wobble,
          .cloche-lift, .steam-rise, .utensil-slide-left, .utensil-slide-right,
          .tick-circle, .tick-check, .stamp-label {
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