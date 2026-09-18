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

const SectionTitle: React.FC<{
  title: string;
  icon: React.ReactNode;
}> = ({ title, icon }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-orange-400">{icon}</span>
    <h2 className="text-2xl font-bold font-serif text-white tracking-tight">{title}</h2>
  </div>
);

const TipCallout: React.FC<{
  tip: Tip;
}> = ({ tip }) => {
  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="inline-flex items-center max-w-full text-sm text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded"
        aria-expanded={isOpen}
        aria-controls={`tip-${tip.title.replace(
          /\s+/g,
          "-"
        )}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M8.5 14.5a6 6 0 1 1 7 0c-.9.6-1.5 1.4-1.5 2.5h-4c0-1.1-.6-1.9-1.5-2.5Z" />
        </svg>

        <span className="truncate max-w-[240px]">
          {isOpen ? "Hide Tip" : tip.title}
        </span>
      </button>

      {isOpen && (
        <div
          id={`tip-${tip.title.replace(
            /\s+/g,
            "-"
          )}`}
          className="mt-2 ml-4 p-3 bg-orange-900/40 border-l-4 border-orange-500 text-orange-200 rounded-r-md text-sm animate-fade-in-up"
          style={{
            animationDuration: "0.3s",
          }}
        >
          <p>{tip.content}</p>
        </div>
      )}
    </div>
  );
};

const RecipeDisplay: React.FC<
  RecipeDisplayProps
> = ({
  recipe,
  onFinishCooking,
}) => {
  const [
  checkedIngredients,
  setCheckedIngredients,
] = useState<boolean[]>(
  new Array(
    recipe.ingredients.length
  ).fill(false)
);

const [flashIndex, setFlashIndex] = useState<number | null>(null);

  const [isCooking, setIsCooking] =
    useState(false);

  const [
    currentStepIndex,
    setCurrentStepIndex,
  ] = useState(0);

  const [modalType, setModalType] =
    useState<
      "instamart" | "swiggy" | null
    >(null);

  const [
  isModalLoading,
  setIsModalLoading,
] = useState(false);

const [
  loadingStage,
  setLoadingStage,
] = useState<
  "addresses" | "restaurants" | "ingredients" | "cart" | null
>(null);

  /*
   * -----------------------------
   * Instamart state
   * -----------------------------
   */

  const [
    swiggyAddresses,
    setSwiggyAddresses,
  ] = useState<SwiggyAddress[]>([]);

  const [
    selectedAddressId,
    setSelectedAddressId,
  ] = useState<string | null>(null);

  const [
    ingredientProducts,
    setIngredientProducts,
  ] = useState<
    Record<
      string,
      InstamartProduct[]
    >
  >({});

  const [
    selectedProducts,
    setSelectedProducts,
  ] = useState<
    Record<
      string,
      InstamartVariation
    >
  >({});

  const [
    instamartCartAdded,
    setInstamartCartAdded,
  ] = useState(false);

  const [swiggyError, setSwiggyError] =
    useState<string | null>(null);

  const [searchedIngredientsKey, setSearchedIngredientsKey] =
    useState<string | null>(null);

  const [lastSearchedAddressId, setLastSearchedAddressId] =
    useState<string | null>(null);

  const [isChoosingAddress, setIsChoosingAddress] =
    useState(false);

  // The full ordered list of ingredient names in this search round
  const [searchIngredientNames, setSearchIngredientNames] =
    useState<string[]>([]);

  // Names still waiting on their Instamart search to resolve
  const [pendingIngredientNames, setPendingIngredientNames] =
    useState<string[]>([]);

  

  /*
   * -----------------------------
   * Food state
   * -----------------------------
   */

  const [restaurants, setRestaurants] =
    useState<SwiggyRestaurant[]>([]);

  /*
   * -----------------------------
   * Recipe handlers
   * -----------------------------
   */

  const handleIngredientToggle = (
  index: number
) => {
  const newCheckedState = [
    ...checkedIngredients,
  ];

  const isNowChecked = !newCheckedState[index];
  newCheckedState[index] = isNowChecked;

  setCheckedIngredients(
    newCheckedState
  );

  if (isNowChecked) {
    setFlashIndex(index);
    window.setTimeout(() => {
      setFlashIndex((current) =>
        current === index ? null : current
      );
    }, 500);
  }
};

  const handleStartCooking = () => {
    setIsCooking(true);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (
      currentStepIndex <
      recipe.method.length - 1
    ) {
      setCurrentStepIndex(
        (prev) => prev + 1
      );
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(
        (prev) => prev - 1
      );
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
        error instanceof Error
          ? error.message
          : "Could not connect to Swiggy.";

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
    // re-search — same address, no extra taps needed.
    const hasExistingProducts =
      Object.keys(ingredientProducts).length > 0;

    const currentKey =
      JSON.stringify(checkedIngredients);

    if (
      hasExistingProducts &&
      currentKey !== searchedIngredientsKey
    ) {
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
  const handleSelectAddress = (
    addressId: string
  ) => {
    // Just record the choice — whether to refetch
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
    if (
      selectedAddressId === lastSearchedAddressId &&
      hasExistingResults
    ) {
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

    const handleSearchIngredients =
    async () => {
      const missingIngredients =
        recipe.ingredients.filter(
          (_, index) =>
            !checkedIngredients[index]
        );

      if (missingIngredients.length === 0) {
        setIngredientProducts({});
        setSwiggyError(
          "You already have all the ingredients for this recipe."
        );
        return;
      }

      if (!selectedAddressId) {
        setSwiggyError(
          "Please select a delivery address."
        );
        return;
      }

      setSwiggyError(null);
      setIngredientProducts({});
      setSelectedProducts({});
      setInstamartCartAdded(false);
      setIsChoosingAddress(false);

      const names = missingIngredients.map(
        (ing) => ing.commonName
      );

      setSearchIngredientNames(names);
      setPendingIngredientNames(names);

      // Fire every ingredient search in parallel. Each one updates
      // its own result as soon as it resolves, instead of waiting
      // for all of them to finish together.
      await Promise.all(
        missingIngredients.map(async (ingredient) => {
          const query =
            ingredient.englishName || ingredient.commonName;

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

      setSearchedIngredientsKey(
        JSON.stringify(checkedIngredients)
      );

      setLastSearchedAddressId(
        selectedAddressId
      );
    };

  const handleSelectProduct = (
    ingredientName: string,
    variation: InstamartVariation
  ) => {
    if (
      !variation.isInStockAndAvailable
    ) {
      return;
    }

    setSelectedProducts((current) => {
      const alreadySelected =
        current[ingredientName]?.spinId ===
        variation.spinId;

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

  const handleAddIngredientsToCart =
    async () => {
      if (!selectedAddressId) {
        setSwiggyError(
          "Please select a delivery address."
        );

        return;
      }

      const selectedEntries =
        Object.entries(
          selectedProducts
        );

      if (selectedEntries.length === 0) {
        setSwiggyError(
          "Please select at least one product."
        );

        return;
      }

            setIsModalLoading(true);
      setLoadingStage("cart");
      setSwiggyError(null);

      try {
        const items =
          selectedEntries.map(
            ([, variation]) => ({
              spinId:
                variation.spinId,

              skuId:
                variation.skuId,

              quantity: 1,
            })
          );

        await addToInstamartCart(
          selectedAddressId,
          items
        );

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
      setSwiggyError(
        "Please select a delivery address."
      );
      return;
    }

    setIsModalLoading(true);
    setLoadingStage("restaurants");
    setSwiggyError(null);
    setRestaurants([]);

    try {
      const results =
        await searchRestaurants(
          selectedAddressId,
          recipe.dishName
        );

      setRestaurants(results);

      setLastSearchedAddressId(
        selectedAddressId
      );

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
   * Modal close
   * -----------------------------
   */

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in-up">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-12">
        {/* Mobile dish header */}
        <div className="lg:hidden mb-8 text-center">
          <h1 className="font-serif text-4xl font-black text-white mb-2">
            {recipe.dishName}
          </h1>
        </div>

        {/* Left Sticky Column */}
        <aside className="lg:col-span-2 lg:sticky lg:top-12 lg:self-start">
          <div className="bg-stone-800/50 backdrop-blur-lg rounded-3xl shadow-xl shadow-black/20 p-6 sm:p-8 border border-stone-700/70">
            <SectionTitle
              title="Ingredients"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />

                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />

            <ul className="space-y-4">
              {recipe.ingredients.map(
                (ing, index) => (
                  <li key={index}>
  <label
  className={`flex items-center gap-4 cursor-pointer group rounded-xl px-3 -mx-3 py-2.5 transition-colors duration-300 ${
    flashIndex === index ? "bg-stone-100/10" : ""
  }`}
>
    <input
      type="checkbox"
      checked={checkedIngredients[index]}
      onChange={() => handleIngredientToggle(index)}
      className="sr-only peer"
    />

    <span
  className={`relative shrink-0 h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
    checkedIngredients[index]
      ? "bg-stone-100 border-stone-100"
      : "bg-stone-700 border-stone-500 group-hover:border-stone-400"
  } peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-stone-800`}
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
      className={`flex-1 text-stone-300 group-hover:text-white transition-colors duration-300 ${
        checkedIngredients[index]
          ? "line-through text-stone-500"
          : ""
      }`}
    >
      <span className="font-semibold text-white">
        {ing.amount}
      </span>{" "}
      {ing.commonName} ({ing.englishName})
    </span>
  </label>
</li>
                )
              )}
            </ul>

            <button
              onClick={handleBuyFromInstamart}
              className="mt-6 w-full bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-medium py-3 px-4 rounded-full border border-stone-700 transition-colors duration-150 flex items-center justify-center gap-2"
            >
              <span>🛒</span> Don't have these? Buy from Instamart
            </button>
          </div>
        </aside>

        {/* Right Content Column */}
        <main className="lg:col-span-3">
          <div className="bg-stone-800/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-stone-700 p-6 sm:p-8 md:p-12">
            {/* Header */}
            <div className="mb-12">
              <h1 className="font-serif text-5xl md:text-7xl font-black text-white mb-4">
                {recipe.dishName}
              </h1>

              <p className="text-xl text-orange-200/90 italic max-w-3xl">
                “{recipe.description}”
              </p>

              <div className="mt-6 flex items-center gap-2 text-stone-300">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-orange-400"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z"
            clipRule="evenodd"
        />
    </svg>

    <span className="text-sm font-medium">
        {recipe.prepTime}
    </span>
</div>

              <div className="mt-4">
                <button
                  onClick={handleOrderFromSwiggy}
                  className="inline-flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/15 text-orange-300 px-4 py-2 rounded-full border border-orange-500/30 transition-colors duration-150"
                >
                  <span>🍽️</span> Don't want to cook today? Order from Swiggy
                </button>
              </div>
            </div>

            {/* Equipment */}
            <div className="mb-12 pt-10 border-t border-stone-700/40">
              <SectionTitle
                title="Equipment"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 21V3M11 3V8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8V3M15.5 13V3M15.5 13C13.567 13 12 14.7909 12 17C12 19.2091 13.567 21 15.5 21C17.433 21 19 19.2091 19 17C19 14.7909 17.433 13 15.5 13Z" />
                  </svg>
                }
              />

              <ul className="space-y-3 text-stone-300">
                {recipe.equipment.map(
                  (tool, index) => (
                    <li
                      key={index}
                      className="pl-1 text-lg"
                    >
                      <span className="text-orange-500 font-bold mr-2">
                        &#8227;
                      </span>

                      {tool.item}

                      {tool.isSpecialized && (
                        <div className="mt-2 ml-4 p-3 bg-orange-900/40 border-l-4 border-orange-500 text-orange-200 rounded-r-md text-sm">
                          <span className="font-bold">
                            Heads up!
                          </span>

                          {tool.alternative && (
                            <p className="mt-1">
                              <span className="font-semibold">
                                Alternative:
                              </span>{" "}
                              {
                                tool.alternative
                              }
                            </p>
                          )}
                        </div>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Method */}
            <div className="mb-12 pt-10 border-t border-stone-700/40">
              <SectionTitle
                title="Method"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-orange-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />

              {!isCooking ? (
                <div className="text-center py-8">
                  <button
                    onClick={
                      handleStartCooking
                    }
                    className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3.5 px-8 rounded-full text-lg transition-colors duration-150"
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>

                      Start Cooking
                    </div>
                  </button>
                </div>
              ) : (
                <div className="mt-6">
                  {/* Step Display */}
                  <div
                    key={currentStepIndex}
                    className="bg-stone-800 p-6 sm:p-8 rounded-lg border border-stone-700 transition-all duration-300"
                  >
                    <p className="text-sm font-semibold text-orange-400 mb-2">
                      STEP{" "}
                      {currentStepIndex +
                        1}{" "}
                      OF{" "}
                      {
                        recipe.method
                          .length
                      }
                    </p>

                    <p className="text-stone-100 text-lg md:text-xl leading-relaxed">
                      {
                        recipe.method[
                          currentStepIndex
                        ].instruction
                      }
                    </p>

                    {recipe.method[currentStepIndex].tip?.title?.trim() &&
                      recipe.method[currentStepIndex].tip?.content?.trim() && (
                        <TipCallout
                          tip={recipe.method[currentStepIndex].tip!}
                        />
                      )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center gap-3 mt-8">
                    <button
                      onClick={
                        handlePrevStep
                      }
                      disabled={
                        currentStepIndex ===
                        0
                      }
                      className="bg-stone-700 hover:bg-stone-600 disabled:bg-stone-900 disabled:text-stone-500 text-stone-100 font-medium py-2 px-5 rounded-lg transition-colors duration-200 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>

                      Previous
                    </button>

                    {currentStepIndex <
                    recipe.method.length -
                      1 ? (
                      <button
                        onClick={
                          handleNextStep
                        }
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-lg transition-colors duration-200 flex items-center"
                      >
                        Next

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={
                          onFinishCooking
                        }
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200"
                      >
                        I’m Done Cooking
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            {recipe.notes &&
              recipe.notes.length >
                0 && (
                <div className="mb-12 pt-10 border-t border-stone-700/40">
                  <SectionTitle
                    title="Notes & Tips"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  />

                  <ul className="list-disc list-inside space-y-3 text-stone-300 prose prose-lg max-w-none">
                    {recipe.notes.map(
                      (note, index) => (
                        <li key={index}>
                          {note}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </div>
        </main>
      </div>

      {/* Swiggy / Instamart Modal */}
      <SwiggyActionModal
        type={modalType}
        isLoading={
          isModalLoading
        }
        loadingStage={
          loadingStage
        }
        restaurants={
          restaurants
        }
        addresses={
          swiggyAddresses
        }
        selectedAddressId={
          selectedAddressId
        }
        onSelectAddress={
          handleSelectAddress
        }
        onContinueAddress={
          handleConfirmAddress
        }
        onGoToAddress={
          handleGoToAddress
        }
        onConfirmAddress={
          handleConfirmAddress
        }
        isChoosingAddress={
          isChoosingAddress
        }
        ingredientProducts={
          ingredientProducts
        }
        searchIngredientNames={
          searchIngredientNames
        }
        pendingIngredientNames={
          pendingIngredientNames
        }
        selectedProducts={
          selectedProducts
        }
        onSelectProduct={
          handleSelectProduct
        }
        onAddIngredients={
          handleAddIngredientsToCart
        }
        cartAdded={
          instamartCartAdded
        }
        error={
          swiggyError
        }
        onMinimize={
          handleMinimizeModal
        }
        onClose={
          handleCloseModal
        }
      />
    </div>
  );
};

export default RecipeDisplay;