import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  getPosts,
  createPost,
  addComment,
  likePost
} from "./community.controller";

const router = Router();

router.use(requireAuth);

router.get("/posts", getPosts);
router.post("/posts", createPost);
router.post("/posts/:id/comments", addComment);
router.post("/posts/:id/like", likePost);

export default router;
