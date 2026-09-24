import React, { useEffect, useRef, useState } from "react";
import { Recipe, Tip } from "../types";
import {
  getSwiggyAddresses,
  searchInstamartProducts,
  addToInstamartCart,
  searchRestaurants,
  addDishToFoodCart,
  startSwiggyLogin,
  MAX_CART_QUANTITY,
  SwiggyAddress,
  InstamartProduct,
  InstamartVariation,
  SwiggyRestaurant,
} from "../services/swiggyService";
import SwiggyActionModal from "./SwiggyActionModal";

import NutritionInfo from "./NutritionInfo";

interface RecipeDisplayProps {
  recipe: Recipe;
  onFinishCooking: () => void;
}

/* ---------- Icons ---------- */

const Icon: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {children}
  </svg>
);

type IconC = React.FC<{ className?: string }>;

const ClockIcon: IconC = ({ className }) => (
  <Icon className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
);
const CartIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </Icon>
);
const UtensilsIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </Icon>
);
const PlayIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" />
  </Icon>
);
const ChevronLeftIcon: IconC = ({ className }) => (
  <Icon className={className}><path d="m15 18-6-6 6-6" /></Icon>
);
const ChevronRightIcon: IconC = ({ className }) => (
  <Icon className={className}><path d="m9 18 6-6-6-6" /></Icon>
);
const BulbIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M9 18h6" /><path d="M10 22h4" />
    <path d="M8.5 14.5a6 6 0 1 1 7 0c-.9.6-1.5 1.4-1.5 2.5h-4c0-1.1-.6-1.9-1.5-2.5Z" />
  </Icon>
);
const PotIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M2 12h20" /><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
    <path d="m4 8 16-4" />
    <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
  </Icon>
);
const IngredientsIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" />
  </Icon>
);
const MethodIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" />
    <path d="M9 6h11" />
    <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
    <path d="M9 12h11" />
    <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
    <path d="M9 18h11" />
  </Icon>
);
const NotesIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6" />
    <path d="M9 13h6" />
    <path d="M9 17h4" />
  </Icon>
);
const EquipmentIcon: IconC = ({ className }) => (
  <Icon className={className}>
    <circle cx="10" cy="14" r="7" />
    <path d="M15 9l6-6" />
  </Icon>
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

const STEP_ANIMATION_CSS = `
@keyframes step-slide-from-right { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
@keyframes step-slide-from-left { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
.step-slide-from-right { animation: step-slide-from-right 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
.step-slide-from-left { animation: step-slide-from-left 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
@media (prefers-reduced-motion: reduce) { .step-slide-from-right, .step-slide-from-left { animation: none; } }
`;

/* ---------- Shared UI ---------- */

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-orange-200 px-5 py-3 font-semibold text-stone-900 shadow-md transition-all duration-200 hover:bg-orange-100 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-5 py-3 font-medium text-stone-100 transition-colors duration-200 hover:border-orange-300/70 hover:bg-orange-400/10 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70";

const card = "rounded-3xl border border-stone-700 bg-stone-900 shadow-[0_8px_30px_rgba(120,70,30,0.08)]";

const SectionTitle: React.FC<{
  id: string;
  title: string;
  icon: React.ReactNode;
  aside?: React.ReactNode;
  flush?: boolean;
}> = ({ id, title, icon, aside, flush = false }) => (
  <div className={`${flush ? "" : "mb-5"} flex items-center justify-between gap-4`}>
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFE8D6] text-orange-200">
        {icon}
      </span>
      <h2 id={id} className="font-serif text-2xl font-black tracking-tight text-orange-50 sm:text-3xl">
        {title}
      </h2>
    </div>
    {aside}
  </div>
);

const TipCallout: React.FC<{ tip: Tip }> = ({ tip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tipId = `tip-${tip.title.replace(/\s+/g, "-")}`;

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex max-w-full items-center gap-2 rounded-lg text-left text-sm font-semibold text-orange-200 transition-colors duration-200 hover:text-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
        aria-expanded={isOpen}
        aria-controls={tipId}
      >
        <BulbIcon className="h-5 w-5 shrink-0" />
        <span>{isOpen ? "Hide tip" : tip.title}</span>
      </button>

      {isOpen && (
        <div
          id={tipId}
          className="mt-3 animate-fade-in-up rounded-xl border-l-4 border-orange-300 bg-[#FFF1C9] p-4 text-sm leading-relaxed text-stone-200 sm:text-base"
          style={{ animationDuration: "0.3s" }}
        >
          <p>{tip.content}</p>
        </div>
      )}
    </div>
  );
};

/* ---------- Component ---------- */

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onFinishCooking }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );
  const [flashIndex, setFlashIndex] = useState<number | null>(null);

  // The ingredients card stays pinned on desktop only if it fits on screen.
  const ingredientsCardRef = useRef<HTMLElement>(null);
  const [canStick, setCanStick] = useState(true);

  useEffect(() => {
    const element = ingredientsCardRef.current;
    if (!element) return;

    const update = () =>
      setCanStick(element.offsetHeight <= window.innerHeight - 120);

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const [isCooking, setIsCooking] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepDirection, setStepDirection] = useState<"next" | "prev" | "none">("none");
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const [modalType, setModalType] = useState<"instamart" | "swiggy" | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<
    "addresses" | "restaurants" | "ingredients" | "cart" | null
  >(null);

  // Instamart state
  const [swiggyAddresses, setSwiggyAddresses] = useState<SwiggyAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [ingredientProducts, setIngredientProducts] = useState<Record<string, InstamartProduct[]>>({});
  const [selectedProducts, setSelectedProducts] = useState<Record<string, InstamartVariation>>({});
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [instamartCartAdded, setInstamartCartAdded] = useState(false);
  const [swiggyError, setSwiggyError] = useState<string | null>(null);
  const [searchedIngredientsKey, setSearchedIngredientsKey] = useState<string | null>(null);
  const [lastSearchedAddressId, setLastSearchedAddressId] = useState<string | null>(null);
  const [isChoosingAddress, setIsChoosingAddress] = useState(false);
  const [searchIngredientNames, setSearchIngredientNames] = useState<string[]>([]);
  const [pendingIngredientNames, setPendingIngredientNames] = useState<string[]>([]);

  // Food state
  const [restaurants, setRestaurants] = useState<SwiggyRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SwiggyRestaurant | null>(null);
  const [foodCartAdded, setFoodCartAdded] = useState(false);

  // Sends the person to sign in with Swiggy; if it can't, say so.
  const redirectToLogin = () => {
    if (!startSwiggyLogin()) {
      setSwiggyError("We couldn't sign you in to Swiggy. Please try again in a minute.");
    }
  };

  /* ----- Recipe handlers ----- */

  const handleIngredientToggle = (index: number) => {
    const next = [...checkedIngredients];
    const isNowChecked = !next[index];
    next[index] = isNowChecked;
    setCheckedIngredients(next);

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

  // Swipe on the step card: left = next step, right = previous step.
  // Needs a clearly horizontal drag, so normal vertical scrolling is untouched.
  const SWIPE_MIN_DISTANCE = 50;

  const handleTouchStart = (event: React.TouchEvent) => {
    // Ignore pinch / multi-finger gestures
    if (event.touches.length !== 1) {
      touchStart.current = null;
      return;
    }
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.5) return; // mostly vertical: not a swipe

    if (dx < 0) handleNextStep();
    else handlePrevStep();
  };

  /* ----- Instamart handlers ----- */

  const fetchSwiggyAddresses = async () => {
    setIsModalLoading(true);
    setLoadingStage("addresses");
    setSwiggyAddresses([]);
    setSelectedAddressId(null);
    setIngredientProducts({});
    setSelectedProducts({});
    setProductQuantities({});
    setInstamartCartAdded(false);

    try {
      const addresses = await getSwiggyAddresses();
      setSwiggyAddresses(addresses);
      if (addresses.length === 1) setSelectedAddressId(addresses[0].id);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not connect to Swiggy.";
      if (message === "SWIGGY_NOT_CONNECTED") {
        redirectToLogin();
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

    if (swiggyAddresses.length === 0) {
      fetchSwiggyAddresses();
      return;
    }

    // If the ticked ingredients changed since the last search, silently re-search.
    const hasExistingProducts = Object.keys(ingredientProducts).length > 0;
    const currentKey = JSON.stringify(checkedIngredients);

    if (hasExistingProducts && currentKey !== searchedIngredientsKey) {
      setSelectedProducts({});
      setProductQuantities({});
      setInstamartCartAdded(false);
      handleSearchIngredients();
    }
  };

  // Minimize keeps all state; Close resets the whole flow.
  const handleMinimizeModal = () => setModalType(null);

  const handleCloseModal = () => {
    setModalType(null);
    setSwiggyError(null);
    setSwiggyAddresses([]);
    setSelectedAddressId(null);
    setIngredientProducts({});
    setSelectedProducts({});
    setProductQuantities({});
    setInstamartCartAdded(false);
    setSearchedIngredientsKey(null);
    setLastSearchedAddressId(null);
    setIsChoosingAddress(false);
    setRestaurants([]);
    setSelectedRestaurant(null);
    setFoodCartAdded(false);
    setLoadingStage(null);
    setSearchIngredientNames([]);
    setPendingIngredientNames([]);
  };

  const handleSelectAddress = (addressId: string) => setSelectedAddressId(addressId);
  const handleGoToAddress = () => setIsChoosingAddress(true);

  const handleConfirmAddress = () => {
    const hasExistingResults =
      modalType === "swiggy"
        ? restaurants.length > 0
        : Object.keys(ingredientProducts).length > 0;

    // Same address as last search: just go back to the results.
    if (selectedAddressId === lastSearchedAddressId && hasExistingResults) {
      setIsChoosingAddress(false);
      return;
    }

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
    setProductQuantities({});
    setInstamartCartAdded(false);
    setIsChoosingAddress(false);

    const names = missingIngredients.map((ing) => ing.commonName);
    setSearchIngredientNames(names);
    setPendingIngredientNames(names);

    // Several searches at a time; busy errors are retried in swiggyService.
    const SEARCH_CONCURRENCY = 5;
    let nextIndex = 0;
    let redirectedToLogin = false;

    const worker = async () => {
      while (nextIndex < missingIngredients.length) {
        const ingredient = missingIngredients[nextIndex++];
        const query = ingredient.englishName || ingredient.commonName;

        try {
          const products = await searchInstamartProducts(selectedAddressId, query);
          setIngredientProducts((prev) => ({ ...prev, [ingredient.commonName]: products }));
        } catch (error) {
          // Login expired: sign in again instead of showing "No match found"
          if (error instanceof Error && error.message === "SWIGGY_NOT_CONNECTED") {
            if (!redirectedToLogin) {
              redirectedToLogin = true;
              redirectToLogin();
            }
            return;
          }
          setIngredientProducts((prev) => ({ ...prev, [ingredient.commonName]: [] }));
        } finally {
          setPendingIngredientNames((prev) =>
            prev.filter((name) => name !== ingredient.commonName)
          );
        }
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(SEARCH_CONCURRENCY, missingIngredients.length) }, worker)
    );

    setSearchedIngredientsKey(JSON.stringify(checkedIngredients));
    setLastSearchedAddressId(selectedAddressId);
  };

  const handleSelectProduct = (ingredientName: string, variation: InstamartVariation) => {
    if (!variation.isInStockAndAvailable) return;

    const alreadySelected = selectedProducts[ingredientName]?.spinId === variation.spinId;

    if (alreadySelected) {
      setSelectedProducts((current) => {
        const updated = { ...current };
        delete updated[ingredientName];
        return updated;
      });
      setProductQuantities((current) => {
        const updated = { ...current };
        delete updated[ingredientName];
        return updated;
      });
      return;
    }

    setSelectedProducts((current) => ({ ...current, [ingredientName]: variation }));
    // Switching pack size keeps the quantity; a first pick starts at 1
    setProductQuantities((current) => ({
      ...current,
      [ingredientName]: current[ingredientName] ?? 1,
    }));
  };

  const handleChangeQuantity = (ingredientName: string, delta: 1 | -1) => {
    setProductQuantities((current) => {
      const next = Math.min(
        MAX_CART_QUANTITY,
        Math.max(1, (current[ingredientName] ?? 1) + delta)
      );
      return { ...current, [ingredientName]: next };
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
      const items = selectedEntries.map(([ingredientName, variation]) => ({
        spinId: variation.spinId,
        skuId: variation.skuId,
        quantity: productQuantities[ingredientName] ?? 1,
      }));

      await addToInstamartCart(selectedAddressId, items);
      setInstamartCartAdded(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not update your Instamart cart.";

      // The Swiggy login lasts about 5 days: sign in again instead of showing an error
      if (message === "SWIGGY_NOT_CONNECTED") {
        redirectToLogin();
        return;
      }
      setSwiggyError(message);
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  /* ----- Food ordering ----- */

  const handleSearchRestaurants = async () => {
    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");
      return;
    }

    setIsModalLoading(true);
    setLoadingStage("restaurants");
    setSwiggyError(null);
    setRestaurants([]);
    setSelectedRestaurant(null);
    setFoodCartAdded(false);

    try {
      const results = await searchRestaurants(selectedAddressId, recipe.dishName);
      setRestaurants(results);
      setLastSearchedAddressId(selectedAddressId);
      setIsChoosingAddress(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not search restaurants.";
      if (message === "SWIGGY_NOT_CONNECTED") {
        redirectToLogin();
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

    if (swiggyAddresses.length === 0) {
      setIsChoosingAddress(true);
      fetchSwiggyAddresses();
      return;
    }

    // Results already loaded: resume as it was. Otherwise show the picker.
    setIsChoosingAddress(restaurants.length === 0);
  };

  const handleSelectRestaurant = (restaurant: SwiggyRestaurant) => {
    setSelectedRestaurant(restaurant);
    setFoodCartAdded(false);
    setSwiggyError(null);
  };

  const handleAddDishToSwiggyCart = async () => {
    if (!selectedAddressId) {
      setSwiggyError("Please select a delivery address.");
      return;
    }
    if (!selectedRestaurant) {
      setSwiggyError("Please select a restaurant.");
      return;
    }

    setIsModalLoading(true);
    setLoadingStage("cart");
    setSwiggyError(null);

    try {
      await addDishToFoodCart(
        selectedAddressId,
        selectedRestaurant.id,
        selectedRestaurant.name,
        recipe.dishName
      );
      setFoodCartAdded(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not add this dish to your Swiggy cart.";
      if (message === "SWIGGY_NOT_CONNECTED") {
        redirectToLogin();
        return;
      }
      setSwiggyError(message);
    } finally {
      setIsModalLoading(false);
      setLoadingStage(null);
    }
  };

  /* ----- Render ----- */

  // "Paneer" -> "200 g", so the modal can show what the recipe needs
  const ingredientAmounts: Record<string, string> = Object.fromEntries(
    recipe.ingredients.map((ing) => [ing.commonName, ing.amount])
  );

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

        <p className="mt-4 font-serif text-lg italic leading-relaxed text-stone-400 sm:text-xl">
          “{recipe.description}”
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-2 text-sm text-stone-200">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1C9] px-3 py-1.5 font-medium">
            <ClockIcon className="h-4 w-4 text-orange-200" />
            {recipe.prepTime}
          </li>
          <li>
            <NutritionInfo nutrition={recipe.nutrition} />
          </li>
        </ul>

        <div className="mt-5">
          <button
            type="button"
            onClick={handleOrderFromSwiggy}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/40 bg-stone-900 px-4 py-2 text-sm font-medium text-orange-200 transition-colors duration-150 hover:bg-orange-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
          >
            <UtensilsIcon className="h-4 w-4" />
            Don&apos;t want to cook today? Order from Swiggy
          </button>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-5 lg:gap-12">
        {/* Ingredients */}
        <aside className={`lg:col-span-2 lg:self-start ${canStick ? "lg:sticky lg:top-24" : ""}`}>
          <section ref={ingredientsCardRef} aria-labelledby="ingredients-heading" className={card}>
            <div className="sticky top-0 z-10 rounded-t-3xl border-b border-stone-700 bg-stone-900/95 px-5 pb-4 pt-5 backdrop-blur sm:top-16 sm:px-6 sm:pt-6">
              <SectionTitle
                flush
                id="ingredients-heading"
                title="Ingredients"
                icon={<IngredientsIcon className="h-6 w-6" />}
                aside={
                  <span
                    className="rounded-full bg-orange-400/15 px-2.5 py-1 text-xs font-semibold text-orange-100"
                    aria-label={`${checkedCount} of ${recipe.ingredients.length} ingredients ticked`}
                  >
                    {checkedCount}/{recipe.ingredients.length}
                  </span>
                }
              />
            </div>

            <ul className="px-2 py-2 sm:px-3">
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>
                  <label
                    className={`group flex cursor-pointer items-start gap-3.5 rounded-xl px-3 py-2.5 transition-colors duration-300 hover:bg-stone-950 ${
                      flashIndex === index ? "bg-orange-400/10" : ""
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
                          : "border-stone-600 bg-stone-900 group-hover:border-orange-300"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-3.5 w-3.5 transition-all duration-200 ${
                          checkedIngredients[index] ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                      >
                        <path d="M4 10l4 4 8-8" />
                      </svg>
                    </span>

                    <span
                      className={`min-w-0 flex-1 transition-colors duration-300 ${
                        checkedIngredients[index] ? "text-stone-500 line-through" : "text-stone-300"
                      }`}
                    >
                      <span className="block leading-snug">
                        <span
                          className={`font-semibold ${
                            checkedIngredients[index] ? "text-stone-500" : "text-stone-100"
                          }`}
                        >
                          {ing.amount}
                        </span>{" "}
                        {ing.commonName}
                      </span>
                      <span className="block text-sm text-stone-500">{ing.englishName}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="border-t border-stone-700 p-5 sm:p-6">
              <button type="button" onClick={handleBuyFromInstamart} className={`${secondaryButton} w-full`}>
                <CartIcon className="h-5 w-5 text-orange-200" />
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
            <SectionTitle id="equipment-heading" title="Equipment" icon={<EquipmentIcon className="h-6 w-6" />} />

            <ul className="grid items-start gap-3 sm:grid-cols-2">
              {recipe.equipment.map((tool, index) => {
                const image = getEquipmentImage(tool.item);
                const special = tool.isSpecialized;

                return (
                  <li
                    key={index}
                    className={`rounded-2xl border p-3.5 shadow-sm sm:p-4 ${
                      special ? "border-orange-400/40 bg-[#FFF1C9]/60" : "border-stone-700 bg-stone-900"
                    } ${special && tool.alternative ? "sm:col-span-2" : ""}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFE8D6]">
                        {image ? (
                          <img src={image} alt="" className="max-h-9 max-w-9 object-contain" draggable={false} />
                        ) : isPotLike(tool.item) ? (
                          <PotIcon className="h-6 w-6 text-orange-200" />
                        ) : (
                          <EquipmentIcon className="h-6 w-6 text-orange-200" />
                        )}
                      </span>

                      <div className="min-w-0">
                        <p className="font-medium leading-snug text-stone-100">{tool.item}</p>
                        {special && (
                          <span className="mt-1 inline-block rounded-full bg-orange-400/20 px-2 py-0.5 text-xs font-semibold text-orange-100">
                            Heads up
                          </span>
                        )}
                      </div>
                    </div>

                    {special && tool.alternative && (
                      <p className="mt-3 rounded-xl bg-stone-900 p-3 text-sm leading-relaxed text-stone-300">
                        <span className="font-semibold text-stone-100">Alternative:</span>{" "}
                        {tool.alternative}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Method */}
          <section aria-labelledby="method-heading" className="border-t border-stone-700 pt-10">
            <SectionTitle
              id="method-heading"
              title="Method"
              icon={<MethodIcon className="h-6 w-6" />}
              aside={
                isCooking ? (
                  <span className="text-sm text-stone-400">
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                ) : undefined
              }
            />

            {!isCooking ? (
              <div className="flex flex-col gap-5 rounded-3xl border border-dashed border-orange-400/50 bg-[#FFE8D6]/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="font-serif text-xl font-black text-orange-50 sm:text-2xl">Ready when you are</p>
                  <p className="mt-1 text-sm text-stone-400 sm:text-base">
                    We&apos;ll walk you through {totalSteps} steps, one at a time.
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
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={() => {
                    touchStart.current = null;
                  }}
                  className={`${card} touch-pan-y overflow-hidden p-5 sm:p-8`}
                >
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
                          index <= currentStepIndex ? "bg-orange-200" : "bg-stone-700"
                        }`}
                      />
                    ))}
                  </div>

                  <div key={currentStepIndex} className={stepAnimationClass}>
                    <p className="mt-6 text-sm font-semibold text-orange-200">Step {currentStepIndex + 1}</p>

                    <p className="mt-2 text-xl leading-relaxed text-stone-100 sm:text-2xl sm:leading-relaxed">
                      {currentStep.instruction}
                    </p>

                    {currentStep.tip?.title?.trim() && currentStep.tip?.content?.trim() && (
                      <TipCallout tip={currentStep.tip!} />
                    )}
                  </div>
                </div>

                <p className="mt-3 text-center text-xs text-stone-500 sm:hidden">
                  Swipe left or right to change steps
                </p>

                <div className="mt-4 flex items-center gap-3">
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
            <section aria-labelledby="notes-heading" className="border-t border-stone-700 pt-10">
              <SectionTitle id="notes-heading" title="Notes & tips" icon={<NotesIcon className="h-6 w-6" />} />

              <ul className="space-y-3 rounded-2xl border border-stone-700 bg-[#FFF1C9]/50 p-5 sm:p-6">
                {recipe.notes.map((note, index) => (
                  <li key={index} className="flex gap-3 leading-relaxed text-stone-200">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-200" />
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
        ingredientAmounts={ingredientAmounts}
        quantities={productQuantities}
        onChangeQuantity={handleChangeQuantity}
        onSelectProduct={handleSelectProduct}
        onAddIngredients={handleAddIngredientsToCart}
        cartAdded={instamartCartAdded}
        selectedRestaurant={selectedRestaurant}
        onSelectRestaurant={handleSelectRestaurant}
        onAddDishToCart={handleAddDishToSwiggyCart}
        foodCartAdded={foodCartAdded}
        error={swiggyError}
        onMinimize={handleMinimizeModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecipeDisplay;