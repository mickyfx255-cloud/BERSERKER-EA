import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, AlertTriangle, ShieldCheck, RefreshCw, MessageSquare, Coins } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

const INITIAL_SUGGESTIONS = [
  'How does Smart Scalper EA manage drawdown and risk?',
  'What pairs and timeframes are recommended?',
  'How do I install the .mq5 file on MT5?',
  'What is the minimum recommended capital to start?',
  'How do I buy a license key via WhatsApp?',
];

export const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I am the **Smart Scalper EA AI Advisor** for **EA ALGO COMMUNITY**.\n\nI can answer questions regarding trading execution, currency pairs (EURUSD, XAUUSD, NAS100), MT5 configuration, and risk management guidelines.\n\n*Note: I do not provide financial advice, live price quotes, or profit guarantees. For purchasing the robot or joining Pool Account Management, reach out to our desk on WhatsApp at +255 610 366 248.*`,
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
    <section id="advisor" className="relative py-24 bg-[#faf8f5]/85 border-t border-[#d4af37]/25">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#d4af37]/60 bg-white px-3.5 py-1 mb-3 shadow-sm">
            <Coins className="h-3.5 w-3.5 text-[#aa851d]" />
            <span className="font-mono text-xs uppercase font-bold text-[#855f0b]">
              POWERED BY SERVER-SIDE INTELLIGENCE
            </span>
          </div>
          <h2 className="font-extrabold uppercase tracking-tight text-3xl sm:text-4xl text-[#1a1a1a]">
            ASK THE AI TRADING ADVISOR
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Have questions about MT5 configuration, scalping strategy, or risk ceilings? Ask the EA ALGO COMMUNITY advisor below.
          </p>
        </div>

        {/* Chat Terminal Box - White Luxury Card with Black Marble Header */}
        <div className="rounded-2xl border border-[#d4af37]/45 bg-white shadow-[0_12px_45px_rgba(212,175,55,0.12)] overflow-hidden flex flex-col h-[600px]">
          
          {/* Chat Terminal Header in Polished Black Marble */}
          <div className="flex items-center justify-between border-b border-[#d4af37]/35 bg-[#18191e] px-6 py-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#d4af37] bg-[#22242b]">
                <Bot className="h-4 w-4 text-[#ffd700]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    SMART SCALPER AI ADVISOR
                  </span>
                  <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-700">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-neutral-400">
                  EA ALGO COMMUNITY · Model Gemini 3.8 Flash
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome-reset',
                    role: 'model',
                    text: `Chat session refreshed. How can I help you with Smart Scalper EA or MetaTrader 5 today?`,
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

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans text-sm bg-[#fdfbf7]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="h-7 w-7 rounded-lg bg-[#faf4e6] border border-[#d4af37]/50 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-[#aa851d]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'gold-btn text-black font-semibold rounded-br-none shadow-md'
                      : 'bg-white text-neutral-800 border border-[#d4af37]/35 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="space-y-2 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                    {msg.text.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  <span
                    className={`mt-1 block text-[10px] font-mono text-right ${
                      msg.role === 'user' ? 'text-neutral-900/80 font-bold' : 'text-neutral-400'
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
                <div className="h-7 w-7 rounded-lg bg-[#faf4e6] border border-[#d4af37]/50 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-[#aa851d] animate-pulse" />
                </div>
                <div className="rounded-2xl rounded-bl-none bg-white border border-[#d4af37]/30 px-4 py-3 text-xs text-neutral-600 flex items-center space-x-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#aa851d] animate-ping" />
                  <span>Synthesizing trading advisor response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="border-t border-neutral-200 bg-[#faf8f5] px-4 py-2.5 overflow-x-auto">
            <div className="flex items-center space-x-2 w-max text-xs">
              <span className="text-[11px] font-mono text-[#855f0b] font-bold uppercase flex items-center space-x-1 shrink-0">
                <Sparkles className="h-3 w-3 text-[#aa851d]" />
                <span>Suggestions:</span>
              </span>
              {INITIAL_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  disabled={loading}
                  className="rounded-full border border-[#d4af37]/45 bg-white px-3 py-1 text-[11px] font-medium text-neutral-700 hover:border-[#aa851d] hover:bg-[#faf4e6] transition-colors shrink-0 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t border-neutral-200 bg-white p-4">
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
                placeholder="Ask about MT5 installation, scalping rules, pairs, risk..."
                disabled={loading}
                className="flex-1 rounded-xl border border-neutral-300 bg-[#faf8f5] px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#aa851d] focus:bg-white focus:outline-none transition-colors shadow-inner"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="gold-btn rounded-xl p-3.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
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
