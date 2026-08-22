import React, { useState } from "react";
import { SEASONAL_CAMPAIGNS, SeasonalCampaign } from "../../data/mockTravelData";
import { Sparkles, Search, MapPin, Calendar, DollarSign, Sun, CloudRain, Snowflake, Sparkle, Flame } from "lucide-react";
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
    <div className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-[#FFFDF5] text-black py-12 border-b-8 border-black">
      {/* Background Graphic Box */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
        <img
          src={campaign.heroImage}
          alt={campaign.title}
          className="w-full h-full object-cover filter brightness-90 saturate-125 transition-all duration-500 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF5] via-[#FFFDF5]/40 to-transparent" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Season Selector Sticker Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-[#FFD93D] border-4 border-black shadow-[6px_6px_0px_0px_#000] mb-8 neo-sticker-tilt">
          <div className="flex items-center gap-1 px-2 py-1 bg-black text-white text-[11px] font-black uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span>SEASONAL ENGINE:</span>
          </div>

          <button
            onClick={() => setActiveSeason("summer")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
              activeSeason === "summer"
                ? "bg-[#FF3D00] text-white shadow-[2px_2px_0px_0px_#000]"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <Sun className="w-3.5 h-3.5 stroke-[3px]" />
            <span>Summer</span>
          </button>

          <button
            onClick={() => setActiveSeason("monsoon")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
              activeSeason === "monsoon"
                ? "bg-[#00E5FF] text-black shadow-[2px_2px_0px_0px_#000]"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 stroke-[3px]" />
            <span>Monsoon</span>
          </button>

          <button
            onClick={() => setActiveSeason("winter")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
              activeSeason === "winter"
                ? "bg-[#00E676] text-black shadow-[2px_2px_0px_0px_#000]"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <Snowflake className="w-3.5 h-3.5 stroke-[3px]" />
            <span>Winter</span>
          </button>

          <button
            onClick={() => setActiveSeason("diwali")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black cursor-pointer transition-all ${
              activeSeason === "diwali"
                ? "bg-[#FF2E93] text-white shadow-[2px_2px_0px_0px_#000]"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <Sparkle className="w-3.5 h-3.5 stroke-[3px]" />
            <span>Diwali</span>
          </button>
        </div>

        {/* Season Tagline Banner */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#FF6B6B] text-white font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_#000] rotate-[-1deg]">
            🔥 {campaign.title} • {campaign.destinations.slice(0, 3).join(", ").toUpperCase()}
          </span>
        </div>

        {/* Main Neo-Brutalist Display Headline */}
        <h1 className="font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-black mb-4 uppercase leading-[0.9]">
          {campaign.tagline.split(" ")[0]}{" "}
          <span className="bg-[#FFD93D] text-black px-2 border-4 border-black inline-block shadow-[4px_4px_0px_0px_#000] rotate-[1deg]">
            {campaign.tagline.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="text-base sm:text-xl font-bold text-black/80 max-w-2xl mx-auto mb-8 uppercase tracking-wide leading-snug">
          Discover handpicked destinations, build day-by-day itineraries, collaborate live with your squad, and travel your way.
        </p>

        {/* Neo-Brutalist Search Form Box */}
        <form
          onSubmit={handleSearch}
          className="bg-white border-4 border-black p-5 sm:p-6 shadow-[12px_12px_0px_0px_#000] max-w-4xl mx-auto text-left relative z-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Destination Input */}
            <div className="sm:col-span-2 relative bg-[#FFFDF5] border-3 border-black p-3 focus-within:bg-[#FFD93D] transition-colors">
              <label className="text-[10px] font-black text-black uppercase tracking-widest block mb-1">
                WHERE TO? (CITY / REGION)
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-black stroke-[3px] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Paris, Kyoto, Goa, Swiss Alps..."
                  className="w-full bg-transparent text-black font-bold text-base placeholder-black/50 focus:outline-none uppercase"
                />
              </div>
            </div>

            {/* Dates / Duration Input */}
            <div className="relative bg-[#FFFDF5] border-3 border-black p-3 focus-within:bg-[#FFD93D] transition-colors">
              <label className="text-[10px] font-black text-black uppercase tracking-widest block mb-1">
                DURATION
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-black stroke-[3px] shrink-0" />
                <span className="text-sm font-bold text-black uppercase">Flexible / 7 Days</span>
              </div>
            </div>

            {/* Budget Input */}
            <div className="relative bg-[#FFFDF5] border-3 border-black p-3 focus-within:bg-[#FFD93D] transition-colors">
              <label className="text-[10px] font-black text-black uppercase tracking-widest block mb-1">
                MAX BUDGET
              </label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-black stroke-[3px] shrink-0" />
                <span className="text-sm font-bold text-black uppercase">₹50,000 / $1,500</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t-3 border-black">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black overflow-x-auto w-full sm:w-auto">
              <span className="bg-[#FF6B6B] text-white px-2 py-0.5 border border-black shadow-[1px_1px_0px_0px_#000]">
                TRENDING:
              </span>
              {campaign.destinations.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => navigate(`/search/cities?search=${dest}`)}
                  className="px-2 py-1 bg-[#FFFDF5] border-2 border-black hover:bg-[#FFD93D] cursor-pointer whitespace-nowrap"
                >
                  {dest}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenBuildTripModal}
                className="flex-1 sm:flex-initial px-5 py-3 bg-[#FFD93D] text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_#000] btn-neo-push hover:bg-[#FFC107] cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 stroke-[3px]" />
                <span>✨ AI BUILD TRIP</span>
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-[#FF6B6B] text-white font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_#000] btn-neo-push hover:bg-[#FF5722] cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 stroke-[3px]" />
                <span>SEARCH →</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
