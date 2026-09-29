import React, { useEffect, useRef, useState } from "react";
import { Recipe, Tip } from "../types";
import {
  getSwiggyAddresses,
  searchInstamartProducts,
  addToInstamartCart,
  searchRestaurants,
  addDishToFoodCart,
  startSwiggyLogin,
  MAX_CART_QUANTITY,
  SwiggyAddress,
  InstamartProduct,
  InstamartVariation,
  SwiggyRestaurant,
} from "../services/swiggyService";
import SwiggyActionModal from "./SwiggyActionModal";

import NutritionInfo from "./NutritionInfo";
import CookingCompanionChat from "./CookingCompanion";

interface RecipeDisplayProps {
  recipe: Recipe;
  onFinishCooking: () => void;
}

/* ---------------------------------------------------------------- palette
   Saffron carries the brand, every primary action, and "this is done/
   checked" state. Mustard is reserved for quiet info tags (prep time,
   notes). Clay marks equipment that needs a workaround, so it doesn't get
   lost among everything else. No gradients anywhere. */

const COLOR = {
  surface: "#FFFEFA",
  ink: "#2B1A0C",
  inkSoft: "#6B5238",
  border: "#EAD9AE",
  saffron: "#FC6C26",
  saffronDark: "#D1560F",
  saffronTint: "#FFE3C2",
  mustard: "#FFEFC0",
  clay: "#C65D42",      
  clayTint: "#F5E1DA",
} as const;

/* ---------- Icons ---------- */

const Icon: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {children}
  </svg>
);

type IconC = React.FC<React.SVGProps<SVGSVGElement>>;

const SpeakerIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
  </Icon>
);
const SpeakerOffIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </Icon>
);

const ClockIcon: IconC = ({ className }) => (
  <Icon className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
);
const CartIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </Icon>
);
const UtensilsIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </Icon>
);
const PlayIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" />
  </Icon>
);
const ArrowDownIcon: IconC = ({ className }) => (
  <Icon className={className}><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></Icon>
);
const ChevronLeftIcon: IconC = ({ className }) => (
  <Icon className={className}><path d="m15 18-6-6 6-6" /></Icon>
);
const ChevronRightIcon: IconC = ({ className }) => (
  <Icon className={className}><path d="m9 18 6-6-6-6" /></Icon>
);
const BulbIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M9 18h6" /><path d="M10 22h4" />
    <path d="M8.5 14.5a6 6 0 1 1 7 0c-.9.6-1.5 1.4-1.5 2.5h-4c0-1.1-.6-1.9-1.5-2.5Z" />
  </Icon>
);
const PotIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M2 12h20" /><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
    <path d="m4 8 16-4" />
    <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
  </Icon>
);
const IngredientsIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" />
  </Icon>
);
const MethodIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" />
    <path d="M9 6h11" />
    <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
    <path d="M9 12h11" />
    <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
    <path d="M9 18h11" />
  </Icon>
);
const NotesIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
    <path d="M9 13h6" />
    <path d="M9 17h4" />
  </Icon>
);

/* Pictures reused from the kitchen selector, matched by equipment name */

const EQUIPMENT_IMAGES: [RegExp, string][] = [
  [/microwave/i, "/kitchen/microwave.png"],
  [/air.?fryer/i, "/kitchen/air_fryer.png"],
  [/grinder|mixer|blender/i, "/kitchen/grinder.png"],
  [/cooker/i, "/kitchen/cooker.png"],
  [/kadai|kadhai|wok/i, "/kitchen/kadai.png"],
  [/tawa|griddle|\bpan\b/i, "/kitchen/tawa.png"],
  [/oven|tandoor/i, "/kitchen/oven.png"],
  [/stove|gas/i, "/kitchen/stove.png"],
];

const getEquipmentImage = (name: string): string | null =>
  EQUIPMENT_IMAGES.find(([pattern]) => pattern.test(name))?.[1] ?? null;

const STEP_ANIMATION_CSS = `
@keyframes step-slide-from-right { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes step-slide-from-left { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
.step-slide-from-right { animation: step-slide-from-right 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
.step-slide-from-left { animation: step-slide-from-left 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes image-bounce-3d {
  0% { transform: translateZ(0) scale(1); }
  40% { transform: translateZ(20px) scale(1.02); }
  70% { transform: translateZ(-4px) scale(0.996); }
  100% { transform: translateZ(0) scale(1); }
}
.animate-image-bounce-3d { animation: image-bounce-3d 0.55s cubic-bezier(0.25, 0.8, 0.35, 1) both; }
@media (prefers-reduced-motion: reduce) {
  .step-slide-from-right, .step-slide-from-left, .animate-image-bounce-3d { animation: none; }
}
`;

/* ---------- Shared UI ---------- */

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2";

const card = "rounded-3xl border";

const SectionTitle: React.FC<{
  id: string;
  title: string;
  icon: React.ReactNode;
  aside?: React.ReactNode;
  flush?: boolean;
}> = ({ id, title, icon, aside, flush = false }) => (
  <div className={`${flush ? "" : "mb-5"} flex items-center justify-between gap-4`}>
    <div className="flex items-center gap-3">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: COLOR.saffronTint, color: COLOR.saffron }}
      >
        {icon}
      </span>
      <h2
        id={id}
        className="font-serif text-2xl font-black tracking-tight sm:text-3xl"
        style={{ color: COLOR.ink }}
      >
        {title}
      </h2>
    </div>
    {aside}
  </div>
);

const TipCallout: React.FC<{ tip: Tip }> = ({ tip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tipId = `tip-${tip.title.replace(/\s+/g, "-")}`;

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex max-w-full items-center gap-2 rounded-lg text-left text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2"
        style={{ color: COLOR.saffronDark }}
        aria-expanded={isOpen}
        aria-controls={tipId}
      >
        <BulbIcon className="h-5 w-5 shrink-0" />
        <span>{isOpen ? "Hide tip" : tip.title}</span>
      </button>

      {isOpen && (
        <div
          id={tipId}
          className="mt-3 animate-fade-in-up rounded-xl border-l-4 p-4 text-sm leading-relaxed sm:text-base"
          style={{
            borderColor: COLOR.saffron,
            backgroundColor: COLOR.saffronTint,
            color: COLOR.ink,
            animationDuration: "0.3s",
          }}
        >
          <p>{tip.content}</p>
        </div>
      )}
    </div>
  );
};

/* Pulls a cook time out of a step's own words ("simmer for 10 minutes",
   "bake 20-25 mins", "rest 30 seconds") so a timer can offer itself without
   the recipe data needing a separate, hand-authored duration field. */
const DURATION_REGEX = /(\d+)(?:\s*(?:-|to)\s*(\d+))?\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)\b/i;

const parseDurationSeconds = (text: string): number | null => {
  const match = text.match(DURATION_REGEX);
  if (!match) return null;

  const first = parseInt(match[1], 10);
  const second = match[2] ? parseInt(match[2], 10) : null;
  const value = second ? Math.max(first, second) : first; // longer end of a range
  const unit = match[3].toLowerCase();

  if (unit.startsWith("hour") || unit.startsWith("hr")) return value * 3600;
  if (unit.startsWith("min")) return value * 60;
  return value;
};

// A couple of short sine pings — no audio file to ship, so this still works
// the moment the page loads.
const playChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const ping = (frequency: number, startAt: number) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + startAt);
      gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + startAt + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startAt + 0.5);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(ctx.currentTime + startAt);
      oscillator.stop(ctx.currentTime + startAt + 0.55);
    };
    ping(880, 0);
    ping(1108, 0.18);
  } catch {
    /* Web Audio unavailable — the visual "Time's up" state still shows. */
  }
};

const StepTimer: React.FC<{ seconds: number; stepKey: number; onComplete?: () => void }> = ({
  seconds,
  stepKey,
  onComplete,
}) => {
  const [remaining, setRemaining] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // A fresh step (or a step whose parsed duration changed) gets a fresh timer.
  useEffect(() => {
    setRemaining(seconds);
    setIsRunning(false);
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, stepKey]);

  // Pure countdown — just decrements. No side effects here, so Strict
// Mode's dev-time double-invoke of updater functions can't double-fire
// anything.
useEffect(() => {
  if (!isRunning) return;
  intervalRef.current = window.setInterval(() => {
    setRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
  }, 1000);
  return () => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
  };
}, [isRunning]);

// Fires exactly once per completed countdown, when `remaining` actually
// transitions to 0 while the timer was running.
useEffect(() => {
  if (remaining !== 0 || !isRunning) return;
  if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
  setIsRunning(false);
  playChime();
  onComplete?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [remaining]);

  const isDone = remaining === 0;
  const hasStarted = remaining !== seconds;
  const progressPct = seconds === 0 ? 0 : ((seconds - remaining) / seconds) * 100;
  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");

  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progressPct / 100);

  const reset = () => {
    setRemaining(seconds);
    setIsRunning(false);
  };

  const minuteLabel = Math.max(1, Math.round(seconds / 60));

  return (
    <div
      className="mt-6 inline-flex items-center gap-3.5 rounded-2xl border px-4 py-3"
      style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}
    >
      <div className="relative h-12 w-12 shrink-0">
        <svg viewBox="0 0 52 52" className="h-12 w-12 -rotate-90">
          <circle cx="26" cy="26" r={radius} fill="none" stroke={COLOR.border} strokeWidth="5" />
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke={COLOR.saffron}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tabular-nums"
          style={{ color: COLOR.ink }}
        >
          {minutes}:{secs}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {isDone ? (
          <span className="text-sm font-semibold" style={{ color: COLOR.saffronDark }}>
            Time&apos;s up!
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setIsRunning((running) => !running)}
            className="rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors"
            style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
          >
            {isRunning ? "Pause" : hasStarted ? "Resume" : `Start ${minuteLabel}-min timer`}
          </button>
        )}

        {(hasStarted || isDone) && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold underline underline-offset-2"
            style={{ color: COLOR.inkSoft }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------- Component ---------- */

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onFinishCooking }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );
  const [flashIndex, setFlashIndex] = useState<number | null>(null);

  // The ingredients card stays pinned on desktop only if it fits on screen.
  const ingredientsCardRef = useRef<HTMLElement>(null);
  const [canStick, setCanStick] = useState(true);

  useEffect(() => {
    const element = ingredientsCardRef.current;
    if (!element) return;

    const update = () =>
      setCanStick(element.offsetHeight <= window.innerHeight - 120);

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const [isCooking, setIsCooking] = useState(false);

  // keeps the screen awake while actively cooking; browsers vary in support,
// so this fails silently rather than blocking anything
const wakeLockRef = useRef<WakeLockSentinel | null>(null);

useEffect(() => {
  if (!isCooking) return;

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        wakeLockRef.current = await (navigator as any).wakeLock.request("screen");
      }
    } catch {
      // Not supported, or permission denied — cooking still works fine.
    }
  };

  requestWakeLock();

  // Re-acquire if the tab was backgrounded and comes back (e.g. a phone call)
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") requestWakeLock();
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    wakeLockRef.current?.release().catch(() => {});
    wakeLockRef.current = null;
  };
}, [isCooking]);




  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [isVoiceEnabled, setIsVoiceEnabled] = useState(() => {
  try {
    return localStorage.getItem("recipe-voice-enabled") === "true";
  } catch {
    return false;
  }
});

const toggleVoice = () => {
  setIsVoiceEnabled((prev) => {
    const next = !prev;
    try {
      localStorage.setItem("recipe-voice-enabled", String(next));
    } catch {
      // ignore
    }
    if (!next) window.speechSynthesis?.cancel();
    return next;
  });
};

// Speak the current step whenever it changes, if enabled
useEffect(() => {
  if (!isCooking || !isVoiceEnabled) return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(currentStep.instruction);
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);

  return () => window.speechSynthesis.cancel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentStepIndex, isCooking, isVoiceEnabled]);

// Assumes dishName is stable/unique enough per recipe; swap for a real
// recipe.id if one exists in your data model.
const progressKey = `recipe-progress:${recipe.dishName}`;

// Restore on mount
useEffect(() => {
  try {
    const saved = localStorage.getItem(progressKey);
    if (!saved) return;
    const parsed = JSON.parse(saved);

    if (parsed.isCooking && typeof parsed.currentStepIndex === "number") {
      setCurrentStepIndex(Math.min(parsed.currentStepIndex, recipe.method.length - 1));
      setIsCooking(true);
    }
    if (
      Array.isArray(parsed.checkedIngredients) &&
      parsed.checkedIngredients.length === recipe.ingredients.length
    ) {
      setCheckedIngredients(parsed.checkedIngredients);
    }
  } catch {
    // Corrupted or inaccessible — just start fresh.
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// Persist on every relevant change
useEffect(() => {
  try {
    if (isCooking) {
      localStorage.setItem(
        progressKey,
        JSON.stringify({ isCooking, currentStepIndex, checkedIngredients })
      );
    } else {
      localStorage.removeItem(progressKey);
    }
  } catch {
    // Storage unavailable — progress just won't persist this session.
  }
}, [isCooking, currentStepIndex, checkedIngredients, progressKey]);

  const [stepDirection, setStepDirection] = useState<"next" | "prev" | "none">("none");
  // When the current step has a running/relevant timer, "Next" asks for a
  // confirmation tap first instead of advancing immediately.
  const [showNextStepConfirm, setShowNextStepConfirm] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const methodHeadingRef = useRef<HTMLHeadingElement>(null);

  // Tracks when the header photo has actually finished loading, so it can
  // fade in smoothly instead of popping in abruptly.
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Bumped on every tap so the bounce can replay even on repeated clicks.
  const [imageBounceKey, setImageBounceKey] = useState(0);

  const [modalType, setModalType] = useState<"instamart" | "swiggy" | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<
    "addresses" | "restaurants" | "ingredients" | "cart" | null
  >(null);

  // Instamart state
  const [swiggyAddresses, setSwiggyAddresses] = useState<SwiggyAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [ingredientProducts, setIngredientProducts] = useState<Record<string, InstamartProduct[]>>({});
  const [selectedProducts, setSelectedProducts] = useState<Record<string, InstamartVariation>>({});
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [instamartCartAdded, setInstamartCartAdded] = useState(false);
  const [swiggyError, setSwiggyError] = useState<string | null>(null);
  const [searchedIngredientsKey, setSearchedIngredientsKey] = useState<string | null>(null);
  const [lastSearchedAddressId, setLastSearchedAddressId] = useState<string | null>(null);
  const [isChoosingAddress, setIsChoosingAddress] = useState(false);
  const [searchIngredientNames, setSearchIngredientNames] = useState<string[]>([]);
  const [pendingIngredientNames, setPendingIngredientNames] = useState<string[]>([]);

  // Food state
  const [restaurants, setRestaurants] = useState<SwiggyRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SwiggyRestaurant | null>(null);
  const [foodCartAdded, setFoodCartAdded] = useState(false);

  // Sends the person to sign in with Swiggy; if it can't, say so.
  const redirectToLogin = () => {
    if (!startSwiggyLogin()) {
      setSwiggyError("We couldn't sign you in to Swiggy. Please try again in a minute.");
    }
  };

  /* ----- Recipe handlers ----- */

  const handleIngredientToggle = (index: number) => {
    const next = [...checkedIngredients];
    const isNowChecked = !next[index];
    next[index] = isNowChecked;
    setCheckedIngredients(next);

    if (isNowChecked) {
      setFlashIndex(index);
      window.setTimeout(() => {
        setFlashIndex((current) => (current === index ? null : current));
      }, 500);
    }
  };

  const handleStartCooking = () => {
    setIsCooking(true);
    setStepDirection("none");
    setCurrentStepIndex(0);
  };

  // Lets someone jump straight to the method from the header without
  // committing to step-by-step mode yet.
  const handleJumpToMethod = () => {
    methodHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // A fresh step always starts with no pending confirmation.
  useEffect(() => {
    setShowNextStepConfirm(false);
  }, [currentStepIndex]);

  const handleNextStep = () => {
  if (currentStepIndex >= recipe.method.length - 1) return;

  const currentHasTimer =
    parseDurationSeconds(recipe.method[currentStepIndex].instruction) !== null;

  // First tap on a timed step just asks for confirmation; a second tap
  // (or a tap on a step with no timer at all) actually advances.
  if (currentHasTimer && !showNextStepConfirm) {
    setShowNextStepConfirm(true);
    if (isVoiceEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "If you're done with this step, press Yes, done."
      );
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
    return;
  }

  setShowNextStepConfirm(false);
  setStepDirection("next");
  setCurrentStepIndex((prev) => prev + 1);
};

  const handleCancelNextStep = () => setShowNextStepConfirm(false);

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setStepDirection("prev");
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Swipe on the step card: left = next step, right = previous step.
  // Needs a clearly horizontal drag, so normal vertical scrolling is untouched.
  const SWIPE_MIN_DISTANCE = 35;

  const handleTouchStart = (event: React.TouchEvent) => {
    // Ignore pinch / multi-finger gestures
    if (event.touches.length !== 1) {
      touchStart.current = null;
      return;
    }
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.2) return; // mostly vertical: not a swipe

    if (dx < 0) handleNextStep();
    else handlePrevStep();
  };

  /* ----- Instamart handlers ----- */

  const fetchSwiggyAddresses = async () => {
    setIsModalLoading(true);
    setLoadingStage("addresses");
    setSwiggyAddresses([]);
    setSelectedAddressId(null);
    setIngredientProducts({});
    setSelectedProducts({});
    setProductQuantities({});
    setInstamartCartAdded(false);

    try {
      const addresses = await getSwiggyAddresses();
      setSwiggyAddresses(addresses);
      if (addresses.length === 1) setSelectedAddressId(addresses[0].id);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not connect to Swiggy.";
      if (message === "SWIGGY_NOT_CONNECTED") {
        redirectToLogin();
        return;
      }
      setSwiggyError(message);
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  const handleBuyFromInstamart = () => {
    setModalType("instamart");
    setSwiggyError(null);

    if (swiggyAddresses.length === 0) {
      fetchSwiggyAddresses();
      return;
    }

    // If the ticked ingredients changed since the last search, silently re-search.
    const hasExistingProducts = Object.keys(ingredientProducts).length > 0;
    const currentKey = JSON.stringify(checkedIngredients);

    if (hasExistingProducts && currentKey !== searchedIngredientsKey) {
      setSelectedProducts({});
      setProductQuantities({});
      setInstamartCartAdded(false);
      handleSearchIngredients();
    }
  };

  // Minimize keeps all state; Close resets the whole flow.
  const handleMinimizeModal = () => setModalType(null);

  const handleCloseModal = () => {
    setModalType(null);
    setSwiggyError(null);
    setSwiggyAddresses([]);
    setSelectedAddressId(null);
    setIngredientProducts({});
    setSelectedProducts({});
    setProductQuantities({});
    setInstamartCartAdded(false);
    setSearchedIngredientsKey(null);
    setLastSearchedAddressId(null);
    setIsChoosingAddress(false);
    setRestaurants([]);
    setSelectedRestaurant(null);
    setFoodCartAdded(false);
    setLoadingStage(null);
    setSearchIngredientNames([]);
    setPendingIngredientNames([]);
  };

  const handleSelectAddress = (addressId: string) => setSelectedAddressId(addressId);
  const handleGoToAddress = () => setIsChoosingAddress(true);

  const handleConfirmAddress = () => {
    const hasExistingResults =
      modalType === "swiggy"
        ? restaurants.length > 0
        : Object.keys(ingredientProducts).length > 0;

    // Same address as last search: just go back to the results.
    if (selectedAddressId === lastSearchedAddressId && hasExistingResults) {
      setIsChoosingAddress(false);
      return;
    }

    if (modalType === "swiggy") {
      handleSearchRestaurants();
    } else {
      setInstamartCartAdded(false);
      handleSearchIngredients();
    }
  };

  const handleSearchIngredients = async () => {
    const missingIngredients = recipe.ingredients.filter(
      (_, index) => !checkedIngredients[index]
    );

    if (missingIngredients.length === 0) {
      setIngredientProducts({});
      setSwiggyError("You already have all the ingredients for this recipe.");
      return;
    }

    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");
      return;
    }

    setSwiggyError(null);
    setIngredientProducts({});
    setSelectedProducts({});
    setProductQuantities({});
    setInstamartCartAdded(false);
    setIsChoosingAddress(false);

    const names = missingIngredients.map((ing) => ing.commonName);
    setSearchIngredientNames(names);
    setPendingIngredientNames(names);

    // Several searches at a time; busy errors are retried in swiggyService.
    const SEARCH_CONCURRENCY = 5;
    let nextIndex = 0;
    let redirectedToLogin = false;

    const worker = async () => {
      while (nextIndex < missingIngredients.length) {
        const ingredient = missingIngredients[nextIndex++];
        const query = ingredient.englishName || ingredient.commonName;

        try {
          const products = await searchInstamartProducts(selectedAddressId, query);
          setIngredientProducts((prev) => ({ ...prev, [ingredient.commonName]: products }));
        } catch (error) {
          // Login expired: sign in again instead of showing "No match found"
          if (error instanceof Error && error.message === "SWIGGY_NOT_CONNECTED") {
            if (!redirectedToLogin) {
              redirectedToLogin = true;
              redirectToLogin();
            }
            return;
          }
          setIngredientProducts((prev) => ({ ...prev, [ingredient.commonName]: [] }));
        } finally {
          setPendingIngredientNames((prev) =>
            prev.filter((name) => name !== ingredient.commonName)
          );
        }
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(SEARCH_CONCURRENCY, missingIngredients.length) }, worker)
    );

    setSearchedIngredientsKey(JSON.stringify(checkedIngredients));
    setLastSearchedAddressId(selectedAddressId);
  };

  const handleSelectProduct = (ingredientName: string, variation: InstamartVariation) => {
    if (!variation.isInStockAndAvailable) return;

    const alreadySelected = selectedProducts[ingredientName]?.spinId === variation.spinId;

    if (alreadySelected) {
      setSelectedProducts((current) => {
        const updated = { ...current };
        delete updated[ingredientName];
        return updated;
      });
      setProductQuantities((current) => {
        const updated = { ...current };
        delete updated[ingredientName];
        return updated;
      });
      return;
    }

    setSelectedProducts((current) => ({ ...current, [ingredientName]: variation }));
    // Switching pack size keeps the quantity; a first pick starts at 1
    setProductQuantities((current) => ({
      ...current,
      [ingredientName]: current[ingredientName] ?? 1,
    }));
  };

  const handleChangeQuantity = (ingredientName: string, delta: 1 | -1) => {
    setProductQuantities((current) => {
      const next = Math.min(
        MAX_CART_QUANTITY,
        Math.max(1, (current[ingredientName] ?? 1) + delta)
      );
      return { ...current, [ingredientName]: next };
    });
  };

  const handleAddIngredientsToCart = async () => {
    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");
      return;
    }

    const selectedEntries = Object.entries(selectedProducts);

    if (selectedEntries.length === 0) {
      setSwiggyError("Please select at least one product.");
      return;
    }

    setIsModalLoading(true);
    setLoadingStage("cart");
    setSwiggyError(null);

    try {
      const items = selectedEntries.map(([ingredientName, variation]) => ({
        spinId: variation.spinId,
        skuId: variation.skuId,
        quantity: productQuantities[ingredientName] ?? 1,
      }));

      await addToInstamartCart(selectedAddressId, items);
      setInstamartCartAdded(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not update your Instamart cart.";

      // The Swiggy login lasts about 5 days: sign in again instead of showing an error
      if (message === "SWIGGY_NOT_CONNECTED") {
        redirectToLogin();
        return;
      }
      setSwiggyError(message);
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  /* ----- Food ordering ----- */

  const handleSearchRestaurants = async () => {
    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");
      return;
    }

    setIsModalLoading(true);
    setLoadingStage("restaurants");
    setSwiggyError(null);
    setRestaurants([]);
    setSelectedRestaurant(null);
    setFoodCartAdded(false);

    try {
      const results = await searchRestaurants(selectedAddressId, recipe.dishName);
      setRestaurants(results);
      setLastSearchedAddressId(selectedAddressId);
      setIsChoosingAddress(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not search restaurants.";
      if (message === "SWIGGY_NOT_CONNECTED") {
        redirectToLogin();
        return;
      }
      setSwiggyError(message);
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  const handleOrderFromSwiggy = () => {
    setModalType("swiggy");
    setSwiggyError(null);

    if (swiggyAddresses.length === 0) {
      setIsChoosingAddress(true);
      fetchSwiggyAddresses();
      return;
    }

    // Results already loaded: resume as it was. Otherwise show the picker.
    setIsChoosingAddress(restaurants.length === 0);
  };

  const handleSelectRestaurant = (restaurant: SwiggyRestaurant) => {
    setSelectedRestaurant(restaurant);
    setFoodCartAdded(false);
    setSwiggyError(null);
  };

  const handleAddDishToSwiggyCart = async () => {
    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");
      return;
    }
    if (!selectedRestaurant) {
      setSwiggyError("Please select a restaurant.");
      return;
    }

    setIsModalLoading(true);
    setLoadingStage("cart");
    setSwiggyError(null);

    try {
      await addDishToFoodCart(
        selectedAddressId,
        selectedRestaurant.id,
        selectedRestaurant.name,
        recipe.dishName
      );
      setFoodCartAdded(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not add this dish to your Swiggy cart.";
      if (message === "SWIGGY_NOT_CONNECTED") {
        redirectToLogin();
        return;
      }
      setSwiggyError(message);
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  /* ----- Render ----- */

  // "Paneer" -> "200 g", so the modal can show what the recipe needs
  const ingredientAmounts: Record<string, string> = Object.fromEntries(
    recipe.ingredients.map((ing) => [ing.commonName, ing.amount])
  );

  const checkedCount = checkedIngredients.filter(Boolean).length;
  const totalIngredients = recipe.ingredients.length;
  const totalSteps = recipe.method.length;
  const currentStep = recipe.method[currentStepIndex];
  const stepDurationSeconds = parseDurationSeconds(currentStep.instruction);
  const isLastStep = currentStepIndex >= totalSteps - 1;

  const stepAnimationClass =
    stepDirection === "next"
      ? "step-slide-from-right"
      : stepDirection === "prev"
      ? "step-slide-from-left"
      : "animate-fade-in-up";

  return (
    <div
      className="w-full animate-fade-in-up pb-24 sm:pb-8"
      style={{ color: COLOR.ink }}
    >
      <style>{STEP_ANIMATION_CSS}</style>

      {/* Header: a generous photo, the dish's own voice in the description,
          quick facts, and the two ways forward — cook it, or have it
          delivered — presented as clearly unequal choices. */}
      <header
        className={`${card} flex flex-col gap-6 p-5 sm:flex-row sm:gap-8 sm:p-8`}
        style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}
      >
        {recipe.image && (
          <div
            className="relative aspect-square w-full shrink-0 sm:w-56 md:w-64"
            style={{ perspective: "800px" }}
          >
            {/* Quiet placeholder while the photo loads, so nothing pops in on a slow connection */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                isImageLoaded ? "opacity-0" : "animate-pulse opacity-100"
              }`}
              style={{ backgroundColor: COLOR.saffronTint }}
            />
            <img
              key={imageBounceKey}
              src={recipe.image}
              alt={recipe.dishName}
              width={600}
              height={600}
              loading="eager"
              decoding="sync"
              {...{ fetchpriority: "high" }}
              onLoad={() => setIsImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              onClick={() => setImageBounceKey((key) => key + 1)}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className={`absolute inset-0 h-full w-full cursor-pointer rounded-2xl border object-cover transition-opacity duration-300 ease-out select-none ${
                imageBounceKey > 0 ? "animate-image-bounce-3d" : ""
              } ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
              style={{
                transformStyle: "preserve-3d",
                pointerEvents: "auto",
                userSelect: "none",
                borderColor: COLOR.border,
              }}
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h1
            className="font-serif text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl"
            style={{ color: COLOR.ink }}
          >
            {recipe.dishName}
          </h1>

          <p
            className="mt-3 max-w-2xl font-serif text-base italic leading-relaxed sm:mt-4 sm:text-lg"
            style={{ color: COLOR.inkSoft }}
          >
            {recipe.description}
          </p>

          <ul className="mt-5 flex flex-wrap items-center gap-2 text-sm sm:mt-6">
            <li
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium"
              style={{ backgroundColor: COLOR.mustard, color: COLOR.ink }}
            >
              <ClockIcon className="h-4 w-4" style={{ color: COLOR.saffron }} />
              {recipe.prepTime}
            </li>
            <li>
              <NutritionInfo nutrition={recipe.nutrition} />
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleJumpToMethod}
              className={primaryButton}
              style={{
                backgroundColor: COLOR.saffron,
                color: COLOR.surface,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffronDark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffron)}
            >
              <ArrowDownIcon className="h-5 w-5" />
              Jump to the method
            </button>

            <button
              type="button"
              onClick={handleOrderFromSwiggy}
              className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2"
              style={{ borderColor: COLOR.border, color: COLOR.inkSoft }}
            >
              <UtensilsIcon className="h-4 w-4" />
              Or order it from Swiggy instead
            </button>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-5 lg:items-start lg:gap-10">
        {/* Ingredients */}
        <aside className={`lg:col-span-2 lg:self-start ${canStick ? "lg:sticky lg:top-24" : ""}`}>
          <section
            ref={ingredientsCardRef}
            aria-labelledby="ingredients-heading"
            className={card}
            style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}
          >
            <div
              className="sticky top-0 z-10 rounded-t-3xl border-b px-5 pb-4 pt-5 backdrop-blur sm:top-16 sm:px-6 sm:pt-6"
              style={{ borderColor: COLOR.border, backgroundColor: `${COLOR.surface}f2` }}
            >
              <SectionTitle
                flush
                id="ingredients-heading"
                title="Ingredients"
                icon={<IngredientsIcon className="h-6 w-6" />}
                aside={
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: COLOR.saffronTint, color: COLOR.saffronDark }}
                    aria-label={`${checkedCount} of ${totalIngredients} ingredients ticked`}
                  >
                    {checkedCount}/{totalIngredients}
                  </span>
                }
              />
            </div>

            <ul className="px-2 py-2 sm:px-3">
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>
                  <label
                    className="group flex cursor-pointer items-start gap-3.5 rounded-xl px-3 py-2.5 transition-colors duration-300"
                    style={{
                      backgroundColor: flashIndex === index ? COLOR.saffronTint : "transparent",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checkedIngredients[index]}
                      onChange={() => handleIngredientToggle(index)}
                      className="peer sr-only"
                    />

                    <span
                      className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2"
                      style={{
                        borderColor: checkedIngredients[index] ? COLOR.saffron : COLOR.border,
                        backgroundColor: checkedIngredients[index] ? COLOR.saffron : COLOR.surface,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-3.5 w-3.5 transition-all duration-200 ${
                          checkedIngredients[index] ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                      >
                        <path d="M4 10l4 4 8-8" />
                      </svg>
                    </span>

                    <span
                      className="min-w-0 flex-1 transition-colors duration-300"
                      style={{ color: checkedIngredients[index] ? COLOR.inkSoft : COLOR.ink }}
                    >
                      <span
                        className={`block leading-snug ${
                          checkedIngredients[index] ? "line-through" : ""
                        }`}
                      >
                        <span className="font-semibold">{ing.amount}</span> {ing.commonName}
                      </span>
                      <span className="block text-sm" style={{ color: COLOR.inkSoft }}>
                        {ing.englishName}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="border-t p-5 sm:p-6" style={{ borderColor: COLOR.border }}>
              <button
                type="button"
                onClick={handleBuyFromInstamart}
                className={`${secondaryButton} w-full`}
                style={{ borderColor: COLOR.border, color: COLOR.ink, backgroundColor: COLOR.surface }}
              >
                <CartIcon className="h-5 w-5" style={{ color: COLOR.saffron }} />
                Don&apos;t have these? Buy from Instamart
              </button>
              <p className="mt-2.5 text-center text-xs" style={{ color: COLOR.inkSoft }}>
                We&apos;ll only search for what you haven&apos;t ticked.
              </p>
            </div>
          </section>
        </aside>

        {/* Equipment, method, notes share one consistent rhythm via divide-y,
            instead of each section inventing its own border/padding combo. */}
        <div className="flex flex-col divide-y lg:col-span-3" style={{ borderColor: COLOR.border }}>
          {/* Equipment */}
          <section aria-labelledby="equipment-heading" className="pb-10 lg:pb-12">
            <SectionTitle id="equipment-heading" title="Equipment" icon={<PotIcon className="h-6 w-6" />} />

            <ul className="grid items-start gap-3 sm:grid-cols-2">
              {recipe.equipment.map((tool, index) => {
                const image = getEquipmentImage(tool.item);
                const special = tool.isSpecialized;

                return (
                  <li
                    key={index}
                    className={`rounded-2xl border p-3.5 sm:p-4 ${
                      special && tool.alternative ? "sm:col-span-2" : ""
                    }`}
                    style={{
                      borderColor: special ? COLOR.clay : COLOR.border,
                      backgroundColor: special ? COLOR.clayTint : COLOR.surface,
                    }}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: special ? "#FFFFFF" : COLOR.saffronTint }}
                      >
                        {image ? (
                          <img src={image} alt="" className="max-h-9 max-w-9 object-contain" draggable={false} />
                        ) : (
                          <PotIcon
                            className="h-6 w-6"
                            style={{ color: special ? COLOR.clay : COLOR.saffron }}
                          />
                        )}
                      </span>

                      <div className="min-w-0">
                        <p className="font-medium leading-snug" style={{ color: COLOR.ink }}>
                          {tool.item}
                        </p>
                        {special && (
                          <span
                            className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
                            style={{ backgroundColor: "#FFFFFF", color: COLOR.clay }}
                          >
                            Needs a workaround
                          </span>
                        )}
                      </div>
                    </div>

                    {special && tool.alternative && (
                      <p
                        className="mt-3 rounded-xl p-3 text-sm leading-relaxed"
                        style={{ backgroundColor: "#FFFFFF", color: COLOR.inkSoft }}
                      >
                        <span className="font-semibold" style={{ color: COLOR.ink }}>
                          Instead, try:
                        </span>{" "}
                        {tool.alternative}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Method */}
          <section aria-labelledby="method-heading" className="py-10 lg:py-12">
            <SectionTitle
              id="method-heading"
              title="Method"
              icon={<MethodIcon className="h-6 w-6" />}
              aside={
                isCooking ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm" style={{ color: COLOR.inkSoft }}>
                      Step {currentStepIndex + 1} of {totalSteps}
                    </span>
                    <button
                      type="button"
                      onClick={toggleVoice}
                      aria-pressed={isVoiceEnabled}
                      aria-label={isVoiceEnabled ? "Turn off reading steps aloud" : "Read steps aloud"}
                      className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
                      style={{
                        borderColor: isVoiceEnabled ? COLOR.saffron : COLOR.border,
                        backgroundColor: isVoiceEnabled ? COLOR.saffronTint : COLOR.surface,
                        color: isVoiceEnabled ? COLOR.saffronDark : COLOR.inkSoft,
                      }}
                    >
                      {isVoiceEnabled ? (
                        <SpeakerIcon className="h-4 w-4" />
                      ) : (
                        <SpeakerOffIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ) : undefined
              }
            />
            <h2 ref={methodHeadingRef} className="sr-only">
              Method
            </h2>

            {!isCooking ? (
              <div
                className="flex flex-col gap-5 rounded-3xl border border-dashed p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
                style={{ borderColor: COLOR.saffron, backgroundColor: COLOR.saffronTint }}
              >
                <div>
                  <p className="font-serif text-xl font-black sm:text-2xl" style={{ color: COLOR.ink }}>
                    Ready when you are
                  </p>
                  <p className="mt-1 text-sm sm:text-base" style={{ color: COLOR.inkSoft }}>
                    We&apos;ll walk you through {totalSteps} steps, one at a time.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStartCooking}
                  className={`${primaryButton} w-full shrink-0 sm:w-auto`}
                  style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffronDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffron)}
                >
                  <PlayIcon className="h-5 w-5" />
                  Start cooking
                </button>
              </div>
            ) : (
              <div>
                <div
                  aria-live="polite"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={() => {
                    touchStart.current = null;
                  }}
                  className={`${card} touch-pan-y overflow-hidden p-5 sm:p-8`}
                  style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}
                >
                  {/* Plain, non-interactive progress indicator — no dragging,
                      just a read-out of how far through the method we are. */}
                  <div
                    role="progressbar"
                    aria-valuenow={currentStepIndex + 1}
                    aria-valuemin={1}
                    aria-valuemax={totalSteps}
                    aria-label={`Step ${currentStepIndex + 1} of ${totalSteps}`}
                    className="h-1.5 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: COLOR.border }}
                  >
                    <div
                      className="h-full rounded-full transition-[width] duration-300 ease-out"
                      style={{
                        width:
                          totalSteps > 1
                            ? `${(currentStepIndex / (totalSteps - 1)) * 100}%`
                            : "100%",
                        backgroundColor: COLOR.saffron,
                      }}
                    />
                  </div>

                  <div key={currentStepIndex} className={stepAnimationClass}>
                    <span
                      className="mt-6 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                      style={{ backgroundColor: COLOR.saffronTint, color: COLOR.saffronDark }}
                    >
                      {currentStepIndex + 1}
                    </span>

                    <p
                      className="mt-3 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed"
                      style={{ color: COLOR.ink }}
                    >
                      {currentStep.instruction}
                    </p>

                    {currentStep.tip?.title?.trim() && currentStep.tip?.content?.trim() && (
                      <TipCallout tip={currentStep.tip!} />
                    )}

                    {stepDurationSeconds !== null && (
                      <StepTimer
                        seconds={stepDurationSeconds}
                        stepKey={currentStepIndex}
                        onComplete={() => {
                          if (isVoiceEnabled && "speechSynthesis" in window) {
                            window.speechSynthesis.cancel();
                            // Let the chime's attention-grabbing ping land first, then speak —
                            // avoids the beep and voice overlapping into a garbled mess.
                            window.setTimeout(() => {
                              const message = isLastStep
                                ? "Time's up."
                                : "Time's up. If you're done with this step, press Yes, done.";
                              const utterance = new SpeechSynthesisUtterance(message);
                              utterance.rate = 0.95;
                              window.speechSynthesis.speak(utterance);
                            }, 450);
                          }
                          if (!isLastStep) setShowNextStepConfirm(true);
                        }}
                      />
                    )}
                  </div>
                </div>

                <p className="mt-3 text-center text-xs sm:hidden" style={{ color: COLOR.inkSoft }}>
                  Swipe left or right to change steps
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className={`${secondaryButton} ${
                      showNextStepConfirm ? "flex-none px-3.5" : "flex-1 sm:flex-none"
                    }`}
                    style={{ borderColor: COLOR.border, color: COLOR.ink, backgroundColor: COLOR.surface }}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className={showNextStepConfirm ? "sr-only sm:not-sr-only" : undefined}>
                      Previous
                    </span>
                  </button>

                  {!isLastStep ? (
                    showNextStepConfirm ? (
                      <div className="flex flex-1 items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCancelNextStep}
                          className={`${secondaryButton} flex-1 sm:flex-none`}
                          style={{ borderColor: COLOR.border, color: COLOR.ink, backgroundColor: COLOR.surface }}
                        >
                          Not yet
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className={`${primaryButton} flex-1 sm:flex-none sm:px-8`}
                          style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffronDark)}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffron)}
                        >
                          Yes, done
                          <ChevronRightIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className={`${primaryButton} flex-1 sm:flex-none sm:px-8`}
                        style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffronDark)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffron)}
                      >
                        Next
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          localStorage.removeItem(progressKey);
                        } catch {
                          // ignore
                        }
                        onFinishCooking();
                      }}
                      className={`${primaryButton} flex-1 sm:flex-none sm:px-8`}
                      style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffronDark)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffron)}
                    >
                      I&apos;m done cooking
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Notes */}
          {recipe.notes && recipe.notes.length > 0 && (
            <section aria-labelledby="notes-heading" className="py-10 lg:py-12">
              <SectionTitle id="notes-heading" title="Notes & tips" icon={<NotesIcon className="h-6 w-6" />} />

              <ul
                className="space-y-3 rounded-2xl border p-5 sm:p-6"
                style={{ borderColor: COLOR.border, backgroundColor: COLOR.mustard }}
              >
                {recipe.notes.map((note, index) => (
                  <li key={index} className="flex gap-3 leading-relaxed" style={{ color: COLOR.ink }}>
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: COLOR.saffron }}
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Swiggy / Instamart Modal */}
      <SwiggyActionModal
        type={modalType}
        isLoading={isModalLoading}
        loadingStage={loadingStage}
        restaurants={restaurants}
        addresses={swiggyAddresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={handleSelectAddress}
        onContinueAddress={handleConfirmAddress}
        onGoToAddress={handleGoToAddress}
        onConfirmAddress={handleConfirmAddress}
        isChoosingAddress={isChoosingAddress}
        ingredientProducts={ingredientProducts}
        searchIngredientNames={searchIngredientNames}
        pendingIngredientNames={pendingIngredientNames}
        selectedProducts={selectedProducts}
        ingredientAmounts={ingredientAmounts}
        quantities={productQuantities}
        onChangeQuantity={handleChangeQuantity}
        onSelectProduct={handleSelectProduct}
        onAddIngredients={handleAddIngredientsToCart}
        cartAdded={instamartCartAdded}
        selectedRestaurant={selectedRestaurant}
        onSelectRestaurant={handleSelectRestaurant}
        onAddDishToCart={handleAddDishToSwiggyCart}
        foodCartAdded={foodCartAdded}
        error={swiggyError}
        onMinimize={handleMinimizeModal}
        onClose={handleCloseModal}
      />

      {/* Floating so it's reachable from anywhere on the page, not just after
          scrolling past every section. */}
      <CookingCompanionChat
        recipe={recipe}
        currentStepNumber={isCooking ? currentStepIndex + 1 : null}
        currentStepInstruction={isCooking ? currentStep.instruction : null}
        totalSteps={totalSteps}
      />
    </div>
  );
};

export default RecipeDisplay;