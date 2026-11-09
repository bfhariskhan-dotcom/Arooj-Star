export type ProductCategory = 
  | 'all'
  | 'exterior'
  | 'interior'
  | 'enamels'
  | 'putties'
  | 'primers'
  | 'wood';

export type BaseType = 'Water Based (WB)' | 'Oil Based (OB)' | 'Varnish / NC (VR)';

export interface PackSizePrice {
  smallTin?: number;
  quarter?: number;
  gallon?: number;
  drummy?: number;
  barrel?: number;
}

export type PackSizeKey = keyof PackSizePrice;

export interface Product {
  id: string;
  code: string;
  name: string;
  brand: 'Arooj Star' | 'D. Ace' | 'D. Overall' | 'D. Everlast' | 'D. Maxima' | 'D. Value';
  category: 'exterior' | 'interior' | 'enamels' | 'putties' | 'primers' | 'wood';
  categoryLabel: string;
  baseType: BaseType;
  baseCategoryCode: 'WB' | 'OB' | 'VR';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  recommendedUses: string[];
  coverageSqFt: string;
  dryingTime: string;
  finish: 'Gloss' | 'Silk Matt' | 'Dead Flat Matt' | 'Semi-Gloss' | 'Metallic' | 'Hammered' | 'Smooth Putty' | 'Sealer';
  prices: PackSizePrice;
  defaultSize: PackSizeKey;
  popular?: boolean;
  image?: string;
  paletteColors?: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  selectedSize: PackSizeKey;
  quantity: number;
  unitPrice: number;
}

export interface DealerOrderForm {
  fullName: string;
  companyShopName: string;
  phone: string;
  city: string;
  province: string;
  deliveryAddress: string;
  orderNotes?: string;
  preferredContact: 'whatsapp' | 'call';
}
