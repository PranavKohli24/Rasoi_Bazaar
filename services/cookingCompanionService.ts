import { Recipe } from "../types";

export interface CompanionMessage {
  role: "user" | "assistant";
  content: string;
}

// Written in the companion's own voice rather than as system-failure notices,
// since this is exactly the text people see when something goes wrong.
const GENERIC_ERROR =
  "Hmm, I got a little distracted at the stove. Mind asking me that again?";
const OFFLINE_ERROR =
  "I can't hear you over the sizzling — looks like your connection dropped. Try again once you're back online?";

/**
 * Asks the cooking companion a question about the given recipe, passing the
 * prior turns of this conversation for context. The AI key, system prompt,
 * and model all live server-side in /api/cooking-companion.
 */
export const askCookingCompanion = async (
  recipe: Recipe,
  history: CompanionMessage[],
  question: string,
  currentStepNumber: number | null,
  currentStepInstruction: string | null,
  totalSteps: number
): Promise<string> => {
  let response: Response;

  try {
    response = await fetch("/api/cooking-companion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe,
        history,
        question,
        currentStepNumber,
        currentStepInstruction,
        totalSteps,
      }),
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


/**
 * Same as askCookingCompanion, but calls onChunk with the text as it
 * arrives. Resolves with the full reply when the stream ends.
 */
export const streamCookingCompanion = async (
  recipe: Recipe,
  history: CompanionMessage[],
  question: string,
  currentStepNumber: number | null,
  currentStepInstruction: string | null,
  totalSteps: number,
  onChunk: (text: string) => void
): Promise<string> => {
  let response: Response;

  try {
    response = await fetch("/api/cooking-companion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe,
        history,
        question,
        currentStepNumber,
        currentStepInstruction,
        totalSteps,
        stream: true,
      }),
    });
  } catch (error) {
    console.error("Cooking companion request failed:", error);
    throw new Error(OFFLINE_ERROR);
  }

  if (!response.ok || !response.body) {
    let message = GENERIC_ERROR;
    try {
      const data = await response.json();
      if (typeof data?.error?.message === "string" && data.error.message) {
        message = data.error.message;
      }
    } catch {
      /* not JSON */
    }
    throw new Error(message);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let full = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      full += text;
      onChunk(text);
    }
  } catch (error) {
    console.error("Cooking companion stream broke:", error);
    if (!full.trim()) throw new Error(OFFLINE_ERROR);
  }

  if (!full.trim()) throw new Error(GENERIC_ERROR);
  return full;
};

/**
 * Collects streamed text and hands back each finished sentence.
 * Call push() with every chunk, then flush() when the stream ends.
 */
export const createSentenceSplitter = (onSentence: (sentence: string) => void) => {
  let buffer = "";
  return {
    push(chunk: string) {
      buffer += chunk;
      // A sentence ends at . ! or ? followed by a space or newline.
      let match: RegExpExecArray | null;
      while (
        (match = /[.!?]+(?:\s|$)/.exec(buffer)) &&
        match.index + match[0].length < buffer.length
      ) {
        const end = match.index + match[0].length;
        const sentence = buffer.slice(0, end).trim();
        buffer = buffer.slice(end);
        if (sentence) onSentence(sentence);
      }
    },
    flush() {
      const rest = buffer.trim();
      buffer = "";
      if (rest) onSentence(rest);
    },
  };
};