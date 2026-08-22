import { Router } from "express";
import { getActivities } from "./activities.controller";

const router = Router();

router.get("/", getActivities);

export default router;
