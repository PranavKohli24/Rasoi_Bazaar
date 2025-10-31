import React, { useState, useEffect } from 'react';

const messages = [
  "Stirring up your recipe magic...",
  "Adding a pinch of secret masala...",
  "Your rasoi is heating up...",
  "Smells good already, right?",
  "Just a tad more salt of patience...",
  "Plating your dish with love...",
  "Sprinkling the final garnish...",
  "Almost ready to serve, chef!",
  "Your tasty surprise is seconds away...",
];


const CookingCompanion: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center p-8 text-white animate-fade-in-up">
      {/* Animated Dog Butler Icon */}
      <div className="relative w-48 h-48 mb-6 dog-butler">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="furGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor: '#E6B873'}} />
                    <stop offset="100%" style={{stopColor: '#D1A35D'}} />
                </radialGradient>
            </defs>
            <g className="butler-body">
                {/* Tail */}
                <path d="M55 135 C 30 130, 20 100, 45 95" stroke="#B08447" strokeWidth="12" strokeLinecap="round" fill="none" className="tail" />
                
                {/* Body */}
                <path d="M60 160 C 40 140, 50 80, 75 70 C 90 65, 120 65, 135 70 C 160 80, 170 140, 150 160 Z" fill="#D1A35D"/>
                
                {/* White Shirt */}
                <path d="M75 70 C 90 85, 120 85, 135 70 L 125 115 L 85 115 Z" fill="#ffffff" />
                <path d="M105 70 V 85" stroke="#e0e0e0" strokeWidth="1" />
                
                {/* Vest */}
                <path d="M75 70 L 85 115 L 65 160 L 65 90 Z" fill="#2c3e50" />
                <path d="M135 70 L 125 115 L 145 160 L 145 90 Z" fill="#2c3e50" />
                
                {/* Bow Tie */}
                <path d="M105 82 L 90 72 L 90 92 Z" fill="#e74c3c" />
                <path d="M105 82 L 120 72 L 120 92 Z" fill="#e74c3c" />
                <circle cx="105" cy="82" r="5" fill="#c0392b" />

                {/* Head */}
                <path d="M80 70 C 65 70, 60 40, 80 30 C 100 20, 120 20, 140 30 C 160 40, 155 70, 140 70 Z" fill="url(#furGradient)" stroke="#B08447" strokeWidth="1" />
                {/* Muzzle */}
                <path d="M105 72 C 95 75, 90 60, 105 55 C 120 60, 115 75, 105 72" fill="#E6B873" />
                
                {/* Eyes */}
                <circle cx="97" cy="48" r="5" fill="#2c3e50" />
                <circle cx="113" cy="48" r="5" fill="#2c3e50" />
                <circle cx="98" cy="47" r="1.5" fill="white" />
                <circle cx="114" cy="47" r="1.5" fill="white" />

                {/* Nose */}
                <ellipse cx="105" cy="58" rx="7" ry="5" fill="#2c3e50" />
                <ellipse cx="103" cy="57" rx="2" ry="1" fill="#4d565e" />

                {/* Ears */}
                <path d="M70 45 C 50 55, 55 80, 75 75" fill="#D1A35D" stroke="#B08447" strokeWidth="1" />
                <path d="M140 45 C 160 55, 155 80, 135 75" fill="#D1A35D" stroke="#B08447" strokeWidth="1" />

                {/* Plate and Cloche */}
                <g transform="translate(130, 120)">
                    {/* Paw */}
                    <path d="M0 0 C 10 10, 25 10, 35 0 C 30 -10, 15 -10, 0 0" fill="#D1A35D" />
                    <path d="M5 -2 C 6 -3, 8 -3, 9 -2" stroke="#B08447" strokeWidth="1" strokeLinecap="round" />
                    <path d="M15 -4 C 16 -5, 18 -5, 19 -4" stroke="#B08447" strokeWidth="1" strokeLinecap="round" />
                    <path d="M25 -2 C 26 -3, 28 -3, 29 -2" stroke="#B08447" strokeWidth="1" strokeLinecap="round" />

                    {/* Plate */}
                    <ellipse cx="20" cy="25" rx="40" ry="8" fill="#e0e0e0" />
                    <ellipse cx="20" cy="25" rx="38" ry="6" fill="#f5f5f5" />
                    {/* Cloche */}
                    <path d="M -15 25 Q 20 -20, 55 25 Z" fill="#dce1e4" />
                    <ellipse cx="20" cy="-18" rx="5" ry="2" fill="#bdc3c7" />
                    <path d="M -5 -18 Q 20 -15, 45 -18" stroke="white" strokeWidth="3" fill="none" opacity="0.7" className="shine" />
                </g>
            </g>
        </svg>
      </div>
      <h2 className="text-2xl font-serif font-bold text-orange-300 mb-2">Your Culinary Butler is on the Job (just few seconds, and recipe would be ready)</h2>
      <p className="text-lg text-stone-300 transition-opacity duration-500 min-h-[28px]">{message}</p>
      <style>{`
        @keyframes gentle-sway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        @keyframes tail-wag {
          0%, 100% { transform: rotate(5deg); }
          50% { transform: rotate(-10deg); }
        }
        @keyframes cloche-shine {
            0% { transform: translateX(-60px) scaleY(1.5) rotate(-30deg); opacity: 0; }
            50% { transform: translateX(0px) scaleY(1.5) rotate(-30deg); opacity: 0.6; }
            100% { transform: translateX(60px) scaleY(1.5) rotate(-30deg); opacity: 0; }
        }
        .dog-butler {
            transform-origin: bottom center;
            animation: gentle-sway 3s ease-in-out infinite;
        }
        .tail {
          transform-origin: 55px 135px;
          animation: tail-wag 1.5s ease-in-out infinite;
        }
        .shine {
            animation: cloche-shine 3s ease-in-out infinite;
            animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default CookingCompanion;