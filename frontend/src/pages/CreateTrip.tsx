import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { CITIES } from "../data/mockTravelData";
import { ArrowRight, ArrowLeft, Check, Calendar, MapPin, DollarSign, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CreateTrip: React.FC = () => {
  const [step, setStep] = useState(1);
  const [tripName, setTripName] = useState("Grand European Adventure");
  const [startDate, setStartDate] = useState("2026-07-10");
  const [endDate, setEndDate] = useState("2026-07-20");
  const [selectedCityIds, setSelectedCityIds] = useState<string[]>(["paris", "switzerland"]);
  const [budget, setBudget] = useState("150000");

  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else navigate("/trips/trip-1/build");
  };

  const steps = [
    { num: 1, label: "Trip Details" },
    { num: 2, label: "Destinations" },
    { num: 3, label: "Activities" },
    { num: 4, label: "Budget" },
    { num: 5, label: "Review" },
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
            GUIDED PLANNER
          </span>
          <h1 className="font-jakarta text-3xl sm:text-4xl font-black text-white">
            Plan a New Journey
          </h1>
        </div>

        {/* 5-Step Progress Bar */}
        <div className="flex items-center justify-between mb-10 bg-white/5 p-4 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
          {steps.map((s) => (
            <div key={s.num} className="flex items-center gap-2 shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= s.num ? "bg-coral-500 text-white" : "bg-white/10 text-slate-400"
              }`}>
                {s.num}
              </div>
              <span className={`text-xs font-bold ${step >= s.num ? "text-white" : "text-slate-400"}`}>
                {s.label}
              </span>
              {s.num < 5 && <span className="text-slate-600 mx-2">•</span>}
            </div>
          ))}
        </div>

        {/* Step Container Card */}
        <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="font-jakarta text-xl font-bold text-white mb-4">Step 1: Basic Trip Details</h3>
              <div>
                <label className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-2">TRIP NAME</label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white text-sm rounded-xl p-3.5 focus:outline-none focus:border-coral-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-2">START DATE</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white/10 border border-white/15 text-white text-sm rounded-xl p-3.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-2">END DATE</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white/10 border border-white/15 text-white text-sm rounded-xl p-3.5 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-jakarta text-xl font-bold text-white mb-2">Step 2: Choose Destinations</h3>
              <p className="text-xs text-slate-300 mb-4">Select cities to include in your journey route:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CITIES.map((c) => {
                  const selected = selectedCityIds.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        if (selected) setSelectedCityIds(selectedCityIds.filter((id) => id !== c.id));
                        else setSelectedCityIds([...selectedCityIds, c.id]);
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        selected ? "bg-coral-500/20 border-coral-500 text-white" : "bg-white/5 border-white/10 text-slate-300"
                      }`}
                    >
                      <span className="text-xl">{c.landmarkSilhouette}</span>
                      <div>
                        <span className="font-bold text-xs block">{c.name}</span>
                        <span className="text-[10px] text-slate-400">{c.country}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-jakarta text-xl font-bold text-white mb-2">Step 3: Activities & Pacing</h3>
              <p className="text-xs text-slate-300">Default activities have been auto-added to your timeline.</p>
              <div className="p-4 bg-black/20 rounded-2xl text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Check className="w-4 h-4" />
                  <span>Eiffel Tower Summit Access scheduled on Day 1</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Check className="w-4 h-4" />
                  <span>Jungfraujoch Alpine Pass scheduled on Day 4</span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-jakarta text-xl font-bold text-white mb-2">Step 4: Target Budget</h3>
              <div>
                <label className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-2">TARGET BUDGET (INR ₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white text-lg font-bold rounded-xl p-3.5 focus:outline-none"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-jakarta text-xl font-bold text-white mb-2">Step 5: Review & Launch</h3>
              <div className="bg-black/20 p-4 rounded-2xl text-xs space-y-2">
                <p><strong>Title:</strong> {tripName}</p>
                <p><strong>Dates:</strong> {startDate} to {endDate}</p>
                <p><strong>Cities:</strong> {selectedCityIds.join(", ")}</p>
                <p><strong>Target Budget:</strong> ₹{parseInt(budget).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center gap-2"
          >
            <span>{step === 5 ? "Launch Itinerary Builder" : "Next Step"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateTrip;
