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

const CONFETTI_COLORS = [
  "#f97316", // orange-500
  "#fb923c", // orange-400
  "#fdba74", // orange-300
  "#fef3c7", // warm cream
  "#f5f5f4", // stone-100 / white-ish
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
        color:
          CONFETTI_COLORS[
            Math.floor(Math.random() * CONFETTI_COLORS.length)
          ],
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
      className="celebration-popup fixed inset-0 z-[70] bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up overflow-hidden"
      style={{ animationDuration: "0.3s" }}
    >
      {/* Confetti burst */}
      <div className="absolute inset-0 pointer-events-none">
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
      <div className="absolute inset-0 pointer-events-none">
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
              background: "#fdba74",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-sm w-full text-center">
        <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-orange-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <p className="text-stone-400 text-sm mb-2 tracking-wide uppercase">
          Well done
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          {dishName ? `You made ${dishName}.` : "You made it."}
        </h2>

        <p className="text-stone-400 text-base leading-relaxed mb-8">
          Time for the best part - eating it!
        </p>

        <button
          onClick={onReset}
          className="w-full h-12 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-semibold transition-colors duration-150"
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