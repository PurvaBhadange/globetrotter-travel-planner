import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { CITIES, City } from "../data/mockTravelData";
import { Search, MapPin, Star, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CitySearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const navigate = useNavigate();

  const filteredCities = CITIES.filter((city) => {
    const matchesSearch = city.name.toLowerCase().includes(query.toLowerCase()) || city.country.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = regionFilter === "all" || city.region.toLowerCase() === regionFilter.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
            DESTINATION EXPLORER
          </span>
          <h1 className="font-jakarta text-3xl sm:text-5xl font-black text-white">
            Where do you want to go?
          </h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2">
            Discover destinations across Europe, Asia, Americas, and South Asia with live weather and pricing insights.
          </p>
        </div>

        {/* Search Bar & Region Chips */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, country or landmark..."
              className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-coral-500"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
            {["all", "Europe", "Asia", "South Asia", "Middle East"].map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full capitalize transition-colors ${
                  regionFilter === r ? "bg-coral-500 text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Cities Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              className="bg-navy-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl group hover:border-coral-500/50 transition-all flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-navy-900/80 backdrop-blur-md rounded-full text-xs font-bold text-coral-400 border border-white/20 flex items-center gap-1">
                  <span>{city.landmarkSilhouette}</span>
                  <span>{city.landmark}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-jakarta text-xl font-bold text-white">{city.name}, {city.country}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-gold-400">
                      <Star className="w-3.5 h-3.5 fill-gold-400" />
                      <span>{city.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">{city.description}</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-4 border-t border-white/10 text-xs">
                  <span className="font-bold text-emerald-400">{city.avgDailyCost}</span>
                  <button
                    onClick={() => navigate(`/trips/new?city=${city.id}`)}
                    className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Trip</span>
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

export default CitySearch;
