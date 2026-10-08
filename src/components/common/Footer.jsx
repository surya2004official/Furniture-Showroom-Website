import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Mail, Phone, MapPin, ArrowRight, ShieldCheck, 
  Clock, Award, CheckCircle, Heart, Camera 
} from 'lucide-react';
import { showrooms } from '../../data/products';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal-900 text-ivory border-t border-gold/30">
      {/* Brand Assurance Badges Strip */}
      <div className="border-b border-charcoal-700 bg-charcoal-950 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1680px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gold/15 flex items-center justify-center border border-gold/30 flex-shrink-0">
              <Award className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-sm font-semibold text-ivory">Italian & Nordic Heritage</h4>
              <p className="text-[11px] text-ivory/60 mt-0.5">Master joinery & seasoned timbers</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gold/15 flex items-center justify-center border border-gold/30 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-sm font-semibold text-ivory">10-Year Warranty</h4>
              <p className="text-[11px] text-ivory/60 mt-0.5">Comprehensive structural guarantee</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gold/15 flex items-center justify-center border border-gold/30 flex-shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-sm font-semibold text-ivory">White Glove Delivery</h4>
              <p className="text-[11px] text-ivory/60 mt-0.5">Complimentary room placement & assembly</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gold/15 flex items-center justify-center border border-gold/30 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-sm font-semibold text-ivory">Private Styling Consultations</h4>
              <p className="text-[11px] text-ivory/60 mt-0.5">Architectural consultation by appointment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Story & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl walnut-gradient-bg flex items-center justify-center border border-gold/40">
                <span className="font-serif-luxury text-gold text-2xl font-bold">A</span>
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold tracking-[0.25em] text-ivory uppercase block leading-none">
                  AURA LIVING
                </span>
                <span className="text-[9px] tracking-[0.35em] text-gold uppercase font-semibold">
                  Architectural Interiors
                </span>
              </div>
            </Link>

            <p className="text-xs text-ivory/70 leading-relaxed max-w-md">
              AURA Living curates collectible furniture, architectural travertine, full-grain Tuscan aniline leathers, and certified American walnuts. Designed for international connoisseurs of form, light, and enduring tranquility.
            </p>

            {/* Newsletter Subscription */}
            <div className="bg-charcoal-800/80 p-5 rounded-2xl border border-gold/25 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <h4 className="font-serif-luxury text-sm font-semibold text-ivory">Join the AURA Private Circle</h4>
              </div>
              <p className="text-[11px] text-ivory/60">
                Receive private capsule previews, architectural design monographs, and an immediate 10% privilege invitation.
              </p>

              {subscribed ? (
                <div className="p-3 bg-gold/15 rounded-xl border border-gold/40 text-xs text-gold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Welcome. Use privilege code <strong className="underline text-white">LUXE10</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email..."
                    className="flex-1 bg-charcoal-900 border border-charcoal-700 rounded-xl px-3.5 py-2.5 text-xs text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-charcoal-950 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Shop By Room */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-semibold text-gold uppercase tracking-widest">
              Living Sanctuaries
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/75">
              <li><Link to="/shop" className="hover:text-gold transition-colors">Shop All Furniture</Link></li>
              <li><Link to="/category/living-room" className="hover:text-gold transition-colors">Living Room Furniture</Link></li>
              <li><Link to="/category/bedroom" className="hover:text-gold transition-colors">Bedroom Furniture</Link></li>
              <li><Link to="/category/dining-room" className="hover:text-gold transition-colors">Dining Room Furniture</Link></li>
              <li><Link to="/category/office" className="hover:text-gold transition-colors">Executive Office Suites</Link></li>
              <li><Link to="/category/outdoor" className="hover:text-gold transition-colors">Terrace & Outdoor Teak</Link></li>
              <li><Link to="/collections" className="hover:text-gold transition-colors">Capsule Collections</Link></li>
              <li><Link to="/inspiration" className="hover:text-gold transition-colors">Room Inspiration Gallery</Link></li>
            </ul>
          </div>

          {/* Col 4: AI & Interactive Features */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-semibold text-gold uppercase tracking-widest">
              Digital Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/75">
              <li><Link to="/ai-room-designer" className="hover:text-gold transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-gold" /> AI Room Designer</Link></li>
              <li><Link to="/virtual-showroom" className="hover:text-gold transition-colors">360° Virtual Showroom</Link></li>
              <li><Link to="/custom-designer" className="hover:text-gold transition-colors">Custom Furniture Builder</Link></li>
              <li><Link to="/style-finder" className="hover:text-gold transition-colors">AI Style Finder Quiz</Link></li>
              <li><Link to="/budget-planner" className="hover:text-gold transition-colors">Furniture Budget Planner</Link></li>
              <li><Link to="/compare" className="hover:text-gold transition-colors">Product Comparison Tool</Link></li>
              <li><Link to="/wishlist" className="hover:text-gold transition-colors">Saved Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-gold transition-colors">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Col 5: Showroom Galleries & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-semibold text-gold uppercase tracking-widest">
              Private Showrooms
            </h4>
            <div className="space-y-3 text-xs text-ivory/70">
              <div>
                <p className="font-semibold text-ivory">Mumbai Flagship Gallery</p>
                <p className="text-[11px] text-ivory/60">The Pavilions, Worli Sea Face</p>
                <p className="text-[11px] text-gold">+91 98200 45890</p>
              </div>

              <div>
                <p className="font-semibold text-ivory">New Delhi Atelier</p>
                <p className="text-[11px] text-ivory/60">DLF Emporio, Vasant Kunj</p>
                <p className="text-[11px] text-gold">+91 98110 32410</p>
              </div>

              <div>
                <p className="font-semibold text-ivory">Bengaluru Manor</p>
                <p className="text-[11px] text-ivory/60">100 Feet Road, Indiranagar</p>
                <p className="text-[11px] text-gold">+91 99000 78234</p>
              </div>

              <div className="pt-2">
                <Link
                  to="/book-showroom"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-charcoal-700 hover:bg-gold hover:text-charcoal-900 border border-gold/40 text-[11px] font-semibold tracking-wider uppercase transition-colors"
                >
                  <MapPin className="w-3 h-3 text-gold" />
                  <span>Book Private Viewing</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Social & Monogram */}
        <div className="mt-14 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>
            © {new Date().getFullYear()} AURA LIVING ARCHITECTURAL INTERIORS. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-gold transition-colors">VIP Concierge</Link>
            <Link to="/book-showroom" className="hover:text-gold transition-colors">Appointments</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
