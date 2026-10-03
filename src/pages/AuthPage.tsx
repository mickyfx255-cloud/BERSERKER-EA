import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Shield, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Sparkles, Coins } from 'lucide-react';

interface AuthPageProps {
  navigate: (path: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ navigate }) => {
  const { user, login, signup, loginWithGoogle, verifyEmailSimulation } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Email confirmation state
  const [verificationPending, setVerificationPending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.email_verified) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          setError('Please provide your full name.');
          setLoading(false);
          return;
        }
        const result = await signup(email, password, fullName);
        if (result.requiresVerification) {
          setPendingEmail(email);
          setVerificationPending(true);
        }
      } else {
        const result = await login(email, password);
        if (result.success) {
          navigate('/dashboard');
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

  const handleSimulateClickConfirmationLink = () => {
    if (pendingEmail) {
      verifyEmailSimulation(pendingEmail);
      setVerificationPending(false);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen text-[#1a1a1a]">
      <Navbar currentPath="/auth" navigate={navigate} />

      <main className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-[#d4af37]/45 bg-white p-6 sm:p-8 shadow-[0_12px_45px_rgba(212,175,55,0.12)]">
          
          {/* Eyebrow */}
          <div className="text-center mb-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37] bg-[#faf4e6] text-[#aa851d] mb-3 shadow-sm">
              <Coins className="h-7 w-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
              {verificationPending
                ? 'Confirm Your Email'
                : isSignUp
                ? 'Create Trader Account'
                : 'Sign In to Portal'}
            </h1>
            <p className="mt-2 text-xs font-mono text-neutral-500 font-semibold">
              EA ALGO COMMUNITY · BERSERKER CLIENT PORTAL
            </p>
          </div>

          {verificationPending ? (
            /* Email confirmation pending screen */
            <div className="text-center space-y-4 py-4">
              <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf8f5] p-5 text-left text-xs font-mono space-y-3">
                <div className="flex items-center space-x-2 text-emerald-600 font-bold">
                  <CheckCircle className="h-4 w-4" />
                  <span>Verification link sent</span>
                </div>
                <p className="text-neutral-700">
                  We sent an email confirmation link to:
                  <span className="block text-[#1a1a1a] font-bold mt-1 text-sm">{pendingEmail}</span>
                </p>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  As required by our secure authentication rules, no active session exists until the confirmation link is clicked.
                </p>
              </div>

              {/* Simulation button for the user to activate immediately */}
              <button
                onClick={handleSimulateClickConfirmationLink}
                className="w-full gold-btn py-3.5 rounded-xl text-xs font-extrabold uppercase cursor-pointer shadow-md"
              >
                Click Simulated Confirmation Link (Activate Session)
              </button>

              <button
                onClick={() => setVerificationPending(false)}
                className="text-xs text-neutral-500 hover:text-black transition-colors"
              >
                ← Back to Sign In
              </button>
            </div>
          ) : (
            <div>
              {error && (
                <div className="mb-6 flex items-center space-x-2 rounded-xl bg-red-50 p-3.5 text-xs text-red-600 border border-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Toggle Tabs */}
              <div className="mb-6 flex rounded-xl border border-neutral-200 bg-[#faf8f5] p-1 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 rounded-lg py-2 font-bold uppercase transition-all ${
                    !isSignUp ? 'bg-[#d4af37] text-black font-extrabold shadow-sm' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 rounded-lg py-2 font-bold uppercase transition-all ${
                    isSignUp ? 'bg-[#d4af37] text-black font-extrabold shadow-sm' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {isSignUp && (
                  <div>
                    <label className="block text-neutral-600 mb-1 font-semibold">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Micky Bonny"
                        className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] py-2.5 pl-10 pr-3 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="trader@gmail.com"
                      className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] py-2.5 pl-10 pr-3 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-neutral-500">
                    Owner email: <span className="text-[#855f0b] font-bold">Mickybonny9@gmail.com</span> (auto-granted admin)
                  </p>
                </div>

                <div>
                  <label className="block text-neutral-600 mb-1 font-semibold">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-neutral-300 bg-[#faf8f5] py-2.5 pl-10 pr-3 text-neutral-900 focus:border-[#aa851d] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gold-btn py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer mt-4 shadow-md"
                >
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <span className="relative bg-white px-3 text-[10px] font-mono uppercase text-neutral-400">
                  Or Continue With
                </span>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={async () => {
                  await loginWithGoogle();
                  navigate('/dashboard');
                }}
                className="w-full rounded-xl border border-neutral-300 bg-white py-3 px-4 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                <span>Continue with Google</span>
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
};
