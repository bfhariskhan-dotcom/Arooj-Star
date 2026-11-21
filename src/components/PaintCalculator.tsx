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
  onSelectProduct,
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
    { label: 'Villa Exterior', l: 40, w: 30, h: 12, d: 3, win: 6 },
  ];

  const applyPreset = (p: (typeof presets)[0]) => {
    setLengthFt(p.l);
    setWidthFt(p.w);
    setHeightFt(p.h);
    setDoors(p.d);
    setWindows(p.win);
  };

  const wallArea = 2 * (lengthFt * heightFt) + 2 * (widthFt * heightFt);
  const ceilingArea = includeCeiling ? lengthFt * widthFt : 0;
  const deductionArea = doors * 21 + windows * 15;
  const netSquareFeet = Math.max(0, wallArea + ceilingArea - deductionArea);

  const coveragePerGallon =
    surfaceType === 'putty' ? 160 : surfaceType === 'primer' ? 240 : 300;
  const rawGallons = (netSquareFeet * coats) / coveragePerGallon;
  const gallonsNeeded = Math.max(1, Math.ceil(rawGallons * 1.1));
  const drummiesNeeded = Math.floor(gallonsNeeded / 4);
  const remainingGallons = gallonsNeeded % 4;

  const matchedCode =
    surfaceType === 'exterior'
      ? '0100'
      : surfaceType === 'putty'
      ? '0095'
      : surfaceType === 'enamel'
      ? '6100'
      : surfaceType === 'primer'
      ? '0085'
      : '8501';

  const matchedProduct = PRODUCTS.find((p) => p.code === matchedCode) || PRODUCTS[0];
  const unitPrice = matchedProduct.prices.gallon ?? Object.values(matchedProduct.prices)[0] ?? 0;
  const estimatedCost = unitPrice * gallonsNeeded;

  const handleAddBundle = () => {
    onAddToCart(matchedProduct, 'gallon', gallonsNeeded);
  };

  return (
    <section id="calculator" className="py-10 sm:py-14 bg-white border-t border-slate-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6">
          <div className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 via-amber-500 to-blue-600 bg-clip-text text-transparent mb-1">
            Paint Coverage Calculator
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Estimate Gallons &amp; Cost Instantly
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Enter room dimensions to calculate exact paint quantity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-50 to-sky-50/40 rounded-lg p-5 sm:p-6 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-rose-50 hover:text-rose-600 border border-slate-200 rounded transition-colors cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => applyPreset(presets[0])}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="mb-5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Surface Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {[
                  { key: 'interior', label: 'Interior' },
                  { key: 'exterior', label: 'Exterior' },
                  { key: 'enamel', label: 'Enamel' },
                  { key: 'putty', label: 'Putty' },
                  { key: 'primer', label: 'Primer' },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSurfaceType(s.key as 'interior' | 'exterior' | 'putty' | 'enamel' | 'primer')}
                    className={`py-2 px-2 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                      surfaceType === s.key
                        ? 'bg-gradient-to-r from-rose-600 to-orange-500 text-white border-transparent shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Length (ft)</span>
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={lengthFt}
                  onChange={(e) => setLengthFt(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 font-heading tabular-nums font-bold"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Width (ft)</span>
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={widthFt}
                  onChange={(e) => setWidthFt(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 font-heading tabular-nums font-bold"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Height (ft)</span>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={heightFt}
                  onChange={(e) => setHeightFt(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 font-heading tabular-nums font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Doors</span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={doors}
                  onChange={(e) => setDoors(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 font-heading tabular-nums font-bold"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Windows</span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={windows}
                  onChange={(e) => setWindows(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 font-heading tabular-nums font-bold"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Coats</span>
                <select
                  value={coats}
                  onChange={(e) => setCoats(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 font-bold cursor-pointer"
                >
                  <option value={1}>1 Coat</option>
                  <option value={2}>2 Coats</option>
                  <option value={3}>3 Coats</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={includeCeiling}
                onChange={(e) => setIncludeCeiling(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
              />
              <span>Include ceiling area</span>
            </label>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-slate-200 flex flex-col justify-between relative overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 to-blue-600 absolute top-0 left-0" />
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Estimate Result
                </span>
                <span className="text-xs font-heading tabular-nums font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {netSquareFeet.toLocaleString()} Sq. Ft.
                </span>
              </div>

              <div className="mb-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Required ({coats} {coats > 1 ? 'coats' : 'coat'})
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-slate-900 font-heading tabular-nums">
                    {gallonsNeeded}
                  </span>
                  <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                    {gallonsNeeded > 1 ? 'Gallons' : 'Gallon'}
                  </span>
                </div>

                {drummiesNeeded > 0 && (
                  <div className="text-xs text-slate-600 font-medium mt-2 bg-amber-50/70 p-2 rounded border border-amber-200">
                    Bulk option: <strong>{drummiesNeeded} Drummy</strong>
                    {remainingGallons > 0 ? ` + ${remainingGallons} Gal` : ''}.
                  </div>
                )}
              </div>

              <div className="bg-slate-50 rounded-md p-3.5 border border-slate-200 mb-4">
                <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-0.5">
                  Recommended Product
                </div>
                <div className="text-sm font-black text-slate-900">{matchedProduct.name}</div>
                <div className="flex items-center justify-between pt-2 mt-1.5 border-t border-slate-200 text-xs">
                  <span className="text-slate-500">#{matchedProduct.code}</span>
                  <span className="font-heading tabular-nums font-bold text-slate-900">
                    Rs. {unitPrice.toLocaleString('en-PK')} / Gal
                  </span>
                </div>
              </div>

              <div className="pb-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  Estimated Total
                </div>
                <div className="text-2xl font-black font-heading tabular-nums text-slate-900">
                  Rs. {estimatedCost.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleAddBundle}
                className="w-full py-3 px-4 rounded-md font-bold text-xs text-white bg-gradient-to-r from-rose-600 via-orange-500 to-blue-600 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Add {gallonsNeeded} Gallon(s) to Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectProduct(matchedProduct)}
                className="w-full py-2 px-4 rounded-md font-semibold text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors text-center cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
