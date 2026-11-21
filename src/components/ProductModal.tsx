import React, { useState, useEffect } from 'react';
import { X, Check, FileText, MessageSquare, Shield } from 'lucide-react';
import { Product, PackSizeKey } from '../types';
import { PACK_SIZE_LABELS, COMPANY_DETAILS, getPackSizeImage } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: PackSizeKey, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
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
  const displayImage = getPackSizeImage(selectedSize, product.image);
  const isCustomPhoto = Boolean(product.image && product.image.trim().length > 0);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 1100);
  };

  const handleWhatsAppOrder = () => {
    const sizeName = PACK_SIZE_LABELS[selectedSize] || selectedSize;
    const formattedUnit = currentUnitPrice.toLocaleString('en-PK', { minimumFractionDigits: 2 });
    const formattedTotal = totalPrice.toLocaleString('en-PK', { minimumFractionDigits: 2 });
    const msg = encodeURIComponent(
      `Hello Data Arooj Paint Gallery,\n\nOrder inquiry:\n` +
        `Product: ${product.name} (#${product.code})\n` +
        `Size: ${sizeName}\n` +
        `Qty: ${quantity}\n` +
        `Unit Rate: Rs. ${formattedUnit}\n` +
        `Total: Rs. ${formattedTotal}`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone1Raw}?text=${msg}`, '_blank');
  };

  const isWB = product.baseCategoryCode === 'WB';
  const isOB = product.baseCategoryCode === 'OB';

  const leftPanelBg = isWB
    ? 'bg-gradient-to-br from-sky-50 via-indigo-50/70 to-cyan-50'
    : isOB
    ? 'bg-gradient-to-br from-rose-50 via-amber-50/70 to-orange-50'
    : 'bg-gradient-to-br from-emerald-50 via-teal-50/70 to-violet-50';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 via-sky-500 to-violet-600" />

        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-10 p-2 text-slate-600 hover:text-slate-900 bg-white/90 hover:bg-white rounded-md border border-slate-200 shadow-xs transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] overflow-y-auto">
          {/* Light Colorful Left Showcase */}
          <div
            className={`md:col-span-5 ${leftPanelBg} text-slate-900 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200`}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-heading font-bold bg-gradient-to-r from-rose-600 to-orange-500 text-white px-2.5 py-0.5 rounded tabular-nums">
                  #{product.code}
                </span>
                <span className="text-xs text-slate-600 font-semibold">{product.baseType}</span>
              </div>

              <div className="rounded-md aspect-[4/3] flex items-center justify-center mb-5 border border-slate-200 bg-white relative overflow-hidden">
                <img
                  src={displayImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full ${isCustomPhoto ? 'object-cover' : 'object-contain p-3'}`}
                />
                <div className="absolute bottom-2 left-2 bg-white/95 px-2 py-0.5 rounded border border-slate-200 text-[10px] font-bold text-slate-800">
                  {PACK_SIZE_LABELS[selectedSize] || selectedSize}
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 border-t border-slate-200/80 pt-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500">Coverage:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.coverageSqFt}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500">Drying Time:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.dryingTime}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-slate-500">Finish:</span>
                  <span className="font-semibold text-slate-900 text-right">{product.finish}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Certified under {COMPANY_DETAILS.galleryName}.</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                <span className="font-bold text-rose-600">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.categoryLabel}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 font-heading">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {product.fullDesc}
              </p>

              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Pack Size
                  </label>
                  <span className="text-xs text-slate-400">Dealer Rate</span>
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
                        className={`p-2.5 text-left rounded-md border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-500'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">
                          {PACK_SIZE_LABELS[sizeKey] || sizeKey}
                        </div>
                        <div className="text-sm font-black text-rose-600 font-heading tabular-nums mt-0.5">
                          Rs. {price.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Qty:
                </label>
                <div className="flex items-center border border-slate-300 rounded-md overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-slate-700 hover:bg-slate-200 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-1 text-sm font-bold font-heading tabular-nums bg-white min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-slate-700 hover:bg-slate-200 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-right ml-auto">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                    Estimated Total
                  </span>
                  <span className="text-lg font-black text-slate-900 font-heading tabular-nums">
                    Rs. {totalPrice.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-md font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                  addedNotice
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 hover:opacity-95 text-white'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Quote</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Add to Quotation</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="py-3 px-4 rounded-md font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
