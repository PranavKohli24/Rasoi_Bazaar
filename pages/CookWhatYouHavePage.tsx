import React, { useEffect } from "react";
import CompactHeader from "../components/CompactHeader";
import CookWhatYouHave from "../components/CookWhatYouHave";
import { useDishSearch } from "../utils/dishRoutes";

const CookWhatYouHavePage: React.FC = () => {
  const { go } = useDishSearch();

  useEffect(() => {
    document.title = "Cook what you have | Rasoi Bazaar";
  }, []);

  return (
    <div className="relative z-10 w-full">
      <CompactHeader />

      <div>
        <CookWhatYouHave onSelectDish={(dish) => go(dish)} />
      </div>
    </div>
  );
};

export default CookWhatYouHavePage;