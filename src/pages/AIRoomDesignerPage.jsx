import React, { useState } from 'react';
import { 
  Sparkles, Upload, Image as ImageIcon, Sliders, CheckCircle2, 
  ArrowRight, ShoppingBag, SlidersHorizontal, RefreshCw, Check, Info 
} from 'lucide-react';
import { aiRoomPresets, products } from '../data/products';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const AIRoomDesignerPage = () => {
  const { addToCart } = useCart();

  // Form states
  const [uploadedImage, setUploadedImage] = useState(null);
  const [roomType, setRoomType] = useState('living-room');
  const [interiorStyle, setInteriorStyle] = useState('Modern');
  const [preferredColor, setPreferredColor] = useState('Ivory & Walnut');
  const [roomDimensions, setRoomDimensions] = useState('22 × 16 ft');
  const [budget, setBudget] = useState(300000);

  // Simulation states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [designResult, setDesignResult] = useState(null);
  const [bundleAdded, setBundleAdded] = useState(false);

  const roomTypes = [
    { id: 'living-room', label: 'Living Room' },
    { id: 'bedroom', label: 'Master Bedroom' },
    { id: 'dining-room', label: 'Dining Room' },
    { id: 'office', label: 'Executive Study' }
  ];

  const interiorStyles = ['Modern', 'Minimalist', 'Luxury', 'Scandinavian', 'Contemporary', 'Traditional'];
  const colorPalettes = ['Ivory & Walnut', 'Champagne & Gold', 'Warm Sand & Beige', 'Charcoal & Smoked Oak', 'Forest Green & Brass'];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep(0);
    setDesignResult(null);

    // Simulated 4-stage AI architectural analysis
    const steps = [
      "Scanning architectural ceiling heights & natural light orientation...",
      "Analyzing floor circulation vectors and spatial layout...",
      "Harmonizing materials with American walnut & Calacatta stone...",
      "Selecting ergonomic catalog pieces within budget parameters...",
      "Generating high-definition interior rendering..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setGenerationStep(currentStep);

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          // Resolve preset result
          const roomPreset = aiRoomPresets[roomType] || aiRoomPresets['living-room'];
          const matchedStyle = roomPreset[interiorStyle] || roomPreset['Modern'] || Object.values(roomPreset)[0];
          
          const recommendedItems = (matchedStyle.recommendedProductIds || ['prod-1', 'prod-3', 'prod-2'])
            .map(id => products.find(p => p.id === id))
            .filter(Boolean);

          const totalCost = recommendedItems.reduce((sum, item) => sum + item.price, 0);

          setDesignResult({
            ...matchedStyle,
            recommendedItems,
            totalCost,
            roomType,
            interiorStyle,
            preferredColor
          });
          setIsGenerating(false);
        }, 600);
      }
    }, 700);
  };

  const handleAddBundleToCart = () => {
    if (!designResult?.recommendedItems) return;
    designResult.recommendedItems.forEach(item => {
      addToCart(item, 1);
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-10 sm:py-14 px-3 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="w-full max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Spatial Interior Suite</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-ivory leading-tight">
            AI Room Designer
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Upload your existing space. Specify room type, style aesthetics, and budget. Our simulated AI engine creates an architectural layout with matching furniture pieces from our master catalog.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {!designResult && !isGenerating && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left: Room Photograph Upload (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-5 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-beige-200">
                  <h3 className="font-serif-luxury text-lg font-semibold text-charcoal">
                    1. Upload Room Photograph
                  </h3>
                  <span className="text-[11px] text-gold font-semibold uppercase">Optional</span>
                </div>

                {uploadedImage ? (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/30 group">
                    <img src={uploadedImage} alt="Uploaded Room Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-charcoal/80 text-white text-xs backdrop-blur-sm hover:bg-charcoal"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-beige-300 hover:border-gold rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors text-center space-y-3 bg-ivory/50">
                    <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Click or drag a photo of your room</p>
                      <p className="text-[11px] text-charcoal/50 mt-1">Supports JPG, PNG up to 10MB</p>
                    </div>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-white border border-beige-300 text-charcoal/70">
                      Or continue with our sample floor plans
                    </span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}

                <div className="p-3.5 rounded-xl bg-beige-100/70 border border-beige-200 text-[11px] text-charcoal/70 flex items-start gap-2">
                  <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    Our AI evaluates architectural boundaries, daylight angles, and floor proportions to match ideal silhouettes.
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Specifications & Preferences (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-6">
              <h3 className="font-serif-luxury text-lg font-semibold text-charcoal pb-3 border-b border-beige-200">
                2. Design Preferences & Parameters
              </h3>

              {/* Room Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5">
                  Room Classification
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {roomTypes.map((rt) => (
                    <button
                      key={rt.id}
                      onClick={() => setRoomType(rt.id)}
                      className={`p-3 rounded-xl text-xs font-semibold transition-all border ${
                        roomType === rt.id 
                          ? 'bg-charcoal text-ivory border-gold shadow-md' 
                          : 'bg-ivory text-charcoal/80 border-beige-300 hover:border-gold'
                      }`}
                    >
                      {rt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interior Style */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5">
                  Architectural Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {interiorStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setInteriorStyle(style)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                        interiorStyle === style
                          ? 'bg-walnut text-ivory border-walnut font-semibold shadow-sm'
                          : 'bg-ivory text-charcoal/80 border-beige-300 hover:border-gold'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Palette */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5">
                  Color Harmony Palette
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorPalettes.map((pal) => (
                    <button
                      key={pal}
                      onClick={() => setPreferredColor(pal)}
                      className={`px-3.5 py-2 rounded-xl text-xs transition-all border ${
                        preferredColor === pal
                          ? 'bg-gold text-charcoal-900 border-gold font-bold shadow-sm'
                          : 'bg-ivory text-charcoal/80 border-beige-300 hover:border-gold'
                      }`}
                    >
                      {pal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                    Room Dimensions (Approx)
                  </label>
                  <input
                    type="text"
                    value={roomDimensions}
                    onChange={(e) => setRoomDimensions(e.target.value)}
                    placeholder="e.g. 20 × 15 ft or 30 sq.m"
                    className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      Target Budget
                    </label>
                    <span className="text-xs font-bold text-walnut">{formatINR(budget)}</span>
                  </div>
                  <input
                    type="range"
                    min="150000"
                    max="600000"
                    step="10000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-gold cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-charcoal/50 mt-1">
                    <span>₹1,50,000</span>
                    <span>₹6,00,000+</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={handleGenerate}
                  className="w-full py-4 rounded-2xl gold-gradient-bg text-charcoal-950 font-bold text-xs uppercase tracking-widest hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-charcoal-950" />
                  <span>Generate My Dream Room</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading / Generating State */}
        {isGenerating && (
          <div className="max-w-2xl mx-auto py-16 text-center space-y-8 bg-white p-10 rounded-3xl border border-gold/30 shadow-2xl animate-in fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-gold/20 border-t-gold animate-spin"></div>
              <div className="absolute inset-2 rounded-full bg-beige-100 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-gold animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-luxury text-2xl font-normal text-charcoal">
                Architectural AI Synthesis
              </h3>
              <p className="text-xs text-walnut font-medium">
                Step {generationStep + 1} of 5: Analyzing Room Geometry
              </p>
            </div>

            {/* Scan animation card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] max-w-md mx-auto bg-charcoal">
              <img
                src={uploadedImage || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"}
                alt="Scanning Space"
                className="w-full h-full object-cover opacity-70"
              />
              {/* Scan laser line */}
              <div className="absolute inset-x-0 h-1 bg-gold shadow-gold-glow animate-bounce"></div>
              <div className="absolute inset-0 bg-charcoal/20 flex items-center justify-center">
                <span className="text-xs text-ivory bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gold/30">
                  Aligning Catalog Geometry
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Revealed AI Results */}
        {designResult && !isGenerating && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-300">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-beige-300 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Curated Bespoke Elevation</span>
                </div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-charcoal">
                  {designResult.title}
                </h2>
                <p className="text-xs text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
                  {designResult.description}
                </p>
              </div>

              <button
                onClick={() => setDesignResult(null)}
                className="px-4 py-2.5 rounded-xl border border-charcoal/20 text-xs font-semibold text-charcoal hover:bg-beige-100 flex items-center gap-1.5 self-start"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Adjust Parameters</span>
              </button>
            </div>

            {/* Draggable Before & After Room Transformation Slider */}
            <div className="max-w-5xl mx-auto space-y-3">
              <BeforeAfterSlider
                beforeImage={uploadedImage || designResult.beforeImage}
                afterImage={designResult.afterImage}
                beforeLabel={uploadedImage ? "Your Uploaded Space" : "Bare Raw Space"}
                afterLabel={`AURA Living: ${designResult.interiorStyle} Transformation`}
              />
              <p className="text-[11px] text-charcoal/50 text-center italic">
                * Simulated architectural transformation matching catalog inventory to your selected style and dimensions.
              </p>
            </div>

            {/* Recommended Catalog Furniture Bundle */}
            <div className="bg-white p-4 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-beige-200">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-charcoal">
                    Recommended Furniture Suite
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-0.5">
                    {designResult.recommendedItems.length} Handcrafted pieces selected for optimal spatial flow
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif-luxury text-2xl font-bold text-walnut">
                      {formatINR(designResult.totalCost)}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {designResult.estimatedSavings}
                    </span>
                  </div>
                  <p className="text-[10px] text-charcoal/50">Includes complimentary white glove assembly</p>
                </div>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {designResult.recommendedItems.map(item => (
                  <div key={item.id} className="p-3 sm:p-4 rounded-2xl bg-ivory border border-beige-300 flex flex-col justify-between space-y-2 group hover:border-gold transition-colors">
                    <div className="space-y-2">
                      <div className="aspect-square rounded-xl overflow-hidden bg-beige-100">
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-gold uppercase font-bold">{item.categoryName}</span>
                        <h4 className="font-serif-luxury text-xs font-semibold text-charcoal line-clamp-1">{item.name}</h4>
                        <p className="text-[11px] text-charcoal/60 line-clamp-1 mt-0.5">{item.materials}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-beige-200">
                      <span className="text-xs font-bold text-walnut">{formatINR(item.price)}</span>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="p-1.5 rounded-lg bg-white hover:bg-gold text-charcoal border border-beige-300 text-xs transition-colors"
                        title="Add Item"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add All To Cart CTA */}
              <div className="pt-6 border-t border-beige-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-charcoal/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>White Glove Delivery & In-Home Assembly included with all suites</span>
                </div>

                <button
                  onClick={handleAddBundleToCart}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Entire Suite Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span>Add Complete Room Suite to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
