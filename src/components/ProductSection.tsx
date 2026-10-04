import React, { useState } from 'react';
import { Product } from '../types';
import berserkerOfficialBox from '../assets/images/berserker_scalp_box_official_1791111894715.jpg';
import berserkerBox from '../assets/images/berserker_scalp_box_1791064523648.jpg';
import snxperbotBox from '../assets/images/snxperbot_adaptive_box_1791064534614.jpg';
import { CheckCircle2, ShieldAlert, MessageCircle, ArrowRight, Sparkles, Layers, Sliders, Cpu, Zap, Shield, Target, Crosshair, BarChart3, TrendingUp, Check } from 'lucide-react';

interface ProductSectionProps {
  products: Product[];
  onViewProductPage: (productId?: string) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ products, onViewProductPage }) => {
  const [selectedId, setSelectedId] = useState<string>(products[0]?.id || 'prod-berserker-scalp-ai');

  const activeProduct = products.find(p => p.id === selectedId) || products[0];

  const whatsappBaseUrl = 'https://wa.me/255610366248';

  return (
    <section id="product" className="relative py-24 bg-[#faf8f5]/90 border-t border-[#d4af37]/25 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066ff]">
                FLAGSHIP TRADING SYSTEMS
              </span>
              <span className="text-neutral-400">/</span>
              <span className="font-mono text-xs text-neutral-500 font-semibold">MT4 &amp; MT5 EXPERT ADVISORS</span>
            </div>
            <h2 className="font-extrabold uppercase tracking-tight text-3xl sm:text-5xl text-[#1a1a1a]">
              XTECH ALGORITHMIC SUITE
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl">
              Two specialized institutional AI engines engineered for MetaTrader 4 and MetaTrader 5: High-Velocity Scalping &amp; Adaptive Multi-Pair Swing Execution.
            </p>
          </div>

          {/* Product Switcher Pills */}
          <div className="mt-6 md:mt-0 flex items-center p-1.5 rounded-2xl bg-white border border-[#d4af37]/40 shadow-xs font-mono text-xs">
            {products.map(p => {
              const isSelected = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#18191e] text-[#ffd700] shadow-sm'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {p.name.includes('SCALP') ? 'Berserker Scalp AI' : 'Snxperbot Adaptive'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((item, idx) => {
            const isBerserker = item.id.includes('berserker') || item.name.includes('BERSERKER');
            const boxImage = item.image_url || (isBerserker ? berserkerOfficialBox : snxperbotBox);
            const whatsappInquiryUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(
              `Hello XTech Algo Trading, I want to inquire about purchasing ${item.name} (${item.brand || 'MT4 & MT5'}). Please provide current license access and pricing.`
            )}`;

            return (
              <div
                key={item.id}
                className={`terminal-card rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                  item.id === selectedId
                    ? 'border-[#0066ff] bg-white shadow-[0_16px_45px_rgba(0,102,255,0.15)] ring-2 ring-[#0066ff]/30'
                    : 'border-neutral-200 bg-white/90 hover:border-[#0066ff]/50 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Brand Banner */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-[#0066ff]" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066ff]">
                        {item.brand || 'XTech Algo Trading'}
                      </span>
                    </div>
                    <span className="rounded-md border border-[#0066ff]/40 bg-[#eff6ff] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0066ff]">
                      MT4 &amp; MT5 · {item.version}
                    </span>
                  </div>

                  {/* Big Transparent 3D Retail Box without restrictive dark border */}
                  <div className="relative group w-full min-h-[360px] sm:min-h-[420px] mb-6 flex flex-col items-center justify-center p-2">
                    {/* Ambient subtle glow */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-60 w-60 rounded-full bg-gradient-to-tr from-[#0066ff]/15 via-[#ffd700]/15 to-transparent blur-2xl" />
                    </div>

                    <img
                      src={boxImage}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="max-h-[380px] sm:max-h-[420px] w-auto max-w-full object-contain filter drop-shadow-[0_22px_40px_rgba(0,0,0,0.32)] transition-transform duration-500 group-hover:scale-105 select-none"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-2 left-2 flex items-center space-x-1.5 rounded-full bg-black/85 backdrop-blur-md px-3 py-1 border border-[#0066ff]/50 shadow-md">
                      <Sparkles className="h-3 w-3 text-[#ffd700]" />
                      <span className="font-mono text-[10px] text-white font-bold">
                        {isBerserker ? 'High-Velocity Scalper' : 'Multi-Pair Swing Engine'}
                      </span>
                    </div>

                    {item.badge && (
                      <div className="mt-4 text-center text-[10px] font-mono font-bold tracking-wider text-[#ffd700] bg-black/90 py-1.5 px-3 rounded-full border border-[#d4af37]/40 shadow-sm">
                        {item.badge}
                      </div>
                    )}
                  </div>

                  {/* Product Title & Tagline */}
                  <div className="space-y-2 mb-5">
                    <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#1a1a1a] tracking-tight">
                      {item.name}
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#aa851d] tracking-wide">
                      {item.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Pillars / Feature Highlights */}
                  {item.pillars && item.pillars.length > 0 && (
                    <div className="rounded-2xl bg-[#faf8f5] border border-neutral-200/80 p-4 mb-6 space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-neutral-500 tracking-wider block">
                        System Architecture Highlights:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        {item.pillars.map((pil, pIdx) => (
                          <div key={pIdx} className="flex items-center space-x-2 text-neutral-800">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span className="font-semibold">{pil}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Terminal Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-6">
                    <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Recommended Pairs:</span>
                      <span className="font-bold text-black text-[11px] truncate block">
                        {item.recommended_pairs.slice(0, 3).join(' · ')}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Execution Timeframe:</span>
                      <span className="font-bold text-black text-[11px] block">{item.timeframe}</span>
                    </div>
                    <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Min Account Size:</span>
                      <span className="font-bold text-emerald-700 text-[11px] block">${item.min_deposit} USD</span>
                    </div>
                    <div className="p-3 rounded-xl border border-neutral-200 bg-white">
                      <span className="text-[10px] text-neutral-500 uppercase block font-semibold">Risk Engine:</span>
                      <span className="font-bold text-[#855f0b] text-[11px] block">Automated SL/TP</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onViewProductPage(item.id)}
                    className="gold-btn flex-1 py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>View System Specs</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 rounded-xl border border-neutral-300 bg-white py-3 px-4 text-xs font-bold text-neutral-800 hover:border-black hover:bg-neutral-50 transition-all shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>Inquire / Purchase</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Global Assurance Banner */}
        <div className="mt-12 rounded-2xl bg-white border border-[#d4af37]/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#faf4e6] border border-[#d4af37] text-[#aa851d] shrink-0">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold uppercase text-sm text-[#1a1a1a]">
                Institutional Remote License Authentication
              </h4>
              <p className="text-xs text-neutral-600 font-mono">
                Both Expert Advisors connect via native MQL4 and MQL5 WebRequest to verify hardware-locked MT4 and MT5 terminal licenses. Zero cracks, 100% genuine code.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
            <span className="text-neutral-500">Official Desk:</span>
            <strong className="text-black">+255 610 366 248</strong>
          </div>
        </div>

      </div>
    </section>
  );
};
