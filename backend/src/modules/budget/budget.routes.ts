import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  getBudget,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./budget.controller";

const router = Router();

router.get("/trips/:id/budget", requireAuth, getBudget);
router.post("/trips/:id/expenses", requireAuth, createExpense);
router.patch("/expenses/:id", requireAuth, updateExpense);
router.delete("/expenses/:id", requireAuth, deleteExpense);

export default router;
