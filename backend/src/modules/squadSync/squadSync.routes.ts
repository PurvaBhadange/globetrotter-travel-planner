import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  inviteCollaborator,
  acceptInvite,
  getCollaborators,
  splitExpense,
  getBalances,
  settleBalances
} from "./squadSync.controller";

const router = Router();

router.use(requireAuth);

router.post("/trips/:id/collaborators/invite", inviteCollaborator);
router.post("/trips/:id/collaborators/accept", acceptInvite);
router.get("/trips/:id/collaborators", getCollaborators);

router.post("/expenses/:id/split", splitExpense);
router.get("/trips/:id/balances", getBalances);
router.post("/trips/:id/settle", settleBalances);

export default router;
