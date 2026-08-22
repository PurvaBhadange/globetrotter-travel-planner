import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { CITIES } from "../data/mockTravelData";
import { Search, Star, Plus, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CitySearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const navigate = useNavigate();

  const filteredCities = CITIES.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(query.toLowerCase()) ||
      city.country.toLowerCase().includes(query.toLowerCase());
    const matchesRegion =
      regionFilter === "all" || city.region.toLowerCase() === regionFilter.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-[#FFD93D] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-3 rotate-[-1deg]">
            DESTINATION SEARCH ENGINE
          </span>
          <h1 className="font-black text-4xl sm:text-6xl text-black uppercase tracking-tighter leading-none mb-2">
            WHERE DO YOU WANT TO GO?
          </h1>
          <p className="text-xs sm:text-sm font-bold text-black/80 max-w-lg mx-auto uppercase tracking-wide">
            Discover destinations across Europe, Asia, Americas, and South Asia with live weather & pricing insights.
          </p>
        </div>

        {/* Search Bar & Region Chips */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-black stroke-[3px] absolute left-4 top-4" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH BY CITY, COUNTRY OR LANDMARK..."
              className="w-full bg-white border-4 border-black text-black font-bold text-sm placeholder-black/50 uppercase pl-12 pr-4 py-3.5 focus:outline-none focus:bg-[#FFD93D] shadow-[6px_6px_0px_0px_#000]"
            />
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2">
            {["all", "Europe", "Asia", "South Asia", "Middle East"].map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
                  regionFilter === r
                    ? "bg-[#FF6B6B] text-white shadow-[2px_2px_0px_0px_#000]"
                    : "bg-white text-black hover:bg-[#FFD93D]"
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
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] card-neo-lift flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden border-b-4 border-black">
                <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#FFD93D] text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1">
                  <span>{city.landmarkSilhouette}</span>
                  <span>{city.landmark}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-black text-2xl uppercase tracking-tight text-black">
                      {city.name}, {city.country}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-black bg-[#FFD93D] px-2 py-0.5 border border-black shadow-[1px_1px_0px_0px_#000]">
                      <Star className="w-3.5 h-3.5 fill-black text-black" />
                      <span>{city.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-black/80 line-clamp-2 mb-4 uppercase leading-snug">
                    {city.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-4 border-t-3 border-black text-xs font-black">
                  <span className="bg-[#00E676] text-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    {city.avgDailyCost} / DAY
                  </span>
                  <button
                    onClick={() => navigate(`/trips/new?city=${city.id}`)}
                    className="px-4 py-2 bg-[#00E5FF] text-black font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] btn-neo-push hover:bg-[#00B0FF] cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                    <span>ADD TO TRIP</span>
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
