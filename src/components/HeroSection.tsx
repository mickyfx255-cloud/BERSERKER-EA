import React from 'react';
import globeCard from '../assets/images/xtech_globe_card_1791110494111.jpg';
import { ShieldCheck, MessageCircle, Bot, ArrowRight, Activity, Cpu, Sparkles, CheckCircle2, Globe, TrendingUp, Zap } from 'lucide-react';

interface HeroSectionProps {
  onViewProduct: () => void;
  onAskAI: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewProduct, onAskAI }) => {
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello XTech Algo Trading, I want to inquire about purchasing your Expert Advisor trading systems for MetaTrader 4 & MetaTrader 5.'
  )}`;

  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-transparent border-b border-[#d4af37]/30">
      {/* Dynamic atmospheric accents that blend with the global LiveWallpaper */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Scanline Sweep Animation */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-scanline h-40 w-full bg-gradient-to-b from-transparent via-[#0066ff]/15 to-transparent" />
        </div>

        {/* Ambient Ivory / White Fade Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/95 via-[#faf8f5]/85 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5]/65 via-transparent to-transparent" />

        {/* Floating Gold & Electric Blue Sparks */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-1/4 left-1/4 h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_12px_#d4af37] animate-[floatGoldSpark_6s_infinite]" />
          <div className="absolute bottom-1/3 left-1/3 h-2 w-2 rounded-full bg-[#0066ff] shadow-[0_0_12px_#0066ff] animate-[floatGoldSpark_8s_1s_infinite]" />
          <div className="absolute bottom-1/2 right-1/4 h-2.5 w-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_14px_#f59e0b] animate-[floatGoldSpark_7s_2s_infinite]" />
          <div className="absolute top-1/3 right-1/3 h-1.5 w-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_10px_#00d2ff] animate-[floatGoldSpark_5s_infinite]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Copy (100% matched to uploaded brand picture) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Tag - EXACTLY as in picture: "EXPERT ADVISOR TRADING" */}
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.28em] text-[#0066ff]">
                EXPERT ADVISOR TRADING
              </span>
              <span className="hidden sm:inline-block h-1 w-8 bg-gradient-to-r from-[#0066ff] to-[#ffd700] rounded-full" />
              <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-500 font-bold">
                MT4 &amp; MT5 ARCHITECTURE
              </span>
            </div>

            {/* Giant Logo & Company Name - Big, visually stunning */}
            <div className="space-y-1">
              <div className="flex items-baseline flex-wrap gap-x-3">
                {/* 3D Stylized X Icon */}
                <div className="relative inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl bg-gradient-to-br from-[#10121a] via-[#1a1e2e] to-[#002e7a] border-2 border-[#ffd700]/70 shadow-[0_0_30px_rgba(0,102,255,0.35)] shrink-0 self-center">
                  <span className="font-black text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#ffb703] to-[#0066ff] drop-shadow-md select-none">
                    X
                  </span>
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#0066ff] shadow-[0_0_10px_#0066ff] animate-ping" />
                </div>

                {/* TECH in giant electric blue */}
                <span className="font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl text-[#0066ff] leading-none drop-shadow-sm">
                  TECH
                </span>
              </div>

              {/* ALGO TRADING in bold black/navy */}
              <div className="font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-[#12141a] leading-none pt-1">
                ALGO TRADING
              </div>
            </div>

            {/* Official Slogan - EXACTLY as in picture: "AUTOMATE. ADAPT. OUTPERFORM." */}
            <div className="pt-2">
              <span className="font-mono text-base sm:text-xl md:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#b45309] block uppercase">
                AUTOMATE. ADAPT. OUTPERFORM.
              </span>
              
              {/* Official description text - EXACTLY as in picture */}
              <p className="mt-2 text-sm sm:text-base text-neutral-700 font-medium leading-relaxed max-w-xl">
                Advanced Expert Advisor trading systems designed for precision, consistency and real market performance across <strong className="text-black font-bold">MetaTrader 4 &amp; MetaTrader 5</strong>.
              </p>
            </div>

            {/* Terminal Tech Spec Pills */}
            <div className="flex flex-wrap gap-2.5 font-mono text-xs text-neutral-700 pt-1">
              <div className="flex items-center space-x-2 bg-white/95 px-3 py-1.5 rounded-lg border border-[#0066ff]/40 shadow-xs">
                <Cpu className="h-3.5 w-3.5 text-[#0066ff]" />
                <span className="font-semibold text-neutral-800">Dual MT4 &amp; MT5 Engines</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/95 px-3 py-1.5 rounded-lg border border-[#d4af37]/40 shadow-xs">
                <Activity className="h-3.5 w-3.5 text-[#d97706]" />
                <span className="font-semibold text-neutral-800">Gold (XAUUSD) &amp; 28 Forex Pairs</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/95 px-3 py-1.5 rounded-lg border border-emerald-300 shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Zero Martingale · Hard SL</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary: View Systems */}
              <button
                onClick={onViewProduct}
                className="gold-btn group inline-flex items-center justify-center space-x-2 rounded-xl px-7 py-4 text-xs font-extrabold uppercase tracking-wider cursor-pointer shadow-lg"
              >
                <span>Explore Expert Advisors</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Direct WhatsApp Buying & Inquiry */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 rounded-xl border border-neutral-300 bg-white/95 px-6 py-4 text-xs font-bold text-neutral-800 hover:border-black hover:bg-white transition-all shadow-xs"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>Inquire via WhatsApp</span>
              </a>

              {/* Ask AI Advisor */}
              <button
                onClick={onAskAI}
                className="gold-outline-btn inline-flex items-center justify-center space-x-2 rounded-xl px-5 py-4 text-xs cursor-pointer shadow-xs"
              >
                <Bot className="h-4 w-4 text-[#0066ff]" />
                <span>Ask AI Advisor</span>
              </button>
            </div>

            {/* Reassurance strip */}
            <div className="flex items-center space-x-3 text-xs text-neutral-600 font-mono pt-1">
              <span className="h-2 w-2 rounded-full bg-[#0066ff]" />
              <span>Official Institutional Release</span>
              <span>·</span>
              <span>Prop Firm Ready</span>
              <span>·</span>
              <span>Desk: +255 610 366 248</span>
            </div>

          </div>

          {/* Right Column: 3D Holographic Globe & Algorithmic Trading Artwork (Matching Picture) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#0066ff]/40 shadow-[0_20px_60px_rgba(0,102,255,0.22)] bg-[#0d1017]">
              {/* 3D Holographic Globe image render matching the picture */}
              <img
                src={globeCard}
                alt="XTech Global Algorithmic Trading"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Top ambient gold & blue badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 rounded-full bg-black/85 backdrop-blur-md px-3 py-1 border border-[#ffd700]/60 shadow-md">
                  <Sparkles className="h-3 w-3 text-[#ffd700]" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#ffd700]">
                    GLOBAL ALGO NETWORK
                  </span>
                </div>
                <div className="rounded-full bg-black/85 backdrop-blur-md px-2.5 py-1 border border-[#0066ff]/60">
                  <span className="font-mono text-[10px] font-bold text-[#60a5fa]">
                    MT4 &amp; MT5 READY
                  </span>
                </div>
              </div>

              {/* Bottom glass banner matching picture style */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/90 backdrop-blur-md p-3.5 border border-[#0066ff]/50 text-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs uppercase tracking-tight text-white flex items-center space-x-1.5">
                    <span className="text-[#ffd700]">X</span>
                    <span className="text-[#0066ff]">TECH</span>
                    <span className="text-neutral-300">ALGO TRADING</span>
                  </span>
                  <div className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400 font-bold">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>SYSTEM ONLINE</span>
                  </div>
                </div>
                <p className="text-[11px] font-mono text-neutral-300 leading-tight">
                  Automate. Adapt. Outperform · Sub-Millisecond Execution · Hard Risk Limits
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
