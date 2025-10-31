import React, { useEffect, useRef } from 'react';

interface CelebrationPopupProps {
  onReset: () => void;
}

const Sparkle: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    const colors = ['#f97316', '#ec4899', '#facc15', '#4ade80'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return <div className="sparkle" style={{ ...style, backgroundColor: color }} />;
};

const CelebrationPopup: React.FC<CelebrationPopupProps> = ({ onReset }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const generateSparkles = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            const sparkleCount = 30; // More sparkles!
            for (let i = 0; i < sparkleCount; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                
                const colors = ['#f97316', '#ec4899', '#facc15', '#4ade80', '#60a5fa'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const delay = Math.random() * 0.8; // Stagger the animation
                const duration = 0.5 + Math.random() * 0.5;

                sparkle.style.left = `${x}%`;
                sparkle.style.top = `${y}%`;
                sparkle.style.backgroundColor = color;
                sparkle.style.animationDelay = `${delay}s`;
                sparkle.style.animationDuration = `${duration}s`;
                
                container.appendChild(sparkle);
                
                // Remove sparkle after animation
                setTimeout(() => {
                    if (container.contains(sparkle)) {
                       container.removeChild(sparkle);
                    }
                }, (delay + duration) * 1000);
            }
        };

        generateSparkles();
        const interval = setInterval(generateSparkles, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div 
            ref={containerRef}
            className="celebration-popup fixed inset-0 bg-stone-900/80 backdrop-blur-lg flex flex-col justify-center items-center z-50 animate-fade-in-up"
            style={{animationDuration: '0.5s'}}
        >
            <div className="text-center p-8 relative">
                <h2 className="font-serif text-6xl sm:text-8xl font-black text-white drop-shadow-2xl mb-4">
                    Woohoo, Chef!
                </h2>
                <p className="text-xl text-orange-200/90 max-w-2xl mx-auto mb-10">
                    You've successfully created a masterpiece. Time for the best part - enjoying it!
                </p>
                <button
                    onClick={onReset}
                    className="bg-orange-500 hover:bg-orange-400 text-stone-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-400/30 text-lg"
                >
                    Cook Another Masterpiece
                </button>
            </div>
        </div>
    );
};

export default CelebrationPopup;