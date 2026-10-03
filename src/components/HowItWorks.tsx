import React from 'react';
import { Download, Sliders, Play, LineChart, Shield, Terminal, Coins } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Install on MetaTrader 5',
      desc: 'Download your licensed .mq5 source file or compiled .ex5. Place it in your MT5 /MQL5/Experts folder and restart your terminal.',
      icon: Download,
      codeNote: 'Tools → Options → Allow WebRequest',
    },
    {
      num: '02',
      title: 'Attach to Target Chart',
      desc: 'Open your preferred symbol chart (XAUUSD, EURUSD, or NAS100 on M1/M5). Drag Smart Scalper EA onto the chart from the Navigator window.',
      icon: LineChart,
      codeNote: 'Enable "Allow Algo Trading"',
    },
    {
      num: '03',
      title: 'Configure Risk Ceilings',
      desc: 'Enter your EA ALGO COMMUNITY license key. Set your fixed lot size (e.g. 0.01 per $500 balance) or toggle dynamic risk percentage mode.',
      icon: Sliders,
      codeNote: 'InpLicenseKey & Risk parameters',
    },
    {
      num: '04',
      title: 'Automated 24/5 Execution',
      desc: 'Engage MT5 Algo Trading. Smart Scalper EA runs continuously, executing high-probability micro-breakout entries with hard-coded stop loss.',
      icon: Play,
      codeNote: '24/5 VPS deployment recommended',
    },
  ];

  return (
    <section id="how" className="relative py-24 bg-[#faf8f5]/85 border-t border-[#d4af37]/25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#aa851d]">
            DEPLOYMENT WORKFLOW
          </span>
          <h2 className="mt-2 font-extrabold uppercase tracking-tight text-3xl sm:text-4xl text-[#1a1a1a]">
            HOW SMART SCALPER EA OPERATES
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Streamlined 4-step setup designed for seamless deployment on any regulated MetaTrader 5 broker.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative terminal-card rounded-2xl p-6 flex flex-col justify-between group hover:border-[#d4af37] transition-all bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-extrabold text-[#aa851d] group-hover:scale-105 transition-transform">
                      {step.num}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-[#faf4e6] flex items-center justify-center border border-[#d4af37]/40 group-hover:border-[#aa851d] transition-colors">
                      <Icon className="h-5 w-5 text-[#855f0b] group-hover:text-[#aa851d] transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold uppercase text-[#1a1a1a] tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <div className="flex items-center space-x-1.5 font-mono text-[11px] text-[#059669] font-semibold">
                    <Terminal className="h-3 w-3" />
                    <span>{step.codeNote}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support note */}
        <div className="mt-12 rounded-2xl border border-[#d4af37]/40 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-left">
            <div className="h-11 w-11 rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 flex items-center justify-center shrink-0">
              <Coins className="h-6 w-6 text-[#aa851d]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">Need 1-on-1 Remote Installation Support?</p>
              <p className="text-xs text-neutral-600">Our engineering desk provides AnyDesk / TeamViewer MT5 setup on WhatsApp: +255 610 366 248</p>
            </div>
          </div>
          <a
            href="https://wa.me/255610366248?text=Hello%20EA%20ALGO%20COMMUNITY,%20I%20need%20assistance%20installing%20Smart%20Scalper%20EA%20on%20MT5."
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn rounded-xl px-6 py-3 text-xs font-bold uppercase shrink-0 shadow-sm"
          >
            Contact Setup Desk
          </a>
        </div>

      </div>
    </section>
  );
};
