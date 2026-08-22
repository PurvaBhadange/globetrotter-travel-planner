import React, { useState } from "react";
import { CITIES, City } from "../../data/mockTravelData";
import { MapPin, Sparkles, ArrowRight, Sun, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const InteractiveWorldMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-navy-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
            GLOBAL EXPLORER MAP
          </span>
          <h2 className="font-jakarta text-3xl sm:text-5xl font-black text-white">
            Explore Destinations Worldwide
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Click on iconic cities around the globe to view real-time weather forecasts, daily cost estimates, and local landmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Interactive SVG World Map View */}
          <div className="lg:col-span-2 relative bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[380px] flex items-center justify-center">
            {/* World Grid Texture */}
            <div className="absolute inset-0 swiss-grid-pattern opacity-10" />

            {/* Stylized Vector World Outline */}
            <div className="relative w-full h-[320px] flex items-center justify-center">
              <svg viewBox="0 0 1000 500" className="w-full h-full text-white/10 fill-current">
                <path d="M150,150 Q200,100 300,160 T450,200 T600,180 T800,220 T900,300 Q800,450 650,400 T400,350 T200,300 Z" />
              </svg>

              {/* Destination Pins on Map */}
              <div className="absolute top-[32%] left-[28%] cursor-pointer group" onClick={() => setSelectedCity(CITIES[0])}>
                <div className={`p-2 rounded-full border transition-all ${selectedCity.id === "paris" ? "bg-coral-500 border-white scale-125 shadow-lg shadow-coral-500/50" : "bg-white/20 border-white/40 hover:scale-110"}`}>
                  <span className="text-xs">🗼</span>
                </div>
                <span className="text-[10px] font-bold bg-navy-900/90 text-white px-2 py-0.5 rounded-md absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-white/20">Paris</span>
              </div>

              <div className="absolute top-[42%] left-[82%] cursor-pointer group" onClick={() => setSelectedCity(CITIES[1])}>
                <div className={`p-2 rounded-full border transition-all ${selectedCity.id === "kyoto" ? "bg-coral-500 border-white scale-125 shadow-lg shadow-coral-500/50" : "bg-white/20 border-white/40 hover:scale-110"}`}>
                  <span className="text-xs">⛩️</span>
                </div>
                <span className="text-[10px] font-bold bg-navy-900/90 text-white px-2 py-0.5 rounded-md absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-white/20">Kyoto</span>
              </div>

              <div className="absolute top-[52%] left-[68%] cursor-pointer group" onClick={() => setSelectedCity(CITIES[2])}>
                <div className={`p-2 rounded-full border transition-all ${selectedCity.id === "goa" ? "bg-coral-500 border-white scale-125 shadow-lg shadow-coral-500/50" : "bg-white/20 border-white/40 hover:scale-110"}`}>
                  <span className="text-xs">⛪</span>
                </div>
                <span className="text-[10px] font-bold bg-navy-900/90 text-white px-2 py-0.5 rounded-md absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-white/20">Goa</span>
              </div>

              <div className="absolute top-[35%] left-[34%] cursor-pointer group" onClick={() => setSelectedCity(CITIES[3])}>
                <div className={`p-2 rounded-full border transition-all ${selectedCity.id === "switzerland" ? "bg-coral-500 border-white scale-125 shadow-lg shadow-coral-500/50" : "bg-white/20 border-white/40 hover:scale-110"}`}>
                  <span className="text-xs">🏔️</span>
                </div>
                <span className="text-[10px] font-bold bg-navy-900/90 text-white px-2 py-0.5 rounded-md absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-white/20">Interlaken</span>
              </div>

              <div className="absolute top-[45%] left-[56%] cursor-pointer group" onClick={() => setSelectedCity(CITIES[4])}>
                <div className={`p-2 rounded-full border transition-all ${selectedCity.id === "dubai" ? "bg-coral-500 border-white scale-125 shadow-lg shadow-coral-500/50" : "bg-white/20 border-white/40 hover:scale-110"}`}>
                  <span className="text-xs">🏙️</span>
                </div>
                <span className="text-[10px] font-bold bg-navy-900/90 text-white px-2 py-0.5 rounded-md absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-white/20">Dubai</span>
              </div>
            </div>
          </div>

          {/* Selected Destination Card Side Panel */}
          <div className="bg-white/10 border border-white/15 rounded-3xl p-6 shadow-2xl relative animate-fadeIn">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
              <img src={selectedCity.imageUrl} alt={selectedCity.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 px-3 py-1 bg-navy-900/80 backdrop-blur-md rounded-full text-xs font-bold text-coral-400 border border-white/20 flex items-center gap-1">
                <span>{selectedCity.landmarkSilhouette}</span>
                <span>{selectedCity.landmark}</span>
              </div>
            </div>

            <h3 className="font-jakarta text-2xl font-black text-white mb-1">
              {selectedCity.name}, {selectedCity.country}
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed line-clamp-2">
              {selectedCity.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6 text-xs bg-navy-900/60 p-3 rounded-xl border border-white/10">
              <div>
                <span className="text-[10px] font-bold text-coral-400 uppercase tracking-widest block">WEATHER</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-gold-500" />
                  {selectedCity.weather.temp} ({selectedCity.weather.condition})
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-coral-400 uppercase tracking-widest block">DAILY COST</span>
                <span className="font-bold text-emerald-400">{selectedCity.avgDailyCost}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/trips/new?city=${selectedCity.id}`)}
              className="w-full py-3 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add {selectedCity.name} to Trip</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
