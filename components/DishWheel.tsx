import React, { useEffect, useRef, useState } from "react";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";
import SectionDivider from "./SectionDivider";

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
  {id: "sabzi", label: "Sabzi", recipes: ["Aloo gobi", "bhindi", "lauki"]},
  {id : "paratha", label: "Paratha", recipes: ["Aloo", "gobhi", "paneer", "mooli"]}
];

// Category thumbnails live at /public/wheels/<id>.png
const dishImage = (id: string) => `/wheels/${id}.png`;

const COUNT = DISHES.length;
const STEP = 360 / COUNT;

// Cards get proportionally smaller as more dishes are added (tuned so 8
// dishes = full size, matching how it looked before). This is what actually
// prevents touching/overlap — radius alone can't fix it once there are more
// dishes sharing the same circle.
const CARD_SCALE = Math.min(1, 45 / STEP);

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

const FadeImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      draggable={false}
      onLoad={() => setLoaded(true)}
      className={`${className ?? ""} transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
};

interface DishWheelProps {
  onSelect: (dish: string) => void;
}

const DishWheel: React.FC<DishWheelProps> = ({ onSelect }) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  // Both scale down together on narrow screens, via the same container-width reading.
  const [baseRadius, setBaseRadius] = useState(135);
  const [extraReach, setExtraReach] = useState(80);

  const angleRef = useRef(0);
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ startX: 0, startAngle: 0, moved: false });

  const [activeId, setActiveId] = useState<string | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  // Only 8-10 small images — warm the browser cache once on mount so none
  // of them pop in blank as the ring rotates to them or the panel opens.
  useEffect(() => {
    DISHES.forEach((dish) => {
      const img = new Image();
      img.src = dishImage(dish.id);
    });
  }, []);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      // Tuned at 8 dishes (45° apart). As more dishes are added, STEP shrinks,
      // so push the radius out proportionally more than before to keep a
      // consistent visual gap between neighboring cards instead of crowding them.
      const spacingCompensation = 45 / STEP;
      setBaseRadius(Math.max(78, Math.min(135, w * 0.22)) * spacingCompensation);
      setExtraReach(Math.max(40, Math.min(240, w * 0.32)) * spacingCompensation);
    };
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

  // All 8 are always in the DOM; the ones outside the front ~5-wide window
  // simply fade to opacity 0 as they rotate out, instead of being filtered
  // out of the list (which caused the sudden pop).
  const withOffsets = DISHES.map((dish, i) => ({
    dish,
    offset: normalize180(i * STEP + angle),
  }));

  const activeDish = DISHES.find((d) => d.id === activeId) ?? null;

  return (
    <div className="mx-auto w-full">
      <style>{WHEEL_ANIMATION_CSS}</style>

      {!activeDish && (
        <SectionDivider heading id="dish-wheel-heading" label="What's on your mind?" />
      )}

      <div
        ref={sceneRef}
        className="relative mt-3 h-32 w-full touch-pan-y select-none sm:h-40"
        style={{ perspective: "1300px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {!activeDish && (
          <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            {withOffsets.map(({ dish, offset }) => {
              const absOffset = Math.abs(offset);
              const scale = CARD_SCALE * (1 - Math.min(absOffset / 180, 1) * 0.42);
              const baseOpacity = 1 - Math.min(absOffset / 140, 1) * 0.6; // normal depth dimming, same as before
              const FADE_START = 95; // just past the usual ~90° edge of the 5-item window
              const FADE_END = 125; // fully gone by here
              const fadeProgress = Math.min(1, Math.max(0, (absOffset - FADE_START) / (FADE_END - FADE_START)));
              const opacity = baseOpacity * (1 - fadeProgress);
              const zIndex = Math.round(100 - absOffset);
              const isFront = absOffset < STEP / 2;
              const itemRadius = baseRadius + extraReach * Math.pow(absOffset / 180, 1.6);

              return (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => {
                    if (dragInfo.current.moved) return;
                    setActiveId(dish.id);
                  }}
                  className="absolute left-1/2 top-1/2 flex h-24 w-24 flex-col items-center justify-center gap-1 sm:h-32 sm:w-32 sm:gap-1.5"
                  style={{
                    opacity,
                    zIndex,
                    pointerEvents: opacity < 0.05 ? "none" : "auto",
                    transform: `translate(-50%, -50%) rotateY(${offset}deg) translateZ(${itemRadius}px) rotateY(${-offset}deg) scale(${scale})`,
                    transition: isDragging ? "none" : "opacity 0.35s ease",
                  }}
                >
                  <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl sm:h-28 sm:w-28">
                    <FadeImage src={dishImage(dish.id)} alt="" className="h-full w-full object-contain" />
                  </span>
                  <span
                    className={`text-xs font-semibold sm:text-sm ${
                      isFront ? "text-orange-200" : "text-stone-400"
                    }`}
                  >
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-stone-800">
                      {recipeImage && (
                        <FadeImage src={recipeImage} alt="" className="h-full w-full object-contain" />
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