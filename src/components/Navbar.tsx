import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, Shield, User, Menu, X, ArrowUpRight, Coins, Sparkles, LayoutDashboard, Download } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { user, isAdmin } = useAuth();
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
    <header className="sticky top-0 z-50 w-full border-b border-[#d4af37]/20 bg-[#090a0d]/95 shadow-md shadow-black/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo - White with restrained gold accents */}
        <div 
          onClick={() => navigate('/')} 
          className="group flex cursor-pointer items-center space-x-3 transition-opacity"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/50 bg-[#121319] shadow-[0_0_15px_rgba(212,175,55,0.18)] group-hover:border-[#ffd700] transition-colors">
            <span className="font-black text-xl tracking-tighter text-[#ffd700]">
              X
            </span>
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#ffd700]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black tracking-tight text-base sm:text-lg uppercase text-white group-hover:text-neutral-100 transition-colors flex items-center">
                <span className="text-[#ffd700]">X</span>
                <span className="text-white">TECH</span>
                <span className="text-xs font-bold text-neutral-300 tracking-wider ml-1.5 hidden sm:inline">ALGO LAB</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#d4af37]/35 bg-[#171822] text-[#f5d061] font-semibold">
                MT4 &amp; MT5
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#d4af37] font-semibold uppercase">
              TWO SYSTEMS. ONE ARSENAL.
            </p>
          </div>
        </div>

        {/* Desktop Nav Anchors */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-neutral-300">
          <button 
            onClick={() => scrollToSection('product')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            The Arsenal
          </button>
          <button 
            onClick={() => scrollToSection('berserker-section')} 
            className="hover:text-[#38bdf8] transition-colors cursor-pointer"
          >
            Berserker
          </button>
          <button 
            onClick={() => scrollToSection('snxperbot-section')} 
            className="hover:text-[#f87171] transition-colors cursor-pointer"
          >
            SnxperBot
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Action Controls - Admin Panel Only */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => navigate('/admin')}
            className="gold-btn flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-md hover:brightness-105"
          >
            <Terminal className="h-4 w-4 text-black" />
            <span>Admin Panel</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => navigate('/admin')}
            className="text-[11px] font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f5d061] px-3 py-1.5 rounded-lg flex items-center space-x-1"
          >
            <Terminal className="h-3 w-3 text-black" />
            <span>Admin</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-[#d4af37]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#d4af37]/20 bg-[#0d0e13] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <button
            onClick={() => scrollToSection('product')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-200 hover:text-white"
          >
            The Arsenal (Two Systems)
          </button>
          <button
            onClick={() => scrollToSection('berserker-section')}
            className="block w-full text-left py-2 text-sm font-medium text-[#38bdf8] hover:text-white"
          >
            BERSERKER (The Scalper)
          </button>
          <button
            onClick={() => scrollToSection('snxperbot-section')}
            className="block w-full text-left py-2 text-sm font-medium text-[#f87171] hover:text-white"
          >
            SnxperBot (The Reversion Engine)
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-200 hover:text-white"
          >
            Contact Desk
          </button>

          <div className="pt-3 border-t border-neutral-800 flex flex-col space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/admin'); }}
              className="w-full py-2.5 text-center text-xs font-extrabold uppercase rounded-xl gold-btn flex items-center justify-center space-x-2 text-black cursor-pointer shadow-md"
            >
              <Terminal className="h-4 w-4 text-black" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
