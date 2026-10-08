import React, { useState } from 'react';
import { 
  Layers, Sparkles, MessageCircle, ShoppingBag, Check, 
  Rotate3d, Sliders, ArrowRight, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const CustomDesignerPage = () => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Customization Configuration State
  const [furnitureType, setFurnitureType] = useState('sofa');
  const [woodMaterial, setWoodMaterial] = useState('American Black Walnut');
  const [fabricType, setFabricType] = useState('French Textured Bouclé');
  const [fabricColor, setFabricColor] = useState({ name: 'Ivory Cream', hex: '#FAF8F5' });
  const [legStyle, setLegStyle] = useState('Champagne Brass Ferrules');
  const [widthCm, setWidthCm] = useState(240);
  const [depthCm, setDepthCm] = useState(105);
  const [hasWirelessCharger, setHasWirelessCharger] = useState(false);
  const [hasStorage, setHasStorage] = useState(true);
  const [hasNanoStainShield, setHasNanoStainShield] = useState(true);

  // Furniture Type Definitions
  const furnitureTypes = [
    { 
      id: 'sofa', 
      name: 'Sculptural Curved Sofa', 
      basePrice: 160000, 
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      minW: 200, maxW: 320, defaultW: 240
    },
    { 
      id: 'table', 
      name: 'Monumental Dining Table', 
      basePrice: 185000, 
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
      minW: 180, maxW: 340, defaultW: 240
    },
    { 
      id: 'chair', 
      name: 'Organic Accent Armchair', 
      basePrice: 75000, 
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
      minW: 75, maxW: 110, defaultW: 88
    },
    { 
      id: 'bed', 
      name: 'Floating Canopy King Bed', 
      basePrice: 155000, 
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      minW: 180, maxW: 220, defaultW: 198
    },
    { 
      id: 'desk', 
      name: 'Executive Architectural Desk', 
      basePrice: 140000, 
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
      minW: 160, maxW: 260, defaultW: 190
    }
  ];

  const currentTypeObj = furnitureTypes.find(t => t.id === furnitureType) || furnitureTypes[0];

  const woodOptions = [
    { name: 'American Black Walnut', surcharge: 0 },
    { name: 'Natural White Oak', surcharge: -8000 },
    { name: 'Smoked Black Ash', surcharge: 5000 },
    { name: 'Italian Calacatta Viola Marble Inset', surcharge: 35000 }
  ];

  const fabricOptions = [
    { name: 'French Textured Bouclé', surcharge: 0 },
    { name: 'Tuscan Full-Grain Aniline Leather', surcharge: 28000 },
    { name: 'Royal Silk Velvet', surcharge: 16000 },
    { name: 'Belgian Flax Linen', surcharge: 6000 }
  ];

  const colorSwatches = [
    { name: 'Ivory Cream', hex: '#FAF8F5' },
    { name: 'Cognac Tan', hex: '#96552B' },
    { name: 'Forest Emerald', hex: '#1B4D3E' },
    { name: 'Midnight Charcoal', hex: '#242424' },
    { name: 'Warm Oatmeal', hex: '#E8DED1' },
    { name: 'Champagne Gold', hex: '#C6A77B' }
  ];

  const legOptions = [
    { name: 'Champagne Brass Ferrules', surcharge: 6000 },
    { name: 'Floating Recessed Walnut Plinth', surcharge: 0 },
    { name: 'Matte Charcoal Architectural Steel', surcharge: 4000 },
    { name: 'Solid Tapered Timber Legs', surcharge: 2000 }
  ];

  // Dynamic illustrative price calculation
  const calculatedPrice = (() => {
    let price = currentTypeObj.basePrice;
    
    // Dimension scale factor
    const sizeMultiplier = widthCm / currentTypeObj.defaultW;
    price = price * Math.max(0.9, sizeMultiplier);

    // Selected wood
    const woodObj = woodOptions.find(w => w.name === woodMaterial);
    if (woodObj) price += woodObj.surcharge;

    // Selected fabric
    const fabricObj = fabricOptions.find(f => f.name === fabricType);
    if (fabricObj) price += fabricObj.surcharge;

    // Selected leg
    const legObj = legOptions.find(l => l.name === legStyle);
    if (legObj) price += legObj.surcharge;

    // Addons
    if (hasWirelessCharger) price += 8500;
    if (hasStorage) price += 14000;
    if (hasNanoStainShield) price += 6500;

    return Math.round(price);
  })();

  const handleAddToCartBespoke = () => {
    const bespokeProduct = {
      id: `custom-${furnitureType}-${Date.now()}`,
      name: `Bespoke Custom: ${currentTypeObj.name}`,
      category: 'Bespoke',
      categoryName: 'Bespoke Atelier',
      price: calculatedPrice,
      originalPrice: Math.round(calculatedPrice * 1.15),
      images: [currentTypeObj.image],
      colors: [fabricColor],
      customConfig: {
        furnitureType: currentTypeObj.name,
        wood: woodMaterial,
        fabric: fabricType,
        color: fabricColor.name,
        dimensions: `${widthCm}cm × ${depthCm}cm`,
        legs: legStyle,
        addons: [
          hasWirelessCharger ? 'Wireless Qi Charger' : null,
          hasStorage ? 'Hydraulic Soft Storage' : null,
          hasNanoStainShield ? 'Nano Stain Treatment' : null
        ].filter(Boolean),
        price: calculatedPrice
      }
    };

    addToCart(bespokeProduct, 1, fabricColor, bespokeProduct.customConfig);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const whatsappQuoteMsg = encodeURIComponent(
    `Hello AURA Atelier. I would like to request a custom quotation for a ${currentTypeObj.name}:\n` +
    `• Dimensions: ${widthCm} cm W × ${depthCm} cm D\n` +
    `• Timber: ${woodMaterial}\n` +
    `• Upholstery: ${fabricType} (${fabricColor.name})\n` +
    `• Leg Profile: ${legStyle}\n` +
    `• Add-ons: ${[hasWirelessCharger && 'Wireless Charging', hasStorage && 'Concealed Storage', hasNanoStainShield && 'Nano Stain Guard'].filter(Boolean).join(', ') || 'None'}\n` +
    `• Estimated Quotation: ${formatINR(calculatedPrice)}\n` +
    `Please connect me with an atelier master craftsman.`
  );

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-10 sm:py-14 px-3 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="w-full max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold border border-gold/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Artisanal Custom Joinery & Tailoring</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-ivory">
            Custom Furniture Designer
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Tailor dimensions, heirloom hardwoods, Italian top-grain leathers, and metal finishes to harmonize with your residence's architectural footprint.
          </p>
        </div>
      </div>

      {/* Main Designer Grid */}
      <div className="w-full max-w-[1640px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Left Column: Live Visual Render & Specs Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 bg-white p-4 sm:p-7 rounded-3xl border border-gold/30 shadow-luxury space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-beige-200">
                <span className="text-[11px] text-gold uppercase font-bold tracking-wider">
                  Live Architectural Preview
                </span>
                <span className="text-xs bg-beige-100 text-walnut px-2.5 py-1 rounded-full font-semibold">
                  {fabricColor.name}
                </span>
              </div>

              {/* Visual preview image with active color wash border */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-beige-100 border-2 border-gold/40 shadow-inner group">
                <img
                  src={currentTypeObj.image}
                  alt={currentTypeObj.name}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Visual color indicator swatch overlay */}
                <div 
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal/80 text-ivory text-xs backdrop-blur-md border border-white/20 shadow-md"
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: fabricColor.hex }} />
                  <span>{fabricColor.name} • {fabricType}</span>
                </div>
              </div>

              {/* Dynamic Price Calculation Box */}
              <div className="p-5 rounded-2xl bg-beige-50 border border-gold/30 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-charcoal/60 uppercase font-semibold">Illustrative Price Estimate</span>
                  <span className="font-serif-luxury text-3xl font-bold text-walnut">
                    {formatINR(calculatedPrice)}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal/50">
                  Calculated based on selected {woodMaterial}, {widthCm}cm length, and bespoke tailoring.
                </p>
              </div>

              {/* Summary of specs */}
              <div className="text-xs text-charcoal/80 space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Classification:</span>
                  <span className="font-semibold text-charcoal">{currentTypeObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Custom Dimensions:</span>
                  <span className="font-semibold text-charcoal">{widthCm} cm W × {depthCm} cm D</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Selected Timber:</span>
                  <span className="font-semibold text-charcoal">{woodMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Base & Legs:</span>
                  <span className="font-semibold text-charcoal">{legStyle}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={handleAddToCartBespoke}
                  className="w-full py-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-md active:scale-95 transition-all"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Custom Design Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>Commission & Add to Bag</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/919820045890?text=${whatsappQuoteMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Custom Quotation via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gold/30 shadow-luxury space-y-8">
            {/* Step 1: Furniture Type */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  Select Architectural Form
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {furnitureTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setFurnitureType(type.id);
                      setWidthCm(type.defaultW);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      furnitureType === type.id
                        ? 'bg-charcoal text-ivory border-gold shadow-md ring-1 ring-gold'
                        : 'bg-ivory text-charcoal border-beige-300 hover:border-gold'
                    }`}
                  >
                    <p className="font-serif-luxury text-xs font-semibold">{type.name}</p>
                    <p className={`text-[11px] mt-0.5 ${furnitureType === type.id ? 'text-gold' : 'text-charcoal/60'}`}>
                      Starts at {formatINR(type.basePrice)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  Adjust Custom Proportions
                </h3>
              </div>
              <div className="space-y-4 bg-beige-50 p-5 rounded-2xl border border-beige-300">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-semibold">
                    <span className="text-charcoal">Overall Length / Width</span>
                    <span className="text-walnut">{widthCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={currentTypeObj.minW}
                    max={currentTypeObj.maxW}
                    step="5"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                    className="w-full accent-gold cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-charcoal/50 mt-1">
                    <span>{currentTypeObj.minW} cm</span>
                    <span>{currentTypeObj.maxW} cm</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-semibold">
                    <span className="text-charcoal">Depth Clearance</span>
                    <span className="text-walnut">{depthCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="140"
                    step="5"
                    value={depthCm}
                    onChange={(e) => setDepthCm(Number(e.target.value))}
                    className="w-full accent-gold cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Hardwood & Frame Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  Select Hardwood Timber & Structure
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {woodOptions.map((w) => (
                  <button
                    key={w.name}
                    onClick={() => setWoodMaterial(w.name)}
                    className={`p-3 rounded-xl text-left text-xs transition-all border ${
                      woodMaterial === w.name
                        ? 'bg-walnut text-ivory border-walnut font-semibold shadow-sm'
                        : 'bg-ivory text-charcoal/80 border-beige-300 hover:border-gold'
                    }`}
                  >
                    <span>{w.name}</span>
                    {w.surcharge !== 0 && (
                      <span className="block text-[10px] opacity-70 mt-0.5">
                        {w.surcharge > 0 ? `+${formatINR(w.surcharge)}` : formatINR(w.surcharge)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Upholstery & Color Swatches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">4</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  Upholstery Fabric & Color Swatch
                </h3>
              </div>
              
              {/* Fabrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {fabricOptions.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setFabricType(f.name)}
                    className={`p-2.5 rounded-xl text-xs text-center border transition-all ${
                      fabricType === f.name
                        ? 'bg-charcoal text-ivory font-semibold border-gold shadow-sm'
                        : 'bg-ivory text-charcoal/80 border-beige-300 hover:border-gold'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>

              {/* Color Swatches */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-charcoal/70">Palette:</span>
                <div className="flex gap-2">
                  {colorSwatches.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setFabricColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        fabricColor.name === c.name
                          ? 'border-charcoal scale-125 shadow-md ring-2 ring-gold'
                          : 'border-white hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {fabricColor.name === c.name && <Check className="w-3.5 h-3.5 text-charcoal" />}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-medium text-walnut ml-2">{fabricColor.name}</span>
              </div>
            </div>

            {/* Step 5: Leg / Plinth Architecture */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">5</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  Base & Leg Architecture
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {legOptions.map((l) => (
                  <button
                    key={l.name}
                    onClick={() => setLegStyle(l.name)}
                    className={`p-3 rounded-xl text-left text-xs transition-all border ${
                      legStyle === l.name
                        ? 'bg-gold text-charcoal-900 border-gold font-bold shadow-sm'
                        : 'bg-ivory text-charcoal/80 border-beige-300 hover:border-gold'
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Functional Add-ons */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">6</span>
                <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                  Architectural Add-ons
                </h3>
              </div>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-beige-300 cursor-pointer hover:border-gold">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasWirelessCharger}
                      onChange={(e) => setHasWirelessCharger(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Flush 15W Qi Wireless Fast Charger</p>
                      <p className="text-[11px] text-charcoal/60">Concealed imperceptibly beneath timber surface</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-walnut">+₹8,500</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-beige-300 cursor-pointer hover:border-gold">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasStorage}
                      onChange={(e) => setHasStorage(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Concealed Hydraulic Storage Lift</p>
                      <p className="text-[11px] text-charcoal/60">Silent German gas struts for hidden chambers</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-walnut">+₹14,000</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-beige-300 cursor-pointer hover:border-gold">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={hasNanoStainShield}
                      onChange={(e) => setHasNanoStainShield(e.target.checked)}
                      className="w-4 h-4 accent-gold"
                    />
                    <div>
                      <p className="text-xs font-semibold text-charcoal">Permanent Nano-Fluorine Stain Treatment</p>
                      <p className="text-[11px] text-charcoal/60">Impervious to espresso, red wine, and oils</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-walnut">+₹6,500</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
