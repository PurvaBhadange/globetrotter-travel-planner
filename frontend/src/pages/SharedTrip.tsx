import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { TRIPS, ACTIVITIES } from "../data/mockTravelData";
import { Copy, Share2, MapPin, Calendar, Clock, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SharedTrip: React.FC = () => {
  const navigate = useNavigate();
  const trip = TRIPS[0];

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <div className="relative h-80 w-full overflow-hidden">
        <img src={trip.coverPhotoUrl} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4">
          <span className="px-3 py-1 bg-coral-500 text-white text-xs font-bold rounded-full uppercase mb-2 inline-block">
            PUBLIC ITINERARY STORY
          </span>
          <h1 className="font-jakarta text-4xl font-black text-white">{trip.title}</h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between gap-4 p-4 bg-white/5 border border-white/15 rounded-2xl mb-8">
          <div>
            <span className="text-xs text-slate-400 block">SHARED BY PURVA</span>
            <span className="font-bold text-sm text-white">{trip.durationDays} Days • {trip.cities.join(" → ")}</span>
          </div>

          <button
            onClick={() => {
              alert(`Copied "${trip.title}" to your trip journal!`);
              navigate("/trips/new");
            }}
            className="px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
          >
            <Copy className="w-4 h-4" />
            <span>Copy This Trip</span>
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="font-jakarta text-xl font-bold text-white">Public Day-by-Day Route</h3>
          {ACTIVITIES.map((act, i) => (
            <div key={act.id} className="bg-white/5 border border-white/15 rounded-3xl p-5 flex gap-4">
              <img src={act.imageUrl} alt={act.name} className="w-32 h-28 object-cover rounded-2xl shrink-0" />
              <div>
                <span className="text-xs font-bold text-coral-400">DAY {i + 1} • {act.cityName}</span>
                <h4 className="font-jakarta text-lg font-bold text-white mt-0.5">{act.name}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1 mb-2">{act.description}</p>
                <span className="text-xs text-slate-400">{act.location}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SharedTrip;
