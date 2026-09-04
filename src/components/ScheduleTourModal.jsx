import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, ShieldCheck, User, Mail, Phone } from 'lucide-react';

export default function ScheduleTourModal({ property, onClose }) {
  const [tourType, setTourType] = useState('in-person');
  const [selectedDate, setSelectedDate] = useState('2026-09-12');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="schedule-modal-container glass-panel animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <Calendar size={18} className="text-gold mr-2" />
            <span>Schedule Private Showing</span>
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
            <h3 className="success-title">Showing Request Confirmed</h3>
            <p className="success-subtitle">
              Thank you, <strong>{clientName || 'Distinguished Guest'}</strong>. 
              Our Private Office concierge will contact you discreetly within 2 hours 
              to coordinate security clearances and private access details.
            </p>
            <div className="booking-summary-card glass-panel-gold">
              <div className="summary-row">
                <span className="summary-label">Estate:</span>
                <span className="summary-val">{property?.title || 'Nestora Estate'}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Format:</span>
                <span className="summary-val">
                  {tourType === 'in-person' ? 'In-Person Chaperoned Walkthrough' : 'Private 4K Live Broadcast'}
                </span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Date & Time:</span>
                <span className="summary-val">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Lead Advisor:</span>
                <span className="summary-val">{property?.agent?.name || 'Senior Partner'}</span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-gold-full mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="schedule-tour-form">
            {/* Property Summary Pill */}
            {property && (
              <div className="tour-property-banner glass-panel-gold">
                <img src={property.images[0]} alt={property.title} className="tour-property-thumb" />
                <div>
                  <h4 className="tour-prop-title">{property.title}</h4>
                  <p className="tour-prop-loc">{property.location}</p>
                </div>
              </div>
            )}

            {/* Tour Type Toggle */}
            <div className="form-group">
              <label className="form-label">Consultation Format</label>
              <div className="tour-format-toggle">
                <button
                  type="button"
                  className={`format-toggle-btn ${tourType === 'in-person' ? 'active' : ''}`}
                  onClick={() => setTourType('in-person')}
                >
                  In-Person Private Showing
                </button>
                <button
                  type="button"
                  className={`format-toggle-btn ${tourType === 'virtual' ? 'active' : ''}`}
                  onClick={() => setTourType('virtual')}
                >
                  Live 4K Virtual Walkthrough
                </button>
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={14} className="text-gold" />
                  <span>Preferred Date</span>
                </label>
                <input 
                  type="date" 
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock size={14} className="text-gold" />
                  <span>Preferred Time</span>
                </label>
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="form-select"
                >
                  <option value="10:00 AM">10:00 AM (Morning Natural Light)</option>
                  <option value="14:00">2:00 PM (Afternoon Viewing)</option>
                  <option value="17:30">5:30 PM (Golden Hour / Sunset)</option>
                  <option value="19:30">7:30 PM (Evening Ambient Illumination)</option>
                </select>
              </div>
            </div>

            {/* Guest Identity Details */}
            <div className="form-group">
              <label className="form-label">
                <User size={14} className="text-gold" />
                <span>Full Name</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Lord Alistair Montgomery"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
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
                  placeholder="name@organization.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={14} className="text-gold" />
                  <span>Direct Contact Phone</span>
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Special Accommodations / NDA Requirements</label>
              <textarea 
                rows="2"
                placeholder="Security team clearance, private helipad arrival, translation requirements..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="form-textarea"
              ></textarea>
            </div>

            <div className="discreet-notice">
              <ShieldCheck size={16} className="text-gold mr-2 flex-shrink-0" />
              <span>Strict non-disclosure confidentiality guaranteed for all prospective purchasers.</span>
            </div>

            <button type="submit" className="btn-gold-submit">
              Request Private Tour Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
