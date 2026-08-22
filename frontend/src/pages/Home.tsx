import React, { useState } from "react";
import { SeasonalHero } from "../components/home/SeasonalHero";
import { LandmarkStrip } from "../components/home/LandmarkStrip";
import { InteractiveWorldMap } from "../components/home/InteractiveWorldMap";
import { AiBuildMyTripModal } from "../components/home/AiBuildMyTripModal";
import { TravelPersonalityModal } from "../components/home/TravelPersonalityModal";
import { SurpriseMeModal } from "../components/home/SurpriseMeModal";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { CITIES, TRIPS } from "../data/mockTravelData";
import { Sparkles, Dices, UserCheck, ArrowRight, Star, Heart, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [buildTripOpen, setBuildTripOpen] = useState(false);
  const [personalityOpen, setPersonalityOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  const navigate = useNavigate();

  const categories = [
    { title: "FAMILY", icon: "👨‍👩‍👧‍👦", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80" },
    { title: "ROMANTIC", icon: "❤️", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
    { title: "ADVENTURE", icon: "🏔️", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80" },
    { title: "BEACH", icon: "🏖️", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" },
    { title: "FOOD", icon: "🍜", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
    { title: "CULTURE", icon: "📸", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-body">
      <Navbar onOpenBuildTripModal={() => setBuildTripOpen(true)} />

      {/* Hero Campaign */}
      <SeasonalHero onOpenBuildTripModal={() => setBuildTripOpen(true)} />

      {/* Landmark Silhouettes Banner */}
      <LandmarkStrip />

      {/* Neo-Brutalist Interactive Quick Tools Banner */}
      <section className="py-6 bg-[#FFD93D] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-4 text-center">
          <button
            onClick={() => setBuildTripOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#FF6B6B] text-white font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_#000] btn-neo-push hover:bg-[#FF5722] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 stroke-[3px]" />
            <span>✨ AI BUILD MY TRIP</span>
          </button>

          <button
            onClick={() => setPersonalityOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_#000] btn-neo-push hover:bg-gray-100 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#FF3D00] stroke-[3px]" />
            <span>TRAVEL PERSONALITY QUIZ</span>
          </button>

          <button
            onClick={() => setSurpriseOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#00E5FF] text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_#000] btn-neo-push hover:bg-[#00B0FF] cursor-pointer"
          >
            <Dices className="w-4 h-4 text-black stroke-[3px]" />
            <span>🎲 SURPRISE ME!</span>
          </button>
        </div>
      </section>

      {/* Quick Travel Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FF6B6B] text-white font-black text-[10px] uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
              <Flame className="w-3 h-3 text-[#FFD93D]" />
              <span>EXPLORE BY VIBE</span>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl text-black uppercase tracking-tighter">
              FIND YOUR TRAVEL VIBE
            </h2>
          </div>
          <button
            onClick={() => navigate("/search/cities")}
            className="px-4 py-2 bg-white text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD93D] cursor-pointer flex items-center gap-1"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <div
              key={c.title}
              onClick={() => navigate(`/search/cities?category=${c.title}`)}
              className="relative h-48 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] card-neo-lift cursor-pointer overflow-hidden group flex flex-col justify-between p-3"
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <span className="relative z-10 text-2xl bg-white p-1 border-2 border-black w-fit shadow-[2px_2px_0px_0px_#000]">
                {c.icon}
              </span>
              <div className="relative z-10 text-left">
                <h4 className="font-black text-base text-white uppercase tracking-wider leading-none drop-shadow-[2px_2px_0px_#000]">
                  {c.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Destinations Cards */}
      <section className="py-16 bg-[#FFFDF5] border-y-8 border-black neo-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div>
              <span className="px-2.5 py-1 bg-[#00E676] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_#000] inline-block mb-2">
                HANDPICKED FOR YOU
              </span>
              <h2 className="font-black text-3xl sm:text-5xl uppercase tracking-tighter text-black">
                TRENDING DESTINATIONS
              </h2>
            </div>
            <button
              onClick={() => navigate("/search/cities")}
              className="px-4 py-2 bg-[#FFD93D] text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFC107] cursor-pointer flex items-center gap-1"
            >
              <span>EXPLORE ALL</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.slice(0, 3).map((city) => (
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
                  <button className="absolute top-3 right-3 p-2 bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FF6B6B] hover:text-white transition-colors cursor-pointer">
                    <Heart className="w-4 h-4 stroke-[3px]" />
                  </button>
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
                    <p className="text-xs font-bold text-black/80 line-clamp-2 mb-4 leading-snug uppercase">
                      {city.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-4 border-t-3 border-black text-xs font-black">
                    <span className="bg-[#00E676] text-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                      {city.avgDailyCost} / DAY
                    </span>
                    <button
                      onClick={() => navigate(`/trips/new?city=${city.id}`)}
                      className="px-4 py-2 bg-[#FF6B6B] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000] btn-neo-push hover:bg-[#FF5722] cursor-pointer"
                    >
                      PLAN TRIP →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive World Map */}
      <InteractiveWorldMap />

      {/* Featured Trips Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <span className="px-2.5 py-1 bg-[#C4B5FD] text-black font-black text-xs uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_#000] inline-block mb-2">
              COMMUNITY SHOWCASE
            </span>
            <h2 className="font-black text-3xl sm:text-4xl uppercase tracking-tighter text-black">
              POPULAR COMMUNITY ITINERARIES
            </h2>
          </div>
          <button
            onClick={() => navigate("/trips")}
            className="px-4 py-2 bg-white text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFD93D] cursor-pointer flex items-center gap-1"
          >
            <span>MY TRIPS</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRIPS.slice(0, 2).map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/trips/${t.id}`)}
              className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_#000] card-neo-lift cursor-pointer overflow-hidden p-5 flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden border-2 border-black mb-4">
                <img src={t.coverPhotoUrl} alt={t.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#FF6B6B] text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  {t.durationDays} DAYS • {t.cities.join(" · ")}
                </div>
              </div>

              <div>
                <h3 className="font-black text-2xl uppercase tracking-tight text-black mb-2">{t.title}</h3>
                <p className="text-xs font-bold text-black/80 line-clamp-2 mb-4 leading-snug uppercase">
                  {t.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-black pt-3 border-t-3 border-black">
                <span className="bg-[#00E5FF] text-black px-2.5 py-1 border-2 border-black">
                  PLANNED: {t.planningProgress}%
                </span>
                <span className="text-black hover:bg-[#FFD93D] px-2 py-1 border-2 border-black flex items-center gap-1">
                  <span>VIEW ITINERARY</span>
                  <ArrowRight className="w-4 h-4 stroke-[3px]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AiBuildMyTripModal isOpen={buildTripOpen} onClose={() => setBuildTripOpen(false)} />
      <TravelPersonalityModal isOpen={personalityOpen} onClose={() => setPersonalityOpen(false)} />
      <SurpriseMeModal isOpen={surpriseOpen} onClose={() => setSurpriseOpen(false)} />
    </div>
  );
};

export default Home;
