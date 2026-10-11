import React from 'react';
import { Cpu, Zap, Shield, Server, Check, CheckCircle2, Layers } from 'lucide-react';

export const PlatformSection: React.FC = () => {
  const specs = [
    {
      title: 'MetaTrader 4 (MT4) Universal Engine',
      desc: 'Native MQL4 architecture engineered for universal deployment across all global forex brokers, prop firms, and low-latency ECN terminals.',
      icon: Layers,
    },
    {
      title: 'MetaTrader 5 (MT5) 64-Bit Engine',
      desc: 'MQL5 multi-threaded processing with sub-millisecond execution, native DOM tick access, and multi-asset algorithmic calculation.',
      icon: Cpu,
    },
    {
      title: 'Prop Firm & Hedge Compatibility',
      desc: 'Full compliance with prop firm challenge rules (FTMO, FundedNext, MFF) with hard equity protection, max drawdown safeguards, and zero grid.',
      icon: Shield,
    },
    {
      title: 'Unified VPS Optimization',
      desc: 'Ultra-low resource footprint for reliable 24/5 uptime on Windows/Linux VPS close to London, New York, or Frankfurt liquidity providers.',
      icon: Server,
    },
  ];

  return (
    <section id="platform" className="relative py-24 bg-[#090a0d]/90 border-t border-[#d4af37]/20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
              DUAL TERMINAL INFRASTRUCTURE
            </span>
            <h2 className="mt-2 font-extrabold uppercase tracking-tight text-3xl sm:text-5xl text-white">
              ENGINEERED FOR METATRADER 4 &amp; METATRADER 5
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300">
              Deploy <strong className="text-white font-semibold">Berserker Scalp AI</strong> and <strong className="text-white font-semibold">Snxperbot Adaptive Engine</strong> seamlessly across both MT4 and MT5 brokers with unified hardware-locked security.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-neutral-300 border border-[#d4af37]/35 bg-[#121319] p-3.5 rounded-2xl shadow-md">
            <span>TERMINALS: </span>
            <span className="text-[#ffd700] font-bold">MT4 &amp; MT5</span>
            <span className="mx-2 text-neutral-600">|</span>
            <span>BUILDS: </span>
            <span className="text-emerald-400 font-bold">.EX4 / .EX5 INCLUDED</span>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all group bg-[#111218] shadow-md"
              >
                <div className="h-12 w-12 rounded-xl bg-[#171822] border border-[#d4af37]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-[#ffd700]" />
                </div>
                <h3 className="text-base font-bold uppercase text-white tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Side-by-side MT4 and MT5 Breakdown */}
        <div className="mt-12 rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 bg-[#111218] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* MetaTrader 4 Architecture */}
            <div className="p-6 rounded-2xl bg-[#14151e] border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#ffd700] font-bold">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
                  <span>MetaTrader 4 (MT4) Deployment</span>
                </div>
                <span className="rounded bg-[#1c1d28] px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-200 border border-neutral-700">
                  NATIVE MQL4
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-mono">
                Universally compatible with thousands of traditional brokers and prop accounts worldwide.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 font-mono pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Plug &amp; play `.ex4` EA file directly into `MQL4/Experts` folder</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Lightweight memory consumption (~25MB RAM per terminal)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>WebRequest remote license authentication</span>
                </li>
              </ul>
            </div>

            {/* MetaTrader 5 Architecture */}
            <div className="p-6 rounded-2xl bg-[#14151e] border border-[#d4af37]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#ffd700] font-bold">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd700]" />
                  <span>MetaTrader 5 (MT5) Deployment</span>
                </div>
                <span className="rounded bg-[#201d12] px-2 py-0.5 font-mono text-[10px] font-bold text-[#ffd700] border border-[#d4af37]/40">
                  NATIVE MQL5
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-mono">
                Advanced 64-bit multi-threaded speed with microsecond order execution and DOM tick feed.
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 font-mono pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Sub-millisecond execution for Gold &amp; index volatility scalping</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Simultaneous 28-pair multi-symbol scanning engine</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Compatible with both Netting and Hedging brokerage accounts</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
