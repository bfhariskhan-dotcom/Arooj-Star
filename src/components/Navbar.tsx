import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronDown, Layers, Calculator, Palette, Users, Phone, Star, Film } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string, categoryFilter?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const productCategories = [
    { key: 'all', label: 'All 48+ Products' },
    { key: 'exterior', label: 'Exterior Emulsions (Weather Shields)' },
    { key: 'interior', label: 'Interior Emulsions (Durasilk & Silk Matt)' },
    { key: 'enamels', label: 'Synthetic Enamels & Metallics' },
    { key: 'putties', label: 'Sheesha Wall Putties & Fillers' },
    { key: 'primers', label: 'Primers, Sealers & Anti-Rust' },
    { key: 'wood', label: 'Timberlac Wood Finishes & Thinners' },
  ];

  const toolsItems = [
    { id: 'color-studio', label: 'Color Studio & Room Visualizer', icon: Palette },
    { id: 'calculator', label: 'Paint Coverage Calculator', icon: Calculator },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = () => {
      setProductsDropdownOpen(false);
      setToolsDropdownOpen(false);
    };
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  const handleSelectNav = (id: string, categoryKey?: string) => {
    onNavigate(id, categoryKey);
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setToolsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Brand Name - Text Only (No logo icon) */}
          <button
            onClick={() => handleSelectNav('hero')}
            className="shrink-0 text-left cursor-pointer focus:outline-none"
          >
            <BrandLogo />
          </button>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {/* Home */}
            <button
              onClick={() => handleSelectNav('hero')}
              className={`py-2 transition-colors cursor-pointer ${
                activeSection === 'hero' ? 'text-[#c1121f]' : 'hover:text-[#c1121f]'
              }`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => {
                  setProductsDropdownOpen(!productsDropdownOpen);
                  setToolsDropdownOpen(false);
                }}
                className={`py-2 flex items-center gap-1 transition-colors cursor-pointer ${
                  activeSection === 'products' ? 'text-[#c1121f]' : 'hover:text-[#c1121f]'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${productsDropdownOpen ? 'rotate-180 text-[#c1121f]' : ''}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Product Categories
                  </div>
                  {productCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => handleSelectNav('products', cat.key)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#c1121f] hover:bg-red-50/50 rounded-lg transition-colors cursor-pointer"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tools Dropdown (Color Studio & Calculator) */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setProductsDropdownOpen(false);
                }}
                className={`py-2 flex items-center gap-1 transition-colors cursor-pointer ${
                  activeSection === 'color-studio' || activeSection === 'calculator'
                    ? 'text-[#c1121f]'
                    : 'hover:text-[#c1121f]'
                }`}
              >
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180 text-[#c1121f]' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-1">
                  {toolsItems.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectNav(tool.id)}
                        className="w-full text-left px-3 py-2.5 text-xs font-medium text-slate-700 hover:text-[#c1121f] hover:bg-red-50/50 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-[#c1121f]" />
                        <span>{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Videos */}
            <button
              onClick={() => handleSelectNav('videos')}
              className={`py-2 transition-colors cursor-pointer ${
                activeSection === 'videos' ? 'text-[#c1121f]' : 'hover:text-[#c1121f]'
              }`}
            >
              Videos
            </button>

            {/* About Us */}
            <button
              onClick={() => handleSelectNav('about')}
              className={`py-2 transition-colors cursor-pointer ${
                activeSection === 'about' ? 'text-[#c1121f]' : 'hover:text-[#c1121f]'
              }`}
            >
              About Us
            </button>

            {/* Testimonials */}
            <button
              onClick={() => handleSelectNav('testimonials')}
              className={`py-2 transition-colors cursor-pointer ${
                activeSection === 'testimonials' ? 'text-[#c1121f]' : 'hover:text-[#c1121f]'
              }`}
            >
              Testimonials
            </button>

            {/* Contact Us */}
            <button
              onClick={() => handleSelectNav('contact')}
              className={`py-2 transition-colors cursor-pointer ${
                activeSection === 'contact' ? 'text-[#c1121f]' : 'hover:text-[#c1121f]'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Action Zone: Cart Button (No phone in header as requested) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-95 cursor-pointer"
              aria-label={`View Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart / Quotation</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-black text-[#c1121f] bg-white rounded-full tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-1 text-sm font-semibold">
            {/* Home */}
            <button
              onClick={() => handleSelectNav('hero')}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                activeSection === 'hero' ? 'bg-red-50 text-[#c1121f]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Products Accordion */}
            <div>
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180 text-[#c1121f]' : ''}`} />
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 py-1 space-y-1 bg-slate-50 rounded-lg my-1">
                  {productCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => handleSelectNav('products', cat.key)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:text-[#c1121f]"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tools Accordion */}
            <div>
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsOpen ? 'rotate-180 text-[#c1121f]' : ''}`} />
              </button>
              {mobileToolsOpen && (
                <div className="pl-4 py-1 space-y-1 bg-slate-50 rounded-lg my-1">
                  {toolsItems.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectNav(tool.id)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:text-[#c1121f]"
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Videos */}
            <button
              onClick={() => handleSelectNav('videos')}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                activeSection === 'videos' ? 'bg-red-50 text-[#c1121f]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Videos
            </button>

            {/* About Us */}
            <button
              onClick={() => handleSelectNav('about')}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                activeSection === 'about' ? 'bg-red-50 text-[#c1121f]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            {/* Testimonials */}
            <button
              onClick={() => handleSelectNav('testimonials')}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                activeSection === 'testimonials' ? 'bg-red-50 text-[#c1121f]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Testimonials
            </button>

            {/* Contact Us */}
            <button
              onClick={() => handleSelectNav('contact')}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                activeSection === 'contact' ? 'bg-red-50 text-[#c1121f]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
