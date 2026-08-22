import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Sparkles, Plus, Search, User, Bell, Menu, X } from "lucide-react";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

export const Navbar: React.FC<{ onOpenBuildTripModal?: () => void }> = ({
  onOpenBuildTripModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Seasonal", path: "/seasonal" },
    { label: "Destinations", path: "/search/cities" },
    { label: "Activities", path: "/search/activities" },
    { label: "My Trips", path: "/trips" },
    { label: "Calendar", path: "/calendar" },
    { label: "Community", path: "/community" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-navy-900/90 backdrop-blur-md border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Landmark Emblem */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-coral-500 to-gold-500 p-0.5 shadow-lg shadow-coral-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center text-coral-500">
              <Compass className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-jakarta text-2xl font-extrabold tracking-tight text-white">
                Globe<span className="text-coral-500">Trotter</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-coral-500/20 text-coral-500 rounded-md font-bold uppercase tracking-widest hidden sm:inline-block border border-coral-500/30">
                PRO
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 tracking-wider hidden sm:block">
              One Globe. Endless Journeys.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-coral-500 text-white shadow-md shadow-coral-500/20"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Plan FAB */}
        <div className="flex items-center gap-3">
          {/* AI Build My Trip Button */}
          <button
            onClick={onOpenBuildTripModal}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-coral-500 to-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-coral-500/25 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>✨ Build My Trip</span>
          </button>

          {/* Quick Plan FAB Link */}
          <Link
            to="/trips/new"
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10"
            title="Create New Trip"
          >
            <Plus className="w-5 h-5 text-coral-500" />
          </Link>

          {/* User Profile Quick Access */}
          <Link
            to="/profile"
            className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 overflow-hidden hover:border-coral-500 transition-all flex items-center justify-center text-slate-300 hover:text-white"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 bg-white/10 rounded-xl lg:hidden text-white hover:bg-white/20"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 border-b border-white/10 px-4 py-4 space-y-2 animate-fadeIn">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBuildTripModal?.();
            }}
            className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-coral-500 to-gold-500 text-white text-sm font-bold rounded-xl shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>✨ AI Build My Trip</span>
          </button>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 text-xs font-semibold rounded-xl text-center border transition-all ${
                  location.pathname === link.path
                    ? "bg-coral-500 border-coral-500 text-white"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
