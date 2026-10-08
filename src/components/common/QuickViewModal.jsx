import React, { useState } from 'react';
import { CatalogImage } from './CatalogImage';
import { X, Star, ShoppingBag, Heart, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatters';

export const QuickViewModal = ({ product, onClose }) => {
  return product ? <QuickViewContent key={product.id} product={product} onClose={onClose} /> : null;
};

const QuickViewContent = ({ product, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-3xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-gold/40 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal border border-beige-300 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-beige-100 border border-gold/20 shadow-sm relative">
              <CatalogImage
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <span className="absolute top-3 left-3 bg-walnut text-ivory text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                  -{product.discount}% Privilege
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImageIndex === idx ? 'border-walnut ring-2 ring-gold/40' : 'border-beige-300 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Angle view" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                  {product.categoryName} • {product.collection}
                </span>
              </div>

              <h2 className="font-serif-luxury text-2xl font-bold text-charcoal leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-charcoal/70 mt-1 italic">
                "{product.tagline}"
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="ml-1 text-xs font-bold text-charcoal">{product.rating}</span>
                </div>
                <span className="text-charcoal/40 text-xs">•</span>
                <span className="text-xs text-charcoal/60">{product.reviewCount} Patron Reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-serif-luxury text-2xl font-bold text-walnut">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-charcoal/40 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-charcoal/75 mt-3 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-charcoal mb-2">
                    Select Finish: <span className="font-normal text-charcoal/70">{selectedColor?.name}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor?.name === c.name ? 'border-charcoal scale-110 shadow-md ring-2 ring-gold/50' : 'border-beige-300 hover:scale-105'}`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              <div className="mt-4 p-3 rounded-xl bg-beige-100 text-xs text-charcoal/80 space-y-1">
                <p><span className="font-semibold text-charcoal">Dimensions:</span> {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height}</p>
                <p><span className="font-semibold text-charcoal">Materials:</span> {product.materials}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex gap-3">
                <div className="flex items-center border border-beige-300 rounded-xl bg-white px-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-2 py-1 text-charcoal/70 hover:text-charcoal font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-2 py-1 text-charcoal/70 hover:text-charcoal font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 shadow-md active:scale-95 transition-all"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Sanctuary</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${isInWishlist(product.id) ? 'bg-rose-50 border-rose-300 text-rose-600' : 'bg-white border-beige-300 text-charcoal hover:border-gold'}`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-charcoal/60 pt-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>{product.warranty}</span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="font-semibold text-walnut hover:text-gold flex items-center gap-1"
                >
                  <span>Full Architectural Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
