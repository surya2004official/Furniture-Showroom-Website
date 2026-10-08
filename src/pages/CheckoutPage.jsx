import React, { useState } from 'react';
import { 
  ShieldCheck, CreditCard, Check, ArrowRight, Truck, 
  Calendar, Clock, Lock, Sparkles, Printer, CheckCircle2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { formatINR, getEstimatedDeliveryDate } from '../utils/formatters';

export const CheckoutPage = () => {
  const { cart, subtotal, deliveryCharge, appliedPromo, promoDiscountAmount, total, clearCart } = useCart();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'Raghav',
    lastName: 'Singhania',
    email: 'raghav.singhania@heritage.in',
    phone: '+91 98200 45890',
    address: 'Penthouse 32, Beaumonde Towers, Appasaheb Marathe Marg',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400025',
    deliveryDate: getEstimatedDeliveryDate(6),
    deliverySlot: 'Morning (10:00 AM – 2:00 PM)',
    specialInstructions: 'Please coordinate with tower security concierge for freight elevator booking.',
    paymentMethod: 'card'
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `AURA-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);

    // Trigger luxury confetti celebration!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C6A77B', '#654832', '#FAF8F5']
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinish = () => {
    clearCart();
    navigate('/');
  };

  if (cart.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
        <h2 className="font-serif-luxury text-2xl font-bold text-charcoal mb-2">No items in requisition</h2>
        <p className="text-xs text-charcoal/60 mb-6">Please curate your furniture suite before proceeding to checkout.</p>
        <Link to="/shop" className="px-6 py-3 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold uppercase">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted VIP Concierge Requisition</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-charcoal">
            Private Residence Checkout
          </h1>
          <p className="text-xs text-charcoal/60 mt-1">
            Complimentary white glove delivery, interior placement, and packaging removal included.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form: Delivery Address & White Glove Scheduling (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Client Details & Delivery Residence */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-beige-200">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  Client & Residence Destination
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Private Email</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Telephone / Mobile</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Residence Address / Villa / Penthouse</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">City</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">State</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">PIN Code</label>
                  <input
                    type="text"
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* 2. White Glove Delivery Appointment Scheduling */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-beige-200">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  White Glove Delivery & Assembly Scheduling
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Preferred Date</label>
                  <div className="flex items-center bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal">
                    <Calendar className="w-4 h-4 text-gold mr-2" />
                    <input
                      type="text"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      className="bg-transparent focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Preferred Time Window</label>
                  <select
                    name="deliverySlot"
                    value={formData.deliverySlot}
                    onChange={handleChange}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  >
                    <option value="Morning (10:00 AM – 2:00 PM)">Morning (10:00 AM – 2:00 PM)</option>
                    <option value="Afternoon (2:00 PM – 6:00 PM)">Afternoon (2:00 PM – 6:00 PM)</option>
                    <option value="VIP Twilight (6:00 PM – 9:00 PM)">VIP Twilight (6:00 PM – 9:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">Special Architectural / Delivery Notes</label>
                <textarea
                  rows={2}
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder="Elevator dimensions, security clearance, room floor level..."
                  className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* 3. Payment Method Simulation */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-beige-200">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  Payment Simulation Method
                </h3>
              </div>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-gold bg-gold/10' : 'border-beige-300 bg-ivory'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="accent-gold"
                    />
                    <CreditCard className="w-5 h-5 text-walnut" />
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Amex / Black Centurion / Visa Infinite</p>
                      <p className="text-[11px] text-charcoal/60">Simulated 256-bit bank encrypted card checkout</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gold">Instant</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'upi' ? 'border-gold bg-gold/10' : 'border-beige-300 bg-ivory'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="accent-gold"
                    />
                    <Sparkles className="w-5 h-5 text-walnut" />
                    <div>
                      <p className="text-xs font-semibold text-charcoal">UPI Instant QR / NetBanking</p>
                      <p className="text-[11px] text-charcoal/60">HDFC, ICICI, SBI, Google Pay, Apple Pay</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gold">Fast</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === 'concierge' ? 'border-gold bg-gold/10' : 'border-beige-300 bg-ivory'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="concierge"
                      checked={formData.paymentMethod === 'concierge'}
                      onChange={handleChange}
                      className="accent-gold"
                    />
                    <ShieldCheck className="w-5 h-5 text-walnut" />
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Concierge Cheque / Wire Transfer on Inspection</p>
                      <p className="text-[11px] text-charcoal/60">Pay upon white glove assembly and client satisfaction</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gold">VIP Privilege</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Items Summary & Confirmation (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-6 sticky top-28">
              <h3 className="font-serif-luxury text-xl font-semibold text-charcoal pb-3 border-b border-beige-200">
                Requisition Breakdown
              </h3>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl bg-beige-50 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-serif-luxury font-semibold text-charcoal truncate">{item.name}</p>
                        <p className="text-[11px] text-charcoal/50">Qty: {item.quantity} • {item.selectedColor}</p>
                      </div>
                    </div>
                    <span className="font-bold text-walnut flex-shrink-0">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs text-charcoal/80 pt-4 border-t border-beige-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal">{formatINR(subtotal)}</span>
                </div>

                {promoDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>VIP Privilege ({appliedPromo?.code})</span>
                    <span>-{formatINR(promoDiscountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>White Glove Delivery</span>
                  <span>{deliveryCharge === 0 ? <strong className="text-emerald-700">Complimentary</strong> : formatINR(deliveryCharge)}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-charcoal pt-3 border-t border-beige-200">
                  <span>Requisition Total</span>
                  <span className="font-serif-luxury text-2xl text-walnut">{formatINR(total)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-95 shadow-md active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Confirm & Authorize Requisition</span>
                </button>

                <p className="text-[11px] text-charcoal/50 text-center leading-normal">
                  * Frontend simulated authorization. No actual charges are processed to your card or account.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Confirmation Receipt Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-charcoal/80 backdrop-blur-md" />

          <div className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-8 sm:p-10 shadow-2xl border-2 border-gold/50 z-10 animate-in zoom-in-95 duration-200 text-charcoal space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[11px] text-gold uppercase font-bold tracking-widest block">
                Official Proforma Confirmation
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-charcoal">
                Requisition Authorized
              </h2>
              <p className="text-xs text-charcoal/70">
                Order ID: <strong className="text-walnut font-mono text-sm">{orderId}</strong>
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-white p-6 rounded-2xl border border-beige-300 text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-beige-200">
                <span className="text-charcoal/60">Client:</span>
                <span className="font-semibold text-charcoal">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-beige-200">
                <span className="text-charcoal/60">Destination:</span>
                <span className="font-semibold text-charcoal text-right max-w-xs">{formData.address}, {formData.city} - {formData.pincode}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-beige-200">
                <span className="text-charcoal/60">White Glove Schedule:</span>
                <span className="font-semibold text-emerald-800">{formData.deliveryDate} ({formData.deliverySlot})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-beige-200">
                <span className="text-charcoal/60">Pieces Requisitioned:</span>
                <span className="font-semibold text-charcoal">{cart.reduce((s, i) => s + i.quantity, 0)} Items</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-charcoal">
                <span>Authorized Amount:</span>
                <span className="text-walnut font-serif-luxury text-base">{formatINR(total)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gold/15 border border-gold/30 text-[11px] text-walnut text-center">
              A private AURA White Glove logistics concierge will contact {formData.phone} 24 hours prior to schedule seamless room placement.
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl border border-charcoal/20 text-xs font-semibold text-charcoal hover:bg-beige-100 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Proforma Dossier</span>
              </button>

              <button
                onClick={handleFinish}
                className="flex-1 py-3 px-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95"
              >
                Return to Maison Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
