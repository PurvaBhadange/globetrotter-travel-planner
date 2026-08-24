import express from "express";
import { createServer } from "http";
import { initSockets } from "./sockets";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./modules/auth/auth.routes";
import tripsRouter from "./modules/trips/trips.routes";
import stopsRouter from "./modules/stops/stops.routes";
import citiesRouter from "./modules/cities/cities.routes";
import activitiesRouter from "./modules/activities/activities.routes";
import budgetRouter from "./modules/budget/budget.routes";
import squadSyncRouter from "./modules/squadSync/squadSync.routes";
import copilotRouter from "./modules/copilot/copilot.routes";
import communityRouter from "./modules/community/community.routes";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "https://frontend-sand-three-52.vercel.app",
  "http://localhost:5173"
].filter(Boolean) as string[];

app.use(cors({ origin: allowedOrigins.length > 0 ? allowedOrigins : "*" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api", copilotRouter);
app.use("/api/trips", tripsRouter);
app.use("/api", stopsRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api", budgetRouter);
app.use("/api", squadSyncRouter);
app.use("/api/community", communityRouter);

const PORT = process.env.PORT || 4000;

initSockets(httpServer);

httpServer.listen(PORT, () => {
  console.log(`GlobeTrotter API listening on port ${PORT}`);
});
