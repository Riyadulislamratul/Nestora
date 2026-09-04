import React, { useState, useEffect } from 'react';
import { Bookmark, Compass, PhoneCall, Calculator, Menu, X } from 'lucide-react';

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
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" aria-label="Nestora Luxury Real Estate">
          <span className="brand-mark">N</span>
          <div className="brand-text-group">
            <span className="brand-name">NESTORA</span>
            <span className="brand-tagline">PRIVATE ESTATES</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <a href="#featured-listings" className="nav-link">Properties</a>
          <a href="#concierge" className="nav-link">Private Office</a>
          <a href="#stats" className="nav-link">Market Intelligence</a>
          <button 
            onClick={onOpenMortgage} 
            className="nav-link nav-btn-inline"
            title="Open Financing Calculator"
          >
            <Calculator size={15} className="text-gold" />
            <span>Financing</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Wishlist / Saved Homes */}
          <button 
            onClick={onOpenWishlist} 
            className="action-icon-btn" 
            title="View Saved Residences"
            aria-label="View Saved Residences"
          >
            <Bookmark size={19} />
            {savedCount > 0 && (
              <span className="badge-counter">{savedCount}</span>
            )}
          </button>

          {/* Consultation CTA */}
          <button 
            onClick={onOpenConsultation}
            className="btn-gold-consultation"
          >
            <PhoneCall size={15} />
            <span>Inquire</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button 
            className="mobile-menu-trigger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass-panel animate-fade-in">
          <a 
            href="#featured-listings" 
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link"
          >
            Curated Properties
          </a>
          <a 
            href="#concierge" 
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link"
          >
            Private Concierge
          </a>
          <a 
            href="#stats" 
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link"
          >
            Market Intelligence
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenMortgage(); }}
            className="mobile-nav-link text-left"
          >
            <Calculator size={16} className="text-gold mr-2" />
            Mortgage Calculator
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
            className="mobile-cta-btn"
          >
            Schedule Private Consultation
          </button>
        </div>
      )}
    </header>
  );
}
