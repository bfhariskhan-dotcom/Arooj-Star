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
  active?: boolean;
  order?: number;
  image?: string;
  paletteColors?: { name: string; hex: string }[];
  updatedAt?: string;
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

export interface QuotationItemSummary {
  productId: string;
  code: string;
  name: string;
  selectedSize: PackSizeKey;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface QuotationRecord {
  id: string;
  orderNumber: string;
  source: 'quotation_drawer' | 'contact_form';
  fullName: string;
  companyShopName: string;
  phone: string;
  city: string;
  province: string;
  deliveryAddress: string;
  orderNotes: string;
  items: QuotationItemSummary[];
  totalAmount: number;
  status: 'new' | 'contacted' | 'dispatched' | 'completed';
  createdAt: string;
}

export interface SocialLinkItem {
  id: string;
  platform: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'whatsapp' | 'custom';
  label: string;
  url: string;
  enabled: boolean;
}

export interface SiteSettings {
  brandName: string;
  galleryName: string;
  parentIndustry: string;
  taglineEnglish: string;
  ceo: string;
  contactPerson: string;
  phone1: string;
  phone1Raw: string;
  phone2: string;
  phone2Raw: string;
  email: string;
  website: string;
  domain: string;
  priceListDate: string;
  address: string;
  heroImage: string;
  aboutImage: string;
  socialLinks?: SocialLinkItem[];
}
