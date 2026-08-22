import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { WeatherAwarenessCard } from "../components/itinerary/WeatherAwarenessCard";
import { CopilotDrawer } from "../components/copilot/CopilotDrawer";
import { SplitwiseLedger } from "../components/budget/SplitwiseLedger";
import { ACTIVITIES, TRIPS, CITIES } from "../data/mockTravelData";
import { Sparkles, MapPin, Clock, Plus, Users, Calendar, DollarSign, GripVertical, CloudSun } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ItineraryBuilder: React.FC = () => {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const navigate = useNavigate();

  const currentTrip = TRIPS[0];
  const currentCity = CITIES[0]; // Paris

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      {/* Subheader Toolbar */}
      <div className="bg-navy-900/90 border-b border-white/10 py-4 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-coral-400 uppercase tracking-widest block">ITINERARY BUILDER</span>
            <h1 className="font-jakarta text-xl font-extrabold text-white">{currentTrip.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCopilotOpen(!copilotOpen)}
              className="px-4 py-2 bg-gradient-to-r from-coral-500 to-gold-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ AI Copilot</span>
            </button>
            <button
              onClick={() => navigate(`/trips/${currentTrip.id}`)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl"
            >
              View Travel Story Mode →
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Journey Stops & Days List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/5 border border-white/15 rounded-3xl p-5">
            <h3 className="font-jakarta text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Journey Stops
            </h3>
            <div className="space-y-3">
              {currentTrip.cities.map((c, i) => (
                <div
                  key={c}
                  className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between cursor-pointer hover:border-coral-500 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-xs text-white">{c}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Jun {12 + i * 3}-{15 + i * 3}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-coral-400 text-xs font-bold rounded-xl border border-dashed border-coral-500/40">
              + Add City Stop
            </button>
          </div>

          {/* Weather & Packing Integration */}
          <WeatherAwarenessCard
            cityName={currentCity.name}
            temp={currentCity.weather.temp}
            rainProb={currentCity.weather.rainProb}
            condition={currentCity.weather.condition}
            packingList={currentCity.weather.packing}
          />
        </div>

        {/* Center Column: Day-by-Day Activity Schedule */}
        <div className="lg:col-span-6 space-y-6">
          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {[1, 2, 3, 4, 5].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  activeDay === day
                    ? "bg-coral-500 text-white shadow-lg shadow-coral-500/20"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                DAY {day}
              </button>
            ))}
          </div>

          {/* Activities List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-jakarta text-lg font-bold text-white">Day {activeDay} — Paris Highlights</h3>
              <span className="text-xs text-emerald-400 font-bold">Estimated Cost: €168</span>
            </div>

            {ACTIVITIES.slice(0, 3).map((act, index) => (
              <div
                key={act.id}
                className="bg-white/5 border border-white/15 rounded-3xl p-4 flex flex-col sm:flex-row gap-4 hover:border-white/30 transition-all shadow-xl"
              >
                <img src={act.imageUrl} alt={act.name} className="w-full sm:w-36 h-32 object-cover rounded-2xl shrink-0" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold text-coral-400 uppercase tracking-widest">{9 + index * 3}:00 AM</span>
                      <span className="text-xs font-bold text-emerald-400">{act.currency} {act.cost}</span>
                    </div>
                    <h4 className="font-jakarta text-base font-bold text-white mb-1">{act.name}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{act.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-400" />{act.durationMinutes} mins</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-coral-500" />{act.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Squad Sync Panel & Live Ledger */}
        <div className="lg:col-span-3 space-y-6">
          <SplitwiseLedger squad={currentTrip.squad} currency="INR" />
        </div>
      </main>

      <Footer />

      {/* AI Copilot Drawer */}
      <CopilotDrawer isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
    </div>
  );
};

export default ItineraryBuilder;
