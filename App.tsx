import React, { useEffect, useRef } from "react";
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

/** Scroll to top on new navigations; leave back/forward to the browser */
const ScrollToTop: React.FC = () => {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(pathname);

  // `key` changes on every navigation, including clicking a link to the page
  // you're already on, so depending on pathname alone isn't enough.
  useEffect(() => {
    const samePage = previousPathname.current === pathname;
    previousPathname.current = pathname;

    if (navigationType === "POP") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: samePage && !reduceMotion ? "smooth" : "auto",
    });
  }, [key, pathname, navigationType]);

  return null;
};

const App: React.FC = () => {
  // The page background (cream + faint spice motif) lives on <body> in
  // index.html, so this wrapper stays transparent.
  return (
    <div className="flex min-h-screen flex-col font-sans text-stone-200 selection:bg-orange-500/25">
      <ScrollToTop />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cook-what-you-have" element={<CookWhatYouHavePage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <footer className="relative z-10 mt-8 border-t border-stone-700/70 bg-stone-950/90">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <div>
            <p className="font-hand text-2xl text-orange-100">
              Good food brings people together
            </p>
            <p className="mt-1 text-sm text-stone-400">
              © {new Date().getFullYear()} Rasoi Bazaar
            </p>
          </div>

          <p className="text-sm leading-relaxed text-stone-400">
            Designed & built by{" "}
            <a
              href="https://www.linkedin.com/in/pranavkohli24/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-orange-200 transition-colors hover:text-orange-100"
            >
              Pranav Kohli
            </a>
            <span className="mx-2 text-stone-600" aria-hidden="true">
              ·
            </span>
            <a
              href="mailto:hey@pranavkohli.me"
              className="transition-colors hover:text-stone-100"
            >
              hey@pranavkohli.me
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;