import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Order, License } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  User,
  Shield,
  Terminal,
  ShoppingBag,
  Key,
  Copy,
  Check,
  ArrowRight,
  MessageCircle,
  Clock,
  ExternalLink,
  Coins,
  Mail,
  AlertCircle,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Inbox,
  Layers,
  Cpu,
  Download,
} from 'lucide-react';

interface DashboardPageProps {
  navigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeEmail = user?.email || 'trader@client.xtech';
  const activeName = user?.full_name || 'Institutional Client';

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then((data: Order[]) => {
        if (data && Array.isArray(data)) {
          if (user?.email) {
            const filtered = data.filter(o => o.user_email.toLowerCase() === user.email.toLowerCase());
            setOrders(filtered.length > 0 ? filtered : data.slice(0, 5));
          } else {
            setOrders(data.slice(0, 5));
          }
        }
      })
      .catch(console.error);

    fetch('/api/licenses')
      .then(res => res.json())
      .then((data: License[]) => {
        if (data && Array.isArray(data)) {
          if (user?.email) {
            const filtered = data.filter(l => l.buyer_email.toLowerCase() === user.email.toLowerCase());
            setLicenses(filtered.length > 0 ? filtered : data.slice(0, 5));
          } else {
            setLicenses(data.slice(0, 5));
          }
        }
      })
      .catch(console.error);
  }, [user]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const whatsappConciergeUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    `Hello XTech Algo Trading, this is ${activeName} (${activeEmail}). I am contacting client support regarding my MT4 & MT5 licenses.`
  )}`;

  return (
    <div className="min-h-screen text-white bg-[#090a0d]/90">
      <Navbar currentPath="/dashboard" navigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Client Portal Banner */}
        <div className="rounded-2xl border border-[#d4af37]/35 bg-[#111218] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center space-x-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/60 bg-[#171822] text-[#ffd700] shadow-md shrink-0">
              <Coins className="h-7 w-7 text-[#ffd700]" />
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-black" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  Trader Portal — {activeName}
                </h1>
                <span className="rounded-md border border-[#d4af37]/40 bg-[#171822] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#ffd700]">
                  MT4 &amp; MT5 CLIENT
                </span>
                <span className="rounded-md bg-emerald-950 border border-emerald-500/50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                  <Check className="h-3 w-3" />
                  <span>ACTIVE DESK ACCESS</span>
                </span>
              </div>
              <p className="mt-1 text-xs font-mono text-neutral-400">
                Identifier: <strong className="text-neutral-200">{activeEmail}</strong> · Hardware-Locked License Manager (128-bit WebRequest)
              </p>
            </div>
          </div>

          {/* Action buttons: Gold with black text */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="rounded-xl border border-[#d4af37]/30 bg-[#161722] px-3.5 py-2.5 text-xs font-mono text-neutral-300 hover:text-white hover:border-[#ffd700] transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Terminal className="h-3.5 w-3.5 text-[#ffd700]" />
              <span>Admin Operations</span>
            </button>

            <a
              href="/download-source"
              download="xtech-algo-trading-source.zip"
              className="gold-btn rounded-xl px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <Download className="h-4 w-4 text-black" />
              <span>Download Suite (.ZIP)</span>
            </a>
          </div>
        </div>

        {/* Deploy Expert Advisors Showcase Card */}
        <div className="rounded-2xl border border-[#d4af37]/40 bg-gradient-to-br from-[#161722] to-[#0c0d12] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#d4af37]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="rounded bg-[#171822] border border-[#d4af37]/40 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-[#ffd700]">
                  DUAL MT4 &amp; MT5 SUITE
                </span>
                <span className="text-xs font-mono text-neutral-400">XTECH 2026 ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                DEPLOY BERSERKER SCALP AI &amp; SNXPERBOT
              </h2>
              <p className="max-w-xl text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Official institutional algorithmic systems. Deploy Berserker Scalp AI (High-Velocity Gold Scalper) and Snxperbot Adaptive Engine (28-Pair Swing System) across MetaTrader 4 &amp; MetaTrader 5.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/product')}
                className="gold-btn rounded-xl px-6 py-3.5 text-xs font-mono font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:brightness-105"
              >
                <ShoppingBag className="h-4 w-4 text-black" />
                <span>Explore Systems &amp; Order</span>
              </button>
              <a
                href={whatsappConciergeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-outline-btn rounded-xl px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-[#ffd700]" />
                <span>Concierge Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Active Licenses & Order History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Active Licenses Card */}
          <div className="rounded-2xl border border-[#d4af37]/25 bg-[#111218] p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-[#ffd700]" />
                <h3 className="font-extrabold uppercase tracking-tight text-sm text-white">
                  Active MT4 &amp; MT5 Licenses
                </h3>
              </div>
              <span className="rounded-md bg-[#171822] border border-[#d4af37]/35 px-2 py-0.5 font-mono text-[10px] font-bold text-[#ffd700]">
                {licenses.length} Key{licenses.length === 1 ? '' : 's'}
              </span>
            </div>

            {licenses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-800 p-8 text-center space-y-2 bg-[#14151e]/50">
                <Clock className="h-8 w-8 text-neutral-500 mx-auto" />
                <p className="text-xs font-mono text-neutral-300">No active license keys registered yet.</p>
                <p className="text-[11px] text-neutral-400">
                  Request an allocation for Berserker Scalp AI or Snxperbot to receive your 128-bit WebRequest key.
                </p>
                <button
                  onClick={() => navigate('/product')}
                  className="mt-2 text-xs font-mono text-[#ffd700] font-bold hover:underline cursor-pointer"
                >
                  Order Expert Advisor System →
                </button>
              </div>
            ) : (
              <div className="space-y-4 font-mono text-xs">
                {licenses.map(lic => (
                  <div
                    key={lic.id}
                    className="rounded-xl border border-[#d4af37]/30 bg-[#14151e] p-4 space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Berserker Scalp AI / Snxperbot</span>
                      <span
                        className={`rounded px-2 py-0.5 text-[9px] uppercase font-bold ${
                          lic.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                            : 'bg-red-950 text-red-400 border border-red-500/50'
                        }`}
                      >
                        {lic.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400">HARDWARE-LOCKED LICENSE KEY</span>
                      <div className="flex items-center justify-between rounded-lg bg-black/60 p-2.5 border border-neutral-800">
                        <span className="font-bold tracking-wider text-[#ffd700] truncate select-all">
                          {lic.license_key}
                        </span>
                        <button
                          onClick={() => copyToClipboard(lic.license_key)}
                          className="ml-2 p-1 text-neutral-400 hover:text-white cursor-pointer shrink-0"
                          title="Copy key"
                        >
                          {copiedKey === lic.license_key ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Copy className="h-4 w-4 text-[#ffd700]" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 pt-1 border-t border-neutral-800">
                      <div>
                        <span className="text-neutral-400 block text-[9px]">BOUND ACCOUNT</span>
                        <span className="font-bold text-white">
                          {lic.mt5_account || 'Any Account (Universal)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[9px]">EXPIRES</span>
                        <span className="font-bold text-white">
                          {new Date(lic.expires_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders History Card */}
          <div className="rounded-2xl border border-[#d4af37]/25 bg-[#111218] p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 text-[#ffd700]" />
                <h3 className="font-extrabold uppercase tracking-tight text-sm text-white">
                  Order Flow &amp; Allocations
                </h3>
              </div>
              <span className="rounded-md bg-[#171822] border border-neutral-700 px-2 py-0.5 font-mono text-[10px] text-neutral-300">
                {orders.length} Order{orders.length === 1 ? '' : 's'}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-800 p-8 text-center space-y-2 bg-[#14151e]/50">
                <ShoppingBag className="h-8 w-8 text-neutral-500 mx-auto" />
                <p className="text-xs font-mono text-neutral-300">No order requests placed yet.</p>
                <p className="text-[11px] text-neutral-400">
                  Request an allocation for Berserker Scalp AI or Snxperbot to register your first order.
                </p>
                <button
                  onClick={() => navigate('/product')}
                  className="mt-2 text-xs font-mono text-[#ffd700] font-bold hover:underline cursor-pointer"
                >
                  Order Expert Advisor System →
                </button>
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                {orders.map(ord => (
                  <div
                    key={ord.id}
                    className="rounded-xl border border-neutral-800 bg-[#14151e] p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{ord.id}</span>
                      <span
                        className={`rounded px-2 py-0.5 text-[9px] uppercase font-bold ${
                          ord.status === 'completed'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-300 flex justify-between">
                      <span>{ord.product_name}</span>
                      <span className="text-[#ffd700] font-bold">
                        {ord.amount !== null ? `$${ord.amount}` : 'Quote via Desk'}
                      </span>
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Placed: {new Date(ord.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer navigate={navigate} />
    </div>
  );
};
