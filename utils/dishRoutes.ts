import { useState } from "react";
import { useNavigate } from "react-router-dom";

/** "Paneer Butter Masala!" -> "paneer-butter-masala" */
export const toSlug = (dish: string): string =>
  dish
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** "paneer-butter-masala" -> "Paneer Butter Masala" */
export const fromSlug = (slug: string): string =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/** The recipe page has one clean URL; the dish travels in the navigation state. */
export const RECIPE_PATH = "/recipe";

/** Search box state + "go to the recipe page" action, shared by home and compact header */
export const useDishSearch = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  const go = (dish: string) => {
    if (!toSlug(dish)) return;
    setTerm("");
    navigate(RECIPE_PATH, { state: { dish } });
  };

  return { term, setTerm, go };
};