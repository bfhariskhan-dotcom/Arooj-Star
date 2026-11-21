import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Trash2, Save, Loader2, Check } from 'lucide-react';
import { Product, PackSizeKey, BaseType } from '../types';
import { uploadImageToImgBB } from '../lib/imgbb';
import { upsertProductInFirestore } from '../lib/storeService';

interface ProductEditorModalProps {
  product: Product | null;
  isNew: boolean;
  onClose: () => void;
  onSaved: (message: string) => void;
  onPermissionError: (errMsg: string) => void;
}

const CATEGORY_OPTIONS: { value: Product['category']; label: string }[] = [
  { value: 'exterior', label: 'Exterior Emulsion' },
  { value: 'interior', label: 'Interior Emulsion' },
  { value: 'enamels', label: 'Synthetic Enamel & Gloss' },
  { value: 'putties', label: 'Putty & Wall Primer' },
  { value: 'primers', label: 'Primer & Undercoat' },
  { value: 'wood', label: 'Wood Coating & Thinner' },
];

const BRAND_OPTIONS: Product['brand'][] = [
  'Arooj Star',
  'D. Ace',
  'D. Overall',
  'D. Everlast',
  'D. Maxima',
  'D. Value',
];

const BASE_OPTIONS: { code: 'WB' | 'OB' | 'VR'; label: BaseType }[] = [
  { code: 'WB', label: 'Water Based (WB)' },
  { code: 'OB', label: 'Oil Based (OB)' },
  { code: 'VR', label: 'Varnish / NC (VR)' },
];

const FINISH_OPTIONS: Product['finish'][] = [
  'Gloss',
  'Silk Matt',
  'Dead Flat Matt',
  'Semi-Gloss',
  'Metallic',
  'Hammered',
  'Smooth Putty',
  'Sealer',
];

export const ProductEditorModal: React.FC<ProductEditorModalProps> = ({
  product,
  isNew,
  onClose,
  onSaved,
  onPermissionError,
}) => {
  const [form, setForm] = useState<Product | null>(null);
  const [featuresText, setFeaturesText] = useState('');
  const [usesText, setUsesText] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setForm({ ...product, prices: { ...product.prices } });
      setFeaturesText((product.features || []).join('\n'));
      setUsesText((product.recommendedUses || []).join('\n'));
      setErrorMsg(null);
    } else {
      setForm(null);
    }
  }, [product]);

  if (!form) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setErrorMsg(null);
    try {
      const result = await uploadImageToImgBB(file);
      setForm((prev) => (prev ? { ...prev, image: result.url } : prev));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to upload image to ImgBB.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handlePriceChange = (key: PackSizeKey, val: string) => {
    const numeric = parseFloat(val);
    setForm((prev) => {
      if (!prev) return prev;
      const nextPrices = { ...prev.prices };
      if (!val.trim() || isNaN(numeric) || numeric <= 0) {
        delete nextPrices[key];
      } else {
        nextPrices[key] = numeric;
      }
      return { ...prev, prices: nextPrices };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim()) {
      setErrorMsg('Product Code and Product Name are required.');
      return;
    }

    const activePrices = Object.values(form.prices).filter((v) => typeof v === 'number' && v > 0);
    if (activePrices.length === 0) {
      setErrorMsg('Please enter at least one valid pack size price (in Rs.).');
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    try {
      const catMeta = CATEGORY_OPTIONS.find((c) => c.value === form.category);
      const baseMeta = BASE_OPTIONS.find((b) => b.code === form.baseCategoryCode);

      const cleanProduct: Product = {
        ...form,
        id: isNew
          ? `prod-${form.code.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now().toString(36)}`
          : form.id,
        categoryLabel: catMeta?.label || form.categoryLabel,
        baseType: baseMeta?.label || form.baseType,
        features: featuresText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        recommendedUses: usesText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      await upsertProductInFirestore(cleanProduct);
      onSaved(isNew ? `Added "${cleanProduct.name}"` : `Updated "${cleanProduct.name}"`);
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save product.';
      if (msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('insufficient')) {
        onPermissionError(msg);
      }
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  const packSizes: { key: PackSizeKey; label: string }[] = [
    { key: 'smallTin', label: 'Small Tin' },
    { key: 'quarter', label: 'Quarter (0.91L)' },
    { key: 'gallon', label: 'Gallon (3.64L)' },
    { key: 'drummy', label: 'Drummy (14.56L)' },
    { key: 'barrel', label: 'Barrel (200L)' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 to-blue-600 shrink-0" />
        {/* Light Header */}
        <div className="px-6 py-4 bg-slate-50 text-slate-900 flex items-center justify-between border-b border-slate-200 shrink-0">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">
              {isNew ? 'Create New Formulation' : `Editing #${form.code}`}
            </span>
            <h3 className="text-lg font-black text-slate-900 font-heading">
              {isNew ? 'Add New Paint Product' : form.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close product editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium break-words">
              {errorMsg}
            </div>
          )}

          {/* Product Image Upload via ImgBB */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              {/* Preview Box */}
              <div className="w-full sm:w-44 aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-300 flex items-center justify-center shrink-0 relative">
                {form.image ? (
                  <img
                    src={form.image}
                    alt={form.name || 'Preview'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-3">
                    <div className="text-lg font-black text-white">{form.baseCategoryCode}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Using Default Badge</div>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 w-full space-y-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                    Product Photo (ImgBB Instant Upload or Direct URL)
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl cursor-pointer transition-colors shadow-xs">
                      {uploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading to ImgBB...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Upload Image via ImgBB</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>

                    {form.image && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image: '' })}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-red-50 hover:text-[#c1121f] border border-slate-300 rounded-xl cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Revert to Badge</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={form.image || ''}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://i.ibb.co/... (auto-filled after upload, or paste URL)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Core Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Product Code *
              </label>
              <input
                type="text"
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="e.g. 0100"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-heading tabular-nums font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. D. Ace Weather Defender"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-semibold"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Brand Line
              </label>
              <select
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value as Product['brand'] })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-semibold"
              >
                {BRAND_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Product['category'] })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-semibold"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Chemical Base
              </label>
              <select
                value={form.baseCategoryCode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    baseCategoryCode: e.target.value as 'WB' | 'OB' | 'VR',
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-semibold"
              >
                {BASE_OPTIONS.map((b) => (
                  <option key={b.code} value={b.code}>{b.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Finish Type
              </label>
              <select
                value={form.finish}
                onChange={(e) => setForm({ ...form, finish: e.target.value as Product['finish'] })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-semibold"
              >
                {FINISH_OPTIONS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Coverage Rate
              </label>
              <input
                type="text"
                value={form.coverageSqFt}
                onChange={(e) => setForm({ ...form, coverageSqFt: e.target.value })}
                placeholder="e.g. 280 - 320 Sq. Ft / Gal"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Drying Time
              </label>
              <input
                type="text"
                value={form.dryingTime}
                onChange={(e) => setForm({ ...form, dryingTime: e.target.value })}
                placeholder="e.g. 2 - 4 Hours"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-6 py-2 px-4 rounded-xl bg-slate-50 border border-slate-200">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(form.popular)}
                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                className="w-4 h-4 accent-[#c1121f] cursor-pointer"
              />
              <span>Mark as Popular Formulation</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active !== false}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 accent-[#c1121f] cursor-pointer"
              />
              <span>Visible on Storefront Catalog</span>
            </label>
          </div>

          {/* Pack Size Pricing Matrix */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Official Dealer Rates (PKR) — Leave blank to disable pack size
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Default Size:</span>
                <select
                  value={form.defaultSize}
                  onChange={(e) => setForm({ ...form, defaultSize: e.target.value as PackSizeKey })}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                >
                  {packSizes.map((ps) => (
                    <option key={ps.key} value={ps.key}>{ps.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {packSizes.map((ps) => (
                <div key={ps.key}>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    {ps.label}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.prices[ps.key] ?? ''}
                    onChange={(e) => handlePriceChange(ps.key, e.target.value)}
                    placeholder="Rs."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] font-heading tabular-nums font-bold"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Short Summary Description
              </label>
              <textarea
                rows={3}
                value={form.shortDesc}
                onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                placeholder="1-2 line card summary..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Full Product Description
              </label>
              <textarea
                rows={3}
                value={form.fullDesc}
                onChange={(e) => setForm({ ...form, fullDesc: e.target.value })}
                placeholder="Complete technical & architectural overview..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
              />
            </div>
          </div>

          {/* Features & Recommended Uses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Key Features (One per line)
              </label>
              <textarea
                rows={4}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="High Opacity&#10;Alkali Resistant&#10;UV Protection"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Recommended Surfaces / Uses (One per line)
              </label>
              <textarea
                rows={4}
                value={usesText}
                onChange={(e) => setUsesText(e.target.value)}
                placeholder="Exterior Masonry&#10;Concrete Facades"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
              />
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Firestore...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Product Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
