/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, FileText, MessageSquare, X, Check, ChevronDown } from 'lucide-react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db, testConnection } from './lib/firebase';
import { PRODUCTS, CATEGORY_TABS, COMPANY_DETAILS } from './data/products';
import { Product, PackSizeKey, CartItem, SiteSettings } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ColorVisualizer } from './components/ColorVisualizer';
import { PaintCalculator } from './components/PaintCalculator';
import { VideoSection } from './components/VideoSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { TopMarquee } from './components/TopMarquee';
import { AdminPortal } from './components/AdminPortal';
import { CursorLightning } from './components/CursorLightning';

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: COMPANY_DETAILS.brandName,
  galleryName: COMPANY_DETAILS.galleryName,
  parentIndustry: COMPANY_DETAILS.parentIndustry,
  taglineEnglish: COMPANY_DETAILS.taglineEnglish,
  ceo: COMPANY_DETAILS.ceo,
  contactPerson: COMPANY_DETAILS.contactPerson,
  phone1: COMPANY_DETAILS.phone1,
  phone1Raw: COMPANY_DETAILS.phone1Raw,
  phone2: COMPANY_DETAILS.phone2,
  phone2Raw: COMPANY_DETAILS.phone2Raw,
  email: COMPANY_DETAILS.email,
  website: COMPANY_DETAILS.website,
  domain: COMPANY_DETAILS.domain,
  address: COMPANY_DETAILS.address,
  priceListDate: COMPANY_DETAILS.priceListDate,
  heroImage: COMPANY_DETAILS.heroImage,
  aboutImage: COMPANY_DETAILS.aboutImage,
  socialLinks: COMPANY_DETAILS.socialLinks,
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filtering & Search
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [baseFilter, setBaseFilter] = useState<'all' | 'WB' | 'OB' | 'VR'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'code'>('featured');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Load More: Start with 6 products (2 rows on 3-col desktop grid)
  const [visibleProductsCount, setVisibleProductsCount] = useState<number>(6);

  // Live Firestore Data & Admin Routing
  const [firestoreProducts, setFirestoreProducts] = useState<Product[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#admin';
    }
    return false;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    testConnection();

    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      (snap) => {
        const docs = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Product, 'id'>),
        }));
        setFirestoreProducts(docs);
      },
      () => {
        // Fallback silently to bundled PRODUCTS catalog if Firestore rules block or offline
      }
    );

    const unsubSettings = onSnapshot(
      doc(db, 'siteConfig', 'main'),
      (snap) => {
        if (snap.exists()) {
          setSiteSettings({
            ...DEFAULT_SITE_SETTINGS,
            ...(snap.data() as Partial<SiteSettings>),
          });
        }
      },
      () => {
        // Fallback silently to DEFAULT_SITE_SETTINGS
      }
    );

    return () => {
      unsubProducts();
      unsubSettings();
    };
  }, []);

  // Merge Firestore products with default catalog cleanly:
  // - If Firestore has 0 docs: show all 48 bundled defaults.
  // - If Firestore has partial docs (< 40): overlay Firestore edits/new items onto bundled defaults so nothing disappears before full sync.
  // - If Firestore has >= 40 docs (full catalog synced): treat Firestore as authoritative so admin deletions/additions take full effect.
  const adminProducts = useMemo(() => {
    if (firestoreProducts.length === 0) {
      return PRODUCTS;
    }

    const sortList = (list: Product[]) =>
      [...list].sort((a, b) => {
        if (typeof a.order === 'number' && typeof b.order === 'number') {
          return a.order - b.order;
        }
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return a.code.localeCompare(b.code);
      });

    if (firestoreProducts.length >= 40) {
      return sortList(firestoreProducts);
    }

    const map = new Map<string, Product>();
    PRODUCTS.forEach((p, idx) => map.set(p.id, { ...p, order: p.order ?? idx }));
    firestoreProducts.forEach((fp) => map.set(fp.id, fp));
    return sortList(Array.from(map.values()));
  }, [firestoreProducts]);

  // Public storefront excludes products marked active === false
  const storefrontProducts = useMemo(() => {
    return adminProducts.filter((p) => p.active !== false);
  }, [adminProducts]);

  // Dynamic category tab counts
  const dynamicCategoryTabs = useMemo(() => {
    return CATEGORY_TABS.map((tab) => ({
      ...tab,
      count:
        tab.key === 'all'
          ? storefrontProducts.length
          : storefrontProducts.filter((p) => p.category === tab.key).length,
    }));
  }, [storefrontProducts]);

  const openAdminPortal = () => {
    setIsAdminView(true);
    window.location.hash = 'admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exitAdminPortal = () => {
    setIsAdminView(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: PackSizeKey, quantity: number) => {
    const unitPrice = product.prices[size] ?? Object.values(product.prices)[0] ?? 0;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedSize === size
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [...prev, { product, selectedSize: size, quantity, unitPrice }];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, it) => acc + it.quantity, 0);
  }, [cartItems]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return storefrontProducts.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Base chemical type match
      if (baseFilter !== 'all' && item.baseCategoryCode !== baseFilter) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCode = item.code.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        const matchesDesc = item.shortDesc.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesBrand && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceA = a.prices[a.defaultSize] ?? 0;
        const priceB = b.prices[b.defaultSize] ?? 0;
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = a.prices[a.defaultSize] ?? 0;
        const priceB = b.prices[b.defaultSize] ?? 0;
        return priceB - priceA;
      }
      if (sortBy === 'code') {
        return a.code.localeCompare(b.code);
      }
      // 'featured'
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [storefrontProducts, activeCategory, baseFilter, searchQuery, sortBy]);

  // Display only 2 rows initially, expand with Load More
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleProductsCount);
  }, [filteredProducts, visibleProductsCount]);

  const handleNavigate = (sectionId: string, categoryFilter?: string) => {
    setActiveSection(sectionId);
    if (categoryFilter) {
      setActiveCategory(categoryFilter);
      setVisibleProductsCount(6);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminView) {
    return (
      <>
        <CursorLightning />
        <AdminPortal
          products={adminProducts}
          firestoreSyncedCount={firestoreProducts.length}
          siteSettings={siteSettings}
          onExitAdmin={exitAdminPortal}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-rose-600 selection:text-white w-full max-w-full overflow-x-hidden">
      <CursorLightning />

      {/* Auto-scrolling Continuous Marquee Ticker */}
      <TopMarquee />

      {/* Main Top Navigation with Dropdowns */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <Hero
        onExploreCatalog={() => handleNavigate('products')}
        heroImage={siteSettings.heroImage}
      />

      {/* About Us Section */}
      <AboutSection
        onExploreProducts={() => handleNavigate('products')}
        onOpenQuotation={() => setIsCartOpen(true)}
        siteSettings={siteSettings}
      />

      {/* Product Catalog Section */}
      <main id="products" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden flex-1">
        <div className="max-w-2xl mb-6">
          <div className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 via-amber-500 to-blue-600 bg-clip-text text-transparent mb-1">
            Official Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Certified Paints &amp; Dealer Rates
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {siteSettings.priceListDate || 'April 2026'} rates across Small Tin, Quarter, Gallon, Drummy, and Barrel.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="w-full max-w-full overflow-hidden mb-4">
          <div className="overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg w-max">
              {dynamicCategoryTabs.map((tab) => {
                const isSelected = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveCategory(tab.key);
                      setVisibleProductsCount(6);
                    }}
                    className={`px-3.5 py-2 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white/80'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 rounded tabular-nums font-heading tabular-nums ${
                        isSelected ? 'bg-white/25 text-white' : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Controls Row 2 */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 mb-6 bg-white p-3 rounded-lg border border-slate-200 shadow-xs w-full max-w-full overflow-hidden">
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleProductsCount(6);
              }}
              placeholder="Search code (0100, 8501) or product name..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVisibleProductsCount(6);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 w-full md:w-auto">
            <div className="flex items-center bg-slate-100 p-1 rounded-md">
              {[
                { key: 'all', label: 'All' },
                { key: 'WB', label: 'WB' },
                { key: 'OB', label: 'OB' },
                { key: 'VR', label: 'VR' },
              ].map((b) => (
                <button
                  key={b.key}
                  onClick={() => {
                    setBaseFilter(b.key as 'all' | 'WB' | 'OB' | 'VR');
                    setVisibleProductsCount(6);
                  }}
                  className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                    baseFilter === b.key
                      ? 'bg-white text-rose-600 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'code');
                  setVisibleProductsCount(6);
                }}
                className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-md text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="code">Product Code</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-slate-900 font-heading tabular-nums">{displayedProducts.length}</strong> of{' '}
              <strong className="text-slate-900 font-heading tabular-nums">{filteredProducts.length}</strong> products
            </span>
            {searchQuery && (
              <>
                <span aria-hidden="true">·</span>
                <span>&ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
          </div>

          {(searchQuery || baseFilter !== 'all' || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setBaseFilter('all');
                setActiveCategory('all');
                setVisibleProductsCount(6);
              }}
              className="text-rose-600 hover:underline font-bold cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center my-4">
            <div className="w-12 h-12 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">No products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setBaseFilter('all');
                setActiveCategory('all');
                setVisibleProductsCount(6);
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-orange-500 rounded-md cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {displayedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={handleAddToCart}
                  onSelectProduct={setSelectedProduct}
                />
              ))}
            </div>

            {visibleProductsCount < filteredProducts.length ? (
              <div className="mt-8 flex flex-col items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleProductsCount((prev) => Math.min(prev + 3, filteredProducts.length))
                  }
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-orange-500 to-blue-600 hover:opacity-95 rounded-md shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Load More (+3 Products)</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-slate-500 font-heading tabular-nums">
                  {displayedProducts.length} / {filteredProducts.length} loaded
                </div>
              </div>
            ) : filteredProducts.length > 6 ? (
              <div className="mt-8 text-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>All {filteredProducts.length} products loaded</span>
                </span>
              </div>
            ) : null}
          </>
        )}
      </main>

      {/* Interactive Color Studio Section */}
      <ColorVisualizer onSelectProduct={setSelectedProduct} />

      {/* Interactive Paint Coverage Calculator */}
      <PaintCalculator onAddToCart={handleAddToCart} onSelectProduct={setSelectedProduct} />

      {/* Videos Section */}
      <VideoSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Us Section */}
      <ContactSection siteSettings={siteSettings} />

      {/* Quotation Request Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Specification Modal (PDP) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Bottom Quick Action on Mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30 flex items-center gap-2">
        <a
          href={`https://wa.me/${siteSettings.phone1Raw || COMPANY_DETAILS.phone1Raw}`}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-lg bg-white border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          aria-label="Direct WhatsApp inquiry"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="h-12 px-3.5 rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 text-white flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
            aria-label="Open quotation list"
          >
            <FileText className="w-4 h-4" />
            <span className="text-xs font-bold font-heading tabular-nums bg-white text-rose-600 px-1.5 py-0.5 rounded">
              {totalCartCount}
            </span>
          </button>
        )}
      </div>

      {/* Footer */}
      <Footer onOpenAdmin={openAdminPortal} siteSettings={siteSettings} />
    </div>
  );
}
