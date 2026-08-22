import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Users, MapPin, Sparkles, TrendingUp, BarChart2 } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
            SYSTEM ANALYTICS
          </span>
          <h1 className="font-jakarta text-3xl font-black text-white">Admin Dashboard</h1>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <span className="text-slate-400 text-xs font-bold uppercase block">TOTAL USERS</span>
            <span className="font-jakarta text-3xl font-black text-white mt-1 block">1,482</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <span className="text-slate-400 text-xs font-bold uppercase block">TRIPS PLANNED</span>
            <span className="font-jakarta text-3xl font-black text-coral-400 mt-1 block">3,890</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <span className="text-slate-400 text-xs font-bold uppercase block">AI COPILOT ACCEPTANCE</span>
            <span className="font-jakarta text-3xl font-black text-emerald-400 mt-1 block">84.2%</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <span className="text-slate-400 text-xs font-bold uppercase block">ACTIVE SQUAD ROOMS</span>
            <span className="font-jakarta text-3xl font-black text-gold-400 mt-1 block">312</span>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="bg-white/5 border border-white/15 rounded-3xl p-6 shadow-2xl">
          <h3 className="font-jakarta text-lg font-bold text-white mb-4">Popular Destination Insights</h3>
          <div className="space-y-3">
            {[
              { name: "Paris, France", count: "1,240 Trips", percent: 85 },
              { name: "Kyoto, Japan", count: "980 Trips", percent: 68 },
              { name: "Goa, India", count: "890 Trips", percent: 62 },
              { name: "Interlaken, Switzerland", count: "720 Trips", percent: 50 },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 bg-black/20 rounded-xl border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">{item.name}</span>
                  <span className="text-coral-400">{item.count}</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-coral-500 to-gold-500 h-full rounded-full" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
