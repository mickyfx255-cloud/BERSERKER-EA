import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { DEFAULT_PRODUCTS } from '../data/defaultProduct';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import berserkerOfficialBox from '../assets/images/berserker_scalp_box_official_1791111894715.jpg';
import snxperbotBox from '../assets/images/snxperbot_adaptive_box_1791064534614.jpg';
import tradingWallpaper from '../assets/images/dark_gold_trading_wallpaper_1791724705881.jpg';
import {
  Check,
  ShieldAlert,
  ArrowLeft,
  MessageCircle,
  ShoppingBag,
  CheckCircle,
  Zap,
  Cpu,
  Terminal,
  Lock,
  Coins,
  Sparkles,
  CheckCircle2,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';

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
  const [traderEmail, setTraderEmail] = useState(user?.email || '');
  const [traderName, setTraderName] = useState(user?.full_name || '');
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

  useEffect(() => {
    if (user?.email && !traderEmail) {
      setTraderEmail(user.email);
    }
    if (user?.full_name && !traderName) {
      setTraderName(user.full_name);
    }
  }, [user]);

  const product = products.find(p => p.id === selectedId) || products[0];
  const isBerserker = product.id.includes('berserker') || product.name.includes('BERSERKER');
  const activeBoxImage = product?.image_url || (isBerserker ? berserkerOfficialBox : snxperbotBox);

  const handleBuyClick = () => {
    setOrderModalOpen(true);
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setOrderSubmitting(true);

    const emailToUse = traderEmail.trim() || user?.email || 'trader@client.xtech';
    const nameToUse = traderName.trim() || user?.full_name || 'Institutional Client';

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: emailToUse,
          user_name: nameToUse,
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
    `Hello XTech Algo Trading, I want to purchase ${product.name} (MT4 & MT5). Please confirm license activation.`
  )}`;

  return (
    <div className="min-h-screen text-white bg-[#090a0d]/90">
      <Navbar currentPath="/product" navigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Navigation & Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-neutral-300 hover:text-[#ffd700] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#ffd700]" />
            <span>RETURN TO STOREFRONT</span>
          </button>

          {/* Product Switcher Bar */}
          <div className="flex items-center p-1 rounded-2xl bg-[#121319] border border-[#d4af37]/30 shadow-xs font-mono text-xs">
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                  p.id === selectedId
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f5d061] text-black shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {p.name.includes('SCALP') ? 'Berserker Scalp AI' : 'Snxperbot Adaptive'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Product Media Showcase */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative w-full flex flex-col items-center justify-center p-4 sm:p-8 group min-h-[460px] sm:min-h-[560px] rounded-3xl bg-[#111218] border border-[#d4af37]/25 shadow-xl">
                {/* Subtle atmospheric ambient glow */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-[#d4af37]/15 via-[#ffd700]/10 to-transparent blur-3xl" />
                </div>

                {/* 3D Product Box */}
                <div className="relative z-10 w-full flex items-center justify-center">
                  <img
                    src={activeBoxImage}
                    alt={product?.name || 'Product Box'}
                    referrerPolicy="no-referrer"
                    className="h-auto max-h-[500px] sm:max-h-[580px] w-auto max-w-full object-contain filter drop-shadow-[0_28px_50px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-105 select-none"
                  />
                </div>

                {/* Platform & Version badges */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 z-10 font-mono text-xs">
                  <span className="rounded-full bg-black/90 backdrop-blur-md px-3.5 py-1.5 font-bold text-white border border-[#d4af37]/50 shadow-md">
                    {product?.platform || 'MT4 & MT5 DUAL ARCHITECTURE'}
                  </span>
                  <span className="rounded-full bg-[#171822] border border-[#d4af37]/40 px-3 py-1.5 font-bold text-[#ffd700] shadow-xs">
                    {product?.version || 'v3.2.0 (Dual MT4/MT5)'}
                  </span>
                </div>
              </div>

              {/* Delivery specifications */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="rounded-2xl border border-[#d4af37]/20 bg-[#111218] p-3.5 shadow-xs">
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">FORMAT</span>
                  <span className="text-white font-bold">.ex4 &amp; .ex5 Dual</span>
                </div>
                <div className="rounded-2xl border border-[#d4af37]/20 bg-[#111218] p-3.5 shadow-xs">
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">AUTH</span>
                  <span className="text-[#ffd700] font-bold">WebRequest</span>
                </div>
                <div className="rounded-2xl border border-[#d4af37]/20 bg-[#111218] p-3.5 shadow-xs">
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">UPDATES</span>
                  <span className="text-emerald-400 font-bold">MT4/MT5 Inc.</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Specs & Order actions */}
            <div className="lg:col-span-6 space-y-6">
              {/* Product Explanation with Trading Wallpaper Photo Background */}
              <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/35 p-6 shadow-xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 pointer-events-none"
                  style={{ backgroundImage: `url(${tradingWallpaper})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#111218]/90 via-[#111218]/80 to-[#111218]/95 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#ffd700] uppercase tracking-wider font-bold">
                    <Coins className="h-4 w-4 text-[#ffd700]" />
                    <span>{product.brand || 'XTech Algo Trading'}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white drop-shadow-sm">
                    {product?.name}
                  </h1>
                  <p className="text-sm text-[#d4af37] font-mono font-bold tracking-wide">
                    {product?.tagline}
                  </p>
                  <p className="text-sm text-neutral-200 leading-relaxed font-sans pt-1">
                    {product?.description}
                  </p>
                </div>
              </div>

              {/* Feature Pillars */}
              {product.pillars && product.pillars.length > 0 && (
                <div className="rounded-2xl border border-[#d4af37]/20 bg-[#111218] p-4 space-y-2 shadow-xs">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#d4af37] tracking-wider block">
                    Core Algorithmic Pillars:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {product.pillars.map((pil, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-neutral-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold">{pil}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Price Block in Dark Charcoal with Subtle Gold Border */}
              <div className="rounded-2xl border border-[#d4af37]/35 bg-[#111218] p-6 sm:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.8)]">
                <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                  Active System Price
                </span>

                {product?.price !== null && product?.price !== undefined ? (
                  <div className="flex items-baseline space-x-3">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#ffd700] font-mono">
                      ${product.price}
                    </span>
                    <span className="text-xs font-mono text-neutral-300 uppercase font-semibold">
                      {product.currency || 'USD'} · Lifetime MT4 &amp; MT5 License
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-extrabold text-white font-mono">
                      Custom Quote / Desk Allocation
                    </span>
                    <p className="mt-1 text-xs text-neutral-400">
                      Licenses are assigned directly with hardware ID binding. Inquire via WhatsApp or place an order request below.
                    </p>
                  </div>
                )}

                {/* Primary Buy CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleBuyClick}
                    className="flex-1 gold-btn rounded-xl py-3.5 px-6 text-xs font-extrabold uppercase tracking-wider text-center cursor-pointer flex items-center justify-center space-x-2 shadow-md hover:brightness-105"
                  >
                    <ShoppingBag className="h-4 w-4 text-black" />
                    <span>Request License Activation</span>
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-5 py-3.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/50 transition-colors shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-400" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>

                <p className="mt-3 text-[11px] text-neutral-400 font-mono text-center">
                  * Instant MQL4 &amp; MQL5 WebRequest activation. No sign-up required.
                </p>
              </div>

              {/* Full Specs List */}
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-sans">
                  Technical Specifications:
                </h3>
                <div className="space-y-2 border-t border-neutral-800 pt-3">
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-semibold">Trading Platform</span>
                    <span className="text-white font-bold">{product?.platform || 'MetaTrader 4 & MetaTrader 5'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-semibold">Target Timeframe</span>
                    <span className="text-white font-bold">{product?.timeframe}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-semibold">Minimum Capital</span>
                    <span className="text-emerald-400 font-bold">${product?.min_deposit || 100} USD</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-semibold">Pairs Supported</span>
                    <span className="text-white font-bold">{product?.recommended_pairs.join(' · ')}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800/60">
                    <span className="text-neutral-400 font-semibold">Risk Engine</span>
                    <span className="text-emerald-400 font-bold">Hard Stop-Loss · Zero Martingale</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Order Modal - Direct Client Request, Zero Sign-in Barrier */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="terminal-card w-full max-w-lg rounded-2xl p-6 sm:p-8 space-y-6 bg-[#111218] border border-[#d4af37]/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-white">
                  Request System Activation
                </h3>
                <p className="text-xs font-mono text-[#ffd700]">
                  {product.name} · MT4 &amp; MT5 License
                </p>
              </div>
              <button
                onClick={() => {
                  setOrderModalOpen(false);
                  setOrderSuccess(null);
                }}
                className="text-neutral-400 hover:text-white font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {orderSuccess ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Order Successfully Registered!
                </h4>
                <p className="text-xs font-mono text-neutral-300 max-w-sm mx-auto">
                  Order Reference: <strong className="text-[#ffd700]">{orderSuccess}</strong>. The XTech Algo Trading desk will assign your WebRequest license key and send deployment instructions.
                </p>
                <div className="pt-2 flex flex-col gap-2 font-mono">
                  <button
                    onClick={() => {
                      setOrderModalOpen(false);
                      setOrderSuccess(null);
                      navigate('/');
                    }}
                    className="gold-btn py-3 px-6 rounded-xl text-xs font-bold uppercase cursor-pointer"
                  >
                    Return to Storefront
                  </button>
                  <button
                    onClick={() => {
                      setOrderModalOpen(false);
                      setOrderSuccess(null);
                    }}
                    className="text-xs text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitOrder} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Trader Email
                  </label>
                  <input
                    type="email"
                    required
                    value={traderEmail}
                    onChange={e => setTraderEmail(e.target.value)}
                    placeholder="trader@gmail.com"
                    className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-3 text-white focus:border-[#ffd700] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Trader Full Name
                  </label>
                  <input
                    type="text"
                    value={traderName}
                    onChange={e => setTraderName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-3 text-white focus:border-[#ffd700] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    MetaTrader Account Number (MT4 or MT5)
                  </label>
                  <input
                    type="text"
                    value={mt5Account}
                    onChange={e => setMt5Account(e.target.value)}
                    placeholder="e.g. 51092834 (MT4 or MT5 Account)"
                    className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-3 text-white focus:border-[#ffd700] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Order Notes / Terminal Preference (MT4 or MT5)
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={e => setOrderNotes(e.target.value)}
                    placeholder="e.g. Need MT4 build for IC Markets, or MT5 build for FTMO challenge..."
                    className="w-full rounded-xl border border-neutral-700 bg-[#161722] p-3 text-white focus:border-[#ffd700] focus:outline-none"
                  />
                </div>

                <div className="rounded-xl bg-[#161722] p-3 text-[11px] text-neutral-300 border border-[#d4af37]/30 space-y-1">
                  <span className="font-bold text-[#ffd700] block">License Delivery Protocol:</span>
                  <p>
                    All licenses are protected by 128-bit hardware-locked WebRequest authentication. Support available 24/5.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-[#1a1b24] font-bold uppercase cursor-pointer"
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
