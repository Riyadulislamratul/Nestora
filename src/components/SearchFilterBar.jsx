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
    <div className="search-filter-card glass-panel-gold animate-slide-up">
      {/* Top Bar: Buy / Rent Status Toggle & Result Indicator */}
      <div className="filter-top-row">
        <div className="status-toggle-pill">
          <button 
            type="button"
            className={`status-btn ${filters.status === 'All' ? 'active' : ''}`}
            onClick={() => handleStatusChange('All')}
          >
            All Portfolios
          </button>
          <button 
            type="button"
            className={`status-btn ${filters.status === 'For Sale' ? 'active' : ''}`}
            onClick={() => handleStatusChange('For Sale')}
          >
            For Acquisition
          </button>
          <button 
            type="button"
            className={`status-btn ${filters.status === 'For Rent' ? 'active' : ''}`}
            onClick={() => handleStatusChange('For Rent')}
          >
            Private Lease
          </button>
        </div>

        <div className="filter-results-tag">
          <span className="results-badge">{resultCount}</span>
          <span className="results-label">Rare Residences Matched</span>
        </div>
      </div>

      {/* Main Filter Controls Grid */}
      <div className="filter-controls-grid">
        {/* Location Dropdown */}
        <div className="filter-field">
          <label className="field-label">
            <MapPin size={14} className="icon-gold" />
            <span>Destination</span>
          </label>
          <div className="select-wrapper">
            <select 
              value={filters.city} 
              onChange={handleCityChange}
              className="custom-select"
            >
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="filter-field">
          <label className="field-label">
            <Home size={14} className="icon-gold" />
            <span>Architecture Type</span>
          </label>
          <div className="select-wrapper">
            <select 
              value={filters.type} 
              onChange={handleTypeChange}
              className="custom-select"
            >
              {PROPERTY_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Slider */}
        <div className="filter-field">
          <div className="field-label-between">
            <span className="field-label">
              <DollarSign size={14} className="icon-gold" />
              <span>Investment Ceiling</span>
            </span>
            <span className="price-indicator">{formatPrice(filters.maxPrice)}</span>
          </div>
          <div className="slider-wrapper">
            <input 
              type="range" 
              min="10000000" 
              max="40000000" 
              step="2500000"
              value={filters.maxPrice} 
              onChange={handlePriceChange}
              className="custom-range"
            />
          </div>
        </div>

        {/* Bedroom Selector */}
        <div className="filter-field">
          <label className="field-label">
            <SlidersHorizontal size={14} className="icon-gold" />
            <span>Minimum Bedrooms</span>
          </label>
          <div className="bed-pills">
            {[0, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                type="button"
                className={`bed-pill ${filters.minBeds === num ? 'active' : ''}`}
                onClick={() => handleBedsChange(num)}
              >
                {num === 0 ? 'Any' : `${num}+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Search text input & reset action */}
      <div className="filter-bottom-row">
        <div className="search-input-wrapper">
          <Search size={17} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by estate name, address, architect, or landmark..." 
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="search-input"
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
            className="reset-filters-btn"
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
