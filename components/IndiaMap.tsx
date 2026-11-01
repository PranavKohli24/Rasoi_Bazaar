import React from "react";
import SvgIndiaMap from "react-svgmap-india";
import { INDIA_REGIONS, findRegionByMapClickValue } from "../utils/indiaRegions";

interface IndiaMapProps {
  selectedSlug?: string;
  onSelect?: (slug: string) => void;
  /** Compact = small locator next to the selected-region card. Full = bigger, clickable picker. */
  variant?: "full" | "compact";
}

export const IndiaMap: React.FC<IndiaMapProps> = ({ selectedSlug, onSelect, variant = "full" }) => {
  const isCompact = variant === "compact";
  const selectedCode = selectedSlug
    ? INDIA_REGIONS.find((r) => r.slug === selectedSlug)?.code
    : undefined;

  const handleClick = (value: string) => {
    const region = findRegionByMapClickValue(value);
    if (region && onSelect) onSelect(region.slug);
  };

  return (
    <div className={isCompact ? "pointer-events-none" : undefined}>
      {/*
        The selected state's code gets a dedicated fill override here.
        react-svgmap-india doesn't document per-state coloring, so this
        targets the state path by id — verify in devtools after wiring
        this up: click a state, inspect its <path>, and if the id isn't
        the 2-letter code (e.g. it's RJ, not "RJ-path" or similar), tell
        me the actual attribute and I'll adjust this one selector.
      */}
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
    </div>
  );
};

export default IndiaMap;