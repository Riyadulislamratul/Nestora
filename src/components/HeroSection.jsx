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
    <section className="hero-section">
      {/* Background with dark overlay & subtle gold illumination */}
      <div className="hero-background-wrapper">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85" 
          alt="Luxury architectural residence"
          className="hero-bg-image"
        />
        <div className="hero-overlay-radial"></div>
        <div className="hero-overlay-gradient"></div>
      </div>

      <div className="hero-content-container">
        {/* Editorial Subtitle Badge */}
        <div className="hero-curated-badge animate-fade-in">
          <Sparkles size={14} className="badge-sparkle" />
          <span>Curated Architectural Masterpieces & Penthouses</span>
        </div>

        {/* Grand Headline */}
        <h1 className="hero-title animate-slide-up">
          Exceptional Homes <br />
          <span className="gold-text">for Extraordinary Lives</span>
        </h1>

        {/* Narrative Description */}
        <p className="hero-description animate-slide-up">
          Nestora represents the world’s most secluded private sanctuaries, ultra-luxury 
          estates, and trophy architectural assets across iconic global enclaves.
        </p>

        {/* Floating Glassmorphic Search & Filter Bar */}
        <div className="hero-search-wrapper">
          <SearchFilterBar 
            filters={filters}
            setFilters={setFilters}
            onResetFilters={onResetFilters}
            resultCount={resultCount}
          />
        </div>

        {/* Trust Badges */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <ShieldCheck size={16} className="text-gold" />
            <span>100% Discreet & Verified Listings</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <Globe size={16} className="text-gold" />
            <span>Global Private Office Concierge</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <span className="dot-gold"></span>
            <span>$4.8B+ Closed Prime Transactions</span>
          </div>
        </div>
      </div>
    </section>
  );
}
