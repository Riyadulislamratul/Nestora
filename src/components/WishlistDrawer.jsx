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
    <div className="drawer-overlay animate-fade-in" onClick={onClose}>
      <aside 
        className="drawer-panel glass-panel animate-slide-in"
        onClick={(e) => e.stopPropagation()}
        aria-label="Saved Residences Drawer"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Bookmark size={20} className="text-gold" />
            <div>
              <h3 className="drawer-title">Curated Portfolio</h3>
              <p className="drawer-subtitle">{savedProperties.length} Saved Residences</p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose} 
            className="modal-close-btn"
            aria-label="Close drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Saved Items List */}
        <div className="drawer-body">
          {savedProperties.length > 0 ? (
            <div className="drawer-items-list">
              {savedProperties.map(property => {
                const formattedPrice = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0
                }).format(property.price);

                return (
                  <div key={property.id} className="drawer-item-card glass-panel-gold">
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="drawer-item-thumb"
                      onClick={() => {
                        onClose();
                        onSelectProperty(property);
                      }}
                    />

                    <div className="drawer-item-info">
                      <div className="drawer-item-header">
                        <span className="drawer-item-type">{property.type}</span>
                        <button 
                          type="button" 
                          onClick={() => onRemove(property.id)}
                          className="drawer-item-remove"
                          title="Remove from saved"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <h4 
                        className="drawer-item-title"
                        onClick={() => {
                          onClose();
                          onSelectProperty(property);
                        }}
                      >
                        {property.title}
                      </h4>

                      <p className="drawer-item-loc">{property.location}</p>

                      <div className="drawer-item-footer">
                        <span className="drawer-item-price">{formattedPrice}</span>
                        <button 
                          type="button" 
                          onClick={() => {
                            onClose();
                            onSelectProperty(property);
                          }}
                          className="drawer-item-view"
                        >
                          <span>Explore</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="drawer-empty-state">
              <Building size={48} className="empty-drawer-icon text-muted" />
              <h4 className="empty-drawer-title">Your Private Portfolio is Empty</h4>
              <p className="empty-drawer-text">
                Bookmark exceptional residences by clicking the bookmark icon on any property card to compare them here.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {savedProperties.length > 0 && (
          <div className="drawer-footer glass-panel">
            <div className="portfolio-total-row">
              <span className="total-label">Combined Portfolio Valuation</span>
              <span className="total-val">{formattedTotal}</span>
            </div>

            <div className="drawer-actions-row">
              <button 
                type="button" 
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="btn-gold-dossier"
              >
                <FileText size={16} />
                <span>Request Comprehensive Dossier</span>
              </button>

              <button 
                type="button" 
                onClick={onClearAll}
                className="btn-clear-portfolio"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
