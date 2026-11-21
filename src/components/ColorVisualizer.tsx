import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { POPULAR_SHADES, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ColorVisualizerProps {
  onSelectProduct: (product: Product) => void;
}

export const ColorVisualizer: React.FC<ColorVisualizerProps> = ({ onSelectProduct }) => {
  const [selectedColor, setSelectedColor] = useState(POPULAR_SHADES[0]);
  const [activeScene, setActiveScene] = useState<'interior' | 'exterior' | 'wood'>('interior');

  const scenes = [
    {
      id: 'interior',
      label: 'Living Room',
      image: '/src/assets/images/hero_paint_luxury_interior_1794226083963.jpg',
      recommendedProductCode: '8501',
      tag: 'Interior Silk',
    },
    {
      id: 'exterior',
      label: 'Villa Exterior',
      image: '/src/assets/images/exterior_weather_shield_villa_1794226085858.jpg',
      recommendedProductCode: '0100',
      tag: 'Weather Shield',
    },
    {
      id: 'wood',
      label: 'Woodwork',
      image: '/src/assets/images/wood_lacquer_craft_finish_1794226085390.jpg',
      recommendedProductCode: '3301',
      tag: 'Timberlac Gloss',
    },
  ];

  const currentScene = scenes.find((s) => s.id === activeScene) || scenes[0];
  const matchedProduct = PRODUCTS.find((p) => p.code === currentScene.recommendedProductCode);

  return (
    <section
      id="color-studio"
      className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-rose-50/20 to-sky-50/30 border-y border-slate-200 w-full max-w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 via-amber-500 to-blue-600 bg-clip-text text-transparent mb-1">
              Color Studio
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Preview Paint Tones Live
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Test popular shades across interiors, exteriors, and woodwork.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-md shadow-xs self-start md:self-auto">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(scene.id as 'interior' | 'exterior' | 'wood')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all whitespace-nowrap cursor-pointer ${
                  activeScene === scene.id
                    ? 'bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {scene.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 relative rounded-lg overflow-hidden bg-slate-100 shadow-md border border-slate-200 min-h-[340px] sm:min-h-[430px]">
            <img
              src={currentScene.image}
              alt={currentScene.label}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700"
            />

            <div
              className="absolute inset-0 mix-blend-color opacity-35 transition-colors duration-500 pointer-events-none"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div
              className="absolute inset-0 mix-blend-multiply opacity-20 transition-colors duration-500 pointer-events-none"
              style={{ backgroundColor: selectedColor.hex }}
            />

            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-md shadow-md border-2 border-white/80 shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="text-white">
                  <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                    Selected Shade
                  </div>
                  <div className="text-base font-bold">{selectedColor.name}</div>
                  <div className="text-xs text-slate-200">{selectedColor.mood}</div>
                </div>
              </div>

              {matchedProduct && (
                <button
                  onClick={() => onSelectProduct(matchedProduct)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-orange-500 rounded-md shadow-md flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <span>View Paint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-lg p-5 border border-slate-200 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Popular Swatches
                </span>
                <span className="text-xs text-slate-500">8 Shades</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {POPULAR_SHADES.map((shade) => {
                  const isSelected = selectedColor.name === shade.name;
                  return (
                    <button
                      key={shade.name}
                      type="button"
                      onClick={() => setSelectedColor(shade)}
                      className={`p-2 rounded-md border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/40 ring-1 ring-rose-500'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded shadow-xs border border-black/10 shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: shade.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{shade.name}</div>
                        <div className="text-[10px] text-slate-500 font-heading tabular-nums">{shade.hex}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {matchedProduct && (
                <div className="p-3.5 rounded-md bg-gradient-to-br from-rose-50/50 to-sky-50/50 border border-slate-200 mb-3">
                  <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-0.5">
                    Recommended Base
                  </div>
                  <div className="text-sm font-bold text-slate-900">{matchedProduct.name}</div>
                  <div className="flex items-center justify-between text-xs pt-2 mt-1.5 border-t border-slate-200/70 font-heading tabular-nums">
                    <span className="text-slate-500">#{matchedProduct.code}</span>
                    <span className="font-bold text-slate-900">
                      Rs. {matchedProduct.prices.gallon?.toLocaleString('en-PK')} / Gal
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-500 border-t border-slate-100 pt-2.5">
              UV-resistant pigments engineered for bright sun exposure.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
