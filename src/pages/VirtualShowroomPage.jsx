import React, { useState } from 'react';
import { 
  Compass, ShoppingBag, X, Sparkles, Check 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { virtualShowrooms, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const VirtualShowroomPage = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const currentScene = virtualShowrooms[activeSceneIndex];
  const activeProduct = selectedHotspot 
    ? products.find(p => p.id === selectedHotspot.productId) 
    : null;

  const handleHotspotClick = (hs) => {
    setSelectedHotspot(hs);
    setJustAdded(false);
  };

  const handleAddToCart = () => {
    if (!activeProduct) return;
    addToCart(activeProduct, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="w-full bg-charcoal-950 min-h-screen text-ivory">
      {/* Header */}
      <div className="py-8 sm:py-10 px-3 sm:px-6 lg:px-8 border-b border-charcoal-800 bg-charcoal-900">
        <div className="w-full max-w-[1640px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-1">
              <Compass className="w-4 h-4" />
              <span>Interactive Spatial Discovery</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-4xl font-normal text-ivory">
              Virtual 360° Showroom
            </h1>
            <p className="text-xs text-ivory/60 mt-1 max-w-xl">
              Explore living, bedroom, dining, and office settings. Select a furniture marker to shop related catalog pieces inspired by the room.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHotspots(prev => !prev)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-colors ${
                showHotspots 
                  ? 'bg-gold text-charcoal-900 border-gold font-bold' 
                  : 'bg-charcoal-800 text-ivory/70 border-charcoal-700'
              }`}
            >
              {showHotspots ? 'Hide Hotspots' : 'Show Hotspots'}
            </button>
            <Link
              to="/book-showroom"
              className="px-4 py-2 rounded-xl border border-gold/40 text-gold hover:bg-gold/15 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Visit Our Showroom
            </Link>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
        {/* Scene Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {virtualShowrooms.map((scene, idx) => {
            const isSelected = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setJustAdded(false);
                  setSelectedHotspot(null);
                }}
                className={`group relative rounded-2xl overflow-hidden p-3 text-left border transition-all ${
                  isSelected 
                    ? 'border-gold shadow-gold-glow ring-1 ring-gold' 
                    : 'border-charcoal-800 opacity-60 hover:opacity-100 hover:border-charcoal-700'
                }`}
              >
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-2">
                  <img src={scene.image} alt={scene.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-[10px] text-gold uppercase font-bold tracking-wider block">
                  {scene.category}
                </span>
                <h4 className="font-serif-luxury text-xs font-semibold text-ivory truncate mt-0.5">
                  {scene.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* The Panoramic Scene Canvas with Hotspots */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-gold/30 shadow-2xl bg-charcoal select-none">
          <img
            key={currentScene.id}
            src={currentScene.image}
            alt={currentScene.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

          {/* Scene Title Overlay */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold px-3 py-1 rounded-full bg-charcoal/80 backdrop-blur-md border border-gold/40 shadow-sm">
              {currentScene.category} Tour
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-3xl text-ivory font-normal mt-2 drop-shadow-md">
              {currentScene.title}
            </h2>
          </div>

          {/* Hotspots */}
          {showHotspots && currentScene.hotspots.map((hs) => {
            const isHotspotSelected = selectedHotspot?.id === hs.id;
            const hotspotProduct = products.find(product => product.id === hs.productId);
            if (!hotspotProduct) return null;
            return (
              <div
                key={hs.id}
                className="group absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              >
                {/* Pulsing beacon button */}
                <button
                  onClick={() => handleHotspotClick(hs)}
                  className={`group relative flex items-center justify-center transition-transform hover:scale-125 focus:outline-none ${
                    isHotspotSelected ? 'scale-125' : ''
                  }`}
                  aria-label={`View ${hs.label}`}
                >
                  <span className="absolute w-8 h-8 rounded-full bg-gold/40 animate-ping"></span>
                  <span className="w-6 h-6 rounded-full bg-gold border-2 border-white flex items-center justify-center text-charcoal shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-charcoal-900"></span>
                  </span>
                </button>

                {/* Hover label hint */}
                <div className={`hidden sm:block absolute left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap px-2.5 py-1 rounded-lg bg-black/85 text-[11px] text-ivory border border-gold/40 shadow-lg pointer-events-none transition-opacity ${isHotspotSelected ? 'opacity-100 font-bold text-gold' : 'opacity-0 group-hover:opacity-100'}`}>
                  {hs.label} • {formatINR(hotspotProduct.price)}
                </div>
              </div>
            );
          })}

          {/* Bottom helper pill */}
          <div className="absolute bottom-4 left-6 z-10 hidden sm:block text-[11px] text-ivory/70 bg-black/60 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            Select a marker to shop a related piece for this room
          </div>

          {/* Slide-over Drawer when Hotspot is selected */}
          {selectedHotspot && activeProduct && (
            <div className="absolute top-4 right-4 bottom-4 w-[calc(100%-2rem)] sm:w-[380px] bg-charcoal-900/95 backdrop-blur-xl rounded-2xl border border-gold/50 shadow-2xl p-5 z-30 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
                  <div className="flex items-center gap-1.5 text-gold text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suggested Catalog Piece</span>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="p-1 text-ivory/60 hover:text-ivory"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-charcoal-950 border border-charcoal-800">
                  <img src={activeProduct.images[0]} alt={activeProduct.name} className="w-full h-full object-cover" />
                </div>

                <div>
                  <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                    {activeProduct.categoryName} • {activeProduct.collection}
                  </span>
                  <h3 className="font-serif-luxury text-lg font-bold text-ivory leading-tight mt-0.5">
                    {activeProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif-luxury text-xl font-bold text-gold">
                      {formatINR(activeProduct.price)}
                    </span>
                    {activeProduct.originalPrice && (
                      <span className="text-xs text-ivory/40 line-through">
                        {formatINR(activeProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-ivory/70 leading-relaxed line-clamp-3">
                  {activeProduct.description}
                </p>

                <div className="p-3 rounded-xl bg-charcoal-800/80 text-[11px] text-ivory/80 space-y-1">
                  <p><strong className="text-ivory">Dimensions:</strong> {activeProduct.dimensions.width} × {activeProduct.dimensions.depth} × {activeProduct.dimensions.height}</p>
                  <p><strong className="text-ivory">Materials:</strong> {activeProduct.materials}</p>
                </div>
              </div>

              <div className="pt-4 space-y-2 border-t border-charcoal-800">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-4 rounded-xl gold-gradient-bg text-charcoal-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-md active:scale-95 transition-all"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>Added to Sanctuary Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/product/${activeProduct.id}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-gold/40 text-gold hover:bg-gold/15 text-xs font-semibold tracking-wider uppercase text-center block transition-colors"
                >
                  View Product Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
