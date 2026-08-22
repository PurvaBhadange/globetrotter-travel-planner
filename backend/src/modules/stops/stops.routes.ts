import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  createStop,
  updateStop,
  deleteStop,
  addActivityToStop,
  updateTripActivity,
  deleteTripActivity,
} from "./stops.controller";

const router = Router();

// Stops
router.post("/trips/:tripId/stops", requireAuth, createStop);
router.patch("/stops/:id", requireAuth, updateStop);
router.delete("/stops/:id", requireAuth, deleteStop);

// Activities
router.post("/stops/:stopId/activities", requireAuth, addActivityToStop);
router.patch("/trip-activities/:id", requireAuth, updateTripActivity);
router.delete("/trip-activities/:id", requireAuth, deleteTripActivity);

export default router;
