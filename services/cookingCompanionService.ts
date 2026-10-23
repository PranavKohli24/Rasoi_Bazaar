import { Recipe } from "../types";

export interface CompanionMessage {
  role: "user" | "assistant";
  content: string;
  kind?: "text" | "address_picker" | "product_results" | "confirm_action" | "connect_swiggy";
  addresses?: AddressOption[];
  products?: CommerceProduct[];
  pendingItems?: CommercePendingItem[];
  /** For kind "connect_swiggy": the question to resume once connected. */
  pendingQuestion?: string;
}

export interface AddressOption {
  id: string;
  addressLine: string;
  addressTag?: string;
  addressCategory?: string;
}

export interface CommerceProduct {
  spinId: string;
  skuId: string;
  displayName: string;
  brandName: string;
  imageUrl?: string;
  quantityDescription: string;
  price: { mrp: number; offerPrice: number };
  isInStockAndAvailable: boolean;
  ingredientName: string;
}

export interface CommercePendingItem {
  spinId: string;
  skuId: string;
  displayName: string;
  quantityDescription: string;
  offerPrice: number;
  quantity: number;
}

export type CompanionReply =
  | { type: "text"; content: string; products?: CommerceProduct[] }
  | { type: "confirm_add"; content: string; items: CommercePendingItem[] }
  | { type: "needs_address"; addresses: AddressOption[] }
  | { type: "needs_auth" };

export interface CommerceAddResult {
  type: "added" | "needs_auth";
  shortageNote?: string | null;
}

const GENERIC_ERROR = "Hmm, I got a little distracted at the stove. Mind asking me that again?";
const OFFLINE_ERROR =
  "I can't hear you over the sizzling — looks like your connection dropped. Try again once you're back online?";

/**
 * The single agent turn — handles plain recipe Q&A AND Instamart commerce.
 * Always non-streaming (tools need structured responses). Used for every
 * typed message and every tapped suggestion/address/product.
 */
export const askCookingCompanion = async (
  recipe: Recipe,
  history: { role: "user" | "assistant"; content: string }[],
  question: string,
  currentStepNumber: number | null,
  currentStepInstruction: string | null,
  totalSteps: number,
  addressId: string | null
): Promise<CompanionReply> => {
  let response: Response;

  try {
    response = await fetch("/api/cooking-companion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "chat",
        recipe,
        history,
        question,
        currentStepNumber,
        currentStepInstruction,
        totalSteps,
        addressId,
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
    console.error("Cooking companion request failed:", response.status, JSON.stringify(data?.error));
    const message = typeof data?.error?.message === "string" && data.error.message ? data.error.message : GENERIC_ERROR;
    throw new Error(message);
  }

  if (data?.type === "needs_auth") return { type: "needs_auth" };
  if (data?.type === "needs_address") {
    return { type: "needs_address", addresses: Array.isArray(data.addresses) ? data.addresses : [] };
  }
  if (data?.type === "confirm_add") {
    return { type: "confirm_add", content: data.content ?? "", items: Array.isArray(data.items) ? data.items : [] };
  }
  if (data?.type === "text") {
    return { type: "text", content: data.content ?? "", products: Array.isArray(data.products) ? data.products : undefined };
  }

  console.error("The cooking companion API returned an unusable reply:", data);
  throw new Error(GENERIC_ERROR);
};

/**
 * Confirms a proposed cart addition. Not a model turn — a direct action.
 */
export const confirmCartAdd = async (
  addressId: string,
  items: CommercePendingItem[]
): Promise<CommerceAddResult> => {
  let response: Response;

  try {
    response = await fetch("/api/cooking-companion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "confirm_add", addressId, items }),
    });
  } catch (error) {
    console.error("Confirm-add request failed:", error);
    throw new Error(OFFLINE_ERROR);
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    console.error("The confirm-add API didn't return JSON.");
  }

  if (!response.ok) {
    const message = typeof data?.error?.message === "string" && data.error.message ? data.error.message : GENERIC_ERROR;
    throw new Error(message);
  }

  if (data?.type === "needs_auth") return { type: "needs_auth" };
  if (data?.type === "added") return { type: "added", shortageNote: data.shortageNote ?? null };

  throw new Error(GENERIC_ERROR);
};

/**
 * Same agent, streamed, tools disabled — used for spoken "Hey chef" replies
 * only. Calls onChunk with text as it arrives. Resolves with the full reply.
 */
export const streamCookingCompanion = async (
  recipe: Recipe,
  history: { role: "user" | "assistant"; content: string }[],
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
        action: "chat",
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
      if (typeof data?.error?.message === "string" && data.error.message) message = data.error.message;
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

/** Collects streamed text and hands back each finished sentence. */
export const createSentenceSplitter = (onSentence: (sentence: string) => void) => {
  let buffer = "";
  return {
    push(chunk: string) {
      buffer += chunk;
      let match: RegExpExecArray | null;
      while ((match = /[.!?]+(?:\s|$)/.exec(buffer)) && match.index + match[0].length < buffer.length) {
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