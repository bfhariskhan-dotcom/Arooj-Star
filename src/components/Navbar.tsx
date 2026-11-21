import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, ChevronDown, Calculator, Palette } from 'lucide-react';
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
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const productCategories = [
    { key: 'all', label: 'All 48+ Products' },
    { key: 'exterior', label: 'Exterior Emulsions' },
    { key: 'interior', label: 'Interior Emulsions' },
    { key: 'enamels', label: 'Synthetic Enamels' },
    { key: 'putties', label: 'Sheesha Wall Putties' },
    { key: 'primers', label: 'Primers & Sealers' },
    { key: 'wood', label: 'Wood Coatings & Thinners' },
  ];

  const toolsItems = [
    { id: 'color-studio', label: 'Color Studio', icon: Palette },
    { id: 'calculator', label: 'Paint Calculator', icon: Calculator },
  ];

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-16">
          {/* Brand Name - Compact 2 lines */}
          <button
            onClick={() => handleSelectNav('hero')}
            className="shrink-0 text-left cursor-pointer focus:outline-none"
          >
            <BrandLogo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleSelectNav('hero')}
              className={`py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'hero' ? 'text-rose-600' : 'hover:text-rose-600'
              }`}
            >
              Home
            </button>

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => {
                  setProductsDropdownOpen(!productsDropdownOpen);
                  setToolsDropdownOpen(false);
                }}
                className={`py-2 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeSection === 'products' ? 'text-rose-600' : 'hover:text-rose-600'
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    productsDropdownOpen ? 'rotate-180 text-rose-600' : ''
                  }`}
                />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-60 bg-white rounded-lg shadow-xl border border-slate-200 p-1.5 z-50">
                  {productCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => handleSelectNav('products', cat.key)}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50/70 rounded-md transition-colors cursor-pointer"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setProductsDropdownOpen(false);
                }}
                className={`py-2 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeSection === 'color-studio' || activeSection === 'calculator'
                    ? 'text-rose-600'
                    : 'hover:text-rose-600'
                }`}
              >
                <span>Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    toolsDropdownOpen ? 'rotate-180 text-rose-600' : ''
                  }`}
                />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-lg shadow-xl border border-slate-200 p-1.5 z-50">
                  {toolsItems.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectNav(tool.id)}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50/70 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-rose-600" />
                        <span>{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => handleSelectNav('videos')}
              className={`py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'videos' ? 'text-rose-600' : 'hover:text-rose-600'
              }`}
            >
              Videos
            </button>

            <button
              onClick={() => handleSelectNav('about')}
              className={`py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'about' ? 'text-rose-600' : 'hover:text-rose-600'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleSelectNav('contact')}
              className={`py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'contact' ? 'text-rose-600' : 'hover:text-rose-600'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 rounded-md shadow-xs transition-all whitespace-nowrap active:scale-95 cursor-pointer"
              aria-label={`View Quotations with ${cartCount} items`}
            >
              <FileText className="w-4 h-4" />
              <span>Quotation</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-black text-rose-700 bg-white rounded tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-xl max-h-[82vh] overflow-y-auto">
          <div className="flex flex-col gap-1 text-sm font-semibold">
            <button
              onClick={() => handleSelectNav('hero')}
              className={`text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === 'hero' ? 'bg-rose-50 text-rose-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <div>
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180 text-rose-600' : ''}`}
                />
              </button>
              {mobileProductsOpen && (
                <div className="pl-3 py-1 space-y-1 bg-slate-50 rounded-md my-1">
                  {productCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => handleSelectNav('products', cat.key)}
                      className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
              >
                <span>Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileToolsOpen ? 'rotate-180 text-rose-600' : ''}`}
                />
              </button>
              {mobileToolsOpen && (
                <div className="pl-3 py-1 space-y-1 bg-slate-50 rounded-md my-1">
                  {toolsItems.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectNav(tool.id)}
                      className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600"
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleSelectNav('videos')}
              className="text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Videos
            </button>

            <button
              onClick={() => handleSelectNav('about')}
              className="text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              About Us
            </button>

            <button
              onClick={() => handleSelectNav('contact')}
              className="text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
