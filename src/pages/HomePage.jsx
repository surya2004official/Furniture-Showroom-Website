import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Eye, Star, ShieldCheck, Award, 
  Rotate3d, Compass, Calendar, Check, SlidersHorizontal, Camera 
} from 'lucide-react';
import { products, categories, collections, customerTestimonials } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { Furniture3DViewer } from '../components/3d/Furniture3DViewer';
import { formatINR } from '../utils/formatters';

export const HomePage = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedRoomTab, setSelectedRoomTab] = useState('all');

  const bestsellers = products.filter(p => p.bestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);

  const filteredTabProducts = selectedRoomTab === 'all' 
    ? products.slice(0, 8)
    : products.filter(p => p.category === selectedRoomTab).slice(0, 8);

  const instagramShots = [
    {
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      handle: "@archdigest_india",
      caption: "Worli Penthouse featuring Aura Milano Curved Sofa"
    },
    {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      handle: "@luxe_interiors",
      caption: "Morning light across the Aethelgard Floating Canopy Bed"
    },
    {
      img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
      handle: "@vogue_living",
      caption: "Valenza Travertine table styled for private dinner parties"
    },
    {
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
      handle: "@studio_mehrotra",
      caption: "Executive study retreat in American walnut & aniline leather"
    }
  ];

  return (
    <div className="w-full">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[82vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-charcoal-950">
        {/* Background Image with Cinematic Luxury Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Living Room Interior"
            className="w-full h-full object-cover scale-105 animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-ivory py-16 sm:py-24">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal/80 border border-gold/40 backdrop-blur-md mb-4 sm:mb-6 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-semibold">
              Bespoke Italian & Nordic Architecture
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-luxury text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-ivory leading-[1.08] max-w-4xl mx-auto">
            Redefining Spaces. <br />
            <span className="italic font-light gold-gradient-text">Inspiring Living.</span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="mt-4 sm:mt-6 text-xs sm:text-lg text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Collectible furniture sculpted from American black walnut, honed Roman travertine, and sensory French bouclé. Tailored for sanctuaries of distinction.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl gold-gradient-bg text-charcoal-950 text-xs sm:text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-charcoal-950" />
            </Link>

            <Link
              to="/ai-room-designer"
              className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl glass-card-dark text-ivory hover:text-gold border border-gold/40 text-xs sm:text-sm font-semibold uppercase tracking-widest hover:bg-charcoal transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Design My Room with AI</span>
            </Link>
          </div>

          {/* Trust stats pill */}
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center max-w-3xl mx-auto text-xs text-ivory/70">
            <div>
              <p className="font-serif-luxury text-lg sm:text-2xl font-bold text-gold">32+</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ivory/60 mt-0.5">Architectural Designs</p>
            </div>
            <div>
              <p className="font-serif-luxury text-lg sm:text-2xl font-bold text-gold">10-Year</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ivory/60 mt-0.5">Frame Guarantee</p>
            </div>
            <div>
              <p className="font-serif-luxury text-lg sm:text-2xl font-bold text-gold">4 Showrooms</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ivory/60 mt-0.5">Mumbai, Delhi & BLR</p>
            </div>
            <div>
              <p className="font-serif-luxury text-lg sm:text-2xl font-bold text-gold">100%</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ivory/60 mt-0.5">White Glove Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANIMATED CATEGORY SHOWCASE (SHOP BY ROOM) */}
      <section className="py-10 sm:py-16 px-3 sm:px-6 lg:px-8 w-full max-w-[1640px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-1">
              <span className="w-6 h-px bg-gold"></span>
              <span>Architectural Curation</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-normal text-charcoal">
              Discover by Sanctuary
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs sm:text-sm text-charcoal/70 max-w-md">
            Explore dedicated spaces crafted with natural material palettes, ergonomic integrity, and bespoke proportions.
          </p>
        </div>

        <div className="sanctuary-marquee" aria-label="Shop furniture by room">
          <div className="sanctuary-track">
            {[0, 1].map(copy => (
              <div className="sanctuary-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="sanctuary-card group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gold"
                  >
                    <img
                      src={cat.heroImage}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/25 to-transparent" />
                    <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-ivory flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">
                          {cat.itemCount}
                        </span>
                        <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-ivory group-hover:text-gold transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-sm text-ivory/80 line-clamp-2 mt-2 max-w-md hidden sm:block">
                          {cat.tagline}
                        </p>
                      </div>
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-ivory group-hover:bg-gold group-hover:text-charcoal-900 transition-colors flex-shrink-0">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BESTSELLING FURNITURE SPOTLIGHT */}
      <section className="py-10 sm:py-16 bg-beige-100/60 border-y border-beige-300">
        <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10">
            <div>
              <span className="text-gold text-xs font-semibold uppercase tracking-widest block mb-0.5">
                Coveted Masterpieces
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-normal text-charcoal">
                Bestselling Iconography
              </h2>
            </div>
            <Link
              to="/shop"
              className="mt-2 md:mt-0 text-xs font-semibold uppercase tracking-widest text-walnut hover:text-gold flex items-center gap-1.5 transition-colors"
            >
              <span>View All {products.length} Catalog Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2-columns on mobile, 4-columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestsellers.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. 3D INTERACTIVE FURNITURE SPOTLIGHT */}
      <section className="py-10 sm:py-16 px-3 sm:px-6 lg:px-8 w-full max-w-[1640px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-walnut/10 border border-gold/40 text-walnut text-xs font-semibold">
              <Rotate3d className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '8s' }} />
              <span>Three.js Spatial Studio</span>
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-tight">
              Tactile Precision in <br />
              <span className="italic text-walnut">Interactive 360°</span>
            </h2>

            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Experience the sculptural contours of the <strong>Verona Cognac Leather Lounge Armchair</strong>. Rotate, inspect stitching tolerances, adjust studio illumination, and test fine fabric finishes before commissioning.
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs text-charcoal/80">
                <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center text-walnut font-bold text-[10px]">✓</div>
                <span>Full 360-degree orbital rotation and spatial zoom</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-charcoal/80">
                <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center text-walnut font-bold text-[10px]">✓</div>
                <span>Live upholstery material and finish switching</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-charcoal/80">
                <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center text-walnut font-bold text-[10px]">✓</div>
                <span>Architectural dimension verification</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/product/prod-2"
                className="px-5 py-3 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-2"
              >
                <span>View Product Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/virtual-showroom"
                className="px-5 py-3 rounded-xl border border-charcoal/20 text-charcoal hover:bg-beige-200 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Enter 360 Showroom</span>
              </Link>
            </div>
          </div>

          {/* Right 3D Viewer Container */}
          <div className="lg:col-span-7">
            <Furniture3DViewer
              initialColor="#96552B"
              colors={[
                { name: 'Cognac Saddle Leather', hex: '#96552B' },
                { name: 'Ivory French Bouclé', hex: '#FAF8F5' },
                { name: 'Oatmeal Wool', hex: '#E8DED1' },
                { name: 'Midnight Charcoal', hex: '#242424' },
                { name: 'Forest Velvet', hex: '#1B4D3E' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. BEFORE-AND-AFTER ROOM TRANSFORMATION SLIDER */}
      <section className="py-10 sm:py-16 bg-charcoal-900 text-ivory">
        <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-gold text-xs font-semibold uppercase tracking-widest block mb-1">
              Spatial Metamorphosis
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-normal text-ivory">
              Before & After Interior Vision
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-ivory/70">
              Drag the interactive gold divider to witness how AURA Living transforms raw spaces into breathtaking architectural homes.
            </p>
          </div>

          <div className="w-full max-w-5xl mx-auto">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
              afterImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              beforeLabel="Unfurnished Bare Room"
              afterLabel="AURA Living Bespoke Transformation"
            />
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/ai-room-designer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient-bg text-charcoal-950 text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulate Your Own Room Transformation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. AI ROOM DESIGNER PROMOTIONAL BANNER */}
      <section className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 w-full max-w-[1640px] mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden walnut-gradient-bg p-6 sm:p-12 text-ivory shadow-2xl border border-gold/40">
          <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/50 text-gold text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Spatial Design Suite</span>
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-normal text-ivory leading-tight">
              Upload Your Room Photo. <br />
              <span className="italic font-light gold-gradient-text">Let AI Furnish Your Vision.</span>
            </h2>

            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
              Select your room dimensions, preferred design palette (Scandinavian, Minimalist, Italian Modern), and set your furniture budget. Our AI interior designer curates matching catalog bundles with estimated savings in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/ai-room-designer"
                className="px-6 py-3 rounded-xl gold-gradient-bg text-charcoal-950 text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-2"
              >
                <span>Launch AI Room Designer</span>
                <ArrowRight className="w-4 h-4 text-charcoal-950" />
              </Link>
              <Link
                to="/style-finder"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-ivory text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-white/20 transition-colors"
              >
                Take Style Finder Quiz
              </Link>
            </div>
          </div>

          {/* Decorative Background Element */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 lg:opacity-60 hidden md:block pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
              alt="Room styling"
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
        </div>
      </section>

      {/* 7. SHOP BY ROOM INTERACTIVE SELECTOR TAB */}
      <section className="py-10 sm:py-16 px-3 sm:px-6 lg:px-8 w-full max-w-[1640px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-gold text-xs font-semibold uppercase tracking-widest block mb-0.5">
            Curated Catalog
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-normal text-charcoal">
            Explore Selected Architecture
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-6">
            <button
              onClick={() => setSelectedRoomTab('all')}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedRoomTab === 'all'
                  ? 'bg-charcoal text-ivory shadow-md'
                  : 'bg-beige-100 text-charcoal/70 hover:bg-beige-200'
              }`}
            >
              All Sanctuaries
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedRoomTab(c.slug)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedRoomTab === c.slug
                    ? 'bg-charcoal text-ivory shadow-md'
                    : 'bg-beige-100 text-charcoal/70 hover:bg-beige-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredTabProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-10 sm:py-16 w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-gold text-xs font-semibold uppercase tracking-widest block mb-0.5">
            Private Commissions
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-normal text-charcoal">
            Praised by Patrons & Architects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {customerTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-gold/30 shadow-luxury flex flex-col justify-between space-y-3 sm:space-y-4"
            >
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-beige-200 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-gold/40"
                />
                <div>
                  <h4 className="font-serif-luxury text-xs font-semibold text-charcoal">{t.name}</h4>
                  <p className="text-[10px] sm:text-[11px] text-charcoal/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. INSTAGRAM SHOP-THE-LOOK GALLERY */}
      <section className="py-10 sm:py-14 bg-beige-100/50 border-t border-beige-300">
        <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <h3 className="font-serif-luxury text-lg sm:text-xl font-semibold text-charcoal">@auraliving.interiors</h3>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-walnut hover:text-gold"
            >
              Follow on Instagram
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {instagramShots.map((shot, i) => (
              <div key={i} className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square shadow-sm">
                <img
                  src={shot.img}
                  alt={shot.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 sm:p-4 text-ivory">
                  <p className="text-[10px] text-gold font-bold">{shot.handle}</p>
                  <p className="text-xs text-ivory/90 mt-0.5 line-clamp-2">{shot.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
