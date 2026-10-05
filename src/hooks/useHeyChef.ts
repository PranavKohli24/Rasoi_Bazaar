import { useEffect, useRef, useState } from "react";

export type HeyChefPhase =
  | "off"
  | "paused" // chat sheet is open, or another mic user has the floor
  | "sleeping" // listening, only reacting to "hey chef"
  | "awake" // heard the wake word, waiting for a command/question
  | "processing" // waiting for the AI
  | "speaking"; // saying something, mic deliberately off

type InnerPhase = "sleeping" | "awake" | "processing" | "speaking";

export interface HeyChefCommands {
  next: () => string | void | false;
  back: () => string | void | false;
  repeat: () => string | void | false;
  yesDone: () => string | void | false;
  notYet: () => string | void | false;
  pauseTimer: () => string | void | false;
  resumeTimer: () => string | void | false;
  addTime: () => string | void | false;
  subtractTime: () => string | void | false;
  timeLeft: () => string | void | false;
}

export type CommandName = keyof HeyChefCommands;

export interface UseHeyChefOptions {
  /** Master switch: toggle is on AND the person is cooking. */
  enabled: boolean;
  /** Mic is handed to someone else (e.g. chat sheet open). */
  suspended?: boolean;
  /** A "done with this step?" confirmation is showing: bare "yes done" works. */
  awaitingConfirm?: boolean;
  commands: HeyChefCommands;
  /** Called with the spoken question; returns text to speak, or null on failure. */
  onQuestion: (question: string) => Promise<string | null>;
  lang?: string;
  stepNumber?: number | null;
}

/* ------------------------------------------------------------ constants */

const SILENCE_MS = 1100; // no new words for this long = finished talking
const FINAL_GRACE_MS = 350;
const AWAKE_IDLE_MS = 10000;
const TAIL_MS = 450; // keep the mic off this long after speech ends
const COMMAND_HOLD_MS = 700; // mic off while the UI starts reading the next step
const MAX_SPEAKING_MS = 60000; // stuck-speechSynthesis safety valve
const FILLER_DELAY_MS = 900;
const FILLER_SKIP_CHANCE = 0.25;
const FILLERS = ["Hmm, one sec.", "Let me check.", "Good question.", "Let me think."];
const WAKE_GREETINGS = [
  "Hey, how can I help you in your tasty journey?",
  "Hi there, what do you need?",
  "Yes chef, I'm listening.",
  "I'm here — what's up?",
];

// Speech engines mishear short phrases, so match loosely.
const CHEF_WORDS = ["chef", "chefs", "shef", "chaf", "shaf", "chief", "cheff", "sheff", "chev", "shep", "chep", "chaff", "shaft", "sheaf", "jeff"];
const WAKE = new RegExp(
  `\\b(?:hey|hay|hi|hello|okay|ok|ay|hei|heyy)\\s*(?:${CHEF_WORDS.join("|")})\\b`
);

const COMMAND_PATTERNS: [CommandName, RegExp][] = [
  ["yesDone", /^(?:yes\s+)?(?:(?:i\s+am|i'?m)\s+)?(?:done|finished)$/],
  ["notYet", /^(?:not yet|wait|hold on|hold up|one second|give me a minute)$/],
  [
    "next",
    /^(?:go\s+)?(?:to\s+)?next(?:\s+(?:step|one))?$|^(?:continue|go on|move on)$/,
  ],
  [
    "back",
    /^(?:go\s+)?(?:back|previous)(?:\s+(?:step|one))?$|^back\s+(?:a\s+)?step$/,
  ],
  [
    "repeat",
    /^(?:repeat|again|say\s+(?:that\s+)?again|read\s+(?:that\s+|it\s+|this\s+)?again|repeat\s+(?:that|it|this|the\s+step))$|^what\s+was\s+that$/,
  ],
  ["pauseTimer", /^(?:pause|stop|hold)(?:\s+the)?\s+(?:timer|time)$/],
  ["resumeTimer", /^(?:resume|continue|restart|unpause|start)(?:\s+the)?\s+(?:timer|time)$/],
  [
    "addTime",
    /^add\s+(?:30\s+seconds|thirty\s+seconds|more\s+time|some\s+time)(?:\s+to\s+(?:the\s+)?timer)?$|^(?:give\s+me\s+)?(?:30\s+more\s+seconds|more\s+time)$/,
  ],
  [
    "subtractTime",
    /^(?:subtract|remove|take\s+off)\s+(?:30\s+seconds|thirty\s+seconds|some\s+time)(?:\s+from\s+(?:the\s+)?timer)?$|^less\s+time$/,
  ],
  [
    "timeLeft",
    /^how\s+(?:much\s+)?time(?:'s|\s+is)?\s+left$|^how\s+long(?:'s|\s+is)?\s+left$|^how\s+much\s+time\s+(?:do\s+i\s+have|remains|is\s+remaining)$/,
  ],
];

// Commands that work WITHOUT "hey chef". Deliberately narrow: the whole phrase
// must be the command, so normal talking in the kitchen doesn't trigger them.
// Add/subtract time stay wake-word only: they're rare and easy to mishear.
const BARE_PATTERNS: [CommandName, RegExp][] = [
  ["next", /^(?:go\s+)?(?:to\s+)?next(?:\s+step)?$/],
  ["back", /^(?:go\s+)?(?:back|previous)(?:\s+step)?$|^back\s+(?:a\s+)?step$/],
  ["repeat", /^(?:repeat|repeat\s+(?:that|it|the\s+step)|say\s+that\s+again)$/],
  ["pauseTimer", /^(?:pause|stop|hold)(?:\s+the)?\s+(?:timer|time)$/],
  ["resumeTimer", /^(?:resume|restart|unpause|start)(?:\s+the)?\s+(?:timer|time)$/],
  ["timeLeft", /^how\s+(?:much\s+)?time(?:'s|\s+is)?\s+left$|^how\s+long(?:'s|\s+is)?\s+left$/],
];
/* -------------------------------------------------------------- helpers */

const getCtor = (): any =>
  typeof window === "undefined"
    ? null
    : (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      null;

export const isHeyChefSupported = (): boolean =>
  !!getCtor() && typeof window !== "undefined" && "speechSynthesis" in window;

// lowercase, strip punctuation (keeps apostrophes), collapse spaces
const norm = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^\p{L}\p{N}'\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const cleanForCommand = (t: string) =>
  t
    .replace(/^(?:(?:okay|ok|so|um|uh|please|can you|could you|just)\s+)+/, "")
    .replace(/\s+(?:please|now|chef)$/, "")
    .trim();

const matchCommand = (text: string): CommandName | null => {
  const cleaned = cleanForCommand(text);
  for (const [name, pattern] of COMMAND_PATTERNS) {
    if (pattern.test(cleaned)) return name;
  }
  return null;
};

const matchBareCommand = (text: string): CommandName | null => {
  const cleaned = cleanForCommand(text);
  for (const [name, pattern] of BARE_PATTERNS) {
    if (pattern.test(cleaned)) return name;
  }
  return null;
};

// Words a finished question rarely ends on: if we hear one, the person is
// probably still thinking, so wait longer. (Prepositions like "for" and "in"
// are left out: "what is it for?" is a complete question.)
const INCOMPLETE_TAIL =
  /\b(?:and|but|or|so|because|if|when|then|um|uh|umm|uhh|like|with|to|the|a|an|of|my|is|are|do|does|can|should|i|how|what|which)$/;

// How long to wait for more words before treating the question as finished.
const endDelay = (question: string, isFinal: boolean): number => {
  if (matchCommand(question)) return isFinal ? 200 : 600; // "next", "repeat"...
  if (INCOMPLETE_TAIL.test(question)) return isFinal ? 1200 : 2200;
  return isFinal ? FINAL_GRACE_MS : SILENCE_MS;
};

// A short "I heard you" ping + buzz. Fails silently if audio is blocked.
const ping = () => {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 988;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
    window.setTimeout(() => ctx.close().catch(() => {}), 400);
  } catch {
    /* audio unavailable */
  }
  try {
    navigator.vibrate?.(25);
  } catch {
    /* no vibration */
  }
};

const softCue = () => {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 523;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
    window.setTimeout(() => ctx.close().catch(() => {}), 300);
  } catch {
    /* audio unavailable */
  }
};

// A tiny "got it" tick, higher and shorter than softCue.
const tick = () => {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 784;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
    window.setTimeout(() => ctx.close().catch(() => {}), 250);
  } catch {
    /* audio unavailable */
  }
};
type Seg = { text: string; isFinal: boolean };

/* ----------------------------------------------------------------- hook */

export function useHeyChef({
  enabled,
  suspended = false,
  awaitingConfirm = false,
  commands,
  onQuestion,
  lang = "en-IN",
  stepNumber = null,
}: UseHeyChefOptions) {
  const supported = isHeyChefSupported();

  const [phase, setPhaseState] = useState<InnerPhase>("sleeping");
  const [liveText, setLiveText] = useState("");
  const [micBlocked, setMicBlocked] = useState(false);
  const [ttsBusy, setTtsBusy] = useState(false);
  const [micLive, setMicLive] = useState(false);

    const [lastCommand, setLastCommand] = useState<{ name: CommandName; id: number } | null>(null);

  // Always-fresh copies of the inputs, so long-lived speech callbacks never go stale.
  const commandsRef = useRef(commands);
  commandsRef.current = commands;
  const onQuestionRef = useRef(onQuestion);
  onQuestionRef.current = onQuestion;
  const awaitingConfirmRef = useRef(awaitingConfirm);
  awaitingConfirmRef.current = awaitingConfirm;
  const langRef = useRef(lang);
  langRef.current = lang;
  const stepRef = useRef<number | null>(stepNumber);
  stepRef.current = stepNumber;
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;

  const phaseRef = useRef<InnerPhase>("sleeping");
  const recRef = useRef<any>(null);
  const restartTimerRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const segmentsRef = useRef<Seg[]>([]);
  const ignoreBeforeRef = useRef(0); // segments before this index are already handled
  const anchorRef = useRef(0); // first segment that belongs to the current question
  const errorStreakRef = useRef(0);
  const holdUntilRef = useRef(0);
  const lastSpokeRef = useRef(0);
  const speakingSinceRef = useRef(0);
  const speakTokenRef = useRef(0);
    const fillerTimerRef = useRef<number | null>(null);
  const fillerDoneRef = useRef<Promise<void> | null>(null);
  const lastFillerRef = useRef("");
  const lastGreetingRef = useRef("");

  /* ---- small state helpers ---- */

  const currentPhase = (): InnerPhase => phaseRef.current;

  const setPhase = (next: InnerPhase) => {
    phaseRef.current = next;
    setPhaseState(next);
    if (next !== "awake") setLiveText("");
  };

  const clearTimers = () => {
    for (const ref of [silenceTimerRef, idleTimerRef, fillerTimerRef]) {
      if (ref.current !== null) {
        window.clearTimeout(ref.current);
        ref.current = null;
      }
    }
  };

  const sleep = () => {
    clearTimers();
    ignoreBeforeRef.current = segmentsRef.current.length;
    setPhase("sleeping");
  };

  const armIdle = () => {
    if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => {
      if (phaseRef.current === "awake") sleep();
    }, AWAKE_IDLE_MS);
  };

  const scheduleFinish = (ms: number) => {
    if (silenceTimerRef.current !== null) window.clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = window.setTimeout(() => void finishQuestion(), ms);
  };

  // Everything said since the wake word, with the wake phrase itself removed.
  const questionText = () => {
    const joined = norm(
      segmentsRef.current
        .slice(anchorRef.current)
        .map((s) => s.text)
        .join(" ")
    );
    const m = WAKE.exec(joined);
    return (m ? joined.slice(m.index + m[0].length) : joined).trim();
  };

  /* ---- speaking ---- */

  const say = (text: string, then: "sleeping" | "awake") =>
    new Promise<void>((resolve) => {
      const synth = window.speechSynthesis;
      clearTimers();
      const token = ++speakTokenRef.current;
      setPhase("speaking");
      holdUntilRef.current = Date.now() + 250;

            const parts = text.split("||").map((p) => p.trim()).filter(Boolean);
      const voice = synth
        .getVoices()
        .find((v) => v.lang === "en-IN" || v.lang === "en_IN");

      let finished = false;
      let safety = 0;
      const finish = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(safety);
        // Only move on if nothing newer took over (reset, newer say, etc.)
        if (speakTokenRef.current === token && phaseRef.current === "speaking") {
          if (then === "awake" && !suspendedRef.current) {
            anchorRef.current = segmentsRef.current.length;
            ignoreBeforeRef.current = segmentsRef.current.length;
            setPhase("awake");
            armIdle();
          } else {
            sleep();
          }
        }
        resolve();
      };
            // Each part is its own utterance, with a 1 second pause between them.
      const speakPart = (i: number) => {
        if (speakTokenRef.current !== token) return finish();
        const utterance = new SpeechSynthesisUtterance(parts[i]);
        utterance.lang = langRef.current;
        utterance.rate = 0.97;
        if (voice) utterance.voice = voice;
        const isLast = i === parts.length - 1;
        utterance.onend = isLast ? finish : () => window.setTimeout(() => speakPart(i + 1), 1000);
        utterance.onerror = finish;
        synth.speak(utterance);
      };

      // onend sometimes never fires (some Android browsers): don't stay deaf forever.
      safety = window.setTimeout(() => {
        try {
          synth.cancel();
        } catch {
          /* nothing to cancel */
        }
        finish();
    }, Math.max(4000, text.length * 100 + 3000 + parts.length * 1000));

      try {
        synth.cancel();
      } catch {
        /* nothing to cancel */
      }
      // Chrome can drop a speak() that lands in the same tick as a cancel().
      window.setTimeout(() => {
                if (speakTokenRef.current !== token) return finish();
        speakPart(0);
      }, 60);
    });

  const pickFiller = () => {
    const step = stepRef.current;
    const pool = step ? [...FILLERS, `Checking step ${step}.`] : FILLERS;
    let pick = pool[0];
    do {
      pick = pool[Math.floor(Math.random() * pool.length)];
    } while (pick === lastFillerRef.current && pool.length > 1);
    lastFillerRef.current = pick;
    return pick;
  };

  const pickGreeting = () => {
    let pick = WAKE_GREETINGS[0];
    do {
      pick = WAKE_GREETINGS[Math.floor(Math.random() * WAKE_GREETINGS.length)];
    } while (pick === lastGreetingRef.current && WAKE_GREETINGS.length > 1);
    lastGreetingRef.current = pick;
    return pick;
  };

  const speakFiller = (text: string) =>
    new Promise<void>((resolve) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langRef.current;
      const voice = synth.getVoices().find((v) => v.lang === "en-IN" || v.lang === "en_IN");
      if (voice) utterance.voice = voice;
      let done = false;
      let safety = 0;
      const finish = () => {
        if (done) return;
        done = true;
        window.clearTimeout(safety);
        resolve();
      };
      utterance.onend = finish;
      utterance.onerror = finish;
      safety = window.setTimeout(() => {
        try {
          synth.cancel();
        } catch {
          /* nothing to cancel */
        }
        finish();
      }, 3000);
      try {
        synth.speak(utterance);
      } catch {
        finish();
      }
    });

  const startFillerTimer = () => {
    if (Math.random() < FILLER_SKIP_CHANCE) return;
    fillerTimerRef.current = window.setTimeout(() => {
      fillerTimerRef.current = null;
      if (phaseRef.current !== "processing") return;
      fillerDoneRef.current = speakFiller(pickFiller());
    }, FILLER_DELAY_MS);
  };

  /* ---- the flow ---- */

    const runCommand = (name: CommandName) => {
    clearTimers();
    ignoreBeforeRef.current = segmentsRef.current.length;
    let message: string | void | false = undefined;
    try {
      message = commandsRef.current[name]();
    } catch (error) {
      console.warn("Hey chef command failed:", error);
    }

    if (message === false) {
      // Heard and understood, but nothing actually happened yet — e.g. "next"
      // on a timed step just opened the done/not-yet confirmation instead of
      // advancing. No tick, no flash claiming a step change that didn't
      // happen; the confirmation prompt (spoken + on-screen) speaks for itself.
      holdUntilRef.current = Date.now() + COMMAND_HOLD_MS;
      sleep();
      return;
    }

    tick();
    setLastCommand({ name, id: Date.now() });

    if (typeof message === "string" && message) {
      void say(message, "sleeping");
    } else {
      // The UI usually starts reading the next step right after a command;
      // keep the mic off until that has begun.
      holdUntilRef.current = Date.now() + COMMAND_HOLD_MS;
      sleep();
    }
  };

  const finishQuestion = async () => {
    clearTimers();
    if (phaseRef.current !== "awake") return;

    const question = questionText();
    if (!question) {
      sleep();
      return;
    }

    const command = matchCommand(question);
    if (command) {
      runCommand(command);
      return;
    }

        ignoreBeforeRef.current = segmentsRef.current.length;
    setPhase("processing");
    softCue();
    startFillerTimer();

        let reply: string | null = null;
    let timeoutId = 0;
    try {
      reply = await Promise.race([
        onQuestionRef.current(question),
        new Promise<null>((resolve) => {
          timeoutId = window.setTimeout(() => resolve(null), REPLY_TIMEOUT_MS);
        }),
      ]);
    } catch {
      reply = null;
    }
    window.clearTimeout(timeoutId);
    if (fillerTimerRef.current !== null) {
      window.clearTimeout(fillerTimerRef.current);
      fillerTimerRef.current = null;
    }
    const filler = fillerDoneRef.current;
    fillerDoneRef.current = null;
    if (filler) await filler;
    // If the toggle was turned off / the sheet opened meanwhile, drop the spoken reply.
    if (currentPhase() !== "processing") return;
    await say(reply || "Sorry, I couldn't get that. Try again?", "awake");
  };

  const REPLY_TIMEOUT_MS = 40000; // give the AI time; a late answer beats "sorry"

      const wake = (segmentIndex: number) => {
    anchorRef.current = segmentIndex;
    ping();
    setPhase("awake");

    const question = questionText();
    setLiveText(question);
    if (question) {
      const last = segmentsRef.current[segmentsRef.current.length - 1];
      scheduleFinish(endDelay(question, !!last?.isFinal));
    } else {
      void say(pickGreeting(), "awake");
    }
  };

  // Interrupting the companion mid-sentence: stop whatever it's saying and
  // start listening fresh, exactly like a normal wake-up. Bumping
  // speakTokenRef first means the utterance being cut off can't complete
  // its own phase transition once synth.cancel() fires its (async) onerror.
  const bargeIn = (segmentIndex: number) => {
    speakTokenRef.current += 1;
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* nothing to cancel */
    }
    clearTimers();
    wake(segmentIndex);
  };

  const handleResult = (event: any) => {
    errorStreakRef.current = 0;

    const segs: Seg[] = [];
        for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i];
      // If the top guess missed the wake phrase but another guess has it, use that one.
      let text: string = result[0].transcript;
      if (!WAKE.test(norm(text))) {
        for (let a = 1; a < result.length; a++) {
          if (WAKE.test(norm(result[a].transcript))) {
            text = result[a].transcript;
            break;
          }
        }
      }
      segs.push({ text, isFinal: result.isFinal });
    }
    segmentsRef.current = segs;

        const current = phaseRef.current;
    if (current === "processing") return; // deaf on purpose — nothing to barge into yet

    if (current === "speaking") {
      // Barge-in: while the companion is talking, the only thing worth
      // reacting to is the wake word — anything else is either kitchen
      // noise or part of what it's currently saying.
      for (let i = ignoreBeforeRef.current; i < segs.length; i++) {
        if (WAKE.test(norm(segs[i].text))) {
          bargeIn(i);
          return;
        }
      }
      return;
    }

    if (current === "sleeping") {
      for (let i = ignoreBeforeRef.current; i < segs.length; i++) {
        const text = norm(segs[i].text);
        if (WAKE.test(text)) {
          wake(i);
          return;
        }
                if (awaitingConfirmRef.current) {
          const command = matchCommand(text);
          if (command === "yesDone" || command === "notYet") {
            runCommand(command);
            return;
          }
        }
        // Bare "next" / "back" / "repeat": only once the engine has finished the phrase.
        if (segs[i].isFinal) {
          const bare = matchBareCommand(text);
          if (bare) {
            runCommand(bare);
            return;
          }
        }
      }
      return;
    }

    // awake: collect the question, and decide when the person has finished
    const question = questionText();
    setLiveText(question);
    if (!question) return;
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    scheduleFinish(endDelay(question, segs[segs.length - 1].isFinal));
  };

  /* ---- recognition lifecycle ---- */

    const stopRecognition = () => {
    const rec = recRef.current;
    recRef.current = null;
    if (restartTimerRef.current !== null) {
      window.clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (rec) {
      rec.onstart = rec.onresult = rec.onerror = rec.onend = null;
      try {
        rec.abort();
      } catch {
        /* already stopped */
      }
    }
  };

  const startRecognition = () => {
    if (recRef.current) return;
    const Ctor = getCtor();
    if (!Ctor) return;

    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 3;
    rec.lang = langRef.current;

    rec.onstart = () => {
      setMicLive(true);
      // A fresh session has a fresh transcript.
      segmentsRef.current = [];
      ignoreBeforeRef.current = 0;
      anchorRef.current = 0;
    };
    rec.onresult = handleResult;
    rec.onerror = (event: any) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setMicBlocked(true);
        stopRecognition();
        return;
      }
      // "no-speech" and "aborted" are normal; anything else backs off the restart.
      if (event.error !== "no-speech" && event.error !== "aborted") {
        errorStreakRef.current += 1;
      }
    };
    rec.onend = () => {
      if (recRef.current !== rec) return; // we stopped it on purpose
      // Chrome ends continuous sessions after silence: quietly start again.
            const delay = Math.min(150 * 2 ** errorStreakRef.current, 2000);
      restartTimerRef.current = window.setTimeout(() => {
        restartTimerRef.current = null;
        if (recRef.current !== rec) return;
        try {
          rec.start();
        } catch {
          // couldn't restart: throw this recognizer away and build a fresh one
          stopRecognition();
          startRecognition();
        }
      }, delay);
    };

    recRef.current = rec;
    try {
      rec.start();
    } catch (error) {
      console.warn("Hey chef could not start listening:", error);
      stopRecognition();
      restartTimerRef.current = window.setTimeout(() => {
        restartTimerRef.current = null;
        startRecognition();
      }, 500);
    }
  };

  /* ---- effects ---- */
  // Normally the mic is off while anything on the page is talking (ttsBusy
  // covers step read-aloud, timers, this hook's own replies). The one
  // exception is the companion's own voice: while IT is speaking, the mic
  // stays on so "hey chef" can interrupt it — handleResult (below) stays
  // deaf to everything except the wake word during that phase, so this
  // doesn't open the door to stray commands mid-sentence.
  const shouldListen =
    enabled && supported && !suspended && !micBlocked && (!ttsBusy || phase === "speaking");
  useEffect(() => {
    if (shouldListen) startRecognition();
    else stopRecognition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldListen]);

  useEffect(
    () => () => {
      stopRecognition();
      clearTimers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

    // Turned off: drop whatever was in flight. Suspended (chat open): only hand
  // over the mic, and let a reply that is already speaking or on its way finish.
  useEffect(() => {
    if (enabled && supported && !suspended) return;

    if (enabled && supported && suspended) {
      const p = phaseRef.current;
      // say() sees suspendedRef and goes to sleep once the speech ends.
      if (p === "speaking" || p === "processing") return;
      // Sleeping / awake: drop any half-captured question.
      clearTimers();
      segmentsRef.current = [];
      ignoreBeforeRef.current = 0;
      setPhase("sleeping");
      return;
    }

    // Toggle off (or unsupported): full reset.
    clearTimers();
    fillerDoneRef.current = null;
    if (phaseRef.current === "speaking" || phaseRef.current === "processing") {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* nothing to cancel */
      }
    }
    speakTokenRef.current += 1;
    segmentsRef.current = [];
    ignoreBeforeRef.current = 0;
    setPhase("sleeping");
    if (!enabled) {
      setMicBlocked(false);
      setMicLive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, suspended, supported]);

  // Watches ALL speech on the page (step reading, timer announcements, our own
  // replies), so the mic is deaf during any of it plus a short tail.
  useEffect(() => {
    if (!enabled || !supported) {
      setTtsBusy(false);
      return;
    }
    const id = window.setInterval(() => {
      const synth = window.speechSynthesis;
      const now = Date.now();
      const speaking = !!synth && (synth.speaking || synth.pending);

      if (speaking) {
        lastSpokeRef.current = now;
        if (!speakingSinceRef.current) speakingSinceRef.current = now;
        if (now - speakingSinceRef.current > MAX_SPEAKING_MS) {
          try {
            synth.cancel(); // stuck flag: unstick it
          } catch {
            /* ignore */
          }
          speakingSinceRef.current = 0;
        }
      } else {
        speakingSinceRef.current = 0;
      }

      const busy =
        speaking || now - lastSpokeRef.current < TAIL_MS || now < holdUntilRef.current;
      setTtsBusy((prev) => (prev === busy ? prev : busy));
    }, 100);
    return () => window.clearInterval(id);
  }, [enabled, supported]);

  const publicPhase: HeyChefPhase =
    !enabled || !supported
      ? "off"
      : suspended && phase !== "speaking" && phase !== "processing"
      ? "paused"
      : !micLive
      ? "off"
      : phase;

      return { supported, phase: publicPhase, liveText, micBlocked, lastCommand };
}