import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  writeBatch,
  getDocs,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Product, QuotationRecord, SiteSettings } from '../types';

const PRODUCTS_COL = 'products';
const QUOTATIONS_COL = 'quotations';
const SITE_CONFIG_COL = 'siteConfig';
const SITE_CONFIG_DOC = 'main';

function sanitizeProductPayload(product: Product, indexOrder?: number) {
  const cleanPrices: Record<string, number> = {};
  if (product.prices.smallTin && product.prices.smallTin > 0) cleanPrices.smallTin = Number(product.prices.smallTin);
  if (product.prices.quarter && product.prices.quarter > 0) cleanPrices.quarter = Number(product.prices.quarter);
  if (product.prices.gallon && product.prices.gallon > 0) cleanPrices.gallon = Number(product.prices.gallon);
  if (product.prices.drummy && product.prices.drummy > 0) cleanPrices.drummy = Number(product.prices.drummy);
  if (product.prices.barrel && product.prices.barrel > 0) cleanPrices.barrel = Number(product.prices.barrel);

  const validSizes = Object.keys(cleanPrices);
  const safeDefaultSize = validSizes.includes(product.defaultSize)
    ? product.defaultSize
    : (validSizes[0] || 'gallon');

  return {
    id: product.id.slice(0, 128),
    code: product.code.trim().slice(0, 40),
    name: product.name.trim().slice(0, 200),
    brand: product.brand || 'Arooj Star',
    category: product.category,
    categoryLabel: product.categoryLabel.slice(0, 120),
    baseType: product.baseType,
    baseCategoryCode: product.baseCategoryCode,
    shortDesc: (product.shortDesc || '').trim().slice(0, 400),
    fullDesc: (product.fullDesc || '').trim().slice(0, 2000),
    features: (product.features || []).map((f) => f.trim()).filter(Boolean).slice(0, 15),
    recommendedUses: (product.recommendedUses || []).map((u) => u.trim()).filter(Boolean).slice(0, 15),
    coverageSqFt: (product.coverageSqFt || '').trim().slice(0, 120),
    dryingTime: (product.dryingTime || '').trim().slice(0, 120),
    finish: product.finish || 'Gloss',
    prices: cleanPrices,
    defaultSize: safeDefaultSize,
    popular: Boolean(product.popular),
    active: product.active !== false,
    order: typeof product.order === 'number' ? product.order : (indexOrder ?? 999),
    image: (product.image || '').trim().slice(0, 1000),
    updatedAt: new Date().toISOString(),
  };
}

export async function seedAllProductsToFirestore(defaultProducts: Product[]): Promise<number> {
  try {
    const batch = writeBatch(db);
    defaultProducts.forEach((product, idx) => {
      const ref = doc(db, PRODUCTS_COL, product.id);
      batch.set(ref, sanitizeProductPayload(product, idx));
    });
    await batch.commit();
    return defaultProducts.length;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PRODUCTS_COL);
  }
}

export async function seedMissingProductsToFirestore(defaultProducts: Product[]): Promise<number> {
  try {
    const snap = await getDocs(collection(db, PRODUCTS_COL));
    const existingIds = new Set(snap.docs.map((d) => d.id));
    const missing = defaultProducts.filter((p) => !existingIds.has(p.id));
    if (missing.length === 0) return 0;

    const batch = writeBatch(db);
    missing.forEach((product, idx) => {
      const ref = doc(db, PRODUCTS_COL, product.id);
      batch.set(ref, sanitizeProductPayload(product, defaultProducts.indexOf(product) || idx));
    });
    await batch.commit();
    return missing.length;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PRODUCTS_COL);
  }
}

export async function upsertProductInFirestore(product: Product): Promise<void> {
  const path = `${PRODUCTS_COL}/${product.id}`;
  try {
    const ref = doc(db, PRODUCTS_COL, product.id);
    await setDoc(ref, sanitizeProductPayload(product), { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const path = `${PRODUCTS_COL}/${productId}`;
  try {
    await deleteDoc(doc(db, PRODUCTS_COL, productId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveSiteSettingsToFirestore(settings: SiteSettings): Promise<void> {
  const path = `${SITE_CONFIG_COL}/${SITE_CONFIG_DOC}`;
  try {
    await setDoc(
      doc(db, SITE_CONFIG_COL, SITE_CONFIG_DOC),
      {
        brandName: settings.brandName.trim().slice(0, 120),
        galleryName: settings.galleryName.trim().slice(0, 160),
        parentIndustry: settings.parentIndustry.trim().slice(0, 160),
        taglineEnglish: settings.taglineEnglish.trim().slice(0, 300),
        ceo: settings.ceo.trim().slice(0, 120),
        contactPerson: settings.contactPerson.trim().slice(0, 120),
        phone1: settings.phone1.trim().slice(0, 40),
        phone1Raw: settings.phone1Raw.trim().slice(0, 40),
        phone2: settings.phone2.trim().slice(0, 40),
        phone2Raw: settings.phone2Raw.trim().slice(0, 40),
        email: settings.email.trim().slice(0, 160),
        website: settings.website.trim().slice(0, 300),
        domain: settings.domain.trim().slice(0, 160),
        priceListDate: settings.priceListDate.trim().slice(0, 120),
        address: settings.address.trim().slice(0, 300),
        heroImage: settings.heroImage.trim().slice(0, 1000),
        aboutImage: settings.aboutImage.trim().slice(0, 1000),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function createQuotationInFirestore(
  payload: Omit<QuotationRecord, 'id' | 'createdAt' | 'status'>
): Promise<void> {
  const safeId = `qt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const path = `${QUOTATIONS_COL}/${safeId}`;
  try {
    await setDoc(doc(db, QUOTATIONS_COL, safeId), {
      id: safeId,
      orderNumber: payload.orderNumber.slice(0, 40),
      source: payload.source,
      fullName: payload.fullName.trim().slice(0, 120),
      companyShopName: (payload.companyShopName || '').trim().slice(0, 160),
      phone: payload.phone.trim().slice(0, 40),
      city: (payload.city || '').trim().slice(0, 100),
      province: (payload.province || '').trim().slice(0, 100),
      deliveryAddress: (payload.deliveryAddress || '').trim().slice(0, 400),
      orderNotes: (payload.orderNotes || '').trim().slice(0, 1000),
      items: (payload.items || []).slice(0, 100),
      totalAmount: Number(payload.totalAmount) || 0,
      status: 'new',
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    // Log structured error without blocking WhatsApp fallback for public visitors
    console.warn('Quotation Firestore log skipped:', error);
  }
}

export async function updateQuotationStatusInFirestore(
  quotationId: string,
  status: QuotationRecord['status']
): Promise<void> {
  const path = `${QUOTATIONS_COL}/${quotationId}`;
  try {
    await updateDoc(doc(db, QUOTATIONS_COL, quotationId), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteQuotationFromFirestore(quotationId: string): Promise<void> {
  const path = `${QUOTATIONS_COL}/${quotationId}`;
  try {
    await deleteDoc(doc(db, QUOTATIONS_COL, quotationId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
