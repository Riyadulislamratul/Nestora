import React from 'react';
import { Bed, Bath, Maximize2, MapPin, Bookmark, Calculator, ArrowUpRight } from 'lucide-react';

export default function PropertyCard({ 
  property, 
  isSaved, 
  onToggleSave, 
  onSelectProperty,
  onCalculateMortgage 
}) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.status === 'For Rent' && property.monthlyRent ? property.monthlyRent : property.price);

  return (
    <article className="group relative rounded-3xl overflow-hidden flex flex-col glass-card border border-white/15 hover:border-gold-primary/60 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
      {/* Image Container */}
      <div 
        className="relative aspect-[16/10] overflow-hidden cursor-pointer"
        onClick={() => onSelectProperty(property)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectProperty(property)}
        aria-label={`View details for ${property.title}`}
      >
        <img 
          src={property.images[0]} 
          alt={property.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-black/30"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
            property.badge === 'Exclusive' 
              ? 'glass-pill-gold text-gold-primary font-bold shadow-md shadow-gold-primary/30' 
              : 'glass-pill text-white'
          }`}>
            {property.badge}
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase glass-pill text-zinc-300">
            {property.status}
          </span>
        </div>

        {/* Wishlist Bookmark Button */}
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(property.id);
          }}
          className={`absolute top-3.5 right-3.5 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isSaved 
              ? 'bg-gold-primary text-[#07080a] border border-gold-primary shadow-lg shadow-gold-primary/60' 
              : 'glass-btn text-white hover:text-gold-primary'
          }`}
          aria-label={isSaved ? "Remove from saved properties" : "Save property"}
          title={isSaved ? "Remove from saved properties" : "Save to wishlist"}
        >
          <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
        </button>

        {/* Quick View Hover Hint */}
        <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 text-[11px] font-semibold text-white glass-pill px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
          <span>View Estate</span>
          <ArrowUpRight size={14} className="text-gold-primary" />
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Price & Actions Row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-xl sm:text-2xl font-semibold text-[#e2c057]">
              {formattedPrice}
            </span>
            {property.status === 'For Rent' && (
              <span className="text-xs text-zinc-400 font-sans">/mo</span>
            )}
          </div>

          <button 
            type="button" 
            onClick={() => onCalculateMortgage(property)}
            className="flex items-center gap-1.5 text-[11px] text-zinc-300 hover:text-gold-primary px-3 py-1 rounded-full glass-btn transition-all cursor-pointer"
            title="Calculate estimated monthly mortgage"
          >
            <Calculator size={13} className="text-gold-primary" />
            <span>Financing</span>
          </button>
        </div>

        {/* Title and Address */}
        <h3 
          className="font-serif text-lg font-semibold text-white hover:text-gold-primary transition-colors cursor-pointer line-clamp-1 mb-1.5" 
          onClick={() => onSelectProperty(property)}
        >
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2.5">
          <MapPin size={13} className="text-gold-primary shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {property.subtitle}
        </p>

        {/* Specs Bar: Bed, Bath, Sqft with Glass Styling */}
        <div className="mt-auto pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
          <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
            <Bed size={14} className="text-gold-primary" />
            <span><strong>{property.bedrooms}</strong> Beds</span>
          </div>
          <div className="w-px h-3.5 bg-white/10"></div>
          <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
            <Bath size={14} className="text-gold-primary" />
            <span><strong>{property.bathrooms}</strong> Baths</span>
          </div>
          <div className="w-px h-3.5 bg-white/10"></div>
          <div className="flex items-center gap-1.5" title={`${property.sqft.toLocaleString()} Square Feet`}>
            <Maximize2 size={14} className="text-gold-primary" />
            <span><strong>{property.sqft.toLocaleString()}</strong> sqft</span>
          </div>
        </div>
      </div>
    </article>
  );
}
