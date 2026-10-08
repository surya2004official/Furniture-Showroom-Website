import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, ShieldCheck, Sparkles, MapPin, ArrowRight, 
  CheckCircle2, Compass, Heart 
} from 'lucide-react';
import { showrooms } from '../data/products';

export const AboutPage = () => {
  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Hero */}
      <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-charcoal-950">
        <img
          src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=2000&q=80"
          alt="Master Artisan Woodworking"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-black/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-ivory py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest mb-3 border border-gold/30">
            <Award className="w-3.5 h-3.5" />
            <span>Maison Manifesto & Heritage</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-ivory leading-tight">
            The Poetry of Form. <br />
            <span className="italic font-light gold-gradient-text">The Dignity of Timber.</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-ivory/80 max-w-xl mx-auto font-light leading-relaxed">
            Founded on the belief that spaces shape human consciousness. We craft collectible furniture that balances timeless European modernism with generational joinery.
          </p>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-3">
            <span className="font-serif-luxury text-3xl font-bold text-gold">01</span>
            <h3 className="font-serif-luxury text-xl font-semibold text-charcoal">
              Kiln-Dried Hardwoods
            </h3>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              We exclusively harvest certified FSC American Black Walnut and European White Oak. Our lumber undergoes 18 months of natural air seasoning followed by precision computer-controlled kiln cycles to guarantee stability in coastal humidity and seasonal swings.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-3">
            <span className="font-serif-luxury text-3xl font-bold text-gold">02</span>
            <h3 className="font-serif-luxury text-xl font-semibold text-charcoal">
              Tuscan Aniline Leathers
            </h3>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Our leathers originate from historic tanneries in Santa Croce sull'Arno, Italy. Tanned with chestnut and mimosa plant barks rather than harsh heavy metals, our full-grain hides breathe naturally and develop an intoxicating golden patina with each passing decade.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-3">
            <span className="font-serif-luxury text-3xl font-bold text-gold">03</span>
            <h3 className="font-serif-luxury text-xl font-semibold text-charcoal">
              Roman Navona Travertine
            </h3>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Quarried from the ancient sedimentary beds of Tivoli near Rome, our travertine slabs display magnificent geologic banding. Each slab is sealed with an invisible breathable water-stone treatment that preserves silky natural tactile softness.
            </p>
          </div>
        </div>

        {/* Founder Letter Section */}
        <div className="mt-20 p-8 sm:p-14 rounded-3xl bg-white border border-gold/40 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Artisan Founder"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-gold text-xs font-semibold uppercase tracking-widest block">
              Founder & Creative Director's Note
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-charcoal leading-tight">
              "We do not design for seasons. <br />
              <span className="italic text-walnut">We build for centennials."</span>
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              In a world flooded with disposable particleboard furniture that degrades within years, AURA Living was founded as an uncompromising sanctuary for true craft. When you touch a curved bouclé armrest or feel the cool heft of a Roman travertine dining pedestal, you are engaging with the hands of master joiners, carvers, and stone-cutters who dedicated lifetimes to their art.
            </p>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Our integration of modern 3D visualization and AI spatial suites is not about replacing craft, but about empowering patrons to visualize, customize, and cherish pieces tailored perfectly to their domestic sanctuaries.
            </p>

            <div className="pt-3 border-t border-beige-200">
              <h4 className="font-serif-luxury text-lg font-bold text-charcoal">Vikramaditya Valenti</h4>
              <p className="text-xs text-gold font-medium">Founder & Principal Architect, AURA Living</p>
            </div>
          </div>
        </div>

        {/* Showrooms Grid */}
        <div className="mt-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-gold text-xs font-semibold uppercase tracking-widest block mb-1">
              Metropolitan Presence
            </span>
            <h3 className="font-serif-luxury text-3xl font-normal text-charcoal">
              Visit Our Private Styling Consultations
            </h3>
            <p className="text-xs text-charcoal/60 mt-2">
              Experience textures, test ergonomic seat depths, and consult private architects in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showrooms.map((s) => (
              <div key={s.id} className="bg-white rounded-3xl overflow-hidden border border-gold/30 shadow-luxury flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] text-gold uppercase font-bold tracking-wider">{s.city}</span>
                    <h4 className="font-serif-luxury text-base font-semibold text-charcoal">{s.title}</h4>
                    <p className="text-xs text-charcoal/70">{s.address}</p>
                    <p className="text-xs text-gold font-semibold pt-1">{s.phone}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to="/book-showroom"
                    className="w-full py-2.5 rounded-xl border border-charcoal/20 text-charcoal hover:bg-beige-100 text-xs font-semibold tracking-wider uppercase text-center block transition-colors"
                  >
                    Book Private Viewing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
