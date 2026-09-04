import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { ArrowUpDown, RotateCcw, Building2 } from 'lucide-react';

export default function PropertyGrid({
  properties,
  savedIds,
  onToggleSave,
  onSelectProperty,
  onCalculateMortgage,
  onResetFilters,
  activeCategory,
  setActiveCategory
}) {
  const [sortOption, setSortOption] = useState('featured');

  const categories = [
    { label: 'All Portfolio', value: 'all' },
    { label: 'Penthouses', value: 'Penthouse' },
    { label: 'Modern Villas', value: 'Modern Villa' },
    { label: 'Waterfront', value: 'Waterfront' },
    { label: 'Alpine & Retreats', value: 'Mountain Retreat' },
    { label: 'Historic Estates', value: 'Historic Estate' }
  ];

  // Filter by category tab
  const categoryFiltered = properties.filter(item => {
    if (activeCategory === 'all') return true;
    return item.type === activeCategory;
  });

  // Sort
  const sortedProperties = [...categoryFiltered].sort((a, b) => {
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'sqft-desc') return b.sqft - a.sqft;
    return 0; // featured default
  });

  return (
    <section id="featured-listings" className="property-grid-section">
      <div className="section-header-row">
        <div>
          <span className="section-eyebrow">CURATED PORTFOLIO</span>
          <h2 className="section-title">
            Featured <span className="gold-text">Trophy Residences</span>
          </h2>
        </div>

        {/* Sorting Dropdown */}
        <div className="sort-dropdown-wrapper">
          <ArrowUpDown size={15} className="sort-icon" />
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Sort: Featured Curation</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="sqft-desc">Interior Size: Largest First</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-tabs-bar">
        {categories.map(cat => (
          <button
            key={cat.value}
            type="button"
            className={`category-tab-btn ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Properties */}
      {sortedProperties.length > 0 ? (
        <div className="property-cards-grid">
          {sortedProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={savedIds.includes(property.id)}
              onToggleSave={onToggleSave}
              onSelectProperty={onSelectProperty}
              onCalculateMortgage={onCalculateMortgage}
            />
          ))}
        </div>
      ) : (
        <div className="empty-results-state glass-panel">
          <Building2 size={48} className="empty-icon text-gold" />
          <h3 className="empty-title">No Residences Match These Filters</h3>
          <p className="empty-desc">
            We couldn’t find any trophy estates matching your exact criteria. 
            Adjust your price range, destination, or bedroom filters.
          </p>
          <button 
            type="button" 
            onClick={onResetFilters} 
            className="btn-reset-large"
          >
            <RotateCcw size={16} />
            <span>Reset All Search Filters</span>
          </button>
        </div>
      )}
    </section>
  );
}
