import React from 'react';

interface KitchenEquipmentSelectorProps {
  selectedEquipment: string[];
  onChange: (equipment: string[]) => void;
}

interface EquipmentItem {
  id: string;
  name: string;
  label: string;
  src: string;

  // Position as percentage of kitchen width/height
  left: number;
  top: number;

  // Width as percentage of kitchen width
  width: number;

  zIndex: number;
}

const equipmentItems: EquipmentItem[] = [
  {
    id: 'microwave',
    name: 'Microwave',
    label: 'Microwave',
    src: '/kitchen/microwave.png',
    left: 0,
    top: 13,
    width: 20,
    zIndex: 20,
  },

  {
    id: 'air-fryer',
    name: 'Air Fryer',
    label: 'Air Fryer',
    src: '/kitchen/air_fryer.png',
    left: 59,
    top: 17,
    width: 11,
    zIndex: 20,
  },

  {
    id: 'grinder',
    name: 'Mixer / Grinder',
    label: 'Mixer / Grinder',
    src: '/kitchen/grinder.png',
    left: 72,
    top: 12,
    width: 15,
    zIndex: 20,
  },

  {
    id: 'stove',
    name: 'Gas Stove',
    label: 'Gas Stove',
    src: '/kitchen/stove.png',
    left: 37,
    top: 27,
    width: 23,
    zIndex: 15,
  },

  {
    id: 'kadai',
    name: 'Kadai',
    label: 'Kadai',
    src: '/kitchen/kadai.png',
    left: 6,
    top: 34,
    width: 12,
    zIndex: 30,
  },
  {
    id: 'tawa',
    name: 'Tawa',
    label: 'Tawa',
    src: '/kitchen/tawa.png',
    left: 63,
    top: 38,
    width: 15,
    zIndex: 30,
  },

  {
    id: 'oven',
    name: 'Oven',
    label: 'Oven',
    src: '/kitchen/oven.png',
    left: 70,
    top: 45,
    width: 18,
    zIndex: 12,
  },

  {
    id: 'pressure-cooker',
    name: 'Pressure Cooker',
    label: 'Pressure Cooker',
    src: '/kitchen/cooker.png',
    left: 22,
    top: 34,
    width: 12,
    zIndex: 25,
  },
];

const KitchenEquipmentSelector: React.FC<
  KitchenEquipmentSelectorProps
> = ({ selectedEquipment, onChange }) => {
  const toggleEquipment = (equipmentName: string) => {
    if (selectedEquipment.includes(equipmentName)) {
      onChange(
        selectedEquipment.filter((item) => item !== equipmentName)
      );
      return;
    }

    onChange([...selectedEquipment, equipmentName]);
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectAll = () => {
    onChange(equipmentItems.map((item) => item.name));
  };

  const allSelected = selectedEquipment.length === equipmentItems.length;

  return (
    <div className="w-full overflow-visible">
      {/* Heading */}
      <div className="mb-10 sm:mb-14">
        <h3 className="font-serif text-2xl font-black text-orange-50 sm:text-3xl">
          What&apos;s in your kitchen?
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base">
          Tap the appliances you own. Tap again to remove one.
        </p>
      </div>

      {/* Kitchen scene (unchanged) */}
      <div className="px-2 pt-3 sm:px-4 sm:pt-5">
        <div className="relative w-full aspect-[3/2] scale-[1.12] origin-center">
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl border border-stone-700/80 bg-stone-900 shadow-2xl">
            <img
              src="/kitchen/kitchen.jpeg"
              alt="Kitchen"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            <div className="absolute inset-0 bg-stone-950/5 pointer-events-none" />
          </div>

          {/* Equipment layers */}
          {equipmentItems.map((item) => {
            const selected = selectedEquipment.includes(item.name);

            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Select ${item.name}`}
                aria-pressed={selected}
                onClick={() => toggleEquipment(item.name)}
                className="absolute group outline-none"
                style={{
                  left: `${item.left}%`,
                  top: `${item.top}%`,
                  width: `${item.width}%`,
                  zIndex: item.zIndex,
                }}
              >
                {/* Glow / selection box */}
                <span
                  className={`
                  pointer-events-none
                  absolute
                  inset-[-6%]
                  rounded-2xl
                  transition-all
                  duration-300
                  ${
                    selected
                      ? `
                        border-2
                        border-orange-300
                        bg-orange-400/15
                        shadow-[0_0_28px_rgba(251,146,60,0.9)]
                      `
                      : `
                        border-2
                        border-transparent
                        group-hover:border-orange-300/50
                        group-hover:bg-orange-300/5
                      `
                  }
                `}
                />

                {/* Equipment image */}
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  className={`
                  relative
                  block
                  w-full
                  h-auto
                  select-none
                  pointer-events-none
                  transition-all
                  duration-300
                  ${
                    selected
                      ? 'scale-105 brightness-110 drop-shadow-[0_0_18px_rgba(251,146,60,0.8)]'
                      : 'group-hover:scale-[1.025]'
                  }
                `}
                />

                {/* Label */}
                <span
                  className={`
    absolute
    left-1/2
    -translate-x-1/2
    whitespace-nowrap
    rounded-full
    px-2
    py-0.5
    text-[8px]
    sm:text-[9px]
    font-medium
    leading-none
    backdrop-blur-md
    transition-all
    duration-200
    ${
      selected
        ? `
          -top-6
          bg-orange-400
          text-stone-950
          shadow-md
          opacity-100
          scale-100
        `
        : `
          -top-6
          bg-stone-950/90
          border
          border-stone-600/70
          text-stone-200
          opacity-0
          scale-95
          group-hover:opacity-100
          group-hover:scale-100
        `
    }
  `}
                >
                  {selected ? '✓ ' : ''}
                  {item.label}
                </span>

                {/* Selected check */}
                {selected && (
                  <span
                    className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-400
                    text-xs
                    font-black
                    text-stone-950
                    shadow-lg
                  "
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Equipment list: easier tapping on small screens, same selection state */}
      <div className="mt-10 sm:mt-12">
        <div className="flex items-center justify-between gap-4">
          <h4 className="font-semibold text-white">
            Your equipment
            <span className="ml-2 text-orange-300">
              ({selectedEquipment.length}/{equipmentItems.length})
            </span>
          </h4>

          <button
            type="button"
            onClick={allSelected ? clearAll : selectAll}
            className="text-sm text-stone-500 transition-colors hover:text-orange-300 focus:outline-none focus-visible:underline"
          >
            {allSelected ? 'Clear all' : 'Select all'}
          </button>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
          {equipmentItems.map((item) => {
            const selected = selectedEquipment.includes(item.name);

            return (
              <li key={item.id} className="min-w-0">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleEquipment(item.name)}
                  className={`relative flex h-full w-full items-center gap-2 rounded-xl border px-2.5 py-2.5 text-left text-[13px] font-medium leading-tight sm:gap-2.5 sm:px-3 sm:text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 ${
                    selected
                      ? 'border-orange-400 bg-orange-400/15 text-orange-50'
                      : 'border-stone-700 bg-stone-900/60 text-stone-300 hover:border-stone-500 hover:text-stone-100'
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-800/80 sm:h-10 sm:w-10">
                    <img
                      src={item.src}
                      alt=""
                      draggable={false}
                      className="max-h-7 max-w-7 object-contain sm:max-h-8 sm:max-w-8"
                    />
                  </span>

                  <span className="min-w-0 flex-1 break-words">{item.label}</span>

                  <span
                    aria-hidden="true"
                    className={`absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black transition-colors sm:static sm:h-5 sm:w-5 sm:shrink-0 sm:text-[11px] ${
                      selected
                        ? 'bg-orange-400 text-stone-950'
                        : 'border border-stone-600 text-transparent opacity-0 sm:opacity-100'
                    }`}
                  >
                    ✓
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default KitchenEquipmentSelector;