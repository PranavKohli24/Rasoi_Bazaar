import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { trackInstamartOrder, InstamartTrackedOrder } from "../services/swiggyService";

/* ------------------------------------------------------------------------
   Same "order slip" design language as SwiggyActionModal: paper, ink,
   stamp-orange, corner-notched surfaces. Kept as its own small palette
   here (rather than importing SwiggyActionModal's) so this component has
   no dependency on that file and can't be destabilized by changes there.
   ------------------------------------------------------------------------ */

const COLOR = {
  paper: "#FFFBF0",
  paperSunken: "#F6EDD6",
  ink: "#241608",
  inkSoft: "#6B5A42",
  inkFaint: "#A8977A",
  line: "#DCCCA2",
  stamp: "#FC8019",
  stampDark: "#D96A0C",
  stampTint: "#FFE7CC",
  error: "#A23E2B",
  errorTint: "#F2DCD2",
} as const;

const notchLg: React.CSSProperties = {
  clipPath:
    "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
};
const notchSm: React.CSSProperties = {
  clipPath: "polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px)",
};

const Svg: React.FC<{ className?: string; strokeWidth?: number; children: React.ReactNode }> = ({
  className,
  strokeWidth = 2,
  children,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {children}
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Svg className={className}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);
const MinusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Svg className={className}><path d="M5 12h14" /></Svg>
);
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Svg className={className} strokeWidth={3}><path d="M5 12l5 5L20 7" /></Svg>
);
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Svg className={className}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></Svg>
);
const ScooterIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 42"
    fill="none"
    aria-hidden="true"
    className={className}
    style={style}
  >
    {/* wheels */}
    <circle cx="12" cy="33" r="6.5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="12" cy="33" r="1.6" fill="currentColor" />
    <circle cx="46" cy="33" r="6.5" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="46" cy="33" r="1.6" fill="currentColor" />

    {/* running board between the wheels, kicking up toward the front wheel */}
    <path
      d="M12 33h10c2.5 0 3.5-1 5-3l4-7.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* front fork, leaning forward from the running board up to the headset */}
    <path
      d="M31 22.5 40 11"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* front wheel connects to the fork */}
    <path
      d="M46 33 40 11"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* headlight / front fairing */}
    <circle cx="43.5" cy="25" r="2.4" stroke="currentColor" strokeWidth="1.8" />

    {/* handlebar, with a grip cap and a small side mirror */}
    <path
      d="M40 11h7.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="48.5" cy="11" r="1.4" fill="currentColor" />
    <path
      d="M41.5 9.5c0-1.6 1-2.6 2.4-2.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="44.3" cy="6.6" r="1" stroke="currentColor" strokeWidth="1.4" />

    {/* seat, sitting over the rear wheel */}
    <path
      d="M15 22c0-1.3 1-2 2.3-2h9c1.8 0 2.7 1.1 2.7 2.4v1.1h-14z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* low backrest tab behind the seat */}
    <path
      d="M14 23.5v-3c0-1 .7-1.6 1.7-1.6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* insulated delivery box strapped to the back, with a strap line and lid fold */}
    <rect x="2" y="9" width="11" height="12" rx="1.6" stroke="currentColor" strokeWidth="2" />
    <path d="M2 13.5h11" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7.5 21v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const PinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Svg className={className}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </Svg>
);

/* Status "stages" for the visual tracker — the real intermediate values
   Swiggy sends haven't been confirmed yet against a live order (only a
   final "Order Delivered" response has been seen so far). This maps
   loosely by keyword so it degrades gracefully once real values show up;
   tighten the matching once you've tracked an in-progress order. */
type Stage = "placed" | "packed" | "onTheWay" | "delivered";

const STAGES: { key: Stage; label: string }[] = [
  { key: "placed", label: "Placed" },
  { key: "packed", label: "Packing" },
  { key: "onTheWay", label: "On the way" },
  { key: "delivered", label: "Delivered" },
];

function stageFromStatusMessage(statusMessage?: string): Stage {
  const text = (statusMessage ?? "").toLowerCase();
  if (text === "delivered" || text.includes("order delivered") || text.includes("has been delivered")) return "delivered";
  if (text.includes("arrived") || text.includes("out for delivery") || text.includes("way") || text.includes("transit") || text.includes("rider")) return "onTheWay";
  if (text.includes("pack")) return "packed";
  return "placed";
}

const POLL_FLOOR_SECONDS = 10; // never poll faster than this, per Swiggy's guidance

/* ---------- "Order placed" beat ----------
   Plays once, right after checkout, before the tracker starts polling
   for live status. A stamp drops in with a little overshoot, then a
   checkmark draws itself the same way SwiggyActionModal's add-to-cart
   stamp does — same family of motion, kept local to this file since it
   has its own small palette rather than importing that one. */
// The stamp/check draws in over ~1.3s (see the animation-delays below),
// then sits fully settled for a ~3s beat before handing off to the
// scooter — long enough to actually read "Order placed!" rather than
// having it brushed past on the way to the next animation.
const ORDER_PLACED_SETTLE_MS = 1300;
const ORDER_PLACED_GAP_MS = 3000;
const ORDER_PLACED_DURATION_MS = ORDER_PLACED_SETTLE_MS + ORDER_PLACED_GAP_MS;
// Minimum time the scooter "finding your order" beat stays up once it
// starts, so it's never skipped just because the status fetch already
// finished during the "placed" beat above.
const FINDING_MIN_DURATION_MS = 1600;

const OrderPlacedScene: React.FC<{ subtitle?: string }> = ({ subtitle }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center" role="status" aria-live="polite">
    <div className="relative flex h-20 w-20 items-center justify-center">
      <span className="stamp-drop-ring absolute inset-0 rounded-full" style={{ backgroundColor: COLOR.stampTint }} aria-hidden="true" />
      <svg viewBox="0 0 64 64" className="stamp-drop relative h-16 w-16">
        <circle cx="32" cy="32" r="27" fill="none" stroke={COLOR.stamp} strokeWidth="4" pathLength={100} className="order-tick-circle" />
        <path
          d="M20 33l8 8 16-18"
          fill="none"
          stroke={COLOR.stamp}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          className="order-tick-check"
        />
      </svg>
    </div>

    <p className="order-placed-label mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: COLOR.stamp }}>
      Order confirmed
    </p>
    <h4 className="order-placed-label mt-1 font-serif text-2xl font-black" style={{ color: COLOR.ink }}>
      Order placed!
    </h4>
    {subtitle && (
      <p className="order-placed-label mx-auto mt-2 max-w-xs text-sm leading-relaxed" style={{ color: COLOR.inkSoft }}>
        {subtitle}
      </p>
    )}
  </div>
);

interface OrderTrackerModalProps {
  orderId: string | null;
  isOpen: boolean;
  onMinimize: () => void;
  onClose: () => void;
  onStatusChange?: (label: string) => void;
  /** True right after checkout succeeded for this orderId — plays the
   *  "Order placed!" beat once before falling through to live tracking.
   *  Leave false/unset when reopening a tracker for an order placed
   *  earlier (e.g. restored from storage, or the "tap to see status"
   *  re-entry point) so the beat doesn't replay. */
  justPlaced?: boolean;
}

const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ orderId, isOpen, onMinimize, onClose, onStatusChange, justPlaced }) => {
  const [order, setOrder] = useState<InstamartTrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Three beats for a freshly-placed order: "placed" (the stamp/checkmark),
  // "finding" (the scooter — always shown for a minimum stretch, even if
  // the status fetch already came back during "placed", so both animations
  // are guaranteed to play in sequence rather than the second one being
  // skipped by a fast response), then "tracking" (the usual loading/stage/
  // ETA view). Keyed off orderId so a new order gets its own sequence, but
  // reopening the same order (minimize -> "tap to see status") skips
  // straight to "tracking" and just resumes wherever it left off.
  const [stage, setStage] = useState<"placed" | "finding" | "tracking">(
    justPlaced ? "placed" : "tracking"
  );
  const stageTimeoutRef = useRef<number | null>(null);

  const [displayedEta, setDisplayedEta] = useState<number | null>(null);
  const etaAnchorRef = useRef<{ minutes: number; receivedAt: number } | null>(null);

  const pollTimeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  const fetchStatus = useCallback(async (id: string) => {
    try {
      const result = await trackInstamartOrder(id);
      if (!isMountedRef.current) return;
      setOrder(result);
      setError(null);

      const pollSeconds = result.pollingIntervalSeconds ?? -1;
      // -1 (or anything non-positive) means the order's in a final state —
      // stop polling. Otherwise wait at least POLL_FLOOR_SECONDS.
      if (pollSeconds > 0) {
        const waitMs = Math.max(pollSeconds, POLL_FLOOR_SECONDS) * 1000;
        pollTimeoutRef.current = window.setTimeout(() => fetchStatus(id), waitMs);
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      setError(err instanceof Error ? err.message : "Couldn't check your order status.");
      // Still retry on a fetch error, just at a conservative fixed interval,
      // so a single dropped request doesn't end tracking for good.
      pollTimeoutRef.current = window.setTimeout(() => fetchStatus(id), 20000);
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (pollTimeoutRef.current !== null) window.clearTimeout(pollTimeoutRef.current);
      if (stageTimeoutRef.current !== null) window.clearTimeout(stageTimeoutRef.current);
    };
  }, []);

  // Kicks off the sequence for a freshly-placed order: "placed" for
  // ORDER_PLACED_DURATION_MS, then on to "finding".
  useEffect(() => {
    if (!orderId) return;
    if (stageTimeoutRef.current !== null) window.clearTimeout(stageTimeoutRef.current);

    if (justPlaced) {
      setStage("placed");
      stageTimeoutRef.current = window.setTimeout(() => setStage("finding"), ORDER_PLACED_DURATION_MS);
    } else {
      setStage("tracking");
    }
  }, [orderId, justPlaced]);

  // "finding" (the scooter) always plays for at least FINDING_MIN_DURATION_MS,
  // whether or not the status fetch has come back yet — that's what
  // guarantees it's seen rather than skipped when the fetch during
  // "placed" already finished. If the fetch is still running once this
  // timer fires, the normal isLoading check below keeps the scooter up
  // until it resolves.
  useEffect(() => {
    if (stage !== "finding") return;
    const id = window.setTimeout(() => setStage("tracking"), FINDING_MIN_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (order?.etaMinutes != null) {
      etaAnchorRef.current = { minutes: order.etaMinutes, receivedAt: Date.now() };
      setDisplayedEta(order.etaMinutes);
    } else {
      etaAnchorRef.current = null;
      setDisplayedEta(null);
    }
  }, [order?.etaMinutes]);

  useEffect(() => {
    if (!etaAnchorRef.current) return;
    const id = window.setInterval(() => {
      if (!etaAnchorRef.current) return;
      const elapsedMin = (Date.now() - etaAnchorRef.current.receivedAt) / 60000;
      setDisplayedEta(Math.max(0, Math.round(etaAnchorRef.current.minutes - elapsedMin)));
    }, 30000);
    return () => window.clearInterval(id);
  }, [order?.etaMinutes]);

  useEffect(() => {
    if (!orderId) return;
    setOrder(null);
    setError(null);
    setIsLoading(true);
    if (pollTimeoutRef.current !== null) window.clearTimeout(pollTimeoutRef.current);
    fetchStatus(orderId);
  }, [orderId, fetchStatus]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
  if (!onStatusChange || !orderId) return;
  const stage = stageFromStatusMessage(order?.status?.statusMessage);
  const label =
    stage === "delivered"
      ? "Delivered"
      : displayedEta != null
      ? `${displayedEta} min away`
      : order?.status?.statusMessage ?? "Tracking your order…";
  onStatusChange(label);
}, [orderId, order, displayedEta, onStatusChange]);
  
if (!orderId || !isOpen) return null;

const trackingStage = stageFromStatusMessage(order?.status?.statusMessage);
const stageIndex = STAGES.findIndex((s) => s.key === trackingStage);
const isDelivered = trackingStage === "delivered";
const canFullyClose = isDelivered || (!!error && !order);



return createPortal(
    <div
      className="fixed inset-0 z-50 flex animate-fade-in-up items-end justify-center p-0 backdrop-blur-sm sm:items-center sm:p-4"
      style={{ animationDuration: "0.2s", backgroundColor: "rgba(36,22,8,0.4)" }}
      onClick={onMinimize}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-tracker-title"
        className="flex max-h-[88vh] w-full max-w-md flex-col rounded-t-2xl border-2 shadow-2xl sm:max-h-[82vh] sm:rounded-2xl"
        style={{ borderColor: COLOR.line, backgroundColor: COLOR.paper, boxShadow: "0 24px 48px rgba(36,22,8,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pb-4 pt-3 sm:px-6 sm:pt-5" style={{ backgroundColor: COLOR.paperSunken }}>
          <div className="mx-auto mb-3 h-1 w-10 rounded-full sm:hidden" style={{ backgroundColor: COLOR.line }} aria-hidden="true" />

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: COLOR.stampDark }}>
                Instamart Order
              </p>
              <h3 id="order-tracker-title" className="font-serif text-xl font-black leading-tight tracking-tight sm:text-2xl" style={{ color: COLOR.ink }}>
                {stage === "placed"
                  ? "Order placed"
                  : stage === "finding"
                  ? "Finding your order"
                  : order?.orderSubtitle ?? "Tracking your order"}
              </h3>
            </div>

            <div className="-mr-1 mt-0.5 flex items-center gap-1.5">
              <button type="button" onClick={onMinimize} aria-label="Minimize" className="flex h-8 w-8 items-center justify-center border focus:outline-none focus-visible:ring-2" style={{ borderColor: COLOR.line, color: COLOR.inkSoft, ...notchSm }}>
                <MinusIcon className="h-4 w-4" />
              </button>
              {canFullyClose && stage === "tracking" && (
                <button type="button" onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center border focus:outline-none focus-visible:ring-2" style={{ borderColor: COLOR.line, color: COLOR.inkSoft, ...notchSm }}>
                  <CloseIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="h-[3px]" style={{ background: `linear-gradient(180deg, ${COLOR.line}, transparent)` }} aria-hidden="true" />

        {/* Content */}
        <div className="modal-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {error && stage === "tracking" && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-sm leading-relaxed"
              style={{ borderColor: COLOR.line, backgroundColor: COLOR.paperSunken, color: COLOR.inkSoft }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: COLOR.stampTint, color: COLOR.stampDark }}
              >
                <InfoIcon className="h-4 w-4" />
              </span>
              <p className="pt-0.5">{error}</p>
            </div>
          )}

          {stage === "placed" ? (
            <OrderPlacedScene subtitle="Hang tight, we're pulling up its live status next." />
          ) : stage === "finding" || (isLoading && !order) ? (
            <div className="flex flex-col items-center justify-center py-14 text-center" role="status" aria-live="polite">
              <div className="relative flex h-14 w-32 items-center justify-center overflow-hidden">
                <span className="scooter-dash" style={{ backgroundColor: COLOR.line, animationDelay: "0ms" }} />
                <span className="scooter-dash" style={{ backgroundColor: COLOR.line, animationDelay: "180ms" }} />
                <span className="scooter-dash" style={{ backgroundColor: COLOR.line, animationDelay: "360ms" }} />
                <ScooterIcon className="scooter-drive relative h-9 w-12" style={{ color: COLOR.stamp }} />
              </div>
              <p className="mt-4 font-serif text-lg font-black" style={{ color: COLOR.ink }}>Finding your order</p>
            </div>
          ) : order ? (
            <div className="animate-fade-in-up space-y-6" style={{ animationDuration: "0.25s" }}>
              {/* ETA — placeholder until a real in-progress response confirms the field */}
              {!isDelivered && (
                <div className="rounded-xl border-2 px-4 py-4 text-center" style={{ borderColor: COLOR.stamp, backgroundColor: COLOR.stampTint }}>
                  {(order.status?.statusMessage ?? "").toLowerCase().includes("arrived") ? (
                    <>
                      <p className="font-serif text-lg font-black" style={{ color: COLOR.ink }}>
                        {order.status?.statusMessage}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide" style={{ color: COLOR.stampDark }}>
                        Your order is here
                      </p>
                    </>
                  ) : displayedEta != null ? (
                    <>
                      <p className="font-serif text-3xl font-black" style={{ color: COLOR.ink }}>
                        {displayedEta} min
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide" style={{ color: COLOR.stampDark }}>
                        Estimated arrival
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-serif text-lg font-black" style={{ color: COLOR.ink }}>
                        {order.status?.statusMessage ?? "On its way"}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide" style={{ color: COLOR.stampDark }}>
                        Usually 10–20 min
                      </p>
                    </>
                  )}
                </div>
              )}
              {/* Stage tracker */}
              <div className="flex items-center" aria-label="Order progress">
                {STAGES.map((s, i) => {
                  const reached = i <= stageIndex;
                  const isLast = i === STAGES.length - 1;
                  return (
                    <React.Fragment key={s.key}>
                      <div className="flex flex-col items-center gap-1.5">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors"
                          style={{
                            borderColor: reached ? COLOR.stamp : COLOR.line,
                            backgroundColor: reached ? COLOR.stamp : COLOR.paper,
                            color: COLOR.paper,
                          }}
                        >
                          {reached && <CheckIcon className="h-3.5 w-3.5" />}
                        </span>
                        <span className="text-center font-mono text-[9px] font-bold uppercase tracking-wide" style={{ color: reached ? COLOR.ink : COLOR.inkFaint }}>
                          {s.label}
                        </span>
                      </div>
                      {!isLast && (
                        <span
                          className="mx-1 h-0.5 flex-1"
                          style={{ backgroundColor: i < stageIndex ? COLOR.stamp : COLOR.line, marginBottom: "16px" }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Delivery / store info */}
              <div className="rounded-xl border px-4 py-3.5" style={{ borderColor: COLOR.line }}>
                <div className="flex items-start gap-3">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#D96A0C]" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold" style={{ color: COLOR.ink }}>
                      {order.deliveryInfo?.addressLabel ?? "Delivery address"}
                    </p>
                    {order.deliveryInfo?.fullAddress && (
                      <p className="mt-0.5 text-xs leading-relaxed" style={{ color: COLOR.inkSoft }}>
                        {order.deliveryInfo.fullAddress}
                      </p>
                    )}
                  </div>
                </div>
                {order.storeInfo?.name && (
                  <p className="mt-2.5 font-mono text-[11px]" style={{ color: COLOR.inkFaint }}>
                    From {order.storeInfo.name}
                  </p>
                )}
              </div>

              {/* Items */}
              {order.items && order.items.length > 0 && (
                <div>
                  <p className="mb-2.5 font-mono text-[11px] font-bold uppercase tracking-wide" style={{ color: COLOR.inkSoft }}>
                    {order.itemCount ?? order.items.length} items
                  </p>
                  <ul className="divide-y rounded-xl border" style={{ borderColor: COLOR.line }}>
                    {order.items.map((item, i) => (
                      <li key={i} className="flex items-start justify-between gap-3 px-3.5 py-2.5 text-sm" style={{ borderColor: COLOR.line }}>
                        <span className="min-w-0 break-words" style={{ color: COLOR.ink }}>{item.name}</span>
                        <span className="shrink-0 pt-px font-mono tabular-nums" style={{ color: COLOR.inkSoft }}>{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {isDelivered && stage === "tracking" && (
          <div className="border-t px-5 py-4 sm:px-6" style={{ borderColor: COLOR.line }}>
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wide shadow-sm transition-all duration-150 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: COLOR.stamp, color: COLOR.paper, ...notchLg }}
            >
              Done
            </button>
          </div>
        )}
      </div>

      <style>{`
        .modal-scroll::-webkit-scrollbar { height: 4px; width: 4px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: ${COLOR.inkFaint}55; border-radius: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }

        @keyframes scooter-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .scooter-drive { animation: scooter-bob 0.6s ease-in-out infinite; }

        .scooter-dash {
          position: absolute;
          left: 62%;
          top: 50%;
          width: 10px;
          height: 2.5px;
          border-radius: 2px;
          opacity: 0;
          animation: scooter-dash-trail 0.9s ease-in-out infinite;
        }
        @keyframes scooter-dash-trail {
          0% { opacity: 0; transform: translate(6px, -1px); }
          35% { opacity: 1; }
          100% { opacity: 0; transform: translate(-30px, -1px); }
        }

        @keyframes stamp-drop {
          0% { transform: scale(1.6) rotate(-10deg); opacity: 0; }
          55% { transform: scale(0.92) rotate(2deg); opacity: 1; }
          75% { transform: scale(1.06) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .stamp-drop { animation: stamp-drop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }

        @keyframes stamp-drop-ring {
          0% { transform: scale(0.6); opacity: 0.55; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .stamp-drop-ring { animation: stamp-drop-ring 0.7s ease-out both; animation-delay: 0.05s; }

        @keyframes order-tick-draw {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .order-tick-circle {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: order-tick-draw 0.4s ease-out forwards;
          animation-delay: 0.38s;
        }
        .order-tick-check {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: order-tick-draw 0.3s ease-out forwards;
          animation-delay: 0.72s;
        }

        @keyframes order-placed-label-in {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .order-placed-label { animation: order-placed-label-in 0.35s ease-out both; animation-delay: 0.9s; }

        @media (prefers-reduced-motion: reduce) {
          .scooter-drive, .scooter-dash,
          .stamp-drop, .stamp-drop-ring, .order-tick-circle, .order-tick-check, .order-placed-label {
            animation: none !important;
            opacity: 1;
            transform: none;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default OrderTrackerModal;