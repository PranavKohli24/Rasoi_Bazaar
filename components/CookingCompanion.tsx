import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Recipe } from "../types";
import {
  askCookingCompanion,
  CompanionMessage,
} from "../services/cookingCompanionService";

interface CookingCompanionProps {
  recipe: Recipe;
}

const STORAGE_PREFIX = "rasoi:companion:";
const PANEL_TRANSITION_MS = 200;

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

const AlertIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.9 1.8 18a1.8 1.8 0 0 0 1.5 2.7h17.4a1.8 1.8 0 0 0 1.5-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z" />
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
    "How do I know it's done?",
    "What goes well with this?",
  ].slice(0, 3);
};

/* ------------------------------------------------------------ component */

const CookingCompanion: React.FC<CookingCompanionProps> = ({ recipe }) => {
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
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen, isSending]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const sendQuestion = async (question: string) => {
    if (!question || isSending) return;

    const historyForRequest = messages;
    setMessages((current) => [...current, { role: "user", content: question }]);
    setInput("");
    setError(null);
    setLastQuestion(question);
    setIsSending(true);

    try {
      const reply = await askCookingCompanion(recipe, historyForRequest, question);
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
      setLastQuestion(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = () => sendQuestion(input.trim());
  const handleSuggestion = (question: string) => sendQuestion(question);
  const handleRetry = () => {
    if (lastQuestion) sendQuestion(lastQuestion);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
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
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full bg-[#FFF3E2] p-2.5 shadow-lg shadow-black/20 ring-1 ring-[#F0DFC2] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A66B] sm:bottom-6 sm:right-6 sm:pr-5"
        >
          <CompanionCharacter className="h-9 w-9" />
          <span className="hidden text-sm font-semibold text-[#5C4A38] sm:inline">
            Ask your Cooking Companion
          </span>
        </button>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-label="Cooking companion chat"
          className="companion-panel-enter fixed inset-x-0 bottom-0 z-[70] flex h-[75dvh] w-full flex-col rounded-t-3xl border border-[#F0DFC2] bg-[#FFFBF3] shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(560px,80dvh)] sm:w-96 sm:rounded-3xl"
        >
            <div className="flex items-center justify-between border-b border-[#F0DFC2] px-5 py-4">
              <div className="flex items-center gap-3">
                <CompanionCharacter thinking={isSending} className="h-9 w-9" />
                <div>
                  <p className="text-[15px] font-bold leading-tight text-[#3D3226]">
                    Cooking Companion
                  </p>
                  <p className="text-xs text-[#8A7A63]">
                    Ask about {recipe.dishName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize cooking companion"
                title="Minimize"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#8A7A63] transition-colors hover:bg-[#F5EBD8] hover:text-[#3D3226] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A66B]"
              >
                <ChatIcon className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-[#8A7A63]">
                    Ask me anything about cooking {recipe.dishName} —
                    substitutions, timing, technique, or troubleshooting.
                  </p>
                  {suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((question) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() => handleSuggestion(question)}
                          className="rounded-full border border-[#F0DFC2] bg-[#FFF3E2] px-3.5 py-2 text-left text-xs leading-snug text-[#5C4A38] transition-colors hover:border-[#F2A66B] hover:bg-[#FFE9CC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A66B]"
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
                    className="max-w-[85%] rounded-2xl rounded-bl-sm border border-[#F0DFC2] bg-white px-4 py-2.5 text-sm leading-relaxed text-[#3D3226]"
                  >
                    {message.content}
                  </div>
                ) : (
                  <div
                    key={index}
                    className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#FFD9A6] px-4 py-2.5 text-sm leading-relaxed text-[#5C3A1E]"
                  >
                    {message.content}
                  </div>
                )
              )}

              {isSending && (
                <div className="flex items-center gap-2">
                  <CompanionCharacter thinking className="h-6 w-6" />
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-[#F0DFC2] bg-white px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D9C7A8]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D9C7A8] [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D9C7A8] [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-[#F3B8B3] bg-[#FDE7E5] px-4 py-3 text-sm text-[#B23A32]">
                  <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="space-y-1.5">
                    <p className="leading-relaxed">{error}</p>
                    {lastQuestion && (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="text-xs font-semibold underline decoration-[#B23A32]/50 underline-offset-2 hover:decoration-[#B23A32]"
                      >
                        Try again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#F0DFC2] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. Can I skip the yogurt?"
                  rows={1}
                  className="companion-textarea max-h-24 flex-1 resize-none overflow-y-auto rounded-xl border border-[#F0DFC2] bg-white px-3.5 py-2.5 text-sm text-[#3D3226] placeholder:text-[#B8A98C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A66B]"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isSending || !input.trim()}
                  aria-label="Send"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2A66B] text-white transition-colors hover:bg-[#E8985A] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <SendIcon className="h-[18px] w-[18px]" />
                </button>
              </div>
              <p className="mt-1.5 text-[11px] text-[#B8A98C]">
                Enter to send · Shift+Enter for a new line
              </p>
            </div>
        </div>
      )}

      <style>{`
        .companion-textarea {
          scrollbar-width: none; /* Firefox */
        }
        .companion-textarea::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
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

        @media (prefers-reduced-motion: reduce) {
          .companion-blink,
          .companion-spoon.is-stirring,
          .companion-panel-enter {
            animation: none;
          }
        }
      `}</style>
    </>,
    document.body
  );
};

export default CookingCompanion;