import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Award, Layers } from 'lucide-react';
import { collections, products } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';

export const CollectionsPage = () => {
  const [selectedCollectionId, setSelectedCollectionId] = useState(collections[0].id);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const activeCollection = collections.find(c => c.id === selectedCollectionId) || collections[0];
  const collectionProducts = products.filter(p => activeCollection.productIds.includes(p.id));

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-10 sm:py-14 px-3 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="w-full max-w-[1640px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold mb-2 border border-gold/30">
            <Award className="w-3.5 h-3.5" />
            <span>Haute Living Capsule Releases</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-6xl font-normal text-ivory">
            Luxury Collections
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Curated architectural design capsules where timber, stone, upholstery, and metalwork converge in poetic harmony.
          </p>
        </div>
      </div>

      {/* Capsule Collection Tabs with Photography */}
      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {collections.map((col) => {
            const isSelected = col.id === selectedCollectionId;
            return (
              <button
                key={col.id}
                onClick={() => setSelectedCollectionId(col.id)}
                className={`p-3 sm:p-3.5 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-charcoal text-ivory border-gold shadow-lg ring-1 ring-gold'
                    : 'bg-white hover:bg-beige-100 text-charcoal border-beige-300'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-wider block ${isSelected ? 'text-gold' : 'text-charcoal/50'}`}>
                  {col.subtitle}
                </span>
                <h3 className="font-serif-luxury text-xs sm:text-sm font-semibold mt-1 line-clamp-1">
                  {col.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Collection Spotlight Feature Banner */}
        <div className="mt-6 sm:mt-10 rounded-3xl overflow-hidden bg-white border border-gold/30 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-5 sm:p-10">
            <div className="lg:col-span-6 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Designed by {activeCollection.designer}</span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-normal text-charcoal">
                The {activeCollection.title} Capsule
              </h2>

              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                {activeCollection.description}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-charcoal/70">
                <span className="font-semibold text-walnut">{collectionProducts.length} Curated Masterpieces</span>
                <span>•</span>
                <span>White Glove Placement Included</span>
              </div>
            </div>

            <div className="lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
              <img
                src={activeCollection.image}
                alt={activeCollection.title}
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"; }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Products in this capsule */}
        <div className="mt-8 sm:mt-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 border-b border-beige-300">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-charcoal">
              Furniture from the {activeCollection.title} Suite
            </h3>
            <span className="text-xs text-charcoal/60">
              {collectionProducts.length} Pieces
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {collectionProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
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
