import React from 'react';
import { MessageCircle, Phone, Mail, ShieldAlert, ArrowUpRight, Coins, Send } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello XTech Algo Trading, I have a question regarding Berserker Scalp AI & Snxperbot for MT4 and MT5.'
  )}`;

  return (
    <footer id="contact" className="relative border-t border-[#d4af37]/35 bg-[#101115] text-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Col - XTech Algo Trading */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37] bg-gradient-to-br from-[#121319] to-[#002b66] shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#f59e0b] to-[#0066ff]">
                  X
                </span>
              </div>
              <div>
                <span className="font-black uppercase text-lg tracking-tight text-white block">
                  <span className="text-[#ffd700]">X</span><span className="text-[#0066ff]">TECH</span> ALGO TRADING
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#d97706] uppercase font-extrabold">
                  AUTOMATE. ADAPT. OUTPERFORM.
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-sans">
              Advanced Expert Advisor trading systems designed for precision, consistency and real market performance across <strong className="text-neutral-200">MetaTrader 4 &amp; MetaTrader 5 (MT4 &amp; MT5)</strong>.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-[#0066ff]" />
              <span>Desk Status: Active 24/5 Trading Desk</span>
            </div>
          </div>

          {/* Direct Support CTA Buttons */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffd700]">
              Direct Contact &amp; Desk
            </h4>
            <div className="flex flex-col space-y-2.5">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-4 py-2.5 text-xs font-medium text-emerald-400 hover:border-emerald-400 hover:bg-emerald-900/40 transition-all"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>WhatsApp: +255 610 366 248</span>
              </a>

              {/* Call */}
              <a
                href="tel:+255610366248"
                className="flex items-center space-x-3 rounded-xl border border-neutral-800 bg-[#18191e] px-4 py-2.5 text-xs font-medium text-neutral-300 hover:border-[#d4af37] hover:text-white transition-all"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#ffd700]" />
                <span>Phone Call: +255 610 366 248</span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/XtechTrades"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 rounded-xl border border-[#0066ff]/40 bg-[#0066ff]/10 px-4 py-2.5 text-xs font-medium text-[#60a5fa] hover:border-[#60a5fa] transition-all"
              >
                <Send className="h-4 w-4 shrink-0 text-[#60a5fa]" />
                <span>Telegram: @XtechTrades</span>
              </a>

              {/* Email */}
              <a
                href="mailto:support@ea-algo.community?subject=Inquiry%20-%20XTech%20Algo%20Trading"
                className="flex items-center space-x-3 rounded-xl border border-neutral-800 bg-[#18191e] px-4 py-2.5 text-xs font-medium text-neutral-300 hover:border-[#d4af37] hover:text-white transition-all"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#ffd700]" />
                <span>Email: support@ea-algo.community</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffd700]">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-mono">
              <li>
                <button
                  onClick={() => navigate('/product?id=prod-berserker-scalp-ai')}
                  className="hover:text-[#ffd700] transition-colors cursor-pointer text-left"
                >
                  Berserker Scalp AI (MT4 &amp; MT5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/product?id=prod-snxperbot-adaptive-engine')}
                  className="hover:text-[#ffd700] transition-colors cursor-pointer text-left"
                >
                  Snxperbot Adaptive Engine (MT4 &amp; MT5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover:text-[#ffd700] transition-colors cursor-pointer"
                >
                  Client Portal / Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/auth')}
                  className="hover:text-[#ffd700] transition-colors cursor-pointer"
                >
                  Sign In / Create Account
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Regulatory Risk Disclosure */}
        <div className="mt-8 rounded-xl bg-black/40 p-4 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed font-sans">
          <div className="flex items-start space-x-2">
            <ShieldAlert className="h-4 w-4 text-[#ffd700] shrink-0 mt-0.5" />
            <p>
              <strong className="text-neutral-200">High Risk Investment Warning:</strong> Foreign exchange (Forex) and CFD trading carries a substantial level of risk and may not be suitable for all investors. Leverage creates additional risk and loss exposure. Before deciding to trade foreign exchange or utilize algorithmic Expert Advisors provided by XTech Algo Trading, carefully consider your investment objectives, level of experience, and risk appetite. You could lose some or all of your initial deposit. We do not provide financial advice, guarantees of income, or assurances of profit.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} XTech Algo Trading. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 text-[#d4af37]">Automate. Adapt. Outperform.</p>
        </div>

      </div>
    </footer>
  );
};
