import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export const RiskDisclaimerSection: React.FC = () => {
  return (
    <section className="relative bg-[#06070a] border-t border-[#d4af37]/25 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0d0e14] border border-[#d4af37]/20 p-5 sm:p-6 shadow-xl">
          <div className="flex items-start space-x-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#191515] border border-amber-500/40 text-amber-400 shrink-0 mt-0.5">
              <ShieldAlert className="h-4 w-4 text-[#ffd700]" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
                  ⚠️ REGULATORY RISK DISCLAIMER
                </span>
                <span className="text-[10px] font-mono text-neutral-500">MANDATORY NOTICE</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed font-sans">
                <strong className="text-white font-semibold">RISK DISCLAIMER:</strong> Trading foreign exchange, CFDs, and cryptocurrencies carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. Past performance is not indicative of future results. You should be aware of all the risks associated with trading and seek advice from an independent financial advisor if you have any doubts. By using BERSERKER and SnxperBot, you acknowledge and accept these risks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
