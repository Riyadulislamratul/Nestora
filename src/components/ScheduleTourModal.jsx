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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in" onClick={onClose}>
      <div 
        className="max-w-xl w-full rounded-2xl glass-panel border border-gold-primary/30 shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0a0c11]/90">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Calendar size={16} className="text-gold-primary" />
            <span>Schedule Private Showing</span>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center animate-fade-in">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-primary/20 border border-gold-primary/40 flex items-center justify-center">
              <CheckCircle size={32} className="text-gold-primary" />
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">Showing Request Confirmed</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              Thank you, <strong>{clientName || 'Distinguished Guest'}</strong>. 
              Our Private Office concierge will contact you discreetly within 2 hours 
              to coordinate security clearances and private access details.
            </p>
            <div className="p-4 rounded-xl glass-panel-gold border border-gold-primary/30 text-left flex flex-col gap-2.5 text-xs sm:text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-zinc-400">Estate:</span>
                <span className="text-white font-semibold">{property?.title || 'Nestora Estate'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Format:</span>
                <span className="text-white font-semibold">
                  {tourType === 'in-person' ? 'In-Person Chaperoned Walkthrough' : 'Private 4K Live Broadcast'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Date & Time:</span>
                <span className="text-white font-semibold">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Lead Advisor:</span>
                <span className="text-white font-semibold">{property?.agent?.name || 'Senior Partner'}</span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={onClose} 
              className="w-full py-3 gold-gradient text-[#07080a] text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer hover:brightness-110"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 flex flex-col gap-4">
            {/* Property Summary Pill */}
            {property && (
              <div className="flex items-center gap-3.5 p-3 rounded-xl glass-panel-gold border border-gold-primary/30">
                <img src={property.images[0]} alt={property.title} className="w-16 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{property.title}</h4>
                  <p className="text-xs text-zinc-400">{property.location}</p>
                </div>
              </div>
            )}

            {/* Tour Type Toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Consultation Format</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  className={`p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center ${
                    tourType === 'in-person' 
                      ? 'bg-gold-primary/20 border-gold-primary text-gold-primary' 
                      : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  onClick={() => setTourType('in-person')}
                >
                  In-Person Private Showing
                </button>
                <button
                  type="button"
                  className={`p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center ${
                    tourType === 'virtual' 
                      ? 'bg-gold-primary/20 border-gold-primary text-gold-primary' 
                      : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  onClick={() => setTourType('virtual')}
                >
                  Live 4K Virtual Walkthrough
                </button>
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <Calendar size={13} className="text-gold-primary" />
                  <span>Preferred Date</span>
                </label>
                <input 
                  type="date" 
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <Clock size={13} className="text-gold-primary" />
                  <span>Preferred Time</span>
                </label>
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors cursor-pointer"
                >
                  <option value="10:00 AM" className="bg-[#11131a]">10:00 AM (Morning Light)</option>
                  <option value="14:00" className="bg-[#11131a]">2:00 PM (Afternoon)</option>
                  <option value="17:30" className="bg-[#11131a]">5:30 PM (Golden Hour)</option>
                  <option value="19:30" className="bg-[#11131a]">7:30 PM (Evening)</option>
                </select>
              </div>
            </div>

            {/* Guest Identity Details */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <User size={13} className="text-gold-primary" />
                <span>Full Name</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Lord Alistair Montgomery"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors placeholder:text-zinc-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <Mail size={13} className="text-gold-primary" />
                  <span>Confidential Email</span>
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="name@organization.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors placeholder:text-zinc-600"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <Phone size={13} className="text-gold-primary" />
                  <span>Direct Contact Phone</span>
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Special Requests / NDA Protocol</label>
              <textarea 
                rows="2"
                placeholder="Security team clearance, helipad arrival, translation..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors placeholder:text-zinc-600 resize-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-2.5 bg-gold-primary/10 border border-gold-primary/30 rounded-lg p-3 text-xs text-gold-light">
              <ShieldCheck size={16} className="text-gold-primary shrink-0" />
              <span>Strict non-disclosure confidentiality guaranteed for all prospective purchasers.</span>
            </div>

            <button type="submit" className="w-full py-3.5 gold-gradient text-[#07080a] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md shadow-gold-primary/30 hover:brightness-110 transition-all cursor-pointer">
              Request Private Tour Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
