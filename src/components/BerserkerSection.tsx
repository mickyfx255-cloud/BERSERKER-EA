import React from 'react';
import berserkerLaptopSetup from '../assets/images/berserker_laptop_setup_1791797725326.jpg';
import tradingWallpaper from '../assets/images/dark_gold_trading_wallpaper_1791724705881.jpg';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface BerserkerSectionProps {
  onViewProductPage: (id: string) => void;
}

export const BerserkerSection: React.FC<BerserkerSectionProps> = ({ onViewProductPage }) => {
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello XTech Algo Lab, I want to inquire about purchasing BERSERKER SCALP AI (XAUUSD Precision Scalper) for MT4/MT5.'
  )}`;

  return (
    <section id="berserker-section" className="relative py-20 bg-[#090a0d]/95 border-t border-[#d4af37]/20 overflow-hidden">
      {/* Background Accent Subtle Glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#38bdf8]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-1.5 rounded-full bg-[#38bdf8]/15 px-3 py-1 border border-[#38bdf8]/30">
            <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider">
              SECTION 1: BERSERKER (THE SCALPER)
            </span>
          </div>
          <span className="text-neutral-600">/</span>
          <span className="font-mono text-xs text-neutral-400">HIGH-FREQUENCY GOLD ENGINE</span>
        </div>

        {/* Headline */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            BERSERKER: <span className="text-white">Precision Scalping.</span>
          </h2>
        </div>

        {/* Clean Balanced Grid: Official Product Photo on Left + Full Explanation Card with Photo Background on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Official Bot Product Photo */}
          <div className="lg:col-span-5 rounded-3xl bg-[#111218] border border-[#d4af37]/25 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between w-full pb-3 border-b border-neutral-800 mb-4">
              <span className="font-mono text-xs font-bold text-neutral-200 uppercase tracking-wider">
                BERSERKER SCALP AI
              </span>
              <span className="text-[11px] font-mono text-[#ffd700] font-bold px-2 py-0.5 rounded bg-[#ffd700]/10 border border-[#ffd700]/30">
                OFFICIAL PACKAGING
              </span>
            </div>
            
            <div className="w-full flex-1 flex items-center justify-center p-2 min-h-[320px] rounded-2xl overflow-hidden bg-black/40 border border-neutral-800/80">
              <img
                src={berserkerLaptopSetup}
                alt="BERSERKER SCALP AI Official Product Box & MT5 Terminal Setup"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[380px] object-cover rounded-xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Platform: MT4 &amp; MT5</span>
              <span className="text-emerald-400 font-bold">● Hardware-Locked</span>
            </div>
          </div>

          {/* Right Column: Product Explanation Card with Photo Background */}
          <div className="lg:col-span-7 relative rounded-3xl bg-[#111218] border border-[#d4af37]/45 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Dark Gold Trading Photo as Background - Clearly Visualized */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen scale-105 pointer-events-none"
              style={{ backgroundImage: `url(${tradingWallpaper})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111218]/90 via-[#111218]/80 to-[#111218]/95 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="font-mono text-xs font-bold text-[#ffd700] uppercase tracking-wider">
                  SYSTEM PROFILE: BSK-01
                </span>
                <span className="rounded-md border border-[#38bdf8]/40 bg-[#161c28] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#38bdf8]">
                  MT4 &amp; MT5 COMPATIBLE
                </span>
              </div>

              {/* Exact Copy Text */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-sans">
                  Meet <strong className="text-white font-bold">BERSERKER</strong>. Designed for high-frequency precision scalping on <span className="text-[#ffd700] font-semibold">XAUUSD</span>. It executes rapid, fixed-lot trades with tight take-profits, grinding out consistent gains in trending and volatile markets.
                </p>

                <div className="p-4 rounded-2xl bg-[#161822]/90 border border-[#d4af37]/25 space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#d4af37] font-bold block">
                    Built for:
                  </span>
                  <p className="text-sm text-neutral-100 font-medium">
                    Traders who value speed, consistency, and a smooth, steady equity curve.
                  </p>
                </div>
              </div>

              {/* Key Architecture Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#14151e]/90 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Primary Asset:</span>
                  <span className="text-white font-bold text-sm">XAUUSD (Gold)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#14151e]/90 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Position Sizing:</span>
                  <span className="text-emerald-400 font-bold text-sm">Fixed 0.08 Lots</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#14151e]/90 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Execution Speed:</span>
                  <span className="text-[#ffd700] font-bold text-sm">Sub-Second M1 Entries</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#14151e]/90 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Target Consistency:</span>
                  <span className="text-emerald-400 font-bold text-sm">Consistent $12/Win</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onViewProductPage('prod-berserker-scalp-ai')}
                  className="gold-btn flex-1 py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:brightness-105"
                >
                  <span>Full Berserker Specs</span>
                  <ArrowRight className="h-4 w-4 text-black" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 rounded-xl border border-[#d4af37]/35 bg-[#14151c] py-3.5 px-4 text-xs font-bold text-white hover:border-[#ffd700] hover:bg-[#1a1b24] transition-all shadow-xs"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Inquire License</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
