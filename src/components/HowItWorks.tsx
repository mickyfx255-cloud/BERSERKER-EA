import React from 'react';
import { Download, Sliders, Play, LineChart, Shield, Terminal, Layers } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Install on MT4 or MT5',
      desc: 'Download your licensed system (.ex4 for MT4 or .ex5 for MT5). Place it in your terminal Experts folder and restart MetaTrader.',
      icon: Download,
      codeNote: 'Options → Expert Advisors → Allow WebRequest',
    },
    {
      num: '02',
      title: 'Attach to Target Charts',
      desc: 'Open your preferred symbol chart (Gold XAUUSD, NAS100, or 28 pairs). Drag Berserker Scalp AI or Snxperbot onto the chart from Navigator.',
      icon: LineChart,
      codeNote: 'Enable "Allow Live / Algo Trading"',
    },
    {
      num: '03',
      title: 'Enter Hardware License',
      desc: 'Paste your XTech remote license key. Set your lot size (e.g. 0.01 per $500 balance) or enable prop firm dynamic risk percentage.',
      icon: Sliders,
      codeNote: 'InpLicenseKey & Risk parameters',
    },
    {
      num: '04',
      title: 'Automated 24/5 Execution',
      desc: 'Enable Algo Trading. The engine executes high-probability entries with hard-coded stop loss, zero martingale, and automatic trailing TP.',
      icon: Play,
      codeNote: '24/5 VPS deployment recommended',
    },
  ];

  return (
    <section id="how" className="relative py-24 bg-[#faf8f5]/90 border-t border-[#d4af37]/25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066ff]">
            DEPLOYMENT WORKFLOW
          </span>
          <h2 className="mt-2 font-extrabold uppercase tracking-tight text-3xl sm:text-4xl text-[#1a1a1a]">
            HOW XTECH ALGORITHMIC ENGINES OPERATE
          </h2>
          <p className="mt-3 text-sm text-neutral-600 font-sans">
            Streamlined 4-step setup designed for seamless deployment on any MetaTrader 4 or MetaTrader 5 broker.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative terminal-card rounded-2xl p-6 flex flex-col justify-between group hover:border-[#0066ff] transition-all bg-white shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#0066ff]">
                      {step.num}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5 text-[#0066ff]" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold uppercase text-[#1a1a1a] tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <span className="font-mono text-[10px] text-neutral-500 bg-neutral-100 px-2 py-1 rounded block truncate">
                    {step.codeNote}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
