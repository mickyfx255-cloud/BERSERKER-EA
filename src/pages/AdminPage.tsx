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
} from 'lucide-react';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'results' | 'licenses'>('licenses');

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

  // Protect Admin Access
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

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

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
      fetchResults();
      fetchLicenses();
      fetchEASources();
    }
  }, [isAdmin]);

  // Orders Auto-Refresh Timer (Every 20 seconds)
  useEffect(() => {
    if (!isAdmin) return;
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
  }, [isAdmin]);

  // Results Auto-Refresh Timer (Every 15 seconds)
  useEffect(() => {
    if (!isAdmin) return;
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
  }, [isAdmin]);

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
      await fetch(`/api/admin/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod),
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
        <div className="clay-card p-8 sm:p-10 max-w-lg text-center space-y-5">
          <div className="clay-icon-bubble mx-auto flex h-16 w-16 items-center justify-center text-red-500">
            <Lock className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-[#1a1a1a]">
            Restricted Admin Panel
          </h2>
          <p className="text-xs font-mono text-neutral-600 leading-relaxed">
            Automatic access to the Berserker EA Administration Terminal is strictly reserved for authorized administrator accounts.
          </p>

          <div className="rounded-2xl border border-neutral-200 bg-[#faf8f5] p-4 text-xs font-mono space-y-1.5 text-center">
            <div className="flex items-center justify-center space-x-2 text-neutral-800 font-bold">
              <Shield className="h-4 w-4 text-[#aa851d]" />
              <span>Restricted Internal Gateway</span>
            </div>
            <p className="text-neutral-600 text-[11px]">
              Administrative access is reserved for verified system operators with active security clearance.
            </p>
          </div>

          {user && (
            <p className="text-[11px] font-mono text-red-600">
              Current account <span className="font-bold underline">{user.email}</span> does not have admin permissions.
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2 font-mono">
            <button
              onClick={() => navigate('/auth')}
              className="clay-btn-gold py-3.5 px-6 rounded-2xl text-xs font-extrabold uppercase text-black cursor-pointer shadow-md"
            >
              Sign In with Authorized Admin Account
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-neutral-500 hover:text-black text-xs font-semibold py-1 cursor-pointer"
            >
              ← Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#1a1a1a]">
      <Navbar currentPath="/admin" navigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#d4af37]/30 pb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af37] bg-[#faf4e6] text-[#aa851d] shadow-sm">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
                  BERSERKER EA ADMINISTRATION
                </h1>
                <span className="rounded-md bg-[#faf4e6] px-2 py-0.5 text-[10px] font-mono font-bold text-[#855f0b] border border-[#d4af37]/50">
                  SERVER GUARDED
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-500 font-semibold">
                Master Terminal: <span className="text-[#855f0b] font-bold">System Administration Console</span> · EA ALGO COMMUNITY
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex rounded-xl border border-neutral-300 bg-white p-1 font-mono text-xs shadow-sm">
            <button
              onClick={() => setActiveTab('licenses')}
              className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-bold uppercase transition-all ${
                activeTab === 'licenses'
                  ? 'bg-[#d4af37] text-black shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Key className="h-3.5 w-3.5" />
              <span>Licence Keys</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-bold uppercase transition-all ${
                activeTab === 'products'
                  ? 'bg-[#d4af37] text-black shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Products</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-bold uppercase transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#d4af37] text-black shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Orders</span>
              <span className="text-[10px] text-neutral-500">({ordersSecondsRemaining}s)</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-bold uppercase transition-all ${
                activeTab === 'results'
                  ? 'bg-[#d4af37] text-black shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Results</span>
              <span className="text-[10px] text-neutral-500">({resultsSecondsRemaining}s)</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: LICENCE KEY SYSTEM ================= */}
        {activeTab === 'licenses' && (
          <div className="space-y-8">
            
            {/* Top MQL5 Source Code Box & Compiler Wrapper */}
            <div className="rounded-2xl border border-[#d4af37]/40 bg-white p-6 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-[#aa851d]" />
                    <h2 className="text-sm font-bold uppercase text-[#1a1a1a] font-mono">
                      EA MQL5 Source Code & Version Archive
                    </h2>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Paste raw .mq5 code. The download wraps your logic with CheckLicense() for MT5 WebRequest verification. Compile with MetaEditor (F7).
                  </p>
                </div>

                {/* Version Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Versions:</span>
                  {eaSources.map(src => (
                    <button
                      key={src.id}
                      onClick={() => {
                        setSelectedSourceId(src.id);
                        setSourceCode(src.code);
                      }}
                      className={`rounded-lg px-3 py-1 text-[11px] font-mono transition-all ${
                        selectedSourceId === src.id
                          ? 'border border-[#d4af37] bg-[#faf4e6] text-[#855f0b] font-bold shadow-xs'
                          : 'border border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
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
                  className="w-full rounded-xl border border-neutral-300 bg-[#16171d] p-4 font-mono text-xs text-[#faf8f5] focus:border-[#d4af37] focus:outline-none"
                  spellCheck={false}
                />
              </div>

              {/* Source Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSaveCode}
                    className="flex items-center space-x-1.5 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-mono font-bold text-neutral-800 hover:border-[#aa851d] hover:bg-[#faf4e6] transition-colors shadow-xs"
                  >
                    <Save className="h-3.5 w-3.5 text-[#aa851d]" />
                    <span>Save Code (Active Version)</span>
                  </button>

                  <button
                    onClick={handleSaveAsNewVersion}
                    className="flex items-center space-x-1.5 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-mono font-bold text-neutral-800 hover:border-[#aa851d] hover:bg-[#faf4e6] transition-colors shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5 text-[#059669]" />
                    <span>Save as New Version</span>
                  </button>
                </div>

                {/* Download Licensed .mq5 with Key Injection */}
                <div className="flex items-center space-x-2">
                  <select
                    value={targetDownloadLicenseKey}
                    onChange={e => setTargetDownloadLicenseKey(e.target.value)}
                    className="rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-mono text-neutral-800 focus:border-[#aa851d] focus:outline-none shadow-xs"
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
            <div className="rounded-2xl border border-[#d4af37]/40 bg-white p-6 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 border-b border-neutral-100 pb-3">
                <Key className="h-4 w-4 text-[#aa851d]" />
                <h2 className="text-sm font-bold uppercase text-[#1a1a1a] font-mono">
                  Generate New SSEA Hex License Key
                </h2>
              </div>

              <form onSubmit={handleGenerateKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Buyer Email</label>
                  <input
                    type="email"
                    required
                    value={newKeyEmail}
                    onChange={e => setNewKeyEmail(e.target.value)}
                    placeholder="buyer@gmail.com"
                    className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] p-2.5 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Buyer Full Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={e => setNewKeyName(e.target.value)}
                    placeholder="Full name"
                    className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] p-2.5 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Duration & Unit</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min={1}
                      required
                      value={newKeyDurationVal}
                      onChange={e => setNewKeyDurationVal(Number(e.target.value))}
                      className="w-20 rounded-xl border border-neutral-300 bg-[#faf8f5] p-2.5 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                    />
                    <select
                      value={newKeyDurationType}
                      onChange={e => setNewKeyDurationType(e.target.value as 'days' | 'months')}
                      className="flex-1 rounded-xl border border-neutral-300 bg-[#faf8f5] p-2.5 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                    >
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">MT5 Account Lock (Optional)</label>
                  <input
                    type="text"
                    value={newKeyAccountLock}
                    onChange={e => setNewKeyAccountLock(e.target.value)}
                    placeholder="e.g. 51092834"
                    className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] p-2.5 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={generatingKey}
                    className="w-full gold-btn py-2.5 rounded-xl text-xs font-bold uppercase flex items-center justify-center space-x-1 cursor-pointer shadow-md"
                  >
                    <Plus className="h-4 w-4 text-black" />
                    <span>{generatingKey ? 'Creating...' : 'Generate Key'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Issued Keys Table */}
            <div className="rounded-2xl border border-[#d4af37]/35 bg-white overflow-hidden shadow-sm">
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase text-[#1a1a1a]">
                  Active Licensed Bots ({licenses.length})
                </span>
                <span className="text-[11px] font-mono text-neutral-500 font-semibold">
                  Verification API: POST /api/public/license/verify
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-neutral-200 bg-[#faf8f5] text-[10px] text-neutral-500 uppercase font-bold">
                    <tr>
                      <th className="p-3.5">Buyer</th>
                      <th className="p-3.5">License Key (Copy Only)</th>
                      <th className="p-3.5">MT5 Account</th>
                      <th className="p-3.5">Remaining</th>
                      <th className="p-3.5">Last Check</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {licenses.map(lic => {
                      const now = new Date();
                      const expiry = new Date(lic.expires_at);
                      const diffMs = expiry.getTime() - now.getTime();
                      const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
                      const isExpiringSoon = daysLeft <= 5;

                      return (
                        <tr key={lic.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-3.5">
                            <span className="font-bold text-[#1a1a1a] block">{lic.buyer_name}</span>
                            <span className="text-neutral-500 text-[10px]">{lic.buyer_email}</span>
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono font-bold text-[#855f0b] select-all tracking-wider">
                                {lic.license_key}
                              </span>
                              <button
                                onClick={() => copyKeyToClipboard(lic.license_key)}
                                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
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
                              <span className="text-neutral-800 font-semibold">#{lic.mt5_account}</span>
                            ) : (
                              <span className="text-neutral-400 italic">Unbound</span>
                            )}
                          </td>

                          <td className="p-3.5">
                            <span
                              className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                                isExpiringSoon
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              }`}
                            >
                              {daysLeft} Days Remaining
                            </span>
                          </td>

                          <td className="p-3.5 text-[11px] text-neutral-500">
                            {lic.last_check_at
                              ? new Date(lic.last_check_at).toLocaleTimeString()
                              : 'Never checked'}
                          </td>

                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleExtendLicense(lic.id)}
                              className="rounded-lg border border-neutral-300 bg-white px-2.5 py-1 text-[10px] font-bold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                            >
                              +30 Days
                            </button>

                            <button
                              onClick={() => handleToggleLicense(lic.id)}
                              className={`rounded-lg px-2.5 py-1 text-[10px] font-bold cursor-pointer ${
                                lic.status === 'active'
                                  ? 'border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
                                  : 'border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                              }`}
                            >
                              {lic.status === 'active' ? 'Disable' : 'Enable'}
                            </button>

                            {lic.mt5_account && (
                              <button
                                onClick={() => handleUnlinkAccount(lic.id)}
                                className="rounded-lg border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold text-neutral-600 hover:text-black cursor-pointer"
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
                <h2 className="text-lg font-bold uppercase text-[#1a1a1a]">Product Catalog & Pricing</h2>
                <p className="text-xs font-mono text-neutral-500 font-semibold">
                  Rule: Storefront displays only one active product (Smart Scalper EA). New products start hidden.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(prod => (
                <div key={prod.id} className="rounded-2xl border border-[#d4af37]/35 bg-white p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold uppercase text-[#1a1a1a]">{prod.name}</h3>
                      <span className="text-xs font-mono text-neutral-500">{prod.version} · {prod.platform}</span>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                        prod.active
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                      }`}
                    >
                      {prod.active ? 'Active on Storefront' : 'Hidden'}
                    </span>
                  </div>

                  {editingProduct?.id === prod.id ? (
                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <label className="block text-neutral-600 mb-1 font-semibold">Price (Leave blank for 'Price coming soon')</label>
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
                          className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] p-2.5 text-neutral-900"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-600 mb-1 font-semibold">Product Description</label>
                        <textarea
                          value={editingProduct.description}
                          onChange={e =>
                            setEditingProduct({ ...editingProduct, description: e.target.value })
                          }
                          rows={3}
                          className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] p-2.5 text-neutral-900"
                        />
                      </div>

                      <div className="flex items-center space-x-3 pt-2">
                        <label className="flex items-center space-x-2 text-neutral-700 font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProduct.active}
                            onChange={e =>
                              setEditingProduct({ ...editingProduct, active: e.target.checked })
                            }
                          />
                          <span>Show on Public Storefront</span>
                        </label>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <button
                          onClick={() => handleUpdateProduct(editingProduct)}
                          className="gold-btn px-4 py-2 rounded-xl text-xs font-bold uppercase shadow-sm cursor-pointer"
                        >
                          Save Product
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="px-3 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 font-mono text-xs">
                      <p className="text-neutral-600 text-xs leading-relaxed">{prod.description}</p>
                      
                      <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf8f5] p-3 flex justify-between items-center">
                        <span className="text-neutral-500 font-semibold">Current Price:</span>
                        <span className="text-[#855f0b] font-bold text-sm">
                          {prod.price !== null ? `$${prod.price} ${prod.currency}` : 'Price coming soon'}
                        </span>
                      </div>

                      <div className="pt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700 hover:border-[#aa851d] hover:bg-[#faf4e6] flex items-center space-x-1 cursor-pointer"
                        >
                          <Edit2 className="h-3 w-3" />
                          <span>Edit Price & Details</span>
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
                <h2 className="text-lg font-bold uppercase text-[#1a1a1a]">Buyer Orders</h2>
                <p className="text-xs font-mono text-neutral-500 font-semibold">
                  Auto-refreshing every 20 seconds. Next refresh in <span className="text-[#aa851d] font-bold">{ordersSecondsRemaining}s</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  fetchOrders();
                  setOrdersSecondsRemaining(20);
                }}
                className="flex items-center space-x-1 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-mono text-neutral-700 hover:text-black cursor-pointer shadow-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh Now</span>
              </button>
            </div>

            <div className="rounded-2xl border border-[#d4af37]/35 bg-white overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-neutral-200 bg-[#faf8f5] text-[10px] text-neutral-500 uppercase font-bold">
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
                  <tbody className="divide-y divide-neutral-100">
                    {orders.map(ord => (
                      <tr key={ord.id} className="hover:bg-neutral-50">
                        <td className="p-3.5 font-bold text-[#1a1a1a]">{ord.id}</td>
                        <td className="p-3.5">
                          <span className="text-[#1a1a1a] font-semibold block">{ord.user_name}</span>
                          <span className="text-neutral-500 text-[10px]">{ord.user_email}</span>
                        </td>
                        <td className="p-3.5 text-neutral-700">{ord.product_name}</td>
                        <td className="p-3.5 text-[#855f0b] font-bold">
                          {ord.amount !== null ? `$${ord.amount} ${ord.currency}` : 'Direct Quote'}
                        </td>
                        <td className="p-3.5 text-neutral-600">{ord.mt5_account || '—'}</td>
                        <td className="p-3.5">
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                              ord.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
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
                <h2 className="text-lg font-bold uppercase text-[#1a1a1a]">Live Bot Execution Monitoring</h2>
                <p className="text-xs font-mono text-neutral-500 font-semibold">
                  Performance stream per buyer account. Auto-refreshes every 15 seconds. Next in <span className="text-[#aa851d] font-bold">{resultsSecondsRemaining}s</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  fetchResults();
                  setResultsSecondsRemaining(15);
                }}
                className="flex items-center space-x-1 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-mono text-neutral-700 hover:text-black cursor-pointer shadow-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh Now</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map(r => (
                <div key={r.id} className="rounded-2xl border border-[#d4af37]/35 bg-white p-5 space-y-3 font-mono text-xs shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <span className="font-bold text-[#1a1a1a]">{r.user_name}</span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[9px] text-emerald-800 border border-emerald-300 uppercase font-bold">
                      {r.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-neutral-500 block text-[9px]">MT5 ACCOUNT</span>
                      <span className="text-neutral-800 font-semibold">#{r.account_number}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[9px]">BROKER</span>
                      <span className="text-neutral-800 font-semibold">{r.broker}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[9px]">SYMBOL</span>
                      <span className="text-[#aa851d] font-bold">{r.symbol}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[9px]">WIN RATE</span>
                      <span className="text-emerald-700 font-bold">{r.win_rate}%</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf8f5] p-3 flex justify-between items-center">
                    <div>
                      <span className="text-neutral-500 block text-[9px]">LIVE OPEN P&L</span>
                      <span className={`font-bold ${r.open_pnl >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                        {r.open_pnl >= 0 ? `+$${r.open_pnl}` : `-$${Math.abs(r.open_pnl)}`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-500 block text-[9px]">TOTAL CLOSED</span>
                      <span className="text-emerald-700 font-bold">+${r.total_profit}</span>
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
