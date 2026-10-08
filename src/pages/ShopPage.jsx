import React, { useState, useMemo } from 'react';
import { 
  Filter, Grid3X3, Grid2X2, List, SlidersHorizontal, 
  Search, X, Check, ArrowUpDown, Sparkles 
} from 'lucide-react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { formatINR } from '../utils/formatters';

export const ShopPage = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [priceRange, setPriceRange] = useState(350000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid-3'); // 'grid-3' | 'grid-4' | 'list'

  const stylesList = ['All', 'Modern Luxury', 'Nordic Minimalist', 'Japandi', 'Mid-Century Luxury', 'Classical Luxury', 'Executive Modern', 'Coastal Luxury'];
  const materialsList = ['All', 'Walnut', 'Travertine', 'Bouclé', 'Leather', 'Oak', 'Teak', 'Marble', 'Brass'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = (
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.materials.toLowerCase().includes(q) ||
          product.collection.toLowerCase().includes(q)
        );
        if (!matches) return false;
      }
      // Style filter
      if (selectedStyle !== 'all' && !product.style.toLowerCase().includes(selectedStyle.toLowerCase())) {
        return false;
      }
      // Material filter
      if (selectedMaterial !== 'all' && !product.materials.toLowerCase().includes(selectedMaterial.toLowerCase())) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0); // Featured / Popular
    });
  }, [searchQuery, selectedCategory, selectedStyle, selectedMaterial, priceRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSelectedMaterial('all');
    setPriceRange(350000);
    setSortBy('featured');
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header Banner */}
      <div className="bg-charcoal text-ivory py-10 sm:py-14 px-3 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="w-full max-w-[1640px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold mb-2 border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Architectural Atelier</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-ivory">
            Shop All Furniture
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            32+ masterfully tailored pieces. From sculptural French bouclé curved sofas to Roman travertine dining slabs and executive walnut desks.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-beige-300">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by piece, wood, leather, or style..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-beige-300 text-xs text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort, View Toggle, Filter Button */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-beige-300 text-xs font-semibold text-charcoal shadow-sm"
            >
              <Filter className="w-4 h-4 text-gold" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none text-charcoal cursor-pointer font-medium"
              >
                <option value="featured">Featured & Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* Grid View Mode Switchers */}
            <div className="hidden sm:flex items-center bg-white border border-beige-300 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode('grid-3')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid-3' ? 'bg-charcoal text-ivory' : 'text-charcoal/60 hover:text-charcoal'}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid-4')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid-4' ? 'bg-charcoal text-ivory' : 'text-charcoal/60 hover:text-charcoal'}`}
                title="4 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 pt-4 sm:pt-6">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block space-y-7 pr-4 border-r border-beige-300">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-base font-semibold text-charcoal">Refine Atelier</h3>
              <button
                onClick={resetFilters}
                className="text-xs text-walnut hover:text-gold font-medium underline"
              >
                Reset All
              </button>
            </div>

            {/* Room Category */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3">Sanctuary Room</h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${selectedCategory === 'all' ? 'bg-charcoal text-ivory font-semibold' : 'hover:bg-beige-200 text-charcoal/80'}`}
                >
                  <span>All Furniture</span>
                  <span className="text-[11px] opacity-70">({products.length})</span>
                </button>
                {categories.map(c => {
                  const count = products.filter(p => p.category === c.slug).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${selectedCategory === c.slug ? 'bg-charcoal text-ivory font-semibold' : 'hover:bg-beige-200 text-charcoal/80'}`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[11px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold">Price Ceiling</h4>
                <span className="text-xs font-bold text-walnut">{formatINR(priceRange)}</span>
              </div>
              <input
                type="range"
                min="40000"
                max="350000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal/50 mt-1">
                <span>₹40,000</span>
                <span>₹3,50,000+</span>
              </div>
            </div>

            {/* Architectural Style */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2.5">Interior Style</h4>
              <div className="flex flex-wrap gap-1.5">
                {stylesList.map((style) => {
                  const isSel = (style === 'All' && selectedStyle === 'all') || selectedStyle === style;
                  return (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style === 'All' ? 'all' : style)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all ${isSel ? 'bg-walnut text-ivory border-walnut font-medium' : 'bg-white text-charcoal/80 border-beige-300 hover:border-gold'}`}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2.5">Key Materials</h4>
              <div className="flex flex-wrap gap-1.5">
                {materialsList.map((mat) => {
                  const isSel = (mat === 'All' && selectedMaterial === 'all') || selectedMaterial === mat;
                  return (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat === 'All' ? 'all' : mat)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all ${isSel ? 'bg-gold text-charcoal-900 border-gold font-bold' : 'bg-white text-charcoal/80 border-beige-300 hover:border-gold'}`}
                    >
                      {mat}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Product Cards Stream */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 text-xs text-charcoal/60">
              <p>
                Presenting <strong className="text-charcoal">{filteredProducts.length}</strong> master creations
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gold/30 space-y-4">
                <SlidersHorizontal className="w-10 h-10 text-gold mx-auto" />
                <h3 className="font-serif-luxury text-xl font-semibold text-charcoal">No furniture matches your criteria</h3>
                <p className="text-xs text-charcoal/60 max-w-sm mx-auto">
                  Try adjusting the price ceiling or resetting materials to view our handcrafted pieces.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-3 sm:gap-6 ${
                viewMode === 'grid-4' 
                  ? 'grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#FAF8F5] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-beige-300">
                  <h3 className="font-serif-luxury text-lg font-bold text-charcoal">Filter Catalog</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-charcoal">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2">Sanctuary Room</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs ${selectedCategory === 'all' ? 'bg-charcoal text-ivory font-bold' : 'text-charcoal'}`}
                    >
                      All Furniture
                    </button>
                    {categories.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs ${selectedCategory === c.slug ? 'bg-charcoal text-ivory font-bold' : 'text-charcoal'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-gold uppercase">Price Ceiling</span>
                    <span className="font-bold text-walnut">{formatINR(priceRange)}</span>
                  </div>
                  <input
                    type="range"
                    min="40000"
                    max="350000"
                    step="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-beige-300 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 rounded-xl border border-charcoal/20 text-xs font-semibold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
