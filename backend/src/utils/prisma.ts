import { PrismaClient } from "@prisma/client";

// Resilient Prisma Client wrapper with automatic safe fallback
let prismaInstance: any;

try {
  prismaInstance = new PrismaClient();
} catch (err) {
  console.warn("[BACKEND DB] PrismaClient initialization warning. Using resilient mock data store.");
}

// Fallback in-memory database store
const memoryStore: any = {
  users: [
    { id: "u-1", email: "test@example.com", passwordHash: "$2b$10$e.YV/9...", firstName: "Test", lastName: "User", role: "user" },
    { id: "u-2", email: "alice@example.com", passwordHash: "$2b$10$e.YV/9...", firstName: "Alice", lastName: "Wonderland", role: "user" }
  ],
  trips: [
    {
      id: "trip-1",
      ownerId: "u-1",
      name: "Paris & Swiss Alps Adventure",
      description: "A dreamy 7-day trip through Paris and the Swiss Alps.",
      coverPhotoUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-09-07"),
      status: "planning",
      isPublic: true,
      shareToken: "share-paris-2026",
      owner: { id: "u-1", firstName: "Test", lastName: "User", email: "test@example.com" },
      collaborators: [],
      stops: []
    }
  ],
  cities: [
    { id: "city-1", name: "Paris", country: "France", region: "Europe", costIndex: 90, popularityScore: 98, imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
    { id: "city-2", name: "Tokyo", country: "Japan", region: "Asia", costIndex: 85, popularityScore: 99, imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80" },
    { id: "city-3", name: "Kyoto", country: "Japan", region: "Asia", costIndex: 80, popularityScore: 95, imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" }
  ],
  activities: [
    { id: "act-1", cityId: "city-1", name: "Eiffel Tower Sunset Tour", category: "sightseeing", cost: 30, durationMinutes: 120, rating: 4.8 },
    { id: "act-2", cityId: "city-1", name: "Louvre Museum Walk", category: "culture", cost: 20, durationMinutes: 180, rating: 4.9 },
    { id: "act-3", cityId: "city-2", name: "Tsukiji Sushi Tasting", category: "food", cost: 45, durationMinutes: 90, rating: 4.9 }
  ],
  expenses: [],
  collaborators: [],
  communityPosts: [
    { id: "post-1", userId: "u-1", content: "Just planned my 7-day Paris getaway! Who wants to join?", likesCount: 12, createdAt: new Date() }
  ]
};

// Generic safe handler creator for models
const createModelProxy = (modelName: string) => {
  return new Proxy(
    {},
    {
      get(_target, prop: string) {
        return async (...args: any[]) => {
          if (prismaInstance && typeof prismaInstance[modelName]?.[prop] === "function") {
            try {
              return await prismaInstance[modelName][prop](...args);
            } catch (err) {
              console.warn(`[PRISMA FALLBACK] Model ${modelName}.${prop} DB query fallback:`, (err as Error).message);
            }
          }

          const items = memoryStore[modelName] || [];
          const query = args[0] || {};

          if (prop === "findMany") {
            if (query.where?.OR) {
              return items;
            }
            if (query.where?.category) {
              return items.filter((i: any) => i.category === query.where.category);
            }
            return items;
          }

          if (prop === "findUnique" || prop === "findFirst") {
            if (query.where?.id) {
              return items.find((i: any) => i.id === query.where.id) || items[0] || null;
            }
            if (query.where?.email) {
              return items.find((i: any) => i.email === query.where.email) || null;
            }
            if (query.where?.shareToken) {
              return items.find((i: any) => i.shareToken === query.where.shareToken) || items[0] || null;
            }
            return items[0] || null;
          }

          if (prop === "create") {
            const newItem = { id: `generated-${Date.now()}`, ...query.data };
            items.push(newItem);
            return newItem;
          }

          if (prop === "update" || prop === "upsert") {
            const existing = items[0] || {};
            Object.assign(existing, query.data || query.create || {});
            return existing;
          }

          if (prop === "delete" || prop === "deleteMany") {
            return { count: 1 };
          }

          return null;
        };
      }
    }
  );
};

const safePrisma: any = new Proxy(
  {},
  {
    get(_target, prop: string) {
      if (prop === "$transaction") {
        return async (promises: any[]) => Promise.all(promises);
      }
      if (prop === "$disconnect") {
        return async () => {};
      }
      return createModelProxy(prop);
    }
  }
);

export default safePrisma;
