import React from 'react';
import { Search, MapPin, Home, DollarSign, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { CITIES, PROPERTY_TYPES } from '../data/properties';

export default function SearchFilterBar({ 
  filters, 
  setFilters, 
  onResetFilters,
  resultCount 
}) {
  const handleStatusChange = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleCityChange = (e) => {
    setFilters(prev => ({ ...prev, city: e.target.value }));
  };

  const handleTypeChange = (e) => {
    setFilters(prev => ({ ...prev, type: e.target.value }));
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const handleBedsChange = (beds) => {
    setFilters(prev => ({ ...prev, minBeds: beds }));
  };

  const formatPrice = (val) => {
    if (val >= 40000000) return 'Any Price';
    return `$${(val / 1000000).toFixed(0)}M Max`;
  };

  return (
    <div className="p-5 sm:p-7 rounded-2xl glass-panel-gold shadow-2xl text-left animate-slide-up border border-gold-primary/30">
      {/* Top Bar: Buy / Rent Status Toggle & Result Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
        <div className="inline-flex bg-black/60 p-1 rounded-lg border border-white/10">
          <button 
            type="button"
            className={`px-3.5 sm:px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              filters.status === 'All' 
                ? 'gold-gradient text-[#0a0c10] shadow-md shadow-gold-primary/30' 
                : 'text-zinc-400 hover:text-white'
            }`}
            onClick={() => handleStatusChange('All')}
          >
            All Portfolios
          </button>
          <button 
            type="button"
            className={`px-3.5 sm:px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              filters.status === 'For Sale' 
                ? 'gold-gradient text-[#0a0c10] shadow-md shadow-gold-primary/30' 
                : 'text-zinc-400 hover:text-white'
            }`}
            onClick={() => handleStatusChange('For Sale')}
          >
            For Acquisition
          </button>
          <button 
            type="button"
            className={`px-3.5 sm:px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              filters.status === 'For Rent' 
                ? 'gold-gradient text-[#0a0c10] shadow-md shadow-gold-primary/30' 
                : 'text-zinc-400 hover:text-white'
            }`}
            onClick={() => handleStatusChange('For Rent')}
          >
            Private Lease
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="bg-gold-primary/20 text-gold-primary border border-gold-primary/40 font-bold px-2.5 py-0.5 rounded-full text-xs">
            {resultCount}
          </span>
          <span>Rare Residences Matched</span>
        </div>
      </div>

      {/* Main Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-5">
        {/* Destination Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <MapPin size={13} className="text-gold-primary" />
            <span>Destination</span>
          </label>
          <select 
            value={filters.city} 
            onChange={handleCityChange}
            className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary outline-none transition-colors cursor-pointer"
          >
            {CITIES.map(city => (
              <option key={city} value={city} className="bg-[#11131a] text-white">{city}</option>
            ))}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <Home size={13} className="text-gold-primary" />
            <span>Architecture Type</span>
          </label>
          <select 
            value={filters.type} 
            onChange={handleTypeChange}
            className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary focus:ring-1 focus:ring-gold-primary outline-none transition-colors cursor-pointer"
          >
            {PROPERTY_TYPES.map(type => (
              <option key={type} value={type} className="bg-[#11131a] text-white">{type}</option>
            ))}
          </select>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <DollarSign size={13} className="text-gold-primary" />
              <span>Investment Ceiling</span>
            </span>
            <span className="text-xs font-bold text-gold-primary">{formatPrice(filters.maxPrice)}</span>
          </div>
          <div className="py-2">
            <input 
              type="range" 
              min="10000000" 
              max="40000000" 
              step="2500000"
              value={filters.maxPrice} 
              onChange={handlePriceChange}
              className="w-full accent-gold-primary cursor-pointer"
            />
          </div>
        </div>

        {/* Bedroom Selector */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <SlidersHorizontal size={13} className="text-gold-primary" />
            <span>Minimum Bedrooms</span>
          </label>
          <div className="flex gap-1.5">
            {[0, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                type="button"
                className={`flex-1 py-2 rounded-md border text-xs font-semibold transition-all text-center cursor-pointer ${
                  filters.minBeds === num 
                    ? 'bg-gold-primary/20 border-gold-primary text-gold-primary' 
                    : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
                onClick={() => handleBedsChange(num)}
              >
                {num === 0 ? 'Any' : `${num}+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Search text input & reset action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex-1 min-w-[260px] relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search by estate name, address, architect, or landmark..." 
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:border-gold-primary outline-none transition-colors placeholder:text-zinc-500"
          />
        </div>

        {(filters.city !== 'All Locations' || 
          filters.type !== 'All Types' || 
          filters.status !== 'All' || 
          filters.minBeds > 0 || 
          filters.maxPrice < 40000000 || 
          filters.searchQuery.trim() !== '') && (
          <button 
            type="button" 
            onClick={onResetFilters} 
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-gold-primary px-3.5 py-2.5 rounded-md bg-white/5 border border-white/10 hover:border-gold-primary/40 transition-all cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
