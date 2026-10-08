import React, { useState } from 'react';
import { 
  Sparkles, SlidersHorizontal, ShoppingBag, ArrowRight, 
  Check, ShieldCheck, CheckCircle2, PieChart, Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const BudgetPlannerPage = () => {
  const [totalBudget, setTotalBudget] = useState(300000);
  const [selectedRoom, setSelectedRoom] = useState('living-room');
  const { addToCart } = useCart();
  const [planAdded, setPlanAdded] = useState(false);

  // Allocation formulas per room
  const roomConfig = {
    'living-room': [
      { role: 'Anchor Seating (Sofa)', share: 0.55, targetCategory: 'living-room', filterKey: 'Sofa' },
      { role: 'Centerpiece Table', share: 0.20, targetCategory: 'living-room', filterKey: 'Coffee' },
      { role: 'Architectural Accent Lounger', share: 0.25, targetCategory: 'living-room', filterKey: 'Armchair' }
    ],
    'bedroom': [
      { role: 'King Canopy Bed Platform', share: 0.58, targetCategory: 'bedroom', filterKey: 'Bed' },
      { role: 'Matching Nightstand Pair', share: 0.22, targetCategory: 'bedroom', filterKey: 'Bedside' },
      { role: 'Hydraulic Storage Bench', share: 0.20, targetCategory: 'bedroom', filterKey: 'Bench' }
    ],
    'dining-room': [
      { role: 'Monumental Dining Table', share: 0.65, targetCategory: 'dining-room', filterKey: 'Table' },
      { role: 'Artisan Dining Chairs (Pair)', share: 0.35, targetCategory: 'dining-room', filterKey: 'Chair' }
    ],
    'office': [
      { role: 'Executive Cantilevered Desk', share: 0.65, targetCategory: 'office', filterKey: 'Desk' },
      { role: 'Ergonomic Aniline Chair', share: 0.35, targetCategory: 'office', filterKey: 'Chair' }
    ]
  };

  const currentAllocation = roomConfig[selectedRoom] || roomConfig['living-room'];

  // Match optimal catalog products for each role
  const recommendedAllocations = currentAllocation.map(alloc => {
    const allocatedBudget = Math.round(totalBudget * alloc.share);
    // Find products in this category that match the keyword
    let matches = products.filter(p => 
      p.category === alloc.targetCategory && 
      p.name.toLowerCase().includes(alloc.filterKey.toLowerCase())
    );
    if (matches.length === 0) {
      matches = products.filter(p => p.category === alloc.targetCategory);
    }

    // Select the best product closest to budget without exceeding by too much
    const chosenProduct = matches.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.price - allocatedBudget);
      const currDiff = Math.abs(curr.price - allocatedBudget);
      return currDiff < prevDiff ? curr : prev;
    }, matches[0] || products[0]);

    return {
      ...alloc,
      allocatedBudget,
      chosenProduct
    };
  });

  const totalSelectedPrice = recommendedAllocations.reduce((sum, item) => sum + (item.chosenProduct?.price || 0), 0);
  const budgetVariance = totalBudget - totalSelectedPrice;

  const handleAddPlanToCart = () => {
    recommendedAllocations.forEach(item => {
      if (item.chosenProduct) addToCart(item.chosenProduct, 1);
    });
    setPlanAdded(true);
    setTimeout(() => setPlanAdded(false), 2200);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-16 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest border border-gold/30">
            <PieChart className="w-3.5 h-3.5" />
            <span>Algorithmic Sanctuary Planning</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-ivory">
            Furniture Budget Planner
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Specify your total investment. Our algorithm optimizes spatial allocations across seating, tables, and accents to deliver a cohesive room within budget.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Controls (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-6">
            <h3 className="font-serif-luxury text-xl font-semibold text-charcoal pb-3 border-b border-beige-200">
              1. Investment Parameters
            </h3>

            {/* Target Budget Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
                  Total Room Budget
                </label>
                <span className="font-serif-luxury text-2xl font-bold text-walnut">
                  {formatINR(totalBudget)}
                </span>
              </div>
              <input
                type="range"
                min="120000"
                max="600000"
                step="10000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal/50 mt-1">
                <span>₹1,20,000</span>
                <span>₹6,00,000+</span>
              </div>
            </div>

            {/* Room Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5">
                Target Sanctuary Room
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'living-room', label: 'Living Room' },
                  { id: 'bedroom', label: 'Master Bedroom' },
                  { id: 'dining-room', label: 'Dining Chamber' },
                  { id: 'office', label: 'Executive Office' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRoom(r.id)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                      selectedRoom === r.id
                        ? 'bg-charcoal text-ivory border-gold shadow-md ring-1 ring-gold'
                        : 'bg-ivory text-charcoal/80 border-beige-300 hover:border-gold'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Allocation Breakdown Pill */}
            <div className="p-4 rounded-2xl bg-beige-50 border border-beige-300 space-y-3">
              <h4 className="font-serif-luxury text-xs font-semibold text-charcoal uppercase tracking-wider">
                Algorithmic Capital Allocation
              </h4>
              <div className="space-y-2 text-xs">
                {recommendedAllocations.map((alloc, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-charcoal/70">{alloc.role} ({Math.round(alloc.share * 100)}%):</span>
                    <span className="font-semibold text-charcoal">{formatINR(alloc.allocatedBudget)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Matching Inventory (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-beige-200 gap-2">
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold text-charcoal">
                  Optimized Furniture Suite
                </h3>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Algorithmically curated matching pieces
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-charcoal/50">Plan Total:</span>
                <p className="font-serif-luxury text-2xl font-bold text-walnut">{formatINR(totalSelectedPrice)}</p>
                <p className={`text-[11px] font-semibold ${budgetVariance >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {budgetVariance >= 0 ? `Surplus: ${formatINR(budgetVariance)} saved` : `Variance: +${formatINR(Math.abs(budgetVariance))}`}
                </p>
              </div>
            </div>

            {/* Recommended Products List */}
            <div className="space-y-4">
              {recommendedAllocations.map((alloc, idx) => {
                const prod = alloc.chosenProduct;
                if (!prod) return null;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-ivory border border-beige-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-gold transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={prod.images[0]} alt={prod.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-beige-50 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-gold uppercase font-bold tracking-wider">{alloc.role}</span>
                        <Link to={`/product/${prod.id}`} className="font-serif-luxury text-sm font-semibold text-charcoal hover:text-gold block">
                          {prod.name}
                        </Link>
                        <p className="text-[11px] text-charcoal/60 mt-0.5 line-clamp-1">{prod.materials}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      <div className="text-right">
                        <span className="text-xs font-bold text-walnut">{formatINR(prod.price)}</span>
                        {prod.originalPrice && (
                          <span className="block text-[10px] text-charcoal/40 line-through">{formatINR(prod.originalPrice)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="p-2 rounded-xl bg-white hover:bg-gold text-charcoal border border-beige-300 text-xs transition-colors"
                        title="Add Item"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Complete Plan CTA */}
            <div className="pt-4 border-t border-beige-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-charcoal/70">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Complimentary White Glove Delivery & In-Home Assembly Included</span>
              </div>

              <button
                onClick={handleAddPlanToCart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-95 transition-all"
              >
                {planAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Complete Suite Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Add Complete Budget Plan to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
