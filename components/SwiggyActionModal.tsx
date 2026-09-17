import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import {
  SwiggyAddress,
  InstamartProduct,
  InstamartVariation,
  SwiggyRestaurant,
} from "../services/swiggyService";

interface SwiggyActionModalProps {
  type: "instamart" | "swiggy" | null;
  isLoading: boolean;
  loadingStage?: "addresses" | "restaurants" | "ingredients" | null;
  restaurants?: SwiggyRestaurant[];
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
  onSelectProduct?: (
    ingredientName: string,
    variation: InstamartVariation
  ) => void;
  onAddIngredients?: () => void;
  cartAdded?: boolean;
  error?: string | null;
  onMinimize: () => void;
  onClose: () => void;
}

type Step = "address" | "products" | "done";

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
    <div className="flex items-center gap-2 mt-4">
      {visibleSteps.map((s, i) => {
        const isClickableAddress =
          s.key === "address" && step === "products";

        const isClickableIngredients =
          s.key === "products" &&
          step === "address" &&
          hasProducts;

        const isClickable =
          isClickableAddress || isClickableIngredients;

        const clickHandler = isClickableAddress
          ? onAddressClick
          : onIngredientsClick;

        return (
          <React.Fragment key={s.key}>
            <div className="flex items-center gap-1.5">
              <div
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  i <= activeIndex
                    ? "bg-orange-400"
                    : "bg-stone-700"
                }`}
              />

              {isClickable ? (
                <button
                  onClick={clickHandler}
                  className="text-xs text-stone-500 hover:text-orange-300 transition-colors"
                >
                  {s.label}
                </button>
              ) : (
                <span
                  className={`text-xs transition-colors duration-300 ${
                    i === activeIndex
                      ? "text-orange-300"
                      : "text-stone-500"
                  }`}
                >
                  {s.label}
                </span>
              )}
            </div>

            {i < visibleSteps.length - 1 && (
              <div
                className={`h-px flex-1 transition-colors duration-300 ${
                  i < activeIndex
                    ? "bg-orange-400/50"
                    : "bg-stone-800"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

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
  onSelectProduct,
  onAddIngredients,
  cartAdded,
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

  if (!type) return null;

  const hasAddresses = addresses && addresses.length > 0;

  const hasInstamartProducts =
    (searchIngredientNames && searchIngredientNames.length > 0) ||
    (ingredientProducts &&
      Object.keys(ingredientProducts).length > 0);

  const hasProducts = hasInstamartProducts;

  const hasRestaurants =
    restaurants && restaurants.length > 0;

  const hasResults =
    type === "swiggy"
      ? hasRestaurants
      : hasInstamartProducts;

  const selectedCount =
    Object.keys(selectedProducts ?? {}).length;

  const showAddressScreen =
    type === "swiggy"
      ? isChoosingAddress || !hasRestaurants
      : !cartAdded &&
        (isChoosingAddress || !hasInstamartProducts);

  const currentStep: Step =
    type === "instamart" && cartAdded
      ? "done"
      : showAddressScreen
        ? "address"
        : "products";

  return createPortal(
    <div
      className="fixed inset-0 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up"
      style={{ animationDuration: "0.25s" }}
    >
      <div className="bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl w-full max-w-md flex flex-col max-h-[82vh]">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-stone-800">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-serif font-bold text-orange-100">
              {type === "instamart"
                ? "Get ingredients"
                : "Order this dish"}
            </h3>

            <div className="flex items-center gap-3 -mt-1">
              <button
                onClick={onMinimize}
                aria-label="Minimize"
                className="text-stone-500 hover:text-stone-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <button
                onClick={onClose}
                aria-label="Close"
                className="text-stone-500 hover:text-stone-300 text-xl leading-none transition-colors"
              >
                &times;
              </button>
            </div>
          </div>

          {!isLoading && (
            <StepProgress
              step={currentStep}
              hasProducts={!!hasResults}
              secondLabel={
                type === "swiggy"
                  ? "Restaurants"
                  : "Ingredients"
              }
              onAddressClick={onGoToAddress}
              onIngredientsClick={onConfirmAddress}
            />
          )}
        </div>

        {/* Scrollable content */}
        <div className="modal-scroll flex-1 overflow-y-auto px-6 py-5">
          {error && (
            <div className="mb-5 bg-red-950/30 border border-red-900/60 text-red-300 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {isLoading ? (
  <div className="text-center py-14">
    <div className="text-3xl mb-3 opacity-80 animate-pulse">
      {loadingStage === "addresses"
        ? "📍"
        : loadingStage === "ingredients"
          ? "🛒"
          : "🍽️"}
    </div>

    <p className="text-stone-300 text-sm">
      {loadingStage === "addresses"
        ? "Loading your addresses..."
        : loadingStage === "ingredients"
          ? "Checking Instamart..."
          : "Finding restaurants nearby..."}
    </p>
  </div>
          ) : type === "instamart" ? (
            <>
              {cartAdded ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-4">✓</div>

                  <h4 className="text-white text-lg font-medium">
                    Added to your cart
                  </h4>

                  <p className="text-stone-400 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                    Your selected ingredients are in your
                    Instamart cart, alongside anything already there.
                  </p>
                </div>
              ) : !hasAddresses ? (
                <div className="text-center py-10">
                  <div className="text-3xl mb-3 opacity-70">
                    📍
                  </div>

                  <h4 className="text-white text-base font-medium">
                    No delivery address found
                  </h4>

                  <p className="text-stone-500 text-sm mt-1.5">
                    Add an address to your Swiggy account first.
                  </p>
                </div>
              ) : showAddressScreen ? (
                <>
                  <p className="text-stone-400 text-sm mb-4">
                    {hasProducts
                      ? "Change delivery address:"
                      : "Deliver ingredients to:"}
                  </p>

                  <div className="space-y-2">
                    {addresses?.map((address) => {
                      const selected =
                        selectedAddressId === address.id;

                      return (
                        <button
                          key={address.id}
                          onClick={() =>
                            onSelectAddress?.(address.id)
                          }
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                            selected
                              ? "border-orange-500/70 bg-orange-500/10"
                              : "border-stone-800 hover:border-stone-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`shrink-0 h-3.5 w-3.5 rounded-full border ${
                                selected
                                  ? "border-orange-400 bg-orange-400"
                                  : "border-stone-600"
                              }`}
                            />

                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium">
                                {address.addressTag ||
                                  address.addressCategory ||
                                  "Address"}
                              </p>

                              <p className="text-stone-500 text-xs mt-0.5 truncate">
                                {address.addressLine}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  {(searchIngredientNames && searchIngredientNames.length > 0
                    ? searchIngredientNames
                    : Object.keys(ingredientProducts ?? {})
                  ).map((ingredientName) => {
                    const isPending =
                      pendingIngredientNames?.includes(ingredientName);
                    const products =
                      ingredientProducts?.[ingredientName] ?? [];

                    return (
                      <div key={ingredientName}>
                        <p className="text-white text-sm font-medium mb-2.5">
                          {ingredientName}
                        </p>

                        {isPending ? (
                          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 modal-scroll">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="shrink-0 w-28 rounded-xl border border-stone-800 p-2.5 animate-pulse"
                              >
                                <div className="h-14 w-14 mx-auto rounded-lg bg-stone-800 mb-2" />
                                <div className="h-2.5 w-full rounded bg-stone-800 mb-1.5" />
                                <div className="h-2.5 w-2/3 rounded bg-stone-800" />
                              </div>
                            ))}
                          </div>
                        ) : products.length === 0 ? (
                          <p className="text-stone-500 text-sm">
                            No match found for this item.
                          </p>
                        ) : (
                          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 modal-scroll">
                            {products.flatMap((product) =>
                              (product.variations ?? []).map(
                                (variation) => {
                                  const selected =
                                    selectedProducts?.[
                                      ingredientName
                                    ]?.spinId ===
                                    variation.spinId;

                                  const unavailable =
                                    !variation.isInStockAndAvailable ||
                                    !product.inStock;

                                  return (
                                    <button
                                      key={variation.spinId}
                                      disabled={unavailable}
                                      onClick={() =>
                                        onSelectProduct?.(
                                          ingredientName,
                                          variation
                                        )
                                      }
                                      className={`shrink-0 w-28 text-left rounded-xl border p-2.5 transition-colors ${
                                        selected
                                          ? "border-orange-500/70 bg-orange-500/10"
                                          : "border-stone-800 hover:border-stone-700"
                                      } ${
                                        unavailable
                                          ? "opacity-35 cursor-not-allowed"
                                          : ""
                                      }`}
                                    >
                                      {variation.imageUrl && (
                                        <img
                                          src={variation.imageUrl}
                                          alt={product.displayName}
                                          className="h-14 w-14 mx-auto rounded-lg object-cover bg-white mb-2"
                                        />
                                      )}

                                      <p className="text-white text-xs font-medium leading-tight line-clamp-2">
                                        {variation.quantityDescription}
                                      </p>

                                      <p className="text-orange-300 text-xs font-semibold mt-1">
                                        ₹{variation.price.offerPrice}
                                      </p>

                                      {unavailable && (
                                        <p className="text-red-400 text-[10px] mt-0.5">
                                          Unavailable
                                        </p>
                                      )}
                                    </button>
                                  );
                                }
                              )
                            )}
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
                <div className="text-center py-10">
                  <div className="text-3xl mb-3 opacity-70">
                    📍
                  </div>

                  <h4 className="text-white text-base font-medium">
                    No delivery address found
                  </h4>

                  <p className="text-stone-500 text-sm mt-1.5">
                    Add an address to your Swiggy account first.
                  </p>
                </div>
              ) : showAddressScreen ? (
                <>
                  <p className="text-stone-400 text-sm mb-4">
                    Deliver this dish to:
                  </p>

                  <div className="space-y-2">
                    {addresses?.map((address) => {
                      const selected =
                        selectedAddressId === address.id;

                      return (
                        <button
                          key={address.id}
                          onClick={() =>
                            onSelectAddress?.(address.id)
                          }
                          className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                            selected
                              ? "border-orange-500/70 bg-orange-500/10"
                              : "border-stone-800 hover:border-stone-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`shrink-0 h-3.5 w-3.5 rounded-full border ${
                                selected
                                  ? "border-orange-400 bg-orange-400"
                                  : "border-stone-600"
                              }`}
                            />

                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium">
                                {address.addressTag ||
                                  address.addressCategory ||
                                  "Address"}
                              </p>

                              <p className="text-stone-500 text-xs mt-0.5 truncate">
                                {address.addressLine}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="divide-y divide-stone-800">
                  {restaurants?.length === 0 ? (
                    <p className="text-stone-500 text-sm py-4">
                      No open restaurants found nearby.
                    </p>
                  ) : (
                    restaurants?.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="flex justify-between items-center py-3.5 first:pt-0"
                      >
                        <div>
                          <p className="text-white text-sm font-medium">
                            {restaurant.name}
                          </p>

                          <p className="text-stone-500 text-xs mt-0.5">
  {restaurant.eta
    ? restaurant.eta
    : ""}
  {restaurant.distance
    ? ` · ${restaurant.distance}`
    : ""}
</p>
                        </div>

                        {restaurant.costForTwo && (
  <p className="text-orange-300 text-sm font-semibold">
    {restaurant.costForTwo} 
  </p>
)}
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!isLoading &&
          hasAddresses &&
          showAddressScreen && (
            <div className="px-6 py-4 border-t border-stone-800">
              <button
                onClick={onContinueAddress}
                disabled={!selectedAddressId}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-stone-800 disabled:text-stone-500 text-white text-sm font-medium py-3 rounded-xl transition-colors"
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
          !showAddressScreen && (
            <div className="px-6 py-4 border-t border-stone-800">
              <button
                onClick={onAddIngredients}
                disabled={selectedCount === 0}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-stone-800 disabled:text-stone-500 text-white text-sm font-medium py-3 rounded-xl transition-colors"
              >
                {selectedCount > 0
                  ? `Add ${selectedCount} ${
                      selectedCount === 1
                        ? "item"
                        : "items"
                    } to cart`
                  : "Select items to continue"}
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