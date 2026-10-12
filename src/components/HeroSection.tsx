import React from 'react';
import xtechAlgoLabLogo from '../assets/images/xtech_algo_lab_logo_1791726552396.jpg';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface HeroSectionProps {
  onViewProduct: () => void;
  onAskAI?: () => void;
  onSelectSystem?: (system: 'berserker' | 'snxperbot') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewProduct, onSelectSystem }) => {
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello XTech Algo Lab, I want to inquire about BERSERKER and SnxperBot trading systems for MetaTrader 4 & MetaTrader 5.'
  )}`;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-transparent border-b border-[#d4af37]/20">
      {/* Ambient deep charcoal glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0d]/95 via-[#090a0d]/90 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Copy (White with restrained gold accents) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Brand Tag with Official Logo Badge */}
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#ffd700]">
                XTECH ALGO LAB
              </span>
              <span className="hidden sm:inline-block h-1 w-8 bg-gradient-to-r from-[#d4af37] to-neutral-700 rounded-full" />
              <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 font-bold">
                DUAL INSTITUTIONAL ENGINES
              </span>
            </div>

            {/* Official Logo Banner & Lockup */}
            <div className="flex items-center space-x-4">
              <div className="h-16 w-28 sm:h-20 sm:w-36 rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-[#090a0d] shadow-[0_0_25px_rgba(212,175,55,0.2)] shrink-0">
                <img
                  src={xtechAlgoLabLogo}
                  alt="XTECH ALGO LAB Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-xs text-[#d4af37] uppercase tracking-widest font-bold block">
                  Official Algorithmic Suite
                </span>
                <span className="font-black text-white text-lg sm:text-xl tracking-tight uppercase">
                  MT4 &amp; MT5 Architecture
                </span>
              </div>
            </div>

            {/* Exact User Headline: XTECH ALGO LAB: Two Systems. One Arsenal. */}
            <div className="space-y-2">
              <h1 className="font-black uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl text-white leading-[1.05]">
                XTECH ALGO LAB: <br />
                <span className="text-white">Two Systems. </span>
                <span className="text-[#ffd700]">One Arsenal.</span>
              </h1>
            </div>

            {/* Exact User Sub-headline: Trend scalping meets adaptive mean reversion... */}
            <div className="pt-1">
              <p className="text-base sm:text-lg md:text-xl text-neutral-200 font-medium leading-relaxed max-w-2xl">
                Trend scalping meets adaptive mean reversion. Discover the algorithmic tools engineered to conquer every market condition.
              </p>
            </div>

            {/* Two Systems Quick Jump Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Berserker Quick Card */}
              <button
                onClick={() => scrollTo('berserker-section')}
                className="group text-left p-3.5 rounded-2xl bg-[#111218] border border-[#38bdf8]/30 hover:border-[#38bdf8] transition-all cursor-pointer shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
                    <span className="font-mono text-[11px] font-bold text-[#38bdf8] uppercase">
                      SYSTEM 01 · BERSERKER
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                    The Scalper →
                  </span>
                </div>
                <div className="font-bold text-sm text-white">XAUUSD Precision Scalper</div>
                <div className="text-[11px] font-mono text-neutral-300 mt-0.5">Fixed 0.08 Lots · Rapid Entries · $12 Consistent Wins</div>
              </button>

              {/* SnxperBot Quick Card */}
              <button
                onClick={() => scrollTo('snxperbot-section')}
                className="group text-left p-3.5 rounded-2xl bg-[#111218] border border-[#ef4444]/30 hover:border-[#ef4444] transition-all cursor-pointer shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
                    <span className="font-mono text-[11px] font-bold text-[#f87171] uppercase">
                      SYSTEM 02 · SNXPERBOT
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                    The Reversion Engine →
                  </span>
                </div>
                <div className="font-bold text-sm text-white">Adaptive Mean Reversion</div>
                <div className="text-[11px] font-mono text-neutral-300 mt-0.5">Dynamic Scaling (0.3 - 22) · Dip Buying · Unified TP</div>
              </button>
            </div>

            {/* CTAs: Gold buttons with black text */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary: Gold button with black text */}
              <button
                onClick={() => scrollTo('product')}
                className="gold-btn group inline-flex items-center justify-center space-x-2 rounded-xl px-7 py-4 text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-lg hover:brightness-105"
              >
                <span>Explore The Arsenal</span>
                <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Direct WhatsApp Inquire */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 rounded-xl border border-[#d4af37]/35 bg-[#14151c] px-6 py-4 text-xs font-bold text-white hover:border-[#ffd700] hover:bg-[#191b24] transition-all shadow-xs"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>Inquire Desk (+255 610 366 248)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Clean Dual Bot Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-lg rounded-3xl bg-[#111218] border border-[#d4af37]/35 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-mono text-xs font-bold text-[#ffd700] uppercase tracking-wider">
                  OFFICIAL ARSENAL EDITIONS
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  GENUINE LICENSES
                </span>
              </div>

              {/* Dual System Quick View Cards */}
              <div className="space-y-3">
                <div 
                  onClick={() => scrollTo('berserker-section')}
                  className="p-4 rounded-2xl bg-[#0c0d12] border border-[#38bdf8]/30 hover:border-[#38bdf8] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-[#141c28] border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] font-bold font-mono text-sm">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                        BERSERKER SCALP AI
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono">XAUUSD Gold Precision Scalper · Fixed 0.08 Lots</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all" />
                </div>

                <div 
                  onClick={() => scrollTo('snxperbot-section')}
                  className="p-4 rounded-2xl bg-[#0c0d12] border border-[#ef4444]/30 hover:border-[#ef4444] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-[#241517] border border-[#ef4444]/40 flex items-center justify-center text-[#f87171] font-bold font-mono text-sm">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#f87171] transition-colors">
                        SNXPERBOT ADAPTIVE ENGINE
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono">Forex Mean Reversion · Dynamic Scaling (0.3 - 22)</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-[#f87171] group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Bottom Specs Strip */}
              <div className="pt-2 border-t border-neutral-800 grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="p-2 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Terminal</span>
                  <span className="font-bold text-white">MT4 &amp; MT5</span>
                </div>
                <div className="p-2 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Activation</span>
                  <span className="font-bold text-emerald-400">WebRequest</span>
                </div>
                <div className="p-2 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Access</span>
                  <span className="font-bold text-[#ffd700]">Hardware Lock</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
