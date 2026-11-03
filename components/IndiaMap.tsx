import React, { useLayoutEffect, useRef, useState } from "react";
import SvgIndiaMap from "react-svgmap-india";
import { INDIA_REGIONS, findRegionByMapClickValue } from "../utils/indiaRegions";

interface IndiaMapProps {
  selectedSlug?: string;
  onSelect?: (slug: string) => void;
  variant?: "full" | "compact";
}

export const IndiaMap: React.FC<IndiaMapProps> = ({ selectedSlug, onSelect, variant = "full" }) => {
  const isCompact = variant === "compact";
  const selectedCode = selectedSlug
    ? INDIA_REGIONS.find((r) => r.slug === selectedSlug)?.code
    : undefined;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pinPos, setPinPos] = useState<{ xPct: number; yPct: number } | null>(null);

  const handleClick = (value: string) => {
    const region = findRegionByMapClickValue(value);
    if (region && onSelect) onSelect(region.slug);
  };

  // Find the selected state's <path> inside the rendered SVG and work out
  // where to drop a pin — small states (Delhi, Goa) barely show the fill
  // color alone, so the pin makes the selection visible regardless of size.
  //
  // We use getBoundingClientRect (actual rendered position) rather than
  // getBBox + viewBox math — react-svgmap-india may wrap paths in a
  // transformed <g>, which getBBox ignores, pulling the computed center
  // toward an edge. Client rects reflect the real on-screen geometry.
  useLayoutEffect(() => {
    if (!selectedCode || !wrapperRef.current) {
      setPinPos(null);
      return;
    }

    const svg = wrapperRef.current.querySelector("svg");
    const path = svg?.querySelector<SVGGraphicsElement>(`#${selectedCode}`);

    if (!svg || !path) {
      setPinPos(null);
      return;
    }

    const svgRect = svg.getBoundingClientRect();
    const pathRect = path.getBoundingClientRect();

    if (!svgRect.width || !svgRect.height) {
      setPinPos(null);
      return;
    }

    const centerX = pathRect.left + pathRect.width / 2;
    const centerY = pathRect.top + pathRect.height / 2;

    setPinPos({
      xPct: ((centerX - svgRect.left) / svgRect.width) * 100,
      yPct: ((centerY - svgRect.top) / svgRect.height) * 100,
    });
  }, [selectedCode]);

  return (
    <div ref={wrapperRef} className={`relative ${isCompact ? "pointer-events-none" : ""}`}>
      {selectedSlug && selectedCode && (
        <style>{`
          #${selectedCode} {
            fill: #FC6C26 !important;
          }
        `}</style>
      )}

      <SvgIndiaMap
        onClick={handleClick}
        size={isCompact ? "100%" : "368px"}
        mapColor="#F5E9C6"
        strokeColor="#D9BE8E"
        strokeWidth="0.6"
        hoverColor="#FF8C4B"
      />

      {pinPos && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
          style={{ left: `${pinPos.xPct}%`, top: `${pinPos.yPct}%` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={isCompact ? "h-4 w-4" : "h-7 w-7"}
            style={{ filter: "drop-shadow(0 3px 4px rgba(122,46,10,0.35))" }}
          >
            <defs>
              <linearGradient id={`pinGradient-${selectedCode}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FC6C26" />
                <stop offset="25%" stopColor="#FFC49A" />
                <stop offset="100%" stopColor="#FFFDFB" />
                
                
              </linearGradient>
            </defs>
            <ellipse cx="12" cy="21.5" rx="2.6" ry="0.9" fill="#7a2e0a" opacity="0.18" />
            <path
              d="M12 2.2c-4.2 0-7.6 3.4-7.6 7.6 0 5.2 6.6 10.8 7.3 11.4a.5.5 0 0 0 .6 0c.7-.6 7.3-6.2 7.3-11.4 0-4.2-3.4-7.6-7.6-7.6z"
              fill={`url(#pinGradient-${selectedCode})`}
            />
            <circle cx="12" cy="9.8" r="3" fill="#FC6C26" />
            <circle cx="12" cy="9.8" r="2.3" fill="#fff" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;