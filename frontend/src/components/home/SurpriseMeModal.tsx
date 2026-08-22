import React, { useState } from "react";
import { Dices, X, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SurpriseMeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [result, setResult] = useState<{
    name: string;
    tagline: string;
    image: string;
    budget: string;
    season: string;
    activities: string[];
  } | null>(null);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRoll = () => {
    const suggestions = [
      {
        name: "Meghalaya 🌿",
        tagline: "Abode of Clouds & Living Root Bridges",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
        budget: "₹24,000",
        season: "Monsoon & Winter",
        activities: ["Cherrapunji waterfall trek", "Nohkalikai Falls view", "Dawki crystal river boating"],
      },
      {
        name: "Kyoto ⛩️",
        tagline: "Ancient Shrines & Bamboo Groves",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
        budget: "₹1,10,000",
        season: "Spring Sakura",
        activities: ["Arashiyama Bamboo Grove", "Fushimi Inari hike", "Traditional Tea Ceremony"],
      },
    ];
    setResult(suggestions[Math.floor(Math.random() * suggestions.length)]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-navy-900 border border-white/20 rounded-3xl p-6 sm:p-8 w-full max-w-lg text-white shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-coral-500 to-gold-500 p-0.5 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-coral-500/30">
          <div className="w-full h-full bg-navy-900 rounded-full flex items-center justify-center text-gold-400">
            <Dices className="w-8 h-8 animate-bounce" />
          </div>
        </div>

        <h3 className="font-jakarta text-2xl font-black text-white">🎲 Surprise Me!</h3>
        <p className="text-xs text-slate-300 mt-1 mb-6">
          Can't decide where to go next? Roll the dice for a personalized mystery getaway.
        </p>

        {!result ? (
          <button
            onClick={handleRoll}
            className="w-full py-4 bg-gradient-to-r from-coral-500 to-gold-500 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Roll the Adventure Dice!</span>
          </button>
        ) : (
          <div className="bg-white/5 border border-white/15 rounded-2xl p-5 text-left animate-fadeIn">
            <div className="relative h-36 rounded-xl overflow-hidden mb-3">
              <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 px-2.5 py-1 bg-navy-900/80 backdrop-blur-md rounded-md text-[10px] font-bold text-emerald-400">
                {result.budget}
              </div>
            </div>

            <h4 className="font-jakarta text-xl font-bold text-white mb-1">{result.name}</h4>
            <p className="text-xs text-slate-300 mb-3">{result.tagline}</p>

            <div className="space-y-1 text-xs text-slate-200 mb-4 bg-black/20 p-2.5 rounded-lg">
              {result.activities.map((a, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-coral-500">•</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  navigate("/trips/new");
                }}
                className="flex-1 py-3 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Build This Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleRoll}
                className="p-3 bg-white/10 hover:bg-white/20 text-slate-300 rounded-xl transition-colors"
                title="Roll again"
              >
                <Dices className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
