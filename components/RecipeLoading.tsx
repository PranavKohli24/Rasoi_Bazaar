
import React, { useState, useEffect, useMemo } from 'react';
import { displayDishName } from '../utils/displayDishName';

interface RecipeLoadingProps {
  dishName?: string;
}

const buildMessages = (dish: string) => [
  dish ? `Stirring up your ${dish}...` : 'Stirring up your recipe magic...',
  'Adding a pinch of secret masala...',
  'Your rasoi is heating up...',
  'Smells good already, right?',
  'Just a tad more salt of patience...',
  dish ? `Plating your ${dish} with love...` : 'Plating your dish with love...',
  'Sprinkling the final garnish...',
  'Almost ready to serve, chef!',
  'Your tasty surprise is seconds away...',
];

const RecipeLoading: React.FC<RecipeLoadingProps> = ({ dishName = '' }) => {
  const dish = useMemo(() => displayDishName(dishName), [dishName]);
  const messages = useMemo(() => buildMessages(dish), [dish]);
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    setMessage(messages[0]);

    const intervalId = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [messages]);

  return (
    <div
      className="flex animate-fade-in-up flex-col items-center justify-center p-8 text-center"
      role="status"
      aria-live="polite"
    >
      {/* Soft, light peach circle behind the animated chef */}
      <div className="mb-6 flex h-52 w-52 items-center justify-center rounded-full bg-[#FFF1E4]">
        <div className="chef-illustration relative top-12 h-44 w-44">
          <svg
            className="h-full w-full"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="chefSkin"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F6DDBF" />
                <stop offset="100%" stopColor="#E6B88F" />
              </linearGradient>

              <linearGradient
                id="chefCoat"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="hsl(42, 12%, 89%)" />
                <stop offset="50%" stopColor="hsl(42, 12%, 89%)" />
                <stop offset="100%" stopColor="hsl(42, 12%, 89%)" />
              </linearGradient>

              <linearGradient
                id="clocheMetal"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#BFC8CD" />
                <stop offset="45%" stopColor="#F8FAFB" />
                <stop offset="100%" stopColor="#ADB8BE" />
              </linearGradient>
            </defs>

            <g className="chef-body">
              {/* Arms and sleeves */}
              <path
                d="M80 87 C65 88 58 104 63 123 L77 128 L91 103 Z"
                fill="url(#chefCoat)"
                stroke="#D9D4CC"
                strokeWidth="1.5"
              />

              <path
                d="M122 87 C137 90 145 105 140 121 L127 127 L113 102 Z"
                fill="url(#chefCoat)"
                stroke="#D9D4CC"
                strokeWidth="1.5"
              />

              {/* Hands */}
              <path
                d="M61 120 C57 124 59 132 66 133 L78 128 L76 120 Z"
                fill="url(#chefSkin)"
              />

              <path
                d="M130 120 C129 126 134 132 141 130 L147 124 L139 118 Z"
                fill="url(#chefSkin)"
              />

              {/* Chef jacket */}
              <path
                d="M82 76 C87 85 96 88 103 88 C111 88 120 84 124 76
                   L136 156 Q104 169 69 156 Z"
                fill="url(#chefCoat)"
                stroke="#D9D4CC"
                strokeWidth="1.5"
              />

              {/* Collar */}
              <path
                d="M82 76 L96 89 L88 103 L77 82 Z"
                fill="hsl(42, 12%, 89%)"
                stroke="#E3DED5"
                strokeWidth="1"
              />

              <path
                d="M124 76 L110 89 L118 103 L130 82 Z"
                fill="hsl(42, 12%, 89%)"
                stroke="#E3DED5"
                strokeWidth="1"
              />

              {/* Orange neckerchief */}
              <path
                d="M91 81 L103 91 L115 81 L111 102 L103 112 L95 102 Z"
                fill="#F28B32"
              />

              <path
                d="M103 92 L103 105"
                stroke="#D66E20"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Double-breasted jacket buttons */}
              <g fill="#D5A36F">
                <circle cx="94" cy="117" r="2.2" />
                <circle cx="94" cy="132" r="2.2" />
                <circle cx="113" cy="117" r="2.2" />
                <circle cx="113" cy="132" r="2.2" />
              </g>

              {/* Neck */}
              <path
                d="M93 69 L93 82 Q103 90 113 82 L113 69 Z"
                fill="url(#chefSkin)"
              />

              {/* Ears */}
              <ellipse
                cx="77"
                cy="55"
                rx="5"
                ry="8"
                fill="#E6B88F"
              />

              <ellipse
                cx="129"
                cy="55"
                rx="5"
                ry="8"
                fill="#E6B88F"
              />

              {/* Face */}
              <path
                d="M80 43 C80 28 91 25 103 25 C116 25 127 33 127 47
                   L124 63 C122 76 113 82 103 82
                   C92 82 84 75 82 63 Z"
                fill="url(#chefSkin)"
                stroke="#D4A47C"
                strokeWidth="1"
              />

              {/* Eyebrows */}
              <path
                d="M89 45 Q94 42 98 45"
                stroke="#755239"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M108 45 Q113 42 118 45"
                stroke="#755239"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Eyes */}
              <ellipse
                cx="94"
                cy="51"
                rx="2.7"
                ry="3.5"
                fill="#45362D"
              />

              <ellipse
                cx="113"
                cy="51"
                rx="2.7"
                ry="3.5"
                fill="#45362D"
              />

              <circle cx="95" cy="50" r="0.9" fill="#FFFFFF" />
              <circle cx="114" cy="50" r="0.9" fill="#FFFFFF" />

              {/* Nose */}
              <path
                d="M102 52 Q99 60 103 61 Q106 62 108 59"
                stroke="#C9946E"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Friendly smile */}
              <path
                d="M94 66 Q103 74 113 65"
                stroke="#945D43"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Tall chef hat */}
              <path
                d="M78 35
                   C72 29 75 19 84 18
                   C85 8 97 6 103 14
                   C110 3 123 9 124 18
                   C135 17 140 27 133 35 Z"
                fill="#FFFFFF"
                stroke="#E5E0D8"
                strokeWidth="1.5"
              />

              {/* Hat folds */}
              <path
                d="M88 17 Q84 24 89 29"
                stroke="#E9E4DC"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M105 13 Q100 22 105 29"
                stroke="#E9E4DC"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              <path
                d="M121 17 Q126 24 120 29"
                stroke="#E9E4DC"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Hat band */}
              <path
                d="M78 31 Q105 35 134 31 L135 39 Q105 43 77 39 Z"
                fill="#F8F6F1"
                stroke="#E1DCD3"
                strokeWidth="1"
              />

              {/* Serving tray and cloche */}
              <g transform="translate(130, 120)">
                {/* Hand supporting the tray */}
                <path
                  d="M-1 0 C8 4 25 5 35 0 L35 5
                     C24 12 8 11 -1 5 Z"
                  fill="url(#chefSkin)"
                />

                {/* Gentle steam rising from the hot dish */}
                <g
                  className="steam"
                  fill="none"
                  stroke="#C9C7C1"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="steam-wisp steam-wisp-one"
                    d="M7 -23 C0 -31 14 -37 8 -45 C3 -52 11 -57 12 -64"
                    opacity="0.8"
                  />
                  <path
                    className="steam-wisp steam-wisp-two"
                    d="M20 -25 C13 -33 28 -39 21 -47 C16 -54 23 -60 24 -67"
                    opacity="0.75"
                  />
                  <path
                    className="steam-wisp steam-wisp-three"
                    d="M33 -23 C40 -31 27 -37 34 -45 C39 -52 32 -57 33 -64"
                    opacity="0.7"
                  />
                </g>

                {/* Plate rim */}
                <ellipse
                  cx="20"
                  cy="25"
                  rx="40"
                  ry="8"
                  fill="#C7CED1"
                />

                <ellipse
                  cx="20"
                  cy="23"
                  rx="39"
                  ry="7"
                  fill="#F9FAFA"
                />

                <ellipse
                  cx="20"
                  cy="23"
                  rx="31"
                  ry="4"
                  fill="none"
                  stroke="#D8DEE1"
                  strokeWidth="1"
                />

                {/* Cloche dome */}
                <path
                  d="M-15 23 Q20 -22 55 23 Z"
                  fill="url(#clocheMetal)"
                  stroke="#ADB7BC"
                  strokeWidth="1"
                />

                {/* Cloche knob */}
                <path
                  d="M17 -19 L17 -22 Q20 -26 23 -22 L23 -19 Z"
                  fill="#AEB8BE"
                />

                <ellipse
                  cx="20"
                  cy="-22"
                  rx="5"
                  ry="3"
                  fill="#D9DFE2"
                />

                {/* Moving highlight */}
                <path
                  d="M-3 13 Q20 -10 43 13"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.75"
                  className="shine"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {dish && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
          Preparing your recipe for
        </p>
      )}

      <h2 className="mb-1 max-w-xl break-words font-serif text-3xl font-black text-orange-200 sm:text-4xl">
        {dish || 'Your Chef Is on the Job'}
      </h2>

      <p className="mb-4 text-sm text-stone-500">
        Ready in just a few seconds
      </p>

      <p className="min-h-[28px] text-lg text-stone-400 transition-opacity duration-500">
        {message}
      </p>

      <style>{`
        @keyframes gentle-sway {
          0%, 100% {
            transform: rotate(-1deg) translateY(0);
          }

          50% {
            transform: rotate(1deg) translateY(-2px);
          }
        }

        @keyframes cloche-shine {
          0% {
            transform: translateX(-12px);
            opacity: 0;
          }

          50% {
            transform: translateX(0);
            opacity: 0.8;
          }

          100% {
            transform: translateX(12px);
            opacity: 0;
          }
        }

        @keyframes steam-rise {
          0% {
            transform: translateY(5px);
            opacity: 0;
          }

          20% {
            opacity: 0.8;
          }

          70% {
            opacity: 0.55;
          }

          100% {
            transform: translateY(-12px);
            opacity: 0;
          }
        }

        .steam-wisp {
          animation: steam-rise 2.2s ease-in-out infinite;
        }

        .steam-wisp-two {
          animation-delay: 0.55s;
        }

        .steam-wisp-three {
          animation-delay: 1.1s;
        }

        .chef-illustration {
          transform-origin: bottom center;
          animation: gentle-sway 3s ease-in-out infinite;
        }

        .shine {
          animation: cloche-shine 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .chef-illustration,
          .shine,
          .steam-wisp {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeLoading;
