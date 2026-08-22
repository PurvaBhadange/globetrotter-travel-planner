import React from "react";
import { Link } from "react-router-dom";
import { Compass, Heart, Globe2, Shield, ArrowUpRight, Zap } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t-8 border-black relative overflow-hidden">
      {/* Neo-brutalist High-Energy Yellow Banner */}
      <div className="bg-[#FFD93D] text-black border-b-4 border-black py-3 px-4 font-black text-xs uppercase tracking-widest overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-8 animate-pulse">
          <span>⚡ GLOBETROTTER ENGINE v2.0</span>
          <span>•</span>
          <span>🌍 100% NEO-BRUTALIST TRAVEL TECH</span>
          <span>•</span>
          <span>🚀 REAL-TIME SQUAD SYNC ACTIVE</span>
          <span>•</span>
          <span>✨ AI COPILOT READY</span>
          <span>•</span>
          <span>⚡ NO SUBTLE GRAYS ALLOWED</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FF6B6B] border-3 border-white shadow-[3px_3px_0px_0px_#fff] flex items-center justify-center text-white">
                <Compass className="w-6 h-6 stroke-[3px]" />
              </div>
              <span className="font-black text-2xl uppercase tracking-tighter text-white">
                GLOBE<span className="text-[#FFD93D]">TROTTER</span>
              </span>
            </div>
            <p className="text-xs font-bold text-gray-300 leading-relaxed uppercase tracking-wider">
              The digital punk travel platform for modern wanderlusters. Build, split expenses, and explore the world with zero fluff.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C4B5FD] text-black font-black text-[10px] uppercase border-2 border-white shadow-[2px_2px_0px_0px_#fff]">
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>NEO-BRUTALIST ARCHITECTURE</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-black text-sm uppercase tracking-widest text-[#FFD93D] border-b-2 border-gray-800 pb-1">
              DISCOVER
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link to="/search/cities" className="hover:text-[#FF6B6B] transition-colors flex items-center gap-1">
                  <span>Destinations</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/search/activities" className="hover:text-[#FF6B6B] transition-colors flex items-center gap-1">
                  <span>Experiences</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/seasonal" className="hover:text-[#FF6B6B] transition-colors flex items-center gap-1">
                  <span>Seasonal Travel</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-[#FF6B6B] transition-colors flex items-center gap-1">
                  <span>Community Stories</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Features */}
          <div className="space-y-3">
            <h4 className="font-black text-sm uppercase tracking-widest text-[#FFD93D] border-b-2 border-gray-800 pb-1">
              SYSTEM TOOLS
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link to="/trips/new" className="hover:text-[#00E5FF] transition-colors">
                  AI Trip Generator
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-[#00E5FF] transition-colors">
                  Trip Calendar
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#00E5FF] transition-colors">
                  Gamified Passport
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#00E5FF] transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Sticker Box */}
          <div className="space-y-3 bg-[#111318] p-4 border-3 border-white shadow-[4px_4px_0px_0px_#fff]">
            <h4 className="font-black text-xs uppercase tracking-widest text-[#FF6B6B]">
              JOIN THE TRAVEL REBELLION
            </h4>
            <p className="text-[11px] font-bold text-gray-300">
              Get secret itineraries & seasonal discounts directly in your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="YOUR EMAIL HERE..."
                className="w-full px-3 py-2 bg-white text-black font-bold text-xs border-2 border-black focus:outline-none focus:bg-[#FFD93D]"
              />
              <button className="w-full py-2 bg-[#FF6B6B] text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#fff] btn-neo-push hover:bg-[#FF5722] cursor-pointer">
                SUBSCRIBE →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t-2 border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-gray-400">
          <div className="flex items-center gap-2">
            <span>© 2026 GLOBETROTTER INC.</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-1 text-white bg-gray-900 px-3 py-1 border border-gray-700">
            <span>BUILT WITH</span>
            <Heart className="w-3.5 h-3.5 fill-[#FF6B6B] text-[#FF6B6B]" />
            <span>FOR EXPLORERS WORLDWIDE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
