import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Building, FileText } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  savedProperties,
  onRemove,
  onSelectProperty,
  onClearAll,
  onOpenConsultation
}) {
  if (!isOpen) return null;

  const totalPortfolioValue = savedProperties.reduce((acc, curr) => acc + curr.price, 0);

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(totalPortfolioValue);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <aside 
        className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 glass-panel border-l border-gold-primary/30 flex flex-col shadow-2xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
        aria-label="Saved Residences Drawer"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0a0c11]/90">
          <div className="flex items-center gap-3">
            <Bookmark size={20} className="text-gold-primary" />
            <div>
              <h3 className="font-serif text-lg text-white font-medium">Curated Portfolio</h3>
              <p className="text-xs text-zinc-400">{savedProperties.length} Saved Residences</p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Saved Items List */}
        <div className="flex-1 overflow-y-auto p-5">
          {savedProperties.length > 0 ? (
            <div className="flex flex-col gap-3.5">
              {savedProperties.map(property => {
                const formattedPrice = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0
                }).format(property.price);

                return (
                  <div key={property.id} className="flex gap-3.5 p-3.5 rounded-xl glass-panel-gold border border-gold-primary/20">
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-20 h-20 rounded-lg object-cover cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
                      onClick={() => {
                        onClose();
                        onSelectProperty(property);
                      }}
                    />

                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-gold-primary font-bold">{property.type}</span>
                        <button 
                          type="button" 
                          onClick={() => onRemove(property.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <h4 
                        className="text-xs sm:text-sm font-semibold text-white truncate cursor-pointer hover:text-gold-primary transition-colors mb-0.5"
                        onClick={() => {
                          onClose();
                          onSelectProperty(property);
                        }}
                      >
                        {property.title}
                      </h4>

                      <p className="text-[11px] text-zinc-400 truncate mb-2">{property.location}</p>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-serif text-sm font-semibold text-[#e2c057]">{formattedPrice}</span>
                        <button 
                          type="button" 
                          onClick={() => {
                            onClose();
                            onSelectProperty(property);
                          }}
                          className="flex items-center gap-1 text-[11px] font-semibold text-zinc-300 hover:text-gold-primary transition-colors cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-24 px-4 text-center flex flex-col items-center">
              <Building size={44} className="text-zinc-600 mb-4" />
              <h4 className="font-serif text-lg text-white mb-2">Your Private Portfolio is Empty</h4>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                Bookmark exceptional residences by clicking the bookmark icon on any property card to compare them here.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {savedProperties.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0a0c11]/95 flex flex-col gap-3.5">
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">Combined Portfolio</span>
              <span className="font-serif text-xl font-bold text-[#e2c057]">{formattedTotal}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <button 
                type="button" 
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="w-full py-3 gold-gradient text-[#07080a] text-xs font-bold uppercase tracking-wider rounded-lg shadow-md shadow-gold-primary/20 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <FileText size={15} />
                <span>Request Comprehensive Dossier</span>
              </button>

              <button 
                type="button" 
                onClick={onClearAll}
                className="text-xs text-zinc-500 hover:text-red-400 text-center py-1 transition-colors cursor-pointer"
              >
                Clear Portfolio
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
