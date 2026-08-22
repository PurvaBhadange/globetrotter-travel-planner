import React, { useState } from "react";
import { Sparkles, X, Send, Check, RefreshCw, AlertTriangle, ArrowRight } from "lucide-react";

export const CopilotDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAcceptSuggestion?: (type: string) => void;
}> = ({ isOpen, onClose, onAcceptSuggestion }) => {
  const [messages, setMessages] = useState<
    { role: "user" | "copilot"; text: string; suggestion?: { title: string; cost: string; action: string } }[]
  >([
    {
      role: "copilot",
      text: "Bonjour! I'm your GlobeTrotter AI Copilot. I noticed Day 3 afternoon has a 3-hour free gap in Paris.",
      suggestion: {
        title: "Montmartre & Sacré-Cœur Walking Tour",
        cost: "€15 ($16)",
        action: "Fill Gap",
      },
    },
  ]);
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "copilot",
          text: "Great idea! Here is a recommended budget optimization for your upcoming trip:",
          suggestion: {
            title: "Swap Seine Luxury Dinner for Latin Quarter Bistro",
            cost: "Saves €45",
            action: "Rebalance Budget",
          },
        },
      ]);
    }, 1000);
  };

  return (
    <aside aria-label="AI Copilot Assistant" className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-navy-900 border-l border-white/20 text-white shadow-2xl flex flex-col animate-slideLeft">
      {/* Drawer Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-navy-900/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-coral-500 to-gold-500 p-0.5">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center text-coral-500">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-jakarta text-sm font-bold text-white">✨ AI Copilot</h3>
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Online • Claude Powered</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-coral-500 text-white rounded-br-none shadow-md"
                  : "bg-white/10 border border-white/15 text-slate-200 rounded-bl-none"
              }`}
            >
              {m.text}
            </div>

            {/* Render Embedded AI Suggestion Card */}
            {m.suggestion && (
              <div className="mt-3 w-[85%] bg-white/10 border border-coral-500/40 rounded-2xl p-3 text-xs animate-fadeIn">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold text-coral-400 uppercase tracking-widest">
                    SUGGESTION
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                    {m.suggestion.cost}
                  </span>
                </div>
                <h4 className="font-jakarta text-xs font-bold text-white mb-2">
                  {m.suggestion.title}
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAcceptSuggestion?.(m.suggestion?.action || "accept")}
                    className="flex-1 py-1.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Accept</span>
                  </button>
                  <button className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-slate-300 text-[11px] font-bold rounded-lg transition-colors">
                    Skip
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-navy-900/90">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot (e.g. Fill gap, rebalance budget)..."
            className="w-full bg-white/10 border border-white/15 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-coral-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-2 p-1 bg-coral-500 hover:bg-coral-600 text-white rounded-lg disabled:opacity-50 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </aside>
  );
};
