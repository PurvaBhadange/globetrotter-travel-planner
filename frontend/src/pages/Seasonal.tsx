import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEASONAL_CAMPAIGNS, SeasonalCampaign, CITIES } from "../data/mockTravelData";
import { Sun, CloudRain, Snowflake, Sparkle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Seasonal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof SEASONAL_CAMPAIGNS>("monsoon");
  const navigate = useNavigate();

  const campaign: SeasonalCampaign = SEASONAL_CAMPAIGNS[activeTab] || SEASONAL_CAMPAIGNS.monsoon;

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <div className="relative py-20 bg-navy-900 text-white border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={campaign.heroImage} alt={campaign.title} className="w-full h-full object-cover filter brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-2">
            SEASONAL TRAVEL HUB
          </span>
          <h1 className="font-jakarta text-4xl sm:text-6xl font-black text-white mb-4">
            {campaign.title}
          </h1>
          <p className="text-lg text-slate-200 max-w-xl mx-auto mb-8 font-body">
            "{campaign.tagline}"
          </p>

          <div className="inline-flex items-center gap-2 p-1.5 bg-navy-900/80 backdrop-blur-md rounded-full border border-white/20">
            <button
              onClick={() => setActiveTab("summer")}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                activeTab === "summer" ? "bg-sky-500 text-white shadow-md" : "text-slate-300"
              }`}
            >
              Summer
            </button>
            <button
              onClick={() => setActiveTab("monsoon")}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                activeTab === "monsoon" ? "bg-emerald-500 text-white shadow-md" : "text-slate-300"
              }`}
            >
              Monsoon
            </button>
            <button
              onClick={() => setActiveTab("winter")}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                activeTab === "winter" ? "bg-blue-400 text-white shadow-md" : "text-slate-300"
              }`}
            >
              Winter
            </button>
            <button
              onClick={() => setActiveTab("diwali")}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                activeTab === "diwali" ? "bg-amber-500 text-white shadow-md" : "text-slate-300"
              }`}
            >
              Diwali
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-jakarta text-2xl font-bold text-white mb-6">Best Destinations This Season</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CITIES.slice(0, 3).map((city) => (
            <div key={city.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-4">
              <img src={city.imageUrl} alt={city.name} className="w-full h-40 object-cover rounded-xl mb-3" />
              <h3 className="font-jakarta text-lg font-bold text-white">{city.name}, {city.country}</h3>
              <p className="text-xs text-slate-300 mt-1 mb-3">{city.description}</p>
              <button
                onClick={() => navigate(`/trips/new?city=${city.id}`)}
                className="w-full py-2 bg-coral-500 text-white text-xs font-bold rounded-xl"
              >
                Plan {city.name} Trip
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
