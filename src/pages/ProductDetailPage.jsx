import React, { useState, useEffect } from 'react';
import { CatalogImage } from '../components/common/CatalogImage';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, Heart, ShoppingBag, Rotate3d, Check, ShieldCheck, 
  Clock, Truck, MapPin, MessageCircle, ArrowRight, Share2, 
  ChevronRight, Sparkles, Layers, Info, CheckCircle2 
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useCompare } from '../context/CompareContext';
import { Furniture3DViewer } from '../components/3d/Furniture3DViewer';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { formatINR, getEstimatedDeliveryDate } from '../utils/formatters';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'care' | 'shipping' | 'reviews'
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();
  const { addRecentlyViewed } = useRecentlyViewed();

  // Reset states on product change
  useEffect(() => {
    setActiveImageIndex(0);
    setShow3DViewer(false);
    setSelectedColor(product.colors?.[0] || null);
    setQuantity(1);
    setPincodeStatus(null);
    addRecentlyViewed(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, product]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigate('/checkout');
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({
        valid: true,
        date: getEstimatedDeliveryDate(5),
        city: pincode.startsWith('4') ? 'Mumbai / West Zone' : pincode.startsWith('1') ? 'Delhi NCR / North' : 'Bengaluru / South'
      });
    } else {
      setPincodeStatus({ valid: false });
    }
  };

  // Find complementary items for "Complete the Room"
  const complementaryProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2);

  const bundleTotal = product.price + complementaryProducts.reduce((s, p) => s + p.price, 0);
  const bundleDiscountedTotal = Math.round(bundleTotal * 0.9); // 10% bundle privilege

  const handleAddBundleToCart = () => {
    addToCart(product, 1, selectedColor);
    complementaryProducts.forEach(cp => addToCart(cp, 1));
  };

  // Similar products
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hello AURA Living Concierge. I am interested in inquiring about the "${product.name}" (${formatINR(product.price)}). Is private viewing available?`
  );

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-beige-300 py-3 px-3 sm:px-6 lg:px-8 bg-white/70">
        <div className="w-full max-w-[1640px] mx-auto flex items-center gap-2 text-xs text-charcoal/60 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-beige-400 flex-shrink-0" />
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-beige-400 flex-shrink-0" />
          <Link to={`/category/${product.category}`} className="hover:text-gold transition-colors">{product.categoryName}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-beige-400 flex-shrink-0" />
          <span className="font-semibold text-charcoal truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Left Column: Gallery & 3D Interactive Viewer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Viewer Toggle Buttons */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShow3DViewer(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors ${!show3DViewer ? 'bg-charcoal text-ivory shadow-sm' : 'bg-white text-charcoal/70 border border-beige-300'}`}
                >
                  High-Res Gallery
                </button>
                <button
                  onClick={() => setShow3DViewer(true)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors ${show3DViewer ? 'bg-walnut text-ivory shadow-sm' : 'bg-white text-charcoal/70 border border-beige-300 hover:border-gold'}`}
                >
                  <Rotate3d className="w-3.5 h-3.5 text-gold" />
                  <span>3D Spatial Studio</span>
                </button>
              </div>

              <span className="text-[11px] text-charcoal/50 uppercase tracking-wider font-semibold">
                {product.collection} Capsule
              </span>
            </div>

            {/* Display: 3D Model or Photo Gallery */}
            {show3DViewer ? (
              <div className="aspect-[4/3] w-full">
                <Furniture3DViewer
                  initialColor={selectedColor?.hex || '#FAF8F5'}
                  colors={product.colors}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {/* Main Hero Photo */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-beige-100 border border-gold/30 shadow-luxury group">
                  <CatalogImage
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-4 left-4 bg-walnut text-ivory text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded-full shadow-md">
                      -{product.discount}% Privilege Discount
                    </span>
                  )}
                  {product.has3dModel && (
                    <button
                      onClick={() => setShow3DViewer(true)}
                      className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-charcoal/80 hover:bg-charcoal text-ivory text-xs font-semibold backdrop-blur-md border border-gold/40 flex items-center gap-2 shadow-lg"
                    >
                      <Rotate3d className="w-4 h-4 text-gold" />
                      <span>Launch 3D Studio</span>
                    </button>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-24 h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                          activeImageIndex === idx 
                            ? 'border-walnut ring-2 ring-gold/40 shadow-md' 
                            : 'border-beige-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Specs & Purchase Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold mb-1">
                <span>{product.categoryName}</span>
                <span>•</span>
                <span>{product.collection}</span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-charcoal leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-charcoal/70 mt-1 italic">
                "{product.tagline}"
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-charcoal">{product.rating}</span>
                </div>
                <span className="text-charcoal/30">•</span>
                <span className="text-xs text-charcoal/70">{product.reviewCount} Patron Reviews</span>
                <span className="text-charcoal/30">•</span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock for Delivery
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-beige-300 shadow-sm flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-charcoal/50 uppercase font-semibold block mb-0.5">Sanctuary Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif-luxury text-3xl font-bold text-walnut">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-charcoal/40 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                Inclusive of GST
              </span>
            </div>

            {/* Color & Material Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
                    Selected Finish / Upholstery:
                  </label>
                  <span className="text-xs text-walnut font-semibold">{selectedColor?.name}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor?.name === c.name 
                          ? 'border-charcoal scale-110 shadow-md ring-2 ring-gold/60' 
                          : 'border-white hover:scale-105 shadow-sm'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor?.name === c.name && (
                        <Check className="w-4 h-4 text-charcoal" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <div className="flex items-center border border-beige-300 rounded-2xl bg-white px-3 py-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-2 py-2 text-charcoal/60 hover:text-charcoal font-bold text-base"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3.5 text-xs font-bold text-charcoal">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-2 py-2 text-charcoal/60 hover:text-charcoal font-bold text-base"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-2xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-md active:scale-95 transition-all"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Sanctuary Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-2xl border transition-colors ${
                    isInWishlist(product.id)
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-white border-beige-300 text-charcoal hover:border-gold'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-2xl bg-charcoal hover:bg-black text-ivory text-xs font-bold uppercase tracking-wider transition-colors shadow-sm text-center"
              >
                Buy Now with Instant Concierge
              </button>

              {/* WhatsApp VIP Concierge Action */}
              <a
                href={`https://wa.me/919820045890?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via WhatsApp Concierge</span>
              </a>
            </div>

            {/* Pincode Delivery Estimate Checker */}
            <div className="p-4 rounded-2xl bg-white border border-beige-300 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal">
                <Truck className="w-4 h-4 text-gold" />
                <span>White Glove Delivery Checker</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 400018)"
                  className="flex-1 bg-ivory border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-charcoal text-ivory text-xs font-semibold hover:bg-walnut transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <div className={`text-xs p-2.5 rounded-xl border mt-2 ${pincodeStatus.valid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                  {pincodeStatus.valid ? (
                    <div>
                      <p className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>White Glove Delivery Available in {pincodeStatus.city}</span>
                      </p>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        Estimated arrival: <strong>{pincodeStatus.date}</strong> with complimentary room placement.
                      </p>
                    </div>
                  ) : (
                    <p>Please enter a valid 6-digit Indian PIN code.</p>
                  )}
                </div>
              )}
            </div>

            {/* Guarantee assurances */}
            <div className="grid grid-cols-2 gap-3 text-xs text-charcoal/70 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-beige-100/70 border border-beige-300">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>10-Year Frame Warranty</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-beige-100/70 border border-beige-300">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Complimentary Room Assembly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Care, Warranty & Reviews */}
        <div className="mt-20 border-t border-beige-300 pt-10">
          <div className="flex border-b border-beige-300 gap-6 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors border-b-2 ${activeTab === 'specs' ? 'border-walnut text-walnut' : 'border-transparent text-charcoal/50 hover:text-charcoal'}`}
            >
              Architectural Specifications
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 transition-colors border-b-2 ${activeTab === 'care' ? 'border-walnut text-walnut' : 'border-transparent text-charcoal/50 hover:text-charcoal'}`}
            >
              Material Care & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-walnut text-walnut' : 'border-transparent text-charcoal/50 hover:text-charcoal'}`}
            >
              Patron Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-charcoal/80 leading-relaxed">
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-base font-semibold text-charcoal">Design & Structure</h3>
                  <p>{product.description}</p>
                  <ul className="space-y-2 pt-2">
                    {product.features?.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-beige-300 space-y-3">
                  <h4 className="font-serif-luxury text-sm font-semibold text-charcoal pb-2 border-b border-beige-200">
                    Dimension Matrix
                  </h4>
                  <div className="flex justify-between py-1 border-b border-beige-100">
                    <span className="text-charcoal/60">Width:</span>
                    <span className="font-semibold text-charcoal">{product.dimensions.width}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-beige-100">
                    <span className="text-charcoal/60">Depth:</span>
                    <span className="font-semibold text-charcoal">{product.dimensions.depth}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-beige-100">
                    <span className="text-charcoal/60">Height:</span>
                    <span className="font-semibold text-charcoal">{product.dimensions.height}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-beige-100">
                    <span className="text-charcoal/60">Seat Height:</span>
                    <span className="font-semibold text-charcoal">{product.dimensions.seatHeight}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-beige-100">
                    <span className="text-charcoal/60">Net Weight:</span>
                    <span className="font-semibold text-charcoal">{product.dimensions.weight}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-charcoal/60">Primary Material:</span>
                    <span className="font-semibold text-charcoal text-right max-w-[200px]">{product.materials}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-2xl space-y-4 text-xs text-charcoal/80 leading-relaxed">
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">Artisanal Maintenance</h3>
                <p>{product.careInstructions}</p>
                <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 space-y-2 mt-4">
                  <h4 className="font-semibold text-walnut">10-Year Comprehensive Warranty Policy</h4>
                  <p className="text-[11px] text-charcoal/70">
                    {product.warranty}. Includes complimentary bi-annual joinery inspection upon patron request within metropolitan regions (Mumbai, Delhi, Bengaluru).
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-serif-luxury font-bold text-walnut">{product.rating}</div>
                  <div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs text-charcoal/60 mt-0.5">Based on {product.reviewCount} verified client reviews</p>
                  </div>
                </div>

                <div className="space-y-4 max-w-3xl">
                  <div className="p-5 bg-white rounded-2xl border border-beige-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-charcoal">Aditya & Tara Kapoor</span>
                      <span className="text-[11px] text-charcoal/40">2 weeks ago</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
                    </div>
                    <p className="text-xs text-charcoal/75 leading-relaxed">
                      "Stunning piece in our living room. The bouclé texture and timber joinery are impeccable. White glove delivery team installed it with surgical precision."
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-beige-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-charcoal">Architect Neil Varma</span>
                      <span className="text-[11px] text-charcoal/40">1 month ago</span>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
                    </div>
                    <p className="text-xs text-charcoal/75 leading-relaxed">
                      "Specified this for our beachfront villa project in Alibaug. Proportions and craftsmanship stand shoulder to shoulder with Cassina and Poltrona Frau."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Complete The Room Bundle Section */}
        {complementaryProducts.length > 0 && (
          <div className="mt-10 sm:mt-14 p-5 sm:p-10 rounded-3xl bg-white border border-gold/30 shadow-luxury">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 sm:pb-6 border-b border-beige-200 gap-3 sm:gap-4">
              <div>
                <span className="text-gold text-xs font-semibold uppercase tracking-widest block mb-1">
                  Architectural Coordination
                </span>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-charcoal">
                  Complete the {product.categoryName} Sanctuary
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-charcoal/60">Curated Suite Bundle Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-luxury text-2xl font-bold text-walnut">{formatINR(bundleDiscountedTotal)}</span>
                  <span className="text-xs text-charcoal/40 line-through">{formatINR(bundleTotal)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 py-5 sm:py-8">
              {/* Main piece */}
              <div className="p-3 sm:p-4 rounded-2xl bg-beige-50 border border-gold/30 flex items-center gap-3 sm:gap-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl" 
                />
                <div>
                  <span className="text-[10px] text-gold uppercase font-bold">This Item</span>
                  <h4 className="font-serif-luxury text-xs font-semibold text-charcoal line-clamp-1">{product.name}</h4>
                  <p className="text-xs font-bold text-walnut mt-1">{formatINR(product.price)}</p>
                </div>
              </div>

              {/* Complementary pieces */}
              {complementaryProducts.map(cp => (
                <div key={cp.id} className="p-3 sm:p-4 rounded-2xl bg-white border border-beige-300 flex items-center gap-3 sm:gap-4">
                  <img 
                    src={cp.images[0]} 
                    alt={cp.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl" 
                  />
                  <div>
                    <span className="text-[10px] text-charcoal/50 uppercase font-bold">Companion</span>
                    <h4 className="font-serif-luxury text-xs font-semibold text-charcoal line-clamp-1">{cp.name}</h4>
                    <p className="text-xs font-bold text-walnut mt-1">{formatINR(cp.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleAddBundleToCart}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Add 3-Piece Suite to Bag (Save 10%)</span>
              </button>
            </div>
          </div>
        )}

        {/* Similar Products */}
        <div className="mt-10 sm:mt-16">
          <div className="flex items-center justify-between mb-4 sm:mb-8 pb-3 sm:pb-4 border-b border-beige-300">
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-charcoal">
              More {product.categoryName} Pieces
            </h3>
            <Link to={`/category/${product.category}`} className="text-xs font-semibold text-walnut hover:text-gold uppercase tracking-wider flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {similarProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
