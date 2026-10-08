import React, { useState } from 'react';
import { 
  Heart, Sparkles, Filter, ArrowRight, Eye, 
  ShoppingBag, Check, Layers, Compass 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { roomInspirations, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const InspirationPage = () => {
  const [selectedRoom, setSelectedRoom] = useState('All');
  const [likesMap, setLikesMap] = useState({});
  const [activeModalInspiration, setActiveModalInspiration] = useState(null);
  const { addToCart } = useCart();
  const [addedMap, setAddedMap] = useState({});

  const roomFilters = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office', 'Outdoor'];

  const filteredInspirations = selectedRoom === 'All'
    ? roomInspirations
    : roomInspirations.filter(ins => ins.room === selectedRoom);

  const handleLike = (e, id) => {
    e.stopPropagation();
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleAddToCart = (e, prod) => {
    e.stopPropagation();
    addToCart(prod, 1);
    setAddedMap(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [prod.id]: false })), 2000);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-10 sm:py-14 px-3 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="w-full max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold border border-gold/30">
            <Compass className="w-3.5 h-3.5" />
            <span>Pinterest-Style Editorial Curation</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-ivory">
            Room Inspiration Gallery
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Real architectural projects furnished exclusively with AURA Living pieces. Click on any interior scene to shop the exact furniture products.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {roomFilters.map((room) => (
              <button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedRoom === room
                    ? 'bg-gold text-charcoal-900 shadow-md font-bold'
                    : 'bg-charcoal-800 text-ivory/70 hover:bg-charcoal-700'
                }`}
              >
                {room}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredInspirations.map((insp) => {
            const currentLikes = (insp.likes || 120) + (likesMap[insp.id] || 0);
            const featuredItems = (insp.featuredProducts || [])
              .map(id => products.find(p => p.id === id))
              .filter(Boolean);

            return (
              <div
                key={insp.id}
                onClick={() => setActiveModalInspiration(insp)}
                className="group bg-white rounded-3xl overflow-hidden border border-gold/30 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-beige-100">
                  <img
                    src={insp.image}
                    alt={insp.title}
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"; }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-charcoal/80 text-gold text-[10px] uppercase font-bold tracking-wider backdrop-blur-md border border-gold/30">
                      {insp.room}
                    </span>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={(e) => handleLike(e, insp.id)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-charcoal backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 shadow-md"
                  >
                    <Heart className={`w-4 h-4 ${likesMap[insp.id] ? 'fill-rose-600 text-rose-600' : 'text-charcoal'}`} />
                  </button>

                  {/* Quick Shop The Look badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-semibold flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-xl backdrop-blur-md">
                      <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                      <span>{featuredItems.length} Tagged Pieces</span>
                    </span>
                    <span className="text-xs bg-gold text-charcoal-900 font-bold px-3 py-1.5 rounded-xl">
                      Shop The Look
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-charcoal/50 mb-1">
                      <span>{insp.style}</span>
                      <span>By {insp.author}</span>
                    </div>

                    <h3 className="font-serif-luxury text-lg font-semibold text-charcoal group-hover:text-gold transition-colors">
                      {insp.title}
                    </h3>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {insp.tags?.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-beige-100 text-charcoal/70 px-2 py-0.5 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Thumbnail Strip of Tagged Furniture */}
                  <div className="pt-4 border-t border-beige-200 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {featuredItems.map((item, i) => (
                        <img
                          key={i}
                          src={item.images[0]}
                          alt={item.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                          title={item.name}
                        />
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-walnut flex items-center gap-1 group-hover:text-gold">
                      <span>Inspect Suite</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal for Selected Look */}
      {activeModalInspiration && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={() => setActiveModalInspiration(null)} />

          <div className="relative bg-[#FAF8F5] rounded-3xl max-w-4xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-gold/40 z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-beige-300">
              <div>
                <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                  {activeModalInspiration.room} • {activeModalInspiration.style}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-charcoal mt-0.5">
                  {activeModalInspiration.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalInspiration(null)}
                className="p-2 rounded-full bg-white text-charcoal hover:bg-beige-200"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img src={activeModalInspiration.image} alt={activeModalInspiration.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-luxury text-base font-semibold text-charcoal mb-3">
                    Featured Furniture in this Look
                  </h4>

                  <div className="space-y-3">
                    {activeModalInspiration.featuredProducts.map(prodId => {
                      const prod = products.find(p => p.id === prodId);
                      if (!prod) return null;
                      return (
                        <div key={prod.id} className="p-3 bg-white rounded-2xl border border-beige-300 flex items-center justify-between gap-3 hover:border-gold transition-colors">
                          <img src={prod.images[0]} alt={prod.name} className="w-14 h-14 object-cover rounded-xl" />
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/product/${prod.id}`}
                              onClick={() => setActiveModalInspiration(null)}
                              className="font-serif-luxury text-xs font-semibold text-charcoal hover:text-gold block truncate"
                            >
                              {prod.name}
                            </Link>
                            <p className="text-xs font-bold text-walnut mt-0.5">{formatINR(prod.price)}</p>
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(e, prod)}
                            className="p-2 rounded-xl bg-beige-100 hover:bg-gold text-charcoal transition-colors"
                            title="Add to Bag"
                          >
                            {addedMap[prod.id] ? <Check className="w-4 h-4 text-emerald-700" /> : <ShoppingBag className="w-4 h-4" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-beige-300">
                  <Link
                    to="/ai-room-designer"
                    onClick={() => setActiveModalInspiration(null)}
                    className="w-full py-3.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider text-center block shadow-md"
                  >
                    Recreate This Look with AI Designer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
