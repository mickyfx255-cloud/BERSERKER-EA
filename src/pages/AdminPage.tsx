import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product, Order, BotResult, License, EASource } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { injectMQL5LicenseWrapper, downloadMQL5File } from '../utils/mql5Wrapper';
import {
  Terminal,
  Shield,
  Layers,
  ShoppingBag,
  Activity,
  Key,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  Download,
  AlertTriangle,
  Lock,
  Unlock,
  Calendar,
  Code,
  Save,
  Clock,
  User,
  ArrowRight,
  Coins,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'results' | 'licenses'>('licenses');

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('xtech_admin_session_auth') === 'ADMIN';
  });
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersSecondsRemaining, setOrdersSecondsRemaining] = useState(20);

  // Results State
  const [results, setResults] = useState<BotResult[]>([]);
  const [resultsSecondsRemaining, setResultsSecondsRemaining] = useState(15);

  // Licenses & EA Sources State
  const [licenses, setLicenses] = useState<License[]>([]);
  const [eaSources, setEaSources] = useState<EASource[]>([]);
  const [selectedSourceId, setSelectedSourceId] = useState<string>('');
  const [sourceCode, setSourceCode] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New License Form State
  const [newKeyEmail, setNewKeyEmail] = useState('');
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyDurationVal, setNewKeyDurationVal] = useState<number>(30);
  const [newKeyDurationType, setNewKeyDurationType] = useState<'days' | 'months'>('days');
  const [newKeyAccountLock, setNewKeyAccountLock] = useState('');
  const [generatingKey, setGeneratingKey] = useState(false);

  // Target License for source code injection download
  const [targetDownloadLicenseKey, setTargetDownloadLicenseKey] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/bot-results');
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLicenses = async () => {
    try {
      const res = await fetch('/api/licenses');
      const data = await res.json();
      setLicenses(data);
      if (data.length > 0 && !targetDownloadLicenseKey) {
        setTargetDownloadLicenseKey(data[0].license_key);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchEASources = async () => {
    try {
      const res = await fetch('/api/admin/ea-sources');
      const data: EASource[] = await res.json();
      setEaSources(data);
      if (data.length > 0) {
        setSelectedSourceId(data[0].id);
        setSourceCode(data[0].code);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    const cleanUser = authUsername.trim();
    const cleanPass = authPassword;

    // Direct check: ADMIN and XTECH255
    if (cleanUser.toUpperCase() === 'ADMIN' && cleanPass === 'XTECH255') {
      sessionStorage.setItem('xtech_admin_session_auth', 'ADMIN');
      setIsAdminAuthenticated(true);
      setIsLoggingIn(false);
      fetchProducts();
      fetchOrders();
      fetchResults();
      fetchLicenses();
      fetchEASources();
      return;
    }

    // Try server verification as well
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass }),
      });
      if (res.ok) {
        sessionStorage.setItem('xtech_admin_session_auth', 'ADMIN');
        setIsAdminAuthenticated(true);
        fetchProducts();
        fetchOrders();
        fetchResults();
        fetchLicenses();
        fetchEASources();
      } else {
        setAuthError('Access Denied: Invalid administrator username or password.');
      }
    } catch {
      setAuthError('Access Denied: Invalid credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('xtech_admin_session_auth');
    setIsAdminAuthenticated(false);
    setAuthPassword('');
    setAuthError(null);
  };

  // Admin Access: Fetch data when authenticated
  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchProducts();
      fetchOrders();
      fetchResults();
      fetchLicenses();
      fetchEASources();
    }
  }, [isAdminAuthenticated]);

  // Orders Auto-Refresh Timer (Every 20 seconds) - only when logged in
  useEffect(() => {
    if (!isAdminAuthenticated) return;
    const timer = setInterval(() => {
      setOrdersSecondsRemaining(prev => {
        if (prev <= 1) {
          fetchOrders();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isAdminAuthenticated]);

  // Results Auto-Refresh Timer (Every 15 seconds) - only when logged in
  useEffect(() => {
    if (!isAdminAuthenticated) return;
    const timer = setInterval(() => {
      setResultsSecondsRemaining(prev => {
        if (prev <= 1) {
          fetchResults();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isAdminAuthenticated]);

  const copyKeyToClipboard = (keyStr: string) => {
    navigator.clipboard.writeText(keyStr);
    setCopiedKey(keyStr);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyEmail) return;
    setGeneratingKey(true);
    try {
      const res = await fetch('/api/admin/licenses/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyer_email: newKeyEmail,
          buyer_name: newKeyName || newKeyEmail.split('@')[0],
          duration_value: newKeyDurationVal,
          duration_type: newKeyDurationType,
          mt5_account: newKeyAccountLock || null,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setNewKeyEmail('');
        setNewKeyName('');
        setNewKeyAccountLock('');
        setTargetDownloadLicenseKey(created.license_key);
        fetchLicenses();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingKey(false);
    }
  };

  const handleExtendLicense = async (id: string) => {
    try {
      await fetch(`/api/admin/licenses/${id}/extend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: 30 }),
      });
      fetchLicenses();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleLicense = async (id: string) => {
    try {
      await fetch(`/api/admin/licenses/${id}/toggle`, { method: 'POST' });
      fetchLicenses();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUnlinkAccount = async (id: string) => {
    try {
      await fetch(`/api/admin/licenses/${id}/unlink`, { method: 'POST' });
      fetchLicenses();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveCode = async () => {
    try {
      const current = eaSources.find(s => s.id === selectedSourceId);
      await fetch('/api/admin/ea-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: current?.name,
          code: sourceCode,
          is_new_version: false,
        }),
      });
      alert('Source code updated successfully.');
      fetchEASources();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveAsNewVersion = async () => {
    try {
      const nextVer = eaSources.length + 1;
      await fetch('/api/admin/ea-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Smart Scalper EA v${nextVer}.0`,
          code: sourceCode,
          is_new_version: true,
        }),
      });
      alert(`Created and saved as Smart Scalper EA v${nextVer}.0.`);
      fetchEASources();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadLicensedMQ5 = () => {
    if (!sourceCode) {
      alert('Source code box is empty.');
      return;
    }
    const key = targetDownloadLicenseKey.trim() || 'SSEA-DEMO-AUTH-KEY-000000';
    const serverOrigin = window.location.origin;
    const finalCode = injectMQL5LicenseWrapper(sourceCode, key, serverOrigin);
    downloadMQL5File(`SmartScalper_EA_${key.substring(0, 11)}`, finalCode);
  };

  const handleUpdateProduct = async (prod: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod),
      });
      if (!res.ok) throw new Error('Update failed');
      setEditingProduct(null);
      await fetchProducts();
      window.dispatchEvent(new Event('xtech_products_updated'));
      localStorage.setItem('xtech_products_updated', Date.now().toString());
      alert(`Success! "${prod.name}" has been updated. Live price ($${prod.price || 'Inquiry'}) and picture are now reflecting across the web page.`);
    } catch (e) {
      console.error(e);
      alert('Failed to update product. Please check console.');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen text-white bg-[#090a0d]/95 flex flex-col justify-between">
        <Navbar currentPath="/admin" navigate={navigate} />

        <div className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            
            {/* Login Card */}
            <div className="rounded-3xl border border-[#d4af37]/40 bg-[#111218] p-7 sm:p-9 shadow-[0_24px_70px_rgba(0,0,0,0.9)] relative overflow-hidden">
              {/* Subtle gold ambient glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#ffd700]/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#ffd700]/10 blur-3xl" />

              <div className="relative z-10 space-y-6">
                
                {/* Header with Icon */}
                <div className="text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/60 bg-[#191b26] text-[#ffd700] shadow-lg">
                    <ShieldCheck className="h-7 w-7 text-[#ffd700]" />
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
                        XTECH ALGO LAB
                      </span>
                      <span className="text-neutral-600">/</span>
                      <span className="font-mono text-xs text-neutral-400 font-semibold">
                        SECURITY GATE
                      </span>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-1">
                      ADMIN OPERATIONS
                    </h2>
                    <p className="text-xs text-neutral-300 font-mono mt-1">
                      Restricted master terminal. Enter administrator credentials to manage products, licenses, and bot operations.
                    </p>
                  </div>
                </div>

                {/* Error Banner */}
                {authError && (
                  <div className="rounded-xl border border-red-500/50 bg-red-950/50 p-3.5 text-xs text-red-200 flex items-start space-x-2.5 shadow-sm">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="font-medium">{authError}</span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase font-bold text-neutral-300 mb-1.5">
                      Administrator Username
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={authUsername}
                        onChange={(e) => setAuthUsername(e.target.value)}
                        placeholder="ADMIN"
                        autoCapitalize="characters"
                        required
                        className="w-full rounded-xl border border-[#d4af37]/35 bg-[#161722] pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 font-mono focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] outline-hidden transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase font-bold text-neutral-300 mb-1.5">
                      Master Passphrase
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="Enter admin passphrase"
                        required
                        className="w-full rounded-xl border border-[#d4af37]/35 bg-[#161722] pl-10 pr-10 py-3 text-sm text-white placeholder-neutral-500 font-mono focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] outline-hidden transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="gold-btn w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:brightness-105 transition-all mt-2"
                  >
                    <span>{isLoggingIn ? 'Authenticating...' : 'Unlock Admin Operations'}</span>
                    <ArrowRight className="h-4 w-4 text-black" />
                  </button>
                </form>

                {/* Security Note */}
                <div className="pt-3 border-t border-neutral-800 text-center space-y-1">
                  <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] text-neutral-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Hardware-Guarded Terminal · <strong>XTech Algo Lab</strong></span>
                  </div>
                  <p className="text-[10px] font-mono text-neutral-500">
                    Dual Architecture MT4 &amp; MT5 Institutional Console
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        <Footer navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-[#090a0d]/90">
      <Navbar currentPath="/admin" navigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#d4af37]/30 pb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af37]/60 bg-[#171822] text-[#ffd700] shadow-md">
              <Coins className="h-6 w-6 text-[#ffd700]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white flex items-center space-x-1.5">
                  <span className="text-[#ffd700]">X</span>
                  <span>TECH</span>
                  <span className="text-neutral-300">ADMIN OPERATIONS</span>
                </h1>
                <span className="rounded-md bg-emerald-950 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/50">
                  SERVER GUARDED
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 font-semibold">
                Master Terminal: <span className="text-[#ffd700] font-bold">System Administration Console</span> · XTech Algo Trading (MT4 &amp; MT5)
              </p>
            </div>
          </div>

          {/* Right Action: Active Admin & Logout */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 rounded-xl bg-[#161722] border border-[#d4af37]/35 px-3 py-2 font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-400 font-bold">OPERATOR:</span>
              <span className="text-[#ffd700] font-black">ADMIN</span>
            </div>

            <button
              onClick={handleAdminLogout}
              className="flex items-center space-x-1.5 rounded-xl border border-red-500/40 bg-red-950/40 hover:bg-red-900/60 hover:border-red-400 px-3.5 py-2 font-mono text-xs font-bold text-red-300 transition-all cursor-pointer shadow-xs"
            >
              <LogOut className="h-3.5 w-3.5 text-red-400" />
              <span>LOG OUT</span>
            </button>

            {/* Tab Navigation */}
            <div className="flex rounded-xl border border-[#d4af37]/30 bg-[#121319] p-1 font-mono text-xs shadow-sm">
              <button
                onClick={() => setActiveTab('licenses')}
                className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-bold uppercase transition-all cursor-pointer ${
                  activeTab === 'licenses'
                    ? 'gold-btn text-black shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Key className="h-3.5 w-3.5" />
                <span>License Keys</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-bold uppercase transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'gold-btn text-black shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Products</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-bold uppercase transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'gold-btn text-black shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Orders</span>
                <span className="text-[10px] opacity-75">({ordersSecondsRemaining}s)</span>
              </button>

              <button
                onClick={() => setActiveTab('results')}
                className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-bold uppercase transition-all cursor-pointer ${
                  activeTab === 'results'
                    ? 'gold-btn text-black shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Activity className="h-3.5 w-3.5" />
                <span>Results</span>
                <span className="text-[10px] opacity-75">({resultsSecondsRemaining}s)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= TAB 1: LICENCE KEY SYSTEM ================= */}
        {activeTab === 'licenses' && (
          <div className="space-y-8">
            
            {/* Top MQL5 Source Code Box & Compiler Wrapper */}
            <div className="rounded-2xl border border-[#d4af37]/25 bg-[#111218] p-6 space-y-4 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-[#ffd700]" />
                    <h2 className="text-sm font-bold uppercase text-white font-mono">
                      EA MQL5 Source Code &amp; Version Archive
                    </h2>
                  </div>
                  <p className="text-xs text-neutral-300 mt-1">
                    Paste raw .mq5 code. The download wraps your logic with CheckLicense() for MT5 WebRequest verification. Compile with MetaEditor (F7).
                  </p>
                </div>

                {/* Version Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Versions:</span>
                  {eaSources.map(src => (
                    <button
                      key={src.id}
                      onClick={() => {
                        setSelectedSourceId(src.id);
                        setSourceCode(src.code);
                      }}
                      className={`rounded-lg px-3 py-1 text-[11px] font-mono transition-all cursor-pointer ${
                        selectedSourceId === src.id
                          ? 'border border-[#d4af37] bg-[#171822] text-[#ffd700] font-bold shadow-xs'
                          : 'border border-neutral-800 bg-[#14151e] text-neutral-300 hover:text-white'
                      }`}
                    >
                      {src.name} · {new Date(src.updated_at).toLocaleDateString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source code textarea */}
              <div className="relative">
                <textarea
                  value={sourceCode}
                  onChange={e => setSourceCode(e.target.value)}
                  placeholder="// Paste your MetaTrader 5 Expert Advisor .mq5 source code here..."
                  rows={9}
                  className="w-full rounded-xl border border-neutral-800 bg-[#0d0e13] p-4 font-mono text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  spellCheck={false}
                />
              </div>

              {/* Source Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSaveCode}
                    className="flex items-center space-x-1.5 rounded-xl border border-[#d4af37]/35 bg-[#14151e] px-4 py-2.5 text-xs font-mono font-bold text-white hover:border-[#ffd700] transition-colors shadow-xs cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5 text-[#ffd700]" />
                    <span>Save Code (Active Version)</span>
                  </button>

                  <button
                    onClick={handleSaveAsNewVersion}
                    className="flex items-center space-x-1.5 rounded-xl border border-[#d4af37]/35 bg-[#14151e] px-4 py-2.5 text-xs font-mono font-bold text-white hover:border-[#ffd700] transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Save as New Version</span>
                  </button>
                </div>

                {/* Download Licensed .mq5 with Key Injection */}
                <div className="flex items-center space-x-2">
                  <select
                    value={targetDownloadLicenseKey}
                    onChange={e => setTargetDownloadLicenseKey(e.target.value)}
                    className="rounded-xl border border-neutral-700 bg-[#161722] px-3.5 py-2.5 text-xs font-mono text-white focus:border-[#ffd700] focus:outline-none shadow-xs"
                  >
                    {licenses.map(l => (
                      <option key={l.id} value={l.license_key}>
                        Wrap with {l.buyer_name} ({l.license_key.substring(0, 11)}...)
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleDownloadLicensedMQ5}
                    className="gold-btn flex items-center space-x-1.5 rounded-xl px-5 py-2.5 text-xs font-mono font-extrabold uppercase cursor-pointer shadow-md"
                  >
                    <Download className="h-3.5 w-3.5 text-black" />
                    <span>Download Licensed .mq5</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Key Generation Section */}
            <div className="rounded-2xl border border-[#d4af37]/25 bg-[#111218] p-6 space-y-4 shadow-md">
              <div className="flex items-center space-x-2 border-b border-neutral-800 pb-3">
                <Key className="h-4 w-4 text-[#ffd700]" />
                <h2 className="text-sm font-bold uppercase text-white font-mono">
                  Generate New SSEA Hex License Key
                </h2>
              </div>

              <form onSubmit={handleGenerateKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Buyer Email</label>
                  <input
                    type="email"
                    required
                    value={newKeyEmail}
                    onChange={e => setNewKeyEmail(e.target.value)}
                    placeholder="buyer@gmail.com"
                    className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Buyer Full Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={e => setNewKeyName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">Duration &amp; Unit</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min={1}
                      required
                      value={newKeyDurationVal}
                      onChange={e => setNewKeyDurationVal(Number(e.target.value))}
                      className="w-20 rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                    />
                    <select
                      value={newKeyDurationType}
                      onChange={e => setNewKeyDurationType(e.target.value as 'days' | 'months')}
                      className="flex-1 rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                    >
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold">MT5 Account Lock (Optional)</label>
                  <input
                    type="text"
                    value={newKeyAccountLock}
                    onChange={e => setNewKeyAccountLock(e.target.value)}
                    placeholder="e.g. 51092834"
                    className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={generatingKey}
                    className="w-full gold-btn py-2.5 rounded-xl text-xs font-extrabold uppercase flex items-center justify-center space-x-1 cursor-pointer shadow-md text-black"
                  >
                    <Plus className="h-4 w-4 text-black" />
                    <span>{generatingKey ? 'Creating...' : 'Generate Key'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Issued Keys Table */}
            <div className="rounded-2xl border border-[#d4af37]/25 bg-[#111218] overflow-hidden shadow-md">
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase text-white">
                  Active Licensed Bots ({licenses.length})
                </span>
                <span className="text-[11px] font-mono text-neutral-400 font-semibold">
                  Verification API: POST /api/public/license/verify
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-neutral-800 bg-[#161722] text-[10px] text-neutral-400 uppercase font-bold">
                    <tr>
                      <th className="p-3.5">Buyer</th>
                      <th className="p-3.5">License Key (Copy Only)</th>
                      <th className="p-3.5">MT5 Account</th>
                      <th className="p-3.5">Remaining</th>
                      <th className="p-3.5">Last Check</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {licenses.map(lic => {
                      const now = new Date();
                      const expiry = new Date(lic.expires_at);
                      const diffMs = expiry.getTime() - now.getTime();
                      const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
                      const isExpiringSoon = daysLeft <= 5;

                      return (
                        <tr key={lic.id} className="hover:bg-[#161722]/60 transition-colors">
                          <td className="p-3.5">
                            <span className="font-bold text-white block">{lic.buyer_name}</span>
                            <span className="text-neutral-400 text-[10px]">{lic.buyer_email}</span>
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono font-bold text-[#ffd700] select-all tracking-wider">
                                {lic.license_key}
                              </span>
                              <button
                                onClick={() => copyKeyToClipboard(lic.license_key)}
                                className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                                title="Copy Key"
                              >
                                {copiedKey === lic.license_key ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                          </td>

                          <td className="p-3.5">
                            {lic.mt5_account ? (
                              <span className="text-white font-semibold">#{lic.mt5_account}</span>
                            ) : (
                              <span className="text-neutral-500 italic">Unbound</span>
                            )}
                          </td>

                          <td className="p-3.5">
                            <span
                              className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                                isExpiringSoon
                                  ? 'bg-amber-950 text-amber-300 border border-amber-500/50 animate-pulse'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                              }`}
                            >
                              {daysLeft} Days Remaining
                            </span>
                          </td>

                          <td className="p-3.5 text-[11px] text-neutral-400">
                            {lic.last_check_at
                              ? new Date(lic.last_check_at).toLocaleTimeString()
                              : 'Never checked'}
                          </td>

                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleExtendLicense(lic.id)}
                              className="rounded-lg border border-[#d4af37]/35 bg-[#161722] px-2.5 py-1 text-[10px] font-bold text-[#ffd700] hover:border-[#ffd700] cursor-pointer"
                            >
                              +30 Days
                            </button>

                            <button
                              onClick={() => handleToggleLicense(lic.id)}
                              className={`rounded-lg px-2.5 py-1 text-[10px] font-bold cursor-pointer ${
                                lic.status === 'active'
                                  ? 'border border-amber-500/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/50'
                                  : 'border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
                              }`}
                            >
                              {lic.status === 'active' ? 'Disable' : 'Enable'}
                            </button>

                            {lic.mt5_account && (
                              <button
                                onClick={() => handleUnlinkAccount(lic.id)}
                                className="rounded-lg border border-neutral-700 bg-[#161722] px-2.5 py-1 text-[10px] font-semibold text-neutral-300 hover:text-white cursor-pointer"
                              >
                                Unlink Acc
                              </button>
                            )}
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

        {/* ================= TAB 2: PRODUCTS ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold uppercase text-white">Product Catalog, Pricing &amp; Images</h2>
                <p className="text-xs font-mono text-neutral-400 font-semibold">
                  Update live prices, product explanations, and artwork. Changes reflect across the public storefront immediately.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(prod => (
                <div key={prod.id} className="rounded-2xl border border-[#d4af37]/30 bg-[#111218] p-6 space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div>
                      <h3 className="text-base font-bold uppercase text-white">{prod.name}</h3>
                      <span className="text-xs font-mono text-neutral-400">{prod.version} · {prod.platform}</span>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                        prod.active
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {prod.active ? 'Active on Storefront' : 'Hidden'}
                    </span>
                  </div>

                  {editingProduct?.id === prod.id ? (
                    <div className="space-y-4 font-mono text-xs">
                      {/* Price & Currency */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <label className="block text-neutral-300 mb-1 font-semibold">Price (USD)</label>
                          <input
                            type="number"
                            value={editingProduct.price ?? ''}
                            onChange={e =>
                              setEditingProduct({
                                ...editingProduct,
                                price: e.target.value === '' ? null : Number(e.target.value),
                              })
                            }
                            placeholder="e.g. 299"
                            className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-300 mb-1 font-semibold">Currency</label>
                          <input
                            type="text"
                            value={editingProduct.currency || 'USD'}
                            onChange={e => setEditingProduct({ ...editingProduct, currency: e.target.value })}
                            className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Product Image URL with Live Preview */}
                      <div>
                        <label className="block text-neutral-300 mb-1 font-semibold">Product Picture URL</label>
                        <input
                          type="text"
                          value={editingProduct.image_url || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                          placeholder="Image URL or /src/assets/images/..."
                          className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                        />

                        {/* Quick preset buttons */}
                        <div className="flex flex-wrap gap-1.5 mt-2 text-[10px]">
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProduct({
                                ...editingProduct,
                                image_url: '/src/assets/images/berserker_scalp_box_official_1791111894715.jpg',
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-[#161722] border border-[#38bdf8]/50 text-[#38bdf8] hover:bg-[#1a2535] font-semibold cursor-pointer"
                          >
                            Use Official Berserker Box
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProduct({
                                ...editingProduct,
                                image_url: '/src/assets/images/snxperbot_adaptive_box_1791064534614.jpg',
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-[#161722] border border-[#f87171]/50 text-[#f87171] hover:bg-[#2e1919] font-semibold cursor-pointer"
                          >
                            Use Snxperbot Box
                          </button>
                        </div>

                        {/* Live Image Preview */}
                        {editingProduct.image_url && (
                          <div className="mt-3 p-3 rounded-xl border border-neutral-800 bg-[#0d0e13] flex items-center space-x-3">
                            <img
                              src={editingProduct.image_url}
                              alt="Preview"
                              className="h-16 w-16 object-contain rounded-lg border border-neutral-700 bg-black"
                            />
                            <div>
                              <span className="text-[11px] font-bold text-white block">Live Picture Preview</span>
                              <span className="text-[10px] text-neutral-400 truncate block max-w-xs">{editingProduct.image_url}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Product Name & Tagline */}
                      <div>
                        <label className="block text-neutral-300 mb-1 font-semibold">Product Name</label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-300 mb-1 font-semibold">Product Tagline</label>
                        <input
                          type="text"
                          value={editingProduct.tagline || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                          className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-300 mb-1 font-semibold">Product Explanation / Description</label>
                        <textarea
                          value={editingProduct.description}
                          onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          rows={3}
                          className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-2.5 text-white focus:border-[#ffd700] focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center space-x-3 pt-2">
                        <label className="flex items-center space-x-2 text-neutral-300 font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProduct.active}
                            onChange={e => setEditingProduct({ ...editingProduct, active: e.target.checked })}
                          />
                          <span>Show on Public Storefront</span>
                        </label>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <button
                          onClick={() => handleUpdateProduct(editingProduct)}
                          className="gold-btn px-5 py-2.5 rounded-xl text-xs font-bold uppercase shadow-sm cursor-pointer text-black"
                        >
                          Save Changes (Live Update)
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="px-3.5 py-2 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 font-mono text-xs">
                      {/* Thumbnail & Description Preview */}
                      <div className="flex items-center space-x-4">
                        {prod.image_url ? (
                          <img
                            src={prod.image_url}
                            alt={prod.name}
                            className="h-20 w-16 object-contain rounded-lg border border-neutral-800 bg-[#0d0e13] p-1 shrink-0"
                          />
                        ) : (
                          <div className="h-20 w-16 rounded-lg border border-dashed border-neutral-700 flex items-center justify-center text-neutral-500 text-[10px] shrink-0">
                            No Img
                          </div>
                        )}
                        <div className="flex-1">
                          <span className="text-[11px] font-bold text-[#ffd700] block">{prod.tagline}</span>
                          <p className="text-neutral-300 text-[11px] line-clamp-3 leading-relaxed mt-1">{prod.description}</p>
                        </div>
                      </div>
                      
                      <div className="rounded-xl border border-[#d4af37]/35 bg-[#161722] p-3 flex justify-between items-center">
                        <span className="text-neutral-400 font-semibold">Active Price:</span>
                        <span className="text-[#ffd700] font-bold text-base">
                          {prod.price !== null && prod.price !== undefined ? `$${prod.price} ${prod.currency || 'USD'}` : 'Custom Quote / Desk Inquiry'}
                        </span>
                      </div>

                      <div className="pt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="rounded-xl border border-[#d4af37]/40 bg-[#161722] px-3.5 py-2 text-xs font-semibold text-[#ffd700] hover:border-[#ffd700] hover:bg-[#1a1b26] flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-[#ffd700]" />
                          <span>Edit Price &amp; Picture</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold uppercase text-white">Buyer Orders</h2>
                <p className="text-xs font-mono text-neutral-400 font-semibold">
                  Auto-refreshing every 20 seconds. Next refresh in <span className="text-[#ffd700] font-bold">{ordersSecondsRemaining}s</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  fetchOrders();
                  setOrdersSecondsRemaining(20);
                }}
                className="flex items-center space-x-1.5 rounded-xl border border-[#d4af37]/35 bg-[#161722] px-3.5 py-2 text-xs font-mono text-neutral-200 hover:text-white hover:border-[#ffd700] cursor-pointer shadow-xs transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5 text-[#ffd700]" />
                <span>Refresh Now</span>
              </button>
            </div>

            <div className="rounded-2xl border border-[#d4af37]/30 bg-[#111218] overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-neutral-800 bg-[#161722] text-[10px] text-neutral-400 uppercase font-bold">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Buyer</th>
                      <th className="p-3.5">Product</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">MT5 Account</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Placed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {orders.map(ord => (
                      <tr key={ord.id} className="hover:bg-[#161722]/50 transition-colors">
                        <td className="p-3.5 font-bold text-white">{ord.id}</td>
                        <td className="p-3.5">
                          <span className="text-white font-semibold block">{ord.user_name}</span>
                          <span className="text-neutral-400 text-[10px]">{ord.user_email}</span>
                        </td>
                        <td className="p-3.5 text-neutral-300">{ord.product_name}</td>
                        <td className="p-3.5 text-[#ffd700] font-bold">
                          {ord.amount !== null ? `$${ord.amount} ${ord.currency}` : 'Direct Quote'}
                        </td>
                        <td className="p-3.5 text-neutral-400">{ord.mt5_account || '—'}</td>
                        <td className="p-3.5">
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                              ord.status === 'completed'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                                : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-neutral-400 text-[11px]">
                          {new Date(ord.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: BOT RESULTS ================= */}
        {activeTab === 'results' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold uppercase text-white">Live Bot Execution Monitoring</h2>
                <p className="text-xs font-mono text-neutral-400 font-semibold">
                  Performance stream per buyer account. Auto-refreshes every 15 seconds. Next in <span className="text-[#ffd700] font-bold">{resultsSecondsRemaining}s</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  fetchResults();
                  setResultsSecondsRemaining(15);
                }}
                className="flex items-center space-x-1.5 rounded-xl border border-[#d4af37]/35 bg-[#161722] px-3.5 py-2 text-xs font-mono text-neutral-200 hover:text-white hover:border-[#ffd700] cursor-pointer shadow-xs transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5 text-[#ffd700]" />
                <span>Refresh Now</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map(r => (
                <div key={r.id} className="rounded-2xl border border-[#d4af37]/30 bg-[#111218] p-5 space-y-3 font-mono text-xs shadow-md">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="font-bold text-white">{r.user_name}</span>
                    <span className="rounded bg-emerald-950 px-2 py-0.5 text-[9px] text-emerald-400 border border-emerald-500/50 uppercase font-bold">
                      {r.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-neutral-400 block text-[9px]">MT5 ACCOUNT</span>
                      <span className="text-white font-semibold">#{r.account_number}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[9px]">BROKER</span>
                      <span className="text-white font-semibold">{r.broker}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[9px]">SYMBOL</span>
                      <span className="text-[#ffd700] font-bold">{r.symbol}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[9px]">WIN RATE</span>
                      <span className="text-emerald-400 font-bold">{r.win_rate}%</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#d4af37]/25 bg-[#161722] p-3 flex justify-between items-center">
                    <div>
                      <span className="text-neutral-400 block text-[9px]">LIVE OPEN P&amp;L</span>
                      <span className={`font-bold ${r.open_pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {r.open_pnl >= 0 ? `+$${r.open_pnl}` : `-$${Math.abs(r.open_pnl)}`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-400 block text-[9px]">TOTAL CLOSED</span>
                      <span className="text-emerald-400 font-bold">+${r.total_profit}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-400 text-right">
                    Last Tick: {new Date(r.last_trade_time).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer navigate={navigate} />
    </div>
  );
};
