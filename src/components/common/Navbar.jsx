import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, Heart, ShoppingBag, Layers, Menu, X, Sparkles, ChevronDown, 
  MapPin, Calendar, Compass, PhoneCall, Bot, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { categories, collections } from '../../data/products';

export const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const { totalItemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Scroll detection for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top VIP Announcement Ribbon */}
      <div className="bg-charcoal text-ivory text-[11px] py-1.5 px-3 sm:px-6 border-b border-gold/30">
        <div className="w-full max-w-[1680px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping"></span>
            <span className="text-gold tracking-wide uppercase font-semibold">VIP Privilege:</span>
            <span className="text-ivory/90 hidden sm:inline">Use code <strong className="text-gold underline">LUXE10</strong> for 10% off • Complimentary White Glove Delivery</span>
            <span className="text-ivory/90 sm:hidden">Use code <strong className="text-gold">LUXE10</strong> for 10% off</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-ivory/80">
            <Link to="/book-showroom" className="hover:text-gold flex items-center gap-1.5 transition-colors">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book Styling Consultation</span>
            </Link>
            <span className="text-ivory/30">|</span>
            <Link to="/contact" className="hover:text-gold flex items-center gap-1.5 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>Mumbai • Delhi • Bengaluru • Dubai</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full uppercase transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-luxury py-2.5 sm:py-3 border-b border-gold/30' 
          : 'bg-[#FAF8F5] py-3 sm:py-4 border-b border-beige-300'
      }`}>
        <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between lg:justify-start gap-3 lg:gap-4">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl text-charcoal hover:bg-beige-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl walnut-gradient-bg flex items-center justify-center border border-gold/40 shadow-sm group-hover:scale-105 transition-transform">
                <span className="font-serif-luxury text-gold text-xl font-bold tracking-tighter">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-[0.2em] text-charcoal uppercase leading-none">
                  AURA
                </span>
                <span className="text-[9px] tracking-[0.35em] text-walnut uppercase font-semibold mt-0.5">
                  LIVING
                </span>
              </div>
            </Link>
          </div>

          {/* Center Desktop Navigation Links */}
          <div className="hidden lg:flex lg:ml-auto items-center gap-4 xl:gap-6 whitespace-nowrap text-xs font-semibold tracking-wider uppercase text-charcoal/90">
            <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined} className={`hover:text-gold transition-colors ${location.pathname === '/' ? 'text-walnut' : ''}`}>
              Home
            </Link>
            {/* Shop by Room Dropdown */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('rooms')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 uppercase hover:text-gold transition-colors">
                <span>ROOMS</span>
                <ChevronDown className="w-3.5 h-3.5 text-gold group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'rooms' && (
                <div className="absolute top-full left-0 w-64 bg-[#FAF8F5] rounded-2xl shadow-2xl border border-gold/30 p-3 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <Link to="/shop" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal hover:text-gold transition-colors font-medium">
                    Shop All Furniture
                  </Link>
                  <div className="h-px bg-beige-300 my-1"></div>
                  {categories.map(c => (
                    <Link
                      key={c.id}
                      to={`/category/${c.slug}`}
                      className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80 hover:text-gold transition-colors font-normal text-xs"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Collections */}
            <Link to="/collections" className="hover:text-gold transition-colors">
              Collections
            </Link>

            {/* AI Innovations Dropdown */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('ai')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 uppercase hover:text-gold transition-colors text-walnut">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>AI &amp; 3D TECH</span>
                <ChevronDown className="w-3.5 h-3.5 text-gold group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'ai' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-[#FAF8F5] rounded-2xl shadow-2xl border border-gold/30 p-3 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <Link 
                    to="/ai-room-designer" 
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-beige-200 text-charcoal hover:text-gold transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs">AI Room Designer</p>
                      <p className="text-[10px] text-charcoal/60 uppercase whitespace-normal font-normal">Generate dream interior setups</p>
                    </div>
                  </Link>

                  <Link 
                    to="/virtual-showroom" 
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-beige-200 text-charcoal hover:text-gold transition-colors"
                  >
                    <Compass className="w-4 h-4 text-gold flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs">Virtual 360 Showroom</p>
                      <p className="text-[10px] text-charcoal/60 uppercase whitespace-normal font-normal">Interactive room tours & hotspots</p>
                    </div>
                  </Link>

                  <Link 
                    to="/custom-designer" 
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-beige-200 text-charcoal hover:text-gold transition-colors"
                  >
                    <Layers className="w-4 h-4 text-gold flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs">Custom Furniture Designer</p>
                      <p className="text-[10px] text-charcoal/60 uppercase whitespace-normal font-normal">Configure wood, fabric & dimensions</p>
                    </div>
                  </Link>

                  <Link 
                    to="/style-finder" 
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-beige-200 text-charcoal hover:text-gold transition-colors"
                  >
                    <Bot className="w-4 h-4 text-gold flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs">AI Style Finder Quiz</p>
                      <p className="text-[10px] text-charcoal/60 uppercase whitespace-normal font-normal">Find your architectural profile</p>
                    </div>
                  </Link>

                  <Link 
                    to="/budget-planner" 
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-beige-200 text-charcoal hover:text-gold transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                    <div>
                      <p className="font-medium text-xs">Furniture Budget Planner</p>
                      <p className="text-[10px] text-charcoal/60 uppercase whitespace-normal font-normal">Allocate room budget intelligently</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Inspiration */}
            <Link to="/inspiration" className="hover:text-gold transition-colors">
              Inspiration Gallery
            </Link>

            {/* Contact */}
            <Link to="/contact" className="hover:text-gold transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Action Icons & Booking CTA */}
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4 lg:gap-2 xl:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-beige-100 hover:bg-beige-200 text-charcoal flex items-center gap-2 text-xs transition-colors"
              title="Search Catalog (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-charcoal" />
              <span className="hidden xl:inline text-charcoal/60">Search</span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[9px] bg-white rounded border border-beige-300 text-charcoal/50">
                ⌘K
              </kbd>
            </button>

            {/* Compare Badge */}
            <Link
              to="/compare"
              className="relative p-2 rounded-xl hover:bg-beige-200 text-charcoal transition-colors"
              title="Compare Furniture"
            >
              <Layers className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-walnut text-ivory text-[10px] font-bold flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Wishlist Badge */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-xl hover:bg-beige-200 text-charcoal transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-ivory text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl walnut-gradient-bg text-ivory flex items-center gap-2 shadow-sm hover:opacity-95 transition-all active:scale-95"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-gold" />
              <span className="hidden sm:inline text-xs font-semibold">Bag</span>
              {totalItemCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-gold text-charcoal-900 text-[10px] font-bold flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Book VIP Visit CTA Button */}
            <Link
              to="/book-showroom"
              className="hidden xl:inline-flex items-center gap-1.5 py-2 px-3.5 rounded-xl border border-gold/70 text-walnut hover:bg-gold/15 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book Showroom</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Accessible for all 20 pages!) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-[#FAF8F5] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-r border-gold/30">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-beige-300">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg walnut-gradient-bg flex items-center justify-center text-gold font-serif-luxury font-bold text-lg">
                    A
                  </div>
                  <span className="font-serif-luxury font-bold tracking-wider text-charcoal">AURA LIVING</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-beige-200 text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-4 space-y-1 text-sm font-medium uppercase text-charcoal">
                <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-walnut">Home</Link>
                <p className="text-[10px] uppercase font-bold tracking-widest text-gold mb-2 mt-1">Shop By Room</p>
                <Link to="/shop" className="block px-3 py-2 rounded-xl hover:bg-beige-200">
                  Shop All Furniture (32+ Designs)
                </Link>
                {categories.map(category => (
                  <Link key={category.id} to={`/category/${category.slug}`} className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                    {category.name} Furniture
                  </Link>
                ))}
                <Link to="/collections" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Luxury Capsule Collections
                </Link>

                <p className="text-[10px] uppercase font-bold tracking-widest text-gold mb-2 mt-4">AI Innovations & Showroom</p>
                <Link to="/ai-room-designer" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold/10 text-walnut font-semibold">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>AI Room Designer</span>
                </Link>
                <Link to="/virtual-showroom" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Virtual 360 Showroom
                </Link>
                <Link to="/custom-designer" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Custom Furniture Designer
                </Link>
                <Link to="/style-finder" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  AI Furniture Style Finder Quiz
                </Link>
                <Link to="/budget-planner" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Furniture Budget Planner
                </Link>
                <Link to="/inspiration" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Room Inspiration Gallery
                </Link>

                <p className="text-[10px] uppercase font-bold tracking-widest text-gold mb-2 mt-4">Brand & Customer Service</p>
                <Link to="/book-showroom" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Book Showroom Visit
                </Link>
                <Link to="/compare" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Furniture Comparison Tool
                </Link>
                <Link to="/wishlist" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Saved Wishlist ({wishlistCount})
                </Link>
                <Link to="/cart" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Shopping Bag ({totalItemCount})
                </Link>
                <Link to="/contact" className="block px-3 py-2 rounded-xl hover:bg-beige-200 text-charcoal/80">
                  Contact & Concierge
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="pt-4 border-t border-beige-300">
              <Link
                to="/book-showroom"
                className="w-full py-3 px-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-semibold tracking-wider uppercase text-center block shadow-md"
              >
                Book Styling Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
