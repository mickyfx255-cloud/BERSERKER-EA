import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, Shield, User, Menu, X, ArrowUpRight, LogOut, Coins, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d4af37]/30 bg-white/95 shadow-xs backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo - XTech Algo Trading */}
        <div 
          onClick={() => navigate('/')} 
          className="group flex cursor-pointer items-center space-x-3 transition-opacity"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37] bg-gradient-to-br from-[#121319] via-[#1a1c24] to-[#002b66] shadow-[0_0_18px_rgba(0,102,255,0.25)] group-hover:border-[#ffd700] transition-colors">
            <span className="font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#f59e0b] to-[#0066ff]">
              X
            </span>
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#0066ff] shadow-[0_0_8px_#0066ff]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black tracking-tight text-lg uppercase text-[#1a1a1a] group-hover:text-[#0066ff] transition-colors flex items-center space-x-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b38600] to-[#e6b800]">X</span>
                <span className="text-[#0066ff]">TECH</span>
                <span className="text-xs font-bold text-neutral-800 tracking-wider ml-1">ALGO TRADING</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border border-[#0066ff]/40 bg-[#eff6ff] text-[#0066ff] font-bold">
                MT4 &amp; MT5
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-widest text-[#d97706] font-extrabold uppercase">
              AUTOMATE. ADAPT. OUTPERFORM.
            </p>
          </div>
        </div>

        {/* Desktop Nav Anchors */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-neutral-700">
          <button 
            onClick={() => scrollToSection('product')} 
            className="hover:text-[#aa851d] transition-colors cursor-pointer"
          >
            EA Suite
          </button>
          <button 
            onClick={() => scrollToSection('how')} 
            className="hover:text-[#aa851d] transition-colors cursor-pointer"
          >
            How it Works
          </button>
          <button 
            onClick={() => scrollToSection('platform')} 
            className="hover:text-[#aa851d] transition-colors cursor-pointer"
          >
            Platform
          </button>
          <button 
            onClick={() => scrollToSection('advisor')} 
            className="flex items-center space-x-1.5 text-[#059669] hover:text-[#aa851d] transition-colors cursor-pointer font-bold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-ping" />
            <span>AI Advisor</span>
          </button>
          <button 
            onClick={() => scrollToSection('mentorship')} 
            className="hover:text-[#aa851d] transition-colors cursor-pointer"
          >
            Mentorship
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-[#aa851d] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Action Controls & Auth */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* User state / Admin */}
          {user ? (
            <div className="flex items-center space-x-2">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center space-x-1.5 rounded-lg border border-[#d4af37] bg-[#18191e] px-3 py-1.5 text-xs font-mono font-bold uppercase text-[#ffd700] shadow-sm hover:bg-black transition-all cursor-pointer"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Admin</span>
                </button>
              )}
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:border-[#d4af37] transition-colors cursor-pointer shadow-sm"
              >
                <User className="h-3.5 w-3.5 text-[#aa851d]" />
                <span className="max-w-[100px] truncate">{user.full_name || user.email.split('@')[0]}</span>
              </button>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="gold-btn flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-sm"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="text-[11px] font-bold text-[#855f0b] border border-[#d4af37]/60 px-2 py-1 rounded bg-[#faf4e6]"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="text-[11px] font-bold text-[#855f0b] border border-[#d4af37]/60 px-2 py-1 rounded bg-[#faf4e6]"
            >
              Sign In
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-black cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-[#aa851d]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#d4af37]/30 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => scrollToSection('product')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-700 hover:text-[#aa851d]"
          >
            EA Suite (Berserker Scalp AI &amp; Snxperbot)
          </button>
          <button
            onClick={() => scrollToSection('how')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-700 hover:text-[#aa851d]"
          >
            How it Works
          </button>
          <button
            onClick={() => scrollToSection('platform')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-700 hover:text-[#aa851d]"
          >
            MT5 Platform Specs
          </button>
          <button
            onClick={() => scrollToSection('advisor')}
            className="block w-full text-left py-2 text-sm font-bold text-[#059669]"
          >
            AI Trading Advisor
          </button>
          <button
            onClick={() => scrollToSection('mentorship')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-700 hover:text-[#aa851d]"
          >
            Community Mentorship
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-700 hover:text-[#aa851d]"
          >
            Contact &amp; Support
          </button>

          <div className="pt-3 border-t border-neutral-200 flex flex-col space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
                  className="w-full py-2 text-center text-xs font-semibold rounded border border-neutral-300 bg-neutral-100 text-neutral-900"
                >
                  Dashboard ({user.full_name})
                </button>
                {isAdmin && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/admin'); }}
                    className="w-full py-2 text-center text-xs font-bold uppercase rounded border border-[#d4af37] bg-[#18191e] text-[#ffd700]"
                  >
                    Admin Control Panel
                  </button>
                )}
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="w-full py-1.5 text-center text-xs text-neutral-500 hover:text-black"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }}
                className="w-full py-2 text-center text-xs font-bold uppercase rounded gold-btn"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
