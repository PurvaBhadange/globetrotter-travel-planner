import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { TRIPS, Trip } from "../data/mockTravelData";
import { Plus, Calendar, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MyTrips: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "ongoing" | "upcoming" | "completed">("all");
  const navigate = useNavigate();

  const filtered = TRIPS.filter((t) => filter === "all" || t.status === filter);

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
              YOUR TRAVEL JOURNAL
            </span>
            <h1 className="font-jakarta text-3xl sm:text-4xl font-black text-white">
              My Trips
            </h1>
          </div>

          <button
            onClick={() => navigate("/trips/new")}
            className="px-5 py-3 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-coral-500/20 flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit">
          {["all", "ongoing", "upcoming", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 text-xs font-bold rounded-xl capitalize transition-all ${
                filter === tab ? "bg-coral-500 text-white shadow-md" : "text-slate-300 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trip Magazine Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/trips/${t.id}`)}
              className="bg-navy-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer hover:border-coral-500/50 transition-all flex flex-col"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img src={t.coverPhotoUrl} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-navy-900/80 backdrop-blur-md rounded-full text-xs font-bold text-coral-400 border border-white/20 uppercase">
                  {t.status}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-jakarta text-xl font-bold text-white mb-2">{t.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-300 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-coral-500" />{t.cities.join(" · ")}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-sky-400" />{t.durationDays} Days</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">{t.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-bold text-coral-400">{t.planningProgress}% Planned</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-coral-500 to-gold-500 h-full rounded-full" style={{ width: `${t.planningProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyTrips;
