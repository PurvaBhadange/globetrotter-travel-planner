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

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// TODO: mount routers here as modules are built
app.use("/api/auth", authRouter);
app.use("/api/trips", tripsRouter);
app.use("/api", stopsRouter); // mounts /api/trips/:id/stops and /api/stops...
app.use("/api/cities", citiesRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api", budgetRouter); // mounts /api/trips/:id/budget and /api/expenses...
app.use("/api", squadSyncRouter);
app.use("/api", copilotRouter);
app.use("/api/community", communityRouter);

const PORT = process.env.PORT || 4000;

initSockets(httpServer);

httpServer.listen(4000, () => {
  console.log("GlobeTrotter API listening on port 4000");
});
