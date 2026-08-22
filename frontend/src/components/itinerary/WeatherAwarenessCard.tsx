import React from "react";
import { Sun, CloudRain, ShieldAlert, Check } from "lucide-react";

export const WeatherAwarenessCard: React.FC<{
  cityName: string;
  temp: string;
  rainProb: string;
  condition: string;
  packingList: string[];
}> = ({ cityName, temp, rainProb, condition, packingList }) => {
  return (
    <div className="bg-navy-900 border border-white/15 rounded-2xl p-5 text-white shadow-xl">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            {parseInt(rainProb) > 20 ? <CloudRain className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="font-jakarta text-sm font-bold text-white">{cityName} Weather</h4>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">{condition}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="font-jakarta text-xl font-extrabold text-white">{temp}</span>
          <span className="block text-[10px] text-sky-400 font-medium">Rain: {rainProb}</span>
        </div>
      </div>

      {/* Auto-generated Packing List */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-coral-400 uppercase tracking-widest mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Recommended Packing</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {packingList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-200 truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
