import React, { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { TravelPassport } from "../components/profile/TravelPassport";
import { User, Mail, Phone, MapPin, Globe, Edit3, Save } from "lucide-react";

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Purva",
    lastName: "Bhadange",
    email: "purva@habitflow.app",
    phone: "+91 98765 43210",
    city: "Pune",
    country: "India",
    bio: "Passionate traveler & frontend engineer. Exploring ancient shrines, modern cities, and hidden beach trails.",
  });

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
              ACCOUNT & PASSPORT
            </span>
            <h1 className="font-jakarta text-3xl font-black text-white">User Profile</h1>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/15 flex items-center gap-2 self-start sm:self-auto"
          >
            {isEditing ? <Save className="w-4 h-4 text-emerald-400" /> : <Edit3 className="w-4 h-4 text-coral-400" />}
            <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Profile Details */}
          <div className="bg-white/5 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Purva"
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-coral-500 bg-white/10 mb-3 shadow-lg"
              />
              <h3 className="font-jakarta text-xl font-bold text-white">{profile.firstName} {profile.lastName}</h3>
              <span className="text-xs text-slate-400">{profile.city}, {profile.country}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-black/20 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">EMAIL</span>
                <span className="text-white font-semibold">{profile.email}</span>
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">PHONE</span>
                <span className="text-white font-semibold">{profile.phone}</span>
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">TRAVEL BIO</span>
                <span className="text-slate-200 leading-relaxed block mt-1">{profile.bio}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Travel Passport */}
          <div className="lg:col-span-2">
            <TravelPassport />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
