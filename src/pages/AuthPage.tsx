import React, { useState, useEffect } from 'react';
import { useAuth, AUTHORIZED_ADMIN_EMAILS } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SupabaseEmailModal } from '../components/SupabaseEmailModal';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Shield,
  KeyRound,
  RotateCcw,
  Sparkles,
  Coins,
  X,
  Inbox,
  ExternalLink,
} from 'lucide-react';

interface AuthPageProps {
  navigate: (path: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ navigate }) => {
  const {
    user,
    login,
    signup,
    sendVerificationCode,
    verifyCode,
    confirmEmailDirectly,
    loginWithGoogle,
  } = useAuth();
  
  // Tabs: 'signin' | 'signup'
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  // States
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Verification code step
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingName, setPendingName] = useState('');
  const [pendingPass, setPendingPass] = useState('');
  const [activePreviewCode, setActivePreviewCode] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Supabase Mailbox Modal state
  const [mailboxOpen, setMailboxOpen] = useState(false);

  // Google Modal
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Handle URL confirmation link from Supabase Auth email template
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const confirmationToken = params.get('confirmation_token');
      const paramEmail = params.get('email');
      if (confirmationToken && paramEmail) {
        setLoading(true);
        confirmEmailDirectly(paramEmail, confirmationToken).then(res => {
          if (res.success) {
            setSuccessMsg('Email confirmed via Supabase Auth link! Welcome email dispatched. Redirecting...');
            setTimeout(() => {
              if (AUTHORIZED_ADMIN_EMAILS.includes(paramEmail.toLowerCase())) {
                navigate('/admin');
              } else {
                navigate('/dashboard');
              }
            }, 800);
          } else {
            setError(res.error || 'Failed to verify confirmation link.');
          }
        }).finally(() => setLoading(false));
      }
    } catch {
      // ignore
    }
  }, [confirmEmailDirectly, navigate]);

  // Redirect if already logged in with verified email
  useEffect(() => {
    if (user && user.email_verified) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          setError('Please provide your full legal or trader name.');
          setLoading(false);
          return;
        }
        if (!email.trim() || !email.includes('@')) {
          setError('Please provide a valid email address.');
          setLoading(false);
          return;
        }

        const res = await signup(email, password, fullName);
        if (res.success) {
          setSuccessMsg('Account created successfully! Welcome to XTech Algo Trading. Redirecting to dashboard...');
          setTimeout(() => {
            if (AUTHORIZED_ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }, 700);
        } else {
          setError(res.error || 'Failed to create account');
        }
      } else {
        // Sign In
        const result = await login(email, password);
        if (result.success) {
          const cleanEmail = email.trim().toLowerCase();
          setSuccessMsg('Signed in successfully! Redirecting...');
          setTimeout(() => {
            if (AUTHORIZED_ADMIN_EMAILS.includes(cleanEmail)) {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }, 600);
        } else {
          setError(result.error || 'Invalid credentials');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  // Verify code handler
  const handleVerifyCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!verificationCode.trim()) {
      setError('Please enter the 6-digit confirmation token.');
      setLoading(false);
      return;
    }

    try {
      const targetEmail = (pendingEmail || user?.email || email).trim().toLowerCase();
      const res = await verifyCode(targetEmail, verificationCode, pendingName, pendingPass);
      if (res.success) {
        setSuccessMsg('Account confirmed! Welcome email with MT5 setup guide triggered. Redirecting...');
        setTimeout(() => {
          if (AUTHORIZED_ADMIN_EMAILS.includes(targetEmail)) {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 750);
      } else {
        setError(res.error || 'Invalid verification token');
      }
    } catch (err: any) {
      setError(err.message || 'Verification error');
    } finally {
      setLoading(false);
    }
  };

  // Direct confirmation from email modal or button
  const handleDirectConfirmFromModal = async (token?: string) => {
    setError(null);
    setLoading(true);
    try {
      const targetEmail = (pendingEmail || user?.email || email).trim().toLowerCase();
      const res = await confirmEmailDirectly(targetEmail, token);
      if (res.success) {
        setSuccessMsg('Email verified! Welcome email triggered. Redirecting...');
        setTimeout(() => {
          if (AUTHORIZED_ADMIN_EMAILS.includes(targetEmail)) {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 750);
      } else {
        setError(res.error || 'Confirmation failed');
      }
    } catch (err: any) {
      setError(err.message || 'Error confirming email');
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    if (resendCooldown > 0 || !pendingEmail) return;
    setError(null);
    setLoading(true);
    try {
      const res = await sendVerificationCode(pendingEmail, pendingName);
      if (res.success) {
        setActivePreviewCode(res.previewCode || null);
        setResendCooldown(60);
        setSuccessMsg(`New Supabase confirmation email sent to ${pendingEmail}`);
      } else {
        setError(res.error || 'Failed to resend email');
      }
    } catch (err: any) {
      setError(err.message || 'Could not resend email');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login Selection
  const handleGoogleDirectSignIn = async (chosenEmail?: string, chosenName?: string) => {
    setLoading(true);
    setError(null);
    try {
      const emailToUse = (chosenEmail || customGoogleEmail || 'centraldispensar@gmail.com').trim();
      const nameToUse = (chosenName || customGoogleName || (emailToUse === 'centraldispensar@gmail.com' ? 'Valued Trader' : emailToUse.split('@')[0])).trim();
      const res = await loginWithGoogle(emailToUse, nameToUse);
      if (res.success) {
        setGoogleModalOpen(false);
        setSuccessMsg(`Signed in with Google (${emailToUse})! Redirecting...`);
        setTimeout(() => {
          if (AUTHORIZED_ADMIN_EMAILS.includes(emailToUse.toLowerCase())) {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 500);
      } else {
        setError(res.error || 'Google sign in failed');
      }
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSelect = (chosenEmail: string, chosenName: string) => {
    handleGoogleDirectSignIn(chosenEmail, chosenName);
  };

  return (
    <div className="min-h-screen text-[#1a1a1a] flex flex-col justify-between">
      <Navbar currentPath="/auth" navigate={navigate} />

      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6 w-full">
        {/* Claymorphic 3D Container Card */}
        <div className="clay-card p-6 sm:p-10 relative overflow-hidden">
          
          {/* Subtle Ambient Gold Hue */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#d4af37]/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#ffd700]/10 blur-2xl" />

          {/* Header 3D Bubble & Titles */}
          <div className="text-center mb-8 relative z-10">
            <div className="clay-icon-bubble mx-auto flex h-16 w-16 items-center justify-center text-[#aa851d] mb-4">
              {step === 'verify' ? (
                <KeyRound className="h-8 w-8 text-[#aa851d]" />
              ) : isSignUp ? (
                <Shield className="h-8 w-8 text-[#aa851d]" />
              ) : (
                <Coins className="h-8 w-8 text-[#aa851d]" />
              )}
            </div>

            <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#faf4e6] border border-[#d4af37]/40 text-[#855f0b] text-[10px] font-mono font-bold mb-2">
              <Sparkles className="h-3 w-3 text-[#aa851d]" />
              <span>Supabase Auth Template Engine</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
              {step === 'verify'
                ? 'Confirm Supabase Email'
                : isSignUp
                ? 'Create Trader Account'
                : 'Sign In to Portal'}
            </h1>
            <p className="mt-1 text-xs font-mono text-neutral-500 font-semibold uppercase tracking-wider">
              Berserker EA · EA ALGO COMMUNITY
            </p>
          </div>

          {/* Feedback alerts */}
          {error && (
            <div className="mb-6 flex items-start space-x-2 rounded-2xl bg-red-50 p-3.5 text-xs text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 flex items-start space-x-2 rounded-2xl bg-emerald-50 p-3.5 text-xs text-emerald-800 border border-emerald-200">
              <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* STEP 1: SUPABASE EMAIL CONFIRMATION SCREEN */}
          {step === 'verify' ? (
            <div className="space-y-5 font-mono text-xs relative z-10">
              <div className="rounded-2xl border border-[#d4af37]/30 bg-[#fbf9f5] p-4 text-center space-y-2">
                <span className="text-[11px] text-neutral-500 block">
                  Supabase Auth confirmation sent to:
                </span>
                <span className="text-sm font-bold text-[#1a1a1a] block font-mono">{pendingEmail}</span>

                {/* Instant Preview Token auto-filler pill */}
                {(activePreviewCode || (pendingEmail && localStorage.getItem(`supabase_token_${pendingEmail.trim().toLowerCase()}`))) && (
                  <div className="mt-3 inline-flex items-center space-x-2 clay-pill px-3.5 py-1.5 text-[11px]">
                    <span className="text-neutral-500">Supabase Token:</span>
                    <strong className="text-[#aa851d] font-mono tracking-widest text-xs">
                      {activePreviewCode || localStorage.getItem(`supabase_token_${pendingEmail.trim().toLowerCase()}`)}
                    </strong>
                    <button
                      type="button"
                      onClick={() => setVerificationCode(activePreviewCode || localStorage.getItem(`supabase_token_${pendingEmail.trim().toLowerCase()}`) || '')}
                      className="ml-1 text-[10px] text-emerald-700 underline font-bold hover:text-emerald-900 cursor-pointer"
                    >
                      [Auto-fill]
                    </button>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleDirectConfirmFromModal()}
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 underline font-bold cursor-pointer"
                  >
                    ⚡ [One-Click Instant Confirmation]
                  </button>
                </div>
              </div>

              {/* Token verification form */}
              <form onSubmit={handleVerifyCodeSubmit} className="space-y-4">
                <div>
                  <label className="block text-neutral-700 mb-1.5 font-semibold text-center">
                    Enter 6-Digit Supabase Token ({"{{ .Token }}"})
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    className="clay-input w-full py-3.5 text-center text-xl font-bold tracking-[0.45em] text-[#1a1a1a] focus:outline-none"
                  />
                  <p className="mt-1.5 text-[10px] text-center text-neutral-400">
                    Check your Supabase mailbox or use the token above
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="clay-btn-gold w-full py-4 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>{loading ? 'Verifying...' : 'Confirm Account & Trigger Welcome Email'}</span>
                </button>
              </form>

              {/* Supabase Template Mailbox launcher */}
              <button
                type="button"
                onClick={() => setMailboxOpen(true)}
                className="clay-google-btn w-full py-3 px-4 text-xs font-bold text-neutral-800 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Inbox className="h-4 w-4 text-[#aa851d]" />
                <span>Open Supabase Mailbox (Read &amp; Click Template)</span>
              </button>

              {/* Resend & Back actions */}
              <div className="flex items-center justify-between pt-2 text-[11px]">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0 || loading}
                  className={`flex items-center space-x-1 font-semibold ${
                    resendCooldown > 0 ? 'text-neutral-400 cursor-not-allowed' : 'text-[#aa851d] hover:underline cursor-pointer'
                  }`}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>
                    {resendCooldown > 0 ? `Resend email in ${resendCooldown}s` : 'Resend Email'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('form');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className="text-neutral-500 hover:text-black hover:underline cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            </div>
          ) : (
            /* STEP 0: MAIN AUTH FORM */
            <div className="relative z-10">
              
              {/* Claymorphic 3D Tabs */}
              <div className="clay-tab-container mb-6 flex font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`flex-1 py-2.5 font-bold uppercase transition-all cursor-pointer ${
                    !isSignUp ? 'clay-tab-active' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`flex-1 py-2.5 font-bold uppercase transition-all cursor-pointer ${
                    isSignUp ? 'clay-tab-active' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {isSignUp && (
                  <div>
                    <label className="block text-neutral-700 mb-1.5 font-semibold">
                      Full Legal / Trader Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Micky Bonny"
                        className="clay-input w-full py-3 pl-10 pr-3 text-neutral-900 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="mb-1.5">
                    <label className="block text-neutral-700 font-semibold">
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="trader@gmail.com"
                      className="clay-input w-full py-3 pl-10 pr-3 text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 mb-1.5 font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="clay-input w-full py-3 pl-10 pr-3 text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="clay-btn-gold w-full py-4 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer mt-5 shadow-lg"
                >
                  <span>
                    {loading
                      ? 'Processing...'
                      : isSignUp
                      ? 'Create Account & Send Supabase Verification'
                      : 'Sign In to Portal'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-7 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <span className="relative bg-white px-3 text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                  Or Continue With
                </span>
              </div>

              {/* Claymorphic Google Authentication Button - 1-Click Direct Sign In */}
              <div className="space-y-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleGoogleDirectSignIn('centraldispensar@gmail.com', 'Valued Trader')}
                  className="clay-google-btn w-full py-3.5 px-4 text-xs font-bold text-neutral-800 flex items-center justify-center space-x-3 cursor-pointer shadow-sm hover:shadow transition-all"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.2-1.9.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                    />
                  </svg>
                  <span>1-Click Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGoogleModalOpen(true)}
                  className="w-full text-center text-[11px] font-mono text-neutral-500 hover:text-[#0066ff] transition-colors cursor-pointer"
                >
                  Or choose another Google account email →
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* ================= GOOGLE SELECTOR MODAL ================= */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="clay-card w-full max-w-md p-6 sm:p-8 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.2-1.9.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <h3 className="font-bold text-sm text-[#1a1a1a]">Select a Google Account</h3>
              </div>
              <button
                onClick={() => setGoogleModalOpen(false)}
                className="text-neutral-400 hover:text-black cursor-pointer p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-600">
              Select or type any Google email to immediately sign into the portal:
            </p>

            {/* Quick Profile Cards */}
            <div className="space-y-2.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => handleGoogleSelect('centraldispensar@gmail.com', 'Valued Trader')}
                className="w-full text-left p-3.5 rounded-2xl border border-blue-300 bg-blue-50/70 hover:bg-blue-100/70 transition-all flex items-center justify-between cursor-pointer shadow-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0066ff] text-white font-bold text-sm shadow-xs">
                    C
                  </div>
                  <div>
                    <span className="font-bold text-black text-xs block">centraldispensar@gmail.com</span>
                    <span className="text-[11px] text-blue-700 font-semibold">Current User · 1-Click Instant Login</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#0066ff]" />
              </button>

              <button
                type="button"
                onClick={() => handleGoogleSelect('mickybonny9@gmail.com', 'Micky Bonny (Admin)')}
                className="w-full text-left p-3.5 rounded-2xl border border-neutral-300 bg-white hover:bg-neutral-50 transition-all flex items-center justify-between cursor-pointer shadow-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18191e] text-[#ffd700] font-bold text-sm">
                    M
                  </div>
                  <div>
                    <span className="font-bold text-black text-xs block">Micky Bonny (Admin)</span>
                    <span className="text-[11px] text-neutral-600">mickybonny9@gmail.com (Verified Admin)</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-400" />
              </button>
            </div>

            {/* Custom Google Account Input */}
            <div className="border-t border-neutral-200 pt-3">
              <span className="text-[11px] text-neutral-500 font-mono block mb-2 font-semibold">
                Or Type Any Google Account Email:
              </span>
              <div className="space-y-2">
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={e => setCustomGoogleEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="clay-input w-full py-2.5 px-3 text-xs font-mono text-neutral-900 focus:outline-none"
                />
                <button
                  type="button"
                  disabled={!customGoogleEmail.includes('@')}
                  onClick={() =>
                    handleGoogleSelect(
                      customGoogleEmail,
                      customGoogleName || customGoogleEmail.split('@')[0]
                    )
                  }
                  className="clay-btn-gold w-full py-2.5 text-xs font-bold uppercase disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  Direct Sign In with this Google Email
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Supabase Email Viewer Modal */}
      {pendingEmail && (
        <SupabaseEmailModal
          recipientEmail={pendingEmail}
          isOpen={mailboxOpen}
          onClose={() => setMailboxOpen(false)}
          onConfirmViaEmail={handleDirectConfirmFromModal}
        />
      )}

      <Footer navigate={navigate} />
    </div>
  );
};
