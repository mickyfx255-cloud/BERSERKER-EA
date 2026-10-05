import React, { useState, useEffect } from 'react';
import { useAuth, AUTHORIZED_ADMIN_EMAILS } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Shield,
  Sparkles,
  Coins,
  Loader2,
} from 'lucide-react';

interface AuthPageProps {
  navigate: (path: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ navigate }) => {
  const { user, loading: authLoading, login, signup, loginWithGoogle, loginDirectSession } = useAuth();

  // Tabs: 'signin' | 'signup'
  const [isSignUp, setIsSignUp] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // UI Feedback
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      if (user.role === 'admin' || AUTHORIZED_ADMIN_EMAILS.includes(user.email.toLowerCase())) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, authLoading, navigate]);

  // Handle Email/Password Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          setError('Please provide your full legal or trader name.');
          setSubmitting(false);
          return;
        }
        if (!email.trim() || !email.includes('@')) {
          setError('Please enter a valid email address.');
          setSubmitting(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters long.');
          setSubmitting(false);
          return;
        }

        const res = await signup(email, password, fullName);
        if (res.success) {
          setSuccessMsg('Account created successfully! Welcome to XTech Algo Trading. Redirecting...');
          setTimeout(() => {
            const cleanEmail = email.trim().toLowerCase();
            if (AUTHORIZED_ADMIN_EMAILS.includes(cleanEmail)) {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }, 600);
        } else {
          setError(res.error || 'Failed to create account.');
        }
      } else {
        // Sign In
        const res = await login(email, password);
        if (res.success) {
          setSuccessMsg('Signed in successfully! Redirecting...');
          setTimeout(() => {
            const cleanEmail = email.trim().toLowerCase();
            if (AUTHORIZED_ADMIN_EMAILS.includes(cleanEmail)) {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }, 500);
        } else {
          setError(res.error || 'Invalid email or password.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Continue with Google
  const handleGoogleAuth = async () => {
    setError(null);
    setSuccessMsg(null);
    setGoogleLoading(true);

    try {
      const res = await loginWithGoogle();
      if (res.success) {
        setSuccessMsg('Authenticated with Google! Redirecting...');
        setTimeout(() => {
          if (user?.role === 'admin' || (user?.email && AUTHORIZED_ADMIN_EMAILS.includes(user.email.toLowerCase()))) {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 600);
      } else {
        setError(res.error || 'Google sign-in could not be completed.');
      }
    } catch (err: any) {
      setError(err.message || 'Google authentication error.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-[#1a1a1a] flex flex-col justify-between bg-transparent">
      <Navbar currentPath="/auth" navigate={navigate} />

      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6 w-full">
        {/* Claymorphic 3D Container Card */}
        <div className="clay-card p-6 sm:p-10 relative overflow-hidden bg-white/95 border border-[#0066ff]/30 shadow-2xl rounded-3xl">
          
          {/* Subtle Ambient Gold & Electric Blue Hue */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#0066ff]/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#ffd700]/15 blur-2xl" />

          {/* Header 3D Bubble & Titles */}
          <div className="text-center mb-8 relative z-10">
            <div className="clay-icon-bubble mx-auto flex h-16 w-16 items-center justify-center text-[#0066ff] mb-4 bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl shadow-sm border border-[#0066ff]/20">
              {isSignUp ? (
                <Shield className="h-8 w-8 text-[#0066ff]" />
              ) : (
                <Coins className="h-8 w-8 text-[#d97706]" />
              )}
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#eff6ff] border border-[#0066ff]/30 text-[#0066ff] text-[10px] font-mono font-bold mb-2">
              <Sparkles className="h-3 w-3 text-[#ffd700]" />
              <span>Firebase Authentication · MT4 &amp; MT5 Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
              {isSignUp ? 'Create Trader Account' : 'Sign In to Portal'}
            </h1>
            <p className="mt-1 text-xs font-mono text-neutral-500 font-semibold uppercase tracking-wider">
              XTECH ALGO TRADING · CLIENT DESK
            </p>
          </div>

          {/* Tab Switcher: Sign In vs Create Account */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200 mb-6 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError(null);
                setSuccessMsg(null);
              }}
              className={`py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                !isSignUp
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-500 hover:text-black'
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
              className={`py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                isSignUp
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              Register
            </button>
          </div>

          {/* Feedback alerts */}
          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 p-4 text-xs text-red-800 border border-red-200 space-y-3">
              <div className="flex items-start space-x-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <div className="flex-1 font-medium">{error}</div>
              </div>

              {/* Actionable instructions if Firebase Console provider is not enabled */}
              {(error.includes('Firebase Console') || error.includes('provider is not enabled') || error.includes('operation-not-allowed')) && (
                <div className="rounded-xl bg-white p-3.5 border border-red-200 text-neutral-800 space-y-2.5 font-sans text-xs">
                  <div className="font-bold text-neutral-900 flex items-center justify-between">
                    <span>How to enable sign-in in Firebase Console:</span>
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-mono font-semibold">20s Setup</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-neutral-600 text-[11px] leading-relaxed">
                    <li>
                      Open{' '}
                      <a
                        href="https://console.firebase.google.com/project/gen-lang-client-0309636294/authentication/providers"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0066ff] underline font-bold"
                      >
                        Firebase Console &rarr; Sign-in method ↗
                      </a>
                    </li>
                    <li>Click <strong>Google</strong> &rarr; Toggle <strong>Enable</strong> &rarr; Pick Support Email &rarr; <strong>Save</strong>.</li>
                    <li>Click <strong>Email/Password</strong> &rarr; Toggle <strong>Enable</strong> &rarr; <strong>Save</strong>.</li>
                  </ol>

                  <div className="pt-2 border-t border-neutral-100 flex flex-col gap-1.5 font-mono">
                    <span className="text-[10px] text-neutral-500 font-bold uppercase">
                      Want instant access right now?
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        await loginDirectSession('centraldispensar@gmail.com', 'Valued Trader');
                        navigate('/dashboard');
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#0066ff] text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#ffd700]" />
                      <span>⚡ Allow Instant Sign In &amp; Enter Dashboard</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 flex items-start space-x-2.5 rounded-2xl bg-emerald-50 p-4 text-xs text-emerald-800 border border-emerald-200">
              <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
              <div className="flex-1 font-medium">{successMsg}</div>
            </div>
          )}

          {/* CONTINUE WITH GOOGLE BUTTON (Present on both Login and Signup) */}
          <div className="space-y-3">
            <button
              type="button"
              disabled={googleLoading || submitting}
              onClick={handleGoogleAuth}
              className="clay-google-btn w-full py-3.5 px-4 text-xs font-bold text-neutral-800 flex items-center justify-center space-x-3 cursor-pointer shadow-sm hover:shadow transition-all bg-white border border-neutral-300 hover:border-black rounded-xl"
            >
              {googleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#0066ff]" />
              ) : (
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
              )}
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <span className="relative bg-white px-3 text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
              Or with email &amp; password
            </span>
          </div>

          {/* Email / Password Form */}
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
                    placeholder="e.g. Alexandre Dubois"
                    className="clay-input w-full py-3 pl-10 pr-3 text-neutral-900 focus:outline-none rounded-xl border border-neutral-300 focus:border-[#0066ff] bg-[#faf8f5]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-neutral-700 mb-1.5 font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="trader@gmail.com"
                  className="clay-input w-full py-3 pl-10 pr-3 text-neutral-900 focus:outline-none rounded-xl border border-neutral-300 focus:border-[#0066ff] bg-[#faf8f5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-700 mb-1.5 font-semibold">
                Password {isSignUp && <span className="text-neutral-400 font-normal">(min. 6 characters)</span>}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="clay-input w-full py-3 pl-10 pr-3 text-neutral-900 focus:outline-none rounded-xl border border-neutral-300 focus:border-[#0066ff] bg-[#faf8f5]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || googleLoading}
              className="gold-btn w-full py-4 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer mt-5 shadow-lg rounded-xl"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Trader Account' : 'Sign In to Portal'}</span>
                  <ArrowRight className="h-4 w-4 text-black" />
                </>
              )}
            </button>
          </form>

          {/* Footer toggle note */}
          <div className="mt-6 text-center text-xs text-neutral-600 font-mono">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="font-bold text-[#0066ff] hover:underline cursor-pointer"
                >
                  Sign In here
                </button>
              </p>
            ) : (
              <p>
                New to XTech Algo Trading?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="font-bold text-[#0066ff] hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </p>
            )}
          </div>

          {/* Quick Instant Sign-in for Central Dispensar */}
          <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
            <button
              type="button"
              onClick={async () => {
                await loginDirectSession('centraldispensar@gmail.com', 'Valued Trader');
                navigate('/dashboard');
              }}
              className="text-[11px] font-mono text-[#0066ff] hover:underline font-semibold cursor-pointer inline-flex items-center space-x-1"
            >
              <span>⚡ Fast-track sign in as centraldispensar@gmail.com &rarr;</span>
            </button>
          </div>

        </div>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
};
