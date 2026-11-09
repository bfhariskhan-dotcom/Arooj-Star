import React, { useState } from 'react';
import { Palette, Check, ArrowRight, Sparkles, Sliders } from 'lucide-react';
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
      label: 'Luxury Living Room',
      image: '/src/assets/images/hero_paint_luxury_interior_1794226083963.jpg',
      recommendedProductCode: '8501', // D. Ace Durasilk
      tag: 'Interior Silk Sheen'
    },
    {
      id: 'exterior',
      label: 'Architectural Villa Exterior',
      image: '/src/assets/images/exterior_weather_shield_villa_1794226085858.jpg',
      recommendedProductCode: '0100', // D. Ace Weather Defender
      tag: 'Exterior Weather Shield'
    },
    {
      id: 'wood',
      label: 'Executive Woodwork & Millwork',
      image: '/src/assets/images/wood_lacquer_craft_finish_1794226085390.jpg',
      recommendedProductCode: '3301', // D. Ace Timberlac Gloss
      tag: 'Timberlac Clear Finish'
    }
  ];

  const currentScene = scenes.find((s) => s.id === activeScene) || scenes[0];
  const matchedProduct = PRODUCTS.find((p) => p.code === currentScene.recommendedProductCode);

  return (
    <section id="color-studio" className="py-20 bg-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#c1121f] uppercase tracking-wider mb-2">
              <Palette className="w-4 h-4" />
              <span>Interactive Color Studio</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">Live Surface Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Visualize Arooj Star Architectural Tones
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Preview how our high-opacity pigments behave in natural daylit living rooms, exterior facades, and polished woodwork.
            </p>
          </div>

          {/* Scene Switcher Tabs (Functional filter buttons) */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm self-start md:self-auto">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(scene.id as any)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeScene === scene.id
                    ? 'bg-[#c1121f] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {scene.label}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Preview Canvas */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-300 min-h-[380px] sm:min-h-[480px]">
            {/* Base Photography */}
            <img
              src={currentScene.image}
              alt={currentScene.label}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700"
            />

            {/* Dynamic Color Tint Overlay (Subtle multiply/color blend) */}
            <div
              className="absolute inset-0 mix-blend-color opacity-35 transition-colors duration-500 pointer-events-none"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div
              className="absolute inset-0 mix-blend-multiply opacity-20 transition-colors duration-500 pointer-events-none"
              style={{ backgroundColor: selectedColor.hex }}
            />

            {/* Bottom Scrim & Active Color Callout */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl shadow-md border-2 border-white/80 shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="text-white">
                  <div className="text-xs text-red-400 font-bold uppercase tracking-wider">Selected Color Formula</div>
                  <div className="text-lg font-bold">{selectedColor.name}</div>
                  <div className="text-xs text-slate-300">{selectedColor.mood} · {selectedColor.type}</div>
                </div>
              </div>

              {matchedProduct && (
                <button
                  onClick={() => onSelectProduct(matchedProduct)}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-lg shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                >
                  <span>View Recommended Paint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Color Swatches & Pairing Controller */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Signature Architectural Swatches
                </span>
                <span className="text-xs text-slate-500">8 Curated Shades</span>
              </div>

              {/* Swatch Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {POPULAR_SHADES.map((shade) => {
                  const isSelected = selectedColor.name === shade.name;
                  return (
                    <button
                      key={shade.name}
                      type="button"
                      onClick={() => setSelectedColor(shade)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-[#c1121f] bg-red-50/40 ring-2 ring-[#c1121f]'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg shadow-sm border border-black/10 shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: shade.hex }}
                      >
                        {isSelected && <Check className="w-4 h-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {shade.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {shade.hex}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Recommended Product Box */}
              {matchedProduct && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
                  <div className="text-[11px] font-bold text-[#c1121f] uppercase tracking-wider mb-1">
                    Ideal Base Product
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    {matchedProduct.name}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                    {matchedProduct.shortDesc}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 font-mono">
                    <span className="text-slate-500">Code: #{matchedProduct.code}</span>
                    <span className="font-bold text-slate-900">
                      From Rs. {matchedProduct.prices.gallon?.toLocaleString('en-PK')} / Gallon
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
              <span>
                All Arooj Star pigments are formulated with high lightfastness to resist chalking and UV fading across Pakistan's intense sun exposure.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
