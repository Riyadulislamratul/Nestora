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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in" onClick={onClose}>
      <div 
        className="max-w-xl w-full rounded-3xl glass-panel-gold border border-gold-primary/40 shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 glass-panel !border-t-0 !border-x-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <PhoneCall size={16} className="text-gold-primary" />
            <span>Private Office Confidential Inquiry</span>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="w-8 h-8 rounded-full glass-btn text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center animate-fade-in">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-primary/20 border border-gold-primary/40 flex items-center justify-center shadow-lg shadow-gold-primary/25">
              <CheckCircle size={32} className="text-gold-primary" />
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">Inquiry Registered Confidentially</h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              Thank you, <strong>{name}</strong>. A Senior Managing Partner from our Private Office 
              will initiate contact through your encrypted or chosen channel within 2 hours.
            </p>
            <div className="p-4 rounded-2xl glass-card border border-gold-primary/30 text-left flex flex-col gap-2.5 text-xs sm:text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-zinc-400">Target Allocation:</span>
                <span className="text-white font-semibold">{budgetTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Preferred Enclave:</span>
                <span className="text-white font-semibold">{locationPreference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Client Reference:</span>
                <span className="text-white font-semibold">NST-PRV-{(Math.random()*90000 + 10000).toFixed(0)}</span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={onClose} 
              className="w-full py-3 gold-gradient text-[#07080a] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:brightness-110 shadow-lg shadow-gold-primary/25 border border-white/20"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 flex flex-col gap-4">
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Direct access to our senior partners for off-market acquisitions, sovereign portfolio 
              divestitures, and private architectural commissions.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <User size={13} className="text-gold-primary" />
                <span>Client Name or Representative</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="Lord / Lady / Dr. / Ambassador"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 glass-input rounded-xl text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors placeholder:text-zinc-600"
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
                  placeholder="advisor@familyoffice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input rounded-xl text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors placeholder:text-zinc-600"
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
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input rounded-xl text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <Building2 size={13} className="text-gold-primary" />
                  <span>Target Region</span>
                </label>
                <select 
                  value={locationPreference}
                  onChange={(e) => setLocationPreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input rounded-xl text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors cursor-pointer"
                >
                  <option value="Los Angeles / California Coast" className="bg-[#0b0e14]">Los Angeles / California Coast</option>
                  <option value="Manhattan & Hamptons" className="bg-[#0b0e14]">Manhattan & Hamptons</option>
                  <option value="Miami & Palm Beach Waterfront" className="bg-[#0b0e14]">Miami & Palm Beach</option>
                  <option value="Aspen & Rocky Mountains" className="bg-[#0b0e14]">Aspen & Rocky Mountains</option>
                  <option value="London & UK Country Estates" className="bg-[#0b0e14]">London & UK Country</option>
                  <option value="French Riviera & Lake Como" className="bg-[#0b0e14]">French Riviera & Lake Como</option>
                  <option value="Tokyo & Kyoto Heritage" className="bg-[#0b0e14]">Tokyo & Kyoto Heritage</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Allocation Tier</label>
                <select 
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input rounded-xl text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors cursor-pointer"
                >
                  <option value="$10M - $20M" className="bg-[#0b0e14]">$10M - $20M</option>
                  <option value="$20M - $40M" className="bg-[#0b0e14]">$20M - $40M</option>
                  <option value="$40M - $75M" className="bg-[#0b0e14]">$40M - $75M</option>
                  <option value="$75M+ Trophy Assets" className="bg-[#0b0e14]">$75M+ Trophy Assets</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2.5 glass-pill-gold rounded-xl p-3 text-xs text-gold-light">
              <ShieldCheck size={16} className="text-gold-primary shrink-0" />
              <span>Strict fiduciary confidentiality. All communications are end-to-end encrypted.</span>
            </div>

            <button type="submit" className="w-full py-3.5 gold-gradient text-[#07080a] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-gold-primary/30 hover:brightness-110 transition-all cursor-pointer border border-white/20">
              Initiate Discreet Advisory Connection
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
