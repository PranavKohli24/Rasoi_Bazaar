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

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-black text-orange-50">
          What equipment do you have?
        </h2>

        <p className="mt-2 text-sm sm:text-base text-stone-400">
          Tap the things you have in your kitchen.
        </p>
      </div>

      {/* Kitchen scene */}
      <div className="relative w-full aspect-[3/2]">
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
                  px-3
                  py-1.5
                  text-[11px]
                  sm:text-xs
                  font-semibold
                  backdrop-blur-md
                  transition-all
                  duration-200
                  ${
                    selected
                      ? `
                        -top-10
                        bg-orange-400
                        text-stone-950
                        shadow-lg
                        opacity-100
                        scale-100
                      `
                      : `
                        -top-9
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

      {/* Selected equipment */}
      <div className="mt-5 rounded-2xl border border-stone-700/80 bg-stone-900/70 backdrop-blur-md p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-white">
            Selected equipment
            <span className="ml-2 text-orange-300">
              ({selectedEquipment.length})
            </span>
          </h3>

          {selectedEquipment.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs sm:text-sm text-stone-500 hover:text-orange-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {selectedEquipment.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedEquipment.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleEquipment(item)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-orange-400/40
                  bg-orange-400/10
                  px-3
                  py-1.5
                  text-xs
                  sm:text-sm
                  font-medium
                  text-orange-200
                  hover:bg-orange-400/20
                  transition-colors
                "
              >
                {item}
                <span className="text-orange-400">×</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-stone-500">
            Nothing selected yet. Tap the equipment in the kitchen above.
          </p>
        )}
      </div>
    </div>
  );
};

export default KitchenEquipmentSelector;