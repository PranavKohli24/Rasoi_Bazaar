import { useCallback, useRef, useState } from "react";
import { prepareImage } from "./resizeImage";

export interface DishCandidate {
  dishName: string;
  confidence: number;
}

export interface IdentifyResult {
  dishName: string | null;
  confidence: number;
  alternatives: DishCandidate[];
}

type Status = "idle" | "identifying" | "done" | "error";

const FALLBACK_ERROR = "Couldn't read that photo. Try another one, or type the dish name.";

export function useIdentifyDish() {
  const [status, setStatus] = useState<Status>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStatus("idle");
    setPreview(null);
    setResult(null);
    setError(null);
  }, []);

  const identify = useCallback(async (file: File): Promise<IdentifyResult | null> => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("identifying");
    setResult(null);
    setError(null);

    try {
      const img = await prepareImage(file);
      setPreview(img.previewUrl);

      const res = await fetch("/api/identify-dish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: img.base64, mediaType: img.mediaType }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message || "request failed");
      }

      const data: IdentifyResult = await res.json();
      setResult(data);
      setStatus("done");
      return data;
    } catch (e) {
      if ((e as Error).name === "AbortError") return null;
      const msg = (e as Error).message;
      setError(
        msg && msg !== "request failed" && msg !== "Failed to fetch"
          ? msg
          : FALLBACK_ERROR
      );
      setStatus("error");
      return null;
    }
  }, []);

  return { identify, reset, status, preview, result, error };
}