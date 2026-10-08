import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Star, Layers, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { formatINR } from '../../utils/formatters';
import { CatalogImage } from './CatalogImage';

export const ProductCard = ({ product, onQuickView }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [addedEffect, setAddedEffect] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product.id);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const primaryImage = product.images[0];

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/60 shadow-luxury hover:shadow-luxury-hover transition-all duration-300"
    >
      {/* Image Container with Badges & Action Overlays */}
      <div className="relative aspect-square overflow-hidden bg-beige-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <CatalogImage
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            width={600}
            height={600}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 items-start">
          {product.discount > 0 && (
            <span className="bg-walnut text-ivory text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
              -{product.discount}%
            </span>
          )}
          {product.newArrival && (
            <span className="bg-gold text-charcoal-900 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
              New
            </span>
          )}
          {product.has3dModel && (
            <span className="bg-charcoal/80 text-gold text-[8px] sm:text-[9px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full backdrop-blur-sm border border-gold/30">
              3D
            </span>
          )}
        </div>

        {/* Top Right Actions (Wishlist & Compare) */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex flex-col gap-1.5 sm:gap-2">
          <button
            onClick={handleWishlist}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-200 ${
              isInWishlist(product.id)
                ? 'bg-rose-50 text-rose-600 scale-105'
                : 'bg-white/85 text-charcoal hover:bg-white hover:text-rose-600'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isInWishlist(product.id) ? 'fill-rose-600' : ''}`} />
          </button>

          <button
            onClick={handleCompare}
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-200 ${
              isInCompare(product.id)
                ? 'bg-walnut text-gold scale-105'
                : 'bg-white/85 text-charcoal hover:bg-white hover:text-gold'
            }`}
            title="Compare Product"
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Bottom Quick View Button Slide-up */}
        <div className="absolute bottom-2 inset-x-2 sm:bottom-3 sm:inset-x-3 z-10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickViewClick}
            className="w-full py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-charcoal/90 text-ivory text-[10px] sm:text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 hover:bg-charcoal border border-gold/30 shadow-lg"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Category & Collection */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-wider text-charcoal/60 mb-1">
            <span className="text-gold font-semibold truncate">{product.categoryName}</span>
            <span className="truncate hidden sm:inline">{product.collection}</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif-luxury text-xs sm:text-base font-semibold text-charcoal group-hover:text-gold transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500" />
              <span className="ml-1 text-[11px] sm:text-xs font-bold text-charcoal">{product.rating}</span>
            </div>
            <span className="text-charcoal/40 text-[10px] sm:text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Color variants selector dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 pt-0.5">
            {product.colors.slice(0, 3).map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(c);
                }}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all ${
                  selectedColor?.name === c.name ? 'border-charcoal scale-125 ring-1 ring-gold' : 'border-beige-300'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[9px] sm:text-[10px] text-charcoal/50 ml-1 truncate">
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Pricing & Add to Cart button */}
        <div className="pt-2 border-t border-beige-200 flex items-center justify-between gap-1">
          <div className="min-w-0">
            <span className="text-xs sm:text-base font-bold text-walnut block truncate">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-charcoal/40 line-through block truncate">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-200 shadow-sm active:scale-95 flex-shrink-0 ${
              addedEffect
                ? 'bg-emerald-600 text-white'
                : 'bg-ivory hover:bg-walnut text-charcoal hover:text-ivory border border-beige-300 hover:border-walnut'
            }`}
            title="Add to Sanctuary Bag"
          >
            {addedEffect ? (
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
