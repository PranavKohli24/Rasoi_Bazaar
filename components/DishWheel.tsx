import React, { useEffect, useRef, useState } from "react";
import { findPredefinedRecipe } from "../utils/findPredefinedRecipe";
import SectionDivider from "./SectionDivider";

interface WheelDish {
  id: string;
  label: string;
  recipes: string[];
}

const DISHES: WheelDish[] = [
  {
    id: "dal",
    label: "Dal",
    recipes: [
      "Dal Tadka",
      "Dal Makhani",
      "Toor Dal",
      "Chole masala",
      "Chana Dal (Chana Dal Tadka)",
      "Dal Palak",
      "Moong Dal",
      "Masoor Dal",
      "Lauki Chana Dal"
    ],
  },
  {
    id: "rice",
    label: "Rice",
    recipes: [
      "Plain Rice",
      "Jeera Rice",
      "Quick Vegetable Pulao",
      "Matar Pulao",
      "Lemon Rice (Chitranna)",
      "Curd Rice (Thayir Sadam)",
      "Veg Fried Rice",
      "Khichdi",
      "Rasam Rice",
      "Sambar Chawal",
      "Rajma Chawal",
      "Chole Chawal",
      "Kadhi Chawal",
      "Pongal (Ven Pongal)",
    ],
  },
  {
    id: "sandwich",
    label: "Sandwich",
    recipes: [
      "Veg Sandwich",
      "Paneer Sandwich",
      "Cheese Sandwich",
      "Club Sandwich",
    ],
  },
  {
    id: "rolls",
    label: "Rolls",
    recipes: [
      "Veg Kathi Roll",
      "Paneer Roll",
      "Chicken Kathi Roll",
      "Egg Roll",
      "Veggie Roll",
      "Achari Paneer Roll",
      "Chicken Tikka Roll",
      "Chicken Seekh Roll",
      "Mutton Seekh Roll",
      "Paneer Tikka Roll",
    ],
  },
  {
    id: "biryani",
    label: "Biryani",
    recipes: [
      "Chicken Biryani",
      "Veg Biryani",
      "Mutton Biryani",
      "Prawn Biryani",
      "Hyderabadi Chicken Biryani",
      "Egg Biryani",
      "Dum Chicken Biryani",
      "Dum Mutton Biryani",
      "Kolkata Biryani",
      "Awadhi Biryani",
      "Thalassery Biryani",
      "Island Seafood Biryani",
    ],
  },
  {
    id: "shakes",
    label: "Shakes",
    recipes: [
      "Vanilla Milkshake",
      "Chocolate Milkshake",
      "Strawberry Milkshake",
      "Oreo Milkshake",
    ],
  },
  {
    id: "cake",
    label: "Cake",
    recipes: [
      "Cake (Simple Eggless Vanilla Cake)",
      "Chocolate Cake",
      "Strawberry Cake",
      "Pineapple Cake",
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    recipes: [
      "Pasta (Indian Masala Pasta)",
      "White Sauce Pasta",
      "Red Sauce Pasta",
      "Macaroni (Masala Macaroni)",
    ],
  },
  {
    id: "dosa",
    label: "Dosa",
    recipes: [
      "Plain Dosa",
      "Masala Dosa",
      "Rava Dosa",
      "Benne Dosa",
      "Set Dosa",
      "Neer Dosa",
      "Mysore Masala Dosa",
      "Onion Dosa",
      "Podi Dosa",
      "Paper Dosa",
      "Kal Dosa",
      "Paneer Dosa",
      "Egg Dosa",
      "Ragi Dosa",
    ],
  },
  {
    id: "sabzi",
    label: "Sabzi",
    recipes: [
      "Aloo Gobi",
      "Bhindi Masala",
      "Tinda Sabzi",
      "Gajar Matar",
      "Aloo Tamatar Sabzi",
      "Aloo Matar",
      "Aloo Methi",
      "French Beans Sabzi (Beans ki Sabzi)",
      "Gobi Masala",
      "Lauki Sabzi",
      "Mooli Ki Sabzi",
      "Tori Sabzi",
      "Patta Gobhi Sabzi",
      "Karela Sabzi",
      "Mixed Veg Sabzi",
      "Baingan Bharta",
    ],
  },
  {
    id: "paratha",
    label: "Paratha",
    recipes: [
      "Aloo Paratha",
      "Laccha Paratha",
      "Gobhi Paratha",
      "Mooli Paratha",
      "Palak Paratha",
      "Methi Paratha",
      "Paneer Paratha",
      "Matar Paratha",
      "Sattu Paratha",
      "Cheese Paratha",
      "Onion Paratha (Pyaz Paratha)",
      "Anda Paratha"
    ],
  },
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
  0% { opacity: 0; transform: scale(0.32) translateY(10px); }
  55% { opacity: 1; transform: scale(1.035) translateY(-2px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.dish-panel-rise { animation: dish-panel-rise 0.52s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

@keyframes dish-row-in {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}
.dish-row-in { animation: dish-row-in 0.38s cubic-bezier(0.22, 1, 0.36, 1) both; }

@media (prefers-reduced-motion: reduce) {
  .dish-panel-rise, .dish-row-in { animation: none; }
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

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

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
  // Where the tapped card sat, as a % of the scene box — the opening panel
  // scales up from this point, so it reads as "born from" the card you tapped.
  const [originPct, setOriginPct] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number | undefined>(undefined);

  // Only a handful of small images — warm the browser cache once on mount so
  // none of them pop in blank as the ring rotates to them or the panel opens.
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
      // so push the radius out proportionally more to keep a consistent gap
      // between neighboring cards instead of crowding them.
      const spacingCompensation = (45 / STEP) * 1.12;
      setBaseRadius(Math.max(78, Math.min(135, w * 0.22)) * spacingCompensation); // unchanged — this is what controls the gap between neighboring items
      setExtraReach(Math.max(20, Math.min(90, w * 0.12)) * spacingCompensation); // pulled back a lot — this is what controls how far the outer edge cards reach, i.e. the wheel's overall width
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

  const openDish = (dishId: string, cardEl: HTMLElement) => {
    if (dragInfo.current.moved) return;
    const sceneRect = sceneRef.current?.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();
    if (sceneRect) {
      setOriginPct({
        x: ((cardRect.left + cardRect.width / 2 - sceneRect.left) / sceneRect.width) * 100,
        y: ((cardRect.top + cardRect.height / 2 - sceneRect.top) / sceneRect.height) * 100,
      });
    }
    setActiveId(dishId);
  };

  // All dishes are always in the DOM; the ones outside the front ~5-wide
  // window simply fade to opacity 0 as they rotate out, instead of being
  // filtered out of the list (which caused a sudden pop).
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
        className={`relative mt-3 w-full touch-pan-y select-none transition-[height] duration-300 ease-out ${
          activeDish ? "h-[27rem] sm:h-[29rem]" : "h-32 sm:h-40"
        }`}
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
              const baseOpacity = 1 - Math.min(absOffset / 140, 1) * 0.6; // normal depth dimming
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
                  onClick={(e) => openDish(dish.id, e.currentTarget)}
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
          <div
            className="dish-panel-rise absolute inset-0 flex flex-col overflow-hidden rounded-[28px] bg-stone-900"
            style={{
              transformOrigin: `${originPct.x}% ${originPct.y}%`,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -26px 36px -30px rgba(0,0,0,0.6)",
            }}
          >
            {/* Back button stays fixed in place while everything beneath it scrolls */}
            <button
              type="button"
              onClick={() => setActiveId(null)}
              aria-label="Back to the wheel"
              className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-stone-900/30 text-stone-100 backdrop-blur transition-colors hover:bg-stone-900/85 active:scale-95"
            >
              ←
            </button>

            {/* Hero banner + recipe list now scroll together as one unit */}
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="relative h-44 w-full shrink-0 sm:h-52">
                <FadeImage
                  src={dishImage(activeDish.id)}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/55 to-stone-900/5" />
                <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-transparent to-transparent" />

                <div className="absolute inset-x-4 bottom-4">
                  <h3 className="font-serif text-2xl font-black leading-tight text-orange-50 sm:text-3xl">
                    {activeDish.label}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-orange-200/80">
                    {activeDish.recipes.length} recipes to try
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-3 sm:p-4">
                {activeDish.recipes.map((recipe, i) => {
                const recipeImage = findPredefinedRecipe(recipe)?.image;
                return (
                  <button
                    key={recipe}
                    type="button"
                    onClick={() => onSelect(recipe)}
                    className="dish-row-in group flex items-center gap-4 rounded-2xl border border-stone-700/70 bg-stone-950/40 p-2.5 text-left transition-colors duration-200 hover:border-orange-400/60 hover:bg-stone-950/60 active:scale-[0.98]"
                    style={{ animationDelay: `${120 + i * 55}ms`, perspective: "500px" }}
                  >
                    <span
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl transition-transform duration-200 ease-out group-hover:shadow-xl group-hover:shadow-black/40"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {recipeImage && (
                        <FadeImage
                          src={recipeImage}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-110"
                        />
                      )}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold leading-snug text-stone-100 group-hover:text-orange-200 sm:text-base">
                        {recipe}
                      </span>
                    </span>
                    <ChevronRightIcon className="h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-orange-300" />
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishWheel;