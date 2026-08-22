import React, { useState } from "react";
import { TRAVEL_PERSONALITIES, TravelPersonality } from "../../data/mockTravelData";
import { Sparkles, X, CheckCircle } from "lucide-react";

export const TravelPersonalityModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string>("adventure");

  if (!isOpen) return null;

  const selectedPersonality = TRAVEL_PERSONALITIES.find((p) => p.id === selectedId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-navy-900 border border-white/20 rounded-3xl p-6 sm:p-8 w-full max-w-3xl text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
            PERSONALIZATION QUIZ
          </span>
          <h3 className="font-jakarta text-3xl font-black text-white">
            What kind of traveler are you?
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Choose your primary travel style to tailor destination recommendations and Copilot suggestions.
          </p>
        </div>

        {/* 8 Personality Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {TRAVEL_PERSONALITIES.map((p) => {
            const isSelected = p.id === selectedId;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                  isSelected
                    ? "bg-gradient-to-b from-coral-500/20 to-navy-900 border-coral-500 shadow-xl shadow-coral-500/20 scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span className="text-3xl mb-2">{p.icon}</span>
                <h4 className="font-jakarta text-sm font-bold text-white mb-1">{p.title}</h4>
                {isSelected && <CheckCircle className="w-4 h-4 text-coral-500 mt-1" />}
              </div>
            );
          })}
        </div>

        {/* Selected Summary Footer */}
        {selectedPersonality && (
          <div className="bg-white/5 border border-white/15 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] font-bold text-coral-400 uppercase tracking-widest">
                YOUR PROFILE: {selectedPersonality.title}
              </span>
              <p className="text-xs text-slate-300 mt-0.5">{selectedPersonality.description}</p>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gold-400">
                <span>Recommended:</span>
                <span className="text-white font-bold">{selectedPersonality.recommendedPlaces.join(", ")}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors shrink-0"
            >
              Save Personality
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
