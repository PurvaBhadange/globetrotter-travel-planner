import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  generateItinerary,
  fillGap,
  rebalanceBudget,
  acceptSuggestion,
  rejectSuggestion,
  generateTripFromPrompt
} from "./copilot.controller";

const router = Router();

// Public route for landing page copilot search
router.post("/copilot/generate-trip", generateTripFromPrompt);

router.use(requireAuth);

router.post("/trips/:id/copilot/generate", generateItinerary);
router.post("/trips/:id/copilot/fill-gap", fillGap);
router.post("/trips/:id/copilot/rebalance", rebalanceBudget);
router.post("/ai-suggestions/:id/accept", acceptSuggestion);
router.post("/ai-suggestions/:id/reject", rejectSuggestion);

export default router;
