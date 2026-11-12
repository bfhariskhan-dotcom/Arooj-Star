/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, FileText, MessageSquare, X, Layers, Check, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORY_TABS, COMPANY_DETAILS } from './data/products';
import { Product, PackSizeKey, CartItem } from './types';
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
    return PRODUCTS.filter((item) => {
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
  }, [activeCategory, baseFilter, searchQuery, sortBy]);

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#c1121f] selection:text-white w-full max-w-full overflow-x-hidden">
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
      />

      {/* About Us Section - Placed directly after Hero banner & slide, showcasing the official poster image */}
      <AboutSection
        onExploreProducts={() => handleNavigate('products')}
        onOpenQuotation={() => setIsCartOpen(true)}
      />

      {/* Product Catalog Section */}
      <main id="products" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden flex-1">
        {/* Catalog Section Header */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <div className="text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-1.5">
            Architectural Paint Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Certified Formulations & Dealer Rates
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-normal">
            Official April 2026 factory rates across Small Tin, Quarter, Gallon, Drummy, and Barrel sizes.
          </p>
        </div>

        {/* Filter Controls Row 1: Category Tabs (Safely Constrained horizontally) */}
        <div className="w-full max-w-full overflow-hidden mb-6">
          <div className="overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
            <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl w-max">
              {CATEGORY_TABS.map((tab) => {
                const isSelected = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveCategory(tab.key);
                      setVisibleProductsCount(6);
                    }}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#c1121f] text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white/70'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-700'
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

        {/* Filter Controls Row 2: Search, Base Filter, Sort - 100% Mobile Safe, No Overflow */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-8 bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200 shadow-xs w-full max-w-full overflow-hidden">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleProductsCount(6);
              }}
              placeholder="Search code (e.g. 0100, 8501) or product name..."
              className="w-full pl-10 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVisibleProductsCount(6);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Base Filters & Sort Row - Compact buttons, wrap safely */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 w-full md:w-auto">
            {/* Chemical Base Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              {[
                { key: 'all', label: 'All' },
                { key: 'WB', label: 'WB' },
                { key: 'OB', label: 'OB' },
                { key: 'VR', label: 'VR' }
              ].map((b) => (
                <button
                  key={b.key}
                  onClick={() => {
                    setBaseFilter(b.key as any);
                    setVisibleProductsCount(6);
                  }}
                  className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    baseFilter === b.key
                      ? 'bg-white text-[#c1121f] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Compact Sort Dropdown (No wide labels that expand mobile width) */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setVisibleProductsCount(6);
                }}
                className="px-3 py-2 text-xs bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#c1121f] cursor-pointer"
              >
                <option value="featured">All Formulations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="code">Product Code</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-8">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-slate-900 font-mono">{displayedProducts.length}</strong> of <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong> formulations</span>
            {searchQuery && (
              <>
                <span aria-hidden="true">·</span>
                <span>Filtered by &ldquo;{searchQuery}&rdquo;</span>
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
              className="text-[#c1121f] hover:underline font-bold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Products Grid with Generous Spacing */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center my-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              No paint formulations matched your criteria. Try adjusting the search query or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setBaseFilter('all');
                setActiveCategory('all');
                setVisibleProductsCount(6);
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#c1121f] rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={handleAddToCart}
                  onSelectProduct={setSelectedProduct}
                />
              ))}
            </div>

            {/* Load More Button (2 rows initial, loads +3 products = 1 row each click) */}
            {visibleProductsCount < filteredProducts.length ? (
              <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisibleProductsCount((prev) => Math.min(prev + 3, filteredProducts.length))}
                  className="px-6 py-3 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl shadow-md hover:shadow-red-900/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Load More Formulations (+3 Products)</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-slate-500 font-medium font-mono">
                  Showing {displayedProducts.length} of {filteredProducts.length} certified products
                </div>
              </div>
            ) : filteredProducts.length > 6 ? (
              <div className="mt-8 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600 border border-slate-200">
                  <Check className="w-4 h-4 text-[#c1121f]" />
                  <span>All {filteredProducts.length} certified formulations loaded</span>
                </span>
              </div>
            ) : null}
          </>
        )}
      </main>

      {/* Interactive Color Studio Section */}
      <ColorVisualizer onSelectProduct={setSelectedProduct} />

      {/* Interactive Paint Coverage Calculator */}
      <PaintCalculator
        onAddToCart={handleAddToCart}
        onSelectProduct={setSelectedProduct}
      />

      {/* Videos Section */}
      <VideoSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Us Section */}
      <ContactSection />

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
      <div className="lg:hidden fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <a
          href={`https://wa.me/${COMPANY_DETAILS.phone1Raw}`}
          target="_blank"
          rel="noreferrer"
          className="w-13 h-13 rounded-full bg-slate-900 border-2 border-[#c1121f] text-white flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          aria-label="Direct WhatsApp inquiry"
        >
          <MessageSquare className="w-6 h-6 text-[#c1121f]" />
        </a>

        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="h-13 px-4 rounded-full bg-[#c1121f] text-white flex items-center gap-2 shadow-xl active:scale-95 transition-transform cursor-pointer"
            aria-label="Open quotation list"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs font-bold font-mono bg-white text-[#c1121f] px-2 py-0.5 rounded-full">
              {totalCartCount}
            </span>
          </button>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
