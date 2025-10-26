import { useEffect, useState } from "react";

interface CircularLoaderProps {
  onComplete?: () => void;
}

const CircularLoader = ({ onComplete }: CircularLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 backdrop-blur-sm">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 animate-pulse">
          <svg className="w-40 h-40 -rotate-90 opacity-20" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              className="blur-lg"
            />
          </svg>
        </div>

        {/* Main circle */}
        <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
            fill="none"
            opacity="0.2"
          />
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-100 ease-linear drop-shadow-glow"
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-scale-in">
            {progress}%
          </span>
          <span className="text-sm text-muted-foreground mt-2 animate-fade-in">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircularLoader;
