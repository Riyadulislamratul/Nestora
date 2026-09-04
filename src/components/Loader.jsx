import React, { useState, useEffect } from 'react';

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Smooth, realistic loading progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly
        const step = Math.max(1, Math.floor((100 - prev) * 0.12) + Math.floor(Math.random() * 8));
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        const exitTimer = setTimeout(() => {
          if (onFinish) onFinish();
        }, 600);
        return () => clearTimeout(exitTimer);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050608] transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,rgba(6,7,9,0.95)_60%,#050608_100%)] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        {/* Animated Brand Monogram Box */}
        <div className="relative mb-6">
          {/* Rotating Glowing Accent Ring */}
          <div className="absolute -inset-2.5 rounded-2xl border border-gold-primary/30 animate-spin [animation-duration:8s] border-t-gold-primary"></div>
          
          {/* Outer Glass Nest */}
          <div className="w-16 h-16 rounded-2xl glass-panel-gold flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.3)] border border-gold-primary/50 relative overflow-hidden">
            <span className="font-serif text-3xl font-bold gold-text">
              N
            </span>
            {/* Shimmer Light Bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Wordmark */}
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.25em] text-white leading-none mb-1">
          NESTORA
        </h2>
        <span className="text-[9px] tracking-[0.35em] text-gold-primary font-semibold uppercase mb-8">
          Private Estates
        </span>

        {/* Progress Bar Container */}
        <div className="w-full max-w-[240px] h-[2px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
          <div
            className="h-full gold-gradient rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(212,175,55,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text & Percentage */}
        <div className="flex items-center justify-between w-full max-w-[240px] text-[10px] tracking-wider text-zinc-400 uppercase font-medium">
          <span>Curating Portfolio</span>
          <span className="text-gold-primary font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
