import React, { useEffect, useRef, useState } from "react";
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

const AVATAR_COUNT = 6;
const AVATAR_COLORS = ["#FC6C26", "#6366F1", "#10B981", "#F472B6", "#38BDF8", "#FBBF24"];
const DRAG_DISMISS_THRESHOLD = 90;

const makeInitialPeople = (): NegotiatorPerson[] =>
  Array.from({ length: AVATAR_COUNT }, (_, i) => ({
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

const AvatarFace: React.FC<{ color: string; className?: string; style?: React.CSSProperties }> = ({ color, className, style }) => (
  <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
    <circle cx="20" cy="20" r="20" fill={color} />
    <circle cx="14" cy="17" r="2.2" fill="#1C1917" />
    <circle cx="26" cy="17" r="2.2" fill="#1C1917" />
    <path d="M13 25c2 2.5 12 2.5 14 0" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

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

const DinnerNegotiator: React.FC<DinnerNegotiatorProps> = ({ region, isOpen, onClose, onViewRestaurant }) => {
  const [people, setPeople] = useState<NegotiatorPerson[]>(makeInitialPeople);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("collecting");
  const [matches, setMatches] = useState<RestaurantMatch[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  useLockBodyScroll(isOpen);
  const { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd } = useDragToDismiss(onClose);

  if (!isOpen) return null;

  const answeredPeople = people.filter((p) => p.answered);
  const activePerson = activeIndex !== null ? people[activeIndex] : null;

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
  };

  const topPick = matches[0];
  const otherPicks = matches.slice(1, 6);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="flex h-[78vh] w-full max-w-lg flex-col rounded-t-3xl border border-stone-700 bg-stone-900 sm:h-auto sm:max-h-[80vh] sm:rounded-3xl"
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
        </div>

        {/* Content — scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {phase === "collecting" && (
            <>
              <p className="text-sm text-stone-400">Tap to choose preferences.</p>

              <div className="mt-5 grid grid-cols-2 gap-y-5 sm:grid-cols-6">
                {people.map((person, i) => (
                  <button key={person.id} type="button" onClick={() => setActiveIndex(i)} className="flex flex-col items-center gap-1.5">
                    <div className="relative">
                      <AvatarFace
                        color={AVATAR_COLORS[i]}
                        className={`h-14 w-14 rounded-full ring-2 ${person.answered ? "ring-orange-300" : "opacity-50 ring-stone-700"}`}
                      />
                      {person.answered && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-200 text-stone-900">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    <span className="max-w-[64px] truncate text-xs text-stone-300">{person.name}</span>
                  </button>
                ))}
              </div>

              {searchError && <p className="mt-4 text-sm text-stone-400">{searchError}</p>}
            </>
          )}

          {phase === "negotiating" && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="flex gap-2">
                {answeredPeople.map((p, i) => (
                  <AvatarFace
                    key={p.id}
                    color={AVATAR_COLORS[p.avatarIndex]}
                    className="h-9 w-9 animate-bounce rounded-full"
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
                        <AvatarFace key={person.id} color={AVATAR_COLORS[person.avatarIndex]} className="h-7 w-7 rounded-full border-2 border-stone-950" />
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

      {activePerson && <PersonForm person={activePerson} color={AVATAR_COLORS[activePerson.avatarIndex]} onSave={savePerson} onCancel={() => setActiveIndex(null)} />}
    </div>,
    document.body
  );
};

const PersonForm: React.FC<{
  person: NegotiatorPerson;
  color: string;
  onSave: (person: NegotiatorPerson) => void;
  onCancel: () => void;
}> = ({ person, color, onSave, onCancel }) => {
  const [name, setName] = useState(person.name);
  const [cuisine, setCuisine] = useState<CuisineChoice>(person.cuisine);
  const [budget, setBudget] = useState<BudgetChoice>(person.budget);
  const [note, setNote] = useState(person.note);

  const { dragY, isDragging, handleDragStart, handleDragMove, handleDragEnd } = useDragToDismiss(onCancel);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" onClick={onCancel}>
      <div
        className="flex max-h-[82vh] w-full max-w-sm flex-col rounded-t-3xl border border-stone-700 bg-stone-900 sm:max-h-[85vh] sm:rounded-3xl"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? "none" : "transform 0.2s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — fixed */}
        <div
          className="shrink-0 cursor-grab touch-none px-5 pb-1 pt-3 active:cursor-grabbing sm:cursor-auto sm:px-6"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-stone-700 sm:hidden" aria-hidden="true" />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <AvatarFace color={color} className="h-11 w-11 shrink-0 rounded-full" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-32 rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm font-semibold text-stone-100 outline-none focus:border-orange-400"
              />
            </div>
            <span className="pt-2.5 text-[10px] font-medium uppercase tracking-wide text-stone-500">Preferences</span>
          </div>
        </div>

        {/* Content — scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Cuisine</p>
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

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-stone-500">Budget per person</p>
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

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-stone-500">Anything else?</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="No seafood, kid-friendly, quiet..."
            rows={2}
            className="mt-2 w-full resize-none rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-600 focus:border-orange-400"
          />
        </div>

        {/* Footer — fixed, Save always reachable */}
        <div className="shrink-0 border-t border-stone-800 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => onSave({ ...person, name: name.trim() || person.name, cuisine, budget, note, answered: true })}
            className="w-full rounded-xl bg-orange-200 px-4 py-2.5 text-sm font-semibold text-stone-900"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DinnerNegotiator;