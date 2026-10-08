// Curated Luxury Furniture Mock Database (INR Currency)
// High-resolution photography from Unsplash luxury interiors and artisan furniture

export const products = [
  // --- LIVING ROOM ---
  {
    id: "prod-1",
    name: "Aura Milano Curved Bouclé Sofa",
    tagline: "Sculptural organic silhouette in premium French bouclé",
    category: "living-room",
    categoryName: "Living Room",
    collection: "Milano Heritage",
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-1.jpg"],
    materials: "Solid Kiln-Dried Beechwood Frame, High-Resilience Foam, Textured French Wool Bouclé, Brushed Champagne Brass Plinth",
    dimensions: {
      width: "250 cm",
      depth: "115 cm",
      height: "78 cm",
      seatHeight: "42 cm",
      weight: "82 kg"
    },
    colors: [
      { name: "Ivory Cream", hex: "#FAF8F5", bgClass: "bg-[#FAF8F5]" },
      { name: "Oatmeal Beige", hex: "#E8DED1", bgClass: "bg-[#E8DED1]" },
      { name: "Charcoal Slate", hex: "#242424", bgClass: "bg-[#242424]" }
    ],
    description: "The Aura Milano Curved Sofa embodies Italian organic modernism. Crafted with sweeping architectural lines, deep cloud-like cushions, and upholstered in tactile ivory bouclé, it transforms any living room into an editorial sanctuary.",
    features: [
      "Signature curved organic architecture",
      "Multi-density high-resilience foam core with feather down blend",
      "Reinforced Italian beechwood frame with mortise-and-tenon joinery",
      "Concealed brushed brass recessed base",
      "Stain-resistant nano-treated luxury bouclé weave"
    ],
    careInstructions: "Professional upholstery clean only. Vacuum regularly using soft brush attachment. Keep away from direct harsh sunlight.",
    warranty: "10-Year Structural Frame Warranty & 3-Year Upholstery Warranty",
    style: "Modern Luxury",
    has3dModel: true
  },
  {
    id: "prod-2",
    name: "Verona Cognac Leather Lounge Armchair",
    tagline: "Supple Tuscan saddle leather with solid American walnut frame",
    category: "living-room",
    categoryName: "Living Room",
    collection: "Tuscan Villa",
    price: 89000,
    originalPrice: 105000,
    discount: 15,
    rating: 4.85,
    reviewCount: 44,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-2.jpg"],
    materials: "Full-Grain Italian Aniline Leather, Solid American Black Walnut, Cast Brass Details",
    dimensions: {
      width: "88 cm",
      depth: "92 cm",
      height: "82 cm",
      seatHeight: "41 cm",
      weight: "32 kg"
    },
    colors: [
      { name: "Cognac Tan", hex: "#96552B", bgClass: "bg-[#96552B]" },
      { name: "Espresso Dark", hex: "#3B271A", bgClass: "bg-[#3B271A]" },
      { name: "Olive Green", hex: "#4A5340", bgClass: "bg-[#4A5340]" }
    ],
    description: "Hand-patinated full-grain leather meets the warm organic curvature of American walnut. The Verona Lounge chair offers an ergonomic recline tuned for reading, dialogue, and quiet contemplation.",
    features: [
      "Tanned in Santa Croce sull'Arno, Tuscany",
      "Hand-finished natural wax and oil walnut frame",
      "Saddle-stitched seams with heavy-gauge German thread",
      "Ergonomic lumbar slope for unmatched posture support"
    ],
    careInstructions: "Condition leather semi-annually with natural beeswax balm. Wipe walnut frame with dry microfiber cloth.",
    warranty: "10-Year Solid Walnut Frame Guarantee",
    style: "Mid-Century Luxury",
    has3dModel: true
  },
  {
    id: "prod-3",
    name: "Solstice Marble & Fluted Walnut Coffee Table",
    tagline: "Honed Calacatta Viola marble atop artisanal fluted tambour",
    category: "living-room",
    categoryName: "Living Room",
    collection: "Milano Heritage",
    price: 64000,
    originalPrice: 75000,
    discount: 14,
    rating: 4.95,
    reviewCount: 29,
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-3.jpg"],
    materials: "Natural Italian Calacatta Marble Slab, Solid Walnut Slats, Satin Champagne Hardware",
    dimensions: {
      width: "120 cm",
      depth: "75 cm",
      height: "38 cm",
      seatHeight: "N/A",
      weight: "64 kg"
    },
    colors: [
      { name: "Calacatta Viola", hex: "#4D2D3E", bgClass: "bg-[#4D2D3E]" },
      { name: "Carrara White", hex: "#EDEDED", bgClass: "bg-[#EDEDED]" },
      { name: "Nero Marquina", hex: "#1A1A1A", bgClass: "bg-[#1A1A1A]" }
    ],
    description: "A monumental centerpiece pairing the dramatic burgundy veining of Italian Calacatta marble with precision-milled walnut tambour. Features discreet soft-closing pull-out storage beneath.",
    features: [
      "Each natural marble slab features unique geologic veining",
      "Beveled bullnose edge profiling",
      "Hidden 360-degree felt protective feet for fine timber floors",
      "Dual concealed soft-touch storage chambers"
    ],
    careInstructions: "Use coasters for hot and acidic beverages. Seal marble annually with stone penetrant. Avoid abrasive cleaners.",
    warranty: "5-Year Craftsmanship Guarantee",
    style: "Contemporary Luxury",
    has3dModel: false
  },
  {
    id: "prod-4",
    name: "Kyoto Low-Profile Walnut Media Credenza",
    tagline: "Japanese minimalist joinery with slatted acoustic facade",
    category: "living-room",
    categoryName: "Living Room",
    collection: "Kyoto Zen",
    price: 112000,
    originalPrice: 130000,
    discount: 13,
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-4.jpg"],
    materials: "FSC-Certified American Black Walnut, Smoked Glass, Integrated Cable Management",
    dimensions: {
      width: "220 cm",
      depth: "48 cm",
      height: "52 cm",
      seatHeight: "N/A",
      weight: "74 kg"
    },
    colors: [
      { name: "Natural Walnut", hex: "#654832", bgClass: "bg-[#654832]" },
      { name: "Smoked Black Oak", hex: "#222222", bgClass: "bg-[#222222]" }
    ],
    description: "Drawing inspiration from traditional Kyoto lattice work (Machiya koushi), this low credenza conceals modern home entertainment tech behind slatted doors that permit infrared remote signals and acoustic flow.",
    features: [
      "IR-transparent acoustic slatted front facade",
      "Ventilated component chambers preventing electronics overheating",
      "Integrated magnetic cable trunking system",
      "Blum soft-close drawer runners with push-to-open mechanics"
    ],
    careInstructions: "Dust along the grain with a soft ostrich feather or microfiber cloth. Condition with natural Danish oil yearly.",
    warranty: "10-Year Hardware & Timber Warranty",
    style: "Japandi / Minimalist",
    has3dModel: false
  },
  {
    id: "prod-5",
    name: "L'Etoile Cast Bronze Sculptural Floor Lamp",
    tagline: "Lost-wax cast bronze with frosted alabaster diffuser",
    category: "lighting-decor",
    categoryName: "Lighting & Decor",
    collection: "Versailles Opulence",
    price: 42000,
    originalPrice: 48000,
    discount: 12,
    rating: 4.88,
    reviewCount: 19,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    images: ["/images/products/prod-5.jpg"],
    materials: "Cast Solid Architectural Bronze, Natural Spanish Alabaster, Woven Silk Cord",
    dimensions: {
      width: "40 cm",
      depth: "40 cm",
      height: "165 cm",
      seatHeight: "N/A",
      weight: "24 kg"
    },
    colors: [
      { name: "Brushed Champagne", hex: "#C6A77B", bgClass: "bg-[#C6A77B]" },
      { name: "Antique Bronze", hex: "#4A3B2C", bgClass: "bg-[#4A3B2C]" }
    ],
    description: "A functional sculpture that casts a warm, atmospheric halo. Each shade is carved from translucent Spanish alabaster stone, creating an ethereal glow reminiscent of twilight in Paris.",
    features: [
      "Integrated step-less warm-dim LED (2200K - 2700K)",
      "Solid bronze weighted disc base for rock-solid stability",
      "Foot-switch rotary brass dimmer",
      "Unique translucent stone veining on every piece"
    ],
    careInstructions: "Clean alabaster with mild water-dampened cloth. Do not use chemical solvents on bronze patina.",
    warranty: "5-Year Electrical & Finish Guarantee",
    style: "Art Deco / Architectural",
    has3dModel: false
  },
  {
    id: "prod-6",
    name: "Palermo Featherdown Modular Sectional",
    tagline: "Endless modular freedom in Italian ribbed chenille velvet",
    category: "living-room",
    categoryName: "Living Room",
    collection: "Milano Heritage",
    price: 245000,
    originalPrice: 285000,
    discount: 14,
    rating: 4.96,
    reviewCount: 51,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-6.jpg"],
    materials: "Hardwood Corner-Blocked Frame, Goose Feather Down Pillows, High-Traffic Ribbed Chenille",
    dimensions: {
      width: "340 cm",
      depth: "210 cm",
      height: "80 cm",
      seatHeight: "44 cm",
      weight: "145 kg"
    },
    colors: [
      { name: "Warm Cream", hex: "#F5EFE6", bgClass: "bg-[#F5EFE6]" },
      { name: "Olive Velvet", hex: "#3D4836", bgClass: "bg-[#3D4836]" },
      { name: "Deep Navy", hex: "#1C2833", bgClass: "bg-[#1C2833]" }
    ],
    description: "Engineered for monumental spaces and effortless luxury living. Its low-slung, deeply padded modules can be rearranged into intimate conversation corners or sprawling cinema arrangements.",
    features: [
      "5 interlocking modular components with heavy-duty alligator clips",
      "Removable dry-cleanable cushion envelopes",
      "Certified responsibly sourced goose down topping",
      "Includes 6 complementary feather accent bolsters"
    ],
    careInstructions: "Fluff cushions weekly to maintain loft. Spot clean with dry-foam solvent.",
    warranty: "15-Year Frame Guarantee",
    style: "Contemporary Luxury",
    has3dModel: true
  },

  // --- BEDROOM ---
  {
    id: "prod-7",
    name: "Aethelgard Floating Canopy King Bed",
    tagline: "Solid quarter-sawn American oak with floating cantilevered plinth",
    category: "bedroom",
    categoryName: "Bedroom",
    collection: "Nordic Sanctuary",
    price: 165000,
    originalPrice: 195000,
    discount: 15,
    rating: 4.92,
    reviewCount: 31,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-7.jpg"],
    materials: "Quarter-sawn White Oak, Upholstered Headboard in Belgian Linen, Integrated LED Under-Glow",
    dimensions: {
      width: "198 cm",
      depth: "220 cm",
      height: "130 cm",
      seatHeight: "36 cm",
      weight: "110 kg"
    },
    colors: [
      { name: "Nordic White Oak", hex: "#D6C5B1", bgClass: "bg-[#D6C5B1]" },
      { name: "Smoked American Walnut", hex: "#654832", bgClass: "bg-[#654832]" },
      { name: "Ebony Black", hex: "#202020", bgClass: "bg-[#202020]" }
    ],
    description: "An architectural tour de force. The recessed floating base gives the illusion that this massive solid oak king bed hovers weightlessly above your bedroom floor, highlighted by soft warm perimeter illumination.",
    features: [
      "Hidden ambient under-bed LED warm backlight with touch dimmer",
      "Ergonomic angled headboard cushioned in Belgian flax linen",
      "Heavy-duty beechwood spring-slat orthopedic mattress support",
      "Twin cantilevered floating nightstand shelves included"
    ],
    careInstructions: "Wipe wood surfaces with soft damp cloth. Dust fabric headboard with fabric brush.",
    warranty: "15-Year Solid Timber Structure Guarantee",
    style: "Nordic Minimalist",
    has3dModel: true
  },
  {
    id: "prod-8",
    name: "Serena Fluted Velvet Dressing Vanity & Mirror",
    tagline: "Champagne brass trims with Italian micro-fluted tambour",
    category: "bedroom",
    categoryName: "Bedroom",
    collection: "Versailles Opulence",
    price: 88000,
    originalPrice: 102000,
    discount: 13,
    rating: 4.88,
    reviewCount: 18,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-8.jpg"],
    materials: "Solid Ash Wood, Ivory Lacquer, Brushed Champagne Gold Metal, High-Definition Beveled Glass",
    dimensions: {
      width: "130 cm",
      depth: "52 cm",
      height: "145 cm",
      seatHeight: "N/A",
      weight: "58 kg"
    },
    colors: [
      { name: "Champagne Cream", hex: "#FAF8F5", bgClass: "bg-[#FAF8F5]" },
      { name: "Blush Rose", hex: "#D8BFB4", bgClass: "bg-[#D8BFB4]" }
    ],
    description: "Curated for moments of private glamour. Features a halo backlit vanity mirror with touch kelvin temperature control, felt-lined jewelry organizer drawers, and a matching velvet vanity stool.",
    features: [
      "Touch-controlled LED ring mirror with 3 light temperatures (warm, natural, cool)",
      "Velvet-lined partitioned drawers for fine jewelry and watches",
      "Integrated dual fast-charging USB-C & AC outlets inside vanity compartment",
      "Complementary cushioned vanity stool included"
    ],
    careInstructions: "Clean mirror with ammonia-free glass cleaner. Dust lacquer with lint-free microfiber.",
    warranty: "5-Year Mechanical & Electrical Guarantee",
    style: "Luxury Contemporary",
    has3dModel: false
  },
  {
    id: "prod-9",
    name: "Geneva 6-Drawer Walnut Wardrobe Credenza",
    tagline: "Hand-carved solid walnut front with soft-closing dovetail joinery",
    category: "bedroom",
    categoryName: "Bedroom",
    collection: "Milano Heritage",
    price: 118000,
    originalPrice: 135000,
    discount: 12,
    rating: 4.93,
    reviewCount: 27,
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-9.jpg"],
    materials: "Solid American Walnut, Solid Cedarwood Drawer Interiors, Brushed Brass Hardware",
    dimensions: {
      width: "175 cm",
      depth: "50 cm",
      height: "86 cm",
      seatHeight: "N/A",
      weight: "86 kg"
    },
    colors: [
      { name: "Warm Walnut", hex: "#654832", bgClass: "bg-[#654832]" },
      { name: "Charcoal Ash", hex: "#2E2E2E", bgClass: "bg-[#2E2E2E]" }
    ],
    description: "Heirloom woodworking meets modern storage luxury. The drawers are lined with aromatic Canadian cedar that naturally preserves cashmere, silk, and fine garments while imparting a soothing natural fragrance.",
    features: [
      "Naturally moth-deterrent aromatic cedar drawer bottoms",
      "Hand-cut English dovetail drawer boxes",
      "Blum undermount soft-closing runners with 45kg load capacity each",
      "Seamless invisible integrated pull lip"
    ],
    careInstructions: "Dust regularly along wood grains. Maintain natural cedar scent by gentle sanding every two years.",
    warranty: "15-Year Craftsmanship Guarantee",
    style: "Modern Artisan",
    has3dModel: false
  },
  {
    id: "prod-10",
    name: "Nocturne Upholstered Bed Bench",
    tagline: "Ribbed bouclé bench with hidden hydraulic storage compartment",
    category: "bedroom",
    categoryName: "Bedroom",
    collection: "Nordic Sanctuary",
    price: 45000,
    originalPrice: 52000,
    discount: 13,
    rating: 4.86,
    reviewCount: 35,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    images: ["/images/products/prod-10.jpg"],
    materials: "Ivory French Bouclé, Solid Walnut Plinth, German Hydraulic Gas Struts",
    dimensions: {
      width: "150 cm",
      depth: "48 cm",
      height: "46 cm",
      seatHeight: "46 cm",
      weight: "34 kg"
    },
    colors: [
      { name: "Ivory Cream", hex: "#FAF8F5", bgClass: "bg-[#FAF8F5]" },
      { name: "Camel", hex: "#C29B72", bgClass: "bg-[#C29B72]" }
    ],
    description: "An elegant companion for the foot of the bed. Beneath its deeply channeled bouclé seat lies a silent hydraulic lift opening to store spare duvets, throws, and decorative pillows.",
    features: [
      "Dual German hydraulic gas pistons for effortless feather-light opening",
      "Reinforced steel hinge mechanism rated for 50,000 cycles",
      "High-density commercial foam seating layer",
      "Breathable ventilated bottom panel"
    ],
    careInstructions: "Spot treat spills immediately with absorbent cloth. Professional upholstery steam clean.",
    warranty: "5-Year Mechanism & Structural Warranty",
    style: "Modern Classic",
    has3dModel: false
  },

  // --- DINING ROOM ---
  {
    id: "prod-11",
    name: "Valenza Monumental Travertine Dining Table",
    tagline: "Solid Roman travertine double fluted pedestal 8-seater",
    category: "dining-room",
    categoryName: "Dining Room",
    collection: "Tuscan Villa",
    price: 215000,
    originalPrice: 250000,
    discount: 14,
    rating: 4.98,
    reviewCount: 26,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-11.jpg"],
    materials: "Honed Roman Navona Travertine, Reinforced Internal Steel Substructure",
    dimensions: {
      width: "240 cm",
      depth: "110 cm",
      height: "76 cm",
      seatHeight: "N/A",
      weight: "185 kg"
    },
    colors: [
      { name: "Roman Navona Cream", hex: "#E8DED1", bgClass: "bg-[#E8DED1]" },
      { name: "Titanium Silver Travertine", hex: "#8A8782", bgClass: "bg-[#8A8782]" }
    ],
    description: "Quarried in Tivoli, Italy, this monumental dining table features two fluted architectural columns supporting a 40mm thick honed travertine oval slab. It is the crowning jewel of formal dinner parties.",
    features: [
      "Solid natural stone with organic pores sealed with satin resin",
      "Rounded bullnose edge that is silky smooth to the touch",
      "Engineered double-pillar base offers zero leg obstruction for all 8 diners",
      "Includes professional white glove inside room installation & assembly"
    ],
    careInstructions: "Wipe with pH-neutral stone cleaner. Do not place vinegar, citrus, or wine directly on surface without placemats.",
    warranty: "10-Year Stone Structural Guarantee",
    style: "Classical Luxury",
    has3dModel: true
  },
  {
    id: "prod-12",
    name: "Capri Cane & Walnut Dining Chair (Set of 2)",
    tagline: "Artisan hand-woven French cane with cantilevered bentwood frame",
    category: "dining-room",
    categoryName: "Dining Room",
    collection: "Tuscan Villa",
    price: 48000,
    originalPrice: 56000,
    discount: 14,
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-12-dining-chair.jpg"],
    materials: "Hand-Selected American Walnut, Natural Rattan Cane Webbing, Aniline Leather Padded Seat",
    dimensions: {
      width: "56 cm",
      depth: "58 cm",
      height: "82 cm",
      seatHeight: "47 cm",
      weight: "8.5 kg"
    },
    colors: [
      { name: "Walnut & Natural Cane", hex: "#654832", bgClass: "bg-[#654832]" },
      { name: "Black Ash & Ebony Cane", hex: "#1F1F1F", bgClass: "bg-[#1F1F1F]" }
    ],
    description: "A harmonious synthesis of lightness and structural strength. Hand-woven rattan allows air to circulate freely during multi-course dining, while the supple padded leather seat cushions every guest in comfort.",
    features: [
      "Price includes a matching set of 2 luxury chairs",
      "Double-walled natural cane backrest hand-stretched by master weavers",
      "High-density foam leather seat cushion with concealed brass fasteners",
      "Felt glide inserts pre-fitted to protect hardwood and marble floors"
    ],
    careInstructions: "Mist cane lightly once a year to preserve natural elasticity. Condition leather seats with leather milk.",
    warranty: "5-Year Joinery & Cane Guarantee",
    style: "Mediterranean Elegance",
    has3dModel: false
  },
  {
    id: "prod-13",
    name: "Vittoria Smoked Glass & Brass Bar Cabinet",
    tagline: "Internal mirror lining, brass stemware racks, and motion illumination",
    category: "dining-room",
    categoryName: "Dining Room",
    collection: "Versailles Opulence",
    price: 135000,
    originalPrice: 155000,
    discount: 13,
    rating: 4.94,
    reviewCount: 20,
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-13.jpg"],
    materials: "Smoked Tempered Glass Doors, Solid American Walnut, Satin Champagne Gold Brass Frame",
    dimensions: {
      width: "110 cm",
      depth: "48 cm",
      height: "160 cm",
      seatHeight: "N/A",
      weight: "92 kg"
    },
    colors: [
      { name: "Walnut & Champagne Gold", hex: "#C6A77B", bgClass: "bg-[#C6A77B]" },
      { name: "Smoked Black & Gunmetal", hex: "#3A3A3A", bgClass: "bg-[#3A3A3A]" }
    ],
    description: "The ultimate entertaining showpiece. Opening the soft-touch glass doors triggers hidden warm ambient LED shelf lighting that illuminates fine spirits, crystal decanters, and hanging stemware against an antiqued mirror backdrop.",
    features: [
      "Integrated smart door-sensor LED illumination",
      "Hanging stemware racks holding up to 18 wine & cocktail glasses",
      "Removable solid walnut 12-bottle wine grid",
      "Pull-out marble prep shelf for crafting aperitifs"
    ],
    careInstructions: "Wipe glass with microfiber and glass cleaner. Polish brass with dry jeweler's cloth.",
    warranty: "10-Year Cabinet & Lighting Warranty",
    style: "Modern Glamour",
    has3dModel: false
  },
  {
    id: "prod-14",
    name: "Siena Bouclé & Brass Dining Armchair (Set of 2)",
    tagline: "Curved enveloping barrel back with champagne brass capped legs",
    category: "dining-room",
    categoryName: "Dining Room",
    collection: "Milano Heritage",
    price: 54000,
    originalPrice: 62000,
    discount: 13,
    rating: 4.87,
    reviewCount: 31,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    images: ["/images/products/prod-14-dining-chair.jpg"],
    materials: "Heavy-Gauge Bouclé Upholstery, Steam-Bent Oak Frame, Solid Brass Ferrules",
    dimensions: {
      width: "60 cm",
      depth: "60 cm",
      height: "79 cm",
      seatHeight: "48 cm",
      weight: "11 kg"
    },
    colors: [
      { name: "Ivory Bouclé", hex: "#FAF8F5", bgClass: "bg-[#FAF8F5]" },
      { name: "Oatmeal", hex: "#E8DED1", bgClass: "bg-[#E8DED1]" },
      { name: "Moss Green", hex: "#4B5320", bgClass: "bg-[#4B5320]" }
    ],
    description: "Encapsulating diners in sculpted comfort. The wrap-around curved barrel back supports arms and shoulders during extended dinners and celebrations.",
    features: [
      "Set of 2 chairs",
      "Ergonomic barrel curvature",
      "Commercial grade stain-guarded bouclé fabric",
      "Solid brass protective leg ferrule caps"
    ],
    careInstructions: "Steam clean or wipe with gentle damp towel.",
    warranty: "5-Year Warranty",
    style: "Contemporary Luxury",
    has3dModel: false
  },

  // --- OFFICE ---
  {
    id: "prod-15",
    name: "Aethelgard Executive Walnut & Leather Desk",
    tagline: "Cantilevered solid walnut architecture with wireless charging desktop",
    category: "office",
    categoryName: "Office",
    collection: "Nordic Sanctuary",
    price: 155000,
    originalPrice: 180000,
    discount: 14,
    rating: 4.97,
    reviewCount: 42,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-15.jpg"],
    materials: "Solid American Walnut, Full-Grain Italian Blotter Inset, Concealed Qi Wireless Charger, Brushed Brass Legs",
    dimensions: {
      width: "190 cm",
      depth: "85 cm",
      height: "76 cm",
      seatHeight: "N/A",
      weight: "95 kg"
    },
    colors: [
      { name: "Walnut & Cognac Leather", hex: "#654832", bgClass: "bg-[#654832]" },
      { name: "Smoked Oak & Black Leather", hex: "#222222", bgClass: "bg-[#222222]" }
    ],
    description: "Engineered for visionaries and leaders. Features a hand-stitched Italian leather desk pad flush with the walnut surface, dual invisible 15W MagSafe wireless phone chargers integrated underneath the wood grain, and magnetic cable concealment channels.",
    features: [
      "Concealed flush Qi wireless fast chargers carved beneath the timber",
      "Soft-closing lockable drawer with fingerprint biometric biometric latch",
      "Full-grain saddle leather writing surface inset",
      "Internal cable raceway with multi-socket power hub"
    ],
    careInstructions: "Treat leather inlay with natural leather lotion. Dust walnut frame with microfibre.",
    warranty: "10-Year Desk Warranty & 3-Year Electronics Warranty",
    style: "Executive Modern",
    has3dModel: true
  },
  {
    id: "prod-16",
    name: "Kobenhavn Ergonomic Executive Chair",
    tagline: "Aniline leather with synchronous tilt mechanism and solid aluminum frame",
    category: "office",
    categoryName: "Office",
    collection: "Nordic Sanctuary",
    price: 78000,
    originalPrice: 90000,
    discount: 13,
    rating: 4.91,
    reviewCount: 39,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-16.jpg"],
    materials: "Tuscan Top-Grain Aniline Leather, Die-Cast Polished Aluminum Frame, Class 4 German Pneumatic Gas Lift",
    dimensions: {
      width: "68 cm",
      depth: "68 cm",
      height: "115 - 125 cm",
      seatHeight: "46 - 56 cm",
      weight: "26 kg"
    },
    colors: [
      { name: "Cognac Tan", hex: "#96552B", bgClass: "bg-[#96552B]" },
      { name: "Midnight Charcoal", hex: "#242424", bgClass: "bg-[#242424]" },
      { name: "Cream White", hex: "#F5EFE6", bgClass: "bg-[#F5EFE6]" }
    ],
    description: "Where Scandinavian ergonomics harmonizes with haute luxury. Engineered for 12+ hours of posture-perfect comfort, featuring active lumbar tensioning and weight-activated synchronous tilt.",
    features: [
      "Synchronous 4-position lockable tilt with tension adjuster",
      "Padded 3D adjustable armrests wrapped in hand-stitched leather",
      "Soft polyurethane double-wheel casters suitable for parquet and stone floors",
      "360-degree silent frictionless swivel"
    ],
    careInstructions: "Condition leather twice yearly. Wipe polished aluminum with soft dry cloth.",
    warranty: "10-Year Mechanical & Cylinder Warranty",
    style: "Ergonomic Luxury",
    has3dModel: true
  },
  {
    id: "prod-17",
    name: "Alexandria Floor-to-Ceiling Modular Bookcase",
    tagline: "Solid oak uprights with brass hardware and integrated LED shelf tracks",
    category: "office",
    categoryName: "Office",
    collection: "Kyoto Zen",
    price: 185000,
    originalPrice: 215000,
    discount: 14,
    rating: 4.95,
    reviewCount: 16,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-17.jpg"],
    materials: "Solid European Oak, Satin Champagne Anodized Aluminum, Low-Voltage Embedded LED Strips",
    dimensions: {
      width: "240 cm",
      depth: "40 cm",
      height: "230 cm",
      seatHeight: "N/A",
      weight: "135 kg"
    },
    colors: [
      { name: "Smoked Oak", hex: "#422D1E", bgClass: "bg-[#422D1E]" },
      { name: "Bleached Natural Oak", hex: "#D6C5B1", bgClass: "bg-[#D6C5B1]" }
    ],
    description: "An awe-inspiring architectural library system. Designed to display rare editions, art objects, and sculptures with museum-grade diffused lighting running invisibly beneath every shelf.",
    features: [
      "Completely modular shelf heights adaptable to tall art volumes and sculptures",
      "Integrated 2700K Warm LED profile lighting with remote dimmer",
      "Solid brass wall anchoring hardware included",
      "Lower lockable credenza cabinets for sensitive documents"
    ],
    careInstructions: "Dust with dry soft cloth. Switch off lighting before cleaning.",
    warranty: "10-Year Structural System Warranty",
    style: "Architectural Library",
    has3dModel: false
  },
  {
    id: "prod-18",
    name: "Copenhagen Minimalist Meeting Credenza",
    tagline: "Matte ceramic top with tambour oak doors for executive boardrooms",
    category: "office",
    categoryName: "Office",
    collection: "Nordic Sanctuary",
    price: 95000,
    originalPrice: 110000,
    discount: 14,
    rating: 4.88,
    reviewCount: 14,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    images: ["/images/products/prod-18.jpg"],
    materials: "Scratch-Resistant Italian Porcelain Slab, Natural Oak, Brushed Steel Feet",
    dimensions: {
      width: "180 cm",
      depth: "45 cm",
      height: "75 cm",
      seatHeight: "N/A",
      weight: "80 kg"
    },
    colors: [
      { name: "Pietra Grey Porcelain", hex: "#525252", bgClass: "bg-[#525252]" },
      { name: "Statutario White Porcelain", hex: "#ECECEC", bgClass: "bg-[#ECECEC]" }
    ],
    description: "Seamless office storage capable of holding beverage carafes, laptops, and files. Its heat-proof and scratch-proof porcelain ceramic surface resists coffee mugs and daily executive wear.",
    features: [
      "Stain-proof, heat-proof, UV-resistant porcelain ceramic top",
      "Dual internal file organizers formatted for legal and A4 folders",
      "Soft-glide tambour sliding doors save floor clearance",
      "Integrated discreet ventilation"
    ],
    careInstructions: "Wipe porcelain with any standard surface cleaner. Maintain wood with dry cloth.",
    warranty: "10-Year Commercial Grade Warranty",
    style: "Modern Minimalist",
    has3dModel: false
  },

  // --- OUTDOOR ---
  {
    id: "prod-19",
    name: "Amalfi Teak & Sunbrella Luxury Outdoor Daybed",
    tagline: "Grade-A sustainable Burmese teak with weatherproof Sunbrella cushions",
    category: "outdoor",
    categoryName: "Outdoor",
    collection: "Tuscan Villa",
    price: 195000,
    originalPrice: 230000,
    discount: 15,
    rating: 4.96,
    reviewCount: 23,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-19.jpg"],
    materials: "Certified Plantation Grade-A Teak, Sunbrella Marine-Grade Performance Acrylic, Quick-Dry Foam",
    dimensions: {
      width: "200 cm",
      depth: "180 cm",
      height: "75 cm",
      seatHeight: "40 cm",
      weight: "72 kg"
    },
    colors: [
      { name: "Natural Golden Teak / Sand", hex: "#D4B07B", bgClass: "bg-[#D4B07B]" },
      { name: "Weathered Teak / Charcoal", hex: "#7D7468", bgClass: "bg-[#7D7468]" }
    ],
    description: "Crafted for sun-drenched terraces, oceanfront balconies, and poolside estates. High natural silica oil content makes the solid Grade-A teak naturally impervious to rain, saltwater mist, and rot.",
    features: [
      "Water flows straight through reticulated quick-dry outdoor foam core",
      "Sunbrella marine fabric guaranteed against UV fading for 5 years",
      "Mortise-and-tenon teak woodworking with marine-grade 316 stainless bolts",
      "Includes tailored weatherproof storage cover"
    ],
    careInstructions: "Allow teak to naturally weather to silver patina or apply teak shield twice annually to maintain golden luster.",
    warranty: "10-Year Outdoor Timber Warranty",
    style: "Coastal Luxury",
    has3dModel: false
  },
  {
    id: "prod-20",
    name: "Santorini Woven Rope & Teak Lounge Chairs (Pair)",
    tagline: "Hand-strung marine rope with organic curved teak arms",
    category: "outdoor",
    categoryName: "Outdoor",
    collection: "Tuscan Villa",
    price: 68000,
    originalPrice: 78000,
    discount: 13,
    rating: 4.89,
    reviewCount: 29,
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: true,
    images: ["/images/products/prod-20.jpg"],
    materials: "Grade-A Natural Teak, High-Tenacity Polyolefin Rope, Weatherproof Olefin Cushions",
    dimensions: {
      width: "74 cm",
      depth: "82 cm",
      height: "76 cm",
      seatHeight: "39 cm",
      weight: "14 kg"
    },
    colors: [
      { name: "Teak & Sand Rope", hex: "#E8DED1", bgClass: "bg-[#E8DED1]" },
      { name: "Teak & Slate Grey Rope", hex: "#4A4A4A", bgClass: "bg-[#4A4A4A]" }
    ],
    description: "Inspired by the Aegean breeze. Hand-woven nautical rope delivers flexible, breathable body support that gently yields to the sitter without retaining heat.",
    features: [
      "Set of 2 outdoor lounge armchairs",
      "UV-stabilized all-weather polyolefin rope resistant to chlorine & salt spray",
      "Water-repellent removable zippered cushion cases",
      "All joints reinforced with concealed stainless hardware"
    ],
    careInstructions: "Hose down with fresh water periodically. Store cushions during heavy monsoon downpours.",
    warranty: "5-Year Outdoor Element Guarantee",
    style: "Aegean Modern",
    has3dModel: false
  },
  {
    id: "prod-21",
    name: "Solstice Outdoor Lava Stone Fire Pit Table",
    tagline: "Glass-fiber reinforced concrete with volcanic basalt lava rocks",
    category: "outdoor",
    categoryName: "Outdoor",
    collection: "Kyoto Zen",
    price: 110000,
    originalPrice: 128000,
    discount: 14,
    rating: 4.93,
    reviewCount: 15,
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-21.jpg"],
    materials: "GFRC (Glass-Fiber Reinforced Concrete), 304 Stainless Steel Burner, Natural Lava Rocks",
    dimensions: {
      width: "140 cm",
      depth: "80 cm",
      height: "40 cm",
      seatHeight: "N/A",
      weight: "68 kg"
    },
    colors: [
      { name: "Charcoal Basalt", hex: "#292929", bgClass: "bg-[#292929]" },
      { name: "Limestone Bone", hex: "#DDD7CD", bgClass: "bg-[#DDD7CD]" }
    ],
    description: "Extend terrace evenings under the stars. Emits up to 50,000 BTUs of smokeless warmth, enclosed by natural black volcanic rock. Functions as a coffee table when the matching concrete cover lid is placed on top.",
    features: [
      "Electronic push-button instant piezo ignition with flame height knob",
      "Compatible with standard LPG gas canister or direct pipeline connection",
      "Includes stainless burner lid transforming it into a full coffee table",
      "Weatherproof ripstop canvas cover included"
    ],
    careInstructions: "Cover table when not in use. Clean concrete with mild soapy water.",
    warranty: "3-Year Burner & Concrete Warranty",
    style: "Outdoor Architectural",
    has3dModel: false
  },
  {
    id: "prod-22",
    name: "Capri Round Outdoor Dining Table & 6 Chairs",
    tagline: "Solid teak slatted circular table with 6 rope dining chairs",
    category: "outdoor",
    categoryName: "Outdoor",
    collection: "Tuscan Villa",
    price: 260000,
    originalPrice: 300000,
    discount: 13,
    rating: 4.96,
    reviewCount: 17,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    images: ["/images/products/prod-22.png"],
    materials: "Grade-A Certified Plantation Teak, Weatherproof Polyolefin Cord, High-Density Outdoor Foam",
    dimensions: {
      width: "160 cm diameter",
      depth: "160 cm diameter",
      height: "76 cm",
      seatHeight: "N/A",
      weight: "120 kg"
    },
    colors: [
      { name: "Natural Golden Teak", hex: "#D4B07B", bgClass: "bg-[#D4B07B]" }
    ],
    description: "Complete outdoor dining suite designed for long alfresco lunches under olive trees or pergolas. Slatted circular design encourages convivial conversations.",
    features: [
      "Includes 160cm round teak table + 6 matching rope-woven armchairs",
      "Integrated center brass umbrella grommet with flush cap",
      "Slats allow rainwater to drain instantly without pooling",
      "Comfortable wide-seat chairs stackable for seasonal storage"
    ],
    careInstructions: "Wash with mild soap and garden hose. Re-oil teak annually if original honey hue is preferred.",
    warranty: "10-Year Teak Structure Guarantee",
    style: "Mediterranean Alfresco",
    has3dModel: false
  },

  // --- LUXURY COLLECTIONS & CAPSULE PIECES ---
  {
    id: "prod-23",
    name: "Versailles Royal Velvet Chaise Longue",
    tagline: "Hand-tufted silk-blend velvet with 24k gold leaf hand-applied accents",
    category: "living-room",
    categoryName: "Living Room",
    collection: "Versailles Opulence",
    price: 145000,
    originalPrice: 170000,
    discount: 15,
    rating: 4.98,
    reviewCount: 24,
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-23.jpg"],
    materials: "Carved Solid European Beech, 24K Gold Leaf Accents, French Silk-Velvet, High-Resilience Down Blend",
    dimensions: {
      width: "185 cm",
      depth: "85 cm",
      height: "88 cm",
      seatHeight: "44 cm",
      weight: "52 kg"
    },
    colors: [
      { name: "Champagne Gold Velvet", hex: "#C6A77B", bgClass: "bg-[#C6A77B]" },
      { name: "Emerald Royale", hex: "#1B4D3E", bgClass: "bg-[#1B4D3E]" },
      { name: "Midnight Charcoal", hex: "#242424", bgClass: "bg-[#242424]" }
    ],
    description: "An homage to French aristocratic interiors. Hand-carved beechwood cabriole legs tipped in genuine 24-karat gold leaf foil, cradling a lavishly deep capitonné tufted seat.",
    features: [
      "Traditional hand-tufted diamond capitonné craftsmanship",
      "Solid beechwood framing cured over 18 months",
      "Deep supportive neck bolster included",
      "Gold leaf accents sealed with protective museum lacquer"
    ],
    careInstructions: "Gently brush velvet in the direction of the pile. Avoid moisture on gold leaf.",
    warranty: "10-Year Heritage Warranty",
    style: "Baroque Elegance",
    has3dModel: true
  },
  {
    id: "prod-24",
    name: "Kyoto Floating Walnut Platform Bed",
    tagline: "Tatami-inspired low platform with integrated floating nightstands",
    category: "bedroom",
    categoryName: "Bedroom",
    collection: "Kyoto Zen",
    price: 175000,
    originalPrice: 200000,
    discount: 13,
    rating: 4.95,
    reviewCount: 28,
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    images: ["/images/products/prod-24.jpg"],
    materials: "FSC American Walnut, Rice-Straw Tatami Mat Option, Soft Upholstered Oatmeal Headboard",
    dimensions: {
      width: "220 cm",
      depth: "230 cm",
      height: "75 cm",
      seatHeight: "26 cm",
      weight: "125 kg"
    },
    colors: [
      { name: "Natural American Walnut", hex: "#654832", bgClass: "bg-[#654832]" },
      { name: "Smoked Black Ash", hex: "#1C1C1C", bgClass: "bg-[#1C1C1C]" }
    ],
    description: "Breathe serene tranquility into your bedroom. Grounded in Japanese philosophy of Ma (negative space), this low-profile platform bed extends outwards to double as bedside ledges.",
    features: [
      "Continuous grain-matched walnut headboard and perimeter deck",
      "Dual integrated soft-touch LED reading lamps hidden in headboard",
      "Slotted sub-base designed for maximum mattress air circulation",
      "Precision Japanese joinery without visible metal screws"
    ],
    careInstructions: "Wipe with natural wood beeswax. Avoid abrasive towels.",
    warranty: "15-Year Solid Wood Joinery Warranty",
    style: "Japandi",
    has3dModel: false
  },
  {
    id: "prod-25",
    name: "Aura Minimalist Fluted Travertine Console Table",
    tagline: "Architectural console carved from solid Italian Roman travertine",
    category: "entryway",
    categoryName: "Entryway",
    collection: "Tuscan Villa",
    price: 76000,
    originalPrice: 88000,
    discount: 14,
    rating: 4.91,
    reviewCount: 21,
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-25.png"],
    materials: "Honed Roman Travertine, Satin Brass Bracing",
    dimensions: {
      width: "140 cm",
      depth: "38 cm",
      height: "82 cm",
      seatHeight: "N/A",
      weight: "72 kg"
    },
    colors: [
      { name: "Warm Cream Travertine", hex: "#E8DED1", bgClass: "bg-[#E8DED1]" }
    ],
    description: "The quintessential hallway or foyer statement. Slender proportions slip gracefully behind a sofa or along an entrance wall, hosting bronze sculptures and floral urns with statuesque quietude.",
    features: [
      "Hand-chiseled fluted cylindrical pillars",
      "Chamfered marble top edge treatment",
      "Stain-resistant invisible matte stone sealer",
      "Pre-drilled wall safety anchor system"
    ],
    careInstructions: "Dust stone surface with dry duster. Clean spots with gentle pH neutral soap.",
    warranty: "5-Year Natural Stone Guarantee",
    style: "Architectural Minimalist",
    has3dModel: false
  },
  {
    id: "prod-26",
    name: "Nordic Cloud Swivel Accent Chair",
    tagline: "360-degree silent swivel in textured Scandinavian teddy bouclé",
    category: "living-room",
    categoryName: "Living Room",
    collection: "Nordic Sanctuary",
    price: 52000,
    originalPrice: 60000,
    discount: 13,
    rating: 4.92,
    reviewCount: 46,
    inStock: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-26.jpg"],
    materials: "Tactile Scandinavian Teddy Bouclé, Cold-Cured Molded Foam, Ball-Bearing Swivel Base",
    dimensions: {
      width: "82 cm",
      depth: "84 cm",
      height: "76 cm",
      seatHeight: "41 cm",
      weight: "28 kg"
    },
    colors: [
      { name: "Ivory Teddy", hex: "#FAF8F5", bgClass: "bg-[#FAF8F5]" },
      { name: "Warm Caramel", hex: "#B8860B", bgClass: "bg-[#B8860B]" },
      { name: "Graphite", hex: "#2E2E2E", bgClass: "bg-[#2E2E2E]" }
    ],
    description: "A cocoon of pure relaxation. The rounded barrel structure envelops the body, while a concealed ball-bearing base rotates 360 degrees effortlessly without a sound.",
    features: [
      "Silent German steel ball-bearing swivel mechanism",
      "Molded polyurethane cold-cure foam retains its form for decades",
      "Heavyweight textured loop bouclé resistant to wear and pilling",
      "Low center of gravity prevents tipping"
    ],
    careInstructions: "Vacuum lightly with upholstery attachment. Spot clean with warm water dab.",
    warranty: "10-Year Swivel Base & Frame Guarantee",
    style: "Nordic Modern",
    has3dModel: true
  },
  {
    id: "prod-27",
    name: "Tuscan Artisan 10-Seater Live-Edge Walnut Table",
    tagline: "Single continuous slab of American black walnut with brass butterfly joints",
    category: "dining-room",
    categoryName: "Dining Room",
    collection: "Tuscan Villa",
    price: 295000,
    originalPrice: 340000,
    discount: 13,
    rating: 4.99,
    reviewCount: 19,
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-27.jpg"],
    materials: "Single-Slab American Black Walnut (65mm thick), Hand-Inlaid Solid Brass Butterfly Keys, Matte Charcoal Steel Base",
    dimensions: {
      width: "290 cm",
      depth: "105 cm",
      height: "76 cm",
      seatHeight: "N/A",
      weight: "160 kg"
    },
    colors: [
      { name: "Natural Rich Walnut", hex: "#654832", bgClass: "bg-[#654832]" }
    ],
    description: "Every table is a one-of-a-kind natural masterpiece harvested from a sustainably felled 120-year-old walnut tree. Natural checking and character cracks are reinforced with solid brass butterfly joints inlaid entirely by hand.",
    features: [
      "65mm thick solid single timber slab with natural undulating bark edge",
      "Solid brass bow-tie inlays hand-planed flush with the grain",
      "Zero-VOC organic hardwax-oil satin protective finish",
      "Accommodates 10 to 12 formal dining guests comfortably"
    ],
    careInstructions: "Feed timber with Aura Nourishing Wood Butter every 6 months. Clean with warm damp cotton cloth.",
    warranty: "Lifetime Heritage Heirloom Guarantee",
    style: "Artisan Live Edge",
    has3dModel: false
  },
  {
    id: "prod-28",
    name: "Palazzo Fluted Brass & Smoked Glass Chandelier",
    tagline: "12-arm architectural chandelier in brushed champagne gold",
    category: "lighting-decor",
    categoryName: "Lighting & Decor",
    collection: "Versailles Opulence",
    price: 84000,
    originalPrice: 98000,
    discount: 14,
    rating: 4.94,
    reviewCount: 32,
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-28.jpg"],
    materials: "Heavy Solid Brass, Hand-Blown Fluted Borosilicate Glass Cylinders",
    dimensions: {
      width: "115 cm diameter",
      depth: "115 cm diameter",
      height: "65 cm (Adjustable drop to 200 cm)",
      seatHeight: "N/A",
      weight: "22 kg"
    },
    colors: [
      { name: "Champagne Gold", hex: "#C6A77B", bgClass: "bg-[#C6A77B]" },
      { name: "Antique Bronze", hex: "#4A3B2C", bgClass: "bg-[#4A3B2C]" }
    ],
    description: "Commanding attention from double-height living ceilings or above grand dining tables. The fluted borosilicate glass sleeves diffuse light into warm, crystalline rays without harsh glare.",
    features: [
      "Includes 12 dimmable filament E27 warm LED globes (2200K)",
      "Telescopic brass down-rods adaptable to ceiling heights from 2.8m to 6m",
      "Sloped-ceiling canopy adapter included",
      "Hand-blown glass crafted by Murano-trained artisans"
    ],
    careInstructions: "Wipe glass tubes with microfiber. Turn off mains breaker before cleaning.",
    warranty: "5-Year Electrical & Finish Warranty",
    style: "Mid-Century Glamour",
    has3dModel: false
  },
  {
    id: "prod-29",
    name: "Aethelgard High-Back Ergonomic Lounge & Ottoman",
    tagline: "Matching ottoman set with molded walnut shell and cashmere wool",
    category: "living-room",
    categoryName: "Living Room",
    collection: "Nordic Sanctuary",
    price: 98000,
    originalPrice: 115000,
    discount: 15,
    rating: 4.96,
    reviewCount: 41,
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: false,
    images: ["/images/products/prod-29.jpg"],
    materials: "Molded Curved American Walnut Ply, Brushed Aluminum Star Base, Cashmere-Wool Blend Upholstery",
    dimensions: {
      width: "86 cm",
      depth: "90 cm",
      height: "105 cm",
      seatHeight: "42 cm",
      weight: "38 kg (Chair + Ottoman)"
    },
    colors: [
      { name: "Oatmeal Cashmere", hex: "#E8DED1", bgClass: "bg-[#E8DED1]" },
      { name: "Charcoal Wool", hex: "#2B2B2B", bgClass: "bg-[#2B2B2B]" },
      { name: "Amber Tan Leather", hex: "#9E5B32", bgClass: "bg-[#9E5B32]" }
    ],
    description: "The epitome of mid-century Scandinavian quietude. Engineered with a curved high back that provides anatomical head and neck rest, accompanied by a matching curved ottoman.",
    features: [
      "Set includes both the high-back lounge armchair and matching ottoman",
      "Precision 360-degree silent return-memory swivel",
      "Padded head cushion with magnetic counter-weight adjustment",
      "7-ply molded architectural walnut shell"
    ],
    careInstructions: "Brush wool gently with fabric brush. Wipe walnut shell with microfiber cloth.",
    warranty: "10-Year Structure Guarantee",
    style: "Mid-Century Modern",
    has3dModel: true
  },
  {
    id: "prod-30",
    name: "Kyoto Solid Ash Minimalist Room Divider Screen",
    tagline: "3-panel folding screen with natural washi paper & timber lattice",
    category: "lighting-decor",
    categoryName: "Lighting & Decor",
    collection: "Kyoto Zen",
    price: 46000,
    originalPrice: 54000,
    discount: 15,
    rating: 4.88,
    reviewCount: 15,
    inStock: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    images: ["/images/products/prod-30.jpg"],
    materials: "Solid Japanese White Ash Wood, Tear-Resistant Kozo Washi Paper, 360-Degree Double Brass Hinges",
    dimensions: {
      width: "180 cm (Fully expanded)",
      depth: "3 cm",
      height: "185 cm",
      seatHeight: "N/A",
      weight: "18 kg"
    },
    colors: [
      { name: "Natural Pale Ash", hex: "#E5DDD0", bgClass: "bg-[#E5DDD0]" },
      { name: "Charcoal Stained Ash", hex: "#222222", bgClass: "bg-[#222222]" }
    ],
    description: "Delineate living spaces, prayer areas, or home offices with poetic subtlety. Washi paper panels diffuse harsh natural light while offering complete privacy.",
    features: [
      "Double-action two-way brass hinges allow folding in both directions",
      "Laminated tear-resistant botanical Washi paper",
      "Lightweight yet structurally rigid mortise-and-tenon grid",
      "Folds completely flat for storage"
    ],
    careInstructions: "Dust with soft feather duster. Keep away from humid bathrooms or direct water spray.",
    warranty: "5-Year Joinery Warranty",
    style: "Japandi",
    has3dModel: false
  },
  {
    id: "prod-31",
    name: "Siena Marble & Walnut Bedside Tables (Pair)",
    tagline: "Matching pair of floating-look nightstands with Nero Marquina marble tops",
    category: "bedroom",
    categoryName: "Bedroom",
    collection: "Milano Heritage",
    price: 58000,
    originalPrice: 68000,
    discount: 15,
    rating: 4.91,
    reviewCount: 33,
    inStock: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    images: ["/images/products/prod-31.jpg"],
    materials: "Natural Nero Marquina Spanish Marble, Solid American Walnut, Velvet-Lined Drawers",
    dimensions: {
      width: "55 cm",
      depth: "45 cm",
      height: "50 cm",
      seatHeight: "N/A",
      weight: "26 kg each"
    },
    colors: [
      { name: "Walnut & Nero Marble", hex: "#654832", bgClass: "bg-[#654832]" },
      { name: "Oak & Carrara Marble", hex: "#D6C5B1", bgClass: "bg-[#D6C5B1]" }
    ],
    description: "Includes a complete pair of 2 bedside tables. The cool Spanish marble top holds water decanters, books, and lamps without ring stains, sitting atop a soft-closing velvet-lined drawer.",
    features: [
      "Sold as a set of 2 bedside tables",
      "Natural veined marble top slab sealed with satin sealer",
      "Hidden push-to-open Blum drawer runners",
      "Soft velvet lining inside drawers protects watches and jewelry"
    ],
    careInstructions: "Wipe marble with soft damp cloth. Dust wood with microfiber.",
    warranty: "10-Year Hardware & Timber Warranty",
    style: "Contemporary Luxury",
    has3dModel: false
  },
  {
    id: "prod-32",
    name: "Monte Carlo Curved Outdoor Sectional",
    tagline: "Expansive curved modular sofa with waterproof acrylic bouclé weave",
    category: "outdoor",
    categoryName: "Outdoor",
    collection: "Milano Heritage",
    price: 275000,
    originalPrice: 320000,
    discount: 14,
    rating: 4.97,
    reviewCount: 16,
    inStock: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    images: ["/images/products/prod-32.jpg"],
    materials: "Powder-Coated Marine Grade Aluminum, Italian Agora Waterproof Outdoor Bouclé, Quick-Drain Foam",
    dimensions: {
      width: "360 cm",
      depth: "140 cm",
      height: "78 cm",
      seatHeight: "42 cm",
      weight: "88 kg"
    },
    colors: [
      { name: "Chalk White Outdoor Bouclé", hex: "#F7F5F0", bgClass: "bg-[#F7F5F0]" },
      { name: "Sand Beige", hex: "#E8DED1", bgClass: "bg-[#E8DED1]" }
    ],
    description: "The pinnacle of terrace luxury. Brings the sculptural tactile softness of indoor bouclé furniture to outdoor poolside lounges and ocean-facing penthouses.",
    features: [
      "100% solution-dyed Agora outdoor bouclé impervious to UV and pool chlorine",
      "Ultra-lightweight rust-proof aircraft-grade aluminum frame",
      "Built-in teak side ledge for beverages and books",
      "Complete all-weather protective covers included"
    ],
    careInstructions: "Hose clean with fresh water. Sun dry.",
    warranty: "10-Year Frame & 5-Year Fabric Warranty",
    style: "Resort Glamour",
    has3dModel: false
  },
{
    "id": "prod-33",
    "name": "Sera Upholstered Entryway Bench",
    "tagline": "A soft landing for daily arrivals",
    "category": "entryway",
    "categoryName": "Entryway",
    "collection": "Nordic Sanctuary",
    "price": 32000,
    "originalPrice": 38000,
    "discount": 16,
    "rating": 4.86,
    "reviewCount": 35,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "images": [
        "/images/products/prod-33.jpg"
    ],
    "materials": "Upholstered seat, solid wood frame",
    "dimensions": {
        "width": "120 cm",
        "depth": "42 cm",
        "height": "46 cm",
        "seatHeight": "46 cm",
        "weight": "18 kg"
    },
    "colors": [
        {
            "name": "Ivory Cream",
            "hex": "#FAF8F5",
            "bgClass": "bg-[#FAF8F5]"
        },
        {
            "name": "Camel",
            "hex": "#C29B72",
            "bgClass": "bg-[#C29B72]"
        }
    ],
    "description": "A softly upholstered bench for the entrance hall, with a comfortable seat for putting on shoes and a compact silhouette.",
    "features": [
        "Cushioned seat",
        "Compact hallway proportions",
        "Solid wood support"
    ],
    "careInstructions": "Spot treat spills immediately with absorbent cloth. Professional upholstery steam clean.",
    "warranty": "5-Year Mechanism & Structural Warranty",
    "style": "Modern Classic",
    "has3dModel": false
},
{
    "id": "prod-34",
    "name": "Linden Entryway Storage Cabinet",
    "tagline": "Warm timber and considered everyday storage",
    "category": "entryway",
    "categoryName": "Entryway",
    "collection": "Milano Heritage",
    "price": 54000,
    "originalPrice": 62000,
    "discount": 13,
    "rating": 4.93,
    "reviewCount": 27,
    "inStock": true,
    "featured": false,
    "bestseller": false,
    "newArrival": true,
    "images": [
        "/images/products/prod-34.jpg"
    ],
    "materials": "Wood and engineered wood, metal hardware",
    "dimensions": {
        "width": "140 cm",
        "depth": "40 cm",
        "height": "80 cm",
        "seatHeight": "N/A",
        "weight": "42 kg"
    },
    "colors": [
        {
            "name": "Warm Walnut",
            "hex": "#654832",
            "bgClass": "bg-[#654832]"
        },
        {
            "name": "Charcoal Ash",
            "hex": "#2E2E2E",
            "bgClass": "bg-[#2E2E2E]"
        }
    ],
    "description": "Keep your entrance welcoming with drawers for small essentials and enclosed storage for everyday belongings.",
    "features": [
        "Three drawers for small essentials",
        "Enclosed side storage",
        "Raised legs for easy cleaning"
    ],
    "careInstructions": "Dust regularly along wood grains. Maintain natural cedar scent by gentle sanding every two years.",
    "warranty": "15-Year Craftsmanship Guarantee",
    "style": "Modern Artisan",
    "has3dModel": false
}
];

export const categories = [
  {
    id: "living-room",
    slug: "living-room",
    name: "Living Room",
    tagline: "Sculptural seating, conversation pieces & architectural coffee tables",
    heroImage: "/images/showrooms/living-room.jpg",
    itemCount: "8 Designs",
    description: "Curated sofas, accent loungers, marble coffee tables, and artistic credenzas hand-tailored for inspiring living."
  },
  {
    id: "bedroom",
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Sanctuaries of serene timber, floating beds & aromatic cedar storage",
    heroImage: "/images/showrooms/bedroom.jpg",
    itemCount: "6 Designs",
    description: "Floating king canopy beds, velvet vanities, and cedar-lined wardrobes designed for restorative peace."
  },
  {
    "id": "entryway",
    "slug": "entryway",
    "name": "Entryway",
    "tagline": "Welcoming consoles, upholstered benches & considered storage",
    "heroImage": "/images/products/prod-25.png",
    "itemCount": "3 Designs",
    "description": "Create a welcoming entrance with slim console tables, comfortable benches, and beautifully organized storage."
},
  {
    id: "lighting-decor",
    slug: "lighting-decor",
    name: "Lighting & Decor",
    tagline: "Sculptural bronze luminaires, ambient chandeliers & acoustic screens",
    heroImage: "/images/products/prod-28.jpg",
    itemCount: "3 Designs",
    description: "Architectural luminaires, hand-blown chandeliers, and textural room dividing accents crafted to sculpt ambient warmth."
  },
  {
    id: "dining-room",
    slug: "dining-room",
    name: "Dining Room",
    tagline: "Monumental travertine tables, live-edge walnut & illuminated bar cabinets",
    heroImage: "/images/showrooms/dining-room.jpg",
    itemCount: "5 Designs",
    description: "Where banquet hospitality meets artisan stone and bentwood craftsmanship."
  },
  {
    id: "office",
    slug: "office",
    name: "Office",
    tagline: "Executive cantilevered walnut desks, ergonomic aniline leather & library walls",
    heroImage: "/images/showrooms/office.jpg",
    itemCount: "4 Designs",
    description: "Executive study suites balancing ergonomic posture engineering with timeless European leather and timber."
  },
  {
    id: "outdoor",
    slug: "outdoor",
    name: "Outdoor",
    tagline: "Grade-A sustainable Burmese teak, lava stone firepits & marine Sunbrella lounges",
    heroImage: "/images/products/prod-19.jpg",
    itemCount: "5 Designs",
    description: "Resort-grade alfresco living designed to endure sun, monsoons, and coastal breezes with graceful patina."
  }
];

export const collections = [
  {
    id: "milano-heritage",
    slug: "milano-heritage",
    title: "Milano Heritage",
    subtitle: "Italian Organic Modernism",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80",
    description: "Sweeping curves, tactile bouclé weaves, and Calacatta marble honoring the mid-century legacy of Milanese architecture.",
    designer: "Studio Valenti, Milan",
    productIds: ["prod-1", "prod-3", "prod-6", "prod-9", "prod-14", "prod-31"]
  },
  {
    id: "tuscan-villa",
    slug: "tuscan-villa",
    title: "Tuscan Villa",
    subtitle: "Artisan Leather & Roman Travertine",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=80",
    description: "Warm saddle leathers, solid walnut live-edge slabs, and quarried travertine sculpted for timeless Mediterranean villas.",
    designer: "Matteo Rossi",
    productIds: ["prod-2", "prod-11", "prod-12", "prod-19", "prod-25", "prod-27"]
  },
  {
    id: "nordic-sanctuary",
    slug: "nordic-sanctuary",
    title: "Nordic Sanctuary",
    subtitle: "Minimalist Light & Tactile Comfort",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    description: "Pale quarter-sawn white oak, floating platform architecture, and pure ergonomic comfort inspired by Copenhagen.",
    designer: "Freja Lindqvist, Stockholm",
    productIds: ["prod-7", "prod-10", "prod-15", "prod-16", "prod-18", "prod-26", "prod-29"]
  },
  {
    id: "kyoto-zen",
    slug: "kyoto-zen",
    title: "Kyoto Zen",
    subtitle: "Japandi Precision & Acoustic Harmony",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    description: "Slatted wooden facades, low-profile tatami beds, and volcanic lava stones reflecting serenity and mindful living.",
    designer: "Kenzo Mori, Kyoto",
    productIds: ["prod-4", "prod-17", "prod-21", "prod-24", "prod-30"]
  },
  {
    id: "versailles-opulence",
    slug: "versailles-opulence",
    title: "Versailles Opulence",
    subtitle: "Royal Velvet & 24K Leaf Brilliance",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80",
    description: "Deep capitonné hand-tufting, fluted borosilicate chandeliers, and hand-applied gold leaf details for grand palaces.",
    designer: "Atelier Dupré, Paris",
    productIds: ["prod-5", "prod-8", "prod-13", "prod-23", "prod-28"]
  }
];

export const showrooms = [
  {
    id: "mumbai-flagship",
    city: "Mumbai",
    title: "Worli Sea Face Flagship Gallery",
    address: "Tower 2, The Pavilions, Dr. Annie Besant Road, Worli, Mumbai - 400018",
    phone: "+91 98200 45890",
    email: "mumbai@auraliving.com",
    hours: "Mon – Sun: 10:30 AM – 8:30 PM",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    features: ["Private Styling Consultations", "Full-Scale Material Library", "3D Holographic Room Visualizer", "Valet Parking"]
  },
  {
    id: "delhi-dlf",
    city: "New Delhi",
    title: "DLF Emporio Luxe Atelier",
    address: "Level 3, DLF Emporio, Vasant Kunj, New Delhi - 110070",
    phone: "+91 98110 32410",
    email: "delhi@auraliving.com",
    hours: "Mon – Sun: 11:00 AM – 9:00 PM",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    features: ["Architectural Stone Vault", "Custom Furniture Joinery Studio", "Champagne Bar for VIP Clients"]
  },
  {
    id: "bangalore-indiranagar",
    city: "Bengaluru",
    title: "Indiranagar Heritage Manor",
    address: "100 Feet Road, 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru - 560038",
    phone: "+91 99000 78234",
    email: "bangalore@auraliving.com",
    hours: "Mon – Sat: 10:30 AM – 8:00 PM (Sun 11 AM - 7 PM)",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    features: ["Courtyard Teak Outdoor Display", "Ergonomic Office Experience Lab", "Private Interior Designer Hub"]
  },
  {
    id: "dubai-d3",
    city: "Dubai",
    title: "Dubai Design District (d3) Studio",
    address: "Building 4, Ground Floor, Dubai Design District, Dubai, UAE",
    phone: "+971 4 582 9900",
    email: "dubai@auraliving.com",
    hours: "Sun – Thu: 10:00 AM – 9:00 PM",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    features: ["International Export Concierge", "Villa Scale Turnkey Mockups", "Yacht Interior Material Collection"]
  }
];

export const virtualShowrooms = [
  {
    "id": "penthouse-living-room",
    "title": "Contemporary Living Room",
    "category": "Living Room",
    "image": "/images/showrooms/living-room.jpg",
    "description": "A charcoal sectional, round coffee tables, and floor lighting create a relaxed living space. Explore related catalog pieces using the markers.",
    "hotspots": [
      {
        "id": "hs-1",
        "productId": "prod-6",
        "x": 69,
        "y": 56,
        "label": "Sectional sofa"
      },
      {
        "id": "hs-2",
        "productId": "prod-3",
        "x": 47,
        "y": 72,
        "label": "Coffee table"
      },
      {
        "id": "hs-4",
        "productId": "prod-5",
        "x": 7,
        "y": 43,
        "label": "Floor lamp"
      }
    ]
  },
  {
    "id": "master-villa-suite",
    "title": "Upholstered Bedroom Retreat",
    "category": "Bedroom",
    "image": "/images/showrooms/bedroom.jpg",
    "description": "A softly upholstered bed and end-of-bed bench form a comfortable bedroom retreat. Discover bedroom pieces inspired by this setting.",
    "hotspots": [
      {
        "id": "hs-5",
        "productId": "prod-7",
        "x": 48,
        "y": 52,
        "label": "Upholstered bed"
      },
      {
        "id": "hs-6",
        "productId": "prod-10",
        "x": 73,
        "y": 78,
        "label": "Bedroom bench"
      }
    ]
  },
  {
    "id": "emerald-dining-hall",
    "title": "Emerald Dining Room",
    "category": "Dining Room",
    "image": "/images/showrooms/dining-room.jpg",
    "description": "An airy dining room with a pale tabletop, green upholstered chairs, and statement lighting. Shop related furniture for a coordinated dining space.",
    "hotspots": [
      {
        "id": "hs-8",
        "productId": "prod-11",
        "x": 49,
        "y": 60,
        "label": "Dining table"
      },
      {
        "id": "hs-9",
        "productId": "prod-14",
        "x": 49,
        "y": 75,
        "label": "Upholstered dining chair"
      },
      {
        "id": "hs-10",
        "productId": "prod-28",
        "x": 49,
        "y": 25,
        "label": "Chandelier"
      }
    ]
  },
  {
    "id": "executive-library",
    "title": "Light-Filled Home Office",
    "category": "Office",
    "image": "/images/showrooms/office.jpg",
    "description": "A bright workspace with a generous desktop and a cushioned desk chair. Explore desks and ergonomic seating for your own office.",
    "hotspots": [
      {
        "id": "hs-11",
        "productId": "prod-15",
        "x": 69,
        "y": 66,
        "label": "Desk"
      },
      {
        "id": "hs-12",
        "productId": "prod-16",
        "x": 18,
        "y": 69,
        "label": "Office chair"
      }
    ]
  }
];

export const roomInspirations = [
  {
    id: "insp-1",
    title: "The Minimalist Collector's Living Pavilion",
    room: "Living Room",
    style: "Modern Minimalist",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Travertine", "Bouclé", "Double-Height", "Natural Sunlight"],
    featuredProducts: ["prod-1", "prod-3", "prod-2"],
    author: "Arch. Elena Rossi",
    likes: 342
  },
  {
    id: "insp-2",
    title: "Serene Japandi Master Bedroom Retreat",
    room: "Bedroom",
    style: "Japandi",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
    tags: ["White Oak", "Tatami", "Low-Profile", "Acoustic Slats"],
    featuredProducts: ["prod-7", "prod-24", "prod-10"],
    author: "Studio Kanso",
    likes: 418
  },
  {
    id: "insp-3",
    title: "Sculptural Roman Travertine Dining Chamber",
    room: "Dining Room",
    style: "Contemporary Luxury",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    tags: ["Solid Stone", "Bentwood", "Bar Cabinet", "Warm Ambient"],
    featuredProducts: ["prod-11", "prod-12", "prod-13"],
    author: "Maison Bellini",
    likes: 295
  },
  {
    id: "insp-4",
    title: "High-Rise Executive Study in Walnut & Charcoal",
    room: "Office",
    style: "Mid-Century Modern",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    tags: ["Aniline Leather", "Walnut Desk", "Wireless Charging", "Curated Library"],
    featuredProducts: ["prod-15", "prod-16", "prod-17"],
    author: "Christian Vanger",
    likes: 512
  },
  {
    id: "insp-5",
    title: "Mediterranean Coastal Terrace & Teak Pergola",
    room: "Outdoor",
    style: "Coastal Luxury",
    image: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=1200&q=80",
    tags: ["Burmese Teak", "Lava Firepit", "Sunbrella", "Poolside Daybed"],
    featuredProducts: ["prod-19", "prod-20", "prod-21"],
    author: "Atelier Riviera",
    likes: 388
  },
  {
    id: "insp-6",
    title: "Artisan Living Room with Live-Edge & Bronze Lighting",
    room: "Living Room",
    style: "Artisan Luxury",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    tags: ["Velvet", "Bronze Sculpture", "Walnut", "Curved Silhouettes"],
    featuredProducts: ["prod-2", "prod-5", "prod-23", "prod-26"],
    author: "Sophia Laurent",
    likes: 460
  }
];

export const aiRoomPresets = {
  "living-room": {
    "Modern": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      title: "Warm Organic Modern Living Room",
      description: "Replaces empty drywall with fluted walnut paneling, an Italian curved bouclé sofa, Calacatta Viola coffee table, and bronze halo illumination.",
      recommendedProductIds: ["prod-1", "prod-3", "prod-2", "prod-5"],
      estimatedSavings: "₹38,000 Bundle Savings"
    },
    "Minimalist": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      title: "Japandi Sculptural Living Space",
      description: "Emphasizes negative space with low credenzas, floating travertine, and single accent loungers in tactile oatmeal textures.",
      recommendedProductIds: ["prod-4", "prod-26", "prod-3", "prod-30"],
      estimatedSavings: "₹32,000 Bundle Savings"
    },
    "Luxury": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      title: "Versailles Grand Living Room",
      description: "Bespoke silk-velvet chaise longue, gold leaf detailing, and dramatic bronze lighting with deep feather-down modular seating.",
      recommendedProductIds: ["prod-6", "prod-23", "prod-28", "prod-3"],
      estimatedSavings: "₹52,000 Bundle Savings"
    }
  },
  "bedroom": {
    "Modern": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
      title: "Cantilevered Floating Oak Suite",
      description: "Illuminated under-glow king canopy bed paired with Nero Marquina marble bedside tables and hidden cedar wardrobe storage.",
      recommendedProductIds: ["prod-7", "prod-31", "prod-10", "prod-9"],
      estimatedSavings: "₹45,000 Bundle Savings"
    },
    "Minimalist": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      title: "Kyoto Low Tatami Platform Sanctuary",
      description: "Low-profile organic walnut bed frame with natural linen headboard and discreet ambient reading lights.",
      recommendedProductIds: ["prod-24", "prod-10", "prod-31"],
      estimatedSavings: "₹30,000 Bundle Savings"
    },
    "Luxury": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      title: "Royal Fluted Bouclé & Velvet Suite",
      description: "Floating canopy bed paired with a lighted velvet vanity dressing mirror and cedar-lined wardrobe credenza.",
      recommendedProductIds: ["prod-7", "prod-8", "prod-9", "prod-10"],
      estimatedSavings: "₹50,000 Bundle Savings"
    }
  },
  "dining-room": {
    "Modern": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      title: "Monumental Travertine & Cane Dining Pavilion",
      description: "A statement 8-seater Roman travertine dining table complemented by hand-woven French cane chairs and a smoked glass bar cabinet.",
      recommendedProductIds: ["prod-11", "prod-12", "prod-13", "prod-28"],
      estimatedSavings: "₹48,000 Bundle Savings"
    },
    "Luxury": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      title: "Live-Edge Solid Walnut Grand Dining Hall",
      description: "A 2.9m single-slab live-edge American walnut table featuring solid brass butterflies, paired with Siena barrel chairs and Murano glass chandelier.",
      recommendedProductIds: ["prod-27", "prod-14", "prod-13", "prod-28"],
      estimatedSavings: "₹65,000 Bundle Savings"
    }
  },
  "office": {
    "Modern": {
      beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      title: "Executive Walnut & Aniline Leather Study",
      description: "Integrated wireless charging executive walnut desk paired with an ergonomic tilt Italian leather chair and illuminated modular bookcase.",
      recommendedProductIds: ["prod-15", "prod-16", "prod-17", "prod-18"],
      estimatedSavings: "₹42,000 Bundle Savings"
    }
  }
};

export const customerTestimonials = [
  {
    id: "test-1",
    name: "Vikramaditya & Sanjana Singhania",
    role: "Private Residence, Worli Sea Face, Mumbai",
    quote: "AURA Living elevated our penthouse into an international architectural sanctuary. The curved bouclé sofa and travertine dining table are museum-grade in quality. Guests consistently ask if the furniture was imported from Milan.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    verified: true,
    collectionBought: "Milano Heritage & Tuscan Villa"
  },
  {
    id: "test-2",
    name: "Architect Rajiv Mehrotra",
    role: "Principal, Mehrotra & Associates Architecture, New Delhi",
    quote: "As an architect, timber joinery and structural integrity are non-negotiable. AURA's mortise-and-tenon craftsmanship, American walnut seasoning, and custom concierge service rival the finest heritage furniture houses in Northern Italy.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    verified: true,
    collectionBought: "Custom Executive Office Suite"
  },
  {
    id: "test-3",
    name: "Pooja Hegde & Kabir Varma",
    role: "Villa Palm Grove, Jubilee Hills, Hyderabad",
    quote: "The AI Room Designer simulation was shockingly accurate! We booked a private showroom stylist visit and selected the entire living and master suite. White-glove delivery handled assembly seamlessly without a speck of dust.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    verified: true,
    collectionBought: "Nordic Sanctuary King Bed & Modular Sectional"
  }
];
