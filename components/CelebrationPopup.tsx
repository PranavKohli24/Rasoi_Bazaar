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
  "#FC6C26", // brand burnt orange
  "#FF8C4B", // light orange
  "#D1560F", // dark orange
  "#F9A8A0", // soft coral — unchanged, keeps confetti from looking one-note
  "#A7C99A", // sage — unchanged, same reason
];

const CONFETTI_COUNT = 60;
const SPARKLE_COUNT = 14;


// Wraps text across multiple lines, centered, for long dish names.
const wrapCenteredText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
};

const generateShareCard = async (dishName: string): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d")!;

  await Promise.all([
    document.fonts.load('900 76px Fraunces'),
    document.fonts.load('600 42px Caveat'),
    document.fonts.load('700 28px "DM Sans"'),
    document.fonts.load('400 20px "DM Sans"'),
  ]);

  // Base
  ctx.fillStyle = "#FFF8F1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft orange glows, top-right and bottom-left
  const glow1 = ctx.createRadialGradient(1050, 80, 50, 1050, 80, 420);
  glow1.addColorStop(0, "rgba(252,108,38,0.18)");
  glow1.addColorStop(1, "rgba(252,108,38,0)");
  ctx.fillStyle = glow1;
  ctx.beginPath();
  ctx.arc(1050, 80, 420, 0, Math.PI * 2);
  ctx.fill();

  const glow2 = ctx.createRadialGradient(100, 580, 40, 100, 580, 320);
  glow2.addColorStop(0, "rgba(252,108,38,0.12)");
  glow2.addColorStop(1, "rgba(252,108,38,0)");
  ctx.fillStyle = glow2;
  ctx.beginPath();
  ctx.arc(100, 580, 320, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = "center";

  // "I just cooked"
  ctx.fillStyle = "#D1560F";
  ctx.font = '600 42px Caveat, cursive';
  ctx.fillText("I just cooked", canvas.width / 2, 210);

  // Dish name — hero text
  ctx.fillStyle = "#3E2E23";
  ctx.font = '900 76px Fraunces, serif';
  wrapCenteredText(ctx, dishName, canvas.width / 2, 330, 1000, 84);

  // Brand footer
  ctx.font = '700 28px "DM Sans", sans-serif';
  ctx.fillStyle = "#FC6C26";
  ctx.fillText("Rasoi Bazaar", canvas.width / 2, 540);

  ctx.font = '400 20px "DM Sans", sans-serif';
  ctx.fillStyle = "#7E6038";
  ctx.fillText("rasoi-bazaar.vercel.app", canvas.width / 2, 572);

  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), "image/png")
  );
};

const CelebrationPopup: React.FC<CelebrationPopupProps> = ({
  dishName,
  onReset,
}) => {
  const [isSharing, setIsSharing] = React.useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const blob = await generateShareCard(dishName ?? "something delicious");
      const file = new File([blob], "rasoi-bazaar-recipe.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Rasoi Bazaar",
          text: `I just cooked ${dishName ?? "something delicious"} with Rasoi Bazaar! 🍲`,
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "rasoi-bazaar-recipe.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      // AbortError = user closed the native share sheet — not a real error.
      if ((err as Error)?.name !== "AbortError") console.error(err);
    } finally {
      setIsSharing(false);
    }
  };

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

                <div className="flex gap-3">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-stone-700 bg-stone-900 font-semibold text-stone-200 shadow-sm transition-colors duration-150 hover:border-orange-400 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 disabled:opacity-60"
          >
            {isSharing ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
                <path d="M16 6l-4-4-4 4" />
                <path d="M12 2v13" />
              </svg>
            )}
            Share
          </button>

          <button
            onClick={onReset}
            className="h-12 flex-1 rounded-full bg-orange-200 font-semibold text-white shadow-md transition-colors duration-150 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
          >
            Cook something else
          </button>
        </div>
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