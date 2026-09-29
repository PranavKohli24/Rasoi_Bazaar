import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoError, prepareImage, PreparedImage } from "./resizeImage";

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
const TIMEOUT_ERROR = "That took too long. Check your connection and try again, or type the dish name.";
const REQUEST_TIMEOUT_MS = 25_000;

/** An error message that came from our own API and is safe to show. */
class ApiError extends Error {}

export function useIdentifyDish() {
  const [status, setStatus] = useState<Status>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const previewRef = useRef<string | null>(null);

  const releasePreview = useCallback(() => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
  }, []);

  // Stop any work and free the thumbnail if the page unmounts mid-request
  useEffect(
    () => () => {
      abortRef.current?.abort();
      releasePreview();
    },
    [releasePreview]
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    releasePreview();
    setStatus("idle");
    setPreview(null);
    setResult(null);
    setError(null);
  }, [releasePreview]);

  const identify = useCallback(
    async (file: File): Promise<IdentifyResult | null> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      let timedOut = false;
      const timer = window.setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, REQUEST_TIMEOUT_MS);

      releasePreview();
      setPreview(null);
      setStatus("identifying");
      setResult(null);
      setError(null);

      let prepared: PreparedImage | null = null;

      try {
        prepared = await prepareImage(file);

        // Reset or replaced while we were resizing: drop this photo quietly
        if (controller.signal.aborted) {
          URL.revokeObjectURL(prepared.previewUrl);
          return null;
        }

        previewRef.current = prepared.previewUrl;
        setPreview(prepared.previewUrl);

        const res = await fetch("/api/identify-dish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: prepared.base64, mediaType: prepared.mediaType }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          const message = body?.error?.message;
          throw new ApiError(typeof message === "string" && message ? message : FALLBACK_ERROR);
        }

        const data: IdentifyResult = await res.json();
        if (controller.signal.aborted) return null;

        setResult(data);
        setStatus("done");
        return data;
      } catch (e) {
        // A newer photo or a reset replaced this one: nothing to show
        if (controller.signal.aborted && !timedOut) return null;

        setError(
          timedOut
            ? TIMEOUT_ERROR
            : e instanceof PhotoError || e instanceof ApiError
            ? e.message
            : FALLBACK_ERROR
        );
        setStatus("error");
        return null;
      } finally {
        window.clearTimeout(timer);
      }
    },
    [releasePreview]
  );

  return { identify, reset, status, preview, result, error };
}