import React from 'react';
import { EyeOff, Compass, KeyRound, ArrowRight } from 'lucide-react';

export default function ConciergeSection({ onOpenConsultation }) {
  const pillars = [
    {
      icon: <EyeOff size={22} className="text-gold-primary" />,
      title: "Off-Market Shadow Inventory",
      description: "Over 40% of our most significant transactions never reach public marketing channels. We provide vetted access to discreet generational estates."
    },
    {
      icon: <Compass size={22} className="text-gold-primary" />,
      title: "Architectural Curation",
      description: "From mid-century masterworks to contemporary bioclimatic monoliths, our curatorial team vets every residence for design provenance."
    },
    {
      icon: <KeyRound size={22} className="text-gold-primary" />,
      title: "Turnkey Relocation Concierge",
      description: "Direct liaison for private aviation clearances, art transport curation, custom security integrations, and staff recruitment."
    }
  ];

  return (
    <section id="concierge" className="py-10 sm:py-14">
      <div className="p-6 sm:p-12 rounded-3xl glass-panel-gold border border-gold-primary/30 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] tracking-[0.22em] text-gold-primary font-bold uppercase block mb-1.5">
            BESPOKE CLIENT SERVICES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium mb-3">
            The Nestora <span className="gold-text">Private Office</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Tailored representation for sovereign wealth entities, family offices, and architectural connoisseurs seeking discretion and singular residences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-gold-primary/40 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-lg text-white font-semibold mb-2">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-black/50 border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base sm:text-lg text-white font-semibold mb-1">
              Seeking an off-market or unlisted trophy residence?
            </h4>
            <p className="text-xs text-zinc-400">Connect confidentially with our Senior Managing Partners worldwide.</p>
          </div>
          <button 
            type="button" 
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-[#07080a] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md shadow-gold-primary/30 hover:brightness-110 transition-all cursor-pointer"
          >
            <span>Request Private Counsel</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
