# 🌍 GlobeTrotter

**Personalized, collaborative travel planning** — build multi-city itineraries, track budgets automatically, and plan trips live with friends through an AI copilot.

<!-- Add a hero screenshot or demo GIF here before submission -->

## The Problem
Planning a multi-city trip usually means juggling spreadsheets, group chats, and five different booking tabs — and it falls apart the moment more than one person is involved.

## What GlobeTrotter Does
- **Build multi-city itineraries** — add stops, dates, and activities in a structured day-by-day flow
- **Automatic budget tracking** — cost breakdown by category (transport, stay, activities, meals) with live totals
- **Discover cities & activities** — searchable, filterable catalog to fill out your trip
- **Calendar & timeline view** — see your whole trip at a glance
- **Community sharing** — publish trips and get inspired by others
- **Public shareable itineraries** — read-only links for friends who aren't collaborators

## 🚀 What Makes This Different
Most trip planners are single-player. GlobeTrotter isn't:

- **Squad Sync** — invite friends to co-edit a trip in real time. Every expense can be split automatically (equal, custom %, or by who used it), with a live "who owes whom" ledger — like Splitwise built directly into your itinerary.
- **AI Trip Copilot** — a chat panel, grounded in the app's own city/activity data, that fills gaps in your itinerary ("plan my last day in Kyoto") and suggests specific budget-saving swaps when you're overspending.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React, Vite, TailwindCSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Real-time | Socket.IO |
| AI | Anthropic Claude API |
| Auth | JWT |

## Architecture
```
┌─────────────┐      REST + WebSocket      ┌──────────────┐
│   React     │ ─────────────────────────▶ │   Express    │
│  (frontend) │ ◀───────────────────────── │  (backend)   │
└─────────────┘                             └──────┬───────┘
                                                     │
                                    ┌────────────────┼────────────────┐
                                    ▼                ▼                ▼
                              PostgreSQL      Claude API        Socket.IO
                              (Prisma)      (AI Copilot)     (Squad Sync)
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL running locally (or a hosted instance)

### Backend
```bash
cd backend
cp .env.example .env      # fill in DATABASE_URL, JWT_SECRET, ANTHROPIC_API_KEY
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev                # http://localhost:4000
```

### Frontend
```bash
cd frontend
cp .env.example .env      # set VITE_API_URL
npm install
npm run dev                # http://localhost:5173
```

## Contributors
- **Backend:** [@atharva081106](https://github.com/atharva081106)
- **Frontend:** [@PurvaBhadange](https://github.com/PurvaBhadange)

## License
MIT (or update per your hackathon's submission rules)
