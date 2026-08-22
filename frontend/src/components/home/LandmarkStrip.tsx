import React from "react";

export const LandmarkStrip: React.FC = () => {
  const landmarks = [
    { name: "Taj Mahal", location: "Agra, India", icon: "🕌" },
    { name: "Eiffel Tower", location: "Paris, France", icon: "🗼" },
    { name: "Burj Khalifa", location: "Dubai, UAE", icon: "🏙️" },
    { name: "Fushimi Inari", location: "Kyoto, Japan", icon: "⛩️" },
    { name: "Colosseum", location: "Rome, Italy", icon: "🏛️" },
    { name: "Statue of Liberty", location: "New York, USA", icon: "🗽" },
    { name: "Sydney Opera House", location: "Sydney, Australia", icon: "🎭" },
  ];

  return (
    <div className="bg-navy-900 border-y border-white/10 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6 overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold text-gold-400 uppercase tracking-widest shrink-0 border-r border-white/10 pr-6">
          GLOBETROTTER LANDMARKS:
        </span>
        <div className="flex items-center gap-10 shrink-0">
          {landmarks.map((l) => (
            <div key={l.name} className="flex items-center gap-3 group cursor-pointer">
              <span className="text-2xl group-hover:scale-125 transition-transform">{l.icon}</span>
              <div>
                <span className="block text-xs font-bold text-white leading-none">{l.name}</span>
                <span className="text-[10px] text-slate-400">{l.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
