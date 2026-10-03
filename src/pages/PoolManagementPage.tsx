import React from 'react';
import poolHeroImg from '../assets/images/pool_hero_gold_bull_1791007823647.jpg';
import poolPosterImg from '../assets/images/pool_warrior_poster_1791010638466.jpg';
import {
  ArrowLeft,
  Send,
  ShieldCheck,
  TrendingUp,
  Coins,
  Eye,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Mail,
  ExternalLink,
  Lock,
  Flame,
  Sparkles,
  Award,
} from 'lucide-react';

interface PoolManagementPageProps {
  navigate: (path: string) => void;
}

export const PoolManagementPage: React.FC<PoolManagementPageProps> = ({ navigate }) => {
  const telegramUrl = 'https://t.me/XTECHNG';
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello EA ALGO COMMUNITY, I am inquiring about the Pool Account Management service with @XTECHNG.'
  )}`;

  const scrollToOffer = () => {
    const el = document.getElementById('pool-offer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pool-page min-h-screen bg-transparent text-[#1c1d21] antialiased selection:bg-[#d4af37] selection:text-black">
      
      {/* ================= LUXURY HEADER ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-[#d4af37]/30 bg-white/95 shadow-xs">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Back Link to Smart Scalper EA */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-xs font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer group"
          >
            <div className="h-7 w-7 rounded-full border border-neutral-300 flex items-center justify-center group-hover:border-black group-hover:bg-neutral-100 transition-all">
              <ArrowLeft className="h-3.5 w-3.5 text-neutral-700" />
            </div>
            <span className="hidden sm:inline">Back to Smart Scalper EA</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Luxury Brand Crest */}
          <div className="flex items-center space-x-3 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d4af37] bg-[#1a1a1a] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Coins className="h-5 w-5 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-[#1a1a1a] block leading-none">
                POOL ACCOUNT MANAGEMENT
              </span>
              <span className="text-[10px] font-mono tracking-wider text-[#aa851d] uppercase font-bold">
                EA ALGO COMMUNITY · INDEPENDENT INSTITUTIONAL SERVICE
              </span>
            </div>
          </div>

          {/* Header Telegram CTA */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn flex items-center space-x-2 rounded-lg px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider text-black shadow-md"
          >
            <Send className="h-3.5 w-3.5 text-black" />
            <span className="hidden sm:inline">Start on Telegram</span>
            <span className="sm:hidden">@XTECHNG</span>
          </a>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden border-b border-[#d4af37]/30 bg-transparent">
        {/* Dynamic atmospheric accents blending with LiveWallpaper */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Left-side fade gradient providing generous empty space on the left for headline */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/95 via-[#faf8f5]/80 to-transparent md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5]/50 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            
            {/* Crimson & Gold Accent Pill */}
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/60 bg-white px-3.5 py-1 mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#ff1e38]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#916b10]">
                Institutional Capital Pool Allocation
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-xs font-mono font-bold text-[#1a1a1a]">@XTECHNG</span>
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#1a1a1a] leading-[1.05]">
              POOL ACCOUNT
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#aa851d] via-[#d4af37] to-[#806010]">
                MANAGEMENT
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
              Experience hands-free algorithmic deployment guided by institutional market veterans. We operate diversified low-drawdown algorithmic clusters tailored for capital preservation and systematic growth.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn flex items-center justify-center space-x-2 rounded-xl px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-black shadow-lg"
              >
                <Send className="h-4 w-4" />
                <span>Start on Telegram (@XTECHNG)</span>
              </a>

              <button
                onClick={scrollToOffer}
                className="flex items-center justify-center space-x-2 rounded-xl border border-neutral-300 bg-white/90 px-6 py-4 text-sm font-semibold text-neutral-800 hover:border-black hover:bg-white transition-all shadow-sm cursor-pointer"
              >
                <span>View The Pool Offer</span>
              </button>
            </div>

            {/* Transparent Risk Notice */}
            <div className="mt-8 flex items-start space-x-2 text-xs text-neutral-600 bg-white p-3.5 rounded-lg border border-[#d4af37]/40 max-w-xl shadow-xs">
              <AlertTriangle className="h-4 w-4 text-[#aa851d] shrink-0 mt-0.5" />
              <p>
                <strong>Capital Disclosure:</strong> All investments are subject to market risks. Targets represent campaign objectives under systematic conditions and are never guaranteed returns or promises of profit.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS BAND ================= */}
      <section className="border-y border-[#d4af37]/30 bg-[#16171a] text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-neutral-800">
            
            <div className="pt-4 sm:pt-0">
              <span className="block font-mono text-3xl sm:text-4xl font-extrabold text-[#d4af37]">
                $200
              </span>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 mt-1 block">
                Minimum Starting Amount
              </span>
              <p className="text-[11px] text-neutral-500 mt-1">Accessible pool threshold for all participants</p>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="block font-mono text-3xl sm:text-4xl font-extrabold text-[#e5b842]">
                $1,000+
              </span>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 mt-1 block">
                Advertised Campaign Target
              </span>
              <p className="text-[11px] text-neutral-500 mt-1">Campaign projection — strictly never a guarantee</p>
            </div>

            <div className="pt-4 sm:pt-0">
              <span className="block font-mono text-2xl sm:text-3xl font-extrabold text-white">
                @XTECHNG
              </span>
              <span className="text-xs uppercase font-mono tracking-wider text-[#d4af37] mt-1 block font-bold">
                Direct Telegram Desk
              </span>
              <p className="text-[11px] text-neutral-500 mt-1">1-on-1 private coordination and verification</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= OFFER CARDS SECTION ================= */}
      <section id="pool-offer" className="py-24 bg-[#faf8f5]/85 border-t border-[#d4af37]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#aa851d]">
              STANDALONE PORTFOLIO SERVICE
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
              THE POOL ACCOUNT STRUCTURE
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Transparent, disciplined algorithmic execution with uncompromising risk parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: $200 Start */}
            <div className="rounded-2xl border border-[#d4af37]/40 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 text-[#aa851d]">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold uppercase text-[#1a1a1a]">
                $200 Minimum Start
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Start with an accessible minimum capital commitment. Every participant account is allocated algorithmic position sizing scaled proportionally to balance.
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center space-x-1.5 text-xs font-mono text-[#aa851d] font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Low barrier to entry</span>
              </div>
            </div>

            {/* Card 2: $1K+ Campaign Target */}
            <div className="rounded-2xl border border-[#d4af37]/40 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 text-[#aa851d]">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold uppercase text-[#1a1a1a]">
                $1K+ Campaign Target
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Staged compounding model targeted during disciplined market regimes. Clearly framed as an aggressive algorithmic target — never a guarantee or promise.
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center space-x-1.5 text-xs font-mono text-[#aa851d] font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Targeted milestones</span>
              </div>
            </div>

            {/* Card 3: Monitor Activity */}
            <div className="rounded-2xl border border-[#d4af37]/40 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 text-[#aa851d]">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold uppercase text-[#1a1a1a]">
                Monitor Activity
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Transparent updates and real-time oversight. Follow pool trade performance directly through the investor dashboard and private Telegram channel broadcasts.
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center space-x-1.5 text-xs font-mono text-[#aa851d] font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>100% Visibility</span>
              </div>
            </div>

            {/* Card 4: Risk Comes First */}
            <div className="rounded-2xl border border-[#ff1e38]/30 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 border border-[#ff1e38]/30 text-[#ff1e38]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold uppercase text-[#1a1a1a]">
                Risk Comes First
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Capital preservation overrides all profits. Hard maximum daily drawdown limits, automated circuit breakers during high-impact news, and zero toxic martingale.
              </p>
              <div className="pt-2 border-t border-neutral-100 flex items-center space-x-1.5 text-xs font-mono text-[#ff1e38] font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Automated Circuit Breakers</span>
              </div>
            </div>

          </div>

          {/* ================= OFFICIAL CAMPAIGN ARTWORK SHOWCASE ================= */}
          <div className="mt-16 rounded-3xl border-2 border-[#d4af37]/60 bg-gradient-to-br from-white via-[#faf4e6]/50 to-white p-6 sm:p-10 shadow-[0_20px_60px_rgba(212,175,55,0.18)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Official Poster Artwork */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-[0_12px_40px_rgba(212,175,55,0.25)] bg-[#101115]">
                  <img
                    src={poolPosterImg}
                    alt="Official Pool Account Management Campaign Artwork"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-2 rounded-lg bg-black/90 px-3 py-1 border border-[#d4af37]/60">
                    <span className="h-2 w-2 rounded-full bg-[#ffd700] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#ffd700] font-bold uppercase tracking-wider">
                      VERIFIED CAMPAIGN ASSET
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Strategic Pillars & Direct Desk Access */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/50 bg-[#faf4e6] px-3 py-0.5 mb-2">
                    <Sparkles className="h-3 w-3 text-[#aa851d]" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#855f0b]">
                      CAMPAIGN STRATEGY
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
                    INSTITUTIONAL PRECISION FOR POOLED CAPITAL
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Designed for investors seeking disciplined market exposure without manual screen time. Our algorithmic clusters deploy strict risk management protocols across premier FX and Commodity pairs.
                  </p>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#d4af37]/30 bg-white p-3 text-center shadow-xs">
                    <span className="block font-mono text-xl sm:text-2xl font-extrabold text-[#aa851d]">$200</span>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 font-semibold">Min Start</span>
                  </div>
                  <div className="rounded-xl border border-[#d4af37]/30 bg-white p-3 text-center shadow-xs">
                    <span className="block font-mono text-xl sm:text-2xl font-extrabold text-[#059669]">$1,000+</span>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 font-semibold">Advertised Target</span>
                  </div>
                  <div className="rounded-xl border border-[#d4af37]/30 bg-white p-3 text-center shadow-xs">
                    <span className="block font-mono text-xs sm:text-sm font-extrabold text-[#1a1a1a] mt-1.5">@XTECHNG</span>
                    <span className="text-[10px] font-mono uppercase text-neutral-500 font-semibold">Direct Desk</span>
                  </div>
                </div>

                {/* Telegram & WhatsApp buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-btn flex-1 rounded-xl py-3 px-5 text-xs font-extrabold uppercase tracking-wider text-center flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Send className="h-4 w-4 text-black" />
                    <span>Inquire via Telegram (@XTECHNG)</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-neutral-300 bg-white py-3 px-5 text-xs font-bold text-neutral-800 hover:border-[#aa851d] hover:bg-[#faf4e6] transition-colors flex items-center justify-center space-x-2 shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp Desk (+255 610 366 248)</span>
                  </a>
                </div>

                <p className="text-[11px] text-neutral-500 italic">
                  * All campaign figures represent systematic milestone targets and are not guaranteed profit distributions.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= FOUR-STEP HOW IT WORKS ================= */}
      <section className="py-24 bg-white/90 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#aa851d]">
              ONBOARDING PATHWAY
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1a1a1a]">
              FOUR STEPS TO POOL PARTICIPATION
            </h2>
            <p className="mt-3 text-sm text-neutral-600">
              Clear, structured process to join the EA ALGO COMMUNITY Pool Account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="relative p-6 rounded-2xl bg-[#faf8f5] border border-neutral-200 space-y-3">
              <span className="font-mono text-3xl font-extrabold text-[#d4af37]">01</span>
              <h4 className="text-base font-bold uppercase text-[#1a1a1a]">Connect on Telegram</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Directly contact the management lead <strong className="text-black">@XTECHNG</strong> on Telegram to check current cohort availability and pool opening schedules.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#faf8f5] border border-neutral-200 space-y-3">
              <span className="font-mono text-3xl font-extrabold text-[#d4af37]">02</span>
              <h4 className="text-base font-bold uppercase text-[#1a1a1a]">Fund Minimum $200</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Confirm your participation amount (minimum $200). Your allocation is logged with clear investor credentials and dedicated tracking ID.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#faf8f5] border border-neutral-200 space-y-3">
              <span className="font-mono text-3xl font-extrabold text-[#d4af37]">03</span>
              <h4 className="text-base font-bold uppercase text-[#1a1a1a]">Algorithmic Execution</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                The institutional algorithm cluster trades institutional spreads 24/5 on MT5 with strict position sizing and hard stop-loss safeguards.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#faf8f5] border border-neutral-200 space-y-3">
              <span className="font-mono text-3xl font-extrabold text-[#d4af37]">04</span>
              <h4 className="text-base font-bold uppercase text-[#1a1a1a]">Reporting & Settlement</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Receive weekly transparent performance summaries. Periodic profit disbursements are settled directly to participants per agreed terms.
              </p>
            </div>

          </div>

          {/* Master CTA */}
          <div className="mt-16 rounded-2xl border border-[#d4af37]/60 bg-gradient-to-r from-[#1a1a1a] to-[#2a2720] text-white p-8 sm:p-12 text-center shadow-xl">
            <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              TALK DIRECTLY WITH <span className="text-[#e5b842]">@XTECHNG</span>
            </h3>
            <p className="mt-3 text-sm text-neutral-300 max-w-xl mx-auto">
              Ready to explore Pool Account Management? Inquire directly with the lead portfolio manager on Telegram or via WhatsApp.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn flex items-center justify-center space-x-2 rounded-xl px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-black shadow-lg"
              >
                <Send className="h-4 w-4" />
                <span>Message @XTECHNG on Telegram</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-xl border border-neutral-600 bg-neutral-800/80 px-7 py-4 text-sm font-semibold text-neutral-200 hover:text-white hover:border-[#d4af37] transition-all"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp: +255 610 366 248</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ================= POOL FOOTER & COMPREHENSIVE RISK DISCLOSURE ================= */}
      <footer className="bg-[#121316] text-white pt-16 pb-12 border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Coins className="h-5 w-5 text-[#d4af37]" />
                <span className="font-extrabold uppercase text-base tracking-tight text-white">
                  POOL ACCOUNT MANAGEMENT
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
                Independent pool management program provided by EA ALGO COMMUNITY. Distinct and separate from the single-product storefront Smart Scalper EA.
              </p>
              <div className="flex items-center space-x-4 text-xs font-mono text-neutral-400 pt-2">
                <span>Telegram: @XTECHNG</span>
                <span>·</span>
                <span>WhatsApp: +255 610 366 248</span>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col sm:flex-row sm:justify-end gap-6 text-xs text-neutral-400">
              <div className="space-y-2">
                <h5 className="font-mono text-neutral-200 uppercase font-bold text-[11px]">Contacts</h5>
                <p>Telegram: <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] underline">@XTECHNG</a></p>
                <p>Email: <a href="mailto:Mickybonny9@gmail.com" className="text-neutral-300 underline">Mickybonny9@gmail.com</a></p>
                <p>Phone: <a href="tel:+255610366248" className="text-neutral-300">+255 610 366 248</a></p>
              </div>

              <div className="space-y-2">
                <h5 className="font-mono text-neutral-200 uppercase font-bold text-[11px]">Navigation</h5>
                <p>
                  <button onClick={() => navigate('/')} className="hover:text-white transition-colors">
                    Smart Scalper EA Storefront
                  </button>
                </p>
                <p>
                  <button onClick={() => navigate('/product')} className="hover:text-white transition-colors">
                    Product Details
                  </button>
                </p>
                <p>
                  <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">
                    Client Portal
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Full Risk Warning */}
          <div className="mt-8 rounded-xl bg-black/40 p-4 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed space-y-2">
            <div className="flex items-center space-x-2 text-neutral-200 font-semibold">
              <AlertTriangle className="h-4 w-4 text-[#d4af37]" />
              <span>Investment Risk & Pool Participation Disclosure</span>
            </div>
            <p>
              Forex and CFD trading involves substantial risk of loss and is not suitable for all investors. Capital allocated to pool accounts is exposed to market volatility, liquidity shocks, and system latency risks. Stated targets ($1,000+) are campaign objectives, not guaranteed financial returns or representations of assured profit. Past results do not guarantee future performance. Never allocate capital you cannot afford to lose.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500">
            <p>© {new Date().getFullYear()} EA ALGO COMMUNITY. Pool Account Management.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-2 sm:mt-0 text-[#d4af37] hover:underline"
            >
              Return to Smart Scalper EA Main Storefront →
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
};
