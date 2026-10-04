import React from 'react';
import { Activity, ShieldCheck, Coins, Sparkles } from 'lucide-react';

const TICKER_ITEMS = [
  { symbol: 'XAUUSD', quote: '2,738.40', change: '+0.84%', isPair: true },
  { text: 'HIGH-FREQUENCY MQL5 EXECUTION', isTag: true },
  { symbol: 'EURUSD', quote: '1.08625', change: '+0.12%', isPair: true },
  { text: 'ZERO-EMOTION STRICT STOP LOSS', isTag: true },
  { symbol: 'NAS100', quote: '20,240.5', change: '+1.15%', isPair: true },
  { text: 'DYNAMIC MICRO-TREND DETECTION', isTag: true },
  { symbol: 'US30', quote: '42,890.0', change: '+0.45%', isPair: true },
  { text: 'NO GRID · NO DANGEROUS MARTINGALE', isTag: true },
  { symbol: 'GBPJPY', quote: '197.820', change: '-0.24%', isPair: true },
  { text: 'XTECH ALGO TRADING · AUTOMATE. ADAPT. OUTPERFORM.', isTag: true },
  { symbol: 'BTCUSD', quote: '68,450.0', change: '+2.41%', isPair: true },
  { text: 'ENGINEERED FOR METATRADER 4 & METATRADER 5', isTag: true },
];

export const TickerBand: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-[#d4af37]/30 bg-[#16171b] py-2.5 text-white shadow-sm">
      {/* Side gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#16171b] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#16171b] to-transparent" />

      <div className="animate-marquee flex items-center space-x-8 text-xs font-mono select-none">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3 shrink-0">
            {item.isPair ? (
              <div className="flex items-center space-x-2 bg-black/60 px-2.5 py-1 rounded-md border border-[#d4af37]/30">
                <span className="font-bold text-[#ffd700]">{item.symbol}</span>
                <span className="text-neutral-300">{item.quote}</span>
                <span className={item.change?.startsWith('+') ? 'text-[#10b981] font-bold' : 'text-[#f87171]'}>
                  {item.change}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 text-neutral-300 font-semibold tracking-wider uppercase text-[11px]">
                <Coins className="h-3 w-3 text-[#d4af37]" />
                <span className="text-neutral-200">{item.text}</span>
              </div>
            )}
            <span className="text-[#d4af37]/50">///</span>
          </div>
        ))}
      </div>
    </div>
  );
};
