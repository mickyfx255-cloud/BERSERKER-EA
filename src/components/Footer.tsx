import React from 'react';
import { MessageCircle, Phone, Mail, ShieldAlert, ArrowUpRight, Coins, Send, Terminal, ArrowRight } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello XTech Algo Trading, I have a question regarding Berserker Scalp AI & Snxperbot for MT4 and MT5.'
  )}`;

  return (
    <footer id="contact" className="relative border-t border-[#d4af37]/20 bg-[#08090c] text-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Col - XTech Algo Lab */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/50 bg-[#121319] shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="font-black text-2xl text-[#ffd700]">
                  X
                </span>
              </div>
              <div>
                <span className="font-black uppercase text-lg tracking-tight text-white block">
                  <span>X</span><span className="text-[#ffd700]">TECH</span> <span className="text-neutral-200">ALGO LAB</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">
                  TWO SYSTEMS. ONE ARSENAL.
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm font-sans">
              Trend scalping meets adaptive mean reversion. Engineered to conquer every market condition across <strong className="text-white">MetaTrader 4 &amp; MetaTrader 5 (MT4 &amp; MT5)</strong>.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-neutral-300">Desk Status: Active 24/5 Algorithmic Desk</span>
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
                className="flex items-center space-x-3 rounded-xl border border-emerald-900/60 bg-emerald-950/20 px-4 py-2.5 text-xs font-medium text-emerald-400 hover:border-emerald-400 hover:bg-emerald-900/40 transition-all"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>WhatsApp: +255 610 366 248</span>
              </a>

              {/* Call */}
              <a
                href="tel:+255610366248"
                className="flex items-center space-x-3 rounded-xl border border-neutral-800 bg-[#121319] px-4 py-2.5 text-xs font-medium text-neutral-200 hover:border-[#d4af37] hover:text-white transition-all"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#ffd700]" />
                <span>Phone Call: +255 610 366 248</span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/XtechTrades"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 rounded-xl border border-[#d4af37]/30 bg-[#161722] px-4 py-2.5 text-xs font-medium text-[#f5d061] hover:border-[#ffd700] transition-all"
              >
                <Send className="h-4 w-4 shrink-0 text-[#ffd700]" />
                <span>Telegram: @XtechTrades</span>
              </a>

              {/* Email */}
              <a
                href="mailto:support@ea-algo.community?subject=Inquiry%20-%20XTech%20Algo%20Trading"
                className="flex items-center space-x-3 rounded-xl border border-neutral-800 bg-[#121319] px-4 py-2.5 text-xs font-medium text-neutral-300 hover:border-[#d4af37] hover:text-white transition-all"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#ffd700]" />
                <span>Email: support@ea-algo.community</span>
              </a>
            </div>
          </div>

          {/* Admin Panel Only */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffd700]">
              Admin Operations
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin')}
                className="w-full flex items-center justify-between space-x-2 rounded-xl border border-[#d4af37]/40 bg-[#14151e] px-4 py-3 text-xs font-mono font-bold text-white hover:border-[#ffd700] hover:bg-[#1a1b26] transition-all cursor-pointer shadow-sm group"
              >
                <div className="flex items-center space-x-2.5">
                  <Terminal className="h-4 w-4 text-[#ffd700] group-hover:scale-110 transition-transform" />
                  <span>Admin Panel</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#ffd700]" />
              </button>
              <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                Direct administrative console to manage products, pricing, license keys, and order dispatch.
              </p>
              <div className="pt-2 border-t border-neutral-800">
                <a
                  href="/download-source"
                  download="xtech-algo-trading-source.zip"
                  className="inline-flex items-center space-x-1.5 text-[11px] text-black hover:brightness-110 font-bold bg-gradient-to-r from-[#d4af37] to-[#f5d061] px-3 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <ArrowUpRight className="h-3 w-3 text-black" />
                  <span>Download Source (.ZIP)</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory Regulatory Risk Disclosure */}
        <div className="mt-8 rounded-xl bg-black/50 p-5 border border-[#d4af37]/30 text-[11px] text-neutral-300 leading-relaxed font-sans">
          <div className="flex items-start space-x-3">
            <ShieldAlert className="h-4 w-4 text-[#ffd700] shrink-0 mt-0.5" />
            <p>
              <strong className="text-white font-semibold">RISK DISCLAIMER:</strong> Trading foreign exchange, CFDs, and cryptocurrencies carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. Past performance is not indicative of future results. You should be aware of all the risks associated with trading and seek advice from an independent financial advisor if you have any doubts. By using BERSERKER and SnxperBot, you acknowledge and accept these risks.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} XTech Algo Lab. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 text-[#d4af37]">Two Systems. One Arsenal.</p>
        </div>

      </div>
    </footer>
  );
};
