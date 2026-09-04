import React, { useState, useEffect } from 'react';
import { Bookmark, Calculator, PhoneCall, Menu, X } from 'lucide-react';

export default function Navbar({ 
  savedCount, 
  onOpenWishlist, 
  onOpenMortgage,
  onOpenConsultation 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0a0c11]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl' 
        : 'bg-gradient-to-b from-[#07080a]/90 to-transparent py-5 sm:py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3.5 group cursor-pointer" aria-label="Nestora Luxury Real Estate">
          <span className="w-9 h-9 rounded-lg gold-gradient text-[#07080a] flex items-center justify-center font-serif font-bold text-xl shadow-lg shadow-gold-primary/20 transition-transform group-hover:scale-105">
            N
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-semibold tracking-widest text-white leading-none">
              NESTORA
            </span>
            <span className="text-[9px] tracking-[0.26em] text-gold-primary font-semibold mt-0.5">
              PRIVATE ESTATES
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#featured-listings" className="text-xs uppercase tracking-widest text-zinc-300 hover:text-gold-primary transition-colors font-medium">
            Properties
          </a>
          <a href="#concierge" className="text-xs uppercase tracking-widest text-zinc-300 hover:text-gold-primary transition-colors font-medium">
            Private Office
          </a>
          <a href="#stats" className="text-xs uppercase tracking-widest text-zinc-300 hover:text-gold-primary transition-colors font-medium">
            Market Intelligence
          </a>
          <button 
            type="button"
            onClick={onOpenMortgage} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-gold-primary/50 hover:bg-gold-primary/10 text-xs uppercase tracking-wider text-zinc-300 hover:text-gold-primary transition-all cursor-pointer"
            title="Open Financing Calculator"
          >
            <Calculator size={14} className="text-gold-primary" />
            <span>Financing</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Wishlist / Saved Homes */}
          <button 
            type="button"
            onClick={onOpenWishlist} 
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/5 border border-white/10 hover:border-gold-primary/50 hover:bg-gold-primary/15 hover:text-gold-primary transition-all cursor-pointer" 
            title="View Saved Residences"
            aria-label="View Saved Residences"
          >
            <Bookmark size={18} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-primary text-[#07080a] text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md shadow-gold-primary/60">
                {savedCount}
              </span>
            )}
          </button>

          {/* Consultation CTA */}
          <button 
            type="button"
            onClick={onOpenConsultation}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 gold-gradient text-[#0a0c10] text-xs font-bold uppercase tracking-wider rounded-md hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-md shadow-gold-primary/25 cursor-pointer"
          >
            <PhoneCall size={14} />
            <span>Inquire</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button 
            type="button"
            className="md:hidden p-2 text-zinc-300 hover:text-white cursor-pointer" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-4 mt-3 p-5 rounded-xl glass-panel flex flex-col gap-3 shadow-2xl animate-fade-in border border-white/10">
          <a 
            href="#featured-listings" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-wider text-zinc-200 py-2 border-b border-white/5 hover:text-gold-primary"
          >
            Curated Properties
          </a>
          <a 
            href="#concierge" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-wider text-zinc-200 py-2 border-b border-white/5 hover:text-gold-primary"
          >
            Private Concierge
          </a>
          <a 
            href="#stats" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-wider text-zinc-200 py-2 border-b border-white/5 hover:text-gold-primary"
          >
            Market Intelligence
          </a>
          <button 
            type="button"
            onClick={() => { setMobileMenuOpen(false); onOpenMortgage(); }}
            className="flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-200 py-2 text-left hover:text-gold-primary cursor-pointer"
          >
            <Calculator size={15} className="text-gold-primary" />
            Mortgage Calculator
          </button>
          <button 
            type="button"
            onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
            className="w-full py-3 gold-gradient text-[#07080a] text-xs font-bold uppercase tracking-wider rounded-lg text-center mt-2 shadow-lg shadow-gold-primary/20 cursor-pointer"
          >
            Schedule Private Consultation
          </button>
        </div>
      )}
    </header>
  );
}
