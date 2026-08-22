import React from "react";
import { Activity } from "../../data/mockTravelData";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";

export const TravelStoryMode: React.FC<{
  tripTitle: string;
  activities: Activity[];
}> = ({ tripTitle, activities }) => {
  return (
    <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Story Mode Banner */}
      <div className="text-center bg-gradient-to-r from-coral-500/20 via-navy-900 to-sky-500/20 border border-white/15 p-8 rounded-3xl">
        <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-2">
          📖 TRAVEL STORY JOURNAL
        </span>
        <h2 className="font-jakarta text-3xl sm:text-5xl font-black text-white mb-2">
          {tripTitle}
        </h2>
        <p className="text-sm text-slate-300">
          A visual day-by-day story guide through unforgettable experiences.
        </p>
      </div>

      {/* Story Narrative Cards */}
      <div className="space-y-8">
        {activities.map((act, index) => (
          <div
            key={act.id}
            className="bg-navy-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]"
          >
            {/* Cinematic Hero Image */}
            <div className="relative h-72 sm:h-96 w-full">
              <img src={act.imageUrl} alt={act.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-coral-500 text-white font-black text-xs rounded-full uppercase tracking-wider shadow-md">
                DAY {index + 1} • {act.cityName}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-navy-900/80 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                <span>{act.rating}</span>
              </div>
            </div>

            {/* Story Content Details */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
                    {act.category}
                  </span>
                  <h3 className="font-jakarta text-2xl font-bold text-white">{act.name}</h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>{act.durationMinutes} mins</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{act.cost > 0 ? `${act.currency} ${act.cost}` : "Free"}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 font-body leading-relaxed mb-4">
                "{act.description}"
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 p-3 rounded-xl border border-white/10">
                <MapPin className="w-4 h-4 text-coral-500 shrink-0" />
                <span>{act.location}</span>
                {act.travelTimeFromPrev && (
                  <span className="ml-auto text-sky-400 font-medium">({act.travelTimeFromPrev})</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
