import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Order, License } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SupabaseEmailModal } from '../components/SupabaseEmailModal';
import {
  User,
  Shield,
  Terminal,
  ShoppingBag,
  Key,
  Copy,
  Check,
  LogOut,
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
} from 'lucide-react';

interface DashboardPageProps {
  navigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const {
    user,
    isAdmin,
    logout,
    verifyCode,
    confirmEmailDirectly,
    sendVerificationCode,
  } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Verification checkpoint state
  const [tokenInput, setTokenInput] = useState('');
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifySuccess, setVerifySuccess] = useState<string | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Mailbox modal state
  const [mailboxOpen, setMailboxOpen] = useState(false);
  const [welcomeBannerDismissed, setWelcomeBannerDismissed] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Only fetch dashboard data if email is confirmed
    if (user.email_verified) {
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
    }
  }, [user, navigate]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setVerifyError(null);
    setVerifyLoading(true);

    try {
      const res = await verifyCode(user.email, tokenInput, user.full_name);
      if (res.success) {
        setVerifySuccess('Email confirmed successfully! Welcome email triggered.');
      } else {
        setVerifyError(res.error || 'Invalid verification token');
      }
    } catch (err: any) {
      setVerifyError(err.message || 'Verification error');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleDirectConfirm = async (token?: string) => {
    if (!user) return;
    setVerifyError(null);
    setVerifyLoading(true);

    try {
      const res = await confirmEmailDirectly(user.email, token);
      if (res.success) {
        setVerifySuccess('Email confirmed! Welcome email trigger fired.');
      } else {
        setVerifyError(res.error || 'Failed to confirm email');
      }
    } catch (err: any) {
      setVerifyError(err.message || 'Confirmation error');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    if (!user || resendCooldown > 0) return;
    setVerifyError(null);
    setVerifyLoading(true);
    try {
      await sendVerificationCode(user.email, user.full_name);
      setResendCooldown(60);
      setVerifySuccess(`New Supabase confirmation email sent to ${user.email}`);
    } catch (err: any) {
      setVerifyError(err.message || 'Could not resend email');
    } finally {
      setVerifyLoading(false);
    }
  };

  // CHECKPOINT: Require email confirmation before accessing dashboard
  if (user && !user.email_verified) {
    return (
      <div className="min-h-screen text-[#1a1a1a] flex flex-col justify-between">
        <Navbar currentPath="/dashboard" navigate={navigate} />

        <main className="mx-auto max-w-lg px-4 py-16 sm:px-6 w-full">
          <div className="clay-card p-6 sm:p-10 space-y-6 text-center relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#d4af37]/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#ffd700]/10 blur-2xl" />

            <div className="clay-icon-bubble mx-auto flex h-16 w-16 items-center justify-center text-[#aa851d] shadow-sm">
              <Mail className="h-8 w-8" />
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold mb-2">
                <span>Supabase Auth</span>
                <span>·</span>
                <span>Email Confirmation Required</span>
              </div>
              <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
                Confirm Your Email
              </h1>
              <p className="mt-2 text-xs font-mono text-neutral-600 leading-relaxed">
                To safeguard MT5 license authentication and institutional algorithmic files, you must confirm your email before accessing the dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-[#d4af37]/40 bg-[#faf4e6] p-4 text-xs font-mono text-left space-y-1.5">
              <span className="text-[10px] text-neutral-500 uppercase block font-bold">
                Registered Account:
              </span>
              <span className="text-sm font-bold text-black block">{user.email}</span>
              <p className="text-[11px] text-neutral-600 pt-1 leading-snug">
                We sent a Supabase Auth confirmation email with your verification link and 6-digit token.
              </p>
            </div>

            {verifyError && (
              <div className="flex items-start space-x-2 rounded-2xl bg-red-50 p-3.5 text-xs text-red-700 border border-red-200 text-left">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span>{verifyError}</span>
              </div>
            )}

            {verifySuccess && (
              <div className="flex items-start space-x-2 rounded-2xl bg-emerald-50 p-3.5 text-xs text-emerald-800 border border-emerald-200 text-left">
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{verifySuccess}</span>
              </div>
            )}

            {/* Token verification form */}
            <form onSubmit={handleVerifyToken} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-neutral-700 font-semibold mb-1.5">
                  Enter 6-Digit Supabase Token:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={tokenInput}
                  onChange={e => setTokenInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••••"
                  className="clay-input w-full py-3 text-center text-xl font-bold tracking-[0.45em] text-[#1a1a1a] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={verifyLoading || tokenInput.length < 4}
                className="clay-btn-gold w-full py-3.5 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer shadow-md"
              >
                <CheckCircle className="h-4 w-4" />
                <span>{verifyLoading ? 'Verifying...' : 'Verify Token & Enter Dashboard'}</span>
              </button>
            </form>

            {/* Interactive Supabase Auth Mailbox button */}
            <div className="pt-2 border-t border-neutral-100 space-y-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setMailboxOpen(true)}
                className="clay-google-btn w-full py-3 px-4 text-xs font-bold text-neutral-800 flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <Inbox className="h-4 w-4 text-[#aa851d]" />
                <span>Open Supabase Auth Mailbox (View Email)</span>
              </button>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || verifyLoading}
                  className={`flex items-center space-x-1 ${
                    resendCooldown > 0 ? 'text-neutral-400 cursor-not-allowed' : 'text-[#aa851d] hover:underline cursor-pointer font-bold'
                  }`}
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>{resendCooldown > 0 ? `Resend email in ${resendCooldown}s` : 'Resend Email'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDirectConfirm()}
                  className="text-emerald-700 hover:text-emerald-900 underline font-bold cursor-pointer"
                >
                  [One-Click Link Confirm]
                </button>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={logout}
                  className="text-neutral-500 hover:text-black text-[11px] underline cursor-pointer"
                >
                  Sign Out / Switch Account
                </button>
              </div>
            </div>

          </div>
        </main>

        <Footer navigate={navigate} />

        {/* Supabase Email Viewer Modal */}
        <SupabaseEmailModal
          recipientEmail={user.email}
          isOpen={mailboxOpen}
          onClose={() => setMailboxOpen(false)}
          onConfirmViaEmail={handleDirectConfirm}
        />
      </div>
    );
  }

  const whatsappConciergeUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    `Hello EA ALGO COMMUNITY, this is ${user?.full_name} (${user?.email}). I am contacting VIP support regarding my dashboard account.`
  )}`;

  return (
    <div className="min-h-screen text-[#1a1a1a]">
      <Navbar currentPath="/dashboard" navigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Email Trigger Banner */}
        {!welcomeBannerDismissed && (
          <div className="rounded-2xl border border-emerald-300 bg-gradient-to-r from-emerald-50 via-[#faf4e6] to-emerald-50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-sm text-neutral-900">
                    Welcome Email Trigger Configured &amp; Active
                  </span>
                  <span className="rounded bg-emerald-200 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-800">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-0.5 font-mono">
                  Your email has been confirmed. The onboarding guide and MT5 setup checklist were dispatched to your inbox.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setMailboxOpen(true)}
                className="clay-btn-gold py-2 px-3.5 text-xs font-bold uppercase flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Inbox className="h-3.5 w-3.5" />
                <span>View Welcome Email</span>
              </button>
              <button
                onClick={() => setWelcomeBannerDismissed(true)}
                className="text-xs text-neutral-500 hover:text-black px-2 py-1 cursor-pointer font-mono"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

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
                <span className="rounded-md bg-emerald-100 border border-emerald-300 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800 flex items-center space-x-1">
                  <Check className="h-3 w-3" />
                  <span>EMAIL VERIFIED</span>
                </span>
              </div>
              <p className="mt-1 text-xs font-mono text-neutral-500">
                Email: {user?.email} · Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Supabase Mailbox button */}
            <button
              onClick={() => setMailboxOpen(true)}
              className="rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-mono text-neutral-700 hover:text-black hover:border-[#aa851d] transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Inbox className="h-3.5 w-3.5 text-[#aa851d]" />
              <span>Supabase Mailbox</span>
            </button>

            {isAdmin ? (
              <>
                <span className="px-3 py-1.5 rounded-xl bg-[#faf4e6] border border-[#d4af37]/60 text-xs font-mono font-bold text-[#855f0b] flex items-center space-x-1.5 shadow-xs">
                  <Shield className="h-3.5 w-3.5 text-[#aa851d]" />
                  <span>Verified Admin</span>
                </span>
                <button
                  onClick={() => navigate('/admin')}
                  className="gold-btn rounded-xl px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Open Admin Terminal</span>
                </button>
              </>
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600 shadow-xs">
                Standard Trader
              </span>
            )}

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
        <div className="rounded-2xl border border-[#d4af37]/50 bg-gradient-to-br from-[#1b1c22] to-[#0d0e12] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#d4af37]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="rounded bg-[#aa851d] px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-black">
                  EXCLUSIVE MT5 ALGO
                </span>
                <span className="text-xs font-mono text-neutral-400">BUILD v2.4.1</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#faf4e6]">
                DEPLOY SMART SCALPER EA
              </h2>
              <p className="max-w-xl text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Official institutional algorithmic scalper. Zero martingale, dynamic stop-loss, and high-precision execution on MetaTrader 5 (Gold XAUUSD).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/product')}
                className="gold-btn rounded-xl px-6 py-3.5 text-xs font-mono font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Request EA License</span>
              </button>
              <a
                href={whatsappConciergeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-outline-btn rounded-xl px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-[#855f0b]" />
                <span>Concierge Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Active Licenses & Order History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Active Licenses Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-[#aa851d]" />
                <h3 className="font-extrabold uppercase tracking-tight text-sm text-[#1a1a1a]">
                  My MT5 Licences
                </h3>
              </div>
              <span className="rounded-md bg-[#faf4e6] px-2 py-0.5 font-mono text-[10px] font-bold text-[#855f0b]">
                {licenses.length} Key{licenses.length === 1 ? '' : 's'}
              </span>
            </div>

            {licenses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center space-y-2">
                <Clock className="h-8 w-8 text-neutral-400 mx-auto" />
                <p className="text-xs font-mono text-neutral-600">No active licence keys found.</p>
                <p className="text-[11px] text-neutral-400">
                  Once your request is approved by the admin desk, your 128-bit hex key will appear here.
                </p>
                <button
                  onClick={() => navigate('/product')}
                  className="mt-2 text-xs font-mono text-[#855f0b] font-bold hover:underline cursor-pointer"
                >
                  View Smart Scalper EA →
                </button>
              </div>
            ) : (
              <div className="space-y-4 font-mono text-xs">
                {licenses.map(lic => (
                  <div
                    key={lic.id}
                    className="rounded-xl border border-[#d4af37]/40 bg-[#faf8f5] p-4 space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1a1a1a]">Smart Scalper EA</span>
                      <span
                        className={`rounded px-2 py-0.5 text-[9px] uppercase font-bold ${
                          lic.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-red-100 text-red-800 border border-red-300'
                        }`}
                      >
                        {lic.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-500">HEX LICENCE KEY</span>
                      <div className="flex items-center justify-between rounded-lg bg-white p-2 border border-neutral-200">
                        <span className="font-bold tracking-wider text-[#1a1a1a] truncate select-all">
                          {lic.license_key}
                        </span>
                        <button
                          onClick={() => copyToClipboard(lic.license_key)}
                          className="ml-2 p-1 text-neutral-500 hover:text-black cursor-pointer shrink-0"
                          title="Copy key"
                        >
                          {copiedKey === lic.license_key ? (
                            <Check className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600 pt-1 border-t border-neutral-200">
                      <div>
                        <span className="text-neutral-400 block text-[9px]">LOCKED ACCOUNT</span>
                        <span className="font-bold text-neutral-800">
                          {lic.mt5_account || 'Any Account (Free)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[9px]">EXPIRES</span>
                        <span className="font-bold text-neutral-800">
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
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 text-[#aa851d]" />
                <h3 className="font-extrabold uppercase tracking-tight text-sm text-[#1a1a1a]">
                  Order History &amp; Quotes
                </h3>
              </div>
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-600">
                {orders.length} Order{orders.length === 1 ? '' : 's'}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center space-y-2">
                <ShoppingBag className="h-8 w-8 text-neutral-400 mx-auto" />
                <p className="text-xs font-mono text-neutral-600">No order requests placed yet.</p>
                <p className="text-[11px] text-neutral-400">
                  Request an allocation for Smart Scalper EA to register your first order.
                </p>
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

      {/* Supabase Email Viewer Modal */}
      {user && (
        <SupabaseEmailModal
          recipientEmail={user.email}
          isOpen={mailboxOpen}
          onClose={() => setMailboxOpen(false)}
        />
      )}
    </div>
  );
};
