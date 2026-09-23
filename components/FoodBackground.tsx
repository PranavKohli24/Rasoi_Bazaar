import React, { useMemo } from "react";
import { buildLayout, makeRng } from "../utils/backgroundLayout";

/**
 * Scattered food, fruit and kitchen-equipment pictures behind the whole site.
 * Placement is random on every new visit (new tab / new session), then stays
 * the same while you move around, so it never jumps or flickers.
 */

const doodleProps = {
  fill: "none",
  stroke: "#C9722E",
  strokeOpacity: 0.24,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Simple line drawings of food and tools, each drawn inside a 40 x 40 box.
const DOODLES: React.ReactNode[] = [
  // tomato
  <>
    <circle cx="20" cy="23" r="13" />
    <path d="M13 12l7 5 7-5M20 17V9" />
    <path d="M20 9c2-3 5-3 7-2" />
  </>,
  // lemon
  <>
    <ellipse cx="20" cy="20" rx="15" ry="10.5" />
    <path d="M4 24l-3 2M36 16l3-2" />
    <path d="M12 17c3-3 8-4 12-3" />
  </>,
  // pot
  <>
    <path d="M6 18h28v10a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8z" />
    <path d="M6 22H1M34 22h5" />
    <path d="M9 13h22" />
    <path d="M17 13a3 3 0 0 1 6 0" />
  </>,
  // onion
  <>
    <path d="M20 8c0 5-12 9-12 18a12 12 0 0 0 24 0c0-9-12-13-12-18z" />
    <path d="M20 8V3M14 17c-2 4-2 9 0 13M26 17c2 4 2 9 0 13" />
  </>,
  // apple
  <>
    <path d="M20 12c-7-5-15 0-13 10 1 8 6 14 13 12 7 2 12-4 13-12 2-10-6-15-13-10z" />
    <path d="M20 12c0-4 2-7 6-8" />
  </>,
  // rolling pin
  <>
    <rect x="9" y="14" width="22" height="11" rx="4" />
    <path d="M2 19.5h7M31 19.5h7" />
  </>,
  // garlic
  <>
    <path d="M20 4c-2 5-12 9-12 19a12 12 0 0 0 24 0c0-10-10-14-12-19z" />
    <path d="M20 9v25M13 17c-2 5-1 11 3 16M27 17c2 5 1 11-3 16" />
  </>,
  // mortar and pestle
  <>
    <path d="M5 20h30c0 10-6 17-15 17S5 30 5 20z" />
    <path d="M22 20L33 4" />
    <path d="M31 6l4 3" />
  </>,
  // carrot
  <>
    <path d="M24 12c4 4 5 9-1 14L7 36l3-19c4-6 10-8 14-5z" />
    <path d="M24 12l6-7M24 12l9 1M24 12l1-9" />
    <path d="M14 22l4 1M12 28l4 1" />
  </>,
  // watermelon slice
  <>
    <path d="M3 18a17 17 0 0 0 34 0z" />
    <path d="M8 18a12 12 0 0 0 24 0" />
    <path d="M13 24v.1M20 27v.1M27 24v.1" />
  </>,
  // chilli
  <>
    <path d="M8 8c9-3 20 2 24 13 2 6 5 9 8 10-11 4-26 0-30-15z" />
    <path d="M8 8c-2-2-2-5 1-6" />
  </>,
  // ladle
  <>
    <path d="M4 36L24 14" />
    <circle cx="29" cy="9" r="7" />
    <path d="M25 9h8" />
  </>,
  // tawa
  <>
    <circle cx="17" cy="20" r="14" />
    <circle cx="17" cy="20" r="9" />
    <path d="M31 20h9" />
  </>,
];

// Pictures already in /public/kitchen (the same ones used in the kitchen selector).
const EQUIPMENT = [
  "microwave",
  "air_fryer",
  "grinder",
  "stove",
  "kadai",
  "tawa",
  "oven",
  "cooker",
].map((name) => `/kitchen/${name}.png`);

const SEED_KEY = "rasoi:bg-seed";

const getSeed = (): number => {
  const fresh = Math.floor(Math.random() * 2147483647);
  try {
    const saved = sessionStorage.getItem(SEED_KEY);
    if (saved) return Number(saved);
    sessionStorage.setItem(SEED_KEY, String(fresh));
  } catch {
    /* ignore storage problems */
  }
  return fresh;
};

const FoodBackground: React.FC = () => {
  const items = useMemo(
    () =>
      buildLayout(
        window.innerWidth,
        window.innerHeight,
        makeRng(getSeed()),
        DOODLES.length,
        EQUIPMENT.length
      ),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {items.map((item) => {
        const style: React.CSSProperties = {
          position: "absolute",
          left: `${item.left}%`,
          top: `${item.top}%`,
          transform: `translate(-50%, -50%) rotate(${item.rotate}deg) scaleX(${
            item.flip ? -1 : 1
          })`,
        };

        return item.kind === "doodle" ? (
          <svg
            key={item.id}
            viewBox="0 0 40 40"
            style={{ ...style, width: item.size, height: item.size, overflow: "visible" }}
            {...doodleProps}
          >
            {DOODLES[item.index]}
          </svg>
        ) : (
          <img
            key={item.id}
            src={EQUIPMENT[item.index]}
            alt=""
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{
              ...style,
              width: item.size * 1.3,
              height: "auto",
              opacity: 0.12,
              filter: "sepia(0.55) saturate(1.1)",
            }}
          />
        );
      })}
    </div>
  );
};

export default FoodBackground;