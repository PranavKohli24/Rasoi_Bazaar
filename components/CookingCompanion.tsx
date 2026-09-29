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
const VOICE_REPLY_KEY = "rasoi:companion-voice-replies";
const PANEL_TRANSITION_MS = 200;

// How far down the sheet must be pulled before it counts as a deliberate
// "close" rather than a stray touch or the start of a scroll.
const DRAG_CLOSE_THRESHOLD = 90;

// Caps how long a dictated transcript can grow the input, same ceiling the
// text field itself uses.
const MAX_INPUT_CHARS = 500;

// Shown one after another while the companion is working on an answer, so
// the wait feels like someone thinking rather than a spinner.
const THINKING_PHRASES = [
  "Hmm, let me think…",
  "Checking the recipe…",
  "One sec, almost there…",
];

type Mood = "idle" | "thinking" | "listening" | "talking";

// Chef's hat colours — a light orange with a slightly deeper edge, so the hat
// stays visible on off-white backgrounds instead of disappearing like a
// white one.
const HAT = "#FFDAB3";
const HAT_BAND = "#FFC08A";
const HAT_EDGE = "#F2AA68";

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

const SpeakerIcon: React.FC<{ className?: string; on?: boolean }> = ({
  className,
  on = true,
}) => (
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
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    {on ? (
      <>
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M19 5a10 10 0 0 1 0 14" />
      </>
    ) : (
      <>
        <line x1="22" y1="9" x2="16" y2="15" />
        <line x1="16" y1="9" x2="22" y2="15" />
      </>
    )}
  </svg>
);

// The companion itself: a round face in a chef's hat, with a spoon. It has
// four moods so the person can *see* what it's doing:
//   idle      – calm smile
//   thinking  – flat mouth, spoon stirring
//   listening – wide eyes, open mouth, little sound arcs beside the head
//   talking   – mouth opens and closes
// Flat solid fills only — no gradients — so it stays simple at every size it
// appears (launcher, header).
const CompanionCharacter: React.FC<{ mood?: Mood; className?: string }> = ({
  mood = "idle",
  className,
}) => (
  <svg viewBox="0 0 64 64" overflow="visible" className={className} aria-hidden="true">
    {/* Chef's hat */}
    {/* Outline pass first, then the fills on top, so only the hat's outer
        edge shows (no lines between the overlapping puffs). */}
    <g fill={HAT_EDGE} stroke={HAT_EDGE} strokeWidth="2" strokeLinejoin="round">
      <circle cx="21" cy="12" r="6.5" />
      <circle cx="32" cy="8" r="7.5" />
      <circle cx="43" cy="12" r="6.5" />
      <rect x="18" y="13" width="28" height="9" rx="4.5" />
    </g>
    <circle cx="21" cy="12" r="6.5" fill={HAT} />
    <circle cx="32" cy="8" r="7.5" fill={HAT} />
    <circle cx="43" cy="12" r="6.5" fill={HAT} />
    <rect x="18" y="13" width="28" height="9" rx="4.5" fill={HAT} />
    <rect x="18" y="19" width="28" height="4" rx="2" fill={HAT_BAND} />

    {/* Sound arcs, only while listening */}
    {mood === "listening" && (
      <g stroke="#D1560F" strokeWidth="2" fill="none" strokeLinecap="round">
        <path className="companion-hear-1" d="M9 32q-3 6 0 12" />
        <path className="companion-hear-2" d="M4 28q-6 10 0 20" />
      </g>
    )}

    {/* Spoon, animated only while thinking */}
    <g
      className={`companion-spoon${mood === "thinking" ? " is-stirring" : ""}`}
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
      <circle cx="25" cy="35" r={mood === "listening" ? 3 : 2.5} fill="#5C4A38" />
      <circle cx="39" cy="35" r={mood === "listening" ? 3 : 2.5} fill="#5C4A38" />
    </g>

    {mood === "talking" && (
      <ellipse className="companion-talk" cx="32" cy="45.5" rx="4.5" ry="3.5" fill="#5C4A38" />
    )}
    {mood === "listening" && <ellipse cx="32" cy="46" rx="2.6" ry="3" fill="#5C4A38" />}
    {(mood === "idle" || mood === "thinking") && (
      <path
        d={mood === "thinking" ? "M25 45q7 3 14 0" : "M24 44q8 6 16 0"}
        stroke="#5C4A38"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    )}
  </svg>
);

/* ------------------------------------------------------------- helpers */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------- reply formatting */

// Models often answer in light markdown: **bold**, *italic*, `code`,
// "- " / "* " / "1. " lists and "#" headings. This turns that into plain
// React elements (never raw HTML), so the person sees clean text instead of
// stray asterisks.
type Seg = { text: string; bold?: boolean; italic?: boolean; code?: boolean };
type ListBlock = { type: "ul" | "ol"; start: number; items: Seg[][] };
type Block = { type: "p"; segs: Seg[] } | { type: "h"; segs: Seg[] } | ListBlock;

const INLINE_RE =
  /(\*\*\*[^*\n]+?\*\*\*|\*\*[^*\n]+?\*\*|__[^_\n]+?__|\*[^*\s][^*\n]*?\*|`[^`\n]+?`)/g;

const parseInline = (input: string): Seg[] =>
  input
    .split(INLINE_RE)
    .map((part, i): Seg | null => {
      if (!part) return null;
      // Odd indexes are the matched **...** / *...* / `...` pieces; even
      // indexes are plain text (with any unmatched asterisks dropped).
      if (i % 2 === 0) return { text: part.replace(/\*{1,3}|`/g, "") };
      if (part.startsWith("***")) return { text: part.slice(3, -3), bold: true, italic: true };
      if (part.startsWith("**")) return { text: part.slice(2, -2), bold: true };
      if (part.startsWith("__")) return { text: part.slice(2, -2), bold: true };
      if (part.startsWith("`")) return { text: part.slice(1, -1), code: true };
      return { text: part.slice(1, -1), italic: true };
    })
    .filter((seg): seg is Seg => !!seg && seg.text.length > 0);

const parseBlocks = (raw: string): Block[] => {
  const blocks: Block[] = [];
  const state: { para: string[]; list: ListBlock | null } = { para: [], list: null };

  const flushPara = () => {
    if (state.para.length) {
      blocks.push({ type: "p", segs: parseInline(state.para.join("\n")) });
      state.para = [];
    }
  };
  const flushList = () => {
    if (state.list) {
      blocks.push(state.list);
      state.list = null;
    }
  };

  for (const line of raw.replace(/\r\n/g, "\n").split("\n")) {
    const trimmed = line.trim();

    // Blank lines and "---" rules separate blocks.
    if (!trimmed || /^([-*_])\1{2,}$/.test(trimmed)) {
      flushPara();
      flushList();
      continue;
    }

    const heading = trimmed.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      flushPara();
      flushList();
      blocks.push({ type: "h", segs: parseInline(heading[1]) });
      continue;
    }

    const bullet = trimmed.match(/^[-*•]\s+(.*)$/);
    const numbered = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flushPara();
      const type = bullet ? "ul" : "ol";
      if (!state.list || state.list.type !== type) {
        flushList();
        state.list = { type, start: numbered ? parseInt(numbered[1], 10) : 1, items: [] };
      }
      state.list.items.push(parseInline(bullet ? bullet[1] : numbered![2]));
      continue;
    }

    flushList();
    state.para.push(trimmed);
  }

  flushPara();
  flushList();
  return blocks;
};

const tokenize = (text: string) => text.split(/(\s+)/);
const segsTokenCount = (segs: Seg[]) =>
  segs.reduce((n, seg) => n + tokenize(seg.text).length, 0);
const blockTokenCount = (block: Block) =>
  block.type === "ul" || block.type === "ol"
    ? block.items.reduce((n, item) => n + segsTokenCount(item), 0)
    : "segs" in block
      ? segsTokenCount(block.segs)
      : 0;

// Renders only the first `budget.left` tokens, so the same structure can be
// revealed word by word without ever showing half-typed markdown.
const renderSegs = (segs: Seg[], budget: { left: number }) =>
  segs.map((seg, i) => {
    if (budget.left <= 0) return null;
    const tokens = tokenize(seg.text);
    const take = Math.min(tokens.length, budget.left);
    budget.left -= take;

    let node: React.ReactNode = tokens.slice(0, take).join("");
    if (seg.code) {
      node = <code className="rounded bg-black/5 px-1 py-0.5 text-[0.9em]">{node}</code>;
    }
    if (seg.italic) node = <em>{node}</em>;
    if (seg.bold) node = <strong className="font-semibold">{node}</strong>;
    return <React.Fragment key={i}>{node}</React.Fragment>;
  });

const renderBlocks = (blocks: Block[], limit: number) => {
  const budget = { left: limit };
  const out: React.ReactNode[] = [];

  blocks.forEach((block, bi) => {
    if (budget.left <= 0) return;

    if (block.type === "p") {
      out.push(
        <p key={bi} className="whitespace-pre-line">
          {renderSegs(block.segs, budget)}
        </p>
      );
    } else if (block.type === "h") {
      out.push(
        <p key={bi} className="font-bold">
          {renderSegs(block.segs, budget)}
        </p>
      );
    } else {
      const items = block.items.map((item, ii) =>
        budget.left > 0 ? (
          <li key={ii} className="pl-0.5">
            {renderSegs(item, budget)}
          </li>
        ) : null
      );
      out.push(
        block.type === "ol" ? (
          <ol
            key={bi}
            start={block.start}
            className="list-decimal space-y-1 pl-5 marker:font-semibold marker:text-[#D1560F]"
          >
            {items}
          </ol>
        ) : (
          <ul key={bi} className="list-disc space-y-1 pl-5 marker:text-[#D1560F]">
            {items}
          </ul>
        )
      );
    }
  });

  return out;
};

// What the speech synthesizer should read: no asterisks or hashes, and each
// list item ends with a pause.
const plainTextForSpeech = (raw: string): string =>
  parseBlocks(raw)
    .map((block) => {
      const join = (segs: Seg[]) => segs.map((seg) => seg.text).join("");
      if (block.type === "ul" || block.type === "ol") {
        return block.items
          .map((item) => {
            const t = join(item).trim();
            return /[.!?:;,]$/.test(t) ? t : `${t}.`;
          })
          .join(" ");
      }
      return "segs" in block ? join(block.segs) : "";
    })
    .join("\n");

// Reveals a reply a couple of words at a time, so it reads like the
// companion is saying it rather than a wall of text landing at once. Tap the
// text to skip straight to the end. Older replies (and anyone with reduced
// motion on) show in full immediately.
const SpeechText: React.FC<{
  text: string;
  animate: boolean;
  onProgress?: () => void;
  onDone?: () => void;
}> = ({ text, animate, onProgress, onDone }) => {
  const blocks = useMemo(() => parseBlocks(text), [text]);
  const total = useMemo(
    () => blocks.reduce((n, block) => n + blockTokenCount(block), 0),
    [blocks]
  );
  const [count, setCount] = useState(() =>
    animate && !prefersReducedMotion() ? 0 : total
  );

  useEffect(() => {
    if (count >= total) {
      if (animate) onDone?.();
      return;
    }
    if (!animate) {
      setCount(total);
      return;
    }
    const step = total > 160 ? 4 : 2;
    const id = window.setTimeout(() => {
      setCount((current) => Math.min(total, current + step));
      onProgress?.();
    }, 55);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, total, animate]);

  const isRevealing = animate && count < total;

  return (
    <div
      className="space-y-2"
      onClick={isRevealing ? () => setCount(total) : undefined}
      title={isRevealing ? "Tap to show everything" : undefined}
    >
      {renderBlocks(blocks, count)}
    </div>
  );
};

/* --------------------------------------------------------- suggestions */

// A few tappable starter questions, so someone with wet or masala-covered
// hands can get useful help in one tap instead of typing. Once they're at a
// specific step the questions are about *that moment* in the cook.
const buildSuggestions = (_recipe: Recipe, stepNumber: number | null): string[] => {
  void _recipe; // kept for future recipe-aware personalization
  if (stepNumber !== null) {
    return [
      "How do I know this step is done?",
      "What if I'm missing an ingredient?",
      "Am I on track so far?",
    ];
  }
  return [
    "Any tips before I start?",
    "What can I substitute if I'm missing something?",
    "What goes well with this?",
  ];
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
  const isOpenRef = useRef(false);
  isOpenRef.current = isOpen;

  // ---- companion presence ----
  // Index of the reply currently being "said" (word-by-word reveal).
  const [talkingIndex, setTalkingIndex] = useState<number | null>(null);
  // Rotates the "Hmm, let me think…" lines while a reply is on its way.
  const [phraseIndex, setPhraseIndex] = useState(0);
  // The little "Stuck? Ask me." note next to the launcher, shown briefly.
  const [showNudge, setShowNudge] = useState(true);

  // ---- spoken replies (text-to-speech) ----
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
  const [speakReplies, setSpeakReplies] = useState<boolean>(() => {
    try {
      return localStorage.getItem(VOICE_REPLY_KEY) === "1";
    } catch {
      return false;
    }
  });
  const speakRepliesRef = useRef(speakReplies);
  speakRepliesRef.current = speakReplies;
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  // Bumped on every speak/stop so a cancelled utterance's late `onend`
  // can't clear the state of the one that replaced it.
  const speakTokenRef = useRef(0);

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

  // Tracks whether we've pushed a history entry for the open panel, so a
  // real back-button press and our own close buttons both go through the
  // same path instead of stacking history entries or double-firing.
  const pushedHistoryStateRef = useRef(false);

  const suggestions = useMemo(
    () => (hasRecipe ? buildSuggestions(recipe, currentStepNumber) : []),
    [recipe, hasRecipe, currentStepNumber]
  );

  const hasStep = currentStepNumber !== null;

  const companionMood: Mood = isSending
    ? "thinking"
    : isListening
    ? "listening"
    : talkingIndex !== null || speakingIndex !== null
    ? "talking"
    : "idle";

  /* ------------------------------------------------- spoken replies */

  const stopSpeaking = () => {
    speakTokenRef.current += 1;
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* nothing to cancel */
    }
    setSpeakingIndex(null);
  };

  const speak = (index: number, text: string) => {
    if (!canSpeak) return;
    stopSpeaking();
    const token = speakTokenRef.current;

    const utterance = new SpeechSynthesisUtterance(plainTextForSpeech(text));
    const voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang === "en-IN" || v.lang === "en_IN");
    if (voice) utterance.voice = voice;

    const finish = () => {
      if (speakTokenRef.current === token) setSpeakingIndex(null);
    };
    utterance.onend = finish;
    utterance.onerror = finish;

    setSpeakingIndex(index);
    // Chrome can drop a speak() that lands in the same tick as a cancel().
    window.setTimeout(() => {
      if (speakTokenRef.current !== token) return;
      window.speechSynthesis.speak(utterance);
    }, 60);
  };

  const toggleSpeakReplies = () => {
    const next = !speakReplies;
    setSpeakReplies(next);
    try {
      localStorage.setItem(VOICE_REPLY_KEY, next ? "1" : "0");
    } catch {
      /* ignore storage problems */
    }
    if (!next) stopSpeaking();
  };

  /* ---------------------------------------------------------- effects */

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      /* ignore storage problems */
    }
  }, [messages, storageKey]);

  useEffect(() => {
    const id = window.setTimeout(() => setShowNudge(false), 9000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!isSending) {
      setPhraseIndex(0);
      return;
    }
    const id = window.setInterval(() => setPhraseIndex((i) => i + 1), 2200);
    return () => window.clearInterval(id);
  }, [isSending]);

  useEffect(() => {
    if (isOpen) {
      setShowNudge(false);
      window.setTimeout(() => textareaRef.current?.focus(), PANEL_TRANSITION_MS);
    } else {
      // Reset drag state so the next open starts from a clean slate.
      setHasMounted(false);
      setDragY(0);
      setIsDragging(false);
      dragStartYRef.current = null;
      panelRef.current?.style.removeProperty("--kb-inset");

      // Closing the panel shouldn't leave the companion talking to an
      // empty room, or the mic listening in the background.
      setTalkingIndex(null);
      stopSpeaking();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // While a reply is being revealed, keep the newest words in view — but
  // only if the person hasn't scrolled up to re-read something.
  const followTyping = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 140) {
      el.scrollTop = el.scrollHeight;
    }
  };

  // ---- step strip: "is there more to the right?" ----
  const stepScrollRef = useRef<HTMLDivElement>(null);
  const [stepCanScrollRight, setStepCanScrollRight] = useState(false);
  const [stepCanScrollLeft, setStepCanScrollLeft] = useState(false);

  const updateStepFade = () => {
    const el = stepScrollRef.current;
    if (!el) return;
    setStepCanScrollLeft(el.scrollLeft > 1);
    setStepCanScrollRight(el.scrollWidth - el.scrollLeft - el.clientWidth > 2);
  };

  useEffect(() => {
    if (!isOpen) return;
    const el = stepScrollRef.current;
    if (!el) return;
    el.scrollLeft = 0; // a new step always starts from its first word
    updateStepFade();
    // Listen natively too, so the edge blurs follow every scroll — drag,
    // flick and momentum — without depending on React's synthetic event.
    el.addEventListener("scroll", updateStepFade, { passive: true });
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateStepFade) : null;
    observer?.observe(el);
    return () => {
      el.removeEventListener("scroll", updateStepFade);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentStepNumber, currentStepInstruction]);

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
      if (event.key === "Escape") closeCompanion();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Opening the panel pushes a throwaway history entry. Pressing back then
  // just pops it — popstate fires, and we close the panel instead of the
  // browser navigating away from the page.
  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ __cookingCompanion: true }, "");
      pushedHistoryStateRef.current = true;
    }
  }, [isOpen]);

  useEffect(() => {
    const onPopState = () => {
      if (pushedHistoryStateRef.current) {
        pushedHistoryStateRef.current = false;
        setIsOpen(false);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Single close path for every UI trigger (X button, Escape, drag-to-close).
  // If we own a pushed history entry, go back through it so the entry we
  // added gets cleaned up and popstate does the actual setIsOpen(false).
  // Otherwise (e.g. history got out of sync somehow) just close directly.
  const closeCompanion = () => {
    if (pushedHistoryStateRef.current) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  };

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    // A tap on the minimize button is a tap, not a swipe — let its onClick
    // handle it instead of starting a drag.
    // Element (not HTMLElement): a tap on a button's SVG icon targets an
    // SVGElement, which is not an HTMLElement.
    if (event.target instanceof Element && event.target.closest("button")) {
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
      closeCompanion();
    } else {
      setDragY(0); // wasn't pulled far enough — snap back open
    }
  };

  const sendQuestion = async (question: string) => {
    if (!question || isSending) return;

    // Don't talk over the person's next question.
    stopSpeaking();

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
      // history + the question just added + this reply
      const replyIndex = historyForRequest.length + 1;
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
      setLastQuestion(null);
      if (isOpenRef.current) {
        setTalkingIndex(replyIndex);
        if (speakRepliesRef.current) speak(replyIndex, reply);
      }
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

  // Abort any live recognition session (and any spoken reply) if the whole
  // component ever unmounts.
  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        /* already stopped */
      }
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* nothing to cancel */
      }
    };
  }, []);

  const startVoiceRecording = async () => {
    if (isListeningRef.current) return;

    // The person is about to talk — stop talking first so the mic doesn't
    // pick up the companion's own voice.
    stopSpeaking();

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
      {/* Reachable from any scroll position. The companion peeks out with a
          short note the first time, then settles into just its face. */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Ask your Cooking Companion"
          className="group fixed bottom-5 right-5 z-[60] flex items-end gap-2 focus:outline-none sm:bottom-6 sm:right-6"
        >
          {showNudge && messages.length === 0 && (
            <span
              aria-hidden="true"
              className="companion-nudge mb-3 rounded-2xl rounded-br-sm bg-white px-3.5 py-2 text-sm font-semibold text-[#2B1A0C] shadow-lg shadow-black/15 ring-1 ring-[#EAD9AE]"
            >
              Stuck? Ask me.
            </span>
          )}
          <span className="companion-orb flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:-translate-y-0.5 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-[#FC6C26]">
            <CompanionCharacter className="companion-bob h-10 w-10" />
          </span>
        </button>
      )}

      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Cooking companion"
          onAnimationEnd={() => setHasMounted(true)}
          className={`${hasMounted ? "" : "companion-panel-enter"} fixed inset-x-0 bottom-[var(--kb-inset,0px)] z-[70] flex h-[75dvh] w-full flex-col rounded-t-3xl border border-[#EAD9AE] bg-[#FFFEFA] shadow-2xl sm:inset-x-auto sm:bottom-[calc(1.5rem+var(--kb-inset,0px))] sm:right-6 sm:h-[min(560px,80dvh)] sm:w-96 sm:rounded-3xl`}
          style={{
            transform: `translateY(${dragY}px)`,
            transition: isDragging ? "none" : "transform 0.2s ease",
            opacity: 1 - Math.min(dragY / 400, 0.5),
          }}
        >
          {/* Companion header: the face is the focus. It changes with what the
              companion is doing, and the strip underneath shows where you are
              in the recipe so it feels like it's cooking alongside you. */}
          <div className="rounded-t-3xl bg-[#F8F3E8]">
            {/* Drag handle — starts a close-drag, like the header below.
                Deliberately outside the scrollable message list. */}
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
              className="touch-none"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <div className="flex items-center justify-between gap-3 px-5 pb-2 pt-0.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <CompanionCharacter mood={companionMood} className="h-10 w-10 shrink-0" />
                  <p className="truncate text-[15px] font-bold leading-tight text-[#2B1A0C]">
                    Cooking Companion
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  {canSpeak && (
                    <button
                      type="button"
                      onClick={toggleSpeakReplies}
                      aria-pressed={speakReplies}
                      aria-label="Read replies aloud"
                      title={speakReplies ? "Replies are read aloud" : "Read replies aloud"}
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26] ${
                        speakReplies
                          ? "bg-[#FC6C26] text-white"
                          : "bg-white/70 text-[#6B5238] ring-1 ring-[#EAD9AE] hover:bg-white"
                      }`}
                    >
                      <SpeakerIcon on={speakReplies} className="h-[18px] w-[18px]" />
                    </button>
                  )}
                                    <button
                    type="button"
                    onClick={closeCompanion}
                    aria-label="Back to cooking"
                    title="Back to cooking"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B5238] transition-colors hover:bg-[#EDE4CF] hover:text-[#2B1A0C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26]"
                  >
                    <ChatIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Step strip. Deliberately NOT inside the drag area above: that
                area uses touch-action: none, which would block horizontal
                touch scrolling here. The text scrolls sideways (no
                scrollbar) and a soft blur on the right edge hints there's
                more. */}
            <div className="flex items-center gap-2 border-b border-[#EAD9AE] px-5 pb-2.5">
              {hasStep && (
                <span className="shrink-0 rounded-full bg-[#FC6C26] px-2.5 py-0.5 text-[11px] font-bold text-white">
                  Step {currentStepNumber}
                  {totalSteps ? `/${totalSteps}` : ""}
                </span>
              )}
              <div className="relative min-w-0 flex-1">
                <div
                  ref={stepScrollRef}
                  className="companion-hscroll overflow-x-auto whitespace-nowrap text-xs leading-6 text-[#6B5238]"
                >
                  {hasStep
                    ? currentStepInstruction || recipe.dishName
                    : `Cooking ${recipe.dishName}`}
                </div>
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 left-0 w-12 backdrop-blur-[2px] transition-opacity duration-200 ${
                    stepCanScrollLeft ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(to right, #F8F3E8 0%, rgba(248,243,232,0.6) 55%, rgba(248,243,232,0) 100%)",
                    maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 right-0 w-12 backdrop-blur-[2px] transition-opacity duration-200 ${
                    stepCanScrollRight ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(to left, #F8F3E8 0%, rgba(248,243,232,0.6) 55%, rgba(248,243,232,0) 100%)",
                    maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            {/* Hints that there's more chat scrolled above — fades and
                softly blurs the top edge of the list, ChatGPT-style. */}
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
              className="h-full space-y-4 overflow-y-auto overscroll-y-contain px-5 pb-28 pt-4"
            >
              {/* The companion speaks first. */}
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="message-bubble-in w-fit max-w-[92%] rounded-2xl companion-card rounded-tl-md px-4 py-3 text-[15px] leading-relaxed text-[#2B1A0C]">
                    Hi, I'm right here with you. Making {recipe.dishName}? Ask me
                    about swaps, timing, or whether something looks right. You can
                    also tap the mic and just talk, so your hands can stay busy.
                  </div>
                  {suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((question) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() => handleSuggestion(question)}
                          className="rounded-full border border-[#EAD9AE] bg-white px-3.5 py-2 text-left text-[13px] leading-snug text-[#5A2E12] transition-colors hover:border-[#FC6C26] hover:bg-[#F8F3E7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26]"
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
                  <div key={index} className="message-bubble-in w-fit max-w-[92%]">
                    <div className="rounded-2xl companion-card rounded-tl-md px-4 py-3 text-[15px] leading-relaxed text-[#2B1A0C]">
                      <SpeechText
                        text={message.content}
                        animate={talkingIndex === index}
                        onProgress={followTyping}
                        onDone={() =>
                          setTalkingIndex((current) => (current === index ? null : current))
                        }
                      />
                    </div>
                    {canSpeak && (
                      <button
                        type="button"
                        onClick={() =>
                          speakingIndex === index
                            ? stopSpeaking()
                            : speak(index, message.content)
                        }
                        className="mt-1.5 ml-1 inline-flex items-center gap-1.5 rounded-full py-1 pr-2 text-xs font-semibold text-[#B24A12] transition-colors hover:text-[#8F3A0D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26]"
                      >
                        <SpeakerIcon on className="h-3.5 w-3.5" />
                        {speakingIndex === index ? "Stop" : "Hear it"}
                      </button>
                    )}
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

              {isSending && (
                <div
                  className="message-bubble-in w-fit rounded-2xl companion-card rounded-tl-md px-4 py-2.5 text-sm italic text-[#8A6B4A]"
                  role="status"
                >
                  <span className="companion-pulse">
                    {THINKING_PHRASES[phraseIndex % THINKING_PHRASES.length]}
                  </span>
                </div>
              )}

              {error && (
                <div className="message-bubble-in w-fit max-w-[92%] rounded-2xl companion-card rounded-tl-md px-4 py-3 text-[15px] leading-relaxed text-[#2B1A0C]">
                  <p>{error}</p>
                  {lastQuestion && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="mt-2.5 inline-flex rounded-full bg-[#FC6C26] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#D1560F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26] focus-visible:ring-offset-2"
                    >
                      Ask again
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* The whole input area is ONE absolutely-positioned overlay,
                the sole other child of this `relative` container besides
                the scrollable messages. Because it's `absolute`, it never
                occupies space in the flex layout — so when it grows taller
                (e.g. the voice-recording button stack appears), it simply
                overlaps more of the chat above it instead of pushing or
                reserving its own row. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pt-10 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {/* Background layer: blur + tint + fade live here, behind the
                  controls, so the mask never fades the buttons themselves. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(to top, #FFFEFAf2 0px, #FFFEFAf2 calc(100% - 40px), rgba(255,254,250,0) 100%)",
                  maskImage:
                    "linear-gradient(to top, black 0px, black calc(100% - 40px), transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to top, black 0px, black calc(100% - 40px), transparent 100%)",
                }}
              />

              <div className="pointer-events-auto flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me your doubts while cooking..."
                  rows={1}
                  maxLength={MAX_INPUT_CHARS}
                  className="companion-textarea max-h-24 flex-1 resize-none overflow-y-auto rounded-xl border border-[#EAD9AE] bg-white px-3.5 py-2.5 text-sm text-[#2B1A0C] placeholder:text-[#B8A98C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6C26]"
                />

                <div className={`relative h-10 shrink-0 ${isListening ? "w-12" : "w-10"}`}>
                  {!isListening && (
                    <button
                      ref={micButtonRef}
                      type="button"
                      onClick={() => (input.trim() ? handleSend() : startVoiceRecording())}
                      disabled={isSending}
                      aria-label={input.trim() ? "Send" : "Start voice recording"}
                      className="companion-action-btn relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#FC6C26] text-white transition-colors hover:bg-[#D1560F] disabled:cursor-not-allowed disabled:opacity-40"
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

                  {isListening && (
                    <div className="companion-voice-controls absolute right-0 bottom-0 z-20 flex flex-col gap-1.5 rounded-2xl border border-[#EAD9AE] bg-white/95 p-1.5 shadow-lg">
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
              </div>

              {isListening && (
                <div
                  className="pointer-events-auto mt-2.5 flex items-center justify-center gap-2 text-xs font-semibold"
                  style={{ color: "#D1560F" }}
                >
                  <span className="companion-recording-dot h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#E5484D" }} />
                  Listening...
                </div>
              )}
            </div>
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

        /* Off-white "raised" card for the companion's speech: a soft sheen,
           a thin warm edge, and a small bottom lip + shadow so it sits just
           above the page instead of lying flat. */
        .companion-card {
          background: linear-gradient(180deg, #FFFFFF 0%, #F8F3E7 100%);
          border: 1px solid #E9DFC9;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            0 2px 0 #E7DCC4,
            0 8px 14px -8px rgba(90, 60, 20, 0.28);
        }

        /* The floating launcher circle: same off-white raised look as the
           companion's cards, with a slightly deeper lift since it floats. */
        .companion-orb {
          background: linear-gradient(180deg, #FFFFFF 0%, #F8F3E7 100%);
          border: 1px solid #E9DFC9;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            0 3px 0 #E7DCC4,
            0 10px 18px -6px rgba(90, 60, 20, 0.4);
        }

        .companion-hscroll {
          scrollbar-width: none; /* Firefox */
        }
        .companion-hscroll::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }

        /* A message's one-time arrival, not a repeating effect. Because
           messages are keyed by index and only ever appended, existing
           messages never remount and never replay this — only a genuinely
           new one does. */
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

        /* Mouth opens and closes while the companion is talking. */
        .companion-talk {
          transform-box: fill-box;
          transform-origin: center;
          animation: companion-talk 0.32s ease-in-out infinite;
        }
        @keyframes companion-talk {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.35); }
        }

        /* Sound arcs beside the head while it's listening. */
        .companion-hear-1 {
          animation: companion-hear 1.1s ease-in-out infinite;
        }
        .companion-hear-2 {
          animation: companion-hear 1.1s ease-in-out 0.25s infinite;
        }
        @keyframes companion-hear {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }

        /* Gentle idle bob on the launcher face. */
        .companion-bob {
          animation: companion-bob 3.2s ease-in-out infinite;
        }
        @keyframes companion-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        .companion-nudge {
          animation: companion-nudge-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes companion-nudge-in {
          from { opacity: 0; transform: translateX(8px) scale(0.96); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }

        .companion-pulse {
          animation: companion-pulse 1.4s ease-in-out infinite;
        }
        @keyframes companion-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
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
          .companion-talk,
          .companion-hear-1,
          .companion-hear-2,
          .companion-bob,
          .companion-nudge,
          .companion-pulse,
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