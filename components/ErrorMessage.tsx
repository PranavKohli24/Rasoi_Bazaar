import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      role="alert"
      className="mt-6 w-full animate-fade-in-up rounded-2xl border border-orange-400/40 bg-stone-900 shadow-[0_8px_30px_rgba(120,70,30,0.08)]"
    >
      <div className="flex items-start gap-4 p-5 sm:p-6">
        {/* Icon */}
        <div className="shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE8D6]">
            <svg
              className="h-5 w-5 text-orange-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.3 3.8L2.6 17.2A1.8 1.8 0 004.15 20h15.7a1.8 1.8 0 001.55-2.8L13.7 3.8a2 2 0 00-3.4 0z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-semibold tracking-wide text-orange-100">
            A little kitchen hiccup
          </p>

          <p className="mt-1 text-sm leading-relaxed text-stone-300 sm:text-base">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;