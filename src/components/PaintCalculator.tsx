import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, PackSizeKey } from '../types';

interface PaintCalculatorProps {
  onAddToCart: (product: Product, size: PackSizeKey, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const PaintCalculator: React.FC<PaintCalculatorProps> = ({
  onAddToCart,
  onSelectProduct
}) => {
  const [lengthFt, setLengthFt] = useState<number>(14);
  const [widthFt, setWidthFt] = useState<number>(12);
  const [heightFt, setHeightFt] = useState<number>(10);
  const [doors, setDoors] = useState<number>(1);
  const [windows, setWindows] = useState<number>(2);
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(true);
  const [coats, setCoats] = useState<number>(2);
  const [surfaceType, setSurfaceType] = useState<'interior' | 'exterior' | 'putty' | 'enamel' | 'primer'>('interior');

  const presets = [
    { label: 'Standard Room', l: 14, w: 12, h: 10, d: 1, win: 2 },
    { label: 'Master Suite', l: 18, w: 16, h: 10, d: 2, win: 3 },
    { label: 'Living Hall', l: 24, w: 18, h: 11, d: 2, win: 4 },
    { label: 'Villa Exterior', l: 40, w: 30, h: 12, d: 3, win: 6 }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setLengthFt(p.l);
    setWidthFt(p.w);
    setHeightFt(p.h);
    setDoors(p.d);
    setWindows(p.win);
  };

  // Surface calculations
  const wallArea = 2 * (lengthFt * heightFt) + 2 * (widthFt * heightFt);
  const ceilingArea = includeCeiling ? lengthFt * widthFt : 0;
  const deductions = doors * 21 + windows * 15;
  const netSquareFeet = Math.max(0, wallArea + ceilingArea - deductions);

  const coverageMap = {
    interior: { sqFtPerGallon1Coat: 320, defaultProductCode: '8501', label: 'D. Ace Durasilk Anti-Stain' },
    exterior: { sqFtPerGallon1Coat: 280, defaultProductCode: '0100', label: 'D. Ace Weather Defender' },
    putty: { sqFtPerGallon1Coat: 90, defaultProductCode: '0095', label: 'D. Ace Sheesha Putty' },
    enamel: { sqFtPerGallon1Coat: 300, defaultProductCode: '4501', label: 'D. Ace Super Gloss Enamel' },
    primer: { sqFtPerGallon1Coat: 340, defaultProductCode: '9600', label: 'D. Ace Water Based Acrylic Primer' }
  };

  const currentSpec = coverageMap[surfaceType];
  const totalPaintableSqFt = netSquareFeet * coats;
  const rawGallons = totalPaintableSqFt / currentSpec.sqFtPerGallon1Coat;
  const gallonsNeeded = Math.max(1, Math.ceil(rawGallons * 1.1));
  const drummiesNeeded = Math.floor(gallonsNeeded / 4);
  const remainingGallons = gallonsNeeded % 4;

  const matchedProduct = PRODUCTS.find((p) => p.code === currentSpec.defaultProductCode) || PRODUCTS[0];
  const unitPrice = matchedProduct.prices.gallon || Object.values(matchedProduct.prices)[0] || 0;
  const estimatedCost = gallonsNeeded * unitPrice;

  const handleAddBundle = () => {
    onAddToCart(matchedProduct, 'gallon', gallonsNeeded);
  };

  return (
    <section id="calculator" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-2">
            Professional Architectural Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Paint Coverage Calculator
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Calculate exact Gallons, Drummies, and dealer costs based on certified Arooj Star spreading capacities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-5 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Quick Room Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#c1121f] hover:border-[#c1121f] transition-all cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface Type Tabs */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Coating Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'interior', label: 'Interior Emulsion' },
                  { id: 'exterior', label: 'Exterior Weather Shield' },
                  { id: 'putty', label: 'Sheesha Wall Putty' },
                  { id: 'enamel', label: 'Synthetic Enamel' },
                  { id: 'primer', label: 'Sealer & Primer' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSurfaceType(item.id as any)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      surfaceType === item.id
                        ? 'border-[#c1121f] bg-[#c1121f] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Room Dimensions (Feet)
                </label>
                <button
                  type="button"
                  onClick={() => applyPreset(presets[0])}
                  className="text-xs text-slate-500 hover:text-[#c1121f] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Length</span>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="300"
                      value={lengthFt}
                      onChange={(e) => setLengthFt(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-mono font-bold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">ft</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Width</span>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="300"
                      value={widthFt}
                      onChange={(e) => setWidthFt(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-mono font-bold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">ft</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Height</span>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-mono font-bold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">ft</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Doors, Windows & Coats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Doors (21 sq ft)</span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={doors}
                  onChange={(e) => setDoors(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-mono font-bold"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Windows (15 sq ft)</span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={windows}
                  onChange={(e) => setWindows(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-mono font-bold"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Coats</span>
                <select
                  value={coats}
                  onChange={(e) => setCoats(Number(e.target.value))}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-bold cursor-pointer"
                >
                  <option value={1}>1 Coat</option>
                  <option value={2}>2 Coats (Recommended)</option>
                  <option value={3}>3 Coats (Extra Depth)</option>
                </select>
              </div>
            </div>

            {/* Ceiling Checkbox */}
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={includeCeiling}
                onChange={(e) => setIncludeCeiling(e.target.checked)}
                className="w-4 h-4 rounded text-[#c1121f] focus:ring-[#c1121f] cursor-pointer"
              />
              <span>Include ceiling surface area in calculation</span>
            </label>
          </div>

          {/* Results Summary Card (Clean Red Theme, No Blue, No Amber) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-red-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c1121f]">
                  Calculation Result
                </span>
                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {netSquareFeet.toLocaleString()} Sq. Ft. Net
                </span>
              </div>

              {/* Gallons Requirement Display */}
              <div className="mb-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Required Quantity ({coats} {coats > 1 ? 'coats' : 'coat'} + 10% allowance)
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black text-slate-900 font-mono tabular-nums">
                    {gallonsNeeded}
                  </span>
                  <span className="text-xl font-bold text-[#c1121f]">
                    {gallonsNeeded > 1 ? 'Gallons' : 'Gallon'}
                  </span>
                </div>

                {drummiesNeeded > 0 && (
                  <div className="text-xs text-slate-600 font-medium mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    Bulk Packaging Option: <strong>{drummiesNeeded} Drummy</strong> ({drummiesNeeded * 4} Gal)
                    {remainingGallons > 0 ? ` + ${remainingGallons} Gallon(s)` : ''}.
                  </div>
                )}
              </div>

              {/* Matched Product */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
                <div className="text-[10px] font-bold text-[#c1121f] uppercase tracking-wider mb-1">
                  Recommended Formulation
                </div>
                <div className="text-sm font-black text-slate-900 mb-1">
                  {matchedProduct.name}
                </div>
                <div className="text-xs text-slate-500 line-clamp-1 mb-2">
                  Code #{matchedProduct.code} · {matchedProduct.finish}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-500">Official Dealer Rate:</span>
                  <span className="font-mono font-bold text-slate-900">
                    Rs. {unitPrice.toLocaleString('en-PK')} / Gal
                  </span>
                </div>
              </div>

              {/* Estimated Total Price */}
              <div className="pb-5">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Estimated Total Dealer Rate
                </div>
                <div className="text-3xl font-black font-mono tabular-nums text-slate-900">
                  Rs. {estimatedCost.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleAddBundle}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-[#c1121f] hover:bg-[#a50f1b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
              >
                <span>Add {gallonsNeeded} Gallon(s) to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectProduct(matchedProduct)}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors text-center cursor-pointer"
              >
                View Technical Specs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
