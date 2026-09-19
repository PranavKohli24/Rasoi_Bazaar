import React from "react";

interface SectionDividerProps {
  label: string;
  /** Render the label as an <h2> (for real section headings). Otherwise it is a plain line of text. */
  heading?: boolean;
  id?: string;
}

/** A label flanked by fading lines, used to separate the ways of choosing a dish. */
const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  heading = false,
  id,
}) => {
  const Text = heading ? "h2" : "p";

  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-700 to-stone-600" />
      <Text
        id={id}
        className="shrink-0 text-center text-base font-medium tracking-tight text-stone-200 sm:text-lg"
      >
        {label}
      </Text>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-stone-700 to-stone-600" />
    </div>
  );
};

export default SectionDivider;