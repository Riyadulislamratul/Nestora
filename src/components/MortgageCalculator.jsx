import React, { useState, useEffect } from 'react';
import { X, Calculator, DollarSign, Percent, Calendar, ShieldCheck, CheckCircle } from 'lucide-react';

export default function MortgageCalculator({ 
  property, 
  onClose,
  onOpenConsultation 
}) {
  const initialPrice = property ? property.price : 20000000;
  const [homePrice, setHomePrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(6.25);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1); // %
  const [annualInsurance, setAnnualInsurance] = useState(24000); // estimated annual luxury insurance
  const [monthlyHoa, setMonthlyHoa] = useState(property?.hoaFee || 1500);

  // Re-sync if property changes
  useEffect(() => {
    if (property) {
      setHomePrice(property.price);
      if (property.hoaFee !== undefined) {
        setMonthlyHoa(property.hoaFee);
      }
    }
  }, [property]);

  // Calculations
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = homePrice - downPaymentAmount;
  
  const monthlyInterestRate = (interestRate / 100) / 12;
  const totalPaymentsCount = loanTermYears * 12;

  let monthlyPrincipalInterest = 0;
  if (monthlyInterestRate > 0 && loanAmount > 0) {
    monthlyPrincipalInterest = 
      (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPaymentsCount))) /
      (Math.pow(1 + monthlyInterestRate, totalPaymentsCount) - 1);
  }

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;

  const totalMonthlyOutlay = Math.round(
    monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + monthlyHoa
  );

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Percentages for bar
  const piPercent = totalMonthlyOutlay > 0 ? (monthlyPrincipalInterest / totalMonthlyOutlay) * 100 : 0;
  const taxPercent = totalMonthlyOutlay > 0 ? (monthlyPropertyTax / totalMonthlyOutlay) * 100 : 0;
  const insPercent = totalMonthlyOutlay > 0 ? (monthlyInsurance / totalMonthlyOutlay) * 100 : 0;
  const hoaPercent = totalMonthlyOutlay > 0 ? (monthlyHoa / totalMonthlyOutlay) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in" onClick={onClose}>
      <div 
        className="max-w-4xl w-full rounded-2xl glass-panel border border-gold-primary/30 shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0a0c11]/90">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Calculator size={18} className="text-gold-primary" />
            <span>Private Client Financing Analytics</span>
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

        {property && (
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 glass-panel-gold text-xs sm:text-sm">
            <span className="text-zinc-400">Selected Residence:</span>
            <span className="font-semibold text-white truncate">{property.title}</span>
            <span className="font-serif text-[#e2c057] font-semibold ml-auto">{formatCurrency(property.price)}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 p-5 sm:p-7 gap-6 sm:gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Home Price */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Acquisition Price</label>
                <span className="text-xs font-bold text-gold-primary">{formatCurrency(homePrice)}</span>
              </div>
              <input 
                type="range"
                min="5000000"
                max="50000000"
                step="500000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full accent-gold-primary cursor-pointer"
              />
            </div>

            {/* Down Payment */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Down Payment ({downPaymentPercent}%)</label>
                <span className="text-xs font-bold text-gold-primary">{formatCurrency(downPaymentAmount)}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[15, 20, 25, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    className={`px-3 py-1.5 rounded-md border text-xs font-semibold transition-all cursor-pointer ${
                      downPaymentPercent === pct 
                        ? 'bg-gold-primary/20 border-gold-primary text-gold-primary' 
                        : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                    onClick={() => setDownPaymentPercent(pct)}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Term */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Loan Term</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  className={`p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center ${
                    loanTermYears === 30 
                      ? 'bg-gold-primary/20 border-gold-primary text-gold-primary' 
                      : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  onClick={() => setLoanTermYears(30)}
                >
                  30-Year Fixed (Jumbo)
                </button>
                <button
                  type="button"
                  className={`p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center ${
                    loanTermYears === 15 
                      ? 'bg-gold-primary/20 border-gold-primary text-gold-primary' 
                      : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  onClick={() => setLoanTermYears(15)}
                >
                  15-Year Accelerated
                </button>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Annual Interest Rate</label>
                <span className="text-xs font-bold text-gold-primary">{interestRate.toFixed(2)}%</span>
              </div>
              <input 
                type="range"
                min="4.0"
                max="9.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-gold-primary cursor-pointer"
              />
            </div>

            {/* Property Tax Rate */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Estimated Property Tax</label>
                <span className="text-xs font-bold text-gold-primary">{propertyTaxRate.toFixed(2)}% / yr</span>
              </div>
              <input 
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full accent-gold-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl glass-panel-gold border border-gold-primary/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase block mb-1">
                ESTIMATED MONTHLY OUTLAY
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#e2c057] leading-none mb-4">
                {formatCurrency(totalMonthlyOutlay)}
                <span className="text-xs text-zinc-400 font-sans font-normal ml-1.5">/ month</span>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="flex h-2.5 rounded-full overflow-hidden mb-5 bg-white/5">
                <div className="bg-[#d4af37] transition-all duration-300" style={{ width: `${piPercent}%` }} title="Principal & Interest"></div>
                <div className="bg-blue-500 transition-all duration-300" style={{ width: `${taxPercent}%` }} title="Property Taxes"></div>
                <div className="bg-emerald-500 transition-all duration-300" style={{ width: `${insPercent}%` }} title="Insurance"></div>
                <div className="bg-purple-500 transition-all duration-300" style={{ width: `${hoaPercent}%` }} title="HOA & Concierge"></div>
              </div>

              {/* Itemized Legend */}
              <div className="flex flex-col gap-2.5 text-xs text-zinc-300 mb-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
                    <span>Principal & Interest</span>
                  </div>
                  <span className="font-semibold text-white">{formatCurrency(Math.round(monthlyPrincipalInterest))}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Property Taxes</span>
                  </div>
                  <span className="font-semibold text-white">{formatCurrency(Math.round(monthlyPropertyTax))}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Home Insurance</span>
                  </div>
                  <span className="font-semibold text-white">{formatCurrency(Math.round(monthlyInsurance))}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span>HOA & Reserve</span>
                  </div>
                  <span className="font-semibold text-white">{formatCurrency(Math.round(monthlyHoa))}</span>
                </div>
              </div>

              {/* Loan Total Specs */}
              <div className="p-3 bg-black/40 border border-white/10 rounded-xl flex flex-col gap-1.5 text-xs mb-5">
                <div className="flex justify-between text-zinc-400">
                  <span>Jumbo Loan Principal:</span>
                  <strong className="text-white">{formatCurrency(loanAmount)}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Initial Capital Outlay:</span>
                  <strong className="text-white">{formatCurrency(downPaymentAmount)}</strong>
                </div>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full py-3 gold-gradient text-[#07080a] text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-gold-primary/20 hover:brightness-110 cursor-pointer"
            >
              Consult Private Wealth Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
