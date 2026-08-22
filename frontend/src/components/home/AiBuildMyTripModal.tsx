import React, { useState } from "react";
import { Sparkles, X, Send, Check, RefreshCw, MapPin, Calendar, DollarSign, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AiBuildMyTripModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState<{
    title: string;
    route: string[];
    days: number;
    budget: string;
    highlights: string[];
  } | null>(null);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedTrip({
        title: "Goa & Gokarna Coastal Expedition",
        route: ["Pune", "North Goa", "Gokarna"],
        days: 7,
        budget: "₹42,500",
        highlights: [
          "Day 1–3: Baga Beach sunset catamaran & watersports",
          "Day 4–5: Dudhsagar Falls jungle trek & spice plantation lunch",
          "Day 6–7: Kudle Beach cliffwalk & temple beach camping",
        ],
      });
    }, 1200);
  };

  const handleAccept = () => {
    onClose();
    navigate("/trips/new");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-navy-900 border border-white/20 rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-white shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-coral-500 to-gold-500 p-0.5 shadow-lg shadow-coral-500/20">
            <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center text-coral-500">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="font-jakarta text-2xl font-black text-white">✨ GlobeTrotter Copilot</h3>
            <p className="text-xs text-slate-400">Conversational AI Trip Planner</p>
          </div>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleGenerate} className="mb-6">
          <label className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-2">
            TELL COPILOT YOUR DREAM TRIP:
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Plan a 7-day trip from Pune under ₹50,000 with beaches, seafood and water sports..."
              className="w-full bg-white/10 border border-white/15 rounded-2xl p-4 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-coral-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="absolute bottom-3 right-3 px-4 py-2 bg-coral-500 hover:bg-coral-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Designing...</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Generated Itinerary Card */}
        {generatedTrip && (
          <div className="bg-white/5 border border-coral-500/30 rounded-2xl p-5 mb-6 animate-fadeIn">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-coral-400 uppercase tracking-widest">
                SUGGESTED JOURNEY
              </span>
              <span className="text-xs font-bold px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                {generatedTrip.budget} Est. Total
              </span>
            </div>

            <h4 className="font-jakarta text-xl font-bold text-white mb-2">
              {generatedTrip.title}
            </h4>

            <div className="flex items-center gap-4 text-xs text-slate-300 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-coral-500" />
                <span>{generatedTrip.route.join(" → ")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold-500" />
                <span>{generatedTrip.days} Days</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-200 mb-6 bg-black/20 p-3 rounded-xl">
              {generatedTrip.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-coral-500 font-bold">•</span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Accept / Modify / Reject Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 py-3 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Accept & Customize</span>
              </button>
              <button
                onClick={() => setGeneratedTrip(null)}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold rounded-xl transition-colors"
              >
                Modify Prompt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
