import React from 'react';
import { 
  Layers, Trash2, ShoppingBag, Check, Star, 
  ArrowRight, Sparkles, X, Plus 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { formatINR } from '../utils/formatters';

export const ComparePage = () => {
  const { compareProducts, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const { addToCart } = useCart();

  const handleSampleCompare = (id1, id2) => {
    clearCompare();
    addToCompare(id1);
    addToCompare(id2);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-14 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-1">
              <Layers className="w-4 h-4" />
              <span>Architectural Specifications Matrix</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-ivory">
              Furniture Comparison
            </h1>
            <p className="text-xs text-ivory/70 mt-1">
              Comparing {compareProducts.length} pieces side-by-side across materials, tolerances, and dimensions.
            </p>
          </div>

          {compareProducts.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-medium text-ivory transition-colors self-start sm:self-auto"
            >
              Clear Comparison
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {compareProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gold/30 shadow-luxury max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-beige-100 flex items-center justify-center text-charcoal/40 mx-auto">
              <Layers className="w-8 h-8" />
            </div>
            <h2 className="font-serif-luxury text-2xl font-semibold text-charcoal">
              No pieces selected for comparison
            </h2>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Click the comparison icon on any product card in the catalog to evaluate specifications side-by-side.
            </p>

            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-bold text-gold uppercase tracking-wider">Quick Comparison Demos:</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleSampleCompare('prod-1', 'prod-6')}
                  className="px-4 py-2.5 rounded-xl bg-beige-100 hover:bg-gold text-charcoal text-xs font-medium transition-colors"
                >
                  Milano Curved Sofa vs. Palermo Sectional
                </button>
                <button
                  onClick={() => handleSampleCompare('prod-7', 'prod-24')}
                  className="px-4 py-2.5 rounded-xl bg-beige-100 hover:bg-gold text-charcoal text-xs font-medium transition-colors"
                >
                  Aethelgard Canopy Bed vs. Kyoto Platform Bed
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl border border-gold/30 shadow-luxury">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-beige-200 bg-beige-50">
                  <th className="p-5 font-serif-luxury text-sm font-semibold text-charcoal w-48 min-w-[180px]">
                    Attribute Matrix
                  </th>
                  {compareProducts.map(p => (
                    <th key={p.id} className="p-5 min-w-[240px] max-w-[280px]">
                      <div className="relative space-y-3">
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="absolute -top-2 -right-2 p-1 text-charcoal/40 hover:text-rose-600 bg-white rounded-full border border-beige-300"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-beige-100">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-[10px] text-gold uppercase font-bold tracking-wider">{p.categoryName}</span>
                          <Link to={`/product/${p.id}`} className="font-serif-luxury text-sm font-bold text-charcoal hover:text-gold block truncate mt-0.5">
                            {p.name}
                          </Link>
                          <p className="font-serif-luxury text-base font-bold text-walnut mt-1">{formatINR(p.price)}</p>
                        </div>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="w-full py-2.5 px-3 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </th>
                  ))}
                  {compareProducts.length < 4 && (
                    <th className="p-5 min-w-[200px] text-center border-l border-dashed border-beige-300">
                      <Link
                        to="/shop"
                        className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-beige-300 hover:border-gold rounded-2xl p-4 text-charcoal/60 hover:text-gold transition-colors space-y-2"
                      >
                        <Plus className="w-6 h-6" />
                        <span className="text-xs font-semibold">Add another product</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-beige-200 text-charcoal/80">
                {/* Rating */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">Client Rating</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                        <span>{p.rating} / 5.0</span>
                        <span className="text-charcoal/40 font-normal ml-1">({p.reviewCount})</span>
                      </div>
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>

                {/* Primary Materials */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">Materials & Construction</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 leading-relaxed">
                      {p.materials}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>

                {/* Dimensions Width */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">Overall Width</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 font-medium text-charcoal">
                      {p.dimensions.width}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>

                {/* Dimensions Depth */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">Overall Depth</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 font-medium text-charcoal">
                      {p.dimensions.depth}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>

                {/* Dimensions Height */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">Height & Seat Height</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4">
                      <p>Height: {p.dimensions.height}</p>
                      <p className="text-[11px] text-charcoal/60">Seat: {p.dimensions.seatHeight}</p>
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>

                {/* Weight */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">Net Weight</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 font-medium">
                      {p.dimensions.weight}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>

                {/* Style */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">Architectural Style</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-beige-100 text-walnut font-semibold">
                        {p.style}
                      </span>
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>

                {/* Warranty */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">Warranty Policy</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4 text-emerald-800 font-semibold">
                      {p.warranty}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>

                {/* 3D Model Available */}
                <tr>
                  <td className="p-4 font-semibold text-charcoal bg-beige-50/50">3D Interactive Studio</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="p-4">
                      {p.has3dModel ? (
                        <span className="text-emerald-700 font-bold">✓ 360° Studio Enabled</span>
                      ) : (
                        <span className="text-charcoal/40">Multi-Angle High Res</span>
                      )}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td></td>}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
