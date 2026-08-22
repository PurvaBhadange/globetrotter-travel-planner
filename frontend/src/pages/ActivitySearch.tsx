import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ACTIVITIES, Activity } from "../data/mockTravelData";
import { Search, Plus, Clock, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ActivitySearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = ACTIVITIES.filter((act) => {
    const matchesSearch = act.name.toLowerCase().includes(query.toLowerCase()) || act.cityName.toLowerCase().includes(query.toLowerCase());
    const matchesCat = categoryFilter === "all" || act.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
            EXPERIENCE CATALOG
          </span>
          <h1 className="font-jakarta text-3xl sm:text-5xl font-black text-white">
            Discover Things To Do
          </h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2">
            Explore sightseeing, food tours, outdoor adventure, and cultural activities around the world.
          </p>
        </div>

        {/* Search & Filter Chips */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Eiffel Tower, Louvre, Baga Catamaran, Torii Hike..."
              className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-coral-500"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
            {["all", "sightseeing", "food", "adventure", "culture", "nature"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full capitalize transition-colors ${
                  categoryFilter === cat ? "bg-coral-500 text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Activities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((act) => (
            <div key={act.id} className="bg-navy-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              <div className="relative h-48 w-full">
                <img src={act.imageUrl} alt={act.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-navy-900/80 backdrop-blur-md text-coral-400 text-xs font-bold rounded-full uppercase">
                  {act.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-navy-900/80 backdrop-blur-md text-gold-400 text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-gold-400" />
                  <span>{act.rating}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-jakarta text-lg font-bold text-white mb-1">{act.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-coral-500" />{act.cityName}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-400" />{act.durationMinutes} mins</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">{act.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-jakarta text-sm font-bold text-emerald-400">
                    {act.cost > 0 ? `${act.currency} ${act.cost}` : "Free Activity"}
                  </span>
                  <button
                    onClick={() => navigate("/trips/new")}
                    className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Itinerary</span>
                  </button>
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

export default ActivitySearch;
