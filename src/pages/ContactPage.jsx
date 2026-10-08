import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, Send, 
  CheckCircle2, Sparkles, Calendar, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { showrooms } from '../data/products';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: 'Private Residence Interior',
    showroomCity: 'Mumbai Flagship',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-16 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest border border-gold/30">
            <Mail className="w-3.5 h-3.5" />
            <span>VIP Client Concierge</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-ivory">
            Contact AURA Atelier
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Our private stylists, joinery architects, and showroom directorship are at your service for personal commissions, villa projects, and private viewings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gold/30 shadow-luxury space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-beige-200">
              <h2 className="font-serif-luxury text-2xl font-normal text-charcoal">
                Send an Atelier Enquiry
              </h2>
              <span className="text-xs text-gold font-semibold uppercase">Replies within 4 Hours</span>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-beige-50 rounded-2xl border border-gold/40 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-charcoal">Enquiry Transmitted</h3>
                <p className="text-xs text-charcoal/70 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. A senior architectural concierge has received your brief and will initiate contact via {formData.phone || formData.email}.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl border border-charcoal/20 text-xs font-semibold hover:bg-white"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Singhania"
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. vikram@estate.in"
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Telephone / Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Nature of Commission</label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    >
                      <option value="Private Residence Interior">Private Residence Interior</option>
                      <option value="Architect / Interior Designer Spec">Architect / Interior Designer Spec</option>
                      <option value="Commercial Hospitality Commission">Commercial Hospitality Commission</option>
                      <option value="Custom Bespoke Joinery Request">Custom Bespoke Joinery Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Closest Metropolitan Atelier</label>
                  <select
                    value={formData.showroomCity}
                    onChange={(e) => setFormData({ ...formData, showroomCity: e.target.value })}
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  >
                    <option value="Mumbai Flagship (Worli Sea Face)">Mumbai Flagship (Worli Sea Face)</option>
                    <option value="New Delhi Atelier (DLF Emporio)">New Delhi Atelier (DLF Emporio)</option>
                    <option value="Bengaluru Manor (Indiranagar)">Bengaluru Manor (Indiranagar)</option>
                    <option value="Dubai Studio (d3 Design District)">Dubai Studio (d3 Design District)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">Message / Architectural Brief</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room requirements, timber preferences, or timelines..."
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-widest hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-gold" />
                    <span>Submit Atelier Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct Concierge Coordinates & Map Placeholder (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-6">
              <h3 className="font-serif-luxury text-xl font-semibold text-charcoal pb-3 border-b border-beige-200">
                Direct Atelier Concierge
              </h3>

              <div className="space-y-4 text-xs text-charcoal/80">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">VIP Telephone Hotline</p>
                    <p className="text-gold font-bold">+91 98200 45890 / +91 98110 32410</p>
                    <p className="text-[11px] text-charcoal/50">Lines open Monday – Sunday: 10 AM – 9 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">Private Client Email</p>
                    <p className="text-walnut font-medium">concierge@auraliving.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-charcoal">Showroom Hours</p>
                    <p>Mon – Sun: 10:30 AM – 8:30 PM (Private appointments prioritized)</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#128C7E] font-semibold text-xs">
                  <MessageCircle className="w-4 h-4" />
                  <span>Immediate WhatsApp Response</span>
                </div>
                <p className="text-[11px] text-charcoal/70">
                  Connect instantly with a live design stylist for material samples or catalogue inquiries.
                </p>
                <a
                  href="https://wa.me/919820045890?text=Hello%20AURA%20Living%20Concierge%2C%20I%20would%20like%20to%20enquire%20about%20furniture."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-bold text-[#128C7E] hover:underline"
                >
                  Start Conversation →
                </a>
              </div>

              {/* Map Placeholder Graphic */}
              <div className="rounded-2xl overflow-hidden border border-gold/30 bg-charcoal relative aspect-[16/9] flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <MapPin className="w-6 h-6 text-gold mx-auto animate-bounce" />
                  <p className="font-serif-luxury text-xs font-semibold text-ivory">Worli Sea Face Flagship Gallery</p>
                  <p className="text-[10px] text-ivory/60">The Pavilions, Dr. Annie Besant Road, Mumbai</p>
                  <Link
                    to="/book-showroom"
                    className="inline-block text-[11px] px-3 py-1 bg-gold text-charcoal-900 rounded-full font-bold mt-1"
                  >
                    Schedule GPS Directions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
