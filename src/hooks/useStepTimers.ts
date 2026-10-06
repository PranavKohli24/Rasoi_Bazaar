import { useEffect, useMemo, useReducer, useRef } from "react";

export const MIN_TIMER_SECONDS = 30;

interface TimerData {
  total: number; // current length in seconds (changes with +/- 30s)
  remaining: number; // frozen value while idle or paused
  endsAt: number | null; // epoch ms while running, otherwise null
  started: boolean;
  acknowledged: boolean; // a finished timer the person has already seen
  firedMarks: Set<number>;
}

export interface TimerView {
  total: number;
  remaining: number;
  isRunning: boolean;
  isDone: boolean;
  hasStarted: boolean;
}

export interface BackgroundTimer {
  step: number;
  remaining: number;
  isRunning: boolean;
  isDone: boolean;
}

interface Options {
  onComplete?: (step: number) => void;
  onCheckIn?: (step: number, markIndex: number) => void;
}

// ~18 seconds in (skipped if that's basically the whole timer), then every
// 5 minutes, always leaving 20s before the end so a check-in never lands on
// top of the "time's up" chime.
const buildCheckInMarks = (totalSeconds: number): number[] => {
  const marks: number[] = [];
  if (totalSeconds >= 35) marks.push(18);
  for (let t = 300; t < totalSeconds - 20; t += 300) marks.push(t);
  return marks;
};

const secondsLeft = (t: TimerData, now: number): number =>
  t.endsAt === null ? t.remaining : Math.max(0, Math.ceil((t.endsAt - now) / 1000));

export function useStepTimers({ onComplete, onCheckIn }: Options = {}) {
  // The source of truth is a ref (so voice commands never see stale data);
  // `rerender` just tells React to redraw after it changes.
  const dataRef = useRef<Map<number, TimerData>>(new Map());
  const [, rerender] = useReducer((n: number) => n + 1, 0);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onCheckInRef = useRef(onCheckIn);
  onCheckInRef.current = onCheckIn;

  const lastSigRef = useRef("");

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const completed: number[] = [];
      const checkIns: [number, number][] = [];

      dataRef.current.forEach((t, step) => {
        if (t.endsAt === null) return;
        const left = secondsLeft(t, now);

        if (left <= 0) {
          t.remaining = 0;
          t.endsAt = null;
          completed.push(step);
          return;
        }

        const elapsed = t.total - left;
        buildCheckInMarks(t.total).forEach((mark, index) => {
          if (elapsed >= mark && !t.firedMarks.has(mark)) {
            t.firedMarks.add(mark);
            checkIns.push([step, index]);
          }
        });
      });

      // Only redraw when a visible second changed or a timer finished.
      const sig = Array.from(dataRef.current.entries())
        .filter(([, t]) => t.endsAt !== null)
        .map(([step, t]) => `${step}:${secondsLeft(t, now)}`)
        .join("|");
      if (completed.length > 0 || sig !== lastSigRef.current) {
        lastSigRef.current = sig;
        rerender();
      }

      checkIns.forEach(([step, index]) => onCheckInRef.current?.(step, index));
      completed.forEach((step) => onCompleteRef.current?.(step));
    };

    const id = window.setInterval(tick, 250);
    // Coming back to the tab: catch up right away instead of waiting a tick.
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  return useMemo(() => {
    const map = dataRef.current;

    const ensure = (step: number, seconds: number): TimerData => {
      let t = map.get(step);
      if (!t) {
        t = {
          total: seconds,
          remaining: seconds,
          endsAt: null,
          started: false,
          acknowledged: false,
          firedMarks: new Set(),
        };
        map.set(step, t);
      }
      return t;
    };

    return {
      getView(step: number, seconds: number): TimerView {
        const t = map.get(step);
        if (!t) {
          return { total: seconds, remaining: seconds, isRunning: false, isDone: false, hasStarted: false };
        }
        const remaining = secondsLeft(t, Date.now());
        return {
          total: t.total,
          remaining,
          isRunning: t.endsAt !== null,
          isDone: remaining === 0,
          hasStarted: t.started,
        };
      },

      // Start, or resume if it was paused.
      start(step: number, seconds: number) {
        const t = ensure(step, seconds);
        if (t.endsAt !== null || t.remaining <= 0) return;
        t.endsAt = Date.now() + t.remaining * 1000;
        t.started = true;
        t.acknowledged = false;
        rerender();
      },

      pause(step: number) {
        const t = map.get(step);
        if (!t || t.endsAt === null) return;
        t.remaining = secondsLeft(t, Date.now());
        t.endsAt = null;
        rerender();
      },

      adjust(step: number, seconds: number, delta: number) {
        const t = ensure(step, seconds);
        const now = Date.now();
        const left = secondsLeft(t, now);
        if (left <= 0) return;
        t.total = Math.max(MIN_TIMER_SECONDS, t.total + delta);
        // At least 1s, so "subtract 30" can't silently finish a paused timer.
        const next = Math.max(1, left + delta);
        if (t.endsAt !== null) t.endsAt = now + next * 1000;
        else t.remaining = next;
        rerender();
      },

      reset(step: number) {
        map.delete(step);
        rerender();
      },

      // The person has seen this finished timer, so no chip for it.
      acknowledge(step: number) {
        const t = map.get(step);
        if (!t || t.acknowledged || t.endsAt !== null) return;
        if (secondsLeft(t, Date.now()) !== 0) return;
        t.acknowledged = true;
        rerender();
      },

      // Started timers on steps other than the one on screen (for the chips).
      getBackground(currentStep: number): BackgroundTimer[] {
        const now = Date.now();
        const out: BackgroundTimer[] = [];
        map.forEach((t, step) => {
          if (step === currentStep || !t.started) return;
          const remaining = secondsLeft(t, now);
          const isDone = remaining === 0;
          if (isDone && t.acknowledged) return;
          out.push({ step, remaining, isRunning: t.endsAt !== null, isDone });
        });
        return out.sort((a, b) => a.step - b.step);
      },

      clearAll() {
        map.clear();
        rerender();
      },
    };
  }, []);
}