
import React, { useEffect } from "react";
import CompactHeader from "../components/CompactHeader";
import CookWhatYouHave from "../components/CookWhatYouHave";
import { useDishSearch } from "../utils/dishRoutes";
import { DEFAULT_TINT } from "../utils/dishTint";

const KITCHEN_TINT = "#F0DEC7";

const CookWhatYouHavePage: React.FC = () => {
  const { go } = useDishSearch();

  useEffect(() => {
    document.title = "Cook what you have | Rasoi Bazaar";
    document.documentElement.style.setProperty(
      "--bg-tint",
      KITCHEN_TINT
    );

    return () => {
      document.documentElement.style.setProperty(
        "--bg-tint",
        DEFAULT_TINT
      );
    };
  }, []);

  return (
    <div className="relative z-10 w-full">
      <CompactHeader />

      <CookWhatYouHave onSelectDish={(dish) => go(dish)} />
    </div>
  );
};

export default CookWhatYouHavePage;