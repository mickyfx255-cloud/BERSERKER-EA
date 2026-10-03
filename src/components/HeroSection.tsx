import React from 'react';
import heroBg from '../assets/images/pool_hero_gold_bull_1791007823647.jpg';
import { ShieldCheck, MessageCircle, Bot, ArrowRight, Activity, Cpu, Coins, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onViewProduct: () => void;
  onAskAI: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewProduct, onAskAI }) => {
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello EA ALGO COMMUNITY, I want to inquire about purchasing the BERSERKER EA (Smart Scalper EA) for MetaTrader 5.'
  )}`;

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-transparent border-b border-[#d4af37]/30">
      {/* Dynamic atmospheric accents that blend with the global LiveWallpaper */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Scanline Sweep Animation */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-scanline h-32 w-full bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent" />
        </div>

        {/* Ambient Ivory / White Fade Gradients on left providing clean headline reading room */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/95 via-[#faf8f5]/75 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5]/50 via-transparent to-transparent" />

        {/* Floating Gold Sparks / Bullion Embers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-1/4 left-1/4 h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_12px_#d4af37] animate-[floatGoldSpark_6s_infinite]" />
          <div className="absolute bottom-1/3 left-1/3 h-1.5 w-1.5 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981] animate-[floatGoldSpark_8s_1s_infinite]" />
          <div className="absolute bottom-1/2 right-1/4 h-2.5 w-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_14px_#f59e0b] animate-[floatGoldSpark_7s_2s_infinite]" />
          <div className="absolute bottom-1/5 right-1/3 h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37] animate-[floatGoldSpark_5s_3s_infinite]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          
          {/* Eyebrow badge with one crimson accent */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/60 bg-white px-3.5 py-1 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#ff1e38]" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#855f0b]">
              EA ALGO COMMUNITY · OFFICIAL MT5 EXPERT ADVISOR
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-[#059669] text-xs font-mono font-bold">v2.4.1</span>
          </div>

          {/* Master Headline */}
          <h1 className="font-extrabold uppercase tracking-tight text-4xl sm:text-6xl lg:text-7xl text-[#1a1a1a] leading-[1.05]">
            BERSERKER EA
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8a6510] via-[#c99818] to-[#684c0c] filter drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)]">
              SMART SCALPER
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg text-neutral-700 font-normal leading-relaxed max-w-xl">
            Precision algorithmic execution engineered strictly for <strong className="text-black font-semibold">MetaTrader 5</strong>. Built with proprietary micro-trend volatility filters, automated stop-loss protection, and sub-millisecond tick execution. No martingale. Zero emotion.
          </p>

          {/* Key Terminal Spec Pills */}
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-neutral-700">
            <div className="flex items-center space-x-2 bg-white/95 px-3 py-1.5 rounded-lg border border-[#d4af37]/40 shadow-sm">
              <Cpu className="h-3.5 w-3.5 text-[#aa851d]" />
              <span className="font-semibold text-neutral-800">Engine: Native MQL5</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/95 px-3 py-1.5 rounded-lg border border-[#d4af37]/40 shadow-sm">
              <Activity className="h-3.5 w-3.5 text-[#f59e0b]" />
              <span className="font-semibold text-neutral-800">Pairs: XAUUSD · EURUSD · NAS100</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/95 px-3 py-1.5 rounded-lg border border-emerald-300 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Strict Stop Loss Hardcoded</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Primary: View Product / Order */}
            <button
              onClick={onViewProduct}
              className="gold-btn group inline-flex items-center justify-center space-x-2 rounded-xl px-8 py-4 text-sm font-extrabold uppercase tracking-wider cursor-pointer shadow-md"
            >
              <span>Explore Smart Scalper EA</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Direct WhatsApp Buying & Verification */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 rounded-xl border border-neutral-300 bg-white/90 px-6 py-4 text-sm font-semibold text-neutral-800 hover:border-black hover:bg-white transition-all shadow-sm"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              <span>Buy via WhatsApp</span>
            </a>

            {/* Ask AI Advisor */}
            <button
              onClick={onAskAI}
              className="gold-outline-btn inline-flex items-center justify-center space-x-2 rounded-xl px-5 py-4 text-sm cursor-pointer shadow-sm"
            >
              <Bot className="h-4 w-4 text-[#aa851d]" />
              <span>Ask AI Advisor</span>
            </button>
          </div>

          {/* Quick reassurance */}
          <div className="mt-6 flex items-center space-x-3 text-xs text-neutral-600 font-mono">
            <span className="text-[#aa851d]">●</span>
            <span>Single-Product Verified Release</span>
            <span>·</span>
            <span>Support: +255 610 366 248</span>
          </div>

        </div>
      </div>
    </section>
  );
};
