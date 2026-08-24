import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  getSharedTrip,
  getTripSummary
} from "./trips.controller";
import {
  inviteCollaborator,
  acceptInvite,
  getCollaborators
} from "../squadSync/squadSync.controller";

const router = Router();

router.get("/shared/:token", getSharedTrip); // public route

// Protected routes
router.use(requireAuth);
router.get("/", getTrips);
router.post("/", createTrip);
router.get("/:id", getTrip);
router.patch("/:id", updateTrip);
router.delete("/:id", deleteTrip);

// Collaborator management
router.post("/:id/collaborators/invite", inviteCollaborator);
router.post("/:id/collaborators/accept", acceptInvite);
router.get("/:id/collaborators", getCollaborators);

// Trip summary
router.get("/:id/summary", getTripSummary);

export default router;
