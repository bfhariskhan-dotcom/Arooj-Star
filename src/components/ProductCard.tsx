import React, { useState } from 'react';
import { ShoppingBag, Eye, MessageSquare, Check } from 'lucide-react';
import { Product, PackSizeKey } from '../types';
import { PACK_SIZE_LABELS, COMPANY_DETAILS } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: PackSizeKey, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct
}) => {
  const availableSizes = Object.keys(product.prices) as PackSizeKey[];
  const [selectedSize, setSelectedSize] = useState<PackSizeKey>(
    product.prices[product.defaultSize] ? product.defaultSize : availableSizes[0]
  );
  const [addedNotice, setAddedNotice] = useState(false);

  const currentPrice = product.prices[selectedSize] ?? Object.values(product.prices)[0] ?? 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sizeName = PACK_SIZE_LABELS[selectedSize] || selectedSize;
    const priceText = currentPrice.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const text = encodeURIComponent(
      `Hello Arooj Star, I am inquiring about:\n\nProduct: ${product.name} (Code: ${product.code})\nPack Size: ${sizeName}\nDealer Rate: Rs. ${priceText}\n\nPlease confirm stock and delivery timeline.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone1Raw}?text=${text}`, '_blank');
  };

  // Color palette for base code badges
  const isWB = product.baseCategoryCode === 'WB';
  const isOB = product.baseCategoryCode === 'OB';

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Signature Technical Badge Showcase Area (as requested by user) */}
      <div className={`relative aspect-[16/10] overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none ${
        isWB
          ? 'bg-gradient-to-br from-slate-950 via-zinc-900 to-black text-white'
          : isOB
          ? 'bg-gradient-to-br from-neutral-900 via-[#8B1E22] to-black text-white'
          : 'bg-gradient-to-br from-zinc-950 via-stone-900 to-black text-white'
      }`}>
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[11px] font-mono font-bold bg-white/15 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md border border-white/20">
            #{product.code}
          </span>
          {product.popular && (
            <span className="text-[10px] font-bold bg-[#c1121f] text-white px-2 py-0.5 rounded-md tracking-wider uppercase">
              Popular
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-semibold bg-white/10 backdrop-blur-md text-slate-200 px-2.5 py-0.5 rounded-md border border-white/10">
            {product.finish}
          </span>
        </div>

        {/* Center Iconic Chemical Base Monogram Badge (WB / OB / VR) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-red-400 transition-all duration-300">
            <span className="text-2xl font-black tracking-wider text-white">
              {product.baseCategoryCode}
            </span>
          </div>

          <span className="text-xs font-bold tracking-widest uppercase text-red-300 mt-2.5">
            Arooj Star
          </span>
          <span className="text-[11px] text-slate-300 font-medium">
            {product.baseType}
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-transform flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#c1121f]" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Content Body with Spacious Layout */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2">
            <span className="text-[#c1121f] font-bold">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#c1121f] transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-5">
            {product.shortDesc}
          </p>

          {/* Pack Size Segmented Control */}
          <div className="mb-5">
            <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2">
              Pack Size
            </div>
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl">
              {availableSizes.map((sizeKey) => {
                const isSelected = selectedSize === sizeKey;
                const shortLabel =
                  sizeKey === 'smallTin'
                    ? 'Small'
                    : sizeKey === 'quarter'
                    ? 'Quarter'
                    : sizeKey === 'gallon'
                    ? 'Gallon'
                    : sizeKey === 'drummy'
                    ? 'Drummy'
                    : 'Barrel';

                return (
                  <button
                    key={sizeKey}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(sizeKey);
                    }}
                    className={`flex-1 min-w-[52px] py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap text-center cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#c1121f] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Official Dealer Rate
            </span>
            <div className="text-lg font-black text-slate-900 font-mono tabular-nums leading-tight mt-0.5">
              Rs. {currentPrice.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleWhatsApp}
              title="Inquire on WhatsApp"
              className="p-2.5 text-[#c1121f] hover:bg-red-50 border border-red-200 rounded-xl transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                addedNotice
                  ? 'bg-slate-900 text-white'
                  : 'bg-[#c1121f] hover:bg-[#a50f1b] text-white active:scale-95'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
