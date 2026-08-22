import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  getSharedTrip,
} from "./trips.controller";

const router = Router();

router.get("/shared/:token", getSharedTrip); // public route

// Protected routes
router.use(requireAuth);
router.get("/", getTrips);
router.post("/", createTrip);
router.get("/:id", getTrip);
router.patch("/:id", updateTrip);
router.delete("/:id", deleteTrip);

export default router;
