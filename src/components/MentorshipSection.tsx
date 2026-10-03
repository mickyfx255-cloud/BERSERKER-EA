import React from 'react';
import { Play, Video, Users, Award, MessageCircle, Mail, Coins } from 'lucide-react';

export const MentorshipSection: React.FC = () => {
  return (
    <section id="mentorship" className="relative py-24 bg-[#faf8f5]/85 border-t border-[#d4af37]/25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#aa851d]">
            EA ALGO COMMUNITY ACADEMY
          </span>
          <h2 className="mt-2 font-extrabold uppercase tracking-tight text-3xl sm:text-4xl text-[#1a1a1a]">
            COMMUNITY MENTORSHIP & VIDEO BRIEFING
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Learn the institutional trading principles behind BERSERKER EA and master risk mitigation on MetaTrader 5.
          </p>
        </div>

        {/* Video & Info Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* YouTube Video Embed */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#d4af37]/50 shadow-[0_12px_40px_rgba(212,175,55,0.18)] bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/P_kzXAeqECE"
                title="EA ALGO COMMUNITY Mentorship Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>OFFICIAL EA ALGO VIDEO ARCHIVE</span>
              <span>VIDEO ID: P_kzXAeqECE</span>
            </div>
          </div>

          {/* Mentorship Points */}
          <div className="lg:col-span-5 space-y-6">
            <div className="terminal-card rounded-2xl p-6 border border-[#d4af37]/35 bg-white shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 flex items-center justify-center">
                  <Award className="h-5 w-5 text-[#aa851d]" />
                </div>
                <h3 className="text-base font-bold uppercase text-[#1a1a1a]">
                  VIP Algorithmic Mentorship
                </h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Receive direct guidance from the creator of Smart Scalper EA. Learn how to optimize parameters according to changing market volatility regimes and avoid high-impact news spikes.
              </p>
            </div>

            <div className="terminal-card rounded-2xl p-6 border border-[#d4af37]/35 bg-white shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-[#faf4e6] border border-[#d4af37]/50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#aa851d]" />
                </div>
                <h3 className="text-base font-bold uppercase text-[#1a1a1a]">
                  Exclusive Trader Community
                </h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Connect with serious algorithmic traders running Smart Scalper EA worldwide. Share verified set files, broker spread comparisons, and VPS configurations.
              </p>
            </div>

            {/* Quick Action */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/255610366248?text=Hello%20EA%20ALGO%20COMMUNITY,%20I%20would%20like%20to%20apply%20for%20the%20Mentorship%20Program."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 gold-btn rounded-xl p-3.5 text-center text-xs font-extrabold uppercase shadow-md"
              >
                Inquire via WhatsApp
              </a>
              <a
                href="mailto:Mickybonny9@gmail.com?subject=Mentorship%20Application%20-%20EA%20ALGO%20COMMUNITY"
                className="flex-1 rounded-xl border border-neutral-300 bg-white p-3.5 text-center text-xs font-semibold text-neutral-800 hover:border-[#d4af37] transition-colors shadow-sm"
              >
                Email Application
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
