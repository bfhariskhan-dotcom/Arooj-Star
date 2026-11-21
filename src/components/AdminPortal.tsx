import React, { useState, useEffect, useMemo } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  Lock,
  LogOut,
  ArrowLeft,
  Plus,
  Search,
  Edit3,
  Trash2,
  RefreshCw,
  Package,
  FileText,
  Settings,
  Eye,
  EyeOff,
  Check,
  Copy,
  Upload,
  Loader2,
  MessageSquare,
  AlertTriangle,
  Database,
  Save,
  Star,
  CopyPlus,
} from 'lucide-react';
import {
  auth,
  db,
  ADMIN_UID,
  ADMIN_EMAIL,
  RECOMMENDED_FIRESTORE_RULES,
} from '../lib/firebase';
import {
  seedAllProductsToFirestore,
  seedMissingProductsToFirestore,
  upsertProductInFirestore,
  deleteProductFromFirestore,
  saveSiteSettingsToFirestore,
  updateQuotationStatusInFirestore,
  deleteQuotationFromFirestore,
} from '../lib/storeService';
import { uploadImageToImgBB } from '../lib/imgbb';
import { PRODUCTS, COMPANY_DETAILS, PACK_SIZE_LABELS, getPackSizeImage } from '../data/products';
import { Product, QuotationRecord, SiteSettings, SocialLinkItem } from '../types';
import { ProductEditorModal } from './ProductEditorModal';
import { BrandLogo } from './BrandLogo';
import { renderSocialIcon } from './SocialLinksBar';

interface AdminPortalProps {
  products: Product[];
  firestoreSyncedCount: number;
  siteSettings: SiteSettings;
  onExitAdmin: () => void;
}

const EMPTY_NEW_PRODUCT: Product = {
  id: '',
  code: '',
  name: '',
  brand: 'Arooj Star',
  category: 'exterior',
  categoryLabel: 'Exterior Emulsion',
  baseType: 'Water Based (WB)',
  baseCategoryCode: 'WB',
  shortDesc: '',
  fullDesc: '',
  features: ['High Opacity', 'Long Lasting Finish'],
  recommendedUses: ['Interior & Exterior Masonry'],
  coverageSqFt: '280 - 320 Sq. Ft / Gal',
  dryingTime: '2 - 4 Hours',
  finish: 'Gloss',
  prices: { gallon: 5000 },
  defaultSize: 'gallon',
  popular: false,
  active: true,
  image: '',
};

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  firestoreSyncedCount,
  siteSettings,
  onExitAdmin,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Login Form (Strict Email & Password Only - No Demo/Mock)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Admin Workspace State
  const [activeTab, setActiveTab] = useState<'products' | 'quotations' | 'settings'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [baseFilter, setBaseFilter] = useState<'all' | 'WB' | 'OB' | 'VR'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'hidden'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Sync & Toast Feedback
  const [syncing, setSyncing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [rulesNotice, setRulesNotice] = useState<string | null>(null);
  const [copiedRules, setCopiedRules] = useState(false);

  // Quotations from Firestore
  const [quotations, setQuotations] = useState<QuotationRecord[]>([]);
  const [quotationsLoading, setQuotationsLoading] = useState(false);

  // Site Settings Editor
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({
    ...siteSettings,
    socialLinks:
      siteSettings.socialLinks && siteSettings.socialLinks.length > 0
        ? siteSettings.socialLinks
        : COMPANY_DETAILS.socialLinks,
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [uploadingHeroImg, setUploadingHeroImg] = useState(false);
  const [uploadingAboutImg, setUploadingAboutImg] = useState(false);

  useEffect(() => {
    setSettingsForm({
      ...siteSettings,
      socialLinks:
        siteSettings.socialLinks && siteSettings.socialLinks.length > 0
          ? siteSettings.socialLinks
          : COMPANY_DETAILS.socialLinks,
    });
  }, [siteSettings]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Monitor Firebase Authentication state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const isAuthorized =
          currentUser.uid === ADMIN_UID ||
          currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

        if (!isAuthorized) {
          setAuthError(
            `Access denied for ${currentUser.email || currentUser.uid}. Please sign in with the authorized admin account (${ADMIN_EMAIL}).`
          );
          await signOut(auth);
          setUser(null);
        } else {
          setUser(currentUser);
          setAuthError(null);
        }
      } else {
        setUser(null);
      }
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Live Quotations Listener when authenticated as Admin
  useEffect(() => {
    if (!user) {
      setQuotations([]);
      return;
    }
    setQuotationsLoading(true);
    const q = query(collection(db, 'quotations'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<QuotationRecord, 'id'>) }));
        setQuotations(list);
        setQuotationsLoading(false);
      },
      (err) => {
        setQuotationsLoading(false);
        if (err.message.toLowerCase().includes('permission')) {
          setRulesNotice(err.message);
        }
      }
    );
    return () => unsub();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setAuthError('Please enter your administrator email and password.');
      return;
    }
    setAuthLoading(true);
    setAuthError(null);

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const isAuthorized =
        cred.user.uid === ADMIN_UID ||
        cred.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      if (!isAuthorized) {
        await signOut(auth);
        setAuthError('This account does not have administrator privileges.');
      } else {
        setPassword('');
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setAuthError('Invalid email or password. Please verify your Firebase Authentication credentials.');
      } else if (code === 'auth/too-many-requests') {
        setAuthError('Too many failed sign-in attempts. Please wait a few minutes and try again.');
      } else {
        setAuthError(err?.message || 'Sign-in failed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleSyncMissingDefaults = async () => {
    setSyncing(true);
    setRulesNotice(null);
    try {
      const addedCount = await seedMissingProductsToFirestore(PRODUCTS);
      if (addedCount > 0) {
        showToast(`Synced ${addedCount} formulations to Firestore.`);
      } else {
        showToast('All 48 default formulations are already synced in Firestore.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sync failed.';
      if (msg.toLowerCase().includes('permission')) setRulesNotice(msg);
      showToast('Failed to sync products. Check Firestore Rules.');
    } finally {
      setSyncing(false);
    }
  };

  const handleResetAllToDefaults = async () => {
    setSyncing(true);
    setRulesNotice(null);
    try {
      const total = await seedAllProductsToFirestore(PRODUCTS);
      showToast(`Reset & synced all ${total} formulations to Firestore.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sync failed.';
      if (msg.toLowerCase().includes('permission')) setRulesNotice(msg);
    } finally {
      setSyncing(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductFromFirestore(id);
      setConfirmDeleteId(null);
      showToast('Product removed from Firestore.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Delete failed.';
      if (msg.toLowerCase().includes('permission')) setRulesNotice(msg);
    }
  };

  const handleDuplicateProduct = async (prod: Product) => {
    setRulesNotice(null);
    const suffix = Date.now().toString(36);
    const cleanBaseId = prod.id.replace(/[^a-zA-Z0-9_-]/g, '');
    const duplicated: Product = {
      ...prod,
      id: `${cleanBaseId}-copy-${suffix}`.slice(0, 120),
      code: `${prod.code}-COPY`.slice(0, 38),
      name: `${prod.name} (Copy)`.slice(0, 195),
      prices: { ...prod.prices },
      features: [...(prod.features || [])],
      recommendedUses: [...(prod.recommendedUses || [])],
      order: products.length + 1,
    };

    try {
      await upsertProductInFirestore(duplicated);
      showToast(`Duplicated "${prod.name}"!`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Duplicate failed.';
      if (msg.toLowerCase().includes('permission')) setRulesNotice(msg);
      showToast('Could not duplicate. Check Firestore Rules.');
    }
  };

  const handleQuickToggle = async (prod: Product, field: 'active' | 'popular') => {
    setRulesNotice(null);
    const nextValue = field === 'active' ? prod.active === false : !prod.popular;
    try {
      await upsertProductInFirestore({
        ...prod,
        [field]: nextValue,
      });
      showToast(
        field === 'active'
          ? `"${prod.name}" is now ${nextValue ? 'Visible' : 'Hidden'}`
          : `"${prod.name}" ${nextValue ? 'marked Popular' : 'unmarked Popular'}`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Update failed.';
      if (msg.toLowerCase().includes('permission')) setRulesNotice(msg);
    }
  };

  const handleCopyRules = () => {
    navigator.clipboard.writeText(RECOMMENDED_FIRESTORE_RULES).then(() => {
      setCopiedRules(true);
      setTimeout(() => setCopiedRules(false), 2500);
    });
  };

  const handleSiteMediaUpload = async (field: 'heroImage' | 'aboutImage', file: File) => {
    const setter = field === 'heroImage' ? setUploadingHeroImg : setUploadingAboutImg;
    setter(true);
    try {
      const res = await uploadImageToImgBB(file);
      setSettingsForm((prev) => ({ ...prev, [field]: res.url }));
      showToast('Image uploaded to ImgBB. Click "Save Site Settings" to publish.');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'ImgBB upload failed.');
    } finally {
      setter(false);
    }
  };

  const handleSocialChange = (
    idx: number,
    patch: Partial<SocialLinkItem>
  ) => {
    setSettingsForm((prev) => {
      const list = [...(prev.socialLinks || COMPANY_DETAILS.socialLinks)];
      list[idx] = { ...list[idx], ...patch };
      return { ...prev, socialLinks: list };
    });
  };

  const handleAddSocialLink = () => {
    setSettingsForm((prev) => {
      const list = [...(prev.socialLinks || [])];
      list.push({
        id: `soc-${Date.now().toString(36)}`,
        platform: 'custom',
        label: 'Social Link',
        url: '#',
        enabled: true,
      });
      return { ...prev, socialLinks: list };
    });
  };

  const handleRemoveSocialLink = (idx: number) => {
    setSettingsForm((prev) => {
      const list = [...(prev.socialLinks || [])];
      list.splice(idx, 1);
      return { ...prev, socialLinks: list };
    });
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setRulesNotice(null);
    try {
      await saveSiteSettingsToFirestore(settingsForm);
      showToast('Site settings, social links & media saved live!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed.';
      if (msg.toLowerCase().includes('permission')) setRulesNotice(msg);
    } finally {
      setSavingSettings(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (baseFilter !== 'all' && p.baseCategoryCode !== baseFilter) return false;
      if (statusFilter === 'active' && p.active === false) return false;
      if (statusFilter === 'hidden' && p.active !== false) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, categoryFilter, baseFilter, statusFilter, searchQuery]);

  // Loading auth initialization
  if (!authReady) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
          <Loader2 className="w-5 h-5 animate-spin text-[#c1121f]" />
          <span>Verifying session...</span>
        </div>
      </div>
    );
  }

  // Email & Password Login Gate (Strict Auth Only)
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between p-4 sm:p-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-2">
          <button
            type="button"
            onClick={onExitAdmin}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#c1121f] bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Website</span>
          </button>
          <span className="text-xs font-heading tabular-nums text-slate-500 hidden sm:inline">
            {COMPANY_DETAILS.domain}
          </span>
        </div>

        <div className="max-w-md w-full mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-7 sm:p-9 my-8">
          <div className="mb-6">
            <BrandLogo />
            <div className="flex items-center gap-2 text-xs font-bold text-[#c1121f] uppercase tracking-wider mt-4 mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Authorized Admin Portal</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">
              Administrator Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sign in with your Firebase Email &amp; Password to manage catalog products, pricing, images, and dealer inquiries.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium leading-relaxed">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Admin Email *
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@dataaroojpaintgallery.shop"
                className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-11 py-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-slate-500 py-2">
          Protected by Firebase Authentication · {COMPANY_DETAILS.galleryName}
        </div>
      </div>
    );
  }

  // Authenticated Admin Workspace (Light Colorful Theme)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Light Admin Header with Spectrum Accent */}
      <header className="sticky top-0 z-40 bg-white text-slate-900 border-b border-slate-200 shadow-xs">
        <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 via-sky-500 to-violet-600" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </button>
            <div className="flex items-center gap-2.5">
              <BrandLogo light={false} />
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider border-l border-slate-200 pl-2.5">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-slate-500 font-heading tabular-nums">
              {user.email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-gradient-to-r from-rose-600 to-orange-500 hover:opacity-95 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-slate-900 border-2 border-rose-500 px-4 py-2.5 rounded-md shadow-xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
        {/* Firestore Security Rules Helper if permission error occurs */}
        {rulesNotice && (
          <div className="p-5 rounded-2xl bg-red-50 border-2 border-[#c1121f] text-slate-900 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#c1121f] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Firestore Security Rules Needed in Firebase Console (fir-3ee1d)
                  </h3>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Your Firebase project <strong>fir-3ee1d</strong> blocked a Firestore read/write because your security rules need to allow public reads and admin writes for UID <code className="font-heading tabular-nums bg-white px-1.5 py-0.5 rounded border border-red-200">{ADMIN_UID}</code>. Copy the hardened rules below and paste them into <strong>Firebase Console → Firestore Database → Rules → Publish</strong>.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyRules}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl cursor-pointer shrink-0"
              >
                {copiedRules ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedRules ? 'Copied Rules!' : 'Copy Firestore Rules'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Sync Banner if Firestore has fewer than all 48 products */}
        {firestoreSyncedCount < PRODUCTS.length && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-[#c1121f] shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Sync Complete 48-Product Catalog to Firestore
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Currently <strong>{firestoreSyncedCount}</strong> of <strong>{PRODUCTS.length}</strong> catalog formulations are persisted in Firestore. Sync now so every image upload and price edit saves permanently.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSyncMissingDefaults}
              disabled={syncing}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] disabled:opacity-50 rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>{syncing ? 'Syncing...' : 'Sync All 48 Products Now'}</span>
            </button>
          </div>
        )}

        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Products
            </div>
            <div className="text-3xl font-black text-slate-900 font-heading tabular-nums mt-1">
              {products.length}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Synced in Firestore
            </div>
            <div className="text-3xl font-black text-[#c1121f] font-heading tabular-nums mt-1">
              {firestoreSyncedCount}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Custom Photos Uploaded
            </div>
            <div className="text-3xl font-black text-slate-900 font-heading tabular-nums mt-1">
              {products.filter((p) => Boolean(p.image)).length}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Quotation Inquiries
            </div>
            <div className="text-3xl font-black text-slate-900 font-heading tabular-nums mt-1">
              {quotations.length}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 bg-slate-200/70 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#c1121f] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('quotations')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'quotations'
                  ? 'bg-[#c1121f] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Quotations &amp; Inquiries ({quotations.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#c1121f] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site &amp; Media Settings</span>
            </button>
          </div>

          {activeTab === 'products' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetAllToDefaults}
                disabled={syncing}
                className="px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
                title="Re-sync all 48 default formulations to Firestore"
              >
                <RefreshCw className={`w-3.5 h-3.5 inline mr-1.5 ${syncing ? 'animate-spin' : ''}`} />
                Re-Sync Defaults
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreatingNew(true);
                  setEditingProduct({ ...EMPTY_NEW_PRODUCT });
                }}
                className="px-4 py-2.5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Search, Category, Base & Status Filters */}
            <div className="flex flex-col md:flex-row gap-2.5 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by code, name, or brand..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All Categories ({products.length})</option>
                <option value="exterior">Exterior Emulsions</option>
                <option value="interior">Interior Emulsions</option>
                <option value="enamels">Synthetic Enamels</option>
                <option value="putties">Sheesha Wall Putties</option>
                <option value="primers">Primers &amp; Sealers</option>
                <option value="wood">Wood Coatings &amp; Thinners</option>
              </select>

              <select
                value={baseFilter}
                onChange={(e) => setBaseFilter(e.target.value as 'all' | 'WB' | 'OB' | 'VR')}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All Bases</option>
                <option value="WB">WB (Water)</option>
                <option value="OB">OB (Oil)</option>
                <option value="VR">VR (Varnish)</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'hidden')}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="hidden">Hidden Only</option>
              </select>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3 px-4">Photo / Badge</th>
                      <th className="py-3 px-4">Code &amp; Name</th>
                      <th className="py-3 px-4 hidden md:table-cell">Category &amp; Base</th>
                      <th className="py-3 px-4">Default Rate</th>
                      <th className="py-3 px-4 hidden sm:table-cell">Quick Toggles</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredProducts.map((prod) => {
                      const defaultPrice =
                        prod.prices[prod.defaultSize] ?? Object.values(prod.prices)[0] ?? 0;

                      return (
                        <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-4">
                            <div className="w-14 h-10 rounded-md overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                              <img
                                src={getPackSizeImage(prod.defaultSize, prod.image)}
                                alt={prod.name}
                                referrerPolicy="no-referrer"
                                className={`w-full h-full ${prod.image ? 'object-cover' : 'object-contain p-0.5'}`}
                              />
                            </div>
                          </td>

                          <td className="py-2.5 px-4">
                            <div className="font-heading tabular-nums font-bold text-rose-600">#{prod.code}</div>
                            <div className="font-bold text-slate-900 text-sm line-clamp-1">
                              {prod.name}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {prod.brand} · {prod.finish}
                            </div>
                          </td>

                          <td className="py-2.5 px-4 hidden md:table-cell">
                            <div className="font-semibold text-slate-800">{prod.categoryLabel}</div>
                            <div className="text-[11px] text-slate-500">{prod.baseType}</div>
                          </td>

                          <td className="py-2.5 px-4 font-heading tabular-nums">
                            <div className="font-black text-slate-900">
                              Rs. {defaultPrice.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {PACK_SIZE_LABELS[prod.defaultSize] || prod.defaultSize}
                            </div>
                          </td>

                          <td className="py-2.5 px-4 hidden sm:table-cell">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleQuickToggle(prod, 'active')}
                                title="Toggle Visible / Hidden on storefront"
                                className={`px-2 py-1 rounded text-[11px] font-bold border cursor-pointer transition-colors ${
                                  prod.active !== false
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-slate-100 text-slate-500 border-slate-200'
                                }`}
                              >
                                {prod.active !== false ? 'Active' : 'Hidden'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickToggle(prod, 'popular')}
                                title="Toggle Popular highlight"
                                className={`p-1 rounded border cursor-pointer transition-colors ${
                                  prod.popular
                                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                                    : 'bg-white text-slate-300 border-slate-200 hover:text-amber-500'
                                }`}
                              >
                                <Star className={`w-3.5 h-3.5 ${prod.popular ? 'fill-amber-500' : ''}`} />
                              </button>
                            </div>
                          </td>

                          <td className="py-2.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCreatingNew(false);
                                  setEditingProduct(prod);
                                }}
                                className="px-2.5 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-rose-600 hover:text-white rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer"
                                title="Edit product"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDuplicateProduct(prod)}
                                className="px-2.5 py-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-600 hover:text-white rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer"
                                title="Duplicate product"
                              >
                                <CopyPlus className="w-3.5 h-3.5" />
                                <span className="hidden lg:inline">Duplicate</span>
                              </button>

                              {confirmDeleteId === prod.id ? (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(prod.id)}
                                  className="px-2.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-md cursor-pointer"
                                >
                                  Confirm
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(prod.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUOTATIONS & INQUIRIES */}
        {activeTab === 'quotations' && (
          <div className="space-y-4">
            {quotationsLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin text-[#c1121f] mx-auto mb-2" />
                Loading dealer inquiries from Firestore...
              </div>
            ) : quotations.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No Quotations Yet</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Submitted dealer quotation requests and contact form inquiries will appear here in real time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {quotations.map((qt) => (
                  <div
                    key={qt.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-heading tabular-nums font-bold text-[#c1121f]">
                          <span>#{qt.orderNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500 font-sans">
                            {qt.source === 'contact_form' ? 'Contact Form Inquiry' : 'Quotation Request'}
                          </span>
                        </div>
                        <h4 className="text-base font-black text-slate-900 mt-1">
                          {qt.fullName} {qt.companyShopName ? `(${qt.companyShopName})` : ''}
                        </h4>
                        <div className="text-xs text-slate-600 mt-0.5">
                          Phone: <strong className="font-heading tabular-nums">{qt.phone}</strong> · {qt.city} ({qt.province})
                        </div>
                        {qt.deliveryAddress && (
                          <div className="text-xs text-slate-500 mt-0.5">
                            Address: {qt.deliveryAddress}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={qt.status}
                          onChange={(e) =>
                            updateQuotationStatusInFirestore(qt.id, e.target.value as QuotationRecord['status'])
                          }
                          className="px-3 py-1.5 text-xs font-bold bg-slate-100 border border-slate-300 rounded-lg text-slate-900 cursor-pointer"
                        >
                          <option value="new">Status: New</option>
                          <option value="contacted">Status: Contacted</option>
                          <option value="dispatched">Status: Dispatched</option>
                          <option value="completed">Status: Completed</option>
                        </select>

                        <a
                          href={`https://wa.me/${qt.phone.replace(/[^0-9]/g, '').replace(/^0/, '92')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-lg inline-flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => deleteQuotationFromFirestore(qt.id)}
                          className="p-1.5 text-slate-400 hover:text-[#c1121f] rounded-lg cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {qt.items && qt.items.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
                        {qt.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between gap-2">
                            <div>
                              <span className="font-heading tabular-nums font-bold text-[#c1121f] mr-1.5">#{item.code}</span>
                              <span className="font-semibold text-slate-800">{item.name}</span>
                              <span className="text-slate-500 ml-1.5">
                                ({PACK_SIZE_LABELS[item.selectedSize] || item.selectedSize} × {item.quantity})
                              </span>
                            </div>
                            <span className="font-heading tabular-nums font-bold text-slate-900">
                              Rs. {item.subtotal.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-slate-900">
                          <span>Total Quotation Value</span>
                          <span className="font-heading tabular-nums text-[#c1121f]">
                            Rs. {qt.totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    )}

                    {qt.orderNotes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <strong>Notes:</strong> {qt.orderNotes}
                      </p>
                    )}

                    <div className="text-[11px] text-slate-400 font-heading tabular-nums">
                      Submitted: {new Date(qt.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SITE & MEDIA SETTINGS */}
        {activeTab === 'settings' && (
          <form
            onSubmit={handleSaveSettings}
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                Storefront Identity, Contact &amp; Banner Images
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Update contact numbers, email, domain, Hero background, and About Us poster image using ImgBB.
              </p>
            </div>

            {/* Banner & About Media Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hero Banner Image */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hero Banner Background Image
                </div>
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
                  <img
                    src={settingsForm.heroImage}
                    alt="Hero Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl cursor-pointer">
                    {uploadingHeroImg ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingHeroImg ? 'Uploading...' : 'Upload via ImgBB'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleSiteMediaUpload('heroImage', f);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={settingsForm.heroImage}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroImage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                />
              </div>

              {/* About Section Image */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  About Us Section Poster Image
                </div>
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
                  <img
                    src={settingsForm.aboutImage}
                    alt="About Poster"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl cursor-pointer">
                    {uploadingAboutImg ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingAboutImg ? 'Uploading...' : 'Upload via ImgBB'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleSiteMediaUpload('aboutImage', f);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={settingsForm.aboutImage}
                  onChange={(e) => setSettingsForm({ ...settingsForm, aboutImage: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            {/* Text Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  Gallery Name
                </label>
                <input
                  type="text"
                  value={settingsForm.galleryName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, galleryName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  CEO Name
                </label>
                <input
                  type="text"
                  value={settingsForm.ceo}
                  onChange={(e) => setSettingsForm({ ...settingsForm, ceo: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={settingsForm.contactPerson}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactPerson: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  Primary WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settingsForm.phone1}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      phone1: e.target.value,
                      phone1Raw: e.target.value.replace(/[^0-9]/g, '').replace(/^0/, '92'),
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-heading tabular-nums"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  Secondary Hotline Number
                </label>
                <input
                  type="text"
                  value={settingsForm.phone2}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      phone2: e.target.value,
                      phone2Raw: e.target.value.replace(/[^0-9]/g, '').replace(/^0/, '92'),
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-heading tabular-nums"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  Domain Name
                </label>
                <input
                  type="text"
                  value={settingsForm.domain}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      domain: e.target.value,
                      website: `https://${e.target.value.replace(/^https?:\/\//, '')}`,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  Price List Effective Label
                </label>
                <input
                  type="text"
                  value={settingsForm.priceListDate}
                  onChange={(e) => setSettingsForm({ ...settingsForm, priceListDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            {/* Social Media Icons & Links Manager */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    Social Media Icons &amp; Links
                  </h4>
                  <p className="text-xs text-slate-500">
                    Links default to <code className="font-heading tabular-nums bg-slate-100 px-1 rounded">#</code> until you enter your official page URLs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 rounded-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Social Link</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(settingsForm.socialLinks || []).map((soc, idx) => (
                  <div
                    key={soc.id}
                    className="p-3 rounded-md bg-slate-50 border border-slate-200 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded bg-white border border-slate-200 text-slate-700">
                          {renderSocialIcon(soc.platform, 'w-3.5 h-3.5')}
                        </span>
                        <select
                          value={soc.platform}
                          onChange={(e) =>
                            handleSocialChange(idx, {
                              platform: e.target.value as SocialLinkItem['platform'],
                            })
                          }
                          className="px-2 py-1 text-xs bg-white border border-slate-300 rounded font-bold text-slate-800"
                        >
                          <option value="facebook">Facebook</option>
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="youtube">YouTube</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="custom">Website / Other</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={soc.enabled !== false}
                            onChange={(e) =>
                              handleSocialChange(idx, { enabled: e.target.checked })
                            }
                            className="rounded text-rose-600"
                          />
                          <span>Show</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleRemoveSocialLink(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Remove link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={soc.label}
                        onChange={(e) => handleSocialChange(idx, { label: e.target.value })}
                        placeholder="Label (e.g. Facebook)"
                        className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={soc.url}
                        onChange={(e) => handleSocialChange(idx, { url: e.target.value })}
                        placeholder="# or https://..."
                        className="px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded font-heading tabular-nums"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-orange-500 to-blue-600 hover:opacity-95 disabled:opacity-50 rounded-md shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                {savingSettings ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Site Settings</span>
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Product Editor Modal */}
      <ProductEditorModal
        product={editingProduct}
        isNew={isCreatingNew}
        onClose={() => setEditingProduct(null)}
        onSaved={(msg) => showToast(msg)}
        onPermissionError={(msg) => setRulesNotice(msg)}
      />
    </div>
  );
};
