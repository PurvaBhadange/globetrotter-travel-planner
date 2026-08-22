export interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  costIndex: number;
  popularityScore: number;
  imageUrl: string;
  landmark: string;
  landmarkSilhouette: string;
  weather: {
    temp: string;
    rainProb: string;
    season: string;
    condition: string;
    packing: string[];
  };
  bestMonths: string[];
  avgDailyCost: string;
  rating: number;
  description: string;
}

export interface Activity {
  id: string;
  cityId: string;
  cityName: string;
  name: string;
  category: "sightseeing" | "food" | "adventure" | "culture" | "nature" | "nightlife" | "shopping";
  description: string;
  cost: number;
  currency: string;
  durationMinutes: number;
  imageUrl: string;
  rating: number;
  location: string;
  travelTimeFromPrev?: string;
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  coverPhotoUrl: string;
  cities: string[];
  startDate: string;
  endDate: string;
  durationDays: number;
  status: "ongoing" | "upcoming" | "completed";
  budgetTotal: number;
  budgetSpent: number;
  currency: string;
  shareToken: string;
  planningProgress: number; // percentage
  squad: {
    name: string;
    avatar: string;
    role: "owner" | "editor" | "viewer";
    balance: number; // positive = owed to user, negative = user owes
  }[];
}

export interface SeasonalCampaign {
  id: "summer" | "monsoon" | "winter" | "diwali" | "christmas";
  title: string;
  tagline: string;
  heroImage: string;
  accentColor: string;
  destinations: string[];
  highlights: string[];
}

export interface TravelPersonality {
  id: string;
  title: string;
  icon: string;
  description: string;
  recommendedPlaces: string[];
}

export const CITIES: City[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    costIndex: 85,
    popularityScore: 98,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    landmark: "Eiffel Tower",
    landmarkSilhouette: "🗼",
    weather: {
      temp: "18°C",
      rainProb: "20%",
      season: "Autumn / Spring",
      condition: "Partly Cloudy",
      packing: ["Light jacket", "Comfortable walking shoes", "Compact umbrella", "Sunglasses"],
    },
    bestMonths: ["APR", "MAY", "JUN", "SEP", "OCT"],
    avgDailyCost: "$150 / day",
    rating: 4.9,
    description: "The City of Light boasts romantic boulevards, iconic monuments, world-class art, and unforgettable gastronomy.",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    costIndex: 78,
    popularityScore: 95,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    landmark: "Fushimi Inari Shrine",
    landmarkSilhouette: "⛩️",
    weather: {
      temp: "21°C",
      rainProb: "15%",
      season: "Autumn Foliage",
      condition: "Clear Skies",
      packing: ["Camera", "Layered clothing", "Easy slip-off shoes", "Matcha kit"],
    },
    bestMonths: ["MAR", "APR", "OCT", "NOV"],
    avgDailyCost: "$120 / day",
    rating: 4.95,
    description: "Japan's cultural heart filled with thousands of classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.",
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    region: "South Asia",
    costIndex: 45,
    popularityScore: 92,
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    landmark: "Basilica of Bom Jesus",
    landmarkSilhouette: "⛪",
    weather: {
      temp: "29°C",
      rainProb: "10%",
      season: "Sunny Season",
      condition: "Sunny & Breeze",
      packing: ["Sunscreen", "Beachwear", "Flip flops", "Waterproof pouch"],
    },
    bestMonths: ["NOV", "DEC", "JAN", "FEB"],
    avgDailyCost: "₹3,500 / day",
    rating: 4.8,
    description: "Sun-drenched beaches, Portuguese colonial architecture, vibrant shacks, and tropical palm groves.",
  },
  {
    id: "switzerland",
    name: "Interlaken",
    country: "Switzerland",
    region: "Europe",
    costIndex: 95,
    popularityScore: 96,
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    landmark: "Jungfraujoch",
    landmarkSilhouette: "🏔️",
    weather: {
      temp: "12°C",
      rainProb: "30%",
      season: "Alpine Spring",
      condition: "Misty Mountains",
      packing: ["Thermal layers", "Hiking boots", "Windbreaker", "Swiss pass"],
    },
    bestMonths: ["MAY", "JUN", "JUL", "AUG", "DEC"],
    avgDailyCost: "$220 / day",
    rating: 4.98,
    description: "Traditional Swiss alpine town nestled between emerald waters of Lake Thun and Lake Brienz.",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    costIndex: 88,
    popularityScore: 94,
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    landmark: "Burj Khalifa",
    landmarkSilhouette: "🏙️",
    weather: {
      temp: "32°C",
      rainProb: "0%",
      season: "Winter Sun",
      condition: "Bright Sun",
      packing: ["Light linen", "Sunglasses", "Desert safari scarf", "Swimwear"],
    },
    bestMonths: ["NOV", "DEC", "JAN", "FEB", "MAR"],
    avgDailyCost: "$190 / day",
    rating: 4.85,
    description: "Futuristic luxury, record-breaking skyscrapers, mega malls, and thrilling desert dune safaris.",
  },
  {
    id: "agra",
    name: "Agra",
    country: "India",
    region: "South Asia",
    costIndex: 40,
    popularityScore: 97,
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    landmark: "Taj Mahal",
    landmarkSilhouette: "🕌",
    weather: {
      temp: "24°C",
      rainProb: "5%",
      season: "Pleasant Winter",
      condition: "Hazy Sunrise",
      packing: ["Cotton clothes", "Sun hat", "Camera tripod", "Water bottle"],
    },
    bestMonths: ["OCT", "NOV", "DEC", "JAN", "FEB"],
    avgDailyCost: "₹2,800 / day",
    rating: 4.92,
    description: "Home to the world's most iconic marble mausoleum, Mughal forts, and historic heritage.",
  },
];

export const ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    cityId: "paris",
    cityName: "Paris",
    name: "Eiffel Tower Summit Access",
    category: "sightseeing",
    description: "Ascend to the top tier of the iron lady for panoramic 360° views over the rooftops of Paris.",
    cost: 38,
    currency: "EUR",
    durationMinutes: 120,
    imageUrl: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    location: "Champ de Mars, 5 Av. Anatole France",
    travelTimeFromPrev: "15 min walk from Hotel",
  },
  {
    id: "act-2",
    cityId: "paris",
    cityName: "Paris",
    name: "Louvre Museum Masterpieces Tour",
    category: "culture",
    description: "Skip-the-line guided visit seeing the Mona Lisa, Venus de Milo, and Winged Victory of Samothrace.",
    cost: 45,
    currency: "EUR",
    durationMinutes: 180,
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
    rating: 4.85,
    location: "Rue de Rivoli, 75001 Paris",
    travelTimeFromPrev: "10 min Metro",
  },
  {
    id: "act-3",
    cityId: "paris",
    cityName: "Paris",
    name: "Seine Sunset Dinner Cruise",
    category: "food",
    description: "3-course gourmet French dinner with live violin music while sailing past illuminated Parisian landmarks.",
    cost: 85,
    currency: "EUR",
    durationMinutes: 150,
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    location: "Port de la Bourdonnais",
    travelTimeFromPrev: "12 min Taxi",
  },
  {
    id: "act-4",
    cityId: "kyoto",
    cityName: "Kyoto",
    name: "Fushimi Inari Torii Path Hike",
    category: "sightseeing",
    description: "Walk through 10,000 vermilion torii gates winding up the sacred Mount Inari.",
    cost: 0,
    currency: "JPY",
    durationMinutes: 120,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: 4.96,
    location: "Fushimi Ward, Kyoto",
    travelTimeFromPrev: "20 min Train",
  },
  {
    id: "act-5",
    cityId: "goa",
    cityName: "Goa",
    name: "Baga Beach Sunset Catamaran",
    category: "adventure",
    description: "Sail into the Arabian Sea with live music, drinks, and dolphin spotting opportunities.",
    cost: 1500,
    currency: "INR",
    durationMinutes: 90,
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    rating: 4.75,
    location: "Baga Beach, North Goa",
    travelTimeFromPrev: "5 min Walk",
  },
];

export const TRIPS: Trip[] = [
  {
    id: "trip-1",
    title: "European Summer Escape",
    description: "Paris, Amsterdam & Rome — 12 Days across Western Europe's greatest cultural treasures.",
    coverPhotoUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    cities: ["Paris", "Amsterdam", "Rome"],
    startDate: "2026-06-12",
    endDate: "2026-06-24",
    durationDays: 12,
    status: "upcoming",
    budgetTotal: 240000,
    budgetSpent: 172400,
    currency: "INR",
    shareToken: "euro-summer-2026",
    planningProgress: 72,
    squad: [
      { name: "Purva (You)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Purva", role: "owner", balance: 2400 },
      { name: "Atharva", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Atharva", role: "editor", balance: -1200 },
      { name: "Vedant", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vedant", role: "editor", balance: -1200 },
    ],
  },
  {
    id: "trip-2",
    title: "Japan Cherry Blossom Quest",
    description: "Tokyo, Kyoto & Osaka — 9 Days through neon futuristic avenues & ancient shrine gardens.",
    coverPhotoUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    cities: ["Tokyo", "Kyoto", "Osaka"],
    startDate: "2026-04-02",
    endDate: "2026-04-11",
    durationDays: 9,
    status: "ongoing",
    budgetTotal: 195000,
    budgetSpent: 140000,
    currency: "INR",
    shareToken: "japan-sakura-2026",
    planningProgress: 90,
    squad: [
      { name: "Purva (You)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Purva", role: "owner", balance: 5000 },
      { name: "Tanmay", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanmay", role: "editor", balance: -5000 },
    ],
  },
  {
    id: "trip-3",
    title: "Goa Coastal Break",
    description: "4 Days of beach sunset shacks, water sports, and Portuguese heritage trails.",
    coverPhotoUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    cities: ["Goa"],
    startDate: "2026-01-14",
    endDate: "2026-01-18",
    durationDays: 4,
    status: "completed",
    budgetTotal: 25000,
    budgetSpent: 22800,
    currency: "INR",
    shareToken: "goa-vibe-2026",
    planningProgress: 100,
    squad: [
      { name: "Purva (You)", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Purva", role: "owner", balance: 0 },
    ],
  },
];

export const SEASONAL_CAMPAIGNS: Record<string, SeasonalCampaign> = {
  summer: {
    id: "summer",
    title: "Summer Escapes",
    tagline: "Your summer story starts here.",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#0284C7",
    destinations: ["Goa", "Bali", "Maldives", "Thailand", "Greece"],
    highlights: ["Crystal turquoise waters", "Beachfront sunset shacks", "Island hopping adventures"],
  },
  monsoon: {
    id: "monsoon",
    title: "Monsoon Escapes",
    tagline: "Let the rains take you somewhere beautiful.",
    heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#10B981",
    destinations: ["Kerala", "Meghalaya", "Goa", "Coorg", "Munnar"],
    highlights: ["Cascading waterfalls", "Lush emerald tea estates", "Misty mountain passes"],
  },
  winter: {
    id: "winter",
    title: "Winter Wonders",
    tagline: "Chase the cold. Find your wonderland.",
    heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#38BDF8",
    destinations: ["Kashmir", "Switzerland", "Japan", "Iceland", "Manali"],
    highlights: ["Snow-capped alpine peaks", "Cozy fireside cabins", "Northern lights hunting"],
  },
  diwali: {
    id: "diwali",
    title: "Diwali Getaways",
    tagline: "Celebrate the festival of lights on the road.",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80",
    accentColor: "#F59E0B",
    destinations: ["Jaipur", "Udaipur", "Varanasi", "Ayodhya", "Amritsar"],
    highlights: ["Illuminated royal palaces", "Ganga Aarti brass lamps", "Golden temple reflection"],
  },
};

export const TRAVEL_PERSONALITIES: TravelPersonality[] = [
  { id: "adventure", title: "Adventure Seeker", icon: "🏔️", description: "Thrives on high altitude, skydiving, trekking, and raw nature.", recommendedPlaces: ["Interlaken", "Leh Ladakh", "Rishikesh"] },
  { id: "beach", title: "Beach Lover", icon: "🏖️", description: "Loves turquoise horizons, warm sand, palm trees, and ocean sunsets.", recommendedPlaces: ["Goa", "Bali", "Maldives"] },
  { id: "food", title: "Food Explorer", icon: "🍜", description: "Explores cultures through street food markets, Michelin stars, and local spices.", recommendedPlaces: ["Tokyo", "Bangkok", "Paris"] },
  { id: "culture", title: "Culture Hunter", icon: "📸", description: "Passionate about classical architecture, art museums, and local traditions.", recommendedPlaces: ["Kyoto", "Rome", "Udaipur"] },
  { id: "romantic", title: "Romantic Traveler", icon: "❤️", description: "Seeks intimate dining, scenic candlelit views, and cozy stays.", recommendedPlaces: ["Paris", "Santorini", "Venice"] },
  { id: "nature", title: "Nature Soul", icon: "🌿", description: "Recharges in silent forests, national parks, and misty valleys.", recommendedPlaces: ["Kerala", "Meghalaya", "Banff"] },
  { id: "history", title: "History Buff", icon: "🏛️", description: "Fascinated by ancient ruins, imperial forts, and historic monuments.", recommendedPlaces: ["Agra", "Athens", "Rome"] },
  { id: "party", title: "Party Explorer", icon: "🎉", description: "Loves high-energy nightlife, beach clubs, festivals, and music events.", recommendedPlaces: ["Goa", "Ibiza", "Dubai"] },
];
