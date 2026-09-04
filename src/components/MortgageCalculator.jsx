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
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="calculator-modal-container glass-panel animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <Calculator size={20} className="text-gold mr-2" />
            <span>Private Client Financing & Mortgage Analytics</span>
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

        {property && (
          <div className="calc-property-target glass-panel-gold">
            <span className="calc-target-label">Selected Residence:</span>
            <span className="calc-target-name">{property.title}</span>
            <span className="calc-target-price">{formatCurrency(property.price)}</span>
          </div>
        )}

        <div className="calculator-layout-grid">
          {/* Controls Column */}
          <div className="calculator-inputs-col">
            {/* Home Price */}
            <div className="calc-group">
              <div className="calc-label-row">
                <label className="calc-label">Acquisition Price</label>
                <span className="calc-value-display">{formatCurrency(homePrice)}</span>
              </div>
              <input 
                type="range"
                min="5000000"
                max="50000000"
                step="500000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            {/* Down Payment */}
            <div className="calc-group">
              <div className="calc-label-row">
                <label className="calc-label">Down Payment ({downPaymentPercent}%)</label>
                <span className="calc-value-display">{formatCurrency(downPaymentAmount)}</span>
              </div>
              <div className="pill-group">
                {[15, 20, 25, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    className={`calc-pill-btn ${downPaymentPercent === pct ? 'active' : ''}`}
                    onClick={() => setDownPaymentPercent(pct)}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Term */}
            <div className="calc-group">
              <label className="calc-label">Loan Term</label>
              <div className="term-toggle">
                <button
                  type="button"
                  className={`term-btn ${loanTermYears === 30 ? 'active' : ''}`}
                  onClick={() => setLoanTermYears(30)}
                >
                  30-Year Fixed (Jumbo Prime)
                </button>
                <button
                  type="button"
                  className={`term-btn ${loanTermYears === 15 ? 'active' : ''}`}
                  onClick={() => setLoanTermYears(15)}
                >
                  15-Year Fixed (Accelerated)
                </button>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="calc-group">
              <div className="calc-label-row">
                <label className="calc-label">Annual Interest Rate</label>
                <span className="calc-value-display">{interestRate.toFixed(2)}%</span>
              </div>
              <input 
                type="range"
                min="4.0"
                max="9.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            {/* Property Tax Rate */}
            <div className="calc-group">
              <div className="calc-label-row">
                <label className="calc-label">Estimated Property Tax Rate</label>
                <span className="calc-value-display">{propertyTaxRate.toFixed(2)}% / yr</span>
              </div>
              <input 
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="custom-range"
              />
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="calculator-results-col glass-panel-gold">
            <span className="monthly-outlay-eyebrow">ESTIMATED MONTHLY OUTLAY</span>
            <div className="total-outlay-number">
              {formatCurrency(totalMonthlyOutlay)}
              <span className="outlay-freq">/ month</span>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="outlay-bar-container">
              <div className="bar-segment bar-pi" style={{ width: `${piPercent}%` }} title="Principal & Interest"></div>
              <div className="bar-segment bar-tax" style={{ width: `${taxPercent}%` }} title="Property Taxes"></div>
              <div className="bar-segment bar-ins" style={{ width: `${insPercent}%` }} title="Homeowners Insurance"></div>
              <div className="bar-segment bar-hoa" style={{ width: `${hoaPercent}%` }} title="HOA & Concierge Reserve"></div>
            </div>

            {/* Itemized Legend */}
            <div className="outlay-breakdown-list">
              <div className="outlay-item">
                <div className="outlay-item-left">
                  <span className="legend-dot dot-pi"></span>
                  <span>Principal & Interest</span>
                </div>
                <span className="outlay-val">{formatCurrency(Math.round(monthlyPrincipalInterest))}</span>
              </div>

              <div className="outlay-item">
                <div className="outlay-item-left">
                  <span className="legend-dot dot-tax"></span>
                  <span>Property Taxes</span>
                </div>
                <span className="outlay-val">{formatCurrency(Math.round(monthlyPropertyTax))}</span>
              </div>

              <div className="outlay-item">
                <div className="outlay-item-left">
                  <span className="legend-dot dot-ins"></span>
                  <span>Homeowners Insurance</span>
                </div>
                <span className="outlay-val">{formatCurrency(Math.round(monthlyInsurance))}</span>
              </div>

              <div className="outlay-item">
                <div className="outlay-item-left">
                  <span className="legend-dot dot-hoa"></span>
                  <span>HOA & Estate Maintenance</span>
                </div>
                <span className="outlay-val">{formatCurrency(Math.round(monthlyHoa))}</span>
              </div>
            </div>

            {/* Loan Total Specs */}
            <div className="loan-specs-box">
              <div className="loan-spec-row">
                <span>Borrowed Jumbo Amount:</span>
                <strong>{formatCurrency(loanAmount)}</strong>
              </div>
              <div className="loan-spec-row">
                <span>Initial Capital Required:</span>
                <strong>{formatCurrency(downPaymentAmount)}</strong>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="btn-gold-full"
            >
              Consult Private Wealth Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
