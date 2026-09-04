import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer({ onOpenConsultation, onOpenMortgage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#040507] border-t border-white/10 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg gold-gradient text-[#07080a] flex items-center justify-center font-serif font-bold text-lg">
              N
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-widest text-white leading-none">
                NESTORA
              </span>
              <span className="text-[8px] tracking-[0.26em] text-gold-primary font-semibold mt-0.5">
                PRIVATE ESTATES
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
            Nestora is the premier international brokerage representing singular architectural 
            estates, historic palazzos, and modern penthouses for the world's most discerning individuals.
          </p>

          <div className="mt-2">
            <span className="font-serif text-sm font-semibold text-white block mb-1">The Nestora Gazette</span>
            <p className="text-xs text-zinc-400 mb-3">Receive confidential notifications for newly vetted off-market inventory.</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-gold-primary">
                <CheckCircle2 size={15} />
                <span>You have been added to our private register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-xs">
                <input 
                  type="email" 
                  required
                  placeholder="Enter confidential email..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-white/5 border border-white/10 rounded-l-md text-white text-xs outline-none focus:border-gold-primary transition-colors placeholder:text-zinc-500"
                />
                <button type="submit" className="px-4 gold-gradient text-[#07080a] rounded-r-md flex items-center justify-center cursor-pointer hover:brightness-110" aria-label="Subscribe">
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Global Hubs */}
        <div>
          <h4 className="font-serif text-sm font-semibold text-white mb-4 uppercase tracking-wider">Global Hubs</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
            <li><strong className="text-zinc-200">Beverly Hills</strong> &mdash; 9601 Wilshire Blvd</li>
            <li><strong className="text-zinc-200">Manhattan</strong> &mdash; 590 Madison Ave</li>
            <li><strong className="text-zinc-200">Mayfair</strong> &mdash; 14 Berkeley Square</li>
            <li><strong className="text-zinc-200">Milan</strong> &mdash; Via Montenapoleone 8</li>
            <li><strong className="text-zinc-200">Tokyo</strong> &mdash; Ginza Six, Chuo-ku</li>
            <li><strong className="text-zinc-200">Como</strong> &mdash; Villa d'Este Promenade</li>
          </ul>
        </div>

        {/* Portfolios */}
        <div>
          <h4 className="font-serif text-sm font-semibold text-white mb-4 uppercase tracking-wider">Portfolios</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
            <li><a href="#featured-listings" className="hover:text-gold-primary transition-colors">Penthouses & Sky Mansions</a></li>
            <li><a href="#featured-listings" className="hover:text-gold-primary transition-colors">Modern Architectural Villas</a></li>
            <li><a href="#featured-listings" className="hover:text-gold-primary transition-colors">Private Waterfront Compounds</a></li>
            <li><a href="#featured-listings" className="hover:text-gold-primary transition-colors">Alpine Ski-in / Ski-out</a></li>
            <li><a href="#featured-listings" className="hover:text-gold-primary transition-colors">Historic European Palazzos</a></li>
            <li><a href="#featured-listings" className="hover:text-gold-primary transition-colors">Private Islands & Vineyards</a></li>
          </ul>
        </div>

        {/* Private Office Services */}
        <div>
          <h4 className="font-serif text-sm font-semibold text-white mb-4 uppercase tracking-wider">Bespoke Advisory</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
            <li><button onClick={onOpenConsultation} className="hover:text-gold-primary transition-colors text-left cursor-pointer">Off-Market Acquisitions</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-gold-primary transition-colors text-left cursor-pointer">Architectural Provenance</button></li>
            <li><button onClick={onOpenMortgage} className="hover:text-gold-primary transition-colors text-left cursor-pointer">Jumbo Financing Analytics</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-gold-primary transition-colors text-left cursor-pointer">Family Office Portfolio Audit</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-gold-primary transition-colors text-left cursor-pointer">Aviation & Yachting Liaison</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-500">
        <p>&copy; {new Date().getFullYear()} NESTORA PRIVATE ESTATES LLC. All Rights Reserved. Equal Housing Opportunity.</p>
        <div className="flex items-center gap-3">
          <span>Discreet Fiduciary Brokerage</span>
          <span>•</span>
          <span>Strict NDA Protocol</span>
          <span>•</span>
          <span>License #0192844</span>
        </div>
      </div>
    </footer>
  );
}
