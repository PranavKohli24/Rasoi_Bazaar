import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

interface CelebrationPopupProps {
  dishName?: string;
  /** recipe.image — used as the hero photo on the shareable card. */
  dishImage?: string;
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

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

// Splits text into lines that fit maxWidth. Pure measurement — caller
// decides alignment and where each line gets drawn.
const computeWrappedLines = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] => {
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
  return lines;
};

const roundRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

// Picks a dish-name size that comfortably fits two lines in the text zone,
// backing off for longer names instead of letting them wrap to three.
const fitDishNameFont = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): { fontSize: number; lines: string[] } => {
  const sizes = [64, 56, 48, 42];
  for (const size of sizes) {
    ctx.font = `900 ${size}px Fraunces, serif`;
    const lines = computeWrappedLines(ctx, text, maxWidth);
    if (lines.length <= 2 || size === sizes[sizes.length - 1]) {
      return { fontSize: size, lines };
    }
  }
  ctx.font = `900 42px Fraunces, serif`;
  return { fontSize: 42, lines: computeWrappedLines(ctx, text, maxWidth) };
};

// Draws `img` into the x/y/w/h box, cropped (never squashed) to cover it.
const drawImageCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let sx: number, sy: number, sw: number, sh: number;

  if (imgRatio > boxRatio) {
    sh = img.height;
    sw = sh * boxRatio;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = sw / boxRatio;
    sx = 0;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });

const loadBrandFonts = () =>
  Promise.all([
    document.fonts.load('900 68px Fraunces'),
    document.fonts.load('600 44px Caveat'),
    document.fonts.load('700 26px "DM Sans"'),
    document.fonts.load('600 22px "DM Sans"'),
  ]);

// Fallback used when there's no photo, or the photo can't be loaded /
// drawn to canvas (broken URL, CORS-tainted source, etc). Sharing should
// never hard-fail just because the hero image didn't cooperate.
const drawTextOnlyCard = (
  ctx: CanvasRenderingContext2D,
  dishName: string
) => {
  ctx.fillStyle = "#FFF8F1";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

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
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#D1560F";
  ctx.font = '600 42px Caveat, cursive';
  ctx.fillText("I just cooked", CARD_WIDTH / 2, 240);

  ctx.fillStyle = "#3E2E23";
  ctx.font = '900 76px Fraunces, serif';
  const words = dishName.split(" ");
  let line = "";
  const lines: string[] = [];
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > 1000 && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  lines.push(line);
  const startY = 330 - ((lines.length - 1) * 84) / 2;
  lines.forEach((l, i) => ctx.fillText(l, CARD_WIDTH / 2, startY + i * 84));

  ctx.font = '700 28px "DM Sans", sans-serif';
  ctx.fillStyle = "#FC6C26";
  ctx.fillText("Rasoi Bazaar", CARD_WIDTH / 2, 540);

  ctx.font = '400 20px "DM Sans", sans-serif';
  ctx.fillStyle = "#7E6038";
  ctx.fillText("rasoi-bazaar.vercel.app", CARD_WIDTH / 2, 572);
};

// Recipe-card layout: the photo sits in its own framed panel up top, and
// every piece of text lives in a solid-color zone below it. The photo
// never has to carry text legibility on its own, so the card looks right
// no matter how light, dark or busy the dish photo is.
const drawPhotoCard = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dishName: string
) => {
  const leftX = 64;
  const frameX = 64;
  const frameY = 56;
  const frameW = CARD_WIDTH - frameX * 2; // 1072
  const frameH = 318;
  const frameRadius = 28;

  // Base
  ctx.fillStyle = "#FFF8F1";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Soft brand glows, same spirit as the text-only card, kept subtle so
  // they read as texture behind the photo frame rather than competing.
  const glow1 = ctx.createRadialGradient(1050, 40, 40, 1050, 40, 360);
  glow1.addColorStop(0, "rgba(252,108,38,0.14)");
  glow1.addColorStop(1, "rgba(252,108,38,0)");
  ctx.fillStyle = glow1;
  ctx.beginPath();
  ctx.arc(1050, 40, 360, 0, Math.PI * 2);
  ctx.fill();

  // Drop shadow caster for the photo panel.
  ctx.save();
  ctx.shadowColor = "rgba(62,46,35,0.28)";
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = "#FFFFFF";
  roundRectPath(ctx, frameX, frameY, frameW, frameH, frameRadius);
  ctx.fill();
  ctx.restore();

  // Photo, clipped to the rounded panel.
  ctx.save();
  roundRectPath(ctx, frameX, frameY, frameW, frameH, frameRadius);
  ctx.clip();
  drawImageCover(ctx, img, frameX, frameY, frameW, frameH);
  ctx.restore();

  // Crisp hairline around the panel so the crop edge feels intentional.
  roundRectPath(ctx, frameX, frameY, frameW, frameH, frameRadius);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(234,217,174,0.9)";
  ctx.stroke();

  // --- Text zone: everything below here sits on flat #FFF8F1, so it's
  // legible regardless of what the photo looks like. ---
  ctx.textAlign = "left";
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  const tagBaseline = frameY + frameH + 64; // 56+318+64 = 438
  ctx.fillStyle = "#D1560F";
  ctx.font = '600 40px Caveat, cursive';
  ctx.fillText("I just cooked", leftX, tagBaseline);

  const { fontSize, lines } = fitDishNameFont(ctx, dishName, CARD_WIDTH - leftX * 2);
  const lineHeight = fontSize * 1.12;
  const nameFirstBaseline = tagBaseline + 56;
  ctx.fillStyle = "#3E2E23";
  ctx.font = `900 ${fontSize}px Fraunces, serif`;
  lines.slice(0, 2).forEach((line, i) => {
    ctx.fillText(line, leftX, nameFirstBaseline + i * lineHeight);
  });

  // Footer pinned near the bottom edge, clear of the name block either way.
  const footerY = CARD_HEIGHT - 40;
  ctx.font = '700 26px "DM Sans", sans-serif';
  ctx.fillStyle = "#FC6C26";
  ctx.fillText("Rasoi Bazaar", leftX, footerY);

  const brandWidth = ctx.measureText("Rasoi Bazaar").width;
  ctx.font = '400 20px "DM Sans", sans-serif';
  ctx.fillStyle = "#7E6038";
  ctx.fillText("  ·  rasoi-bazaar.vercel.app", leftX + brandWidth, footerY);
};

const generateShareCard = async (
  dishName: string,
  dishImage?: string
): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d")!;

  await loadBrandFonts();

  let usedPhoto = false;

  if (dishImage) {
    try {
      const img = await loadImage(dishImage);
      drawPhotoCard(ctx, img, dishName);
      usedPhoto = true;
    } catch {
      // Broken URL, network hiccup, etc — fall through to the text card.
    }
  }

  if (!usedPhoto) {
    drawTextOnlyCard(ctx, dishName);
  }

  // If the photo was cross-origin without permissive CORS headers, the
  // canvas is "tainted" and toBlob will throw (or silently fail in some
  // browsers) rather than export. Catch that here and redraw text-only
  // so Share never just does nothing.
  try {
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png")
    );
    if (blob) return blob;
  } catch {
    // fall through to safe redraw below
  }

  if (usedPhoto) {
    drawTextOnlyCard(ctx, dishName);
    const safeBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png")
    );
    if (safeBlob) return safeBlob;
  }

  throw new Error("Could not generate share card");
};

const CelebrationPopup: React.FC<CelebrationPopupProps> = ({
  dishName,
  dishImage,
  onReset,
}) => {
  const [isSharing, setIsSharing] = React.useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const blob = await generateShareCard(dishName ?? "something delicious", dishImage);
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

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-stone-700 bg-stone-900 px-4 text-sm font-semibold text-stone-200 shadow-sm transition-colors duration-150 hover:border-orange-400 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 disabled:opacity-60 sm:flex-1 sm:text-base"
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
            className="h-12 w-full whitespace-nowrap rounded-full bg-orange-200 px-4 text-sm font-semibold text-white shadow-md transition-colors duration-150 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 sm:flex-1 sm:text-base"
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