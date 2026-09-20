import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  SwiggyAddress,
  InstamartProduct,
  InstamartVariation,
  SwiggyRestaurant,
  MAX_CART_QUANTITY,
} from "../services/swiggyService";

interface SwiggyActionModalProps {
  type: "instamart" | "swiggy" | null;
  isLoading: boolean;
  loadingStage?: "addresses" | "restaurants" | "ingredients" | "cart" | null;
  restaurants: SwiggyRestaurant[];
  addresses?: SwiggyAddress[];
  selectedAddressId?: string | null;
  onSelectAddress?: (addressId: string) => void;
  onContinueAddress?: () => void;
  onGoToAddress?: () => void;
  onConfirmAddress?: () => void;
  isChoosingAddress?: boolean;
  ingredientProducts?: Record<string, InstamartProduct[]>;
  searchIngredientNames?: string[];
  pendingIngredientNames?: string[];
  selectedProducts?: Record<string, InstamartVariation>;
  /** Ingredient name -> amount the recipe needs, e.g. "Paneer" -> "200 g" */
  ingredientAmounts?: Record<string, string>;
  /** Ingredient name -> how many packs to add */
  quantities?: Record<string, number>;
  onChangeQuantity?: (ingredientName: string, delta: 1 | -1) => void;
  onSelectProduct?: (
    ingredientName: string,
    variation: InstamartVariation
  ) => void;
  onAddIngredients?: () => void;
  cartAdded?: boolean;
  selectedRestaurant?: SwiggyRestaurant | null;
  onSelectRestaurant?: (restaurant: SwiggyRestaurant) => void;
  onAddDishToCart?: () => void;
  foodCartAdded?: boolean;
  error?: string | null;
  onMinimize: () => void;
  onClose: () => void;
}

type Step = "address" | "products" | "done";

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const MinusIcon: React.FC = () => (
  <svg {...svgProps} className="h-5 w-5">
    <path d="M5 12h14" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg {...svgProps} className="h-5 w-5">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} strokeWidth={3} className={className}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const PinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const UtensilsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const RestaurantCard: React.FC<{
  restaurant: SwiggyRestaurant;
  selected?: boolean;
  onSelect?: (restaurant: SwiggyRestaurant) => void;
}> = ({ restaurant, selected = false, onSelect }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const meta = [
    restaurant.deliveryText,
    restaurant.distanceText,
    restaurant.costForTwoText,
  ].filter(Boolean);

  const cuisines = restaurant.cuisines?.slice(0, 3).join(", ");

  return (
    <li
      className={`rounded-2xl border bg-stone-900 transition-colors ${
        selected ? "border-orange-300/80 bg-orange-300/10" : "border-stone-800"
      } ${restaurant.isOpen ? "" : "opacity-60"}`}
    >
      <button
        type="button"
        disabled={!restaurant.isOpen}
        onClick={() => onSelect?.(restaurant)}
        aria-label={`Order ${restaurant.name} on Swiggy`}
        className="flex w-full gap-3.5 p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 disabled:cursor-not-allowed"
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-800">
          {restaurant.imageUrl && !imageFailed ? (
            <img
              src={restaurant.imageUrl}
              alt=""
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-orange-300/80">
              <UtensilsIcon className="h-7 w-7" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium leading-snug text-stone-100">
            {restaurant.name}
          </p>

          {cuisines && (
            <p className="mt-0.5 truncate text-xs text-stone-400">{cuisines}</p>
          )}

          {meta.length > 0 && (
            <p className="mt-1.5 text-xs text-stone-300">{meta.join(" · ")}</p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {!restaurant.isOpen && (
              <span className="rounded-full bg-stone-800 px-2 py-0.5 text-[11px] font-medium text-stone-300">
                Closed now
              </span>
            )}

            {restaurant.veg && (
              <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                Pure veg
              </span>
            )}

            {restaurant.offer && (
              <span className="max-w-full truncate rounded-full bg-orange-400/10 px-2 py-0.5 text-[11px] font-medium text-orange-200">
                {restaurant.offer}
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  );
};

const primaryButton =
  "w-full rounded-xl bg-orange-200 py-3.5 text-sm font-semibold text-stone-900 shadow-lg transition-all duration-150 hover:bg-orange-100 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 disabled:cursor-not-allowed disabled:bg-stone-800 disabled:text-stone-500 disabled:shadow-none disabled:active:scale-100";

const StepProgress: React.FC<{
  step: Step;
  hasProducts: boolean;
  secondLabel: string;
  onAddressClick?: () => void;
  onIngredientsClick?: () => void;
}> = ({
  step,
  hasProducts,
  secondLabel,
  onAddressClick,
  onIngredientsClick,
}) => {
  const steps: { key: Step; label: string }[] = [
    { key: "address", label: "Address" },
    { key: "products", label: secondLabel },
    { key: "done", label: "Done" },
  ];

  const activeIndex = steps.findIndex((s) => s.key === step);

  // "Done" only applies to the Instamart flow
  const visibleSteps = steps.slice(0, 2);

  return (
    <div className="mt-4 flex items-center gap-3">
      {visibleSteps.map((s, i) => {
        const isClickableAddress = s.key === "address" && step === "products";

        const isClickableIngredients =
          s.key === "products" && step === "address" && hasProducts;

        const isClickable = isClickableAddress || isClickableIngredients;

        const clickHandler = isClickableAddress
          ? onAddressClick
          : onIngredientsClick;

        const reached = i <= activeIndex;

        return (
          <React.Fragment key={s.key}>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-300 ${
                  reached
                    ? "bg-orange-200 text-stone-900"
                    : "border border-stone-700 text-stone-500"
                }`}
              >
                {i + 1}
              </span>

              {isClickable ? (
                <button
                  type="button"
                  onClick={clickHandler}
                  className="rounded text-sm text-stone-400 transition-colors hover:text-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
                >
                  {s.label}
                </button>
              ) : (
                <span
                  className={`text-sm transition-colors duration-300 ${
                    i === activeIndex
                      ? "font-medium text-orange-200"
                      : "text-stone-400"
                  }`}
                >
                  {s.label}
                </span>
              )}
            </div>

            {i < visibleSteps.length - 1 && (
              <div
                className={`h-px flex-1 transition-colors duration-300 ${
                  i < activeIndex ? "bg-orange-300/60" : "bg-stone-800"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const EmptyAddresses: React.FC = () => (
  <div className="py-10 text-center">
    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-400/10 text-orange-300">
      <PinIcon className="h-6 w-6" />
    </span>

    <h4 className="mt-4 text-base font-medium text-stone-100">
      No delivery address found
    </h4>

    <p className="mt-1.5 text-sm text-stone-400">
      Add an address to your Swiggy account first.
    </p>
  </div>
);

const AddressList: React.FC<{
  addresses?: SwiggyAddress[];
  selectedAddressId?: string | null;
  onSelectAddress?: (addressId: string) => void;
}> = ({ addresses, selectedAddressId, onSelectAddress }) => (
  <div className="space-y-2.5" role="radiogroup" aria-label="Delivery address">
    {addresses?.map((address) => {
      const selected = selectedAddressId === address.id;

      return (
        <button
          key={address.id}
          type="button"
          role="radio"
          aria-checked={selected}
          onClick={() => onSelectAddress?.(address.id)}
          className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 ${
            selected
              ? "border-orange-300/70 bg-orange-300/10"
              : "border-stone-800 bg-stone-900 hover:bg-stone-800/60"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                selected
                  ? "border-orange-200 bg-orange-200 text-stone-900"
                  : "border-stone-600"
              }`}
            >
              {selected && <CheckIcon className="h-3 w-3" />}
            </span>

            <div className="min-w-0">
              <p className="text-sm font-medium text-stone-100">
                {address.addressTag || address.addressCategory || "Address"}
              </p>

              <p className="mt-0.5 truncate text-xs text-stone-400">
                {address.addressLine}
              </p>
            </div>
          </div>
        </button>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

const SwiggyActionModal: React.FC<SwiggyActionModalProps> = ({
  type,
  isLoading,
  loadingStage,
  restaurants,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onContinueAddress,
  onGoToAddress,
  onConfirmAddress,
  isChoosingAddress,
  ingredientProducts,
  searchIngredientNames,
  pendingIngredientNames,
  selectedProducts,
  ingredientAmounts,
  quantities,
  onChangeQuantity,
  onSelectProduct,
  onAddIngredients,
  cartAdded,
  selectedRestaurant,
  onSelectRestaurant,
  onAddDishToCart,
  foodCartAdded,
  error,
  onMinimize,
  onClose,
}) => {
  useEffect(() => {
    if (!type) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [type]);

  // Escape hides the modal (same as the minimize button)
  useEffect(() => {
    if (!type) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onMinimize();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [type, onMinimize]);

  if (!type) return null;

  const hasAddresses = addresses && addresses.length > 0;

  const hasInstamartProducts =
    (searchIngredientNames && searchIngredientNames.length > 0) ||
    (ingredientProducts && Object.keys(ingredientProducts).length > 0);

  const hasProducts = hasInstamartProducts;

  const hasRestaurants = restaurants && restaurants.length > 0;

  const hasResults = type === "swiggy" ? hasRestaurants : hasInstamartProducts;

  const selectedCount = Object.keys(selectedProducts ?? {}).length;

  const showAddressScreen =
    type === "swiggy"
      ? isChoosingAddress || !hasRestaurants
      : !cartAdded && (isChoosingAddress || !hasInstamartProducts);

  // Instamart search finished and nothing at all came back for any ingredient
  const instamartNames =
    searchIngredientNames && searchIngredientNames.length > 0
      ? searchIngredientNames
      : Object.keys(ingredientProducts ?? {});

  const instamartSearchDone = (pendingIngredientNames?.length ?? 0) === 0;

  const noItemsAtAll =
    type === "instamart" &&
    !cartAdded &&
    !showAddressScreen &&
    instamartNames.length > 0 &&
    instamartSearchDone &&
    instamartNames.every(
      (name) =>
        !(ingredientProducts?.[name] ?? []).some(
          (product) => (product.variations ?? []).length > 0
        )
    );

  const currentStep: Step =
    (type === "instamart" && cartAdded) ||
    (type === "swiggy" && foodCartAdded)
      ? "done"
      : showAddressScreen
        ? "address"
        : "products";

  const loadingText =
    loadingStage === "addresses"
      ? "Loading your addresses..."
      : loadingStage === "ingredients"
        ? "Checking Instamart..."
        : loadingStage === "cart"
          ? "Adding to your Swiggy cart..."
          : "Finding restaurants nearby...";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex animate-fade-in-up items-end justify-center bg-stone-950/60 backdrop-blur-sm sm:items-center sm:p-4"
      style={{ animationDuration: "0.25s" }}
      onClick={onMinimize}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="swiggy-modal-title"
        className="flex max-h-[88vh] w-full max-w-lg flex-col rounded-t-3xl border border-stone-800 bg-stone-900 shadow-2xl shadow-black/50 sm:max-h-[82vh] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-stone-800 px-5 pb-4 pt-3 sm:px-6 sm:pt-5">
          {/* Sheet handle (phones) */}
          <div
            className="mx-auto mb-3 h-1 w-10 rounded-full bg-stone-700 sm:hidden"
            aria-hidden="true"
          />

          <div className="flex items-center justify-between gap-3">
            <h3
              id="swiggy-modal-title"
              className="font-serif text-xl font-black tracking-tight text-orange-50 sm:text-2xl"
            >
              {type === "instamart" ? "Get ingredients" : "Order this dish"}
            </h3>

            <div className="-mr-2 flex items-center gap-1">
              <button
                type="button"
                onClick={onMinimize}
                aria-label="Minimize"
                className="flex h-10 w-10 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
              >
                <MinusIcon />
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {!isLoading && (
            <StepProgress
              step={currentStep}
              hasProducts={!!hasResults}
              secondLabel={type === "swiggy" ? "Restaurants" : "Ingredients"}
              onAddressClick={onGoToAddress}
              onIngredientsClick={onConfirmAddress}
            />
          )}
        </div>

        {/* Scrollable content */}
        <div className="modal-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {error && (
            <div
              role="alert"
              className="mb-5 flex gap-3 rounded-2xl border border-stone-700 bg-stone-800/60 px-4 py-3 text-sm leading-relaxed text-stone-200"
            >
              <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <div
              className="py-14 text-center"
              role="status"
              aria-live="polite"
            >
              <span
                className="mx-auto block h-10 w-10 animate-spin rounded-full border-[3px] border-orange-400/20 border-t-orange-300"
                aria-hidden="true"
              />
              <p className="mt-4 text-sm text-stone-300">{loadingText}</p>
            </div>
          ) : type === "instamart" ? (
            <>
              {cartAdded ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-200 text-stone-900">
                    <CheckIcon className="h-7 w-7" />
                  </span>

                  <h4 className="mt-5 font-serif text-2xl font-black text-orange-50">
                    Added to your cart
                  </h4>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-400">
                    Your selected ingredients are in your Instamart cart,
                    alongside anything already there.
                  </p>
                </div>
              ) : !hasAddresses ? (
                <EmptyAddresses />
              ) : showAddressScreen ? (
                <>
                  <p className="mb-4 text-sm text-stone-400">
                    {hasProducts
                      ? "Change delivery address:"
                      : "Deliver ingredients to:"}
                  </p>

                  <AddressList
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    onSelectAddress={onSelectAddress}
                  />
                </>
              ) : noItemsAtAll ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-400/10 text-orange-300">
                    <InfoIcon className="h-6 w-6" />
                  </span>

                  <h4 className="mt-4 font-serif text-xl font-black text-orange-50">
                    We couldn&apos;t find these on Instamart
                  </h4>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-400">
                    None of the missing ingredients are available for this
                    address right now.
                  </p>

                  {onGoToAddress && (
                    <button
                      type="button"
                      onClick={onGoToAddress}
                      className="mt-5 rounded-xl border border-stone-700 bg-stone-800/70 px-5 py-2.5 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-700/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
                    >
                      Try another address
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {(searchIngredientNames && searchIngredientNames.length > 0
                    ? searchIngredientNames
                    : Object.keys(ingredientProducts ?? {})
                  ).map((ingredientName) => {
                    const isPending =
                      pendingIngredientNames?.includes(ingredientName);
                    const products = ingredientProducts?.[ingredientName] ?? [];

                    return (
                      <div key={ingredientName}>
                        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                          <p className="text-sm font-semibold text-orange-50">
                            {ingredientName}
                          </p>

                          {ingredientAmounts?.[ingredientName] && (
                            <p className="text-xs text-stone-400">
                              Recipe: {ingredientAmounts[ingredientName]}
                            </p>
                          )}
                        </div>

                        {isPending ? (
                          <div className="modal-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="w-32 shrink-0 animate-pulse rounded-2xl border border-stone-800 p-3"
                              >
                                <div className="mx-auto mb-2.5 h-16 w-16 rounded-xl bg-stone-800" />
                                <div className="mb-1.5 h-2.5 w-full rounded bg-stone-800" />
                                <div className="h-2.5 w-2/3 rounded bg-stone-800" />
                              </div>
                            ))}
                          </div>
                        ) : !products.some(
                            (product) => (product.variations ?? []).length > 0
                          ) ? (
                          <p className="text-sm text-stone-400">
                            Not available at your address.
                          </p>
                        ) : (
                          <div className="modal-scroll -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
                            {products.flatMap((product) =>
                              (product.variations ?? []).map((variation) => {
                                const selected =
                                  selectedProducts?.[ingredientName]?.spinId ===
                                  variation.spinId;

                                const unavailable =
                                  !variation.isInStockAndAvailable ||
                                  !product.inStock;

                                return (
                                  <button
                                    key={variation.spinId}
                                    type="button"
                                    disabled={unavailable}
                                    aria-pressed={selected}
                                    onClick={() =>
                                      onSelectProduct?.(
                                        ingredientName,
                                        variation
                                      )
                                    }
                                    className={`relative w-32 shrink-0 snap-start rounded-2xl border p-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 ${
                                      selected
                                        ? "border-orange-300/80 bg-orange-300/10"
                                        : "border-stone-800 hover:border-stone-600"
                                    } ${
                                      unavailable
                                        ? "cursor-not-allowed opacity-40"
                                        : ""
                                    }`}
                                  >
                                    {selected && (
                                      <span className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-orange-200 text-stone-900 shadow">
                                        <CheckIcon className="h-3 w-3" />
                                      </span>
                                    )}

                                    {variation.imageUrl && (
                                      <img
                                        src={variation.imageUrl}
                                        alt={product.displayName}
                                        className="mx-auto mb-2.5 h-16 w-16 rounded-xl bg-white object-cover"
                                      />
                                    )}

                                    <p className="line-clamp-2 text-xs font-medium leading-tight text-stone-100">
                                      {variation.quantityDescription}
                                    </p>

                                    <p className="mt-1.5 text-sm font-semibold text-orange-200">
                                      ₹{variation.price.offerPrice}
                                    </p>

                                    {unavailable && (
                                      <p className="mt-0.5 text-[11px] text-stone-400">
                                        Unavailable
                                      </p>
                                    )}
                                  </button>
                                );
                              })
                            )}
                          </div>
                        )}

                        {!isPending && selectedProducts?.[ingredientName] && (
                          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-stone-800/50 px-3 py-2.5">
                            <p className="min-w-0 text-xs text-stone-300">
                              <span className="font-medium text-stone-100">
                                {
                                  selectedProducts[ingredientName]
                                    .quantityDescription
                                }
                              </span>{" "}
                              × {quantities?.[ingredientName] ?? 1}
                            </p>

                            <div
                              className="flex shrink-0 items-center gap-2.5"
                              role="group"
                              aria-label={`Quantity for ${ingredientName}`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  onChangeQuantity?.(ingredientName, -1)
                                }
                                disabled={(quantities?.[ingredientName] ?? 1) <= 1}
                                aria-label={`Decrease quantity for ${ingredientName}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-600 text-lg leading-none text-stone-100 transition-colors hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 disabled:cursor-not-allowed disabled:opacity-35"
                              >
                                −
                              </button>

                              <span
                                className="w-5 text-center text-sm font-semibold text-stone-50"
                                aria-live="polite"
                              >
                                {quantities?.[ingredientName] ?? 1}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  onChangeQuantity?.(ingredientName, 1)
                                }
                                disabled={
                                  (quantities?.[ingredientName] ?? 1) >=
                                  MAX_CART_QUANTITY
                                }
                                aria-label={`Increase quantity for ${ingredientName}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-600 text-lg leading-none text-stone-100 transition-colors hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 disabled:cursor-not-allowed disabled:opacity-35"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            /* Swiggy restaurant flow */
            <>
              {!hasAddresses ? (
                <EmptyAddresses />
              ) : showAddressScreen ? (
                <>
                  <p className="mb-4 text-sm text-stone-400">
                    Deliver this dish to:
                  </p>

                  <AddressList
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    onSelectAddress={onSelectAddress}
                  />
                </>
              ) : foodCartAdded ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-200 text-stone-900">
                    <CheckIcon className="h-7 w-7" />
                  </span>

                  <h4 className="mt-5 font-serif text-2xl font-black text-orange-50">
                    Added to your cart
                  </h4>

                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-400">
                    {selectedRestaurant?.name} has been added to your Swiggy cart.
                  </p>
                </div>
              ) : (
                <>
                  {restaurants.length === 0 ? (
                    <p className="py-4 text-center text-sm text-stone-400">
                      No restaurants found near this address for this dish.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {restaurants.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                          selected={selectedRestaurant?.id === restaurant.id}
                          onSelect={onSelectRestaurant}
                        />
                      ))}
                    </ul>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!isLoading && hasAddresses && showAddressScreen && (
          <div className="border-t border-stone-800 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={onContinueAddress}
              disabled={!selectedAddressId}
              className={primaryButton}
            >
              {hasResults
                ? "Continue"
                : type === "swiggy"
                  ? "Find restaurants"
                  : "Find ingredients"}
            </button>
          </div>
        )}

        {!isLoading &&
          type === "instamart" &&
          !cartAdded &&
          hasAddresses &&
          !showAddressScreen &&
          !noItemsAtAll && (
            <div className="border-t border-stone-800 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={onAddIngredients}
                disabled={selectedCount === 0}
                className={primaryButton}
              >
                {selectedCount > 0
                  ? `Add ${selectedCount} ${
                      selectedCount === 1 ? "item" : "items"
                    } to your Instamart cart`
                  : "Select items to continue"}
              </button>
            </div>
          )}

        {!isLoading &&
          type === "swiggy" &&
          !foodCartAdded &&
          hasAddresses &&
          !showAddressScreen &&
          selectedRestaurant && (
            <div className="border-t border-stone-800 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={onAddDishToCart}
                className={primaryButton}
              >
                Add this dish to your Swiggy cart
              </button>
            </div>
          )}

      </div>

      <style>{`
        .modal-scroll::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }

        .modal-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 4px;
        }

        .modal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default SwiggyActionModal;