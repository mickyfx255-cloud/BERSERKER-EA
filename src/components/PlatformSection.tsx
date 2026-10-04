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
    <section id="platform" className="relative py-24 bg-[#faf8f5]/90 border-t border-[#d4af37]/25 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066ff]">
              DUAL TERMINAL INFRASTRUCTURE
            </span>
            <h2 className="mt-2 font-extrabold uppercase tracking-tight text-3xl sm:text-5xl text-[#1a1a1a]">
              ENGINEERED FOR METATRADER 4 &amp; METATRADER 5
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Deploy <strong className="text-black font-semibold">Berserker Scalp AI</strong> and <strong className="text-black font-semibold">Snxperbot Adaptive Engine</strong> seamlessly across both MT4 and MT5 brokers with unified hardware-locked security.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-neutral-700 border border-[#0066ff]/40 bg-white p-3.5 rounded-2xl shadow-xs">
            <span>TERMINALS: </span>
            <span className="text-[#0066ff] font-bold">MT4 &amp; MT5</span>
            <span className="mx-2 text-neutral-300">|</span>
            <span>BUILDS: </span>
            <span className="text-emerald-700 font-bold">.EX4 / .EX5 INCLUDED</span>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="terminal-card rounded-2xl p-6 border border-[#d4af37]/35 hover:border-[#0066ff] transition-all group bg-white shadow-xs"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#eff6ff] to-[#faf4e6] border border-[#d4af37]/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-[#0066ff]" />
                </div>
                <h3 className="text-base font-bold uppercase text-[#1a1a1a] tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Side-by-side MT4 and MT5 Breakdown */}
        <div className="mt-12 rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* MetaTrader 4 Architecture */}
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-blue-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#0066ff] font-bold">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0066ff]" />
                  <span>MetaTrader 4 (MT4) Deployment</span>
                </div>
                <span className="rounded bg-blue-100 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-800">
                  NATIVE MQL4
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-mono">
                Universally compatible with thousands of traditional brokers and prop accounts worldwide.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 font-mono pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Plug &amp; play `.ex4` EA file directly into `MQL4/Experts` folder</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Lightweight memory consumption (~25MB RAM per terminal)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>WebRequest remote license authentication</span>
                </li>
              </ul>
            </div>

            {/* MetaTrader 5 Architecture */}
            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-[#d4af37]/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#aa851d] font-bold">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
                  <span>MetaTrader 5 (MT5) Deployment</span>
                </div>
                <span className="rounded bg-[#faf4e6] px-2 py-0.5 font-mono text-[10px] font-bold text-[#855f0b]">
                  NATIVE MQL5
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-mono">
                Advanced 64-bit multi-threaded speed with microsecond order execution and DOM tick feed.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700 font-mono pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Sub-millisecond execution for Gold &amp; index volatility scalping</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Simultaneous 28-pair multi-symbol scanning engine</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
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
