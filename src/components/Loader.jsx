import React, { useState, useEffect } from 'react';

export default function Loader({ onFinish }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'revealing' | 'done'

  useEffect(() => {
    // Elegant, brisk loading duration (~950ms) so the user never waits long
    const revealTimer = setTimeout(() => {
      setPhase('revealing');
    }, 950);

    const doneTimer = setTimeout(() => {
      setPhase('done');
      if (onFinish) onFinish();
    }, 1750);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  if (phase === 'done') return null;

  const isRevealing = phase === 'revealing';

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none select-none overflow-hidden">
      {/* Top Curtain Shutter */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#060709] border-b border-gold-primary/20 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isRevealing ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.08)_0%,transparent_70%)]"></div>
      </div>

      {/* Bottom Curtain Shutter */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#060709] border-t border-gold-primary/20 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isRevealing ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_70%)]"></div>
      </div>

      {/* Center Editorial Brand Typography & Laser Sweep */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 px-6 transition-all duration-500 ease-out ${
          isRevealing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Minimal Monogram Crest */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold-primary/60"></div>
          <span className="text-gold-primary text-xs font-serif tracking-[0.3em] font-semibold uppercase">
            EST. MMXXIV
          </span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold-primary/60"></div>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-[0.3em] text-white leading-none mb-3">
          NESTORA
        </h1>

        <p className="text-[10px] sm:text-[11px] tracking-[0.4em] text-gold-light/80 uppercase font-medium mb-6">
          Architectural & Trophy Estates
        </p>

        {/* Fine Laser Line with Golden Glow Sweep */}
        <div className="w-48 sm:w-64 h-px bg-white/10 relative overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-primary to-transparent animate-[shimmer_1.2s_infinite] shadow-[0_0_10px_rgba(212,175,55,0.9)]"></div>
        </div>

        {/* Global Enclaves Subtitle */}
        <div className="flex items-center gap-2 sm:gap-4 text-[9px] tracking-[0.25em] text-zinc-400 uppercase">
          <span>Los Angeles</span>
          <span className="text-gold-primary/60">•</span>
          <span>New York</span>
          <span className="text-gold-primary/60">•</span>
          <span>London</span>
          <span className="text-gold-primary/60">•</span>
          <span>Lake Como</span>
        </div>
      </div>
    </div>
  );
}
