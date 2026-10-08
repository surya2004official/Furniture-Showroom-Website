import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { formatINR } from '../../utils/formatters';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = [
    "Curved Bouclé Sofa",
    "Roman Travertine",
    "American Walnut",
    "Floating Canopy Bed",
    "Executive Desk",
    "Burmese Teak Daybed",
    "Bar Cabinet"
  ];

  const searchResults = query.trim() === '' ? [] : products.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.materials.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gold/40 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 pb-4 border-b border-beige-300">
          <Search className="w-5 h-5 text-gold" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search architectural furniture, materials, collections..."
            className="flex-1 bg-transparent text-sm sm:text-base text-charcoal placeholder:text-charcoal/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-charcoal/50 hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono bg-beige-200 text-charcoal/60 rounded border border-beige-300">
            ESC
          </kbd>
        </div>

        {/* Popular Tags */}
        <div className="py-3">
          <p className="text-[11px] font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
            Curated Architectural Searches
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => setQuery(term)}
                className="text-xs px-3 py-1 rounded-full bg-white hover:bg-beige-200 border border-beige-300 text-charcoal/80 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {query.trim() !== '' && (
          <div className="mt-2 pt-3 border-t border-beige-200 max-h-[380px] overflow-y-auto space-y-2">
            {searchResults.length === 0 ? (
              <div className="text-center py-8 text-charcoal/60">
                <p className="text-sm font-medium">No bespoke pieces matching "{query}"</p>
                <p className="text-xs text-charcoal/40 mt-1">Try exploring by room or speaking with our AI Concierge</p>
              </div>
            ) : (
              searchResults.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item.id)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-beige-100 border border-beige-300 hover:border-gold/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl bg-beige-50"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                          {item.categoryName}
                        </span>
                        {item.bestseller && (
                          <span className="text-[9px] bg-walnut/10 text-walnut px-1.5 py-0.2 rounded font-medium">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif-luxury text-xs font-semibold text-charcoal group-hover:text-gold transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-charcoal/60 line-clamp-1">{item.materials}</p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-xs font-bold text-walnut">{formatINR(item.price)}</p>
                      {item.originalPrice && (
                        <p className="text-[10px] text-charcoal/40 line-through">{formatINR(item.originalPrice)}</p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
