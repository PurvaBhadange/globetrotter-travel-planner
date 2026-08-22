import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { TravelStoryMode } from "../components/itinerary/TravelStoryMode";
import { ACTIVITIES, TRIPS, CITIES } from "../data/mockTravelData";
import { Calendar, MapPin, Download, Share2, Copy, Sparkles, BookOpen, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const ItineraryView: React.FC = () => {
  const [viewMode, setViewMode] = useState<"timeline" | "story">("timeline");
  const navigate = useNavigate();

  const currentTrip = TRIPS[0];

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden">
        <img src={currentTrip.coverPhotoUrl} alt={currentTrip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />

        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-coral-500 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block shadow-md">
                {currentTrip.durationDays} DAYS • {currentTrip.cities.join(" → ")}
              </span>
              <h1 className="font-jakarta text-3xl sm:text-5xl font-black text-white">{currentTrip.title}</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert("Downloading PDF summary...")}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl backdrop-blur-md border border-white/15 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF / iCal</span>
              </button>
              <button
                onClick={() => navigate(`/trips/${currentTrip.id}/build`)}
                className="px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Edit Trip
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle Bar */}
      <div className="bg-white/5 border-b border-white/10 py-3 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-navy-900/80 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                viewMode === "timeline" ? "bg-coral-500 text-white shadow-md" : "text-slate-300"
              }`}
            >
              Planner View
            </button>
            <button
              onClick={() => setViewMode("story")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === "story" ? "bg-coral-500 text-white shadow-md" : "text-slate-300"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Travel Story Mode</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {viewMode === "story" ? (
          <TravelStoryMode tripTitle={currentTrip.title} activities={ACTIVITIES} />
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            <h3 className="font-jakarta text-2xl font-bold text-white mb-4">Daily Timeline View</h3>
            <div className="space-y-4">
              {ACTIVITIES.map((act, i) => (
                <div key={act.id} className="bg-white/5 border border-white/15 rounded-3xl p-5 flex gap-4">
                  <img src={act.imageUrl} alt={act.name} className="w-32 h-28 object-cover rounded-2xl shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-coral-400">DAY {i + 1} • {act.cityName}</span>
                    <h4 className="font-jakarta text-lg font-bold text-white mt-0.5">{act.name}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1 mb-2">{act.description}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-400" />{act.durationMinutes} mins</span>
                      <span className="text-emerald-400 font-bold">{act.currency} {act.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ItineraryView;
