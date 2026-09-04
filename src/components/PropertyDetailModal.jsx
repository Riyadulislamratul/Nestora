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
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="detail-modal-container glass-panel animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="modal-header-bar">
          <div className="modal-header-location">
            <MapPin size={16} className="text-gold" />
            <span>{property.address}</span>
          </div>

          <div className="modal-header-actions">
            <button 
              type="button" 
              onClick={handleShare} 
              className="modal-action-btn"
              title="Copy property link"
            >
              <Share2 size={18} />
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button 
              type="button" 
              onClick={() => onToggleSave(property.id)} 
              className={`modal-action-btn ${isSaved ? 'saved' : ''}`}
              title={isSaved ? "Saved" : "Save Property"}
            >
              <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button 
              type="button" 
              onClick={onClose} 
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="detail-modal-scroll">
          {/* Main Gallery Showcase */}
          <div className="modal-gallery-wrapper">
            <div className="modal-main-image-container">
              <img 
                src={property.images[activeImageIndex]} 
                alt={`${property.title} view ${activeImageIndex + 1}`}
                className="modal-main-image"
              />
              <div className="gallery-counter-badge">
                {activeImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="modal-thumbnail-strip">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`thumbnail-btn ${activeImageIndex === idx ? 'active' : ''}`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Core Info Layout Grid */}
          <div className="detail-grid-layout">
            {/* Left Column: Story, Specs, Amenities */}
            <div className="detail-left-column">
              <div className="estate-headline-block">
                <span className="badge-pill badge-gold mb-2">{property.badge}</span>
                <h2 className="estate-title">{property.title}</h2>
                <p className="estate-subtitle">{property.subtitle}</p>
              </div>

              {/* Specs Cards Grid */}
              <div className="detail-specs-grid">
                <div className="spec-box">
                  <Bed size={20} className="spec-box-icon" />
                  <span className="spec-box-val">{property.bedrooms}</span>
                  <span className="spec-box-label">Bedrooms</span>
                </div>
                <div className="spec-box">
                  <Bath size={20} className="spec-box-icon" />
                  <span className="spec-box-val">{property.bathrooms}</span>
                  <span className="spec-box-label">Bathrooms</span>
                </div>
                <div className="spec-box">
                  <Maximize2 size={20} className="spec-box-icon" />
                  <span className="spec-box-val">{property.sqft.toLocaleString()}</span>
                  <span className="spec-box-label">Interior Sq Ft</span>
                </div>
                <div className="spec-box">
                  <Sparkles size={20} className="spec-box-icon" />
                  <span className="spec-box-val">{property.lotSize}</span>
                  <span className="spec-box-label">Grounds</span>
                </div>
                <div className="spec-box">
                  <Calendar size={20} className="spec-box-icon" />
                  <span className="spec-box-val">{property.yearBuilt}</span>
                  <span className="spec-box-label">Completed</span>
                </div>
                <div className="spec-box">
                  <Shield size={20} className="spec-box-icon" />
                  <span className="spec-box-val">{property.garage}</span>
                  <span className="spec-box-label">Motor Court</span>
                </div>
              </div>

              {/* Architectural Narrative */}
              <div className="detail-section-block">
                <h3 className="detail-heading">Architectural Overview</h3>
                <p className="detail-narrative-text">{property.description}</p>
              </div>

              {/* Curated Amenities */}
              <div className="detail-section-block">
                <h3 className="detail-heading">Private Amenities & Specifications</h3>
                <div className="amenities-grid">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="amenity-item">
                      <CheckCircle2 size={17} className="text-gold" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing, Private Tour CTA, Agent Contact */}
            <div className="detail-right-column">
              <div className="acquisition-sticky-card glass-panel-gold">
                <div className="card-pricing-header">
                  <span className="acquisition-label">
                    {property.status === 'For Rent' ? 'Offered For Lease' : 'Acquisition Price'}
                  </span>
                  <div className="modal-price-display">
                    {formattedPrice}
                    {property.status === 'For Rent' && <span className="text-muted text-sm"> /mo</span>}
                  </div>
                  <span className="verified-badge">
                    <CheckCircle2 size={13} /> Verified Deed & Private Title
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="modal-cta-group">
                  <button 
                    type="button" 
                    onClick={() => {
                      onClose();
                      onOpenScheduleTour(property);
                    }} 
                    className="btn-book-tour"
                  >
                    Schedule Private Showing
                  </button>

                  <button 
                    type="button" 
                    onClick={() => {
                      onClose();
                      onOpenMortgage(property);
                    }} 
                    className="btn-calc-financing"
                  >
                    <Calculator size={16} />
                    <span>Calculate Financing</span>
                  </button>
                </div>

                {/* Private Client Specialist Card */}
                <div className="agent-profile-card">
                  <div className="agent-avatar-wrap">
                    <img 
                      src={property.agent.avatar} 
                      alt={property.agent.name} 
                      className="agent-avatar"
                    />
                    <span className="agent-online-dot"></span>
                  </div>
                  <div className="agent-info">
                    <h4 className="agent-name">{property.agent.name}</h4>
                    <p className="agent-role">{property.agent.title}</p>
                  </div>
                </div>

                <div className="agent-contact-actions">
                  <a href={`tel:${property.agent.phone}`} className="agent-contact-btn">
                    <Phone size={15} />
                    <span>{property.agent.phone}</span>
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="agent-contact-btn">
                    <Mail size={15} />
                    <span>Private Email</span>
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
