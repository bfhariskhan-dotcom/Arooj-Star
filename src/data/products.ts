import { Product } from '../types';

export const COMPANY_DETAILS = {
  brandName: 'Arooj Star Forever Paint',
  galleryName: 'Data Arooj Paint Gallery',
  parentIndustry: 'Asuzas Paint Chemical Industries',
  taglineEnglish: 'Superior Quality Paints for Beautiful & Protected Homes',
  ceo: 'Malik Kabeer Shahid',
  contactPerson: 'Shahid Malik Badshah',
  phone1: '0301-9736709',
  phone1Raw: '923019736709',
  phone2: '0346-4467194',
  phone2Raw: '923464467194',
  regions: 'Nationwide Delivery Across All Pakistan (Punjab, Sindh, KPK, Balochistan, Gilgit-Baltistan & AJK)',
  priceListDate: 'Effective April 15, 2026',
  address: 'Data Arooj Paint Gallery, Main Industrial Paint Market, Pakistan',
  videos: [
    {
      id: 'vid-1',
      title: 'Automated Factory Formulation & High-Speed Packaging',
      subtitle: 'Sub-micron pigment grinding, automatic drum filling, and sealed quality assurance',
      url: 'https://menascotrader.com/wp-content/uploads/2026/11/WhatsApp-Video-2026-11-09-at-10.53.16-AM.mp4',
      badge: 'Factory Formulation'
    },
    {
      id: 'vid-2',
      title: 'Live Film Elasticity & Scratch Resistance Testing',
      subtitle: 'Testing anti-stain washability, scrub resistance, and high-gloss reflection',
      url: 'https://menascotrader.com/wp-content/uploads/2026/11/WhatsApp-Video-2026-11-09-at-10.02.06-AM.mp4',
      badge: 'Durability Testing'
    }
  ]
};

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  province: string;
  comment: string;
  rating: number;
  featuredProduct: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Haji Muhammad Aslam',
    role: 'Wholesale Paint Distributor',
    city: 'Peshawar',
    province: 'KPK',
    comment: 'We have been distributing Arooj Star Weather Defender across KPK for commercial plazas and private houses. The coverage and alkali resistance against harsh weather are unmatched at this dealer rate.',
    rating: 5,
    featuredProduct: 'D. Ace Weather Defender (0100)'
  },
  {
    id: 't-2',
    name: 'Engr. Tariq Mehmood',
    role: 'Architect & Project Consultant',
    city: 'Lahore',
    province: 'Punjab',
    comment: 'D. Ace Durasilk gave our DHA Phase 6 residential projects the silken, non-glare interior look our clients wanted. Kids drew with crayons on the living room wall and it wiped right off with a wet sponge.',
    rating: 5,
    featuredProduct: 'D. Ace Durasilk Anti-Stain (8501)'
  },
  {
    id: 't-3',
    name: 'Mirza Abdul Qudoos',
    role: 'Master Polish Contractor & Joinery Head',
    city: 'Chiniot / Rawalpindi',
    province: 'Punjab',
    comment: 'D. Ace Timberlac Sanding Sealer and Gloss Lacquer are exceptional for teak and sheesham furniture. It dries crystal clear without blushing even during cold months, leaving a mirror finish.',
    rating: 5,
    featuredProduct: 'D. Ace Timberlac Gloss (3301)'
  },
  {
    id: 't-4',
    name: 'Sardar Jan Sher Khan',
    role: 'General Building Contractor',
    city: 'Quetta',
    province: 'Balochistan',
    comment: 'Getting reliable deliveries in Quetta and Chaman with consistent drum quality is rare. Data Arooj Paint Gallery delivers quickly with exact batch matching every time.',
    rating: 5,
    featuredProduct: 'D. Overall Weather Max (0700)'
  },
  {
    id: 't-5',
    name: 'Chaudhry Naveed Afzal',
    role: 'Hardware & Paint Merchant',
    city: 'Faisalabad',
    province: 'Punjab',
    comment: 'The Sheesha Putty is our highest turnaround item. Painters insist on D. Ace Super Acrylic Sheesha Putty because it spreads like butter and leaves zero pinholes on fresh plaster.',
    rating: 5,
    featuredProduct: 'D. Ace Super Acrylic Sheesha Putty (0095)'
  }
];

export const PACK_SIZE_LABELS: Record<string, string> = {
  smallTin: 'Small Tin',
  quarter: 'Quarter (0.91 L)',
  gallon: 'Gallon (3.64 L)',
  drummy: 'Drummy (14.56 L)',
  barrel: 'Industrial Barrel (200 L)'
};

export const POPULAR_SHADES = [
  { name: 'Royal Arooj Navy', hex: '#0B2240', mood: 'Executive & Regal', type: 'Interior Accent / Exterior Trim' },
  { name: 'Imperial Crimson Red', hex: '#8B1E22', mood: 'Vibrant Warmth', type: 'Statement Walls' },
  { name: 'Velvet Pearl Ivory', hex: '#F5F2EB', mood: 'Airy & Luminous', type: 'Living Rooms & Bedrooms' },
  { name: 'Ash White Modern', hex: '#E2E5E8', mood: 'Contemporary Minimalist', type: 'Ceilings & Open Plans' },
  { name: 'Cockleshell Neutral', hex: '#EFE6DD', mood: 'Warm Organic Comfort', type: 'Bedrooms & Corridors' },
  { name: 'Olive Sage Haze', hex: '#7A8B7B', mood: 'Calming Nature', type: 'Study & Lounge' },
  { name: 'Onyx Charcoal Deep', hex: '#26292B', mood: 'Dramatic Industrial', type: 'Feature Walls & Enamel Gates' },
  { name: 'Desert Sand Dune', hex: '#D9C5A8', mood: 'Warm Earthy Richness', type: 'Exterior Facades' }
];

export const PRODUCTS: Product[] = [
  // ==========================================
  // EXTERIOR EMULSIONS (WATER BASED)
  // ==========================================
  {
    id: 'prod-0100',
    code: '0100',
    name: 'D. Ace Weather Defender',
    brand: 'D. Ace',
    category: 'exterior',
    categoryLabel: 'Exterior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Premium 100% pure acrylic elastomeric exterior shield with anti-algae and anti-dirt technology.',
    fullDesc: 'Engineered specifically for extreme Pakistani climate swings from harsh summers to monsoon downpours. D. Ace Weather Defender forms a durable, micro-porous membrane that bridges hairline cracks, repels persistent dirt pick-up, and shields structures against UV fading.',
    features: ['100% Pure Acrylic Formulation', 'Anti-Fungal & Anti-Algal Barrier', 'Dirt-Pick-Up Resistance', 'Extreme UV & Alkali Protection'],
    recommendedUses: ['Exterior Plaster', 'Concrete Facades', 'Boundary Walls', 'Architectural Villas'],
    coverageSqFt: '140 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30-45 mins | Recoat: 2-3 hours',
    finish: 'Silk Matt',
    prices: {
      quarter: 1324.22,
      gallon: 4685.71,
      drummy: 18405.98
    },
    defaultSize: 'gallon',
    popular: true,
    image: '/src/assets/images/exterior_weather_shield_villa_1794226085858.jpg',
    paletteColors: [
      { name: 'Bright White', hex: '#FFFFFF' },
      { name: 'Desert Dune', hex: '#E5D9C5' },
      { name: 'Slate Gray', hex: '#7A8288' }
    ]
  },
  {
    id: 'prod-0700',
    code: '0700',
    name: 'D. Overall Weather Max',
    brand: 'D. Overall',
    category: 'exterior',
    categoryLabel: 'Exterior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Heavy-duty weather protection emulsion formulated for superior bond on masonry and cement surfaces.',
    fullDesc: 'D. Overall Weather Max provides formidable all-weather resistance against heavy rains, scorching sunlight, and salt deposits. Offers reliable color retention and seamless outdoor coverage.',
    features: ['Monsoon Water Repellency', 'Fade Resistant Pigments', 'Breathable Masonry Membrane', 'Cost-effective High Yield'],
    recommendedUses: ['Commercial Buildings', 'Residential Exterior Walls', 'Concrete Parapets'],
    coverageSqFt: '130 - 150 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 45 mins | Recoat: 3 hours',
    finish: 'Silk Matt',
    prices: {
      quarter: 1124.78,
      gallon: 3980.00,
      drummy: 15633.87
    },
    defaultSize: 'gallon',
    popular: true,
    image: '/src/assets/images/paint_buckets_commercial_1794226084827.jpg'
  },
  {
    id: 'prod-8100',
    code: '8100',
    name: 'D. Everlast Weather Proof',
    brand: 'D. Everlast',
    category: 'exterior',
    categoryLabel: 'Exterior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Durable exterior weather-proof coating with strong resistance against efflorescence and chalking.',
    fullDesc: 'Formulated with modified acrylic emulsions for consistent exterior resilience. Protects exterior surfaces from peeling, flaking, and blistering over prolonged outdoor exposure.',
    features: ['Efflorescence Guard', 'Non-Yellowing Formula', 'Crack-Resistant Toughness'],
    recommendedUses: ['Brickwork', 'Rendered Masonry', 'Compound Walls'],
    coverageSqFt: '125 - 145 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 50 mins | Recoat: 3 hours',
    finish: 'Silk Matt',
    prices: {
      quarter: 1080.15,
      gallon: 3982.75,
      drummy: 15289.57
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-7300',
    code: '7300',
    name: 'D. Roof Coat (Heat & Water Resistant)',
    brand: 'D. Ace',
    category: 'exterior',
    categoryLabel: 'Exterior Specialized',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'High-build elastomeric thermal barrier and waterproofing roof coating.',
    fullDesc: 'A specialized elastomeric roof coating that reflects solar heat radiation while sealing terrace micro-cracks. Reduces internal building temperatures and seals against standing water leakage during monsoon rains.',
    features: ['Thermal Heat Reflection up to 8°C', 'Seamless Waterproof Membrane', 'High Elasticity Crack Bridging'],
    recommendedUses: ['Flat Concrete Roofs', 'Terraces', 'Cement Tiles', 'Asbestos Sheeting'],
    coverageSqFt: '70 - 90 sq ft / Gallon (thick 2-3 coats)',
    dryingTime: 'Touch dry: 1 hour | Full cure: 24 hours',
    finish: 'Semi-Gloss',
    prices: {
      gallon: 3977.71,
      drummy: 14790.34
    },
    defaultSize: 'drummy',
    popular: true
  },

  // ==========================================
  // INTERIOR EMULSIONS (WATER BASED)
  // ==========================================
  {
    id: 'prod-8501',
    code: '8501',
    name: 'D. Ace Durasilk (Anti Stain)',
    brand: 'D. Ace',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Ultra-washable luxury silk finish with hydrophobic stain-barrier technology.',
    fullDesc: 'The flagship luxury interior wall paint of Arooj Star. D. Ace Durasilk offers an ultra-smooth, low-sheen satin luster that allows common household stains (tea, ketchup, pencil, crayons) to be wiped away effortlessly with damp cloth without fading.',
    features: ['Class-Leading Stain Release Technology', 'Silken Tactile Feel', 'High Opacity & Washability', 'Low Odor, Zero VOCs'],
    recommendedUses: ['Drawing Rooms', 'Master Bedrooms', 'Dining Halls', 'Executive Offices'],
    coverageSqFt: '160 - 180 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2 hours',
    finish: 'Silk Matt',
    prices: {
      quarter: 1848.67,
      gallon: 6926.70,
      drummy: 27370.96
    },
    defaultSize: 'gallon',
    popular: true,
    image: '/src/assets/images/hero_paint_luxury_interior_1794226083963.jpg',
    paletteColors: [
      { name: 'Royal Arooj Blue', hex: '#0B2240' },
      { name: 'Velvet Pearl Ivory', hex: '#F5F2EB' },
      { name: 'Warm Greige', hex: '#D7D1C5' }
    ]
  },
  {
    id: 'prod-8401',
    code: '8401',
    name: 'D. Everlast Silk Matt Emulsion',
    brand: 'D. Everlast',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Refined velvety dead-flat silk emulsion designed to eliminate harsh room glare.',
    fullDesc: 'Crafted for modern architectural interiors where a rich, subtle non-reflective matte aesthetic is demanded. Conceals minor plaster undulations and fills living areas with deep, saturated ambient tones.',
    features: ['Glare-Free Velvety Texture', 'Surface Imperfection Camouflage', 'Smooth Roller Flow'],
    recommendedUses: ['Living Spaces', 'Media Rooms', 'Bedrooms'],
    coverageSqFt: '150 - 170 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2 hours',
    finish: 'Silk Matt',
    prices: {
      quarter: 1324.22,
      gallon: 5098.21,
      drummy: 19679.78
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-0501',
    code: '0501',
    name: 'D. Ace Plastic Emulsion',
    brand: 'D. Ace',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Heavy-body high scrub plastic emulsion for lasting interior wall durability.',
    fullDesc: 'A time-tested contractor and homeowner favorite throughout Pakistan. High-solids binder formulation guarantees maximum hiding power in fewer coats with a durable scrub-resistant surface.',
    features: ['Exceptional Scrub Resistance', 'High Solids Pigment Load', 'Smooth Satin Feel'],
    recommendedUses: ['Hallways', 'Staircases', 'Family Rooms', 'Schools & Hospitals'],
    coverageSqFt: '150 - 175 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2.5 hours',
    finish: 'Semi-Gloss',
    prices: {
      quarter: 1262.70,
      gallon: 4481.98,
      drummy: 17592.09
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-7801',
    code: '7801',
    name: 'D. Overall Plasticoat (Semi Plastic)',
    brand: 'D. Overall',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Balanced semi-plastic emulsion delivering great coverage at competitive cost.',
    fullDesc: 'Blends the durability of plastic emulsion with economical pricing. Produces a uniform, clean eggshell finish that resists standard humidity and everyday wear.',
    features: ['Quick Drying', 'High Spreading Rate', 'Cost-to-Performance Ratio'],
    recommendedUses: ['Bedrooms', 'Ceilings', 'Rental Properties'],
    coverageSqFt: '140 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2 hours',
    finish: 'Silk Matt',
    prices: {
      quarter: 753.38,
      gallon: 2775.52,
      drummy: 10881.21
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-7801-s',
    code: '7801-S',
    name: 'D. Overall Plasticoat - Special Shades',
    brand: 'D. Overall',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Specially tinted deep-tone semi-plastic emulsion with rich color intensity.',
    fullDesc: 'Dedicated pigment dispersion for deeper decorator tones (Burgundy, Forest Green, Deep Mustard, Royal Purple) with guaranteed non-fading consistency.',
    features: ['Intense Color Saturation', 'Non-Streaking Brush Flow', 'Uniform Tint Retention'],
    recommendedUses: ['Accent Walls', 'Boutique Interiors', 'Feature Alcoves'],
    coverageSqFt: '135 - 155 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2 hours',
    finish: 'Silk Matt',
    prices: {
      quarter: 797.76,
      gallon: 3006.48
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-7001',
    code: '7001',
    name: 'D. Overall Super Emulsion',
    brand: 'D. Overall',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Contractor benchmark high-opacity super emulsion for walls & ceilings.',
    fullDesc: 'Engineered for smooth roller and brush application with excellent brushability and minimal spatter. Ideal for fresh plaster, gypsum ceilings, and interior maintenance painting.',
    features: ['Low Roller Spatter', 'Superior Whiteness & Hiding', 'Fast Recoat Time'],
    recommendedUses: ['Ceilings', 'Commercial Halls', 'Offices'],
    coverageSqFt: '140 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 25 mins | Recoat: 2 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 621.26,
      gallon: 2139.13,
      drummy: 8220.67
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-7501',
    code: '7501',
    name: 'D. Value Emulsion',
    brand: 'D. Value',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Economy grade emulsion formulated for large area coverage on budget projects.',
    fullDesc: 'A cost-effective solution for large-scale developments, warehouse walls, and economical renovation projects. Delivers clean uniform matte appearance.',
    features: ['High Yield Economy', 'Easy Water Thinnable', 'Clean Finish'],
    recommendedUses: ['Boundary Interiors', 'Basements', 'Staff Quarters'],
    coverageSqFt: '130 - 150 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2.5 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 515.00,
      gallon: 1865.00,
      drummy: 7360.00
    },
    defaultSize: 'drummy'
  },
  {
    id: 'prod-7201',
    code: '7201',
    name: 'D. Everlast Emulsion',
    brand: 'D. Everlast',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Reliable everyday interior wall paint with clean matte finish.',
    fullDesc: 'Formulated for quick touchups and full apartment repaints. Provides smooth texture and good light reflection in living spaces.',
    features: ['Smooth Spreading', 'Reliable Adhesion', 'Pleasant Application'],
    recommendedUses: ['Apartment Painting', 'Shops', 'Corridors'],
    coverageSqFt: '135 - 150 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2.5 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 544.62,
      gallon: 1905.15,
      drummy: 7227.25
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-7601',
    code: '7601',
    name: 'D. Value Plus Emulsion (White / Off White / Ash / Cockleshell)',
    brand: 'D. Value',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Specialized 4-shade neutral palette emulsion offering enhanced brightness.',
    fullDesc: 'Available in Pakistan’s top four preferred architectural neutral shades: Pure White, Off White, Ash White, and Cockleshell. Pre-mixed for zero shade variation batch-to-batch.',
    features: ['Pre-mixed Color Consistency', 'High Opacity White Bases', 'Crisp Minimalist Finish'],
    recommendedUses: ['Living Rooms', 'Ceilings', 'Bedrooms'],
    coverageSqFt: '140 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2 hours',
    finish: 'Dead Flat Matt',
    prices: {
      gallon: 1701.42,
      drummy: 6468.82
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-7401',
    code: '7401',
    name: 'D. Ever Plus Emulsion (White / Off White / Ash / Cockleshell)',
    brand: 'D. Everlast',
    category: 'interior',
    categoryLabel: 'Interior Emulsion',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'High-volume contractor neutral emulsion for mass residential developments.',
    fullDesc: 'Maximum efficiency emulsion for rapid rolling across drywall and freshly skimmed plaster in classic whites and off-whites.',
    features: ['High Volume Economy', 'Rapid Wall Coverage', 'Easy Sanding Compatibility'],
    recommendedUses: ['New Housing Schemes', 'Ceilings', 'Rental Units'],
    coverageSqFt: '135 - 150 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 30 mins | Recoat: 2 hours',
    finish: 'Dead Flat Matt',
    prices: {
      gallon: 1330.00,
      drummy: 5025.00
    },
    defaultSize: 'drummy'
  },

  // ==========================================
  // ENAMELS - GLOSS, MATT & ANCILLARIES (OIL BASED)
  // ==========================================
  {
    id: 'prod-4501',
    code: '4501',
    name: 'D. Ace Super Gloss Enamel',
    brand: 'D. Ace',
    category: 'enamels',
    categoryLabel: 'Enamel & Metal',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Mirror-reflective synthetic gloss enamel for luxury metal gates, doors, and timber trims.',
    fullDesc: 'Formulated with ultra-refined alkyd resins and micro-milled pigments. D. Ace Super Gloss Enamel cures to a tough porcelain-like, high-depth gloss shield that resists scratching, moisture, and chemical detergent washings.',
    features: ['Mirror Reflection Sheen', 'Rock-Hard Scratch Resistance', 'Anti-Yellowing Formula', 'Corrosion Inhibiting'],
    recommendedUses: ['Wrought Iron Gates', 'Main Entrance Doors', 'Kitchen Cabinets', 'Window Grills'],
    coverageSqFt: '140 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 2-3 hours | Hard dry: 12-16 hours',
    finish: 'Gloss',
    prices: {
      quarter: 1471.00,
      gallon: 5625.00,
      drummy: 22028.00
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-4001',
    code: '4001',
    name: 'D. Overall High Gloss Enamel',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel & Metal',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Versatile alkyd high gloss enamel with exceptional flow and leveling.',
    fullDesc: 'The definitive industrial and architectural gloss enamel. Available across four convenient pack sizes from Small Tin to Drummy.',
    features: ['Superior Brush Leveling', 'High Weather Endurance', 'Wide Application Range'],
    recommendedUses: ['Doors & Frames', 'Metal Railings', 'Machinery', 'Furniture Trims'],
    coverageSqFt: '135 - 155 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 3 hours | Hard dry: 14 hours',
    finish: 'Gloss',
    prices: {
      smallTin: 394.00,
      quarter: 1242.00,
      gallon: 4860.00,
      drummy: 19100.00
    },
    defaultSize: 'quarter',
    popular: true
  },
  {
    id: 'prod-4701',
    code: '4701',
    name: 'D. Everlast High Gloss Enamel',
    brand: 'D. Everlast',
    category: 'enamels',
    categoryLabel: 'Enamel & Metal',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Protective synthetic gloss enamel built for exterior and interior woodwork & steel.',
    fullDesc: 'Engineered for strong mechanical protection and radiant shine with dependable chipping resistance.',
    features: ['Chip Resistant', 'Easy Clean Sheen', 'Great Metal Adhesion'],
    recommendedUses: ['Balconies', 'Steel Fabrications', 'Exterior Gates'],
    coverageSqFt: '130 - 150 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 3 hours | Hard dry: 14 hours',
    finish: 'Gloss',
    prices: {
      smallTin: 351.00,
      quarter: 1097.00,
      gallon: 4214.00,
      drummy: 16340.00
    },
    defaultSize: 'quarter'
  },
  {
    id: 'prod-0401',
    code: '0401',
    name: 'D. Ace Hi Sparkle Metallic - Enamel',
    brand: 'D. Ace',
    category: 'enamels',
    categoryLabel: 'Enamel & Metallic',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'High-density sparkling metallic flake enamel for luxury architectural ironwork.',
    fullDesc: 'Infused with precision-graded metallic flakes that catch ambient sunlight, creating a rich multi-dimensional shimmer effect. Formulated for gates, decorative railings, and artisan metal pieces.',
    features: ['High-Sparkle Flake Dispersion', 'Rust Protective Alkyd Base', 'Non-Settling Metallic Suspension'],
    recommendedUses: ['Villa Entrance Gates', 'Staircase Balustrades', 'Architectural Sculptures'],
    coverageSqFt: '120 - 140 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 2.5 hours | Hard dry: 12 hours',
    finish: 'Metallic',
    prices: {
      quarter: 1588.00,
      gallon: 6004.00
    },
    defaultSize: 'quarter',
    popular: true
  },
  {
    id: 'prod-0330',
    code: '0330',
    name: 'D. Ace Soft Metallic - Enamel',
    brand: 'D. Ace',
    category: 'enamels',
    categoryLabel: 'Enamel & Metallic',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Subtle satin metallic enamel offering smooth pearlescent sheen.',
    fullDesc: 'A sophisticated softer alternative to heavy glitter sparkle, delivering an understated champagne/titanium sheen on architectural metals and fine wood framing.',
    features: ['Pearlescent Satin Texture', 'Smooth Spray / Brush Flow', 'Durable Protective Binder'],
    recommendedUses: ['Modern Interior Railings', 'Designer Furniture', 'Accent Trim'],
    coverageSqFt: '125 - 145 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 2.5 hours | Hard dry: 12 hours',
    finish: 'Metallic',
    prices: {
      quarter: 1524.00,
      gallon: 5694.00
    },
    defaultSize: 'quarter'
  },
  {
    id: 'prod-0001',
    code: '0001',
    name: 'D. Overall Hammer Finish - Enamel',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel & Metallic',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Textured hammered metal protective enamel that camouflages minor weld scars.',
    fullDesc: 'Creates an authentic hammered pewter / steel relief pattern upon drying. Perfect for industrial machinery, security grilles, electrical distribution panels, and steel storage lockers.',
    features: ['Distinctive Hammer Dimple Effect', 'Hides Metal Welds & Scars', 'Rapid Surface Curing'],
    recommendedUses: ['Industrial Equipment', 'Security Grills', 'Safe Lockers', 'Toolboxes'],
    coverageSqFt: '110 - 130 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 1.5 hours | Hard dry: 8-10 hours',
    finish: 'Hammered',
    prices: {
      quarter: 1429.00,
      gallon: 5359.00
    },
    defaultSize: 'quarter',
    popular: true
  },
  {
    id: 'prod-1601',
    code: '1601',
    name: 'D. Overall Metallic - Enamel',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel & Metallic',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Resilient metallic enamel coating providing high anti-corrosion barrier.',
    fullDesc: 'Engineered for exterior and interior metalwork requiring clean metallic luster with reliable weather resistance against rust and tarnishing.',
    features: ['Corrosion Shielding', 'Smooth Metallic Tone', 'Quick Recoating'],
    recommendedUses: ['Steel Fabrications', 'Pipes', 'Metal Posts'],
    coverageSqFt: '120 - 140 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 2.5 hours | Hard dry: 12 hours',
    finish: 'Metallic',
    prices: {
      quarter: 1301.00,
      gallon: 4967.00
    },
    defaultSize: 'quarter'
  },
  {
    id: 'prod-1001',
    code: '1001',
    name: 'D. Ace Matt Enamel (Anti Stain)',
    brand: 'D. Ace',
    category: 'enamels',
    categoryLabel: 'Enamel & Matt',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Washable luxury dead-flat non-glare oil enamel with anti-stain barrier.',
    fullDesc: 'A prized solution for luxury kitchens, bathrooms, and high-end timber millwork. Yields an ultra-smooth velvety dead-flat surface with oil-based washability and moisture resistance.',
    features: ['Dead Flat Anti-Glare Sheen', 'Full Stain Resistance', 'Moisture Proof for Wet Areas'],
    recommendedUses: ['Kitchen Walls', 'Bathrooms', 'Doors & Architraves', 'Luxury Paneling'],
    coverageSqFt: '140 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 3 hours | Hard dry: 14 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 1714.00,
      gallon: 6345.00,
      drummy: 24918.00
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-1701',
    code: '1701',
    name: 'D. Overall Matt Enamel',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel & Matt',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Contemporary flat oil-based enamel for interior trim and architectural woodwork.',
    fullDesc: 'Combines the toughness of solvent-borne alkyd with a modern matte finish. Ideal for modern minimalist doors and wood paneling.',
    features: ['Non-Reflective Elegant Finish', 'Durable Alkyd Backbone', 'Uniform Flow'],
    recommendedUses: ['Internal Doors', 'Skirtings', 'Wood Furniture'],
    coverageSqFt: '135 - 150 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 3.5 hours | Hard dry: 16 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 1489.00,
      gallon: 5512.00,
      drummy: 21647.00
    },
    defaultSize: 'quarter'
  },
  {
    id: 'prod-0300',
    code: '0300',
    name: 'D. Overall Aluminium Silver',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel Specialized',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'High-purity leafing aluminium paint for heat reflection and rust prevention.',
    fullDesc: 'Dual-container or ready-mix leafing aluminium paint that forms an overlapping metallic shield. Reflects solar heat and repels moisture on outdoor metal tanks, industrial silos, and steam lines.',
    features: ['High Heat Reflection', 'Leafing Aluminium Flake Shield', 'Rust Inhibiting'],
    recommendedUses: ['Water Storage Tanks', 'Industrial Pipelines', 'Corrugated Iron Roofs'],
    coverageSqFt: '150 - 180 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 2 hours | Hard dry: 10 hours',
    finish: 'Metallic',
    prices: {
      smallTin: 481.00,
      quarter: 1441.00,
      gallon: 5400.00
    },
    defaultSize: 'quarter'
  },
  {
    id: 'prod-4099',
    code: '4099',
    name: 'D. Overall Synthetic Silver',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel Specialized',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Synthetic silver protective enamel for steel structures and farm equipment.',
    fullDesc: 'Bright silver protective topcoat for agricultural tools, chassis, lamp posts, and exterior pipes.',
    features: ['Bright Silver Tone', 'Quick Drying Synthetic Binder', 'Cost Efficient'],
    recommendedUses: ['Lamp Posts', 'Farm Implements', 'Trailer Frames'],
    coverageSqFt: '130 - 150 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 2 hours | Hard dry: 12 hours',
    finish: 'Metallic',
    prices: {
      smallTin: 371.00,
      quarter: 1155.00,
      gallon: 4505.00
    },
    defaultSize: 'quarter'
  },
  {
    id: 'prod-2504',
    code: '2504',
    name: 'D. Overall Under Coat White',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel Primer & Undercoat',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'High-build dense white foundation undercoat for enamel topcoats.',
    fullDesc: 'Essential intermediate layer that obliterates previous dark colors, seals grain on timber, and provides an easily sandable tooth for high-gloss enamels.',
    features: ['Dense Opacity & Hiding', 'Easy Sanding to Featheredge', 'Even Enamel Holdout'],
    recommendedUses: ['Raw Wood', 'Previous Enamel Surfaces', 'Interior Door Frames'],
    coverageSqFt: '140 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 2 hours | Sandable: 8-12 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 1145.00,
      gallon: 4211.00,
      drummy: 16519.00
    },
    defaultSize: 'quarter'
  },
  {
    id: 'prod-2512',
    code: '2512/13',
    name: 'D. Overall Under Coat-S',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel Primer & Undercoat',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Rapid drying oil-based sanding undercoat for mirror-level enamel prep.',
    fullDesc: 'Fast-setting undercoat formulated with micro-extenders for quick cut-back with dry sanding paper, speeding up painting cycles.',
    features: ['Fast Sanding Time', 'No Paper Clogging', 'Firm Adhesion'],
    recommendedUses: ['Cabinetry', 'Wood Trims', 'Metal Doors'],
    coverageSqFt: '135 - 155 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 1.5 hours | Sandable: 6 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 1021.00,
      gallon: 3684.00,
      drummy: 14397.00
    },
    defaultSize: 'quarter'
  },
  {
    id: 'prod-2502',
    code: '2502',
    name: 'D. Overall Knifing Filler (Oil Putty)',
    brand: 'D. Overall',
    category: 'enamels',
    categoryLabel: 'Enamel Putty & Filler',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Oil-based heavy knifing filler putty for wood and metal imperfection rectification.',
    fullDesc: 'Dense buttery knife-grade putty designed to fill grain pores, hammer marks, and scratches on wood and automotive / metal bodies before undercoating.',
    features: ['Zero Shrinkage In Thin Layers', 'Featheredges Exceptionally', 'High Sandability'],
    recommendedUses: ['Wooden Doors', 'Automotive Bodies', 'Metal Enclosure Cabinets'],
    coverageSqFt: 'Varies with surface defect depth',
    dryingTime: 'Knife coat dry: 2-3 hours | Sandable: 6 hours',
    finish: 'Smooth Putty',
    prices: {
      quarter: 1021.00
    },
    defaultSize: 'quarter'
  },

  // ==========================================
  // WALL PUTTYS / FILLERS (WATER BASED)
  // ==========================================
  {
    id: 'prod-0080',
    code: '0080',
    name: 'D. Ace Acrylic Primer Filler Putty (Exterior & Interior)',
    brand: 'D. Ace',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Dual-action copolymer acrylic putty and primer for exterior and interior masonry.',
    fullDesc: 'Combines the deep bonding properties of a primer with the smooth leveling power of high-grade acrylic putty. Fortified to resist moisture seepages and thermal expansion on both exterior and interior walls.',
    features: ['Dual Action Primer + Putty', 'Exterior & Interior Multi-Surface', 'High Elasticity Crack Bridging', 'Easy Knife Application'],
    recommendedUses: ['Exterior Sand Cement Plaster', 'Interior Gypsum Walls', 'Concrete Ceilings'],
    coverageSqFt: '35 - 45 sq ft / Gallon (2 coats on rough plaster)',
    dryingTime: 'Touch dry: 1 hour | Sandable: 4-6 hours',
    finish: 'Smooth Putty',
    prices: {
      gallon: 1840.60,
      drummy: 7180.85
    },
    defaultSize: 'drummy',
    popular: true
  },
  {
    id: 'prod-0095',
    code: '0095',
    name: 'D. Ace Super Acrylic Sheesha Putty',
    brand: 'D. Ace',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Ultra-refined mirror-smooth glass finish putty for luxury wall preparation.',
    fullDesc: 'The gold standard for wall finishing in Pakistan. D. Ace Sheesha Putty uses micro-fine micronized marble and pure acrylic resins to create a glass-like ("Sheesha"), zero-pinhole substrate ready for Durasilk or plastic emulsions.',
    features: ['Sheesha Glass Smooth Leveling', 'Zero Pinhole Formula', 'Exceptional Butter-Like Workability', 'Virtually Dustless Feathering'],
    recommendedUses: ['Master Bedrooms', 'Drawing Rooms', 'High-Luminance Walls'],
    coverageSqFt: '40 - 55 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 45 mins | Sandable: 4 hours',
    finish: 'Smooth Putty',
    prices: {
      gallon: 1856.89,
      drummy: 7091.71
    },
    defaultSize: 'drummy',
    popular: true
  },
  {
    id: 'prod-0090',
    code: '0090',
    name: 'D. Ace Extra Smooth Primer Filler Sheesha Putty',
    brand: 'D. Ace',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'High-spread extra smooth primer filler sheesha putty in all pack sizes.',
    fullDesc: 'Ultra-smooth formula with built-in bonding enhancers. Available in Quarter, Gallon, and Drummy sizes for both touchups and massive architectural layouts.',
    features: ['High-Spread Efficiency', 'Primer Reinforcement', 'Effortless Fine Sanding'],
    recommendedUses: ['Luxury Residential', 'Boutique Showrooms', 'Interior Plaster'],
    coverageSqFt: '45 - 60 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 45 mins | Sandable: 4 hours',
    finish: 'Smooth Putty',
    prices: {
      quarter: 487.13,
      gallon: 1756.89,
      drummy: 6691.71
    },
    defaultSize: 'drummy'
  },
  {
    id: 'prod-0075',
    code: '0075',
    name: 'D. Overall Extra Bond Acrylic Putty',
    brand: 'D. Overall',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Reinforced copolymer binder putty resisting efflorescence and surface dampness.',
    fullDesc: 'Formulated with added synthetic polymer adhesion promoters, ensuring zero peeling even over challenging plaster substrates.',
    features: ['Extra Bond Adhesion', 'Chalk-Free Sanding', 'Moisture Tolerant'],
    recommendedUses: ['Fresh Cement Plaster', 'Renovation Walls', 'Ceilings'],
    coverageSqFt: '40 - 50 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 1 hour | Sandable: 5 hours',
    finish: 'Smooth Putty',
    prices: {
      quarter: 450.00,
      gallon: 1700.00,
      drummy: 5870.00
    },
    defaultSize: 'drummy'
  },
  {
    id: 'prod-0070',
    code: '0070',
    name: 'D. Overall Primer Filler Putty',
    brand: 'D. Overall',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'High-yield contractor filling putty for plaster, concrete, and gypsum board.',
    fullDesc: 'High volume skim putty formulated for maximum economy and rapid troweling on new construction projects.',
    features: ['High Yield Formula', 'Fast Drying', 'Cost Effective'],
    recommendedUses: ['Commercial Projects', 'Housing Schemes', 'Gypsum Boards'],
    coverageSqFt: '40 - 50 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 1 hour | Sandable: 5 hours',
    finish: 'Smooth Putty',
    prices: {
      quarter: 346.94,
      gallon: 1116.46,
      drummy: 4359.95
    },
    defaultSize: 'drummy'
  },
  {
    id: 'prod-0050',
    code: '0050',
    name: 'D. Value Putty',
    brand: 'D. Value',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Economical wall smoothing putty for residential surface skimming.',
    fullDesc: 'Budget-friendly water-based putty paste offering good spreadability and straightforward sanding.',
    features: ['Budget Friendly', 'Easy Troweling', 'Uniform Whiteness'],
    recommendedUses: ['Residential Walls', 'Basements', 'Boundary Interior'],
    coverageSqFt: '35 - 45 sq ft / Gallon',
    dryingTime: 'Touch dry: 1 hour | Sandable: 5 hours',
    finish: 'Smooth Putty',
    prices: {
      quarter: 328.79,
      gallon: 1106.38,
      drummy: 4190.00
    },
    defaultSize: 'drummy'
  },
  {
    id: 'prod-0040',
    code: '0040',
    name: 'D. Everlast Putty',
    brand: 'D. Everlast',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Reliable water-based paste for easy troweling and low shrinkage.',
    fullDesc: 'Dependable ready-to-use putty designed for everyday wall smoothing and contractor bulk applications.',
    features: ['Low Shrinkage', 'Good Sanding', 'High Opacity'],
    recommendedUses: ['Apartment Walls', 'Commercial Spaces'],
    coverageSqFt: '35 - 45 sq ft / Gallon',
    dryingTime: 'Touch dry: 1 hour | Sandable: 5 hours',
    finish: 'Smooth Putty',
    prices: {
      gallon: 962.15,
      drummy: 3509.74
    },
    defaultSize: 'drummy'
  },
  {
    id: 'prod-0010',
    code: '0010',
    name: 'D. Value Plus Putty',
    brand: 'D. Value',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'High whiteness interior wall putty for uniform brightness under emulsions.',
    fullDesc: 'High brightness formulation that enhances topcoat luminosity and reduces required paint coats.',
    features: ['Enhanced Whiteness', 'Smooth Paste Consistency', 'High Value Yield'],
    recommendedUses: ['Internal Plaster', 'Ceilings'],
    coverageSqFt: '35 - 45 sq ft / Gallon',
    dryingTime: 'Touch dry: 1 hour | Sandable: 5 hours',
    finish: 'Smooth Putty',
    prices: {
      gallon: 983.33,
      drummy: 3595.47
    },
    defaultSize: 'drummy'
  },
  {
    id: 'prod-0030',
    code: '0030',
    name: 'D. Ever Plus Putty',
    brand: 'D. Everlast',
    category: 'putties',
    categoryLabel: 'Wall Putty & Filler',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Contractor standard putty for large-scale smooth wall skim coating.',
    fullDesc: 'High-mileage economical ready-mix putty ideal for new residential housing schemes and commercial projects.',
    features: ['Contractor Bulk Pricing', 'Smooth Spatula Flow', 'Good Base Hold'],
    recommendedUses: ['Large Scale Plaster Leveling', 'Rental Properties'],
    coverageSqFt: '35 - 45 sq ft / Gallon',
    dryingTime: 'Touch dry: 1 hour | Sandable: 5 hours',
    finish: 'Smooth Putty',
    prices: {
      gallon: 925.00,
      drummy: 3395.00
    },
    defaultSize: 'drummy'
  },

  // ==========================================
  // PRIMERS - WATER BASED & OIL BASED
  // ==========================================
  {
    id: 'prod-9800',
    code: '9800',
    name: 'D. Ace Flexi Primer (Elastomeric Coating)',
    brand: 'D. Ace',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'High-build elastomeric crack-bridging foundation primer for exterior masonry.',
    fullDesc: 'Engineered with elastic cross-linking polymers that stretch and contract with structural temperature shifts, preventing hairline cracks from telegraphing through exterior weather shields.',
    features: ['Crack-Bridging Elasticity', 'Alkali & Efflorescence Barrier', 'Waterproof Foundation Membrane'],
    recommendedUses: ['New Exterior Plaster', 'Exposed Masonry', 'Villa Facades'],
    coverageSqFt: '120 - 150 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 45 mins | Topcoat: 3 hours',
    finish: 'Sealer',
    prices: {
      gallon: 4590.00,
      drummy: 18000.00
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-9600',
    code: '9600',
    name: 'D. Ace Water Based Acrylic Primer (Exterior & Interior)',
    brand: 'D. Ace',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Deep penetrating alkali-resistant 100% pure acrylic primer for versatile use.',
    fullDesc: 'Deeply penetrates porous plaster and cement, neutralizing surface alkalinity and ensuring an unshakeable bond for subsequent emulsion coats.',
    features: ['Deep Substrate Penetration', 'Resists Active Lime & Alkali', 'Universal Exterior / Interior Use'],
    recommendedUses: ['Fresh Plaster', 'Concrete', 'Porous Masonry'],
    coverageSqFt: '160 - 200 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 30 mins | Topcoat: 2-3 hours',
    finish: 'Sealer',
    prices: {
      gallon: 3600.00,
      drummy: 13490.00
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-9500',
    code: '9500',
    name: 'D. Overall Water Based Acrylic Primer (Exterior & Interior)',
    brand: 'D. Overall',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Reliable acrylic primer stabilizing chalky surfaces and balancing suction.',
    fullDesc: 'Stabilizes powdery substrates and equalizes wall porosity, preventing patchy gloss or color unevenness in finished topcoats.',
    features: ['Balances Surface Porosity', 'Good Adhesive Tie-Coat', 'Easy Water Cleanup'],
    recommendedUses: ['Porous Walls', 'Skim Coats', 'Renovations'],
    coverageSqFt: '150 - 180 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 30 mins | Topcoat: 2.5 hours',
    finish: 'Sealer',
    prices: {
      gallon: 3005.47,
      drummy: 11684.02
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-9400',
    code: '9400',
    name: 'D. Everlast Water Based Acrylic Primer (Exterior & Interior)',
    brand: 'D. Everlast',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Economical acrylic primer offering dependable moisture-barrier adhesion.',
    fullDesc: 'Formulated for cost-effective priming on multi-unit developments and commercial buildings.',
    features: ['Moisture Barrier Adhesion', 'Quick Drying', 'Contractor Pricing'],
    recommendedUses: ['Commercial Masonry', 'Housing Schemes'],
    coverageSqFt: '140 - 170 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 35 mins | Topcoat: 3 hours',
    finish: 'Sealer',
    prices: {
      gallon: 2409.42,
      drummy: 9356.29
    },
    defaultSize: 'drummy'
  },
  {
    id: 'prod-9200',
    code: '9200',
    name: 'D. Overall Water Based Primer (Interior)',
    brand: 'D. Overall',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'Fast-drying non-toxic water-based primer for indoor plaster and brickwork.',
    fullDesc: 'Clean indoor primer with minimal odor, ideal for occupied homes and rapid room repaint jobs.',
    features: ['Low Odor', 'Fast Recoat Speed', 'Available in Quarter Size'],
    recommendedUses: ['Interior Walls', 'Ceilings', 'Room Partitions'],
    coverageSqFt: '150 - 180 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 25 mins | Topcoat: 2 hours',
    finish: 'Sealer',
    prices: {
      quarter: 462.62,
      gallon: 1658.56,
      drummy: 6390.15
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-9300',
    code: '9300',
    name: 'D. Everlast Water Based Primer (Interior)',
    brand: 'D. Everlast',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Water Based (WB)',
    baseCategoryCode: 'WB',
    shortDesc: 'High-hiding interior primer ensuring true color fidelity of finish coats.',
    fullDesc: 'Bright base primer that covers minor plaster discoloration, ensuring topcoat colors look vibrant and uniform.',
    features: ['High White Hiding', 'Easy Application', 'Good Holdout'],
    recommendedUses: ['Fresh Gypsum & Plaster Interiors'],
    coverageSqFt: '140 - 170 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 30 mins | Topcoat: 2 hours',
    finish: 'Sealer',
    prices: {
      gallon: 1589.47,
      drummy: 5994.80
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-2506',
    code: '2506',
    name: 'D. Overall Wall Sealer - Oil Based',
    brand: 'D. Overall',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Heavy-duty solvent-borne sealer isolating alkaline salts and persistent damp patches.',
    fullDesc: 'The definitive solution for problematic "Shor" (efflorescence and rising dampness) in Pakistani construction. Penetrates deep into crumbly cement to bind loose particles and form a barrier against water stains.',
    features: ['Deep Salt & Efflorescence Isolation', 'Binds Crumbly Chalky Walls', 'Superior Stain Blocking'],
    recommendedUses: ['Damp Walls', 'Basements', 'Ground Floor Plaster with Shor'],
    coverageSqFt: '130 - 160 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 2-3 hours | Topcoat: 12-16 hours',
    finish: 'Sealer',
    prices: {
      quarter: 1234.00,
      gallon: 4520.00,
      drummy: 17775.00
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-2406',
    code: '2406',
    name: 'D. Everlast Wall Sealer - Oil Based',
    brand: 'D. Everlast',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Solvent-borne deep capillary sealer for chalky and problematic masonry.',
    fullDesc: 'Creates an impermeable barrier that blocks moisture migration and prevents unsightly white salt crystals from breaking through paint films.',
    features: ['Salt Crystal Blocking', 'Strong Penetrative Grip', 'Long-Term Barrier'],
    recommendedUses: ['Old Damp Masonry', 'Boundary Foundations'],
    coverageSqFt: '125 - 150 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 3 hours | Topcoat: 14 hours',
    finish: 'Sealer',
    prices: {
      gallon: 3860.00,
      drummy: 15084.00
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-2613',
    code: '2613',
    name: 'D. Overall Red Oxide Primer (for Metals)',
    brand: 'D. Overall',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Industrial anti-corrosive primer shielding structural iron and steel against rust.',
    fullDesc: 'High-potency iron oxide primer that chemically inhibits rust development on metal substrates. Provides superior anchor profile for enamel topcoats.',
    features: ['Active Rust Inhibition', 'Tough Alkyd Adhesion', 'High Weather Resistance'],
    recommendedUses: ['Steel Gates', 'Iron Roof Trusses', 'Window Grilles', 'Pipes'],
    coverageSqFt: '140 - 165 sq ft / Gallon (1-2 coats)',
    dryingTime: 'Touch dry: 1.5 hours | Topcoat: 8-10 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 961.00,
      gallon: 3590.00,
      drummy: 14026.00
    },
    defaultSize: 'quarter',
    popular: true
  },
  {
    id: 'prod-2413',
    code: '2413',
    name: 'D. Everlast Red Oxide Primer (for Metals)',
    brand: 'D. Everlast',
    category: 'primers',
    categoryLabel: 'Primer & Sealer',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Reliable rust inhibitor primer for iron fabrications and building frames.',
    fullDesc: 'Economical red oxide primer ensuring reliable anti-corrosion protection on gates, railings, and fabrication workshop components.',
    features: ['Anti-Corrosion Shield', 'Good Spray / Brush Flow', 'Economic Protection'],
    recommendedUses: ['Fabrication Shops', 'Steel Railings', 'Security Shutters'],
    coverageSqFt: '135 - 155 sq ft / Gallon (1-2 coats)',
    dryingTime: 'Touch dry: 2 hours | Topcoat: 10 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 885.00,
      gallon: 3385.00,
      drummy: 13184.00
    },
    defaultSize: 'quarter'
  },

  // ==========================================
  // WOOD RANGES (OIL BASED & VR)
  // ==========================================
  {
    id: 'prod-6200',
    code: '6200',
    name: 'D. Ace Timberlac Premium Thinner',
    brand: 'D. Ace',
    category: 'wood',
    categoryLabel: 'Wood & Solvents',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Pure virgin solvent blend for immaculate lacquer leveling and zero blushing.',
    fullDesc: 'Specially distilled for fine woodworking. Controls lacquer evaporation rates to eliminate solvent pop, orange peel, and humidity blushing even in hot or humid conditions. Available from Quarter to Industrial Barrel.',
    features: ['Zero Moisture Contamination', 'Optimum Evaporation Curve', 'Available in 200L Barrel for Factories'],
    recommendedUses: ['Wood Lacquer Thinning', 'Sanding Sealer Viscosity Control', 'High-End Spraying'],
    coverageSqFt: 'Additive / Solvent',
    dryingTime: 'Controlled Flash-off: 5-8 mins',
    finish: 'Sealer',
    prices: {
      quarter: 1128.00,
      gallon: 4060.00,
      drummy: 22143.00,
      barrel: 216192.00
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-5900',
    code: '5900',
    name: 'D. Overall Thinner',
    brand: 'D. Overall',
    category: 'wood',
    categoryLabel: 'Wood & Solvents',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Multi-purpose paint, enamel and varnish reducer for cleaning and spraying.',
    fullDesc: 'High-solvency general purpose thinner for adjusting enamel viscosities, cleaning spray guns, and washing painting tools.',
    features: ['High Solvent Power', 'Fast Paint Breakdown', 'Economic Multi-use'],
    recommendedUses: ['Enamel Thinning', 'Spray Gun Cleaning', 'Degreasing'],
    coverageSqFt: 'Additive / Solvent',
    dryingTime: 'Fast Flash-off',
    finish: 'Sealer',
    prices: {
      quarter: 909.00,
      gallon: 3229.00
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-6300',
    code: '6300',
    name: 'D. Everlast Woodcoat Thinner',
    brand: 'D. Everlast',
    category: 'wood',
    categoryLabel: 'Wood & Solvents',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Specialized furniture lacquer reducer preventing orange-peel and blushing.',
    fullDesc: 'Engineered for furniture manufacturers and joinery units. Keeps spray fans uniform and preserves high gloss clarity in finished coatings.',
    features: ['Prevents Blushing', 'Smooth Film Formation', 'Supplied up to 200L Barrels'],
    recommendedUses: ['Furniture Polish Factories', 'Joinery Workshops'],
    coverageSqFt: 'Additive / Solvent',
    dryingTime: 'Medium Flash-off',
    finish: 'Sealer',
    prices: {
      quarter: 1039.00,
      gallon: 4040.00,
      drummy: 21396.00,
      barrel: 203920.00
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-v6650',
    code: 'V6650',
    name: 'D. Maxima NC Thinner',
    brand: 'D. Maxima',
    category: 'wood',
    categoryLabel: 'Wood & Solvents',
    baseType: 'Varnish / NC (VR)',
    baseCategoryCode: 'VR',
    shortDesc: 'Fast-evaporating nitrocellulose thinner for rapid-dry wood lacquers.',
    fullDesc: 'Formulated with balanced ketones and esters for complete dissolution of nitrocellulose resins, resulting in rapid cycle production times.',
    features: ['Rapid Tack-Free Times', 'Crystal Clear Resin Dissolution', 'High Volatility'],
    recommendedUses: ['NC Lacquer Spraying', 'Rapid Polish Work'],
    coverageSqFt: 'Additive / Solvent',
    dryingTime: 'Ultra-fast flash-off',
    finish: 'Sealer',
    prices: {
      quarter: 1029.00,
      gallon: 3680.00
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-v6651',
    code: 'V6651',
    name: 'D. Maxima NC Thinner Special',
    brand: 'D. Maxima',
    category: 'wood',
    categoryLabel: 'Wood & Solvents',
    baseType: 'Varnish / NC (VR)',
    baseCategoryCode: 'VR',
    shortDesc: 'Extra crystal-clarity NC thinner preventing moisture fogging in wood finishes.',
    fullDesc: 'Refined formulation containing humidity-control agents that prevent milky haze ("blushing") during winter and rainy seasons.',
    features: ['Anti-Fogging Formula', 'Zero Milky Haze', 'Available in Industrial Barrel'],
    recommendedUses: ['Executive Wood Paneling', 'Luxury Furniture', 'Musical Instruments'],
    coverageSqFt: 'Additive / Solvent',
    dryingTime: 'Controlled flash-off',
    finish: 'Sealer',
    prices: {
      quarter: 913.00,
      gallon: 3245.00,
      drummy: 16462.00,
      barrel: 152422.00
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-3303',
    code: '3303',
    name: 'D. Ace Timberlac Sanding Sealer',
    brand: 'D. Ace',
    category: 'wood',
    categoryLabel: 'Wood & Finish',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'High-solid pore filling timber sanding sealer with exceptional sandability.',
    fullDesc: 'The foundation of executive furniture finishes. Penetrates deep into wood pores, builds solid thickness quickly, and powders cleanly under sandpaper without gumming up abrasives.',
    features: ['High Solid Pore Filling', 'Rapid Powder Sanding (No Clog)', 'Highlights Natural Grain Depth'],
    recommendedUses: ['Teak, Sheesham & Oak Wood', 'Doors & Architraves', 'Executive Desks'],
    coverageSqFt: '140 - 170 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 20 mins | Sandable: 45-60 mins',
    finish: 'Sealer',
    prices: {
      quarter: 1838.00,
      gallon: 6630.00,
      drummy: 35325.00
    },
    defaultSize: 'gallon',
    popular: true,
    image: '/src/assets/images/wood_lacquer_craft_finish_1794226085390.jpg'
  },
  {
    id: 'prod-v6671',
    code: 'V6671',
    name: 'D. Maxima Wood Sealer',
    brand: 'D. Maxima',
    category: 'wood',
    categoryLabel: 'Wood & Finish',
    baseType: 'Varnish / NC (VR)',
    baseCategoryCode: 'VR',
    shortDesc: 'Deep penetration timber sealer locking in natural grain beauty.',
    fullDesc: 'Versatile nitrocellulose wood sealer designed for rapid furniture production lines with crisp sanding characteristics.',
    features: ['Fast Cycle Sanding', 'Grain Definition', 'Reliable Topcoat Grip'],
    recommendedUses: ['Solid Timber', 'Plywood Veneers', 'MDF Moldings'],
    coverageSqFt: '135 - 160 sq ft / Gallon (1 coat)',
    dryingTime: 'Touch dry: 15 mins | Sandable: 45 mins',
    finish: 'Sealer',
    prices: {
      quarter: 1249.00,
      gallon: 4774.00,
      drummy: 24305.00
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-3301',
    code: '3301',
    name: 'D. Ace Timberlac Gloss Lacquer',
    brand: 'D. Ace',
    category: 'wood',
    categoryLabel: 'Wood & Finish',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Ultra-clear glass-like high gloss lacquer for executive furniture and cabinetry.',
    fullDesc: 'Forms an astonishing crystal-clear glass sheen over sealed woodwork. Resists hot cup rings, alcohol spills, and surface scuffs while keeping wood grains vivid.',
    features: ['Deep Crystal Glass Reflection', 'Scratch & Heat Ring Resistance', 'Non-Yellowing High Clarity'],
    recommendedUses: ['Conference Tables', 'Bespoke Dining Sets', 'Main Entrance Doors', 'Musical Wood'],
    coverageSqFt: '140 - 170 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 25 mins | Hard cure: 12 hours',
    finish: 'Gloss',
    prices: {
      quarter: 1897.00,
      gallon: 6943.00,
      drummy: 37116.00
    },
    defaultSize: 'gallon',
    popular: true,
    image: '/src/assets/images/wood_lacquer_craft_finish_1794226085390.jpg'
  },
  {
    id: 'prod-v6673',
    code: 'V6673',
    name: 'D. Maxima Wood Gloss Lacquer',
    brand: 'D. Maxima',
    category: 'wood',
    categoryLabel: 'Wood & Finish',
    baseType: 'Varnish / NC (VR)',
    baseCategoryCode: 'VR',
    shortDesc: 'Durable gloss polyurethane-nitrocellulose topcoat for residential furniture.',
    fullDesc: 'Delivers brilliant sheen and protection against daily wear for wooden cabinetry, shelving, and stair handrails.',
    features: ['High Radiant Sheen', 'Fast Recoating Schedule', 'Cost Effective'],
    recommendedUses: ['Kitchen Cabinets', 'Handrails', 'Wardrobes'],
    coverageSqFt: '130 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 20 mins | Hard cure: 12 hours',
    finish: 'Gloss',
    prices: {
      quarter: 1220.00,
      gallon: 4725.00,
      drummy: 23230.00
    },
    defaultSize: 'gallon'
  },
  {
    id: 'prod-3302',
    code: '3302',
    name: 'D. Ace Timberlac Matt Lacquer',
    brand: 'D. Ace',
    category: 'wood',
    categoryLabel: 'Wood & Finish',
    baseType: 'Oil Based (OB)',
    baseCategoryCode: 'OB',
    shortDesc: 'Natural tactile flat sheen lacquer highlighting raw organic wood grain.',
    fullDesc: 'Engineered for modern Nordic and Japandi wood styles. Provides invisible tough protection with no artificial shine, feeling silky and natural to the touch.',
    features: ['Contemporary Raw Wood Matte Look', 'Silky Tactile Texture', 'Zero Glare Reflection'],
    recommendedUses: ['Modern Minimalist Furniture', 'Wall Paneling', 'Designer Bedroom Sets'],
    coverageSqFt: '140 - 170 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 25 mins | Hard cure: 12 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 1897.00,
      gallon: 6943.00,
      drummy: 37116.00
    },
    defaultSize: 'gallon',
    popular: true
  },
  {
    id: 'prod-v6672',
    code: 'V6672',
    name: 'D. Maxima Wood Matt Lacquer',
    brand: 'D. Maxima',
    category: 'wood',
    categoryLabel: 'Wood & Finish',
    baseType: 'Varnish / NC (VR)',
    baseCategoryCode: 'VR',
    shortDesc: 'Premium scuff-resistant matte protective coat for interior millwork.',
    fullDesc: 'Protective topcoat offering a soft non-reflective sheen for office desks, hotel furniture, and residential cabinetry.',
    features: ['Scuff Resistant', 'Smooth Even Matt Finish', 'Reliable Daily Protection'],
    recommendedUses: ['Office Desks', 'Hotel Furniture', 'Interior Millwork'],
    coverageSqFt: '135 - 160 sq ft / Gallon (2 coats)',
    dryingTime: 'Touch dry: 20 mins | Hard cure: 12 hours',
    finish: 'Dead Flat Matt',
    prices: {
      quarter: 1305.00,
      gallon: 4885.00,
      drummy: 24915.00
    },
    defaultSize: 'gallon'
  }
];

export const CATEGORY_TABS: { key: string; label: string; count: number }[] = [
  { key: 'all', label: 'All Products', count: PRODUCTS.length },
  { key: 'exterior', label: 'Exterior Emulsions', count: PRODUCTS.filter(p => p.category === 'exterior').length },
  { key: 'interior', label: 'Interior Emulsions', count: PRODUCTS.filter(p => p.category === 'interior').length },
  { key: 'enamels', label: 'Enamels & Metallics', count: PRODUCTS.filter(p => p.category === 'enamels').length },
  { key: 'putties', label: 'Wall Puttys & Fillers', count: PRODUCTS.filter(p => p.category === 'putties').length },
  { key: 'primers', label: 'Primers & Sealers', count: PRODUCTS.filter(p => p.category === 'primers').length },
  { key: 'wood', label: 'Wood & Lacquers', count: PRODUCTS.filter(p => p.category === 'wood').length },
];
