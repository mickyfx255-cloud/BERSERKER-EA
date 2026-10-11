import React, { useState } from 'react';
import berserkerTradeScreenshot from '../assets/images/berserker_xauusd_trades_1791726523727.jpg';
import snxperbotTradeScreenshot from '../assets/images/snxperbot_gbpnzd_trades_1791726536123.jpg';
import { Maximize2, X, CheckCircle2, MessageCircle, BarChart3, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';

export const SystemsPerformanceSection: React.FC = () => {
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string } | null>(null);

  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello XTech Algo Lab, I am looking at your Real Trades / Real Results on XAUUSD and GBPNZD. Please provide more verified MT4/MT5 statements and license details.'
  )}`;

  return (
    <section id="systems-performance" className="relative py-24 bg-[#08090c] border-t border-[#d4af37]/20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#121319] border border-[#d4af37]/40 px-3.5 py-1 mb-3">
            <BarChart3 className="h-3.5 w-3.5 text-[#ffd700]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
              SECTION 4: SYSTEMS PERFORMANCE
            </span>
          </div>

          {/* Exact Headline: Real Trades. Real Results. */}
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Real Trades. Real Results.
          </h2>

          {/* Exact Copy */}
          <p className="mt-3 text-sm sm:text-base text-neutral-300 font-sans max-w-2xl mx-auto">
            See how the systems perform in live market conditions. From grinding out consistent scalps to catching massive mean-reversion swings, our algorithms are built for action.
          </p>
        </div>

        {/* Visual: The two screenshots presented side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* SCREENSHOT 1: BERSERKER XAUUSD Fixed 0.08 Lots */}
          <div className="rounded-3xl bg-[#111218] border border-[#38bdf8]/40 p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#38bdf8] block">
                    LIVE LOG 01 · BERSERKER (THE SCALPER)
                  </span>
                  <h3 className="text-lg font-extrabold uppercase text-white mt-0.5">
                    XAUUSD (Gold) Precision Scalps
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalImage({
                    src: berserkerTradeScreenshot,
                    title: 'BERSERKER: XAUUSD Live Terminal History (Fixed 0.08 Lots · Consistent $12 Wins)',
                  })}
                  className="p-2 rounded-lg bg-[#141926] border border-[#38bdf8]/40 text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black transition-colors cursor-pointer"
                  title="Enlarge Screenshot"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {/* Screenshot Image */}
              <div
                onClick={() => setActiveModalImage({
                  src: berserkerTradeScreenshot,
                  title: 'BERSERKER: XAUUSD Live Terminal History (Fixed 0.08 Lots · Consistent $12 Wins)',
                })}
                className="relative group rounded-2xl overflow-hidden border border-neutral-800 bg-black cursor-zoom-in"
              >
                <img
                  src={berserkerTradeScreenshot}
                  alt="BERSERKER XAUUSD Gold Trades Screenshot - Fixed 0.08 Lots, Consistent $12 Wins"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-black/85 border border-[#38bdf8] text-xs font-mono text-white flex items-center space-x-1.5">
                    <Maximize2 className="h-3.5 w-3.5 text-[#38bdf8]" />
                    <span>Click to Zoom</span>
                  </span>
                </div>
              </div>

              {/* Specific Trade Metrics Tag */}
              <div className="mt-4 p-3 rounded-xl bg-[#0e1017] border border-neutral-800 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Instrument:</span>
                  <strong className="text-white">XAUUSD (Spot Gold)</strong>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Lot Allocation:</span>
                  <strong className="text-emerald-400">Fixed 0.08 Lots (Repeat Entries)</strong>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Target Payout:</span>
                  <strong className="text-[#ffd700]">+$12.00 Consistent Scalp Gains</strong>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Execution Frequency:</span>
                  <strong className="text-[#38bdf8]">High-Velocity Trend Snaps</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Engine: Berserker v3.2</span>
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified Execution</span>
              </span>
            </div>
          </div>

          {/* SCREENSHOT 2: SNXPERBOT GBPNZD Scaling Lots 0.3 to 22 */}
          <div className="rounded-3xl bg-[#111218] border border-[#ef4444]/40 p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#f87171] block">
                    LIVE LOG 02 · SNXPERBOT (THE REVERSION ENGINE)
                  </span>
                  <h3 className="text-lg font-extrabold uppercase text-white mt-0.5">
                    GBPNZD Adaptive Mean Reversion
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalImage({
                    src: snxperbotTradeScreenshot,
                    title: 'SnxperBot: GBPNZD Ladder History (Scaling Lots 0.3 to 22 · Unified Take-Profit)',
                  })}
                  className="p-2 rounded-lg bg-[#241315] border border-[#ef4444]/40 text-[#f87171] hover:bg-[#ef4444] hover:text-white transition-colors cursor-pointer"
                  title="Enlarge Screenshot"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {/* Screenshot Image */}
              <div
                onClick={() => setActiveModalImage({
                  src: snxperbotTradeScreenshot,
                  title: 'SnxperBot: GBPNZD Ladder History (Scaling Lots 0.3 to 22 · Unified Take-Profit)',
                })}
                className="relative group rounded-2xl overflow-hidden border border-neutral-800 bg-black cursor-zoom-in"
              >
                <img
                  src={snxperbotTradeScreenshot}
                  alt="SnxperBot GBPNZD Trades Screenshot - Scaling Lots 0.3 to 22, Unified Take Profit"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-black/85 border border-[#ef4444] text-xs font-mono text-white flex items-center space-x-1.5">
                    <Maximize2 className="h-3.5 w-3.5 text-[#f87171]" />
                    <span>Click to Zoom</span>
                  </span>
                </div>
              </div>

              {/* Specific Trade Metrics Tag */}
              <div className="mt-4 p-3 rounded-xl bg-[#140e10] border border-neutral-800 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Instrument:</span>
                  <strong className="text-white">GBPNZD (Forex Cross)</strong>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Lot Progression:</span>
                  <strong className="text-[#f87171]">Scaling 0.30 → 22.0 Lots</strong>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Entry Dynamics:</span>
                  <strong className="text-white">Systematic Dip Accumulation</strong>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Exit Mechanism:</span>
                  <strong className="text-emerald-400">Single Unified Basket TP</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Engine: SnxperBot v4.1</span>
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified Execution</span>
              </span>
            </div>
          </div>

        </div>

        {/* Live Desk Consultation Strip */}
        <div className="rounded-2xl bg-[#111218] border border-[#d4af37]/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-[#191b24] border border-[#d4af37]/50 flex items-center justify-center text-[#ffd700] shrink-0">
              <Cpu className="h-6 w-6 text-[#ffd700]" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase text-white">
                Live Terminal Audit &amp; Custom Sizing Presets
              </h4>
              <p className="text-xs text-neutral-300 font-mono">
                Need specific lot multipliers or custom risk stop parameters for your account equity? Contact the engineering desk.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn py-3 px-6 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center space-x-2 shrink-0 cursor-pointer shadow-md"
          >
            <MessageCircle className="h-4 w-4 text-black" />
            <span>Consult Engineering Desk</span>
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-5xl w-full rounded-2xl bg-[#111218] border border-[#d4af37]/40 p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="font-mono text-xs text-white font-bold">
                {activeModalImage.title}
              </div>
              <button
                onClick={() => setActiveModalImage(null)}
                className="h-8 w-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto rounded-xl">
              <img
                src={activeModalImage.src}
                alt={activeModalImage.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
