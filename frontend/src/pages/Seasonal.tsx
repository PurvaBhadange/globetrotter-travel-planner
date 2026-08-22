import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEASONAL_CAMPAIGNS, SeasonalCampaign, CITIES } from "../data/mockTravelData";
import { Sun, CloudRain, Snowflake, Sparkle, Flame, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Seasonal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof SEASONAL_CAMPAIGNS>("monsoon");
  const navigate = useNavigate();

  const campaign: SeasonalCampaign = SEASONAL_CAMPAIGNS[activeTab] || SEASONAL_CAMPAIGNS.monsoon;

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-body">
      <Navbar />

      {/* Hero Banner Box */}
      <div className="relative py-16 bg-[#FFD93D] text-black border-b-8 border-black overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white font-black text-xs uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
            <Flame className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span>SEASONAL EXPLORER HUB</span>
          </div>

          <h1 className="font-black text-4xl sm:text-7xl text-black uppercase tracking-tighter mb-2 leading-none">
            {campaign.title}
          </h1>

          <p className="text-sm sm:text-xl font-bold text-black/90 max-w-xl mx-auto mb-8 uppercase tracking-wide">
            "{campaign.tagline}"
          </p>

          {/* Season Selector Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000]">
            <button
              onClick={() => setActiveTab("summer")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
                activeTab === "summer"
                  ? "bg-[#FF3D00] text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FFD93D]"
              }`}
            >
              <Sun className="w-4 h-4 stroke-[3px]" />
              <span>SUMMER</span>
            </button>

            <button
              onClick={() => setActiveTab("monsoon")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
                activeTab === "monsoon"
                  ? "bg-[#00E5FF] text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FFD93D]"
              }`}
            >
              <CloudRain className="w-4 h-4 stroke-[3px]" />
              <span>MONSOON</span>
            </button>

            <button
              onClick={() => setActiveTab("winter")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
                activeTab === "winter"
                  ? "bg-[#00E676] text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FFD93D]"
              }`}
            >
              <Snowflake className="w-4 h-4 stroke-[3px]" />
              <span>WINTER</span>
            </button>

            <button
              onClick={() => setActiveTab("diwali")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
                activeTab === "diwali"
                  ? "bg-[#FF2E93] text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FFD93D]"
              }`}
            >
              <Sparkle className="w-4 h-4 stroke-[3px]" />
              <span>DIWALI</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-black text-3xl uppercase tracking-tighter text-black mb-8 border-b-4 border-black pb-2">
          BEST DESTINATIONS THIS SEASON
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CITIES.slice(0, 3).map((city) => (
            <div
              key={city.id}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] card-neo-lift p-5 flex flex-col justify-between"
            >
              <div>
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="w-full h-44 object-cover border-3 border-black mb-4"
                />
                <h3 className="font-black text-2xl uppercase tracking-tight text-black">
                  {city.name}, {city.country}
                </h3>
                <p className="text-xs font-bold text-black/80 mt-1 mb-4 uppercase leading-snug">
                  {city.description}
                </p>
              </div>
              <button
                onClick={() => navigate(`/trips/new?city=${city.id}`)}
                className="w-full py-2.5 bg-[#FF6B6B] text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#000] btn-neo-push hover:bg-[#FF5722] cursor-pointer flex items-center justify-center gap-1"
              >
                <span>PLAN {city.name.toUpperCase()} TRIP</span>
                <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Seasonal;
