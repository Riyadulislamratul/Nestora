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
    <article className="property-card glass-panel group">
      {/* Image Container */}
      <div 
        className="card-media-wrapper"
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
          className="card-image"
        />
        <div className="card-gradient-overlay"></div>

        {/* Top Badges */}
        <div className="card-top-tags">
          <span className={`badge-pill ${property.badge === 'Exclusive' ? 'badge-gold' : 'badge-dark'}`}>
            {property.badge}
          </span>
          <span className="badge-pill badge-status">
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
          className={`card-bookmark-btn ${isSaved ? 'saved' : ''}`}
          aria-label={isSaved ? "Remove from saved properties" : "Save property"}
          title={isSaved ? "Remove from saved properties" : "Save to wishlist"}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>

        {/* Quick View Hover Hint */}
        <div className="card-hover-hint">
          <span>View Estate Details</span>
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Card Content Details */}
      <div className="card-body">
        {/* Price & Actions Row */}
        <div className="card-price-row">
          <div className="price-tag">
            <span className="price-value">{formattedPrice}</span>
            {property.status === 'For Rent' && (
              <span className="price-period">/ month</span>
            )}
          </div>

          <button 
            type="button" 
            onClick={() => onCalculateMortgage(property)}
            className="calc-shortcut-btn"
            title="Calculate estimated monthly mortgage"
          >
            <Calculator size={15} />
            <span>Financing</span>
          </button>
        </div>

        {/* Title and Address */}
        <h3 
          className="card-title" 
          onClick={() => onSelectProperty(property)}
        >
          {property.title}
        </h3>

        <div className="card-location">
          <MapPin size={14} className="location-icon" />
          <span>{property.location}</span>
        </div>

        <p className="card-excerpt">
          {property.subtitle}
        </p>

        {/* Specs Bar: Bed, Bath, Sqft */}
        <div className="card-specs-bar">
          <div className="spec-item" title={`${property.bedrooms} Bedrooms`}>
            <Bed size={15} className="spec-icon" />
            <span><strong>{property.bedrooms}</strong> Beds</span>
          </div>
          <div className="spec-divider"></div>
          <div className="spec-item" title={`${property.bathrooms} Bathrooms`}>
            <Bath size={15} className="spec-icon" />
            <span><strong>{property.bathrooms}</strong> Baths</span>
          </div>
          <div className="spec-divider"></div>
          <div className="spec-item" title={`${property.sqft.toLocaleString()} Square Feet`}>
            <Maximize2 size={15} className="spec-icon" />
            <span><strong>{property.sqft.toLocaleString()}</strong> sqft</span>
          </div>
        </div>
      </div>
    </article>
  );
}
