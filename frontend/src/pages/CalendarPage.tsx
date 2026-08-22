import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { TRIPS } from "../data/mockTravelData";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const currentTrip = TRIPS[0];

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
              TIMELINE VISUALIZER
            </span>
            <h1 className="font-jakarta text-3xl font-black text-white">Trip Calendar</h1>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
            <button className="p-2 text-slate-300 hover:text-white rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-xs font-bold text-white px-2">JUNE 2026</span>
            <button className="p-2 text-slate-300 hover:text-white rounded-lg"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        {/* 7-Day Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-coral-400 uppercase tracking-wider">
          <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
        </div>

        {/* Monthly Grid */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {days.map((d) => {
            const isTripDay = d >= 12 && d <= 24;
            return (
              <div
                key={d}
                onClick={() => isTripDay && navigate(`/trips/${currentTrip.id}`)}
                className={`min-h-[100px] p-2.5 rounded-2xl border transition-all text-xs flex flex-col justify-between ${
                  isTripDay
                    ? "bg-coral-500/20 border-coral-500/60 hover:border-coral-500 cursor-pointer shadow-lg"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <span className="font-bold text-slate-300">{d}</span>
                {isTripDay && (
                  <div className="bg-coral-500 text-white p-1.5 rounded-xl text-[10px] font-bold truncate">
                    {currentTrip.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalendarPage;
