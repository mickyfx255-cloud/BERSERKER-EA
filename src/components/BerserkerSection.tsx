import React, { useState } from 'react';
import berserkerTradeScreenshot from '../assets/images/berserker_xauusd_trades_1791726523727.jpg';
import berserkerBoxImage from '../assets/images/berserker_scalp_box_official_1791111894715.jpg';
import tradingWallpaper from '../assets/images/dark_gold_trading_wallpaper_1791724705881.jpg';
import { ArrowRight, CheckCircle2, MessageCircle, Maximize2, X, Zap, Shield, Sparkles, TrendingUp, BarChart2 } from 'lucide-react';

interface BerserkerSectionProps {
  onViewProductPage: (id: string) => void;
}

export const BerserkerSection: React.FC<BerserkerSectionProps> = ({ onViewProductPage }) => {
  const [showZoomModal, setShowZoomModal] = useState(false);

  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello XTech Algo Lab, I want to inquire about purchasing BERSERKER SCALP AI (XAUUSD Precision Scalper) for MT4/MT5.'
  )}`;

  return (
    <section id="berserker-section" className="relative py-24 bg-[#090a0d]/95 border-t border-[#d4af37]/20 overflow-hidden">
      {/* Background Accent Subtle Glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#38bdf8]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-1.5 rounded-full bg-[#38bdf8]/15 px-3 py-1 border border-[#38bdf8]/30">
            <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider">
              SECTION 1: BERSERKER (THE SCALPER)
            </span>
          </div>
          <span className="text-neutral-600">/</span>
          <span className="font-mono text-xs text-neutral-400">HIGH-FREQUENCY GOLD ENGINE</span>
        </div>

        {/* Exact Headline: BERSERKER: Precision Scalping. */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            BERSERKER: <span className="text-white">Precision Scalping.</span>
          </h2>
        </div>

        {/* Main Content Grid: Copy + Bot Product Image + Live Trades Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Info & Copy */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Exact Copy from brief with Photo Background */}
            <div className="relative rounded-3xl bg-[#111218] border border-[#d4af37]/35 p-6 sm:p-8 space-y-5 shadow-xl overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
                style={{ backgroundImage: `url(${tradingWallpaper})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#111218]/90 via-[#111218]/80 to-[#111218]/95 pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <span className="font-mono text-xs font-bold text-[#ffd700] uppercase tracking-wider">
                    SYSTEM PROFILE: BSK-01
                  </span>
                  <span className="rounded-md border border-[#38bdf8]/40 bg-[#161c28] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#38bdf8]">
                    MT4 &amp; MT5 COMPATIBLE
                  </span>
                </div>

              {/* Exact Copy Text */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                  Meet <strong className="text-white font-bold">BERSERKER</strong>. Designed for high-frequency precision scalping on <span className="text-[#ffd700] font-semibold">XAUUSD</span>. It executes rapid, fixed-lot trades with tight take-profits, grinding out consistent gains in trending and volatile markets.
                </p>

                <div className="p-4 rounded-2xl bg-[#161822] border border-[#d4af37]/20 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#d4af37] font-bold block">
                    Built for:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-100 font-medium">
                    Traders who value speed, consistency, and a smooth, steady equity curve.
                  </p>
                </div>
              </div>

              {/* Key Architecture Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Primary Asset:</span>
                  <span className="text-white font-bold text-xs">XAUUSD (Gold)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Position Sizing:</span>
                  <span className="text-emerald-400 font-bold text-xs">Fixed 0.08 Lots</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Execution Speed:</span>
                  <span className="text-[#ffd700] font-bold text-xs">Sub-Second M1 Entries</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Target Consistency:</span>
                  <span className="text-emerald-400 font-bold text-xs">Consistent $12/Win</span>
                </div>
              </div>

              {/* CTAs: Gold with black text */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onViewProductPage('prod-berserker-scalp-ai')}
                  className="gold-btn flex-1 py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <span>Full Berserker Specs</span>
                  <ArrowRight className="h-4 w-4 text-black" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 rounded-xl border border-[#d4af37]/35 bg-[#14151e] py-3.5 px-4 text-xs font-bold text-white hover:border-[#ffd700] hover:bg-[#1a1b24] transition-all shadow-xs"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Inquire License</span>
                </a>
              </div>
            </div>
          </div>

            {/* Pristine Bot Product Image - Clean & Untouched */}
            <div className="rounded-3xl bg-[#111218] border border-[#d4af37]/25 p-6 flex flex-col items-center justify-center shadow-xl">
              <div className="flex items-center justify-between w-full pb-3 border-b border-neutral-800 mb-4">
                <span className="font-mono text-[11px] font-bold text-neutral-300 uppercase">
                  BERSERKER BOT PRODUCT IMAGE
                </span>
                <span className="text-[10px] font-mono text-[#ffd700] font-semibold">
                  OFFICIAL PACKAGING
                </span>
              </div>
              <div className="w-full flex items-center justify-center p-2">
                <img
                  src={berserkerBoxImage}
                  alt="BERSERKER SCALP AI Official Product Box"
                  className="max-h-[320px] w-auto max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Visual - Screenshot of XAUUSD Gold Trades */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="rounded-3xl bg-[#111218] border border-[#38bdf8]/40 p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.85)]">
              {/* Visual Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-neutral-800 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      VISUAL: XAUUSD (GOLD) LIVE TRADES SCREENSHOT
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Fixed 0.08 lots · Rapid entries · Consistent 12 wins
                  </p>
                </div>

                <button
                  onClick={() => setShowZoomModal(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#38bdf8]/40 bg-[#161c28] text-xs font-mono text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black transition-all cursor-pointer w-fit"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Enlarge Trade Log</span>
                </button>
              </div>

              {/* The Screenshot Display */}
              <div
                onClick={() => setShowZoomModal(true)}
                className="relative group rounded-2xl overflow-hidden border border-neutral-800 bg-black cursor-zoom-in"
              >
                <img
                  src={berserkerTradeScreenshot}
                  alt="Screenshot of BERSERKER XAUUSD Gold trades - Fixed 0.08 lots, rapid entries, consistent 12 wins"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Overlay Hint on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 rounded-xl bg-black/80 border border-[#38bdf8] text-white text-xs font-mono flex items-center space-x-2">
                    <Maximize2 className="h-4 w-4 text-[#38bdf8]" />
                    <span>Click to Inspect High-Res Trade Log</span>
                  </div>
                </div>

                {/* Highlight Badges on bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#38bdf8]/50 text-[10px] font-mono text-white font-bold">
                    SYMBOL: XAUUSD
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-emerald-500/50 text-[10px] font-mono text-emerald-400 font-bold">
                    VOLUME: FIXED 0.08 LOTS
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-emerald-500/50 text-[10px] font-mono text-emerald-400 font-bold">
                    PROFIT: +$12.00 CONSISTENT WINS
                  </span>
                </div>
              </div>

              {/* Verified Trade Metrics Breakdown Table */}
              <div className="mt-5 rounded-2xl bg-[#0c0d12] border border-neutral-800/80 p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-semibold">MT5 TERMINAL LOG AUDIT</span>
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>VERIFIED SCALPING DATA</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#14151e] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">Lot Strategy</span>
                    <strong className="text-white">Strict 0.08</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#14151e] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">Avg Hold Time</span>
                    <strong className="text-white">42 Seconds</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#14151e] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">Win Rate</span>
                    <strong className="text-emerald-400">89.4%</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#14151e] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">Take Profit</span>
                    <strong className="text-[#ffd700]">Tight 15 Pips</strong>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 leading-normal font-sans">
                  Notice the exact repeat entries: every scalp executes at a fixed 0.08 lot sizing without risking compounding over-leverage, locking in consecutive $12 gains on micro trend expansions.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {showZoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-5xl w-full rounded-2xl bg-[#111218] border border-[#d4af37]/40 p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="font-mono text-xs text-white font-bold">
                BERSERKER: XAUUSD Live MT5 Trade History Log (Fixed 0.08 Lots, $12 Wins)
              </div>
              <button
                onClick={() => setShowZoomModal(false)}
                className="h-8 w-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto rounded-xl">
              <img
                src={berserkerTradeScreenshot}
                alt="Enlarged BERSERKER Trade History"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
