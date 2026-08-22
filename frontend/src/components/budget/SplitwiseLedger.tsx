import React, { useState } from "react";
import { Users, CheckCircle2, DollarSign, Plus, ArrowRightLeft } from "lucide-react";

export const SplitwiseLedger: React.FC<{
  squad: {
    name: string;
    avatar: string;
    role: string;
    balance: number;
  }[];
  currency?: string;
}> = ({ squad, currency = "INR" }) => {
  const [isSettling, setIsSettling] = useState(false);
  const [settledState, setSettledState] = useState(false);

  const handleSettle = () => {
    setIsSettling(true);
    setTimeout(() => {
      setIsSettling(false);
      setSettledState(true);
    }, 800);
  };

  return (
    <div className="bg-navy-900 border border-white/15 rounded-3xl p-6 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-400 border border-coral-500/30 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-jakarta text-lg font-bold text-white">Squad Sync Ledger</h3>
            <span className="text-xs text-slate-400">Splitwise-Style Expense Splits</span>
          </div>
        </div>

        <button
          onClick={handleSettle}
          disabled={settledState}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            settledState
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-coral-500 hover:bg-coral-600 text-white shadow-lg shadow-coral-500/20"
          }`}
        >
          {settledState ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>All Settled</span>
            </>
          ) : (
            <>
              <ArrowRightLeft className="w-4 h-4" />
              <span>Settle Up</span>
            </>
          )}
        </button>
      </div>

      {/* Squad Balances List */}
      <div className="space-y-3 mb-6">
        {squad.map((member, idx) => {
          const isOwed = member.balance > 0;
          const isOwner = member.role === "owner";

          return (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-xl border border-white/20 bg-white/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-jakarta text-sm font-bold text-white">{member.name}</span>
                    {isOwner && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-coral-500/20 text-coral-400 rounded-md font-bold uppercase">
                        OWNER
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 capitalize">{member.role}</span>
                </div>
              </div>

              {/* Balance Indicator Tag */}
              <div className="text-right">
                {settledState ? (
                  <span className="text-xs font-bold text-emerald-400">Settled</span>
                ) : member.balance === 0 ? (
                  <span className="text-xs font-bold text-slate-400">Settled</span>
                ) : isOwed ? (
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold">
                    Owed +₹{member.balance.toLocaleString()}
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-coral-500/20 text-coral-400 border border-coral-500/30 rounded-lg text-xs font-bold">
                    Owes -₹{Math.abs(member.balance).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
        <span>Equal 3-way expense split enabled</span>
        <button className="text-coral-400 font-bold hover:underline flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Split</span>
        </button>
      </div>
    </div>
  );
};
