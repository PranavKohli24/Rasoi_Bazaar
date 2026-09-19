import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/Recipepage";
import CookWhatYouHavePage from "./pages/CookWhatYouHavePage";

const BACKGROUND_DESKTOP = "/background.png";
const BACKGROUND_MOBILE = "/background_mobile.png";

/** Scroll to top on new navigations; leave back/forward to the browser */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
};

const App: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-stone-950 font-sans text-stone-200 selection:bg-orange-500/30">
      <ScrollToTop />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[100svh] overflow-hidden">
        <picture className="absolute inset-0 block">
          <source media="(max-width: 767px)" srcSet={BACKGROUND_MOBILE} />
          <img
            src={BACKGROUND_DESKTOP}
            alt=""
            loading="eager"
            fetchPriority="high"
            onLoad={() => setBackgroundLoaded(true)}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              opacity: backgroundLoaded ? (isHome ? 0.35 : 0.09) : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-stone-950/25" />
      </div>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cook-what-you-have" element={<CookWhatYouHavePage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <footer className="relative z-10 mt-auto pb-10 pt-2 text-center">
        {isHome && (
          <div className="mb-4 flex items-center justify-center gap-5 px-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-stone-600 sm:w-32" />
            <span className="text-base text-orange-200/90">😋</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-stone-600 sm:w-32" />
          </div>
        )}

        <p className="font-[cursive] text-lg text-orange-100/85 sm:text-xl">
          Good Food Brings People Together
        </p>

        <div className="mt-4 text-sm text-stone-600">
          <p>
            Designed & Built by{" "}
            <a
              href="https://www.linkedin.com/in/pranavkohli24/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-200/80 transition-colors hover:text-orange-400"
            >
              Pranav Kohli
            </a>
          </p>

          <p className="mt-1">
            For any queries, mail me (Pranav) at:{" "}
            <a
              href="mailto:hey@pranavkohli.me"
              className="transition-colors hover:text-stone-400"
            >
              hey@pranavkohli.me
            </a>
          </p>

          <p className="mt-1">© {new Date().getFullYear()} Rasoi Bazaar</p>
        </div>
      </footer>
    </div>
  );
};

export default App;