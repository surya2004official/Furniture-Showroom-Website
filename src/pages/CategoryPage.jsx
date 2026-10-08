import React, { useState } from 'react';
import { CatalogImage } from '../components/common/CatalogImage';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';

export const CategoryPage = () => {
  const { slug } = useParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  const category = categories.find(c => c.slug === slug) || categories[0];
  const roomProducts = products.filter(p => p.category === category.slug)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Category Editorial Hero */}
      <div className="relative min-h-[340px] sm:min-h-[420px] flex items-center justify-center overflow-hidden bg-charcoal-950">
        <CatalogImage
          src={category.heroImage}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-black/40" />

        <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center text-ivory py-12 sm:py-16">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-white uppercase tracking-widest font-semibold mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Collections</span>
          </Link>

          <h1 className="font-serif-luxury text-3xl sm:text-6xl font-normal text-ivory">
            {category.name}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-ivory/80 max-w-xl mx-auto font-light leading-relaxed">
            {category.description}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/ai-room-designer"
              className="px-5 py-2.5 rounded-xl gold-gradient-bg text-charcoal-950 text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Design {category.name} with AI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-beige-300 gap-3">
          <div>
            <p className="text-xs text-charcoal/60 uppercase tracking-wider font-semibold">
              Showing {roomProducts.length} Exclusive Creations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-charcoal/60">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold font-medium"
            >
              <option value="featured">Featured & Curated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 pt-5 sm:pt-8">
          {roomProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Complete the Room Concept Banner */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-10 rounded-3xl bg-white border border-gold/40 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-gold text-xs font-semibold uppercase tracking-widest block">
              Architectural Cohesion
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-charcoal">
              Need Assistance Styling Your {category.name}?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              Our private interior architects offer 1-on-1 consultations, bespoke timber selections, and photorealistic 3D room elevations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              to="/book-showroom"
              className="px-6 py-3.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-2"
            >
              <span>Book Private Stylist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
