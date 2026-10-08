import React from 'react';
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, 
  ShieldCheck, Truck, ArrowLeft, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryCharge,
    appliedPromo,
    promoDiscountAmount,
    total,
    promoCode,
    setPromoCode,
    applyPromo,
    removePromo,
    promoError,
    whiteGloveService,
    setWhiteGloveService
  } = useCart();

  const handleApply = (e) => {
    e.preventDefault();
    if (promoCode) applyPromo(promoCode);
  };

  const freeDeliveryThreshold = 50000;
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-14 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>Sanctuary Requisition</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-ivory">
              Shopping Bag
            </h1>
            <p className="text-xs text-ivory/70 mt-1">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items Curated
            </p>
          </div>

          <Link
            to="/shop"
            className="text-xs text-gold hover:text-white flex items-center gap-1.5 uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Exploring Collection</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gold/30 shadow-luxury max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-beige-100 flex items-center justify-center text-charcoal/40 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif-luxury text-2xl font-semibold text-charcoal">
              Your bag is unoccupied
            </h2>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              Discover our architectural furniture collections tailored with solid American walnut, Roman travertine, and French bouclé.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95"
              >
                <span>Browse Furniture Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* White Glove Delivery Meter */}
              <div className="p-4 rounded-2xl bg-beige-100 border border-beige-300 text-xs">
                {subtotal >= freeDeliveryThreshold ? (
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Complimentary White Glove In-Home Delivery & Assembly Unlocked!</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-charcoal/80 mb-1.5">
                      Add <strong className="text-walnut">{formatINR(freeDeliveryThreshold - subtotal)}</strong> more for Complimentary White Glove Delivery
                    </p>
                    <div className="w-full h-2 bg-beige-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-gold/30 shadow-luxury overflow-hidden divide-y divide-beige-200">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-beige-50 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-gold uppercase font-bold tracking-wider">{item.category}</span>
                        <Link to={`/product/${item.productId}`} className="font-serif-luxury text-base font-semibold text-charcoal hover:text-gold transition-colors block">
                          {item.name}
                        </Link>
                        <p className="text-xs text-charcoal/60 mt-0.5">
                          Finish: <strong className="text-charcoal">{item.selectedColor}</strong>
                        </p>
                        {item.customConfig && (
                          <span className="inline-block text-[10px] bg-gold/15 text-walnut px-2 py-0.5 rounded font-semibold mt-1">
                            Bespoke Tailored Piece
                          </span>
                        )}
                        <p className="text-xs font-bold text-walnut sm:hidden mt-2">{formatINR(item.price * item.quantity)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-beige-300 rounded-xl bg-ivory">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-charcoal/70 hover:text-charcoal"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-charcoal/70 hover:text-charcoal"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <span className="text-sm font-bold text-walnut hidden sm:inline-block w-28 text-right">
                        {formatINR(item.price * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-charcoal/40 hover:text-rose-600 transition-colors p-1.5"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-charcoal/50 hover:text-rose-600 underline font-medium"
                >
                  Empty Entire Bag
                </button>
              </div>
            </div>

            {/* Right: Summary & Order Calculations (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-6">
                <h3 className="font-serif-luxury text-xl font-semibold text-charcoal pb-3 border-b border-beige-200">
                  Order Summary
                </h3>

                {/* Promo Coupon Form */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                    VIP Privilege Coupon
                  </label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gold/15 border border-gold/40 text-xs">
                      <div className="flex items-center gap-1.5 text-walnut font-bold">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span>{appliedPromo.label} ({appliedPromo.code})</span>
                      </div>
                      <button onClick={removePromo} className="text-xs text-rose-600 hover:underline font-bold">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try LUXE10 for 10% off"
                        className="flex-1 bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs uppercase tracking-wider focus:outline-none focus:border-gold"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-charcoal hover:bg-walnut text-ivory text-xs font-semibold rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>}
                </div>

                {/* Calculations */}
                <div className="space-y-2.5 text-xs text-charcoal/80 pt-2 border-t border-beige-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-charcoal">{formatINR(subtotal)}</span>
                  </div>

                  {promoDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>VIP Privilege Discount ({appliedPromo?.discountPercent}%)</span>
                      <span>-{formatINR(promoDiscountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>White Glove In-Home Delivery</span>
                    <span>{deliveryCharge === 0 ? <strong className="text-emerald-700">Complimentary</strong> : formatINR(deliveryCharge)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-charcoal pt-3 border-t border-beige-200">
                    <span>Grand Total</span>
                    <span className="font-serif-luxury text-2xl text-walnut">{formatINR(total)}</span>
                  </div>
                  <p className="text-[11px] text-charcoal/50 text-right">Applicable GST and custom insurance included</p>
                </div>

                {/* Checkout Link */}
                <div className="pt-2 space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full py-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 hover:opacity-95 shadow-md active:scale-95 transition-all"
                  >
                    <span>Proceed to VIP Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal/60 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <span>Protected by 10-Year AURA Structural Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
