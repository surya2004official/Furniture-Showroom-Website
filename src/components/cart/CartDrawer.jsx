import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryCharge,
    appliedPromo,
    promoDiscountAmount,
    total,
    promoCode,
    setPromoCode,
    applyPromo,
    removePromo,
    promoError
  } = useCart();

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode) applyPromo(promoCode);
  };

  const freeDeliveryThreshold = 50000;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-gold/30 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 bg-charcoal text-ivory flex items-center justify-between border-b border-gold/30">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-serif-luxury text-base tracking-wide font-semibold">Your Selected Furniture</h2>
              <span className="text-xs bg-gold/20 text-gold px-2.5 py-0.5 rounded-full border border-gold/30">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-ivory/70 hover:text-ivory p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary White Glove Progress Bar */}
          <div className="px-6 py-3 bg-beige-100 border-b border-beige-300 text-xs">
            {subtotal >= freeDeliveryThreshold ? (
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Complimentary White Glove Delivery & In-Home Assembly unlocked!</span>
              </div>
            ) : (
              <div>
                <p className="text-charcoal/80 mb-1">
                  Add <span className="font-bold text-walnut">{formatINR(freeDeliveryThreshold - subtotal)}</span> more for Complimentary White Glove Delivery
                </p>
                <div className="w-full h-1.5 bg-beige-300 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold transition-all duration-300"
                    style={{ width: `${progressToFreeDelivery}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-charcoal/60 space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-beige-200 flex items-center justify-center text-charcoal/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-lg text-charcoal font-semibold">Your bag is empty</h3>
                <p className="text-xs max-w-xs text-charcoal/70">
                  Discover our architectural living, bedroom, and dining collections tailored for luxury living.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold hover:opacity-95 shadow-md transition-all"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.cartItemId} 
                  className="flex gap-4 p-3.5 bg-white rounded-2xl border border-beige-300 shadow-sm relative group hover:border-gold/50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-beige-50 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start pr-5">
                      <Link
                        to={`/product/${item.productId}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-serif-luxury text-xs font-semibold text-charcoal hover:text-gold transition-colors truncate block"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <p className="text-[11px] text-charcoal/60 mt-0.5">
                      Color / Spec: <span className="font-medium text-charcoal/80">{item.selectedColor}</span>
                    </p>

                    {item.customConfig && (
                      <span className="inline-block text-[10px] bg-gold/15 text-walnut px-2 py-0.5 rounded font-medium mt-1">
                        Bespoke Custom Build
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-beige-300 rounded-lg overflow-hidden bg-ivory">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:bg-beige-200 text-charcoal/70 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:bg-beige-200 text-charcoal/70 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-walnut">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="absolute top-3 right-3 text-charcoal/40 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-beige-300 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-gold/10 border border-gold/40 text-xs">
                    <div className="flex items-center gap-1.5 text-walnut font-medium">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span>{appliedPromo.label} ({appliedPromo.code})</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Try LUXE10 for 10% off"
                      className="flex-1 bg-ivory border border-beige-300 rounded-xl px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-charcoal text-ivory rounded-xl text-xs font-medium hover:bg-walnut transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">{formatINR(subtotal)}</span>
                </div>
                {promoDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>VIP Privilege Discount</span>
                    <span>-{formatINR(promoDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White Glove Delivery</span>
                  <span>{deliveryCharge === 0 ? <span className="text-emerald-700 font-medium">Complimentary</span> : formatINR(deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-charcoal pt-2 border-t border-beige-200">
                  <span>Estimated Total</span>
                  <span className="text-walnut font-serif-luxury text-base">{formatINR(total)}</span>
                </div>
                <p className="text-[10px] text-charcoal/50 text-right">Applicable GST & duties included</p>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-2 hover:opacity-95 shadow-md transition-all active:scale-95"
                >
                  <span>Proceed to VIP Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl border border-charcoal/20 text-charcoal text-xs font-semibold tracking-wider uppercase text-center block hover:bg-beige-100 transition-colors"
                >
                  View Full Cart & Details
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>10-Year Guarantee • White Glove Room Placement</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
