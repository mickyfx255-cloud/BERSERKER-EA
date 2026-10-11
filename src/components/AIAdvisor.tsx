import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, AlertTriangle, ShieldCheck, RefreshCw, MessageSquare, Coins } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

const INITIAL_SUGGESTIONS = [
  'What is the difference between Berserker Scalp AI and Snxperbot?',
  'Can I run these systems on both MetaTrader 4 and MetaTrader 5?',
  'How does Berserker Scalp AI manage hard drawdown limits?',
  'What pairs are supported by Snxperbot Adaptive Engine?',
  'How do I acquire a license key via WhatsApp?',
];

export const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I am the **XTech Algo Trading AI Advisor**.\n\nI can answer questions regarding our Expert Advisors (**Berserker Scalp AI** and **Snxperbot Adaptive Engine**), dual-terminal setup on **MetaTrader 4 & MetaTrader 5 (MT4 & MT5)**, currency pairs (Gold XAUUSD, NAS100, 28 forex pairs), risk mitigation, and remote license authentication.\n\n*Note: I do not provide financial advice, live market quotes, or profit guarantees. For purchasing licenses or custom broker setups, reach out directly to our official desk on WhatsApp at +255 610 366 248 or Telegram @XtechTrades.*`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages.map(m => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || data.fallback || 'Response unavailable. Please reach out to WhatsApp: +255 610 366 248.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: '⚠️ **EA ALGO Advisor:** Could not reach the intelligence server. For direct inquiries, licensing, and MT5 setup, contact our team immediately on WhatsApp: **+255 610 366 248** or email **support@ea-algo.community**.\n\n*Risk Warning: Trading forex and CFDs carries a high risk of capital loss.*',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="advisor" className="relative py-24 bg-[#090a0d]/90 border-t border-[#d4af37]/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/40 bg-[#121319] px-3.5 py-1 mb-3 shadow-md">
            <Coins className="h-3.5 w-3.5 text-[#ffd700]" />
            <span className="font-mono text-xs uppercase font-bold text-[#ffd700]">
              POWERED BY SERVER-SIDE INTELLIGENCE
            </span>
          </div>
          <h2 className="font-extrabold uppercase tracking-tight text-3xl sm:text-4xl text-white">
            ASK THE AI TRADING ADVISOR
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Have questions about MT4/MT5 configuration, scalping strategy, or risk ceilings? Ask the XTech advisor below.
          </p>
        </div>

        {/* Chat Terminal Box - Dark Charcoal Luxury Card with Gold Borders */}
        <div className="rounded-2xl border border-[#d4af37]/30 bg-[#111218] shadow-[0_16px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col h-[600px]">
          
          {/* Chat Terminal Header */}
          <div className="flex items-center justify-between border-b border-[#d4af37]/25 bg-[#14151e] px-6 py-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#d4af37]/50 bg-[#1b1c26]">
                <Bot className="h-4 w-4 text-[#ffd700]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    XTECH ALGO ADVISOR
                  </span>
                  <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-700">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-neutral-400">
                  XTECH ALGO TRADING · Client Desk Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome-reset',
                    role: 'model',
                    text: `Chat session refreshed. How can I help you with Berserker Scalp AI, Snxperbot, or MetaTrader setup today?`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area in Dark Charcoal */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans text-sm bg-[#0c0d12]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="h-7 w-7 rounded-lg bg-[#161720] border border-[#d4af37]/40 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-[#ffd700]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'gold-btn text-black font-semibold rounded-br-none shadow-md'
                      : 'bg-[#14151e] text-neutral-200 border border-[#d4af37]/25 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="space-y-2 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                    {msg.text.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  <span
                    className={`mt-1 block text-[10px] font-mono text-right ${
                      msg.role === 'user' ? 'text-black/80 font-bold' : 'text-neutral-500'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="h-7 w-7 rounded-lg bg-[#18191e] border border-[#d4af37]/60 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4 text-[#ffd700]" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start space-x-3">
                <div className="h-7 w-7 rounded-lg bg-[#161720] border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-[#ffd700] animate-pulse" />
                </div>
                <div className="rounded-2xl rounded-bl-none bg-[#14151e] border border-[#d4af37]/25 px-4 py-3 text-xs text-neutral-300 flex items-center space-x-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#ffd700] animate-ping" />
                  <span>Synthesizing trading advisor response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions in Dark Charcoal */}
          <div className="border-t border-neutral-800 bg-[#121319] px-4 py-2.5 overflow-x-auto">
            <div className="flex items-center space-x-2 w-max text-xs">
              <span className="text-[11px] font-mono text-[#ffd700] font-bold uppercase flex items-center space-x-1 shrink-0">
                <Sparkles className="h-3 w-3 text-[#ffd700]" />
                <span>Suggestions:</span>
              </span>
              {INITIAL_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  disabled={loading}
                  className="rounded-full border border-[#d4af37]/30 bg-[#171822] px-3 py-1 text-[11px] font-medium text-neutral-300 hover:border-[#ffd700] hover:text-white transition-colors shrink-0 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t border-neutral-800 bg-[#14151e] p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about MT4/MT5 installation, scalping rules, pairs, risk..."
                disabled={loading}
                className="flex-1 rounded-xl border border-neutral-700 bg-[#0e0f14] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#d4af37] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="gold-btn rounded-xl p-3.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md hover:brightness-105"
              >
                <Send className="h-4 w-4 text-black" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
