import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Sparkles, Plus, User, Menu, X } from "lucide-react";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

export const Navbar: React.FC<{ onOpenBuildTripModal?: () => void }> = ({
  onOpenBuildTripModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "SEASONAL", path: "/seasonal" },
    { label: "CITIES", path: "/search/cities" },
    { label: "ACTIVITIES", path: "/search/activities" },
    { label: "MY TRIPS", path: "/trips" },
    { label: "CALENDAR", path: "/calendar" },
    { label: "COMMUNITY", path: "/community" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF5] border-b-4 border-black text-black">
      {/* Theme Switcher Widget */}
      <ThemeSwitcher />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Neo-Brutalist Sticker Box */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#FFD93D] border-3 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center text-black group-hover:rotate-6 transition-transform">
            <Compass className="w-6 h-6 stroke-[3px]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl tracking-tighter uppercase text-black">
                GLOBE<span className="bg-[#FF6B6B] px-1 text-white border border-black shadow-[2px_2px_0px_0px_#000]">TROTTER</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#00E676] text-black font-black uppercase tracking-widest border border-black shadow-[1px_1px_0px_0px_#000] hidden sm:inline-block">
                PRO v2.0
              </span>
            </div>
            <span className="text-[10px] font-black text-black/70 tracking-widest uppercase hidden sm:block">
              ONE GLOBE. ENDLESS JOURNEYS.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 p-1 bg-white border-3 border-black shadow-[4px_4px_0px_0px_#000]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all duration-100 ${
                  isActive
                    ? "bg-[#FF6B6B] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                    : "text-black hover:bg-[#FFD93D] hover:border-2 hover:border-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* AI Build My Trip Button */}
          <button
            onClick={onOpenBuildTripModal}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#FFD93D] text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_#000] btn-neo-push hover:bg-[#FFC107] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black stroke-[3px]" />
            <span>✨ AI BUILD TRIP</span>
          </button>

          {/* Quick Create Button */}
          <Link
            to="/trips/new"
            className="p-2.5 bg-[#00E5FF] text-black border-3 border-black shadow-[3px_3px_0px_0px_#000] btn-neo-push hover:bg-[#00B0FF]"
            title="Create New Trip"
          >
            <Plus className="w-5 h-5 stroke-[3.5px]" />
          </Link>

          {/* Profile Access Button */}
          <Link
            to="/profile"
            className="w-10 h-10 bg-white border-3 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center text-black hover:bg-[#C4B5FD] transition-colors"
            title="User Profile"
          >
            <User className="w-5 h-5 stroke-[2.5px]" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] xl:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFFDF5] border-t-4 border-black px-4 py-4 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBuildTripModal?.();
            }}
            className="w-full flex items-center justify-center gap-2 p-3 bg-[#FFD93D] text-black text-sm font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_#000] btn-neo-push"
          >
            <Sparkles className="w-4 h-4 stroke-[3px]" />
            <span>✨ AI BUILD MY TRIP</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 text-xs font-black uppercase tracking-wider text-center border-3 border-black shadow-[3px_3px_0px_0px_#000] ${
                  location.pathname === link.path
                    ? "bg-[#FF6B6B] text-white"
                    : "bg-white text-black hover:bg-[#FFD93D]"
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
