import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Order, License } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { User, Shield, Terminal, ShoppingBag, Key, Copy, Check, LogOut, ArrowRight, MessageCircle, Clock, ExternalLink, Coins } from 'lucide-react';

interface DashboardPageProps {
  navigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const { user, isAdmin, logout, toggleAdminRoleForTesting } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetch('/api/orders')
      .then(res => res.json())
      .then((data: Order[]) => {
        setOrders(data.filter(o => o.user_email.toLowerCase() === user.email.toLowerCase()));
      })
      .catch(console.error);

    fetch('/api/licenses')
      .then(res => res.json())
      .then((data: License[]) => {
        setLicenses(data.filter(l => l.buyer_email.toLowerCase() === user.email.toLowerCase()));
      })
      .catch(console.error);
  }, [user, navigate]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const whatsappConciergeUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    `Hello EA ALGO COMMUNITY, this is ${user?.full_name} (${user?.email}). I am contacting VIP support regarding my dashboard account.`
  )}`;

  return (
    <div className="min-h-screen text-[#1a1a1a]">
      <Navbar currentPath="/dashboard" navigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Banner in White Luxury with Gold Trim */}
        <div className="rounded-2xl border border-[#d4af37]/40 bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_10px_35px_rgba(212,175,55,0.1)]">
          <div className="flex items-center space-x-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37] bg-[#faf4e6] text-[#aa851d] shadow-sm">
              <Coins className="h-7 w-7" />
              {isAdmin && (
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#10b981] border-2 border-white" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
                  Welcome, {user?.full_name || 'Valued Trader'}
                </h1>
                {isAdmin ? (
                  <span className="rounded-md border border-[#d4af37] bg-[#18191e] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#ffd700]">
                    ADMINISTRATOR
                  </span>
                ) : (
                  <span className="rounded-md border border-neutral-300 bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-700">
                    TRADER CLIENT
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs font-mono text-neutral-500">
                Email: {user?.email} · Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="gold-btn rounded-xl px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-md"
              >
                <Terminal className="h-4 w-4" />
                <span>Open Admin</span>
              </button>
            )}

            <button
              onClick={toggleAdminRoleForTesting}
              title="Toggle role for demonstration"
              className="rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-mono text-neutral-700 hover:text-black hover:border-[#aa851d] transition-colors shadow-xs"
            >
              Switch Role ({isAdmin ? 'to User' : 'to Admin'})
            </button>

            <button
              onClick={logout}
              className="rounded-xl border border-neutral-300 bg-neutral-100 px-3.5 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Buy Smart Scalper EA Panel in Black Marble with Gold Details */}
        <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/60 bg-gradient-to-r from-[#18191e] via-[#1a1b22] to-[#121316] text-white p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
                AVAILABLE ACQUISITION
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                BUY SMART SCALPER EA (MT5)
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Deploy the official EA ALGO COMMUNITY robot on your MetaTrader 5 terminal. Includes automated remote WebRequest license key verification, institutional micro-trend scalping engine, and setup guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => navigate('/product')}
                className="gold-btn rounded-xl px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <ShoppingBag className="h-4 w-4 text-black" />
                <span>View Product & Purchase</span>
              </button>

              <a
                href={whatsappConciergeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-emerald-500 bg-emerald-950/40 px-5 py-3.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>

        {/* Grid: My Licenses & My Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* User's Licenses */}
          <div className="lg:col-span-7 rounded-2xl border border-[#d4af37]/35 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-[#aa851d]" />
                <h3 className="text-sm font-bold uppercase text-[#1a1a1a] font-mono">
                  My Active Licenses ({licenses.length})
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#059669] font-bold">
                AUTH: WEBREQUEST VERIFIED
              </span>
            </div>

            {licenses.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-neutral-500">
                <p>No active licenses found for your account.</p>
                <p className="mt-1 text-neutral-600 font-semibold">
                  After placing an order, our desk generates your SSEA license key here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                {licenses.map(lic => (
                  <div
                    key={lic.id}
                    className="rounded-xl border border-neutral-200 bg-[#faf8f5] p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600 font-bold text-[10px]">SMART SCALPER EA</span>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800 border border-emerald-300 font-bold">
                        ACTIVE
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#d4af37]/40 shadow-xs">
                      <span className="text-[#855f0b] font-bold tracking-wider select-all">
                        {lic.license_key}
                      </span>
                      <button
                        onClick={() => copyToClipboard(lic.license_key)}
                        className="p-1 text-neutral-500 hover:text-black transition-colors"
                        title="Copy Key"
                      >
                        {copiedKey === lic.license_key ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-1">
                      <span>MT5 Account: {lic.mt5_account ? `#${lic.mt5_account}` : 'Unbound (Auto on first run)'}</span>
                      <span>Expires: {new Date(lic.expires_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User's Orders */}
          <div className="lg:col-span-5 rounded-2xl border border-[#d4af37]/35 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-[#aa851d]" />
                <h3 className="text-sm font-bold uppercase text-[#1a1a1a] font-mono">
                  Order History ({orders.length})
                </h3>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-neutral-500">
                <p>No orders registered yet.</p>
                <button
                  onClick={() => navigate('/product')}
                  className="mt-3 text-[#aa851d] font-bold underline"
                >
                  Acquire Smart Scalper EA →
                </button>
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                {orders.map(ord => (
                  <div
                    key={ord.id}
                    className="rounded-xl border border-neutral-200 bg-[#faf8f5] p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1a1a1a]">{ord.id}</span>
                      <span
                        className={`rounded px-2 py-0.5 text-[9px] uppercase font-bold ${
                          ord.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-600 flex justify-between">
                      <span>{ord.product_name}</span>
                      <span className="text-[#855f0b] font-bold">
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
