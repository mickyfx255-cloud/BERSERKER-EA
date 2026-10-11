import React from 'react';
import xtechAlgoLabLogo from '../assets/images/xtech_algo_lab_logo_1791726552396.jpg';
import tradingWorkstationHero from '../assets/images/hero_trading_workstation_1791724696774.jpg';
import { ArrowRight, Bot, MessageCircle, Sparkles, TrendingUp, Cpu, Activity, ShieldCheck, Crosshair, Zap } from 'lucide-react';

interface HeroSectionProps {
  onViewProduct: () => void;
  onAskAI: () => void;
  onSelectSystem?: (system: 'berserker' | 'snxperbot') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewProduct, onAskAI, onSelectSystem }) => {
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
                onClick={() => scrollTo('berserker-section')}
                className="gold-btn group inline-flex items-center justify-center space-x-2 rounded-xl px-7 py-4 text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-lg hover:brightness-105"
              >
                <span>Explore The Systems</span>
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

              {/* Live Trade Proof */}
              <button
                onClick={() => scrollTo('systems-performance')}
                className="gold-outline-btn inline-flex items-center justify-center space-x-2 rounded-xl px-5 py-4 text-xs cursor-pointer shadow-xs"
              >
                <Crosshair className="h-4 w-4 text-[#ffd700]" />
                <span>Live Trade Proof</span>
              </button>
            </div>

            {/* Reassurance strip */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono pt-1">
              <span className="inline-flex items-center space-x-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Live MetaTrader 5 Logs</span>
              </span>
              <span>·</span>
              <span className="text-neutral-300">Remote Hardware Authentication</span>
              <span>·</span>
              <span className="text-[#ffd700]">Zero Cracks / 100% Genuine</span>
            </div>

          </div>

          {/* Right Column: Premium Trading Workstation Imagery against Dark Background */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-lg aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden border border-[#d4af37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#0d0e14]">
              
              {/* Premium Trading Workstation Photo */}
              <img
                src={tradingWorkstationHero}
                alt="XTech Institutional Trading Workstation"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Top Ambient Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 rounded-full bg-black/85 backdrop-blur-md px-3 py-1 border border-[#d4af37]/50 shadow-md">
                  <Sparkles className="h-3 w-3 text-[#ffd700]" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#ffd700]">
                    AI WORKSTATION
                  </span>
                </div>
                <div className="rounded-full bg-black/85 backdrop-blur-md px-2.5 py-1 border border-neutral-700">
                  <span className="font-mono text-[10px] font-bold text-white">
                    MT4 &amp; MT5 ENGINE
                  </span>
                </div>
              </div>

              {/* Floating Candlestick Chart HUD Overlay with green and red candles */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/85 backdrop-blur-md p-3.5 border border-[#d4af37]/30 shadow-lg font-mono">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-800">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white">LIVE ARSENAL FEED</span>
                  </div>
                  <span className="text-[10px] text-[#ffd700]">XAUUSD + GBPNZD</span>
                </div>

                {/* Candlestick visual bars (Green & Red) */}
                <div className="flex items-end justify-between pt-3 pb-1 h-12 px-1">
                  {[
                    { h: 32, type: 'up', val: '+0.4%' },
                    { h: 22, type: 'down', val: '-0.2%' },
                    { h: 42, type: 'up', val: '+0.8%' },
                    { h: 28, type: 'up', val: '+0.3%' },
                    { h: 18, type: 'down', val: '-0.1%' },
                    { h: 48, type: 'up', val: '+1.2%' },
                    { h: 38, type: 'up', val: '+0.7%' },
                    { h: 24, type: 'down', val: '-0.3%' },
                    { h: 45, type: 'up', val: '+0.9%' },
                    { h: 36, type: 'up', val: '+0.6%' },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        style={{ height: `${bar.h}px` }}
                        className={`w-2 sm:w-2.5 rounded-xs transition-all ${
                          bar.type === 'up'
                            ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                            : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                  <span>M1 Scalping: Fixed 0.08</span>
                  <span className="text-emerald-400 font-bold">+$12 Wins / Rapid TP</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar underneath workstation */}
            <div className="mt-4 grid grid-cols-3 gap-3 w-full max-w-lg font-mono text-center">
              <div className="p-2.5 rounded-xl bg-[#111218] border border-[#d4af37]/25">
                <span className="text-[10px] text-neutral-400 uppercase block">Platforms</span>
                <span className="text-xs font-bold text-white">MT4 &amp; MT5</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#111218] border border-[#d4af37]/25">
                <span className="text-[10px] text-neutral-400 uppercase block">Execution</span>
                <span className="text-xs font-bold text-emerald-400">&lt; 15ms</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#111218] border border-[#d4af37]/25">
                <span className="text-[10px] text-neutral-400 uppercase block">License</span>
                <span className="text-xs font-bold text-[#ffd700]">Hardware Locked</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
