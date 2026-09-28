import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Recipe } from "../types";
import {
  askCookingCompanion,
  CompanionMessage,
} from "../services/cookingCompanionService";

interface CookingCompanionProps {
  recipe: Recipe;
  currentStepNumber: number | null;
  currentStepInstruction: string | null;
  totalSteps: number;
}

const STORAGE_PREFIX = "rasoi:companion:";
const PANEL_TRANSITION_MS = 200;

// How far down the sheet must be pulled before it counts as a deliberate
// "close" rather than a stray touch or the start of a scroll.
const DRAG_CLOSE_THRESHOLD = 90;

// Caps how long a dictated transcript can grow the input, same ceiling the
// text field itself uses.
const MAX_INPUT_CHARS = 500;

/* ---------------------------------------------------------------- icons */

const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

// Two bars — "stop recording", kept in the same paused-cassette shape most
// people already recognize from voice-note UIs.
const StopSquareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

// The companion itself: a round smiling face in a chef's hat, with a spoon
// that only moves while it's actually thinking. Flat solid fills only — no
// gradients — so it stays simple at every size it appears (launcher,
// header, loading row).
const CompanionCharacter: React.FC<{ thinking?: boolean; className?: string }> = ({
  thinking = false,
  className,
}) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    {/* Chef's hat */}
    <circle cx="21" cy="12" r="6.5" fill="#FFFFFF" />
    <circle cx="32" cy="8" r="7.5" fill="#FFFFFF" />
    <circle cx="43" cy="12" r="6.5" fill="#FFFFFF" />
    <rect x="18" y="13" width="28" height="9" rx="4.5" fill="#FFFFFF" />
    <rect x="18" y="19" width="28" height="4" rx="2" fill="#EDE4D3" />

    {/* Spoon, animated only while thinking */}
    <g
      className={`companion-spoon${thinking ? " is-stirring" : ""}`}
      stroke="#5C4A38"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="49" y1="38" x2="57" y2="27" />
      <ellipse cx="58.5" cy="24" rx="3.2" ry="4.4" transform="rotate(28 58.5 24)" fill="#FFF7EC" />
    </g>

    {/* Face */}
    <circle cx="32" cy="38" r="19" fill="#F2A66B" />
    <g className="companion-blink" style={{ transformOrigin: "32px 35px" }}>
      <circle cx="25" cy="35" r="2.5" fill="#5C4A38" />
      <circle cx="39" cy="35" r="2.5" fill="#5C4A38" />
    </g>
    <path
      d={thinking ? "M25 45q7 3 14 0" : "M24 44q8 6 16 0"}
      stroke="#5C4A38"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

/* --------------------------------------------------------- suggestions */

// A few tappable starter questions, so someone with wet or masala-covered
// hands can get useful help in one tap instead of typing. Kept generic
// rather than built from a specific ingredient/equipment match, so they're
// always relevant regardless of what this particular recipe calls for.
const buildSuggestions = (_recipe: Recipe): string[] => {
  void _recipe; // kept for future recipe-aware personalization
  return [
    "What can I substitute if I'm missing something?",
    "Am I on track so far?",
    "What goes well with this?",
  ].slice(0, 3);
};

// Fallback for the rare case the service throws something without a usable
// message. The service's own errors (offline vs. generic vs. server-sent)
// are already written in-character, so those are shown as-is.
const FRIENDLY_ERROR = "Hmm, I got a little distracted at the stove. Mind asking me that again?";

/* ------------------------------------------------------------ component */
const CookingCompanion: React.FC<CookingCompanionProps> = ({
  recipe,
  currentStepNumber,
  currentStepInstruction,
  totalSteps,
}) => {
  const hasRecipe = !!recipe && typeof recipe.dishName === "string";

  const storageKey = `${STORAGE_PREFIX}${
    hasRecipe ? recipe.dishName.toLowerCase() : "pending"
  }`;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<CompanionMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // ---- voice input (speech-to-text) ----
  // The input's own value is the single source of truth while dictating —
  // there's no separate hidden transcript. Each onresult replaces exactly
  // the previous interim chunk before appending the new one, so a growing
  // "...um, actually..." never leaves stray duplicated words behind.
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  const userRequestedStopRef = useRef(false);
  const interimVoiceTextRef = useRef("");
  const discardSpeechResultsRef = useRef(false);
  const micPermissionStatusRef = useRef<PermissionStatus | null>(null);
  const micWasBlockedRef = useRef(false);
  const micButtonRef = useRef<HTMLButtonElement>(null);

  const [isListening, setIsListening] = useState(false);
  const [micBlockedNotice, setMicBlockedNotice] = useState(false);
  const [micNoticePos, setMicNoticePos] = useState<{ left: number; bottom: number } | null>(null);

  // Whether the message list is scrolled down enough that older messages are
  // hidden above the fold — drives the top fade/blur that hints "more above".
  const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);

  // ---- drag-to-close ----
  // Tracked separately from scrolling: these handlers are only ever attached
  // to the drag handle and the header bar, never to the scrollable message
  // list, so a finger dragging through the chat log just scrolls it as
  // normal. Only a pull that starts on the handle/header and travels past
  // DRAG_CLOSE_THRESHOLD closes the panel; anything shorter snaps back.
  const dragStartYRef = useRef<number | null>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // Lets the CSS enter-animation play once on open, then gets out of the
  // way so it doesn't fight the live drag transform on every re-render.
  const [hasMounted, setHasMounted] = useState(false);

  const suggestions = useMemo(
    () => (hasRecipe ? buildSuggestions(recipe) : []),
    [recipe, hasRecipe]
  );

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      /* ignore storage problems */
    }
  }, [messages, storageKey]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => textareaRef.current?.focus(), PANEL_TRANSITION_MS);
    } else {
      // Reset drag state so the next open starts from a clean slate.
      setHasMounted(false);
      setDragY(0);
      setIsDragging(false);
      dragStartYRef.current = null;
      panelRef.current?.style.removeProperty("--kb-inset");

      // Closing the panel (swipe-to-close, the minimize button, Escape,
      // whatever) shouldn't leave the mic listening in the background.
      if (isListeningRef.current) {
        userRequestedStopRef.current = true;
        isListeningRef.current = false;
        try {
          recognitionRef.current?.stop();
        } catch {
          /* already stopped */
        }
        setIsListening(false);
      }
      setMicBlockedNotice(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
      // New content can change whether we're "at the top" even without a
      // manual scroll (e.g. a reply pushes the list down past the fold).
      window.requestAnimationFrame(() => {
        setIsScrolledFromTop((scrollRef.current?.scrollTop ?? 0) > 4);
      });
    }
  }, [messages, isOpen, isSending]);

  const handleMessagesScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setIsScrolledFromTop(event.currentTarget.scrollTop > 4);
  };

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    const vv = window.visualViewport;
    if (!panel || !vv) return;

    const applyInset = () => {
      const covered = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      panel.style.setProperty("--kb-inset", `${covered}px`);
    };

    applyInset();
    vv.addEventListener("resize", applyInset);
    vv.addEventListener("scroll", applyInset);
    return () => {
      vv.removeEventListener("resize", applyInset);
      vv.removeEventListener("scroll", applyInset);
      panel.style.removeProperty("--kb-inset");
    };
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    // A tap on the minimize button is a tap, not a swipe — let its onClick
    // handle it instead of starting a drag.
    if (event.target instanceof HTMLElement && event.target.closest("button")) {
      return;
    }
    dragStartYRef.current = event.clientY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    const delta = event.clientY - dragStartYRef.current;
    // Only downward pulls move the sheet; an upward wiggle stays put at 0.
    setDragY(Math.max(0, delta));
  };

  const handleDragEnd = () => {
    if (dragStartYRef.current === null) return;
    dragStartYRef.current = null;
    setIsDragging(false);

    if (dragY > DRAG_CLOSE_THRESHOLD) {
      setIsOpen(false);
    } else {
      setDragY(0); // wasn't pulled far enough — snap back open
    }
  };

  const sendQuestion = async (question: string) => {
    if (!question || isSending) return;

    const historyForRequest = messages;
    setMessages((current) => [...current, { role: "user", content: question }]);
    setInput("");
    setError(null);
    setLastQuestion(question);
    setIsSending(true);

    try {
      const reply = await askCookingCompanion(
            recipe,
            historyForRequest,
            question,
            currentStepNumber,
            currentStepInstruction,
            totalSteps
            );
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
      setLastQuestion(null);
    } catch (err) {
      console.error("Cooking companion error:", err);
      setError(err instanceof Error && err.message ? err.message : FRIENDLY_ERROR);
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = () => sendQuestion(input.trim());
  const handleSuggestion = (question: string) => sendQuestion(question);
  const handleRetry = () => {
    if (lastQuestion) sendQuestion(lastQuestion);
  };

  const getSpeechRecognitionCtor = (): any =>
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;

  const showMicBlockedNoticeIfDenied = async () => {
    // A dismissed prompt raises the same 'not-allowed' error as a real
    // block, but leaves the permission at 'prompt' — the next mic click
    // can still ask. Only warn when we're actually blocked.
    if (!navigator.permissions?.query) {
      showMicBlockedNotice();
      return;
    }
    try {
      const status = await navigator.permissions.query({ name: "microphone" as PermissionName });
      if (status.state === "denied") {
        micWasBlockedRef.current = true;
        showMicBlockedNotice();
      }
    } catch {
      showMicBlockedNotice();
    }
  };

  const showMicBlockedNotice = () => {
    if (micButtonRef.current) {
      const rect = micButtonRef.current.getBoundingClientRect();
      const width = 260;
      const margin = 10;
      let left = rect.right - width;
      left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
      // Anchored from the viewport bottom (not a measured height) so the
      // note can grow upward from the mic button without needing to know
      // its own height ahead of time.
      setMicNoticePos({ left, bottom: window.innerHeight - rect.top + 10 });
    }
    setMicBlockedNotice(true);
  };

  const setupSpeechRecognition = (): any => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return null;

    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      isListeningRef.current = true;
      userRequestedStopRef.current = false;
      discardSpeechResultsRef.current = false;
      interimVoiceTextRef.current = "";
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      if (discardSpeechResultsRef.current) return;

      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += transcript;
        else interimText += transcript;
      }

      // setInput reads the LATEST value itself, so this stays correct even
      // though this callback was created once when recognition started.
      setInput((prevValue) => {
        let currentText = prevValue.trim();

        if (interimVoiceTextRef.current) {
          const oldInterim = interimVoiceTextRef.current.trim();
          if (oldInterim && currentText.endsWith(oldInterim)) {
            currentText = currentText.slice(0, currentText.length - oldInterim.length).trim();
          }
        }

        if (finalText) {
          currentText = `${currentText} ${finalText}`.replace(/\s+/g, " ").trim();
        }
        if (interimText) {
          currentText = `${currentText} ${interimText}`.replace(/\s+/g, " ").trim();
        }

        interimVoiceTextRef.current = interimText;
        return currentText.slice(0, MAX_INPUT_CHARS);
      });
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);

      // Always reset mic state after any recognition error — especially
      // important when the permission popup is dismissed.
      isListeningRef.current = false;
      userRequestedStopRef.current = true;
      interimVoiceTextRef.current = "";
      setIsListening(false);

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        // Some browsers keep this instance poisoned after a denial — start()
        // on the same object errors again even once the user allows the
        // mic. Throw it away so the next click gets a clean recognizer.
        rebuildRecognition();
        showMicBlockedNoticeIfDenied();
      }
    };

    recognition.onend = () => {
      if (userRequestedStopRef.current) {
        isListeningRef.current = false;
        interimVoiceTextRef.current = "";
        setIsListening(false);
        return;
      }

      // Browsers sometimes end continuous recognition during silence —
      // keep the session alive if the person never asked to stop.
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch (error) {
          console.warn("Could not restart speech recognition:", error);
        }
      }
    };

    return recognition;
  };

  const rebuildRecognition = () => {
    const stale = recognitionRef.current;
    if (stale) {
      stale.onstart = null;
      stale.onresult = null;
      stale.onerror = null;
      stale.onend = null;
      try {
        stale.abort();
      } catch (error) {
        console.warn("Could not abort stale recognition:", error);
      }
    }

    recognitionRef.current = null;
    isListeningRef.current = false;
    userRequestedStopRef.current = false;
    interimVoiceTextRef.current = "";

    recognitionRef.current = setupSpeechRecognition();
  };

  // Watches the mic permission so an address-bar re-allow (after a block)
  // silently swaps in a fresh recognizer, and a fresh block clears itself
  // to show the notice again next time.
  useEffect(() => {
    if (!navigator.permissions?.query) return;

    let status: PermissionStatus | null = null;
    let handleChange: (() => void) | null = null;

    navigator.permissions
      .query({ name: "microphone" as PermissionName })
      .then((result) => {
        status = result;
        micPermissionStatusRef.current = result;

        handleChange = () => {
          if (result.state === "denied") {
            micWasBlockedRef.current = true;
            return;
          }
          if (result.state !== "granted") return;

          setMicBlockedNotice(false);

          // This event also fires for the in-page prompt, where recognition
          // is already starting — rebuilding there would abort the session
          // just allowed. Only swap in a fresh recognizer when recovering
          // from an actual block (address-bar re-allow).
          if (micWasBlockedRef.current && !isListeningRef.current) {
            micWasBlockedRef.current = false;
            rebuildRecognition();
          } else {
            micWasBlockedRef.current = false;
          }
        };

        result.addEventListener("change", handleChange);
      })
      .catch(() => {
        /* Permissions API without a 'microphone' descriptor (Firefox/Safari) —
           startVoiceRecording() falls back to a getUserMedia probe. */
      });

    return () => {
      if (status && handleChange) {
        status.removeEventListener("change", handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dismiss the mic-blocked note on an outside tap, same as the panel's
  // other transient popovers.
  useEffect(() => {
    if (!micBlockedNotice) return;
    const handleOutside = (event: PointerEvent) => {
      if (micButtonRef.current?.contains(event.target as Node)) return;
      setMicBlockedNotice(false);
    };
    document.addEventListener("pointerdown", handleOutside, true);
    return () => document.removeEventListener("pointerdown", handleOutside, true);
  }, [micBlockedNotice]);

  // Abort any live recognition session if the whole component ever unmounts.
  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        /* already stopped */
      }
    };
  }, []);

  const startVoiceRecording = async () => {
    if (isListeningRef.current) return;

    // Live state, not a cached one — reflects address-bar changes instantly.
    if (micPermissionStatusRef.current?.state === "denied") {
      showMicBlockedNotice();
      return;
    }

    // No Permissions API for the mic (Safari): probe with getUserMedia,
    // which always re-reads the current permission.
    if (!micPermissionStatusRef.current && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch {
        showMicBlockedNotice();
        return;
      }
    }

    if (!recognitionRef.current) recognitionRef.current = setupSpeechRecognition();
    if (!recognitionRef.current) return; // Speech recognition unsupported in this browser

    setMicBlockedNotice(false);
    userRequestedStopRef.current = false;
    interimVoiceTextRef.current = "";

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.warn("Could not start speech recognition:", error);
      rebuildRecognition();
      showMicBlockedNoticeIfDenied();
    }
  };

  // Stops listening but keeps whatever was transcribed in the input, so it
  // can still be edited or sent normally.
  const stopVoiceRecording = () => {
    const recognition = recognitionRef.current;
    if (!recognition || !isListeningRef.current) return;

    userRequestedStopRef.current = true;
    isListeningRef.current = false;

    try {
      recognition.stop();
    } catch (error) {
      console.warn("Could not stop speech recognition:", error);
    }

    setIsListening(false);
    textareaRef.current?.focus();
  };

  // Sends the dictated transcript straight away, discarding any recognition
  // results still in flight so they can't land after the message is sent.
  const sendVoiceMessage = () => {
    if (!input.trim() || isSending) return;

    userRequestedStopRef.current = true;
    isListeningRef.current = false;
    discardSpeechResultsRef.current = true;

    try {
      recognitionRef.current?.abort();
    } catch (error) {
      console.warn("Could not stop speech recognition:", error);
    }

    setIsListening(false);
    handleSend();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (isListening) {
        sendVoiceMessage();
      } else {
        handleSend();
      }
    }
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }, [input]);

  if (!hasRecipe) return null;

  // Rendered via portal straight into <body>. If this markup stayed inside
  // the recipe layout, any transformed ancestor upstream (the header photo
  // uses `perspective`, page-transition wrappers often use `transform`) would
  // silently turn `fixed` into something that scrolls with the page instead
  // of staying pinned to the viewport. Portaling to <body> guarantees there's
  // nothing above it that can do that.
  return createPortal(
    <>
      {/* Reachable from any scroll position. Icon-only on narrow screens to
          stay out of the way of the thumb; the label appears once there's
          room for it. */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Ask your Cooking Companion"
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full bg-[#FFEAC4] p-2.5 shadow-lg shadow-black/20 ring-1 ring-[#EAD9AE] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26] sm:bottom-6 sm:right-6 sm:pr-5"
        >
          <CompanionCharacter className="h-9 w-9" />
          <span className="hidden text-sm font-semibold text-[#2B1A0C] sm:inline">
            Ask your Cooking Companion
          </span>
        </button>
      )}

            {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Cooking companion chat"
          onAnimationEnd={() => setHasMounted(true)}
          className={`${hasMounted ? "" : "companion-panel-enter"} fixed inset-x-0 bottom-[var(--kb-inset,0px)] z-[70] flex h-[75dvh] w-full flex-col rounded-t-3xl border border-[#EAD9AE] bg-[#FFFEFA] shadow-2xl sm:inset-x-auto sm:bottom-[calc(1.5rem+var(--kb-inset,0px))] sm:right-6 sm:h-[min(560px,80dvh)] sm:w-96 sm:rounded-3xl`}
          style={{
            transform: `translateY(${dragY}px)`,
            transition: isDragging ? "none" : "transform 0.2s ease",
            opacity: 1 - Math.min(dragY / 400, 0.5),
          }}
        >
            {/* Drag handle — the only other surface, besides the header, that
                starts a close-drag. Deliberately outside the scrollable
                message list below. */}
            <div
              className="flex touch-none justify-center pb-1 pt-2.5 cursor-grab active:cursor-grabbing"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <span className="h-1.5 w-10 rounded-full bg-[#EAD9AE]" aria-hidden="true" />
            </div>

            <div
              className="flex touch-none items-center justify-between border-b border-[#EAD9AE] px-5 py-4"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <div className="flex items-center gap-3">
                <CompanionCharacter thinking={isSending} className="h-9 w-9" />
                <div>
                  <p className="text-[15px] font-bold leading-tight text-[#2B1A0C]">
                    Cooking Companion
                  </p>
                  <p className="text-xs text-[#6B5238]">
                    Ask about {recipe.dishName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize cooking companion"
                title="Minimize"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B5238] transition-colors hover:bg-[#F5E9C6] hover:text-[#2B1A0C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26]"
              >
                <ChatIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              {/* Hints that there's more chat scrolled above — fades and
                  softly blurs the top edge of the list, ChatGPT-style. Only
                  shown once the list has actually been scrolled down, and it
                  sits on its own layer so it never intercepts scroll/drag
                  gestures meant for the messages underneath. */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-10 backdrop-blur-[2px] transition-opacity duration-200 ${
                  isScrolledFromTop ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(to bottom, #FFFEFA 0%, rgba(255,254,250,0.6) 55%, rgba(255,254,250,0) 100%)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              <div
                ref={scrollRef}
                onScroll={handleMessagesScroll}
                className="h-full space-y-3 overflow-y-auto overscroll-y-contain px-5 py-4"
              >
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-[#6B5238]">
                    Ask me anything about cooking {recipe.dishName} -
                    substitutions, timing, technique, or other cooking doubts.
                  </p>
                  {suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((question) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() => handleSuggestion(question)}
                          className="rounded-full border border-[#EAD9AE] bg-[#FFEAC4] px-3.5 py-2 text-left text-xs leading-snug text-[#5A2E12] transition-colors hover:border-[#FC6C26] hover:bg-[#FFDCC0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26]"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {messages.map((message, index) =>
                message.role === "assistant" ? (
                  <div
                    key={index}
                    className="message-bubble-in w-fit max-w-[85%] rounded-2xl rounded-bl-sm border border-[#EAD9AE] bg-white px-4 py-2.5 text-sm leading-relaxed text-[#2B1A0C]"
                  >
                    {message.content}
                  </div>
                ) : (
                  <div
                    key={index}
                    className="message-bubble-in ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-[#FFDCC0] px-4 py-2.5 text-sm leading-relaxed text-[#5A2E12]"
                  >
                    {message.content}
                  </div>
                )
              )}

              {/* Plain typing cue — deliberately not a bubble. The reply gets
                  its own bubble, freshly created, once it actually arrives;
                  this never grows into it. */}
              {isSending && (
                <div
                  className="flex items-center gap-2 py-1 pl-1"
                  role="status"
                  aria-label="Cooking companion is typing"
                >
                  <CompanionCharacter thinking className="h-6 w-6 shrink-0" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D9BE8E]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D9BE8E] [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D9BE8E] [animation-delay:300ms]" />
                </div>
              )}

              {/* Shown as an ordinary message from the companion, not a system
                  alert — no red, no warning icon. */}
              {error && (
                <div className="message-bubble-in flex items-start gap-2">
                  <CompanionCharacter className="h-6 w-6 shrink-0 opacity-90" />
                  <div className="max-w-[85%] w-fit rounded-2xl rounded-bl-sm border border-[#EAD9AE] bg-white px-4 py-2.5 text-sm leading-relaxed text-[#2B1A0C]">
                    <p>{error}</p>
                    {lastQuestion && (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-2 inline-flex text-xs font-semibold text-[#D1560F] underline decoration-[#D1560F]/40 underline-offset-2 hover:decoration-[#D1560F]"
                      >
                        Ask again
                      </button>
                    )}
                  </div>
                </div>
              )}
              </div>
            </div>

            <div className="border-t border-[#EAD9AE] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. Can I skip the yogurt?"
                  rows={1}
                  maxLength={MAX_INPUT_CHARS}
                  className="companion-textarea max-h-24 flex-1 resize-none overflow-y-auto rounded-xl border border-[#EAD9AE] bg-white px-3.5 py-2.5 text-sm text-[#2B1A0C] placeholder:text-[#B8A98C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26]"
                />

                {/* Mic <-> Send: one button, two icons cross-fading, exactly
                    like the digital-twin chat's action button. Hidden while
                    actively recording — the floating stack below takes over. */}
                {!isListening && (
                  <button
                    ref={micButtonRef}
                    type="button"
                    onClick={() => (input.trim() ? handleSend() : startVoiceRecording())}
                    disabled={isSending}
                    aria-label={input.trim() ? "Send" : "Start voice recording"}
                    className="companion-action-btn relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#FC6C26] text-white transition-colors hover:bg-[#D1560F] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <MicIcon
                      className={`companion-action-icon h-[18px] w-[18px] ${
                        input.trim() ? "companion-action-icon-out-left" : "companion-action-icon-in"
                      }`}
                    />
                    <SendIcon
                      className={`companion-action-icon h-[18px] w-[18px] ${
                        input.trim() ? "companion-action-icon-in" : "companion-action-icon-out-right"
                      }`}
                    />
                  </button>
                )}

                {/* Recording: a small vertical stack, same shape as the
                    digital-twin chat's floating send/stop controls. */}
                {isListening && (
                  <div className="companion-voice-controls flex flex-col gap-1.5 rounded-2xl border border-[#EAD9AE] bg-white/95 p-1.5 shadow-lg">
                    <button
                      type="button"
                      onClick={sendVoiceMessage}
                      disabled={!input.trim()}
                      aria-label="Send voice message"
                      title="Send"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FC6C26] text-white transition-colors hover:bg-[#D1560F] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <SendIcon className="h-[15px] w-[15px]" />
                    </button>
                    <button
                      type="button"
                      onClick={stopVoiceRecording}
                      aria-label="Stop recording"
                      title="Stop recording"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FC6C26] text-white transition-colors hover:bg-[#D1560F]"
                    >
                      <StopSquareIcon className="h-[13px] w-[13px]" />
                    </button>
                  </div>
                )}
              </div>

              {/* Listening indicator — a plain pulsing dot + label, same
                  language as the digital-twin chat's "Listening voice..." row. */}
              {isListening && (
                <div
                  className="mt-2.5 flex items-center justify-center gap-2 text-xs font-semibold"
                  style={{ color: "#D1560F" }}
                >
                  <span className="companion-recording-dot h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#E5484D" }} />
                  Listening...
                </div>
              )}
            </div>

            {/* Mic-blocked note — anchored from the viewport bottom off the
                mic button's own position, so it grows upward without ever
                needing to measure its own height first. */}
            {micBlockedNotice && micNoticePos && (
              <div
                role="alert"
                className="companion-mic-notice"
                style={{ left: micNoticePos.left, bottom: micNoticePos.bottom }}
              >
                <p className="companion-mic-notice-title">Microphone access is blocked</p>
                <p className="companion-mic-notice-desc">
                  To use dictation, open your browser&apos;s site settings and allow the microphone.
                </p>
                <button
                  type="button"
                  onClick={() => setMicBlockedNotice(false)}
                  className="companion-mic-notice-btn"
                >
                  Got it
                </button>
              </div>
            )}
        </div>
      )}

      <style>{`
        .companion-textarea {
          scrollbar-width: none; /* Firefox */
        }
        .companion-textarea::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }

        /* A message bubble's one-time arrival, not a repeating effect. Because
           messages are keyed by index and only ever appended, existing bubbles
           never remount and never replay this — only a genuinely new one does. */
        .message-bubble-in {
          animation: message-bubble-in 0.22s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes message-bubble-in {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .companion-blink {
          animation: companion-blink 6s ease-in-out infinite;
        }
        @keyframes companion-blink {
          0%, 94%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.15); }
        }

        .companion-spoon {
          transform-box: fill-box;
          transform-origin: 90% 90%;
          transition: transform 0.2s ease;
        }
        .companion-spoon.is-stirring {
          animation: companion-stir 0.85s ease-in-out infinite;
        }
        @keyframes companion-stir {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(9deg); }
        }

        .companion-panel-enter {
          animation: companion-panel-in 0.22s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes companion-panel-in {
          from { transform: translateY(16px); opacity: 0.6; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Mic <-> Send crossfade, same technique as the digital-twin chat:
           both icons sit stacked in the same spot, and only their opacity
           and a small scale/rotate move to signal which one is "in". */
        .companion-action-btn {
          isolation: isolate;
        }
        .companion-action-icon {
          position: absolute;
          transition: opacity 0.18s ease, transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .companion-action-icon-in {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .companion-action-icon-out-left {
          opacity: 0;
          transform: scale(0.55) rotate(-30deg);
        }
        .companion-action-icon-out-right {
          opacity: 0;
          transform: scale(0.55) rotate(30deg);
        }

        .companion-voice-controls {
          animation: companion-voice-controls-in 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes companion-voice-controls-in {
          from { opacity: 0; transform: translateY(6px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .companion-recording-dot {
          animation: companion-recording-pulse 1s infinite ease-in-out;
        }
        @keyframes companion-recording-pulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.35); opacity: 1; }
        }

        .companion-mic-notice {
          position: fixed;
          z-index: 80;
          width: 260px;
          max-width: calc(100vw - 20px);
          box-sizing: border-box;
          padding: 0.85rem 0.95rem;
          border-radius: 14px;
          background: rgba(43, 26, 12, 0.94);
          color: #FFFEFA;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
          animation: companion-mic-notice-in 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .companion-mic-notice-title {
          margin: 0 0 0.3rem;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .companion-mic-notice-desc {
          margin: 0;
          font-size: 0.75rem;
          line-height: 1.4;
          opacity: 0.85;
        }
        .companion-mic-notice-btn {
          display: block;
          margin: 0.6rem 0 0 auto;
          padding: 0.35rem 0.7rem;
          border: none;
          border-radius: 8px;
          background: #FFEAC4;
          color: #2B1A0C;
          font: inherit;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
        }
        @keyframes companion-mic-notice-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .companion-blink,
          .companion-spoon.is-stirring,
          .companion-panel-enter,
          .message-bubble-in,
          .companion-action-icon,
          .companion-voice-controls,
          .companion-recording-dot,
          .companion-mic-notice {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </>,
    document.body
  );
};

export default CookingCompanion;