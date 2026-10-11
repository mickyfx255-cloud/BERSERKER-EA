import React, { useState } from 'react';
import snxperbotTradeScreenshot from '../assets/images/snxperbot_gbpnzd_trades_1791726536123.jpg';
import snxperbotBoxImage from '../assets/images/snxperbot_adaptive_box_1791064534614.jpg';
import tradingWallpaper from '../assets/images/dark_gold_trading_wallpaper_1791724705881.jpg';
import { ArrowRight, CheckCircle2, MessageCircle, Maximize2, X, TrendingUp, Layers, Crosshair, AlertTriangle } from 'lucide-react';

interface SnxperBotSectionProps {
  onViewProductPage: (id: string) => void;
}

export const SnxperBotSection: React.FC<SnxperBotSectionProps> = ({ onViewProductPage }) => {
  const [showZoomModal, setShowZoomModal] = useState(false);

  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello XTech Algo Lab, I want to inquire about purchasing SnxperBot (Adaptive Mean Reversion Engine) for MT4/MT5.'
  )}`;

  return (
    <section id="snxperbot-section" className="relative py-24 bg-[#08090d] border-t border-[#d4af37]/20 overflow-hidden">
      {/* Background Accent Subtle Glow */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#ef4444]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-1.5 rounded-full bg-[#ef4444]/15 px-3 py-1 border border-[#ef4444]/30">
            <span className="h-2 w-2 rounded-full bg-[#ef4444] animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-[#f87171] uppercase tracking-wider">
              SECTION 2: SNXPERBOT (THE REVERSION ENGINE)
            </span>
          </div>
          <span className="text-neutral-600">/</span>
          <span className="font-mono text-xs text-neutral-400">ADAPTIVE MULTI-PAIR ENGINE</span>
        </div>

        {/* Exact Headline: SnxperBot: Adaptive Mean Reversion. */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            SnxperBot: <span className="text-white">Adaptive Mean Reversion.</span>
          </h2>
        </div>

        {/* Main Content Grid: Copy + Bot Product Image + Live Trades Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Info & Copy */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Exact Copy Card with Photo Background */}
            <div className="relative rounded-3xl bg-[#111218] border border-[#d4af37]/35 p-6 sm:p-8 space-y-5 shadow-xl overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
                style={{ backgroundImage: `url(${tradingWallpaper})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#111218]/90 via-[#111218]/80 to-[#111218]/95 pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <span className="font-mono text-xs font-bold text-[#ffd700] uppercase tracking-wider">
                    SYSTEM PROFILE: SNX-02
                  </span>
                  <span className="rounded-md border border-[#ef4444]/40 bg-[#241315] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#f87171]">
                    MT4 &amp; MT5 COMPATIBLE
                  </span>
                </div>

              {/* Exact Copy Text */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                  Introducing <strong className="text-white font-bold">SnxperBot</strong>. A sophisticated adaptive mean reversion engine. It identifies market extremes and systematically scales into positions, anticipating a statistical return to the mean. It thrives in ranging and volatile conditions, catching explosive snap-backs.
                </p>

                <div className="p-4 rounded-2xl bg-[#161822] border border-[#d4af37]/20 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#d4af37] font-bold block">
                    Built for:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-100 font-medium">
                    Traders seeking massive, rapid returns who understand high-leverage dynamics and grid-based position management.
                  </p>
                </div>
              </div>

              {/* Key Architecture Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Reversion Pairs:</span>
                  <span className="text-white font-bold text-xs">GBPNZD + 28 Pairs</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Position Sizing:</span>
                  <span className="text-[#f87171] font-bold text-xs">Scaling (0.3 to 22)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Take Profit:</span>
                  <span className="text-emerald-400 font-bold text-xs">Unified Basket TP</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14151e] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Reversion Edge:</span>
                  <span className="text-[#ffd700] font-bold text-xs">Statistical Mean Snap</span>
                </div>
              </div>

              {/* CTAs: Gold with black text */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onViewProductPage('prod-snxperbot-adaptive-engine')}
                  className="gold-btn flex-1 py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <span>Full SnxperBot Specs</span>
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
                  SNXPERBOT BOT PRODUCT IMAGE
                </span>
                <span className="text-[10px] font-mono text-[#ffd700] font-semibold">
                  OFFICIAL PACKAGING
                </span>
              </div>
              <div className="w-full flex items-center justify-center p-2">
                <img
                  src={snxperbotBoxImage}
                  alt="SNXPERBOT Adaptive Engine Official Product Box"
                  className="max-h-[320px] w-auto max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Visual - Screenshot of GBPNZD Trades */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="rounded-3xl bg-[#111218] border border-[#ef4444]/40 p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.85)]">
              {/* Visual Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-neutral-800 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      VISUAL: GBPNZD LIVE TRADES SCREENSHOT
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Scaling lots (0.3 to 22) · Buying into the dip · Unified take-profit exit
                  </p>
                </div>

                <button
                  onClick={() => setShowZoomModal(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#ef4444]/40 bg-[#241315] text-xs font-mono text-[#f87171] hover:bg-[#ef4444] hover:text-white transition-all cursor-pointer w-fit"
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
                  src={snxperbotTradeScreenshot}
                  alt="Screenshot of SnxperBot GBPNZD trades - Scaling lots (0.3 to 22), buying into the dip, exiting at unified take-profit"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Overlay Hint on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 rounded-xl bg-black/80 border border-[#ef4444] text-white text-xs font-mono flex items-center space-x-2">
                    <Maximize2 className="h-4 w-4 text-[#f87171]" />
                    <span>Click to Inspect High-Res Order Ladder</span>
                  </div>
                </div>

                {/* Highlight Badges on bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#ef4444]/50 text-[10px] font-mono text-white font-bold">
                    SYMBOL: GBPNZD
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#f87171]/50 text-[10px] font-mono text-[#f87171] font-bold">
                    LOT LADDER: 0.30 → 22.0 LOTS
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-emerald-500/50 text-[10px] font-mono text-emerald-400 font-bold">
                    EXIT: UNIFIED BASKET TAKE-PROFIT
                  </span>
                </div>
              </div>

              {/* Position Dynamics Breakdown Table */}
              <div className="mt-5 rounded-2xl bg-[#0c0d12] border border-neutral-800/80 p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-semibold">MT5 ORDER BOOK &amp; LADDER REVERSION</span>
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>PROVABLY PROFITABLE SNAPBACK</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#14151e] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">Lot Range</span>
                    <strong className="text-white">0.30 to 22.0</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#14151e] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">Execution Mode</span>
                    <strong className="text-white">Buy Into The Dip</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#14151e] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">Basket Payout</span>
                    <strong className="text-emerald-400">High Upside</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#14151e] border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">Exit Method</span>
                    <strong className="text-[#ffd700]">Unified Take-Profit</strong>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 leading-normal font-sans">
                  The ladder visualizes SnxperBot's signature behavior: as GBPNZD drops to statistical support extremes, the algorithm buys into the dip with calculated position scaling, then exits all layers in a single unified take-profit as price snaps back.
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
                SnxperBot: GBPNZD Scaling Lots (0.3 to 22) Dip Buying &amp; Unified TP
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
                src={snxperbotTradeScreenshot}
                alt="Enlarged SnxperBot Trade History"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
