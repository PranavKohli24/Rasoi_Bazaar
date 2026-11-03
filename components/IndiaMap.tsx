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
  useLayoutEffect(() => {
    if (!selectedCode || !wrapperRef.current) {
      setPinPos(null);
      return;
    }

    const svg = wrapperRef.current.querySelector("svg");
    const path = svg?.querySelector<SVGGraphicsElement>(`#${selectedCode}`);
    const viewBox = svg?.viewBox?.baseVal;

    if (!svg || !path || !viewBox || !viewBox.width || !viewBox.height) {
      setPinPos(null);
      return;
    }

    const bbox = path.getBBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    setPinPos({
      xPct: ((centerX - viewBox.x) / viewBox.width) * 100,
      yPct: ((centerY - viewBox.y) / viewBox.height) * 100,
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
        size={isCompact ? "100%" : "340px"}
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
            fill="#FC6C26"
            stroke="#7a2e0a"
            strokeWidth="1"
            className={isCompact ? "h-4 w-4 drop-shadow-md" : "h-7 w-7 drop-shadow-md"}
          >
            <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.05 11.25 7.35 11.5a1 1 0 0 0 1.3 0C12.95 21.25 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 10.5A2.5 2.5 0 1 1 12 7.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;