import React from 'react';
import { EyeOff, Compass, KeyRound, Sparkles, ArrowRight } from 'lucide-react';

export default function ConciergeSection({ onOpenConsultation }) {
  const pillars = [
    {
      icon: <EyeOff size={24} className="text-gold" />,
      title: "Off-Market Shadow Inventory",
      description: "Over 40% of our most significant transactions never reach public marketing channels. We provide vetted access to discreet generational estates."
    },
    {
      icon: <Compass size={24} className="text-gold" />,
      title: "Architectural Curation",
      description: "From mid-century masterworks to contemporary bioclimatic monoliths, our curatorial team vets every residence for design provenance."
    },
    {
      icon: <KeyRound size={24} className="text-gold" />,
      title: "Turnkey Relocation Concierge",
      description: "Direct liaison for private aviation clearances, art transport curation, custom security integrations, and staff recruitment."
    }
  ];

  return (
    <section id="concierge" className="concierge-section">
      <div className="concierge-container glass-panel-gold">
        <div className="concierge-header">
          <span className="section-eyebrow">BESPOKE CLIENT SERVICES</span>
          <h2 className="concierge-title">
            The Nestora <span className="gold-text">Private Office</span>
          </h2>
          <p className="concierge-subtitle">
            Tailored representation for sovereign wealth entities, family offices, and architectural connoisseurs seeking discretion and singular residences.
          </p>
        </div>

        <div className="concierge-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card glass-panel">
              <div className="pillar-icon-wrap">
                {pillar.icon}
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="concierge-cta-bar">
          <div className="concierge-cta-text">
            <h4>Seeking an off-market or unlisted trophy residence?</h4>
            <p>Connect confidentially with our Senior Managing Partners worldwide.</p>
          </div>
          <button 
            type="button" 
            onClick={onOpenConsultation}
            className="btn-gold-consultation-large"
          >
            <span>Request Private Counsel</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
