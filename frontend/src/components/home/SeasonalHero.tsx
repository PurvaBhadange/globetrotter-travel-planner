import React, { useState } from "react";
import { SEASONAL_CAMPAIGNS, SeasonalCampaign } from "../../data/mockTravelData";
import { Sparkles, Search, MapPin, Calendar, DollarSign, Sun, CloudRain, Snowflake, Sparkle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SeasonalHero: React.FC<{ onOpenBuildTripModal?: () => void }> = ({
  onOpenBuildTripModal,
}) => {
  const [activeSeason, setActiveSeason] = useState<keyof typeof SEASONAL_CAMPAIGNS>("summer");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const campaign: SeasonalCampaign = SEASONAL_CAMPAIGNS[activeSeason] || SEASONAL_CAMPAIGNS.summer;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/cities?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/search/cities");
    }
  };

  return (
    <div className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-navy-900 text-white py-16">
      {/* Background Hero Image with Subtle Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={campaign.heroImage}
          alt={campaign.title}
          className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-900/30" />
      </div>

      {/* Season Selector Tabs Bar */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2 p-1.5 bg-navy-900/80 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
        <span className="text-[10px] font-bold text-coral-500 uppercase tracking-widest px-2 hidden sm:inline">
          SEASON:
        </span>
        <button
          onClick={() => setActiveSeason("summer")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
            activeSeason === "summer" ? "bg-sky-500 text-white shadow-md" : "text-slate-300 hover:text-white"
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Summer</span>
        </button>
        <button
          onClick={() => setActiveSeason("monsoon")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
            activeSeason === "monsoon" ? "bg-emerald-500 text-white shadow-md" : "text-slate-300 hover:text-white"
          }`}
        >
          <CloudRain className="w-3.5 h-3.5" />
          <span>Monsoon</span>
        </button>
        <button
          onClick={() => setActiveSeason("winter")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
            activeSeason === "winter" ? "bg-blue-400 text-white shadow-md" : "text-slate-300 hover:text-white"
          }`}
        >
          <Snowflake className="w-3.5 h-3.5" />
          <span>Winter</span>
        </button>
        <button
          onClick={() => setActiveSeason("diwali")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
            activeSeason === "diwali" ? "bg-amber-500 text-white shadow-md" : "text-slate-300 hover:text-white"
          }`}
        >
          <Sparkle className="w-3.5 h-3.5" />
          <span>Diwali</span>
        </button>
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-coral-500/20 text-coral-400 border border-coral-500/30 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-lg backdrop-blur-sm">
          <span>{campaign.title}</span>
          <span>•</span>
          <span className="text-white">{campaign.destinations.slice(0, 3).join(", ")}</span>
        </div>

        <h1 className="font-jakarta text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          {campaign.tagline}
        </h1>

        <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto mb-8 font-body leading-relaxed">
          Discover handpicked destinations, build your day-by-day itinerary, collaborate live with your squad, and travel your way.
        </p>

        {/* Large Travel Search Card */}
        <form
          onSubmit={handleSearch}
          className="bg-navy-900/90 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-3xl shadow-2xl max-w-4xl mx-auto text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Field 1: Destination */}
            <div className="sm:col-span-2 relative bg-white/10 border border-white/15 rounded-2xl p-3 hover:border-coral-500 transition-colors">
              <label className="text-[10px] font-bold text-coral-400 uppercase tracking-widest block mb-1">
                WHERE TO?
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-300 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Paris, Kyoto, Goa, Switzerland..."
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm font-medium focus:outline-none"
                />
              </div>
            </div>

            {/* Field 2: Dates */}
            <div className="relative bg-white/10 border border-white/15 rounded-2xl p-3 hover:border-coral-500 transition-colors">
              <label className="text-[10px] font-bold text-coral-400 uppercase tracking-widest block mb-1">
                DATES / MONTH
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="text-sm text-slate-200 font-medium">Flexible / 7 Days</span>
              </div>
            </div>

            {/* Field 3: Budget */}
            <div className="relative bg-white/10 border border-white/15 rounded-2xl p-3 hover:border-coral-500 transition-colors">
              <label className="text-[10px] font-bold text-coral-400 uppercase tracking-widest block mb-1">
                MAX BUDGET
              </label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="text-sm text-slate-200 font-medium">₹50,000 / $1,500</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-300 overflow-x-auto w-full sm:w-auto">
              <span className="font-bold text-coral-400">TRENDING:</span>
              {campaign.destinations.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => navigate(`/search/cities?search=${dest}`)}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors whitespace-nowrap"
                >
                  {dest}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenBuildTripModal}
                className="flex-1 sm:flex-initial px-5 py-3 bg-gradient-to-r from-coral-500 to-gold-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-coral-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>✨ Build My Trip</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-navy-900 font-extrabold text-xs rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Explore</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
