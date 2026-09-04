import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetailModal from './components/PropertyDetailModal';
import ScheduleTourModal from './components/ScheduleTourModal';
import WishlistDrawer from './components/WishlistDrawer';
import MortgageCalculator from './components/MortgageCalculator';
import StatsSection from './components/StatsSection';
import ConciergeSection from './components/ConciergeSection';
import ConsultationModal from './components/ConsultationModal';
import Footer from './components/Footer';
import { PROPERTIES } from './data/properties';
import { CheckCircle2 } from 'lucide-react';

const DEFAULT_FILTERS = {
  status: 'All',
  city: 'All Locations',
  type: 'All Types',
  maxPrice: 40000000,
  minBeds: 0,
  searchQuery: ''
};

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [scheduleTourProperty, setScheduleTourProperty] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMortgageOpen, setIsMortgageOpen] = useState(false);
  const [mortgageTargetProperty, setMortgageTargetProperty] = useState(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Saved Wishlist Items with LocalStorage persistence
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('nestora_saved_residences');
      return stored ? JSON.parse(stored) : ['nest-01', 'nest-02'];
    } catch {
      return ['nest-01', 'nest-02'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nestora_saved_residences', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleSave = (id) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        showToast('Residence removed from your private portfolio');
        return prev.filter(item => item !== id);
      } else {
        showToast('Residence curated into your private portfolio');
        return [...prev, id];
      }
    });
  };

  const handleClearAllSaved = () => {
    setSavedIds([]);
    showToast('Saved portfolio cleared');
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setActiveCategory('all');
  };

  // Filter properties dynamically
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Status (Sale / Rent)
      if (filters.status !== 'All' && property.status !== filters.status) {
        return false;
      }
      // City
      if (filters.city !== 'All Locations' && property.city !== filters.city) {
        return false;
      }
      // Type
      if (filters.type !== 'All Types' && property.type !== filters.type) {
        return false;
      }
      // Max Price
      if (filters.maxPrice < 40000000 && property.price > filters.maxPrice) {
        return false;
      }
      // Min Beds
      if (filters.minBeds > 0 && property.bedrooms < filters.minBeds) {
        return false;
      }
      // Search text query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = property.title.toLowerCase().includes(query);
        const matchSub = property.subtitle.toLowerCase().includes(query);
        const matchLoc = property.location.toLowerCase().includes(query);
        const matchDesc = property.description.toLowerCase().includes(query);
        if (!matchTitle && !matchSub && !matchLoc && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  const savedPropertiesList = useMemo(() => {
    return PROPERTIES.filter(p => savedIds.includes(p.id));
  }, [savedIds]);

  const handleOpenMortgage = (prop = null) => {
    setMortgageTargetProperty(prop || PROPERTIES[0]);
    setIsMortgageOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080a] relative overflow-x-hidden text-zinc-100 selection:bg-gold-primary/30 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d1017]/95 backdrop-blur-md border border-gold-primary/50 rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs sm:text-sm text-white shadow-2xl animate-fade-in">
          <CheckCircle2 size={16} className="text-gold-primary shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Luxury Navigation Bar */}
      <Navbar 
        savedCount={savedIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMortgage={() => handleOpenMortgage(null)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Hero Section with Floating Search */}
      <HeroSection 
        filters={filters}
        setFilters={setFilters}
        onResetFilters={handleResetFilters}
        resultCount={filteredProperties.length}
      />

      {/* Featured Property Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pb-20 w-full flex-1">
        <PropertyGrid 
          properties={filteredProperties}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onCalculateMortgage={(prop) => handleOpenMortgage(prop)}
          onResetFilters={handleResetFilters}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Credibility Stats */}
        <StatsSection />

        {/* Bespoke Concierge & Private Office */}
        <ConciergeSection 
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenMortgage={() => handleOpenMortgage(null)}
      />

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isSaved={savedIds.includes(selectedProperty.id)}
          onToggleSave={handleToggleSave}
          onOpenScheduleTour={(prop) => setScheduleTourProperty(prop)}
          onOpenMortgage={(prop) => handleOpenMortgage(prop)}
        />
      )}

      {/* Schedule Tour Modal */}
      {scheduleTourProperty && (
        <ScheduleTourModal 
          property={scheduleTourProperty}
          onClose={() => setScheduleTourProperty(null)}
        />
      )}

      {/* Saved Properties Drawer */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedProperties={savedPropertiesList}
        onRemove={handleToggleSave}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onClearAll={handleClearAllSaved}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Mortgage & Financing Analytics Modal */}
      {isMortgageOpen && (
        <MortgageCalculator 
          property={mortgageTargetProperty}
          onClose={() => {
            setIsMortgageOpen(false);
            setMortgageTargetProperty(null);
          }}
          onOpenConsultation={() => {
            setIsMortgageOpen(false);
            setIsConsultationOpen(true);
          }}
        />
      )}

      {/* Confidential Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
