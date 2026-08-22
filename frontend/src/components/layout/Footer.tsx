import React from "react";
import { Link } from "react-router-dom";
import { Compass, Globe, Mail, ArrowRight, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const landmarks = [
    { name: "Agra — Taj Mahal", icon: "🕌" },
    { name: "Paris — Eiffel Tower", icon: "🗼" },
    { name: "Dubai — Burj Khalifa", icon: "🏙️" },
    { name: "Kyoto — Fushimi Shrine", icon: "⛩️" },
    { name: "Rome — Colosseum", icon: "🏛️" },
    { name: "New York — Liberty", icon: "🗽" },
    { name: "Sydney — Opera House", icon: "🎭" },
  ];

  return (
    <footer className="bg-navy-900 border-t border-white/10 text-white pt-16 pb-12 overflow-hidden relative">
      {/* Landmark Silhouette Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-coral-500 uppercase tracking-widest shrink-0">
            WORLD LANDMARKS:
          </span>
          <div className="flex items-center gap-8 shrink-0">
            {landmarks.map((lm) => (
              <div key={lm.name} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer group">
                <span className="text-xl group-hover:scale-125 transition-transform">{lm.icon}</span>
                <span className="text-xs font-medium tracking-wide">{lm.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-coral-500 flex items-center justify-center text-white font-bold font-jakarta text-xl">
              GT
            </div>
            <span className="font-jakarta text-2xl font-black text-white">GlobeTrotter</span>
          </div>
          <p className="text-sm text-slate-400 font-body leading-relaxed">
            One Globe. Endless Journeys. Discover destinations, build your perfect itinerary, collaborate with your squad, and travel your way.
          </p>
          <div className="flex items-center gap-3 text-xs font-semibold text-coral-500">
            <Globe className="w-4 h-4 animate-spin-slow" />
            <span>Discover it. Plan it. Live it.</span>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Explore</h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li><Link to="/seasonal" className="hover:text-coral-500 transition-colors">Seasonal Escapes</Link></li>
            <li><Link to="/search/cities" className="hover:text-coral-500 transition-colors">Destinations Search</Link></li>
            <li><Link to="/search/activities" className="hover:text-coral-500 transition-colors">Activity Catalog</Link></li>
            <li><Link to="/community" className="hover:text-coral-500 transition-colors">Travel Community</Link></li>
            <li><Link to="/calendar" className="hover:text-coral-500 transition-colors">Trip Calendar</Link></li>
          </ul>
        </div>

        {/* Features Column */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Platform Features</h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li><span className="text-slate-400">✨ AI Trip Copilot</span></li>
            <li><span className="text-slate-400">👥 Squad Sync & Splitwise</span></li>
            <li><span className="text-slate-400">🌦️ Weather & Packing Lists</span></li>
            <li><span className="text-slate-400">🗺️ Interactive World Map</span></li>
            <li><span className="text-slate-400">🛂 Travel Passport & Badges</span></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Join Wanderlust Dispatch</h4>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Get seasonal travel guides, flight deals, and AI itinerary tips weekly.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-3 focus:outline-none focus:border-coral-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© 2026 GlobeTrotter Inc. All rights reserved.</p>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-coral-500 fill-coral-500" />
          <span>for travelers worldwide</span>
        </div>
      </div>
    </footer>
  );
};
