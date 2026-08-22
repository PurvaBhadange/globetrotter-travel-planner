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
import { Sparkles, Dices, UserCheck, ArrowRight, Star, Heart, MapPin, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [buildTripOpen, setBuildTripOpen] = useState(false);
  const [personalityOpen, setPersonalityOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  const navigate = useNavigate();

  const categories = [
    { title: "Family", icon: "👨‍👩‍👧‍👦", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80" },
    { title: "Romantic", icon: "❤️", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
    { title: "Adventure", icon: "🏔️", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80" },
    { title: "Beach", icon: "🏖️", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" },
    { title: "Food", icon: "🍜", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" },
    { title: "Culture", icon: "📸", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar onOpenBuildTripModal={() => setBuildTripOpen(true)} />

      {/* Hero Campaign */}
      <SeasonalHero onOpenBuildTripModal={() => setBuildTripOpen(true)} />

      {/* Landmark Silhouettes Banner */}
      <LandmarkStrip />

      {/* Interactive Quick Tools Banner */}
      <section className="py-8 bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-4 text-center">
          <button
            onClick={() => setBuildTripOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-coral-500 to-gold-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-coral-500/20 hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            <span>✨ AI Build My Trip</span>
          </button>

          <button
            onClick={() => setPersonalityOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs rounded-2xl transition-all"
          >
            <UserCheck className="w-4 h-4 text-coral-400" />
            <span>What kind of traveler are you?</span>
          </button>

          <button
            onClick={() => setSurpriseOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs rounded-2xl transition-all"
          >
            <Dices className="w-4 h-4 text-gold-400" />
            <span>🎲 Surprise Me!</span>
          </button>
        </div>
      </section>

      {/* Quick Travel Categories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
              CATEGORIES
            </span>
            <h2 className="font-jakarta text-3xl font-black text-white">Find Your Travel Vibe</h2>
          </div>
          <button
            onClick={() => navigate("/search/cities")}
            className="text-xs font-bold text-coral-400 hover:text-coral-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <div
              key={c.title}
              onClick={() => navigate(`/search/cities?category=${c.title}`)}
              className="relative h-44 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-coral-500 transition-all shadow-lg"
            >
              <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
              <div className="absolute bottom-3 left-3 text-left">
                <span className="text-xl">{c.icon}</span>
                <h4 className="font-jakarta text-sm font-bold text-white leading-tight">{c.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Destinations Cards */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
                TOP SELECTIONS
              </span>
              <h2 className="font-jakarta text-3xl sm:text-4xl font-black text-white">
                Trending Destinations
              </h2>
            </div>
            <button
              onClick={() => navigate("/search/cities")}
              className="text-xs font-bold text-coral-400 hover:text-coral-300 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.slice(0, 3).map((city) => (
              <div
                key={city.id}
                className="bg-navy-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl group hover:border-coral-500/50 transition-all flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-navy-900/80 backdrop-blur-md rounded-full text-xs font-bold text-coral-400 border border-white/20 flex items-center gap-1">
                    <span>{city.landmarkSilhouette}</span>
                    <span>{city.landmark}</span>
                  </div>
                  <div className="absolute top-4 right-4 p-2 bg-navy-900/80 rounded-full text-slate-300 hover:text-coral-500 transition-colors">
                    <Heart className="w-4 h-4" />
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
                      className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                      Plan Trip
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
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
              MAGAZINE SHOWCASE
            </span>
            <h2 className="font-jakarta text-3xl font-black text-white">Popular Community Trips</h2>
          </div>
          <button
            onClick={() => navigate("/trips")}
            className="text-xs font-bold text-coral-400 hover:text-coral-300 flex items-center gap-1"
          >
            <span>My Trips</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRIPS.slice(0, 2).map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/trips/${t.id}`)}
              className="relative h-80 rounded-3xl overflow-hidden border border-white/15 group cursor-pointer shadow-2xl"
            >
              <img src={t.coverPhotoUrl} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />

              <div className="absolute top-4 left-4 px-3 py-1 bg-coral-500 text-white font-bold text-xs rounded-full uppercase tracking-wider shadow-md">
                {t.durationDays} DAYS • {t.cities.join(" · ")}
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="font-jakarta text-2xl font-black text-white mb-2">{t.title}</h3>
                <p className="text-xs text-slate-200 line-clamp-2 mb-4 leading-relaxed">{t.description}</p>
                <div className="flex items-center justify-between text-xs font-bold text-coral-400 pt-2 border-t border-white/20">
                  <span>Progress: {t.planningProgress}% Planned</span>
                  <span className="text-white hover:underline flex items-center gap-1">
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
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
