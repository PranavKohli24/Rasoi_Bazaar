import { Recipe } from "../types";

export interface CompanionMessage {
  role: "user" | "assistant";
  content: string;
}

const GENERIC_ERROR =
  "Your cooking companion is unavailable right now. Please try again.";
const OFFLINE_ERROR =
  "Couldn't reach your cooking companion. Check your connection and try again.";

/**
 * Asks the cooking companion a question about the given recipe, passing the
 * prior turns of this conversation for context. The AI key, system prompt,
 * and model all live server-side in /api/cooking-companion.
 */
export const askCookingCompanion = async (
  recipe: Recipe,
  history: CompanionMessage[],
  question: string
): Promise<string> => {
  let response: Response;

  try {
    response = await fetch("/api/cooking-companion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe, history, question }),
    });
  } catch (error) {
    console.error("Cooking companion request failed:", error);
    throw new Error(OFFLINE_ERROR);
  }

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    console.error("The cooking companion API didn't return JSON.");
  }

  if (!response.ok) {
    console.error(
      "Cooking companion request failed:",
      response.status,
      JSON.stringify(data?.error)
    );

    const message =
      typeof data?.error?.message === "string" && data.error.message
        ? data.error.message
        : GENERIC_ERROR;

    throw new Error(message);
  }

  if (typeof data?.reply !== "string" || !data.reply.trim()) {
    console.error("The cooking companion API returned an unusable reply:", data);
    throw new Error(GENERIC_ERROR);
  }

  return data.reply;
};