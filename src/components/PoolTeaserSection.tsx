import React from 'react';
import poolPosterImg from '../assets/images/pool_warrior_poster_1791010638466.jpg';
import {
  TrendingUp,
  Shield,
  Users,
  Send,
  ArrowRight,
  Coins,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface PoolTeaserSectionProps {
  onNavigateToPool: () => void;
}

export const PoolTeaserSection: React.FC<PoolTeaserSectionProps> = ({ onNavigateToPool }) => {
  const telegramUrl = 'https://t.me/XTECHNG';

  return (
    <section className="relative py-24 bg-[#faf8f5]/85 border-t border-[#d4af37]/30 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/3 right-10 h-[500px] w-[500px] rounded-full bg-[#d4af37]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-[400px] w-[400px] rounded-full bg-[#ffd700]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/60 bg-white px-3.5 py-1 mb-3 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#ff1e38]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#855f0b]">
              STANDALONE INSTITUTIONAL CAMPAIGN
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
            POOL ACCOUNT MANAGEMENT
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Automated capital allocation guided by institutional veterans. Hands-free algorithmic compounding powered by EA ALGO COMMUNITY.
          </p>
        </div>

        {/* Master Showcase Banner Grid */}
        <div className="rounded-3xl border border-[#d4af37]/50 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_16px_50px_rgba(212,175,55,0.14)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: The Campaign Poster Artwork */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative group w-full max-w-md rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_15px_45px_rgba(212,175,55,0.22)] bg-[#121318]">
                <img
                  src={poolPosterImg}
                  alt="Pool Account Management Warrior Artwork"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-103"
                />
                
                {/* Floating overlay chip */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 rounded-xl bg-black/90 px-3 py-1.5 border border-[#d4af37]/60">
                  <span className="h-2 w-2 rounded-full bg-[#ffd700] animate-pulse" />
                  <span className="text-[11px] font-mono text-[#ffd700] font-bold uppercase tracking-wider">
                    OFFICIAL CAMPAIGN
                  </span>
                </div>

                {/* Bottom Telegram pill */}
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#18191e] to-[#24252e] p-3 border border-[#d4af37]/60 text-white hover:border-[#ffd700] transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#229ED9] text-white">
                      <Send className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block leading-tight">OFFICIAL TELEGRAM</span>
                      <span className="text-xs font-mono font-bold text-[#ffd700]">@XTECHNG</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-white/90 underline">Connect →</span>
                </a>
              </div>
            </div>

            {/* Right: Key Pillars, Investment Badge & Direct CTAs */}
            <div className="lg:col-span-6 space-y-8">
              
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#aa851d] block mb-2">
                  Institutional Execution Cluster
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1a1a1a] leading-tight">
                  GROW CAPITAL WITH
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8a6510] via-[#c99818] to-[#684c0c]">
                    PROFESSIONAL DISCIPLINE
                  </span>
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Join our verified pool accounts where retail capital is pooled to access institutional liquidity, tight broker spreads, and dedicated risk supervision.
                </p>
              </div>

              {/* 3 Pillars as seen in poster */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-[#d4af37]/35 bg-[#faf8f5] p-3.5 text-center shadow-xs">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 text-[#aa851d] mb-2">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-extrabold uppercase text-[#1a1a1a]">GROW CAPITAL</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">Multi-asset expansion</p>
                </div>

                <div className="rounded-2xl border border-[#d4af37]/35 bg-[#faf8f5] p-3.5 text-center shadow-xs">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 text-[#aa851d] mb-2">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-extrabold uppercase text-[#1a1a1a]">PROFESSIONAL</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">Institutional risk ceilings</p>
                </div>

                <div className="rounded-2xl border border-[#d4af37]/35 bg-[#faf8f5] p-3.5 text-center shadow-xs">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 text-[#aa851d] mb-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-extrabold uppercase text-[#1a1a1a]">REAL RESULTS</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">100% transparent tracking</p>
                </div>
              </div>

              {/* Invest from $200 / Earn $1K+ Highlight Box */}
              <div className="rounded-2xl border-2 border-[#d4af37]/60 bg-gradient-to-r from-[#18191e] via-[#20222a] to-[#16171b] p-6 text-white shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-300 font-bold block mb-1">
                      PARTICIPATION LEVEL
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#ffd700]">
                        $200
                      </span>
                      <span className="text-xs font-mono text-neutral-400">MINIMUM START</span>
                    </div>
                  </div>

                  <div className="sm:border-l sm:border-neutral-700 sm:pl-6">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-300 font-bold block mb-1">
                      CAMPAIGN OBJECTIVE
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#ffd700]">
                        $1,000+
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">ADVERTISED TARGET</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-700/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>RETURN DEPENDS ON MARKET VOLATILITY</span>
                  <span className="text-[#ffd700] font-semibold">HIGHER CAPITAL = HIGHER ALLOCATION</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-btn flex-1 rounded-xl py-4 px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-center flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send className="h-4 w-4 text-black" />
                  <span>Join on Telegram (@XTECHNG)</span>
                </a>

                <button
                  onClick={onNavigateToPool}
                  className="rounded-xl border border-neutral-300 bg-white py-4 px-6 text-xs sm:text-sm font-bold text-neutral-800 hover:border-[#aa851d] hover:bg-[#faf4e6] transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                >
                  <span>View Full Pool Offer</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Transparent Risk Notice */}
              <div className="flex items-start space-x-2 text-[11px] text-neutral-500 bg-[#faf8f5] p-3 rounded-xl border border-neutral-200">
                <AlertTriangle className="h-4 w-4 text-[#aa851d] shrink-0 mt-0.5" />
                <p>
                  <strong>Transparency Disclosure:</strong> Algorithmic pool campaigns target disciplined objectives. We never issue guaranteed financial returns. Past performance does not guarantee future results.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
