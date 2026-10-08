import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { formatINR } from '../utils/formatters';

export const WishlistPage = () => {
  const { wishlistProducts, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach(p => addToCart(p, 1));
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-14 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-1">
              <Heart className="w-4 h-4 fill-gold text-gold" />
              <span>Private Selections</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-ivory">
              Your Curated Wishlist
            </h1>
            <p className="text-xs text-ivory/70 mt-1">
              {wishlistCount} Collected Pieces saved for private consideration
            </p>
          </div>

          {wishlistCount > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-medium text-ivory transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="px-5 py-2.5 rounded-xl gold-gradient-bg text-charcoal-950 text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistCount === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gold/30 shadow-luxury max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-beige-100 flex items-center justify-center text-charcoal/40 mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif-luxury text-2xl font-semibold text-charcoal">
              Your wishlist is pristine
            </h2>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Explore our architectural living, bedroom, and dining suites to collect your favorite handcrafted designs.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
