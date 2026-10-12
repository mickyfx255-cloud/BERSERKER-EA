import React, { useState } from 'react';
import { Product } from '../types';
import berserkerOfficialBox from '../assets/images/berserker_laptop_setup_1791797725326.jpg';
import snxperbotBox from '../assets/images/snxperbot_laptop_setup_1791797959703.jpg';
import tradingWallpaper from '../assets/images/dark_gold_trading_wallpaper_1791724705881.jpg';
import { Shield, MessageCircle, ArrowRight, CheckCircle2, Coins, Sparkles } from 'lucide-react';

interface ProductSectionProps {
  products: Product[];
  onViewProductPage: (productId?: string) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ products, onViewProductPage }) => {
  const [selectedId, setSelectedId] = useState<string>(products[0]?.id || 'prod-berserker-scalp-ai');

  const whatsappBaseUrl = 'https://wa.me/255610366248';

  return (
    <section id="product" className="relative py-20 bg-[#090a0d]/95 border-t border-[#d4af37]/20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
                XTECH ALGO LAB
              </span>
              <span className="text-neutral-600">/</span>
              <span className="font-mono text-xs text-neutral-400 font-semibold">STOREFRONT &amp; LICENSING</span>
            </div>
            <h2 className="font-extrabold uppercase tracking-tight text-3xl sm:text-4xl text-white">
              TWO SYSTEMS. ONE ARSENAL.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl font-sans">
              Straightforward pricing, pristine execution, and genuine hardware-locked MT4 &amp; MT5 licenses.
            </p>
          </div>

          {/* Product Switcher */}
          <div className="mt-6 md:mt-0 flex items-center p-1 rounded-2xl bg-[#121319] border border-[#d4af37]/30 shadow-xs font-mono text-xs">
            {products.map(p => {
              const isSelected = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`px-4 py-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f5d061] text-black shadow-sm'
                      : 'text-neutral-300 hover:text-white'
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
          {products.map((item) => {
            const isBerserker = item.id.includes('berserker') || item.name.includes('BERSERKER');
            const boxImage = item.image_url || (isBerserker ? berserkerOfficialBox : snxperbotBox);
            const isSelected = item.id === selectedId;
            const priceDisplay = item.price ? `$${item.price}` : '$299';
            const currencyDisplay = item.currency || 'USD';

            const whatsappInquiryUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(
              `Hello XTech Algo Trading, I want to purchase ${item.name} (${priceDisplay} ${currencyDisplay} - MT4 & MT5). Please provide license activation details.`
            )}`;

            return (
              <div
                key={item.id}
                className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between bg-[#111218] ${
                  isSelected
                    ? 'border-[#d4af37] shadow-[0_16px_50px_rgba(0,0,0,0.85)] ring-1 ring-[#d4af37]/40'
                    : 'border-[#d4af37]/25 hover:border-[#d4af37]/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                }`}
              >
                <div>
                  {/* Top Bar: Brand & Version */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-[#ffd700]" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffd700]">
                        {item.brand || 'XTech Algo Trading'}
                      </span>
                    </div>
                    <span className="rounded-md border border-[#d4af37]/35 bg-[#171822] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#f5d061]">
                      MT4 &amp; MT5 · {item.version}
                    </span>
                  </div>

                  {/* 📷 Product Photo - Clean, Unobstructed & Centered */}
                  <div className="relative w-full mb-6 flex items-center justify-center min-h-[340px] sm:min-h-[400px] rounded-2xl bg-[#0c0d12] border border-neutral-800/80 p-4">
                    <img
                      src={boxImage}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="max-h-[360px] sm:max-h-[400px] w-auto max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>

                  {/* 💰 Product Price Display - Clear & Prominent */}
                  <div className="rounded-2xl border border-[#d4af37]/35 bg-[#161722] p-4 sm:p-5 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold block">
                        Official Lifetime License Price
                      </span>
                      <div className="flex items-baseline space-x-2 mt-0.5">
                        <span className="text-3xl sm:text-4xl font-black text-[#ffd700] font-mono tracking-tight">
                          {priceDisplay}
                        </span>
                        <span className="text-xs font-mono font-bold text-neutral-300 uppercase">
                          {currencyDisplay}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold ml-2">
                          · One-Time Payment
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right font-mono text-[11px] text-neutral-300 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-700/50">
                      <span className="text-emerald-400 font-bold block">✓ No Monthly Fees</span>
                      <span className="text-neutral-400">Instant WebRequest Activation</span>
                    </div>
                  </div>

                  {/* 📝 Product Explanation - With Photo Background */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/45 p-5 mb-6 shadow-2xl">
                    {/* Photo as Background - Clearly Visualized */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen scale-105 pointer-events-none transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${tradingWallpaper})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111218]/88 via-[#111218]/75 to-[#111218]/92 pointer-events-none" />

                    <div className="relative z-10 space-y-3">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight drop-shadow-sm">
                          {item.name}
                        </h3>
                        <p className="font-mono text-xs font-bold text-[#d4af37] tracking-wide mt-1">
                          {item.tagline}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans pt-1">
                        {item.description}
                      </p>

                      {/* Operational Summary */}
                      <div className="grid grid-cols-3 gap-2.5 pt-2 text-xs font-mono">
                        <div className="p-2.5 rounded-xl border border-neutral-800 bg-[#14151e]/90 backdrop-blur-xs">
                          <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Pairs:</span>
                          <span className="font-bold text-white text-[11px] truncate block">
                            {isBerserker ? 'XAUUSD (Gold)' : 'GBPNZD · 28 Pairs'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl border border-neutral-800 bg-[#14151e]/90 backdrop-blur-xs">
                          <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Timeframe:</span>
                          <span className="font-bold text-white text-[11px] block">{item.timeframe}</span>
                        </div>
                        <div className="p-2.5 rounded-xl border border-neutral-800 bg-[#14151e]/90 backdrop-blur-xs">
                          <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Min Capital:</span>
                          <span className="font-bold text-emerald-400 text-[11px] block">${item.min_deposit} USD</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Direct Action CTAs */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onViewProductPage(item.id)}
                    className="gold-btn flex-1 py-3.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:brightness-105"
                  >
                    <span>Order License ({priceDisplay})</span>
                    <ArrowRight className="h-4 w-4 text-black" />
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 rounded-xl border border-emerald-900/60 bg-emerald-950/30 py-3.5 px-4 text-xs font-bold text-emerald-400 hover:bg-emerald-900/50 hover:border-emerald-400 transition-all shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-400" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Global Assurance Banner */}
        <div className="mt-12 rounded-2xl bg-[#111218] border border-[#d4af37]/30 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#191b24] border border-[#d4af37]/50 text-[#ffd700] shrink-0">
              <Shield className="h-6 w-6 text-[#ffd700]" />
            </div>
            <div>
              <h4 className="font-bold uppercase text-sm text-white">
                Institutional Hardware-Locked License Security
              </h4>
              <p className="text-xs text-neutral-300 font-mono">
                Both Expert Advisors verify hardware-locked MT4 and MT5 terminal licenses via WebRequest authentication. Zero cracks, 100% genuine code.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0 font-mono text-xs">
            <span className="text-neutral-400">Trading Desk:</span>
            <strong className="text-[#ffd700]">+255 610 366 248</strong>
          </div>
        </div>

      </div>
    </section>
  );
};
