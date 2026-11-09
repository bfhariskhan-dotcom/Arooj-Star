/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, MessageSquare, X, Layers, ArrowUpDown, ShieldCheck } from 'lucide-react';
import { PRODUCTS, CATEGORY_TABS, COMPANY_DETAILS } from './data/products';
import { Product, PackSizeKey, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ColorVisualizer } from './components/ColorVisualizer';
import { PaintCalculator } from './components/PaintCalculator';
import { VideoSection } from './components/VideoSection';
import { LeadershipSection } from './components/LeadershipSection';
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

  const handleNavigate = (sectionId: string, categoryFilter?: string) => {
    setActiveSection(sectionId);
    if (categoryFilter) {
      setActiveCategory(categoryFilter);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#c1121f] selection:text-white">
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

      {/* Product Catalog Section */}
      <main id="products" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Catalog Section Header with Generous Spacing */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>Complete Architectural Catalog</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">48+ Ready Mix Formulations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Certified Products & Dealer Rates
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
            Select any product to view full technical specifications, coverage rates, and live pricing across Small Tin, Quarter, Gallon, Drummy, or 200L Barrel sizes.
          </p>
        </div>

        {/* Filter Controls Row 1: Category Tabs */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl min-w-max">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
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

        {/* Filter Controls Row 2: Search, Base Filter, Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code (e.g. 0100, 8501) or product name..."
              className="w-full pl-10 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Chemical Base Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden md:inline font-bold">Base:</span>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'WB', label: 'WB (Water)' },
                  { key: 'OB', label: 'OB (Oil)' },
                  { key: 'VR', label: 'VR (Wood)' }
                ].map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setBaseFilter(b.key as any)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      baseFilter === b.key
                        ? 'bg-white text-[#c1121f] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-2.5 text-xs bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#c1121f] cursor-pointer"
              >
                <option value="featured">Featured / Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="code">Product Code (Numeric)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-8">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong> formulations</span>
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
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#c1121f] rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={handleAddToCart}
                onSelectProduct={setSelectedProduct}
              />
            ))}
          </div>
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

      {/* About Us & Leadership */}
      <LeadershipSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Us Section */}
      <ContactSection />

      {/* Cart Drawer */}
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
            className="h-13 px-4 rounded-full bg-[#c1121f] text-white flex items-center gap-2 shadow-xl active:scale-95 transition-transform"
            aria-label="Open quotation cart"
          >
            <ShoppingBag className="w-5 h-5" />
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
