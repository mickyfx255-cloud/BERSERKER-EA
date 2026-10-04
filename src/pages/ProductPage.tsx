import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { DEFAULT_PRODUCTS } from '../data/defaultProduct';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import berserkerOfficialBox from '../assets/images/berserker_scalp_box_official_1791111894715.jpg';
import snxperbotBox from '../assets/images/snxperbot_adaptive_box_1791064534614.jpg';
import { Check, ShieldAlert, ArrowLeft, MessageCircle, ShoppingBag, CheckCircle, Zap, Cpu, Terminal, Lock, Coins, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface ProductPageProps {
  navigate: (path: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [selectedId, setSelectedId] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('id') || DEFAULT_PRODUCTS[0].id;
    } catch {
      return DEFAULT_PRODUCTS[0].id;
    }
  });

  const [loading, setLoading] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [mt5Account, setMt5Account] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('API unavailable');
        return res.json();
      })
      .then((data: Product[]) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();

    // Listen for cross-tab or in-app product updates from admin panel
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'xtech_products_updated') fetchProducts();
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('xtech_products_updated', fetchProducts);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('xtech_products_updated', fetchProducts);
    };
  }, []);

  const product = products.find(p => p.id === selectedId) || products[0];
  const isBerserker = product.id.includes('berserker') || product.name.includes('BERSERKER');
  const activeBoxImage = product?.image_url || (isBerserker ? berserkerOfficialBox : snxperbotBox);

  const handleBuyClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setOrderModalOpen(true);
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !user) return;
    setOrderSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          user_name: user.full_name,
          product_id: product.id,
          product_name: product.name,
          mt5_account: mt5Account,
          notes: orderNotes,
        }),
      });

      if (!res.ok) {
        throw new Error('Order creation failed');
      }

      const orderData = await res.json();
      setOrderSuccess(orderData.id);
    } catch (err) {
      console.error(err);
    } finally {
      setOrderSubmitting(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    `Hello XTech Algo Trading, I want to purchase ${product.name} (User: ${user?.email || 'Guest'}). Please confirm checkout instructions.`
  )}`;

  return (
    <div className="min-h-screen text-[#1a1a1a]">
      <Navbar currentPath="/product" navigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Navigation & Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-neutral-600 hover:text-[#0066ff] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO STOREFRONT</span>
          </button>

          {/* Product Switcher Bar */}
          <div className="flex items-center p-1 rounded-2xl bg-white border border-[#0066ff]/30 shadow-xs font-mono text-xs">
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                  p.id === selectedId
                    ? 'bg-[#18191e] text-[#ffd700] shadow-sm'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {p.name.includes('SCALP') ? 'Berserker Scalp AI' : 'Snxperbot Adaptive'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-[#0066ff] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Product Media Showcase (Clean, transparent, big size without restrictive dark box) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative w-full flex flex-col items-center justify-center p-4 sm:p-8 group min-h-[460px] sm:min-h-[560px]">
                {/* Subtle atmospheric ambient glow */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-[#0066ff]/15 via-[#ffd700]/15 to-transparent blur-3xl" />
                </div>

                {/* Big Transparent 3D Product Box */}
                <div className="relative z-10 w-full flex items-center justify-center">
                  <img
                    src={activeBoxImage}
                    alt={product?.name || 'Product Box'}
                    referrerPolicy="no-referrer"
                    className="h-auto max-h-[560px] sm:max-h-[640px] w-auto max-w-full object-contain filter drop-shadow-[0_28px_50px_rgba(0,0,0,0.35)] transition-transform duration-700 group-hover:scale-105 select-none"
                  />
                </div>

                {/* Platform & Version badges floating cleanly underneath */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 z-10 font-mono text-xs">
                  <span className="rounded-full bg-black/90 backdrop-blur-md px-3.5 py-1.5 font-bold text-white border border-[#0066ff]/50 shadow-md">
                    {product?.platform || 'MT4 & MT5 DUAL ARCHITECTURE'}
                  </span>
                  <span className="rounded-full bg-[#eff6ff] border border-[#0066ff]/60 px-3 py-1.5 font-bold text-[#0066ff] shadow-xs">
                    {product?.version || 'v3.2.0 (Dual MT4/MT5)'}
                  </span>
                </div>
              </div>

              {/* Delivery specifications */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="rounded-2xl border border-neutral-200/80 bg-white/95 p-3.5 shadow-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">FORMAT</span>
                  <span className="text-[#1a1a1a] font-bold">.ex4 &amp; .ex5 Dual</span>
                </div>
                <div className="rounded-2xl border border-neutral-200/80 bg-white/95 p-3.5 shadow-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">AUTH</span>
                  <span className="text-[#0066ff] font-bold">WebRequest</span>
                </div>
                <div className="rounded-2xl border border-neutral-200/80 bg-white/95 p-3.5 shadow-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">UPDATES</span>
                  <span className="text-[#059669] font-bold">MT4/MT5 Inc.</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Specs & Order actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#0066ff] uppercase tracking-wider mb-2 font-bold">
                  <Coins className="h-4 w-4" />
                  <span>{product.brand || 'XTech Algo Trading'}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
                  {product?.name}
                </h1>
                <p className="mt-2 text-sm text-[#d97706] font-mono font-bold tracking-wide">
                  {product?.tagline}
                </p>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed font-sans">
                  {product?.description}
                </p>
              </div>

              {/* Feature Pillars */}
              {product.pillars && product.pillars.length > 0 && (
                <div className="rounded-2xl border border-neutral-200 bg-white/90 p-4 space-y-2 shadow-xs">
                  <span className="text-[10px] font-mono uppercase font-bold text-neutral-500 tracking-wider block">
                    Core Algorithmic Pillars:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {product.pillars.map((pil, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-neutral-800">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="font-semibold">{pil}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Price Block */}
              <div className="rounded-2xl border border-[#0066ff]/40 bg-white p-6 sm:p-7 shadow-[0_12px_45px_rgba(0,102,255,0.1)]">
                <span className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                  Active System Price
                </span>

                {product?.price !== null && product?.price !== undefined ? (
                  <div className="flex items-baseline space-x-3">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#0066ff] font-mono">
                      ${product.price}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 uppercase font-semibold">
                      {product.currency || 'USD'} · Lifetime MT4 &amp; MT5 License
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-extrabold text-[#1a1a1a] font-mono">
                      Custom Quote / Desk Allocation
                    </span>
                    <p className="mt-1 text-xs text-neutral-500">
                      Licenses are assigned directly with hardware ID binding. Inquire via WhatsApp or place an order request below.
                    </p>
                  </div>
                )}

                {/* Primary Buy CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleBuyClick}
                    className="flex-1 gold-btn rounded-xl py-3.5 px-6 text-xs font-extrabold uppercase tracking-wider text-center cursor-pointer flex items-center justify-center space-x-2 shadow-md"
                  >
                    <ShoppingBag className="h-4 w-4 text-black" />
                    <span>{user ? 'Request License Activation' : 'Sign In to Order'}</span>
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 rounded-xl border border-emerald-500 bg-emerald-50 px-5 py-3.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>

                {!user && (
                  <p className="mt-3 text-[11px] text-neutral-500 font-mono text-center">
                    * Sign in with your trader account to manage remote MT4/MT5 bindings.
                  </p>
                )}
              </div>

              {/* Full Specs List */}
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
                  Technical Specifications:
                </h3>
                <div className="space-y-2 border-t border-neutral-200 pt-3">
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Trading Platform</span>
                    <span className="text-[#1a1a1a] font-bold">{product?.platform || 'MetaTrader 4 & MetaTrader 5'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Target Timeframe</span>
                    <span className="text-[#1a1a1a] font-bold">{product?.timeframe}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Minimum Capital</span>
                    <span className="text-emerald-700 font-bold">${product?.min_deposit || 100} USD</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Pairs Supported</span>
                    <span className="text-[#1a1a1a] font-bold">{product?.recommended_pairs.join(' · ')}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Risk Engine</span>
                    <span className="text-emerald-700 font-bold">Hard Stop-Loss · Zero Martingale</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Order Modal */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="terminal-card w-full max-w-lg rounded-2xl p-6 sm:p-8 space-y-6 bg-white border border-[#0066ff]/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-[#1a1a1a]">
                  Request System Activation
                </h3>
                <p className="text-xs font-mono text-neutral-500">
                  {product.name} · MT4 &amp; MT5 License
                </p>
              </div>
              <button
                onClick={() => {
                  setOrderModalOpen(false);
                  setOrderSuccess(null);
                }}
                className="text-neutral-400 hover:text-black font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {orderSuccess ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h4 className="text-base font-bold text-neutral-800">
                  Order Successfully Registered!
                </h4>
                <p className="text-xs font-mono text-neutral-600 max-w-sm mx-auto">
                  Order Reference: <strong className="text-black">{orderSuccess}</strong>. The XTech Algo Trading desk will assign your WebRequest license key and send deployment instructions.
                </p>
                <div className="pt-2 flex flex-col gap-2 font-mono">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="gold-btn py-3 px-6 rounded-xl text-xs font-bold uppercase cursor-pointer"
                  >
                    View in Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setOrderModalOpen(false);
                      setOrderSuccess(null);
                    }}
                    className="text-xs text-neutral-500 hover:text-black cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitOrder} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Trader Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-100 p-3 text-neutral-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    MetaTrader Account Number (MT4 or MT5)
                  </label>
                  <input
                    type="text"
                    value={mt5Account}
                    onChange={e => setMt5Account(e.target.value)}
                    placeholder="e.g. 51092834 (MT4 or MT5 Account)"
                    className="w-full rounded-xl border border-neutral-300 bg-white p-3 text-neutral-900 focus:border-[#0066ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">
                    Order Notes / Terminal Preference (MT4 or MT5)
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={e => setOrderNotes(e.target.value)}
                    placeholder="e.g. Need MT4 build for IC Markets, or MT5 build for FTMO challenge..."
                    className="w-full rounded-xl border border-neutral-300 bg-white p-3 text-neutral-900 focus:border-[#0066ff] focus:outline-none"
                  />
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-[11px] text-blue-900 border border-blue-200 space-y-1">
                  <span className="font-bold block">License Delivery Protocol:</span>
                  <p>
                    All licenses are protected by 128-bit hardware-locked WebRequest authentication. Support available 24/5.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-neutral-300 text-neutral-600 hover:bg-neutral-100 font-bold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={orderSubmitting}
                    className="flex-1 gold-btn py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-md"
                  >
                    {orderSubmitting ? 'Registering...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer navigate={navigate} />
    </div>
  );
};
