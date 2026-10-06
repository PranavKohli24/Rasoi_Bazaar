import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Recipe, Tip } from "../types";
import {
  useStepTimers,
  MIN_TIMER_SECONDS,
  TimerView,
  BackgroundTimer,
} from "../src/hooks/useStepTimers";
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

import { isHeyChefSupported, HeyChefCommands, HeyChefPhase, CommandName } from "../src/hooks/useHeyChef";

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

const CheckIcon: IconC = ({ className }) => (
  <Icon className={className}><path d="M4 12l5 5L20 6" /></Icon>
);

const SteamIcon: React.FC<{ className?: string; color: string }> = ({ className, color }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M9 21c-1.5-1.5-1.5-3 0-4.5s1.5-3 0-4.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className="steam-wisp-1"
    />
    <path
      d="M15 21c-1.5-1.5-1.5-3 0-4.5s1.5-3 0-4.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      className="steam-wisp-2"
    />
  </svg>
);

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

const MicIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
    <line x1="12" y1="19" x2="12" y2="23" />
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
  [/microwave/i, "/kitchen/microwave.webp"],
  [/air.?fryer/i, "/kitchen/air_fryer.webp"],
  [/grinder|mixer|blender/i, "/kitchen/grinder.webp"],
  [/cooker/i, "/kitchen/cooker.webp"],
  [/kadai|kadhai|wok/i, "/kitchen/kadai.webp"],
  [/tawa|griddle|\bpan\b/i, "/kitchen/tawa.webp"],
  [/oven|tandoor/i, "/kitchen/oven.webp"],
  [/stove|gas/i, "/kitchen/stove.webp"],
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
@keyframes confirm-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.confirm-pop { animation: confirm-pop 0.28s cubic-bezier(0.35, 1.56, 0.64, 1) both; }

@media (prefers-reduced-motion: reduce) {
  .step-slide-from-right, .step-slide-from-left, .confirm-pop, .animate-image-bounce-3d { animation: none; }
}
  
@keyframes steam-rise {
  0% { transform: translateY(2px); opacity: 0; }
  25% { opacity: 0.9; }
  75% { opacity: 0.5; }
  100% { transform: translateY(-5px); opacity: 0; }
}
.timer-steam-active .steam-wisp-1 { animation: steam-rise 2.2s ease-in-out infinite; }
.timer-steam-active .steam-wisp-2 { animation: steam-rise 2.2s ease-in-out infinite 0.7s; }
@media (prefers-reduced-motion: reduce) {
  .timer-steam-active .steam-wisp-1,
  .timer-steam-active .steam-wisp-2 {
    animation: none;
  }
}

.hey-chef-dot {
  width: 8px; height: 8px; border-radius: 9999px;
  background: #EAD9AE; flex-shrink: 0;
}
.hey-chef-dot.is-awake {
  background: #FC6C26;
  animation: hey-chef-pulse 0.9s ease-in-out infinite;
}
.hey-chef-ring {
  position: absolute; inset: -4px; border-radius: 9999px;
  border: 2px solid #FC6C26; opacity: 0; pointer-events: none;
}
.hey-chef-ring.is-awake { animation: hey-chef-ring 1.2s ease-out infinite; }
@keyframes hey-chef-pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.5); opacity: 1; }
}
@keyframes hey-chef-ring {
  0% { transform: scale(0.85); opacity: 0.8; }
  100% { transform: scale(1.35); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hey-chef-dot.is-awake, .hey-chef-ring.is-awake { animation: none; }
  .hey-chef-ring.is-awake { opacity: 0.6; }
}


.hey-chef-shimmer {
  background: linear-gradient(90deg, #6B5238 0%, #6B5238 35%, #FC6C26 50%, #6B5238 65%, #6B5238 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: hey-chef-shimmer 1.6s linear infinite;
}
@keyframes hey-chef-shimmer {
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hey-chef-shimmer {
    animation: none;
    background: none;
    -webkit-text-fill-color: #6B5238;
    color: #6B5238;
  }
}
`;

const HEY_CHEF_LABEL: Record<HeyChefPhase, string> = {
  off: "",
  paused: "Hey chef is paused while the chat is open",
  sleeping: "Say “Hey chef”, or just “next” / “back”",
  awake: "Listening…",
  processing: "Thinking…",
  speaking: "Speaking…",
};

const HEY_CHEF_INTRO_KEY = "recipe-heychef-intro-seen";
const HEY_CHEF_NUDGE_KEY = "recipe-heychef-nudge-dismissed";

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

const formatSpokenDuration = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s} second${s === 1 ? "" : "s"}`;
  if (s === 0) return `${m} minute${m === 1 ? "" : "s"}`;
  return `${m} minute${m === 1 ? "" : "s"} ${s} second${s === 1 ? "" : "s"}`;
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

const TICK_COUNT = 24;
const ADJUST_STEP_SECONDS = 30;

const formatClock = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

// Pure display: the countdown itself lives in useStepTimers, so it keeps
// running when this unmounts on a step change.
const StepTimer: React.FC<{
  view: TimerView;
  voiceHints?: boolean;
  onToggle: () => void;
  onAdjust: (deltaSeconds: number) => void;
  onReset: () => void;
  onEnableVoice?: () => void;
}> = ({ view, voiceHints, onToggle, onAdjust, onReset, onEnableVoice }) => {
  const { total, remaining, isRunning, isDone, hasStarted } = view;

  const [resetArmed, setResetArmed] = useState(false);
  const resetArmTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetArmTimeoutRef.current !== null) window.clearTimeout(resetArmTimeoutRef.current);
    };
  }, []);

  const progressPct = total === 0 ? 0 : ((total - remaining) / total) * 100;
  const litTicks = isDone ? TICK_COUNT : Math.round(TICK_COUNT * (progressPct / 100));

  const doReset = () => {
    if (resetArmTimeoutRef.current !== null) window.clearTimeout(resetArmTimeoutRef.current);
    setResetArmed(false);
    onReset();
  };

  const handleResetTap = () => {
    if (!resetArmed) {
      setResetArmed(true);
      if (resetArmTimeoutRef.current !== null) window.clearTimeout(resetArmTimeoutRef.current);
      resetArmTimeoutRef.current = window.setTimeout(() => setResetArmed(false), 2800);
      return;
    }
    doReset();
  };

  const minuteLabel = Math.max(1, Math.round(total / 60));
  const tickColor = isDone ? COLOR.clay : COLOR.saffron;
  const steamColor = COLOR.inkSoft;

  return (
    <div
      className="mt-6 w-full max-w-[260px] rounded-2xl border p-4 sm:max-w-xs sm:rounded-3xl sm:p-5"
      style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}
    >
      <div className="flex h-5 items-center justify-end">
        {hasStarted && !isDone && (
          <button
            type="button"
            onClick={handleResetTap}
            onBlur={() => setResetArmed(false)}
            className="text-xs font-semibold underline-offset-2 transition-colors hover:underline"
            style={{ color: resetArmed ? COLOR.clay : COLOR.inkSoft }}
          >
            {resetArmed ? "Tap again to reset" : "Reset"}
          </button>
        )}
      </div>

      <div className="relative mx-auto mt-5 h-24 w-24 sm:mt-7 sm:h-32 sm:w-32">
        {!isDone && (
          <div className="absolute left-1/2 -top-5 z-10 -translate-x-1/2 sm:-top-6">
            <SteamIcon
              className={`h-5 w-5 sm:h-6 sm:w-6 ${isRunning ? "timer-steam-active" : "opacity-40"}`}
              color={steamColor}
            />
          </div>
        )}

        <svg viewBox="0 0 120 120" className="h-24 w-24 sm:h-32 sm:w-32">
          {Array.from({ length: TICK_COUNT }).map((_, i) => (
            <line
              key={i}
              x1={60}
              y1={9}
              x2={60}
              y2={21}
              transform={`rotate(${(360 / TICK_COUNT) * i} 60 60)`}
              stroke={i < litTicks ? tickColor : COLOR.border}
              strokeWidth={4}
              strokeLinecap="round"
              style={{ transition: "stroke 0.25s ease" }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-serif text-2xl font-black tabular-nums leading-none sm:text-3xl"
            style={{ color: COLOR.ink }}
          >
            {formatClock(remaining)}
          </span>
          <span className="mt-1 h-3 text-[11px] font-medium" style={{ color: COLOR.inkSoft }}>
            {!isDone && (hasStarted ? (isRunning ? "Running" : "Paused") : `${minuteLabel} min`)}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 sm:mt-4 sm:gap-2">
        {!isDone && (
          <button
            type="button"
            onClick={() => onAdjust(-ADJUST_STEP_SECONDS)}
            disabled={total <= MIN_TIMER_SECONDS}
            aria-label="Subtract 30 seconds"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-30"
            style={{ backgroundColor: COLOR.surface, color: COLOR.saffronDark }}
          >
            −
          </button>
        )}

        {!isDone ? (
          <button
            type="button"
            onClick={onToggle}
            className="flex-1 truncate rounded-full px-4 py-2.5 text-sm font-semibold transition-colors"
            style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffronDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffron)}
          >
            {isRunning ? "Pause" : hasStarted ? "Resume" : "Start the timer"}
          </button>
        ) : (
          <div className="flex flex-1 items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: COLOR.clay }}>
              Time&apos;s up!
            </span>
            <button
              type="button"
              onClick={doReset}
              className="text-xs font-semibold underline-offset-2 transition-colors hover:underline"
              style={{ color: COLOR.inkSoft }}
            >
              Start again
            </button>
          </div>
        )}

        {!isDone && (
          <button
            type="button"
            onClick={() => onAdjust(ADJUST_STEP_SECONDS)}
            aria-label="Add 30 seconds"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold leading-none transition-colors"
            style={{ backgroundColor: COLOR.surface, color: COLOR.saffronDark }}
          >
            +
          </button>
        )}
      </div>

      {voiceHints && !isDone && (
        <p
          className="mt-2.5 text-center text-[11px]"
          style={{ color: COLOR.inkSoft, opacity: 0.8 }}
        >
            Say “{isRunning ? "pause timer" : hasStarted ? "resume timer" : "start timer"}”
        </p>
      )}

      {!voiceHints && onEnableVoice && !isDone && !hasStarted && (
        <button
          type="button"
          onClick={onEnableVoice}
          className="mx-auto mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold underline-offset-2 hover:underline"
          style={{ color: COLOR.saffronDark }}
        >
          <MicIcon className="h-3.5 w-3.5" />
          Hands busy? Say “start timer” instead
        </button>
      )}
    </div>
  );
};

// Timers running on other steps. Portaled to <body> for the same reason as
// the companion: a transformed ancestor would break `fixed`.
const TimerChips: React.FC<{
  items: BackgroundTimer[];
  onJump: (step: number) => void;
}> = ({ items, onJump }) => {
  if (items.length === 0) return null;

  return createPortal(
    <div className="pointer-events-none fixed bottom-5 left-4 z-[55] flex flex-col items-start gap-2 sm:bottom-6 sm:left-6">
      {items.map((item) => (
        <button
          key={item.step}
          type="button"
          onClick={() => onJump(item.step)}
          aria-label={`Step ${item.step + 1} timer, ${
            item.isDone ? "time's up" : formatClock(item.remaining)
          }. Go to step.`}
          className="pointer-events-auto flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold shadow-lg shadow-black/10 transition-transform active:scale-95 focus:outline-none focus-visible:ring-2"
          style={{
            borderColor: item.isDone ? COLOR.clay : COLOR.border,
            backgroundColor: item.isDone ? COLOR.clayTint : COLOR.surface,
            color: COLOR.ink,
          }}
        >
          <span className="text-xs font-bold" style={{ color: COLOR.inkSoft }}>
            Step {item.step + 1}
          </span>
          <span
            className="tabular-nums"
            style={{ color: item.isDone ? COLOR.clay : COLOR.saffronDark }}
          >
            {item.isDone ? "Time's up" : formatClock(item.remaining)}
          </span>
          {!item.isDone && !item.isRunning && (
            <span className="text-[11px] font-medium" style={{ color: COLOR.inkSoft }}>
              paused
            </span>
          )}
        </button>
      ))}
    </div>,
    document.body
  );
};

const ProgressRing: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-10 w-10 shrink-0">
      <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r={r} fill="none" stroke={COLOR.saffronTint} strokeWidth="3.5" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke={COLOR.saffron}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - current / total)}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tabular-nums"
        style={{ color: COLOR.ink }}
      >
        {current}/{total}
      </span>
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

    // ---- "Hey chef" ----
  const [isHeyChefOn, setIsHeyChefOn] = useState(() => {
    try {
      return localStorage.getItem("recipe-heychef-enabled") === "true";
    } catch {
      return false;
    }
  });
  const [heyChefSupported] = useState(isHeyChefSupported);
  const [heyChefPhase, setHeyChefPhase] = useState<HeyChefPhase>("off");
  const [heyChefBlockedAt, setHeyChefBlockedAt] = useState<number | null>(null);

  // Only listens while someone is actually cooking.
  const heyChefActive = isCooking && isHeyChefOn && heyChefSupported;

  const doneHint = heyChefActive
    ? "Say next when you're ready."
    : "Tap Next when you're ready.";

  const toggleHeyChef = () => {
    const next = !isHeyChefOn;
    if (!next) setHeyChefBlockedAt(null);
    setIsHeyChefOn(next);
    try {
      localStorage.setItem("recipe-heychef-enabled", String(next));
    } catch {
      /* ignore */
    }
    if (!next) window.speechSynthesis?.cancel();
  };

  const handleHeyChefBlocked = () => {
    setIsHeyChefOn(false);
    setHeyChefBlockedAt(Date.now());
    try {
      localStorage.setItem("recipe-heychef-enabled", "false");
    } catch {
      /* ignore */
    }
  };

      const COMMAND_LABELS: Record<CommandName, string> = {
    next: "Next step",
    back: "Previous step",
    repeat: "Repeating",
    yesDone: "Done",
    notYet: "Okay, not yet",
    pauseTimer: "Timer paused",
    resumeTimer: "Timer resumed",
    addTime: "+30 sec",
    subtractTime: "−30 sec",
    timeLeft: "Time left",
  };
  const [commandFlash, setCommandFlash] = useState<{ label: string; id: number } | null>(null);

  const handleHeyChefCommand = (name: CommandName) =>
    setCommandFlash({ label: COMMAND_LABELS[name], id: Date.now() });

  useEffect(() => {
    if (!commandFlash) return;
    const id = window.setTimeout(() => setCommandFlash(null), 1400);
    return () => window.clearTimeout(id);
  }, [commandFlash]);


    // Hide the "mic blocked" note after 8 seconds; each new block restarts the timer.
  useEffect(() => {
    if (heyChefBlockedAt === null) return;
    const id = window.setTimeout(() => setHeyChefBlockedAt(null), 8000);
    return () => window.clearTimeout(id);
  }, [heyChefBlockedAt]);
  
    /* ---- Hands-free discovery ---- */

  // First-run card with example phrases. Seen once, then never again.
  const [heyChefIntroSeen, setHeyChefIntroSeen] = useState(() => {
    try {
      return localStorage.getItem(HEY_CHEF_INTRO_KEY) === "true";
    } catch {
      return false;
    }
  });
  const dismissHeyChefIntro = () => {
    setHeyChefIntroSeen(true);
    try {
      localStorage.setItem(HEY_CHEF_INTRO_KEY, "true");
    } catch {
      /* ignore */
    }
  };

  // The first successful use ("Hey chef" or any command) ends the intro.
  useEffect(() => {
    if (!heyChefActive || heyChefIntroSeen) return;
    if (heyChefPhase === "awake" || commandFlash) dismissHeyChefIntro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heyChefActive, heyChefIntroSeen, heyChefPhase, commandFlash]);

  // Rotates the example phrase shown while it's waiting for "Hey chef".
  const [heyChefTipIndex, setHeyChefTipIndex] = useState(0);
  useEffect(() => {
    if (!heyChefActive || heyChefPhase !== "sleeping") return;
    const id = window.setInterval(() => setHeyChefTipIndex((i) => i + 1), 5000);
    return () => window.clearInterval(id);
  }, [heyChefActive, heyChefPhase]);

  // "Hands busy?" nudge: shown after a few manual Next taps, once ever
  // (until dismissed), and only while voice is off.
  const [manualNextCount, setManualNextCount] = useState(0);
  const [heyChefNudgeDismissed, setHeyChefNudgeDismissed] = useState(() => {
    try {
      return localStorage.getItem(HEY_CHEF_NUDGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const dismissHeyChefNudge = () => {
    setHeyChefNudgeDismissed(true);
    try {
      localStorage.setItem(HEY_CHEF_NUDGE_KEY, "true");
    } catch {
      /* ignore */
    }
  };

  // A check-in the companion should say — bumping the id (not just the text)

  // guarantees CookingCompanion treats repeats on a later long step as new.
  const [companionCheckIn, setCompanionCheckIn] = useState<{ id: string; text: string } | null>(
    null
  );

  // Index 0 always lands around the 1-minute mark (a reassuring "you're off
  // to a good start"), later indexes land every 5 minutes after (a steady
  // "still with you").
  const CHECK_IN_LINES_FIRST = [
    "Off to a good start — I'll keep an eye on the time for you.",
    "Looking good so far. I've got the clock, I will remind you once its done",
  ];
  const CHECK_IN_LINES_LATER = [
    "Still going strong in there — I'll let you know when it's ready.",
    "Simmering away nicely. Hang tight, not long now.",
    "No rush — good things take their time. I've got an eye on the clock.",
  ];

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
      wakeLockRef.current?.release().catch(() => { });
      wakeLockRef.current = null;
    };
  }, [isCooking]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // Timers live in a hook, not inside StepTimer, so they keep counting while
  // the person is on another step. They run off a real end time, so a
  // throttled or backgrounded tab doesn't make them drift.
  // (Return types are explicit so TypeScript doesn't see a circular reference.)
  const handleTimerComplete = (stepIdx: number): void => {
    playChime();
    const isCurrent = stepIdx === currentStepIndex;
    const wasLastStep = stepIdx >= recipe.method.length - 1;
    if (isCurrent) timers.acknowledge(stepIdx);

        if ("speechSynthesis" in window) {
      const voiceOn = isVoiceEnabled || heyChefActive;
      // A timer on the step in front of you may interrupt; one finishing
      // in the background waits its turn instead of cutting off speech.
      if (isCurrent) window.speechSynthesis.cancel();
      // The chime lasts ~0.7s, so wait for it to finish, then speak.
      window.setTimeout(() => {
        const message = !isCurrent
          ? `Time's up for step ${stepIdx + 1}!`
          : voiceOn && !wasLastStep
          ? `Time's up! ${doneHint}`
          : "Time's up!";
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }, 800);
    }
  };

  const handleTimerCheckIn = (stepIdx: number, markIndex: number): void => {
    // A background timer's chip already says enough; don't interrupt.
    if (stepIdx !== currentStepIndex) return;
    const line =
      markIndex === 0
        ? CHECK_IN_LINES_FIRST[currentStepIndex % CHECK_IN_LINES_FIRST.length]
        : CHECK_IN_LINES_LATER[(currentStepIndex + markIndex) % CHECK_IN_LINES_LATER.length];
    setCompanionCheckIn({
      id: `${currentStepIndex}-${markIndex}-${Date.now()}`,
      text: line,
    });
  };

  const timers = useStepTimers({
    onComplete: handleTimerComplete,
    onCheckIn: handleTimerCheckIn,
  });

  // Visiting a finished step means you've seen it: drop its chip.
  useEffect(() => {
    if (isCooking) timers.acknowledge(currentStepIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, isCooking]);

  const [isVoiceEnabled, setIsVoiceEnabled] = useState(() => {
    try {
      return localStorage.getItem("recipe-voice-enabled") === "true";
    } catch {
      return false;
    }
  });

    // Read through a ref so toggling Hey chef doesn't re-run the effect below
  // (which would re-read the current step every time the mic is switched).
    // Mic on implies speaker on (not the other way round). Derived, so the
  // person's own speaker setting is untouched and returns when the mic goes off.
  const speakerOn = isVoiceEnabled || heyChefActive;
  const readStepsRef = useRef(false);
  readStepsRef.current = speakerOn;

  useEffect(() => {
    if (!isCooking || !readStepsRef.current) return;
    if (!("speechSynthesis" in window)) return;

        window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentStep.instruction);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);

        // On a timed step, tell the person they can start the timer by voice.
    const timerUntouched =
      stepDurationSeconds !== null &&
      !timers.getView(currentStepIndex, stepDurationSeconds).hasStarted;
    if (heyChefActive && timerUntouched) {
      const hint = new SpeechSynthesisUtterance(
        "This step has a timer. Say start timer when you're ready."
      );
      hint.rate = 0.95;
      window.speechSynthesis.speak(hint);
    }

    return () => window.speechSynthesis.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, isCooking, isVoiceEnabled]);

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


  // Assumes dishName is stable/unique enough per recipe; swap for a real
  // recipe.id if one exists in your data model.
  const progressKey = `recipe-progress:${recipe.dishName}`;

  // Restore on mount
  // A pending resume, awaiting the person's confirmation — nothing is
  // applied to isCooking/currentStepIndex until they choose.
  const [resumePrompt, setResumePrompt] = useState<{
    stepIndex: number;
    checkedIngredients: boolean[] | null;
  } | null>(null);

  // Check for saved progress on mount — but don't apply it yet.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(progressKey);
      if (!saved) return;
      const parsed = JSON.parse(saved);

      if (parsed.isCooking && typeof parsed.currentStepIndex === "number") {
        const validIngredients =
          Array.isArray(parsed.checkedIngredients) &&
          parsed.checkedIngredients.length === recipe.ingredients.length;

        setResumePrompt({
          stepIndex: Math.min(parsed.currentStepIndex, recipe.method.length - 1),
          checkedIngredients: validIngredients ? parsed.checkedIngredients : null,
        });
      }
    } catch {
      // Corrupted or inaccessible — nothing to offer, just start fresh.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResumeCooking = () => {
    if (!resumePrompt) return;
    setCurrentStepIndex(resumePrompt.stepIndex);
    if (resumePrompt.checkedIngredients) {
      setCheckedIngredients(resumePrompt.checkedIngredients);
    }
    setIsCooking(true);
    setResumePrompt(null);
    // Give the method card a beat to render (isCooking just flipped to true)
    // before scrolling, so it scrolls to the actual step content, not an
    // empty "Ready when you are" card that's about to be replaced.
    window.setTimeout(() => {
      methodHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleStartFresh = () => {
    try {
      localStorage.removeItem(progressKey);
    } catch {
      // ignore
    }
    setResumePrompt(null);
  };

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

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const methodHeadingRef = useRef<HTMLElement>(null);

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
    timers.clearAll();
    setResumePrompt(null);
    setIsCooking(true);
    setStepDirection("none");
    setCurrentStepIndex(0);
  };

  // Lets someone jump straight to the method from the header without
  // committing to step-by-step mode yet.
  const handleJumpToMethod = () => {
    methodHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

      const handleNextStep = (): boolean => {
    if (currentStepIndex >= recipe.method.length - 1) return false;
    setStepDirection("next");
    setCurrentStepIndex((prev) => prev + 1);
    return true;
  };
  
    const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setStepDirection("prev");
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Taps and swipes (not voice) count towards the "hands busy?" nudge.
  const handleManualNext = () => {
    if (!heyChefActive) setManualNextCount((n) => n + 1);
    handleNextStep();
  };

    /* ----- Hey chef: what each spoken command does ----- */

  const speakNow = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    // Chrome can drop a speak() that lands in the same tick as a cancel().
    window.setTimeout(() => window.speechSynthesis.speak(utterance), 60);
  };

      const LAST_STEP_MESSAGE =
    "That was the last step.||If you're done cooking, it's time for the best part, eating it!";
    const TIMER_STARTED_MESSAGE = "Timer started. I'll remind you once it's over.";

  // The current step's timer, or null when the step has none.
  const currentTimer = () =>
    stepDurationSeconds === null
      ? null
      : {
          seconds: stepDurationSeconds,
          view: timers.getView(currentStepIndex, stepDurationSeconds),
        };

  // Start, pause or resume, same as tapping the button.
  const toggleCurrentTimer = () => {
    const t = currentTimer();
    if (!t || t.view.isDone) return;
    if (t.view.isRunning) {
      timers.pause(currentStepIndex);
      return;
    }
    timers.start(currentStepIndex, t.seconds);
    if (!t.view.hasStarted && (isVoiceEnabled || heyChefActive)) {
      speakNow(TIMER_STARTED_MESSAGE);
    }
  };

    const resetCurrentTimer = () => timers.reset(currentStepIndex);

  // Tapping a timer chip takes you to that step.
  const handleJumpToStep = (step: number) => {
    setStepDirection(step > currentStepIndex ? "next" : "prev");
    setCurrentStepIndex(step);
    methodHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // A returned string is spoken back; returning nothing stays quiet
  // (the step-reading effect reads the new step by itself).
  const heyChefCommands: HeyChefCommands = {
    next: () => {
      if (currentStepIndex >= recipe.method.length - 1) return LAST_STEP_MESSAGE;
      handleNextStep();
    },
    back: () => {
      if (currentStepIndex === 0) return "You're already on the first step.";
      handlePrevStep();
    },
    repeat: () => {
      speakNow(recipe.method[currentStepIndex].instruction);
    },
        yesDone: () => {
      // Still understood after "Hey chef", it just means next now.
      if (currentStepIndex >= recipe.method.length - 1) return LAST_STEP_MESSAGE;
      handleNextStep();
    },
    notYet: () => "Okay, take your time.",
        pauseTimer: () => {
      const t = currentTimer();
      if (!t || t.view.isDone) return "There's no timer running on this step.";
      if (!t.view.hasStarted) return "The timer hasn't started yet.";
      if (!t.view.isRunning) return "The timer's already paused.";
      timers.pause(currentStepIndex);
    },
    resumeTimer: () => {
      // Also what "start timer" does: first start vs. resuming after a pause.
      const t = currentTimer();
      if (!t || t.view.isDone) return "There's no timer on this step.";
      if (t.view.isRunning) return "The timer's already running.";
      timers.start(currentStepIndex, t.seconds);
      return t.view.hasStarted ? "Timer resumed." : TIMER_STARTED_MESSAGE;
    },
    addTime: () => {
      const t = currentTimer();
      if (!t || t.view.isDone) return "There's no timer to add time to.";
      timers.adjust(currentStepIndex, t.seconds, 30);
      return "Added 30 seconds.";
    },
    subtractTime: () => {
      const t = currentTimer();
      if (!t || t.view.isDone) return "There's no timer to take time off.";
      timers.adjust(currentStepIndex, t.seconds, -30);
      return "Took off 30 seconds.";
    },
    timeLeft: () => {
      const t = currentTimer();
      if (t) {
        if (t.view.isDone) return "Time's already up.";
        if (!t.view.hasStarted) return "The timer hasn't started yet.";
        return `${formatSpokenDuration(t.view.remaining)} left.`;
      }
      // No timer on this step: report any running on other steps.
      const running = timers.getBackground(currentStepIndex).filter((x) => x.isRunning);
      if (running.length === 0) return "There's no timer on this step.";
      return running
        .map((x) => `Step ${x.step + 1} has ${formatSpokenDuration(x.remaining)} left.`)
        .join("||");
    },
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

    if (dx < 0) handleManualNext();
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
    const backgroundTimers = isCooking ? timers.getBackground(currentStepIndex) : [];

  // Example phrases for the status line, relevant to the step on screen.
  const heyChefTips =
    stepDurationSeconds !== null
      ? ["start timer", "how much time is left", "pause the timer", "next", "Hey chef, how do I know it's done?"]
      : ["next", "back", "repeat", "Hey chef, how do I know it's done?"];

  const showHandsBusyNudge =
    isCooking && heyChefSupported && !isHeyChefOn && !heyChefNudgeDismissed && manualNextCount >= 3;

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

      {resumePrompt && (
  <div
    role="status"
    className="mb-5 flex items-center gap-3 rounded-2xl border px-3.5 py-3 shadow-sm sm:mb-6 sm:gap-4 sm:px-5 sm:py-4"
    style={{ borderColor: COLOR.border, backgroundColor: COLOR.surface }}
  >
    <ProgressRing current={resumePrompt.stepIndex + 1} total={recipe.method.length} />

    <div className="min-w-0 flex-1">
      <p className="text-[15px] font-semibold leading-tight sm:text-base" style={{ color: COLOR.ink }}>
        Continue cooking
      </p>
    </div>

    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      <button
        type="button"
        onClick={handleStartFresh}
        className="rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 sm:text-sm"
        style={{ color: COLOR.inkSoft }}
      >
        <span className="sm:hidden">Restart</span>
        <span className="hidden sm:inline">Start fresh</span>
      </button>
      <button
        type="button"
        onClick={handleResumeCooking}
        className="rounded-full px-4 py-2 text-[13px] font-semibold transition-colors active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-5 sm:text-sm"
        style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffronDark)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffron)}
      >
        Resume<span className="hidden sm:inline">&nbsp;cooking</span>
      </button>
    </div>
  </div>
)}

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
              className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${isImageLoaded ? "opacity-0" : "animate-pulse opacity-100"
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
              className={`absolute inset-0 h-full w-full cursor-pointer rounded-2xl border object-cover transition-opacity duration-300 ease-out select-none ${imageBounceKey > 0 ? "animate-image-bounce-3d" : ""
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
                        className={`h-3.5 w-3.5 transition-all duration-200 ${checkedIngredients[index] ? "scale-100 opacity-100" : "scale-0 opacity-0"
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
                        className={`block leading-snug ${checkedIngredients[index] ? "line-through" : ""
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
                    className={`rounded-2xl border p-3.5 sm:p-4 ${special && tool.alternative ? "sm:col-span-2" : ""
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
        <section
          ref={methodHeadingRef}
          aria-labelledby="method-heading"
          className="scroll-mt-12 py-10 lg:py-12"
        >
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
                      disabled={heyChefActive}
                      aria-pressed={speakerOn}
                      aria-label={isVoiceEnabled ? "Turn off reading steps aloud" : "Read steps aloud"}
                      title={heyChefActive ? "Speaker stays on while Hey chef is on" : undefined}
                      className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed"
                      style={{
                        borderColor: speakerOn ? COLOR.saffron : COLOR.border,
                        backgroundColor: speakerOn ? COLOR.saffronTint : COLOR.surface,
                        color: speakerOn ? COLOR.saffronDark : COLOR.inkSoft,
                      }}
                    >
                      {speakerOn ? (
                        <SpeakerIcon className="h-4 w-4" />
                      ) : (
                        <SpeakerOffIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ) : undefined
              }
            />

            {heyChefBlockedAt !== null && (
              <p
                role="status"
                className="mb-4 rounded-xl border p-3 text-sm"
                style={{ backgroundColor: COLOR.mustard, borderColor: COLOR.border, color: COLOR.ink }}
              >
                The microphone is blocked. Allow it in your browser&apos;s site settings to
                use Hey chef.
              </p>
            )}

            {isCooking && heyChefSupported && (
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <button
                  type="button"
                  onClick={toggleHeyChef}
                  aria-pressed={isHeyChefOn}
                  aria-label={
                    isHeyChefOn
                      ? "Turn off hands-free voice control"
                      : "Turn on hands-free voice control"
                  }
                  title="Hands-free: say “Hey chef”"
                  className="relative inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2"
                  style={{
                    borderColor: isHeyChefOn ? COLOR.saffron : COLOR.border,
                    backgroundColor: isHeyChefOn ? COLOR.saffronTint : COLOR.surface,
                    color: isHeyChefOn ? COLOR.saffronDark : COLOR.inkSoft,
                  }}
                >
                  <MicIcon className="h-4 w-4" />
                  Hands-free
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                    style={{
                      backgroundColor: isHeyChefOn ? COLOR.saffron : COLOR.border,
                      color: isHeyChefOn ? COLOR.surface : COLOR.inkSoft,
                    }}
                  >
                    {isHeyChefOn ? "ON" : "OFF"}
                  </span>
                  {heyChefActive && heyChefPhase !== "paused" && (
                    <span
                      aria-hidden="true"
                      className={`hey-chef-ring ${heyChefPhase === "awake" ? "is-awake" : ""}`}
                    />
                  )}
                </button>

                {heyChefActive && heyChefPhase !== "off" ? (
                  <span
                    role="status"
                    className="flex min-w-0 items-center gap-2 text-sm font-medium"
                    style={{ color: COLOR.inkSoft }}
                  >
                    <span
                      aria-hidden="true"
                      className={`hey-chef-dot ${heyChefPhase === "awake" ? "is-awake" : ""}`}
                    />
                    <span
                      className={
                        !commandFlash && heyChefPhase === "processing" ? "hey-chef-shimmer" : undefined
                      }
                      style={commandFlash ? { color: COLOR.saffronDark, fontWeight: 600 } : undefined}
                    >
                      {commandFlash
                        ? `✓ ${commandFlash.label}`
                        : heyChefPhase === "sleeping"
                        ? `Try saying “${heyChefTips[heyChefTipIndex % heyChefTips.length]}”`
                        : HEY_CHEF_LABEL[heyChefPhase]}
                    </span>
                  </span>
                ) : (
                  !isHeyChefOn && (
                    <span className="text-sm" style={{ color: COLOR.inkSoft }}>
                      Cook with your voice, no touching the screen
                    </span>
                  )
                )}
              </div>
            )}

            {heyChefActive && !heyChefIntroSeen && (
              <div
                role="status"
                className="mb-4 rounded-2xl border p-4 sm:p-5"
                style={{ borderColor: COLOR.saffron, backgroundColor: COLOR.saffronTint }}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-serif text-lg font-black" style={{ color: COLOR.ink }}>
                    Hands-free is on
                  </p>
                  <button
                    type="button"
                    onClick={dismissHeyChefIntro}
                    className="shrink-0 text-xs font-semibold underline-offset-2 hover:underline"
                    style={{ color: COLOR.inkSoft }}
                  >
                    Got it
                  </button>
                </div>

                <ul className="mt-2 space-y-1.5 text-sm leading-snug" style={{ color: COLOR.ink }}>
                  <li>
                    “<span className="font-semibold">Next</span>” or “
                    <span className="font-semibold">Back</span>” to change steps
                  </li>
                  <li>
                    “<span className="font-semibold">Start the timer</span>” or “
                    <span className="font-semibold">How much time is left?</span>”
                  </li>
                  <li>
                    “<span className="font-semibold">Hey chef</span>, how do I know it&apos;s
                    done?”
                  </li>
                </ul>

                <p className="mt-3 text-sm font-semibold" style={{ color: COLOR.saffronDark }}>
                  Try it now: say “Hey chef”
                </p>
              </div>
            )}
            {!isCooking ? (
  <div
    className="overflow-hidden rounded-3xl border"
    style={{ borderColor: COLOR.saffron, backgroundColor: COLOR.saffronTint }}
  >
    {/* Top: pitch + primary action, side by side, no wasted vertical room */}
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
      <div className="min-w-0">
        <p className="font-serif text-lg font-black leading-tight sm:text-xl" style={{ color: COLOR.ink }}>
          Ready when you are
        </p>
        <p className="mt-0.5 text-sm leading-snug" style={{ color: COLOR.inkSoft }}>
          {totalSteps} steps, one at a time
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

    {/* Bottom: hands-free strip — same card, just a divider, not a second nested box */}
    {heyChefSupported ? (
      <div
        className="flex items-center gap-3 border-t px-5 py-3.5 sm:px-6"
        style={{ borderColor: `${COLOR.saffronDark}22` }}
      >
        <MicIcon className="h-4 w-4 shrink-0" style={{ color: COLOR.saffronDark }} />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug" style={{ color: COLOR.ink }}>
            Cook hands-free
            <span className="ml-1.5 font-normal" style={{ color: COLOR.inkSoft }}>
              - say "Hey chef" for any doubt, move to next step, or timers.
            </span>
          </p>
          {/* {isHeyChefOn && (
            <p className="mt-0.5 text-xs leading-snug" style={{ color: COLOR.inkSoft }}>
              Your browser will ask to use the microphone, and may send audio to its speech service.
            </p>
          )} */}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isHeyChefOn}
          aria-label="Cook hands-free with Hey chef"
          onClick={toggleHeyChef}
          className="relative h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2"
          style={{ backgroundColor: isHeyChefOn ? COLOR.saffron : COLOR.border }}
        >
          <span
            aria-hidden="true"
            className="absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform"
            style={{ transform: isHeyChefOn ? "translateX(20px)" : "translateX(0)" }}
          />
        </button>
      </div>
    ) : (
      <div
        className="border-t px-5 py-3 text-xs sm:px-6"
        style={{ borderColor: `${COLOR.saffronDark}22`, color: COLOR.inkSoft }}
      >
        Voice control isn't supported in this browser. Try Chrome for hands-free cooking.
      </div>
    )}
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
                        view={timers.getView(currentStepIndex, stepDurationSeconds)}
                        voiceHints={heyChefActive}
                        onEnableVoice={heyChefSupported && !isHeyChefOn ? toggleHeyChef : undefined}
                        onToggle={toggleCurrentTimer}
                        onAdjust={(delta) =>
                          timers.adjust(currentStepIndex, stepDurationSeconds, delta)
                        }
                        onReset={resetCurrentTimer}
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
                                        className={`${secondaryButton} flex-1 sm:flex-none`}
                    style={{ borderColor: COLOR.border, color: COLOR.ink, backgroundColor: COLOR.surface }}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span>Previous</span>
                  </button>

                                              {!isLastStep ? (
                    <button
                      type="button"
                      onClick={handleManualNext}
                      className={`${primaryButton} flex-1 sm:flex-none sm:px-8`}
                      style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffronDark)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.saffron)}
                    >
                      Next
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          localStorage.removeItem(progressKey);
                        } catch {
                          // ignore
                        }
                        timers.clearAll();
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

                {showHandsBusyNudge && (
                  <div
                    role="status"
                    className="mt-3 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm"
                    style={{ borderColor: COLOR.border, backgroundColor: COLOR.mustard, color: COLOR.ink }}
                  >
                    <span className="shrink-0" style={{ color: COLOR.saffron }}>
                      <MicIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      Hands busy? Turn on hands-free and just say “next”.
                    </span>
                    <button
                      type="button"
                      onClick={toggleHeyChef}
                      className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ backgroundColor: COLOR.saffron, color: COLOR.surface }}
                    >
                      Turn on
                    </button>
                    <button
                      type="button"
                      onClick={dismissHeyChefNudge}
                      aria-label="Dismiss"
                      className="shrink-0 text-lg leading-none"
                      style={{ color: COLOR.inkSoft }}
                    >
                      ×
                    </button>
                  </div>
                )}
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

      {isCooking && <TimerChips items={backgroundTimers} onJump={handleJumpToStep} />}

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
        checkInMessage={companionCheckIn}
                heyChef={{
          enabled: heyChefActive,
          commands: heyChefCommands,
          onPhaseChange: setHeyChefPhase,
          onMicBlocked: handleHeyChefBlocked,
          onCommand: handleHeyChefCommand,
        }}
      />
    </div>
  );
};

export default RecipeDisplay;