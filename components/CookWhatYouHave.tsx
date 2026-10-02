import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import KitchenEquipmentSelector, { EQUIPMENT_NAMES } from "./KitchenEquipmentSelector";
import {
  findRecipesFromIngredients,
  suggestIngredients,
} from "../services/cookWhatYouHaveService";
import type { RecipeMatch } from "../services/cookWhatYouHaveService";

interface CookWhatYouHaveProps {
  onSelectDish: (dish: string) => void;
}

const QUICK_INGREDIENTS = [
  "Onion", "Tomato", "Potato", "Paneer", "Rice", "Atta", "Dal", "Besan",
  "Eggs", "Milk", "Curd", "Bread", "Capsicum", "Peas", "Spinach",
  "Cauliflower", "Green chilli", "Ginger", "Garlic",
];

const STEPS = ["Equipment", "Ingredients", "Dishes"];

const RESULT_SLOTS = 3;

const FRIENDLY_ERROR =
  "We couldn't find a recipe for that combination. Try adding another ingredient or piece of equipment.";

const STORAGE_KEY = "rasoi:cook-what-you-have:v3";

interface SavedState {
  equipment: string[];
  ingredients: string[];
  results: RecipeMatch[];
  step: 1 | 2 | 3;
  resultSource?: "predefined" | "ai" | "mixed";
  assumeStaples?: boolean;
}

const KITCHEN_KEY = "rasoi:kitchen:v1";

const loadKitchen = (): string[] | null => {
  try {
    const raw = localStorage.getItem(KITCHEN_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    // Keep only equipment the selector still offers.
    const valid = parsed.filter(
      (name): name is string =>
        typeof name === "string" && EQUIPMENT_NAMES.includes(name)
    );

    return valid.length ? valid : null;
  } catch {
    return null;
  }
};

const saveKitchen = (equipment: string[]) => {
  try {
    if (equipment.length) {
      localStorage.setItem(KITCHEN_KEY, JSON.stringify(equipment));
    }
  } catch {
    /* Ignore storage failures (private mode, full storage). */
  }
};

const forgetKitchen = () => {
  try {
    localStorage.removeItem(KITCHEN_KEY);
  } catch {
    /* Ignore. */
  }
};

const loadSaved = (): SavedState | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (
      !Array.isArray(parsed.equipment) ||
      !Array.isArray(parsed.ingredients) ||
      !Array.isArray(parsed.results)
    ) {
      return null;
    }

    return parsed as SavedState;
  } catch {
    return null;
  }
};

const LOADING_MESSAGES = [
  "Checking our recipe collection…",
  "Matching your ingredients…",
  "Checking what your kitchen can make…",
  "Almost ready…",
];

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-orange-200 px-6 py-3 font-semibold text-stone-900 shadow-md transition-all duration-200 hover:bg-orange-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";

const footerButton = primaryButton.replace(
  "px-6 py-3",
  "px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base"
);

const ghostButton =
  "inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70";

const footerBar =
  "sticky bottom-0 z-40 flex items-center justify-between gap-3 rounded-b-3xl border-t border-stone-700 bg-stone-900/95 px-5 py-4 backdrop-blur-md sm:px-12";

const Stepper: React.FC<{ current: number }> = ({ current }) => (
  <ol
    className="mx-auto flex w-full max-w-md items-center"
    aria-label="Progress"
  >
    {STEPS.map((label, index) => {
      const number = index + 1;
      const done = number < current;
      const active = number === current;

      return (
        <React.Fragment key={label}>
          <li
            className="flex flex-col items-center gap-1.5"
            aria-current={active ? "step" : undefined}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                done
                  ? "bg-orange-200 text-white"
                  : active
                  ? "bg-orange-200 text-white ring-4 ring-orange-400/25"
                  : "border border-stone-700 bg-stone-900 text-stone-500"
              }`}
            >
              {done ? "✓" : number}
            </span>
            <span
              className={`text-xs font-medium sm:text-sm ${
                active
                  ? "text-orange-100"
                  : done
                  ? "text-stone-300"
                  : "text-stone-500"
              }`}
            >
              {label}
            </span>
          </li>

          {index < STEPS.length - 1 && (
            <div
              className={`mx-2 mb-6 h-0.5 flex-1 rounded-full transition-colors duration-300 sm:mx-3 ${
                done ? "bg-orange-200" : "bg-stone-700"
              }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </ol>
);

const Chip: React.FC<{
  label: string;
  onRemove: () => void;
  hidden?: boolean; // true while its flying copy is still on the way
}> = ({ label, onRemove, hidden }) => (
  <button
    type="button"
    onClick={onRemove}
    aria-label={`Remove ${label}`}
    data-ingredient-chip={label.toLowerCase()}
    data-glide={label.toLowerCase()}
    className={`inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/10 py-1.5 pl-3.5 pr-2.5 text-sm text-orange-100 transition-colors hover:bg-orange-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 ${
      hidden ? "invisible" : ""
    }`}
  >
    {label}
    <span
      className="text-base leading-none text-orange-300"
      aria-hidden="true"
    >
      ×
    </span>
  </button>
);

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
  // Colors of the element the chip took off from, so lift-off is seamless.
  colors?: { bg: string; border: string; text: string };
}

interface Flight {
  id: number;
  label: string;
  from: Box;
  delay: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const sourceBox = (el: Element): Box => {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    colors: {
      bg: style.backgroundColor,
      border: style.borderTopColor,
      text: style.color,
    },
  };
};

const BRIGHT = {
  bg: "rgb(254, 215, 170)",
  border: "rgb(253, 186, 116)",
  text: "rgb(28, 25, 23)",
};

/** Everything that happens when a chip arrives. */
const playLanding = (target: HTMLElement) => {
  // 1. Springy overshoot on the chip itself.
  target.animate?.(
    [
      { transform: "scale(1)", easing: "cubic-bezier(0.2, 0.8, 0.3, 1)" },
      { transform: "scale(1.18)", offset: 0.38, easing: "ease-in-out" },
      { transform: "scale(0.96)", offset: 0.68, easing: "ease-out" },
      { transform: "scale(1)" },
    ],
    { duration: 460, easing: "linear" }
  );

  // 2. The counter pops.
  document
    .querySelector<HTMLElement>("[data-ingredient-count]")
    ?.animate?.(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.4)", offset: 0.4 },
        { transform: "scale(1)" },
      ],
      { duration: 380, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
    );

  // 4. A tiny tap on phones that support it.
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(8);
  }
};

/** A copy of the chip that flies from where you tapped to where the new chip lands. */
const FlyingChip: React.FC<{
  flight: Flight;
  onDone: (flight: Flight) => void;
}> = ({ flight, onDone }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const key = flight.label.toLowerCase();
    const findTarget = (): HTMLElement | null =>
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-ingredient-chip]")
      ).find((node) => node.dataset.ingredientChip === key) ?? null;

    let target = findTarget();

    // No landing spot (or no animation support): skip the flight.
    if (!target || typeof el.animate !== "function") {
      onDone(flight);
      return;
    }
    const initialTarget: HTMLElement = target;

    const own = el.getBoundingClientRect();
    const startX = flight.from.left + flight.from.width / 2 - own.width / 2;
    const startY = flight.from.top + flight.from.height / 2 - own.height / 2;

    // The landing point is re-read every frame, so scrolling or a layout
    // shift mid-flight can't make the chip miss.
    let lastEnd = { x: startX, y: startY };
    const readEnd = () => {
      if (target && !target.isConnected) target = findTarget();
      if (target) {
        const rect = target.getBoundingClientRect();
        lastEnd = {
          x: rect.left,
          y: clamp(rect.top, 8, window.innerHeight - own.height - 8),
        };
      }
      return lastEnd;
    };

    const first = readEnd();
    const distance = Math.hypot(first.x - startX, first.y - startY);
    const duration = clamp(520 + distance * 0.4, 580, 900);

    const place = (x: number, y: number, tilt = 0, sx = 1, sy = 1) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg) scale(${sx}, ${sy})`;
    };
    place(startX, startY); // before the first paint, so it never flashes at 0,0

        // Colors: leave in the tapped element's look, ease into the real chip's look.
        // Colors: leave as the tapped chip, turn bright orange in the air,
    // then settle into the real chip's colors just before landing.
    const landingStyle = getComputedStyle(initialTarget);
    const landingColors = {
      bg: landingStyle.backgroundColor,
      border: landingStyle.borderTopColor,
      text: landingStyle.color,
    };
    const landingX = initialTarget.lastElementChild
      ? getComputedStyle(initialTarget.lastElementChild).color
      : landingColors.text;
    const from = flight.from.colors ?? landingColors;

    const timing: KeyframeAnimationOptions = {
      duration,
      delay: flight.delay,
      easing: "linear",
      fill: "both",
    };

    const colorAnimation = el.animate(
      [
        { backgroundColor: from.bg, borderColor: from.border, color: from.text, offset: 0 },
        { backgroundColor: BRIGHT.bg, borderColor: BRIGHT.border, color: BRIGHT.text, offset: 0.18 },
        { backgroundColor: BRIGHT.bg, borderColor: BRIGHT.border, color: BRIGHT.text, offset: 0.62 },
        {
          backgroundColor: landingColors.bg,
          borderColor: landingColors.border,
          color: landingColors.text,
          offset: 1,
        },
      ],
      timing
    );

    const crossAnimation = (el.lastElementChild as HTMLElement | null)?.animate(
      [
        { color: from.text, offset: 0 },
        { color: BRIGHT.text, offset: 0.18 },
        { color: BRIGHT.text, offset: 0.62 },
        { color: landingX, offset: 1 },
      ],
      timing
    );

    const startTime = performance.now();
    let previous = { x: startX, y: startY, time: startTime };
    let raf = 0;

    const frame = (now: number) => {
      const elapsed = now - startTime - flight.delay;
      const end = readEnd();

      if (elapsed < 0) {
        raf = requestAnimationFrame(frame); // waiting for its turn (stagger)
        return;
      }

      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        place(end.x, end.y);
        onDone(flight);
        const landed = target && target.isConnected ? target : null;
        if (landed) requestAnimationFrame(() => playLanding(landed));
        return;
      }

      const t = easeInOutCubic(progress);
      const peak = Math.min(70, Math.abs(end.y - startY) * 0.3 + 24);
      const controlX = (startX + end.x) / 2;
      const controlY = (startY + end.y) / 2 - peak * 2; // a curve's peak is half its control offset
      const inverse = 1 - t;

      const x = inverse * inverse * startX + 2 * inverse * t * controlX + t * t * end.x;
      const y = inverse * inverse * startY + 2 * inverse * t * controlY + t * t * end.y;

      const dt = Math.max(now - previous.time, 1);
      const vx = (x - previous.x) / dt;
      const vy = (y - previous.y) / dt;
      const speed = Math.hypot(vx, vy);

      const tilt = clamp(vx * 14, -14, 14);
      const stretch = clamp(speed * 0.1, 0, 0.16);
      const pop = 1 + 0.08 * Math.sin(Math.PI * progress);

      place(x, y, tilt, pop * (1 + stretch), pop * (1 - stretch * 0.5));
      previous = { x, y, time: now };

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      colorAnimation.cancel();
      crossAnimation?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 inline-flex items-center gap-2 whitespace-nowrap rounded-full border py-1.5 pl-3.5 pr-2.5 text-sm will-change-transform"
    >
      {flight.label}
      <span className="text-base leading-none">×</span>
    </span>
  );
};

/* ---------- Glide: neighbours slide instead of snapping (FLIP) ---------- */

/** Chips inside a container glide to their new spots. Mark each with data-glide="key". */
const useChipGlide = (
  ref: { readonly current: HTMLElement | null },
  signature: string,
  delay = 0
) => {
  const last = useRef(new Map<string, { x: number; y: number }>());
  const running = useRef(new Map<string, Animation>());

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) {
      last.current = new Map();
      return;
    }

    // Measure true layout positions, so stop our own glides first.
    running.current.forEach((animation) => animation.cancel());
    running.current.clear();

    const origin = container.getBoundingClientRect();
    const reduce = prefersReducedMotion();
    const next = new Map<string, { x: number; y: number }>();

    container.querySelectorAll<HTMLElement>("[data-glide]").forEach((node) => {
      const key = node.dataset.glide as string;
      const rect = node.getBoundingClientRect();
      // Relative to the container, so the container moving doesn't count.
      const position = { x: rect.left - origin.left, y: rect.top - origin.top };
      next.set(key, position);

      const previous = last.current.get(key);
      if (!previous || reduce || typeof node.animate !== "function") return;

      const dx = previous.x - position.x;
      const dy = previous.y - position.y;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

      const animation = node.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)` },
          { transform: "translate(0px, 0px)" },
        ],
                {
          duration: 340,
          delay,
          fill: "backwards", // stay at the old spot until the delay ends
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );
      running.current.set(key, animation);
      animation.onfinish = () => {
        if (running.current.get(key) === animation) running.current.delete(key);
      };
    });

    last.current = next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);
};

/** One block (the ingredients box) glides when things above it change height. */
const useBlockGlide = (
  ref: { readonly current: HTMLElement | null },
  signature: string,
  delay = 0
) => {
  const lastTop = useRef<number | null>(null);
  const running = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      lastTop.current = null;
      return;
    }

    running.current?.cancel();
    running.current = null;

    // Page coordinates, so scrolling between renders doesn't fool it.
    const top = node.getBoundingClientRect().top + window.scrollY;
    const previous = lastTop.current;
    lastTop.current = top;

    if (previous === null || prefersReducedMotion() || typeof node.animate !== "function") {
      return;
    }

    const dy = previous - top;
    if (Math.abs(dy) < 1) return;

        running.current = node.animate(
      [{ transform: `translateY(${dy}px)` }, { transform: "translateY(0px)" }],
      {
        duration: 340,
        delay,
        fill: "backwards",
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);
};


const ResultSkeleton: React.FC = () => (
  <div className="animate-pulse rounded-2xl border border-stone-700 border-b-stone-950 bg-gradient-to-b from-stone-800 to-stone-900 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_10px_24px_-8px_rgba(0,0,0,0.7)] sm:p-5">
    <div className="h-5 w-1/2 rounded bg-stone-800" />
    <div className="mt-3 h-3 w-full rounded bg-stone-800" />
    <div className="mt-2 h-3 w-4/5 rounded bg-stone-800" />
    <div className="mt-5 flex gap-2">
      <div className="h-6 w-16 rounded-full bg-stone-800" />
      <div className="h-6 w-20 rounded-full bg-stone-800" />
      <div className="h-6 w-14 rounded-full bg-stone-800" />
    </div>
  </div>
);

const SteamingPot: React.FC = () => (
  <span className="shrink-0" aria-hidden="true">
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14 text-orange-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path className="pot-steam pot-steam-1" d="M22 24c-3-4 3-6 0-11" />
      <path className="pot-steam pot-steam-2" d="M32 24c-3-4 3-6 0-11" />
      <path className="pot-steam pot-steam-3" d="M42 24c-3-4 3-6 0-11" />
      <g className="pot-lid">
        <path d="M15 31h34" />
        <path d="M29 31a3 3 0 0 1 6 0" />
      </g>
      <path
        d="M17 34h30v11a7 7 0 0 1-7 7H24a7 7 0 0 1-7-7V34Z"
        fill="#FFE3C2"
      />
      <path d="M17 38h-5M47 38h5" />
    </svg>
    <style>{`
      @keyframes pot-steam {
        0% { opacity: 0; transform: translateY(6px); }
        40% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-6px); }
      }
      @keyframes pot-lid {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-1.5px) rotate(-2deg); }
      }
      .pot-steam { animation: pot-steam 1.8s ease-in-out infinite; }
      .pot-steam-2 { animation-delay: 0.3s; }
      .pot-steam-3 { animation-delay: 0.6s; }
      .pot-lid {
        transform-box: fill-box;
        transform-origin: center;
        animation: pot-lid 0.5s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .pot-steam, .pot-lid { animation: none; }
        .pot-steam { opacity: 0.8; }
      }
    `}</style>
  </span>
);

const CookWhatYouHave: React.FC<CookWhatYouHaveProps> = ({
  onSelectDish,
}) => {
  const [saved] = useState(loadSaved);
  const [savedKitchen, setSavedKitchen] = useState<string[] | null>(loadKitchen);

  const [step, setStep] = useState<1 | 2 | 3>(() => {
    if (!saved) return 1;
    if (saved.results.length > 0) return 3;
    if (!saved.equipment.length) return 1;
    return saved.step === 1 ? 1 : 2;
  });

    const [flights, setFlights] = useState<Flight[]>([]);
  const [landing, setLanding] = useState<string[]>([]); // chips hidden until their flight lands
  const flightIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const [assumeStaples, setAssumeStaples] = useState<boolean>(
    saved?.assumeStaples ?? true
  );
  const [equipment, setEquipment] = useState<string[]>(
    saved?.equipment ?? []
  );
  const [ingredients, setIngredients] = useState<string[]>(
    saved?.ingredients ?? []
  );
  const [ingredientInput, setIngredientInput] = useState("");
  const [results, setResults] = useState<RecipeMatch[]>(
    saved?.results ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [resultSource, setResultSource] = useState<
    "predefined" | "ai" | "mixed"
  >(saved?.resultSource ?? "predefined");
  const [error, setError] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
const [activeIndex, setActiveIndex] = useState(-1);
const [dropUp, setDropUp] = useState(false);
const [inputFocused, setInputFocused] = useState(false);
const [showStaplesInfo, setShowStaplesInfo] = useState(false);

const currentSegment = ingredientInput.split(",").pop()?.trim() ?? "";

const suggestions = useMemo(
  () =>
    showSuggestions
      ? suggestIngredients(currentSegment, {
          exclude: ingredients,
          includeStaples: !assumeStaples,
        })
      : [],
  [showSuggestions, currentSegment, ingredients, assumeStaples]
);

useLayoutEffect(() => {
  if (suggestions.length === 0) return;

  const update = () => {
    const input = inputRef.current;
    if (!input) return;

    const rect = input.getBoundingClientRect();
    const footer = document.querySelector("[data-sticky-footer]");
    const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;

    // visualViewport shrinks when the phone keyboard opens.
    const viewport = window.visualViewport;
    const viewBottom = viewport
      ? viewport.offsetTop + viewport.height
      : window.innerHeight;

    const below = Math.min(footerTop, viewBottom) - 8 - rect.bottom;
    const above = rect.top - 8;
    const needed = suggestions.length * 42 + 8;

    setDropUp(below < needed && above > below);
  };

  update();
  window.visualViewport?.addEventListener("resize", update);
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  return () => {
    window.visualViewport?.removeEventListener("resize", update);
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}, [suggestions.length, inputFocused]);


const availableQuick = QUICK_INGREDIENTS.filter(
  (item) =>
    !ingredients.some((current) => current.toLowerCase() === item.toLowerCase())
);

const quickRef = useRef<HTMLDivElement>(null);
const chipsRef = useRef<HTMLDivElement>(null);
const boxRef = useRef<HTMLDivElement>(null);

useChipGlide(quickRef, availableQuick.join("|"), 150);
useChipGlide(chipsRef, ingredients.join("|"));
useBlockGlide(boxRef, availableQuick.join("|"), 150);

// Chips still in the air don't count yet; the number updates when they land.
const settledCount = ingredients.filter(
  (item) => !landing.includes(item.toLowerCase())
).length;

  const sectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const requestIdRef = useRef(0); // ignores late answers from searches the user already left

  useEffect(() => {
    if (step !== 2) setInputFocused(false);
  }, [step]);

  useEffect(() => {
    if (isLoading) return;

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          equipment,
          ingredients,
          results,
          step,
          resultSource,
          assumeStaples,
        })
      );
    } catch {
      /* Ignore storage failures. */
    }
  }, [equipment, ingredients, results, step, resultSource, assumeStaples, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setLoadingMessageIndex(0);
      return;
    }

    const id = window.setInterval(() => {
      setLoadingMessageIndex(
        (index) => (index + 1) % LOADING_MESSAGES.length
      );
    }, 1800);

    return () => window.clearInterval(id);
  }, [isLoading]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    sectionRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [step]);

  const launchFlights = (labels: string[], from: Box) => {
    setLanding((current) => [...current, ...labels.map((l) => l.toLowerCase())]);
    setFlights((current) => [
      ...current,
      ...labels.map((label, index) => ({
        id: ++flightIdRef.current,
        label,
        from,
        delay: index * 90, // stagger when several are added at once
      })),
    ]);
  };

  const finishFlight = (flight: Flight) => {
    setFlights((current) => current.filter((f) => f.id !== flight.id));
    setLanding((current) => {
      const index = current.indexOf(flight.label.toLowerCase());
      if (index === -1) return current;
      const next = [...current];
      next.splice(index, 1);
      return next;
    });
  };

  // Where typed words take off from: the left side of the input.
  const inputSource = (): Box | null => {
  const el = inputRef.current;
  if (!el) return null;
  const box = sourceBox(el);
  return { ...box, left: box.left + 24, width: 0 };
};

  const addIngredients = (raw: string, from?: Box | null) => {
    const newItems = raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!newItems.length) return;

    const seen = new Set(ingredients.map((item) => item.toLowerCase()));
    const additions = newItems.filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (!additions.length) return;

    setIngredients((current) => {
      const have = new Set(current.map((item) => item.toLowerCase()));
      return [
        ...current,
        ...additions.filter((item) => !have.has(item.toLowerCase())),
      ];
    });

    if (from && !prefersReducedMotion()) launchFlights(additions, from);
  };

  const addFromInput = () => {
  addIngredients(ingredientInput, inputSource());
  setIngredientInput("");
  setActiveIndex(-1);
  setShowSuggestions(false);
};

  const removeIngredient = (ingredient: string) =>
    setIngredients((current) =>
      current.filter((item) => item !== ingredient)
    );

  

  const pickSuggestion = (label: string, from?: Box | null) => {
    const parts = ingredientInput.split(",");
    parts.pop(); // drop the half-typed segment
    const rest = parts.map((part) => part.trim()).filter(Boolean).join(", ");

    addIngredients(label, from ?? inputSource());
    setIngredientInput(rest ? `${rest}, ` : "");
    setActiveIndex(-1);
    setShowSuggestions(false);
  };

const handleIngredientKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (suggestions.length > 0) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
      return;
    }
    if (event.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
      return;
    }
    if (event.key === "Enter" && suggestions[activeIndex]) {
      event.preventDefault();
      const option = document.getElementById(`ingredient-option-${activeIndex}`);
      pickSuggestion(suggestions[activeIndex], option ? sourceBox(option) : null);
      return;
    }
  }

  if (event.key === "Enter") {
    event.preventDefault();
    addFromInput();
  }
};

  const handleFindRecipes = async () => {
    const pending = ingredientInput.trim();

    const finalIngredients = pending
      ? [
          ...ingredients,
          ...pending
            .split(",")
            .map((item) => item.trim())
            .filter(
              (item) =>
                item &&
                !ingredients.some(
                  (existing) =>
                    existing.toLowerCase() === item.toLowerCase()
                )
            ),
        ]
      : ingredients;

    if (!equipment.length) {
      setError("Pick at least one piece of equipment.");
      return;
    }

    if (!finalIngredients.length) {
      setError("Add at least one ingredient to continue.");
      return;
    }

            if (pending) {
      setIngredients(finalIngredients);
      setIngredientInput("");
    }

    const requestId = ++requestIdRef.current;
const isCurrent = () => requestId === requestIdRef.current;

setError(null);
setResults([]);
setResultSource("predefined");
setIsLoading(true);
setStep(3);

try {
  const response = await findRecipesFromIngredients(
    {
      equipment,
      ingredients: finalIngredients,
      assumeStaples,
    },
    (localRecipes) => {
      if (isCurrent()) setResults(localRecipes); // show local matches right away
    }
  );

  if (!isCurrent()) return;

  if (!response.recipes.length) {
    setError(FRIENDLY_ERROR);
  } else {
    setResults(response.recipes);
    setResultSource(response.source);
  }
} catch (err) {
  if (!isCurrent()) return;
  console.error("Cook what you have failed:", err);
  setError(
    err instanceof Error && err.message
      ? err.message
      : FRIENDLY_ERROR
  );
} finally {
  if (isCurrent()) setIsLoading(false);
}
  };

  const startOver = () => {
    setFlights([]);
    setLanding([]);
    requestIdRef.current++;
    setResults([]);
    setEquipment([]);
    setIngredients([]);
    setIngredientInput("");
    setError(null);
    setIsLoading(false);
    setResultSource("predefined");
    setAssumeStaples(true);
    setStep(1);
  };

  const applySavedKitchen = () => {
  if (!savedKitchen) return;
  setEquipment(savedKitchen);
  setError(null);
  setStep(2);
};

const forgetSavedKitchen = () => {
  forgetKitchen();
  setSavedKitchen(null);
};

  const goToIngredients = () => {
    setFlights([]);
    setLanding([]);
    requestIdRef.current++;
    setIsLoading(false);
    setResults([]);
    setError(null);
    setResultSource("predefined");
    setStep(2);
  };

  return (
    <section
      ref={sectionRef}
      id="cook-what-you-have"
      className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-3 py-10 sm:px-4 sm:py-20"
    >
      <div className="rounded-3xl border border-stone-700 bg-stone-900 shadow-[0_12px_40px_rgba(120,70,30,0.10)]">
        <header className="px-5 pb-6 pt-8 text-center sm:px-12 sm:pb-8 sm:pt-12">
          <h2 className="font-serif text-3xl font-black tracking-tight text-orange-50 sm:text-4xl">
            Cook what you have
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
            Show us your kitchen and pantry. We&apos;ll suggest dishes you can
            make right now.
          </p>
          <div className="mt-7 sm:mt-9">
            <Stepper current={step} />
          </div>
        </header>

        <div className="border-t border-stone-700" />

          {step === 1 && (
  <>
    <div className="px-5 pb-8 pt-8 sm:px-12 sm:pb-10 sm:pt-10">
      {savedKitchen && equipment.length === 0 && (
  <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-orange-400/30 bg-orange-400/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
    <div className="min-w-0">
      <p className="text-sm font-semibold text-orange-50">
        Use your saved kitchen?
      </p>
      <p className="mt-0.5 truncate text-xs text-stone-400 sm:text-sm">
        {savedKitchen.join(", ")}
      </p>
    </div>

    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={applySavedKitchen}
        className={`${footerButton} whitespace-nowrap`}
      >
        Use my kitchen
      </button>
      <button
        type="button"
        onClick={forgetSavedKitchen}
        className={ghostButton}
      >
        Forget
      </button>
    </div>
  </div>
)}

      <KitchenEquipmentSelector
                selectedEquipment={equipment}
                onChange={setEquipment}
              />
            </div>

            <div className={footerBar}>
              <p className="min-w-0 flex-1 text-sm leading-tight text-stone-400">
                {equipment.length === 0 ? (
                  "Select at least one"
                ) : (
                  <>
                    <span className="font-semibold text-orange-200">
                      {equipment.length}
                    </span>{" "}
                    selected
                  </>
                )}
              </p>

              <button
                type="button"
                disabled={!equipment.length}
                onClick={() => {
                  saveKitchen(equipment);
                  setSavedKitchen(equipment);
                  setError(null);
                  setStep(2);
                }}
                className={`${footerButton} shrink-0 whitespace-nowrap`}
              >
                Next: ingredients
                <span
                  aria-hidden="true"
                  className="hidden sm:inline"
                >
                  →
                </span>
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mx-auto max-w-3xl px-5 pb-8 pt-8 sm:px-12 sm:pb-10 sm:pt-10">
              <h3 className="font-serif text-2xl font-black text-orange-50 sm:text-3xl">
                What&apos;s in your pantry?
              </h3>
              <div className="mt-5 rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3">
  <div className="flex items-center justify-between gap-3">
    <p
      className="min-w-0 truncate text-sm text-stone-200"
      title={equipment.join(", ")}
    >
      <span className="text-stone-500">Cooking with </span>
      {equipment.slice(0, 2).join(", ")}
      {equipment.length > 2 && (
        <span className="text-stone-400"> +{equipment.length - 2}</span>
      )}
    </p>
    <button
      type="button"
      onClick={() => {
        setError(null);
        setStep(1);
      }}
      className="shrink-0 text-sm font-medium text-orange-200 transition-colors hover:text-orange-100 focus:outline-none focus-visible:underline"
    >
      Edit
    </button>
  </div>

  <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-stone-800 pt-2.5">
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-stone-100">
      <input
        type="checkbox"
        checked={assumeStaples}
        onChange={(event) => setAssumeStaples(event.target.checked)}
        className="h-4 w-4 accent-orange-300"
      />
      I have basic staples
    </label>
    <button
      type="button"
      aria-expanded={showStaplesInfo}
      onClick={() => setShowStaplesInfo((open) => !open)}
      className="shrink-0 text-xs text-stone-500 underline-offset-2 transition-colors hover:text-orange-200 hover:underline focus:outline-none focus-visible:underline"
    >
      {showStaplesInfo ? "Hide" : "What's included?"}
    </button>
  </div>

  {showStaplesInfo && (
    <p className="mt-2 text-xs leading-relaxed text-stone-400">
      Salt, oil, ghee, sugar, haldi, jeera, chilli and coriander powder,
      garam masala, pepper, mustard seeds
    </p>
  )}
</div>

              <label htmlFor="ingredient-input" className="sr-only">
  Type ingredients
</label>
<div className="relative mt-5">
  <input
    ref={inputRef}
    id="ingredient-input"
    type="text"
    role="combobox"
    aria-expanded={suggestions.length > 0}
    aria-controls="ingredient-suggestions"
    aria-autocomplete="list"
    aria-activedescendant={
      activeIndex >= 0 ? `ingredient-option-${activeIndex}` : undefined
    }
    value={ingredientInput}
    onChange={(event) => {
      setIngredientInput(event.target.value);
      setShowSuggestions(true);
      setActiveIndex(-1);
    }}
    onFocus={() => {
      setShowSuggestions(true);
      setInputFocused(true);
    }}
    onBlur={() => {
      setShowSuggestions(false);
      setInputFocused(false);
    }}
    onKeyDown={handleIngredientKeyDown}
    placeholder="Type ingredients, eg: paneer, dal "
    autoComplete="off"
    enterKeyHint="done"
    className="w-full rounded-xl border border-stone-700 bg-stone-900 py-3 pl-4 pr-14 text-base text-stone-100 outline-none transition placeholder:text-sm placeholder:text-stone-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
  />

  <button
    type="button"
    onMouseDown={(event) => event.preventDefault()}
    onClick={addFromInput}
    disabled={!ingredientInput.trim()}
    aria-label="Add ingredient"
    className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-orange-200 text-xl font-bold leading-none text-stone-900 transition hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 disabled:bg-transparent disabled:text-stone-600 disabled:hover:bg-transparent"
  >
    +
  </button>

  {suggestions.length > 0 && (
    <ul
      id="ingredient-suggestions"
      role="listbox"
      onMouseDown={(event) => event.preventDefault()}
      className={`absolute left-0 right-0 z-50 overflow-hidden rounded-xl border border-stone-700 bg-stone-900 shadow-lg ${
        dropUp ? "bottom-full mb-1" : "top-full mt-1"
      }`}
    >
      {suggestions.map((label, index) => (
        <li
          key={label}
          id={`ingredient-option-${index}`}
          role="option"
          aria-selected={index === activeIndex}
          onClick={(event) =>
            pickSuggestion(label, sourceBox(event.currentTarget))
          }
          className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
            index === activeIndex
              ? "bg-orange-400/15 text-orange-100"
              : "text-stone-200 hover:bg-stone-800"
          }`}
        >
          {label}
        </li>
      ))}
    </ul>
  )}
</div>

              {availableQuick.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-stone-100">
                    Or tap to add
                  </p>
                  <div ref={quickRef} className="mt-3 flex flex-wrap gap-2">
                    {availableQuick.map((item) => (
                      <button
                        key={item}
                        type="button"
                        data-glide={item.toLowerCase()}
                        onClick={(event) =>
                          addIngredients(item, sourceBox(event.currentTarget))
                        }
                        className="rounded-full border border-stone-700 bg-stone-900 px-3.5 py-2 text-sm text-stone-300 transition-colors hover:border-orange-300/70 hover:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
                      >
                        + {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                ref={boxRef}
                data-ingredient-box
                className="mt-8 rounded-2xl border border-stone-700 bg-stone-950 p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-stone-100">
                    Your ingredients
                    <span
                      data-ingredient-count
                      className="ml-2 inline-block text-orange-300"
                    >
                      ({settledCount})
                    </span>
                  </h4>
                  {ingredients.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIngredients([])}
                      className="text-sm text-stone-500 transition-colors hover:text-orange-200"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {ingredients.length > 0 ? (
                  <div ref={chipsRef} className="mt-4 flex flex-wrap gap-2">
                    {ingredients.map((ingredient) => (
                      <Chip
                        key={ingredient}
                        label={ingredient}
                        hidden={landing.includes(ingredient.toLowerCase())}
                        onRemove={() => removeIngredient(ingredient)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-stone-500">
                    Nothing added yet. Type above or tap a suggestion.
                  </p>
                )}
              </div>

              {error && (
                <p role="alert" className="mt-5 text-sm text-orange-100">
                  {error}
                </p>
              )}
            </div>

            <div
              data-sticky-footer
              className={`${footerBar} transition-transform duration-200 ${
                inputFocused
                  ? "pointer-events-none translate-y-full sm:pointer-events-auto sm:translate-y-0"
                  : ""
              }`}
            >
              <button
  type="button"
  onClick={() => {
    setError(null);
    setStep(1);
  }}
  className={`${ghostButton} shrink-0`}
>
  <span aria-hidden="true">←</span> Back
</button>

<p className="min-w-0 flex-1 text-center text-xs leading-tight text-stone-400 sm:text-sm">
  <span className="block sm:inline">
    <span className="font-semibold text-orange-200">{settledCount}</span>{" "}
    {settledCount === 1 ? "ingredient" : "ingredients"}
  </span>
  <span className="hidden sm:inline"> · </span>
  <span className="block sm:inline">
    <span className="font-semibold text-orange-200">{equipment.length}</span>{" "}
    {equipment.length === 1 ? "tool" : "tools"}
  </span>
</p>

<button
  type="button"
  onClick={handleFindRecipes}
  disabled={ingredients.length === 0 && !ingredientInput.trim()}
  className={`${footerButton} shrink-0 whitespace-nowrap`}
>
  Find dishes
</button>
            </div>
          </>
        )}

        {step === 3 && isLoading && results.length === 0 && (
          <div
            className="px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10"
            role="status"
            aria-live="polite"
          >
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-4">
                <SteamingPot />
                <div>
                  <h3 className="font-serif text-xl font-black text-orange-50 sm:text-2xl">
                    Finding dishes you can make…
                  </h3>
                  <p className="mt-1 text-sm text-stone-400">
                    {LOADING_MESSAGES[loadingMessageIndex]}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4" aria-hidden="true">
                <ResultSkeleton />
                <ResultSkeleton />
                <ResultSkeleton />
              </div>
            </div>
          </div>
        )}

        {step === 3 && !isLoading && error && (
          <div className="px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10">
            <div className="mx-auto max-w-3xl">
              <div
                role="alert"
                className="rounded-2xl border border-orange-400/30 bg-[#FFE3C2]/60 p-5 sm:p-6"
              >
                <h3 className="font-serif text-xl font-black text-orange-50 sm:text-2xl">
                  Couldn&apos;t find dishes this time
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300 sm:text-base">
                  {error}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStep(2);
                  }}
                  className={primaryButton}
                >
                  Edit ingredients
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && !error && results.length > 0 && (
          <div className="px-5 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10">
            <div className="mx-auto max-w-3xl">
              <div>
                <h3 className="font-serif text-2xl font-black text-orange-50 sm:text-3xl">
                  You can make {results.length === 1 ? "this" : "these"}
                </h3>
                <p className="mt-1.5 text-sm text-stone-400">
                  Based on your {ingredients.length}{" "}
                  {ingredients.length === 1 ? "ingredient" : "ingredients"}
                  {resultSource !== "predefined" &&
                    " · includes suggestions from our kitchen assistant"}
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                {results.map((recipe) => {
                  const meta = [recipe.prepTime, recipe.equipmentUsed?.join(", ")]
                    .filter(Boolean)
                    .join(" · ");
                  const shown = recipe.ingredientsUsed.slice(0, 4);
                  const extra = recipe.ingredientsUsed.slice(4);

                  return (
                    <article
                      key={recipe.dishName}
                      className="rounded-2xl border border-stone-700 border-b-stone-950 bg-gradient-to-b from-stone-800 to-stone-900 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_1px_0_rgba(0,0,0,0.5),0_10px_24px_-8px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_1px_0_rgba(0,0,0,0.5),0_16px_32px_-10px_rgba(0,0,0,0.8)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-5"
                    >
                      <h4 className="font-serif text-xl font-bold text-orange-50 sm:text-2xl">
                        {recipe.dishName}
                      </h4>

                      {meta && (
                        <p className="mt-1 text-xs text-stone-400 sm:text-sm">{meta}</p>
                      )}

                      {recipe.description && (
                        <p className="mt-2 text-sm leading-relaxed text-stone-400 sm:text-base">
                          {recipe.description}
                        </p>
                      )}

                      {shown.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="mr-1 text-xs text-stone-500">Uses</span>
                          {shown.map((ingredient) => (
                            <span
                              key={ingredient}
                              className="rounded-full bg-[#DDEBD3] px-2.5 py-1 text-xs font-medium text-stone-200"
                            >
                              {ingredient}
                            </span>
                          ))}
                          {extra.length > 0 && (
                            <span
                              title={extra.join(", ")}
                              className="rounded-full border border-stone-700 px-2.5 py-1 text-xs text-stone-400"
                            >
                              +{extra.length}
                            </span>
                          )}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectDish(recipe.dishName)}
                        className={`${footerButton} mt-4 w-full sm:w-auto`}
                      >
                        Get the recipe
                      </button>
                    </article>
                  );
                })}

                {isLoading && (
                  <div role="status" aria-live="polite" className="grid gap-3">
                    <p className="flex items-center gap-2 text-sm text-stone-400">
                      Looking for more dishes…
                    </p>
                    {Array.from({ length: Math.max(RESULT_SLOTS - results.length, 0) }).map(
                      (_, index) => (
                        <ResultSkeleton key={index} />
                      )
                    )}
                  </div>
                )}
              </div>

              
                      <div className="mt-6 flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={goToIngredients}
                          className={ghostButton}
                        >
                          Edit ingredients
                        </button>
                        <button
                          type="button"
                          onClick={startOver}
                          className={ghostButton}
                        >
                          Start over
                        </button>
                      </div>
            </div>
          </div>
        )}
      </div>

      {flights.map((flight) => (
        <FlyingChip key={flight.id} flight={flight} onDone={finishFlight} />
      ))}
    </section>
  );
};

export default CookWhatYouHave;