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
    <section id="featured-listings" className="py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] tracking-[0.22em] text-gold-primary font-bold uppercase block mb-1.5">
            CURATED PORTFOLIO
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium">
            Featured <span className="gold-text">Trophy Residences</span>
          </h2>
        </div>

        {/* Sorting Dropdown with Glass */}
        <div className="flex items-center gap-2 glass-btn rounded-xl px-4 py-2 text-xs sm:text-sm text-zinc-200 shadow-md">
          <ArrowUpDown size={14} className="text-gold-primary shrink-0" />
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-transparent border-none text-zinc-200 text-xs sm:text-sm outline-none cursor-pointer"
          >
            <option value="featured" className="bg-[#0b0e14] text-white">Sort: Featured Curation</option>
            <option value="price-desc" className="bg-[#0b0e14] text-white">Price: High to Low</option>
            <option value="price-asc" className="bg-[#0b0e14] text-white">Price: Low to High</option>
            <option value="sqft-desc" className="bg-[#0b0e14] text-white">Interior Size: Largest First</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar with Glass */}
      <div className="flex gap-2.5 overflow-x-auto pb-3 mb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories.map(cat => (
          <button
            key={cat.value}
            type="button"
            className={`whitespace-nowrap px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeCategory === cat.value 
                ? 'glass-pill-gold text-gold-primary font-bold shadow-lg shadow-gold-primary/20' 
                : 'glass-pill text-zinc-400 hover:text-white hover:border-white/25'
            }`}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Properties */}
      {sortedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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
        <div className="p-10 sm:p-14 rounded-3xl glass-panel text-center max-w-lg mx-auto flex flex-col items-center my-8 border border-white/15 shadow-2xl">
          <Building2 size={44} className="text-gold-primary mb-4" />
          <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">No Residences Match These Filters</h3>
          <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
            We couldn’t find any trophy estates matching your exact criteria. 
            Adjust your price range, destination, or bedroom filters.
          </p>
          <button 
            type="button" 
            onClick={onResetFilters} 
            className="inline-flex items-center gap-2 px-6 py-2.5 gold-gradient text-[#07080a] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:brightness-110 shadow-md shadow-gold-primary/25"
          >
            <RotateCcw size={15} />
            <span>Reset All Search Filters</span>
          </button>
        </div>
      )}
    </section>
  );
}
