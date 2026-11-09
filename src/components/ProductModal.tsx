import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, MessageSquare, Shield, Clock, Maximize2, Droplets, Sparkles } from 'lucide-react';
import { Product, PackSizeKey } from '../types';
import { PACK_SIZE_LABELS, COMPANY_DETAILS } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: PackSizeKey, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const availableSizes = Object.keys(product.prices) as PackSizeKey[];
  const [selectedSize, setSelectedSize] = useState<PackSizeKey>(
    product.prices[product.defaultSize] ? product.defaultSize : availableSizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    setSelectedSize(product.prices[product.defaultSize] ? product.defaultSize : availableSizes[0]);
    setQuantity(1);
    setAddedNotice(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product]);

  const currentUnitPrice = product.prices[selectedSize] ?? Object.values(product.prices)[0] ?? 0;
  const totalPrice = currentUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    const sizeName = PACK_SIZE_LABELS[selectedSize] || selectedSize;
    const formattedUnit = currentUnitPrice.toLocaleString('en-PK', { minimumFractionDigits: 2 });
    const formattedTotal = totalPrice.toLocaleString('en-PK', { minimumFractionDigits: 2 });
    const msg = encodeURIComponent(
      `Hello Arooj Star Paint Gallery,\n\nI want to place an order inquiry for:\n\n` +
      `Product: ${product.name}\n` +
      `Product Code: ${product.code}\n` +
      `Pack Size: ${sizeName}\n` +
      `Quantity: ${quantity}\n` +
      `Unit Dealer Rate: Rs. ${formattedUnit}\n` +
      `Estimated Total: Rs. ${formattedTotal}\n\n` +
      `Please confirm stock availability and transport schedule.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone1Raw}?text=${msg}`, '_blank');
  };

  const isWB = product.baseCategoryCode === 'WB';
  const isOB = product.baseCategoryCode === 'OB';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-slate-900 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors cursor-pointer"
          aria-label="Close specification modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Visual & Technical Monogram Showcase */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-950 to-zinc-900 text-white p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-mono font-bold bg-[#c1121f] text-white px-2.5 py-0.5 rounded-md">
                  CODE #{product.code}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {product.baseType}
                </span>
              </div>

              {/* Technical Monogram Showcase */}
              <div className={`rounded-2xl aspect-[4/3] flex flex-col items-center justify-center p-6 text-center mb-6 border border-white/15 relative overflow-hidden ${
                isWB
                  ? 'bg-gradient-to-br from-slate-950 via-zinc-900 to-black'
                  : isOB
                  ? 'bg-gradient-to-br from-neutral-900 via-[#8B1E22] to-black'
                  : 'bg-gradient-to-br from-zinc-950 via-stone-900 to-black'
              }`}>
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg mb-3">
                  <span className="text-3xl font-black text-white">
                    {product.baseCategoryCode}
                  </span>
                </div>
                <span className="text-sm font-black uppercase tracking-wider text-red-300">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-300 mt-1">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Technical Specs */}
              <div className="space-y-3.5 text-xs text-slate-300 border-t border-white/10 pt-5">
                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Coverage:</span>
                  <span className="font-semibold text-white text-right">{product.coverageSqFt}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Drying Time:</span>
                  <span className="font-semibold text-white text-right">{product.dryingTime}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Surface Sheen:</span>
                  <span className="font-semibold text-white text-right">{product.finish}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-400 shrink-0" />
              <span>Certified under Asuzas Paint Chemical Industries standard quality tests.</span>
            </div>
          </div>

          {/* Right Column: Pricing & Pack Sizing */}
          <div className="md:col-span-7 p-7 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1.5">
                <span className="font-bold text-[#c1121f]">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.categoryLabel}</span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 mb-3">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                {product.fullDesc}
              </p>

              {/* Formulation Highlights */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  Formulation Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#c1121f] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pack Sizes */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Select Pack Size
                  </label>
                  <span className="text-xs text-slate-400">Official Dealer Rate</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableSizes.map((sizeKey) => {
                    const price = product.prices[sizeKey]!;
                    const isSelected = selectedSize === sizeKey;
                    return (
                      <button
                        key={sizeKey}
                        type="button"
                        onClick={() => setSelectedSize(sizeKey)}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#c1121f] bg-red-50/40 ring-1 ring-[#c1121f]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">
                          {PACK_SIZE_LABELS[sizeKey] || sizeKey}
                        </div>
                        <div className="text-sm font-black text-[#c1121f] font-mono tabular-nums mt-1">
                          Rs. {price.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-slate-700 hover:bg-slate-200 transition-colors font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold font-mono tabular-nums bg-white min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 text-slate-700 hover:bg-slate-200 transition-colors font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-right ml-auto">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Total Estimated Rate</span>
                  <span className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    Rs. {totalPrice.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                  addedNotice
                    ? 'bg-slate-900 text-white'
                    : 'bg-[#c1121f] hover:bg-[#a50f1b] text-white active:scale-98'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Order List</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Quotation</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="py-3.5 px-5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-[#c1121f]" />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
