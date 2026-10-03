import React from 'react';
import { MessageCircle, Phone, Mail, ShieldAlert, ArrowUpRight, Coins, Send } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const whatsappUrl = `https://wa.me/255610366248?text=${encodeURIComponent(
    'Hello EA ALGO COMMUNITY, I have a question regarding BERSERKER EA Smart Scalper support.'
  )}`;

  return (
    <footer id="contact" className="relative border-t border-[#d4af37]/35 bg-[#121316] text-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37] bg-[#1a1b22] text-[#ffd700] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <Coins className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold uppercase text-lg tracking-tight text-white block">
                  BERSERKER EA
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#d4af37] uppercase font-bold">
                  EA ALGO COMMUNITY
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Owned and operated by <strong className="text-neutral-200">EA ALGO COMMUNITY</strong>. Delivering verified institutional-grade Expert Advisors built natively for MetaTrader 5 with automated risk protocols.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Support Status: Mon–Fri Active Desk</span>
            </div>
          </div>

          {/* Direct Support CTA Buttons */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffd700]">
              Direct Contact & Desk
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

              {/* Email */}
              <a
                href="mailto:Mickybonny9@gmail.com?subject=Inquiry%20-%20BERSERKER%20EA%20ALGO%20COMMUNITY"
                className="flex items-center space-x-3 rounded-xl border border-neutral-800 bg-[#18191e] px-4 py-2.5 text-xs font-medium text-neutral-300 hover:border-[#d4af37] hover:text-white transition-all"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#ffd700]" />
                <span>Email: Mickybonny9@gmail.com</span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/XTECHNG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 rounded-xl border border-[#d4af37]/40 bg-[#faf4e6]/10 px-4 py-2.5 text-xs font-medium text-[#ffd700] hover:border-[#ffd700] transition-all"
              >
                <Send className="h-4 w-4 shrink-0 text-[#ffd700]" />
                <span>Telegram (Pool): @XTECHNG</span>
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
                  onClick={() => navigate('/product')}
                  className="hover:text-[#ffd700] transition-colors cursor-pointer"
                >
                  Smart Scalper EA (MT5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pool-management')}
                  className="flex items-center space-x-1 text-[#f59e0b] hover:text-white transition-colors cursor-pointer font-bold"
                >
                  <span>Pool Account Management</span>
                  <ArrowUpRight className="h-3 w-3" />
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
        <div className="mt-8 rounded-xl bg-black/40 p-4 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
          <div className="flex items-start space-x-2">
            <ShieldAlert className="h-4 w-4 text-[#ffd700] shrink-0 mt-0.5" />
            <p>
              <strong className="text-neutral-200">High Risk Investment Warning:</strong> Foreign exchange (Forex) and CFD trading carries a substantial level of risk and may not be suitable for all investors. Leverage creates additional risk and loss exposure. Before deciding to trade foreign exchange or utilize algorithmic Expert Advisors provided by EA ALGO COMMUNITY, carefully consider your investment objectives, level of experience, and risk appetite. You could lose some or all of your initial deposit. We do not provide financial advice, guarantees of income, or assurances of profit.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} EA ALGO COMMUNITY. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 text-[#d4af37]">Powered by BERSERKER EA Technology</p>
        </div>

      </div>
    </footer>
  );
};
