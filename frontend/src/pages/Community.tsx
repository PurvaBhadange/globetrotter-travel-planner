import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Heart, MessageSquare, Share2, Copy, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Community: React.FC = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: "post-1",
      author: "Atharva K.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Atharva",
      tripTitle: "7 Days in Japan 🇯🇵",
      route: "Tokyo → Kyoto → Osaka",
      content: "Just returned from an unforgettable spring journey through Japan! The Fushimi Inari torii gates at sunrise were pure magic.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      likes: 142,
      comments: 18,
    },
    {
      id: "post-2",
      author: "Vedant S.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vedant",
      tripTitle: "European Summer Classics 🇪🇺",
      route: "Paris → Amsterdam → Rome",
      content: "Best 12-day Western Europe route under €1,850. Don't miss the sunset river cruise along the Seine!",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      likes: 98,
      comments: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-900 text-white font-body">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-coral-400 uppercase tracking-widest block mb-1">
            WANDERLUST FEED
          </span>
          <h1 className="font-jakarta text-3xl sm:text-4xl font-black text-white">
            Travel Community
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto mt-1">
            Discover itineraries shared by fellow travelers and copy them to your own trip journal with one click.
          </p>
        </div>

        {/* Community Feed Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/5 border border-white/15 rounded-3xl overflow-hidden p-6 shadow-2xl space-y-4">
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border border-white/20 bg-white/10" />
                  <div>
                    <h4 className="font-jakarta text-sm font-bold text-white">{post.author}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{post.route}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert(`Copied "${post.tripTitle}" to your trips!`);
                    navigate("/trips/new");
                  }}
                  className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy This Trip</span>
                </button>
              </div>

              {/* Title & Content */}
              <h3 className="font-jakarta text-xl font-bold text-white">{post.tripTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

              {/* Photo */}
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img src={post.image} alt={post.tripTitle} className="w-full h-full object-cover" />
              </div>

              {/* Social Interactions */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-coral-500 cursor-pointer"><Heart className="w-4 h-4" /> {post.likes}</span>
                  <span className="flex items-center gap-1 hover:text-sky-400 cursor-pointer"><MessageSquare className="w-4 h-4" /> {post.comments}</span>
                </div>
                <button className="hover:text-white flex items-center gap-1"><Share2 className="w-4 h-4" /> Share</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
