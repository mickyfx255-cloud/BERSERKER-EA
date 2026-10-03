import React from 'react';
import { Product } from '../types';
import boxMockup from '../assets/images/berserker_gold_box_1791008300231.jpg';
import { CheckCircle2, ShieldAlert, MessageCircle, ArrowRight, Sparkles, Layers, Sliders, Cpu, Coins } from 'lucide-react';

interface ProductSectionProps {
  product: Product | null;
  onViewProductPage: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ product, onViewProductPage }) => {
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello EA ALGO COMMUNITY, I am interested in Smart Scalper EA (MT5). Please provide the current pricing and activation details.'
  )}`;

  const features = [
    'Sub-millisecond MQL5 execution algorithms',
    'Automated dynamic Stop-Loss and Take-Profit on every single order',
    'No grid logic · No destructive martingale doubling',
    'Multi-symbol compatibility (XAUUSD, EURUSD, GBPUSD, NAS100)',
    'Hedge and netting account compatibility on MT5',
    'Full VPS optimization for 24/5 uninterruptible trade cycles',
    'Direct MT5 WebRequest license security authentication',
    'Lifetime updates and setup assistance by EA ALGO COMMUNITY'
  ];

  return (
    <section id="product" className="relative py-24 bg-[#faf8f5]/85 border-t border-[#d4af37]/25 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#aa851d]">
                STOREFRONT CATALOG
              </span>
              <span className="text-neutral-400">/</span>
              <span className="font-mono text-xs text-neutral-500 font-semibold">SINGLE-PRODUCT EXCLUSIVE</span>
            </div>
            <h2 className="font-extrabold uppercase tracking-tight text-3xl sm:text-5xl text-[#1a1a1a]">
              SMART SCALPER EA
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              The proprietary flagship robot from EA ALGO COMMUNITY. Only one verified system.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <span className="rounded-md border border-[#d4af37]/60 bg-[#faf4e6] px-3 py-1 font-mono text-xs font-bold text-[#855f0b] shadow-sm">
              Expert Advisor · MT5
            </span>
            <span className="rounded-md border border-neutral-300 bg-white px-3 py-1 font-mono text-xs font-bold text-neutral-700 shadow-sm">
              01/01
            </span>
          </div>
        </div>

        {/* Product Showcase Card - Luxury Ivory White with Gold Trim */}
        <div className="terminal-card rounded-2xl p-6 sm:p-10 border border-[#d4af37]/40 shadow-[0_12px_45px_rgba(212,175,55,0.12)] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: 3D Product Box Image Render with Gold & Black Marble */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-[#d4af37]/50 bg-[#16171b] shadow-lg">
                <img
                  src={boxMockup}
                  alt="SMART SCALPER EA Gold Box Mockup"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay highlights */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 rounded bg-black/90 px-2.5 py-1 border border-[#d4af37]/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                  <span className="font-mono text-[11px] text-white font-semibold">MT5 Build 4000+</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-neutral-200 bg-black/90 p-2.5 rounded border border-[#d4af37]/45">
                  <span className="text-neutral-400">AUTHENTICATION</span>
                  <span className="text-[#ffd700] font-bold">WEBREQUEST SECURE</span>
                </div>
              </div>
              <p className="mt-3 text-xs font-mono text-neutral-500 text-center">
                Digital Delivery (.mq5 source + remote license key)
              </p>
            </div>

            {/* Right: Product Details, Checklist & Pricing */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#aa851d] uppercase tracking-wider mb-2 font-bold">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>MetaTrader 5 Algorithmic Suite</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#1a1a1a] tracking-tight">
                  {product?.name || 'Smart Scalper EA'}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {product?.description ||
                    'Automated algorithmic trading system built exclusively for MetaTrader 5. Features proprietary dynamic micro-trend detection, sub-millisecond execution logic, and automated strict risk ceiling controls.'}
                </p>

                {/* Technical Specifications Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf8f5] p-3 shadow-sm">
                    <span className="text-neutral-500 block text-[10px] uppercase font-bold">Min Deposit</span>
                    <span className="font-extrabold text-[#aa851d]">${product?.min_deposit || 100}</span>
                  </div>
                  <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf8f5] p-3 shadow-sm">
                    <span className="text-neutral-500 block text-[10px] uppercase font-bold">Timeframe</span>
                    <span className="font-bold text-[#1a1a1a]">{product?.timeframe || 'M1 / M5'}</span>
                  </div>
                  <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf8f5] p-3 shadow-sm">
                    <span className="text-neutral-500 block text-[10px] uppercase font-bold">Recommended</span>
                    <span className="font-bold text-[#1a1a1a]">XAUUSD / EURUSD</span>
                  </div>
                  <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf8f5] p-3 shadow-sm">
                    <span className="text-neutral-500 block text-[10px] uppercase font-bold">Platform</span>
                    <span className="font-bold text-[#aa851d]">MT5 Only</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="mt-6 space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                    System Architecture & Guarantees:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-700 font-medium">
                    {features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-[#aa851d] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Area & Buy Action */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Price display */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block">
                      Official License Price
                    </span>
                    {product?.price !== null && product?.price !== undefined ? (
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#aa851d] font-mono">
                          ${product.price}
                        </span>
                        <span className="text-xs font-mono text-neutral-500 uppercase font-semibold">
                          {product.currency || 'USD'} / Lifetime Key
                        </span>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] font-mono tracking-tight">
                          Price coming soon
                        </span>
                        <span className="rounded bg-[#faf4e6] border border-[#d4af37]/40 px-2 py-0.5 text-[10px] font-mono text-[#855f0b] font-semibold">
                          Set by owner in admin
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={onViewProductPage}
                      className="gold-btn inline-flex items-center space-x-2 rounded-xl px-6 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      <span>View Price & Buy</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 rounded-xl border border-emerald-500 bg-emerald-50 px-4 py-3.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600" />
                      <span className="hidden sm:inline">WhatsApp Inquiries</span>
                    </a>
                  </div>
                </div>

                {/* Risk Disclaimer */}
                <div className="mt-6 flex items-start space-x-2 rounded-xl bg-[#fdfbf7] p-3.5 border border-[#d4af37]/35 text-[11px] text-neutral-600">
                  <ShieldAlert className="h-4 w-4 text-[#aa851d] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-neutral-800">Mandatory Risk Disclaimer:</strong> Past performance is not indicative of future results. Algorithmic trading involves substantial risk of loss of capital. We never issue profit guarantees. Test on a demo account before live deployment.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
