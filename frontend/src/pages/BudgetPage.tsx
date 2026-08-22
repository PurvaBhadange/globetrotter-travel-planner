import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SplitwiseLedger } from "../components/budget/SplitwiseLedger";
import { TRIPS } from "../data/mockTravelData";
import { DollarSign, PieChart as PieIcon, ArrowRightLeft, Plus, AlertCircle } from "lucide-react";

export const BudgetPage: React.FC = () => {
  const currentTrip = TRIPS[0];
  const [userCurrency, setUserCurrency] = useState("INR");

  const total = currentTrip.budgetTotal;
  const spent = currentTrip.budgetSpent;
  const remaining = total - spent;
  const percent = Math.min(100, Math.round((spent / total) * 100));

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
              FINANCIAL INTELLIGENCE
            </span>
            <h1 className="font-jakarta text-3xl font-black text-white">Trip Budget & Cost Breakdown</h1>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
            <span className="text-xs font-bold text-slate-400">CURRENCY:</span>
            {["INR", "USD", "EUR", "JPY"].map((c) => (
              <button
                key={c}
                onClick={() => setUserCurrency(c)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  userCurrency === c ? "bg-coral-500 text-white" : "text-slate-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Live Budget Meter Banner */}
        <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-coral-400 uppercase tracking-widest">
              YOUR TRIP BUDGET
            </span>
            <span className="text-xs font-bold text-emerald-400">
              ₹{remaining.toLocaleString()} remaining
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-jakarta text-4xl font-black text-white">
              ₹{spent.toLocaleString()}
            </span>
            <span className="text-sm text-slate-400">/ ₹{total.toLocaleString()}</span>
          </div>

          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all ${
                percent > 90 ? "bg-red-500" : "bg-gradient-to-r from-coral-500 to-gold-500"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          {percent > 90 && (
            <div className="flex items-center gap-2 text-xs text-red-400 font-bold bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <AlertCircle className="w-4 h-4" />
              <span>Warning: Your trip is approaching maximum target budget!</span>
            </div>
          )}
        </div>

        {/* Budget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Squad Sync Splitwise Ledger */}
          <SplitwiseLedger squad={currentTrip.squad} currency={userCurrency} />

          {/* Right: Category Breakdown */}
          <div className="bg-white/5 border border-white/15 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-jakarta text-lg font-bold text-white mb-4">Expense Categories</h3>
            <div className="space-y-3">
              {[
                { category: "Stay & Hotels", amount: 85000, percent: 50, color: "bg-sky-500" },
                { category: "Flights & Trains", amount: 45000, percent: 26, color: "bg-coral-500" },
                { category: "Activities & Tours", amount: 28000, percent: 16, color: "bg-gold-500" },
                { category: "Meals & Food", amount: 14400, percent: 8, color: "bg-emerald-500" },
              ].map((cat, idx) => (
                <div key={idx} className="p-3.5 bg-black/20 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">{cat.category}</span>
                    <span className="text-slate-300">₹{cat.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetPage;
