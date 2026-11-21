import React, { useState } from 'react';
import { FileText, Eye, MessageSquare, Check } from 'lucide-react';
import { Product, PackSizeKey } from '../types';
import { PACK_SIZE_LABELS, COMPANY_DETAILS, getPackSizeImage } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: PackSizeKey, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  const availableSizes = Object.keys(product.prices) as PackSizeKey[];
  const [selectedSize, setSelectedSize] = useState<PackSizeKey>(
    product.prices[product.defaultSize] ? product.defaultSize : availableSizes[0]
  );
  const [addedNotice, setAddedNotice] = useState(false);

  const currentPrice = product.prices[selectedSize] ?? Object.values(product.prices)[0] ?? 0;
  const displayImage = getPackSizeImage(selectedSize, product.image);
  const isCustomPhoto = Boolean(product.image && product.image.trim().length > 0);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sizeName = PACK_SIZE_LABELS[selectedSize] || selectedSize;
    const priceText = currentPrice.toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const text = encodeURIComponent(
      `Hello Data Arooj Paint Gallery, inquiry for:\n\nProduct: ${product.name} (#${product.code})\nPack Size: ${sizeName}\nDealer Rate: Rs. ${priceText}`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone1Raw}?text=${text}`, '_blank');
  };

  const isWB = product.baseCategoryCode === 'WB';
  const isOB = product.baseCategoryCode === 'OB';

  const topAccentGradient = isWB
    ? 'from-sky-500 via-blue-600 to-violet-600'
    : isOB
    ? 'from-rose-600 via-orange-500 to-amber-500'
    : 'from-emerald-600 via-teal-500 to-sky-600';

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-white rounded-lg border border-slate-200 hover:border-rose-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Top Spectrum Accent Line */}
      <div className={`h-1 w-full bg-gradient-to-r ${topAccentGradient}`} />

      {/* Paint Container Product Photo (Quarter / Gallon / Drum) or Custom Uploaded Image */}
      <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-50 to-white select-none">
        <img
          src={displayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
            isCustomPhoto ? 'object-cover object-center' : 'object-contain p-2 sm:p-3'
          }`}
        />

        {/* Top Corner Badges */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
          <span className="text-[10px] sm:text-[11px] font-heading font-bold bg-white/95 text-slate-900 px-1.5 sm:px-2 py-0.5 rounded border border-slate-200 shadow-xs tabular-nums">
            #{product.code}
          </span>
          {product.popular && (
            <span className="hidden sm:inline-block text-[10px] font-bold bg-gradient-to-r from-rose-600 to-orange-500 text-white px-2 py-0.5 rounded uppercase shadow-xs">
              Popular
            </span>
          )}
        </div>

        <div className="hidden sm:block absolute top-2 right-2 z-10">
          <span className="text-[10px] font-semibold bg-white/95 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
            {product.finish}
          </span>
        </div>

        {/* Base Type Tag bottom-left */}
        <div className="absolute bottom-1.5 left-2 z-10 flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-slate-800 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200">
          <span className="text-rose-600 font-heading">{product.baseCategoryCode}</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline">{product.finish}</span>
        </div>

        {/* Hover View Details Overlay */}
        <div className="hidden sm:flex absolute inset-0 bg-white/55 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-blue-600 rounded-md shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Card Body - Responsive for 2-Column Mobile & 3-Column Desktop */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 font-medium mb-0.5">
            <span className="text-rose-600 font-bold truncate">{product.brand}</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline truncate">{product.categoryLabel}</span>
          </div>

          <h3 className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 sm:line-clamp-1 mb-1 font-heading leading-snug">
            {product.name}
          </h3>

          <p className="hidden sm:block text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {product.shortDesc}
          </p>

          {/* Pack Size Selector */}
          <div className="mt-1.5 mb-2.5 sm:mb-4">
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-md">
              {availableSizes.map((sizeKey) => {
                const isSelected = selectedSize === sizeKey;
                const shortLabel =
                  sizeKey === 'smallTin'
                    ? 'Small'
                    : sizeKey === 'quarter'
                    ? 'Qtr'
                    : sizeKey === 'gallon'
                    ? 'Gal'
                    : sizeKey === 'drummy'
                    ? 'Drum'
                    : 'Brl';

                const desktopLabel =
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
                    className={`flex-1 min-w-[34px] sm:min-w-[46px] py-1 text-[10px] sm:text-[11px] font-semibold rounded transition-all whitespace-nowrap text-center cursor-pointer ${
                      isSelected
                        ? 'bg-white text-rose-600 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="sm:hidden">{shortLabel}</span>
                    <span className="hidden sm:inline">{desktopLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 sm:pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Dealer Rate
            </span>
            <div className="text-xs sm:text-lg font-black text-slate-900 font-heading tabular-nums leading-tight">
              Rs. {currentPrice.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={handleWhatsApp}
              title="Inquire on WhatsApp"
              className="p-1.5 sm:p-2 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 rounded-md transition-colors cursor-pointer shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-md shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                addedNotice
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-rose-600 to-orange-500 hover:opacity-95 text-white'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>+ Quote</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
