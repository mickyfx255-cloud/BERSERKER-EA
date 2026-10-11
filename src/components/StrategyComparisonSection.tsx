import React from 'react';
import { Check, Zap, Layers, ShieldCheck, TrendingUp, AlertTriangle, ArrowRight, Shield, Award, Sparkles, Scale } from 'lucide-react';

interface StrategyComparisonSectionProps {
  onSelectSystem?: (system: 'berserker' | 'snxperbot') => void;
  onViewProductPage: (id: string) => void;
}

export const StrategyComparisonSection: React.FC<StrategyComparisonSectionProps> = ({ onViewProductPage }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="strategy-comparison" className="relative py-24 bg-[#090a0d]/90 border-t border-[#d4af37]/20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#121319] border border-[#d4af37]/40 px-3.5 py-1 mb-3">
            <Scale className="h-3.5 w-3.5 text-[#ffd700]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
              SECTION 3: WHICH TO USE?
            </span>
          </div>

          {/* Exact Headline: Choose Your Strategy. */}
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Choose Your Strategy.
          </h2>

          {/* Intro description */}
          <p className="mt-3 text-sm sm:text-base text-neutral-300 font-sans">
            Compare algorithmic dynamics, risk parameters, and trade horizons to match your capital objectives.
          </p>
        </div>

        {/* Visual: Clean side-by-side comparison cards (Icy Blue for BSK, Deep Red for SNX) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* BERSERKER CARD (Icy Blue Theme) */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#10131a] border border-[#38bdf8]/40 shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center space-x-2.5">
                  <span className="h-3 w-3 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                    SYSTEM 01 · BERSERKER
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#162338] text-[#38bdf8] font-bold border border-[#38bdf8]/30">
                  ICY BLUE · TREND SCALPER
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  BERSERKER (The Scalper)
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  High-Frequency Precision Engine · M1/M5 Timeframe
                </p>
              </div>

              {/* Exact Copy Condition: Choose BERSERKER if */}
              <div className="rounded-2xl bg-[#0b1019] border border-[#38bdf8]/30 p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wide flex items-center space-x-2">
                  <Check className="h-4 w-4 text-[#38bdf8]" />
                  <span>Choose BERSERKER if:</span>
                </div>
                <p className="text-sm text-neutral-100 leading-relaxed font-sans font-medium">
                  You want frequent, smaller wins, lower per-trade risk, and a smoother, consistent equity curve that catches trends.
                </p>
              </div>

              {/* Strategy Parameters Breakdown */}
              <div className="space-y-3 font-mono text-xs pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#141926] border border-neutral-800">
                  <span className="text-neutral-400">Target Asset:</span>
                  <strong className="text-white">XAUUSD (Gold) Precision</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#141926] border border-neutral-800">
                  <span className="text-neutral-400">Lot Sizing Model:</span>
                  <strong className="text-emerald-400">Fixed 0.08 Lots (Constant)</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#141926] border border-neutral-800">
                  <span className="text-neutral-400">Trade Frequency:</span>
                  <strong className="text-white">High Velocity (Micro-bursts)</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#141926] border border-neutral-800">
                  <span className="text-neutral-400">Drawdown Profile:</span>
                  <strong className="text-emerald-400">Strictly Guarded &amp; Low Risk</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#141926] border border-neutral-800">
                  <span className="text-neutral-400">Equity Curve Shape:</span>
                  <strong className="text-[#38bdf8]">Smooth, Linear Ascent</strong>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo('berserker-section')}
                className="gold-btn flex-1 py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <span>View Berserker Live Trades</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </button>
              <button
                onClick={() => onViewProductPage('prod-berserker-scalp-ai')}
                className="py-3 px-4 rounded-xl border border-[#38bdf8]/40 bg-[#141926] text-xs font-mono font-bold text-white hover:border-[#38bdf8] transition-all cursor-pointer"
              >
                System Specs
              </button>
            </div>
          </div>

          {/* SNXPERBOT CARD (Deep Red Theme) */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#181113] border border-[#ef4444]/40 shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center space-x-2.5">
                  <span className="h-3 w-3 rounded-full bg-[#ef4444] shadow-[0_0_10px_#ef4444]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f87171]">
                    SYSTEM 02 · SNXPERBOT
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#291316] text-[#f87171] font-bold border border-[#ef4444]/30">
                  DEEP RED · MEAN REVERSION
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  SnxperBot (The Reversion Engine)
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Adaptive Extreme Grid &amp; Dip Hunter · Multi-Timeframe
                </p>
              </div>

              {/* Exact Copy Condition: Choose SnxperBot if */}
              <div className="rounded-2xl bg-[#1c0c0f] border border-[#ef4444]/30 p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-[#f87171] uppercase tracking-wide flex items-center space-x-2">
                  <Check className="h-4 w-4 text-[#f87171]" />
                  <span>Choose SnxperBot if:</span>
                </div>
                <p className="text-sm text-neutral-100 leading-relaxed font-sans font-medium">
                  You want to capture explosive reversals, are comfortable with high leverage, and accept the potential for large drawdowns in exchange for massive upside.
                </p>
              </div>

              {/* Strategy Parameters Breakdown */}
              <div className="space-y-3 font-mono text-xs pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#211417] border border-neutral-800">
                  <span className="text-neutral-400">Target Asset:</span>
                  <strong className="text-white">GBPNZD &amp; 28 Major Pairs</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#211417] border border-neutral-800">
                  <span className="text-neutral-400">Lot Sizing Model:</span>
                  <strong className="text-[#f87171]">Dynamic Scaling (0.30 to 22.0)</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#211417] border border-neutral-800">
                  <span className="text-neutral-400">Trade Horizon:</span>
                  <strong className="text-white">Mean Snapback Expansion</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#211417] border border-neutral-800">
                  <span className="text-neutral-400">Drawdown Profile:</span>
                  <strong className="text-amber-400">Elastic Grid Management</strong>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#211417] border border-neutral-800">
                  <span className="text-neutral-400">Equity Curve Shape:</span>
                  <strong className="text-[#f87171]">Stepped, Explosive Gains</strong>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo('snxperbot-section')}
                className="gold-btn flex-1 py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <span>View SnxperBot Order Ladder</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </button>
              <button
                onClick={() => onViewProductPage('prod-snxperbot-adaptive-engine')}
                className="py-3 px-4 rounded-xl border border-[#ef4444]/40 bg-[#211417] text-xs font-mono font-bold text-white hover:border-[#ef4444] transition-all cursor-pointer"
              >
                System Specs
              </button>
            </div>
          </div>

        </div>

        {/* Synergy Copy Box: Run one, or run both... */}
        <div className="rounded-3xl bg-[#111218] border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-[#ffd700]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
                  PORTFOLIO ARSENAL DIVERSIFICATION
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold uppercase text-white">
                Dual System Deployment Architecture
              </h4>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                <strong className="text-white">Run one, or run both to diversify your portfolio across different market regimes.</strong> When gold trends aggressively, BERSERKER grinds out consistent micro-scalps. When foreign exchange ranges and extends to oversold/overbought boundaries, SnxperBot snaps back the mean for high-leverage payouts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => scrollTo('systems-performance')}
                className="gold-btn py-3.5 px-6 rounded-xl text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-md text-center"
              >
                View Side-By-Side Performance
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
