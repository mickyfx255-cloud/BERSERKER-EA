import React from 'react';
import { Cpu, Zap, Shield, Globe, Server, Check, Coins } from 'lucide-react';

export const PlatformSection: React.FC = () => {
  const specs = [
    {
      title: '64-Bit Multi-Threaded Engine',
      desc: 'MQL5 processes tick calculations at near hardware speed, eliminating order latency found in legacy MT4 setups.',
      icon: Cpu,
    },
    {
      title: 'Hedge & Netting Account Compatibility',
      desc: 'Deploy without restriction on both global netting exchange accounts and standard multi-position hedging brokerages.',
      icon: Shield,
    },
    {
      title: 'Sub-Millisecond Execution Protocol',
      desc: 'Asynchronous order sending allows rapid entry and immediate bracket placement before market liquidity shifts.',
      icon: Zap,
    },
    {
      title: 'VPS Optimized (Low Resource Footprint)',
      desc: 'Minimal RAM and CPU consumption ensures stable 24/5 uptime on standard virtual private servers located close to broker liquidity pools.',
      icon: Server,
    },
  ];

  return (
    <section id="platform" className="relative py-24 bg-[#faf8f5]/85 border-t border-[#d4af37]/25 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#aa851d]">
              INFRASTRUCTURE
            </span>
            <h2 className="mt-2 font-extrabold uppercase tracking-tight text-3xl sm:text-5xl text-[#1a1a1a]">
              MADE EXCLUSIVELY FOR METATRADER 5
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600">
              Why EA ALGO COMMUNITY discontinued legacy platforms to architect Smart Scalper EA natively on MT5.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-neutral-700 border border-[#d4af37]/40 bg-white p-3.5 rounded-xl shadow-sm">
            <span>TERMINAL: </span>
            <span className="text-[#855f0b] font-bold">MT5 BUILD 4000+</span>
            <span className="mx-2 text-neutral-300">|</span>
            <span>LANGUAGE: </span>
            <span className="text-[#059669] font-bold">MQL5</span>
          </div>
        </div>

        {/* Comparison & Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="terminal-card rounded-2xl p-6 border border-[#d4af37]/30 hover:border-[#aa851d] transition-all group bg-white shadow-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-[#faf4e6] border border-[#d4af37]/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-[#aa851d]" />
                </div>
                <h3 className="text-base font-bold uppercase text-[#1a1a1a] tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Side-by-side MT4 vs MT5 Architecture breakdown */}
        <div className="mt-12 rounded-2xl p-6 sm:p-8 border border-[#d4af37]/35 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-5 rounded-xl bg-[#faf8f5] border border-neutral-200">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase text-neutral-500 font-bold mb-3">
                <span className="h-2 w-2 rounded-full bg-neutral-400" />
                <span>Legacy MetaTrader 4 Constraints</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-600 font-mono">
                <li className="flex items-center space-x-2">
                  <span className="text-neutral-400">✕</span>
                  <span>32-bit single-threaded execution bottlenecks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-neutral-400">✕</span>
                  <span>Synchronous order queuing causes slippage in high volatility</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-neutral-400">✕</span>
                  <span>No native Depth of Market (DOM) tick access</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#faf4e6]/60 border border-[#d4af37]/50">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#855f0b] font-bold mb-3">
                <span className="h-2 w-2 rounded-full bg-[#aa851d]" />
                <span>Smart Scalper EA on MetaTrader 5</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-800 font-mono font-medium">
                <li className="flex items-center space-x-2">
                  <Check className="h-3.5 w-3.5 text-[#059669]" />
                  <span>High-frequency async execution under 10 milliseconds</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3.5 w-3.5 text-[#059669]" />
                  <span>Precise real tick data backtesting with spread modeling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-3.5 w-3.5 text-[#059669]" />
                  <span>Remote WebRequest API license synchronization and key safety</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
