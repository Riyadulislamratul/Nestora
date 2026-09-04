import React, { useState, useEffect } from 'react';
import { 
  X, Bed, Bath, Maximize2, Calendar, Shield, Bookmark, 
  Share2, Calculator, Sparkles, MapPin, CheckCircle2, Phone, Mail 
} from 'lucide-react';

export default function PropertyDetailModal({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onOpenScheduleTour,
  onOpenMortgage
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Lock body scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!property) return null;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.status === 'For Rent' && property.monthlyRent ? property.monthlyRent : property.price);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in" onClick={onClose}>
      <div 
        className="max-w-5xl w-full max-h-[92vh] rounded-2xl glass-panel border border-gold-primary/30 shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0a0c11]/90">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
            <MapPin size={15} className="text-gold-primary shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              type="button" 
              onClick={handleShare} 
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-gold-primary px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-gold-primary/40 transition-all cursor-pointer"
              title="Copy property link"
            >
              <Share2 size={15} />
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button 
              type="button" 
              onClick={() => onToggleSave(property.id)} 
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-gold-primary/20 border-gold-primary text-gold-primary' 
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:text-gold-primary hover:border-gold-primary/40'
              }`}
              title={isSaved ? "Saved" : "Save Property"}
            >
              <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button 
              type="button" 
              onClick={onClose} 
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Main Gallery Showcase */}
          <div>
            <div className="relative w-full aspect-[16/9] max-h-[460px] rounded-xl overflow-hidden mb-3">
              <img 
                src={property.images[activeImageIndex]} 
                alt={`${property.title} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx 
                      ? 'border-gold-primary shadow-sm shadow-gold-primary/50' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Core Info Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column: Story, Specs, Amenities */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase gold-gradient text-[#07080a] mb-2">
                  {property.badge}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-1.5">{property.title}</h2>
                <p className="text-sm text-zinc-400">{property.subtitle}</p>
              </div>

              {/* Specs Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <Bed size={18} className="text-gold-primary mb-0.5" />
                  <span className="text-base font-bold text-white">{property.bedrooms}</span>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400">Bedrooms</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <Bath size={18} className="text-gold-primary mb-0.5" />
                  <span className="text-base font-bold text-white">{property.bathrooms}</span>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400">Bathrooms</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <Maximize2 size={18} className="text-gold-primary mb-0.5" />
                  <span className="text-base font-bold text-white">{property.sqft.toLocaleString()}</span>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400">Interior Sq Ft</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <Sparkles size={18} className="text-gold-primary mb-0.5" />
                  <span className="text-base font-bold text-white">{property.lotSize}</span>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400">Grounds</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <Calendar size={18} className="text-gold-primary mb-0.5" />
                  <span className="text-base font-bold text-white">{property.yearBuilt}</span>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400">Completed</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <Shield size={18} className="text-gold-primary mb-0.5" />
                  <span className="text-base font-bold text-white">{property.garage}</span>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400">Motor Court</span>
                </div>
              </div>

              {/* Architectural Narrative */}
              <div>
                <h3 className="font-serif text-lg text-white mb-3 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gold-primary">
                  Architectural Overview
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">{property.description}</p>
              </div>

              {/* Curated Amenities */}
              <div>
                <h3 className="font-serif text-lg text-white mb-3 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gold-primary">
                  Private Amenities & Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 size={16} className="text-gold-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing, Private Tour CTA, Agent Contact */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl glass-panel-gold border border-gold-primary/30 sticky top-0 flex flex-col gap-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                    {property.status === 'For Rent' ? 'Offered For Lease' : 'Acquisition Price'}
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-semibold text-[#e2c057] mb-1.5">
                    {formattedPrice}
                    {property.status === 'For Rent' && <span className="text-xs text-zinc-400 font-sans"> /mo</span>}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 size={13} /> Verified Deed & Private Title
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <button 
                    type="button" 
                    onClick={() => {
                      onClose();
                      onOpenScheduleTour(property);
                    }} 
                    className="w-full py-3.5 gold-gradient text-[#07080a] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-md shadow-gold-primary/30 hover:brightness-110 transition-all cursor-pointer"
                  >
                    Schedule Private Showing
                  </button>

                  <button 
                    type="button" 
                    onClick={() => {
                      onClose();
                      onOpenMortgage(property);
                    }} 
                    className="w-full py-3 flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-gold-primary/40 text-xs sm:text-sm text-white font-semibold rounded-lg hover:text-gold-primary transition-all cursor-pointer"
                  >
                    <Calculator size={15} />
                    <span>Calculate Financing</span>
                  </button>
                </div>

                {/* Private Client Specialist Card */}
                <div className="flex items-center gap-3.5 p-3.5 bg-black/40 border border-white/10 rounded-xl">
                  <div className="relative">
                    <img 
                      src={property.agent.avatar} 
                      alt={property.agent.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold-primary/50"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{property.agent.name}</h4>
                    <p className="text-xs text-zinc-400">{property.agent.title}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <a href={`tel:${property.agent.phone}`} className="flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-primary hover:border-gold-primary/40 transition-all">
                    <Phone size={13} />
                    <span className="truncate">Call</span>
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 hover:text-gold-primary hover:border-gold-primary/40 transition-all">
                    <Mail size={13} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
