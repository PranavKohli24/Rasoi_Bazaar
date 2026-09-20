import React, { useState } from "react";
import { Recipe, Tip } from "../types";

import {
  getSwiggyAddresses,
  searchInstamartProducts,
  addToInstamartCart,
  searchRestaurants,
  startSwiggyLogin,
  SwiggyAddress,
  InstamartProduct,
  InstamartVariation,
  SwiggyRestaurant,
} from "../services/swiggyService";

import SwiggyActionModal from "./SwiggyActionModal";

interface RecipeDisplayProps {
  recipe: Recipe;
  onFinishCooking: () => void;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const CartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const UtensilsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" />
  </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const BulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M8.5 14.5a6 6 0 1 1 7 0c-.9.6-1.5 1.4-1.5 2.5h-4c0-1.1-.6-1.9-1.5-2.5Z" />
  </svg>
);

const PotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M2 12h20" />
    <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
    <path d="m4 8 16-4" />
    <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
  </svg>
);

/* Section icons (the originals) */

const IngredientsIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path
      fillRule="evenodd"
      d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z"
      clipRule="evenodd"
    />
  </svg>
);

const EquipmentIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 21V3M11 3V8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8V3M15.5 13V3M15.5 13C13.567 13 12 14.7909 12 17C12 19.2091 13.567 21 15.5 21C17.433 21 19 19.2091 19 17C19 14.7909 17.433 13 15.5 13Z" />
  </svg>
);

const MethodIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const NotesIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

/* Pictures reused from the kitchen selector, matched by equipment name */

const EQUIPMENT_IMAGES: [RegExp, string][] = [
  [/microwave/i, "/kitchen/microwave.png"],
  [/air.?fryer/i, "/kitchen/air_fryer.png"],
  [/grinder|mixer|blender/i, "/kitchen/grinder.png"],
  [/cooker/i, "/kitchen/cooker.png"],
  [/kadai|kadhai|wok/i, "/kitchen/kadai.png"],
  [/tawa|griddle/i, "/kitchen/tawa.png"],
  [/oven|tandoor/i, "/kitchen/oven.png"],
  [/stove|gas/i, "/kitchen/stove.png"],
];

const getEquipmentImage = (name: string): string | null =>
  EQUIPMENT_IMAGES.find(([pattern]) => pattern.test(name))?.[1] ?? null;

const isPotLike = (name: string): boolean =>
  /\b(pan|pot|skillet|saucepan)\b/i.test(name);

/* Slide animation for the method steps */

const STEP_ANIMATION_CSS = `
@keyframes step-slide-from-right {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes step-slide-from-left {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
.step-slide-from-right { animation: step-slide-from-right 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
.step-slide-from-left  { animation: step-slide-from-left 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
@media (prefers-reduced-motion: reduce) {
  .step-slide-from-right, .step-slide-from-left { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 shadow-lg transition-all duration-200 hover:bg-orange-100 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800/70 px-5 py-3 font-medium text-stone-100 transition-colors duration-200 hover:bg-stone-700/70 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70";

const SectionTitle: React.FC<{
  id: string;
  title: string;
  icon: React.ReactNode;
  aside?: React.ReactNode;
  flush?: boolean;
}> = ({ id, title, icon, aside, flush = false }) => (
  <div
    className={`${flush ? "" : "mb-5"} flex items-center justify-between gap-4`}
  >
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300">
        {icon}
      </span>
      <h2
        id={id}
        className="font-serif text-2xl font-black tracking-tight text-orange-50 sm:text-3xl"
      >
        {title}
      </h2>
    </div>
    {aside}
  </div>
);

const TipCallout: React.FC<{
  tip: Tip;
}> = ({ tip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tipId = `tip-${tip.title.replace(/\s+/g, "-")}`;

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex max-w-full items-center gap-2 rounded-lg text-left text-sm font-semibold text-orange-300 transition-colors duration-200 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
        aria-expanded={isOpen}
        aria-controls={tipId}
      >
        <BulbIcon className="h-5 w-5 shrink-0" />
        <span>{isOpen ? "Hide tip" : tip.title}</span>
      </button>

      {isOpen && (
        <div
          id={tipId}
          className="mt-3 animate-fade-in-up rounded-xl border-l-4 border-orange-400 bg-orange-400/10 p-4 text-sm leading-relaxed text-orange-100 sm:text-base"
          style={{ animationDuration: "0.3s" }}
        >
          <p>{tip.content}</p>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  recipe,
  onFinishCooking,
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );

  const [flashIndex, setFlashIndex] = useState<number | null>(null);

  const [isCooking, setIsCooking] = useState(false);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Which way the step card should slide in
  const [stepDirection, setStepDirection] = useState<"next" | "prev" | "none">(
    "none"
  );

  const [modalType, setModalType] = useState<"instamart" | "swiggy" | null>(
    null
  );

  const [isModalLoading, setIsModalLoading] = useState(false);

  const [loadingStage, setLoadingStage] = useState<
    "addresses" | "restaurants" | "ingredients" | "cart" | null
  >(null);

  /*
   * -----------------------------
   * Instamart state
   * -----------------------------
   */

  const [swiggyAddresses, setSwiggyAddresses] = useState<SwiggyAddress[]>([]);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const [ingredientProducts, setIngredientProducts] = useState<
    Record<string, InstamartProduct[]>
  >({});

  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, InstamartVariation>
  >({});

  const [instamartCartAdded, setInstamartCartAdded] = useState(false);

  const [swiggyError, setSwiggyError] = useState<string | null>(null);

  const [searchedIngredientsKey, setSearchedIngredientsKey] = useState<
    string | null
  >(null);

  const [lastSearchedAddressId, setLastSearchedAddressId] = useState<
    string | null
  >(null);

  const [isChoosingAddress, setIsChoosingAddress] = useState(false);

  // The full ordered list of ingredient names in this search round
  const [searchIngredientNames, setSearchIngredientNames] = useState<string[]>(
    []
  );

  // Names still waiting on their Instamart search to resolve
  const [pendingIngredientNames, setPendingIngredientNames] = useState<
    string[]
  >([]);

  /*
   * -----------------------------
   * Food state
   * -----------------------------
   */

  const [restaurants, setRestaurants] = useState<SwiggyRestaurant[]>([]);

  /*
   * -----------------------------
   * Recipe handlers
   * -----------------------------
   */

  const handleIngredientToggle = (index: number) => {
    const newCheckedState = [...checkedIngredients];

    const isNowChecked = !newCheckedState[index];
    newCheckedState[index] = isNowChecked;

    setCheckedIngredients(newCheckedState);

    if (isNowChecked) {
      setFlashIndex(index);
      window.setTimeout(() => {
        setFlashIndex((current) => (current === index ? null : current));
      }, 500);
    }
  };

  const handleStartCooking = () => {
    setIsCooking(true);
    setStepDirection("none");
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.method.length - 1) {
      setStepDirection("next");
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setStepDirection("prev");
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  /*
   * -----------------------------
   * Instamart handlers
   * -----------------------------
   */

  const fetchSwiggyAddresses = async () => {
    setIsModalLoading(true);
    setLoadingStage("addresses");

    setSwiggyAddresses([]);
    setSelectedAddressId(null);
    setIngredientProducts({});
    setSelectedProducts({});
    setInstamartCartAdded(false);

    try {
      const addresses = await getSwiggyAddresses();

      setSwiggyAddresses(addresses);

      if (addresses.length === 1) {
        setSelectedAddressId(addresses[0].id);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not connect to Swiggy.";

      if (message === "SWIGGY_NOT_CONNECTED") {
        startSwiggyLogin();
        return;
      }

      setSwiggyError(message);
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  const handleBuyFromInstamart = () => {
    setModalType("instamart");
    setSwiggyError(null);

    // First time ever: fetch addresses
    if (swiggyAddresses.length === 0) {
      fetchSwiggyAddresses();
      return;
    }

    // Already have products from before: check if the ingredient
    // checkboxes changed since that search. If so, silently
    // re-search - same address, no extra taps needed.
    const hasExistingProducts = Object.keys(ingredientProducts).length > 0;

    const currentKey = JSON.stringify(checkedIngredients);

    if (hasExistingProducts && currentKey !== searchedIngredientsKey) {
      setSelectedProducts({});
      setInstamartCartAdded(false);
      handleSearchIngredients();
    }

    // Otherwise: resume exactly as it was, do nothing.
  };

  // Minimize: just hide the modal, keep every bit of state as-is
  const handleMinimizeModal = () => {
    setModalType(null);
  };

  // Close (X): fully reset, for when the user is done with this flow
  const handleCloseModal = () => {
    setModalType(null);
    setSwiggyError(null);
    setSwiggyAddresses([]);
    setSelectedAddressId(null);
    setIngredientProducts({});
    setSelectedProducts({});
    setInstamartCartAdded(false);
    setSearchedIngredientsKey(null);
    setLastSearchedAddressId(null);
    setIsChoosingAddress(false);
    setRestaurants([]);
    setLoadingStage(null);
    setSearchIngredientNames([]);
    setPendingIngredientNames([]);
  };

  const handleSelectAddress = (addressId: string) => {
    // Just record the choice - whether to refetch
    // is decided when the user confirms.
    setSelectedAddressId(addressId);
  };

  const handleGoToAddress = () => {
    setIsChoosingAddress(true);
  };

  const handleConfirmAddress = () => {
    const hasExistingResults =
      modalType === "swiggy"
        ? restaurants.length > 0
        : Object.keys(ingredientProducts).length > 0;

    // Same address as last search: nothing to refetch,
    // just go back to the results screen.
    if (selectedAddressId === lastSearchedAddressId && hasExistingResults) {
      setIsChoosingAddress(false);
      return;
    }

    // Address changed (or first time): re-fetch for this address.
    if (modalType === "swiggy") {
      handleSearchRestaurants();
    } else {
      setInstamartCartAdded(false);
      handleSearchIngredients();
    }
  };

  const handleSearchIngredients = async () => {
    const missingIngredients = recipe.ingredients.filter(
      (_, index) => !checkedIngredients[index]
    );

    if (missingIngredients.length === 0) {
      setIngredientProducts({});
      setSwiggyError("You already have all the ingredients for this recipe.");
      return;
    }

    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");
      return;
    }

    setSwiggyError(null);
    setIngredientProducts({});
    setSelectedProducts({});
    setInstamartCartAdded(false);
    setIsChoosingAddress(false);

    const names = missingIngredients.map((ing) => ing.commonName);

    setSearchIngredientNames(names);
    setPendingIngredientNames(names);

    // Fire every ingredient search in parallel. Each one updates
    // its own result as soon as it resolves, instead of waiting
    // for all of them to finish together.
    await Promise.all(
      missingIngredients.map(async (ingredient) => {
        const query = ingredient.englishName || ingredient.commonName;

        try {
          const products = await searchInstamartProducts(
            selectedAddressId,
            query
          );

          setIngredientProducts((prev) => ({
            ...prev,
            [ingredient.commonName]: products,
          }));
        } catch {
          setIngredientProducts((prev) => ({
            ...prev,
            [ingredient.commonName]: [],
          }));
        } finally {
          setPendingIngredientNames((prev) =>
            prev.filter((name) => name !== ingredient.commonName)
          );
        }
      })
    );

    setSearchedIngredientsKey(JSON.stringify(checkedIngredients));

    setLastSearchedAddressId(selectedAddressId);
  };

  const handleSelectProduct = (
    ingredientName: string,
    variation: InstamartVariation
  ) => {
    if (!variation.isInStockAndAvailable) {
      return;
    }

    setSelectedProducts((current) => {
      const alreadySelected =
        current[ingredientName]?.spinId === variation.spinId;

      if (alreadySelected) {
        const updated = { ...current };
        delete updated[ingredientName];
        return updated;
      }

      return {
        ...current,
        [ingredientName]: variation,
      };
    });
  };

  const handleAddIngredientsToCart = async () => {
    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");

      return;
    }

    const selectedEntries = Object.entries(selectedProducts);

    if (selectedEntries.length === 0) {
      setSwiggyError("Please select at least one product.");

      return;
    }

    setIsModalLoading(true);
    setLoadingStage("cart");
    setSwiggyError(null);

    try {
      const items = selectedEntries.map(([, variation]) => ({
        spinId: variation.spinId,

        skuId: variation.skuId,

        quantity: 1,
      }));

      await addToInstamartCart(selectedAddressId, items);

      setInstamartCartAdded(true);
    } catch (error) {
      setSwiggyError(
        error instanceof Error
          ? error.message
          : "Could not update your Instamart cart."
      );
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  /*
   * -----------------------------
   * Food ordering
   * -----------------------------
   */

  const handleSearchRestaurants = async () => {
    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");
      return;
    }

    setIsModalLoading(true);
    setLoadingStage("restaurants");
    setSwiggyError(null);
    setRestaurants([]);

    try {
      const results = await searchRestaurants(
        selectedAddressId,
        recipe.dishName
      );

      setRestaurants(results);

      setLastSearchedAddressId(selectedAddressId);

      setIsChoosingAddress(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not search restaurants.";

      if (message === "SWIGGY_NOT_CONNECTED") {
        startSwiggyLogin();
        return;
      }

      setSwiggyError(message);
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  const handleOrderFromSwiggy = () => {
    setModalType("swiggy");
    setSwiggyError(null);

    // Fetch saved addresses only if we haven't loaded them yet.
    if (swiggyAddresses.length === 0) {
      setIsChoosingAddress(true);
      fetchSwiggyAddresses();
      return;
    }

    // Already have restaurant results from before: resume exactly
    // as it was, don't force the address screen.
    if (restaurants.length > 0) {
      setIsChoosingAddress(false);
      return;
    }

    // Have addresses but no results yet: show the picker.
    setIsChoosingAddress(true);
  };

  /*
   * -----------------------------
   * Render
   * -----------------------------
   */

  const checkedCount = checkedIngredients.filter(Boolean).length;
  const totalSteps = recipe.method.length;
  const currentStep = recipe.method[currentStepIndex];
  const isLastStep = currentStepIndex >= totalSteps - 1;

  const stepAnimationClass =
    stepDirection === "next"
      ? "step-slide-from-right"
      : stepDirection === "prev"
      ? "step-slide-from-left"
      : "animate-fade-in-up";

  return (
    <div className="w-full animate-fade-in-up">
      <style>{STEP_ANIMATION_CSS}</style>

      {/* Header */}
      <header className="max-w-3xl">
        <h1 className="font-serif text-4xl font-black leading-[1.05] tracking-tight text-orange-50 sm:text-5xl lg:text-6xl">
          {recipe.dishName}
        </h1>

        <p className="mt-4 font-serif text-lg italic leading-relaxed text-orange-200/90 sm:text-xl">
          “{recipe.description}”
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-2 text-sm text-stone-300">
          <li className="inline-flex items-center gap-1.5 rounded-full border border-stone-700 bg-stone-900/60 px-3 py-1.5">
            <ClockIcon className="h-4 w-4 text-orange-300" />
            {recipe.prepTime}
          </li>
        </ul>

        <div className="mt-5">
          <button
            type="button"
            onClick={handleOrderFromSwiggy}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-medium text-orange-200 transition-colors duration-150 hover:bg-orange-400/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
          >
            <UtensilsIcon className="h-4 w-4" />
            Don&apos;t want to cook today? Order from Swiggy
          </button>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-5 lg:gap-12">
        {/* Ingredients */}
        <aside className="lg:sticky lg:top-24 lg:col-span-2 lg:self-start">
          <section
            aria-labelledby="ingredients-heading"
            className="flex flex-col rounded-3xl border border-stone-800 bg-stone-900/60 shadow-xl shadow-black/20 lg:max-h-[calc(100vh-7.5rem)]"
          >
            {/* Header: sticks while the list scrolls past (phones/tablets),
                and stays put above the scrolling list on desktop */}
            <div className="sticky top-0 z-10 shrink-0 rounded-t-3xl border-b border-stone-800/80 bg-stone-900/95 px-5 pb-4 pt-5 backdrop-blur sm:top-16 sm:px-6 sm:pt-6 lg:static">
            <SectionTitle
              flush
              id="ingredients-heading"
              title="Ingredients"
              icon={<IngredientsIcon />}
              aside={
                <span
                  className="rounded-full bg-orange-400/10 px-2.5 py-1 text-xs font-medium text-orange-200"
                  aria-label={`${checkedCount} of ${recipe.ingredients.length} ingredients ticked`}
                >
                  {checkedCount}/{recipe.ingredients.length}
                </span>
              }
            />
            </div>

            {/* Scrolls inside the card on desktop only; on phones the page scrolls */}
            <div className="relative lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:[scrollbar-color:#44403c_transparent] lg:[scrollbar-width:thin]">
            <ul className="px-2 py-2 sm:px-3 lg:pb-8">
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>
                  <label
                    className={`group flex cursor-pointer items-start gap-3.5 rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-stone-800/50 ${
                      flashIndex === index ? "bg-orange-200/10" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checkedIngredients[index]}
                      onChange={() => handleIngredientToggle(index)}
                      className="peer sr-only"
                    />

                    <span
                      className={`relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-300 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-stone-900 ${
                        checkedIngredients[index]
                          ? "border-orange-200 bg-orange-200"
                          : "border-stone-500 bg-stone-800 group-hover:border-stone-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="#1c1917"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-3.5 w-3.5 transition-all duration-200 ${
                          checkedIngredients[index]
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0"
                        }`}
                      >
                        <path d="M4 10l4 4 8-8" />
                      </svg>
                    </span>

                    <span
                      className={`min-w-0 flex-1 transition-colors duration-300 ${
                        checkedIngredients[index]
                          ? "text-stone-500 line-through"
                          : "text-stone-300 group-hover:text-stone-100"
                      }`}
                    >
                      <span className="block leading-snug">
                        <span
                          className={`font-semibold ${
                            checkedIngredients[index]
                              ? "text-stone-500"
                              : "text-orange-50"
                          }`}
                        >
                          {ing.amount}
                        </span>{" "}
                        {ing.commonName}
                      </span>
                      <span className="block text-sm text-stone-500">
                        {ing.englishName}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>

              {/* Fade hint that there is more to scroll (desktop) */}
              <div
                aria-hidden="true"
                className="pointer-events-none sticky bottom-0 -mt-8 hidden h-8 bg-gradient-to-t from-stone-900 to-transparent lg:block"
              />
            </div>

            <div className="shrink-0 border-t border-stone-800 p-5 sm:p-6">
              <button
                type="button"
                onClick={handleBuyFromInstamart}
                className={`${secondaryButton} w-full`}
              >
                <CartIcon className="h-5 w-5 text-orange-300" />
                Don&apos;t have these? Buy from Instamart
              </button>
              <p className="mt-2.5 text-center text-xs text-stone-500">
                We&apos;ll only search for what you haven&apos;t ticked.
              </p>
            </div>
          </section>
        </aside>

        {/* Equipment, method, notes */}
        <div className="flex flex-col gap-12 lg:col-span-3">
          {/* Equipment */}
          <section aria-labelledby="equipment-heading">
            <SectionTitle
              id="equipment-heading"
              title="Equipment"
              icon={<EquipmentIcon />}
            />

            <ul className="grid items-start gap-3 sm:grid-cols-2">
              {recipe.equipment.map((tool, index) => {
                const image = getEquipmentImage(tool.item);
                const special = tool.isSpecialized;

                return (
                  <li
                    key={index}
                    className={`rounded-2xl border p-3.5 sm:p-4 ${
                      special
                        ? "border-orange-400/30 bg-orange-400/5"
                        : "border-stone-800 bg-stone-900/50"
                    } ${special && tool.alternative ? "sm:col-span-2" : ""}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-800/80 ring-1 ring-stone-700/60">
                        {image ? (
                          <img
                            src={image}
                            alt=""
                            className="max-h-9 max-w-9 object-contain"
                            draggable={false}
                          />
                        ) : isPotLike(tool.item) ? (
                          <PotIcon className="h-6 w-6 text-orange-300" />
                        ) : (
                          <UtensilsIcon className="h-6 w-6 text-orange-300" />
                        )}
                      </span>

                      <div className="min-w-0">
                        <p className="font-medium leading-snug text-stone-100">
                          {tool.item}
                        </p>

                        {special && (
                          <span className="mt-1 inline-block rounded-full bg-orange-400/15 px-2 py-0.5 text-xs font-medium text-orange-200">
                            Heads up
                          </span>
                        )}
                      </div>
                    </div>

                    {special && tool.alternative && (
                      <p className="mt-3 rounded-xl bg-stone-950/40 p-3 text-sm leading-relaxed text-orange-100">
                        <span className="font-semibold">Alternative:</span>{" "}
                        {tool.alternative}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Method */}
          <section
            aria-labelledby="method-heading"
            className="border-t border-stone-800 pt-10"
          >
            <SectionTitle
              id="method-heading"
              title="Method"
              icon={<MethodIcon />}
              aside={
                isCooking ? (
                  <span className="text-sm text-stone-400">
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                ) : undefined
              }
            />

            {!isCooking ? (
              <div className="flex flex-col gap-5 rounded-3xl border border-dashed border-stone-700 bg-stone-900/30 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="font-serif text-xl font-black text-orange-50 sm:text-2xl">
                    Ready when you are
                  </p>
                  <p className="mt-1 text-sm text-stone-400 sm:text-base">
                    We&apos;ll walk you through {totalSteps} steps, one at a
                    time.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStartCooking}
                  className={`${primaryButton} w-full shrink-0 sm:w-auto`}
                >
                  <PlayIcon className="h-5 w-5" />
                  Start cooking
                </button>
              </div>
            ) : (
              <div>
                <div
                  aria-live="polite"
                  className="overflow-hidden rounded-3xl border border-stone-800 bg-stone-900/60 p-5 shadow-xl shadow-black/20 sm:p-8"
                >
                  {/* Progress (stays put while the step slides) */}
                  <div
                    className="flex gap-1.5"
                    role="progressbar"
                    aria-valuemin={1}
                    aria-valuemax={totalSteps}
                    aria-valuenow={currentStepIndex + 1}
                    aria-label="Recipe progress"
                  >
                    {recipe.method.map((_, index) => (
                      <span
                        key={index}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                          index <= currentStepIndex
                            ? "bg-orange-300"
                            : "bg-stone-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next slides in from the right, Previous from the left */}
                  <div key={currentStepIndex} className={stepAnimationClass}>
                    <p className="mt-6 text-sm font-semibold text-orange-300">
                      Step {currentStepIndex + 1}
                    </p>

                    <p className="mt-2 text-xl leading-relaxed text-stone-50 sm:text-2xl sm:leading-relaxed">
                      {currentStep.instruction}
                    </p>

                    {currentStep.tip?.title?.trim() &&
                      currentStep.tip?.content?.trim() && (
                        <TipCallout tip={currentStep.tip!} />
                      )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className={`${secondaryButton} flex-1 sm:flex-none`}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                    Previous
                  </button>

                  {!isLastStep ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className={`${primaryButton} flex-1 sm:flex-none sm:px-8`}
                    >
                      Next
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onFinishCooking}
                      className={`${primaryButton} flex-1 sm:flex-none sm:px-8`}
                    >
                      I&apos;m done cooking
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Notes */}
          {recipe.notes && recipe.notes.length > 0 && (
            <section
              aria-labelledby="notes-heading"
              className="border-t border-stone-800 pt-10"
            >
              <SectionTitle
                id="notes-heading"
                title="Notes & tips"
                icon={<NotesIcon />}
              />

              <ul className="space-y-3 rounded-2xl border border-stone-800 bg-stone-900/50 p-5 sm:p-6">
                {recipe.notes.map((note, index) => (
                  <li
                    key={index}
                    className="flex gap-3 leading-relaxed text-stone-300"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Swiggy / Instamart Modal */}
      <SwiggyActionModal
        type={modalType}
        isLoading={isModalLoading}
        loadingStage={loadingStage}
        restaurants={restaurants}
        addresses={swiggyAddresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={handleSelectAddress}
        onContinueAddress={handleConfirmAddress}
        onGoToAddress={handleGoToAddress}
        onConfirmAddress={handleConfirmAddress}
        isChoosingAddress={isChoosingAddress}
        ingredientProducts={ingredientProducts}
        searchIngredientNames={searchIngredientNames}
        pendingIngredientNames={pendingIngredientNames}
        selectedProducts={selectedProducts}
        onSelectProduct={handleSelectProduct}
        onAddIngredients={handleAddIngredientsToCart}
        cartAdded={instamartCartAdded}
        error={swiggyError}
        onMinimize={handleMinimizeModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecipeDisplay;