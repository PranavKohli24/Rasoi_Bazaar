import React, { useEffect, useRef, useState } from "react";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";

interface WheelDish {
  id: string;
  label: string;
  recipes: string[];
}

const DISHES: WheelDish[] = [
  { id: "dal", label: "Dal", recipes: ["Dal Tadka", "Dal Makhani", "Moong Dal Cheela"] },
  { id: "burger", label: "Burger", recipes: ["Veg Burger", "Paneer Burger", "Chicken Burger"] },
  { id: "sandwich", label: "Sandwich", recipes: ["Veg Sandwich", "Grilled Cheese Sandwich", "Club Sandwich"] },
  { id: "rolls", label: "Rolls", recipes: ["Chicken Kathi Roll", "Paneer Frankie", "Egg Roll"] },
  { id: "biryani", label: "Biryani", recipes: ["Chicken Biryani", "Veg Biryani", "Mutton Biryani"] },
  { id: "cake", label: "Cake", recipes: ["Chocolate Cake", "Vanilla Sponge Cake", "Eggless Cake"] },
  { id: "pasta", label: "Pasta", recipes: ["Red Sauce Pasta", "White Sauce Pasta", "Pasta Arrabbiata"] },
  { id: "dosa", label: "Dosa", recipes: ["Plain Dosa", "Masala Dosa", "Rava Dosa"] },
];

// Category thumbnails live at /public/wheels/<id>.png
const dishImage = (id: string) => `/wheels/${id}.png`;

const COUNT = DISHES.length;
const STEP = 360 / COUNT;
const VISIBLE_COUNT = 5;
const AUTO_SPEED_DEG_PER_SEC = 6;
const DRAG_SENSITIVITY = 0.35;
const TAP_MOVE_THRESHOLD = 6;

const normalize180 = (deg: number) => ((deg % 360) + 540) % 360 - 180;

const WHEEL_ANIMATION_CSS = `
@keyframes dish-panel-rise {
  from { opacity: 0; transform: translateY(16px) rotateX(-10deg) scale(0.93); }
  to { opacity: 1; transform: translateY(0) rotateX(0deg) scale(1); }
}
.dish-panel-rise { animation: dish-panel-rise 0.42s cubic-bezier(0.22, 1, 0.36, 1) both; transform-origin: bottom center; }
@media (prefers-reduced-motion: reduce) {
  .dish-panel-rise { animation: none; }
}
`;

interface DishWheelProps {
  onSelect: (dish: string) => void;
}

const DishWheel: React.FC<DishWheelProps> = ({ onSelect }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const BASE_RADIUS = 135; // keeps center + nearest-neighbor spacing fixed, regardless of container width
  const [extraReach, setExtraReach] = useState(80);

  const angleRef = useRef(0);
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, startAngle: 0, moved: false });

  const [activeId, setActiveId] = useState<string | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const update = () => setExtraReach(Math.max(60, Math.min(240, el.clientWidth * 0.32)));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous slow spin — paused while dragging or while the menu panel is open.
  useEffect(() => {
    if (isDragging || activeId) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      angleRef.current += dt * AUTO_SPEED_DEG_PER_SEC;
      setAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging, activeId]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (activeId) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragInfo.current = { startX: e.clientX, startAngle: angleRef.current, moved: false };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragInfo.current.startX;
    if (Math.abs(deltaX) > TAP_MOVE_THRESHOLD) dragInfo.current.moved = true;
    angleRef.current = dragInfo.current.startAngle + deltaX * DRAG_SENSITIVITY;
    setAngle(angleRef.current);
  };

  const handlePointerUp = () => setIsDragging(false);

  // Always render the 5 items angularly closest to front — not a fixed
  // threshold, which went in and out of sync with the continuous angle and
  // flickered between 4 and 5 visible.
  const withOffsets = DISHES.map((dish, i) => ({
    dish,
    i,
    offset: normalize180(i * STEP + angle),
  }));
  const visible = [...withOffsets]
    .sort((a, b) => Math.abs(a.offset) - Math.abs(b.offset))
    .slice(0, VISIBLE_COUNT);

  const activeDish = DISHES.find((d) => d.id === activeId) ?? null;

  return (
    <div className="mx-auto w-full">
      <style>{WHEEL_ANIMATION_CSS}</style>

      {!activeDish && (
        <p className="mb-0 text-center text-sm font-semibold uppercase tracking-wider text-stone-400">
          What&apos;s on your mind?
        </p>
      )}

      <div
        ref={sceneRef}
        className="relative h-36 w-full touch-pan-y select-none sm:h-40"
        style={{ perspective: "1000px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {!activeDish && (
          <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            {visible.map(({ dish, offset }) => {
              const absOffset = Math.abs(offset);
              const scale = 1 - Math.min(absOffset / 180, 1) * 0.42;
              const opacity = 1 - Math.min(absOffset / 140, 1) * 0.6;
              const zIndex = Math.round(100 - absOffset);
              const isFront = absOffset < STEP / 2;

              return (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => {
                    if (dragInfo.current.moved) return;
                    setActiveId(dish.id);
                  }}
                  className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center gap-1.5"
                  style={{
                    width: 128,
                    height: 128,
                    marginLeft: -64,
                    marginTop: -64,
                    opacity,
                    zIndex,
                    transform: `rotateY(${offset}deg) translateZ(${BASE_RADIUS + extraReach * Math.pow(absOffset / 180, 1.6)}px) rotateY(${-offset}deg) scale(${scale})`,
                    transition: isDragging ? "none" : "opacity 0.2s ease",
                  }}
                >
                  <span className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={dishImage(dish.id)}
                      alt=""
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  </span>
                  <span className={`text-sm font-semibold ${isFront ? "text-orange-200" : "text-stone-400"}`}>
                    {dish.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {activeDish && (
          <div className="dish-panel-rise absolute inset-0 flex flex-col rounded-2xl border border-stone-700/70 bg-stone-900 p-3">
            <div className="mb-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Back to the wheel"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100"
              >
                ←
              </button>
              <span className="text-sm font-semibold text-stone-100">{activeDish.label}</span>
            </div>

            <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
              {activeDish.recipes.map((recipe) => {
                const recipeImage = findPredefinedRecipe(recipe)?.image;
                return (
                  <button
                    key={recipe}
                    type="button"
                    onClick={() => onSelect(recipe)}
                    className="flex items-center gap-3 rounded-xl border border-stone-700 bg-stone-950/40 px-3 py-2 text-left text-sm text-stone-200 transition-colors hover:border-orange-400/60 hover:text-orange-200"
                  >
                    <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-stone-800">
                      {recipeImage && (
                        <img src={recipeImage} alt="" className="h-full w-full object-cover" draggable={false} />
                      )}
                    </span>
                    {recipe}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishWheel;