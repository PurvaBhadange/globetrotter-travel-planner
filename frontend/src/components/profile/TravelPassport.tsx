import React from "react";
import { Globe, Award, MapPin, Compass, ShieldCheck } from "lucide-react";

export const TravelPassport: React.FC = () => {
  const badges = [
    { name: "Mountain Explorer", icon: "🏔️", color: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
    { name: "Beach Hopper", icon: "🏖️", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    { name: "Culture Collector", icon: "📸", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { name: "Food Explorer", icon: "🍜", color: "bg-coral-500/20 text-coral-400 border-coral-500/30" },
    { name: "World Traveler", icon: "🌍", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  ];

  const stamps = [
    { city: "Paris", country: "France", code: "PAR-FR", date: "JUN 2026" },
    { city: "Kyoto", country: "Japan", code: "KYO-JP", date: "APR 2026" },
    { city: "Goa", country: "India", code: "GOA-IN", date: "JAN 2026" },
    { city: "Interlaken", country: "Switzerland", code: "ZRH-CH", date: "AUG 2025" },
  ];

  return (
    <div className="bg-navy-900 border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-jakarta text-xl font-black text-white">YOUR TRAVEL PASSPORT</h3>
            <span className="text-xs text-slate-400">Verified Explorer Records & Badges</span>
          </div>
        </div>

        <span className="px-3 py-1 bg-coral-500/20 text-coral-400 border border-coral-500/30 text-xs font-bold rounded-full">
          GLOBETROTTER VERIFIED
        </span>
      </div>

      {/* Travel Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
          <span className="font-jakarta text-3xl font-black text-white">12</span>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">CITIES EXPLORED</span>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
          <span className="font-jakarta text-3xl font-black text-coral-400">28</span>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">EXPERIENCES</span>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
          <span className="font-jakarta text-3xl font-black text-gold-400">5</span>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">TRIPS PLANNED</span>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
          <span className="font-jakarta text-3xl font-black text-emerald-400">7</span>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">COUNTRIES</span>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-8">
        <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-3">
          EARNED ACHIEVEMENT BADGES
        </span>
        <div className="flex flex-wrap gap-2.5">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${b.color}`}
            >
              <span>{b.icon}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Passport Stamps Grid */}
      <div>
        <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-3">
          PASSPORT STAMPS
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stamps.map((s, idx) => (
            <div
              key={idx}
              className="p-3 bg-white/5 rounded-2xl border border-white/15 text-center relative overflow-hidden group hover:border-gold-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gold-400/60 mx-auto mb-2 flex items-center justify-center text-[10px] font-bold text-gold-400 font-mono rotate-[-12deg]">
                {s.code}
              </div>
              <span className="font-jakarta text-xs font-bold text-white block">{s.city}</span>
              <span className="text-[10px] text-slate-400">{s.country} • {s.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
