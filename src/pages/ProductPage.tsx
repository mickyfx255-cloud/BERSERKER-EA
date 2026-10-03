import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import boxMockup from '../assets/images/berserker_gold_box_1791008300231.jpg';
import { Check, ShieldAlert, ArrowLeft, MessageCircle, ShoppingBag, CheckCircle, Zap, Cpu, Terminal, Lock, Coins } from 'lucide-react';

interface ProductPageProps {
  navigate: (path: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ navigate }) => {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [mt5Account, setMt5Account] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        if (data && data.length > 0) {
          setProduct(data[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
    `Hello EA ALGO COMMUNITY, I want to purchase Smart Scalper EA (User: ${user?.email || 'Guest'}). Please confirm checkout instructions.`
  )}`;

  return (
    <div className="min-h-screen text-[#1a1a1a]">
      <Navbar currentPath="/product" navigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-neutral-600 hover:text-[#aa851d] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN TO STOREFRONT</span>
        </button>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Product Media Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#d4af37]/45 bg-[#121319] shadow-lg">
                <img
                  src={boxMockup}
                  alt={product?.name || 'Smart Scalper EA Box'}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/90 px-3 py-1.5 rounded-lg border border-[#d4af37]/50">
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    MT5 NATIVE SYSTEM
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#faf4e6] border border-[#d4af37]/60 px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="text-xs font-mono font-bold text-[#855f0b]">
                    {product?.version || 'v2.4.1'}
                  </span>
                </div>
              </div>

              {/* Delivery specifications */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="rounded-xl border border-[#d4af37]/30 bg-white p-3 shadow-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">FORMAT</span>
                  <span className="text-[#1a1a1a] font-bold">.mq5 Source</span>
                </div>
                <div className="rounded-xl border border-[#d4af37]/30 bg-white p-3 shadow-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">AUTH</span>
                  <span className="text-[#aa851d] font-bold">WebRequest</span>
                </div>
                <div className="rounded-xl border border-[#d4af37]/30 bg-white p-3 shadow-xs">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">UPDATES</span>
                  <span className="text-[#059669] font-bold">Included</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Specs & Order actions */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#aa851d] uppercase tracking-wider mb-2 font-bold">
                  <Coins className="h-4 w-4" />
                  <span>Single-Product Catalog Release</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
                  {product?.name || 'Smart Scalper EA'}
                </h1>
                <p className="mt-2 text-sm text-[#855f0b] font-mono font-semibold">
                  {product?.tagline || 'Precision High-Frequency MT5 Execution Robot'}
                </p>
                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                  {product?.description}
                </p>
              </div>

              {/* Live Price Block */}
              <div className="rounded-2xl border border-[#d4af37]/45 bg-white p-6 sm:p-8 shadow-[0_12px_45px_rgba(212,175,55,0.12)]">
                <span className="text-xs font-mono uppercase text-neutral-500 block mb-1">
                  Active System Price
                </span>

                {product?.price !== null && product?.price !== undefined ? (
                  <div className="flex items-baseline space-x-3">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#aa851d] font-mono">
                      ${product.price}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 uppercase font-semibold">
                      {product.currency || 'USD'} · Lifetime Single-Account License
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-extrabold text-[#1a1a1a] font-mono">
                      Price coming soon
                    </span>
                    <p className="mt-1 text-xs text-neutral-500">
                      Pricing is set directly by the owner in the admin desk. Inquire on WhatsApp for immediate pre-release allocation.
                    </p>
                  </div>
                )}

                {/* Primary Buy CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleBuyClick}
                    className="flex-1 gold-btn rounded-xl py-4 px-6 text-sm font-extrabold uppercase tracking-wider text-center cursor-pointer flex items-center justify-center space-x-2 shadow-md"
                  >
                    <ShoppingBag className="h-4 w-4 text-black" />
                    <span>{user ? 'Place Order & Request License' : 'Sign In to Buy'}</span>
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 rounded-xl border border-emerald-500 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp Checkout</span>
                  </a>
                </div>

                {!user && (
                  <p className="mt-3 text-xs text-neutral-500 font-mono text-center">
                    * Visitors must have an account to place and manage bot licenses.
                  </p>
                )}
              </div>

              {/* Full Specs List */}
              <div className="space-y-3 font-mono text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
                  Technical Specifications & Recommendations:
                </h3>
                <div className="space-y-2 border-t border-neutral-200 pt-3">
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Trading Platform</span>
                    <span className="text-[#1a1a1a] font-bold">{product?.platform || 'MetaTrader 5'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Target Timeframe</span>
                    <span className="text-[#1a1a1a] font-bold">{product?.timeframe || 'M1 / M5'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Minimum Capital</span>
                    <span className="text-[#aa851d] font-bold">${product?.min_deposit || 100}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Pairs Allowed</span>
                    <span className="text-[#1a1a1a] font-bold">EURUSD · XAUUSD · GBPUSD · NAS100</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-100">
                    <span className="text-neutral-500 font-semibold">Broker Type</span>
                    <span className="text-[#1a1a1a] font-bold">ECN / Raw Spread accounts</span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="rounded-xl bg-white p-4 border border-[#d4af37]/30 text-[11px] text-neutral-600 shadow-sm">
                <div className="flex items-start space-x-2">
                  <ShieldAlert className="h-4 w-4 text-[#aa851d] shrink-0 mt-0.5" />
                  <p>
                    <strong>Trading Risk Notice:</strong> Trading financial markets with Expert Advisors involves significant capital risk. We do not provide financial guarantees or promises of profit. All sales are delivered digitally.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}
      </main>

      {/* Order Creation Modal in White & Gold */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#d4af37] bg-white p-6 sm:p-8 shadow-2xl">
            {orderSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 border border-emerald-500">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold uppercase text-[#1a1a1a]">Order Registered!</h3>
                <p className="text-xs font-mono text-neutral-700">
                  Order ID: <span className="text-[#aa851d] font-bold">{orderSuccess}</span>
                </p>
                <p className="text-xs text-neutral-600 max-w-md mx-auto">
                  Your order has been logged in our system. You can view your order status in your Dashboard, and coordinate with our desk on WhatsApp for activation.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/255610366248?text=${encodeURIComponent(
                      `Hello EA ALGO COMMUNITY, I just submitted Order #${orderSuccess} for Smart Scalper EA. My email is ${user?.email}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 gold-btn py-3 rounded-xl text-xs font-extrabold uppercase text-center shadow-md"
                  >
                    Confirm via WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setOrderModalOpen(false);
                      setOrderSuccess(null);
                      navigate('/dashboard');
                    }}
                    className="flex-1 rounded-xl border border-neutral-300 bg-neutral-100 py-3 text-xs font-bold text-neutral-800 hover:bg-neutral-200"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold uppercase text-[#1a1a1a]">
                      Order Smart Scalper EA
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Buyer: <span className="text-[#855f0b] font-mono font-bold">{user?.email}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setOrderModalOpen(false)}
                    className="text-neutral-400 hover:text-black text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={submitOrder} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-neutral-600 mb-1 font-semibold">
                      MT5 Account Number (Optional / Can be bound later)
                    </label>
                    <input
                      type="text"
                      value={mt5Account}
                      onChange={e => setMt5Account(e.target.value)}
                      placeholder="e.g. 51092834"
                      className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] p-3 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-600 mb-1 font-semibold">
                      Order Notes / Broker Name
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={e => setOrderNotes(e.target.value)}
                      placeholder="e.g. IC Markets Raw Spread, VPS in London"
                      rows={3}
                      className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] p-3 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf8f5] p-3 text-neutral-600">
                    <div className="flex justify-between mb-1">
                      <span>Product:</span>
                      <span className="text-neutral-900 font-bold">{product?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="text-[#aa851d] font-bold">
                        {product?.price !== null ? `$${product?.price} ${product?.currency}` : 'Price coming soon'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setOrderModalOpen(false)}
                      className="flex-1 rounded-xl border border-neutral-300 bg-neutral-100 py-3 text-neutral-700 hover:bg-neutral-200 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={orderSubmitting}
                      className="flex-1 gold-btn rounded-xl py-3 font-extrabold uppercase disabled:opacity-50 cursor-pointer shadow-md"
                    >
                      {orderSubmitting ? 'Registering...' : 'Confirm Order'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer navigate={navigate} />
    </div>
  );
};
