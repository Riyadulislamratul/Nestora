import React from 'react';
import SearchFilterBar from './SearchFilterBar';
import { Sparkles, ShieldCheck, Globe } from 'lucide-react';

export default function HeroSection({ 
  filters, 
  setFilters, 
  onResetFilters,
  resultCount 
}) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 sm:pt-36 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background with dark overlay & subtle gold illumination */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85" 
          alt="Luxury architectural residence"
          className="w-full h-full object-cover brightness-[0.38] contrast-[1.08] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080a]/50 via-[#07080a]/80 to-[#07080a]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_65%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center flex flex-col items-center">
        {/* Editorial Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-[11px] font-semibold tracking-widest uppercase mb-6 animate-fade-in shadow-sm shadow-gold-primary/10">
          <Sparkles size={13} className="text-gold-primary" />
          <span>Curated Architectural Masterpieces & Penthouses</span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] font-medium mb-5 text-white drop-shadow-md animate-slide-up">
          Exceptional Homes <br />
          <span className="gold-text">for Extraordinary Lives</span>
        </h1>

        {/* Narrative Description */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-zinc-300 mb-8 sm:mb-10 leading-relaxed animate-slide-up">
          Nestora represents the world’s most secluded private sanctuaries, ultra-luxury 
          estates, and trophy architectural assets across iconic global enclaves.
        </p>

        {/* Floating Glassmorphic Search & Filter Bar */}
        <div className="w-full max-w-4xl mb-10">
          <SearchFilterBar 
            filters={filters}
            setFilters={setFilters}
            onResetFilters={onResetFilters}
            resultCount={resultCount}
          />
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-xs text-zinc-400 tracking-wide">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-gold-primary" />
            <span>100% Discreet & Verified Deeds</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
          <div className="flex items-center gap-2">
            <Globe size={15} className="text-gold-primary" />
            <span>Global Private Office Concierge</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-primary shadow-sm shadow-gold-primary"></span>
            <span>$4.8B+ Closed Prime Transactions</span>
          </div>
        </div>
      </div>
    </section>
  );
}
