import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

interface CelebrationPopupProps {
  dishName?: string;
  onReset: () => void;
}

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
  drift: number;
  shape: "rect" | "circle";
}

interface Sparkle {
  id: number;
  top: number;
  left: number;
  delay: number;
  size: number;
}

// Warm, soft colours that read well on the dark-brown scrim.
const CONFETTI_COLORS = [
  "#F97316", // brand orange
  "#FB923C", // light orange
  "#FBBF24", // amber
  "#F9A8A0", // soft coral
  "#A7C99A", // sage
];

const CONFETTI_COUNT = 60;
const SPARKLE_COUNT = 14;

const CelebrationPopup: React.FC<CelebrationPopupProps> = ({
  dishName,
  onReset,
}) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const confetti = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.6 + Math.random() * 1.8,
        size: 6 + Math.random() * 7,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        drift: Math.random() * 140 - 70,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      })),
    []
  );

  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: i,
        top: 20 + Math.random() * 45,
        left: 15 + Math.random() * 70,
        delay: Math.random() * 1.2,
        size: 6 + Math.random() * 8,
      })),
    []
  );

  return createPortal(
    <div
      className="celebration-popup fixed inset-0 z-[70] flex animate-fade-in-up items-center justify-center overflow-hidden bg-stone-100/50 p-4 backdrop-blur-sm"
      style={{ animationDuration: "0.3s" }}
    >
      {/* Confetti burst */}
      <div className="pointer-events-none absolute inset-0">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className={piece.shape === "rect" ? "rounded-sm" : "rounded-full"}
            style={{
              position: "absolute",
              top: "-5%",
              left: `${piece.left}%`,
              width: `${piece.size}px`,
              height: piece.shape === "rect" ? `${piece.size * 0.4}px` : `${piece.size}px`,
              backgroundColor: piece.color,
              opacity: 0,
              transform: `rotate(${piece.rotation}deg)`,
              animation: `confetti-fall ${piece.duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${piece.delay}s forwards`,
              ["--drift" as any]: `${piece.drift}px`,
              ["--rot" as any]: `${piece.rotation + 360 + Math.random() * 360}deg`,
            }}
          />
        ))}
      </div>

      {/* Star sparkles, using the .sparkle system already in index.html */}
      <div className="pointer-events-none absolute inset-0">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="sparkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              background: "#FBBF24",
            }}
          />
        ))}
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recipe complete"
        className="relative w-full max-w-sm rounded-3xl border border-stone-700 bg-stone-900 p-8 text-center shadow-2xl"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDEBD3]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-emerald-700"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-200">
          Well done
        </p>

        <h2 className="mb-3 font-serif text-3xl font-black tracking-tight text-orange-50 sm:text-4xl">
          {dishName ? `You made ${dishName}.` : "You made it."}
        </h2>

        <p className="mb-8 text-base leading-relaxed text-stone-400">
          Time for the best part - eating it!
        </p>

        <button
          onClick={onReset}
          className="h-12 w-full rounded-full bg-orange-200 font-semibold text-white shadow-md transition-colors duration-150 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
        >
          Cook something else
        </button>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) translateX(var(--drift)) rotate(var(--rot));
            opacity: 0.9;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .celebration-popup [style*="confetti-fall"],
          .celebration-popup .sparkle {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default CelebrationPopup;