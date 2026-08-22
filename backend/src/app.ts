import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// TODO: mount routers here as modules are built
// app.use("/api/auth", authRouter);
// app.use("/api/trips", tripsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`GlobeTrotter API listening on port ${PORT}`);
});
