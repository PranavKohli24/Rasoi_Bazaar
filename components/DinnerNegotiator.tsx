import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { searchDineoutRestaurants, DineoutRestaurant } from "../services/dineoutService";
import { IndiaRegion, getRegionCoordinates, getRegionCuisineQuery } from "../utils/indiaRegions";
import {
  NegotiatorPerson,
  CuisineChoice,
  BudgetChoice,
  CUISINE_OPTIONS,
  BUDGET_OPTIONS,
  BUDGET_LABELS,
  RestaurantMatch,
  rankRestaurants,
  distinctCuisinePicks,
} from "../utils/dinnerNegotiatorMatch";

const INITIAL_PEOPLE_COUNT = 2;
const MAX_PEOPLE = 8;
const AVATAR_COLORS = ["#FC6C26", "#6366F1", "#10B981", "#F472B6", "#38BDF8", "#FBBF24",   "#64748B",   "#795548"];
const DRAG_DISMISS_THRESHOLD = 90;
const POPOVER_WIDTH = 340;
const POPOVER_MARGIN = 16;
const POPOVER_GAP = 10;
const POPOVER_MIN_HEIGHT = 220;
const POPOVER_MAX_HEIGHT = 440;

const personLabel = (index: number) => {
  let value = index;
  let label = "";

  do {
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);

  return label;
};

const makeInitialPeople = (): NegotiatorPerson[] =>
  Array.from({ length: INITIAL_PEOPLE_COUNT }, (_, i) => ({
    id: `person-${i}`,
    name: `Person ${String.fromCharCode(65 + i)}`,
    avatarIndex: i,
    cuisine: "Any",
    budget: "any",
    note: "",
    answered: false,
  }));

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 10l4 4 8-8" />
  </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M10 4v12M4 10h12" />
  </svg>
);

const AvatarFace: React.FC<{
  color: string;
  className?: string;
  style?: React.CSSProperties;
  blinkKey?: number;
  answered?: boolean;
  look?: NaturalLookRender;
}> = ({ color, className, style, blinkKey = 0, answered = false, look }) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");

  const sphereGradient = `${id}-sphere`;
  const edgeShade = `${id}-edge`;
  const topLight = `${id}-top-light`;
  const bottomLight = `${id}-bottom-light`;
  const shadowFilter = `${id}-shadow`;
  const blurFilter = `${id}-blur`;

    const svgStyle: React.CSSProperties = look
    ? { ...style, transform: `translate(${look.headX * 4}px, ${look.headY * 3.2}px) rotate(${look.headRot}deg)` }
    : style ?? {};

  const eyesPositionTransform = `translate(${(look?.eyeX ?? 0) * 7.5}, ${(look?.eyeY ?? 0) * 5.5})`;
  const eyesSquintScale = 1 - (look?.squint ?? 0) * 0.3;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={svgStyle}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main sphere: bright at the upper-left, naturally darker at the edge. */}
        <radialGradient id={sphereGradient} cx="30%" cy="22%" r="82%">
          <stop offset="0%" stopColor={color} />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor="#171923" stopOpacity="0.48" />
        </radialGradient>

        {/* Adds the rounded falloff that makes the face read as a sphere. */}
        <radialGradient id={edgeShade} cx="35%" cy="28%" r="78%">
          <stop offset="42%" stopColor="#000000" stopOpacity="0" />
          <stop offset="75%" stopColor="#15151D" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#101019" stopOpacity="0.52" />
        </radialGradient>

        {/* Broad, soft studio reflection. */}
        <radialGradient id={topLight} cx="30%" cy="19%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.48" />
          <stop offset="38%" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* A little reflected light keeps the lower edge from looking cut out. */}
        <radialGradient id={bottomLight} cx="22%" cy="90%" r="58%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        <filter id={shadowFilter} x="-50%" y="-100%" width="200%" height="300%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        <filter id={blurFilter}>
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Soft contact shadow beneath the sphere. */}
      <ellipse
        cx="50"
        cy="93"
        rx="29"
        ry="3.5"
        fill="#18202B"
        opacity="0.23"
        filter={`url(#${shadowFilter})`}
      />

      {/* Sphere body and layered lighting. */}
      <circle cx="50" cy="47" r="44" fill={`url(#${sphereGradient})`} />
      <circle cx="50" cy="47" r="44" fill={`url(#${edgeShade})`} />
      <circle cx="50" cy="47" r="44" fill={`url(#${topLight})`} />
      <circle cx="50" cy="47" r="44" fill={`url(#${bottomLight})`} />

      {/* Glossy reflection and small specular highlight. */}
      <ellipse
        cx="34"
        cy="19"
        rx="16"
        ry="7"
        transform="rotate(-28 34 19)"
        fill="#FFFFFF"
        opacity="0.23"
        filter={`url(#${blurFilter})`}
      />
      <ellipse
        cx="34"
        cy="17"
        rx="5.5"
        ry="2.6"
        transform="rotate(-28 34 17)"
        fill="#FFFFFF"
        opacity="0.48"
      />

      {/* Fine rim light along the silhouette. */}
      <circle
        cx="50"
        cy="47"
        r="43.3"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.23"
        strokeWidth="1"
      />

      {/* Very subtle cheek warmth. */}
      <g filter={`url(#${blurFilter})`}>
        <ellipse cx="27" cy="55" rx="7" ry="4" fill="#F18B89" opacity="0.22" />
        <ellipse cx="73" cy="55" rx="7" ry="4" fill="#F18B89" opacity="0.22" />
      </g>

      {/* Eyes blink together when this avatar is tapped. */}
      <g transform={eyesPositionTransform}>
        <g
          key={blinkKey}
          className={blinkKey > 0 ? "negotiator-avatar-blink" : ""}
          style={{ transform: `scaleY(${eyesSquintScale})`, transformBox: "fill-box", transformOrigin: "center" }}
        >
          <g fill="#29252B">
            <ellipse cx="36" cy="43" rx="3.7" ry="4.5" />
            <ellipse cx="64" cy="43" rx="3.7" ry="4.5" />
          </g>
          <g fill="#FFFFFF" opacity="0.8">
            <circle cx="35" cy="41.5" r="1.1" />
            <circle cx="63" cy="41.5" r="1.1" />
          </g>
        </g>
      </g>

      {/* Slightly wider smile once this person has answered. */}
      <path
        d={answered ? "M32 60.5 Q50 78 68 60.5" : "M36 60.5 Q50 71.5 64 60.5"}
        fill="none"
        stroke="#17131A"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.16"
      />
      <path
        d={answered ? "M32 59 Q50 76 68 59" : "M36 59 Q50 70 64 59"}
        fill="none"
        stroke="#30262B"
        strokeWidth={answered ? "3.2" : "2.8"}
        strokeLinecap="round"
      />
    </svg>
  );
};

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
    <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5Z" />
  </svg>
);

function useDragToDismiss(onDismiss: () => void) {
  const dragStartYRef = useRef<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button, input, textarea")) return;
    dragStartYRef.current = event.clientY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    setDragY(Math.max(0, event.clientY - dragStartYRef.current));
  };

  const handleDragEnd = () => {
    if (dragStartYRef.current === null) return;
    dragStartYRef.current = null;
    setIsDragging(false);
    if (dragY > DRAG_DISMISS_THRESHOLD) {
      onDismiss();
    }
    setDragY(0);
  };

  return { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd };
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

interface DinnerNegotiatorProps {
  region: IndiaRegion;
  isOpen: boolean;
  onClose: () => void;
  onViewRestaurant: (restaurant: DineoutRestaurant) => void;
}

type Phase = "collecting" | "negotiating" | "results";

interface PopoverPos {
  left: number;
  width: number;
  tailLeft: number;
  maxHeight: number;
  placement: "below" | "above";
  top?: number;
  bottom?: number;
}

const DinnerNegotiator: React.FC<DinnerNegotiatorProps> = ({ region, isOpen, onClose, onViewRestaurant }) => {
  const [people, setPeople] = useState<NegotiatorPerson[]>(makeInitialPeople);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [avatarBlink, setAvatarBlink] = useState({ personId: "", key: 0 });
  const [phase, setPhase] = useState<Phase>("collecting");
  const [matches, setMatches] = useState<RestaurantMatch[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Monotonic counter prevents ID and avatar-color reuse after someone is removed.
  const nextPersonIndexRef = useRef(INITIAL_PEOPLE_COUNT);

  const dialogRef = useRef<HTMLDivElement>(null);
  const avatarButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [popoverPos, setPopoverPos] = useState<PopoverPos | null>(null);
  const placementRef = useRef<"below" | "above" | null>(null);

  useLockBodyScroll(isOpen);
  const { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd } = useDragToDismiss(onClose);

  const activePerson = activeIndex !== null ? people[activeIndex] : null;

  // Anchor the popover to whichever avatar was tapped: find its position
  // relative to the dialog panel, then clamp the card so it stays inside
  // the panel's padding even when the avatar is near an edge.
    // Anchor the popover to whichever avatar was tapped. Width grows to the
  // right of the avatar's left edge (clamped to the dialog). Placement
  // flips above the avatar when there isn't enough room below, so the
  // card — and its Save button — never gets cut off by the screen edge.
  useLayoutEffect(() => {
    // Fresh decision for whichever person is now active (or none).
    placementRef.current = null;

    if (!activePerson) {
      setPopoverPos(null);
      return;
    }

    const recompute = () => {
      const dialogEl = dialogRef.current;
      const avatarEl = avatarButtonRefs.current.get(activePerson.id);
      if (!dialogEl || !avatarEl) return;

      const dialogRect = dialogEl.getBoundingClientRect();
      const avatarRect = avatarEl.getBoundingClientRect();

      // visualViewport reflects the area actually visible once the keyboard
      // is open; window.innerHeight does not shrink on most mobile browsers,
      // which is what let the card compute space it no longer had.
      const viewport = window.visualViewport;
      const viewportTop = viewport?.offsetTop ?? 0;
      const viewportBottom = viewportTop + (viewport?.height ?? window.innerHeight);

      const width = Math.min(POPOVER_WIDTH, dialogRect.width - POPOVER_MARGIN * 2);

      let left = avatarRect.left - dialogRect.left;
      left = Math.max(POPOVER_MARGIN, Math.min(left, dialogRect.width - width - POPOVER_MARGIN));

      const avatarCenterX = avatarRect.left - dialogRect.left + avatarRect.width / 2;
      const tailLeft = Math.max(20, Math.min(avatarCenterX - left, width - 20));

      const spaceBelow = viewportBottom - avatarRect.bottom - POPOVER_GAP - POPOVER_MARGIN;
      const spaceAbove = avatarRect.top - viewportTop - POPOVER_GAP - POPOVER_MARGIN;

      // Decide above/below once, before any keyboard is up. A keyboard
      // appearing afterwards should shrink the card, never flip it.
      if (placementRef.current === null) {
        placementRef.current = spaceBelow < POPOVER_MIN_HEIGHT && spaceAbove > spaceBelow ? "above" : "below";
      }

      if (placementRef.current === "above") {
        setPopoverPos({
          left,
          width,
          tailLeft,
          placement: "above",
          maxHeight: Math.max(120, Math.min(POPOVER_MAX_HEIGHT, spaceAbove)),
          bottom: dialogRect.bottom - avatarRect.top + POPOVER_GAP,
        });
      } else {
        setPopoverPos({
          left,
          width,
          tailLeft,
          placement: "below",
          maxHeight: Math.max(120, Math.min(POPOVER_MAX_HEIGHT, spaceBelow)),
          top: avatarRect.bottom - dialogRect.top + POPOVER_GAP,
        });
      }
    };

    recompute();
    window.addEventListener("resize", recompute);
    window.visualViewport?.addEventListener("resize", recompute);
    window.visualViewport?.addEventListener("scroll", recompute);
    return () => {
      window.removeEventListener("resize", recompute);
      window.visualViewport?.removeEventListener("resize", recompute);
      window.visualViewport?.removeEventListener("scroll", recompute);
    };
  }, [activePerson]);

  if (!isOpen) return null;

  const answeredPeople = people.filter((p) => p.answered);

  const toggleAvatar = (i: number) => {
    const person = people[i];

    if (person) {
      setAvatarBlink((prev) => ({
        personId: person.id,
        key: prev.key + 1,
      }));
    }

    setActiveIndex((current) => (current === i ? null : i));
  };


  const addPerson = () => {
    if (people.length >= MAX_PEOPLE) return;

    const nextIndex = nextPersonIndexRef.current++;
    const newPerson: NegotiatorPerson = {
      id: `person-${nextIndex}`,
      name: `Person ${personLabel(nextIndex)}`,
      avatarIndex: nextIndex,
      cuisine: "Any",
      budget: "any",
      note: "",
      answered: false,
    };
    setPeople((prev) => [...prev, newPerson]);
    setActiveIndex(people.length);
  };

  const savePerson = (updated: NegotiatorPerson) => {
    setPeople((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setActiveIndex(null);
  };

  const runNegotiation = async () => {
    setPhase("negotiating");
    setSearchError(null);

    const { lat, lng } = getRegionCoordinates(region);
    const cuisines = distinctCuisinePicks(answeredPeople);
    const queries = cuisines.length > 0 ? cuisines.slice(0, 3) : [getRegionCuisineQuery(region)];

    try {
      const results = await Promise.all(
        queries.map((q) => searchDineoutRestaurants(q, lat, lng).catch(() => [] as DineoutRestaurant[]))
      );
      const merged = results.flat();

      if (merged.length === 0) {
        setSearchError("Couldn't find restaurants to match against right now.");
        setPhase("collecting");
        return;
      }

      setMatches(rankRestaurants(merged, answeredPeople));
      setPhase("results");
    } catch {
      setSearchError("Couldn't reach Swiggy Dineout. Please try again.");
      setPhase("collecting");
    }
  };

  const resetAll = () => {
    setPeople(makeInitialPeople());
    setMatches([]);
    setPhase("collecting");
    setSearchError(null);
    setActiveIndex(null);
  };

  const topPick = matches[0];
  const otherPicks = matches.slice(1, 6);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="relative flex h-[78vh] w-full max-w-lg flex-col rounded-t-3xl border border-stone-700 bg-stone-900 sm:h-auto sm:max-h-[80vh] sm:rounded-3xl"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? "none" : "transform 0.2s ease",
          opacity: 1 - Math.min(dragY / 400, 0.4),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — fixed */}
        <div
          className="shrink-0 cursor-grab touch-none rounded-t-3xl border-b border-stone-800 px-5 pb-4 pt-3 active:cursor-grabbing sm:cursor-auto sm:px-6"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-stone-700 sm:hidden" aria-hidden="true" />
          <p className="text-xs font-semibold text-orange-200">Dinner Negotiator</p>
          <h3 className="font-serif text-xl font-black text-orange-50">
            {phase === "results" ? "Here's your table" : `Where should we eat in ${region.name}?`}
          </h3>

          {phase === "collecting" && (
            <>
              <div className="mt-4 flex flex-wrap items-start gap-4">
                {people.map((person, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <div key={person.id} className="relative flex w-14 flex-col items-center gap-1.5">
                      <button
                        ref={(el) => {
                          if (el) avatarButtonRefs.current.set(person.id, el);
                          else avatarButtonRefs.current.delete(person.id);
                        }}
                        type="button"
                        onClick={() => toggleAvatar(i)}
                        aria-label={`Edit ${person.name}'s preferences`}
                        className="flex w-14 flex-col items-center"
                      >
                        <div className="relative">
                          <AvatarFace
                            color={AVATAR_COLORS[person.avatarIndex % AVATAR_COLORS.length]}
                            blinkKey={avatarBlink.personId === person.id ? avatarBlink.key : 0}
                            answered={person.answered}
                            className={`h-14 w-14 rounded-full transition-all duration-200 ${
                              isActive
                                ? "scale-110 ring-4 ring-orange-400"
                                : person.answered
                                ? "ring-2 ring-orange-300"
                                : "opacity-60 ring-2 ring-stone-700"
                            }`}
                          />
                          {person.answered && (
                            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-200 text-stone-900">
                              <CheckIcon className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                        <span className="mt-1.5 max-w-[60px] truncate text-center text-xs text-stone-300">{person.name}</span>
                      </button>

                    </div>
                  );
                })}

                {people.length < MAX_PEOPLE && (
                  <button type="button" onClick={addPerson} className="flex w-14 flex-col items-center gap-1.5">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-stone-700 text-stone-400 transition-colors hover:border-orange-400 hover:text-orange-200">
                      <PlusIcon className="h-5 w-5" />
                    </span>
                    <span className="text-xs text-stone-500">Add</span>
                  </button>
                )}
              </div>

              <p className="mt-3 text-xs text-stone-500">Tap an avatar to set their picks.</p>
            </>
          )}
        </div>

        {/* Floating preference popover — anchored to the tapped avatar's
            position, independent of header/content scroll. */}
        {phase === "collecting" && activePerson && popoverPos && (
          <PersonBubble
            key={activePerson.id}
            person={activePerson}
            color={AVATAR_COLORS[activePerson.avatarIndex % AVATAR_COLORS.length]}
            pos={popoverPos}
            onSave={savePerson}
            onCancel={() => setActiveIndex(null)}
          />
        )}

        {/* Content — scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {phase === "collecting" && searchError && <p className="text-sm text-stone-400">{searchError}</p>}

          {phase === "negotiating" && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="flex gap-2">
                {answeredPeople.map((p, i) => (
                  <AvatarFace
                    key={p.id}
                    color={AVATAR_COLORS[p.avatarIndex % AVATAR_COLORS.length]}
                    answered={p.answered}
                    className="h-9 w-9 animate-bounce"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
              <p className="mt-5 font-serif text-lg font-black text-orange-50">Finding your table</p>
              <p className="mt-1 text-sm text-stone-400">Matching everyone's picks</p>
            </div>
          )}

          {phase === "results" && (
            <>
              {topPick ? (
                <div className="rounded-2xl border border-orange-400/50 bg-stone-950 p-4 sm:p-5">
                  <span className="inline-block rounded-full bg-orange-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-900">
                    {topPick.matchCount === topPick.totalPeople ? "Matches everyone" : `${topPick.matchCount}/${topPick.totalPeople} matched`}
                  </span>
                  <h4 className="mt-2 font-serif text-xl font-black text-orange-50">{topPick.restaurant.name}</h4>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-400">
                    {topPick.restaurant.ratingValue && (
                      <span className="flex items-center gap-1 font-semibold text-orange-200">
                        <StarIcon className="h-3.5 w-3.5" />
                        {topPick.restaurant.ratingValue}
                      </span>
                    )}
                    {topPick.restaurant.costForTwo && <span>{topPick.restaurant.costForTwo}</span>}
                    {topPick.restaurant.area && <span>{topPick.restaurant.area}</span>}
                  </div>
                  <div className="mt-3 flex -space-x-2">
                    {topPick.matchedNames.map((name) => {
                      const person = people.find((p) => p.name === name);
                      return person ? (
                        <AvatarFace key={person.id} color={AVATAR_COLORS[person.avatarIndex % AVATAR_COLORS.length]} answered={person.answered}
                          className="h-7 w-7 border-2 border-stone-950" />
                      ) : null;
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => onViewRestaurant(topPick.restaurant)}
                    className="mt-4 w-full rounded-xl bg-orange-200 px-5 py-2.5 text-sm font-semibold text-stone-900"
                  >
                    View details
                  </button>
                </div>
              ) : (
                <p className="text-sm text-stone-400">Couldn't find a match this time.</p>
              )}

              {otherPicks.length > 0 && (
                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">Also worth a look</p>
                  <div className="space-y-2">
                    {otherPicks.map((m) => (
                      <button
                        key={m.restaurant.id}
                        type="button"
                        onClick={() => onViewRestaurant(m.restaurant)}
                        className="flex w-full items-center justify-between gap-3 rounded-xl border border-stone-800 bg-stone-950 px-3.5 py-2.5 text-left"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-stone-100">{m.restaurant.name}</p>
                          <p className="text-xs text-stone-500">
                            {m.matchCount}/{m.totalPeople} matched · {m.restaurant.costForTwo || "—"}
                          </p>
                        </div>
                        {m.restaurant.ratingValue && (
                          <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-orange-200">
                            <StarIcon className="h-3 w-3" />
                            {m.restaurant.ratingValue}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer — fixed, holds the phase's main action */}
        {phase === "collecting" && (
          <div className="shrink-0 border-t border-stone-800 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={runNegotiation}
              disabled={answeredPeople.length < 2}
              className="w-full rounded-xl bg-orange-200 px-5 py-3 text-sm font-semibold text-stone-900 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {answeredPeople.length < 2
                ? `Need ${2 - answeredPeople.length} more ${answeredPeople.length === 1 ? "answer" : "answers"}`
                : "Find our table"}
            </button>
          </div>
        )}

        {phase === "results" && (
          <div className="shrink-0 border-t border-stone-800 px-5 py-4 sm:px-6">
            <button type="button" onClick={resetAll} className="w-full rounded-xl border border-stone-700 px-5 py-2.5 text-sm font-medium text-stone-300 hover:text-orange-200">
              Start over
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

interface LookVector {
  x: number;
  y: number;
}

interface NaturalLookRender {
  headX: number;
  headY: number;
  headRot: number;
  eyeX: number;
  eyeY: number;
  squint: number;
}

function useFocusLook(anchorRef: React.RefObject<HTMLElement | null>) {
  const [render, setRender] = useState<NaturalLookRender>({
    headX: 0, headY: 0, headRot: 0, eyeX: 0, eyeY: 0, squint: 0,
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const stateRef = useRef({ headX: 0, headY: 0, headVX: 0, headVY: 0, eyeX: 0, eyeY: 0, eyeVX: 0, eyeVY: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const startRef = useRef(performance.now());
  const idleRecenterTimeoutRef = useRef<number | null>(null);

  const IDLE_RECENTER_MS = 4000;
  const scheduleIdleRecenter = () => {
    if (idleRecenterTimeoutRef.current) window.clearTimeout(idleRecenterTimeoutRef.current);
    idleRecenterTimeoutRef.current = window.setTimeout(() => {
      targetRef.current = { x: 0, y: 0 };
    }, IDLE_RECENTER_MS);
  };

  useEffect(() => () => {
    if (idleRecenterTimeoutRef.current) window.clearTimeout(idleRecenterTimeoutRef.current);
  }, []);

  useEffect(() => {
    const tick = (now: number) => {
      const t = (now - startRef.current) / 1000;
      // Tiny continuous breathing so it's not frozen — not a retarget, just texture.
      const breatheX = Math.sin(t * 0.8) * 0.015;
      const breatheY = Math.sin(t * 0.6 + 1) * 0.012;
      const tx = Math.max(-1, Math.min(1, targetRef.current.x + breatheX));
      const ty = Math.max(-1, Math.min(1, targetRef.current.y + breatheY));

      const s = stateRef.current;
      s.eyeVX += (tx - s.eyeX) * 0.28; s.eyeVX *= 0.62; s.eyeX += s.eyeVX;
      s.eyeVY += (ty - s.eyeY) * 0.28; s.eyeVY *= 0.62; s.eyeY += s.eyeVY;
      s.headVX += (tx - s.headX) * 0.05; s.headVX *= 0.80; s.headX += s.headVX;
      s.headVY += (ty - s.headY) * 0.05; s.headVY *= 0.80; s.headY += s.headVY;

      setRender({
        headX: s.headX, headY: s.headY, headRot: s.headX * 6,
        eyeX: s.eyeX, eyeY: s.eyeY,
        squint: Math.min(1, Math.abs(s.eyeX) * 0.6 + Math.abs(s.eyeY) * 0.35),
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const GAZE_RADIUS_PX = 220;

  const aimAt = (clientX: number, clientY: number) => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ax = rect.left + rect.width / 2;
    const ay = rect.top + rect.height / 2;
    targetRef.current = {
      x: Math.max(-1, Math.min(1, (clientX - ax) / GAZE_RADIUS_PX)),
      y: Math.max(-1, Math.min(1, (clientY - ay) / GAZE_RADIUS_PX)),
    };
    scheduleIdleRecenter();
  };

  // Settle on whatever field gets focus.
  const handleFocusCapture = (event: React.FocusEvent) => {
    const el = event.target as HTMLElement;
    if (typeof el.getBoundingClientRect !== "function") return;
    const rect = el.getBoundingClientRect();
    aimAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  // While typing, nudge horizontally toward the caret's rough position in the field.
  const handleInputCapture = (event: React.FormEvent) => {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (typeof el.selectionStart !== "number" || !el.value) return;
    const rect = el.getBoundingClientRect();
    const fraction = Math.min(1, el.selectionStart / Math.max(el.value.length, 1));
    aimAt(rect.left + rect.width * fraction, rect.top + rect.height / 2);
  };

  // A tap on a chip/button aims there directly.
  const handleTap = (clientX: number, clientY: number) => aimAt(clientX, clientY);


  return { render, handleFocusCapture, handleInputCapture, handleTap };
}

// Tapping the avatar itself: blink, smile briefly, revert — fully self-contained.
function useAvatarPoke() {
  const [blinkKey, setBlinkKey] = useState(0);
  const [smiling, setSmiling] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const poke = () => {
    setBlinkKey((k) => k + 1);
    setSmiling(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setSmiling(false), 550);
  };

  useEffect(() => () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); }, []);
  return { blinkKey, smiling, poke };
}

/** Floating preference card, absolutely positioned near whichever avatar was
 *  tapped, with a tail pointing up at it. */
const PersonBubble: React.FC<{
  person: NegotiatorPerson;
  color: string;
  pos: PopoverPos;
  onSave: (person: NegotiatorPerson) => void;
  onCancel: () => void;
}> = ({ person, color, pos, onSave, onCancel }) => {
  const [name, setName] = useState(person.name);
  const [cuisine, setCuisine] = useState<CuisineChoice>(person.cuisine);
  const [budget, setBudget] = useState<BudgetChoice>(person.budget);
  const [note, setNote] = useState(person.note);

  const cardRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const { render: look, handleFocusCapture, handleInputCapture, handleTap } = useFocusLook(avatarButtonRef);
  const { blinkKey: pokeBlinkKey, smiling, poke } = useAvatarPoke();

  return (
    <div
      className="absolute z-20 animate-fade-in-up"
      style={{
        left: pos.left,
        width: pos.width,
        top: pos.placement === "below" ? pos.top : undefined,
        bottom: pos.placement === "above" ? pos.bottom : undefined,
        animationDuration: "0.2s",
      }}
    >
      <span
        aria-hidden="true"
        className={`absolute h-4 w-4 -translate-x-1/2 rotate-45 border-orange-400/50 bg-stone-950 ${
          pos.placement === "below" ? "-top-2 border-l border-t" : "-bottom-2 border-r border-b"
        }`}
        style={{ left: pos.tailLeft }}
      />

      <div
        ref={cardRef}
        onFocusCapture={(e) => {
          handleFocusCapture(e);
          const el = e.target as HTMLElement;
          // Give the keyboard time to finish animating in before scrolling,
          // so the field doesn't get nudged to a now-stale position.
          window.setTimeout(() => el.scrollIntoView({ block: "nearest", behavior: "smooth" }), 300);
        }}
        onInputCapture={handleInputCapture}
        onPointerDownCapture={(e) => {
          if (avatarButtonRef.current?.contains(e.target as Node)) return;
          handleTap(e.clientX, e.clientY);
        }}
        className="relative overflow-y-auto overscroll-contain rounded-2xl border border-orange-400/40 bg-stone-950 p-4 shadow-xl shadow-black/40 [-ms-overflow-style:none] [scrollbar-width:none] sm:p-5 [&::-webkit-scrollbar]:hidden"
        style={{ maxHeight: pos.maxHeight }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <button
              ref={avatarButtonRef}
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={poke}
              aria-label={`${person.name}'s avatar`}
              className="shrink-0"
            >
              <AvatarFace
                color={color}
                answered={person.answered || smiling}
                look={look}
                blinkKey={pokeBlinkKey}
                className="h-10 w-10"
              />
            </button>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-32 rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-sm font-semibold text-stone-100 outline-none focus:border-orange-400"
            />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="pt-1.5 text-[10px] font-medium uppercase tracking-wide text-stone-500 hover:text-stone-300"
          >
            Close ✕
          </button>
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone-500">Cuisine</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCuisine(option)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                cuisine === option ? "border-orange-400 bg-orange-200 text-stone-900" : "border-stone-700 text-stone-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone-500">Budget per person</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBudget(option)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                budget === option ? "border-orange-400 bg-orange-200 text-stone-900" : "border-stone-700 text-stone-300"
              }`}
            >
              {BUDGET_LABELS[option]}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone-500">Anything else?</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="No seafood, kid-friendly, quiet..."
          rows={2}
          className="mt-2 w-full resize-none rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-600 focus:border-orange-400"
        />

        <button
          type="button"
          onClick={() => onSave({ ...person, name: name.trim() || person.name, cuisine, budget, note, answered: true })}
          className="mt-5 w-full rounded-xl bg-orange-200 px-4 py-2.5 text-sm font-semibold text-stone-900"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DinnerNegotiator;