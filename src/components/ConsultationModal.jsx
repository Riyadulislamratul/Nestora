import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle, PhoneCall, Building2, User, Mail, Phone } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budgetTier, setBudgetTier] = useState('$20M - $40M');
  const [locationPreference, setLocationPreference] = useState('Los Angeles / California Coast');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="consultation-modal-container glass-panel animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <PhoneCall size={18} className="text-gold mr-2" />
            <span>Private Office Confidential Inquiry</span>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="modal-close-btn"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="tour-success-state animate-fade-in">
            <div className="success-icon-wrap">
              <CheckCircle size={48} className="text-gold" />
            </div>
            <h3 className="success-title">Inquiry Registered Confidentially</h3>
            <p className="success-subtitle">
              Thank you, <strong>{name}</strong>. A Senior Managing Partner from our Private Office 
              will initiate contact through your encrypted or chosen channel within 2 hours.
            </p>
            <div className="booking-summary-card glass-panel-gold">
              <div className="summary-row">
                <span className="summary-label">Target Allocation:</span>
                <span className="summary-val">{budgetTier}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Preferred Enclave:</span>
                <span className="summary-val">{locationPreference}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Client Code:</span>
                <span className="summary-val">NST-PRV-{(Math.random()*90000 + 10000).toFixed(0)}</span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-gold-full mt-4"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="schedule-tour-form">
            <p className="consultation-intro-text">
              Direct access to our senior partners for off-market acquisitions, sovereign portfolio 
              divestitures, and private architectural commissions.
            </p>

            <div className="form-group">
              <label className="form-label">
                <User size={14} className="text-gold" />
                <span>Client Name or Representative</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="Lord / Lady / Dr. / Ambassador"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">
                  <Mail size={14} className="text-gold" />
                  <span>Confidential Email</span>
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="advisor@familyoffice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={14} className="text-gold" />
                  <span>Direct Signal / Mobile</span>
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">
                  <Building2 size={14} className="text-gold" />
                  <span>Target Region</span>
                </label>
                <select 
                  value={locationPreference}
                  onChange={(e) => setLocationPreference(e.target.value)}
                  className="form-select"
                >
                  <option value="Los Angeles / California Coast">Los Angeles / California Coast</option>
                  <option value="Manhattan & Hamptons">Manhattan & Hamptons</option>
                  <option value="Miami & Palm Beach Waterfront">Miami & Palm Beach Waterfront</option>
                  <option value="Aspen & Rocky Mountains">Aspen & Rocky Mountains</option>
                  <option value="London & UK Country Estates">London & UK Country Estates</option>
                  <option value="French Riviera & Lake Como">French Riviera & Lake Como</option>
                  <option value="Tokyo & Kyoto Heritage">Tokyo & Kyoto Heritage</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Capital Allocation Tier</label>
                <select 
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="form-select"
                >
                  <option value="$10M - $20M">$10M - $20M</option>
                  <option value="$20M - $40M">$20M - $40M</option>
                  <option value="$40M - $75M">$40M - $75M</option>
                  <option value="$75M+ Trophy Assets">$75M+ Trophy Assets</option>
                </select>
              </div>
            </div>

            <div className="discreet-notice">
              <ShieldCheck size={16} className="text-gold mr-2 flex-shrink-0" />
              <span>Strict fiduciary confidentiality. All communications are end-to-end encrypted.</span>
            </div>

            <button type="submit" className="btn-gold-submit">
              Initiate Discreet Advisory Connection
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
