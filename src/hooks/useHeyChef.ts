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
  next: () => string | void;
  back: () => string | void;
  repeat: () => string | void;
  yesDone: () => string | void;
  notYet: () => string | void;
}
type CommandName = keyof HeyChefCommands;

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

const SILENCE_MS = 1500; // no new words for this long = finished talking
const FINAL_GRACE_MS = 350; // engine said "final": wait a beat in case you continue
const AWAKE_IDLE_MS = 10000; // woke up but nobody spoke: go back to sleep quietly
const TAIL_MS = 700; // keep the mic off this long after speech ends
const COMMAND_HOLD_MS = 1000; // mic off while the UI starts reading the next step
const MAX_SPEAKING_MS = 60000; // stuck-speechSynthesis safety valve
const FILLER_DELAY_MS = 900;
const FILLER_SKIP_CHANCE = 0.25;
const FILLERS = ["Hmm, one sec.", "Let me check.", "Good question.", "Let me think."];

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
];

// Commands that work WITHOUT "hey chef". Deliberately narrow: the whole phrase
// must be the command, so normal talking in the kitchen doesn't trigger them.
const BARE_PATTERNS: [CommandName, RegExp][] = [
  ["next", /^(?:go\s+)?(?:to\s+)?next(?:\s+step)?$/],
  ["back", /^(?:go\s+)?(?:back|previous)(?:\s+step)?$|^back\s+(?:a\s+)?step$/],
  ["repeat", /^(?:repeat|repeat\s+(?:that|it|the\s+step)|say\s+that\s+again)$/],
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
      holdUntilRef.current = Date.now() + 400;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langRef.current;
      utterance.rate = 0.97;
      const voice = synth
        .getVoices()
        .find((v) => v.lang === "en-IN" || v.lang === "en_IN");
      if (voice) utterance.voice = voice;

      let finished = false;
      let safety = 0;
      const finish = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(safety);
        // Only move on if nothing newer took over (reset, newer say, etc.)
        if (speakTokenRef.current === token && phaseRef.current === "speaking") {
            if (then === "awake") {
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
      utterance.onend = finish;
      utterance.onerror = finish;

      // onend sometimes never fires (some Android browsers): don't stay deaf forever.
      safety = window.setTimeout(() => {
        try {
          synth.cancel();
        } catch {
          /* nothing to cancel */
        }
        finish();
      }, Math.max(4000, text.length * 100 + 3000));

      try {
        synth.cancel();
      } catch {
        /* nothing to cancel */
      }
      // Chrome can drop a speak() that lands in the same tick as a cancel().
      window.setTimeout(() => {
        if (speakTokenRef.current !== token) return finish();
        synth.speak(utterance);
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
    let message: string | void = undefined;
    try {
      message = commandsRef.current[name]();
    } catch (error) {
      console.warn("Hey chef command failed:", error);
    }
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
    try {
        reply = await Promise.race([
        onQuestionRef.current(question),
        new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 15000)),
      ]);
    } catch {
      reply = null;
    }
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

  const wake = (segmentIndex: number) => {
    anchorRef.current = segmentIndex;
    ping();
    setPhase("awake");

    const question = questionText();
    setLiveText(question);
    if (question) {
      // "Hey chef, how much salt?" in one breath: no prompt needed.
      const last = segmentsRef.current[segmentsRef.current.length - 1];
      scheduleFinish(last?.isFinal ? FINAL_GRACE_MS : SILENCE_MS);
    } else {
      void say("Yes? What would you like to know?", "awake");
    }
  };

  const handleResult = (event: any) => {
    errorStreakRef.current = 0;

    const segs: Seg[] = [];
    for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i];
      segs.push({ text: result[0].transcript, isFinal: result.isFinal });
    }
    segmentsRef.current = segs;

    const current = phaseRef.current;
    if (current === "processing" || current === "speaking") return; // deaf on purpose

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
    scheduleFinish(segs[segs.length - 1].isFinal ? FINAL_GRACE_MS : SILENCE_MS);
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
    rec.maxAlternatives = 1;
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

  // Mic on only when: enabled, not handed to someone else, and nobody is speaking.
  const shouldListen = enabled && supported && !suspended && !ttsBusy && !micBlocked;
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

  // Turned off or suspended: drop whatever was in flight and go back to sleep.
  useEffect(() => {
    if (enabled && supported && !suspended) return;
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
    }, 150);
    return () => window.clearInterval(id);
  }, [enabled, supported]);

    const publicPhase: HeyChefPhase =
    !enabled || !supported ? "off" : suspended ? "paused" : !micLive ? "off" : phase;

  return { supported, phase: publicPhase, liveText, micBlocked };
}