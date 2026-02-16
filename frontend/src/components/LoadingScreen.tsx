import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress?: number;
}

const loadingMessages = [
  "Sharpening the Knight's sword...",
  "Reassembling the Skeleton...",
  "Polishing the Mage's wand...",
  "Warming up the kitchen...",
  "Tuning the instruments...",
  "Setting up the picnic blanket...",
  "Loading 3D models...",
];

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in on mount
    setIsVisible(true);

    // Cycle loading messages every 2 seconds
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ backgroundColor: '#0A1628' }}
    >
      {/* Sparkle decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-6 px-8">
        {/* Logo */}
        <span className="font-heading font-bold text-5xl drop-shadow-lg" style={{
          background: 'linear-gradient(to right, #4A90D9, #FF8C42, #F5C842)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>QuestAI</span>

        {/* Subtitle */}
        <p className="font-sans text-base" style={{ color: '#98AEBF' }}>
          Your words are your superpower.
        </p>

        {/* Progress bar */}
        <div className="relative w-[300px] h-2 bg-white/10 rounded-full overflow-hidden">
          {progress !== undefined ? (
            // Determinate progress
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #4A90D9 0%, #4ECDC4 100%)',
                boxShadow: '0 0 12px rgba(74, 144, 217, 0.5)',
              }}
            />
          ) : (
            // Indeterminate shimmer
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #4A90D9, #4ECDC4, transparent)',
                backgroundSize: '200% 100%',
              }}
            />
          )}
        </div>

        {/* Loading message */}
        <p
          className="font-sans text-sm min-h-[20px] text-center transition-opacity duration-300"
          style={{ color: '#6B8098' }}
        >
          {loadingMessages[messageIndex]}
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
