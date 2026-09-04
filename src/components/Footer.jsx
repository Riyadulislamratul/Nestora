import React, { useState } from 'react';
import { Mail, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

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
    <footer className="luxury-footer">
      <div className="footer-top-container">
        <div className="footer-brand-col">
          <div className="brand-logo mb-4">
            <span className="brand-mark">N</span>
            <div className="brand-text-group">
              <span className="brand-name">NESTORA</span>
              <span className="brand-tagline">PRIVATE ESTATES</span>
            </div>
          </div>

          <p className="footer-brand-mission">
            Nestora is the premier international brokerage representing singular architectural 
            estates, historic palazzos, and modern penthouses for the world's most discerning individuals.
          </p>

          <div className="footer-newsletter-wrap">
            <span className="newsletter-title">The Nestora Gazette</span>
            <p className="newsletter-sub">Receive confidential notifications for newly vetted off-market inventory.</p>
            {subscribed ? (
              <div className="subscribed-msg">
                <CheckCircle2 size={16} className="text-gold" />
                <span>You have been added to our private register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  required
                  placeholder="Enter confidential email..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Global Hubs */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Global Private Hubs</h4>
          <ul className="footer-list">
            <li><strong>Beverly Hills</strong> &mdash; 9601 Wilshire Blvd, CA</li>
            <li><strong>Manhattan</strong> &mdash; 590 Madison Ave, NY</li>
            <li><strong>Mayfair London</strong> &mdash; 14 Berkeley Square, W1J</li>
            <li><strong>Milan</strong> &mdash; Via Montenapoleone 8</li>
            <li><strong>Tokyo</strong> &mdash; Ginza Six, Chuo-ku</li>
            <li><strong>Lake Como</strong> &mdash; Villa d'Este Promenade</li>
          </ul>
        </div>

        {/* Portfolios */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Curated Portfolios</h4>
          <ul className="footer-list">
            <li><a href="#featured-listings">Penthouses & Sky Mansions</a></li>
            <li><a href="#featured-listings">Modern Architectural Villas</a></li>
            <li><a href="#featured-listings">Private Waterfront Compounds</a></li>
            <li><a href="#featured-listings">Alpine Ski-in / Ski-out Chalets</a></li>
            <li><a href="#featured-listings">Historic European Palazzos</a></li>
            <li><a href="#featured-listings">Private Islands & Vineyards</a></li>
          </ul>
        </div>

        {/* Private Office Services */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Bespoke Advisory</h4>
          <ul className="footer-list">
            <li><button onClick={onOpenConsultation} className="footer-link-btn">Off-Market Acquisitions</button></li>
            <li><button onClick={onOpenConsultation} className="footer-link-btn">Architectural Provenance Advisory</button></li>
            <li><button onClick={onOpenMortgage} className="footer-link-btn">Jumbo Financing Analytics</button></li>
            <li><button onClick={onOpenConsultation} className="footer-link-btn">Family Office Portfolio Audit</button></li>
            <li><button onClick={onOpenConsultation} className="footer-link-btn">Aviation & Yachting Liaison</button></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-container">
        <div className="footer-bottom-content">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} NESTORA PRIVATE ESTATES LLC. All Rights Reserved. Equal Housing Opportunity.
          </p>
          <div className="footer-legal-tags">
            <span>Discreet Fiduciary Brokerage</span>
            <span className="divider-dot">•</span>
            <span>Strict NDA Protocol</span>
            <span className="divider-dot">•</span>
            <span>Global Real Estate License #0192844</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
