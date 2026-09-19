import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompactHeader from "../components/CompactHeader";
import CookWhatYouHave from "../components/CookWhatYouHave";
import { RECIPE_PATH } from "../utils/dishRoutes";

const CookWhatYouHavePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cook what you have | Rasoi Bazaar";
  }, []);

  return (
    <div className="relative z-10 w-full">
      <CompactHeader />

      <div className="pt-20">
        <CookWhatYouHave
          onSelectDish={(dish) => navigate(RECIPE_PATH, { state: { dish } })}
        />
      </div>
    </div>
  );
};

export default CookWhatYouHavePage;